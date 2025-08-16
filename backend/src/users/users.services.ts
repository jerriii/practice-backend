import bcrypt from "bcryptjs";
import jwthelper from "../utils/jwtHelper";
import passwordHelper from "../utils/passwordHelper";
import { IUser } from "./users.interface";
import { UserRepository } from "./users.repository";
import { BadRequestError, ValidationError } from "../error";
import { UsersDto } from "./users.dto";
import { Request } from "express";
import { validateRequest } from "../utils/validateRequest";

export class UserServices {
  constructor(private userRepository: UserRepository) {}

  async registerUser(req: Request): Promise<UsersDto> {
    await validateRequest(req);

    const hashedPassword = await passwordHelper.hashPassword(
      req.body.password!
    );
    req.body.password = hashedPassword;
    try {
      const registeredUser = await this.userRepository.createUser(req.body);
      if (!registeredUser) {
        throw new BadRequestError("Failed to create user");
      }
      return UsersDto.fromEntity(registeredUser);
    } catch (error) {
      console.error(error);
      throw new BadRequestError("Failed to create user");
    }
  }

  async updateUser(userId: string, req: Request): Promise<UsersDto> {
    await validateRequest(req);

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await this.userRepository.updateUser(userId, req.body);
    if (!updatedUser) {
      throw new ValidationError("User not found");
    }
    return UsersDto.fromEntity(updatedUser);
  }

  async deleteUser(userId: string): Promise<IUser | null> {
    return await this.userRepository.deleteUser(userId);
  }

  async getCurrentUser(userId: string): Promise<UsersDto | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return null;
    }
    return UsersDto.fromEntity(user);
  }

  async loginUser(req: Request): Promise<{ token: string }> {
    await validateRequest(req);

    const user = await this.userRepository.findByEmail(req.body.email);
    if (!user) {
      throw new ValidationError("User not found");
    }

    const validPassword = await passwordHelper.comparePasswords(
      req.body.password,
      user.password!
    );
    if (!validPassword) {
      throw new Error("Invalid Credentials");
    }
    const token = jwthelper.generateToken(user);
    return { token };
  }

  async getAllUsers(): Promise<UsersDto[]> {
    const users = await this.userRepository.getAllUsers();
    return UsersDto.fromEntities(users);
  }

  async getUserById(userId: string): Promise<UsersDto | null> {
    const user = await this.userRepository.findById(userId);
    return user ? UsersDto.fromEntity(user) : null;
  }
}
