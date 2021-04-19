import { FC } from "react";
import { locale, LocaleType, useLocaleContext } from "context/localeContext";
import { Button, LangToggler3, Title } from "../../index";

const IndexPage: FC = () => {
  const localeContext: LocaleType = useLocaleContext();
  return (
    <>
      <div className={""}>
        <p style={{display: "none",}}>Dear S.K.</p>
        {locale(localeContext).top.description.map((p: string, i: number) => <p key={i}>{p}</p>)}
        <LangToggler3/>
      </div>
      <Title
        title={locale(localeContext).selectedEight.title}
        subtitle={locale(localeContext).selectedEight.subtitle}
      />
      {/*<PostFlex thumbnailDataArray={thumbnailDataArraySelected} isPaginate={false}/>*/}
      <div className="module-spacer--medium"/>
      <div className="module-spacer--medium"/>
      <Title
        title={locale(localeContext).posts.title}
        subtitle={locale(localeContext).posts.subtitle}
      />
      {/*<PostFlex thumbnailDataArray={thumbnailDataArray} perPage={8} isPaginate={true}/>*/}
      <div className="module-spacer--medium"/>
      <Button path={"/allposts"}>{locale(localeContext).buttonText.toArchive} </Button>
      <div className="module-spacer--medium"/>
      <div className="module-spacer--medium"/>
      <div className="module-spacer--medium"/>
    </>
  )
}

export default IndexPage
