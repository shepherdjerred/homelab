import type { TServiceParams } from "@digital-alchemy/core";
import { shouldStartCleaning, withTimeout } from "../util.ts";
import { instrumentWorkflow } from "../metrics.ts";

export function leavingHome({ hass, logger }: TServiceParams) {
  const personJerred = hass.refBy.id("person.jerred");
  const roomba = hass.refBy.id("vacuum.roomba");
  const bedroomHeater = hass.refBy.id("climate.bedroom_thermostat");
  const livingRoomClimate = hass.refBy.id("climate.living_room");

  personJerred.onUpdate(async (newState, oldState) => {
    if (newState.state === "not_home" && oldState.state === "home") {
      await instrumentWorkflow("leaving_home", async () => {
        await withTimeout(
          (async () => {
            logger.info("Leaving Home automation triggered");

            await hass.call.notify.notify({
              title: "Leaving Home",
              message: "Goodbye! The Roomba will start cleaning soon.",
            });

            // Set climate to energy-saving away mode (18°C)
            logger.debug("Setting climate to away mode");
            await bedroomHeater.set_temperature({
              hvac_mode: "heat",
              temperature: 18,
            });
            try {
              await livingRoomClimate.set_temperature({
                hvac_mode: "heat",
                temperature: 18,
              });
            } catch {
              logger.debug("Living room climate not available, skipping");
            }

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
          })(),
          { amount: 3, unit: "m" },
          "leaving_home workflow",
        );
      });
    }
  });
}
