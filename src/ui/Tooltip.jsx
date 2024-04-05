import React, { useRef, useState } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

const Tooltip = ({ children, tip = "", position = "left" }) => {
  const ref = useRef(null)
  const [state, setState] = useState({ isShow: false, rect: null })

  const showTip = () => {
    if (ref.current === null) return
    const rect = ref.current.getBoundingClientRect()
    setState({ isShow: true, rect })
  }
  const hideTip = () => {
    setState({ isShow: false })
  }

  const { isShow, rect } = state
  return (
    <>
      {React.cloneElement(children, {
        ref: ref,
        onMouseEnter: showTip,
        onMouseLeave: hideTip,
        onFocus: showTip,
        onBlur: hideTip,
      })}
      {isShow ? <Portal rect={rect} tip={tip} position={position} /> : null}
    </>
  )
}

export default Tooltip

const Wrapper = styled.div`
  line-height: 1.5;
  font-size: 92.5%;
  padding: 0.25rem 0.5rem;
  border-radius: 0.125rem;
  color: var(--ui-tooltip-color);
  background-color: var(--ui-tooltip-bg);
  box-shadow: 0 4px 10px 0 #00000059;

  position: absolute;
  top: ${({ $rect }) => $rect.top + $rect.width}px;
  left: ${({ $rect }) => $rect.left + $rect.height}px;

  &:after {
    content: " ";
    width: 0;
    height: 0;
    position: absolute;
  }

  &.top {
    top: ${({ $rect }) => $rect.top - 10}px;
    left: ${({ $rect }) => $rect.left + $rect.width / 2}px;
    &:after {
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid var(--ui-tooltip-bg);
      top: 100%;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  &.right {
    top: ${({ $rect }) => $rect.top + $rect.height / 2}px;
    left: ${({ $rect }) => $rect.left + $rect.width + 10}px;
    &:after {
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: 6px solid var(--ui-tooltip-bg);
      top: 50%;
      left: -6px;
      transform: translate(0, -50%);
    }
  }
  &.bottom {
    top: ${({ $rect }) => $rect.top + $rect.height + 10}px;
    left: ${({ $rect }) => $rect.left + $rect.width / 2}px;
    &:after {
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid var(--ui-tooltip-bg);
      top: -6px;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  &.left {
    top: ${({ $rect }) => $rect.top + $rect.height / 2}px;
    left: ${({ $rect }) => $rect.left - 10}px;
    &:after {
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 6px solid var(--ui-tooltip-bg);
      top: 50%;
      left: 100%;
      transform: translate(0, -50%);
    }
  }
`

const Portal = ({ tip, rect, position }) => {
  const transform = getTransform(position)
  return createPortal(
    <Wrapper className={position} style={{ transform }} $rect={rect}>
      {tip}
    </Wrapper>,
    document.body
  )
}

function getTransform(position) {
  switch (position) {
    case "top":
      return "translate(-50%, -100%)"
    case "bottom":
      return "translate(-50%, 0)"
    case "left":
      return "translate(-100%, -50%)"
    case "right":
      return "translate(0, -50%)"
    default:
      return "translate(-50%, 0)"
  }
}
