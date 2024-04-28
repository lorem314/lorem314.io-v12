import React from "react"
import styled from "styled-components"

import { RiCloseFill } from "@react-icons/all-files/ri/RiCloseFill"

const Wrapper = styled.div`
  margin: 10px;
  width: 100%;
  max-width: 32rem;
  border-radius: 0.25rem;
  background-color: var(--content-bg);

  display: flex;
  flex-direction: column;
  overflow: auto;

  > header {
    padding: 10px;

    display: flex;
    align-items: center;
    gap: 10px;

    --svg-icon-size: 1.5rem;
    > .svg-button {
      > svg {
        opacity: 0.5;
      }
      &:hover {
        > svg {
          opacity: 0.75;
        }
      }
    }
  }

  > ul {
    flex: 1 1 auto;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: auto;

    > li {
      margin: 10px 0;
      text-align: center;
    }
  }

  > footer {
    padding: 10px;
  }
`

const SearchModal = ({ onCloseModal = () => {} }) => {
  return (
    <Wrapper>
      <header>
        <input type="search" name="" id="" />
        <button className="svg-button" onClick={onCloseModal}>
          <RiCloseFill />
        </button>
      </header>
      <ul>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
      </ul>
      <footer>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae,
          sequi qui expedita labore tempora assumenda eaque.
        </div>
      </footer>
    </Wrapper>
  )
}

export default SearchModal
