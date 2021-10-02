import { NewUser } from "../models/user";

import { object, SchemaOf, string } from "yup";

export const RegisterSchema: SchemaOf<NewUser> = object({
  name: string().optional().max(128),
  username: string().required().max(32),
  password: string().required().max(60)
});
