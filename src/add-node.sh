#!bin/bash

curl -sfL https://get.k3s.io | sh -
# Check for Ready node, takes ~30 seconds
k3s kubectl get node

sudo k3s agent --server https://myserver:6443 --token ${NODE_TOKEN}
