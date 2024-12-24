import {
  Capability,
  Deployment,
  DeploymentStrategy,
  HostPathVolumeType,
  Volume,
} from "cdk8s-plus";
import { ApiObject, Chart, JsonPatch } from "cdk8s";
import { ROOT_GID, ROOT_UID, withCommonProps } from "../../utils/common.ts";
import { LocalPathVolume } from "../../utils/localPathVolume.ts";
import versions from "../../versions.ts";

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

  const threadVolume = new LocalPathVolume(chart, "otbr-pvc", {});

  deployment.addContainer(
    withCommonProps({
      securityContext: {
        privileged: true,
        allowPrivilegeEscalation: true,
        user: ROOT_UID,
        group: ROOT_GID,
        ensureNonRoot: false,
        readOnlyRootFilesystem: false,
        // TODO: this might not be needed
        capabilities: {
          add: [Capability.NET_ADMIN],
        },
      },
      image: `openthread/otbr:${versions["tailscale-operator"]}`,
      // https://gist.github.com/loopj/6f6c2355389cf301391d92cf8b92e4ca
      args: [
        "--interface",
        "eno0",
        "--backbone-interface",
        "eno0",
        "--radio-url",
        `spinel+hdlc+uart://${serialPath}?uart-baudrate=460800`,
      ],
      volumeMounts: [
        {
          path: serialPath,
          volume: serialDeviceVolume,
        },
        {
          path: "/var/lib/thread",
          volume: Volume.fromPersistentVolumeClaim(
            chart,
            "otbr-volume",
            threadVolume.claim,
          ),
        },
      ],
    }),
  );

  // TODO: this might not be needed
  ApiObject.of(deployment).addJsonPatch(
    JsonPatch.add("/spec/template/spec/hostNetwork", true),
  );
}
