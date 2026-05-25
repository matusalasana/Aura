import { Request, Response } from 'express';
import { ReviewService } from './reviews.service';

// GET PRODUCT REVIEWS
const getProductReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await ReviewService.getProductReviews(
      req.params.productId
    );

    return res.status(200).json(reviews);
  } catch (err: any) {
    console.log('Get product reviews error:', err.message);

    return res.status(500).json({
      message: `Get product reviews error: ${err.message}`,
    });
  }
};

// GET USER REVIEWS
const getUserReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await ReviewService.getUserReviews(req.user!.id);

    return res.status(200).json(reviews);
  } catch (err: any) {
    console.log('Get user reviews error:', err.message);

    return res.status(500).json({
      message: `Get user reviews error: ${err.message}`,
    });
  }
};

// CREATE REVIEW
const createReview = async (req: Request, res: Response) => {
  try {
    const review = await ReviewService.createReview(
      req.user!.id,
      req.body
    );

    return res.status(201).json(review);
  } catch (err: any) {
    console.log('Create review error:', err.message);

    return res.status(500).json({
      message: `Create review error: ${err.message}`,
    });
  }
};

// UPDATE REVIEW
const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await ReviewService.updateReview(
      req.params.id,
      req.user!.id,
      req.body
    );

    return res.status(200).json(review);
  } catch (err: any) {
    console.log('Update review error:', err.message);

    return res.status(500).json({
      message: `Update review error: ${err.message}`,
    });
  }
};

// DELETE REVIEW
const deleteReview = async (req: Request, res: Response) => {
  try {
    await ReviewService.deleteReview(req.params.id, req.user!.id);

    return res.status(200).json({
      message: 'Review deleted successfully',
    });
  } catch (err: any) {
    console.log('Delete review error:', err.message);

    return res.status(500).json({
      message: `Delete review error: ${err.message}`,
    });
  }
};

export const ReviewController = {
  getProductReviews,
  getUserReviews,
  createReview,
  updateReview,
  deleteReview,
};