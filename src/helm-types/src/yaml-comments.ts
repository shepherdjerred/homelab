import { parseDocument } from "yaml";
import { z } from "zod";

/**
 * Clean up YAML comment text for use in JSDoc
 * Removes Helm-specific markers and filters out code examples and section headers
 */
export function cleanYAMLComment(comment: string): string {
  if (!comment) return "";

  const lines = comment.split("\n").map((line) => {
    // The yaml parser already strips the leading #, but sometimes comments can have # internally
    // or multiple ## that leave residue. Clean them up.
    line = line.trim(); // First trim whitespace
    line = line.replace(/^#+\s*/, ""); // Remove any leading # symbols
    line = line.replace(/^--\s*/, ""); // Remove Helm's -- marker
    return line.trim();
  });

  // Filter out code examples and section headers, keep documentation
  const cleaned: string[] = [];
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";

    // Empty lines end code blocks
    if (!line) {
      if (inCodeBlock) inCodeBlock = false;
      continue;
    }

    // Skip @default lines (we'll generate our own)
    if (line.startsWith("@default")) continue;

    // Detect section headers (short descriptive lines followed by YAML config)
    const nextLine = lines[i + 1];
    const isFollowedByYAMLKey =
      nextLine && (/^[\w.-]+:\s*\|/.test(nextLine) || /^[\w.-]+:\s*$/.test(nextLine) || /^[\w.-]+:\s+/.test(nextLine));

    const wordCount = line.split(/\s+/).length;
    const hasConfigKeywords = /\b(configuration|config|example|setup|settings?|options?|alternative)\b/i.test(line);
    const endsWithPunctuation = /[.!?]$/.test(line);
    const hasURL = line.includes("http://") || line.includes("https://");
    const startsWithArticle = /^(This|The|A|An)\s/i.test(line);
    const startsWithCommonWord = /^(This|The|A|An|It|For|To|If|When|You|We|Use|Configure)\s/i.test(line);

    // Section headers are typically:
    // 1. Very short (2 words only) AND followed by YAML AND not starting with action words
    // 2. OR have config keywords AND followed by YAML AND are not proper sentences
    // Proper sentences start with common words or end with punctuation
    const isSectionHeader =
      isFollowedByYAMLKey &&
      ((wordCount === 2 && !startsWithCommonWord) || (hasConfigKeywords && !startsWithCommonWord)) &&
      !endsWithPunctuation &&
      !hasURL &&
      !/^ref:/i.test(line) &&
      !startsWithArticle;

    if (isSectionHeader) {
      continue;
    }

    // Detect code examples/YAML blocks - but be more selective
    const looksLikeYAMLKey = /^[\w.-]+:\s*(\||$)/.test(line); // key: | or key:
    const looksLikeSimpleYAMLValue = /^[\w.-]+:\s+[^:]+$/.test(line) && !hasURL && !/^ref:/i.test(line);
    const looksLikeYAMLList = line.startsWith("-") && (line.includes(":") || /^-\s+\|/.test(line));
    const looksLikePolicyRule = /^[pg],\s*/.test(line);
    const hasIndentation = /^\s{2,}/.test(line);
    const looksLikeCommand = /^echo\s+/.test(line) || line.includes("$ARGOCD_") || line.includes("$KUBE_");
    const isSeparator =
      /^-{3,}/.test(line) || /^BEGIN .*(KEY|CERTIFICATE)/.test(line) || /^END .*(KEY|CERTIFICATE)/.test(line);

    const isCodeExample =
      isSeparator ||
      looksLikeYAMLKey ||
      (looksLikeSimpleYAMLValue && wordCount <= 4) ||
      looksLikeYAMLList ||
      looksLikePolicyRule ||
      hasIndentation ||
      looksLikeCommand ||
      line.startsWith("|");

    if (isCodeExample) {
      inCodeBlock = true;
      continue;
    }

    // Resume prose when we hit a proper sentence
    if (inCodeBlock) {
      const startsWithCapital = /^[A-Z]/.test(line);
      const hasEndPunctuation = /[.!?:]$/.test(line); // Include colon for "Policy rules are in the form:" style lines
      const notYamlKey = !(/^[\w.-]+:\s*(\||$)/.test(line) && !hasURL && !/^ref:/i.test(line));
      const reasonableLength = line.length > 10;
      const hasMultipleWords = wordCount >= 3;

      const looksLikeProse =
        startsWithCapital &&
        (hasEndPunctuation || hasURL || startsWithArticle || hasMultipleWords) &&
        notYamlKey &&
        reasonableLength;

      if (looksLikeProse) {
        inCodeBlock = false;
      } else {
        continue;
      }
    }

    cleaned.push(line);
  }

  return cleaned.join("\n").trim();
}

/**
 * Filter out commented-out YAML blocks from the START of a comment string
 * The YAML AST gives us ALL comments, including commented-out config sections
 * We only remove these if they appear BEFORE the real documentation starts
 */
