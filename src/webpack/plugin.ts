import type { GlobalRefType, Options } from '../types/themeizer';
import GlobalRef from '../Themeizer/GlobalRef';
import fetch from 'node-fetch';
import webpack from 'webpack';

const defaultOptions = {
    revalidate: 1, // in mins
};

const initializer = new GlobalRef<GlobalRefType>('themeizer');
interface PluginOptions extends Omit<Options, 'revalidate'> {
    revalidate?: number
}

export default (options: PluginOptions) => {
    if (!options.url) {
        throw new Error('Please, add "url" option');
    }
    if (!global.fetch) global.fetch = fetch as any;
    initializer.value = {} as any;
    const validOptions = {...defaultOptions, ...options};
    initializer.value.options = validOptions;
    return new webpack.DefinePlugin({THEMEIZER_OPTIONS: JSON.stringify(validOptions)});
}
