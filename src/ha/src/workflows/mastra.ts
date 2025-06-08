import { anthropic } from "@ai-sdk/anthropic";
import { Agent } from "@mastra/core/agent";
import { Mastra } from "@mastra/core";
import { LibSQLStore } from "@mastra/libsql";
import { PinoLogger } from "@mastra/loggers";
import { MCPClient } from "@mastra/mcp";
import type { ENTITY_STATE } from "@digital-alchemy/hass";
import type { TServiceParams } from "@digital-alchemy/core";

export const mcp = new MCPClient({
  servers: {
    homeassistant: {
      command: "mcp-proxy",
      env: {
        SSE_URL: "https://homeassistant.tailnet-1a49.ts.net/mcp_server/sse",
        API_ACCESS_TOKEN: "",
      },
    },
  },
});

export const homeChangeAgent = new Agent({
  name: "Home Change Agent",
  instructions: `You are a vigilant home monitoring assistant. Your primary responsibility is to keep the user informed about any important changes, events, or anomalies within their home environment.

When you detect or are notified of a significant change (such as device status updates, security alerts, unusual activity, or system warnings), promptly generate a clear and concise notification for the user. Always prioritize information that may impact the user's comfort, safety, or home automation routines.`,
  model: anthropic("claude-4-sonnet"),
  tools: await mcp.getTools(),
});

export const mastra = new Mastra({
  agents: { homeChangeAgent },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
});

export function mastraWorkflow({ hass, logger }: TServiceParams) {
  const personJerred = hass.refBy.id("person.jerred");

  personJerred.onUpdate(
    async (
      newState: ENTITY_STATE<"person.jerred"> | undefined,
      oldState: ENTITY_STATE<"person.jerred"> | undefined,
    ) => {
      const response = await homeChangeAgent.generate([
        {
          id: "home_change",
          role: "data",
          content: JSON.stringify({
            oldState,
            newState,
          }),
        },
        {
          id: "action",
          role: "system",
          content: "Send a notification to Jerred's iPhone if Jerred is home.",
        },
      ]);
      logger.info(response);
    },
  );
}
