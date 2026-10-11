import { StoreRepository } from "@/modules/stores/store.repository.js";
import type { UpdateStoreInput, CreateStoreInput } from "@/modules/stores/store.validations.js";
import { uploadImage } from "@/utils/cloudinary.js";

const createStore = async ({
  data,
  ownerId,
  file,
}: {
  data: CreateStoreInput;
  ownerId: string;
  file: Express.Multer.File;
}) => {
  const uploadResult = await uploadImage({
    buffer: file.buffer,
    folder: `logo/${ownerId}`
  });

  const storeData = {
    ...data,
    logo: uploadResult.secure_url,
  }
  console.log(data)
  console.log(storeData)
  return await StoreRepository.createStore({ 
    storeData,
    ownerId 
  });
};

const getStores = async () => {
  const stores = await StoreRepository.getAll();

  if (!stores.length) {
    throw new Error("No Stores");
  }

  return stores;
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

const updateStore = async ({
  ownerId,
  data 
}: {
  ownerId: string;
  data: UpdateStoreInput;
  }) => {

  const store = await StoreRepository.findByOwnerId(ownerId);
  
  if (!store) {
    throw new Error("Store not found");
  }

  if(store.slug !== data.slug){
    throw new Error("Slug doesn't match")
  }

  const result = await StoreRepository.update({
    ownerId,
    data
  });

  return store;
};

const deleteStore = async (storeId: string) => {

  const store = await StoreRepository.findByStoreId(storeId);
  
  if (!store) {
    throw new Error("Store not found");
  }

  return await StoreRepository.deleteStore(storeId);
  
};



export const StoreService = {
  createStore,
  getStoreBySlug,
  getMyStore,
  getStores,
  updateStore,
  deleteStore,
};