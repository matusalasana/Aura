import { create } from "zustand";
import { persist } from "zustand/middleware";

type SignupData = {
  name: string;
  email: string;
  password: string;
};

type SignupStoreState = {
  data: SignupData;
  setData: (data: SignupData) => void;
};

export const useSignupStore = create<SignupStoreState>()(
  
  persist(
    
    (set) => ({
      data: {
        name: "",
        email: "",
        password: "",
      },

      setData: (data) => set({ data }),
    }),
    
    {
      name: "signup-storage",
    }
    
  )
  
);