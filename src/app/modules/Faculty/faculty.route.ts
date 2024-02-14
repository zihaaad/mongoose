import express from "express";
import {facultyControllers} from "./faculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import {updateFacultyValidationSchema} from "./faculty.validation";
import auth from "../../middlewares/auth";
import {USER_ROLE} from "../user/user.constant";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  facultyControllers.getAllFaculties
);
router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  facultyControllers.getSingleFaculty
);
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateFacultyValidationSchema),
  facultyControllers.updateFaculty
);
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  facultyControllers.deleteFaculty
);

export const facultyRoutes = router;
