import type { FastifyInstance } from "fastify"
import { register } from "@/controllers/register.controller.ts"
import { login } from "@/controllers/login.controller.ts"
import { getUserById } from "@/controllers/get-user-by-id.controller.ts"

export const userRoutes = async (app: FastifyInstance) => {
  app.post("/register", register)
  app.post("/login", login)
  app.get("/user/:id", getUserById)
}
