import { StoreRepository } from "@/modules/stores/store.repository.js";
import { type StoreInput } from "@/modules/stores/store.validations.js";


// Sinup Store
const signupStore = async ({
  data,
  ownerId
}:{
  data: StoreInput,
  ownerId: string
}) => {

  return await StoreRepository.createStore({data, ownerId});
};


export const StoreService = {
  signupStore,
  
};