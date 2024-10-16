import { z } from "zod";

export const AddHelpSchema = z.object({
  money: z.string().min(1),
  date: z.string().min(1),
  worker: z.number().min(1),
});
