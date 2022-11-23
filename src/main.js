import Koa from "koa";
import { api_router } from "./api/api.js";
//import cors from "cors";
//import bodyParser from "koa-bodyparser";
import bodyParser from 'body-parser';
import cors from "@koa/cors";

const port = 3000;

let app = new Koa();
//app.use(bodyParser());
//app.use(BP.json());
//app.use(BP.urlencoded({extended: true}));
app.use(cors());

app.use(api_router.routes()).use(api_router.allowedMethods());

app.listen(port);
console.log(`Listening on port ${port}`);
