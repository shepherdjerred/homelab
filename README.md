# Servers

## Build

```bash
# Build yaml
deno run --allow-write --allow-env src/main.ts

# Deploy
kubectl apply -f dist/sjerred.k8s.yaml
```
