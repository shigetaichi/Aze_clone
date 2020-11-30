export const getPostsFilteredByTagAndLangWp = async(lang: string, id: number) => {
  const res = await fetch(`https://azerbaijapan.taichi-sigma2.com/${lang}/wp-json/wp/v2/posts?tags=${id}`);
  const data = await res.json();
  return data;
}

export const getAllTagIdWp = async () => {
  const res = await fetch(`https://azerbaijapan.taichi-sigma2.com/wp-json/wp/v2/tags?_fields=id`);
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
  const res = await fetch(`https://azerbaijapan.taichi-sigma2.com/${lang}/wp-json/wp/v2/tags/${id}`);
  const data = await res.json();
  return data;
}

export const getAllTagsWp = async (lang: string) => {
  const res = await fetch(`https://azerbaijapan.taichi-sigma2.com/${lang}/wp-json/wp/v2/tags`);
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
