import type { GlobalRefType } from '../types/themeizer';
import GlobalRef from '../Themeizer/GlobalRef';
import Themeizer from '../Themeizer/index';

class ThemeizerWrapper {
    static initializer = new GlobalRef<GlobalRefType>('themeizer');

    private static isUpdateNeeded() {
        if (!this.initializer.value.worker) return true;
        if (!this.initializer.value.revalidate) return false;
        const nextFetch = this.initializer.value.lastFetched + this.initializer.value.revalidate * 60 * 1000;
        const isOldData = this.initializer.value.loaded && nextFetch < +new Date();
        return isOldData;
    }

    static async init(autoUpdate: boolean = true) {
        this.initializer.value = this.initializer.value || {};

        if (autoUpdate && this.isUpdateNeeded()) {
            this.initializer.value.loaded = false;
            this.initializer.value.worker = Themeizer.init();
        }

        const { cssVariablesLibs } = await this.initializer.value.worker;
        if (!this.initializer.value.loaded) {
            this.initializer.value.loaded = true;
            this.initializer.value.lastFetched = +new Date();
        }

        return { cssVariablesLibs };
    }
}

export default ThemeizerWrapper;