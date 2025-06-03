import { TransportInterface } from "./TransportInterface";
import { JSONRPCRequest, JSONRPCResponse } from "json-rpc-2.0";

export class BroadcastChannelTransport implements TransportInterface {
  private channel: BroadcastChannel;
  private messageCallback?: (msg: JSONRPCRequest | JSONRPCResponse) => void;

  constructor(channelName: string) {
    this.channel = new BroadcastChannel(channelName);
    this.channel.onmessage = (ev) => {
      const data = ev.data as JSONRPCRequest | JSONRPCResponse;
      if (this.messageCallback) {
        this.messageCallback(data);
      }
    };
  }

  public sendMessage(msg: JSONRPCRequest | JSONRPCResponse) {
    this.channel.postMessage(msg);
  }

  public onMessage(callback: (msg: JSONRPCRequest | JSONRPCResponse) => void) {
    this.messageCallback = callback;
  }
}
