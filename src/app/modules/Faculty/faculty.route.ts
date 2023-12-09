import express from "express";
import {facultyControllers} from "./faculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import {updateFacultyValidationSchema} from "./faculty.validation";

const router = express.Router();

router.get("/", facultyControllers.getAllFaculties);
router.get("/:facultyId", facultyControllers.getSingleFaculty);
router.patch(
  "/:facultyId",
  validateRequest(updateFacultyValidationSchema),
  facultyControllers.updateFaculty
);
router.delete("/:facultyId", facultyControllers.deleteFaculty);

export const facultyRoutes = router;
