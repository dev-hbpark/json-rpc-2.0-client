# JSON-RPC 2.0 Browser Library

브라우저 환경에서 사용할 수 있는 JSON-RPC 2.0 클라이언트 라이브러리입니다. 다양한 전송 계층을 플러그인 형태로 지원합니다.

## 주요 기능

- JSON-RPC 2.0 프로토콜 지원
- 플러그인 가능한 전송 계층 (WebSocket, HTTP 등)
- TypeScript 지원
- 브라우저 호환성
- 모듈 번들링 지원 (ESM, CommonJS)

## 설치

```bash
npm install jsonrpc-browser-lib
```

## 사용 방법

### 기본 사용법

```typescript
import { RpcContext } from "jsonrpc-browser-lib";

// RPC 컨텍스트 생성
const rpc = new RpcContext({
  transport: new WebSocketTransport("ws://localhost:8080"),
});

// RPC 메서드 호출
const result = await rpc.call("methodName", { param1: "value1" });
```

### 지원하는 전송 계층

- WebSocket
- HTTP
- 기타 커스텀 전송 계층 구현 가능

## 개발

### 필수 요구사항

- Node.js
- npm

### 개발 환경 설정

```bash
# 의존성 설치
npm install

# 빌드
npm run build

# 예제 서버 실행
npm run start
```

## 프로젝트 구조

```
├── src/                # 소스 코드
│   ├── transport/     # 전송 계층 구현
│   ├── RpcContext.ts  # RPC 컨텍스트 클래스
│   └── index.ts       # 진입점
├── public/            # 예제 및 문서
├── dist/             # 빌드 결과물
└── server/           # 테스트 서버
```

## 라이선스

MIT License

## 기여

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
