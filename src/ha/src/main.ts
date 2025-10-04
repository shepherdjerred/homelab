import { goodMorning } from "./workflows/good-morning.ts";
import { goodNight } from "./workflows/good-night.ts";
import { welcomeHome } from "./workflows/welcome-home.ts";
import { runVacuumIfNotHome } from "./workflows/run-vacuum-if-not-home.ts";
import { leavingHome } from "./workflows/leaving-home.ts";

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
