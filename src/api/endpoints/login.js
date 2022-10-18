/**
 * Login API Functions
 */
import { redis_auth_check } from "../../utils/access-redis.js"

export async function post(ctx, next) {
    let req_body = ctx.request.body;
    let username = req_body.name;
    let password = req_body.pword;

    let valid_login = await redis_auth_check(username, password);
    if (valid_login === true) {
        ctx.status = 200;
        ctx.body = "Hello Login";
    } else {
        ctx.status = 404;
    }
    await next();
}

