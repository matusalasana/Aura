import { ReviewRepository } from './reviews.repository';
import { createApiError } from '../../utils/ApiError';

export class ReviewService {
  static async getProductReviews(productId: string) {
    return await ReviewRepository.findByProductId(productId);
  }

  static async getUserReviews(userId: string) {
    return await ReviewRepository.findByUserId(userId);
  }

  static async createReview(userId: string, data: any) {
    const review = await ReviewRepository.create(userId, data);
    if (!review) throw new createApiError(400, 'You have already reviewed this product');
    return review;
  }

  static async updateReview(id: string, userId: string, data: any) {
    const review = await ReviewRepository.update(id, userId, data);
    if (!review) throw new createApiError(404, 'Review not found or unauthorized');
    return review;
  }

  static async deleteReview(id: string, userId: string) {
    await ReviewRepository.delete(id, userId);
  }
}
