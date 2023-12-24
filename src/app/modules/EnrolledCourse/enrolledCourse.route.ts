import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {EnrolledCourseValidations} from "./enrolledCourse.validation";

const router = express.Router();

router.post(
  "/create-enrolled-course",
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema
  )
);

export const EnrolledCourseRoutes = router;
