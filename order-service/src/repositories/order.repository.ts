import { prisma } from "@/lib/prisma.ts";
import type { CreateOrderInput } from "@/schemas/order.schema.ts";
import type { IOrderRepository, OrderWithItems } from "./IOrderRepository.ts";

export class OrderRepository implements IOrderRepository {
  async create(data: CreateOrderInput): Promise<OrderWithItems> {
    const total = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return prisma.order.create({
      data: {
        userId: data.userId,
        total,
        items: {
          create: data.items,
        },
      },
      include: {
        items: true,
      },
    });
  }

  async findById(id: string): Promise<OrderWithItems | null> {
    return prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  async findByUserId(userId: string): Promise<OrderWithItems[]> {
    return prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
  }
}
