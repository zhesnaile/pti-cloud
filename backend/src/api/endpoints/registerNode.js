import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { get_k3s_token, get_Node_Name } from "../../utils/add-k3s-node.js";
import { redis_get_K3Sconfig } from "../../utils/access-redis.js";

/*
  Comprobar funcionamiento:
  curl -X GET http://localhost:3000/api/getToken
*/
async function get_Token(ctx, next) {
  let token = await get_k3s_token();

  ctx.status = 200;
  ctx.body = token;
  console.log("Token del servidor K3s: ", ctx.body);

  await next();
}

/*
Comprobar funcionamiento:
curl -X POST http://localhost:3000/api/getNodeName -H "Content-Type: application/json" -d '{"user": "juan"}'
*/
async function get_Name(ctx, next) {
  let user = ctx.request.body.username;
  let name = await get_Node_Name(user);

  ctx.status = 200;
  ctx.body = name;
  console.log("Nombre asignado al nodo:", ctx.response);

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
        .post("/getK3Stoken", get_K3S_token)
        .get("/getToken", get_Token)
        .post("/getNodeName", get_Name);
    return router;
}

export let register_node_api_router = init_registerNode_router();
