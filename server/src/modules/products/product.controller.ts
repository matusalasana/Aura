import type { Request, Response } from "express";

import { ProductService } from "@/modules/products/product.service.js";

export const createProduct = async (
  req: Request,
  res: Response,
) => {
  const product = await ProductService.createProduct({
    storeId: req.store.id,
    ...req.body,
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
  const products = await ProductService.getProducts(
    req.store.id,
  );

  res.status(200).json({
    success: true,
    data: products,
  });
};

export const getProduct = async (
  req: Request,
  res: Response,
) => {
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