import type { TServiceParams } from "@digital-alchemy/core";
import type { ByIdProxy, PICK_ENTITY } from "@digital-alchemy/hass";
import { match } from "ts-pattern";

export type Time = {
  amount: number;
  unit?: "ms" | "s" | "m";
};

export function wait({ amount, unit = "ms" }: Time) {
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

export function isErrorState(state: ByIdProxy<"vacuum.roomba">["state"]) {
  return match(state)
    .with("error", () => true)
    .with("docked", () => false)
    .with("charging", () => false)
    .with("paused", () => false)
    .with("returning", () => false)
    .with("cleaning", () => false)
    .with("idle", () => false)
    .with("unavailable", () => false)
    .exhaustive();
}

export function shouldStartCleaning(state: ByIdProxy<"vacuum.roomba">["state"]) {
  return match(state)
    .with("error", () => false)
    .with("docked", () => true)
    .with("charging", () => true)
    .with("paused", () => true)
    .with("returning", () => true)
    .with("cleaning", () => false)
    .with("idle", () => true)
    .with("unavailable", () => false)
    .exhaustive();
}

export function shouldStopCleaning(state: ByIdProxy<"vacuum.roomba">["state"]) {
  return match(state)
    .with("error", () => false)
    .with("docked", () => false)
    .with("charging", () => false)
    .with("paused", () => true)
    .with("returning", () => false)
    .with("cleaning", () => true)
    .with("idle", () => true)
    .with("unavailable", () => false)
    .exhaustive();
}

export function runIf(condition: boolean, promiseFactory: () => Promise<unknown>): Promise<unknown> {
  if (condition) {
    return promiseFactory();
  }
  return Promise.resolve();
}

export function runParallel(promiseFactories: (() => Promise<unknown>)[]): Promise<unknown> {
  return Promise.all(promiseFactories.map((factory) => factory()));
}

export function runSequential(promiseFactories: (() => Promise<unknown>)[]): Promise<unknown> {
  let chain: Promise<unknown> = Promise.resolve();
  for (const factory of promiseFactories) {
    chain = chain.then(() => factory());
  }
  return chain;
}

export function runSequentialWithDelay(promiseFactories: (() => Promise<unknown>)[], delay: Time): Promise<unknown> {
  let chain: Promise<unknown> = Promise.resolve();
  for (const factory of promiseFactories) {
    chain = chain.then(() => factory()).then(() => wait(delay));
  }
  return chain;
}

export function repeat(promiseFactory: () => Promise<unknown>, times: number): (() => Promise<unknown>)[] {
  const factories: (() => Promise<unknown>)[] = [];
  for (let i = 0; i < times; i++) {
    factories.push(promiseFactory);
  }
  return factories;
}
