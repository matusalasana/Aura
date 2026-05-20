import { Request, Response } from 'express';
import { WishlistService } from './wishlist.service';


const getWishlistItems = async (req: Request, res: Response) => {
  try{
    const list = await WishlistService.getAll(req.user!.id);
  return res
    .status(200)
    .json(list);
  }catch(err){
    console.log("Get all wishlist items:", err.message);
    res.status(500).json({
      message: `Get all wishlist items: ${err.message}`
    });
  };
};

const addToWishlist = async(req: Request, res: Response) => {
  try{
    const newWishlistItem = await WishlistService.add(
      req.user!.id,
      req.body.product_id
    );
  return res
    .status(201)
    .json(newWishlistItem);
  }catch(err){
    console.log("Add to wishlist err:", err.message);
    res.status(500).json({
      message: `Add to wishlist err: ${err.message}`
    });
  };
};

const removeFromWishlist = asyncHandler(async (req: Request, res: Response) => {
  await WishlistService.removeFromWishlist(req.user!.id, req.params.productId);
  return res.status(200).json(new ApiResponse(200, {}, 'Removed from wishlist'));
});
}
