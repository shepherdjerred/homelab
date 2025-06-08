import type { TServiceParams } from "@digital-alchemy/core";
import { closeCoversWithDelay, runParallel } from "../util.ts";

export function indoorLightsSunset({ hass, automation }: TServiceParams) {
  const livingRoomScene = hass.refBy.id("scene.living_room_dimmed");
  const bedroomScene = hass.refBy.id("scene.bedroom_dimmed");

  automation.solar.onEvent({
    eventName: "sunset",
    exec: async () => {
      await runParallel([
        hass.call.notify.notify({
          title: "Sunset Lights",
          message: "The indoor lights have been adjusted for sunset.",
        }),
        livingRoomScene.turn_on({ transition: 10 }),
        bedroomScene.turn_on({ transition: 10 }),
        closeCoversWithDelay(hass, [
          "cover.living_room_left",
          "cover.living_room_right",
          "cover.tv_left",
          "cover.tv_right",
        ]),
        closeCoversWithDelay(hass, ["cover.bedroom_left", "cover.bedroom_right"]),
      ]);
    },
  });
}
