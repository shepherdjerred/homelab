
import { dag, Container, Directory, object, func } from "@dagger.io/dagger"

/**
 * NOTE: Run dagger functions with the clean-source view to exclude build artifacts and dependencies
 * Example: dagger call build-ha --source=clean-source:.
 */
@object()
export class HelloDagger {
  /**
   * Builds the HA TypeScript application using Bun
   */
  @func()
  async buildHa(source: Directory): Promise<Directory> {
    return dag
      .container()
      .from("oven/bun:latest")
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "python3", "build-essential"])
      .withMountedDirectory("/workspace", source)
      .withWorkdir("/workspace/src/ha")
      .withExec(["bun", "install"])
      .withExec(["bun", "run", "build"])
      .directory("/workspace/src/ha")
  }

  /**
   * Runs tests for the HA TypeScript application using Bun
   */
  @func()
  async testHa(source: Directory): Promise<string> {
    return dag
      .container()
      .from("oven/bun:latest")
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "python3", "build-essential"])
      .withMountedDirectory("/workspace", source)
      .withWorkdir("/workspace/src/ha")
      .withExec(["bun", "install"])
      .withExec(["bun", "test"])
      .stdout()
  }

  /**
   * Type checks the HA TypeScript application
   */
  @func()
  async typeCheckHa(source: Directory): Promise<string> {
    return dag
      .container()
      .from("oven/bun:latest")
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "python3", "build-essential"])
      .withMountedDirectory("/workspace", source)
      .withWorkdir("/workspace/src/ha")
      .withExec(["bun", "install"])
      .withExec(["bunx", "tsc", "--noEmit"])
      .stdout()
  }

  /**
   * Builds the CDK8s application using Bun
   */
  @func()
  async buildCdk8s(source: Directory): Promise<Directory> {
    return dag
      .container()
      .from("oven/bun:latest")
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "python3", "build-essential"])
      .withMountedDirectory("/workspace", source)
      .withWorkdir("/workspace/src/cdk8s")
      .withExec(["bun", "install"])
      .withExec(["bun", "run", "build"])
      .directory("/workspace/src/cdk8s")
  }

  /**
   * Type checks the CDK8s application using Bun
   */
  @func()
  async typeCheckCdk8s(source: Directory): Promise<string> {
    return dag
      .container()
      .from("oven/bun:latest")
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "python3", "build-essential"])
      .withMountedDirectory("/workspace", source)
      .withWorkdir("/workspace/src/cdk8s")
      .withExec(["bun", "install"])
      .withExec(["bunx", "tsc", "--noEmit"])
      .stdout()
  }

  /**
   * Lints the HA project
   */
  @func()
  async lintHa(source: Directory): Promise<string> {
    return dag
      .container()
      .from("oven/bun:latest")
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "python3", "build-essential"])
      .withMountedDirectory("/workspace", source)
      .withWorkdir("/workspace/src/ha")
      .withExec(["bun", "install"])
      .withExec(["bun", "run", "lint"])
      .stdout()
  }

  /**
   * Runs all checks for the workspace
   */
  @func()
  async checkAll(source: Directory): Promise<string> {
    // Run HA checks
    const haTypeCheck = this.typeCheckHa(source)
    const haTest = this.testHa(source)
    const haLint = this.lintHa(source)

    // Run CDK8s checks
    const cdk8sTypeCheck = this.typeCheckCdk8s(source)

    // Wait for all to complete and return summary
    const results = await Promise.allSettled([
      haTypeCheck,
      haTest,
      haLint,
      cdk8sTypeCheck
    ])

    const summary = results.map((result, index) => {
      const names = ['HA TypeCheck', 'HA Test', 'HA Lint', 'CDK8s TypeCheck']
      return `${names[index]}: ${result.status === 'fulfilled' ? 'PASSED' : 'FAILED'}`
    }).join('\n')

    return `Pipeline Results:\n${summary}`
  }
}
