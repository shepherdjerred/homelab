import { TServiceParams } from "@digital-alchemy/core";

export function leavingHome({ hass, logger }: TServiceParams) {
    const personJerred = hass.refBy.id("person.jerred");
    const roomba = hass.refBy.id("vacuum.roomba");

    personJerred.onUpdate(async (newState, oldState) => {
        logger.debug("personJerred state updated", { newState, oldState });
        if (newState.state === "not_home" && oldState.state !== "not_home") {
            logger.info("Leaving Home automation triggered");

            hass.call.notify.notify({
                title: "Leaving Home",
                message: "Goodbye! The Roomba will start cleaning soon.",
                data: {
                    actions: [
                        {
                            action: "leaving_home",
                            title: "Leaving Home",
                            icon: "mdi:door",
                        },
                    ],
                    push: {
                        sound: "default",
                    },
                    channel: "leaving_home",
                    sticky: true,
                    color: "#FF4500",
                },
            });

            if (
                roomba.attributes.status === "Charging" ||
                roomba.attributes.status === "Docked"
            ) {
                logger.debug("Commanding Roomba to start cleaning");
                await roomba.start();
            }
        }
    });
}
