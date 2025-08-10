
import bcrypt from "bcryptjs";

class passwordHelper {
  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10); // Generate a salt for stronger hashing
      const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
      return hashedPassword;
    } catch (error) {
      throw new Error("Error hashing password");
    }
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword); // Compare passwords
      return isMatch;
    } catch (error) {
      throw new Error("Error comparing passwords");
    }
  }
}

export default new passwordHelper();
