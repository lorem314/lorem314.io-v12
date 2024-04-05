import ReactDOM from "react-dom/client"

import RootElementWrapper from "./src/RootElementWrapper"
import PageElementWrapper from "./src/PageElementWrapper"

import "@fontsource/fira-code"

export const wrapRootElement = RootElementWrapper
export const wrapPageElement = PageElementWrapper

export const replaceHydrateFunction = () => {
  return (element, container) => {
    const root = ReactDOM.createRoot(container)
    root.render(element)
  }
}
