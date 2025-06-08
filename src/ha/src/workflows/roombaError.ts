import type { TServiceParams } from "@digital-alchemy/core";
import { isErrorState } from "../util.ts";

export function roombaError({ hass, logger }: TServiceParams) {
  const roomba = hass.refBy.id("vacuum.roomba");

  roomba.onUpdate(async (newState, oldState) => {
    if (isErrorState(newState.state) && !isErrorState(oldState.state)) {
      logger.info("Roomba Error automation triggered");

      await hass.call.notify.notify({
        title: "Roomba Error",
        message: "The Roomba has encountered an error.",
      });
    }
  });
}
