import { FC, PropsWithChildren, useEffect, useState } from "react";
import Title from "components/atom/Title/Title";
import { locale, LocaleType, useLocaleContext } from "context/localeContext";
import PostList from "components/organism/PostList/PostList";
import Button from "components/atom/Button/Button";
import { NextRouter, useRouter } from "next/router";
import Pagination from "../../molecules/Pagination/Pagination";
import { perPage, wpBaseUrl } from "../../../lib/post";

interface Props {
  catName: string;
  thumbnailDataArray: Array<any>;
}

const Category: FC<Props> = (props: PropsWithChildren<Props>) => {
  const router: NextRouter = useRouter();
  const localeContext: LocaleType = useLocaleContext();
  const [total, setTotal] = useState(0);
  const [paginateVisible, setPaginateVisible] = useState<boolean>(false);
  
  const getTotal = () => {
    if (localeContext !== String(router.query.locale)) return;
    fetch(`${wpBaseUrl}/wp-json/wp/v2/posts?categories=${Number(router.query.category)}&lang=${localeContext}`).then(res => {
      setTotal(Number(res.headers.get('X-WP-Total')));
      setPaginateVisible(true);
    })
  }
  
  useEffect(() => {
    getTotal();
    return () => {
    };
  }, [localeContext]);
  
  return (
    <>
      <Title title={props.catName} subtitle={locale(localeContext).categoryArchive.subtitle}/>
      <PostList thumbnailDataArray={props.thumbnailDataArray}/>
      {paginateVisible && (<Pagination perPage={perPage} total={total}/>)}
      <Button path={`/${String(router.query.locale)}`}>{locale(localeContext).buttonText.toArchive}</Button>
    </>
  )
}

export default Category
