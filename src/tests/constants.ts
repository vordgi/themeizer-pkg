import type { ThemesObj } from "../types/themeizer";

export const CLOUD_COLORS: ThemesObj = {
  light: {
    list: [
      {
        type: 'solid',
        name: 'primary',
        value: 'rgb(0, 26, 119)'
      },
      {
        type: 'linear',
        name: 'linear',
        value: 'rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%'
      },
      {
        type: 'radial',
        name: 'radial',
        value: 'rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%'
      }
    ],
    type: 'light'
  },
  dark: {
    list: [
      {
        type: 'solid',
        name: 'primary',
        value: 'rgb(102, 182, 255)'
      },
      {
        type: 'linear',
        name: 'linear',
        value: 'rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%'
      },
      {
        type: 'radial',
        name: 'radial',
        value: 'rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%'
      }
    ],
    type: 'dark'
  }
}

export const CLOUD_COLORS_WITH_SHARED = {
  ...CLOUD_COLORS,
  custom: {
    list: [
      {
        type: 'solid',
        name: 'logo',
        value: 'rgb(0, 229, 255)'
      }
    ],
    type: "shared"
  }
}

export const COLORS_VARIABLES_OBJ = {
  dark: {
    list: [
      { name: "primary", value: "rgb(102, 182, 255)" },
      { name: "linear", value: "linear-gradient(var(--linear-setting, 0), rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%)" },
      { name: "radial", value: "radial-gradient(var(--radial-setting, circle), rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%)" }
    ],
    type: "dark"
  },
  light: {
    list: [
      { name: "primary", value: "rgb(0, 26, 119)" },
      { name: "linear", value: "linear-gradient(var(--linear-setting, 0), rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%)" },
      { name: "radial", value: "radial-gradient(var(--radial-setting, circle), rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%)" }
    ],
    type: "light"
  }
}

export const COLORS_VARIABLES_OBJ_WITH_SHARED = {
  ...COLORS_VARIABLES_OBJ,
  custom: {
    list: [
      { name: "logo", value: "rgb(0, 229, 255)" }
    ],
    type: "shared"
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
