import React from "react"
import styled from "styled-components"

const Wrapper = styled.ul.attrs({
  className: "all-tag",
})`
  list-style-type: none;
  margin: 0;
  padding: 10px;

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  > li {
    > input.tag-checkbox {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 0;
      height: 0;

      &:hover {
        & + .tag-label {
          /* color: var(--primary-color); */
          background-color: var(--ui-tag-bg-hover);
        }
      }
      &:focus {
        & + .tag-label {
          outline: 2px solid var(--primary-color);
        }
      }
      &:checked {
        & + .tag-label {
          color: var(--app-contrast-color);
          background-color: var(--ui-tag-bg-selected);
        }
      }
    }

    > label.tag-label {
      cursor: pointer;
      user-select: none;
      width: fit-content;
      line-height: 1.25rem;
      border-radius: 0.25rem;
      outline-offset: 2px;

      > .tag-name {
        border: 1px solid var(--primary-color);
        border-right: none;
        border-radius: 0.25rem 0 0 0.25rem;
        padding: 0.25rem 0.35rem;
      }

      > .tag-count {
        border: 1px solid var(--ui-tag-count-bg);
        border-radius: 0 0.25rem 0.25rem 0;
        padding: 0.25rem 0.35rem;
        color: var(--app-contrast-color);
        background-color: var(--ui-tag-count-bg);
      }
    }
  }
`

const AllTag = ({
  tags = [],
  selectedTags = [],
  onSelectTag = () => () => {},
}) => {
  const handleChange = () => {}
  return (
    <Wrapper>
      {tags.map((tag) => {
        const id = `tag-${tag.name}`
        const checked = selectedTags.includes(tag)
        return (
          <li key={id}>
            <input
              className="tag-checkbox"
              type="checkbox"
              id={id}
              checked={checked}
              // value={tag.name}
              onClick={onSelectTag(tag)}
              onChange={handleChange}
            />
            <label className="tag-label" htmlFor={id}>
              <span className="tag-name">{tag.name}</span>
              <span className="tag-count">{tag.count}</span>
            </label>
          </li>
        )
      })}
    </Wrapper>
  )
}

export default AllTag
