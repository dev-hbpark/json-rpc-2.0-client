import { JSONRPCRequest, JSONRPCResponse } from "json-rpc-2.0";
import { TransportInterface } from "./TransportInterface";

export class WebSocketTransport implements TransportInterface {
  private ws: WebSocket;
  private messageCallback?: (msg: JSONRPCRequest | JSONRPCResponse) => void;

  constructor(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (this.messageCallback) {
          this.messageCallback(msg);
        }
      } catch (e) {
        console.error("[WebSocketTransport] message parse error", e);
      }
    };
    this.ws.onopen = () => console.log("[WebSocketTransport] connected");
    this.ws.onerror = (e) => console.error("[WebSocketTransport] error", e);
  }

  public sendMessage(msg: JSONRPCRequest | JSONRPCResponse) {
    const payload = JSON.stringify(msg);
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(payload);
    } else {
      console.warn("[WebSocketTransport] WS not open");
    }
  }

  public onMessage(callback: (msg: JSONRPCRequest | JSONRPCResponse) => void) {
    this.messageCallback = callback;
  }
}
