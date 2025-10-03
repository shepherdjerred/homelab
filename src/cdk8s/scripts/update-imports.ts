#!/usr/bin/env bun

import { rm } from "node:fs/promises";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";

// delete the imports directory, allow failure
try {
  await rm("imports", { recursive: true, force: true });
} catch (error) {
  console.error("Failed to delete imports directory:", error);
}

// run "cdk8s import k8s --language=typescript"
const runCommand = async (command: string, args: string[]) => {
  return new Promise<string>((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: ["inherit", "pipe", "inherit"],
    });
    let output = "";
    proc.stdout.on("data", (data: Buffer) => (output += data.toString()));
    proc.on("close", (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(`Command failed with code ${code?.toString() ?? "unknown"}`));
    });
  });
};

console.log(await runCommand("cdk8s", ["import", "k8s", "--language=typescript"]));

// run "kubectl get crds -o json | cdk8s import /dev/stdin --language=typescript"
console.log(
  await runCommand("bash", ["-c", "kubectl get crds -o json | cdk8s import /dev/stdin --language=typescript"]),
);

const files = await readdir("imports");

// add "// @ts-nocheck" to the top of each file in the imports directory
for (const file of files) {
  const filePath = `imports/${file}`;
  const content = await readFile(filePath, "utf-8");
  await writeFile(filePath, `// @ts-nocheck\n${content}`);
}

// look for "public toJson(): any {", change this to "public override toJson(): any {"
// fixes This member must have an 'override' modifier because it overrides a member in the base class 'ApiObject'.
for (const file of files) {
  const filePath = `imports/${file}`;
  let content = await readFile(filePath, "utf-8");
  content = content.replaceAll("public toJson(): any {", "public override toJson(): any {");
  await writeFile(filePath, content);
}

// run prettier
console.log(await runCommand("bunx", ["prettier", "--write", "imports"]));
