import { wpGetTagNamesById } from "./tags";
import { wpGetCatNamesById } from "./category";

export const microcmsBaseUrl: string = 'https://azerbaijapan.microcms.io';
export const wpBaseUrl: string = 'https://azerbaijapan.taichi-sigma2.com';

export const getSortedPostData = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.X_API_KEY},
  };
  const res = await fetch(
    `https://azerbaijapan.microcms.io/api/v1/blogs?limit=1000`,
    key,
  );
  const data = await res.json();
  const contents = data.contents;
  return contents.map(content => {
    const id = content.id;
    const title = content.title;
    const eyecatch = content.eyecatch;
    const description = content.body;
    const publishedAt = content.publishedAt;
    const updatedAt = content.updatedAt;
    const tag = content.tag;
    return {id, title, eyecatch, description, publishedAt, updatedAt, tag};
  });
}

export const getAllPostIds = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.X_API_KEY},
  };
  const res = await fetch(
    `https://azerbaijapan.microcms.io/api/v1/blogs?limit=1000`,
    key,
  );
  const data = await res.json();
  const contents = data.contents;
  
  //ここでreturnされるのは
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  // こいうオブジェクト配列じゃないとダメ
  return contents.map(content => {
    return {
      params: {
        id: content.id
      }
    }
  });
}

export const getPostData = async (slug) => {
  const key = {
    headers: {'X-API-KEY': process.env.X_API_KEY},
  };
  const res = await fetch(
    `https://azerbaijapan.microcms.io/api/v1/blogs/${slug}`,
    key,
  );
  const data = await res.json();
  const title = data.title;
  const publishedAt = data.publishedAt;
  const updatedAt = data.updatedAt;
  const eyecatch = data.eyecatch;
  const content = data.body;
  const tag = data.tag;
  return {
    id: slug,
    title: title,
    publishedAt: publishedAt,
    updatedAt: updatedAt,
    eyecatch: eyecatch,
    content: content,
    tag: tag,
  }
}

export const getRandomPostData = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.X_API_KEY},
  };
  const res = await fetch(
    `https://azerbaijapan.microcms.io/api/v1/blogs`,
    key,
  );
  const data = await res.json();
  const contents = data.contents;
  const postData = contents.map(content => {
    const id = content.id;
    const title = content.title;
    const eyecatch = content.eyecatch;
    const description = content.body;
    const publishedAt = content.publishedAt;
    const updatedAt = content.updatedAt;
    const tag = content.tag;
    return {id, title, eyecatch, description, publishedAt, updatedAt, tag};
  })
  const postDataLength = postData.length;
  const randomIndex = Math.floor(Math.random() * postDataLength);
  return postData[randomIndex];
}

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

export const wpGetAllPostIds = async () => {
  const allPostsArray = await wpGetAllPosts();
  return allPostsArray.map(post => {
    const id: string = post.id.toString();
    return {
      params: {
        id: id,
      }
    };
  });
}

export const wpGetPostDataById = async (lang: string, id: number) => {
  const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/posts/${id}?_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,translate_group&?filter[lang]=${lang}`);
  const data = await res.json();
  data['cat_obj'] = await Promise.all(data.categories.map(each => (
    wpGetCatNamesById(each)
  )))
  data['tags_obj'] = await Promise.all(data.tags.map(each => (
    wpGetTagNamesById(each)
  )))
  return data;
}

export const wpNextAndPrevious = async (lang: string, id: number) => {
  const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/posts/${id}?_fields=next,prev&?filter[lang]=${lang}`);
  return await res.json();
}

function necessaryDataSelect(data: any) {
  return {
    id: data.id,
    title: data.title.rendered,
    eyecatch: data.acf.eyecatch,
    description: data.content,
    tags: data.tags,
  }
}

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
