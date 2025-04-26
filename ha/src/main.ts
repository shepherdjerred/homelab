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
  logger.info("Doing thing");
  const mySwitch = hass.refBy.id("switch.bedroom_overhead_lights");
  scheduler.cron({
    schedule: CronExpression.EVERY_DAY_AT_8PM,
    exec: () => mySwitch.turn_on(),
  });
  scheduler.cron({
    schedule: CronExpression.EVERY_DAY_AT_5AM,
    exec: () => mySwitch.turn_off(),
  });
  logger.info("Scheduled cron jobs");
}

CreateApplication({
  libraries: [LIB_HASS, LIB_SYNAPSE, LIB_AUTOMATION],
  name: "automation",
  services: {
    doThing,
  },
});
