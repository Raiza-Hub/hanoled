import z from "zod";

export const onboardingSchema = z.object({
  firstName: z
    .string()
    .min(1, "Name is required")
    .max(256, "Name is too long"),

//   lastName: z
//     .string()
//     .min(1, "Last name is required")
//     .max(50, "Last name is too long"),

//   age: z
//     .string()
//     .refine((val) => /^\d+$/.test(val), "Age must be a number")
//     .refine((val) => Number(val) >= 13, "You must be at least 13 years old"),

//   street: z
//     .string()
//     .min(1, "Street is required")
//     .max(100, "Street name is too long"),

  city: z
    .string()
    .min(1, "City is required")
    .max(50, "City name is too long"),

  state: z
    .string()
    .min(1, "State is required")
    .max(50, "State name is too long"),

//   zip: z
//     .string()
//     .regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),

//   email: z
//     .email("Invalid email address"),

//   password: z
//     .string()
//     .min(8, "Password must be at least 8 characters long")
//     .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//     .regex(/\d/, "Password must contain at least one number"),
});


export type TonboardingSchema = z.infer<typeof onboardingSchema>;