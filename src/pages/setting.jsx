import React from "react"

import Layout from "../layouts/Layout"
import PageSetting from "../components/PageSetting"

const Setting = ({ location }) => {
  return (
    <>
      <title>设置 | Lorem314's Blog</title>
      <Layout location={location}>
        <PageSetting />
      </Layout>
    </>
  )
}

export default Setting
