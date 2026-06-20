import { prisma } from "@/lib/prisma.ts";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "@/schemas/product.schema.ts";

import type { IProductRepository } from "./IProductRepository.ts";
import type { Product } from "@/generated/prisma/client.ts";

export class ProductRepository implements IProductRepository {
  async create(data: CreateProductInput): Promise<Product> {
    return prisma.product.create({ data });
  }
  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
  }
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany();
  }
  async update(id: string, data: UpdateProductInput): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data,
    });
  }
  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}
