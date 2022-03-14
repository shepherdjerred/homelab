# Zeus

## Bootstrap steps

1. Install CoreOS
2. Setup Tailscale

- `docker exec tailscaled tailscale up --auth-key=$KEY`

3. Update IPv4 and IPv6 addresses in CDK, docker-compose, etc.
4. Copy credentials

- AWS
- Tailscale

## nvidia

https://container-toolkit-fcos.gitlab.io/container-runtime/

```
FEDORA_VERSION_ID=$(cat /etc/os-release | grep VERSION_ID | cut -d = -f2)
curl -s -L https://container-toolkit-fcos.gitlab.io/container-runtime/stable/fedora${FEDORA_VERSION_ID}/container-runtime.repo > ./container-runtime.repo
# Perhaps first review ./container-runtime.repo and decide whether you trust this repo...
sudo mv ./container-runtime.repo /etc/yum.repos.d/container-runtime.repo
sudo rpm-ostree install nvidia-container-runtime
sudo systemctl reboot
```
