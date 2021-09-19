import cors from "cors";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";

const { NODE_ENV } = process.env;
const app: Express = express();

if (NODE_ENV !== "production" && NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(express.static("build"));
app.use(cors());

/** fallback route for all api requests */
app.get("/api*", (req: Request, res: Response) => {
  res.json({ status: "online" });
});

app.get("*", (req: Request, res: Response) => {
  res.sendFile("build/index.html", { root: "." });
});

export default app;
