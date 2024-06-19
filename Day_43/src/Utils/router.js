import Navigo from "navigo";
import { Error } from "../Error";

const routerObject = new Navigo("/", { linksSelector: "a" });
const root = document.querySelector("#root");
const renderRouter = (content, target, params = null) => {
    target.innerHTML = content(params);
};

export const router = (arr = [{ path, component }], DefaultLayout) => {
    if (DefaultLayout) {
        renderRouter(DefaultLayout, root);
    }
    const body = document.querySelector(".col-9");
    if (arr.length !== 0) {
        arr.forEach(({ path, component }) => {
            console.log(component);
            routerObject.on(path, (params) => {
                renderRouter(component, body, params);
                console.log(component(params));
            });
        });

        routerObject.notFound(() => {
            renderRouter(Error, root);
        });
        routerObject.resolve();
    }
};

window.navigate = (path) => routerObject.navigate(path);
