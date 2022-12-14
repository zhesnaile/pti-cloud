import fs from 'fs'

/**
 * Obtains the K3s Token stored in /var/lib/rancher/server.
 * Basically, obtains the Token and returns it as a string.
 * @returns A string with the K3s token.
 */
export async function get_k3s_token() {
  let string = fs.readFileSync('/var/lib/rancher/k3s/server/node-token', "utf8");
  return  string;
}

/**
 * Obtains the node name.
 * Basically, obtains a name and it is assigned to the user.
 * @returns A string with the assigned node name.
 */
/*
 export async function get_Node_Name(user: string) {
  let time = new Date();
  let name = user + time.getHours();
  return name;
}
*/
