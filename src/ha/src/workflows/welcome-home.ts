import type { TServiceParams } from "@digital-alchemy/core";
import type { ENTITY_STATE } from "@digital-alchemy/hass";
import { shouldStopCleaning } from "../util.ts";

export function welcomeHome({ hass, logger }: TServiceParams) {
  const personJerred = hass.refBy.id("person.jerred");
  const roomba = hass.refBy.id("vacuum.roomba");
  const entrywayLight = hass.refBy.id("switch.entryway_overhead_lights");
  const livingRoomScene = hass.refBy.id("scene.living_room_bright");

  personJerred.onUpdate(
    async (
      newState: ENTITY_STATE<"person.jerred"> | undefined,
      oldState: ENTITY_STATE<"person.jerred"> | undefined,
    ) => {
      if (oldState && newState && newState.state === "home" && oldState.state === "not_home") {
        logger.info("Welcome Home automation triggered");

        await hass.call.notify.notify({
          title: "Welcome Home",
          message: "Welcome back! Hope you had a great time.",
        });

        logger.debug("Turning on entryway light");
        await entrywayLight.turn_on();

        logger.debug("Setting living room scene to bright");
        await livingRoomScene.turn_on();

        if (shouldStopCleaning(roomba.state)) {
          logger.debug("Commanding Roomba to return to base");
          await roomba.return_to_base();
        }
      }
    },
  );
}
