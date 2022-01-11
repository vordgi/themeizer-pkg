import type { GlobalRefType } from '../types/themeizer';
import GlobalRef from '../Themeizer/GlobalRef';
import Themeizer from '../Themeizer/index';

class ThemeizerWebpackWrapper {
    static initializer = new GlobalRef<GlobalRefType>('themeizer');

    static async init () {
        this.initializer.value = this.initializer.value || {};
        if (process.env.THEMEIZER_OPTIONS && !this.initializer.value.options) {
            this.initializer.value.options = JSON.parse(process.env.THEMEIZER_OPTIONS)
        }
        if (!this.initializer.value.options) throw new Error('Please, configure Wrapper');
        const { cssVariablesLibs } = await Themeizer.init(this.initializer.value.options);
        const themesRow = Object.entries(cssVariablesLibs).map(([themeName, themeObj]) => (
            `.theme-${themeName} {${themeObj.list.join('')}${themeObj.type === 'dark' ? 'color-scheme: dark;' : ''}}`
        )).join('');
        const themesTag = `<style>{\`${themesRow}\`}</style>`;
        return { themesTag };
    }
}

export default ThemeizerWebpackWrapper;
