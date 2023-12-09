import express from "express";
import {facultyControllers} from "./faculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import {updateFacultyValidationSchema} from "./faculty.validation";

const router = express.Router();

router.get("/", facultyControllers.getAllFaculties);
router.get("/:id", facultyControllers.getSingleFaculty);
router.patch(
  "/:id",
  validateRequest(updateFacultyValidationSchema),
  facultyControllers.updateFaculty
);
router.delete("/:id", facultyControllers.deleteFaculty);

export const facultyRoutes = router;
