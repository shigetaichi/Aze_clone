export const getSortedPostData =  async () => {
  const key = {
    headers: {'X-API-KEY': process.env.X_API_KEY},
  };
  const res = await fetch(
    `https://azerbaijapan.microcms.io/api/v1/blogs?limit=1000`,
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
  return postData;
}

export const getAllPostIds = async() => {
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

export const getPostData = async(slug) => {
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

export const getRandomPostData =  async () => {
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
  const randomPostData = postData[randomIndex];
  return randomPostData;
}

export const wpGetPostsSortedByLang = async(lang: string) => {
  const res = await fetch(`https://azerbaijapan.taichi-sigma2.com/${lang}/wp-json/wp/v2/posts?per_page=100&_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,tag_name`);
  const data = await res.json();
  const postData = data.map(eachData => {
    const id = eachData.id;
    const eyecatch = eachData.acf.eyecatch;
    const title = eachData.title.rendered;
    const publishedAt = eachData.date;
    const updatedAt = eachData.modified;
    const tags = eachData.tags;
    const tag_name = eachData.tag_name;
    const lang = eachData.meta['_locale'];
    const content = eachData.content.rendered;
    const category_name = eachData.category_name;
    const category_id = eachData.categories;
    return {id, eyecatch, title, publishedAt, updatedAt, tags, tag_name, lang, content, category_name, category_id}
  });
  return postData;
}

export const wpGetAllPosts = async () => {
  const postArrayJp = await wpGetPostsSortedByLang('ja');
  const postArrayAz = await wpGetPostsSortedByLang('az');
  const postArrayEn = await wpGetPostsSortedByLang('en');
  const postArrayRu = await wpGetPostsSortedByLang('ru');
  return [...postArrayAz, ...postArrayEn, ...postArrayJp, ...postArrayRu];
}

export const wpGetAllPostIds = async () => {
  const allPostsArray = await wpGetAllPosts();
  const allPostIds = allPostsArray.map(post => {
    const id: string = post.id.toString();
    return {
      params: {
        id: id,
      }
    };
  });
  return allPostIds;
}

export const wpGetPostDataById = async(lang: string, id: number) => {
  const res = await fetch(`https://azerbaijapan.taichi-sigma2.com/${lang}/wp-json/wp/v2/posts/${id}?_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,translate_group`);
  const data = await res.json();
  return data;
}

export const wpNextAndPrevious = async(lang: string, id: number) => {
  const res = await fetch(`https://azerbaijapan.taichi-sigma2.com/${lang}/wp-json/wp/v2/posts/${id}?_fields=next,prev`);
  const data = await res.json();
  return data;
}

function necessaryDataSelect(data: any){
  return {
    id: data.id,
    title: data.title.rendered,
    eyecatch: data.acf.eyecatch,
    description: data.content,
    tags: data.tags,
  }
}
export const wpGenerateNextAndPrevArray = async(lang: string, id: number) => {
  const thisPost = await wpNextAndPrevious(lang, id);
  let nextAndPrevArray: Array<any> = [];
  if(thisPost.prev){
    const data1 = await wpGetPostDataById(lang, thisPost.prev.id);
    nextAndPrevArray.push(necessaryDataSelect(data1));
  }
  if(thisPost.next){
    const data2 = await wpGetPostDataById(lang, thisPost.next.id);
    nextAndPrevArray.push(necessaryDataSelect(data2));
  }
  return nextAndPrevArray;
}

export const sha256 = async(text) => {
  const uint8  = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', uint8)
  return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
}
