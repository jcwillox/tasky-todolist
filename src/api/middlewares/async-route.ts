import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * Wraps an async request handler to ensure unhandled exceptions are
 * passed to the express error handler correctly.
 */
export const asyncRoute = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };
};
