/**
 * DiscordSRV configuration helper for Minecraft servers.
 *
 * This creates a GitOps-friendly DiscordSRV setup using:
 * - ConfigMap with config.yml containing ${CFG_*} placeholders
 * - 1Password secret for bot token and channel IDs
 * - Environment variable substitution via itzg/minecraft-server
 *
 * Required 1Password fields:
 * - discord-bot-token: The Discord bot token
 * - discord-channel-id: The main chat channel ID
 * - discord-console-channel-id: (optional) Console channel ID
 * - discord-invite-link: (optional) Server invite link
 */

export const DISCORDSRV_PLUGIN_URL =
  "https://download.discordsrv.com/v2/DiscordSRV/DiscordSRV/release/download/latest/jar";

/**
 * Generates DiscordSRV config.yml with environment variable placeholders.
 * The itzg/minecraft-server container will substitute ${CFG_*} variables at startup.
 */
export function generateDiscordSrvConfig(options: { serverName: string }): string {
  return `# DiscordSRV Configuration
# This config uses environment variable placeholders that are substituted at container startup.
# See: https://docker-minecraft-server.readthedocs.io/en/latest/configuration/interpolating/

# Bot token from 1Password secret
BotToken: "\${CFG_DISCORD_BOT_TOKEN}"

# Channel mappings - format: {"in-game-channel": "discord-channel-id"}
# The first channel is the default for all messages
Channels: {"global": "\${CFG_DISCORD_CHANNEL_ID}"}

# Console channel for server logs and remote commands (set to empty string to disable)
DiscordConsoleChannelId: "\${CFG_DISCORD_CONSOLE_CHANNEL_ID}"

# Discord invite link shown to players via /discord command
DiscordInviteLink: "\${CFG_DISCORD_INVITE_LINK}"

# Enable bidirectional chat
DiscordChatChannelDiscordToMinecraft: true
DiscordChatChannelMinecraftToDiscord: true

# Bot status displayed in Discord
DiscordGameStatus: ["playing on ${options.serverName}"]
DiscordOnlineStatus: ONLINE

# Require linked accounts for Discord->Minecraft chat (set false for open servers)
DiscordChatChannelRequireLinkedAccount: false

# Show player count in bot status
StatusUpdateRateInMinutes: 2

# Join/leave messages
MinecraftPlayerJoinMessageEnabled: true
MinecraftPlayerLeaveMessageEnabled: true
MinecraftPlayerFirstJoinMessageEnabled: true

# Death messages
MinecraftPlayerDeathMessageEnabled: true

# Achievement messages
MinecraftPlayerAchievementMessagesEnabled: true

# Console channel settings
DiscordConsoleChannelLogRefreshRateInSeconds: 5
DiscordConsoleChannelUsageEnabled: true
DiscordConsoleChannelBlacklistActsAsWhitelist: false
DiscordConsoleChannelBlacklistedCommands: ["?", "op", "deop", "ban", "pardon", "ban-ip", "pardon-ip"]

# Experiment: use webhooks for chat messages (shows player heads as avatars)
Experiment_WebhookChatMessageDelivery: false

# Debug mode (disable in production)
Debug: false
DebugJDA: false
DebugJDARestActions: false
`;
}

/**
 * Returns the Kubernetes ConfigMap manifest for DiscordSRV config.
 */
export function getDiscordSrvConfigMapManifest(name: string, serverName: string): object {
  return {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: `${name}-discordsrv-config`,
    },
    data: {
      "config.yml": generateDiscordSrvConfig({ serverName }),
    },
  };
}

/**
 * Returns the extraVolumes configuration for mounting DiscordSRV config.
 */
export function getDiscordSrvExtraVolumes(name: string): object[] {
  return [
    {
      volumes: [
        {
          name: "discordsrv-config",
          configMap: {
            name: `${name}-discordsrv-config`,
          },
        },
      ],
      volumeMounts: [
        {
          name: "discordsrv-config",
          mountPath: "/data/plugins/DiscordSRV/config.yml",
          subPath: "config.yml",
        },
      ],
    },
  ];
}

/**
 * Returns extraEnv configuration to map 1Password secret keys to CFG_ prefixed env vars.
 * The itzg/minecraft-server container requires CFG_ prefix for variable substitution.
 *
 * 1Password field names -> Environment variables:
 * - discord-bot-token -> CFG_DISCORD_BOT_TOKEN
 * - discord-channel-id -> CFG_DISCORD_CHANNEL_ID
 * - discord-console-channel-id -> CFG_DISCORD_CONSOLE_CHANNEL_ID
 * - discord-invite-link -> CFG_DISCORD_INVITE_LINK
 */
export function getDiscordSrvExtraEnv(secretName: string): Record<string, object> {
  return {
    CFG_DISCORD_BOT_TOKEN: {
      valueFrom: {
        secretKeyRef: {
          name: secretName,
          key: "discord-bot-token",
        },
      },
    },
    CFG_DISCORD_CHANNEL_ID: {
      valueFrom: {
        secretKeyRef: {
          name: secretName,
          key: "discord-channel-id",
        },
      },
    },
    CFG_DISCORD_CONSOLE_CHANNEL_ID: {
      valueFrom: {
        secretKeyRef: {
          name: secretName,
          key: "discord-console-channel-id",
          optional: true,
        },
      },
    },
    CFG_DISCORD_INVITE_LINK: {
      valueFrom: {
        secretKeyRef: {
          name: secretName,
          key: "discord-invite-link",
          optional: true,
        },
      },
    },
  };
}
