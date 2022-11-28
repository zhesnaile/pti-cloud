import 'fs'

export async function get_k3s_token() {
  let string = fs.readFileSync('/var/lib/rancher/k3s/server/node-token', "utf8");
  return  string;
}

export async function get_Node_Name(user) {
  let time = new Date();
  let name = user + time.getHours();
  return name;
}
