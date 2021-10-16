export const COOKIE_TOKEN_NAME = "token";
export const SALT_ROUNDS = 10;

const { NODE_ENV } = process.env;
export const DEVELOPMENT = NODE_ENV !== "production" && NODE_ENV !== "test";

export * from "./secret";
