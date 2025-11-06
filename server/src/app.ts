//app.ts
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import { notFound } from "./app/middlewares/notFound";
import { globalError } from "./app/middlewares/globalError";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(notFound);
app.use(globalError);

export default app;
