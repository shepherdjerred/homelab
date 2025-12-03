import type { TServiceParams } from "@digital-alchemy/core";
import type { ENTITY_STATE } from "@digital-alchemy/hass";
import { shouldStopCleaning, withTimeout } from "../util.ts";
import { instrumentWorkflow } from "../metrics.ts";

export function welcomeHome({ hass, logger }: TServiceParams) {
  const personJerred = hass.refBy.id("person.jerred");
  const roomba = hass.refBy.id("vacuum.roomba");
  const entrywayLight = hass.refBy.id("switch.entryway_overhead_lights");
  const livingRoomScene = hass.refBy.id("scene.living_room_main_bright");
  const bedroomHeater = hass.refBy.id("climate.bedroom_thermostat");
  const livingRoomClimate = hass.refBy.id("climate.living_room");

  const christmasScenes = [
    hass.refBy.id("scene.christmas_tree_silent_night"),
    hass.refBy.id("scene.christmas_tree_under_the_tree"),
  ];

  personJerred.onUpdate(
    async (
      newState: ENTITY_STATE<"person.jerred"> | undefined,
      oldState: ENTITY_STATE<"person.jerred"> | undefined,
    ) => {
      if (oldState && newState && newState.state === "home" && oldState.state === "not_home") {
        await instrumentWorkflow("welcome_home", async () => {
          await withTimeout(
            (async () => {
              logger.info("Welcome Home automation triggered");

              await hass.call.notify.notify({
                title: "Welcome Home",
                message: "Welcome back! Hope you had a great time.",
              });

              // Set climate to comfortable home temperature (23°C)
              logger.debug("Setting climate to home comfort mode");
              await bedroomHeater.set_temperature({
                hvac_mode: "heat",
                temperature: 23,
              });
              try {
                await livingRoomClimate.set_temperature({
                  hvac_mode: "heat",
                  temperature: 23,
                });
              } catch {
                logger.debug("Living room climate not available, skipping");
              }

              logger.debug("Turning on entryway light");
              await entrywayLight.turn_on();

              logger.debug("Setting living room scene to bright");
              await livingRoomScene.turn_on();

              const randomScene = christmasScenes[Math.floor(Math.random() * christmasScenes.length)];
              if (randomScene) {
                logger.debug("Turning on random Christmas tree scene");
                await randomScene.turn_on();
              } else {
                throw new Error("No Christmas tree scene found");
              }

              if (shouldStopCleaning(roomba.state)) {
                logger.debug("Commanding Roomba to return to base");
                await roomba.return_to_base();
              }
            })(),
            { amount: 2, unit: "m" },
            "welcome_home workflow",
          );
        });
      }
    },
  );
}
