import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { userController } from "./users.controller";
import DynamicUpload from "../middlewares/upload";
import validators from "../middlewares/validators";
const router = express.Router();

router.post(
  "/register",
  new DynamicUpload({ fieldName: "avatar", uploadType: "none" }).handle(),
  validators.validateUsersCreate,
  userController.register
);
router.post(
  "/login",
  new DynamicUpload({ fieldName: "avatar", uploadType: "none" }).handle(),
  validators.validateUsersLogin,
  userController.login
);
router.get("/profile", authMiddleware, userController.getCurrentUser);
router.get("/", authMiddleware, userController.getAllUsers);
router.get("/:userId", authMiddleware, userController.getUserById);
router.put(
  "/:userId",
  authMiddleware,
  new DynamicUpload({ fieldName: "avatar", uploadType: "none" }).handle(),
  validators.validateUsersUpdate,
  userController.updateUser
);
router.delete("/:userId", authMiddleware, userController.deleteUser);

export default router;
