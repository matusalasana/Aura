import { WishlistRepository } from './wishlist.repository';

const getAll = async(userId: string) => {
  if(!userId){
    throw new Error("User id not found");
  }
  return await WishlistRepository.getAll(userId);
}

const add = async(userId: string, productId: string) => {
  return await WishlistRepository.add(userId, productId);
}

const async remove(userId: string, productId: string) {
  await WishlistRepository.remove(userId, productId);
}
