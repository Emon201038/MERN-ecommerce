import express from "express";
const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  res.send("Login");
});

export default authRouter;
