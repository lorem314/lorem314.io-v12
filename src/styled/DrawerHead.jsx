import React from "react"
import styled from "styled-components"

import { RiCloseFill } from "@react-icons/all-files/ri/RiCloseFill"

const Wrapper = styled.header`
  flex: 0 0 50px;
  padding: 0 10px;

  display: flex;
  flex-direction: ${({ $position }) =>
    $position === "left" ? "row" : "row-reverse"};
  justify-content: ${({ $position }) =>
    $position === "left" ? "normal" : "space-between"};
  align-items: center;
  gap: 10px;

  color: var(--app-contrast-color);
  background-color: var(--primary-color);
`

const DrawerHead = ({
  children,
  position = "right",
  onCloseDrawer = () => {},
}) => {
  return (
    <Wrapper $position={position}>
      <button
        aria-label={`Close ${position} drawer`}
        className="svg-button ui-button"
        onClick={onCloseDrawer}
      >
        <RiCloseFill />
      </button>
      {children}
    </Wrapper>
  )
}

export default DrawerHead
