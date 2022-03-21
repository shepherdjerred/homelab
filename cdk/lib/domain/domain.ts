import { Duration, Stack } from "aws-cdk-lib";
import {
  AaaaRecord,
  ARecord,
  HostedZone,
  IHostedZone,
  RecordTarget,
} from "aws-cdk-lib/aws-route53";

interface Association {
  addresses: Address[];
  domains: string[];
  base: string;
}

interface Address {
  addressType: "v4" | "v6";
  address: string;
}

export function createDomainResources(stack: Stack) {
  const root = "shepherdjerred.com";
  const hostedZone = HostedZone.fromHostedZoneAttributes(stack, "HostedZone", {
    hostedZoneId: "Z24MJMG74F2S94",
    zoneName: root,
  });
  createZeusRecords(stack, hostedZone);
  createPersephoneRecords(stack, hostedZone);
}

function createPersephoneRecords(stack: Stack, hostedZone: IHostedZone) {
  const publicAssociation: Association = {
    base: "public.persephone",
    addresses: [
      {
        addressType: "v4",
        address: "158.69.122.44",
      },
    ],
    domains: [""],
  };

  const tailscaleAssociation: Association = {
    base: "tailscale.persephone",
    addresses: [
      {
        addressType: "v4",
        address: "100.88.20.114",
      },
      {
        addressType: "v6",
        address: "fd7a:115c:a1e0:ab12:4843:cd96:6258:1472",
      },
    ],
    domains: [""],
  };

  const persephoneAssocations = [publicAssociation, tailscaleAssociation];
  createRecords(stack, persephoneAssocations, hostedZone);
}

function createZeusRecords(stack: Stack, hostedZone: IHostedZone) {
  const publicAssociation: Association = {
    base: "public.zeus",
    addresses: [
      {
        addressType: "v4",
        address: "73.157.91.74",
      },
      // {
      //   addressType: "v6",
      //   address: "2601:602:8500:1187:325a:3aff:fe7b:6fd5",
      // },
    ],
    domains: ["homeassistant", "overseerr", "plex", ""],
  };

  const tailscaleAssociation: Association = {
    base: "tailscale.zeus",
    addresses: [
      {
        addressType: "v4",
        address: "100.96.254.65",
      },
      {
        addressType: "v6",
        address: "fd7a:115c:a1e0:ab12:4843:cd96:6260:fe41",
      },
    ],
    domains: ["influxdb", "homeassistant", "overseerr", "plex", ""],
  };

  const zeusAssocations = [publicAssociation, tailscaleAssociation];
  createRecords(stack, zeusAssocations, hostedZone);
}

function createRecords(
  stack: Stack,
  associations: Association[],
  hostedZone: IHostedZone
) {
  associations.map((association) => {
    association.domains.map((domain) => {
      association.addresses.map((address) => {
        let recordName;
        if (domain == "") {
          recordName = association.base;
        } else {
          recordName = [domain, association.base].join(".");
        }
        const props = {
          zone: hostedZone,
          recordName,
          target: RecordTarget.fromIpAddresses(address.address),
          ttl: Duration.minutes(1),
        };
        const resourceName = (
          domain +
          association.base +
          address.addressType
        ).replaceAll(".", "");
        switch (address.addressType) {
          case "v4":
            new ARecord(stack, resourceName, props);
            break;
          case "v6":
            new AaaaRecord(stack, resourceName, props);
            break;
        }
      });
    });
  });
}
