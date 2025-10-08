import type { TServiceParams } from "@digital-alchemy/core";
import { wait, withTimeout } from "../util.ts";
import { instrumentWorkflow } from "../metrics.ts";

export function resetLeftBlind({ hass, logger }: TServiceParams) {
  const leftBlindControl = hass.refBy.id("cover.bedroom_left");

  const leftBlindSwitch = hass.refBy.id("switch.office_left_blinds");

  // Cooldown period: don't run the automation more than once per 15 minutes
  const COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes
  let lastExecutionTime = 0;

  leftBlindControl.onUpdate(async (newState, oldState) => {
    logger.info(`Left blind control state: ${newState.state}`);
    logger.info(`Left blind switch state: ${leftBlindSwitch.state}`);

    // Check if the blind control just became unavailable
    if (newState.state === "unavailable" && oldState.state !== "unavailable") {
      const now = Date.now();
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
            logger.info("Reset Left Blind automation triggered - blind control is unavailable");

            await hass.call.notify.notify({
              title: "Left Blind Reset",
              message: "The left blind control is unavailable. Attempting to reset...",
            });

            // Turn off the switch
            logger.debug("Turning off left blind switch");
            await leftBlindSwitch.turn_off();

            // Wait 5 seconds
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
