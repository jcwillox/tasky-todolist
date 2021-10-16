import express, { Request, Response, Router } from "express";
import jwt from "jwt-promisify";
import UserModel from "../database/models/users";
import { LoginBody } from "../../models/login";
import { asyncRoute, jwtAuth, yupSchema } from "../middlewares";
import {
  ChangePasswordSchema,
  EditUserAdminSchema,
  EditUserSchema,
  LoginBodySchema,
  RegisterSchema
} from "../../schemas";
import { COOKIE_TOKEN_NAME, DEVELOPMENT, SECRET_KEY } from "../../config";
import { CookieOptions } from "express-serve-static-core";
import { Op } from "sequelize";

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

/** Check token is valid and return latest user details */
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

/** All users except current user */
router.get(
  "/users",
  jwtAuth("admin"),
  asyncRoute(async (req: Request, res: Response) => {
    const users = await UserModel.findAll({
      where: {
        id: {
          [Op.not]: req.user?.id
        }
      }
    });
    return res.json(users.map(user => user.details()));
  })
);

/** Edit current users details */
router.put(
  "/user",
  jwtAuth(),
  yupSchema({ body: EditUserSchema }),
  asyncRoute(async (req: Request, res: Response) => {
    const user = await UserModel.findByPk(req.user!.id);
    if (user) {
      await user.update(req.body);
      return res.sendStatus(200);
    }
    return res.sendStatus(401);
  })
);

/** Edit any users details and group as an admin */
router.put(
  "/user/:id",
  jwtAuth("admin"),
  yupSchema({ body: EditUserAdminSchema }),
  asyncRoute(async (req: Request, res: Response) => {
    const user = await UserModel.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      return res.sendStatus(200);
    }
    return res.sendStatus(401);
  })
);

/** Change current users password */
router.post(
  "/user/password",
  jwtAuth(),
  yupSchema({ body: ChangePasswordSchema }),
  asyncRoute(async (req: Request, res: Response) => {
    const { password, newPassword } = req.body;
    const user = await UserModel.findByPk(req.user!.id);
    if (user && (await user.validatePassword(password))) {
      await user.update({ password: newPassword });
      return res.sendStatus(200);
    }
    return res.sendStatus(401);
  })
);

/** Delete current user */
router.delete(
  "/user",
  jwtAuth(),
  asyncRoute(async (req: Request, res: Response) => {
    const n = await UserModel.destroy({
      where: {
        id: req.user!.id
      }
    });
    if (n > 0) {
      return res.sendStatus(200);
    }
    return res.sendStatus(404);
  })
);

/** Delete any user as an admin */
router.delete(
  "/user/:id",
  jwtAuth("admin"),
  asyncRoute(async (req: Request, res: Response) => {
    const n = await UserModel.destroy({
      where: {
        id: req.params.id
      }
    });
    if (n > 0) {
      return res.sendStatus(200);
    }
    return res.sendStatus(404);
  })
);

export default router;
