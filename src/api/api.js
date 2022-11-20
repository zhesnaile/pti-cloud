import KoaRouter from "@koa/router";
import { login_api_router } from "./endpoints/login.js";
import { wg_api_router } from "./endpoints/get_wg_config.js"

const api_routers = [
    login_api_router,
    wg_api_router,
]

const api_dir = "/api";

function init_api_router() {
    let router = new KoaRouter();

    api_routers.forEach( (r) => {
        router.use(api_dir, r.routes(), r.allowedMethods());
    });

    return router;
}

export let api_router = init_api_router();
