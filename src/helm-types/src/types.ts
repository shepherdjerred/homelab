export type ChartInfo = {
  name: string;
  repoUrl: string;
  version: string;
  chartName: string; // The actual chart name (may differ from versions.ts key)
};

export type JSONSchemaProperty = {
  type?: string | string[];
  enum?: unknown[];
  oneOf?: JSONSchemaProperty[];
  anyOf?: JSONSchemaProperty[];
  items?: JSONSchemaProperty;
  properties?: Record<string, JSONSchemaProperty>;
  required?: string[];
  description?: string;
  default?: unknown;
};

export type TypeScriptInterface = {
  name: string;
  properties: Record<string, TypeProperty>;
};

export type TypeProperty = {
  type: string;
  optional: boolean;
  description?: string;
  default?: unknown;
  nested?: TypeScriptInterface;
};
