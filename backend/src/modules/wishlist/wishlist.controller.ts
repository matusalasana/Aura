import { Request, Response } from 'express';
import { WishlistService } from './wishlist.service';


// GET ALL
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

// ADD 
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
    res.status(401).json({
      message: `Add to wishlist err: ${err.message}`
    });
  };
};

// REMOVE 
const removeFromWishlist = async (req: Request, res: Response) => {
  try{
    const newWishlistItem = await WishlistService.remove(
      req.user!.id,
      req.body.product_id
    );
  return res
    .status(200)
    .json({message: "item removed from wishlist"});
  }catch(err){
    console.log("Remove wishlist err:", err.message);
    res.status(401).json({
      message: `Remove wishlist err: ${err.message}`
    });
  };
};

export const WishlistController = {
  getWishlistItems,
  addToWishlist,
  removeFromWishlist
};