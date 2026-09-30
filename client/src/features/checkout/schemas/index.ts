import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Enter a valid email"),
  phone: z.string().min(9, "Enter a valid phone number"),
  address: z.string().min(3, "Address is required"),
  city: z.string().min(2, "City is required"),
  subcity: z.string().min(2, "Sub-city is required"),
  notes: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;