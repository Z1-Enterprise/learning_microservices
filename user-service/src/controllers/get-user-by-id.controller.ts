import { ResourceNotFoundError } from "@/errors/resource-not-found.error.ts";
import { UserRepository } from "@/repositories/user.repository.ts";
import { USER_SCHEMA } from "@/schemas/user.schema.ts";
import { GetUserByIdService } from "@/services/get-user-by-id.service.ts";
import type { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

interface Request {
  id: string
}

export const getUserById = async (request: FastifyRequest<{ Params: Request }>, reply: FastifyReply) => {
  try {
    const { id } = request.params
    const { user } = await new GetUserByIdService(new UserRepository()).execute({ id })
    return reply.status(StatusCodes.OK).send({ success: true, user })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({ success: false, message: error.message })
    }
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: "INTERNAL_SERVER_ERROR" })
  }
}
