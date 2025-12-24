import z from "zod";

export const SOCIALS = ["facebook", "instagram", "twitter", "linkedin"] as const


export const onboardingSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Name is required." })
    .max(256, { error: "Name must be at most 256 characters long." }),

  slug: z
    .string()
    .min(1, { error: "Slug is required." })
    .max(256, { error: "Slug must be at most 256 characters long." })
    .regex(/^[a-z0-9-]+$/, {
      error: "Slug can only contain lowercase letters, numbers, and hyphens.",
    }),

  file: z
    .union([z.instanceof(File), z.url().optional().or(z.literal(""))]),
  
  email: z
    .email({ error: "Invalid email address" }),

  country: z
    .string()
    .min(1, { error: "Country is required" }),
  
  address: z
    .string()
    .min(1, { error: "Address is required" }),

  city: z
    .string()
    .min(1, { error: "City is required" })
    .max(256, { error: "City must be at most 256 characters long." }),

  state: z
    .string()
    .min(1, { error: "State is required" }),

  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, "Invalid zip code format"),
  
  category: z.enum(["primary", "secondary", "tertiary"], {
    error: "Category is required",
  }),

  schoolType: z.enum(["public", "private", "federal", "state"], {
   error: "School type is required",
  }),

  website: z
    .url({ error: "Invalid website URL" })
    .optional()
    .or(z.literal("")), 
  
  socialLinks:  z
  .array(
    z.object({
      type: z.enum(["facebook", "instagram", "twitter", "linkedin"]),
      url: z.url({error:  "Invalid website URL" }).optional().or(z.literal("")),
    })
  ).default([]).optional(),

  
  phone: z
    .string()
    .min(11, { error: "Phone number is required" })
    .max(20),
});



export const updateOnboardingSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Name is required." })
    .max(256, { error: "Name must be at most 256 characters long." })
    .optional(),

  slug: z
    .string()
    .min(1, { error: "Slug is required." })
    .max(256, { error: "Slug must be at most 256 characters long." })
    .regex(/^[a-z0-9-]+$/, {
      error: "Slug can only contain lowercase letters, numbers, and hyphens.",
    })
    .optional(),

  logo: z
    .union([z.instanceof(File), z.url().optional().or(z.literal(""))])
    .optional(),
  
  email: z
    .email({ error: "Invalid email address" })
    .optional(),

  country: z
    .string()
    .min(1, { error: "Country is required" })
    .optional(),
  
  address: z
    .string()
    .min(1, { error: "Address is required" })
    .optional(),

  city: z
    .string()
    .min(1, { error: "City is required" })
    .max(256, { error: "City must be at most 256 characters long." })
    .optional(),

  state: z
    .string()
    .min(1, { error: "State is required" })
    .optional(),

  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, "Invalid zip code format")
    .optional(),
  
  category: z.enum(["primary", "secondary", "tertiary"], {
    error: "Category is required",
  }).optional(),

  schoolType: z.enum(["public", "private", "federal", "state"], {
   error: "School type is required",
  }).optional(),

  website: z
    .url({ error: "Invalid website URL" })
    .optional()
    .or(z.literal(""))
    .optional(), 
  
  socialLinks:  z
  .array(
    z.object({
      type: z.enum(["facebook", "instagram", "twitter", "linkedin"]),
      url: z.url({error:  "Invalid website URL" }).optional().or(z.literal("")),
    })
  ).default([]).optional(),

  
  phone: z
    .string()
    .min(11, { error: "Phone number is required" })
    .max(20)
    .optional(),
});



export type TonboardingSchema = z.infer<typeof onboardingSchema>;
export type TupdateOnboardingSchema = z.infer<typeof updateOnboardingSchema>;