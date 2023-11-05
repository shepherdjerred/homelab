import { App, Chart, ChartProps } from "npm:cdk8s";
import { Construct } from "npm:constructs";

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    // define resources here
  }
}

const app = new App();
new MyChart(app, "inner");
app.synth();
