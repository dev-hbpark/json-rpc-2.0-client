import {
  JSONRPCServer,
  JSONRPCClient,
  JSONRPCRequest,
  JSONRPCResponse,
} from "json-rpc-2.0";
import { TransportInterface } from "./transport/TransportInterface";

export class RpcContext {
  private server: JSONRPCServer;
  private client: JSONRPCClient;
  private transport: TransportInterface;

  constructor(transport: TransportInterface) {
    this.transport = transport;

    this.server = new JSONRPCServer();
    this.server.addMethod(
      "add",
      async ({ a, b }: { a: number; b: number }) => a + b
    );
    this.server.addMethod(
      "echo",
      async ({ message }: { message: string }) => `Echo: ${message}`
    );

    this.client = new JSONRPCClient((request) => {
      this.transport.sendMessage(request);
      return Promise.resolve();
    });

    this.transport.onMessage((raw: JSONRPCRequest | JSONRPCResponse) => {
      if (this.isRequest(raw)) {
        this.handleRequest(raw as JSONRPCRequest);
      } else {
        this.client.receive(raw as JSONRPCResponse);
      }
    });
  }

  public async request<T>(method: string, params: any): Promise<T> {
    return this.client.request(method, params) as Promise<T>;
  }

  private async handleRequest(request: JSONRPCRequest) {
    try {
      const response = await this.server.receive(request);
      if (response) {
        this.transport.sendMessage(response);
      }
    } catch (err) {
      console.error("[RpcContext] server error:", err);
    }
  }

  private isRequest(
    msg: JSONRPCRequest | JSONRPCResponse
  ): msg is JSONRPCRequest {
    return (
      typeof (msg as JSONRPCRequest).method === "string" &&
      (msg as JSONRPCRequest).jsonrpc === "2.0"
    );
  }
}
