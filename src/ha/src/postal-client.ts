import { z } from "zod";

// Postal API request type for sending messages
type PostalSendMessage = {
  to: string[];
  cc?: string[];
  bcc?: string[];
  from: string;
  sender?: string;
  subject: string;
  tag?: string;
  reply_to?: string;
  plain_body?: string;
  html_body?: string;
  attachments?: {
    name: string;
    content_type: string;
    data: string; // Base64 encoded
  }[];
  headers?: Record<string, string>;
  bounce?: boolean;
};

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
    const recipientsParsed = z.array(z.string()).safeParse(params.to);
    const singleRecipientParsed = z.string().safeParse(params.to);
    const recipients = recipientsParsed.success
      ? recipientsParsed.data
      : singleRecipientParsed.success
        ? [singleRecipientParsed.data]
        : [];

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
      throw new Error(`Postal API error: ${parsed.data.error ?? "Unknown error"}`);
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
