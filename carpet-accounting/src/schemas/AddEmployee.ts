//TODO.................
import { z } from "zod";

export const AddEmployeeSchema = z.object({
  name: z.string().min(1),
  last_name: z.string().min(1),
  section: z.string().min(1),
});
