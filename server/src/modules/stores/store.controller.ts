import { Request, Response } from "express";

import { StoreService } from "@/modules/stores/store.service.js";
import { type StoreInput } from "@/modules/stores/store.validations.js"

// Create Store
const createStore = async (
  req: Request,
  res: Response,
) => {

  if (!req.user) {
    return res.status(404).json({ error: "User not found" });
  }
  const ownerId = req.user.id as string;
  const data: StoreInput = req.body;
  const store = await StoreService.createStore({ownerId, data});
  
  res.status(200).json({
    message: "Store application sent successfully",
    success: true,
    data: store
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

  console.log(store)
  return res.status(200).json({
    success: true,
    data: store,
  });
};



export const StoreController = {
  createStore,
  getStoreBySlug,
  getMyStore,
};