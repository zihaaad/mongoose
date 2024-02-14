import express from "express";
import {StudentControllers} from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import {updateStudentValidationSchema} from "./student.validation";
import auth from "../../middlewares/auth";
import {USER_ROLE} from "../user/user.constant";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentControllers.getStudents
);
router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getSingleStudent
);
router.patch(
  "/:id",
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent
);
router.delete("/:id", StudentControllers.deleteStudent);

export const StudentRoutes = router;
