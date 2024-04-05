import React, { cloneElement } from "react"

import Notification from "./ui/Notification"

const PageElementWrapper = ({ element, props }) => {
  return (
    <>
      {/* <div className="page-element-wrapper"> */}
      {cloneElement(element, { ...props })}
      <Notification />
      {/* </div> */}
    </>
  )
}

export default PageElementWrapper
