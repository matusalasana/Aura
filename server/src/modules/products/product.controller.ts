import type { Request, Response } from "express";

import {
  type CreateProductInput,
  type UpdateProductInput,
  createProductSchema,
  updateProductSchema,
} from "@/modules/products/product.validations.js";
import { ProductService } from "@/modules/products/product.service.js";


export const createProduct = async (
  req: Request,
  res: Response,
) => {
  
  if (!req.store) {
    return res.status(404).json({ error: "Store not found" });
  }
  const files = req.files as Express.Multer.File[];

  const productData: CreateProductInput = JSON.parse(req.body.productData);

  const validated = createProductSchema.parse(productData);

  if (!files?.length) {
    return res.status(400).json({
      error: "At least one image is required",
    });
  }
  const storeId = req.store.id as string;
  
  const product = await ProductService.createProduct({
    files,
    storeId,
    data: productData
  });

  res.status(201).json({
    success: true,
    data: product,
  });
};

export const getProducts = async (
  req: Request,
  res: Response,
) => {
  if (!req.store) {
    return res.status(404).json({ error: "Store not found" });
  }
  const products = await ProductService.getProducts(
    req.store.id,
  );

  console.log(products)

  res.status(200).json({
    success: true,
    data: products,
  });
};

export const getProduct = async (
  req: Request,
  res: Response,
) => {
  if (!req.store) {
    return res.status(404).json({ error: "Store not found" });
  }
  const product = await ProductService.getProduct(
    req.params.productId,
    req.store.id,
  );

  res.status(200).json({
    success: true,
    data: product,
  });
};

export const updateProduct = async (
  req: Request,
  res: Response,
) => {
  if (!req.store) {
    return res.status(404).json({ error: "Store not found" });
  }
  const product = await ProductService.updateProduct(
    req.params.productId,
    req.store.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    data: product,
  });
};

export const deleteProduct = async (
  req: Request,
  res: Response,
) => {
  if (!req.store) {
    return res.status(404).json({ error: "Store not found" });
  }
  const product = await ProductService.deleteProduct(
    req.params.productId,
    req.store.id,
  );

  res.status(200).json({
    success: true,
    data: product,
  });
};

export const ProductController = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
};