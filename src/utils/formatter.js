export const collectTags = (posts) => {
  const tagsObj = Object.fromEntries(
    posts.reduce((map, post) => {
      const tags = post?.frontmatter?.tags
      tags.forEach((tag) => {
        if (!map.has(tag)) {
          map.set(tag, 1)
        } else {
          const count = map.get(tag)
          map.set(tag, count + 1)
        }
      })
      return map
    }, new Map())
  )
  const tagObjArr = []
  for (const [name, count] of Object.entries(tagsObj)) {
    tagObjArr.push({ name, count })
  }
  return tagObjArr
}

export const formateDate = (date) => {
  const d = new Date(date)
  const yy = d.getFullYear()
  const mm = d.getMonth() + 1
  const dd = d.getDate()
  return `${yy} 年 ${mm} 月 ${dd} 日`
}
