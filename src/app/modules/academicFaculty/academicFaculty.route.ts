import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {AcademicFacultyValidation} from "./academicFaculty.validation";
import {academicFacultyControllers} from "./academicFaculty.controller";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyControllers.createAcademicFaculty
);

router.get("/", academicFacultyControllers.getAllAcademicFaculies);
router.get("/:facultyId", academicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  academicFacultyControllers.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;
