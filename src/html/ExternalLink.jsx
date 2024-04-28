import React from "react"
import styled from "styled-components"

import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt"

const Wrapper = styled.a`
  display: inline-flex;

  > svg {
    margin-left: 0.125rem;
    width: 0.5rem;
    height: 0.5rem;
  }
`

const ExternalLink = ({ href = "", children }) => {
  return (
    <Wrapper href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <FaExternalLinkAlt />
    </Wrapper>
  )
}

export default ExternalLink
