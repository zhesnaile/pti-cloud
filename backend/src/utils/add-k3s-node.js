import 'fs'

export async function get_k3s_token() {
  let file = fs.readFileSync('/var/lib/rancher/k3s/server/node-token');
  console.log("Token leído");
  return  file;
}

export async function get_Node_Name(user) {
  let name = user;
  console.log("Nombre leído");
  return name;
}
