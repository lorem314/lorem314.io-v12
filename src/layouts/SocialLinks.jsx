import React from "react"
import styled from "styled-components"

import Tooltip from "../ui/Tooltip"

import { RiBilibiliFill } from "@react-icons/all-files/ri/RiBilibiliFill"
import { RiCodepenFill } from "@react-icons/all-files/ri/RiCodepenFill"
import { RiGithubFill } from "@react-icons/all-files/ri/RiGithubFill"
import { FiCodesandbox } from "@react-icons/all-files/fi/FiCodesandbox"

export const links = [
  {
    title: "Bilibili",
    path: "/",
    Icon: RiBilibiliFill,
  },
  {
    title: "CodeSandbox",
    path: "/",
    Icon: FiCodesandbox,
  },
  {
    title: "Codepen",
    path: "/",
    Icon: RiCodepenFill,
  },
  {
    title: "Github",
    path: "/",
    Icon: RiGithubFill,
  },
]

const Wrapper = styled.ul.attrs({
  className: "layout-list",
})`
  display: flex;
  align-items: center;
  gap: 10px;

  .link {
    --svg-icon-size: 18px;
    color: inherit;
    text-decoration: none;

    display: flex;
    align-items: center;
    gap: 2px;

    &:hover {
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 845px) {
    .link {
      --svg-icon-size: 24px;
      padding: 0.25rem;
      border-radius: 0.25rem;
      background-color: var(--ui-button-bg);

      &:hover {
        background-color: var(--ui-button-bg-hover);
      }

      > .link-title {
        display: none;
      }
    }
  }
`

const SocialLinks = () => {
  return (
    <Wrapper>
      {links.map(({ title, path, Icon }) => {
        return (
          <li key={title}>
            <Tooltip tip={title} position="bottom">
              <a
                className="link"
                href={path}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
                <span className="link-title">{title}</span>
              </a>
            </Tooltip>
          </li>
        )
      })}
    </Wrapper>
  )
}

export default React.memo(SocialLinks)
