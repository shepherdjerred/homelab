# Talos

## Generate Config

1. Create `secrets.yaml`
2. Run `talosctl gen config --with-secrets secrets.yaml --config-patch-control-plane @patches/scheduling.yaml --config-patch @patches/image.yaml torvalds https://192.168.1.81:6443`
