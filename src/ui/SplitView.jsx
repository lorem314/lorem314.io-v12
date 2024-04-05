import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;

  > .left {
    flex-grow: ${({ $adjust }) => ($adjust === "left" ? "0" : "1")};
  }

  > .spliter {
    flex: 0 0 4px;
    cursor: ew-resize;
    background-color: rgba(0, 0, 0, 0.25);
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  > .right {
    flex-grow: ${({ $adjust }) => ($adjust === "right" ? "0" : "1")};
  }
`

const SplitView = ({
  adjust = "right",
  initialWidth = 300,
  maxWidth = 360,
  minWidth = 100,
  children = null,
}) => {
  const [width, setWidth] = useState(initialWidth)
  const refRoot = useRef(null)
  const refSpliter = useRef(null)

  useEffect(() => {
    const root = refRoot.current
    const spliter = refSpliter.current
    let spliterMouseDownOffsetX = 0

    const handleMouseDown = (event) => {
      document.body.style.userSelect = "none"
      spliterMouseDownOffsetX = event.offsetX
      window.addEventListener("mousemove", handleMouseMove)
    }

    const handleMouseUp = (event) => {
      document.body.style.userSelect = "initial"
      window.removeEventListener("mousemove", handleMouseMove)
    }

    const handleMouseMove = (event) => {
      const rootRect = root.getBoundingClientRect()

      const nextWidth =
        adjust === "left"
          ? event.clientX - rootRect.left - spliterMouseDownOffsetX
          : rootRect.right - event.clientX - (4 - spliterMouseDownOffsetX)

      if (nextWidth > maxWidth) return
      if (nextWidth < minWidth) return

      setWidth(nextWidth)
    }

    spliter.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      spliter.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [adjust, minWidth, maxWidth])

  const style = { flexBasis: `${width}px` }

  return (
    <Wrapper ref={refRoot} $adjust={adjust}>
      <div className="left" style={adjust === "left" ? style : null}>
        {children[0]}
      </div>

      <div className="spliter" ref={refSpliter} />

      <div className="right" style={adjust === "right" ? style : null}>
        {children[1]}
      </div>
    </Wrapper>
  )
}

export default SplitView
