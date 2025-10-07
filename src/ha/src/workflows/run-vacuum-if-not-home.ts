import { CronExpression, type TServiceParams } from "@digital-alchemy/core";
import { shouldStartCleaning, withTimeout } from "../util.ts";
import { instrumentWorkflow } from "../metrics.ts";

export function runVacuumIfNotHome({ hass, scheduler, logger }: TServiceParams) {
  const personJerred = hass.refBy.id("person.jerred");
  const roomba = hass.refBy.id("vacuum.roomba");

  scheduler.cron({
    schedule: CronExpression.EVERY_DAY_AT_9AM,
    exec: async () => {
      await instrumentWorkflow("run_vacuum_if_not_home", async () => {
        await withTimeout(
          (async () => {
            logger.info("Run Vacuum if Not Home automation triggered");

            logger.debug("Checking conditions for vacuum execution");
            if (personJerred.state === "not_home") {
              if (shouldStartCleaning(roomba.state)) {
                logger.debug("Conditions met; starting Roomba");

                await hass.call.notify.notify({
                  title: "Vacuum Started",
                  message: "The Roomba has started cleaning since no one is home.",
                });

                await roomba.start();
              }
            }
          })(),
          { amount: 2, unit: "m" },
          "run_vacuum_if_not_home workflow",
        );
      });
    },
  });
}
