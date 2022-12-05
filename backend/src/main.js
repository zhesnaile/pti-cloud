import Koa from "koa";
import { api_router } from "./api/api.js";
import cors from "@koa/cors";
import serve from "koa-static";
import mount from "koa-mount";


/**
 * Config Struct
 * We can set all variables here
 */
const config = {
  port: 3000,

}

/**
 * Modifies a Koa instance to mount our frontends static pages to it.
 * @param {Koa} app Koa instance
 */
function mount_frontend(app) {
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
function add_api(app) {
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
  
  app.listen(config.port);
  console.log(`Listening on port ${port}`);
}

main();