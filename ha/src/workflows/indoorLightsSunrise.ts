import type { TServiceParams } from "@digital-alchemy/core";
import { openCoversWithDelay } from "../util.ts";

export function indoorLightsSunrise({ hass, logger, automation }: TServiceParams) {
  const livingRoomScene = hass.refBy.id("scene.living_room_dimmed");

  automation.solar.onEvent({
    eventName: "sunrise",
    exec: async () => {
      logger.info("Indoor lights (sunrise) automation triggered");

      await hass.call.notify.notify({
        title: "Sunrise Lights",
        message: "The indoor lights have been adjusted for sunrise.",
      });

      logger.debug("Turning on living room scene");
      await livingRoomScene.turn_on({ transition: 10 });

      logger.debug("Opening living room covers");
      await openCoversWithDelay(hass, [
        "cover.living_room_left",
        "cover.living_room_right",
        "cover.tv_left",
        "cover.tv_right",
      ]);
    },
  });
}
