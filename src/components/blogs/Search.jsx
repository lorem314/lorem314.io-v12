import React from "react"

const Search = ({ searchTerm = "", handleChangeSearchTerm = () => {} }) => {
  return (
    <div>
      <label className="page-content-title" htmlFor="post-search">
        搜索
      </label>
      <input
        type="text"
        id="post-search"
        placeholder="搜索标题..."
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
    </div>
  )
}

export default Search
