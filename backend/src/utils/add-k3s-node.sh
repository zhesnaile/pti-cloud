#!bin/bash

# Install k3s script
curl -sfL https://get.k3s.io | sh -

# Check for Ready node, takes ~30 seconds
k3s kubectl get node

# Install
sudo k3s agent --server https://myserver:6443 --token ${NODE_TOKEN}

NODE_TOKEN=$(curl -L "${URL}/api/getToken")

# Install k3s script and add node to URL cluster with TOKEN stored on /var/lib/rancher/k3s/server/node-token in the server
# curl -sfL https://get.k3s.io | K3S_URL=$(URL):6443 K3S_TOKEN=${NODE_TOKEN} K3S_NODE_NAME=${NODE_NAME} sh -
