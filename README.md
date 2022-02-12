# Themeizer
Package for embedding themes from "Themeizer" Figma plugin at the server level or at build stage.

## Features
* Embedding styles at build time
* Manual embedding on the server
* Caching and loading every n seconds (_revalidate_)

## Installation

Using npm:
```bash
$ npm install themeizer
```

Using yarn:
```bash
$ yarn add themeizer
```

## Configuration

| Option | Required | Type | Description |
| ------ | -------- | ---- | ----------- |
| url    | true     | string | api url to load and read colors |
| headers | false | JSON | an object of headers required for reading from api |
| revalidate | false | number | period in which to fetch styles (in minutes) |

1. Add configuration to environment variables. For example, via `.env` files:
```js
// .env.local
THEMEIZER_OPTIONS={"url":"https://example.com/api/themes","revalidate":0.1,"headers":{"token":"example-token"}}
```

## Usage

### Build-time embedding:

Add the meta tag with the data-attribute `data-type="themeizer"` where you want.

```html
<head>
    ...
    <meta data-type="themeizer" />
    ...
</head>
...
```

The meta tag will be replaced with style classes, in the format:

```css
.theme-light {
    --primary: #1565C0;
}

.theme-dark {
    --primary: #90CAF9;
}
```

### Server-level style classes inlining

1. Using default method to get css

Get css object on server side
```js
const { css } = await Themeizer.init();
```

Add css code with theme classes to your code

```jsx
<style>
    {css}
</style>
```

2. Using custom injection

Get the styles object on the server side
```js
const { cssVariablesLibs } = await Themeizer.init();
```

Build theme classes from this object
```jsx
{Object.entries(colors).map(([themeName, themeObj]) => (
    <style>
        {`
        .theme-${themeName} {
              ${themeObj.list.join('\n')}
              ${themeObj.type === 'dark' ? 'color-scheme: dark;' : ''}
        }
        `}
    </style>
))}
```

## Themeizer ecosystem
* [Figma plugin "Themeizer"](https://www.figma.com/community/plugin/1065764293242137356/Themeizer) - plugin for changing themes in design and publishing them in the cloud;
* [themeizer](https://www.npmjs.com/package/themeizer) - package for embedding themes from "Themeizer" Figma plugin at the server level or at build stage;
* [next-themeizer](https://www.npmjs.com/package/next-themeizer) - package for adding "Themeizer" ecosystem interaction configuration to your next.js application;
* [themeizer-cli](https://www.npmjs.com/package/themeizer-cli) - a package to automatically replace published colors (as well as linear and radial gradients) in style files with a css variable;
* [stylelint-themeizer](https://www.npmjs.com/package/stylelint-themeizer) - stylelint plugin for "Themeizer" ecosystem.

## License

[MIT](https://github.com/vordgi/themeizer/blob/main/LICENSE)