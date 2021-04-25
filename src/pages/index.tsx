import { NextPage } from "next";
import styles from "styles/index.module.scss";
import Link from "next/link";
import Title from "components/atom/Title/Title";
import { Dispatch, SetStateAction } from "react";
import { LocaleType, useSetLocaleContext } from "context/localeContext";

const Index: NextPage = () => {
  const setLocaleContext: Dispatch<SetStateAction<LocaleType>> = useSetLocaleContext();
  return (
    <>
      <Title
        title={"Choose languages"}
        subtitle={"We have 4 language options!!"}
      />
      <div className={styles.main}>
        <div className={styles.each} onClick={() => setLocaleContext('ja')}>
          <Link href={"/ja"}>
            <p className={styles.text}>日本語</p>
          </Link>
        </div>
        <div className={styles.each} onClick={() => setLocaleContext('az')}>
          <Link href={"/az"}>
            <p className={styles.text}>azerbaycan</p>
          </Link>
        </div>
        <div className={styles.each} onClick={() => setLocaleContext('en')}>
          <Link href={"/en"}>
            <p className={styles.text}>English</p>
          </Link>
        </div>
        <div className={styles.each} onClick={() => setLocaleContext('ru')}>
          <Link href={"/ru"}>
            <p className={styles.text}>русский</p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Index
