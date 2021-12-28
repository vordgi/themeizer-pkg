import type { ColorCloudObj } from "../types/themeizer";

export const COLORS_MIN: ColorCloudObj[] = [
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
  },
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
]

export const COLORS_VARIABLES_OBJ = [
  {"name": "--primary", "origValue": "rgb(102, 182, 255)", "theme": "dark", "type": "solid", "value": "rgb(102, 182, 255)"},
  {"name": "--linear", "origValue": "rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%", "theme": "dark", "type": "linear", "value": "linear-gradient(var(--linear-setting, 0), rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%)"},
  {"name": "--radial", "origValue": "rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%", "theme": "dark", "type": "radial", "value": "radial-gradient(var(--radial-setting, circle), rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%)"},
  {"name": "--primary", "origValue": "rgb(0, 26, 119)", "theme": "light", "type": "solid", "value": "rgb(0, 26, 119)"},
  {"name": "--linear", "origValue": "rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%", "theme": "light", "type": "linear", "value": "linear-gradient(var(--linear-setting, 0), rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%)"},
  {"name": "--radial", "origValue": "rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%", "theme": "light", "type": "radial", "value": "radial-gradient(var(--radial-setting, circle), rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%)"},
]

export const COLORS_VARIABLES_LIBS = {
  "dark": [
    "--primary: rgb(102, 182, 255);",
    "--linear: linear-gradient(var(--linear-setting, 0), rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%);",
    "--radial: radial-gradient(var(--radial-setting, circle), rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%);"
  ],
  "light": [
    "--primary: rgb(0, 26, 119);",
    "--linear: linear-gradient(var(--linear-setting, 0), rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%);",
    "--radial: radial-gradient(var(--radial-setting, circle), rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%);"
  ]
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
