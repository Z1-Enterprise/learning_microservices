import type { FastifyInstance } from "fastify";
import {
  createOrder,
  getOrderById,
  getOrdersByUser,
} from "@/controllers/order.controller.ts";

export async function orderRoutes(app: FastifyInstance) {
  app.post("/", createOrder);
  app.get("/:id", getOrderById);
  app.get("/user/:userId", getOrdersByUser);
}
