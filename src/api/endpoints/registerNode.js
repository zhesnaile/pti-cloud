import { get_k3s_token } from "../../utils/get-token-k3s.js";

function init_registerNode_router() {
    let router = new KoaRouter();
    router
        .use(KoaBodyParser())
        .post("/registerNode", /*nombre de la función de la API*/);
    return router;
}

export let registerNode_api_router = init_registerNode_router();
