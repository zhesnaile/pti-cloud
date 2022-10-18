import Koa from "koa";
import { set_up_routes } from "./api/api.js";

const port = 3000;


let router = set_up_routes();

let app = new Koa();

app.use(router.routes()).use(router.allowedMethods());

app.listen(port);
console.log(`Listening on port ${port}`);
