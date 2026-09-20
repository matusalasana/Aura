import { Request, Response } from "express";

import { StoreService } from "@/modules/stores/store.service.js";

// Sinup Store
const signupStore = async (
  req: Request,
  res: Response,
) => {

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