import { NewUser } from "../models/user";

import { object, ref, SchemaOf, string } from "yup";

export const RegisterSchema: SchemaOf<NewUser> = object({
  name: string().optional().max(128),
  username: string().required().max(32),
  password: string().required().min(8).max(60)
});

export const RegisterConfirmSchema = RegisterSchema.shape({
  confirmPassword: string().when("password", {
    is: val => val && val.length > 0,
    then: string().oneOf([ref("password")], "Password does not match")
  })
});
