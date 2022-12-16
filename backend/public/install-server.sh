#!/bin/bash

# Install K3s
curl -sfL https://get.k3s.io | sh -

# Inicializamos el nodo master
sudo k3s server

# Comprobamos que el nodo funciona
sudo k3s kubectl get node

# Si no tenemos acceso al contenido de /var/lib..../node_token, lo copiamos en otro directorio
sudo chmod go+rx /var/lib/rancher/k3s/server
sudo chmod go+rx /var/lib/rancher/k3s/server/node-token

# Install redis
sudo apt-get install redis
npm i redis

# Install dependencies of the project (in both directories)
npm install
npm install typescript
npm install koa
npm install @koa/multer

# Install node version 16
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
node install 16

# Compile the project
npx tsc

# Run the server
npm run start