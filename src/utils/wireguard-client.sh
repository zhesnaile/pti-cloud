#!/bin/bash

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

	#until [[ ${SERVER_WG_NIC} =~ ^[a-zA-Z0-9_]+$ && ${#SERVER_WG_NIC} -lt 16 ]]; do
		#read -rp "WireGuard interface name: " -e -i wg0 SERVER_WG_NIC
	#done


	PWD= pwd

	#Asumo que un cliente solo tendrá una vpn y que su interfaz será wg0
	mv ${PWD}/wg0-client.conf /etc/wireguard/wg0.conf

        #mv ${PWD}/${SERVER_WG_NIC}.conf  /etc/wireguard/${SERVER_WG_NIC}.conf
  SERVER_WG_NIC=wg0

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

isRoot
installWireGuard
