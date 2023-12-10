import {z} from "zod";

const preRequisiteValidationCourses = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false).optional(),
});

const courseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(preRequisiteValidationCourses).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

const updatePreRequisiteValidationCourses = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteValidationCourses)
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const CouresValidations = {
  courseValidationSchema,
  updateCourseValidationSchema,
};
