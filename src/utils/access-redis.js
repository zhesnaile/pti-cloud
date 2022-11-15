import redis from 'redis';

export async function redis_auth_check(user, password) {
    if (user === undefined || password === undefined) {
        console.log(`${Date.now()} ERROR: Failed login`);
        return false;
    }
    console.log(`${Date.now()}: Login in attempt with user '${user}' and password '${password}'`);
    return true;
}

export async function redis_reg_check(user, password, password2) {


    if (user === undefined || password === undefined) {
        console.log(`${Date.now()} ERROR: Failed login`);
        return false;
    }
    else if(password !== password2){
        console.log(`${Date.now()} ERROR: Passwords differ`);
        return false;
    }
    /*else if(user === 'jordi'){
        console.log(`${Date.now()} ERROR: User exists in the DB`);
        return false;
    }*/
    const redisClient = redis.createClient();
    await redisClient.connect();
    //redisClient.SADD('USUARIOS',user);
    redisClient.HSET(user, Object.entries({'password': password}));
    /* comprovar: hget jordi password */
    console.log(`${Date.now()}: Register attempt with user '${user}' and password '${password}'`);
    return true;
}

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
server.js:
const redis = require('redis')
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
HMSET jordi password lala token 123
HGET jordi password -----> lala
HGET jordi token ------> 123

*/