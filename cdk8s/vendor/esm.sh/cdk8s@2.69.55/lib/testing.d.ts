import { App, AppProps } from './app.d.ts';
import { Chart } from './chart.d.ts';
/**
 * Testing utilities for cdk8s applications.
 */
export declare class Testing {
    /**
     * Returns an app for testing with the following properties:
     * - Output directory is a temp dir.
     */
    static app(props?: AppProps): App;
    /**
     * @returns a Chart that can be used for tests
     */
    static chart(): Chart;
    /**
     * Returns the Kubernetes manifest synthesized from this chart.
     */
    static synth(chart: Chart): any[];
    private constructor();
}
