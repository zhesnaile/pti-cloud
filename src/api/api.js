import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";

import * as loginMethods from "./endpoints/login.js";

const api_collection = [
    {endpoint: "/login", endpoint_methods: loginMethods},
]

const api_dir = "/api";

function set_api(router, endpoint, endpoint_methods) {
    const route = api_dir + endpoint;
    if (endpoint_methods.get !== undefined) 
        router.get(route, endpoint_methods.get);
    if (endpoint_methods.post !== undefined) 
        router.post(route, endpoint_methods.post);
    if (endpoint_methods.put !== undefined) 
        router.put(route, endpoint_methods.put);
    if (endpoint_methods.patch !== undefined) 
        router.patch(route, endpoint_methods.patch);
    if (endpoint_methods.del !== undefined) 
        router.del(route, endpoint_methods.del);
}

export function set_up_routes() {
    let router = new KoaRouter();
    router.use(KoaBodyParser())
    for (let api of api_collection) {
        set_api(router, api.endpoint, api.endpoint_methods);
    }
    return router;
}

