import React from "react"

import Layout from "../layouts/Layout"
import PageSetting from "../components/PageSetting"

const Setting = ({ location }) => {
  return (
    <Layout location={location}>
      <PageSetting />
    </Layout>
  )
}

export default Setting
