import type {
  CreateProductInput,
  UpdateProductInput,
} from "@/schemas/product.schema.ts";
import type { Product } from "@/generated/prisma/client.ts";

export interface IProductRepository {
  create(data: CreateProductInput): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  update(id: string, data: UpdateProductInput): Promise<Product>;
  delete(id: string): Promise<void>;
}
