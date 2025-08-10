import { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import jwthelper from "../utils/jwtHelper";
import passwordHelper from "../utils/passwordHelper";

class UserServices {
  async registerUser(userData: Partial<IUser>): Promise<IUser> {
    const existinguser = await UserRepository.findByEmail(userData.email!);
    if (existinguser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await passwordHelper.hashPassword(
      userData.password!
    );
    userData.password = hashedPassword;
    return await UserRepository.createUser(userData);
  }

  async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    const updatedUser = await UserRepository.updateUser(userId, userData);
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<IUser | null> {
    return await UserRepository.deleteUser(userId);
  }

  async loginUser(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const validPassword = await passwordHelper.comparePasswords(
      password,
      user.password!
    );
    if (!validPassword) {
      throw new Error("Invalid Credentials");
    }
    const token = jwthelper.generateToken(user);
    return {
      token,
      user: { _id: user._id, email: user.email, username: user.username },
    };
  }

  async getAllUsers(): Promise<IUser[]> {
    return await UserRepository.getAllUsers();
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return await UserRepository.findById(userId);
  }
}

export default new UserServices();
