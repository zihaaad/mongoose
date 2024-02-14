import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {AcademicFacultyValidation} from "./academicFaculty.validation";
import {academicFacultyControllers} from "./academicFaculty.controller";
import auth from "../../middlewares/auth";
import {USER_ROLE} from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyControllers.createAcademicFaculty
);

router.get("/", auth(), academicFacultyControllers.getAllAcademicFaculies);
router.get("/:facultyId", academicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  academicFacultyControllers.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;
