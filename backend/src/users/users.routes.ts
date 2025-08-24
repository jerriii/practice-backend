import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { userController } from "./users.controller";
import DynamicUpload from "../middlewares/upload";
import validators from "../middlewares/validators";
const router = express.Router();

const imageUpload = new DynamicUpload({
  fieldName: "avatar",
  uploadType: "none",
}).handle();

router.post(
  "/register",
  imageUpload,
  validators.user.validateUsersCreate,
  validators.user.handleValidationErrors,
  userController.register
);
router.post(
  "/login",
  imageUpload,
  validators.user.validateUsersLogin,
  validators.user.handleValidationErrors,
  userController.login
);
router.get("/profile", authMiddleware, userController.getCurrentUser);
router.get("/", authMiddleware, userController.getAllUsers);
router.get("/:userId", authMiddleware, userController.getUserById);
router.put(
  "/:userId",
  authMiddleware,
  imageUpload,
  validators.user.validateUsersUpdate,
  validators.user.handleValidationErrors,
  userController.updateUser
);
router.delete("/:userId", authMiddleware, userController.deleteUser);

export default router;
