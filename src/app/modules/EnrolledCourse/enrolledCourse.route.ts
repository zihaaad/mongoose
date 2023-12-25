import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {EnrolledCourseValidations} from "./enrolledCourse.validation";
import auth from "../../middlewares/auth";
import {EnrolledCourseControllers} from "./enrolledCourse.controller";

const router = express.Router();

router.post(
  "/create-enrolled-course",
  auth("student"),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema
  ),
  EnrolledCourseControllers.createEnrolledCourse
);

export const EnrolledCourseRoutes = router;
