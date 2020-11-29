export const getAllCategoryData = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.X_API_KEY},
  };
  const res = await fetch(
    `https://azerbaijapan.microcms.io/api/v1/categories`,
    key,
  );
  const data = await res.json();
  const categories = data.contents;
  return categories.map(category => {
    return {
      id: category.id,
      catName: category.category,
      catImage: category.catImage.url,
    }
  })
}
export const getAllCategoryId = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.X_API_KEY},
  };
  const res = await fetch(
    `https://azerbaijapan.microcms.io/api/v1/categories`,
    key,
  );
  const data = await res.json();
  const contents = data.contents;
  return contents.map(content => {
    return {
      params: {
        category: content.id
      }
    }
  });
}

export const getCatName = async (id) => {
  const key = {
    headers: {'X-API-KEY': process.env.X_API_KEY},
  };
  const res = await fetch(
    `https://azerbaijapan.microcms.io/api/v1/categories/${id}`,
    key,
  );
  const data = await res.json();
  return data.category;
}

export const getPostsFilteredByCategory = async (id) => {
  const key = {
    headers: {'X-API-KEY': process.env.X_API_KEY},
  };
  const res = await fetch(
    `https://azerbaijapan.microcms.io/api/v1/blogs?filters=category[contains]${id}`,
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
  });
  return postData;
}

export const getAllCategoryWp = async (lang: string) => {
  const res = await fetch(`https://azerbaijapan.taichi-sigma2.com/${lang}/wp-json/wp/v2/categories`);
  const categories = await res.json();
  return categories;
}

export const getAllCategoryIdWp = async () => {
  const res = await fetch(`https://azerbaijapan.taichi-sigma2.com/wp-json/wp/v2/categories?_fields=id`);
  // const data = await res.json();
  const data = await res.text();
  const data2 = await JSON.parse(data);
  const categoryIds = data2.map(content => {
    return {
      params: {
        category: content.id.toString()
      }
    }
  });
  return categoryIds;
}

// export const getCatNameWp = async (id) => {
//   const res = await fetch(`https://azerbaijapan.taichi-sigma2.com/wp-json/wp/v2/categories?id=${id}`);
//   const data = await res.json();
//   return data;
// }

export const getCatNameByLangAndId = async (lang, id) => {
  const res = await fetch(`https://azerbaijapan.taichi-sigma2.com/${lang}/wp-json/wp/v2/categories/${id}`);
  const data = await res.json();
  return data;
}

export const getPostsFilteredByCategoryAndLangWp = async(lang: string, id: number) => {
  const res = await fetch(`https://azerbaijapan.taichi-sigma2.com/${lang}/wp-json/wp/v2/posts?categories=${id}`);
  const data = await res.json();
  return data;
}
