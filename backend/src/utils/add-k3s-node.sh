#!/bin/bash

# Llama a la API para obtenr el TOKEN de k3s (para pner texto preescrito usar la oción -i de read)
read -rp "Server URL and Port (without http:// or https://): " -e URL
NODE_TOKEN=$(curl -X GET "http://${URL}/api/getToken")

# Si hay un error en la llamada getToken, se detiene el Script
if [[ $? -ne 0 ]]; then
 	echo -e "Something went wrong"
fi

# Se llama a la API para obetener el nombre del nodo
read -rp "Username:" -e USERNAME
NODE_NAME=$(curl -X POST http://${URL}/api/getNodeName -H "Content-Type: application/json" -d '{"username":"'"${USERNAME}"'"}')

# Si hay un error en la llamada getNodeName, se detiene el Script
if [[ $? -ne 0 ]]; then
 	echo -e "Something went wrong. Maybe your user or password is incorrect"
fi

#echo $NODE_TOKEN
#echo $NODE_NAME
# Install k3s script and add node to URL cluster with TOKEN stored on /var/lib/rancher/k3s/server/node-token in the server
echo "Installing k3s:"
curl -sfL https://get.k3s.io | K3S_URL=https://${URL}:6443 K3S_TOKEN=${NODE_TOKEN} K3S_NODE_NAME=${NODE_NAME} sh -
