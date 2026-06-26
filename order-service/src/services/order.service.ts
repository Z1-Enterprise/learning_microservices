import type { IOrderRepository } from "@/repositories/IOrderRepository.ts";
import type { CreateOrderInput } from "@/schemas/order.schema.ts";
import { OrderNotFoundError } from "@/errors/order-not-found.error.ts";
import { UserNotFoundError } from "@/errors/user-not-found.error.ts";
import { findUserById } from "@/lib/user-service.client.ts";

export class OrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async createOrder(data: CreateOrderInput) {
    const user = await findUserById(data.userId);
    if (!user) throw new UserNotFoundError();

    return this.orderRepository.create(data);
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new OrderNotFoundError();
    return order;
  }

  async getOrdersByUser(userId: string) {
    return this.orderRepository.findByUserId(userId);
  }
}
