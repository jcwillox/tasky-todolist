import cors from "cors";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";

const app: Express = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.static("build"));
app.use(cors());

app.get("*", (req: Request, res: Response) => {
  res.sendFile("build/index.html", { root: "." });
});

export default app;
