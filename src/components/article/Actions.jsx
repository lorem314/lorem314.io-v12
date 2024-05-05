import React, { useState, useEffect, useCallback } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"

import { BiArrowToTop } from "@react-icons/all-files/bi/BiArrowToTop"
import { BiLeftArrowAlt } from "@react-icons/all-files/bi/BiLeftArrowAlt"
import { BiFullscreen } from "@react-icons/all-files/bi/BiFullscreen"
import { BiExitFullscreen } from "@react-icons/all-files/bi/BiExitFullscreen"

const Wrapper = styled.aside.attrs({ className: "actions" })`
  > .action-list {
    list-style-type: none;
    margin: 0;
    padding: 0;

    position: sticky;
    top: 10px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    > li {
      --svg-icon-size: 24px;
      > button {
      }
    }
  }
`

const Actions = ({ location }) => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) setIsFullscreen(true)
      else setIsFullscreen(false)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const openFullscreen = useCallback(() => {
    const nodeMainContent = document.getElementById("page-container")
    if (nodeMainContent.requestFullscreen) nodeMainContent.requestFullscreen()
    else alert("浏览器不支持全屏")
  }, [])

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  const toTop = useCallback(() => {
    document.getElementById("page-container")?.scrollTo(0, 0)
  }, [])

  const goBack = useCallback(() => {
    const to = location.pathname.split("/").slice(0, -1).join("/")
    navigate(to)
  }, [location.pathname])

  return (
    <Wrapper>
      <ul className="action-list">
        <li>
          <button className="svg-button" onClick={toTop}>
            <BiArrowToTop />
          </button>
        </li>
        <li>
          <button className="svg-button" onClick={goBack}>
            <BiLeftArrowAlt />
          </button>
        </li>
        <li>
          {isFullscreen ? (
            <button className="svg-button" onClick={exitFullscreen}>
              <BiExitFullscreen />
            </button>
          ) : (
            <button className="svg-button" onClick={openFullscreen}>
              <BiFullscreen />
            </button>
          )}
        </li>
      </ul>
    </Wrapper>
  )
}

export default Actions
