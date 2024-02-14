import express from "express";
import {academicDepartmentControllers} from "./academicDepartment.controller";
import validateRequest from "../../middlewares/validateRequest";
import {AcademicDepartmentValidations} from "./academicDepartment.validation";
import auth from "../../middlewares/auth";
import {USER_ROLE} from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-department",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicDepartmentValidations.academicDepartmentValidationSchema
  ),
  academicDepartmentControllers.createAcademicDepartment
);
router.get("/", academicDepartmentControllers.getAllAcademicDepartments);
router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema
  ),
  academicDepartmentControllers.updateAcademicDepartment
);
router.get(
  "/:departmentId",
  academicDepartmentControllers.getSingleAcademicDepartment
);

export const academicDepartmentRoutes = router;
