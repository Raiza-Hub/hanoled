import z from "zod";


export const subjectSchema = z.object({
  subjectName: z
    .string()
    .min(1, { error: "Subject name is required." })
    .max(256, { error: "Subject name must be at most 256 characters long." }),
});


export const classLevelSchema = z.object({
  className: z
    .string()
    .min(1, { error: "Class name is required." })
    .max(256, { error: "Class name must be at most 256 characters long." }),
  level: z
    .string()
    .min(1, { error: "Grade is required." }),
  limit: z
    .number()
    .min(1, { error: "Class limit must be at least 1."  }),
  memberId: z
    .string()
    .min(1, { error: "Class teacher is required." }),
});

export const inviteSchema = z.object({
  emails: z
    .array(
      z.object({
        value: z.email("Invalid email address"),
      })
    )
    .min(1, "At least one email is required"),
  
  role: z
    .string()
    .min(1, { error: "Role is required." })
})

export const spreadSheetSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Spreadsheet name is required." })
    .max(256, { error: "Spreadsheet must be at most 256 characters long." }),
  class: z
    .string()
    .min(1, { error: "Class is required." }),
  subject: z
    .string()
    .min(1, { error: "Subject is required."  }),
});

export const studentSchema = z.object({
    firstName: z.string().min(1, { error: "First name is required" }),
    lastName: z.string().min(1, { error: "Last name is required" }),
    middleName: z.string().min(1, { error: "Middle name is required" }),
    image: z.instanceof(File, { error: "Student photo is required" }),
    gender: z.enum(["male", "female"], { error: "Gender is required" }),
    dateOfBirth: z.date({ error: "Date of birth is required" }),
    guardianFullName: z.string().min(1, { error: "Guardian full name is required" }),
    guardianPhone: z
        .string()
        .min(10, { error: "Phone number is required" })
        .max(20, { error: "Phone number must required" }),
    guardianEmail: z.email({ error: "Invalid email address" }),
    address: z.string().min(1, { error: "Address is required" }),
    className: z.string().min(1, { error: "Class is required" }),
    admissionDate: z.date({ error: "Admission date is required" })
});

export const parentSchema = z.object({
  emails: z
    .array(
      z.object({
        value: z.email("Invalid email address"),
      })
    )
    .min(1, "At least one email is required"),
  
  studentIds: z
    .array(z.string())
    .min(1, "Select at least one student")
})


export type TsubjectSchema = z.infer<typeof subjectSchema>;
export type TclassLevelSchema = z.infer<typeof classLevelSchema>;
export type TinviteSchema = z.infer<typeof inviteSchema>;
export type TspreadSheetSchema = z.infer<typeof spreadSheetSchema>;
export type TstudentSchema = z.infer<typeof studentSchema>;
export type TparentSchema = z.infer<typeof parentSchema>;