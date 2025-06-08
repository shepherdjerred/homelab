#!/usr/bin/env -S deno run --allow-read=imports --allow-write=imports --allow-run=cdk8s,kubectl,bash,deno

// delete the imports directory, allow failure
try {
  await Deno.remove("imports", { recursive: true });
} catch (error) {
  console.error("Failed to delete imports directory:", error);
}

// run "cdk8s import k8s --language=typescript"
let command = new Deno.Command("cdk8s", {
  args: ["import", "k8s", "--language=typescript"],
});
console.log(new TextDecoder().decode((await command.output()).stdout));

// run "kubectl get crds -o json | cdk8s import /dev/stdin --language=typescript"
command = new Deno.Command("bash", {
  args: [
    "-c",
    "kubectl get crds -o json | cdk8s import /dev/stdin --language=typescript",
  ],
});
console.log(new TextDecoder().decode((await command.output()).stdout));

const files = Deno.readDir("imports");

// add "// deno-lint-ignore-file" to the top of each file in the imports directory
for await (const file of files) {
  if (file.isFile) {
    const filePath = `imports/${file.name}`;
    const content = await Deno.readTextFile(filePath);
    await Deno.writeTextFile(
      filePath,
      `// deno-lint-ignore-file\n${content}`,
    );
  }
}

// look for "public toJson(): any {", change this to "public override toJson(): any {"
// fixes This member must have an 'override' modifier because it overrides a member in the base class 'ApiObject'.
for await (const file of files) {
  if (file.isFile) {
    const filePath = `imports/${file.name}`;
    let content = await Deno.readTextFile(filePath);
    content = content.replaceAll(
      "public toJson(): any {",
      "public override toJson(): any {",
    );
    await Deno.writeTextFile(
      filePath,
      content,
    );
  }
}

// run deno fmt
command = new Deno.Command("deno", {
  args: ["fmt", "imports"],
});
console.log(new TextDecoder().decode((await command.output()).stdout));
