import { WishlistRepository } from './wishlist.repository';

const getAll = async(userId: string) => {
  if(!userId){
    throw new Error("User id not found");
  }
  return await WishlistRepository.getAll(userId);
}

const add = async(userId: string, productId: string) => {
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

const async remove(userId: string, productId: string) {
  await WishlistRepository.remove(userId, productId);
}
