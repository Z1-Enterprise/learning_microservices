import type { IProductRepository } from "@/repositories/IProductRepository.ts";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "@/schemas/product.schema.ts";
import { ProductNotFoundError } from "@/errors/product-not-found.error.ts";

export class ProductService {
  constructor(private productRepository: IProductRepository) {}
  async createProduct(data: CreateProductInput) {
    return this.productRepository.create(data);
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new ProductNotFoundError();
    return product;
  }

  async getAllProducts() {
    return this.productRepository.findAll();
  }

  async updateProduct(id: string, data: UpdateProductInput) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new ProductNotFoundError();
    return this.productRepository.update(id, data);
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new ProductNotFoundError();
    await this.productRepository.delete(id);
  }
}
