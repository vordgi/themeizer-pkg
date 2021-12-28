import path from 'path';
import webpack from 'webpack';
import ThemeizerPlugin from '../webpack/plugin';

export default (fixture: any, options = {}) => {
    const compiler = webpack({
        context: __dirname,
        entry: `./${fixture}`,
        module: {
            rules: [{
                test: /\.js$/,
                use: {
                    loader: path.resolve(__dirname, '../../dist/webpack/loader.js'),
                    options,
                },
            }],
        },
        plugins: [new ThemeizerPlugin({
            url: "/colors-min",
            headers: {},
            revalidate: 1
        })]
    });
    return new Promise<any>((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) reject(err);
            if (stats?.hasErrors()) reject(stats.toJson().errors);

            resolve(stats);
        });
    });
};