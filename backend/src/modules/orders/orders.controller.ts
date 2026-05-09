import { Request, Response } from 'express';
import { OrderService } from './orders.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';

export class OrderController {
  static createOrder = asyncHandler(async (req: Request, res: Response) => {
    const { shippingAddress } = req.body;
    const order = await OrderService.createOrder(req.user!.id, shippingAddress);
    return res.status(201).json(new ApiResponse(201, order, 'Order created successfully'));
  });

  static getUserOrders = asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderService.getUserOrders(req.user!.id);
    return res.status(200).json(new ApiResponse(200, orders, 'Orders fetched successfully'));
  });

  static getOrderDetails = asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderService.getOrderDetails(req.params.id, req.user!.role === 'admin' ? undefined : req.user!.id);
    return res.status(200).json(new ApiResponse(200, order, 'Order details fetched successfully'));
  });

  static getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderService.getAllOrders();
    return res.status(200).json(new ApiResponse(200, orders, 'Admin: Orders fetched successfully'));
  });

  static updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
    const { status } = req.body;
    const order = await OrderService.updateOrderStatus(req.params.id, status);
    return res.status(200).json(new ApiResponse(200, order, 'Order status updated successfully'));
  });
}
