import express from "express";
import userRouter from "../module/user/user.routes";
import authRouter from "../module/auth/auth.routes";
import categoryRoute from "../module/category/category.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/categories",
    route: categoryRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
