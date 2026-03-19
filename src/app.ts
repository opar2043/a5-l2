import type { Application } from "express";
import express from "express";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { movieRouter } from "./module/movies/movie.route";

const app: Application = express();

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api", movieRouter);


app.get("/", (req, res) => {
  res.send("Server is running for movie 🚀");
});
export default app;
