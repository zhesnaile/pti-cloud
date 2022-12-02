import redis from 'redis';

//FUNCIONALIDADES PÁGINA WEB ------------------------------------------------------------------------------------

export async function redis_login_user(user, password) {
    if (user === undefined || password === undefined) {
        console.log(`${Date.now()} LOGIN ERROR: Failed login`);
        return false;
    }

    const redisClient = redis.createClient();
    await redisClient.connect();

    if(await redisClient.hGet(user,'password') !== password){
        console.log(`${Date.now()} LOGIN ERROR: Credentials are wrong`);
        await redisClient.disconnect();
        return false;
    }
    console.log(`${Date.now()}: Login in with user '${user}' and password '${password}'`);
    await redisClient.disconnect();
    return true;
}

export async function redis_register_user(user: string, password: string, password2: string) {
    if (user === undefined || password === undefined || password2 === undefined) {
        console.log(`${Date.now()} REGISTER ERROR: Failed register`);
        return false;
    }
    else if(password !== password2){
        console.log(`${Date.now()} REGISTER ERROR: Passwords differ`);
        return false;
    }

    const redisClient = redis.createClient();
    await redisClient.connect();

    if (await redisClient.exists(user) == 1){
        console.log(`${Date.now()} REGISTER ERROR: User exists in the DB`);
        await redisClient.disconnect();
        return false;
    }

    await redisClient.HSET(user, Object.entries({'password': password}));
    console.log(`${Date.now()}: Register with user '${user}' and password '${password}'`);
    await redisClient.disconnect();
    return true;
}

//FUNCIONALIDADES WIREGUARD ------------------------------------------------------------------------------------

/*
* Comprueba que exista un usuario en la BD.
*/
export async function check_user(user) {
    const redisClient = redis.createClient();
    await redisClient.connect();
    if (await redisClient.exists(user) !== 1){
        console.log(`${Date.now()} USER CHECK: User not exists in the DB`);
        await redisClient.disconnect();
        return false;
    } else return true;
}

/*
* Añade al usuario de la BD, el número de wireguard y el nombre del archivo de configuracion.
*/
export async function redis_wgconfig(user, wg_num, wg_config) {
    const redisClient = redis.createClient();
    await redisClient.connect();

    if (await redisClient.exists(user) !== 1){
        console.log(`${Date.now()} WG_CONFIG: User not exists`);
        await redisClient.disconnect();
        return false;
    }
    await redisClient.HSET(user, Object.entries({'wg_num': wg_num}));
    await redisClient.HSET(user, Object.entries({'wg_config': wg_config}));
    await redisClient.disconnect();
    console.log(`${Date.now()}: Wireguard config from the user '${user}' with wg_num '${wg_num}' and  with wg_config '${wg_config}'`);
    return true;
}

/* 
* Comprueba si el usuario tiene un wg_config valido (que exista y que no sea 'invalid') y lo devuelve.
* Sino devuelve un null para que pueda comprovarse en la funcion de donde se llame.
*/
export async function redis_get_wgconfig(user: String){
    const redisClient = redis.createClient();
    await redisClient.connect();
    let config = 'null';
    if (await redisClient.hExists(user, 'wg_config') == true && redisClient.hGet(user,'wg_config') !== 'invalid') config = await redisClient.hGet(user, 'wg_config');
    console.log(`${config}`);
    await redisClient.disconnect();
    return config;
}

/* 
* Comprueba si el usuario tiene un wg_num valido (que exista y que no sea 'invalid') y lo devuelve.
* Sino devuelve un null para que pueda comprovarse en la funcion de donde se llame.
*/
export async function redis_get_wgnum(user: String) : Promise<number>{
    const redisClient = redis.createClient();
    await redisClient.connect();
    let wgnum = 'null';
    if (await redisClient.hExists(user, 'wg_num') == 1 && redisClient.hGet(user,'wg_num') !== 'invalid') wgnum = await redisClient.hGet(user, 'wg_num');
    console.log(`${wgnum}`);
    await redisClient.disconnect();
    return wgnum;
}

/**
 * Pone los parametros de wg de un usuario de la BD en invalidos para inhabilitar al usuario
 */
