import Koa from "koa";
import { api_router } from "./api/api.js";
import cors from "@koa/cors";
import serve from "koa-static";
import mount from "koa-mount";

const port = 3000;

let app = new Koa();



app.use(cors());
app.use(api_router.routes()).use(api_router.allowedMethods());

//pel frontend
const static_pages = new Koa();
static_pages.use(serve("/Users/jordiibru/Documents/first-clone/pti-cloud/frontend/build"));
app.use(mount('/', static_pages));

app.listen(port);
console.log(`Listening on port ${port}`);
