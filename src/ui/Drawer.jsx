import React, { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

import { justStopPropagation } from "../utils/event"
import { getFocusableElementsOf } from "../utils/dom"
import { variable } from "../styled/GlobalStyle"

const Drawer = ({
  isOpen = false,
  position = "left",
  size = 360,
  onClose = () => {},
  children,
}) => {
  return isOpen ? (
    <Portal position={position} size={size} onClose={onClose}>
      {children}
    </Portal>
  ) : null
}

export default Drawer

const Backdrop = styled.div`
  position: absolute;
  inset: 0 0 0 0;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  transition: opacity 150ms ease-in-out;
  overflow: hidden;

  > .drawer-content-container {
    position: absolute;
    background-color: white;
    background-color: var(--bg-1);
    transition: transform 150ms ease-in-out;

    display: flex;
    flex-direction: column;
  }
`

const Portal = ({ position, size, onClose, children }) => {
  const [styles, setStyles] = useState({
    opacity: 0,
    transform: getTransformStartProp(position),
  })
  const ref = useRef(null)

  useEffect(() => {
    const focusableElements = getFocusableElementsOf(ref.current)

    const transform = "translate(0, 0)"
    setStyles((prevStyles) => ({ ...prevStyles, opacity: 1, transform }))

    Promise.resolve()
      .then(() => {
        return new Promise((resolve) => setTimeout(() => resolve(), 150))
      })
      .then(() => {
        if (focusableElements.length !== 0) focusableElements[0].focus()
      })
  }, [])

  const handleCloseDrawer = () => {
    Promise.resolve()
      .then(() => {
        return new Promise((resolve) => {
          const transform = getTransformStartProp(position)
          setStyles({ opacity: 0, transform })
          setTimeout(() => resolve(), variable.animationTransitionDuration)
        })
      })
      .then(() => onClose())
  }

  const { transform } = styles
  const positionProps = getPositionProps(position, size)

  return createPortal(
    <Backdrop style={{ opacity: styles.opacity }} onClick={handleCloseDrawer}>
      <div
        className="drawer-content-container"
        ref={ref}
        style={{ ...positionProps, transform }}
        onClick={justStopPropagation}
      >
        {/* {React.cloneElement(children, { onCloseDrawer: handleCloseDrawer })} */}
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { onCloseDrawer: handleCloseDrawer })
        })}
      </div>
    </Backdrop>,
    document.body
  )
}

function getPositionProps(position, size) {
  switch (position) {
    case "top":
    case "bottom":
      return { left: 0, right: 0, [position]: 0, height: size }
    case "left":
    case "right":
      return { top: 0, bottom: 0, [position]: 0, width: size }
    default:
      return { top: 0, bottom: 0, left: 0, width: size }
  }
}

function getTransformStartProp(position) {
  switch (position) {
    case "top":
      return "translate(0, -100%)"
    case "right":
      return "translate(100%, 0)"
    case "bottom":
      return "translate(0, 100%)"
    case "left":
      return "translate(-100%, 0)"
    default:
      return "translate(-100%, 0)"
  }
}
