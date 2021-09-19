export interface User {
  name?: string;
  username: string;
}

export interface NewUser extends User {
  password: string;
}
