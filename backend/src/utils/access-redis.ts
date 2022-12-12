/**
 * Functionalities that interact with the REDIS database.
 * console.log are commented for security purposes, but in case of debugging, uncomment it.
 * The code is divided in different sections -> WebApp, Wireguard and K3S.
 */
import redis from 'redis';
import { parse_int_from_string } from "./parsing-utils.js"

//---- WEB APP ------------------------------------------------------------------------------------

/**
 * Redis function for the app web USER LOGIN.
 * It checks if the parameters are valid. Will access the DB to check if it is a valid login.
 * @param {String} user Username of the user passed in the USER web page field.
 * @param {String} password Password passed in the PASSWORD web page field.
 * @returns TRUE if credentials are valid and the user exists on the DB.
 * @returns FALSE if credentials are invalid (undefined) or the user does not exist on the DB.
 */
export async function redis_login_user(user: string , password: string) {
    if (user === undefined || password === undefined) {
        //console.log(`${Date.now()} LOGIN ERROR: Failed login`);
        return false;
    }

    const redisClient = redis.createClient();
    await redisClient.connect();

    if(await redisClient.hGet(user,'password') !== password){
        //console.log(`${Date.now()} LOGIN ERROR: Credentials are wrong`);
        await redisClient.disconnect();
        return false;
    }
    //console.log(`${Date.now()}: Login in with user '${user}' and password '${password}'`);
    await redisClient.disconnect();
    return true;
}
/**
 * Redis function for the app web USER REGISTRATION.
 * It checks if the paramters are ok. Will access the DB if it a valid registration.
 * @param {String} user Username of the new user.
 * @param {String} password Password of the new user.
 * @param {String} password2 Password confirmation of the new user.
 * @returns TRUE if credentials are valid and this user does not exist in the DB. 
 * @returns FALSE if credentials are invalid (undefined), passwords does not match or it already exists in the DB.
 */
export async function redis_register_user(user: string, password: string, password2: string) {
    if (user === undefined || password === undefined || password2 === undefined) {
        //console.log(`${Date.now()} REGISTER ERROR: Failed register`);
        return false;
    }
    else if(password !== password2){
        //console.log(`${Date.now()} REGISTER ERROR: Passwords differ`);
        return false;
    }

    const redisClient = redis.createClient();
    await redisClient.connect();

    if (await redisClient.exists(user) == 1){
        //console.log(`${Date.now()} REGISTER ERROR: User exists in the DB`);
        await redisClient.disconnect();
        return false;
    }

    await redisClient.HSET(user, Object.entries({'password': password}));
    //console.log(`${Date.now()}: Register with user '${user}' and password '${password}'`);
    await redisClient.disconnect();
    return true;
}

/**
 * Redis function to basically check if a user exists in the DB.
 * @param {String} user Username of the user that we want to check.
 * @returns TRUE if the user exists in the DB.
 * @returns FALSE if the user does not exists in the DB.
 */
 export async function check_user(user: string) {
    const redisClient = redis.createClient();
    await redisClient.connect();
    if (await redisClient.exists(user) !== 1){
        //console.log(`${Date.now()} USER CHECK: User not exists in the DB`);
        await redisClient.disconnect();
        return false;
    } else return true;
}

//----WIREGUARD ------------------------------------------------------------------------------------

/**
 * Redis function for Wireguard based purposes.
 * Check if the user passed exists in the DB and adds two new fields on its profile.
 * wg_num for the wg client id and the wireguard config name assigned.
 * @param {String} user Username of the user that we want to give WG configs.
 * @param {String} wg_num Wireguard ID passed by other functionalities.
 * @param {String} wg_config Wireguard config file passed by other functionalities.
 * @returns TRUE if the user exists in the DB and could add the new fields.
 * @returns FALSE if the user does not exists in the DB.
 */
export async function redis_wgconfig(user: string, wg_num:string , wg_config: string) {
    const redisClient = redis.createClient();
    await redisClient.connect();

    if (await redisClient.exists(user) !== 1){
        //console.log(`${Date.now()} WG_CONFIG: User not exists`);
        await redisClient.disconnect();
        return false;
    }
    await redisClient.HSET(user, Object.entries({'wg_num': wg_num}));
    await redisClient.HSET(user, Object.entries({'wg_config': wg_config}));
    await redisClient.disconnect();
    //console.log(`${Date.now()}: Wireguard config from the user '${user}' with wg_num '${wg_num}' and  with wg_config '${wg_config}'`);
    return true;
}


/**
 * Redis function for Wireguard based purposes.
 * Check if the user exists in the DB and gets the value of its wireguard config.
 * @param {string} user Username of the user that we want to check.
 * @returns If the user exists and has a valid wg_config, returns the wg_config of the user in the DB.
 * @returns If the user does not exist, or has an invalid wg_config, or does not have any wg_config assigned, returns null.
 */
export async function redis_get_wgconfig(user: string){
    const redisClient = redis.createClient();
    await redisClient.connect();
    let config = null;
    if (await redisClient.exists(user) === 1 && await redisClient.hExists(user, 'wg_config') == true && await redisClient.hGet(user,'wg_config') !== 'invalid') {
        config = await redisClient.hGet(user, 'wg_config');
    }
    await redisClient.disconnect();
    return config;
}

