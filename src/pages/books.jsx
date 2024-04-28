import React from "react"

import Layout from "../layouts/Layout"
import PageBooks from "../components/PageBooks"

const Books = ({ location }) => {
  return (
    <Layout location={location}>
      <PageBooks />
    </Layout>
  )
}

export default Books
