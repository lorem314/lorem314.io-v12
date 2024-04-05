import { useEffect, useLayoutEffect, useState } from "react"

const useDrawer = ({ isAlwaysCollapsed = false, breakPoint = "" }) => {
  const [isCollapsed, setIsCollapsed] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= breakPoint : null
  )
  const [isOpen, setIsOpen] = useState(false)

  useLayoutEffect(() => {
    setIsCollapsed(isAlwaysCollapsed || window.innerWidth <= breakPoint)
  }, [isAlwaysCollapsed, breakPoint])

  useEffect(() => {
    const handleWindowResize = () => {
      setIsCollapsed((prevIsCollapsed) => {
        const nextIsCollapsed =
          isAlwaysCollapsed || window.innerWidth <= breakPoint

        if (
          prevIsCollapsed === true &&
          nextIsCollapsed === false &&
          !isAlwaysCollapsed
        ) {
          setIsOpen(false)
        }
        return nextIsCollapsed
      })
    }

    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [isAlwaysCollapsed, breakPoint])

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return { isCollapsed, isOpen, handleOpen, handleClose }
}

export default useDrawer
