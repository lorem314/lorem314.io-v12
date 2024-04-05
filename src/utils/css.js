const cssAttrsMapper = {
  clr: "color",
  opa: "opacity",
  fil: "fill",

  bgc: "background-color",
  bdc: "border-color",
  olc: "outline-color",

  fts: "font-size",
  mgn: "margin",
  tsf: "transform",
}

export const transition = (...attrs) => {
  return `transition: ${attrs
    .map((attr) => `${cssAttrsMapper[attr]} var(--theme-transition-props)`)
    .join(", ")
    .trimEnd()};`
}

export const clsx = (obj) =>
  Object.entries(obj)
    .map(([key, value]) => (value ? key : ""))
    .join(" ")
    .trim()
