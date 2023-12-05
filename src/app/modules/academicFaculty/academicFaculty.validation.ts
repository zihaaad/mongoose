import {z} from "zod";

const academicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "academic faculty must be stirng",
  }),
});

export const AcademicFacultyValidation = {
  academicFacultyValidationSchema,
};
