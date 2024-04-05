import { useState } from "react"

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const initialValueToUse =
      initialValue instanceof Function ? initialValue() : initialValue
    if (typeof window === "undefined") return initialValueToUse
    try {
      const item = window.localStorage.getItem(key)
      if (!item) {
        window.localStorage.setItem(key, JSON.stringify(initialValue))
      }
      return item ? JSON.parse(item) : initialValueToUse
    } catch (error) {
      console.error("[useLocalStorage] useState :", error)
      return initialValueToUse
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error("[useLocalStorage] setValue :", error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
