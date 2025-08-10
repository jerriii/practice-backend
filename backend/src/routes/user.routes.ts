import express from "express";
import UserController from "../controllers/user.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/", authMiddleware, UserController.getAllUsers);
router.get("/:userId",authMiddleware, UserController.getUserById);
router.put("/:userId",authMiddleware, UserController.updateUser);
router.delete("/:userId",authMiddleware, UserController.deleteUser);

export default router;
