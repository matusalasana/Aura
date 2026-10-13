
import { z } from "zod";

export const planSchema = z.object({
  name: z.string().trim().min(1, "Plan name is required"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required"),
  monthlyPrice: z
    .string()
    .regex(/^\d+(?:\.\d{1,2})?$/, "Price must be a valid amount"),
  yearlyPrice: z
    .string()
    .regex(/^\d+(?:\.\d{1,2})?$/, "Price must be a valid amount"),
  iconName: z.string().trim().min(1, "Icon name is required"),
  cta: z.string().trim().min(1, "Button text is required"),
  features: z
    .array(z.string().trim().min(1, "Feature cannot be empty"))
    .min(1, "Add at least one feature"),
});

export type PlanFormValues = z.infer<typeof planSchema>;