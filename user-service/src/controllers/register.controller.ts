import type { FastifyReply, FastifyRequest } from "fastify"
import { USER_SCHEMA } from "@/schemas/user.schema.ts"
import { StatusCodes } from "http-status-codes"
import { RegisterService } from "@/services/register.service.ts"
import { UserRepository } from "@/repositories/user.repository.ts"
import { UserAlreadyExistsError } from "@/errors/user-already-exists.error.ts"

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { data, success, error } = USER_SCHEMA.REGISTER.safeParse(request.body)
    if (!success) {
      const issue = error.issues[0]
      return reply.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: issue.message,
      })
    }
    const { user } = await new RegisterService(new UserRepository()).execute(data)
    return reply.status(StatusCodes.CREATED).send({
      success: true,
      message: "Usuário criado com sucesso",
      user,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(StatusCodes.CONFLICT).send({
        success: false,
        message: error.message,
      })
    }
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "INTERNAL_SERVER_ERROR",
    })
  }
}
