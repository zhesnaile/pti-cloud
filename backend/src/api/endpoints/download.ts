/**
 * This file has the function of helping the frontend of the node registration website 
 */

import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import { ParameterizedContext, Next } from "koa";
import mime from "mime-types";
import fs from "fs";
import path from "path";
import { redis_get_K3Sconfig } from "../../utils/access-redis.js";
import cors from "@koa/cors";

/**
 * API function that gets the root path + location of the Wireguard + K3S installation file and sends it as a response.
 * Basically, it is called by the web page via HTTP GET, so the user can easly download it.
 * @param {*} ctx The context of the request. Empty because we don't need any option in this GET.
 * @param {*} next
 */
async function getScript(ctx: ParameterizedContext, next: Next){
  const __dirname = path.resolve();
  var file_path = path.join(__dirname, 'public', 'installation-client.sh');
  try{
    if(fs.existsSync(file_path)){
      var mimeType = mime.lookup(file_path);
      if(mimeType === false){
        ctx.status = 404;
        ctx.body = `Error mimeType`;
      } else {
        const src = fs.createReadStream(file_path);     
        ctx.response.set("Content-disposition", "attachment; filename=installation-client.sh");
        ctx.response.set("Content-type", mimeType);
        ctx.status = 200;
        ctx.body = src;
        }  
      }
      else {
        ctx.status = 404;
        ctx.body = `Error`;
      }
  } catch (error){
    console.log(error);
  }
  await next();
  }

/**
 * API function (POST) that giving a username, returns the k3s_name as a response.
 * If not possible it will return an ERROR (404).
 * @param {*} ctx The context of the request. The context passed consists in: {name}
 * @param {*} next 
 */
async function get_K3S_token(ctx: ParameterizedContext, next: Next) {
  let req_body = ctx.request.body;
  let username = req_body.name;
  
  let name = await redis_get_K3Sconfig(username);
  if (name !== 'null') {
      ctx.status = 200;
      ctx.body = JSON.stringify({
        k3s_name: name,
    })
  } else {
      ctx.status = 404;
      ctx.body = `Error`;
  }
  await next();
}

/**
 * Router to make a collection of all the API functions in descargar.js
 * @returns The router with the implementation of the getScript nd get_K3S_token functions.
 */
function init_front_helper_router() {
  let router = new KoaRouter();
  router
      .use(cors())
      .use(KoaBodyParser())
      .get("/getscript", getScript)
      .post("/getK3Stoken", get_K3S_token);
  return router;
}

export let fronthelper_api_router = init_front_helper_router();

