import { goodMorning } from "./workflows/goodMorning.ts";
import { goodNight } from "./workflows/goodNight.ts";
import { welcomeHome } from "./workflows/welcomeHome.ts";
import { runVacuumIfNotHome } from "./workflows/runVacuumIfNotHome.ts";
import { leavingHome } from "./workflows/leavingHome.ts";

import { LIB_HASS } from "@digital-alchemy/hass";
import { LIB_SYNAPSE } from "@digital-alchemy/synapse";
import { LIB_AUTOMATION } from "@digital-alchemy/automation";
import { CreateApplication } from "@digital-alchemy/core";

const app = CreateApplication({
  libraries: [LIB_HASS, LIB_SYNAPSE, LIB_AUTOMATION],
  name: "automation",
  services: {
    goodMorning,
    goodNight,
    welcomeHome,
    runVacuumIfNotHome,
    leavingHome,
  },
});

await app.bootstrap();
