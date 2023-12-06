import {z} from "zod";

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Academic Department Name must be string",
    }),
    academicFaculty: z.string({
      required_error: "Academic Faculty is required",
      invalid_type_error: "Academic Faculty must be string",
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Academic Department Name must be string",
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: "Academic Faculty is required",
        invalid_type_error: "Academic Faculty must be string",
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidations = {
  academicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
