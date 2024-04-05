<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Minimal Sta

<!--

  import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  position: absolute;
  inset: 0 0 0 0;
  overflow: hidden;

  > .right {
    overflow-x: hidden;
    overflow-y: auto;

    position: relative;
    height: 100%;
    float: right;
    max-width: 20vw;

    padding: 20px;
    background-color: lightcoral;

    > .spliter {
      position: absolute;
      top: -1px;
      bottom: 0;
      left: -2px;
      width: 4px;
      cursor: ew-resize;
      pointer-events: auto;
      z-index: 10;
      background-color: transparent;
      transition: background-color 200ms ease-out;

      &::after {
        bottom: 0;
        content: "";
        left: -2px;
        padding: 4px;
        position: absolute;
        right: 0;
        top: 0;
      }

      &:hover {
        background-color: black;
      }
    }
  }

  > .left {
    overflow-x: hidden;
    overflow-y: auto;

    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    padding: 10px;
    position: relative;
    background-color: lightgreen;
  }
`

const SplitView = ({
  children,
  float = "right",
  initialWidth = 300,
  maxWidth = 400,
  minWidth = 200,
  right = null,
  left = null,
}) => {
  const [width, setWidth] = useState(initialWidth)
  const refRoot = useRef(null)
  const refSpliter = useRef(null)

  useEffect(() => {
    const nodeSpliter = refSpliter.current
    const nodeRoot = refRoot.current

    const handleMouseDown = (event) => {
      console.log("mouse DOWN on spliter::after")
      window.addEventListener("mousemove", handleMouseMove)
      nodeRoot.style.userSelect = "none"
      nodeRoot.style.cursor = "ew-resize"
      nodeSpliter.style.backgroundColor = "black"
    }

    const handleMouseUp = (event) => {
      console.log("mouse UP on window")
      window.removeEventListener("mousemove", handleMouseMove)
      nodeRoot.style.userSelect = "initial"
      nodeRoot.style.cursor = "initial"
      nodeSpliter.style.backgroundColor = "transparent"
    }

    const handleMouseMove = (event) => {
      const rootRect = nodeRoot.getBoundingClientRect()
      // console.log("root rect :", rootRect)
      const nextWidth = rootRect.left + rootRect.width - event.clientX
      setWidth(nextWidth)
      // if (nextWidth < maxWidth || minWidth < nextWidth) {
      // console.log("nextWidth ", nextWidth)
      // }

      // setWidth((prevWidth) => {
      //   if (maxWidth < prevWidth || prevWidth < minWidth) return prevWidth
      //   else return nextWidth
      // })

      // console.log("mouse MOVE on window :", event.movementX)
      // setWidth((prevWidth) => {
      //   const nextWidth = prevWidth - event.movementX
      //   const viewportWidth = window.innerWidth
      //   if (nextWidth > viewportWidth / 2) {
      //     return prevWidth
      //   } else {
      //     return prevWidth - event.movementX
      //   }
      // })
      // console.log("root split view :", rect)
    }

    nodeSpliter.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      nodeSpliter.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <Wrapper ref={refRoot}>
      <div className="right" style={{ width }}>
        <div className="spliter" ref={refSpliter} />
        <h4>right content</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quasi
          quis eius distinctio reiciendis dignissimos, iure, asperiores dolores
          sapiente nobis saepe quam repellat! Nam unde, dolore eius ratione
          mollitia esse beatae voluptatem.
        </p>
      </div>

      <div className="left">
        <div style={{ overflow: "auto" }}>
          <h4>left panel content</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            eveniet soluta dolores odio similique magnam dolorum laboriosam.
            Distinctio quaerat laboriosam quae, rem cupiditate pariatur.
            Assumenda commodi harum laborum similique maxime consectetur
            exercitationem possimus repudiandae veniam aspernatur dignissimos
            esse consequatur labore in, distinctio architecto, soluta doloremque
            corrupti perferendis debitis nostrum quod illo cum hic. Omnis
            laboriosam possimus magnam eveniet adipisci vel consectetur!
            Voluptatibus quas quisquam dolorem non consequuntur libero ratione,
            facilis, sunt recusandae sequi explicabo laboriosam quod vitae
            accusamus temporibus neque. Natus nisi earum dolorem aspernatur,
            atque saepe quibusdam, distinctio molestias architecto quidem
            dignissimos dolor cumque consequatur odio consectetur ut eos!
          </p>
        </div>
      </div>
    </Wrapper>
  )
}

export default SplitView


 -->
