import type { Request, Response } from "express";

import { OrderService } from "@/modules/orders/order.service.js";
import type { CreateOrderInput, UpdateOrderInput} from "@/modules/orders/order.validations.js"

export const createOrder = async (
  req: Request,
  res: Response,
) => {
  
  if (!req.store) {
    return res.status(404).json({ error: "Store not found" });
  }
  if(!req.user){
    return res.status(401).json({error: "Unauthorized"})
  }
  const storeId = req.store.id as string;
  const userId = req.user.id as string;
  const data: CreateOrderInput = req.body;
  const order = await OrderService.createOrder(
    storeId,
    userId,
    data
  );

  res.status(201).json({
    success: true,
    data: order,
  });
};

export const getOrders = async (
  req: Request,
  res: Response,
) => {
  if(!req.user){
    return res.status(401).json({error: "Unauthorized"})
  }
  if (!req.store) {
    return res.status(404).json({ error: "Store not found" });
  }
  const storeId = req.store.id as string;
  const userId = req.user.id as string;
  const orders = await OrderService.getOrders(
    storeId,
    userId
  );

  res.status(200).json({
    success: true,
    data: orders,
  });
};



export const OrderController = {
  createOrder,
  getOrders,
};