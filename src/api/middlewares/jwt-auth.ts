import { NextFunction, Request, Response } from "express";
import jwt from "jwt-promisify";
import { SECRET_KEY } from "../../config/secret";

export type UserAuth = {
  id?: string;
  group?: string;
  iat?: number;
};

export function jwtAuth(group?: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      const token = authorization.slice(7, authorization.length);
      try {
        req.user = (await jwt.verify(token, SECRET_KEY)) as UserAuth;
        if (group && req.user.group !== group) {
          return res.sendStatus(401);
        }
        return next();
      } catch (e) {
        return res.sendStatus(401);
      }
    }
    return res.sendStatus(401);
  };
}
