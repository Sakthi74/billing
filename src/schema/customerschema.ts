import { z } from "zod";

export const customerschema = z.object({
  fullName: z.string().min(1, "Name is Required"),
  email: z.string().email("Valid Email is Required"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must contain 10 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "state field is mandatory"),
});

export type customerFormData = z.infer<typeof customerschema>;
