/**
 * Register API Functions
 */
import { redis_register_user } from "../../utils/access-redis.js";
import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";

async function post(ctx, next) {

    let req_body = ctx.request.body;
    let username = req_body.name;
    let password = req_body.pword;
    let password2 = req_body.pword2;
    console.log(username);
    console.log(password);
    console.log(password2);
    /*let username = 'jordi';
    let password = '123';
    let password2 = '123';*/
    while (username === 'undefined' || password === 'undefined' || password2 === 'undefined');
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

function init_register_router() {
    let router = new KoaRouter();
    router
        .use(KoaBodyParser())
        .post("/register", post);
    return router;
}

export let register_api_router = init_register_router();

//curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d '{"name": "user", "pword": "pass", "pword2": "pass"}'