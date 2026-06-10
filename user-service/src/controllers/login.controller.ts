import { USER_SCHEMA } from "@/schemas/user.schema.ts"
import type { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"
import { LoginService } from "@/services/login.service.ts"
import { UserRepository } from "@/repositories/user.repository.ts"
import { ResourceNotFoundError } from "@/errors/resource-not-found.error.ts"
import { InvalidCredentialsError } from "@/errors/invalid-credentials.error.ts"

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { success, data, error } = USER_SCHEMA.LOGIN.safeParse(request.body)
    if (!success) {
      const issue = error.issues[0]
      return reply.status(StatusCodes.BAD_REQUEST).send({ success: false, message: issue.message })
    }
    const { email, password } = data
    const { user } = await new LoginService(new UserRepository()).execute({ email, password })
    const token = await reply.jwtSign({ userId: user.id })
    return reply.status(StatusCodes.OK).send({ success: true, token })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({ success: false, message: error.message })
    }
    if (error instanceof InvalidCredentialsError) {
      return reply.status(StatusCodes.UNAUTHORIZED).send({ success: false, message: error.message })
    }
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: "INTERNAL_SERVER_ERROR" })
  }
}
