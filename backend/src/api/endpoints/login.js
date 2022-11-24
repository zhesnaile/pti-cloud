/**
 * Login API Functions
 */
import { redis_login_user } from "../../utils/access-redis.js";
import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";

async function post(ctx, next) {
    let req_body = ctx.request.body;
    let username = req_body.name;
    let password = req_body.pword;

    let valid_login = await redis_login_user(username, password);
    if (valid_login === true) {
        ctx.status = 200;
        ctx.body = `Welcome back, ${username}.`;
    } else {
        ctx.status = 404;
        ctx.body = `Login error.`;
    }
    await next();
}

function init_login_router() {
    let router = new KoaRouter();
    router
        .use(KoaBodyParser())
        .post("/login", post);
    return router;
}

export let login_api_router = init_login_router();

//curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"name": "jordi", "pword": "lala"}'