import { z } from "zod";

export const createVendorSchema = z.object({
  store_name: z
    .string()
    .min(3, "Store name must be at least 3 characters")
    .max(50, "Store name must not exceed 50 characters")
    .trim(),

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