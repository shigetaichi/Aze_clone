export const microcmsBaseUrl: string = 'https://azerbaijapan.microcms.io';
export const wpBaseUrl: string = 'https://azerbaijapan.taichi-sigma2.com';
export const perPage: number = 9;

export const wpGetPostDataById = async (lang: string, id: number) => {
  const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/posts/${id}?_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,translate_group&lang=${lang}`);
  return await res.json();
}

export const wpNextAndPrevious = async (lang: string, id: number) => await (await fetch(`${wpBaseUrl}/wp-json/wp/v2/posts/${id}?_fields=next,prev&lang=${lang}`)).json();

const necessaryDataSelect = (data: any) => ({
  id: data.id,
  title: data.title.rendered,
  eyecatch: data.acf.eyecatch,
  description: data.content,
  tags: data.tag_name,
})

export const wpGenerateNextAndPrevArray = async (lang: string, id: number) => {
  const thisPost = await wpNextAndPrevious(lang, id);
  let nextAndPrevArray: Array<any> = [];
  if (thisPost.prev) {
    const data1 = await wpGetPostDataById(lang, thisPost.prev.id);
    nextAndPrevArray.push(necessaryDataSelect(data1));
  } else {
    nextAndPrevArray.push(undefined);
  }
  if (thisPost.next) {
    const data2 = await wpGetPostDataById(lang, thisPost.next.id);
    nextAndPrevArray.push(necessaryDataSelect(data2));
  }
  return nextAndPrevArray;
}
