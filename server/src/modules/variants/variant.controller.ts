import type { Request, Response } from "express";

import { VariantService } from "@/modules/variants/variant.service.js";

const createVariant = async (
  req: Request,
  res: Response,
) => {
  if (!req.store) {
    return res.status(404).json({ error: "Store not found" });
  }
  const variant = await VariantService.createVariant(
    req.params.productId,
    req.store.id,
    req.body,
  );

  res.status(201).json({
    success: true,
    data: variant,
  });
};

const getVariants = async (
  req: Request,
  res: Response,
) => {
  if (!req.store) {
    return res.status(404).json({ error: "Store not found" });
  }
  const variants = await VariantService.getVariants(
    req.params.productId,
    req.store.id,
  );

  res.status(200).json({
    success: true,
    data: variants,
  });
};

const getVariant = async (
  req: Request,
  res: Response,
) => {
  if (!req.store) {
    return res.status(404).json({ error: "Store not found" });
  }
  const variant = await VariantService.getVariant(
    req.params.productId,
    req.params.variantId,
    req.store.id,
  );

  res.status(200).json({
    success: true,
    data: variant,
  });
};

const updateVariant = async (
  req: Request,
  res: Response,
) => {
  if (!req.store) {
    return res.status(404).json({ error: "Store not found" });
  }
  const variant = await VariantService.updateVariant(
    req.params.productId,
    req.params.variantId,
    req.store.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    data: variant,
  });
};

const deleteVariant = async (
  req: Request,
  res: Response,
) => {
  if (!req.store) {
    return res.status(404).json({ error: "Store not found" });
  }
  const variant = await VariantService.deleteVariant(
    req.params.productId,
    req.params.variantId,
    req.store.id,
  );

  res.status(200).json({
    success: true,
    data: variant,
  });
};

export const VariantController = {
  createVariant,
  getVariants,
  getVariant,
  updateVariant,
  deleteVariant,
};