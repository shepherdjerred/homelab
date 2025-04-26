import { LIB_HASS } from "@digital-alchemy/hass";
import { LIB_SYNAPSE } from "@digital-alchemy/synapse";
import { LIB_AUTOMATION } from "@digital-alchemy/automation";
import {
  CreateApplication,
  CronExpression,
  type TServiceParams,
} from "@digital-alchemy/core";

function doThing(
  { logger, hass, scheduler }: TServiceParams,
) {
  const mySwitch = hass.refBy.id("switch.office_overhead_lights");
  mySwitch.onUpdate(async (state) => {
    logger.info("Switch state changed", mySwitch.state);
    if (state.state === "on") {
      // wait for 5 seconds
      await scheduler.setTimeout(
        async () => {
          await mySwitch.turn_off();
        },
        5000, // wait for 5 seconds
      );
    }
  });
}

const app = CreateApplication({
  libraries: [LIB_HASS, LIB_SYNAPSE, LIB_AUTOMATION],
  name: "automation",
  services: {
    doThing,
  },
});

app.bootstrap();
