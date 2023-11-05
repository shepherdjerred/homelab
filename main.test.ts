import { MyChart } from "./main.ts";
import { Testing } from "npm:cdk8s";
import { assertSnapshot } from "https://deno.land/std@0.205.0/testing/snapshot.ts";

Deno.test("placeholder", async (t) => {
  const app = Testing.app();
  const chart = new MyChart(app, "test-chart", "label");
  const results = Testing.synth(chart);
  await assertSnapshot(t, results);
});
