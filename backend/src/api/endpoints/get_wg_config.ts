import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import { ParameterizedContext, Next } from "koa";
import mime from "mime-types"
import fs from 'fs'
import { getConfig, deleteConfig } from "../../utils/access-wg.js";

/**
 * This file contains all the functions related to managing a node in the VPN structure (Wireguard server).
 */

 /**
  * Obtains the configuration filename of the user and sends it to the client.
  * Basically, it is called by the install-client.sh script via curl -X POST, so the configuration file can be transfered to the client.
  * @param {*} ctx The context of the request. The context passed consists in: {username} (client username)
  * @param {*} next
  */
async function get_wg_config(ctx: ParameterizedContext, next: Next) {
    ctx.status = 404;
    let user = ctx.request.body.username;
    let file_name = await getConfig(user);
    let directorio = '/etc/kfc/configuraciones/';
    if (file_name != null) {
      var mimeType = mime.lookup(directorio+file_name);
      const src = fs.createReadStream(directorio+file_name);
      ctx.response.set("Content-disposition", "attachment; filename=" + file_name);
      ctx.response.set("Content-type", mimeType);
      ctx.status = 200;
      ctx.body = src;

    }
    await next();
}

/**
 * Deletes the user in the DB and in the VPN network.
 * Basically, it is called by the revoke-client.sh script via curl -X DELETE (when the administators call it), so the client can be deleted.
 * @param {*} ctx The context of the request. The context passed consists in: {numb} (configuration number position on the VPN)
 * @param {*} next
 */
async function revoke_wg_config(ctx: ParameterizedContext, next: Next) {
    ctx.status = 200;
    ctx.body = "ELIMINADO";
    let number = ctx.request.body.numb; //pasar numb por el curl
    await deleteConfig(user);
    //await revokeeClient(number); // comprobar si funciona
    await next();
}

/**
 * Router to make a collection of all the API functions in get_wg_config.js
 * @returns The router with the implementation of the get_wg_config and revoke_wg_config functions.
 */
function init_wg_router() {
    let router = new KoaRouter();
    router
        .use(KoaBodyParser())
        .post("/wg_getConfig", get_wg_config)
        .delete("/wg_revoke", revoke_wg_config);
    return router;
}

/** Router collecting all functions of get_wg_config.js */
export let wg_api_router = init_wg_router();
//curl -X POST http://localhost:3000/api/wg_getConfig -H "Content-Type: application/json" -d '{"username": "jordi"}'
//curl -X DELETE http://localhost:3000/api/wg_revoke -H "Content-Type: application/json" -d '{"numb": "2"}'
