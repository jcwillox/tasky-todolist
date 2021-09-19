import express, { Request, Response, Router } from "express";
import { NewUser } from "../../models/user";
import jwt from "jsonwebtoken";
import User from "../database/models/users";
import { ValidationError } from "sequelize";
import { LoginBody } from "../../models/login";

const getSecret = () => {
  if (process.env.SECRET_KEY) {
    return Buffer.from(process.env.SECRET_KEY, "base64");
  }
  return "test_secret_key";
};

const router = Router();

router.use(express.json());

router.post("/login", async (req: Request, res: Response) => {
  const { password, username }: LoginBody = req.body;

  const user = await User.findOne({
    where: {
      username
    }
  });

  if (user && (await user.validatePassword(password)))
    return res.json({
      ...user.details(),
      token: jwt.sign({ id: user.id }, getSecret())
    });

  return res.sendStatus(401);
});

router.post("/register", async (req: Request, res: Response) => {
  const body: NewUser = req.body;

  try {
    await User.create(body);
    res.sendStatus(200);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(422).json({
        errors: err.errors.map(item => ({
          attribute: item.path,
          message: item.message
        }))
      });
    } else {
      console.error("'/register':", err);
      res.sendStatus(400);
    }
  }
});

export default router;
