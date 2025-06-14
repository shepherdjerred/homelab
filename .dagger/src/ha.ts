import { object, func, argument, Directory } from "@dagger.io/dagger";
import { getBaseContainer } from "./base";

@object()
export class HA {
  /**
   * Builds the Home Assistant (HA) project using Bun.
   * @param source The source directory to use for the build context.
   * @returns The built HA directory.
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
      defaultPath: ".",
    })
    source: Directory
  ): Promise<Directory> {
    return getBaseContainer(source, "/workspace/src/ha")
      .withExec(["bun", "run", "build"])
      .directory("/workspace/src/ha");
  }

  /**
   * Runs tests for the Home Assistant (HA) project using Bun.
   * @param source The source directory to use for the test context.
   * @returns The stdout from the test run.
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
      defaultPath: ".",
    })
    source: Directory
  ): Promise<string> {
    return getBaseContainer(source, "/workspace/src/ha")
      .withExec(["bun", "test"])
      .stdout();
  }

  /**
   * Performs a TypeScript type check on the Home Assistant (HA) project.
   * @param source The source directory to use for the type check context.
   * @returns The stdout from the type check run.
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
      defaultPath: ".",
    })
    source: Directory
  ): Promise<string> {
    return getBaseContainer(source, "/workspace/src/ha")
      .withExec(["bunx", "tsc", "--noEmit"])
      .stdout();
  }

  /**
   * Lints the Home Assistant (HA) project using Bun.
   * @param source The source directory to use for the lint context.
   * @returns The stdout from the lint run.
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
      defaultPath: ".",
    })
    source: Directory
  ): Promise<string> {
    return getBaseContainer(source, "/workspace/src/ha")
      .withExec(["bun", "run", "lint"])
      .stdout();
  }
}
