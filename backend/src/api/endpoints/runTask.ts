/**
 * RunTask API Functions
 */
import { redis_login_user } from "../../utils/access-redis.js";
import { ParameterizedContext, Next } from "koa";
import KoaRouter from "@koa/router";
import multer from "@koa/multer"
import { runtaskBody } from "../../types/api_request_bodies.js"
import fs from 'fs';

/**
 * This file contains all the functions related to executing a service in the K3s cluster.
 */

/**
 * Obtains the K3s Token and passes it to the client.
 * Basically, it is called by the install-client.sh script via curl -X GET, so the Token can be transfered to the client.
 * @param {*} ctx The context of the request. Empty because we don't need any option in this GET.
 * @param {*} next
 */
async function upload_yaml (ctx: ParameterizedContext, next: Next) {
  let req_body = <runtaskBody>ctx.request.body;
  let valid_login = await redis_login_user(req_body.name, req_body.pword);
  if (valid_login === true) {
      ctx.status = 200;
      let file = ctx.request.file;
      if (file !== null) {
        let valid_extension = ['yaml', 'yml'];
        let file_name = file.originalname;
        let file_extension = file_name.split('.').pop();
        let valid = valid_extension.includes(file_extension);
        if (valid === false) {
          ctx.status = 404;
          ctx.body = 'File extension not valid.';
        } else {
          fs.writeFile(`/var/lib/rancher/k3s/server/manifests/${file_name}`, file.buffer, (err) => {
          if (err)
            console.log(err);
          else {
            console.log(`${Date.now()}: new job saved to /var/lib/rancher/k3s/server/manifests/${file_name}\n`);
          }
        });
          
        }
      } else {
        ctx.status = 404;
        ctx.body = 'Error.';
      }   
  } else {
    ctx.status = 404;
    ctx.body = `Login error.`;
  }
  await next();
}

  
/**
* Router to make a collection of all the API functions in registerNode.js
* @returns The router with the implementation of the get_Token and get_Name functions.
*/
function init_registerTask_router(): KoaRouter {
  let router = new KoaRouter();
  router
    .post("/uploadYAML", multer().single('file2upload'), upload_yaml)
  return router;
}
  
/** Router collecting all functions of registerNode.js */
export let register_task_api_router = init_registerTask_router();  