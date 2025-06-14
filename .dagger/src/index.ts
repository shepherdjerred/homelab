import { func, argument, Directory, object, Secret } from "@dagger.io/dagger";
import { HA } from "./ha";
import { CDK8s } from "./cdk8s";
import { Precommit } from "./precommit";
import { ArgoCD } from "./argocd";
import { dag } from "@dagger.io/dagger";

@object()
export class Homelab {
  private ha: HA;
  private cdk8s: CDK8s;
  private precommit: Precommit;
  private argocd: ArgoCD;

  constructor() {
    this.ha = new HA();
    this.cdk8s = new CDK8s();
    this.precommit = new Precommit();
    this.argocd = new ArgoCD();
  }

  /**
   * Runs type check, test, and lint for HA, and type check for CDK8s in parallel.
   * @param source The source directory to use for all checks.
   * @returns A summary string of the results for each check.
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
      defaultPath: ".",
    })
    source: Directory
  ): Promise<string> {
    const haTypeCheck = this.ha.typeCheckHa(source);
    const haTest = this.ha.testHa(source);
    const haLint = this.ha.lintHa(source);
    const cdk8sTypeCheck = this.cdk8s.typeCheckCdk8s(source);
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

  /**
   * Runs pre-commit, kube-linter, and ArgoCD sync as part of the CI pipeline.
   * @param source The source directory for pre-commit and kube-linter.
   * @param argocdToken The ArgoCD API token for authentication (as a Dagger Secret).
   * @param targetArch The target architecture for kube-linter (default: "amd64").
   * @param kubeLinterVersion The version of kube-linter to use (default: "v0.6.8").
   * @returns A summary string of the results for each CI step.
   */
  @func()
  async ci(
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
    source: Directory,
    argocdToken: Secret,
    targetArch: string = "amd64",
    kubeLinterVersion: string = "v0.6.8"
  ): Promise<string> {
    const preCommitResult = await this.precommit.preCommit(source);
    const syncResult = await this.argocd.sync(argocdToken);
    return [
      "Pre-commit result:\n" + preCommitResult,
      "Sync result:\n" + syncResult,
    ].join("\n\n");
  }
}
