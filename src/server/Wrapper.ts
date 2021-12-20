import type { GlobalRefType } from '../types/themeizer';
import GlobalRef from '../Themeizer/GlobalRef';
import Themeizer from '../Themeizer/index';

class ThemeizerWrapper {
    static initializer = new GlobalRef<GlobalRefType>('themeizer');

    private static isUpdateNeeded() {
        if (!this.initializer.value.worker) return true;
        if (!this.initializer.value.options.revalidate) return false;
        const nextFetch = this.initializer.value.lastFetched + this.initializer.value.options.revalidate * 60 * 1000;
        const isOldData = this.initializer.value.loaded && nextFetch < +new Date();
        return isOldData;
    }

    static async init(autoUpdate: boolean = true) {
        this.initializer.value = this.initializer.value || {};

        if (autoUpdate && this.isUpdateNeeded()) {
            this.initializer.value.loaded = false;
            if (!process.env.THEMEIZER_OPTIONS) throw new Error();
            const options = JSON.parse(process.env.THEMEIZER_OPTIONS)
            this.initializer.value.worker = Themeizer.init(options);
        }

        const worker = await this.initializer.value.worker;
        if (!this.initializer.value.loaded) {
            this.initializer.value.loaded = true;
            this.initializer.value.lastFetched = +new Date();
        }

        return worker;
    }
}

export default ThemeizerWrapper;