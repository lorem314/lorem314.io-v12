export const getCssVar = (name) => {
  return getComputedStyle(document.documentElement).getPropertyValue(name)
}

export const getFocusableElementsOf = (node) =>
  node.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
