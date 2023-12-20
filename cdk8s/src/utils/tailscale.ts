import {
  Ingress,
  IngressBackend,
  IngressProps,
  Service,
} from "npm:cdk8s-plus-27";
import { ApiObject } from "npm:cdk8s";
import { JsonPatch } from "npm:cdk8s";
import { Construct } from "npm:constructs";
import merge from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/merge.js";

export class TailscaleIngress extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: Partial<IngressProps> & {
      host: string;
      funnel?: boolean;
      service: Service;
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
