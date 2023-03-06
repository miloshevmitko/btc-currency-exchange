This is a simple app to display the exchange rates between Bitcon and several other currencies. It's built with [Next.js](https://nextjs.org/) project and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

You can see the live version of the app on https://home-task-next-js.vercel.app/

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

- The initial exchange rates data is fetched once on the server and then continues to fetch once every minute on the client side. We are fetching the data initialy on the server because we don't want to serve an empty table to the user.
- `next-redux-wrapper` is used to correctly hydrate the reducer data when transitioning from server to client;
- `msw` is used to mock the http requests when running the tests;
- The data returned from the requests is used to update only the store in the application. Then when building our UI components we are using the data from the store with the help of selectors. This approach assures that that we maintaion the unidirectional flow of data.
- All texts visible to the user on the UI should not be hardcoded in the components. Instead we should load them through translation file to make them easier to change in the future if the application is suposed to be server in more than one language.
