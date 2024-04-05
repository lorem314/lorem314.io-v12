import React from "react"
import RootElementWrapper from "./src/RootElementWrapper"
import PageElementWrapper from "./src/PageElementWrapper"

export const wrapRootElement = RootElementWrapper
export const wrapPageElement = PageElementWrapper

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    React.createElement("script", {
      key: "init-theme",
      dangerouslySetInnerHTML: { __html: `(${initTheme.toString()})()` },
    }),
  ])
}

const initTheme = () => {
  window.__onThemeChange = function () {}

  var preferredTheme
  try {
    preferredTheme = localStorage.getItem("preferred-theme")

    if (!["system", "light", "dark"].includes(preferredTheme)) {
      localStorage.setItem("preferred-theme", "system")
      preferredTheme = "system"
    }

    console.log("[init-theme] preferredTheme :", preferredTheme)
  } catch (error) {
    console.error("[gatsby-ssr.js] initTheme :", error)
    preferredTheme = "system"
  }

  // function onThemeChange(event) {
  //   if (event.matches) {
  //     document.documentElement.setAttribute("data-theme", "dark")
  //   } else {
  //     document.documentElement.setAttribute("data-theme", "light")
  //   }
  // }

  function setTheme(newTheme) {
    // newTheme maybe : system, light, dark
    if (newTheme === "system") {
      const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")
      // darkQuery.removeEventListener("change", onThemeChange)
      // darkQuery.addEventListener("change", onThemeChange)
      if (darkQuery.matches) {
        document.documentElement.setAttribute("data-theme", "dark")
      } else {
        document.documentElement.setAttribute("data-theme", "light")
      }
    } else {
      // darkQuery.removeEventListener("change", onThemeChange)
      document.documentElement.setAttribute("data-theme", newTheme)
    }

    window.__theme = newTheme
    preferredTheme = newTheme
    window.__onThemeChange(newTheme)
  }

  window.__setPreferredTheme = function (newTheme) {
    setTheme(newTheme)
    try {
      localStorage.setItem("preferred-theme", newTheme)
    } catch (err) {}
  }

  setTheme(preferredTheme)
}
