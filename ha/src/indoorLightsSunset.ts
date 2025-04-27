import type { TServiceParams } from "@digital-alchemy/core";

export function indoorLightsSunset({ hass, logger, automation }: TServiceParams) {
  const livingRoomScene = hass.refBy.id("scene.living_room_bright");
  const bedroomScene = hass.refBy.id("scene.bedroom_bright");
  const closeLivingRoomCovers = hass.refBy.id("script.close_all_living_room_tv_covers");
  const closeBedroomCovers = hass.refBy.id("script.close_bedroom_covers");

  automation.solar.onEvent({
    eventName: "sunset",
    exec: async () => {
      logger.info("Indoor lights (sunset) automation triggered");

      await hass.call.notify.notify({
        title: "Sunset Lights",
        message: "The indoor lights have been adjusted for sunset.",
        data: {
          actions: [
            {
              action: "sunset_lights",
              title: "Sunset Lights",
              icon: "mdi:weather-night",
            },
          ],
          push: {
            sound: "default",
          },
          channel: "sunset_lights",
          sticky: true,
          color: "#FFA500",
        },
      });

      logger.debug("Turning on living room scene");
      await livingRoomScene.turn_on({ transition: 10 });

      logger.debug("Turning on bedroom scene");
      await bedroomScene.turn_on({ transition: 10 });

      logger.debug("Closing living room covers");
      await closeLivingRoomCovers.turn_on();

      logger.debug("Closing bedroom covers");
      await closeBedroomCovers.turn_on();
    },
  });
}
