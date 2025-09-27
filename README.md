# Homelab

[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
![ArgoCD badge](https://argocd.tailnet-1a49.ts.net/api/badge?name=torvalds)

This repository contains resources related to my homelab, currently called
`torvalds`. I give each of my servers a unique name so that I can keep track of
them over time.

Currently my server is managed with Kubernetes. I've used Docker, Ansible, and
bash scripts in the past. Kubernetes has been an interesting experiment and I
think it's overall worthwhile since the ecosystem is so rich.

## Details

I've spent a _lot_ of time making this project pleasant to work with. Here are
some things I'm proud of:

- Close to zero host setup
   - It's just a few commands to deploy my entire cluster
- Entirely written in TypeScript built with [cdk8s](https://cdk8s.io/) and
   [Bun](https://bun.sh/)
- Automated backups
- HTTPS ingress with [Tailscale](https://tailscale.com/)
- All secrets managed with [1Password](https://1password.com/)
- GHA Runners w/ Dagger used by my open-source projects
- Entirely automated deployment for updates, upgrades, etc.
   - Commit-to-deployment takes ~1min
- Automated dependency updates
   - For Docker images (w/ pinned SHAs)
   - For Helm charts
   - For Bun dependencies
   - [My approach](https://github.com/shepherdjerred/homelab/blob/main/src/cdk8s/src/versions.ts)
      allows all of my dependencies to be pinned and updated regularly
- Static typing for:
  - Kubernetes resources
  - Helm chart parameters
  - Home Assistant entities

## Installation

### Talos

1. Create `secrets.yaml`

2. Create the configuration file:

```bash
talosctl gen config \
  --with-secrets secrets.yaml \
  --config-patch-control-plane @patches/scheduling.yaml \
  --config-patch @patches/image.yaml \
  --config-patch @patches/tailscale.yaml \
  --config-patch @patches/kubelet.yaml \
  --config-patch @patches/interface.yaml \
  torvalds https://192.168.1.81:6443 --force

```

3. Configure `endpoints` in `talosconfig`

   - This allows commands to be run without the `--endpoints` argument

4. Move the talosconfig:

- This allows commands to be run without the `--talosconfig` argument

```bash
mv talosconfig ~/.talos/config

```

5. Apply the configuration:

```bash
talosctl apply-config --insecure --nodes 192.168.1.81 --file controlplane.yaml

```

6. If needed, update:

```bash
talosctl apply-config --nodes 192.168.1.81 --file controlplane.yaml

```

Upgrade:

```bash
talosctl upgrade --nodes 192.168.1.81 --image <image>
talosctl upgrade-k8s

```

7. Bootstrap the Kubernetes cluster:

```bash
talosctl bootstrap --nodes 192.168.1.8    talosctl bootstrap --nodes 192.168.1.811

```

8. Create a Kubernetes configuration:

```bash
talosctl kubeconfig --nodes 192.168.1.81

```

### Kubernetes

1. Install `helm`:

```bash
brew install helm

```

2. Install Argo CD manually:

> [!NOTE] This will be imported into Argo CD itself as part of the CDK8s
> manifest

```bash
kubectl create namespace argocd
helm repo add argo https://argoproj.github.io/argo-helm
helm install argocd argo/argo-cd --namespace argocd

```

3. Set the credentials in the `secrets` directory:

- Be sure not to commit any changes to these files so that secrets don't
   leak.

- These should be the only credentials that are manually set. Everything else
   can be retrieved from 1Password.

- Annoyingly, the credential in `1password-secret.yaml` _must_ be base64
encoded.

```bash
cat 1password-credentials.json | base64 -w 0

```

```bash
kubectl create namespace 1password
kubectl apply -f secrets/1password-secret.yaml
kubectl apply -f secrets/1password-token.yaml

```

4. Build and deploy the manifests in this repo:

```bash
cd cdk8s

```

5. Get the initial Argo CD `admin` password:

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

```

6. Change Argo CD the `admin` password.

### ZFS

Adapted from <https://www.roosmaa.net/blog/2024/setting-up-zfs-on-talos/>

1. Create a shell with `pods/shell.yaml`:

```bash
kubectl apply -f pods/shell.yaml

```

2. Create a ZFS pool:

```bash
# for nvme storage
kubectl exec pod/shell -n maintenance -- \
  nsenter --mount=/proc/1/ns/mnt -- \
  zpool create -m legacy -f zfspv-pool-nvme \
  /dev/disk/by-id/nvme-Samsung_SSD_990_PRO_4TB_S7KGNU0X511734N

# for hdd storage
kubectl exec pod/shell -n maintenance -- \
  nsenter --mount=/proc/1/ns/mnt -- \
  zpool create -m legacy -f zfspv-pool-hdd raidz2 \
  /dev/sdb \
  /dev/sdc \
  /dev/sdd \
  /dev/sde \
  /dev/sdf \
  /dev/sdg

```

## Upgrade

### Talos

```
talosctl upgrade --nodes 192.168.1.81 \
  --image $IMAGE
```

### Kubernetes

```
talosctl --nodes 192.168.1.81 upgrade-k8s --to $VERSION
```
