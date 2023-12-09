import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {updateAdminValidationSchema} from "./admin.validation";
import {adminControllers} from "./admin.controller";

const router = express.Router();

router.get("/", adminControllers.getAllAdmins);
router.get("/:adminId", adminControllers.getSingleAdmin);
router.patch(
  "/:adminId",
  validateRequest(updateAdminValidationSchema),
  adminControllers.updateAdmin
);
router.delete("/:adminId", adminControllers.deleteAdmin);

export const adminRoutes = router;
