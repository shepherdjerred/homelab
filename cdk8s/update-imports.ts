#!/usr/bin/env -S deno run --allow-run --allow-read --allow-write

// delete the imports directory
await Deno.remove("imports", { recursive: true });

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

// replace the npm import with the deno import
for await (const file of files) {
  if (file.isFile) {
    const filePath = `imports/${file.name}`;
    let content = await Deno.readTextFile(filePath);
    content = content.replaceAll(
      "from 'cdk8s'",
      "from 'https://esm.sh/cdk8s@2.68.58'",
    );
    content = content.replaceAll(
      "from 'constructs'",
      "from 'https://esm.sh/constructs@10.3.0'",
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
