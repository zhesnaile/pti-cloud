#!/bin/bash

# Istalamos Docker
curl https://releases.rancher.com/install-docker/20.10.sh | sh

# Instalamos k3s
curl -sfL https://get.k3s.io | sh -s - --docker

#inicializamos el nodo master
sudo k3s server

# Comprobamos que el nodo funciona
sudo k3s kubectl get node

# Si no tenemos acceso al contenido de /var/lib..../node_token, lo copiamos en otro directorio
sudo chmod go+rx /var/lib/rancher/k3s/server
sudo chmod go+rx /var/lib/rancher/k3s/server/node-token

# En los worker nodes instalamos k3s y luego inicialzamos el nodo
# sudo k3s agent --server ${URL}:6443 --token ${NODE_TOKEN} --node-name ${NODENAME}