#!/bin/bash

# https://docs.datadoghq.com/containers/kubernetes/installation/?tab=helm
helm repo add datadog https://helm.datadoghq.com
helm repo update

# kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY --from-literal app-key=$DD_APP_KEY

helm install <RELEASE_NAME> \
 -f datadog-values.yaml \
 --set targetSystem=<TARGET_SYSTEM> \
 datadog/datadog
