import { z } from "zod";

export const SignIn = z.object({
  email: z.email({
    error: "Email is required",
  }),
  password: z.string().min(8, {
    error: "Password is required",
  }),
});

export const SignUp = z.object({
  name: z
    .string()
    .min(1, { error: "Name is required." })
    .max(50, { error: "Name must be at most 50 characters long." }),

  email: z
    .email({ error: "Email is required" }),

  password: z
    .string()
    .min(8, { error: "Password is required" })
    .refine((val) => /[0-9]/.test(val), {
      error: "Password must contain at least one number.",
    })
    .refine((val) => /[a-z]/.test(val), {
      error: "Password must contain at least one lowercase letter.",
    })
    .refine((val) => /[A-Z]/.test(val), {
      error: "Password must contain at least one uppercase letter.",
    }),
});

export const updateAccount = z.object({
  name: z
    .string()
    .min(1, { error: "Spreadsheet name is required." })
    .max(256, { error: "Spreadsheet must be at most 256 characters long." })
    .optional(),
  email: z
    .email({ error: "Email is required." })
    .optional(),
  logo: z
    .instanceof(File, { error: "Student photo is required" })
    .optional(),
  // password: z.string().min(8, {
  //   error: "Password is required",
  // }),
});

export const otpSchema = z
  .string()
  .regex(/^\d{7}$/, "OTP must be exactly 7 digits")

export const forgetPassword = z.object({
  email: z.email({ error: "Email is required" })
})

export const resetPassword = z
  .object({
    email: z.email({ error: "Email is required" }),

    newPassword: z
      .string()
      .min(8, { error: "Password is required" })
      .refine((val) => /[0-9]/.test(val), {
        error: "Password must contain at least one number.",
      })
      .refine((val) => /[a-z]/.test(val), {
        error: "Password must contain at least one lowercase letter.",
      })
      .refine((val) => /[A-Z]/.test(val), {
        error: "Password must contain at least one uppercase letter.",
      }),

    confirmPassword: z.string(),

    otp: z
      .string()
      .regex(/^\d{7}$/, "OTP must be exactly 7 digits")
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // attach the error to the confirmPassword field
  });

export type TSignIn = z.infer<typeof SignIn>;
export type TSignUp = z.infer<typeof SignUp>;
export type TUpdateAccount = z.infer<typeof updateAccount>;
export type TForgetPassword = z.infer<typeof forgetPassword>
export type TresetPassword = z.infer<typeof resetPassword>
