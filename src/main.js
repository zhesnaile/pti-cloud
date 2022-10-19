import Koa from "koa";
import api_router from "./api/api.js";

const port = 3000;

let app = new Koa();

app.use(api_router.routes()).use(api_router.allowedMethods());

app.listen(port);
console.log(`Listening on port ${port}`);
