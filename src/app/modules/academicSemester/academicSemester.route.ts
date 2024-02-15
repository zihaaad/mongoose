import express from "express";
import {AcamedicSemesterControllers} from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import {AcademicSemisterValidations} from "./academicSemester.validation";
import auth from "../../middlewares/auth";
import {USER_ROLE} from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-semester",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(AcademicSemisterValidations.academicSemisterValidationSchema),
  AcamedicSemesterControllers.createAcademicSemster
);
router.get(
  "/",
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  AcamedicSemesterControllers.getAllAcademicSemesters
);
router.get(
  "/:semesterId",
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  AcamedicSemesterControllers.getSingleAcademicSemester
);
router.patch(
  "/:semesterId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    AcademicSemisterValidations.updateAcademicSemesterValidationSchema
  ),
  AcamedicSemesterControllers.updateAcademicSemester
);

export const AcademicSemesterRoutes = router;
