import type { TServiceParams } from "@digital-alchemy/core";
import { wait, withTimeout } from "../util.ts";
import { instrumentWorkflow } from "../metrics.ts";

export function resetLeftBlind({ hass, logger }: TServiceParams) {
  const leftBlindControl = hass.refBy.id("cover.office_left");

  const leftBlindSwitch = hass.refBy.id("switch.office_left_blinds");

  // Cooldown period: don't run the automation more than once per 15 minutes
  const COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes
  let lastExecutionTime = 0;

  leftBlindControl.onUpdate(async (newState, oldState) => {
    // Debug logging: log everything about the state
    logger.info(`===== Left Blind Control State Update =====`);
    logger.info(`Current state: ${newState.state}`);
    logger.info(`Previous state: ${oldState.state}`);
    logger.info(`Entity ID: ${newState.entity_id}`);
    logger.info(`Left blind switch state: ${leftBlindSwitch.state}`);

    // Log all timestamps
    logger.info(`Last reported: ${JSON.stringify(newState.last_reported)}`);
    logger.info(`Last changed: ${JSON.stringify(newState.last_changed)}`);
    logger.info(`Last updated: ${JSON.stringify(newState.last_updated)}`);

    // Log all attributes
    logger.info(`Attributes: ${JSON.stringify(newState.attributes, null, 2)}`);

    // Log the full state object for complete debugging
    logger.debug(`Full newState: ${JSON.stringify(newState, null, 2)}`);
    logger.debug(`Full oldState: ${JSON.stringify(oldState, null, 2)}`);
    logger.info(`===========================================`);

    // Check if the blind hasn't reported in more than 2 minutes (device offline)
    const now = Date.now();
    const OFFLINE_THRESHOLD_MS = 2 * 60 * 1000; // 2 minutes

    const lastReportedMs = newState.last_reported.valueOf();
    const timeSinceReport = now - lastReportedMs;
    const minutesSinceReport = Math.floor(timeSinceReport / 60000);
    const secondsSinceReport = Math.floor((timeSinceReport % 60000) / 1000);

    logger.info(`Time since last report: ${minutesSinceReport.toString()}m ${secondsSinceReport.toString()}s`);

    // Only trigger if the device has been offline for more than 2 minutes
    if (timeSinceReport > OFFLINE_THRESHOLD_MS) {
      logger.info(`Device has been offline for more than 2 minutes`);

      const timeSinceLastExecution = now - lastExecutionTime;

      // Check if we're still in the cooldown period
      if (timeSinceLastExecution < COOLDOWN_MS) {
        const remainingMinutes = Math.ceil((COOLDOWN_MS - timeSinceLastExecution) / 60000).toString();
        logger.info(`Reset Left Blind automation skipped - cooldown active (${remainingMinutes} minutes remaining)`);
        return;
      }

      // Update the last execution time
      lastExecutionTime = now;
      await instrumentWorkflow("reset_left_blind", async () => {
        await withTimeout(
          (async () => {
            logger.info("Reset Left Blind automation triggered - device hasn't reported in over 2 minutes");

            await hass.call.notify.notify({
              title: "Left Blind Reset",
              message: "The left blind hasn't reported in over 2 minutes. Attempting to reset...",
            });

            // Turn off the switch
            logger.debug("Turning off left blind switch");
            await leftBlindSwitch.turn_off();

            // Wait 10 seconds
            logger.debug("Waiting 10 seconds");
            await wait({ amount: 10, unit: "s" });

            // Turn on the switch
            logger.debug("Turning on left blind switch");
            await leftBlindSwitch.turn_on();

            logger.info("Left blind switch has been reset");

            await hass.call.notify.notify({
              title: "Left Blind Reset Complete",
              message: "The left blind switch has been power cycled.",
            });
          })(),
          { amount: 1, unit: "m" },
          "reset_left_blind workflow",
        );
      });
    }
  });
}
