import KoaRouter from "@koa/router";

import { login_api_router } from "./endpoints/login.js";
import { register_api_router } from "./endpoints/registerUser.js";
import { register_node_api_router } from "./endpoints/registerNode.js"
import { wg_api_router } from "./endpoints/get_wg_config.js"
import { fronthelper_api_router } from "./endpoints/descargar.js"

/** @module api/router */
export const name = "router";

/** 
 * Collection of Routers declared by each API.
 */
const api_routers = [
    login_api_router,
    register_node_api_router,
    wg_api_router,
    register_api_router,
    fronthelper_api_router,
    register_task_api_router,
]

/**
 * Path in the webserver where APIs belong.
 */
const api_dir = "/api";

/**
 * Joins a collection of Koa Routers by nesting them inside a new Router.
 * Used to join a series of API endpoints.
 * @param {KoaRouter[]} api_routers Collection of Routers to be Nested.
 * @param {string} api_dir Path these Routers should be nested to.
 * @returns {KoaRouter} new Router with nested Routers.
 */
function init_api_router(api_routers, api_dir) {
    let router = new KoaRouter();

    api_routers.forEach((r) => {
        router.use(api_dir, r.routes(), r.allowedMethods());
    });

    return router;
}
/** Router collecting all APIs of the webapp */
export let api_router = init_api_router(api_routers, api_dir);
