import { connect } from "https://esm.sh/@dagger.io/dagger@0.8.7";

connect(async (client) => {
  const cache = client.cacheVolume("deno");

  const source = client
    .container()
    .from("denoland/deno")
    .withWorkdir("/workspace")
    .withDirectory(".", client.host().directory("."), {
      include: ["src", "deno*"],
    })
    .withMountedCache("~/.cache/deno", cache);

  const runner = source
    .withExec(["deno", "run", "--allow-write", "--allow-env", "src/main.ts"])
    .directory("dist");

  await runner.export("./dist");
});
