// import type { Application } from "express";
// import express from "express";
// import cors from "cors";
// import { toNodeHandler } from "better-auth/node";
// import { auth } from "./lib/auth";
// import { movieRouter } from "./module/movies/movie.route";
// import { reviewRouter } from "./module/reviews/review.route";

// app.use(cors());
// const app: Application = express();

// app.use(express.json());

// app.all("/api/auth/*splat", toNodeHandler(auth));
// app.use("/api", movieRouter);
// app.use("/api", reviewRouter);


// app.get("/", (req, res) => {
//   res.send("Server is running for movie 🚀");
// });
// export default app;



import type { Application } from "express";
import express from "express";
import cors from "cors";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { movieRouter } from "./module/movies/movie.route";
import { reviewRouter } from "./module/reviews/review.route";
import { userRouter } from "./module/users/users.route";
import { commentRouter } from "./module/comments/comment.route";

const app: Application = express(); // ✅ FIRST

// ✅ THEN use cors
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api", movieRouter);
app.use("/api", reviewRouter);
app.use("/api", userRouter);
app.use("/api", commentRouter);

app.get("/", (req, res) => {
  res.send("Server is running for movie 🚀");
});

export default app;