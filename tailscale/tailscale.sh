#!/bin/bash

kubectl create -f namespace.yaml

# git clone https://github.com/tailscale/tailscale
helm install operator tailscale/cmd/k8s-operator/deploy/chart -n tailscale -f oauth-secret.yaml
