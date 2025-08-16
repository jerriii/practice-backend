import express, { Router } from "express";
import categoryRoutes from "./categories/categories.routes";
import productRoutes from "./products/products.routes";
import subCategoryRoutes from "./subcategories/subcategories.routes";
import usersRoutes from "./users/users.routes";

const router = express.Router();

type IRoute = {
  path: string;
  router: Router;
};

const routes: IRoute[] = [
  {
    path: "/products",
    router: productRoutes,
  },
  {
    path: "/categories",
    router: categoryRoutes,
  },
  {
    path: "/subcategories",
    router: subCategoryRoutes,
  },
  {
    path: "/users",
    router: usersRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
