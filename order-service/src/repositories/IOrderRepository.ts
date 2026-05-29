import type { CreateOrderInput } from "@/schemas/order.schema.ts";
import { Order, OrderItem } from "@/generated/prisma/client.ts";

export type OrderWithItems = Order & { items: OrderItem[] };

export interface IOrderRepository {
  create(data: CreateOrderInput): Promise<OrderWithItems>;
  findById(id: string): Promise<OrderWithItems | null>;
  findByUserId(userId: string): Promise<OrderWithItems[]>;
}
