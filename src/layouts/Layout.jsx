import React, { useCallback, useMemo, useState } from "react"
import styled from "styled-components"

import { AiFillTags } from "@react-icons/all-files/ai/AiFillTags"
import { VscListTree } from "@react-icons/all-files/vsc/VscListTree"

import Header from "./Header"
import Sidebar from "./Sidebar"
import Logo from "./Logo"
import Footer from "./Footer"

import Drawer from "../ui/Drawer"
import useDrawer from "../hooks/useDrawer"
import DrawerHead from "../styled/DrawerHead"

import { useGlobalContext } from "../GlobalContext"
import GlobalStyle, { bp, size } from "../styled/GlobalStyle"

const Wrapper = styled.div`
  > .sidebar-container {
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    width: ${({ $layoutSidebarWidth }) => `${$layoutSidebarWidth}px`};
  }

  > main {
    padding: 0 10px;

    position: absolute;
    top: 50px;
    right: 0;
    bottom: 0;
    left: ${({
      $isLayoutSidebarAlwaysCollapsed,
      $isLayoutSidebarCollapsed,
      $layoutSidebarWidth,
    }) =>
      $isLayoutSidebarAlwaysCollapsed || $isLayoutSidebarCollapsed
        ? "0"
        : `${$layoutSidebarWidth}px`};

    color: var(--content-color-1);
    background-color: var(--bg-0);
    overflow: auto;
    scroll-behavior: smooth;

    > .page-container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: auto;
      scroll-behavior: smooth;

      padding: 0 10px;
      background-color: var(--bg-0);

      &:fullscreen {
        > * {
          max-width: 100%;
        }
      }
    }
  }
`

const Layout = ({ children, location }) => {
  const {
    isLayoutSidebarAlwaysCollapsed,
    isRightDrawersAlwaysCollapsed,
    layoutSidebarWidth,
    setLayoutSidebarWidth,
  } = useGlobalContext()

  // console.log("layoutSidebarWidth", layoutSidebarWidth)
  // const [layoutSidebarWidth, setLayoutSidebarWidth] = useState(320)

  const {
    isCollapsed: isLayoutSidebarCollapsed,
    isOpen: isLayoutSidebarOpen,
    handleOpen: handleLayoutSidebarOpen,
    handleClose: handleLayoutSidebarClose,
  } = useDrawer({
    isAlwaysCollapsed: isLayoutSidebarAlwaysCollapsed,
    breakPoint: bp.collapseLayoutSidebar,
  })

  const [rightDrawerBreakPoint, RightDrawerIcon] =
    getRightDrawerBreakPointAndIcon(location)

  const matched = useMemo(
    () =>
      Object.keys(isRightDrawersAlwaysCollapsed).find((regex) =>
        location.pathname.match(`^${regex}$`)
      ),
    [isRightDrawersAlwaysCollapsed, location.pathname]
  )
  const isRightDrawerAlwaysCollapsed = useMemo(
    () => isRightDrawersAlwaysCollapsed[matched],
    [matched]
  )

  const {
    isCollapsed: isRightDrawerCollapsed,
    isOpen: isRightDrawerOpen,
    handleOpen: openRightDrawer,
    handleClose: closeRightDrawer,
  } = useDrawer({
    isAlwaysCollapsed: isRightDrawerAlwaysCollapsed,
    breakPoint: rightDrawerBreakPoint,
  })

  const cachedSidebar = useMemo(() => <Sidebar />, [])

  return typeof window === "undefined" ? null : (
    <Wrapper
      $isLayoutSidebarAlwaysCollapsed={isLayoutSidebarAlwaysCollapsed}
      $isLayoutSidebarCollapsed={isLayoutSidebarCollapsed}
      $layoutSidebarWidth={320}
    >
      <GlobalStyle />

      <Header
        isLayoutSidebarAlwaysCollapsed={isLayoutSidebarAlwaysCollapsed}
        isLayoutSidebarCollapsed={isLayoutSidebarCollapsed}
        openLayoutSidebar={handleLayoutSidebarOpen}
        RightDrawerIcon={RightDrawerIcon}
        isRightDrawerAlwaysCollapsed={isRightDrawerAlwaysCollapsed}
        isRightDrawerCollapsed={isRightDrawerCollapsed}
        openRightDrawer={openRightDrawer}
      />

      {isLayoutSidebarAlwaysCollapsed || isLayoutSidebarCollapsed ? (
        <Drawer
          size={layoutSidebarWidth}
          isOpen={isLayoutSidebarOpen}
          position="left"
          onClose={handleLayoutSidebarClose}
        >
          <DrawerHead position="left">
            <Logo />
          </DrawerHead>
          {cachedSidebar}
        </Drawer>
      ) : (
        <div className="sidebar-container">{cachedSidebar}</div>
      )}

      <main>
        <div id="page-container" className="page-container">
          {React.cloneElement(children, {
            isRightDrawerAlwaysCollapsed,
            isRightDrawerCollapsed,
            isRightDrawerOpen,
            openRightDrawer,
            closeRightDrawer,
          })}
          <Footer />
        </div>
      </main>

      {/*  */}
    </Wrapper>
  )
}

export default Layout

const getRightDrawerBreakPointAndIcon = (location) => {
  if (!location) return [0, null]

  const pathname = location.pathname

  if (new RegExp("^/blogs$").test(pathname)) {
    // return { breakPoint: bp.collapsePageBlogRightDrawer, Icon: FaTags }
    return [bp.collapsePageBlogsRightDrawer, AiFillTags]
  } else if (new RegExp("^/blogs/.*?").test(pathname)) {
    // console.log("/blogs/[title]")
    return [bp.collapseArticleRightDrawer, VscListTree]
  } else if (new RegExp("^/books/.*?/.*?").test(pathname)) {
    // console.log("/books/[title]/[chapter]")
    return [bp.collapseArticleRightDrawer, VscListTree]
  } else {
    return [0, null]
  }
}
// { breakPoint: 1080, Icon: icon }
