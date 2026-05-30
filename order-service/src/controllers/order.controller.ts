import type { FastifyRequest, FastifyReply } from "fastify";
import { OrderService } from "@/services/order.service.ts";
import { OrderRepository } from "@/repositories/order.repository.ts";
import { createOrderSchema } from "@/schemas/order.schema.ts";
import { OrderNotFoundError } from "@/errors/order-not-found.error.ts";
import { UserNotFoundError } from "@/errors/user-not-found.error.ts";
import { StatusCodes } from "http-status-codes";

const orderService = new OrderService(new OrderRepository());

export async function createOrder(req: FastifyRequest, reply: FastifyReply) {
  try {
    const data = createOrderSchema.parse(req.body);
    const order = await orderService.createOrder(data);
    return reply.status(StatusCodes.CREATED).send({ success: true, order });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: error.message,
      });
    }
    throw error;
  }
}

export async function getOrderByID(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const order = await orderService.getOrderById(req.params.id);
    return reply.send({ success: true, order });
  } catch (error) {
    if (error instanceof OrderNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: error.message,
      });
    }
    throw error;
  }
}

export async function getOrdersByUser(
  req: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply,
) {
  const orders = await orderService.getOrdersByUser(req.params.userId);
  return reply.send({ success: true, orders });
}
