import { WishlistRepository } from './wishlist.repository';

export class WishlistService {
  static async getWishlist(userId: string) {
    return await WishlistRepository.findByUserId(userId);
  }

  static async addToWishlist(userId: string, productId: string) {
    return await WishlistRepository.add(userId, productId);
  }

  static async removeFromWishlist(userId: string, productId: string) {
    await WishlistRepository.remove(userId, productId);
  }
}
