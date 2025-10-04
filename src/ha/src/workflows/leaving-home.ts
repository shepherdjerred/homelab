import type { TServiceParams } from "@digital-alchemy/core";
import { shouldStartCleaning } from "../util.ts";
import { instrumentWorkflow } from "../metrics.ts";

export function leavingHome({ hass, logger }: TServiceParams) {
  const personJerred = hass.refBy.id("person.jerred");
  const roomba = hass.refBy.id("vacuum.roomba");

  personJerred.onUpdate(async (newState, oldState) => {
    if (newState.state === "not_home" && oldState.state === "home") {
      await instrumentWorkflow("leaving_home", async () => {
        logger.info("Leaving Home automation triggered");

        await hass.call.notify.notify({
          title: "Leaving Home",
          message: "Goodbye! The Roomba will start cleaning soon.",
        });

        // turn off all lights
        logger.debug("Turning off all lights");
        const lights = hass.refBy.domain("light");
        for (const light of lights) {
          await light.turn_off();
        }
        logger.debug("All lights turned off");

        if (shouldStartCleaning(roomba.state)) {
          logger.debug("Commanding Roomba to start cleaning");
          await roomba.start();
        }
      });
    }
  });
}
