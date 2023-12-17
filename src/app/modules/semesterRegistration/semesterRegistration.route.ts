import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {SemesterRegistrationValidations} from "./semesterRegistration.validation";

const router = express.Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationController.createSemesterRegistration
);

router.get(
  "/:id",
  SemesterRegistrationController.getSingleSemesterRegistration
);

router.patch("/:id", SemesterRegistrationController.updateSemesterRegistration);

router.get("/", SemesterRegistrationController.getAllSemesterRegistrations);

export const SemesterRegistrationRoutes = router;
