import { FC, PropsWithChildren } from "react";
import Title from "components/atom/Title/Title";
import { locale, LocaleType, useLocaleContext } from "context/localeContext";
import PostList from "components/organism/PostList/PostList";
import Button from "components/atom/Button/Button";
import { NextRouter, useRouter } from "next/router";

interface Props {
  catName: string;
  thumbnailDataArray: Array<any>;
}

const Category: FC<Props> = (props: PropsWithChildren<Props>) => {
  const router: NextRouter = useRouter();
  const localeContext: LocaleType = useLocaleContext();
  return (
    <>
      <Title title={props.catName} subtitle={locale(localeContext).categoryArchive.subtitle}/>
      <PostList thumbnailDataArray={props.thumbnailDataArray}/>
      <Button path={`/${String(router.query.locale)}`}>{locale(localeContext).buttonText.toArchive}</Button>
    </>
  )
}

export default Category
