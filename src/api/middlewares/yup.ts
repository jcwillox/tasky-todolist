import { NextFunction, Request, Response } from "express";
import { LoginBodySchema } from "../../schemas";
import { BaseSchema, object, ValidationError } from "yup";
import { ValidateOptions } from "yup/lib/types";

type SchemaType = {
  body?: BaseSchema;
  params?: BaseSchema;
  [key: string]: BaseSchema | undefined;
};

type ValidateFn = (req: Request, options: ValidateOptions) => Promise<any>;

/** Returns Yup validator function to validate the set fields */
const createValidate = (schema: SchemaType): ValidateFn | undefined => {
  const keys = Object.keys(schema);
  if (keys.length > 1) {
    let obj = object(schema as Record<string, BaseSchema>);
    return async (req: Request, options: ValidateOptions) =>
      await obj.validate(req, options);
  } else if (keys.length > 0) {
    const key = keys[0];
    return async (req: Request, options: ValidateOptions) => ({
      [key]: await schema[key]!.validate(req[key], options)
    });
  }
};

/** Express middleware to perform Yup schema validation on the request */
export const yupSchema = (schema: SchemaType) => {
  const validate = createValidate(schema);
  const options: ValidateOptions = {
    abortEarly: false,
    stripUnknown: true
  };
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!validate) {
      return next();
    }
    try {
      Object.assign(req, await validate(req, options));
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(422).json({
          errors: err.inner.map(item => ({
            path: item.path,
            message: item.errors.join(", ")
          }))
        });
      } else {
        next(err);
      }
    }
  };
};

yupSchema({ body: LoginBodySchema });
