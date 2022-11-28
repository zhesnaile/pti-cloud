#!bin/bash

# Install k3s script
#curl -sfL https://get.k3s.io | sh -

# Check for Ready node, takes ~30 seconds
#k3s kubectl get node

# Install
#sudo k3s agent --server https://myserver:6443 --token ${NODE_TOKEN}

# Llama a la API para obtenr el TOKEN de k3s
read -rp "Server URL and Port:" -e -i https:// URL
NODE_TOKEN=$(curl -X GET "${URL}/api/getToken")

# Si hay un error en la llamada getToken, se detiene el Script
if [[ $? -ne 0 ]]; then
 	echo -e "Something went wrong"
fi

# Se llama a la API para obetener el nombre del nodo
read -rp "Username:" -e -i Username USERNAME
NODE_NAME=$(curl -X POST ${URL}/api/getNodeName -H "Content-Type: application/json" -d "{'username': ${USERNAME}}")

# Si hay un error en la llamada getNodeName, se detiene el Script
if [[ $? -ne 0 ]]; then
 	echo -e "Something went wrong. Maybe your user or password is incorrect"
fi

echo $(TOKEN)
echo $(USERNAME)
# Install k3s script and add node to URL cluster with TOKEN stored on /var/lib/rancher/k3s/server/node-token in the server
#curl -sfL https://get.k3s.io | K3S_URL=${URL}:6443 K3S_TOKEN=${NODE_TOKEN} K3S_NODE_NAME=${NODE_NAME} sh -
