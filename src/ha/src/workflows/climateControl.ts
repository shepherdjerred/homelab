import type { TServiceParams } from "@digital-alchemy/core";
import type { ENTITY_STATE } from "@digital-alchemy/hass";

export function climateControl({ hass, logger }: TServiceParams) {
  const personJerred = hass.refBy.id("person.jerred");
  const thermostat = hass.refBy.id("climate.bedroom_thermostat"); // Main thermostat/AC
  // Using thermostat's current temperature attribute instead of separate sensor

  // Temperature preferences
  const HOME_TEMPERATURE = 23;
  const AWAY_TEMPERATURE = 24;

  // Helper function to check if cooling is needed
  function shouldCool(currentTemp: number, targetTemp: number): boolean {
    return currentTemp > targetTemp + 0.5; // Add 0.5°C buffer to prevent frequent on/off
  }

  // Helper function to get current temperature from thermostat
  function getCurrentTemperature(): number {
    const currentTemp = thermostat.attributes.current_temperature;
    if (typeof currentTemp === "number") {
      return currentTemp;
    }
    if (typeof currentTemp === "string") {
      const temp = parseFloat(currentTemp);
      return isNaN(temp) ? 20 : temp;
    }
    return 20; // Default to 20°C if temperature unavailable
  }

  // Handle coming home
  personJerred.onUpdate(
    async (
      newState: ENTITY_STATE<"person.jerred"> | undefined,
      oldState: ENTITY_STATE<"person.jerred"> | undefined,
    ) => {
      if (oldState && newState && newState.state === "home" && oldState.state === "not_home") {
        logger.info("Climate Control: Coming home - adjusting temperature");

        const currentTemp = getCurrentTemperature();

        if (shouldCool(currentTemp, HOME_TEMPERATURE)) {
          logger.debug(
            `Current temperature: ${currentTemp.toString()}°C, setting AC to cool to ${HOME_TEMPERATURE.toString()}°C`,
          );

          await thermostat.set_temperature({
            hvac_mode: "cool",
            temperature: HOME_TEMPERATURE,
          });

          await hass.call.notify.notify({
            title: "Climate Control",
            message: `Welcome home! AC is cooling to ${HOME_TEMPERATURE.toString()}°C (current: ${currentTemp.toString()}°C)`,
          });
        } else {
          logger.debug(
            `Current temperature: ${currentTemp.toString()}°C, no cooling needed for target ${HOME_TEMPERATURE.toString()}°C`,
          );

          // Just set the temperature without cooling mode if it's already comfortable
          await thermostat.set_temperature({
            hvac_mode: "off",
            temperature: HOME_TEMPERATURE,
          });
        }
      }

      // Handle leaving home
      if (oldState && newState && newState.state === "not_home" && oldState.state === "home") {
        logger.info("Climate Control: Leaving home - adjusting temperature");

        const currentTemp = getCurrentTemperature();

        if (shouldCool(currentTemp, AWAY_TEMPERATURE)) {
          logger.debug(
            `Current temperature: ${currentTemp.toString()}°C, setting AC to cool to ${AWAY_TEMPERATURE.toString()}°C`,
          );

          await thermostat.set_temperature({
            hvac_mode: "cool",
            temperature: AWAY_TEMPERATURE,
          });

          await hass.call.notify.notify({
            title: "Climate Control",
            message: `Goodbye! AC is cooling to ${AWAY_TEMPERATURE.toString()}°C (current: ${currentTemp.toString()}°C)`,
          });
        } else {
          logger.debug(
            `Current temperature: ${currentTemp.toString()}°C, no cooling needed for target ${AWAY_TEMPERATURE.toString()}°C`,
          );

          // Just set the temperature without cooling mode if it's already comfortable
          await thermostat.set_temperature({
            hvac_mode: "off",
            temperature: AWAY_TEMPERATURE,
          });
        }
      }
    },
  );
}
