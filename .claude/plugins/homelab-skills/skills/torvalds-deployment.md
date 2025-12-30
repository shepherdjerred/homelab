---
description: >-
  Use when asking about adding services to torvalds namespace,
  createXxxDeployment patterns, or homelab deployment conventions.
---

# Torvalds Namespace Deployment

## Overview

The `torvalds` namespace is the main homelab chart containing all user-facing services (media servers, home automation, utilities). Services follow a consistent `createXxxDeployment()` pattern.

## Standard Deployment Pattern

### Step 1: Create Deployment File

Create `src/cdk8s/src/resources/{category}/yourservice.ts`:

```typescript
import { Chart, Size } from "cdk8s";
import {
  Cpu,
  Deployment,
  DeploymentStrategy,
  type PersistentVolumeClaim,
  Service,
  Volume,
} from "cdk8s-plus-31";
import { LINUXSERVER_GID, withCommonLinuxServerProps } from "../../misc/linux-server.ts";
import { ZfsSsdVolume } from "../../misc/zfs-ssd-volume.ts";
import { TailscaleIngress } from "../../misc/tailscale.ts";
import versions from "../../versions.ts";

export function createYourServiceDeployment(
  chart: Chart,
  claims?: {
    downloads?: PersistentVolumeClaim;
    media?: PersistentVolumeClaim;
  },
) {
  // 1. Create Deployment
  const deployment = new Deployment(chart, "yourservice", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
    securityContext: {
      fsGroup: LINUXSERVER_GID,
    },
  });

  // 2. Create config volume (SSD for performance)
  const configVolume = new ZfsSsdVolume(chart, "yourservice-pvc", {
    storage: Size.gibibytes(8),
  });

  // 3. Add container
  deployment.addContainer(
    withCommonLinuxServerProps({
      image: `ghcr.io/linuxserver/yourservice:${versions["linuxserver/yourservice"]}`,
      portNumber: 8080,
      volumeMounts: [
        {
          path: "/config",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "yourservice-config-volume",
            configVolume.claim,
          ),
        },
        // Add shared volumes if needed
        ...(claims?.downloads
          ? [{
              path: "/downloads",
              volume: Volume.fromPersistentVolumeClaim(
                chart,
                "yourservice-downloads-volume",
                claims.downloads,
              ),
            }]
          : []),
      ],
      resources: {
        cpu: {
          request: Cpu.millis(100),
          limit: Cpu.millis(1000),
        },
        memory: {
          request: Size.mebibytes(256),
          limit: Size.mebibytes(512),
        },
      },
    }),
  );

  // 4. Create Service
  const service = new Service(chart, "yourservice-service", {
    selector: deployment,
    ports: [{ port: 8080 }],
  });

  // 5. Create Tailscale Ingress
  new TailscaleIngress(chart, "yourservice-ingress", {
    service,
    host: "yourservice",
  });
}
```

### Step 2: Add Version

Edit `src/cdk8s/src/versions.ts`:

```typescript
const versions = {
  // renovate: datasource=docker registryUrl=https://ghcr.io versioning=docker
  "linuxserver/yourservice": "1.0.0@sha256:abc123...",
  // ... other versions
};
```

### Step 3: Register in Torvalds Chart

Edit `src/cdk8s/src/cdk8s-charts/torvalds.ts`:

```typescript
import { createYourServiceDeployment } from "../resources/yourservice.ts";

export async function createTorvaldsChart(app: App) {
  const chart = new Chart(app, "torvalds", {
    namespace: "torvalds",
    disableResourceNameHashes: true,
  });

  // Existing volumes...
  const downloadsVolume = new ZfsHddVolume(chart, "downloads-hdd-pvc", {
    storage: Size.tebibytes(1),
  });

  // Add your service
  createYourServiceDeployment(chart, {
    downloads: downloadsVolume.claim,
  });

  // ... rest of chart
}
```

## Advanced Patterns

### Multiple Containers (Sidecar Pattern)

```typescript
// Main container
deployment.addContainer(
  withCommonLinuxServerProps({
    image: `...`,
    portNumber: 8080,
  }),
);

// Metrics sidecar
deployment.addContainer(
  withCommonProps({
    name: "exporter",
    image: `...`,
    ports: [{ number: 9090, name: "metrics" }],
    securityContext: {
      ensureNonRoot: true,
      readOnlyRootFilesystem: true,
      user: 65534,
      group: 65534,
    },
  }),
);
```

### Prometheus ServiceMonitor

```typescript
import { ServiceMonitor } from "../../generated/imports/monitoring.coreos.com.ts";

new ServiceMonitor(chart, "yourservice-monitor", {
  metadata: {
    name: "yourservice-monitor",
    labels: { release: "prometheus" },
  },
  spec: {
    endpoints: [{ port: "metrics", interval: "60s", path: "/metrics" }],
    selector: { matchLabels: { app: "yourservice" } },
  },
});
```

### 1Password Secrets

```typescript
import { OnePasswordItem } from "../../generated/imports/onepassword.com.ts";

const secrets = new OnePasswordItem(chart, "yourservice-secrets", {
  spec: {
    itemPath: "vaults/xxx/items/yyy",
  },
});

// Use in container
envVariables: {
  API_KEY: EnvValue.fromSecretValue({
    secret: Secret.fromSecretName(chart, "api-key", secrets.name),
    key: "password",
  }),
},
```

### Public Access via Funnel

```typescript
new TailscaleIngress(chart, "yourservice-ingress", {
  service,
  host: "yourservice",
  funnel: true,  // Accessible from public internet
});
```

## Directory Structure

```text
src/cdk8s/src/resources/
├── torrents/           # Sonarr, Radarr, qBittorrent
├── media/              # Plex, PeerTube, Tautulli
├── home/               # Home Assistant
├── frontends/          # Web apps
├── mail/               # Postal mail server
├── postgres/           # Database constructs
└── common/             # Shared constructs (Redis)
```

## Key Files

- `src/cdk8s/src/cdk8s-charts/torvalds.ts` - Main chart orchestrator
- `src/cdk8s/src/resources/torrents/sonarr.ts` - Reference example
- `src/cdk8s/src/resources/media/plex.ts` - Complex example with sidecars
- `src/cdk8s/src/resources/torrents/qbittorrent.ts` - VPN sidecar example
