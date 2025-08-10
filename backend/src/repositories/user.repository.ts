import User, { IUser } from "../models/user.model";

class UserRepository {
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    return await User.create(userData);
  }
  async updateUser(
    userId: string,
    userData: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
  }

  async deleteUser(userId: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(userId);
  }
  async findById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }
  async getAllUsers(): Promise<IUser[]> {
    return await User.find();
  }
}

export default new UserRepository();
