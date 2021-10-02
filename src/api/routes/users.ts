import express, { Request, Response, Router } from "express";
import jwt from "jwt-promisify";
import User from "../database/models/users";
import { LoginBody } from "../../models/login";
import { asyncRoute, jwtAuth, yupSchema } from "../middlewares";
import { LoginBodySchema, RegisterSchema } from "../../schemas";
import { SECRET_KEY } from "../../config/secret";

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
        token: await jwt.sign({ id: user.id }, SECRET_KEY)
      });

    return res.sendStatus(401);
  })
);

router.post(
  "/register",
  yupSchema({ body: RegisterSchema }),
  asyncRoute(async (req: Request, res: Response) => {
    await User.create(req.body);
    // validation/creation errors have been handled by this point
    return res.sendStatus(200);
  })
);

export default router;
