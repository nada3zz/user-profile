import { UserType } from "../enum";

export interface ICreate {
  fullName: string;
  email: string;
  password: string;
  age: number,
  userType?: UserType
}


