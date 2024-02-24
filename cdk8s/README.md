# Overview

This is a [cdk8s project]() to generate most of my Kubernetes YAML

## Updating imports

The `imports` folder contains TypeScript types for Kubernetes objects, and
custom resource definitions. It can be updated by:

1. Running `cdk8s import k8s --language=typescript` on the cluster host

1. Running
   `kubectl get crds -o json | cdk8s import /dev/stdin --language=typescript` on
   the cluster host

   - See: https://cdk8s.io/docs/latest/cli/import/#importing-crds-from-a-cluster

1. Updating the `import` statements in each file in the `imports` folder to be
   compatible with Deno

1. Adding `// deno-lint-ignore-file` to the top of each resulting file in the
   `imports` folder
