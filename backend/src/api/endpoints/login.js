/**
 * Login API Functions
 */
import { redis_login_user } from "../../utils/access-redis.js";
import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";

/**
 * API function that acts as a login.
 * It checks that the credentials passed by the context are in the DB.
 * As a response, it gives a 200 STATUS for OK and 404 for a LOGIN ERROR.
 * @param {*} ctx The context passed by the app web consists in: {name, pword}
 * @param {*} next
 */
async function login_user(ctx, next) {
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

/**
 * Router to make a collection of all the API function in login.js
 * @returns The router with the implementation of the loginUser function.
 */
function init_login_router() {
    let router = new KoaRouter();
    router
        .use(KoaBodyParser())
        .post("/loginUser", login_user);
    return router;
}

export let login_api_router = init_login_router();

/* Comprovació que funciona
curl -X POST http://localhost:3000/api/loginUser -H "Content-Type: application/json" -d '{"name": "jordi", "pword": "lala"}'
*/


