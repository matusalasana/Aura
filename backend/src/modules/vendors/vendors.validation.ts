import { z } from "zod";

export const createVendorSchema = z.object({
  store_name: z
    .string()
    .min(3, "Store name must be at least 3 characters")
    .max(50, "Store name must not exceed 50 characters")
    .trim(),
    
  logo_url: z
    .string()
    .min(1, "Logo url is required"),
    
  banner_url: z.string(),
  
  status: z.string(),
  
  payout_email: z.string(),
  
  tin_number: z.string(),
  
  logo_public_id: z.string(),
  
  banner_public_id: z.string(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters")
    .trim(),
});


export const updateVendorSchema = z.object({
  store_name: z
    .string()
    .min(3, "Store name must be at least 3 characters")
    .max(50, "Store name must not exceed 50 characters")
    .trim()
    .optional(),
  
  logo_url: z
    .string()
    .min(1, "Logo url is required")
    .optional(),
    
  banner_url: z
    .string()
    .optional(),
  
  status: z
    .string()
    .optional(),
  
  payout_email: z
    .string()
    .optional(),
  
  tin_number: z
    .string()
    .optional(),
  
  logo_public_id: z
    .string()
    .optional(),
  
  banner_public_id: z
    .string()
    .optional(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters")
    .trim()
    .optional(),
});


export const rejectVendorSchema = z.object({
  reason: z
    .string()
    .min(5, "Rejection reason must be at least 5 characters")
    .max(300, "Rejection reason must not exceed 300 characters")
    .trim(),
});


export type CreateVendorInput = z.infer<
  typeof createVendorSchema
>;

export type UpdateVendorInput = z.infer<
  typeof updateVendorSchema
>;

export type RejectVendorInput = z.infer<
  typeof rejectVendorSchema
>;