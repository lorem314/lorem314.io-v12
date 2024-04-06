import React, { useCallback, useMemo, useState } from "react"
import styled from "styled-components"

import { AiFillTags } from "@react-icons/all-files/ai/AiFillTags"

import Header from "./Header"
import Sidebar from "./Sidebar"
import Logo from "./Logo"
import Footer from "./Footer"

import Drawer from "../ui/Drawer"
import useDrawer from "../hooks/useDrawer"
import DrawerHead from "../styled/DrawerHead"
import SplitView from "../ui/SplitView"

import { useGlobalContext } from "../GlobalContext"
import GlobalStyle, { bp, size } from "../styled/GlobalStyle"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  main {
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 0;
    color: var(--content-color-1);
    background-color: var(--bg-0);
    overflow: auto;
    scroll-behavior: smooth;
  }

  > .split-view {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;

    > .left > .sidebar-container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
    }

    > .right > main {
      top: 0;
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

  const matched = Object.keys(isRightDrawersAlwaysCollapsed).find((regex) =>
    location?.pathname.match(`^${regex}$`)
  )
  const isRightDrawerAlwaysCollapsed = isRightDrawersAlwaysCollapsed[matched]

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

  const cachedHandleFinished = useCallback((width) => {
    // console.log("cachedHandleFinished width", width)
    setLayoutSidebarWidth(width)
  }, [])

  return typeof window === "undefined" ? null : (
    <Wrapper
      $isLayoutSidebarAlwaysCollapsed={isLayoutSidebarAlwaysCollapsed}
      $isLayoutSidebarCollapsed={isLayoutSidebarCollapsed}
      $layoutSidebarWidth={layoutSidebarWidth}
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
        <>
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
          <main>
            {/* <div id="page-container" className="page-container"> */}
            {React.cloneElement(children, {
              isRightDrawerAlwaysCollapsed,
              isRightDrawerCollapsed,
              isRightDrawerOpen,
              openRightDrawer,
              closeRightDrawer,
            })}
            <Footer />
            {/* </div> */}
          </main>
        </>
      ) : (
        <SplitView
          adjust="left"
          initialWidth={layoutSidebarWidth}
          maxWidth={500}
          minWidth={240}
          onFinished={cachedHandleFinished}
        >
          <div className="sidebar-container">{cachedSidebar}</div>
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
        </SplitView>
      )}

      {/*  */}
    </Wrapper>
  )
}

export default Layout

const getRightDrawerBreakPointAndIcon = (location) => {
  if (!location) return [0, null]
  const pathname = location.pathname
  if (pathname.includes("blogs")) {
    // return { breakPoint: bp.collapsePageBlogRightDrawer, Icon: FaTags }
    return [bp.collapsePageBlogsRightDrawer, AiFillTags]
  } else {
    return [0, null]
  }
}
// { breakPoint: 1080, Icon: icon }
