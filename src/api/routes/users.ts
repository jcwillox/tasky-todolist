import express, { NextFunction, Request, Response, Router } from "express";
import jwt from "jwt-promisify";
import User from "../database/models/users";
import { ValidationError } from "sequelize";
import { LoginBody } from "../../models/login";
import { asyncRoute, yupSchema } from "../middlewares";
import { LoginBodySchema, RegisterSchema } from "../../schemas";

const getSecret = () => {
  if (process.env.SECRET_KEY) {
    return Buffer.from(process.env.SECRET_KEY, "base64");
  }
  return "test_secret_key";
};

const router = Router();

router.use(express.json());

router.post(
  "/login",
  yupSchema({ body: LoginBodySchema }),
  asyncRoute(async (req: Request, res: Response) => {
    const { password, username }: LoginBody = req.body;

    const user = await User.findOne({
      where: {
        username
      }
    });

    if (user && (await user.validatePassword(password)))
      return res.json({
        ...user.details(),
        token: await jwt.sign({ id: user.id }, getSecret())
      });

    return res.sendStatus(401);
  })
);

router.post(
  "/register",
  yupSchema({ body: RegisterSchema }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await User.create(req.body);
      res.sendStatus(200);
    } catch (err) {
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
    }
  }
);

export default router;
