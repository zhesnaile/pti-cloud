import {fs} from 'fs';

export async function get_k3s_token() {
  let file = fs.readFileSync('/var/lib/rancher/k3s/server/node-token');
  return  file;
}
