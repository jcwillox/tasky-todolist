export interface BaseUser {
  name?: string | null;
  username: string;
}

export interface User extends BaseUser {
  id: string;
  group?: string | null;
}

export interface NewUser extends BaseUser {
  password: string;
}

export interface EditUser extends Partial<BaseUser> {}

export interface ChangePassword {
  password: string;
  newPassword: string;
}
