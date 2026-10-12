import { Request, Response } from "express";

import { StoreService } from "@/modules/stores/store.service.js";
import type { UpdateStoreInput, CreateStoreInput } from "@/modules/stores/store.validations.js";

// Create Store
const createStore = async (
  req: Request,
  res: Response,
) => {
  
  if (!req.user) {
    return res.status(404).json({ error: "User not found" });
  }
  const file = req.file as Express.Multer.File;
  const ownerId = req.user.id as string;
  const data: CreateStoreInput = JSON.parse(req.body.storeData);
  const store = await StoreService.createStore({ownerId, file, data});
  
  return res.status(200).json({
    message: "Store application sent successfully",
    success: true,
    data: store
  });
};

const getStores = async (
  req: Request,
  res: Response
) => {

  const stores = await StoreService.getStores();

  return res.status(200).json({ 
    success: true,
    data: stores 
  });

};

const getStoreBySlug = async (
  req: Request,
  res: Response
) => {

  const { slug } = req.params;

  const store = await StoreService.getStoreBySlug(slug);

  res.status(200).json({ 
    success: true,
    data: store 
  });

};


const getMyStore = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const ownerId = req.user.id as string;

  const store = await StoreService.getMyStore(ownerId);

  return res.status(200).json({
    success: true,
    data: store,
  });
};

const updateStore = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const ownerId = req.user.id as string;
  const data: UpdateStoreInput = req.body;

  const updated = await StoreService.updateStore({
    ownerId,
    data
  });

  return res.status(200).json({
    success: true,
    data: updated,
  });
};

const deleteStore = async (
  req: Request,
  res: Response
) => {

  const storeId = req.params.storeId as string;

  await StoreService.deleteStore(storeId);

  return res.status(200).json({
    success: true,
    message: "Store deleted successfully",
  });
};


export const getStoreProduct = async (
  req: Request,
  res: Response,
) => {
  if (!req.store) {
    return res.status(404).json({ error: "Store not found" });
  }
  const storeId = req.store.id as string;
  const productId = req.params.productId as string;
  console.log(productId)
  const product = await StoreService.getStoreProduct({
    productId,
    storeId,
  });

  res.status(200).json({
    success: true,
    data: product,
  });
};


export const StoreController = {
  createStore,
  getStoreBySlug,
  getMyStore,
  getStores,
  updateStore,
  deleteStore,

  getStoreProduct,
};