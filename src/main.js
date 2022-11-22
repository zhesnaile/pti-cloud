import Koa from "koa";
import { api_router } from "./api/api.js";
//import cors from "cors";
//import bodyParser from "koa-bodyparser";
//import BP from 'body-parser';

const port = 3000;

let app = new Koa();
//app.use(bodyParser());
//app.use(BP.json());
//app.use(BP.urlencoded({extended: true}));
app.use(api_router.routes()).use(api_router.allowedMethods());

app.listen(port);
console.log(`Listening on port ${port}`);
