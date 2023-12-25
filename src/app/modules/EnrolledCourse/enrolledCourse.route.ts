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

router.patch(
  "/update-enrolled-course-marks",
  auth("faculty"),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks
);

export const EnrolledCourseRoutes = router;
