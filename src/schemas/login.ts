import { object, SchemaOf, string } from "yup";
import { LoginBody } from "../models/login";

export const LoginBodySchema: SchemaOf<LoginBody> = object({
  username: string().required().max(32),
  password: string().required().max(60)
});
