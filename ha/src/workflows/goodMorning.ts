import type { TServiceParams } from "@digital-alchemy/core";
import { openCoversWithDelay, runParallel, runSequential, runSequentialWithDelay, repeat, runIf } from "../util.ts";

export function goodMorning({ hass, scheduler, logger }: TServiceParams) {
  const bedroomScene = hass.refBy.id("scene.bedroom_dimmed");
  const bedroomMediaPlayer = hass.refBy.id("media_player.bedroom");
  const bedroomBrightScene = hass.refBy.id("scene.bedroom_bright");
  const extraMediaPlayers = [hass.refBy.id("media_player.main_bathroom"), hass.refBy.id("media_player.entryway")];
  const bedroomHeater = hass.refBy.id("climate.bedroom_thermostat");
  const entrywayLight = hass.refBy.id("switch.entryway_overhead_lights");
  const mainBathroomLight = hass.refBy.id("switch.main_bathroom_lights");
  const personJerred = hass.refBy.id("person.jerred");

  const weekdayWakeUpHour = 8;
  const weekendWakeUpHour = 9;

  const startVolume = 0;
  const earlyVolumeSteps = 3;
  const lateVolumeSteps = 5;
  const maxVolume = 0.4;

  // one hour before
  scheduler.cron({
    schedule: [`0 ${(weekdayWakeUpHour - 1).toString()} * * 1-5`, `0 ${(weekendWakeUpHour - 1).toString()} * * 6,0`],
    exec: runEarly,
  });

  // at wake up time
  scheduler.cron({
    schedule: [`0 ${weekdayWakeUpHour.toString()} * * 1-5`, `0 ${weekendWakeUpHour.toString()} * * 6,0`],
    exec: runWakeUp,
  });

  // 15 minutes later
  scheduler.cron({
    schedule: [`15 ${weekdayWakeUpHour.toString()} * * 1-5`, `15 ${weekendWakeUpHour.toString()} * * 6,0`],
    exec: runGetUp,
  });

  async function runEarly() {
    await runIf(
      personJerred.state === "home",
      bedroomHeater.set_temperature({
        hvac_mode: "heat",
        temperature: 24,
      }),
    );
  }

  async function runWakeUp() {
    await runParallel([
      bedroomHeater.set_temperature({
        hvac_mode: "off",
      }),
      runIf(
        personJerred.state === "home",
        runParallel([
          hass.call.notify.notify({
            title: "Good Morning",
            message: "Good Morning! Time to wake up.",
          }),
          runSequential([
            bedroomMediaPlayer.unjoin(),
            bedroomMediaPlayer.volume_set({ volume_level: startVolume }),
            bedroomMediaPlayer.play_media({
              media_content_id: "FV:2/5",
              media_content_type: "favorite_item_id",
            }),
            runSequentialWithDelay(repeat(bedroomMediaPlayer.volume_up, 3), {
              amount: 5,
              unit: "s",
            }),
          ]),
          bedroomScene.turn_on({ transition: 3 }),
          mainBathroomLight.turn_on(),
        ]),
      ),
    ]);
  }

  async function runGetUp() {
    await runIf(
      personJerred.state === "home",
      runParallel([
        openCoversWithDelay(hass, ["cover.bedroom_left", "cover.bedroom_right"]),
        bedroomBrightScene.turn_on({ transition: 60 }),
        runSequential([
          (async () => {
            for (const player of extraMediaPlayers) {
              await player.volume_set({ volume_level: startVolume });
            }
          })(),
          bedroomMediaPlayer.join({
            group_members: extraMediaPlayers.map((p) => p.entity_id),
          }),
          runSequentialWithDelay(
            repeat(async () => {
              if (bedroomMediaPlayer.attributes.volume_level < maxVolume) {
                await bedroomMediaPlayer.volume_up();
              }
              await Promise.all(
                extraMediaPlayers.map(async (player) => {
                  if (player.attributes.volume_level < maxVolume) {
                    logger.debug(`Increasing volume for ${player.entity_id}`);
                    await player.volume_up();
                  }
                }),
              );
            }, lateVolumeSteps),
            {
              amount: 5,
              unit: "s",
            },
          ),
          runSequentialWithDelay(
            repeat(async () => {
              await Promise.all(
                extraMediaPlayers.map(async (player) => {
                  if (player.attributes.volume_level < maxVolume) {
                    logger.debug(`Increasing volume for ${player.entity_id}`);
                    await player.volume_up();
                  }
                }),
              );
            }, earlyVolumeSteps),
            {
              amount: 5,
              unit: "s",
            },
          ),
        ]),
        entrywayLight.turn_on(),
      ]),
    );
  }
}
