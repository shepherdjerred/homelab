import { dag, Directory, func, object } from "@dagger.io/dagger";

@object()
// deno-lint-ignore no-unused-vars
class Homelab {
  @func()
  async build(source: Directory) {
    const build = await this.buildEnv(source)
      .withExec(["deno", "task", "build"]);
    return build.directory("./dist");
  }

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
