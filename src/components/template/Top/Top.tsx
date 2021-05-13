import { FC, PropsWithChildren, useEffect, useState } from "react";
import { locale, LocaleType, useLocaleContext } from "context/localeContext";
import Title from "components/atom/Title/Title";
import Button from "components/atom/Button/Button";
import LangSelect from "components/atom/LangSelect/LangSelect";
import styles from "./Top.module.scss";
import PostList from "components/organism/PostList/PostList";
import { NextRouter, useRouter } from "next/router";
import { perPage, wpBaseUrl } from "lib/post";
import Pagination from "components/molecules/Pagination/Pagination";

interface TopProps {
  arraySelected: Array<any>;
  topArray: Array<any>;
}

const Top: FC<TopProps> = (props: PropsWithChildren<TopProps>) => {
  const router: NextRouter = useRouter();
  const localeContext: LocaleType = useLocaleContext();
  
  const [total, setTotal] = useState(0);
  const [paginateVisible, setPaginateVisible] = useState<boolean>(false);
  
  useEffect(() => {
    fetch(`${wpBaseUrl}/wp-json/wp/v2/posts?lang=${localeContext}`).then(res => {
      setTotal(Number(res.headers.get('X-WP-Total')));
      setPaginateVisible(true);
    })
    return () => {
    };
  }, [router]);
  
  return (
    <>
      <div className={styles.indexStatement}>
        <div className={styles.left}>
          <p style={{display: "none",}}>Dear S.K.</p>
          {locale(localeContext).top.description.map((p: string, i: number) => <p key={i}>{p}</p>)}
        </div>
        <div className={styles.right}>
          <LangSelect/>
        </div>
      </div>
      
      <Title
        title={locale(localeContext).selectedEight.title}
        subtitle={locale(localeContext).selectedEight.subtitle}
      />
      <PostList thumbnailDataArray={props.arraySelected}/>
      <Title
        title={locale(localeContext).posts.title}
        subtitle={locale(localeContext).posts.subtitle}
      />
      <PostList thumbnailDataArray={props.topArray}/>
      {paginateVisible && (<Pagination perPage={perPage} total={total}/>)}
      <Button path={`/${String(router.query.locale)}/allposts`}>{locale(localeContext).buttonText.toArchive}</Button>
    </>
  )
}

export default Top
