import { TServiceParams } from "@digital-alchemy/core";

export function indoorLightsSunrise(
    { hass, logger, automation }: TServiceParams,
) {
    const livingRoomScene = hass.refBy.id("scene.living_room_dimmed");
    const openLivingRoomCovers = hass.refBy.id(
        "script.open_all_living_room_tv_covers",
    );

    automation.solar.onEvent({
        eventName: "sunrise",
        exec: async () => {
            logger.info(`Indoor lights (sunrise) automation triggered`);

            hass.call.notify.notify({
                title: "Sunrise Lights",
                message: "The indoor lights have been adjusted for sunrise.",
                data: {
                    actions: [
                        {
                            action: "sunrise_lights",
                            title: "Sunrise Lights",
                            icon: "mdi:weather-sunny",
                        },
                    ],
                    push: {
                        sound: "default",
                    },
                    channel: "sunrise_lights",
                    sticky: true,
                    color: "#FFD700",
                },
            });

            logger.debug("Turning on living room scene");
            await livingRoomScene.turn_on({ transition: 10 });

            logger.debug("Opening living room covers");
            await openLivingRoomCovers.turn_on();
        },
    });
}
