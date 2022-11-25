import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import { getConfig, revokeeClient } from "../../utils/access-wg.js";

async function get_wg_config(ctx, next) {
    ctx.status = 404;
    let user = ctx.request.body.username;
    let file_name = await getConfig(user);
    let directorio = '/home/sandra/configuraciones/';
    if (file_name != null) {
    ctx.attachment('directorio+file_name');
    ctx.status = 201;
    }
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
        .post("/wg_getConfig", get_wg_config)
        .delete("/wg_revoke", revoke_wg_config);
    return router;
}

export let wg_api_router = init_wg_router();
//curl -X POST http://localhost:3000/api/wg_getConfig -H "Content-Type: application/json" -d '{"username": "jordi"}'
