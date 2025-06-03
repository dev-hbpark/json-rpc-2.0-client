// rollup.config.js

import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

// Node 모듈(예: json-rpc-2.0)을 찾아 주기 위한 플러그인
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/index.js",
      format: "umd",
      name: "JsonRpcBrowserLib",
      sourcemap: true,
    },
  ],
  plugins: [resolve({ browser: true }), commonjs(), typescript(), terser()],
};
