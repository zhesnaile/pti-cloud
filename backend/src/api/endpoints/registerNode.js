import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import { get_k3s_token, get_Node_Name } from "../../utils/add-k3s-node.js";

async function get_Token(ctx, next) {
  let token = await get_k3s_token();
  ctx.response = token;
  ctx.status = 200;

  console.log("Devuelve token");
  console.log(token);

  await next();
}

async function get_Name(ctx, next) {
  let user = ctx.request.body.username;
  let name = await get_Node_Name(user);
  ctx.response = name;
  ctx.status = 200;

  console.log("Devuleve nombre");

  await next();
}

function init_registerNode_router() {
    let router = new KoaRouter();
    router
        .use(KoaBodyParser())
        .get("/getToken", get_Token)
        .get("/getNodeName", get_Name);
    return router;
}

export let register_node_api_router = init_registerNode_router();
