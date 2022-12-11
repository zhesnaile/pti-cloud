

async function get_Yaml () { 
  const __dirname = path.resolve();
  var file_path = path.join(__dirname, 'public', 'algo.yaml');

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
function init_registerTask_router() {
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