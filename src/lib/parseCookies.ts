import setCookie from "set-cookie-parser";

export const getRefreshToken = (cookieString: string[]) => {
  const cookies = setCookie.parse(cookieString, {
    map: true,
  });

  return cookies["refresh_token"];
};
