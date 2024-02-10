# Servers

[![pre-commit](https://github.com/shepherdjerred/servers/actions/workflows/pre-commit.yml/badge.svg)](https://github.com/shepherdjerred/servers/actions/workflows/pre-commit.yml)

This repository contains resources related to my home server, currently called
`lamport`. I give each of my servers a unique name so that I can keep track of
them over time.

Currently my server is managed with Kubernetes. I've used Docker, Ansible, and
bash scripts in the past. Kubernetes has been an interesting experiment and I
think it's overall worthwhile since the ecosystem is so rich.

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

  - https://help.ubuntu.com/community/AutomaticSecurityUpdates

- Set KUBE_CONFIG
- Update kernel parameters:
  https://docs.k3s.io/security/hardening-guide#set-kernel-parameters
- Increase number of file watchers

  ```
  sudo sysctl -w fs.inotify.max_user_watches=1990692
  sudo sysctl -w fs.inotify.max_user_instances=512
  sudo sysctl -w fs.inotify.max_queued_events=65536
  ```

### Cluster Setup

1. Copy `k3s` to `/etc/rancher/k3s/`
1. Install k3s.

   ```
   curl -sfL https://get.k3s.io | sh -
   ```

1. Copy the Kubernetes configuration

   ```
   rm -rfv ~/.kube && mkdir ~/.kube && sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config && sudo chown $USER:$USER ~/.kube/config && chmod 600 ~/.kube/config
   ```

1. Install `helm` and `argocd`.

   ```
   brew install helm argocd
   ```

1. Install Argo CD manually.

   > [!NOTE] This will be imported into Argo CD itself as part of the CDK8s
   > manifest

   ```
   kubectl create namespace argocd
   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
   ```

1. Set the credentials in the `secrets` directory.

   - Be sure not to commit any changes to these files so that secrets don't
     leak.
   - These should be the only credentials that are manually set. Everything else
     can be retrieved from 1Password.
   - Annoyingly, the credential in `1password-secret.yaml` _must_ be base64
     encoded.

     ```
     cat 1password-credentials.json | base64 -w 0
     ```

     ```
     kubectl create namespace 1password
     kubectl apply -f secrets/1password-secret.yaml
     kubectl apply -f secrets/1password-token.yaml
     ```

1. Deploy the manifests in this repo

   ```
   kubectl apply -f cdk8s/dist/apps.k8s.yaml
   ```

1. Get the initial Argo CD `admin` password.

   ```
   argocd admin initial-password -n argocd
   ```

1. Change Argo CD the `admin` password.

1. Install Hauppauge Drivers for Hauppauge TV tuners.

   - https://www.hauppauge.com/pages/support/support_linux.html

1. Setup encryption at rest.

   - https://docs.k3s.io/security/secrets-encryption

1. Follow the K3s hardening guide.

   - https://docs.k3s.io/security/hardening-guide
