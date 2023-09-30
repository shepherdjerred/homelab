# Servers

## Build

```bash
# CI
dagger run deno run -A ci/index.ts

# Build yaml
deno run --allow-write src/main.ts

# Deploy
kubectl apply -f dist/hello.k8s.yaml
```
