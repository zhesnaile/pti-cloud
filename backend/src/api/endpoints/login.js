/**
 * Login API Functions
 */
import { redis_login_user } from "../../utils/access-redis.js";
import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";

/** 
 * Method to be run when a POST request hits the Login API
 * @async
 * @param {ctx} ctx 
 * @param {Function} next 
 */
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

/**
 * Initializes a KoaRouter for the Login API.
 * @returns {KoaRouter}
 */
function init_login_router() {
    let router = new KoaRouter();
    router
        .use(KoaBodyParser())
        .post("/loginUser", login_user);
    return router;
}
/** KoaRouter for the Login API. */
export let login_api_router = init_login_router();

/* Comprovació que funciona
curl -X POST http://localhost:3000/api/loginUser -H "Content-Type: application/json" -d '{"name": "jordi", "pword": "lala"}'
*/


