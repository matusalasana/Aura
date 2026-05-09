import { OrderRepository } from './orders.repository';

export class OrderService {
  static async createOrder(userId: string, shippingAddress: string) {
    return await OrderRepository.createOrderFromCart(userId, shippingAddress);
  }

  static async getUserOrders(userId: string) {
    return await OrderRepository.findByUserId(userId);
  }

  static async getOrderDetails(id: string, userId?: string) {
    return await OrderRepository.findById(id, userId);
  }

  static async getAllOrders() {
    return await OrderRepository.findAll();
  }

  static async updateOrderStatus(id: string, status: string) {
    return await OrderRepository.updateStatus(id, status);
  }
}
