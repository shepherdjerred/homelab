import type { TServiceParams } from "@digital-alchemy/core";
import type { PICK_ENTITY } from "@digital-alchemy/hass";
import { match } from "ts-pattern";

export function wait({ amount, unit = "ms" }: { amount: number; unit?: "ms" | "s" | "m" }) {
  const ms = match(unit)
    .with("ms", () => amount)
    .with("s", () => amount * 1000)
    .with("m", () => amount * 60 * 1000)
    .exhaustive();
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function openCoversWithDelay(hass: TServiceParams["hass"], covers: PICK_ENTITY<"cover">[]) {
  for (const cover of covers) {
    await hass.call.cover.open_cover({ entity_id: cover });
    await wait({ amount: 1, unit: "s" });
  }
}

export async function closeCoversWithDelay(hass: TServiceParams["hass"], covers: PICK_ENTITY<"cover">[]) {
  for (const cover of covers) {
    await hass.call.cover.close_cover({ entity_id: cover });
    await wait({ amount: 1, unit: "s" });
  }
}
