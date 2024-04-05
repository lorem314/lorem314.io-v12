import React, { useRef, useEffect, useState, useCallback } from "react"
import styled from "styled-components"

import useBoolean from "../../hooks/useBoolean"
import useDebounce from "../../hooks/useDebounce"
import { clsx } from "../../utils/css"

import { RiCloseFill } from "@react-icons/all-files/ri/RiCloseFill"
import { RiArrowDropDownFill } from "@react-icons/all-files/ri/RiArrowDropDownFill"
import { FaCaretDown } from "@react-icons/all-files/fa/FaCaretDown"
import { GiLogicGateAnd } from "@react-icons/all-files/gi/GiLogicGateAnd"
import { GiLogicGateOr } from "@react-icons/all-files/gi/GiLogicGateOr"

const Wrapper = styled.div`
  position: relative;

  > .select-input-group {
    outline-offset: var(--ui-text-input-outline-offset-focus);
    border-width: 1px;
    border-style: solid;
    border-color: var(--ui-text-input-border-color);
    border-radius: 0.25rem;
    background-color: var(--ui-text-input-bg);
    line-height: 1.5;

    display: flex;
    gap: 4px;

    &:focus-within {
      outline: 2px solid var(--ui-text-input-outline-color-focus);
      border-color: var(--ui-text-input-border-color-focus);
      box-shadow: var(--ui-text-input-box-shadow-focus);
    }

    > .selected-tags {
      align-self: stretch;
      flex: 0 0 auto;

      max-width: 180px;
      overflow: hidden;
      padding-left: 4px;

      display: flex;
      align-items: center;
      gap: 4px;

      > button {
        font-size: 82.5%;
        padding: 0.125rem 0.25rem;
      }
    }

    > input.tag-input {
      align-self: stretch;
      background-color: transparent;
      border: none;
      /* padding: 0.25rem; */
      box-shadow: none;

      &:focus {
        outline: none;
      }
    }

    > .actions {
      padding-right: 8px;

      display: flex;
      align-items: center;
      gap: 8px;

      > button {
        font-size: 1rem;
        font-family: monospace;
        font-weight: bold;
      }
    }
  }

  > ul.options {
    list-style: none;
    box-sizing: content-box;
    overflow: auto;
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};

    width: 100%;
    max-height: calc(4 * 2em);
    margin: 0;
    border: 1px solid var(--ui-text-input-border-color);
    border-radius: 0.25rem;
    padding: 0;
    background-color: var(--content-bg);

    position: absolute;
    top: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);

    > li {
      cursor: pointer;
      padding: 0 10px;
      height: 2em;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    > li.hovered {
      background-color: var(--ui-tag-bg-hover);
    }
    > li.selected {
      color: var(--app-contrast-color);
      background-color: var(--ui-tag-bg-selected);
    }
  }
`

