/**
 * Register API Functions
 */
import { redis_register_user } from "../../utils/access-redis.js";
import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import cors from "@koa/cors";

/**
 * API function that acts as user register.
 * It checks that the credentials passed by context can be added to the DB.
 * As a response, it gives a 200 STATUS for OK and 404 for a REGISTER ERROR.
 * @param {*} ctx The context passed by the app web consists in: {name, pword, pword2}
 * @param {*} next 
 */
async function register_user(ctx, next) {
    let req_body = ctx.request.body;
    let username = req_body.name;
    let password = req_body.pword;
    let password2 = req_body.pword2;

    let valid_reg = await redis_register_user(username, password, password2);
    if (valid_reg === true) {
        ctx.status = 200;
        ctx.body = `User registered! Welcome ${username}!`;
    } else {
        ctx.status = 404;
        ctx.body = `${username} is already registered.`
    }
    await next();
}

/**
 * Router to make a collection of all the API function in registerUser.js
 * @returns The router with the implementation of the register_user function.
 */
function init_register_router() {
    let router = new KoaRouter();
    router
        .use(cors())
        .use(KoaBodyParser())
        .post("/registerUser", register_user);
    return router;
}

export let register_api_router = init_register_router();

/* Comprovació que funciona
curl -X POST http://localhost:3000/api/registerUser -H "Content-Type: application/json" -d '{"name": "user", "pword": "pass", "pword2": "pass"}'
*/