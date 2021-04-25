import { wpBaseUrl } from "./post";

export const getPostsFilteredByTagAndLangWp = async (lang: string, id: number) => await (await fetch(`${wpBaseUrl}/wp-json/wp/v2/posts?tags=${id}&lang=${lang}`)).json();

export const getTagNameByLangAndId = async (lang: string, id: number | string) => await (await fetch(`${wpBaseUrl}/wp-json/wp/v2/tags/${id}?lang=${lang}`)).json();

export const wpGetTagNamesById = async (id: number) => {
  const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/tags/${id}?lang=ja`);
  const res2 = await fetch(`${wpBaseUrl}/wp-json/wp/v2/tags/${id}?lang=az`);
  const res3 = await fetch(`${wpBaseUrl}/wp-json/wp/v2/tags/${id}?lang=en`);
  const res4 = await fetch(`${wpBaseUrl}/wp-json/wp/v2/tags/${id}?lang=ru`);
  const data = await res.json();
  const data2 = await res2.json();
  const data3 = await res3.json();
  const data4 = await res4.json();
  let tags: { [key: string]: string } = {};
  tags['ja'] = data.name;
  tags['az'] = data2.name;
  tags['ru'] = data3.name;
  tags['en'] = data4.name;
  return {[id]: tags};
}
