/** Delay function; useful for testing network delays */
export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const cookiesObject = (res): Record<string, string> => {
  const rawCookies: string[] = res.headers["set-cookie"];
  const cookies = {};
  for (let cookie of rawCookies) {
    cookie = cookie.split(";", 2)[0];
    const [key, value] = cookie.split("=", 2);
    cookies[key] = value;
  }
  return cookies;
};

export const cookiesAsString = (res): string => {
  return res.headers["set-cookie"]
    .map((cookie: string) => {
      return cookie.split(";", 2)[0];
    })
    .join("; ");
};
