import { Duration, Stack } from "aws-cdk-lib";
import {
  AaaaRecord,
  ARecord,
  CnameRecord,
  HostedZone,
  IHostedZone,
  MxRecord,
  RecordTarget,
  TxtRecord,
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
  const hostedZone = HostedZone.fromHostedZoneAttributes(stack, "HostedZone", {
    hostedZoneId: "Z24MJMG74F2S94",
    zoneName: "shepherdjerred.com",
  });
  const shortHostedZone = HostedZone.fromHostedZoneAttributes(
    stack,
    "ShortHostedZone",
    {
      hostedZoneId: "Z052318621SQJ9EM5RPOU",
      zoneName: "sjer.red",
    }
  );
  const zones = [hostedZone, shortHostedZone];
  zones.forEach((zone) => {
    createAllRecords(stack, zone);
  });
}

function createAllRecords(stack: Stack, hostedZone: IHostedZone) {
  createZeusRecords(stack, hostedZone);
  createPersephoneRecords(stack, hostedZone);
  createRouterRecords(stack, hostedZone);
  createKittensRecords(stack, hostedZone);
  createResumeRecords(stack, hostedZone);
  createPersonalSiteRecords(stack, hostedZone);
}

function createKittensRecords(stack: Stack, hostedZone: IHostedZone) {
  new CnameRecord(stack, `kitten-${hostedZone.zoneName}`, {
    recordName: "kittens",
    domainName: "sj-kittens.netlify.app",
    ttl: Duration.minutes(1),
    zone: hostedZone,
  });
}

function createResumeRecords(stack: Stack, hostedZone: IHostedZone) {
  new CnameRecord(stack, `resume-${hostedZone.zoneName}`, {
    recordName: "resume",
    domainName: "d1sx9sqvxo7ng4.cloudfront.net.",
    ttl: Duration.minutes(1),
    zone: hostedZone,
  });
}

function createPersonalSiteRecords(stack: Stack, hostedZone: IHostedZone) {
  new CnameRecord(stack, `personal-www-${hostedZone.zoneName}`, {
    recordName: "www",
    domainName: "shepherdjerred.netlify.app",
    ttl: Duration.minutes(1),
    zone: hostedZone,
  });
  new ARecord(stack, `personal-root-${hostedZone.zoneName}`, {
    target: RecordTarget.fromIpAddresses("75.2.60.5"),
    ttl: Duration.minutes(1),
    zone: hostedZone,
  });
}

function createEmailRecords(stack: Stack, hostedZone: IHostedZone) {
  const name = hostedZone.zoneName;
  new MxRecord(stack, `mx-${name}`, {
    values: [
      {
        priority: 10,
        hostName: "in1-smtp.messagingengine.com",
      },
      {
        priority: 20,
        hostName: "in2-smtp.messagingengine.com",
      },
    ],
    ttl: Duration.minutes(1),
    zone: hostedZone,
  });
  new TxtRecord(stack, `spf-${name}`, {
    values: ["v=spf1 include:spf.messagingengine.com ?all"],
    ttl: Duration.minutes(1),
    zone: hostedZone,
  });
  [1, 2, 3].forEach((i) => {
    new CnameRecord(stack, `dkim-${i}-${name}`, {
      recordName: `fm${i}._domainkey.${name}`,
      domainName: `fm${i}.${name}.dkim.fmhosted.com`,
      ttl: Duration.minutes(1),
      zone: hostedZone,
    });
  });
}

function createRouterRecords(stack: Stack, hostedZone: IHostedZone) {
  const association: Association = {
    base: "router.home",
    addresses: [
      {
        addressType: "v4",
        address: "192.168.1.1",
      },
    ],
    domains: [""],
  };

  createRecords(stack, [association], hostedZone);
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
        address: "76.146.154.97",
      },
      {
        addressType: "v6",
        address: "2601:602:8200:277c:325a:3aff:fe7b:6fd5",
      },
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
    domains: [
      "prometheus",
      "influxdb",
      "homeassistant",
      "overseerr",
      "plex",
      "",
    ],
  };

  const internalAssociation: Association = {
    base: "internal.zeus",
    addresses: [
      {
        addressType: "v4",
        address: "192.168.1.45",
      },
    ],
    domains: [""],
  };

  const zeusAssocations = [
    publicAssociation,
    tailscaleAssociation,
    internalAssociation,
  ];
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
          hostedZone.zoneName +
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