function filterCommentedOutYAML(comment: string): string {
  const lines = comment.split("\n");
  let startIndex = 0;
  let inCommentedBlock = false;
  let hasSeenRealDoc = false;

  // First pass: find where real documentation starts
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    const trimmed = line.trim();

    if (trimmed === "") {
      // Blank line could be end of commented block
      if (inCommentedBlock) {
        inCommentedBlock = false;
      }
      continue;
    }

    // Check if this looks like a commented-out YAML key
    const looksLikeYAMLKey = /^[\w.-]+:\s*(\||$)/.test(trimmed);

    if (looksLikeYAMLKey && !hasSeenRealDoc) {
      // This starts a commented-out YAML block (only matters if we haven't seen real doc yet)
      inCommentedBlock = true;
      continue;
    }

    // If we're in a commented block, check if this line is part of it
    if (inCommentedBlock) {
      // Lines starting with indentation or "-" or "#" are part of the YAML block
      if (line.startsWith(" ") || line.startsWith("\t") || trimmed.startsWith("-") || trimmed.startsWith("#")) {
        continue;
      } else {
        // This line doesn't look like YAML content, we're out of the block
        inCommentedBlock = false;
        hasSeenRealDoc = true;
        startIndex = i;
      }
    } else if (!hasSeenRealDoc) {
      // Check if this is a section header (a text line followed by a YAML key)
      const nextLine = lines[i + 1];
      const nextTrimmed = nextLine?.trim() ?? "";
      const nextIsYAMLKey = /^[\w.-]+:\s*(\||$)/.test(nextTrimmed);

      if (nextIsYAMLKey) {
        // This is a section header for a commented-out block, skip it
        continue;
      }

      // Check if this line starts with "--" (Helm values marker) or starts with "#" (double-commented)
      if (trimmed.startsWith("--") || trimmed.startsWith("#")) {
        // This is likely part of real documentation
        hasSeenRealDoc = true;
        startIndex = i;
      } else {
        // First real prose line
        hasSeenRealDoc = true;
        startIndex = i;
      }
    }
  }

  // Return everything from where real documentation starts
  return lines
    .slice(startIndex)
    .map((l) => l.trim())
    .join("\n");
}

/**
 * Regex-based fallback parser for comments that the YAML AST loses
 * This handles cases with commented-out YAML keys and inconsistent indentation
 */
