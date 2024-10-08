import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;
export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "لطفا نام کاربری خود را وارد کنید" }),
  password: z
    .string()
    .min(1, { message: "لطفا رمز عبور خود را وارد کنید" })
    .min(5, { message: "رمز عبور باید بزرگتر از 5 کاراکتر باشد" })
    .regex(passwordRegex, {
      message:
        "رمز عبور باید بیش از 8 کاراکتر باشد و شامل حروف بزرگ و اعداد باشد",
    }),
});