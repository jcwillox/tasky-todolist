import { NextFunction, Request, Response } from "express";
import { ValidationError } from "sequelize";

/** Express custom error handler */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // gracefully handle database validation errors
  if (err instanceof ValidationError) {
    res.status(422).json({
      errors: err.errors.map(item => ({
        path: item.path,
        message: item.message
      }))
    });
  } else {
    next(err);
  }
};
