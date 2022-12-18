#!/bin/bash

# K3S INSTALLATION
# 
# Installation and configurations commands for the MASTER of the  K3s cluster.
#

# Download and installation
curl -sfL https://get.k3s.io | sh -

# Initialize the master node
sudo k3s server

# Comprobamos que el nodo funciona
# sudo k3s kubectl get node

# Change the directories permissions in order to obtain the Token
sudo chmod go+rx /var/lib/rancher/k3s/server
sudo chmod go+rx /var/lib/rancher/k3s/server/node-token

# REDIS INSTALLATION
#
# Installation and execution commands 
#

# Install redis
sudo apt-get install redis
# npm i redis
sudo service redis-server stop
redis-server

# Install dpendencies of the project FRONTEND
npm install

# Install node version 16
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm install 16

npm run build

# Install dependencies of the project BACKEND
npm install
# npm install koa
# npm install @koa/multer

# Install node version 16
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm install 16

# Compile the project
npx tsc

# Run the server
npm run start