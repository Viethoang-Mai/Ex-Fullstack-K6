import { router } from "./Utils/router";
import { defaultLayout } from "./layout/defaultLayout";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Products } from "./pages/product";
import { ProductDetail } from "./pages/productDetail";

export const App = () => {
    return router(
        [
            {
                path: "/",
                component: Home,
            },
            {
                path: "/gioi-thieu",
                component: About,
            },
            {
                path: "/san-pham",
                component: Products,
            },
            {
                path: "/san-pham/:id",
                component: ProductDetail,
            },
        ],
        defaultLayout
    );
};
