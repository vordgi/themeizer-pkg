import type ThemeizerWorker from "../Themeizer/Worker";

export type Options = {
    revalidate: number;
    url: string;
    headers?: {
        [key: string]: string;
    }
}

export type GlobalRefType = {worker: Promise<ThemeizerWorker>, loaded: boolean, options: Options, lastFetched: number};
export type ColorType = 'solid' | 'linear' | 'radial'
export type ColorObj = {theme: string, name: string, value: string, type: ColorType, origValue: string};
export type ColorCloudObj = { name: string; value: string, type: ColorType };
export type ColorList = ColorCloudObj[];
export type ThemesObj = { list: ColorList; defaultTheme: string };