import type { InitialOptionsTsJest } from "ts-jest/dist/types";

const config: InitialOptionsTsJest = {
  preset: "ts-jest",
  roots: ["<rootDir>/src/api"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.api.json"
    }
  }
};

export default config;
