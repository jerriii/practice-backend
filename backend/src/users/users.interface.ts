export interface IUser {
  username: string;
  email: string;
  password: string;
  role: "admin" | "author" | "reader";
  createdAt: Date;
}
