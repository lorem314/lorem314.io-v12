import React, { createContext, useContext } from "react"

import useLocalStorage from "./hooks/useLocalStorage"

const GlobalContext = createContext(null)

const GlobalContextProvider = ({ children }) => {
  const [isLayoutSidebarAlwaysCollapsed, setIsLayoutSidebarAlwaysCollapsed] =
    useLocalStorage("global-context_is-layout-sidebar-always-collapsed", false)

  const [layoutSidebarWidth, setLayoutSidebarWidth] = useLocalStorage(
    "global-context_layout-sidebar-width",
    320
  )

  const [isRightDrawersAlwaysCollapsed, setIsRightDrawersAlwaysCollapsed] =
    useLocalStorage("global-context_is-right-drawers-always-collapsed", {
      "/blogs": false,
      "/blogs/.*": false,
      "/books/.*?/.*": false,
    })

  const toggleIsLayoutSidebarAlwaysCollapsed = () => {
    setIsLayoutSidebarAlwaysCollapsed(
      (prevIsLayoutSidebarAlwaysCollapsed) =>
        !prevIsLayoutSidebarAlwaysCollapsed
    )
  }

  // console.log("[GlobalContext] layoutSidebarWidth", layoutSidebarWidth)
  return (
    <GlobalContext.Provider
      value={{
        isLayoutSidebarAlwaysCollapsed,
        setIsLayoutSidebarAlwaysCollapsed,
        toggleIsLayoutSidebarAlwaysCollapsed,
        isRightDrawersAlwaysCollapsed,
        setIsRightDrawersAlwaysCollapsed,
        layoutSidebarWidth,
        setLayoutSidebarWidth,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider

export const useGlobalContext = () => useContext(GlobalContext)
