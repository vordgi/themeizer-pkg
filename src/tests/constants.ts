import type { ThemesObj } from "../types/themeizer";

export const COLORS_MIN: ThemesObj = {
  light: {
    list: [
      {
        type: 'solid',
        name: 'light/primary',
        value: 'rgb(0, 26, 119)'
      },
      {
        type: 'linear',
        name: 'light/linear',
        value: 'rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%'
      },
      {
        type: 'radial',
        name: 'light/radial',
        value: 'rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%'
      }
    ],
    type: 'light'
  },
  dark: {
    list: [
      {
        type: 'solid',
        name: 'dark/primary',
        value: 'rgb(102, 182, 255)'
      },
      {
        type: 'linear',
        name: 'dark/linear',
        value: 'rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%'
      },
      {
        type: 'radial',
        name: 'dark/radial',
        value: 'rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%'
      }
    ],
    type: 'dark'
  }
}

export const COLORS_VARIABLES_OBJ = {
  dark: {
    list: [
      "--dark-primary: rgb(102, 182, 255);",
      "--dark-linear: linear-gradient(var(--dark-linear-setting, 0), rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%);",
      "--dark-radial: radial-gradient(var(--dark-radial-setting, circle), rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%);"
    ],
    type: "dark"
  },
  light: {
    list: [
      "--light-primary: rgb(0, 26, 119);",
      "--light-linear: linear-gradient(var(--light-linear-setting, 0), rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%);",
      "--light-radial: radial-gradient(var(--light-radial-setting, circle), rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%);"
    ],
    type: "light"
  }
}

export const TEST_STYLES = `
.default {
  position: relative;
  border: 1px solid var(--primary);
}
.active {
  background: var(--linear);
}
.filled {
  background-color: var(--primary);
  color: var(--main-lvl1);
}
`
