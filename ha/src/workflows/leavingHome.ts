import type { TServiceParams } from "@digital-alchemy/core";

export function leavingHome({ hass, logger }: TServiceParams) {
  const personJerred = hass.refBy.id("person.jerred");
  const roomba = hass.refBy.id("vacuum.roomba");

  personJerred.onUpdate(async (newState, oldState) => {
    if (newState.state === "away" && oldState.state === "home") {
      logger.info("Leaving Home automation triggered");

      await hass.call.notify.notify({
        title: "Leaving Home",
        message: "Goodbye! The Roomba will start cleaning soon.",
      });

      if (roomba.attributes.status === "charging" || roomba.attributes.status === "docked") {
        logger.debug("Commanding Roomba to start cleaning");
        await roomba.start();
      }
    }
  });
}
