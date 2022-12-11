/**
 * RunTask API Functions
 */
import { redis_login_user } from "../../utils/access-redis.js";
import { ParameterizedContext, Next } from "koa";
import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import { loginBody } from "../../types/api_request_bodies.js"


async function get_Yaml (ctx: ParameterizedContext, next: Next) { 
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

    ///var/lib/rancher/k3s/server/manifests
  
    try{
      if(fs.existsSync(file_path)){
        var mimeType = mime.lookup(file_path);
        const src = fs.createReadStream(file_path);     
        ctx.response.set("Content-disposition", "attachment; filename=installation-client.sh");
        ctx.response.set("Content-type", mimeType);
        ctx.status = 200;
        ctx.body = src;
      } else{
        ctx.status = 404;
        ctx.body = `Error`;
      }
    }
    catch (error){
      console.log(error);
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
          .use(cors())
          .use(KoaBodyParser())
          .get("/getToken", get_Token)
          .post("/getNodeName", get_Name);
      return router;
  }
  
  /** Router collecting all functions of registerNode.js */
  export let register_task_api_router = init_registerTask_router();  