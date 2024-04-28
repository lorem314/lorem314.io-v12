import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Tooltip from "../ui/Tooltip"

import { FaHome } from "@react-icons/all-files/fa/FaHome"
import { RiArticleFill } from "@react-icons/all-files/ri/RiArticleFill"
import { FaBook } from "@react-icons/all-files/fa/FaBook"
import { RiSettings3Fill } from "@react-icons/all-files/ri/RiSettings3Fill"

const Wrapper = styled.div`
  flex: 1 1 auto;
  height: 100%;
  overflow: auto;
  background-color: var(--bg-1);

  display: flex;

  > nav {
    flex: 0 0 50px;

    padding: 10px 0 0;
    overflow: auto;
    background-color: var(--bg-0);

    > ul.route-list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;

      > li {
        display: flex;

        > a.route-link {
          --svg-icon-size: 18px;
          border-radius: 50%;
          padding: 0.5rem;

          color: var(--ui-button-color);
          background-color: var(--ui-button-bg);

          &:hover {
            background-color: var(--ui-button-bg-hover);
          }

          &.active {
            color: var(--ui-button-color-active);
            background-color: var(--ui-button-bg-active);
          }
        }
      }
    }
  }

  > section {
    flex: 1 1 auto;
    margin: 10px 10px 0;
    overflow: auto;
    padding: 10px 10px 0;
    border-radius: 0.25rem;
    box-shadow: 0 1px 0 1px var(--content-box-shadow);

    color: var(--content-color-1);
    background-color: var(--content-bg);
  }
`

const Sidebar = () => {
  return (
    <Wrapper>
      <nav>
        <ul className="layout-list route-list">
          {routes.map(({ title, path, partiallyActive, Icon }) => {
            return (
              <li key={title}>
                <Tooltip tip={title} position="right">
                  <Link
                    className="route-link"
                    activeClassName="active"
                    to={path}
                    partiallyActive={partiallyActive}
                  >
                    <Icon />
                  </Link>
                </Tooltip>
              </li>
            )
          })}
        </ul>
      </nav>
      <section>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, tenetur!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, tenetur!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, tenetur!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, tenetur!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, tenetur!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, tenetur!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, tenetur!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, tenetur!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, tenetur!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, tenetur!
        </p>
      </section>
    </Wrapper>
  )
}

export default Sidebar

const routes = [
  {
    Icon: FaHome,
    title: "主页",
    path: "/",
    partiallyActive: false,
  },
  {
    Icon: RiArticleFill,
    title: "博客",
    path: "/blogs",
    partiallyActive: true,
  },
  {
    Icon: FaBook,
    title: "书籍",
    path: "/books",
    partiallyActive: true,
  },
  // {
  //   Icon: (props) => <CodeIcon {...props} />,
  //   title: "代码",
  //   path: "/code",
  //   partiallyActive: true,
  // },
  // {
  //   Icon: FaToolbox,
  //   title: "工具",
  //   path: "/tool",
  //   partiallyActive: true,
  // },
  {
    Icon: RiSettings3Fill,
    title: "设置",
    path: "/setting",
    partiallyActive: true,
  },
]
