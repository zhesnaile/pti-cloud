import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import { getConfig, revokeeClient } from "../../utils/access-wg.js";

//RECIBE CONEXION; VALIDA?? LLAMA

async function get_wg_config(ctx, next) {
    ctx.status = 200;
    let user = ctx.body.username;
    let pass = ctx.body.password;
    await getConfig(user, pass);
    await next();
}
async function revoke_wg_config(ctx, next) {
    ctx.status = 200;
    ctx.body = "ELIMINADO";
    await revokeeClient();
    await next();
}

function init_wg_router() {
    let router = new KoaRouter();
    router
        .use(KoaBodyParser())
        .get("/wg_addclient", get_wg_config)
        .get("/wg_revoke", revoke_wg_config);
    return router;
}

export let wg_api_router = init_wg_router();
