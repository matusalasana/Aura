import { z } from "zod";

export const productSchema = z.object({

  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description is too short"),

  price: z
    .number()
    .positive(),

  stock: z
    .number()
    .int()
    .min(0),

  category_id: z
    .string()
    .min(1, "Category required"),

  thumbnail: z
    .instanceof(File, {
      message: "Thumbnail is required",
    }),

  images: z
    .array(z.instanceof(File))
    .max(5),

});

export type ProductFormData = z.infer<typeof productSchema>;