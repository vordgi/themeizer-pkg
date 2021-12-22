# Themeizer
Plugin for embedding themes from "Themeizer" Figma plugin at the server level or at build stage.

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

Get the styles object on the server
```js
const { cssVariablesLibs } = await Themeizer.init();
```

Build theme classes from this object
```js
{Object.entries(colors).map(([themeName, vars]) => (
    <style>
        {`
        .theme-${themeName} {
            ${vars.join('\n')}
        }
        `}
    </style>
))}
```

## License

[MIT](https://github.com/vordgi/themeizer/blob/main/LICENSE)