import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import mime from "mime-types";
import fs from "fs";
import path from "path";

/**
 * API function that gets the root path + location of the Wireguard + K3S installation file and sends it as a response.
 * Basically, it is called by the web page via HTTP GET, so the user can easly download it.
 * @param {*} ctx The context of the request. Empty because we don't need any option in this GET.
 * @param {*} next Idk lmao
 */
async function getScript(ctx, next){
  const __dirname = path.resolve();
  var file_path = path.join(__dirname, 'public', 'installation-client.sh');
  var mimeType = mime.lookup(file_path);
  const src = fs.createReadStream(file_path);
    
  ctx.response.set("Content-disposition", "attachment; filename=installation-client.sh");
  ctx.response.set("Content-type", mimeType);
  ctx.status = 200;
  ctx.body = src;
  
  await next();
  }

  /**
   * Router to make a collection of all the API functions in descargar.js
   * @returns The router with the implementation of the getScript function (get the installation file)
   */
  function init_front_helper_router() {
    let router = new KoaRouter();
    router
        .use(KoaBodyParser())
        .get("/getscript", getScript);
    return router;
}

export let fronthelper_api_router = init_front_helper_router();

