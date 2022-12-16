#!/bin/bash

# Wireguard installation and configuration

RED='\033[0;31m'
ORANGE='\033[0;33m'
NC='\033[0m'

function isRoot() {
	if [ "${EUID}" -ne 0 ]; then
		echo "You need to run this script as root"
		exit 1
	fi
}

function installWireGuard() {

	# Install WireGuard tools and module
	apt-get update
	apt-get install -y wireguard iptables resolvconf

	# Make sure the directory exists (this does not seem the be the case on fedora)
	mkdir /etc/wireguard >/dev/null 2>&1

	chmod 600 -R /etc/wireguard/

	until [[ ${SERVER_WG_NIC} =~ ^[a-zA-Z0-9_]+$ && ${#SERVER_WG_NIC} -lt 16 ]]; do
	read -rp "WireGuard interface name: " -e -i wg0 SERVER_WG_NIC
	done


	PWD= pwd


	#LLAMAR A LA API PARA QUE DE EL ARCHIVO DE CONFIG

  read -rp "Server URL (without http:// or https://): " -e URL
	read -rp "Username:" -e USERNAME
	read -rp "Password:" -e PSSWD
	curl -L "https://${URL}:3000/api/getConfig?user=${USERNAME}&password=${PSSWD}" -o ./${SERVER_WG_NIC}.conf

	if [[ $? -ne 0 ]] then
 	echo -e "HOLA"
	fi

  mv ${PWD}/${SERVER_WG_NIC}.conf  /etc/wireguard/${SERVER_WG_NIC}.conf

	systemctl start "wg-quick@${SERVER_WG_NIC}"
	systemctl enable "wg-quick@${SERVER_WG_NIC}"


	# Check if WireGuard is running
	systemctl is-active --quiet "wg-quick@${SERVER_WG_NIC}"
	WG_RUNNING=$?

	# WireGuard might not work if we updated the kernel. Tell the user to reboot
	if [[ ${WG_RUNNING} -ne 0 ]]; then
		echo -e "\n${RED}WARNING: WireGuard does not seem to be running.${NC}"
		echo -e "${ORANGE}You can check if WireGuard is running with: systemctl status wg-quick@${SERVER_WG_NIC}${NC}"
		echo -e "${ORANGE}If you get something like \"Cannot find device ${SERVER_WG_NIC}\", please reboot!${NC}"
	fi
}

function installK3S {
	# Llama a la API para obtenr el TOKEN de k3s (para pner texto preescrito usar la oción -i de read)
	# read -rp "Server URL (without http:// or https://): " -e URL
	echo "Getting k3s Token:"
	NODE_TOKEN=$(curl -X GET "http://${URL}:3000/api/getToken")

	# Si hay un error en la llamada getToken, se detiene el Script
	if [[ $? -ne 0 ]]; then
	 	echo -e "Something went wrong"
	fi

	# Se llama a la API para obetener el nombre del nodo
	#read -rp "Username:" -e USERNAME
	echo "Getting Node Name:"
	NODE_NAME=$(curl -X POST http://${URL}:3000/api/getNodeName -H "Content-Type: application/json" -d '{"username":"'"${USERNAME}"'"}')

	# Si hay un error en la llamada getNodeName, se detiene el Script
	if [[ $? -ne 0 ]]; then
	 	echo -e "Something went wrong. Maybe your user or password is incorrect"
	fi

	echo "Installing k3s:"
	export K3S_TOKEN=${NODE_TOKEN}
	export K3S_URL="https://${URL}:6443"
	export K3S_NODE_NAME=${NODE_NAME}

	# Install k3s script and add node to URL cluster with TOKEN stored on /var/lib/rancher/k3s/server/node-token in the server
	curl -sfL https://get.k3s.io | sh -
}

isRoot
installWireGuard
installK3S