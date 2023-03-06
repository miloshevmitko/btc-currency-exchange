// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import jestFetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom/extend-expect';
import { loadEnvConfig } from '@next/env';
import { server } from './src/mocks/server';

jestFetchMock.enableMocks();

loadEnvConfig(process.cwd())

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());