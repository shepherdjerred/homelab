import type { TServiceParams } from "@digital-alchemy/core";
import { closeCoversWithDelay } from "../util.ts";

export function indoorLightsSunset({ hass, logger, automation }: TServiceParams) {
  const livingRoomScene = hass.refBy.id("scene.living_room_bright");
  const bedroomScene = hass.refBy.id("scene.bedroom_bright");

  automation.solar.onEvent({
    eventName: "sunset",
    exec: async () => {
      logger.info("Indoor lights (sunset) automation triggered");

      await hass.call.notify.notify({
        title: "Sunset Lights",
        message: "The indoor lights have been adjusted for sunset.",
      });

      logger.debug("Turning on living room scene");
      await livingRoomScene.turn_on({ transition: 10 });

      logger.debug("Turning on bedroom scene");
      await bedroomScene.turn_on({ transition: 10 });

      logger.debug("Closing living room covers");
      await closeCoversWithDelay(hass, [
        "cover.living_room_left",
        "cover.living_room_right",
        "cover.tv_left",
        "cover.tv_right",
      ]);

      logger.debug("Closing bedroom covers");
      await closeCoversWithDelay(hass, ["cover.bedroom_left", "cover.bedroom_right"]);
    },
  });
}
