import React from "react"
import styled from "styled-components"

const Wrapper = styled.footer`
  text-align: center;
  margin: 0 -10px;
  padding: 10px;
  color: var(--content-color-1);
  background-color: var(--content-bg);
`

const Footer = () => {
  return (
    <Wrapper>
      <p>Lorem314's Blog Version.12</p>
    </Wrapper>
  )
}

export default Footer
