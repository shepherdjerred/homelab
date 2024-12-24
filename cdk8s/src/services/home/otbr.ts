import {
  Capability,
  Deployment,
  DeploymentStrategy,
  HostPathVolumeType,
  Service,
  Volume,
} from "cdk8s-plus";
import { ApiObject, Chart, JsonPatch } from "cdk8s";
import { ROOT_GID, ROOT_UID, withCommonProps } from "../../utils/common.ts";
import { TailscaleIngress } from "../../utils/tailscale.ts";

export function createOtbrDeployment(chart: Chart) {
  const deployment = new Deployment(chart, "otbr", {
    replicas: 1,
    strategy: DeploymentStrategy.recreate(),
  });

  // /dev/serial/by-id/usb-Nabu_Casa_Home_Assistant_Connect_ZBT-1_082a732ea338ef11bf43317af3d9b1e5-if00-port0
  const serialPath = "/dev/ttyUSB0";

  const serialDeviceVolume = Volume.fromHostPath(
    chart,
    "serial-device-volume",
    "serial-device-volume",
    {
      path: serialPath,
      type: HostPathVolumeType.CHAR_DEVICE,
    },
  );

  deployment.addContainer(
    withCommonProps({
      securityContext: {
        privileged: true,
        allowPrivilegeEscalation: true,
        user: ROOT_UID,
        group: ROOT_GID,
        ensureNonRoot: false,
        capabilities: {
          add: [Capability.NET_ADMIN],
        },
      },
      // TODO: manage in versions.ts
      image: `openthread/otbr`,
      // https://gist.github.com/loopj/6f6c2355389cf301391d92cf8b92e4ca
      command: [
        `--radio-url spinel+hdlc+uart://${serialPath}?uart-baudrate=460800&uart-flow-control`,
      ],
      volumeMounts: [
        {
          path: serialPath,
          volume: serialDeviceVolume,
        },
      ],
    }),
  );

  ApiObject.of(deployment).addJsonPatch(
    JsonPatch.add("/spec/template/spec/hostNetwork", true),
  );

  const service = new Service(chart, "otbr-service", {
    selector: deployment,
    ports: [{ port: 80 }],
  });

  new TailscaleIngress(chart, "otbr-tailscale-ingress", {
    service,
    host: "otbr",
  });
}
