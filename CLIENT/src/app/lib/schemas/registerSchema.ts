import z from "zod";

const passwordValidation = new RegExp(
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+\-=|]).{8,32}$/,
);

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().regex(passwordValidation, {
    message:
      "Password must be contain 1 lowercase character, 1 uppercase character, 1 number, 1 special and be 6 - 10 characters ",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
