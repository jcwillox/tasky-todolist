import { UserAuth } from "./middlewares";

declare global {
  namespace Express {
    interface Request {
      user?: UserAuth;
    }
  }
}
