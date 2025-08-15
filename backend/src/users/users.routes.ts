import express from "express";
import UsersController from "./users.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", UsersController.register);
router.post("/login", UsersController.login);
router.get("/", authMiddleware, UsersController.getAllUsers);
router.get("/:userId", authMiddleware, UsersController.getUserById);
router.put("/:userId", authMiddleware, UsersController.updateUser);
router.delete("/:userId", authMiddleware, UsersController.deleteUser);

export default router;
