import React from "react"
import styled from "styled-components"

import SplitView from "../ui/SplitView"

const Wrapper = styled.section`
  max-width: 32rem;
  background-color: var(--content-bg);

  margin: 2rem auto;
  border: 1px solid var(--content-border-color);
  border-radius: 0.25rem;
  padding: 0 10px 1rem;

  > .greeting {
    text-align: center;
  }
`

const PageIndex = () => {
  return (
    <Wrapper>
      <h2 className="greeting">欢迎来到我的博客</h2>

      <div style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
        <SplitView>
          <div
            style={{
              padding: "10px",
              backgroundColor: "lightcoral",
              height: "100%",
            }}
          >
            left panel
          </div>
          <div
            style={{
              padding: "10px",
              backgroundColor: "lightgreen",
              height: "100%",
            }}
          >
            right panel
          </div>
        </SplitView>
      </div>
    </Wrapper>
  )
}

export default PageIndex
