import { CronExpression, type TServiceParams } from "@digital-alchemy/core";

export function runVacuumIfNotHome({ hass, scheduler, logger }: TServiceParams) {
  const personJerred = hass.refBy.id("person.jerred");
  const roomba = hass.refBy.id("vacuum.roomba");

  scheduler.cron({
    schedule: CronExpression.EVERY_DAY_AT_9AM,
    exec: async () => {
      logger.info("Run Vacuum if Not Home automation triggered");

      await hass.call.notify.notify({
        title: "Vacuum Started",
        message: "The Roomba has started cleaning since no one is home.",
        data: {
          actions: [
            {
              action: "vacuum_started",
              title: "Vacuum Started",
              icon: "mdi:robot-vacuum",
            },
          ],
          push: {
            sound: "default",
          },
          channel: "vacuum_started",
          sticky: true,
          color: "#0000FF",
        },
      });

      logger.debug("Checking conditions for vacuum execution");
      if (personJerred.state === "not_home" && roomba.state === "docked") {
        logger.debug("Conditions met, starting Roomba");
        await roomba.start();
      }
    },
  });
}
