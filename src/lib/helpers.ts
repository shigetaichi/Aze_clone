import cacheData from "memory-cache";
import { LocaleType } from "../context/localeContext";
import { NextRouter } from "next/router";

export const fetchWithCache = async (input: Request | string, init?: RequestInit) => {
  const value = cacheData.get(input);
  if (value) {
    return value;
  } else {
    const res = await fetch(input, init);
    const data = await res.json();
    cacheData.put(input, data, 1000 * 60 * 60 * 24 * 15);
    return data;
  }
}

export const generateRoute = (locale: LocaleType, router: NextRouter): string => {
  let s: string = router.pathname;
  Object.keys(router.query).map((v: string) => {
    s = s.replace(`[${v}]`, v === 'locale' ? locale : String(router.query[v]))
  })
  return s
}
