import { Request, Response } from "express";
import { UserServices } from "./users.services";
import { UserRepository } from "./users.repository";
import { sendResponse } from "../utils/sendResponse";
import { handleError } from "../utils/handleError";
import { ValidationError } from "../error";

export interface JwtUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

class UserController {
  constructor(private userServices: UserServices) {}

  register = async (req: Request, res: Response) => {
    try {
      const user = await this.userServices.registerUser(req);
      sendResponse(res, {
        status: "success",
        code: 201,
        message: "User registered successfully",
        data: user.toResponse(),
      });
    } catch (error) {
      if (error instanceof Error) {
        handleError.handle(res, error);
      } else {
        handleError.handle(res, new Error("An unknown error occurred"));
      }
    }
  };
  login = async (req: Request, res: Response) => {
    try {
      const data = await this.userServices.loginUser(req);
      sendResponse(res, {
        status: "success",
        code: 200,
        message: "User Logged In Successfully",
        data,
      });
    } catch (error) {
      if (error instanceof Error) {
        handleError.handle(res, error);
      } else {
        handleError.handle(res, new Error("Internal Server Error"));
      }
    }
  };
  getCurrentUser = async (req: Request, res: Response) => {
    const user = await this.userServices.getCurrentUser(
      (req.user as JwtUser).id
    );
    if (user) {
      sendResponse(res, {
        status: "success",
        code: 200,
        message: "Current User fetched Successfully",
        data: user.toResponse(),
      });
    } else {
      handleError.handle(res, new ValidationError("User not found"));
    }
  };
  getAllUsers = async (req: Request, res: Response) => {
    const users = await this.userServices.getAllUsers(req);
    sendResponse(res, {
      status: "success",
      code: 200,
      message: "Users List",
      data: users.map((user) => user.toResponse()),
    });
  };
  getUserById = async (req: Request, res: Response) => {
    if (
      !req.user ||
      typeof req.user !== "object" ||
      req.user.id !== req.params.userId
    ) {
      throw new ValidationError("Forbidden: Access denied");
    }

    const user = await this.userServices.getUserById(req.params.userId);
    if (user) {
      sendResponse(res, {
        status: "success",
        code: 200,
        message: "User fetched Successfully",
        data: user.toResponse(),
      });
    } else {
      handleError.handle(res, new ValidationError("User not found"));
    }
  };
  updateUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userServices.updateUser(req.params.userId, req);
      sendResponse(res, {
        status: "success",
        code: 200,
        message: "User updated successfully",
        data: user.toResponse(),
      });
    } catch (error) {
      if (error instanceof Error) {
        handleError.handle(res, error);
      } else {
        handleError.handle(res, new Error("An unknown error occurred"));
      }
    }
  };
  deleteUser = async (req: Request, res: Response) => {
    const user = await this.userServices.deleteUser(req.params.userId);
    if (user) {
      sendResponse(res, {
        status: "success",
        code: 200,
        message: "User deleted successfully",
      });
    } else {
      handleError.handle(res, new ValidationError("User not found"));
    }
  };
}

function CreateUserController() {
  const userRepository = new UserRepository();
  const userServices = new UserServices(userRepository);
  return new UserController(userServices);
}

export const userController = CreateUserController();
