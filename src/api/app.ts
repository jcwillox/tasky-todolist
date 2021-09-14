import cors from "cors";
import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(express.static("build"));
app.use(cors());

app.get("*", (req: Request, res: Response) => {
  res.sendFile("build/index.html", { root: "." });
});

export default app;
