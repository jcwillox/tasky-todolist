import express, { Request, Response, Router } from "express";
import jwt from "jwt-promisify";
import UserModel from "../database/models/users";
import { LoginBody } from "../../models/login";
import { asyncRoute, jwtAuth, yupSchema } from "../middlewares";
import { LoginBodySchema, RegisterSchema } from "../../schemas";
import { COOKIE_TOKEN_NAME, DEVELOPMENT, SECRET_KEY } from "../../config";
import { CookieOptions } from "express-serve-static-core";

const cookieToken = async (
  user: UserModel
): Promise<[string, string, CookieOptions]> => {
  return [
    COOKIE_TOKEN_NAME,
    await jwt.sign({ id: user.id, group: user.group }, SECRET_KEY),
    { sameSite: "lax", httpOnly: true, secure: !DEVELOPMENT }
  ];
};

const router = Router();

router.use(express.json());

router.post(
  "/login",
  yupSchema({ body: LoginBodySchema }),
  asyncRoute(async (req: Request, res: Response) => {
    const { password, username }: LoginBody = req.body;

    const user = await UserModel.findOne({
      where: {
        username
      }
    });

    if (user && (await user.validatePassword(password)))
      return res.cookie(...(await cookieToken(user))).json(user.details());
    return res.sendStatus(401);
  })
);

router.post("/logout", (req: Request, res: Response) => {
  return res.clearCookie(COOKIE_TOKEN_NAME).sendStatus(200);
});

router.post(
  "/register",
  yupSchema({ body: RegisterSchema }),
  asyncRoute(async (req: Request, res: Response) => {
    await UserModel.create(req.body);
    // validation/creation errors have been handled by this point
    return res.sendStatus(200);
  })
);

router.get(
  "/validate",
  jwtAuth(),
  asyncRoute(async (req: Request, res: Response) => {
    const user = await UserModel.findByPk(req.user!.id);
    if (user) {
      return res.cookie(...(await cookieToken(user))).json(user.details());
    }
    return res.clearCookie(COOKIE_TOKEN_NAME).sendStatus(401);
  })
);

export default router;
