import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import mime from "mime-types"
import fs from 'fs'
import { getConfig, deleteConfig } from "../../utils/access-wg.js";

async function get_wg_config(ctx, next) {
    ctx.status = 404;
    let user = ctx.request.body.username;
    let file_name = await getConfig(user);
    let directorio = '/home/sandra/configuraciones/'; //path que depende de donde este el server
    if (file_name != null) {
      var mimeType = mime.lookup(directorio+file_name);
      const src = fs.createReadStream(directorio+file_name);
      ctx.response.set("Content-disposition", "attachment; filename=hello.txt");
      ctx.response.set("Content-type", mimeType);
      ctx.status = 200;
      ctx.body = src;

    }
    await next();
}
async function revoke_wg_config(ctx, next) {
    ctx.status = 200;
    ctx.body = "ELIMINADO";
    let number = ctx.request.body.numb; //pasar numb por el curl
    await deleteConfig(user);
    //await revokeeClient(number); // comprobar si funciona
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
//curl -X DELETE http://localhost:3000/api/wg_revoke -H "Content-Type: application/json" -d '{"numb": "2"}'
