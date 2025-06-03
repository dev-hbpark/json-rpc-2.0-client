import { JSONRPCRequest, JSONRPCResponse } from "json-rpc-2.0";

/**
 * Transport 인터페이스:
 * - sendMessage: JSON-RPC 메시지를 직렬화해서 “전송”만 담당
 * - onMessage: 수신된 raw 데이터를 디시리얼라이즈해 콜백에 전달
 */
export interface TransportInterface {
  /**
   * JSON-RPC 요청/응답 객체를 직렬화(serialize)해
   * 실제 전송 계층(API, WebSocket, BroadcastChannel 등)을 통해 보냄
   */
  sendMessage(msg: JSONRPCRequest | JSONRPCResponse): void;

  /**
   * 전송 계층으로부터 수신된 raw 메시지(JSON 문자열 혹은 객체)를
   * deserialize 후, 등록된 콜백을 호출
   */
  onMessage(callback: (msg: JSONRPCRequest | JSONRPCResponse) => void): void;
}
