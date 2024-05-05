import React from "react"
import styled from "styled-components"

import { MdChevronLeft } from "@react-icons/all-files/md/MdChevronLeft"
import { MdChevronRight } from "@react-icons/all-files/md/MdChevronRight"

const Wrapper = styled.div`
  width: 100;

  display: flex;
  align-items: stretch;
  border: 1px solid red;
  border-radius: 0.25rem;

  > button {
    flex: 0 1 18px;
    align-items: center;

    border: none;
    padding: 0;
    background-color: rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  > .input {
    min-width: 0;
    /* cursor: ew-resize; */
    flex: 1 1 auto;

    border: none;
    padding: 0.125rem 0.25rem;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &:focus {
      outline: none;
    }
  }
`

const NumberInput = ({ min, max, value, step }) => {
  return (
    <Wrapper>
      <button className="decrement-button">
        <MdChevronLeft />
      </button>
      <input className="input" type="number" />
      <button className="increment-button">
        <MdChevronRight />
      </button>
    </Wrapper>
  )
}

export default NumberInput
