import type { TServiceParams } from "@digital-alchemy/core";
import { wait, openCoversWithDelay } from "../util.ts";

export function goodMorning({ hass, scheduler, logger }: TServiceParams) {
  const bedroomScene = hass.refBy.id("scene.bedroom_dimmed");
  const bedroomMediaPlayer = hass.refBy.id("media_player.bedroom");
  const bedroomBrightScene = hass.refBy.id("scene.bedroom_bright");
  const extraMediaPlayers = [hass.refBy.id("media_player.main_bathroom"), hass.refBy.id("media_player.entryway")];
  const bedroomHeater = hass.refBy.id("climate.bedroom_thermostat");
  const entrywayLight = hass.refBy.id("switch.entryway_overhead_lights");
  const mainBathroomLight = hass.refBy.id("switch.main_bathroom_lights");

  const weekday = 8;
  const weekend = 9;

  const startVolume = 0;
  const earlyVolumeSteps = 3;
  const lateVolumeSteps = 5;

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
      temperature: 24,
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
    await bedroomMediaPlayer.volume_set({ volume_level: startVolume });

    logger.debug("Playing media on bedroom media player");
    await bedroomMediaPlayer.play_media({
      media_content_id: "FV:2/5",
      media_content_type: "favorite_item_id",
    });

    for (let i = 0; i < earlyVolumeSteps; i++) {
      logger.debug(`Increasing bedroom media player volume (step ${(i + 1).toString()})`);
      await bedroomMediaPlayer.volume_up();
      await wait({
        amount: 5,
        unit: "s",
      });
    }

    // turn on the main bathroom light
    logger.debug("Turning on main bathroom light");
    await mainBathroomLight.turn_on();
  }

  async function runGetUp() {
    logger.debug("Opening bedroom covers");
    await openCoversWithDelay(hass, ["cover.bedroom_left", "cover.bedroom_right"]);

    logger.debug("Turning on bedroom bright scene");
    await bedroomBrightScene.turn_on({ transition: 60 });

    for (const player of extraMediaPlayers) {
      logger.debug(`Setting volume to 0 for ${player.entity_id}`);
      await player.volume_set({ volume_level: startVolume });
    }

    logger.debug("Joining bathroom media players to bedroom media player");
    await bedroomMediaPlayer.join({
      group_members: extraMediaPlayers.map((p) => p.entity_id),
    });

    for (let i = 0; i < lateVolumeSteps; i++) {
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

    // increase the volume of the extra media players to match the bedroom media player
    for (let i = 0; i < earlyVolumeSteps; i++) {
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

    // turn on the entryway light
    logger.debug("Turning on entryway light");
    await entrywayLight.turn_on();
  }
}
