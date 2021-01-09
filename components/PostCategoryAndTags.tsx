import React, {FC, useEffect} from 'react'
import Link from 'next/link'
import { lang, useLangContext } from '../context/langContext'
import { getTagNameByLangAndId } from '../lib/tags';

interface Category {
  id: number;
  name: string;
}

interface Tags {
  id: number;
  name: string;
}

interface Props {
  category: Category;
  tags?: Array<Tags>;
}

const PostCategoryAndTags: FC<Props> = (props) => {
  const langTheme = useLangContext();
  
  
  return (
    <div className="post-cat-and-tags-wrapper">
      <div className="cat">
        {lang(langTheme.langName).categories.title}：
        <Link href={`/categories/${props.category.id}`}>
          {props.category.name}
        </Link>
      </div>
      <div className="tags">
        {lang(langTheme.langName).tags.title}：
      </div>
    </div>
  )
}

export default PostCategoryAndTags
