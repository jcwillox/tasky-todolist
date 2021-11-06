import { ChangePassword, EditUser, NewUser } from "../models/user";
import { LoginBody } from "../models/login";
import { object, ref, SchemaOf, string } from "yup";

const PasswordValidation = string().required().min(8).max(60);
const UsernameValidation = string().required().min(3).max(32);

export const PasswordSchema = object({
  password: PasswordValidation
});

export const LoginBodySchema: SchemaOf<LoginBody> = object({
  username: UsernameValidation,
  password: PasswordValidation
});

export const RegisterSchema: SchemaOf<NewUser> = object({
  name: string().optional().max(128),
  username: UsernameValidation,
  password: PasswordValidation
});

export const RegisterConfirmSchema = RegisterSchema.shape({
  confirmPassword: string()
    .oneOf([ref("password"), null], "passwords must match")
    .required("password does not match")
});

export const EditUserSchema: SchemaOf<EditUser> = object({
  name: string().optional().max(128),
  username: UsernameValidation.optional()
});

export const EditUserAdminSchema = EditUserSchema.shape({
  group: string().nullable().max(24)
});

export const ChangePasswordSchema: SchemaOf<ChangePassword> = object({
  password: PasswordValidation,
  newPassword: PasswordValidation
});

export const ChangePasswordConfirmSchema = ChangePasswordSchema.shape({
  confirmPassword: string()
    .oneOf([ref("newPassword"), null], "passwords must match")
    .required("password does not match")
});
