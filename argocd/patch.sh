#!/bin/bash

k3s kubectl patch deployment argocd-repo-server -n argocd --patch-file patch.yml
