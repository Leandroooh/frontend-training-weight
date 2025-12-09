import { getCookie } from "cookies-next";

export function GetCookieClient() {
  const token = getCookie("session");
  return token;
}
