const { WebSocketServer } = require("ws");
const { JSONRPCServer } = require("json-rpc-2.0");

const rpcServer = new JSONRPCServer();

rpcServer.addMethod("add", async ({ a, b }) => a + b);
rpcServer.addMethod("echo", async ({ message }) => `Echo: ${message}`);

const wss = new WebSocketServer({ port: 3001 });
wss.on("connection", (ws) => {
  console.log("[WS] 클라이언트 연결됨");

  ws.on("message", async (data) => {
    let request;
    try {
      request = JSON.parse(data.toString());
    } catch (e) {
      const parseError = {
        jsonrpc: "2.0",
        error: { code: -32700, message: "Parse error" },
        id: null,
      };
      ws.send(JSON.stringify(parseError));
      return;
    }
    const response = await rpcServer.receive(request);
    if (response) {
      ws.send(JSON.stringify(response));
    }
  });
});

console.log("[WS] JSON-RPC WebSocket 서버 대기 중 ▶ ws://localhost:3001");
