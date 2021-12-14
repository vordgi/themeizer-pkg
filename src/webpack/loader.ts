import ThemeizerLoader from "./Wrapper";

const themeizerLoader = ThemeizerLoader.init()

export default function (this: any, source: string) {
    const callback = this.async();
    themeizerLoader.then(({themesTag}) => {
        if (source.match(/<[^<>]*data-type=('|")themeizer('|")[^<>]*(\/>|>[^<>]*<\/[^<>]*>)/g)) {
            source = source.replace(/<[^<>]*data-type=('|")themeizer('|")[^<>]*(\/>|[^\\]>[^<>]*<\/[^<>]*>)/g, themesTag);
        }
        callback(null, source);
    })
}