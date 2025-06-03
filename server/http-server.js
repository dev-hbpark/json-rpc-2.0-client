const express = require("express");
const bodyParser = require("body-parser");
const { JSONRPCServer } = require("json-rpc-2.0");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const rpcServer = new JSONRPCServer();
rpcServer.addMethod("add", async ({ a, b }) => {
  return a + b;
});
rpcServer.addMethod("echo", async ({ message }) => {
  return `Echo: ${message}`;
});

app.post("/rpc", async (req, res) => {
  const jsonRPCRequest = req.body;
  const response = await rpcServer.receive(jsonRPCRequest);
  if (response) {
    res.json(response);
  } else {
    res.status(204).send();
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`HTTP JSON-RPC 서버 대기 중 ▶ http://localhost:${PORT}/rpc`);
});
