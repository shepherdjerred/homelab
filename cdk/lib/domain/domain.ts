import { Duration, Stack } from "aws-cdk-lib";
import {
  AaaaRecord,
  ARecord,
  CnameRecord,
  HostedZone,
  IHostedZone,
  MxRecord,
  RecordTarget,
  SrvRecord,
  TxtRecord,
} from "aws-cdk-lib/aws-route53";

const ttl = Duration.minutes(1);

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
  createRouterRecords(stack, hostedZone);
  createKittensRecords(stack, hostedZone);
  createResumeRecords(stack, hostedZone);
  createPersonalSiteRecords(stack, hostedZone);
  createEmailRecords(stack, hostedZone);
  createCardDavRecords(stack, hostedZone);
  createCalDavRecords(stack, hostedZone);
}

function createKittensRecords(stack: Stack, hostedZone: IHostedZone) {
  new CnameRecord(stack, `kitten-${hostedZone.zoneName}`, {
    recordName: "kittens",
    domainName: "sj-kittens.netlify.app",
    ttl,
    zone: hostedZone,
  });
}

function createResumeRecords(stack: Stack, hostedZone: IHostedZone) {
  new CnameRecord(stack, `resume-${hostedZone.zoneName}`, {
    recordName: "resume",
    domainName: "d1sx9sqvxo7ng4.cloudfront.net.",
    ttl,
    zone: hostedZone,
  });
}

function createPersonalSiteRecords(stack: Stack, hostedZone: IHostedZone) {
  new CnameRecord(stack, `personal-www-${hostedZone.zoneName}`, {
    recordName: "www",
    domainName: "shepherdjerred.netlify.app",
    ttl,
    zone: hostedZone,
  });
  new ARecord(stack, `personal-root-${hostedZone.zoneName}`, {
    target: RecordTarget.fromIpAddresses("75.2.60.5"),
    ttl,
    zone: hostedZone,
  });
}

function createMxRecords(
  stack: Stack,
  hostedZone: IHostedZone,
  domain: string
) {
  new MxRecord(stack, `mx-${domain}${hostedZone.zoneName}`, {
    recordName: domain,
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
    ttl,
    zone: hostedZone,
  });
}

function createEmailRecords(stack: Stack, hostedZone: IHostedZone) {
  const name = hostedZone.zoneName;
  createMxRecords(stack, hostedZone, "");
  createMxRecords(stack, hostedZone, "*");
  new TxtRecord(stack, `spf-${name}`, {
    values: ["v=spf1 include:spf.messagingengine.com ?all"],
    ttl,
    zone: hostedZone,
  });
  [1, 2, 3].forEach((i) => {
    new CnameRecord(stack, `dkim-${i}-${name}`, {
      recordName: `fm${i}._domainkey.${name}`,
      domainName: `fm${i}.${name}.dkim.fmhosted.com`,
      ttl,
      zone: hostedZone,
    });
  });
  new SrvRecord(stack, `srv-submission-${name}`, {
    recordName: `_submission._tcp.${name}`,
    values: [
      {
        priority: 0,
        weight: 1,
        port: 587,
        hostName: "smtp.fastmail.com",
      },
    ],
    ttl,
    zone: hostedZone,
  });
  new SrvRecord(stack, `srv-imap-${name}`, {
    recordName: `_imap._tcp.${name}`,
    values: [
      {
        priority: 0,
        weight: 0,
        port: 0,
        hostName: ".",
      },
    ],
    ttl,
    zone: hostedZone,
  });
  new SrvRecord(stack, `srv-imaps-${name}`, {
    recordName: `_imaps._tcp.${name}`,
    values: [
      {
        priority: 0,
        weight: 1,
        port: 993,
        hostName: "imap.fastmail.com",
      },
    ],
    ttl,
    zone: hostedZone,
  });
  new SrvRecord(stack, `srv-pop3-${name}`, {
    recordName: `_pop3._tcp.${name}`,
    values: [
      {
        priority: 0,
        weight: 0,
        port: 0,
        hostName: ".",
      },
    ],
    ttl,
    zone: hostedZone,
  });
  new SrvRecord(stack, `srv-pop3s-${name}`, {
    recordName: `_pop3s._tcp.${name}`,
    values: [
      {
        priority: 10,
        weight: 1,
        port: 995,
        hostName: "pop.fastmail.com",
      },
    ],
    ttl,
    zone: hostedZone,
  });
  new SrvRecord(stack, `srv-jmap-${name}`, {
    recordName: `_jmap._tcp.${name}`,
    values: [
      {
        priority: 0,
        weight: 1,
        port: 443,
        hostName: "jmap.fastmail.com",
      },
    ],
    ttl,
    zone: hostedZone,
  });
}

function createCardDavRecords(stack: Stack, hostedZone: IHostedZone) {
  const name = hostedZone.zoneName;
  new SrvRecord(stack, `srv-carddav-${name}`, {
    recordName: `_carddav._tcp.${name}`,
    values: [
      {
        priority: 0,
        weight: 0,
        port: 0,
        hostName: ".",
      },
    ],
    ttl,
    zone: hostedZone,
  });
  new SrvRecord(stack, `srv-carddavs-${name}`, {
    recordName: `_carddavs._tcp.${name}`,
    values: [
      {
        priority: 0,
        weight: 1,
        port: 443,
        hostName: "carddav.fastmail.com",
      },
    ],
    ttl,
    zone: hostedZone,
  });
}

function createCalDavRecords(stack: Stack, hostedZone: IHostedZone) {
  const name = hostedZone.zoneName;
  new SrvRecord(stack, `srv-caldav-${name}`, {
    recordName: `_caldav._tcp.${name}`,
    values: [
      {
        priority: 0,
        weight: 0,
        port: 0,
        hostName: ".",
      },
    ],
    ttl,
    zone: hostedZone,
  });
  new SrvRecord(stack, `srv-caldavs-${name}`, {
    recordName: `_caldavs._tcp.${name}`,
    values: [
      {
        priority: 0,
        weight: 1,
        port: 443,
        hostName: "caldav.fastmail.com ",
      },
    ],
    ttl,
    zone: hostedZone,
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

function createZeusRecords(stack: Stack, hostedZone: IHostedZone) {
  const publicAssociation: Association = {
    base: "public.zeus",
    addresses: [
      {
        addressType: "v4",
        address: "76.146.155.109",
      },
      {
        addressType: "v6",
        address: "2601:602:8200:669:325a:3aff:fe7b:6fd5",
      },
    ],
    domains: ["homeassistant", "overseerr", "plex", ""],
  };

  const tailscaleAssociation: Association = {
    base: "ts.zeus",
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
      "syncthing",
      "tautulli",
      "jackett",
      "sonarr",
      "bazarr",
      "radarr",
      "influxdb",
      "homeassistant",
      "overseerr",
      "plex",
      "qbittorrent",
      "nitter",
      "teddit",
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
          ttl,
        };
        const resourceName =
          domain +
          association.base +
          hostedZone.zoneName +
          "-" +
          address.addressType;
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
