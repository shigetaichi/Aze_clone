import { FC } from "react";
import { lang, LangContext, useLangContext } from "context/langContext";
import { Button, CategoryAreaWp, LangToggler3, PostFlex, TagArea, Title } from "../../index";
import Layout from "../../organism/Layout/Layout";

const IndexPage: FC = () => {
  const langTheme: LangContext = useLangContext();
  return (
    <>
    <div className={""}>
      <p style={{display: "none",}}>Dear S.K.</p>
      {lang(langTheme.langName).top.description.map((p: string, i: number) => <p key={i}>{p}</p>)}
      <LangToggler3/>
    </div>
  <Title
    title={lang(langTheme.langName).selectedEight.title}
    subtitle={lang(langTheme.langName).selectedEight.subtitle}
  />
  {/*<PostFlex thumbnailDataArray={thumbnailDataArraySelected} isPaginate={false}/>*/}
  <div className="module-spacer--medium"/>
  <div className="module-spacer--medium"/>
  <Title
    title={lang(langTheme.langName).posts.title}
    subtitle={lang(langTheme.langName).posts.subtitle}
  />
  {/*<PostFlex thumbnailDataArray={thumbnailDataArray} perPage={8} isPaginate={true}/>*/}
  <div className="module-spacer--medium"/>
  <Button path={"/allposts"}>{lang(langTheme.langName).buttonText.toArchive} </Button>
  <div className="module-spacer--medium"/>
  <div className="module-spacer--medium"/>
  <div className="module-spacer--medium"/>
    </>
  )
}

export default IndexPage
