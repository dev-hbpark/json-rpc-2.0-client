import { JSONRPCRequest, JSONRPCResponse } from "json-rpc-2.0";
import { TransportInterface } from "./TransportInterface";

export class HttpTransport implements TransportInterface {
  private rpcEndpoint: string;
  private messageCallback?: (msg: JSONRPCRequest | JSONRPCResponse) => void;

  constructor(rpcEndpoint: string) {
    this.rpcEndpoint = rpcEndpoint;
  }

  public sendMessage(msg: JSONRPCRequest | JSONRPCResponse) {
    fetch(this.rpcEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg),
    })
      .then((res) => res.json())
      .then((data) => {
        if (this.messageCallback) {
          this.messageCallback(data as JSONRPCResponse);
        }
      })
      .catch((err) => {
        console.error("[HttpTransport] sendMessage error:", err);
      });
  }

  public onMessage(callback: (msg: JSONRPCRequest | JSONRPCResponse) => void) {
    this.messageCallback = callback;
    // HTTP transport relies on server push or polling; browser-side only send logic here.
  }
}
