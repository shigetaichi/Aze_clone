import styles from './ContentIndex.module.scss';
import { ThemeContext, useThemeContext } from "contexts/context";
import ClassNames from 'classnames';
import { FC, PropsWithChildren } from "react";

interface ContentIndexProps {
  indexList: Array<Element>;
}

const ContentIndex: FC<ContentIndexProps> = (props: PropsWithChildren<ContentIndexProps>) => {
  const themeNames: ThemeContext = useThemeContext();
  
  const indexList: Array<Element> = props.indexList;
  
  function getCoords(elem: HTMLElement): {
    top: number,
    left: number,
  } {
    let box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }
  
  const scrollFromIndex = (e, id) => {
    // すでにアクティブになっている目次を選択
    const currentActiveIndex = document.querySelector("#content-index-wrapper .active");
    // すでにアクティブになっているものが0個の時（=null）以外は、activeクラスを除去
    if (currentActiveIndex !== null) currentActiveIndex.classList.remove("active");
    // クリックした目次の箇所にactiveクラスを付与
    e.target.classList.add('active');
    const element: HTMLElement = document.getElementById(`${id}`);
    const coordinate = getCoords(element);
    scrollTo(coordinate.left, coordinate.top);
  }
  
  const contentIndexStyle = ClassNames(styles.content_index_aside, {
    [styles.content_index_aside_dark]: themeNames.themeName === "dark",
  })
  
  return (
    <>
      <aside className={contentIndexStyle}>
        <ul id="content-index-wrapper" className={styles.ul}>
          <span className={styles.content_index_span}>目次 - index -</span>
          {indexList.map((index: Element, i: number) => (
            <li key={i} className={index.tagName === 'H2' ? styles.li : `${styles.li} ${styles.index_h3}`}>
              <a
                href={`#${index.getAttribute('id')}`}
                onClick={(e) => scrollFromIndex(e, index.getAttribute('id'))}
              >{index.innerHTML}</a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  )
}

export default ContentIndex;
