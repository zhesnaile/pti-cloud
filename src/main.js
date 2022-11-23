import Koa from "koa";
import { api_router } from "./api/api.js";
import cors from "@koa/cors";

const port = 3000;

let app = new Koa();

app.use(cors());
app.use(api_router.routes()).use(api_router.allowedMethods());

app.listen(port);
console.log(`Listening on port ${port}`);