function parseCommentsWithRegex(yamlContent: string): Map<string, string> {
  const comments = new Map<string, string>();
  const lines = yamlContent.split("\n");
  let pendingComment: string[] = [];
  let pendingCommentIndent = -1;

  lines.forEach((line) => {
    const trimmed = line.trim();

    // Skip empty lines but keep pending comment
    if (!trimmed) {
      return;
    }

    // Check if this is a comment line
    if (trimmed.startsWith("#")) {
      // Extract comment text (handle multiple # characters)
      let commentText = trimmed;
      while (commentText.startsWith("#")) {
        commentText = commentText.substring(1);
      }
      commentText = commentText.trim();

      // Skip commented-out YAML keys (these are not documentation)
      // Match patterns like "key: value" or "key:" but NOT prose-like text
      const looksLikeYAMLKey = /^[\w.-]+:\s*(\||$|[\w.-]+$|\[|\{)/.test(commentText);

      if (!looksLikeYAMLKey) {
        const commentIndent = line.search(/\S/);

        // If this comment is at a different indent level than our pending comments, reset
        if (pendingComment.length > 0 && pendingCommentIndent !== -1 && commentIndent !== pendingCommentIndent) {
          // Only keep comments if they're at a similar or greater indent
          if (commentIndent < pendingCommentIndent) {
            pendingComment = [];
          }
        }

        pendingComment.push(commentText);
        pendingCommentIndent = commentIndent;
      } else {
        // This is a commented-out YAML key, which means the pending comments
        // were describing this commented-out section, not a future real key
        // So we should discard them
        pendingComment = [];
        pendingCommentIndent = -1;
      }
      return;
    }

    // Check if this is a YAML key line
    const keyMatchRegex = /^([\w.-]+):\s/;
    const keyMatch = keyMatchRegex.exec(trimmed);
    if (keyMatch && pendingComment.length > 0) {
      const key = keyMatch[1];
      if (key) {
        const keyIndent = line.search(/\S/);

        // Only associate comment if indentation matches closely
        // Allow 2 space difference (for comment being indented slightly different)
        if (pendingCommentIndent === -1 || Math.abs(keyIndent - pendingCommentIndent) <= 2) {
          const commentText = pendingComment.join("\n");
          comments.set(key, commentText);
        }

        // Reset for next key
        pendingComment = [];
        pendingCommentIndent = -1;
      }
    } else if (!trimmed.startsWith("#")) {
      // Non-comment, non-key line - reset pending comment
      pendingComment = [];
      pendingCommentIndent = -1;
    }
  });

  return comments;
}

/**
 * Parse YAML comments and associate them with keys using proper YAML AST parsing
 * This is much more robust than regex-based parsing
 * Exported for testing purposes
 */
export function parseYAMLComments(yamlContent: string): Map<string, string> {
  const comments = new Map<string, string>();

  try {
    const doc = parseDocument(yamlContent);

    // Build a regex-based fallback map for cases where YAML parser loses comments
    const regexComments = parseCommentsWithRegex(yamlContent);

    // Recursively walk the YAML AST and extract comments
    function visitNode(node: unknown, keyPath: string[] = [], inheritedComment = ""): void {
      if (!node) return;

      // Handle map/object nodes - check if node has items array
      const mapNodeCheck = z
        .object({ items: z.array(z.unknown()), commentBefore: z.unknown().optional() })
        .safeParse(node);
      if (mapNodeCheck.success) {
        // Extract the map's own comment (to be inherited by first child if needed)
        let mapComment = inheritedComment;
        const mapCommentCheck = z.string().safeParse(mapNodeCheck.data.commentBefore);
        if (mapCommentCheck.success) {
          mapComment = mapCommentCheck.data;
        }

        for (let i = 0; i < mapNodeCheck.data.items.length; i++) {
          const item = mapNodeCheck.data.items[i];
          const itemCheck = z.object({ key: z.unknown(), value: z.unknown() }).safeParse(item);
          if (!itemCheck.success) continue;

          // Get the key - validate it has a value property that's a string
          const keyNodeCheck = z.object({ value: z.string() }).safeParse(itemCheck.data.key);
          if (!keyNodeCheck.success) continue;

          const key = keyNodeCheck.data.value;
          const newPath = [...keyPath, key];
          const fullKey = newPath.join(".");

          // Extract comment from the key's commentBefore
          let comment = "";
          const keyCommentCheck = z.object({ commentBefore: z.unknown() }).safeParse(itemCheck.data.key);
          if (keyCommentCheck.success) {
            const commentCheck = z.string().safeParse(keyCommentCheck.data.commentBefore);
            comment = commentCheck.success ? commentCheck.data : "";
          }

          // Also check the pair itself for comments
          const pairCommentCheck = z.object({ commentBefore: z.unknown() }).safeParse(item);
          if (pairCommentCheck.success) {
            const pairCommentValue = z.string().safeParse(pairCommentCheck.data.commentBefore);
            const pairComment = pairCommentValue.success ? pairCommentValue.data : "";
            if (pairComment) {
              comment = comment ? `${pairComment}\n${comment}` : pairComment;
            }
          }

          // Check for inline comments on the value
          const valueCommentCheck = z.object({ comment: z.unknown() }).safeParse(itemCheck.data.value);
          if (valueCommentCheck.success) {
            const inlineComment = z.string().safeParse(valueCommentCheck.data.comment);
            if (inlineComment.success && inlineComment.data) {
              comment = comment ? `${comment}\n${inlineComment.data}` : inlineComment.data;
            }
          }

          // If this is the first item and has no comment, inherit from map
          if (i === 0 && !comment && mapComment) {
            comment = mapComment;
          }

          // Filter out commented-out YAML blocks before cleaning
          if (comment) {
            comment = filterCommentedOutYAML(comment);
          }

          // Clean and store the comment
          if (comment) {
            const cleaned = cleanYAMLComment(comment);
            if (cleaned) {
              comments.set(fullKey, cleaned);
            }
          }

          // Check if the value has a commentBefore (for nested structures)
          let valueInheritedComment = "";
          const valueCommentBeforeCheck = z.object({ commentBefore: z.unknown() }).safeParse(itemCheck.data.value);
          if (valueCommentBeforeCheck.success) {
            const valueCommentBefore = z.string().safeParse(valueCommentBeforeCheck.data.commentBefore);
            if (valueCommentBefore.success) {
              valueInheritedComment = valueCommentBefore.data;
            }
          }

          // Recurse into nested structures
          if (itemCheck.data.value) {
            visitNode(itemCheck.data.value, newPath, valueInheritedComment);
          }
        }
      }
    }

    // Start with the document contents
    if (doc.contents) {
      visitNode(doc.contents, []);
    }

    // Merge regex comments as fallback - only use them if AST parsing didn't find a comment
    // This handles cases where YAML parser loses comments due to:
    // - Inconsistent indentation
    // - Commented-out YAML keys mixed with documentation
    // - Other edge cases
    for (const [key, rawComment] of regexComments.entries()) {
      if (!comments.has(key)) {
        const cleaned = cleanYAMLComment(rawComment);
        if (cleaned) {
          comments.set(key, cleaned);
        }
      }
    }
  } catch (error) {
    // If YAML parsing fails, fall back to empty map
    console.warn("Failed to parse YAML comments:", error);
  }

  return comments;
}
