import React from "react"
import styled from "styled-components"

import Logo from "./Logo"
import SocialLinks from "./SocialLinks"

import { RiMenu2Fill } from "@react-icons/all-files/ri/RiMenu2Fill"
import Search from "./Search"

const Wrapper = styled.header`
  height: 50px;
  padding: 0 10px;
  color: var(--app-contrast-color);
  background-color: var(--primary-color);

  display: flex;
  align-items: center;
  gap: 10px;
`

const Header = ({
  isLayoutSidebarAlwaysCollapsed,
  isLayoutSidebarCollapsed,
  openLayoutSidebar,
  RightDrawerIcon,
  isRightDrawerAlwaysCollapsed,
  isRightDrawerCollapsed,
  openRightDrawer,
}) => {
  return (
    <Wrapper>
      {/*  */}

      {isLayoutSidebarAlwaysCollapsed || isLayoutSidebarCollapsed ? (
        <button
          className="svg-button ui-button"
          aria-label="Open Layout Sidebar"
          onClick={openLayoutSidebar}
        >
          <RiMenu2Fill />
        </button>
      ) : null}

      <Logo />

      <Search />

      <SocialLinks />

      {/* <button>theme</button> */}

      {RightDrawerIcon &&
      (isRightDrawerAlwaysCollapsed || isRightDrawerCollapsed) ? (
        <button
          className="svg-button ui-button"
          aria-label="Open Layout Sidebar"
          onClick={openRightDrawer}
        >
          <RightDrawerIcon />
        </button>
      ) : null}

      {/*  */}
    </Wrapper>
  )
}

export default Header
