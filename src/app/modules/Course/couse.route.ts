import express from "express";
import {courseControllers} from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import {CouresValidations} from "./course.validation";
import auth from "../../middlewares/auth";
import {USER_ROLE} from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CouresValidations.courseValidationSchema),
  courseControllers.createCourse
);

router.get(
  "/",
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  courseControllers.getAllCourses
);
router.get(
  "/:id",
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  courseControllers.getSingleCourse
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  courseControllers.deleteCourse
);
router.put(
  "/:courseId/assign-faculties",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CouresValidations.facultiesWithCourseValidationSchema),
  courseControllers.assignFaculties
);

router.get(
  "/:courseId/get-faculties",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  courseControllers.getFacultiesWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CouresValidations.facultiesWithCourseValidationSchema),
  courseControllers.removeFaculties
);
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CouresValidations.updateCourseValidationSchema),
  courseControllers.updateCourse
);

export const CourseRoutes = router;
