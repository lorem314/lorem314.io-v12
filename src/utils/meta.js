/*
{
  tableOfContents,
  totalWords: 1856,
  totalImages: 7,
  totalCodeBlocks: 3,
  readTime: '27 分钟'
}
*/
// mdx.node.body
const getMetaData = (body) => {
  const meta = { count: { word: 0, image: 0, code: 0 }, tableOfContents: {} }
  const lines = body.split("\r\n")

  const sectionLines = []

  for (const line of lines) {
    // const lineLength = `[${("0000" + line.length.toString()).slice(-4)}]`
    // console.log(`[${("0000" + line.length.toString()).slice(-4)}]${line}`)
    if (line.length === 0) {
      // console.log("empty line, continue ...")
    } else if (isStaticImport(line)) {
      // console.log(`[line, ${line.length}]${line}`)
      // console.log("[>>>>] static import, continue ...")
    } else if (isClosingTag(line)) {
      // console.log(`[line, ${line.length}]${line}`)
      // console.log("[>>>>] [</] closing tag")
      if (line.startsWith("</Section")) sectionLines.push(line)
    } else if (isOpeningTag(line)) {
      // console.log(`[line, ${line.length}]${line}`)
      // console.log("opening tag")
      // const { tagName, props } = getTagNameAndProps(line)
      // console.log("tagName", tagName)
      // console.log("props", props)
      if (line.startsWith("<Section")) sectionLines.push(line)
    } else if (false) {
    } else {
      // console.log(`[${lineLength}]`, line)
      // countP(line)
    }
  }
  const items = getItems(sectionLines)
  const tableOfContents = { items }
  meta.tableOfContents = tableOfContents
  return meta
}

module.exports = { getMetaData }

const getItems = (lines) => {
  const items = []

  while (lines.length !== 0) {
    const line = lines.shift()

    if (line.startsWith("</")) {
      // console.log("</Section>")
      break
    } else {
      // console.log("<Section ...>")
      // extract title
      const matches = line.match(/title="(.*?)"/)
      const title = matches[1]
      const item = { title }
      items.push(item)
      item.items = getItems(lines)
    }
  }

  return items
}

// match import
const isStaticImport = (line) => {
  return line.startsWith("import")
}
const isClosingTag = (line, tagName) => {
  return line.startsWith(`</${tagName || ""}`)
}
const isOpeningTag = (line, tagName) => {
  if (!tagName) return new RegExp("^<[A-Z]").test(line)
  else return new RegExp(`^${"<"}${tagName}`).test(line)
}

const getTagNameAndProps = (line) => {
  const { groups } = line.match(
    /^<(?<tagName>[A-Z][a-zA-Z0-9.]+)(?:s)?(?<propsString>.*?)>$/
  )
  if (!groups) {
    console.warn("[getTagNameAndProps] no groups \r\n" + line)
    return { tagName: "", props: {} }
  } else {
    const { tagName, propsString } = groups
    const regex = /(?<key>[a-z][a-zA-Z0-9_]+)=['"{](?<value>.*?)['"}]/g
    const props = {}
    let match
    while ((match = regex.exec(propsString)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (match.index === regex.lastIndex) regex.lastIndex++
      // The result can be accessed through the `m`-variable.
      // console.log("match", match)
      props[match.groups.key] = match.groups.value
    }
    return { tagName, props }
  }
}

const countP = (line) => {
  const regex =
    /<.*?>(?<reactElementText>.*?)<\/.*?>|\[(?<mdLinkText>.*?)\]\(.*?\)|[\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]+|[a-zA-Z0-9\-]+/g
  let m
  while ((m = regex.exec(line)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) regex.lastIndex++
    // The result can be accessed through the `m`-variable.
    console.log("m", m)
    m.forEach((match, groupIndex) => {
      console.log(`Found match, group ${groupIndex}: ${match}`)
    })
  }
}

// test all in one line, no multi-line mode
const regex = {
  md: {
    strong: "",
  },
  react: {
    openingTag: "",
    closingTag: "",
  },
}

/*

针对每一行进行判断

sectionLevel = 1


如果是空行
  啥也不干
如果是头顶上的 import 语句
  啥也不干
如果是组件闭标签 </React>
  啥也不干
如果是组件开标签 <React title="helo">
  分离 组件名称 和 属性
  返回 { tagName: "React", props: { title: "helo" } }
  如果 组件名称 是 Section 
    sectionLevel += 1
    则将其中的 title 记录在 tableOfContents 中

[]
<Section title="H2">
  [0]
  <Section title="H3">
    [0,0]
    <Section title="H4">
      [0,0,0]
    </Section>
      [0,0]
  </Section>
  [0]
  <Section title="H3">
    [0,1]
    <Section title="H4">
      [0,1,0]
    </Section>
    [0,1]
    <Section title="H4">
      [0,1,1]
    </Section>
    [0,1]
  </Section>
  [0]
</Section>
[]
<Section title="H2">
  [1]
</Section>
[]

tableOfContents = {
  items: [
    { 
      title: "H2",
      url,
      items: [
        {
          title: "H3",
          url,
        },
        {
          title: "H3",
          url,
        },
      ]
    },
    { 
      title: "H2",
      url,
    }
  ] 
}


000 <Section title="H2">
001   <Section title="H3">
002     <Section title="H4">
003     </Section>
004   </Section>
005   <Section title="H3">
006     <Section title="H4">
007     </Section>
008     <Section title="H4">
009     </Section>
010   </Section>
011 </Section>
012 <Section title="H2">
013 </Section>

*/
