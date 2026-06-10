import type { FastifyInstance } from "fastify"
import { register } from "@/controllers/register.controller.ts"

export const userRoutes = async (app: FastifyInstance) => {
  app.post("/register", register)
}
