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
  - It's literally just a few commands to deploy my entire cluster
- Entirely written in TypeScript built with [cdk8s](https://cdk8s.io/) and
  [Deno](https://deno.com/)
- Automated backups
  - The applications I care about are regularly backed up to
    [BorgBase](https://www.borgbase.com/)
- HTTPS ingress with [Tailscale](https://tailscale.com/)
- All secrets managed with [1Password](https://1password.com/)
- Jenkins CI w/ Earthly used by my open-source projects
- Entirely automated deployment for updates, upgrades, etc.
  - Commit-to-deployment takes about 1min
- Automated dependency updates
  - For Docker images (w/ pinned SHAs)
  - For Helm charts
  - For Kubernetes/k3s
  - For Jenkins plugins
  - For Deno dependencies
  - [My approach](https://github.com/shepherdjerred/homelab/blob/main/cdk8s/src/versions.ts)
    allows all of my dependencies to be pinned and updated regularly

## Installation

These instructions are for future me, so that I can re-create my cluster from
scratch if needed.

### Host Setup

At some point I should automate these steps, either as a part of a script, my
dotfiles, ansible, etc.

- Install Tailscale
- Install Linuxbrew
- Install fish, vim, helix, rtx, languages (Deno), etc.
- Set fish as the default shell
- Configure fish
- Setup auto-updates with Ubuntu

  - <https://help.ubuntu.com/community/AutomaticSecurityUpdates>

- Set `KUBE_CONFIG`
- Update kernel parameters:
  <https://docs.k3s.io/security/hardening-guide#set-kernel-parameters>
- Increase number of file watchers:

  ```
  sudo sysctl -w fs.inotify.max_user_watches=1990692
  sudo sysctl -w fs.inotify.max_user_instances=512
  sudo sysctl -w fs.inotify.max_queued_events=65536
  ```

### Cluster Setup

1. Copy `k3s` to `/etc/rancher/k3s/`

   ```bash
   sudo cp -r k3s/. /etc/rancher/k3s/
   ```

1. Install k3s.

   ```bash
   curl -sfL https://get.k3s.io | sh -
   ```

1. Copy the Kubernetes configuration

   ```bash
   rm -rfv ~/.kube && mkdir ~/.kube && sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config && sudo chown $USER:$USER ~/.kube/config && chmod 600 ~/.kube/config
   ```

1. Install `helm`.

   ```bash
   brew install helm
   ```

1. Install Argo CD manually.

   > [!NOTE] This will be imported into Argo CD itself as part of the CDK8s
   > manifest

   ```bash
   kubectl create namespace argocd
   helm repo add argo https://argoproj.github.io/argo-helm
   helm install argocd argo/argo-cd --namespace argocd
   ```

1. Set the credentials in the `secrets` directory.

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

1. Build and deploy the manifests in this repo

   ```bash
   cd cdk8s && deno task up
   ```

1. Get the initial Argo CD `admin` password.

   ```bash
   kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
   ```

1. Change Argo CD the `admin` password.
