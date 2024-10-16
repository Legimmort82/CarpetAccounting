//TODO...................
import { z } from "zod";

export const AddCarpetSchema = z.object({
  arz: z.string().min(1, { message: "فیلد را تکمیل کنید" }),
  tool: z.string().min(1, { message: "فیلد را تکمیل کنید" }),
  metraj: z.string().min(1, { message: "فیلد را تکمیل کنید" }),
  naghsheh: z.string().min(1, { message: "فیلد را تکمیل کنید" }),
  rang: z.string().min(1, { message: "فیلد را تکمیل کنید" }),
  serial: z.string().min(1, { message: "فیلد را تکمیل کنید" }),
  code: z.string().min(1, { message: "فیلد را تکمیل کنید" }),
  isRectangle: z.boolean(),
  shirazeh: z.optional(z.number()),
  shirazehKhoroug: z.optional(z.string()),
  shirazehVouroud: z.optional(z.string()),
  cheleh: z.optional(z.number()),
  chelehKhoroug: z.optional(z.string()),
  chelehVouroud: z.optional(z.string()),
  gereh: z.optional(z.number()),
  gerehKhoroug: z.optional(z.string()),
  gerehVouroud: z.optional(z.string()),
});
