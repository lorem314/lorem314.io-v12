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
    <Wrapper>
      <h2 className="greeting">欢迎来到我的博客</h2>

      {/* <div style={{ maxWidth: "50%" }}>
        <NumberInput />
      </div> */}

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
        laudantium aliquid, esse voluptatum cumque quibusdam facilis voluptates
        similique quaerat temporibus unde tempore nisi, voluptas corrupti
        deserunt vel voluptatibus tenetur vitae iure ex, id perferendis fugiat
        placeat. Recusandae libero vitae dolor quas quia commodi eaque. Sequi
        sapiente explicabo velit hic praesentium facilis, libero asperiores
        consequatur eos deserunt unde, rem soluta fugiat aliquid, cumque eaque
        est veniam quae voluptatem! Ea distinctio deleniti natus corrupti
        dolore, hic eveniet corporis odit illum quaerat maxime enim dolores et
        tempora amet, saepe, odio nulla. Nesciunt enim adipisci magni aliquam
        laudantium similique nisi harum earum neque, sequi iusto sed aspernatur
        repellendus modi autem perspiciatis, molestias in, voluptatibus quaerat
        non culpa facere. Voluptatibus sed beatae qui saepe libero ea voluptate
        vitae?
      </p>

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

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa nostrum
        atque deleniti molestias delectus sint tenetur, quasi molestiae quae
        soluta quos, harum exercitationem dignissimos dolorum consectetur
        architecto eligendi! Neque tenetur accusantium sed mollitia. Porro
        eligendi voluptates rem totam recusandae aspernatur deserunt rerum, hic
        ad deleniti suscipit beatae laborum nisi quibusdam. Esse soluta
        excepturi exercitationem quod voluptates delectus deserunt consequuntur
        dignissimos doloremque quae praesentium neque eligendi cumque, dolore,
        quis accusantium ipsa! Eos dolor, vitae doloribus itaque, blanditiis rem
        hic dolore recusandae praesentium eveniet ut veritatis? Nesciunt quos,
        eos assumenda, earum autem quae aspernatur qui deleniti dolorum tenetur
        perspiciatis, magnam voluptas cumque neque voluptatum minus ab dolore
        porro exercitationem alias obcaecati explicabo! Nemo, perspiciatis illo.
        Nam doloribus fuga commodi, esse, maxime explicabo illo rem quae atque
        ratione error enim repudiandae dolorum accusamus veniam molestias velit
        suscipit, non laudantium obcaecati modi. Quo, rem rerum, optio earum
        obcaecati quibusdam cupiditate sunt, officia quaerat temporibus ex
        blanditiis. Asperiores, deserunt non! Sed suscipit, voluptatibus tempora
        laudantium incidunt magni, maiores sunt deserunt neque sequi quis quas
        dolorem officia earum. Quos, assumenda impedit fugit aperiam perferendis
        voluptates doloremque illo ipsa velit ducimus nobis distinctio
        aspernatur error necessitatibus reprehenderit commodi labore veritatis
        vero dolores ipsum ab harum eveniet at nemo. Culpa mollitia illum
        incidunt. Dolores sed rem numquam sapiente quod ut enim explicabo, modi
        eius vero perferendis! Odio reiciendis asperiores, corporis libero
        laudantium qui aperiam adipisci vel accusantium enim animi sint?
        Temporibus, aliquam.
      </p>
    </Wrapper>
  )
}

export default PageIndex
