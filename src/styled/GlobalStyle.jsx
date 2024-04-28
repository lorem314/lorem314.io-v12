import { createGlobalStyle } from "styled-components"

const styled = { createGlobalStyle }

// unit ms
export const variable = {
  themeTransitionDuration: 150,
  animationTransitionDuration: 150,
}
// unit px
export const size = {
  siteHeaderHeight: 50,
  layoutSidebarWidth: 360,
}
// break point unit px
export const bp = {
  mobile: 480,

  tablet: 768,
  collapsePageBlogsRightDrawer: 768,

  laptop: 1024,
  collapseArticleRightDrawer: 1024,

  desktop: 1366,
  collapseLayoutSidebar: 1366,
}

const GlobalStyle = styled.createGlobalStyle`
  :root {
    --size-site-header-height: ${size.siteHeaderHeight}px;
    --size-layout-sidebar-width: ${size.layoutSidebarWidth}px;

    --theme-transition-duration: ${variable.themeTransitionDuration}ms;
    --theme-transition-timing-function: ease-in-out;
    --theme-transition-props: var(--theme-transition-duration)
      var(--theme-transition-timing-function);

    --animation-transition-duration: ${variable.animationTransitionDuration}ms;
    --animation-transition-timing-function: ease-in-out;
    --animation-transition-props: var(--animation-transition-duration)
      var(--animation-transition-timing-function);

    --ui-text-input-outline-color-focus: #5f8cff;
    --ui-text-input-outline-offset-focus: -2px;

    &[data-theme="light"] {
      color-scheme: light;

      --primary-color: #2c5c97;
      --app-contrast-color: #f7f7f7;
      --link-color: #d23669;

      --content-color-0: rgba(0, 0, 0, 100%);
      --content-color-1: rgba(0, 0, 0, 87%);
      --content-color-2: rgba(0, 0, 0, 60%);
      --content-color-3: rgba(0, 0, 0, 38%);
      --page-content-title-color: #344f71;
      --page-content-title-border-color: rgba(58, 58, 58, 0.1);

      --bg-0: #e5e5e5;
      --bg-1: #f7f7f7;
      --content-bg: #fdfdfd;
      --content-border-color: #e3e3e3;
      --content-box-shadow: rgba(0, 0, 0, 0.04);
      --sub-content-bg: #f0f0f0;

      --ui-button-color: #505050;
      --ui-button-color-active: #f7f7f7;
      --ui-button-bg: rgba(0, 0, 0, 0.1);
      --ui-button-bg-hover: rgba(0, 0, 0, 0.2);
      --ui-button-bg-active: #585858;

      --ui-text-input-border-color: #d2d2d2;
      --ui-text-input-border-color-focus: var(--primary-color);
      /* --ui-text-input-box-shadow-focus: inset 0 1px 2px #ddd,
        0 0 5px rgba(69, 122, 187, 0.4); */
      --ui-text-input-box-shadow-focus: none;
      --ui-text-input-bg: #fff;

      --ui-tag-count-bg: #374151;
      --ui-tag-bg-hover: hsl(200, 100%, 75%);
      --ui-tag-bg-selected: hsl(200, 100%, 30%);

      --ui-tooltip-color: #f7f7f7;
      --ui-tooltip-bg: rgba(0, 0, 0, 0.8);
    }

    &[data-theme="dark"] {
      color-scheme: dark;

      --primary-color: #1a2c42;
      --app-contrast-color: #e8e8e8;
      --link-color: #ffa7c4;

      --content-color-0: rgba(255, 255, 255, 100%);
      --content-color-1: rgba(255, 255, 255, 87%);
      --content-color-2: rgba(255, 255, 255, 60%);
      --content-color-3: rgba(255, 255, 255, 38%);

      --page-content-title-color: #b3b3b3;
      --page-content-title-border-color: hsla(0, 0%, 61%, 0.1);

      --bg-0: #191919;
      --bg-1: #1e1e1e;
      --content-bg: #232323;
      --content-border-color: #262626;
      --content-box-shadow: rgba(0, 0, 0, 0.04);
      --sub-content-bg: #2c2c2c;

      --ui-button-color: #a7a7a7;
      --ui-button-color-active: #0e0e0e;
      --ui-button-bg: hsla(0, 0%, 78%, 0.08);
      --ui-button-bg-hover: hsla(0, 0%, 78%, 0.15);
      --ui-button-bg-active: #7d7d7d;

      --ui-text-input-border-color: #2c2c2c;
      --ui-text-input-border-color-focus: #363636;
      /* --ui-text-input-box-shadow-focus: inset 0 1px 2px #272727,
      0 0 5px rgba(0, 0, 0, 0.4); */
      --ui-text-input-box-shadow-focus: none;
      --ui-text-input-bg: #272727;

      --ui-tag-count-bg: ;

      --ui-tooltip-color: #181818;
      --ui-tooltip-bg: hsla(0, 0%, 78%, 0.9);
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    margin: 0;
  }

  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    width: 100%;
    height: 100%;
  }

  /**
   * reset default
   */
  a {
    text-underline-offset: 0.25rem;
    text-decoration: none;
    color: var(--link-color);
    &:hover {
      text-decoration: underline;
    }
  }
  button {
    cursor: pointer;
    word-break: keep-all;
    white-space: nowrap;
    line-height: 1.25rem;
    padding: 0.25em 0.5em;

    display: inline-flex;
    justify-content: center;
    align-items: flex-end;

    font-size: 1em;
  }
  input {
    font-size: 1rem;
    line-height: 1.5;

    &[type="search"],
    &[type="text"] {
      width: 100%;

      outline-offset: var(--ui-text-input-outline-offset-focus);
      border-width: 1px;
      border-style: solid;
      border-color: var(--ui-text-input-border-color);
      border-radius: 0.25rem;
      padding: 0.25rem 0.5rem;
      background-color: var(--ui-text-input-bg);

      &:focus {
        outline: 2px solid var(--ui-text-input-outline-color-focus);
        border-color: var(--ui-text-input-border-color-focus);
        box-shadow: var(--ui-text-input-box-shadow-focus);
      }
    }

    &[type="checkbox"] {
      margin: 0.25em;
      width: 1em;
      height: 1em;
      font-size: 1em;
    }
  }
  label {
    font-size: 1em;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }
  select {
    cursor: pointer;
    padding: 0.125em;
    font-size: 1em;
    margin: 0.25em;
  }
  svg {
    display: block;
    width: var(--svg-icon-size, 16px);
    height: var(--svg-icon-size, 16px);
  }

  /**
   * custom className
   */
  .page-content {
    background-color: var(--content-bg);
    border: 1px solid var(--content-border-color);
    border-radius: 0.25rem;
    padding: 10px;
  }
  .page-content-title {
    font-weight: bolder;
    margin: 0 0 0.5rem;
    border-bottom: 1px solid var(--page-content-title-border-color);
    padding: 0 0.125rem 0.25rem;
    font-size: 1em;
    color: var(--page-content-title-color);
  }
  .svg-button {
    border: none;
    border-radius: 0.25rem;
    padding: 0.25rem;
    color: inherit;

    &.ui-button {
      --svg-icon-size: 24px;
      background-color: var(--ui-button-bg);
      &:hover {
        background-color: var(--ui-button-bg-hover);
      }
    }

    &.input-button {
      padding: 0;
      background-color: transparent;
      opacity: 0.5;
      &:hover {
        opacity: 0.75;
      }
    }
  }
  .layout-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`

export default GlobalStyle
