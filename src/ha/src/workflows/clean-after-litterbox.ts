import type { TServiceParams } from "@digital-alchemy/core";
import type { ENTITY_STATE } from "@digital-alchemy/hass";
import { shouldStartCleaning, withTimeout } from "../util.ts";
import { instrumentWorkflow } from "../metrics.ts";

export function cleanAfterLitterbox({ hass, logger }: TServiceParams) {
  // Replace this with your actual litterbox sensor entity ID
  // Common examples: binary_sensor.litterbox_sensor, sensor.litterbox_usage, etc.
  const litterboxSensor = hass.refBy.id("binary_sensor.litterbox_sensor");
  const roomba = hass.refBy.id("vacuum.roomba");

  // Configuration: Replace with your room name or room ID
  // To find room IDs, you can check the Roomba's attributes in Home Assistant
  // or use the iRobot mobile app to see room names
  const targetRoom = "Bathroom"; // Change this to your room name or use room ID

  litterboxSensor.onUpdate(
    async (
      newState: ENTITY_STATE<"binary_sensor.litterbox_sensor"> | undefined,
      oldState: ENTITY_STATE<"binary_sensor.litterbox_sensor"> | undefined,
    ) => {
      // Trigger when the sensor goes from off to on (litterbox used)
      if (oldState && newState && newState.state === "on" && oldState.state === "off") {
        await instrumentWorkflow("clean_after_litterbox", async () => {
          await withTimeout(
            (async () => {
              logger.info("Clean After Litterbox automation triggered");

              logger.debug("Checking if Roomba can start cleaning");
              if (shouldStartCleaning(roomba.state)) {
                logger.debug(`Conditions met; starting Roomba in room: ${targetRoom}`);

                await hass.call.notify.notify({
                  title: "Roomba Starting",
                  message: `The Roomba is cleaning the ${targetRoom} after litterbox use.`,
                });

                // Send command to clean specific room
                // Note: This requires your Roomba to support room-specific cleaning
                // and to have room mappings configured in the iRobot app
                await hass.call.vacuum.send_command({
                  entity_id: "vacuum.roomba",
                  command: "start",
                  params: {
                    pmap_id: "", // Replace with actual room ID from your Roomba
                    regions: [{ region_id: targetRoom, type: "rid" }],
                  },
                });

                // Alternative: If room-specific cleaning doesn't work, use standard start
                // Uncomment the line below and comment out the send_command above
                // await roomba.start();
              } else {
                logger.info(`Roomba not ready to clean. Current state: ${roomba.state}`);
              }
            })(),
            { amount: 2, unit: "m" },
            "clean_after_litterbox workflow",
          );
        });
      }
    },
  );
}
