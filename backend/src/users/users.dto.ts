import { IUser } from "./users.interface";

export class UsersDto {
  private _id?: string;
  private _email!: string;
  private _username!: string;
  private _role!: "admin" | "author" | "reader";

  // Factory method
  static fromEntity(user: IUser): UsersDto {
    const dto = new UsersDto();
    dto._id = user._id;
    dto._email = user.email;
    dto._username = user.username;
    dto._role = user.role;
    return dto;
  }

  static fromEntities(users: IUser[]): UsersDto[] {
    return users.map((user) => UsersDto.fromEntity(user));
  }

  // Convert to plain object for API response
  toResponse() {
    return {
      id: this._id,
      email: this._email,
      username: this._username,
      role: this._role,
    };
  }
}
