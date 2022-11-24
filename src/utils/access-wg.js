//LLAMA SCRIPT PARA LA CONFIG DEL NUEVO CLIENT
import {exec} from "child_process" ;
//import {config_exists} from "../utils/access-redis.js";

export async function getConfig(user, pass) {
   //COMPRUEBA EL USER
  let config_file = config_exists(user, pass); //COMPRUEBA BASE DE DATOS REDIS
  if (config_file != null) {
    return config_file;
  } else {
    return await addClient(user, pass);
  }
}

export async function addClient() {
  exec('/home/sandra/pti-cloud/src/utils/newclient.sh', function callback(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
  console.log("clientadd");
}

export async function revokeeClient() {
  exec('/home/sandra/pti-cloud/src/utils/revokeClient.sh', function callback(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
  console.log("client fuera");
}
