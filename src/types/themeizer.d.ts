import type ThemeizerWorker from "../Themeizer/Worker";

export type GlobalRefType = {worker: Promise<ThemeizerWorker>, loaded: boolean, revalidate: number, lastFetched: number};
export type ColorType = { name: string; value: string };
export type ColorList = ColorType[];
export type ThemesObj = { list: ColorList; defaultTheme: string };
