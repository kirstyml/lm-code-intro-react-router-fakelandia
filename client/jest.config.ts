import type {Config} from 'jest';

const config: Config = {
  extensionsToTreatAsEsm: ['.ts'],
  setupFilesAfterEnv: [
    "./src/setupTests.ts"
  ],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
};

export default config;