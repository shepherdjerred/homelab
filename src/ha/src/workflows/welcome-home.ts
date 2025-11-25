import type { TServiceParams } from "@digital-alchemy/core";
import type { ENTITY_STATE } from "@digital-alchemy/hass";
import { shouldStopCleaning, withTimeout, wait } from "../util.ts";
import { instrumentWorkflow } from "../metrics.ts";

export function welcomeHome({ hass, logger }: TServiceParams) {
  const personJerred = hass.refBy.id("person.jerred");
  const roomba = hass.refBy.id("vacuum.roomba");
  const entrywayLight = hass.refBy.id("switch.entryway_overhead_lights");
  const livingRoomScene = hass.refBy.id("scene.living_room_main_bright");
  const bedroomHeater = hass.refBy.id("climate.bedroom_thermostat");
  const livingRoomClimate = hass.refBy.id("climate.living_room");
  const entrywayMediaPlayer = hass.refBy.id("media_player.entryway");

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

              // Play music when arriving home
              try {
                logger.debug("Playing music on entryway media player");
                await entrywayMediaPlayer.unjoin();
                await wait({ amount: 2, unit: "s" });
                await entrywayMediaPlayer.volume_set({ volume_level: 0.3 });
                await entrywayMediaPlayer.play_media({
                  media: {
                    media_content_id: "FV:2/5",
                    media_content_type: "favorite_item_id",
                  },
                });
                logger.debug("Music started successfully");
              } catch (error) {
                logger.debug(`Failed to play music: ${error instanceof Error ? error.message : String(error)}`);
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
