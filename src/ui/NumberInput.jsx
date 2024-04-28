import React from "react"
import styled from "styled-components"

import { MdChevronLeft } from "@react-icons/all-files/md/MdChevronLeft"
import { MdChevronRight } from "@react-icons/all-files/md/MdChevronRight"

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  border: 1px solid red;
`

const NumberInput = ({ min, max, value, step }) => {
  return (
    <Wrapper>
      <button className="left">
        <MdChevronLeft />
      </button>
      <input type="number" name="" id="" />
      <button>
        <MdChevronRight />
      </button>
    </Wrapper>
  )
}

export default NumberInput
