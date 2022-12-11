




/**
 * Router to make a collection of all the API functions in registerNode.js
 * @returns The router with the implementation of the get_Token and get_Name functions.
 */
function init_registerJob_router() {
    let router = new KoaRouter();
    router
        .use(cors())
        .use(KoaBodyParser())
        .get("/getToken", get_Token)
        .post("/getNodeName", get_Name);
    return router;
}

/** Router collecting all functions of registerNode.js */
export let register_job_api_router = init_registerJob_router();