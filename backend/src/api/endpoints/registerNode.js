import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import { get_k3s_token } from "../../utils/get-token-k3s.js";
import mime from "mime-types";
import fs from "fs";
import cors from "@koa/cors";
import { redis_get_wgconfig, redis_get_K3Sconfig } from "../../utils/access-redis.js";

async function getToken_registerNode() {
  let token = await get_k3s_token();
  ctx.body = token;
  ctx.status = 200;

  console.log("Token guardado en memoria");

  fs.appendFile('k3s_token.txt', token, function (err) {
    if (err) throw err;
  } );
}

async function get_WG_config(ctx, next) {
  let req_body = ctx.request.body;
  let username = req_body.name;
  
  let config = await redis_get_wgconfig(username);
  if (config !== 'null') {
      ctx.status = 200;
      ctx.body = JSON.stringify({
        wg_config: config,
    })
  } else {
      ctx.status = 404;
      ctx.body = `Error`;
  }
  await next();
}

async function get_K3S_token(ctx, next) {
  let req_body = ctx.request.body;
  let username = req_body.name;
  
  let name = await redis_get_K3Sconfig(username);
  if (name !== 'null') {
      ctx.status = 200;
      ctx.body = JSON.stringify({
        k3s_name: name,
    })
  } else {
      ctx.status = 404;
      ctx.body = `Error`;
  }
  await next();
}

function init_registerNode_router() {
    let router = new KoaRouter();
    router
        .use(cors())
        .use(KoaBodyParser())
        .post("/registerNode", getToken_registerNode)
        .post("/getK3Stoken", get_K3S_token)
        .post("/getWGconfig", get_WG_config);
    return router;
}

export let register_node_api_router = init_registerNode_router();
