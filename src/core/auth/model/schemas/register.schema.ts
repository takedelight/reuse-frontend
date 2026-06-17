import { z as zod } from "zod";

export const registerSchema = zod
  .object({
    username: zod
      .string({ error: "errors.client.invalid_username" })
      .min(4, { message: "errors.client.invalid_username.min_length" })
      .max(30, { message: "errors.client.invalid_username.max_length" }),

    email: zod.email({ message: "errors.client.invalid_email" }),

    password: zod
      .string()
      .min(8, { message: "errors.client.invalid_password.min_length" })
      .max(32, { message: "errors.client.invalid_password.max_length" }),

    confirmPassword: zod.string(),

    isRememberMe: zod.boolean().default(false).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "errors.client.passwords_dont_match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaInput = zod.input<typeof registerSchema>;
export type RegisterSchemaOutput = zod.output<typeof registerSchema>;
