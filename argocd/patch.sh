#!/bin/bash

sudo k3s kubectl patch deployment  argocd-repo-server -n argocd --patch-file argocd/patch.yml
