import React, { FC, useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { lang, LangContext, useLangContext } from "../../../context/langContext";
import { sha256 } from "../../../lib/post";
import {
  Button,
  CategoryAreaWp,
  ContentIndex,
  PostCategoryAndTags,
  PostThumbnail,
  PostTranslationMenu,
  TagArea,
  Title
} from "../../index";
import Container from "@material-ui/core/Container";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';

interface PostPageProps {
  postData: any;
  categories: any;
  nextAndPrev: any;
  tags: any;
}

hljs.registerLanguage('javascript', javascript);

const PostPage: FC<PostPageProps> = ({postData, categories, nextAndPrev, tags}: PostPageProps) => {
  const router: NextRouter = useRouter();
  const langTheme: LangContext = useLangContext();
  const [indexList, setIndexList] = useState<Array<any>>([]);
  const categoriesArray = categories[langTheme.langName];
  const tagsArray = tags[langTheme.langName];
  useEffect(() => {
    hljs.initHighlighting();
    const content = document.getElementById('content');
    const contentNodeList = content.querySelectorAll('h2, h3');
    let indexListArray = [];
    Array.from(contentNodeList, node => indexListArray.push(node));
    contentNodeList.forEach(node => {
      sha256(node.innerHTML).then(res => {
        node.id = res.toString();
      });
    });
    setIndexList(indexListArray);
    
    // 今回の交差を監視する要素contentNodeList
    const options = {
      root: null, // 今回はビューポートをルート要素とする
      rootMargin: "-50% 0px", // ビューポートの中心を判定基準にする
      threshold: 0 // 閾値は0
    };
    const observer = new IntersectionObserver(doWhenIntersect, options);
    // それぞれのboxを監視する
    contentNodeList.forEach(node => {
      observer.observe(node);
    });
    
    /**
     * 交差したときに呼び出す関数
     * @param entries
     */
    function doWhenIntersect(entries) {
      // 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activateIndex(entry.target);
        }
      });
    }
    
    /**
     * 目次の色を変える関数
     * @param element
     */
    function activateIndex(element) {
      // すでにアクティブになっている目次を選択
      const currentActiveIndex = document.querySelector("#content-index-wrapper .active");
      // すでにアクティブになっているものが0個の時（=null）以外は、activeクラスを除去
      if (currentActiveIndex !== null) {
        currentActiveIndex.classList.remove("active");
      }
      // 引数で渡されたDOMが飛び先のaタグを選択し、activeクラスを付与
      const newActiveIndex = document.querySelector(
        `a[href="#${element.id}"]`
      );
      if (newActiveIndex) {
        newActiveIndex.classList.add("active");
      }
    }
  }, []);
  
  const formatDate = (data) => {
    const beforeFormatDate = new Date(data);
    const year = beforeFormatDate.getFullYear();
    const month = beforeFormatDate.getMonth() + 1;
    const date = beforeFormatDate.getDate();
    return `${year} / ${month} / ${date}`;
  }
  
  return (
    <>
      <ContentIndex indexList={indexList}/>
      <Container maxWidth="xl">
        <h1 className="post-title">
          {postData.title.rendered}</h1>
        <span className="post-publishedAt">{lang(langTheme.langName).post.publishedAt} {formatDate(postData.date)}
          <br className="on480"/>
          <span className="off480inline">　</span>
          {formatDate(postData.date) === formatDate(postData.modified) ? "": `${lang(langTheme.langName).post.updatedAt} ${formatDate(postData.modified)}`}
        </span>
        <PostTranslationMenu translate_group={postData.translate_group}/>
        <PostCategoryAndTags category={postData.cat_obj} tags={postData.tags_obj}/>
        <div className="post-eyecatch">
          <img src={postData.acf.eyecatch} alt=""/>
        </div>
      </Container>
      <div id="post-content" lang="ja">
        <div className="post-container">
          <div id="content" dangerouslySetInnerHTML={{__html: postData.content.rendered}}/>
          <div className="thanks-reading">
            <p>{lang(langTheme.langName).post.thanks}</p>
          </div>
        </div>
      </div>
      <div className="module-spacer--medium"/>
      <Title title={lang(langTheme.langName).nextPrev.title} subtitle={lang(langTheme.langName).nextPrev.subtitle}/>
      <div className="prev-and-next">
        <p className="prev-flag">前の記事</p>
        {nextAndPrev[0] && (
          <PostThumbnail
            id={nextAndPrev[0].id}
            title={nextAndPrev[0].title}
            image={nextAndPrev[0].eyecatch}
            description={nextAndPrev[0].description}
            tags={nextAndPrev[0].tags}
          />
        )}
        <p className="next-flag">次の記事</p>
        {nextAndPrev[1] && (
          <PostThumbnail
            id={nextAndPrev[1].id}
            title={nextAndPrev[1].title}
            image={nextAndPrev[1].eyecatch}
            description={nextAndPrev[1].description}
            tags={nextAndPrev[1].tags}
          />
        )}
      </div>
      <div className="module-spacer--medium"/>
      <div className="module-spacer--medium"/>
      <Title title={lang(langTheme.langName).recommendation.title}
             subtitle={lang(langTheme.langName).recommendation.subtitle}/>
      <div style={{display: 'flex', justifyContent: 'center',}}>
        {/* <PostThumbnail id={randomPostData.id} image={randomPostData.eyecatch.url} title={randomPostData.title} /> */}
      </div>
      <div className="module-spacer--medium"/>
      <div className="module-spacer--medium"/>
      <Button path="/allposts">{lang(langTheme.langName).buttonText.toArchive}</Button>
      <div className="module-spacer--medium"/>
      <div className="module-spacer--medium"/>
      <div className="module-spacer--medium"/>
      <Container maxWidth="lg">
        <Title
          title={lang(langTheme.langName).categories.title}
          subtitle={lang(langTheme.langName).categories.subtitle}
        />
        {/* <CategoryArea categories={categories} /> */}
        <CategoryAreaWp categories={categoriesArray}/>
        <Title
          title={lang(langTheme.langName).tags.title}
          subtitle={lang(langTheme.langName).tags.subtitle}
        />
        <TagArea tags={tagsArray}/>
        <div className="module-spacer--medium"/>
        <Button path="/">{lang(langTheme.langName).buttonText.toTop}</Button>
        <div className="module-spacer--medium"/>
        <div className="module-spacer--medium"/>
      </Container>
    </>
  )
}

export default PostPage