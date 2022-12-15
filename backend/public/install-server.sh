#!/bin/bash

# Install redis
sudo apt-get install redis
npm i redis

# Install K3s
curl -sfL https://get.k3s.io | sh -

# Inicializamos el nodo master
sudo k3s server

# Comprobamos que el nodo funciona
sudo k3s kubectl get node

# Si no tenemos acceso al contenido de /var/lib..../node_token, lo copiamos en otro directorio
sudo chmod go+rx /var/lib/rancher/k3s/server
sudo chmod go+rx /var/lib/rancher/k3s/server/node-token

# Install dependencies of the project
npm install

# Install node version 16


# Compile the project
npx tsc

# Run the server
npm run start

