import type { GlobalRefType } from "../types/themeizer";
import GlobalRef from "../Themeizer/GlobalRef";
import ThemeizerLoader from "./Wrapper";

const themeizerLoader = ThemeizerLoader.init();
const initializer = new GlobalRef<GlobalRefType>('themeizer');
initializer.value = initializer.value || {};

export default function (this: any, source: string) {
    const options = this.getOptions();
    if (!options.revalidate || typeof options.revalidate !== 'number') throw new Error("Themeizer. 'options.revalidate' must be a number");
    const callback = this.async();

    initializer.value.revalidate = options.revalidate;

    themeizerLoader.then(({themesTag}) => {
        if (source.match(/<[^<>]*data-type=('|")themeizer('|")[^<>]*(\/>|>[^<>]*<\/[^<>]*>)/g)) {
            source = source.replace(/<[^<>]*data-type=('|")themeizer('|")[^<>]*(\/>|[^\\]>[^<>]*<\/[^<>]*>)/g, themesTag);
        }
        callback(null, source);
    })
}