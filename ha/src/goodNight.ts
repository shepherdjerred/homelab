import type { TServiceParams } from "@digital-alchemy/core";
import { z } from "zod";
import { wait } from "./util.ts";

export function goodNight({ hass, logger, context }: TServiceParams) {
  const bedroomScene = hass.refBy.id("scene.bedroom_dimmed");
  const bedroomMediaPlayer = hass.refBy.id("media_player.bedroom");
  const closeBedroomCovers = hass.refBy.id("script.close_bedroom_covers");
  const openLivingRoomCovers = hass.refBy.id("script.open_all_living_room_tv_covers");
  const bedroomLight = hass.refBy.id("light.bedroom");

  hass.socket.onEvent({
    context,
    event: "ios.action_fired",
    exec: async (event) => {
      logger.info("Good Night automation triggered");

      const result = z
        .object({
          data: z.object({
            actionID: z.string(),
          }),
        })
        .safeParse(event);

      if (!result.success || result.data.data.actionID !== "A91A15AA-479E-416C-8F51-BD983A999266") {
        logger.debug("Event actionID does not match, ignoring");
      }

      await hass.call.notify.notify({
        title: "Good Night",
        message: "Good Night! Sleep well.",
        data: {
          actions: [
            {
              action: "good_night",
              title: "Good Night",
              icon: "mdi:bed",
            },
          ],
          push: {
            sound: "default",
          },
          channel: "good_night",
          sticky: true,
          color: "#000000",
        },
      });

      if (bedroomLight.state === "on") {
        logger.debug("Turning on bedroom scene");
        await bedroomScene.turn_on();
      }

      logger.debug("Unjoining bedroom media player");
      await bedroomMediaPlayer.unjoin();

      logger.debug("Setting bedroom media player volume to 0");
      await bedroomMediaPlayer.volume_set({ volume_level: 0 });

      logger.debug("Playing media on bedroom media player");
      await bedroomMediaPlayer.play_media({
        media_content_id: "FV:2/7",
        media_content_type: "favorite_item_id",
      });

      for (let i = 0; i < 5; i++) {
        logger.debug(`Increasing bedroom media player volume (step ${(i + 1).toString()})`);
        await wait(5000);
        await bedroomMediaPlayer.volume_up();
      }

      logger.debug("Closing bedroom covers");
      await closeBedroomCovers.turn_on();

      logger.debug("Opening living room covers");
      await openLivingRoomCovers.turn_on();
    },
  });
}
