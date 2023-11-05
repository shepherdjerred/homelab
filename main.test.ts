import { MyChart } from "./main.ts";
import { Testing } from "npm:cdk8s";

describe("Placeholder", () => {
  test("Empty", () => {
    const app = Testing.app();
    const chart = new MyChart(app, "test-chart");
    const results = Testing.synth(chart);
    expect(results).toMatchSnapshot();
  });
});
