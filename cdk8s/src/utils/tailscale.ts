import {
  Ingress,
  IngressBackend,
  IngressProps,
  Service,
} from "https://esm.sh/cdk8s-plus-27@2.9.3";
import { ApiObject } from "https://esm.sh/cdk8s@2.68.58";
import { JsonPatch } from "https://esm.sh/cdk8s@2.68.58";
import { Construct } from "https://esm.sh/constructs@10.3.0";
import merge from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/merge.js";

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
      defaultBackend: IngressBackend.fromService(props.service),
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
