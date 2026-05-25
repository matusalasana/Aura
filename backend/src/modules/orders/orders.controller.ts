import { Request, Response } from 'express';
import { OrderService } from './orders.service';

// CREATE ORDER
const createOrder = async (req: Request, res: Response) => {
  try {
    const { shippingAddress } = req.body;

    const order = await OrderService.createOrder(
      req.user!.id,
      shippingAddress
    );

    return res.status(201).json(order);
  } catch (err: any) {
    console.log('Create order error:', err.message);

    return res.status(500).json({
      message: `Create order error: ${err.message}`,
    });
  }
};

// GET USER ORDERS
const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.getUserOrders(req.user!.id);

    return res.status(200).json(orders);
  } catch (err: any) {
    console.log('Get user orders error:', err.message);

    return res.status(500).json({
      message: `Get user orders error: ${err.message}`,
    });
  }
};

// GET ORDER DETAILS
const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const order = await OrderService.getOrderDetails(
      req.params.id,
      req.user!.role === 'admin' ? undefined : req.user!.id
    );

    return res.status(200).json(order);
  } catch (err: any) {
    console.log('Get order details error:', err.message);

    return res.status(500).json({
      message: `Get order details error: ${err.message}`,
    });
  }
};

// GET ALL ORDERS (ADMIN)
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.getAllOrders();

    return res.status(200).json(orders);
  } catch (err: any) {
    console.log('Get all orders error:', err.message);

    return res.status(500).json({
      message: `Get all orders error: ${err.message}`,
    });
  }
};

// UPDATE ORDER STATUS
const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const order = await OrderService.updateOrderStatus(
      req.params.id,
      status
    );

    return res.status(200).json(order);
  } catch (err: any) {
    console.log('Update order status error:', err.message);

    return res.status(500).json({
      message: `Update order status error: ${err.message}`,
    });
  }
};

export const OrderController = {
  createOrder,
  getUserOrders,
  getOrderDetails,
  getAllOrders,
  updateOrderStatus,
};