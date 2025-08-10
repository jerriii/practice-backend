import express from "express";
import { IRoute } from "../types/routes";
import categoryRoutes from "./category.routes";
import subCategoryRoutes from "./subcategory.routes";

const router = express.Router();

const routes: IRoute[] = [
    // {
    //     path: "/products",
    //     router: productRoutes,
    // },
    {
        path: "/categories",
        router: categoryRoutes,
    },
    {
        path: "/subcategories",
        router: subCategoryRoutes,
    }
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

export default router;
