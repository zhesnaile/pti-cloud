import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import { get_k3s_token } from "../../utils/get-token-k3s.js";
import mime from "mime-types";
import fs from "fs";
import cors from "@koa/cors";

async function getToken_registerNode() {
  let token = await get_k3s_token();
  ctx.body = token;
  ctx.status = 200;

  console.log("Token guardado en memoria");

  fs.appendFile('k3s_token.txt', token, function (err) {
    if (err) throw err;
  } );
}


async function getHello(ctx, next){
  let path = "/Users/jordiibru/Documents/first-clone/pti-cloud/backend/public/hello.txt";
  var mimeType = mime.lookup(path);
  const src = fs.createReadStream(path);
  ctx.response.set("content-type", mimeType);
  ctx.response.set("content-disposition", "attachment; filename=hello.txt");
  ctx.status = 200;
  ctx.body = src;

  await next();
}

function init_registerNode_router() {
    let router = new KoaRouter();
    router
        .use(cors())
        .use(KoaBodyParser())
        .post("/registerNode", getToken_registerNode)
        .post("/helloTest", getHello);
    return router;
}

export let register_node_api_router = init_registerNode_router();
