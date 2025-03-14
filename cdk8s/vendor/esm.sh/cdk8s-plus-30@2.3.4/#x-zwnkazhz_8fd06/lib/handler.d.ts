import * as container from './container.d.ts';
import * as k8s from './imports/k8s.d.ts';
/**
 * Options for `Handler.fromTcpSocket`.
 */
export interface HandlerFromTcpSocketOptions {
    /**
     * The TCP port to connect to on the container.
     *
     * @default - defaults to `container.port`.
     */
    readonly port?: number;
    /**
     * The host name to connect to on the container.
     *
     * @default - defaults to the pod IP
     */
    readonly host?: string;
}
/**
 * Options for `Handler.fromHttpGet`.
 */
export interface HandlerFromHttpGetOptions {
    /**
     * The TCP port to use when sending the GET request.
     *
     * @default - defaults to `container.port`.
     */
    readonly port?: number;
}
/**
 * Defines a specific action that should be taken.
 */
export declare class Handler {
    private readonly tcpSocketOptions?;
    private readonly commandOptions?;
    private readonly httpGetOptions?;
    /**
     * Defines a handler based on an HTTP GET request to the IP address of the container.
     *
     * @param path The URL path to hit
     * @param options Options
     */
    static fromHttpGet(path: string, options?: HandlerFromHttpGetOptions): Handler;
    /**
     * Defines a handler based on a command which is executed within the container.
     *
     * @param command The command to execute
     */
    static fromCommand(command: string[]): Handler;
    /**
     * Defines a handler based opening a connection to a TCP socket on the container.
     *
     * @param options Options
     */
    static fromTcpSocket(options?: HandlerFromTcpSocketOptions): Handler;
    private constructor();
    /**
     * @internal
     */
    _toKube(cont: container.Container): k8s.LifecycleHandler;
}
