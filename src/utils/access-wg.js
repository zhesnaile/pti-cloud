//LLAMA SCRIPT PARA LA CONFIG DEL NUEVO CLIENTE
//import { newClient } from "../utils/newclient.sh";
import {exec} from "child_process" ;

export async function addClient() {
  exec('/home/sandra/pti-cloud/src/utils/newclient.sh', function callback(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
  console.log("clientadd");
}

export async function revokeeClient() {
  exec('ls', function callback(error, stdout, stderr) {
    console.log(stdout);
  });
  console.log("client fuera");
}
