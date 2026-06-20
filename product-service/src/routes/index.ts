import type { FastifyInstance } from "fastify";
import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "@/controllers/product.controller.ts";

export async function productRoutes(app: FastifyInstance) {
  app.post("/", createProduct); // POST /product
  app.get("/", getAllProducts); // GET /product
  app.get("/:id", getProductById); // GET /product/:id
  app.patch("/:id", updateProduct); // PATCH /product/:id
  app.delete("/:id", deleteProduct); // DELETE /product/:id
}
