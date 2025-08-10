import { Request, Response } from "express";
import UserServices from "../services/user.services";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const user = await UserServices.registerUser(req.body);
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred" });
      }
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await UserServices.loginUser(email, password);
      res.status(200).json({ message: "User Logged In Successfully", data:token });
    } catch(error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getAllUsers(req: Request, res: Response) {
    const users = await UserServices.getAllUsers();
    res.status(200).json({ message: "Users List", users });
  }
  async getUserById(req: Request, res: Response) {
    if (
      !req.user ||
      typeof req.user !== "object" ||
      req.user.id !== req.params.userId
    ) {
      res.status(403).json({ error: "Forbidden: Access denied" });
    }

    const user = await UserServices.getUserById(req.params.userId);
    if (user) {
      res.status(200).json({ message: "User fetched Successfully", user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const user = await UserServices.updateUser(req.params.userId, req.body);
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred" });
      }
    }
  }
  async deleteUser(req: Request, res: Response) {
    const user = await UserServices.deleteUser(req.params.userId);
    if (user) {
      res.status(200).json({ message: "User deleted successfully", user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
}

export default new UserController();
