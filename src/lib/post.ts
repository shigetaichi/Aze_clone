export const microcmsBaseUrl: string = 'https://azerbaijapan.microcms.io';
export const wpBaseUrl: string = 'https://azerbaijapan.taichi-sigma2.com';
export const perPage: number = 9;

export const wpGetPostsSortedByLang = async (lang: string) => {
  const res = await fetch(`${wpBaseUrl}/${lang}/wp-json/wp/v2/posts?per_page=100&_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,tag_name`);
  const data = await res.json();
  return data.map(eachData => ({
    id: eachData.id,
    eyecatch: eachData.acf.eyecatch,
    title: eachData.title.rendered,
    publishedAt: eachData.date,
    updatedAt: eachData.modified,
    tags: eachData.tags,
    tag_name: eachData.tag_name,
    lang: eachData.meta['_locale'],
    content: eachData.content.rendered,
    category_name: eachData.category_name,
    category_id: eachData.categories,
  }));
}

export const wpGetAllPosts = async () => {
  return [...await wpGetPostsSortedByLang('az'), ...await wpGetPostsSortedByLang('en'), ...await wpGetPostsSortedByLang('ja'), ...await wpGetPostsSortedByLang('ru')];
}

export const wpGetPostDataById = async (lang: string, id: number) => {
  const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/posts/${id}?_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,translate_group&lang=${lang}`);
  // data['cat_obj'] = await Promise.all(data.categories.map(each => (
  //   wpGetCatNamesById(each)
  // )))
  // data['tags_obj'] = await Promise.all(data.tags.map(each => (
  //   wpGetTagNamesById(each)
  // )))
  return await res.json();
}

export const wpNextAndPrevious = async (lang: string, id: number) => await (await fetch(`${wpBaseUrl}/wp-json/wp/v2/posts/${id}?_fields=next,prev&lang=${lang}`)).json();

const necessaryDataSelect = (data: any) => ({
  id: data.id,
  title: data.title.rendered,
  eyecatch: data.acf.eyecatch,
  description: data.content,
  tags: data.tags,
})

export const wpGenerateNextAndPrevArray = async (lang: string, id: number) => {
  const thisPost = await wpNextAndPrevious(lang, id);
  let nextAndPrevArray: Array<any> = [];
  if (thisPost.prev) {
    const data1 = await wpGetPostDataById(lang, thisPost.prev.id);
    nextAndPrevArray.push(necessaryDataSelect(data1));
  }
  if (thisPost.next) {
    const data2 = await wpGetPostDataById(lang, thisPost.next.id);
    nextAndPrevArray.push(necessaryDataSelect(data2));
  }
  return nextAndPrevArray;
}

export const sha256 = async (text) => {
  const uint8 = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', uint8)
  return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('')
}
