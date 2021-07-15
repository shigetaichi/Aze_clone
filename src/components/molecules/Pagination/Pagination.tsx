import { FC, useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import { NextRouter, useRouter } from "next/router";
import styles from "./Pagination.module.scss";
import { LocaleType, useLocaleContext } from "contexts/localeContext";
import { generateRoute } from "lib/helpers";

interface PaginationProps {
  total: number;
  perPage: number;
}

const Pagination: FC<PaginationProps> = ({total, perPage}: PaginationProps) => {
  
  const router: NextRouter = useRouter();
  const current: string | string[] = router.query.page;
  const pageCount: number = Math.ceil(total / perPage);
  
  const [page, setPage] = useState<number>(1);
  
  const localeContext: LocaleType = useLocaleContext();
  
  const paginationHandler = (data: { selected: number }) => {
    router.push({
      pathname: generateRoute(localeContext, router),
      query: {
        page: data.selected + 1,
      },
    });
  };
  
  useEffect(() => {
    if (!Number(current)) {
      setPage(1)
    } else {
      setPage(Number(current))
    }
  }, [router.query]);
  
  return (
    <>
      <div className={styles.paginate_wrapper}>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
          forcePage={page - 1}
          containerClassName={styles.pagination}
          pageClassName={styles.page_item}
          pageLinkClassName={styles.item_link}
          activeClassName={styles.active}
          activeLinkClassName={styles.active_link}
          previousLabel={"<"}
          nextLabel={">"}
          previousClassName={styles.page_item}
          nextClassName={styles.page_item}
          previousLinkClassName={styles.item_link}
          nextLinkClassName={styles.item_link}
          disabledClassName={styles.disabled}
          breakLabel="..."
          breakClassName={styles.page_item}
          breakLinkClassName={styles.item_link}
          onPageChange={paginationHandler}
        />
      </div>
    </>
  );
}

export default Pagination;
