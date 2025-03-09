import { dag, Directory, func, object } from "@dagger.io/dagger";

@object()
class Homelab {
  @func()
  async build(source: Directory) {
    const build = await this.buildEnv(source)
      .withExec(["deno", "task", "build"]);
    build.directory("./dist")
      .export("./dist", {
        wipe: true,
      });
    return build;
  }

  /**
   * Build a ready-to-use development environment
   */
  @func()
  buildEnv(source: Directory) {
    return dag
      .container()
      // TODO: pin image
      .from("denoland/deno")
      .withDirectory("/workspace", source)
      .withWorkdir("/workspace");
  }
}
