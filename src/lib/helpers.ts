import cacheData from "memory-cache";

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
