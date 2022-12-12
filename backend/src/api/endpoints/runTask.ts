/**
 * RunTask API Functions
 */
import { redis_login_user } from "../../utils/access-redis.js";
import { ParameterizedContext, Next } from "koa";
import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import { loginBody } from "../../types/api_request_bodies.js"


async function upload_yaml (ctx: ParameterizedContext, next: Next) { 
    let req_body = <loginBody>ctx.request.body;

    let valid_login = await redis_login_user(req_body.name, req_body.pword);
    if (valid_login === true) {
        ctx.status = 200;
        ctx.body = `Welcome back, ${req_body.name}.`;
    } else {
        ctx.status = 404;
        ctx.body = `Login error.`;
        await next();
    }

    let file = ctx.request.body.file;

    if (file !== null) {
        let valid_extension = ['yaml', 'yml'];
        let file_name = file.name;
        let file_extension = file_name.split('.').pop();
        let valid = valid_extension.includes(file_extension);
        if (valid === false) {
            ctx.status = 404;
            ctx.body = 'File extension not valid.';
        }
    } else {
        ctx.status = 404;
        ctx.body = 'Error.';
        await next();
    }

    //formidable: {uploadDir: '/var/lib/rancher/k3s/server/manifests' },
   
    await next();
  }
      //formidable: {uploadDir: '/var/lib/rancher/k3s/server/manifests' },

  
  /**
   * Router to make a collection of all the API functions in registerNode.js
   * @returns The router with the implementation of the get_Token and get_Name functions.
   */
  function init_registerTask_router(): KoaRouter {
      let router = new KoaRouter();
      router
        .use(KoaBodyParser({
          formidable: {uploadDir: './uploads' },
          multipart: true,
          urlencoded: true
        }))
        .post("/uploadYAML", upload_yaml)
      return router;
  }
  
  /** Router collecting all functions of registerNode.js */
  export let register_task_api_router = init_registerTask_router();  