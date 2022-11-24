import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import { get_k3s_token } from "../../utils/get-token-k3s.js";

async function getToken_registerNode() {
  let token = await get_k3s_token();
  ctx.body = token;
  ctx.status = 200;

  console.log("Token guardado en memoria");

  fs.appendFile('k3s_token.txt', token, function (err) {
    if (err) throw err;
  } );
}

function init_registerNode_router() {
    let router = new KoaRouter();
    router
        .use(KoaBodyParser())
        .post("/registerNode", getToken_registerNode);
    return router;
}

export let registerNode_api_router = init_registerNode_router();
