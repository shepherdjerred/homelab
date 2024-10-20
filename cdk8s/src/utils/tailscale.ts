import { Ingress, IngressBackend, IngressProps, Service } from "cdk8s-plus";
import { ApiObject } from "cdk8s";
import { JsonPatch } from "cdk8s";
import { Construct } from "constructs";
import merge from "merge";

type ServiceObject = {
  name: string;
  port: number;
};

export class TailscaleIngress extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: Partial<IngressProps> & {
      host: string;
      funnel?: boolean;
      service: Service | ServiceObject;
    },
  ) {
    super(scope, id);

    let base: IngressProps = {
      // unsafe cast, but we know that Ingress only needs the name and port
      defaultBackend: IngressBackend.fromService(props.service as Service),
      tls: [
        {
          hosts: [props.host],
        },
      ],
    };

    if (props.funnel) {
      base = {
        ...base,
        metadata: {
          annotations: {
            "tailscale.com/funnel": "true",
          },
        },
      };
    }

    const ingress = new Ingress(
      scope,
      `${id}-ingress`,
      merge({}, base, props),
    );

    ApiObject.of(ingress).addJsonPatch(
      JsonPatch.add("/spec/ingressClassName", "tailscale"),
    );
  }
}
