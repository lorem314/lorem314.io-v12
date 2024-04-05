import { useEffect, useState } from "react"

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return typeof window === "undefined" ? undefined : window.__theme
  })

  useEffect(() => {
    window.__onThemeChange = () => {
      setTheme(window.__theme)
    }
  }, [])

  useEffect(() => {
    const handleChangeTheme = (event) => {
      window.__setPreferredTheme("system")
    }

    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")
    if (theme === "system") {
      darkQuery.addEventListener("change", handleChangeTheme)
    }

    return () => {
      darkQuery.removeEventListener("change", handleChangeTheme)
    }
  }, [theme])

  const changeTheme = (theme) => {
    window.__setPreferredTheme(theme)
  }

  return { theme, changeTheme }
}

export default useTheme
