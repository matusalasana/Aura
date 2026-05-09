import { Request, Response } from 'express';
import { WishlistService } from './wishlist.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';

export class WishlistController {
  static getWishlist = asyncHandler(async (req: Request, res: Response) => {
    const list = await WishlistService.getWishlist(req.user!.id);
    return res.status(200).json(new ApiResponse(200, list, 'Wishlist fetched successfully'));
  });

  static addToWishlist = asyncHandler(async (req: Request, res: Response) => {
    const item = await WishlistService.addToWishlist(req.user!.id, req.body.productId);
    return res.status(201).json(new ApiResponse(201, item, 'Added to wishlist'));
  });

  static removeFromWishlist = asyncHandler(async (req: Request, res: Response) => {
    await WishlistService.removeFromWishlist(req.user!.id, req.params.productId);
    return res.status(200).json(new ApiResponse(200, {}, 'Removed from wishlist'));
  });
}
