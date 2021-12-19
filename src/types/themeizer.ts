import type ThemeizerWorker from "../Themeizer/Worker";

export type Options = {
    revalidate: number;
    url: string;
    headers?: {
        [key: string]: string;
    }
}

export type GlobalRefType = {worker: Promise<ThemeizerWorker>, loaded: boolean, options: Options, lastFetched: number};
export type ColorType = { name: string; value: string, type: 'solid' | 'linear' | 'radial' };
export type ColorList = ColorType[];
export type ThemesObj = { list: ColorList; defaultTheme: string };