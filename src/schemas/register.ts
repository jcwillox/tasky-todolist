import { ChangePassword, EditUser, NewUser } from "../models/user";

import { object, ref, SchemaOf, string } from "yup";

export const RegisterSchema: SchemaOf<NewUser> = object({
  name: string().optional().max(128),
  username: string().required().max(32),
  password: string().required().min(8).max(60)
});

export const RegisterConfirmSchema = RegisterSchema.shape({
  confirmPassword: string()
    .oneOf([ref("password"), null], "passwords must match")
    .required("password does not match")
});

export const EditUserSchema: SchemaOf<EditUser> = object({
  name: string().nullable().max(128),
  username: string().optional().max(32)
});

export const EditUserAdminSchema = EditUserSchema.shape({
  group: string().nullable().max(24)
});

export const ChangePasswordSchema: SchemaOf<ChangePassword> = object({
  password: string().required().min(8).max(60),
  newPassword: string().required().min(8).max(60)
});
