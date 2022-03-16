#!/bin/bash
set -xeuov pipefail

export DEBIAN_FRONTEND=noninteractive

adduser --disabled-password --gecos "" jerred
echo "jerred:password" | chpasswd

echo "root:password" | chpasswd
apt update
apt upgrade

# Sudo
apt install -y sudo

# %sudo ALL=(ALL) NOPASSWD: ALL
cat /etc/sudoers
usermod -a -G sudo jerred

# Vim
apt install -y vim

# ssh keys
apt install -y curl

mkdir -p /home/jerred/.ssh/
touch /home/jerred/.ssh/authorized_keys
curl https://github.com/shepherdjerred.keys | tee -a /home/jerred/.ssh/authorized_keys
cat /home/jerred/.ssh/authorized_keys

# fstab
mkdir /mnt/storage
mkdir /mnt/timemachine
mkdir /mnt/spare

echo "UUID=c48e1b3a-4c8c-4488-82ee-45b6b377b61a     /mnt/storage     ext4 defaults    0    0" | tee -a /etc/fstab
echo "UUID=49f949f8-a2f0-4e25-8723-19283b531ac4     /mnt/timemachine ext4 defaults    0    0" | tee -a /etc/fstab
echo "UUID=d8ec49c8-97ee-4cf2-992c-c5c9fbff6c70     /mnt/spare       ext4 defaults    0    0" | tee -a /etc/fstab
cat /etc/fstab
mount -a

# Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh ./get-docker.sh
rm ./get-docker.sh
usermod -a -G docker jerred

# Docker Compose
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
mkdir -p /etc/bash_completion.d/
curl \
    -L https://raw.githubusercontent.com/docker/compose/1.29.2/contrib/completion/bash/docker-compose \
    -o /etc/bash_completion.d/docker-compose

apt install -y bash-completion

# Nvidia Drivers
# https://wiki.debian.org/NvidiaGraphicsDrivers
# Required for non-free software, e.g. nvidia drivers
apt install -y software-properties-common
add-apt-repository contrib
apt-add-repository non-free
apt update

echo "deb http://deb.debian.org/debian bullseye-backports main contrib non-free" | tee -a /etc/apt/sources.list
cat /etc/apt/sources.list
apt update
apt install -y linux-headers-amd64
apt install -y -t bullseye-backports nvidia-driver firmware-misc-nonfree
apt install -y nvidia-cuda-dev nvidia-cuda-toolkit

# Nvidia Container
# https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#setting-up-nvidia-container-toolkit
distribution=$(. /etc/os-release;echo $ID$VERSION_ID) \
   && curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add - \
   && curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list

apt-get update
apt-get install -y nvidia-docker2

sudo systemctl restart docker

sed -i 's/ldconfig = "@\/sbin\/ldconfig"/ldconfig = "\/sbin\/ldconfig"/g' /etc/nvidia-container-runtime/config.toml
cat /etc/nvidia-container-runtime/config.toml

# daemon.json
# {
#     "ipv6": true,
#     "fixed-cidr-v6": "2001:db8:1::/64",
#     "log-driver": "journald",
#     "runtimes": {
#         "nvidia": {
#             "path": "nvidia-container-runtime",
#             "runtimeArgs": []
#         }
#     }
# }

# unattended upgrades
apt install unattended-upgrades apt-listchanges
echo unattended-upgrades unattended-upgrades/enable_auto_updates boolean true | debconf-set-selections
dpkg-reconfigure -f noninteractive unattended-upgrades

# git
apt install -y git rsync
(cd /home/jerred && git clone https://github.com/shepherdjerred/servers)
(cd /home/jerred/servers/zeus && docker-compose pull)

echo "All ready!"
