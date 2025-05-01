import type { TServiceParams } from "@digital-alchemy/core";
import { wait, openCoversWithDelay } from "../util.ts";

export function goodMorning({ hass, scheduler, logger }: TServiceParams) {
  const bedroomScene = hass.refBy.id("scene.bedroom_dimmed");
  const bedroomMediaPlayer = hass.refBy.id("media_player.bedroom");
  const bedroomBrightScene = hass.refBy.id("scene.bedroom_bright");
  const extraMediaPlayers = [hass.refBy.id("media_player.main_bathroom"), hass.refBy.id("media_player.entryway")];
  const bedroomHeater = hass.refBy.id("climate.bedroom_thermostat");

  const weekday = 8;
  const weekend = 9;

  // one hour before
  scheduler.cron({
    schedule: [`0 ${(weekday - 1).toString()} * * 1-5`, `0 ${(weekend - 1).toString()} * * 6,0`],
    exec: runEarly,
  });

  scheduler.cron({
    schedule: [`0 ${weekday.toString()} * * 1-5`, `0 ${weekend.toString()} * * 6,0`],
    exec: runWakeUp,
  });

  // 15 minutes later
  scheduler.cron({
    schedule: [`15 ${weekday.toString()} * * 1-5`, `15 ${weekend.toString()} * * 6,0`],
    exec: runGetUp,
  });

  async function runEarly() {
    logger.info("Turning on bedroom heater");
    await bedroomHeater.set_temperature({
      temperature: 23,
    });
  }

  async function runWakeUp() {
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
  }

  async function runGetUp() {
    logger.debug("Opening bedroom covers");
    await openCoversWithDelay(hass, ["cover.bedroom_left", "cover.bedroom_right"]);

    logger.debug("Turning on bedroom bright scene");
    await bedroomBrightScene.turn_on({ transition: 60 });

    for (const player of extraMediaPlayers) {
      logger.debug(`Setting volume to 0 for ${player.entity_id}`);
      await player.volume_set({ volume_level: 0 });
    }

    logger.debug("Joining bathroom media players to bedroom media player");
    await bedroomMediaPlayer.join({
      group_members: extraMediaPlayers.map((p) => p.entity_id),
    });

    for (let i = 0; i < 3; i++) {
      logger.debug(`Increasing bedroom media player volume (step ${(i + 1).toString()})`);
      await bedroomMediaPlayer.volume_up();
      await Promise.all(
        extraMediaPlayers.map(async (player) => {
          logger.debug(`Increasing volume for ${player.entity_id}`);
          await player.volume_up();
        }),
      );
      await wait({
        amount: 5,
        unit: "s",
      });
    }

    logger.debug("Turning off bedroom heater");
    await bedroomHeater.turn_off();
  }
}
