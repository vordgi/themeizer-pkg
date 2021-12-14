import Themeizer from "../Themeizer";

module.exports = async function (source: string) {
    const { cssVariablesLibs } = await Themeizer.init([]);
    const themesTag = `<style>
        {\`
        ${Object.entries(cssVariablesLibs).map(([themeName, vars]) => (
            `.theme-${themeName} {
                ${vars.join('\n')}
            }`
        )).join('\n')}
        \`}
    </style>`;

    source = source.replace(/<[^<>]*data-type=('|")themeizer('|")[^<>]*(\/>|>[^<>]*<\/[^<>]*>)/g, themesTag);

    return source;
}