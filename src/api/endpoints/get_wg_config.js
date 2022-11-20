import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import { addClient, revokeClient } from "../../utils/access-wg.js";

//RECIBE CONEXION; VALIDA?? LLAMA

async function get_wg_config(ctx, next) {
    ctx.status = 200;
    ctx.body = "HOLA";
    await addClient();
    await next();
    //COMO DEVOLVER UN FICHERO EN UNA PETICION APIREST
}
async function revoke_wg_config(ctx, next) {
    ctx.status = 200;
    ctx.body = "ELIMINADO";
    await revokeClient();
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
