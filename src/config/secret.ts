export const SECRET_KEY = process.env.SECRET_KEY
  ? Buffer.from(process.env.SECRET_KEY, "base64").toString()
  : "test_secret_key";
