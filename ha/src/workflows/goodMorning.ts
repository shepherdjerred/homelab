import type { TServiceParams } from "@digital-alchemy/core";
import { wait, openCoversWithDelay } from "../util.ts";

export function goodMorning({ hass, scheduler, logger }: TServiceParams) {
  const bedroomScene = hass.refBy.id("scene.bedroom_dimmed");
  const bedroomMediaPlayer = hass.refBy.id("media_player.bedroom");
  const bedroomBrightScene = hass.refBy.id("scene.bedroom_bright");
  const bathroomMediaPlayers = [hass.refBy.id("media_player.main_bathroom")];

  scheduler.cron({
    schedule: "0 8 * * 1-5", // Every weekday at 8am
    exec: runFirst,
  });

  scheduler.cron({
    schedule: "0 9 * * 6,0", // Every weekend at 9am
    exec: runFirst,
  });

  async function runFirst() {
    logger.info("Good Morning automation triggered");

    await hass.call.notify.notify({
      title: "Good Morning",
      message: "Good Morning! Have a great day ahead.",
    });

    logger.debug("Turning on bedroom dimmed scene");
    await bedroomScene.turn_on({ transition: 3 });

    logger.debug("Unjoining bedroom media player");
    await bedroomMediaPlayer.unjoin();

    logger.debug("Setting bedroom media player volume to 0");
    await bedroomMediaPlayer.volume_set({ volume_level: 0 });

    logger.debug("Playing media on bedroom media player");
    await bedroomMediaPlayer.play_media({
      media_content_id: "FV:2/5",
      media_content_type: "favorite_item_id",
    });

    for (let i = 0; i < 2; i++) {
      logger.debug(`Increasing bedroom media player volume (step ${(i + 1).toString()})`);
      await bedroomMediaPlayer.volume_up();
      await wait({
        amount: 5,
        unit: "s",
      });
    }

    await wait({ amount: 15, unit: "m" });

    logger.debug("Opening bedroom covers");
    await openCoversWithDelay(hass, ["cover.bedroom_left", "cover.bedroom_right"]);

    logger.debug("Turning on bedroom bright scene");
    await bedroomBrightScene.turn_on({ transition: 60 });

    for (const player of bathroomMediaPlayers) {
      logger.debug(`Setting volume to 0 for ${player.entity_id}`);
      await player.volume_set({ volume_level: 0 });
    }

    logger.debug("Joining bathroom media players to bedroom media player");
    await bedroomMediaPlayer.join({
      group_members: bathroomMediaPlayers.map((p) => p.entity_id),
    });

    for (let i = 0; i < 3; i++) {
      logger.debug(`Increasing bedroom media player volume (step ${(i + 1).toString()})`);
      await bedroomMediaPlayer.volume_up();
      await wait({
        amount: 5,
        unit: "s",
      });
    }
  }
}
