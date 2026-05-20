import { WishlistRepository } from './wishlist.repository';

const getAll = async(userId: string) => {
  if(!userId){
    throw new Error("User id not found");
  }
  return await WishlistRepository.getAll(userId);
}

const add = async(userId: string, productId: string) => {
  if(!userId){
    throw new Error("User id not found");
  }
  const exists = await WishlistRepository.findById(
    productId
  );
  if(exists){
    return await WishlistRepository.remove(
      userId,
      productId
    );
  }
  return await WishlistRepository.add(userId, productId);
}

const remove = async(userId: string, productId: string) => {
  if(!userId){
    throw new Error("User id not found");
  };
  await WishlistRepository.remove(userId, productId);
};

export const WishlistService = {
  getAll,
  add,
  remove
}