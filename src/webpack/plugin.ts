import type { GlobalRefType, Options } from '../types/themeizer';
import GlobalRef from '../Themeizer/GlobalRef';

interface PluginOptions extends Omit<Options, 'revalidate'> {
    revalidate: number | null
}

class ThemeizerPlugin {
    initializer = new GlobalRef<GlobalRefType>('themeizer');

    options;

    defaultOptions = {
        revalidate: 1 // in mins
    };

    constructor (options: PluginOptions) {
        if (!options.url) {
            throw new Error('Please, add "url" option');
        }
        this.options = { ...this.defaultOptions, ...options };
        this.initializer.value = {} as any;
        this.initializer.value.options = this.options;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    apply () {}
}

export default ThemeizerPlugin;
