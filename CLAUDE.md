# CLAUDE.md

This is a Kubernetes homelab infrastructure monorepo using CDK8s for infrastructure-as-code.

## Tech Stack

- **Runtime**: Bun (not Node.js)
- **Language**: TypeScript (strict mode)
- **Infrastructure**: CDK8s for Kubernetes manifests
- **CI/CD**: Dagger (TypeScript SDK) + GitHub Actions

## Workspaces

- `src/cdk8s` - Kubernetes infrastructure as code
- `src/ha` - Home Assistant automations
- `src/helm-types` - Type-safe Helm chart parameter generator
- `.dagger` - CI/CD pipeline module

## Commands

```bash
# Install dependencies
bun install

# Build all workspaces
mise run build

# Run tests
bun test

# Lint
bun run lint

# Type check
bun run typecheck

# Format
bun run prettier
```

## Code Style

### Linting (ESLint v9 flat config)

- Config: `eslint.config.ts`
- Strict TypeScript rules enabled
- File names must be kebab-case
- Zod schemas must follow naming conventions

### Formatting (Prettier)

- Print width: 120 characters
- Runs on all files via lint-staged

### TypeScript

- Strict mode enabled
- Target: ESNext
- Module resolution: bundler
- No unused parameters/locals allowed

## Conventions

### Prefer Bun APIs over Node.js

```typescript
// ✅ Good
Bun.file("path");
Bun.spawn(["cmd"]);
Bun.env.VAR;

// ❌ Avoid
fs.readFileSync("path");
child_process.spawn("cmd");
process.env.VAR;
```

### Use Zod for validation

```typescript
// ✅ Good
const UserSchema = z.object({ name: z.string() });
UserSchema.parse(data);

// ❌ Avoid
typeof data === "object";
data instanceof User;
```

### No type assertions (except `as unknown` or `as const`)

```typescript
// ✅ Good
const items = [] as const;
const unknown = value as unknown;

// ❌ Avoid
const user = data as User;
```

### Naming conventions

- Files: `kebab-case.ts`
- Types/Interfaces: `PascalCase`
- Variables/Functions: `camelCase`
- Constants: `UPPER_CASE` or `camelCase`

## Git Workflow

- Conventional commits enforced via commitlint
- Pre-commit: lint-staged runs prettier, eslint, typecheck
- Husky manages git hooks

## Version Management

Uses `mise` (formerly rtx) for tool versions:

```bash
mise trust    # Trust the mise.toml config
mise run dev  # Install dependencies and setup
```
