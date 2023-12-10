import express from "express";
import {courseControllers} from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import {CouresValidations} from "./course.validation";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CouresValidations.courseValidationSchema),
  courseControllers.createCourse
);
router.get("/", courseControllers.getAllCourses);
router.get("/:id", courseControllers.getSingleCourse);
router.delete("/:id", courseControllers.deleteCourse);
router.put(
  "/:courseId/assign-faculties",
  validateRequest(CouresValidations.courseFacultyValidationSchema),
  courseControllers.assignFaculties
);
router.patch(
  "/:id",
  validateRequest(CouresValidations.updateCourseValidationSchema),
  courseControllers.updateCourse
);

export const CourseRoutes = router;
