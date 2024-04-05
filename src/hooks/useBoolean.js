import { useState, useCallback, useMemo } from "react"

const useBoolean = (initialValue) => {
  const [value, setValue] = useState(!!initialValue)

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((_) => !_), [])

  const handler = useMemo(
    () => ({ setTrue, setFalse, toggle, setValue }),
    [setTrue, setFalse, toggle]
  )

  // return { value, setValue, setTrue, setFalse, toggle }
  return [value, handler]
}

export default useBoolean
