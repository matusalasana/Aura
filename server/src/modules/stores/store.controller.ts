import { Request, Response } from "express";

import { StoreService } from "@/modules/stores/store.service.js";
import { type StoreInput } from "@/modules/stores/store.validations.js"

// Sinup Store
const signupStore = async (
  req: Request,
  res: Response,
) => {

  if (!req.user) {
    return res.status(404).json({ error: "User not found" });
  }
  const ownerId = req.user.id as string;
  const data: StoreInput = req.body;
  const store = await StoreService.signupStore({ownerId, data});
  
  res.status(200).json({
    message: "Store application sent successfully",
    success: true,
    store
  });
};


export const StoreController = {
  signupStore,
  
};