import {z} from "zod";

const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "academic faculty must be stirng",
    }),
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: z
    .object({
      name: z.string({
        invalid_type_error: "academic faculty must be stirng",
      }),
    })
    .optional(),
});

export const AcademicFacultyValidation = {
  academicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
