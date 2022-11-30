import KoaRouter from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import mime from "mime-types";
import fs from "fs";
import path from "path";

async function getScript(ctx, next){
  //let file_path = "./installation-client.sh";
  // let path = "/Users/jordiibru/Documents/first-clone/pti-cloud/backend/public/installation-client.sh";
  const __dirname = path.resolve();
  var file_path = path.join(__dirname, 'public', 'installation-client.sh');
  var mimeType = mime.lookup(file_path);
  const src = fs.createReadStream(file_path);
    
  ctx.response.set("Content-disposition", "attachment; filename=installation-client.sh");
  ctx.response.set("Content-type", mimeType);
  ctx.status = 200;
  ctx.body = src;
  
  await next();
  }


  function init_front_helper_router() {
    let router = new KoaRouter();
    router
        .use(KoaBodyParser())
        .get("/getscript", getScript);
    return router;
}

export let fronthelper_api_router = init_front_helper_router();

