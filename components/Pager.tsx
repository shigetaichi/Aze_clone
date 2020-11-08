import React from 'react'

const Pager = (props) => {
  const { total, page, perPage, href, asCallback } = props;
  const prevPage = page > 1 ? page - 1 : null
  let nextPage = null
  if (page < Math.ceil(total / perPage)) {
    nextPage = page + 1
  }
  return (
    <div>
      
    </div>
  )
}

export default Pager
