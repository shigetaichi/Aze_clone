import { FC, useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { locale, LocaleType, useLocaleContext } from "context/localeContext";
import Button from "components/atom/Button/Button";
import Title from "components/atom/Title/Title";
import ContentIndex from "components/molecules/ContentIndex/ContentIndex";
import styles from "./PostTemplate.module.scss";
import PostTransMenu from "components/molecules/PostTransMenu/PostTransMenu";
import PostCategoryAndTags from "components/molecules/PostCategoryAndTags/PostCategoryAndTags";
import PrevAndNext from "components/molecules/PrevAndNext/PrevAndNext";

interface PostPageProps {
  postData: any;
}

const PostTemplate: FC<PostPageProps> = ({postData}: PostPageProps) => {
  const router: NextRouter = useRouter();
  const localeContext: LocaleType = useLocaleContext();
  const [indexList, setIndexList] = useState<Array<Element>>([]);
  useEffect(() => {
    const content = document.getElementById('content');
    const contentNodeList: NodeListOf<Element> = content.querySelectorAll('h2, h3');
    let indexListArray: Element[] = [];
    Array.from(contentNodeList, (node: Element) => indexListArray.push(node));
    contentNodeList.forEach((node: Element, i: number) => node.id = i.toString());
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
        if (entry.isIntersecting) activateIndex(entry.target);
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
      if (currentActiveIndex !== null) currentActiveIndex.classList.remove("active");
      // 引数で渡されたDOMが飛び先のaタグを選択し、activeクラスを付与
      const newActiveIndex = document.querySelector(`a[href="#${element.id}"]`);
      if (newActiveIndex) newActiveIndex.classList.add("active");
    }
  }, [router]);
  
  const formatDate = (data: string): string => {
    const beforeFormatDate = new Date(data);
    return `${beforeFormatDate.getFullYear()} / ${beforeFormatDate.getMonth() + 1} / ${beforeFormatDate.getDate()}`;
  }
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <article className={styles.article}>
            <h1 className={styles.title}>{postData.title.rendered}</h1>
            <span className={styles.published_at}>{locale(localeContext).post.publishedAt} {formatDate(postData.date)}
              <br className="on480"/><span
                className="off480inline">　</span>{formatDate(postData.date) === formatDate(postData.modified) ? "" : `${locale(localeContext).post.updatedAt} ${formatDate(postData.modified)}`}</span>
            <PostTransMenu translate_group={postData.translate_group}/>
            <PostCategoryAndTags categories={postData.categories} tags={postData.tags}/>
            <div className={styles.eyecatch}>
              <img src={postData.acf.eyecatch} alt=""/>
            </div>
            <div id="content" className={styles.content} dangerouslySetInnerHTML={{__html: postData.content.rendered}}/>
            <div className={styles.thanks}>
              <p>{locale(localeContext).post.thanks}</p>
            </div>
          </article>
        </div>
        <div className={styles.right}>
          <ContentIndex indexList={indexList}/>
        </div>
      </div>
      <Title title={locale(localeContext).nextPrev.title} subtitle={locale(localeContext).nextPrev.subtitle}/>
      <PrevAndNext id={Number(router.query.id)}/>
      <div className={styles.recommend}>
        <Title title={locale(localeContext).recommendation.title}
               subtitle={locale(localeContext).recommendation.subtitle}/>
        <Button path={`/${String(router.query.locale)}/allposts`}>{locale(localeContext).buttonText.toArchive}</Button>
        <Button path={`/${String(router.query.locale)}`}>{locale(localeContext).buttonText.toTop}</Button>
      </div>
    </>
  )
}

export default PostTemplate
