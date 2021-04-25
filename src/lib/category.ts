import { wpBaseUrl } from "./post";

export const getAllCategoryWp = async (lang: string) => await (await fetch(`${wpBaseUrl}/${lang}/wp-json/wp/v2/categories`)).json();

export const getCatNameByLangAndId = async (lang: string, id: number | string) => await (await fetch(`${wpBaseUrl}/wp-json/wp/v2/categories/${id}?lang=${lang}`)).json();

export const getPostsFilteredByCategoryAndLangWp = async (lang: string, id: number) => await (await fetch(`${wpBaseUrl}/wp-json/wp/v2/posts?categories=${id}&lang=${lang}`)).json();

export const wpGetCatNamesById = async (id: number) => {
  const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/categories/${id}?lang=ja`);
  const res2 = await fetch(`${wpBaseUrl}/wp-json/wp/v2/categories/${id}?lang=az`);
  const res3 = await fetch(`${wpBaseUrl}/wp-json/wp/v2/categories/${id}?lang=en`);
  const res4 = await fetch(`${wpBaseUrl}/wp-json/wp/v2/categories/${id}?lang=ru`);
  const data = await res.json();
  const data2 = await res2.json();
  const data3 = await res3.json();
  const data4 = await res4.json();
  let cat: { [key: string]: string } = {};
  cat['ja'] = data.name;
  cat['az'] = data2.name;
  cat['ru'] = data3.name;
  cat['en'] = data4.name;
  return {[id]: cat};
}
