export const getSortedPostData =  async () => {
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
    const tag = content.tag;
    return {id, title, eyecatch, description, tag};
  })
  return postData;
}

export const getAllPostIds = async() => {
  const key = {
    headers: {'X-API-KEY': process.env.X_API_KEY},
  };
  const res = await fetch(
    `https://azerbaijapan.microcms.io/api/v1/blogs`,
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
  const eyecatch = data.eyecatch;
  const content = data.body;
  const tag = data.tag;
  return {
    id: slug,
    title: title,
    publishedAt: publishedAt,
    eyecatch: eyecatch,
    content: content,
    tag: tag,
  }
}