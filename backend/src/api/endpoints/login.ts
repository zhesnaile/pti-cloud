/**
 * Login API Functions
 */
import { redis_login_user } from "../../utils/access-redis.js";
import Koa from "koa"
import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";

type loginBody = {
    name: string;
    password: string;
}

/** 
 * Method to be run when a POST request hits the Login API
 * @async
 * @param {Koa.ParameterizedContext} ctx 
 * @param {Function} next 
 */
async function post(ctx: Koa.ParameterizedContext, next: Koa.Next) {
    let req_body = <loginBody>ctx.request.body;
    
    let valid_login = await redis_login_user(req_body.name, req_body.password);
    if (valid_login === true) {
        ctx.status = 200;
        ctx.body = `Welcome back, ${req_body.name}.`;
    } else {
        ctx.status = 404;
        ctx.body = `Login error.`;
    }
    await next();
}

/**
 * Initializes a KoaRouter for the Login API.
 * @returns {KoaRouter}
 */
function init_login_router(): KoaRouter {
    let router = new KoaRouter();
    router
        .use(KoaBodyParser())
        .post("/loginUser", post);
    return router;
}
/** KoaRouter for the Login API. */
export let login_api_router = init_login_router();

//curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"name": "jordi", "pword": "lala"}'



