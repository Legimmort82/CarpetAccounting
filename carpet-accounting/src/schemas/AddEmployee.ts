//TODO.................
import { z } from "zod";

export const AddEmployeeSchema = z.object({
  name: z.optional(z.string()),
  last_name: z.string().min(1),
  section_name: z.string().min(1),
});