const Select = ({
  options = [],
  selectedTags = [],
  onSelectTag = () => () => {},
  clearSelectedTags = () => {},
  isOrLogic = true,
  toggleFilterLogic = () => {},
}) => {
  const refSelectedTags = useRef(null)
  const refTagInput = useRef(null)
  const refOptions = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [term, setTerm] = useState("")
  const debouncedTerm = useDebounce(term)

  // close .options when click outside of it
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false)
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  // horizontally scroll on .selected-tags
  useEffect(() => {
    const nodeSelectedTags = refSelectedTags.current
    if (nodeSelectedTags) {
      const handleWheel = (event) => {
        if (event.deltaY === 0 || !event.shiftKey) return
        event.stopPropagation()
        event.preventDefault()
        nodeSelectedTags.scrollBy({ left: event.deltaY < 0 ? -30 : 30 })
      }
      nodeSelectedTags?.addEventListener("wheel", handleWheel, {
        passive: false,
      })
      return () => {
        nodeSelectedTags?.removeEventListener("wheel", handleWheel)
      }
    }
  }, [selectedTags])

  // tag input listens to key press
  useEffect(() => {
    const nodeTagInput = refTagInput.current
    const handleKeyDown = (event) => {
      if (event.target !== nodeTagInput) return
      switch (event.code) {
        case "Escape":
          // clearSelectedTags()
          setIsOpen(false)
          break
        case "Enter":
        case "NumpadEnter":
        case "Space":
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            if (hoveredIndex !== -1) {
              handleSelectTag(filteredOptions[hoveredIndex])(event)
            }
            setIsOpen(false)
          }
          // if (!event.shiftKey) setIsOpen(false)
          break
        case "ArrowUp":
        case "ArrowDown":
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            break
          }
          if (hoveredIndex === -1) {
            setHoveredIndex(() => 0)
          }
          const indexOffset = event.code === "ArrowDown" ? 1 : -1
          const newHoveredIndex = hoveredIndex + indexOffset
          if (newHoveredIndex >= 0 && newHoveredIndex < options.length) {
            setHoveredIndex(newHoveredIndex)
            const nodeOptions = refOptions.current
            event.target.parentNode.parentNode.querySelector("ul.options")
            const nodeNextHoveredLi = nodeOptions.querySelector(
              `li:nth-of-type(${newHoveredIndex + 1})`
            )
            switch (event.code) {
              case "ArrowUp":
                if (nodeNextHoveredLi.offsetTop < nodeOptions.scrollTop) {
                  nodeOptions.scrollTop = nodeNextHoveredLi.offsetTop
                }
                break
              case "ArrowDown":
                if (
                  nodeNextHoveredLi.offsetTop + nodeNextHoveredLi.offsetHeight >
                  nodeOptions.scrollTop + nodeOptions.clientHeight
                ) {
                  nodeOptions.scrollTop =
                    (newHoveredIndex - 3) * nodeNextHoveredLi.offsetHeight
                }
                break
              default:
                return
            }
          }
          return
        default:
          return
      }
    }
    nodeTagInput?.addEventListener("keydown", handleKeyDown)
    return () => {
      nodeTagInput?.removeEventListener("keydown", handleKeyDown)
    }
  }, [
    isOpen,
    hoveredIndex,
    options,
    selectedTags,
    onSelectTag,
    clearSelectedTags,
  ])

  const handleSelectTag = useCallback(
    (tag) => (event) => {
      event.stopPropagation()
      if (!event.shiftKey) setIsOpen(false)
      setTerm("")
      onSelectTag(tag)(event)
    },
    [onSelectTag]
  )

  // option, options event
  const handleMouseEnterOption = useCallback(
    (index) => () => setHoveredIndex(index),
    []
  )
  const handleMouseLeaveOptions = useCallback(() => setHoveredIndex(-1), [])

  const handleChangeTerm = useCallback((event) => {
    setHoveredIndex(-1)
    setTerm(event.target.value)
    setIsOpen(true)
  }, [])

  const toggleIsOpen = useCallback((event) => {
    event.stopPropagation()
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }, [])

  const filteredOptions = options.filter((option) => {
    if (debouncedTerm === "") return true
    return option.name.includes(debouncedTerm)
  })

  return (
    <Wrapper $isOpen={isOpen}>
      <label className="page-content-title" htmlFor="post-select">
        标签
      </label>

      <div className="select-input-group">
        {/*  */}

        {selectedTags.length === 0 ? null : (
          <div className="selected-tags" ref={refSelectedTags}>
            {selectedTags.map((selectedTag) => {
              return (
                <button
                  key={selectedTag.name}
                  onClick={handleSelectTag(selectedTag)}
                >
                  {selectedTag.name}
                </button>
              )
            })}
          </div>
        )}

        <input
          id="post-select"
          className="tag-input"
          type="text"
          ref={refTagInput}
          value={term}
          onChange={handleChangeTerm}
          placeholder="搜索标签..."
        />

        <div className="actions">
          <button
            className="svg-button input-button"
            aria-label="Clear Selected Tags"
            title="清除已选标签"
            onClick={clearSelectedTags}
          >
            <RiCloseFill />
          </button>
          <button
            className="svg-button input-button"
            aria-label="Toggle Filter Logic"
            title={isOrLogic ? "或筛选" : "与筛选"}
            onClick={toggleFilterLogic}
          >
            {/* {isOrLogic ? "||" : "&&"} */}
            {isOrLogic ? <GiLogicGateOr /> : <GiLogicGateAnd />}
          </button>
          <button
            className="svg-button input-button"
            aria-label="Open Options"
            title={isOpen ? "关闭" : "打开"}
            onClick={toggleIsOpen}
          >
            {/* <RiArrowDropDownFill /> */}
            <FaCaretDown />
          </button>
        </div>

        {/*  */}
      </div>

      <ul
        className="options"
        ref={refOptions}
        onMouseLeave={handleMouseLeaveOptions}
      >
        {filteredOptions.length === 0 ? (
          <li>no result</li>
        ) : (
          filteredOptions.map((option, index) => {
            const hovered = index === hoveredIndex
            const selected = selectedTags.includes(option)
            return (
              <li
                className={clsx({ hovered, selected })}
                key={option.name}
                onMouseEnter={handleMouseEnterOption(index)}
                onClick={handleSelectTag(option)}
              >
                <span>{option.name}</span>
                <span>{option.count}</span>
              </li>
            )
          })
        )}
      </ul>
    </Wrapper>
  )
}

export default Select
