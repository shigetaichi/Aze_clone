import { wpBaseUrl } from "./post";

export const getPostsFilteredByTagAndLangWp = async(lang: string, id: number) => {
  const res = await fetch(`${wpBaseUrl}/${lang}/wp-json/wp/v2/posts?tags=${id}`);
  const data = await res.json();
  return data;
}

export const getAllTagIdWp = async () => {
  const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/tags?_fields=id`);
  const data = await res.json();
  const tagIds = data.map(content => {
    return {
      params: {
        tag: content.id.toString()
      }
    }
  });
  return tagIds;
}

export const getTagNameByLangAndId = async (lang: string, id: number | string) => {
  const res = await fetch(`${wpBaseUrl}/${lang}/wp-json/wp/v2/tags/${id}`);
  const data = await res.json();
  return data;
}

export const getAllTagsWp = async (lang: string) => {
  const res = await fetch(`${wpBaseUrl}/${lang}/wp-json/wp/v2/tags`);
  const tags = await res.json();
  return tags;
}

export const getTagsWp = async () => {
  const TagsJp = await getAllTagsWp('ja');
  const TagsAze = await getAllTagsWp('az');
  const TagsEn = await getAllTagsWp('en');
  const TagsRu = await getAllTagsWp('ru');
  const Tags = {
    'ja': TagsJp,
    'aze': TagsAze,
    'en': TagsEn,
    'ru': TagsRu,
  }
  return Tags;
}

export const wpGetTagNamesById = async(id: number) => {
  const res = await fetch(`${wpBaseUrl}/ja/wp-json/wp/v2/tags/${id}?_fields=name`);
  const res2 = await fetch(`${wpBaseUrl}/az/wp-json/wp/v2/tags/${id}?_fields=name`);
  const res3 = await fetch(`${wpBaseUrl}/ru/wp-json/wp/v2/tags/${id}?_fields=name`);
  const res4 = await fetch(`${wpBaseUrl}/en/wp-json/wp/v2/tags/${id}?_fields=name`);
  const data = await res.json();
  const data2 = await res2.json();
  const data3 = await res3.json();
  const data4 = await res4.json();
  let tags: {[key: string]: string} = {};
  tags['ja'] = data.name;
  tags['aze'] = data2.name;
  tags['ru'] = data3.name;
  tags['en'] = data4.name;
  return {[id]: tags};
}
