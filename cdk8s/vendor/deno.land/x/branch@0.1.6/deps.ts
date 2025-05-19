// Copyright 2020-2021 the denosaurs team. All rights reserved. MIT license.

export * as log from "https://deno.land/std@0.97.0/log/mod.ts";

export type {
  GenericFunction,
  LogRecord,
} from "https://deno.land/std@0.97.0/log/logger.ts";

export type { LevelName } from "https://deno.land/std@0.97.0/log/levels.ts";

export { LogLevels } from "https://deno.land/std@0.97.0/log/levels.ts";

export { BaseHandler } from "https://deno.land/std@0.97.0/log/handlers.ts";

export {
  blue,
  bold,
  gray,
  green,
  italic,
  red,
  reset,
  setColorEnabled,
  yellow,
} from "https://deno.land/std@0.97.0/fmt/colors.ts";
