import { User } from "./user";

export type LoginBody = {
  username: string;
  password: string;
};

export interface LoginResponse extends User {
  token: string;
}
