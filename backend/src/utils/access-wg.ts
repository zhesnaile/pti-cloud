//LLAMA SCRIPT PARA LA CONFIG DEL NUEVO CLIENT
import {exec} from "child_process" ;
import { redis_get_wgconfig, check_user, redis_wgconfig, redis_get_wgnum, redis_revoke_wgconfig } from "./access-redis.js";

/**
* This file contains all the functions that execute the scripts of Wireguard (VPN)
*/

/**
 * Obtains the configuration filename of the user related to VPN.
 * Checks if the user has a configuration file. If it exists then we get it from the DB, if it doesn't exist we created executing an script.
 * @param {string} user (client username)
 * @returns The configuration filename
 */

 export async function getConfig(user: string) {
  let user_exists = await check_user(user);
  if ( user_exists == true) { //COMPRUEBA EL USER
    let config_file = redis_get_wgconfig(user); //COMPRUEBA BASE DE DATOS REDIS SI HAY UN ARCHIVO DE CONFIG
    if (config_file != null) {
      return config_file;
    }
    else {
      return await addClient(user);
    }
  }
  else {
    console.log("No existe el usuario");
  }
}

/**
 * Creates the configuration of the user related to VPN.
 * Executes newclient.sh script and updates de DB with the new user
 * @param {string} user (client username)
 * @returns The configuration filename
 */

 export async function addClient(user: string) {
  const add_client_script = import.meta.url + "newclient.sh"
  console.log(add_client_script);
  exec(add_client_script, async (error, stdout, stderr) => {
    let lines = stdout.toString().split('&');
    let output = new Array();
    lines.forEach((_, i) => {
      output[i] = lines[i];
    });
    //console.log(output[0]); //COMPROBACION DEL NUMERO DEL CLIENTE
    //console.log(output[1]); //COMPROBACION DE LA CONFIG DEL CLIENTE

    //numero del cliente = output[0], configuracion del cliente output[1]
    // No accedemos a BD si no
    if (output[0] !== undefined && output[1] !== undefined){
      await redis_wgconfig(user, output[0], output[1]);
      console.log("clientadded succesfully");
      return output[1];
    } else {
      console.error(`ERROR: Couldn't add a wg client config for '${user}'`);
    }

  });
}

/**
 * Deletes the configuration of the user related to VPN and related to the DB.
 * Checks if the user exists. If it exists then we get the number from the DB and we delete the user's configuration
 * @param {string} user (client username)
 */

export async function deleteConfig(user: string) {
  let user_exists = await check_user(user);
  if (user_exists == true){ //COMPRUEBA EL USER
  let number = await redis_get_wgnum(user); //le da el numero del usuario en la config de wireguard que estaba en la bd
      if (number != null) {
        await redis_revoke_wgconfig(user);
        return await revokeClient(number);
      }
      else {
        console.log("No tiene numero asignado")
      }
  }
  else {
    console.log("No existe el usuario por eso no se puede borrar");
  }
}

/**
 * Deletes the configuration of the user related to VPN.
 * Executes revokeClient.sh script and deletes the configuration on that position
 * @param {*} number (client position in the VPN configuration)
 */

export async function revokeClient(number: number) {
  const revoke_client_script = import.meta.url + "revokeClient.sh";
  let command = revoke_client_script + number; //si cambiais el path para probarlo, no os olvideis del espacio final de despues de .sh
  exec(command, function callback(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
  console.log("client deleted succesfully");
}
