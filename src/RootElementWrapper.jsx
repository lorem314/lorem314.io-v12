import React from "react"

import GlobalContextProvider from "./GlobalContext"

const RootElementWrapper = ({ element, props }) => {
  return (
    <GlobalContextProvider>
      {/* <div className="root-element-wrapper"> */}
      {element}
      {/* </div> */}
    </GlobalContextProvider>
  )
}

export default RootElementWrapper
