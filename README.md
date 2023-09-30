# Servers

## Build

```bash
# Build yaml
deno run --allow-write src/main.ts

# Deploy
kubectl apply -f dist/hello.k8s.yaml
```
