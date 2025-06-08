import {
  dag,
  Container,
  Directory,
  object,
  func,
  argument,
} from "@dagger.io/dagger";

/**
 * NOTE: Dagger functions use ignore patterns to exclude build artifacts and dependencies
 * Example: dagger call build-ha --source=.
 */
@object()
export class HelloDagger {
  // Common ignore patterns for all functions

  /**
   * Creates a base container with common dependencies
   */
  private getBaseContainer(source: Directory, workdir: string): Container {
    return dag
      .container()
      .from("oven/bun:latest")
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "python3", "build-essential"])
      .withMountedDirectory("/workspace", source)
      .withWorkdir(workdir)
      .withExec(["bun", "install"]);
  }
  /**
   * Builds the HA TypeScript application using Bun
   */
  @func()
  async buildHa(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
    })
    source: Directory
  ): Promise<Directory> {
    return this.getBaseContainer(source, "/workspace/src/ha")
      .withExec(["bun", "run", "build"])
      .directory("/workspace/src/ha");
  }

  /**
   * Runs tests for the HA TypeScript application using Bun
   */
  @func()
  async testHa(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
    })
    source: Directory
  ): Promise<string> {
    return this.getBaseContainer(source, "/workspace/src/ha")
      .withExec(["bun", "test"])
      .stdout();
  }

  /**
   * Type checks the HA TypeScript application
   */
  @func()
  async typeCheckHa(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
    })
    source: Directory
  ): Promise<string> {
    return this.getBaseContainer(source, "/workspace/src/ha")
      .withExec(["bunx", "tsc", "--noEmit"])
      .stdout();
  }

  /**
   * Builds the CDK8s application using Bun
   */
  @func()
  async buildCdk8s(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
    })
    source: Directory
  ): Promise<Directory> {
    return this.getBaseContainer(source, "/workspace/src/cdk8s")
      .withExec(["bun", "run", "build"])
      .directory("/workspace/src/cdk8s");
  }

  /**
   * Type checks the CDK8s application using Bun
   */
  @func()
  async typeCheckCdk8s(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
    })
    source: Directory
  ): Promise<string> {
    return this.getBaseContainer(source, "/workspace/src/cdk8s")
      .withExec(["bunx", "tsc", "--noEmit"])
      .stdout();
  }

  /**
   * Lints the HA project
   */
  @func()
  async lintHa(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
    })
    source: Directory
  ): Promise<string> {
    return this.getBaseContainer(source, "/workspace/src/ha")
      .withExec(["bun", "run", "lint"])
      .stdout();
  }

  /**
   * Runs all checks for the workspace
   */
  @func()
  async checkAll(
    @argument({
      ignore: [
        "node_modules",
        "dist",
        "build",
        ".cache",
        "*.log",
        ".env*",
        "!.env.example",
      ],
    })
    source: Directory
  ): Promise<string> {
    // Run HA checks
    const haTypeCheck = this.typeCheckHa(source);
    const haTest = this.testHa(source);
    const haLint = this.lintHa(source);

    // Run CDK8s checks
    const cdk8sTypeCheck = this.typeCheckCdk8s(source);

    // Wait for all to complete and return summary
    const results = await Promise.allSettled([
      haTypeCheck,
      haTest,
      haLint,
      cdk8sTypeCheck,
    ]);

    const summary = results
      .map((result, index) => {
        const names = ["HA TypeCheck", "HA Test", "HA Lint", "CDK8s TypeCheck"];
        return `${names[index]}: ${result.status === "fulfilled" ? "PASSED" : "FAILED"}`;
      })
      .join("\n");

    return `Pipeline Results:\n${summary}`;
  }
}
