import Themeizer from '../Themeizer/index';

class ThemeizerWrapper {
    static async init() {
        const { cssVariablesLibs } = await Themeizer.init()
        const themesRow = Object.entries(cssVariablesLibs).map(([themeName, vars]) => (
            `.theme-${themeName} {${vars.join('')}}`
        )).join('');
        const themesTag = `<style>{\`${themesRow}\`}</style>`;
        return { themesTag };
    }
}

export default ThemeizerWrapper;