import express from "express";
import {AcamedicSemesterControllers} from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import {AcademicSemisterValidations} from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(AcademicSemisterValidations.academicSemisterValidationSchema),
  AcamedicSemesterControllers.createAcademicSemster
);
router.get("/", AcamedicSemesterControllers.getAllAcademicSemesters);
router.get("/:id", AcamedicSemesterControllers.getSingleAcademicSemester);

export const AcademicSemesterRoutes = router;