/**
 * Redis function for Wireguard based purposes.
 * Check if the user exists in the DB and gets the value of its wiregurd id (wg_num).
 * @param {string} user Username of the user that we want to check.
 * @returns If the user exists and has a valid wg_num, returns the wg_num of the user in the DB.
 * @retuns If the user does not exist, or has an invalid wg_num, or does not have any wg_num assigned, returns null.
 */
 export async function redis_get_wgnum(user: string) : Promise<number | null>{
    const redisClient = redis.createClient();
    await redisClient.connect();
    let wgnum = null;
    if (await redisClient.exists(user) === 1 && await redisClient.hExists(user, 'wg_num') == true && await redisClient.hGet(user, 'wg_num') !== 'invalid'){
        wgnum = await redisClient.hGet(user, 'wg_num');
        wgnum = parse_int_from_string(wgnum);
    }
    await redisClient.disconnect();
    return wgnum;
}

/**
 * Redis function for Wireguard based purposes.
 * Check if the user exists in the DB and revokes its credentials.
 * wg_num and wg_config will change to "invalid".
 * @param {string} user Username of the user that we want to revoke.
 * @returns TRUE if the user exists.
 * @returns FALSE if the user not exists.
 */
export async function redis_revoke_wgconfig(user: string){
    const redisClient = redis.createClient();
    await redisClient.connect();
    if(await redisClient.exists(user) === 1){
        await redisClient.HSET(user, Object.entries({'wg_num': 'invalid'}));
        await redisClient.HSET(user, Object.entries({'wg_config': 'invalid'}));
        await redisClient.disconnect();
        return true;
    }
    await redisClient.disconnect();
    return false;
}

//---- K3S ------------------------------------------------------------------------------------

/**
 * Redis function for K3S based purposes.
 * Check if the user exists in the DB and assign a k3s_name.
 * @param {string} user Username of the user that we want to assign a K3S machine.
 * @param {string} k3s_name Name of the K3S machine.
 * @returns TRUE if the user exists.
 * @returns FALSE if the user does not exists.
 */
export async function redis_K3Sconfig(user: string, k3s_name: string) {
    const redisClient = redis.createClient();
    await redisClient.connect();

    if (await redisClient.exists(user) !== 1){
        //console.log(`${Date.now()} K3S CONFIG: User not exists`);
        await redisClient.disconnect();
        return false;
    }
    await redisClient.HSET(user, Object.entries({'k3s_name': k3s_name}));
    await redisClient.disconnect();
    //console.log(`${Date.now()}: K3S config from the user '${user}' with k3s_name '${k3s_name}'`);
    return true;
}

/**
 * Redis function for K3S based purposes.
 * Check if the user exists in the DB and checks if the k3s_names passed as a parameter is assigned to the user.
 * @param {string} user Username of the user that we want to check its k3s_name.
 * @param {string} k3s_name Name of a k3s machine.
 * @returns TRUE if the user has the k3s_name assigned as a k3s_name.
 * @returns FALSE if the user does not have k3s_name assigned, or is invalid or the user does not exist.
 */
export async function redis_check_K3Sconfig(user: string, k3s_name: string) : Promise<boolean>{
    const redisClient = redis.createClient();
    await redisClient.connect();
    if (await redisClient.exists(user) === 1 && await redisClient.hExists(user, 'k3s_name') == true && await redisClient.hGet(user, 'k3s_name') == k3s_name){
        redisClient.disconnect();
        return true;
    }
    redisClient.disconnect();
    return false;
}

/**
 * Redis function for K3S based purposes.
 * Check if the user passed as a parameter has a k3s_name assigned and gets it.
 * @param {string} user Username of the user that we want to check its K3S_name.
 * @returns the K3S_name of the user if it has one assigned.
 * @returns null if the user does not has any machine assigned or does not exist or is invalid.
 */
export async function redis_get_K3Sconfig(user: string): Promise<string | null> {
    const redisClient = redis.createClient();
    await redisClient.connect();
    let k3s_name = null;
    if (await redisClient.exists(user) === 1 && await redisClient.hExists(user, 'k3s_name') == true && await redisClient.hGet(user,'k3s_name') !== 'invalid'){
        k3s_name = await redisClient.hGet(user, 'k3s_name');
    }
    await redisClient.disconnect();
    if (k3s_name == undefined) k3s_name = null;
    return k3s_name;
}


/** REDIS USAGE NOTES. Source: https://redis.io/docs/
 * 
 * Installation:
 * sudo apt-get install redis (linux)
 * brew install redis (MacOS)
 * 
 * --------------------------------------------------------
 * 
 * Install redis on the project:
 * npm i redis
 * main.js: import redis from 'redis'
 * const client = redis.createClient({url: default})
 *
 * --------------------------------------------------------
 * 
 * Initialization:
 * First tab: redis-server
 *    > Zero interaction with it.
 * Second tab: redis-cli
 *    > Console for DB data management.
 *
 * --------------------------------------------------------
 * Data in the DB are hashes.
 * Every instruction has to be HASH related.
 * HGET, HSET, HDEL, HGETALL, HEXISTS, ...
 *
 * --------------------------------------------------------
 * 
 * The primary key is the username:
 * >jordi
 * >password: 123
 * >wg_num: 1
 * >wg_config: ws0
 * >k3s_name: ralts
 * 
 * --------------------------------------------------------
 * 
 * Check for a field:
 * >HSET jordi password 123
 * >HGET jordi password --> 123
 * >HGETALL jordi --> (all fields)
 * >KEYS * --> all primary keys (usernames)
 * 
 */