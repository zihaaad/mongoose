import express from "express";
import {courseControllers} from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import {CouresValidations} from "./course.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-course",
  auth("admin"),
  validateRequest(CouresValidations.courseValidationSchema),
  courseControllers.createCourse
);
router.get("/", courseControllers.getAllCourses);
router.get(
  "/:id",
  auth("student", "faculty", "admin"),
  courseControllers.getSingleCourse
);
router.delete("/:id", auth("admin"), courseControllers.deleteCourse);
router.put(
  "/:courseId/assign-faculties",
  validateRequest(CouresValidations.facultiesWithCourseValidationSchema),
  courseControllers.assignFaculties
);
router.delete(
  "/:courseId/remove-faculties",
  validateRequest(CouresValidations.facultiesWithCourseValidationSchema),
  courseControllers.removeFaculties
);
router.patch(
  "/:id",
  auth("admin"),
  validateRequest(CouresValidations.updateCourseValidationSchema),
  courseControllers.updateCourse
);

export const CourseRoutes = router;
