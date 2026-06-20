import type { FastifyRequest, FastifyReply } from "fastify";
import { ProductService } from "@/services/product.service.ts";
import { ProductRepository } from "@/repositories/product.repository.ts";
import {
  createProductSchema,
  updateProductSchema,
} from "@/schemas/product.schema.ts";
import { ProductNotFoundError } from "@/errors/product-not-found.error.ts";
import { StatusCodes } from "http-status-codes";

const productService = new ProductService(new ProductRepository());

export async function createProduct(req: FastifyRequest, reply: FastifyReply) {
  const data = createProductSchema.parse(req.body);
  const product = await productService.createProduct(data);
  return reply.status(StatusCodes.CREATED).send({ success: true, product });
}

export async function getProductById(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const product = await productService.getProductById(req.params.id);
    return reply.send({ success: true, product });
  } catch (error) {
    if (error instanceof ProductNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: error.message,
      });
    }
    throw error;
  }
}

export async function getAllProducts(req: FastifyRequest, reply: FastifyReply) {
  const products = await productService.getAllProducts();
  return reply.send({ success: true, products });
}

export async function updateProduct(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const data = updateProductSchema.parse(req.body);
    const product = await productService.updateProduct(req.params.id, data);
    return reply.send({ success: true, product });
  } catch (error) {
    if (error instanceof ProductNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: error.message,
      });
    }
    throw error;
  }
}

export async function deleteProduct(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    await productService.deleteProduct(req.params.id);
    return reply.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    if (error instanceof ProductNotFoundError) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: error.message,
      });
    }

    throw error;
  }
}
