import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {updateAdminValidationSchema} from "./admin.validation";
import {adminControllers} from "./admin.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth("superAdmin", "admin"), adminControllers.getAllAdmins);
router.get("/:id", adminControllers.getSingleAdmin);
router.patch(
  "/:id",
  validateRequest(updateAdminValidationSchema),
  adminControllers.updateAdmin
);
router.delete("/:id", adminControllers.deleteAdmin);

export const adminRoutes = router;
