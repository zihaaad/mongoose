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

export const CouresValidations = {
  courseValidationSchema,
};
