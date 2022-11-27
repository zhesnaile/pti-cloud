import KoaRouterfrom "@koa/router";
import KoaBodyParser from "koa-bodyparser";
//import {} from "../../utils/";

function init_runService_router() {
    let router = new KoaRouter();
    router
        .use(KoaBodyParser())
        .get("");
    return router;
}

export let run_service_api_router = init_runService_router();
