import { StoreRepository } from "@/modules/stores/store.repository.js";
import { type StoreInput } from "@/modules/stores/store.validations.js";

const createStore = async ({
  data,
  ownerId,
}: {
  data: StoreInput;
  ownerId: string;
}) => {
  return await StoreRepository.createStore({ data, ownerId });
};

const getStoreBySlug = async (slug: string) => {
  const store = await StoreRepository.findBySlug(slug);

  if (!store) {
    throw new Error("Store not found");
  }

  return store;
};

const getMyStore = async (ownerId: string) => {
  
  const store = await StoreRepository.findByOwnerId(ownerId);
  
  if (!store) {
    throw new Error("Store not found");
  }

  return store;
};

export const StoreService = {
  createStore,
  getStoreBySlug,
  getMyStore,
};