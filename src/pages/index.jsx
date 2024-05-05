import * as React from "react"

import Layout from "../layouts/Layout"
import PageIndex from "../components/PageIndex"

const Index = ({ location }) => {
  return (
    <>
      <title>主页 | Lorem314's Blog</title>
      <Layout location={location}>
        <PageIndex />
      </Layout>
    </>
  )
}

export default Index
