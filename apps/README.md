```
argocd app create apps \
    --dest-server https://kubernetes.default.svc \
    --path .
argocd app sync apps
```