export async function redis_revoke_wgconfig(user){
    const redisClient = redis.createClient();
    await redisClient.connect();
    await redisClient.HSET(user, Object.entries({'wg_num': 'invalid'}));
    await redisClient.HSET(user, Object.entries({'wg_config': 'invalid'}));
    await redisClient.disconnect();
}

//FUNCIONALIDADES K3S ------------------------------------------------------------------------------------

/*
* Añade al usuario de la BD, el nombre de la maquina de k3s.
*/
export async function redis_K3Sconfig(user: String, k3s_name: String) {
    const redisClient = redis.createClient();
    await redisClient.connect();

    if (await redisClient.exists(user) !== 1){
        console.log(`${Date.now()} K3S CONFIG: User not exists`);
        await redisClient.disconnect();
        return false;
    }
    await redisClient.HSET(user, Object.entries({'k3s_name': k3s_name}));
    await redisClient.disconnect();
    console.log(`${Date.now()}: K3S config from the user '${user}' with k3s_name '${k3s_name}'`);
    return true;
}

/**
 * Comprueba que el usuario tiene asignada la maquina k3s_name.
 */
export async function redis_check_K3Sconfig(user, k3s_name){
    const redisClient = redis.createClient();
    await redisClient.connect();
    if (await redisClient.hExists(user, 'k3s_name') == 1 && await redisClient.hGet(user, 'k3s_name') == k3s_name){
        redisClient.disconnect();
        return true;
    }
    redisClient.disconnect();
    return false;
}
/* 
* Comprueba si el usuario tiene un k3s_name valido (que exista y que no sea 'invalid') y lo devuelve.
* Sino devuelve un null para que pueda comprovarse en la funcion de donde se llame.
*/
export async function redis_get_K3Sconfig(user){
    const redisClient = redis.createClient();
    await redisClient.connect();
    let k3s_name = 'null';
    if (await redisClient.hExists(user, 'k3s_name') == 1 && redisClient.hGet(user,'k3s_name') !== 'invalid') k3s_name = await redisClient.hGet(user, 'k3s_name');
    console.log(`${k3s_name}`);
    await redisClient.disconnect();
    return k3s_name;
}



//---------------------------------------------------------------------------------------------------------------------------------------
//NOTAS SOBRE EL USO DE REDIS

/*
    * username, password, id_peer, K3S_namespace 
    * comprovar: hget jordi password
    * hset amb un parametre duna key existent, la modifica
*/



//sudo apt-get install redis (linux)
//brew install redis (mac)

/*
One tab for each instruction:
    Turn on the server: redis-server
    get in the server: redis-cli
        >When in client:
            - quit
            - SET user Jordi
            - GET user
            - DEL user
            - KEYS * (print all keys)
            - flushall (delete all keys)
            - lpush (per crear llistes. l= left, r= right) eg: lpush friends john
            - lrange friends 0 -1 (lrange <listname> <start> <fin>)
            - lpop o rpop (delete ini or last element)
            - SADD  hobbies "basket" (afegir sets)
            - SMEMBERS hobbies --> "basket"
            - SREM hobbies "basket" (borrar basket del set)
            - HSET user name jordi
            - HGET user name ---> jordi
            - HGETALL user ---> name jordi (son hashes)
            - HDEL user name --> es borra jordi
            - HEXISTS user name --> 0



Instalar redis pel projecte
npm i redis
main.js:
import redis from 'redis'
const client = Redis.createClient({url : potestarbuit i es default})

llavors fem: redis-server. fem el run del client.
en la operacio get/post:
redisClient.setex('photos', JSON.stringify(data)

redis-cli per poder operar.
keys *
podrem veure que sha creat photos

per cachejar si estan les dades fem:
redisClient.get('photos?albumId=${albumId}', async (error, photos) => { el async es per si es un async
    if(error) console.error(error)
    if(photos != null){ si hi ha fotos, les retorna
        return res.json(JSON.parse(photos))
    } else{
        {...codi on agafem les dades i ho posem a data}
        redisClient.setex('photos?albumId=$(albumId}', JSON.stringify(data)
    }
})


millor forma de guardar usuaris
HSET jordi password lala token 123
HGET jordi password -----> lala
HGET jordi token ------> 123

*/