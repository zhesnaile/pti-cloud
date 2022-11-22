import redis from 'redis';

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

export async function redis_register_user(user, password, password2) {
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

    await redisClient.HSET(user, Object.entries({'password': password, 'token': 'tmp_token'} ));
    console.log(`${Date.now()}: Register with user '${user}' and password '${password}'`);
    await redisClient.disconnect();
    return true;
}


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

*/

/* Instalar redis pel projecte
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
redisClient.get('photos?albumId=${albumId}', async (error, photos) => { //el async es per si es un async
    if(error) console.error(error)
    if(photos != null){ //si hi ha fotos, les retorna
        return res.json(JSON.parse(photos))
    } else{
        {...codi on agafem les dades i ho posem a data}
        redisClient.setex('photos?albumId=$(albumId}', JSON.stringify(data)
    }
})
*/


/* 
millor forma de guardar usuaris
HSET jordi password lala token 123
HGET jordi password -----> lala
HGET jordi token ------> 123

*/