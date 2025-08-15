import { NextFunction, Request, Response } from "express";
import jwthelper from "../utils/jwtHelper";
import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../error";

// Extend Express Request to include 'user' property
declare module "express" {
  interface Request {
    user?: string | JwtPayload; // You can replace `any` with your User type if available
  }
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new UnauthorizedError("Unauthorized");
  }
  try {
    const user = jwthelper.verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthorizedError("Unauthorized");
  }
}
