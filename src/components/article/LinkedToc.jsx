import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  cloneElement,
} from "react"
import styled from "styled-components"

import { justStopPropagation } from "../../utils/event"
import { VscCollapseAll } from "@react-icons/all-files/vsc/VscCollapseAll"
import { VscExpandAll } from "@react-icons/all-files/vsc/VscExpandAll"
import { VscChevronDown } from "@react-icons/all-files/vsc/VscChevronDown"
import { VscChevronRight } from "@react-icons/all-files/vsc/VscChevronRight"

const Wrapper = styled.div.attrs({
  className: "linked-toc",
  id: "linked-toc",
})`
  --border-style: dashed;
  --border-color: red;
  --svg-icon-size: 16px;

  overflow: auto;
  padding: 10px;
  background-color: var(--content-bg);

  .toc-title {
    margin: 0;
    font-size: 1rem;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    > li {
      line-height: 1.5;
      position: relative;
      margin-left: calc(0.5em - 1px);
      border-left: 1px dashed grey;
      padding-left: 0.75em;

      &::before {
        position: absolute;
        top: 1px;
        left: 0;
        content: " ";
        width: 0.5em;
        height: 0.75em;
        /* border-left: 1px solid red; */
        border-bottom: 1px dashed grey;
      }
    }

    > li:last-child {
      border-left: none;
      border-left: 1px solid transparent;
      &::before {
        position: absolute;
        top: 1px;
        left: 0;
        content: " ";
        height: calc(0.75em - 1px);
        border-left: 1px dashed gray;
        transform: translateX(-1px);
      }
      &::after {
        position: absolute;
        top: 0;
        left: 0;
        content: " ";
        width: 0.5em;
        height: 0.75em;
        border-bottom: 1px dashed gray;
      }
    }
  }
`

const DetailsHead = styled.div`
  flex-grow: 1;
  position: relative;
  line-height: 1.5;

  display: flex;
  align-items: flex-start;

  &::before {
    content: " ";
    height: calc(100% - 24px);
    position: absolute;
    top: 24px;
    left: -17px;
    border-left: 1px dashed gray;
  }

  > .title-container {
    flex-grow: 1;
  }

  > button {
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    /* border: 1px solid red; */
    background-color: transparent;
  }
`

const LinkedToc = ({ tableOfContents }) => {
  const parsedToc = JSON.parse(tableOfContents)
  console.log({ parsedToc })
  return (
    <Wrapper>
      <Details>
        <DetailsHead>
          <h1 className="toc-title">目录</h1>
        </DetailsHead>
        <Items items={parsedToc.items} />
      </Details>
    </Wrapper>
  )
}

export default LinkedToc

const Items = ({ items, level = 0 }) => {
  if (items?.length === 0) return null
  return (
    <ul>
      {items.map((item, index) => {
        return (
          <li key={index}>
            <Item item={item} level={level} />
          </li>
        )
      })}
    </ul>
  )
}
const Item = ({ item, level }) => {
  const hashtagLink = encodeURIComponent(item.title)
  if (item?.items.length === 0) {
    return <a href={`#${hashtagLink}`}>{item.title}</a>
  }
  return (
    <Details isOpen={true}>
      <DetailsHead>
        <div className="title-container">
          <a
            className="toc-title"
            href={`#${hashtagLink}`}
            onClick={justStopPropagation}
          >
            {item.title}
          </a>
        </div>
        <button aria-label="Collapse All">
          <VscCollapseAll />
        </button>
        <button aria-label="Expand All">
          <VscExpandAll />
        </button>
      </DetailsHead>
      <Items items={item.items} level={level + 1} />
    </Details>
  )
}

const DetailsWrapper = styled.details`
  > summary {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    user-select: none;

    &::marker,
    &::-webkit-details-marker {
      display: none;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);

      > button {
        color: black;
      }
    }

    > button {
      flex: 0 0 auto;
      /* margin-left: -2px; */
      --svg-icon-size: 1.125rem;
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      background-color: transparent;
      /* background-color: rgba(0, 0, 0, 0.1); */
      color: gray;
      align-items: center;

      &:hover {
        color: black;
      }
    }
  }
`
const Details = (props) => {
  const { children } = props
  const [isOpen, setIsOpen] = useState(true)

  const open = (event) => {
    event?.preventDefault()
    setIsOpen(true)
  }
  const close = (event) => {
    event?.preventDefault()
    setIsOpen(false)
  }

  return (
    <DetailsWrapper open={isOpen}>
      <summary onClick={isOpen ? close : open}>
        <button tabIndex={-1} onClick={isOpen ? close : open}>
          {isOpen ? <VscChevronDown /> : <VscChevronRight />}
        </button>
        {cloneElement(children[0], {})}
      </summary>
      {children[1]}
    </DetailsWrapper>
  )
}
