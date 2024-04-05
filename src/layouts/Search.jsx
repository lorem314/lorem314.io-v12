import React from "react"
import styled from "styled-components"

import { FaSearch } from "@react-icons/all-files/fa/FaSearch"

const Wrapper = styled.div`
  flex-grow: 1;

  display: flex;
  justify-content: center;

  > .global-search-button {
    flex: 0 1 32rem;

    margin: 0;
    border: none;
    border-radius: 1rem;
    padding: 0.35rem 0.75rem;

    font-size: smaller;
    color: inherit;
    background-color: rgba(0, 0, 0, 0.1);

    display: flex;
    align-items: center;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }

    > .search-text {
      padding: 0 0.5rem;
      flex-grow: 1;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      > .search-label {
      }
      > .kbds {
      }
    }
  }
`

const Search = () => {
  return (
    <Wrapper>
      <button className="global-search-button">
        <FaSearch />
        <div className="search-text">
          <span className="search-label">搜索</span>
          <span className="kbds">
            <kbd>Ctrl</kbd>
            <kbd>K</kbd>
          </span>
        </div>
      </button>
    </Wrapper>
  )
}

export default Search
