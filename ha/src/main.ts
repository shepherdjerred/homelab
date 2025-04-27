import { goodMorning } from "./goodMorning.ts";
import { goodNight } from "./goodNight.ts";
import { indoorLightsSunrise } from "./indoorLightsSunrise.ts";
import { welcomeHome } from "./welcomeHome.ts";
import { runVacuumIfNotHome } from "./runVacuumIfNotHome.ts";
import { leavingHome } from "./leavingHome.ts";
import { indoorLightsSunset } from "./indoorLightsSunset.ts";

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
    indoorLightsSunrise,
    welcomeHome,
    runVacuumIfNotHome,
    leavingHome,
    indoorLightsSunset,
  },
});

app.bootstrap();
