import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import { ParameterizedContext, Next } from "koa";
import cors from "@koa/cors";
import { get_k3s_token} from "../../utils/add-k3s-node.js";
import { redis_get_K3Sconfig } from "../../utils/access-redis.js";


/**
 * This file contains all the functions related to adding a node in the K3s cluster.
 */

/**
 * Obtains the K3s Token and passes it to the client.
 * Basically, it is called by the install-client.sh script via curl -X GET, so the Token can be transfered to the client.
 * @param {*} ctx The context of the request. Empty because we don't need any option in this GET.
 * @param {*} next
 */
async function get_token(ctx: ParameterizedContext, next: Next) {
  let token = await get_k3s_token();

  ctx.status = 200;
  ctx.body = token;
  console.log(`${Date.now()}: Token del servidor K3s solicitado`);

  await next();
}

/**
 * Obtains a name for the node and assigns it to the client.
 * Basically, it is called by the install-client.sh script, so the node obtains a name and it is assigned to the user.
 * @param {*} ctx The context of the request. The context passed consists in: {username} (client username)
 * @param {*} next
 */
async function get_name(ctx: ParameterizedContext, next: Next) {
  let user = ctx.request.body.username;
  let name = await get_node_Name(user);

  ctx.status = 200;
  ctx.body = name;
  console.log("Nombre asignado al nodo:", ctx.response);

  await next();
}

/**
 * Router to make a collection of all the API functions in registerNode.js
 * @returns The router with the implementation of the get_Token and get_Name functions.
 */
function init_registerNode_router() {
    let router = new KoaRouter();
    router
        .use(cors())
        .use(KoaBodyParser())
        .post("/getToken", get_token)
        .post("/getNodeName", get_name);
    return router;
}

/** Router collecting all functions of registerNode.js */
export let register_node_api_router = init_registerNode_router();
