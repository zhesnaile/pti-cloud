import Koa from "koa";
import { api_router } from "./api/api.js";
import cors from "@koa/cors";
import serve from "koa-static";
import mount from "koa-mount";

const port = 3000;

let app = new Koa();



app.use(cors());
app.use(api_router.routes()).use(api_router.allowedMethods());


const static_pages = new Koa();
/**
 * An array with all the frontend pages availabe.
 * In case we search a page in the URL that is not defined it will treat as a backend function.
 */
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


app.listen(port);
console.log(`Listening on port ${port}`);
