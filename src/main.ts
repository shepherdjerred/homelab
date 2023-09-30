import { Construct } from "https://esm.sh/constructs@10.2.70";
import { App, Chart, ChartProps } from "https://esm.sh/cdk8s@2.64.25";
import { IntOrString, KubeDeployment, KubeService } from "./imports/k8s.ts";

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    const label = { app: "sjerred" };

    new KubeService(this, "service", {
      spec: {
        type: "LoadBalancer",
        ports: [{ port: 80, targetPort: IntOrString.fromNumber(8080) }],
        selector: label,
      },
    });

    new KubeDeployment(this, "cloudflare-ddns", {
      spec: {
        replicas: 1,
        selector: {
          matchLabels: label,
        },
        template: {
          metadata: { labels: label },
          spec: {
            containers: [
              {
                name: "cloudflare-ddns",
                image: "timothyjmiller/cloudflare-ddns",
              },
            ],
          },
        },
      },
    });

    new KubeDeployment(this, "deployment", {
      spec: {
        replicas: 2,
        selector: {
          matchLabels: label,
        },
        template: {
          metadata: { labels: label },
          spec: {
            containers: [
              {
                name: "hello-kubernetes",
                image: "paulbouwer/hello-kubernetes:1.7",
                ports: [{ containerPort: 8080 }],
              },
            ],
          },
        },
      },
    });
  }
}

const app = new App();
new MyChart(app, "sjerred");
app.synth();
