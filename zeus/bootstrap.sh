#!/bin/bash

passwd jerred

su -
passwd root
apt update && apt upgrade
apt install sudo

sed 's/%sudo	ALL=(ALL:ALL) ALL/sudo	ALL=(ALL:ALL) ALL/g' /etc/sudoers
usermod -a -G sudo jerred
exit

sudo apt install curl vim bash-completion git rsync

curl https://github.com/shepherdjerred.keys | tee -a ~/.ssh/authorized_keys

curl -fsSL https://get.docker.com -o get-docker.sh
sh ./get-docker.sh

########## BEGIN ##########
sudo sh -eux <<EOF
# Install newuidmap & newgidmap binaries
apt-get install -y uidmap
EOF
########## END ##########

dockerd-rootless-setuptool.sh install

systemctl --user start docker.service
systemctl --user enable docker.service
sudo loginctl enable-linger jerred

export PATH=/usr/bin:$PATH
export DOCKER_HOST=unix:///run/user/1000/docker.sock

cat << EOF > /home/jerred/.bashrc
export PATH=/usr/bin:$PATH
export DOCKER_HOST=unix:///run/user/1000/docker.sock
EOF

sudo systemctl disable --now docker.service docker.socket

sudo usermod -a -G docker jerred

sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo mkdir -p /etc/bash_completion.d/
sudo curl \
    -L https://raw.githubusercontent.com/docker/compose/1.29.2/contrib/completion/bash/docker-compose \
    -o /etc/bash_completion.d/docker-compose


# https://nvidia.github.io/nvidia-container-runtime/
curl -s -L https://nvidia.github.io/nvidia-container-runtime/gpgkey | \
  sudo apt-key add -
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-container-runtime/$distribution/nvidia-container-runtime.list | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-runtime.list
sudo sed -i -e '/experimental/ s/^#//g' /etc/apt/sources.list.d/nvidia-docker.list
sudo apt-get update

sudo apt install software-properties-common
sudo add-apt-repository contrib
sudo apt-add-repository non-free
sudo apt-get update

# sudo tee ~/.config/docker/daemon.json <<EOF
# {
#     "runtimes": {
#         "nvidia": {
#             "path": "/usr/bin/nvidia-container-runtime",
#             "runtimeArgs": []
#         }
#     }
# }
# EOF

sudo apt install linux-headers-amd64
sudo apt install nvidia-cuda-dev
sudo apt install nvidia-container-runtime

# disable cgroups
# https://github.com/NVIDIA/libnvidia-container/issues/154#issuecomment-1048611111
# sed -i 's/%no-cgroups = false/no-cgroups = true/g' /etc/nvidia-container-runtime/config.toml
sed -i 's/ldconfig = "@/sbin/ldconfig"/ldconfig = "/sbin/ldconfig"/g' /etc/nvidia-container-runtime/config.toml


sudo mkdir /mnt/spare
sudo mkdir /mnt/storage
sudo mkdir /mnt/timemachine

# fstab
UUID=c48e1b3a-4c8c-4488-82ee-45b6b377b61a     /mnt/storage   auto    rw,user,auto    0    0
UUID=49f949f8-a2f0-4e25-8723-19283b531ac4     /mnt/timemachine auto    rw,user,auto    0    0
UUID=d8ec49c8-97ee-4cf2-992c-c5c9fbff6c70     /mnt/spare auto    rw,user,auto    0    0

(cd /home/jerred && git clone https://github.com/shepherdjerred/servers)


# sudo setcap cap_net_bind_service=ep $(which rootlesskit)

sudo apt install libnvidia-encode
# /etc/apt/sources.list
deb http://deb.debian.org/debian bullseye-backports main contrib non-free


sudo apt install -t bullseye-backports nvidia-driver firmware-misc-nonfree
