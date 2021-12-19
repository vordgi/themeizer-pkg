import type { GlobalRefType, Options } from '../types/themeizer';
import GlobalRef from '../Themeizer/GlobalRef';

interface PluginOptions extends Omit<Options, 'revalidate'> {
    revalidate?: number
}

class ThemeizerPlugin {
    initializer = new GlobalRef<GlobalRefType>('themeizer');

    options;

    static defaultOptions = {
        revalidate: 1, // in mins
    };

    constructor(options: PluginOptions) {
        if (!options.url) {
            throw new Error('Please, add "url" option');
        }
        this.options = { ...ThemeizerPlugin.defaultOptions, ...options };
        this.initializer.value = {} as any;
        this.initializer.value.options = this.options;
    }

    apply() {}
}

export default ThemeizerPlugin;