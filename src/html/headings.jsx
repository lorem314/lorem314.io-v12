import styled, { css } from "styled-components"

const sharedStyle = css`
  margin: 0;
`

export const H1 = styled.h1`
  ${sharedStyle}
  font-size: 1.5rem;
  margin: 1rem 0 1rem;
`

export const H2 = styled.h2`
  ${sharedStyle}
  font-size: 1.375rem;
  margin: 3rem 0 1rem;
  & + section > h3 {
    margin-top: 1rem;
  }
`

export const H3 = styled.h3`
  ${sharedStyle}
  font-size: 1.25rem;
  margin: 2.75rem 0 1rem;
  & + section > h4 {
    margin-top: 1rem;
  }
`

export const H4 = styled.h4`
  ${sharedStyle}
  font-size: 1.125rem;
  margin: 2.5rem 0 1rem;
  & + section > h5 {
    margin-top: 1rem;
  }
`

export const H5 = styled.h5`
  ${sharedStyle}
  font-size: 1rem;
  margin: 2.25rem 0 1rem;
  & + section > h6 {
    margin-top: 1rem;
  }
`

export const H6 = styled.h6`
  ${sharedStyle}
  font-size: 1rem;
  margin: 2rem 0 1rem;
`
