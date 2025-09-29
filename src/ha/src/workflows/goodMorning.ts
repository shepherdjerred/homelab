import type { TServiceParams } from "@digital-alchemy/core";
import {
  openCoversWithDelay,
  runParallel,
  runSequential,
  runSequentialWithDelay,
  repeat,
  runIf,
  wait,
} from "../util.ts";
import z from "zod";

export function goodMorning({ hass, scheduler, logger }: TServiceParams) {
  const bedroomScene = hass.refBy.id("scene.bedroom_dimmed");
  const bedroomMediaPlayer = hass.refBy.id("media_player.bedroom");
  const bedroomBrightScene = hass.refBy.id("scene.bedroom_bright");
  const extraMediaPlayers = [hass.refBy.id("media_player.main_bathroom"), hass.refBy.id("media_player.entryway")];
  const bedroomHeater = hass.refBy.id("climate.bedroom_thermostat");
  const entrywayLight = hass.refBy.id("switch.entryway_overhead_lights");
  const mainBathroomLight = hass.refBy.id("switch.main_bathroom_lights");
  const personJerred = hass.refBy.id("person.jerred");
  const personShuxin = hass.refBy.id("person.shuxin");

  const weekdayWakeUpHour = 8;
  const weekendWakeUpHour = 9;

  const startVolume = 0;
  const initialVolumeSteps = 3; // Steps for bedroom player at wake up
  const additionalVolumeSteps = 2; // Additional gentle steps for all players

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
    await runIf(personJerred.state === "home", () =>
      bedroomHeater.set_temperature({
        hvac_mode: "heat",
        temperature: 24,
      }),
    );
  }

  async function runWakeUp() {
    await runParallel([
      () => bedroomHeater.turn_off(),
      () =>
        runIf(personJerred.state === "home", () =>
          runParallel([
            () =>
              hass.call.notify.notify({
                title: "Good Morning",
                message: "Good Morning! Time to wake up.",
              }),
            () =>
              runSequential([
                // Debug: Log the full state before doing anything
                () =>
                  (async () => {
                    logger.info(`Before any changes - Full state: ${JSON.stringify(bedroomMediaPlayer.attributes)}`);
                    logger.info(`Before any changes - Entity state: ${bedroomMediaPlayer.state}`);
                    return Promise.resolve();
                  })(),
                () => bedroomMediaPlayer.unjoin(),
                // Wait longer for unjoin to complete fully
                () => wait({ amount: 5, unit: "s" }),
                // Debug: Log state after unjoin
                () =>
                  (async () => {
                    logger.info(`After unjoin - Full state: ${JSON.stringify(bedroomMediaPlayer.attributes)}`);
                    logger.info(`After unjoin - Entity state: ${bedroomMediaPlayer.state}`);
                    return Promise.resolve();
                  })(),
                // Try volume_set with explicit value
                () =>
                  (async () => {
                    logger.info("Calling volume_set with volume_level: 0");
                    await bedroomMediaPlayer.volume_set({ volume_level: 0 });
                    logger.info("volume_set call completed");
                    return Promise.resolve();
                  })(),
                // Wait and check if it took effect
                () => wait({ amount: 2, unit: "s" }),
                // Debug: Log state after volume_set
                () =>
                  (async () => {
                    logger.info(`After volume_set - Full state: ${JSON.stringify(bedroomMediaPlayer.attributes)}`);
                    return Promise.resolve();
                  })(),
                // Play media with error handling and retry
                () =>
                  (async () => {
                    try {
                      logger.info("Attempting to play media on bedroom player");
                      await bedroomMediaPlayer.play_media({
                        media: {
                          media_content_id: "FV:2/5",
                          media_content_type: "favorite_item_id",
                        },
                      });
                      logger.info("Successfully started media playback");
                    } catch (error) {
                      const errorMsg = z
                        .instanceof(Error)
                        .transform((error) => error.message)
                        .catch((ctx) => String(ctx.value))
                        .parse(error);
                      logger.error(`First play_media attempt failed: ${errorMsg}`);
                      logger.info("Waiting additional time and retrying...");
                      await wait({ amount: 3, unit: "s" });
                      try {
                        await bedroomMediaPlayer.play_media({
                          media: {
                            media_content_id: "FV:2/5",
                            media_content_type: "favorite_item_id",
                          },
                        });
                        logger.info("Retry successful");
                      } catch (retryError) {
                        const retryErrorMsg = z
                          .instanceof(Error)
                          .transform((error) => error.message)
                          .catch((ctx) => String(ctx.value))
                          .parse(retryError);
                        logger.error(`Retry also failed: ${retryErrorMsg}`);
                        // Continue with the rest of the routine even if media fails
                      }
                    }
                  })(),
                () =>
                  runSequentialWithDelay(repeat(bedroomMediaPlayer.volume_up, initialVolumeSteps), {
                    amount: 5,
                    unit: "s",
                  }),
              ]),
            () => bedroomScene.turn_on({ transition: 3 }),
            () => mainBathroomLight.turn_on(),
          ]),
        ),
    ]);
  }

  async function runGetUp() {
    await runIf(personJerred.state === "home", () =>
      runParallel([
        () =>
          runIf(personShuxin.state === "not_home", () =>
            openCoversWithDelay(hass, ["cover.bedroom_left", "cover.bedroom_right"]),
          ),
        () => bedroomBrightScene.turn_on({ transition: 60 }),
        () =>
          runSequential([
            // Set extra players to start volume
            () =>
              (async () => {
                for (const player of extraMediaPlayers) {
                  await player.volume_set({ volume_level: startVolume });
                }
              })(),
            // Join all players together
            () =>
              bedroomMediaPlayer.join({
                group_members: extraMediaPlayers.map((p) => p.entity_id),
              }),
            // Gentle volume increase for all players (bedroom + extra)
            () =>
              runSequentialWithDelay(
                repeat(async () => {
                  // Increase bedroom player volume
                  await bedroomMediaPlayer.volume_up();
                  // Increase extra players volume
                  await Promise.all(
                    extraMediaPlayers.map(async (player) => {
                      logger.debug(`Increasing volume for ${player.entity_id}`);
                      await player.volume_up();
                    }),
                  );
                }, additionalVolumeSteps), // Only 2 additional steps instead of 5+3
                {
                  amount: 5,
                  unit: "s",
                },
              ),
          ]),
        () => entrywayLight.turn_on(),
      ]),
    );
  }
}
