<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  lorem314.io
</h1>

<!--

get tableOfContents during gatsby-node.js

like how to count chinese characters in a blog post

match CJK in regex

/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
  -------------_____________-------------_____________-------------_____________
   Punctuation   Hiragana     Katakana    Full-width       CJK      CJK Ext. A
                                            Roman/      (Common &      (Rare)
                                          Half-width    Uncommon)
                                           Katakana

[\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]+|<.*?>.*?<\/.*?>|<.*?\/>

这是一个带有<Link>HTML</Link>标签的段落。这是一个带有<Link to="/">HTML</Link>标签的段落。这是一个带有<Link>HTML</Link>标签的段落。
这又是一个带有<React type="tsx" />单标签的段落。

^<[A-Z][a-zA-Z0-9.]+([a-zA-Z0-9_]+=['"{].*?['"}]){0,}>$

works

^<[A-Z][a-zA-Z0-9.]+(?:\s)?(.*?)>$

<Custom title="custom title" isOpen={true}>
<Theme.Provider>
<CustumTag>

https://regex101.com/r/HUwhC1/1

================================================================================
用于将 props 字符串分解为 props object

(?<key>[a-z][a-zA-Z0-9_]+)=['"{](?<value>.*?)['"}]

title="custom title" isOpen={true}

================================================================================
用于分离段落中的 react标签 md写法的链接
匹配文字中的范围中删去了标点匹配

<.*?>(?<text>.*?)<\/.*?>|\[.*?\]\(.*?\)|[\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]|[a-zA-Z0-9]+

这是一个带有<Link to="/">链接</Link>的段落。
这是另一个有[链接](https://website-name.com)的 pragrapch。
这是一个带有<Link to="/">链接</Link>的段落。
这是另一个有[链接](https://website-name.com)的 pragrapch。
这段文字有**加粗**效果。
这段文字有__下划线__效果。


-->
