import React from "react"
import styled from "styled-components"

import SplitView from "../ui/SplitView"
import NumberInput from "../ui/NumberInput"

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
    <>
      <Wrapper>
        <h2 className="greeting">欢迎来到我的博客</h2>

        {/* <div style={{ maxWidth: "50%" }}>
        <NumberInput />
      </div> */}

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          laudantium aliquid, esse voluptatum cumque quibusdam facilis
          voluptates similique quaerat temporibus unde tempore nisi, voluptas
          corrupti deserunt vel voluptatibus tenetur vitae iure ex, id
          perferendis fugiat placeat. Recusandae libero vitae dolor quas quia
          commodi eaque. Sequi sapiente explicabo velit hic praesentium facilis,
          libero asperiores consequatur eos deserunt unde, rem soluta fugiat
          aliquid, cumque eaque est veniam quae voluptatem! Ea distinctio
          deleniti natus corrupti dolore, hic eveniet corporis odit illum
          quaerat maxime enim dolores et tempora amet, saepe, odio nulla.
          Nesciunt enim adipisci magni aliquam laudantium similique nisi harum
          earum neque, sequi iusto sed aspernatur repellendus modi autem
          perspiciatis, molestias in, voluptatibus quaerat non culpa facere.
          Voluptatibus sed beatae qui saepe libero ea voluptate vitae?
        </p>
      </Wrapper>
      <SplitView></SplitView>
    </>
  )
}

export default PageIndex
