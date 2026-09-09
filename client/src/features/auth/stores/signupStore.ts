import { create } from "zustand";

type SignupData = {
  name: string;
  email: string;
  password: string;
};

type SignupStore = {
  data: SignupData;
  setData: (data: SignupData) => void;
  clearData: () => void;
};

export const useSignupStore = create<SignupStore>((set) => ({
  data: {
    name: "",
    email: "",
    password: "",
  },

  setData: (data) => set({ data }),

  clearData: () =>
    set({
      data: {
        name: "",
        email: "",
        password: "",
      },
    }),
}));