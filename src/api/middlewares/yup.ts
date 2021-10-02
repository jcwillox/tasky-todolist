import { NextFunction, Request, Response } from "express";
import { LoginBodySchema } from "../../schemas";
import { BaseSchema, object, ValidationError } from "yup";
import { ValidateOptions } from "yup/lib/types";

type SchemaType = {
  body?: BaseSchema;
  params?: BaseSchema;
};

type ValidateFn = (req: Request, options: ValidateOptions) => Promise<any>;

/** Returns Yup validator function to validate the set fields */
const createValidate = (schema: SchemaType): ValidateFn | undefined => {
  if (schema.body && schema.params)
    return object({
      body: schema.body,
      params: schema.params
    }).validate;
  else if (schema.body)
    return (req: Request, options: ValidateOptions) =>
      schema.body!.validate(req.body, options);
  else if (schema.params)
    return (req: Request, options: ValidateOptions) =>
      schema.params!.validate(req.params, options);
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
      await validate(req, options);
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
