import ThemeizerWebpackWrapper from "./Wrapper";

const themeizerWebpackWrapper = ThemeizerWebpackWrapper.init();

export default function (this: any, source: string) {
    const callback = this.async();

    themeizerWebpackWrapper.then(({ themesTag }) => {
        if (source.match(/<[^<>]*data-type=('|")themeizer('|")[^<>]*(\/>|>[^<>]*<\/[^<>]*>)/g)) {
            source = source.replace(/<[^<>]*data-type=('|")themeizer('|")[^<>]*(\/>|[^\\]>[^<>]*<\/[^<>]*>)/g, themesTag);
        }
        callback(null, source);
    })
}
