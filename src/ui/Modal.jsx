import React, { cloneElement, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

import { justStopPropagation } from "../utils/event"

const Modal = ({ children, isOpen, onClose }) => {
  return isOpen ? <Portal onClose={onClose}>{children}</Portal> : null
}

export default React.memo(Modal)

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);

  display: flex;
  justify-content: center;
  transition: opacity 150ms ease-in-out;

  > .modal-content-container {
    display: flex;

    transition: transform 150ms ease-in-out;
  }
`

const Portal = ({ onClose = () => {}, children }) => {
  const ref = useRef(null)
  const [styles, setStyles] = useState({ opacity: 0, transform: "scale(0)" })

  useEffect(() => {
    setStyles({ opacity: 1, transform: "scale(1)" })
  }, [])

  const handleCloseModal = () => {
    Promise.resolve()
      .then(() => {
        return new Promise((resolve) => {
          setStyles({ opacity: 0, transform: "scale(0)" })
          setTimeout(() => resolve(), 150)
        })
      })
      .then(() => onClose && onClose())
  }

  const { transform } = styles

  return createPortal(
    <Backdrop style={{ opacity: styles.opacity }} onClick={handleCloseModal}>
      <div
        className="modal-content-container"
        style={{ transform }}
        onClick={justStopPropagation}
      >
        {cloneElement(children, {
          onCloseModal: handleCloseModal,
        })}
      </div>
    </Backdrop>,
    document.body
  )
}
