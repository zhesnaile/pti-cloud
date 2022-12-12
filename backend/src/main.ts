import Koa from "koa";
import { api_router } from "./api/api.js";
import cors from "@koa/cors";
import serve from "koa-static";
import mount from "koa-mount";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";

/**
 * Config Struct
 * We can set all variables here
 */
const config = {
  https : {
    enabled: false,
    port: 3001,
    options :{
      cert: fs.readFileSync(path.resolve("./certs/cert.pem"), 'utf-8').toString(),
      key : fs.readFileSync(path.resolve("./certs/key.pem"), 'utf-8').toString(),
      //passphrase: "huevo"
    },
  },
  http : {
    enabled : true,
    port: 3000,
  }
}


/**
 * Modifies a Koa instance to mount our frontends static pages to it.
 * @param {Koa} app Koa instance
 */
function mount_frontend(app: Koa) {
  const static_pages = new Koa();

  const REACT_ROUTER_PATHS = [
      '/login',
      '/register',
      '/dashboard',
      '/registerusernode',
    ];

    static_pages
      .use(async (ctx, next) => {
        if (REACT_ROUTER_PATHS.includes(ctx.request.path)) {
          ctx.request.path = '/';
        }
        await next();
      })
      .use(serve("../frontend/build"));

  app.use(mount('/', static_pages));
}

/**
 * Modifies a Koa instance to add all methods from our APIs to it.
 * @param {Koa} app Koa instance
 */
function add_api(app: Koa) {
  app.use(cors());
  app.use(api_router.routes()).use(api_router.allowedMethods());
}

/**
 * Entrypoint of our app
 */
function main() {
  let app = new Koa();

  add_api(app);
  mount_frontend(app);

  const koa_callback = app.callback();

  if (config.https.enabled) {
    const https_server = https.createServer(config.https.options, koa_callback);
    https_server.listen(config.https.port);
  }

  if (config.http.enabled) {
    const http_server = http.createServer(koa_callback);
    http_server.listen(config.http.port);
  }

}

main();
