import { ErrorSchema } from "./schemas.js";

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Sanitize property names for TypeScript interfaces
 * Handles special characters, reserved keywords, and invalid syntax
 */
export function sanitizePropertyName(key: string): string {
  // TypeScript reserved keywords that need quoting
  const reservedKeywords = new Set([
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "enum",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "null",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
  ]);

  // Check if key needs quoting
  const needsQuoting =
    reservedKeywords.has(key) ||
    /[^a-zA-Z0-9_$]/.test(key) || // Contains special characters
    /^\d/.test(key); // Starts with digit

  return needsQuoting ? `"${key}"` : key;
}

/**
 * Sanitize type names by removing invalid characters and normalizing
 */
export function sanitizeTypeName(key: string): string {
  return (
    key
      .replace(/[^a-zA-Z0-9]/g, "") // Remove all special characters
      .replace(/^\d+/, "") || // Remove leading digits
    "Property"
  ); // Fallback if empty
}

/**
 * Run a command and return its output using Bun
 */
export async function runCommand(command: string, args: string[]): Promise<string> {
  try {
    const proc = Bun.spawn([command, ...args], {
      stdout: "pipe",
      stderr: "inherit",
    });

    const output = await new Response(proc.stdout).text();
    const exitCode = await proc.exited;

    if (exitCode === 0) {
      return output;
    } else {
      throw new Error(`Command "${command} ${args.join(" ")}" failed with code ${exitCode.toString()}`);
    }
  } catch (error) {
    const parseResult = ErrorSchema.safeParse(error);
    const errorMessage = parseResult.success ? parseResult.data.message : String(error);
    throw new Error(`Failed to spawn command "${command} ${args.join(" ")}": ${errorMessage}`);
  }
}
