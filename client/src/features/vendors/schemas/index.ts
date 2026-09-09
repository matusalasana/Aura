import { z } from "zod";

export const vendorApplicationSchema = z.object({
  store_name: z
    .string()
    .min(3, "Store name must be at least 3 characters")
    .max(50, "Store name must not exceed 50 characters")
    .trim(),
    
  logo: z
    .instanceof(File, {
      message: "Logo is required",
    }),

  banner: z
    .instanceof(File, {
      message: "Banner is required",
    }),

  license: z
    .instanceof(File, {
      message: "License is required",
    }),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  
  tin_number: z
    .string()
    .min(10, "TIN number must be at least 10 characters"),
    
  payout_email: z
    .string()
    .email(),
});



export type VendorApplicationInput = z.infer<
  typeof vendorApplicationSchema
>;