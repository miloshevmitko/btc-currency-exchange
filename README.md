This is a simple app to display the exchange rates between Bitcon and several other currencies. It's built with [Next.js](https://nextjs.org/) project and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

System Requirements

 - Node.js 14.6.0

Install dependnecies:

```bash
yarn
```
## Available Scripts

### Run the server in development mode:

```bash
yarn dev
```

After that open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Run with production build:
```bash
yarn build && yarn start
```

After that open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Run the tests:
```bash
yarn test
```

## Relevant design decisions

- `msw` is used to mock the http requests when running the tests;
- `next-redux-wrapper` is used to correctly hydrate the reducer data when transitioning from server to client;