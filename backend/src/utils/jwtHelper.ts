import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

class JwtHelper {
  generateToken(user: any) {
    return jwt.sign({ id: user._id, role: user.role }, ENV.JWT_SECRET, {
      expiresIn: "1d",
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, ENV.JWT_SECRET);
  }
}

export default new JwtHelper();
