import { NextPage } from "next";
import styles from "styles/index.module.scss";
import Link from "next/link";
import Title from "components/atoms/Title/Title";
import { Dispatch, SetStateAction } from "react";
import { LocaleType, useSetLocaleContext } from "contexts/localeContext";

const Index: NextPage = () => {
  const setLocaleContext: Dispatch<SetStateAction<LocaleType>> = useSetLocaleContext();
  return (
    <>
      <Title
        title={"Choose languages"}
        subtitle={"We have 3 language options!!"}
      />
      <div className={styles.main}>
        <div className={styles.each} onClick={() => setLocaleContext('ja')}>
          <Link href={"/ja"}>
            <a className={styles.text}>日本語</a>
          </Link>
        </div>
        <div className={styles.each} onClick={() => setLocaleContext('az')}>
          <Link href={"/az"}>
            <a className={styles.text}>azerbaycan</a>
          </Link>
        </div>
        <div className={styles.each} onClick={() => setLocaleContext('en')}>
          <Link href={"/en"}>
            <a className={styles.text}>English</a>
          </Link>
        </div>
        {/*<div className={styles.each} onClick={() => setLocaleContext('ru')}>*/}
        {/*  <Link href={"/ru"}>*/}
        {/*    <p className={styles.text}>русский</p>*/}
        {/*  </Link>*/}
        {/*</div>*/}
      </div>
    </>
  )
}

export default Index
