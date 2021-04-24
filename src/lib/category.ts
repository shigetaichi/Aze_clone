import { wpBaseUrl } from "./post";

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
  return contents.map(content => ({
    id: content.id,
    title: content.title,
    eyecatch: content.eyecatch,
    description: content.body,
    tag: content.tag
  }));
}

export const getAllCategoryWp = async (lang: string) => {
  const res = await fetch(`${wpBaseUrl}/${lang}/wp-json/wp/v2/categories`);
  return await res.json();
}

export const getAllCategoryIdWp = async () => {
  const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/categories?_fields=id`);
  const data = await res.json();
  return data.map(content => {
    return {
      params: {
        category: content.id.toString()
      }
    }
  });
}

export const getCatNameByLangAndId = async (lang: string, id: number | string) => {
  const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/categories/${id}`);
  return await res.json();
}

export const getPostsFilteredByCategoryAndLangWp = async (lang: string, id: number) => {
  const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/posts?categories=${id}`);
  return await res.json();
}

export const getCategoriesWp = async () => {
  return {
    'ja': await getAllCategoryWp('ja'),
    'aze': await getAllCategoryWp('az'),
    'en': await getAllCategoryWp('en'),
    'ru': await getAllCategoryWp('ru'),
  }
}

export const wpGetCatNamesById = async (id: number) => {
  const res = await fetch(`${wpBaseUrl}/wp-json/wp/v2/categories/${id}?_fields=name&?filter[lang]=ja`);
  const res2 = await fetch(`${wpBaseUrl}/wp-json/wp/v2/categories/${id}?_fields=name&?filter[lang]=az`);
  const res3 = await fetch(`${wpBaseUrl}/wp-json/wp/v2/categories/${id}?_fields=name&?filter[lang]=en`);
  const res4 = await fetch(`${wpBaseUrl}/wp-json/wp/v2/categories/${id}?_fields=name&?filter[lang]=ru`);
  const data = await res.json();
  const data2 = await res2.json();
  const data3 = await res3.json();
  const data4 = await res4.json();
  let cat: { [key: string]: string } = {};
  cat['ja'] = data.name;
  cat['aze'] = data2.name;
  cat['ru'] = data3.name;
  cat['en'] = data4.name;
  return {[id]: cat};
}
