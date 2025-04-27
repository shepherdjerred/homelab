import type { TServiceParams } from "@digital-alchemy/core";
import type { ENTITY_STATE } from "@digital-alchemy/hass";

export function welcomeHome({ hass, logger }: TServiceParams) {
  const personJerred = hass.refBy.id("person.jerred");
  const roomba = hass.refBy.id("vacuum.roomba");

  personJerred.onUpdate(
    async (
      newState: ENTITY_STATE<"person.jerred"> | undefined,
      oldState: ENTITY_STATE<"person.jerred"> | undefined,
    ) => {
      logger.debug("personJerred state updated", { newState, oldState });
      if (oldState && newState && newState.state === "home" && oldState.state !== "home") {
        logger.info("Welcome Home automation triggered");

        await hass.call.notify.notify({
          title: "Welcome Home",
          message: "Welcome back! Hope you had a great time.",
          data: {
            actions: [
              {
                action: "welcome_home",
                title: "Welcome Home",
                icon: "mdi:home",
              },
            ],
            push: {
              sound: "default",
            },
            channel: "welcome_home",
            sticky: true,
            color: "#00FF00",
          },
        });

        if (roomba.attributes.status !== "Charging" && roomba.attributes.status !== "Docked") {
          logger.debug("Commanding Roomba to return to base");
          await roomba.return_to_base();
        }
      }
    },
  );
}
