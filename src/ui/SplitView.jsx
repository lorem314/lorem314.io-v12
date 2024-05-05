import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import styled from "styled-components"

const Wrapper = styled.div.attrs({ className: "split-view" })`
  width: 100%;
  /* height: fit-content; */
  background-color: rgba(255, 0, 0, 0.1);
  display: flex;

  > .first {
    background-color: rgba(39, 39, 42, 0.1);
    min-width: ${({ $minWidth }) => $minWidth}px;
    max-width: 900px;
    overflow: hidden;
  }

  > .resizer {
    flex: 0 0 16px;
    position: relative;
    cursor: col-resize;

    > .bar {
      width: 4px;
      height: 25%;
      border-radius: 0.5rem;
      background-color: red;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  > .second {
    background-color: rgba(39, 39, 42, 0.2);
    flex: 1 1 0;
    overflow: hidden;
  }
`

const SplitView = ({
  direction = "horizontal",
  minWidth = 100,
  initialWidth = 200,
  maxWidth = 300,
  use = "first",
}) => {
  const [width, setWidth] = useState(initialWidth)
  const refResizer = useRef(null)
  const refRoot = useRef(null)

  useLayoutEffect(() => {
    const root = refRoot.current
    const first = root.querySelector(".first")
    if (!first || !root) return
    first.style.width = `${initialWidth}px`
    first.style.minWidth = `${minWidth}px`
  }, [])

  useEffect(() => {
    const resizer = refResizer.current
    const root = refRoot.current
    let xOffsetResizer = null
    let isMouseDown = false
    const first = root.querySelector(".first")
    // console.log("first", first)

    const handleMouseDown = (event) => {
      if (!isMouseDown) {
        const resizerClientRect = resizer.getBoundingClientRect()
        xOffsetResizer = event.clientX - resizerClientRect.left
        document.body.style.userSelect = "none"
        window.addEventListener("mousemove", handleMouseMove)
      }
      isMouseDown = true
    }
    const handleMouseUp = () => {
      if (isMouseDown) {
        console.log("mouse up")
        document.body.style.userSelect = "auto"
        window.removeEventListener("mousemove", handleMouseMove)
      }
      isMouseDown = false
    }
    const handleMouseMove = (event) => {
      const rootClientRect = root.getBoundingClientRect()
      // const resizerClientRect = root.getBoundingClientRect()
      const width = event.clientX - rootClientRect.left - xOffsetResizer
      // console.log("width", width)
      first.style.width = `${width}px`
      // setWidth(width)
    }

    resizer.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      resizer.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <Wrapper ref={refRoot}>
      <div className="first">
        <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
          <ul>
            <li>resizeable split view</li>
            <li>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
              hic eum a animi corrupti!
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium nam molestias ut iste quos atque omnis reiciendis
              earum ipsam quisquam?
            </li>
          </ul>
        </div>
      </div>

      <div className="resizer" ref={refResizer}>
        <div className="bar" />
      </div>

      <div className="second">
        <ul>
          <li>resizeable split view</li>
          <li>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam hic
            eum a animi corrupti!
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            nam molestias ut iste quos atque omnis reiciendis earum ipsam
            quisquam?
          </li>
        </ul>
      </div>
    </Wrapper>
  )
}

export default SplitView
