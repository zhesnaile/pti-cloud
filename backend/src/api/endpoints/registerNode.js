import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import { get_k3s_token } from "../../utils/get-token-k3s.js";

async function get_Token() {
  let token = await get_k3s_token();
  ctx.body = token;
  ctx.status = 200;

  console.log("Token guardado en memoria");

}

async function get_NodeName() {
  let name ;
}

function init_registerNode_router() {
    let router = new KoaRouter();
    router
        .use(KoaBodyParser())
        .post("/getToken", get_Token);
        .get("/getNodeName", get_Node_Name)
    return router;
}

export let register_node_api_router = init_registerNode_router();
