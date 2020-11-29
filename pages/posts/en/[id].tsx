import React, {useEffect, useState} from 'react';
import { Layout } from '../../../components/globals';
import { getAllPostIds, getPostData, getRandomPostData, wpGetAllPostIds, wpGetAllPosts, wpGetPostsSortedByLang, wpGetPostDataById, sha256 } from '../../../lib/post';
import { getAllCategoryData, getAllCategoryWp } from '../../../lib/category';
import Container from '@material-ui/core/Container';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';
import {ContentIndex, CategoryArea, Title, Button, PostFlex, PostThumbnail, PostTranslationMenu, CategoryAreaWp} from '../../../components';
import {useLangContext, lang} from '../../../context/langContext';

// postの中のcssはglobal.cssに記載

hljs.registerLanguage('javascript', javascript);

export const getStaticPaths = async () => {
  // const paths = await getAllPostIds();
  const paths = await wpGetAllPostIds();
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  const postData = await wpGetPostDataById('az', params.id);
  // const categories = await getAllCategoryData();
  const categoriesJp = await getAllCategoryWp('ja');
  const categoriesAze = await getAllCategoryWp('az');
  const categoriesEn = await getAllCategoryWp('en');
  const categoriesRu = await getAllCategoryWp('ru');
  const categories = {
    'ja': categoriesJp,
    'aze': categoriesAze,
    'en': categoriesEn,
    'ru': categoriesRu,
  }
  const randomPostData = await getRandomPostData();
  return {
    props: {
      postData,
      categories,
      randomPostData,
    }
  }
}

const Post = ({postData, categories, randomPostData}) => {
  const langTheme = useLangContext();
  const [indexList, setIndexList] = useState([]);
  const categoriesArray = categories[langTheme.langName];
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
      if(newActiveIndex){
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


  return(
    <Layout title={postData.title.rendered} image={postData.acf.eyecatch}>
      <ContentIndex indexList={indexList}/>
      <Container maxWidth="xl">
        <h1 className="post-title">{postData.title.rendered}</h1>
        <span className="post-publishedAt">{lang(langTheme.langName).post.publishedAt} {formatDate(postData.date)}
          <br className="on480"></br>
          <span className="off480inline">　</span>
          {(() => {
            if(formatDate(postData.date) === formatDate(postData.modified)){
              return;
            }else{
              return (`${lang(langTheme.langName).post.updatedAt} ${formatDate(postData.modified)}`);
            }
          })()}
        </span>
        <PostTranslationMenu translate_group={postData.translate_group}/>
        <div className="post-eyecatch">
          <img src={postData.acf.eyecatch} alt=""/>
        </div>
      </Container>
      <div id="post-content">
        <div className="post-container">
          <div
          id="content"
          dangerouslySetInnerHTML={{
            __html: postData.content.rendered
          }}
          ></div>
          <div className="thanks-reading">
            <p>{lang(langTheme.langName).post.thanks}</p>
          </div>
        </div>
      </div>
      <div className="module-spacer--medium"></div>
      <Title title={lang(langTheme.langName).nextPrev.title} subtitle={lang(langTheme.langName).nextPrev.subtitle}/>
      <div className="module-spacer--medium"></div>
      <div className="module-spacer--medium"></div>
      <Title title={lang(langTheme.langName).recommendation.title} subtitle={lang(langTheme.langName).recommendation.subtitle}/>
      <div style={{display: 'flex', justifyContent: 'center',}}>
        {/* <PostThumbnail id={randomPostData.id} image={randomPostData.eyecatch.url} title={randomPostData.title} /> */}
      </div>
      <div className="module-spacer--medium"></div>
      <div className="module-spacer--medium"></div>
      <Button text={lang(langTheme.langName).buttonText.toArchive} path="/allposts" />
      <div className="module-spacer--medium"></div>
      <div className="module-spacer--medium"></div>
      <div className="module-spacer--medium"></div>
      <Container maxWidth="lg">
        <Title
          title={lang(langTheme.langName).categories.title}
          subtitle={lang(langTheme.langName).categories.subtitle}
        />
        {/* <CategoryArea categories={categories} /> */}
        <CategoryAreaWp categories={categoriesArray} />
        <div className="module-spacer--medium"></div>
        <Button text={lang(langTheme.langName).buttonText.toTop} path="/" />
        <div className="module-spacer--medium"></div>
        <div className="module-spacer--medium"></div>
      </Container>
    </Layout>
  )
}



export default Post;
