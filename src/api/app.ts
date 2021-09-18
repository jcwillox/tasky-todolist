import cors from "cors";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";

const app: Express = express();

const nodeEnv = process.env.NODE_ENV;
if (nodeEnv !== "production" && nodeEnv !== "test") {
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
