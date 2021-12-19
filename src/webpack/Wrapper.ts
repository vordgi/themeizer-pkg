import type { GlobalRefType } from '../types/themeizer';
import GlobalRef from '../Themeizer/GlobalRef';
import Themeizer from '../Themeizer/index';

class ThemeizerWrapper {
    static initializer = new GlobalRef<GlobalRefType>('themeizer');

    static async init() {
        const { cssVariablesLibs } = await Themeizer.init(this.initializer.value.options);
        const themesRow = Object.entries(cssVariablesLibs).map(([themeName, vars]) => (
            `.theme-${themeName} {${vars.join('')}}`
        )).join('');
        const themesTag = `<style>{\`${themesRow}\`}</style>`;
        return { themesTag };
    }
}

export default ThemeizerWrapper;