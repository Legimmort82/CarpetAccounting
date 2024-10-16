import { z } from "zod";

export const AddHelpSchema = z.object({
  price: z.number().min(1),
  date: z.string().min(1),
  employee: z.string().min(1),
});
