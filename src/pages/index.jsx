import * as React from "react"

import Layout from "../layouts/Layout"
import PageIndex from "../components/PageIndex"

const Index = ({ location }) => {
  // console.log("[index.jsx] location ", location)
  return (
    <Layout location={location}>
      <PageIndex />
    </Layout>
  )
}

export default Index
