import { z } from "zod";

// Postal API request schema for sending messages
const PostalSendMessageSchema = z.object({
  to: z.array(z.string()),
  cc: z.array(z.string()).optional(),
  bcc: z.array(z.string()).optional(),
  from: z.string(),
  sender: z.string().optional(),
  subject: z.string(),
  tag: z.string().optional(),
  reply_to: z.string().optional(),
  plain_body: z.string().optional(),
  html_body: z.string().optional(),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        content_type: z.string(),
        data: z.string(), // Base64 encoded
      }),
    )
    .optional(),
  headers: z.record(z.string(), z.string()).optional(),
  bounce: z.boolean().optional(),
});

type PostalSendMessage = z.infer<typeof PostalSendMessageSchema>;

// Postal API response schema
const PostalResponseSchema = z.object({
  status: z.enum(["success", "error"]),
  time: z.number().optional(),
  flags: z.record(z.string(), z.boolean()).optional(),
  data: z
    .object({
      message_id: z.string().optional(),
      messages: z
        .record(
          z.string(),
          z.object({
            id: z.number(),
            token: z.string(),
          }),
        )
        .optional(),
    })
    .optional(),
  error: z.string().optional(),
});

type PostalResponse = z.infer<typeof PostalResponseSchema>;

export type PostalClientConfig = {
  host: string; // e.g., "postal.tailnet-1a49.ts.net"
  apiKey: string; // Server API key from Postal web UI
  defaultFrom?: string;
};

export class PostalClient {
  private baseUrl: string;
  private apiKey: string;
  private defaultFrom: string;

  constructor(config: PostalClientConfig) {
    this.baseUrl = `https://${config.host}`;
    this.apiKey = config.apiKey;
    this.defaultFrom = config.defaultFrom ?? "updates@homelab.local";
  }

  async sendEmail(params: {
    to: string | string[];
    subject: string;
    htmlBody: string;
    plainBody?: string;
    from?: string;
    tag?: string;
  }): Promise<PostalResponse> {
    const recipients = Array.isArray(params.to) ? params.to : [params.to];

    const payload: PostalSendMessage = {
      to: recipients,
      from: params.from ?? this.defaultFrom,
      subject: params.subject,
      html_body: params.htmlBody,
      plain_body: params.plainBody,
      tag: params.tag,
    };

    const response = await fetch(`${this.baseUrl}/api/v1/send/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Server-API-Key": this.apiKey,
      },
      body: JSON.stringify(payload),
    });

    const result: unknown = await response.json();
    const parsed = PostalResponseSchema.safeParse(result);

    if (!parsed.success) {
      throw new Error(`Invalid Postal response: ${JSON.stringify(result)}`);
    }

    if (parsed.data.status === "error") {
      throw new Error(`Postal API error: ${parsed.data.error}`);
    }

    return parsed.data;
  }
}

/**
 * Create a PostalClient from environment variables
 */
export function createPostalClientFromEnv(): PostalClient {
  const host = Bun.env["POSTAL_HOST"];
  const apiKey = Bun.env["POSTAL_API_KEY"];

  if (!host) {
    throw new Error("POSTAL_HOST environment variable not set");
  }
  if (!apiKey) {
    throw new Error("POSTAL_API_KEY environment variable not set");
  }

  return new PostalClient({
    host,
    apiKey,
    defaultFrom: Bun.env["SENDER_EMAIL"],
  });
}
