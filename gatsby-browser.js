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

// export const onRouteUpdate = ({ location }) => {
//   if (location?.hash) {
//     const decoded = decodeURIComponent(location.hash.slice(1))
//     const section = document.querySelector(`#${decoded}`)
//     window.scrollTo({ top: section.offsetTop, behavior: "smooth" })
//     return true
//   }
// }
