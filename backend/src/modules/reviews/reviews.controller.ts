import { Request, Response } from 'express';
import { ReviewService } from './reviews.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';

export class ReviewController {
  static getProductReviews = asyncHandler(async (req: Request, res: Response) => {
    const reviews = await ReviewService.getProductReviews(req.params.productId);
    return res.status(200).json(new ApiResponse(200, reviews, 'Product reviews fetched successfully'));
  });

  static getUserReviews = asyncHandler(async (req: Request, res: Response) => {
    const reviews = await ReviewService.getUserReviews(req.user!.id);
    return res.status(200).json(new ApiResponse(200, reviews, 'Your reviews fetched successfully'));
  });

  static createReview = asyncHandler(async (req: Request, res: Response) => {
    const review = await ReviewService.createReview(req.user!.id, req.body);
    return res.status(201).json(new ApiResponse(201, review, 'Review added successfully'));
  });

  static updateReview = asyncHandler(async (req: Request, res: Response) => {
    const review = await ReviewService.updateReview(req.params.id, req.user!.id, req.body);
    return res.status(200).json(new ApiResponse(200, review, 'Review updated successfully'));
  });

  static deleteReview = asyncHandler(async (req: Request, res: Response) => {
    await ReviewService.deleteReview(req.params.id, req.user!.id);
    return res.status(200).json(new ApiResponse(200, {}, 'Review deleted successfully'));
  });
}
