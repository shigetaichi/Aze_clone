import { wpBaseUrl } from "./post";

export const getPostsFilteredByTagAndLangWp = async (lang: string, id: number) => {
  const res = await fetch(`${wpBaseUrl}/${lang}/wp-json/wp/v2/posts?tags=${id}`);
  return await res.json();
}

export const getAllTagIdWp = async () => {
  const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/tags?_fields=id`);
  const data = await res.json();
  return data.map(content => ({
    params: {
      tag: content.id.toString()
    }
  }));
}

export const getTagNameByLangAndId = async (lang: string, id: number | string) => {
  const res = await fetch(`${wpBaseUrl}/${lang}/wp-json/wp/v2/tags/${id}`);
  return await res.json();
}

export const getAllTagsWp = async (lang: string) => {
  const res = await fetch(`${wpBaseUrl}/${lang}/wp-json/wp/v2/tags`);
  return await res.json();
}

export const getTagsWp = async () => (
  {
    'ja': await getAllTagsWp('ja'),
    'aze': await getAllTagsWp('az'),
    'en': await getAllTagsWp('en'),
    'ru': await getAllTagsWp('ru'),
  }
);

export const wpGetTagNamesById = async (id: number) => {
  const res = await fetch(`${wpBaseUrl}/ja/wp-json/wp/v2/tags/${id}?_fields=name`);
  const res2 = await fetch(`${wpBaseUrl}/az/wp-json/wp/v2/tags/${id}?_fields=name`);
  const res3 = await fetch(`${wpBaseUrl}/ru/wp-json/wp/v2/tags/${id}?_fields=name`);
  const res4 = await fetch(`${wpBaseUrl}/en/wp-json/wp/v2/tags/${id}?_fields=name`);
  const data = await res.json();
  const data2 = await res2.json();
  const data3 = await res3.json();
  const data4 = await res4.json();
  let tags: { [key: string]: string } = {};
  tags['ja'] = data.name;
  tags['aze'] = data2.name;
  tags['ru'] = data3.name;
  tags['en'] = data4.name;
  return {[id]: tags};
}
