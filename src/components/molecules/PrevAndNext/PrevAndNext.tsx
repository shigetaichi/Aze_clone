import { FC, PropsWithChildren, useEffect, useState } from "react";
import styles from "./PrevAndNext.module.scss";
import Thumbnail from "components/molecules/Thumbnail/Thumbnail";
import { wpGenerateNextAndPrevArray } from "lib/post";
import { LocaleType, useLocaleContext } from "context/localeContext";

interface PrevAndNext {
  id: number;
}

const PrevAndNext: FC<PrevAndNext> = (props: PropsWithChildren<PrevAndNext>) => {
  const localeContext: LocaleType = useLocaleContext();
  const [prevAndNext, setPrevAndNext] = useState([]);
  
  const setData = async () => setPrevAndNext(await wpGenerateNextAndPrevArray(localeContext, props.id));
  
  useEffect(() => {
    setData().then(() => {
    });
    return () => {
    };
  }, [localeContext, props.id]);
  
  
  return (
    <div className={styles.prev_and_next}>
      <div className={styles.next}>
        <p className={styles.flag}>次の記事</p>
        {prevAndNext[1] ? (
          <Thumbnail
            id={prevAndNext[1].id}
            title={prevAndNext[1].title}
            image={prevAndNext[1].eyecatch}
            description={prevAndNext[1].description}
            tags={prevAndNext[1].tags}
          />
        ) : (
          <div className={styles.noContent}>この記事が最新の記事です</div>
        )}
      </div>
      <div className={styles.prev}>
        <p className={styles.flag}>前の記事</p>
        {prevAndNext[0] ? (
          <Thumbnail
            id={prevAndNext[0].id}
            title={prevAndNext[0].title}
            image={prevAndNext[0].eyecatch}
            description={prevAndNext[0].description}
            tags={prevAndNext[0].tags}
          />
        ) : (
          <div className={styles.noContent}>この記事が最初の記事です</div>
        )}
      </div>
    </div>
  )
}

export default PrevAndNext
