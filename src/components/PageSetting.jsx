import React, { useLayoutEffect, useRef } from "react"
import styled from "styled-components"

import useTheme from "../hooks/useTheme"
import { useGlobalContext } from "../GlobalContext"

import { showNotification } from "../ui/Notification"

const Wrapper = styled.section`
  max-width: 32rem;
  background-color: var(--content-bg);

  margin: 2rem auto;
  border: 1px solid var(--content-border-color);
  border-radius: 0.25rem;
  padding: 0 1rem 1rem;
`

const PageSetting = () => {
  const { theme, changeTheme } = useTheme()
  const {
    isLayoutSidebarAlwaysCollapsed,
    setIsLayoutSidebarAlwaysCollapsed,
    isRightDrawersAlwaysCollapsed,
    setIsRightDrawersAlwaysCollapsed,
  } = useGlobalContext()

  const refIsRightDrawersAlwaysCollapsed = useRef(null)

  useLayoutEffect(() => {
    const isAllTrue = Object.values(isRightDrawersAlwaysCollapsed).every(
      (b) => b === true
    )
    const isAllFalse = Object.values(isRightDrawersAlwaysCollapsed).every(
      (b) => b === false
    )
    if (isAllTrue) {
      refIsRightDrawersAlwaysCollapsed.current.checked = true
      refIsRightDrawersAlwaysCollapsed.current.indeterminate = false
    } else if (isAllFalse) {
      refIsRightDrawersAlwaysCollapsed.current.checked = false
      refIsRightDrawersAlwaysCollapsed.current.indeterminate = false
    } else {
      refIsRightDrawersAlwaysCollapsed.current.checked = true
      refIsRightDrawersAlwaysCollapsed.current.indeterminate = true
    }
  }, [isRightDrawersAlwaysCollapsed])

  const handleChangeRoot = (event) => {
    if (event.target !== refIsRightDrawersAlwaysCollapsed.current) return

    setIsRightDrawersAlwaysCollapsed((prevIsRightDrawersAlwaysCollapsed) => {
      const isAllTrue = Object.values(prevIsRightDrawersAlwaysCollapsed).every(
        (b) => b
      )
      if (isAllTrue) {
        refIsRightDrawersAlwaysCollapsed.current.checked = false
        refIsRightDrawersAlwaysCollapsed.current.indeterminate = false
        return Object.keys(prevIsRightDrawersAlwaysCollapsed).reduce(
          (nextIsRightDrawersAlwaysCollapsed, key) => ({
            ...nextIsRightDrawersAlwaysCollapsed,
            [key]: false,
          }),
          {}
        )
      } else {
        refIsRightDrawersAlwaysCollapsed.current.checked = true
        refIsRightDrawersAlwaysCollapsed.current.indeterminate = false
        return Object.keys(prevIsRightDrawersAlwaysCollapsed).reduce(
          (nextIsRightDrawersAlwaysCollapsed, key) => ({
            ...nextIsRightDrawersAlwaysCollapsed,
            [key]: true,
          }),
          {}
        )
      }
    })
  }

  const handleChangeSubCheckbox = (key) => (event) => {
    setIsRightDrawersAlwaysCollapsed((prevIsRightDrawersAlwaysCollapsed) => {
      return {
        ...prevIsRightDrawersAlwaysCollapsed,
        [key]: event.target.checked,
      }
    })
  }

  return (
    <Wrapper>
      <h2>设置</h2>

      <label htmlFor="is-layout-sidebar-always-collapsed">
        <input
          type="checkbox"
          id="is-layout-sidebar-always-collapsed"
          checked={isLayoutSidebarAlwaysCollapsed}
          onChange={(event) => {
            setIsLayoutSidebarAlwaysCollapsed(event.target.checked)
          }}
        />
        总是折叠左侧抽屉
      </label>

      <label htmlFor="always-collapse-right-drawer_all-page">
        <input
          type="checkbox"
          id="always-collapse-right-drawer_all-page"
          ref={refIsRightDrawersAlwaysCollapsed}
          onChange={handleChangeRoot}
        />
        总是折叠所有页面右侧抽屉
      </label>
      <ul
        style={{ listStyleType: "none", margin: "0", paddingLeft: "1.25rem" }}
      >
        <li>
          <label htmlFor="always-collapse-right-drawer_page-blogs">
            <input
              type="checkbox"
              id="always-collapse-right-drawer_page-blogs"
              checked={isRightDrawersAlwaysCollapsed["/blogs"]}
              onChange={handleChangeSubCheckbox("/blogs")}
            />
            总是折叠<strong>博客</strong>页面右侧抽屉
          </label>
        </li>
        <li>
          <label htmlFor="always-collapse-right-drawer_template-blog-post">
            <input
              type="checkbox"
              id="always-collapse-right-drawer_template-blog-post"
              checked={isRightDrawersAlwaysCollapsed["/blogs/.*"]}
              onChange={handleChangeSubCheckbox("/blogs/.*")}
            />
            总是折叠<strong>博客文章</strong>页面右侧抽屉
          </label>
        </li>
        <li>
          <label htmlFor="always-collapse-right-drawer_template-book-chapter">
            <input
              type="checkbox"
              id="always-collapse-right-drawer_template-book-chapter"
              checked={isRightDrawersAlwaysCollapsed["/books/.*?/.*"]}
              onChange={handleChangeSubCheckbox("/books/.*?/.*")}
            />
            总是折叠<strong>书籍章节</strong>页面右侧抽屉
          </label>
        </li>
      </ul>

      <br />
      <label htmlFor="preferred-theme" style={{ alignItems: "baseline" }}>
        风格
        <select
          name="preferred-theme"
          id="preferred-theme"
          value={theme}
          onChange={(event) => {
            changeTheme(event.target.value)
          }}
        >
          <option value="system">系统</option>
          <option value="light">浅色</option>
          <option value="dark">深色</option>
        </select>
      </label>
      <br />
      <button
        onClick={() => {
          showNotification({
            body: "测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息",
            duration: 1000 * 5,
          })
        }}
      >
        发送通知
      </button>
    </Wrapper>
  )
}

export default PageSetting
