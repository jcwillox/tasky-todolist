import { amber, blue, red } from "@mui/material/colors";

export const COOKIE_TOKEN_NAME = "token";
export const SALT_ROUNDS = 10;

const { NODE_ENV } = process.env;
export const DEVELOPMENT = NODE_ENV !== "production" && NODE_ENV !== "test";

export const PRIORITIES: Record<number, { label: string; color?: string }> = {
  1: {
    label: "High",
    color: red[500]
  },
  2: {
    label: "Medium",
    color: amber[600]
  },
  3: {
    label: "Low",
    color: blue[500]
  },
  4: {
    label: "None",
    color: ""
  }
};

export * from "./secret";
