export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "author" | "reader";
  createdAt?: Date;
  updatedAt?: Date;
}
