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

const Actions = () => {
  return (
    <Wrapper>
      <ul className="action-list">
        <li>
          <button className="svg-button">
            <BiArrowToTop />
          </button>
        </li>
        <li>
          <button className="svg-button">
            <BiLeftArrowAlt />
          </button>
        </li>
        <li>
          <button className="svg-button">
            <BiFullscreen />
          </button>
        </li>
      </ul>
    </Wrapper>
  )
}

export default Actions
