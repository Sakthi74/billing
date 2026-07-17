import { z } from "zod";

export const invoiceSchema = z.object({
  customerId: z.string().min(1, "Select a customer"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  items: z
    .array(
      z.object({
        description: z.string().min(1, "Description is required"),
        quantity: z.number().min(1),
        price: z.number().min(0),
        tax: z.number().min(0).max(100),
      }),
    )
    .min(1, "Add at least one item"),
});

export type invoiceFormData = z.infer<typeof invoiceSchema>;
