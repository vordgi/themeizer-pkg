import type { ThemesObj } from './types';
import fetchThemes from './fetchThemes';

class ThemeizerWorker {
  private colorsRegex = /[a-z0-9-_]*\/[a-z0-9-_]/;

  data!: ThemesObj;

  constructor(themes?: string[]) {
    if (themes) this.colorsRegex = new RegExp(`(${themes.join('|')})/.`);
  }

  private fetchValidThemes = async ():Promise<void> => {
    const themesData = await fetchThemes();
    const { list, defaultTheme } = themesData.record;
    const colorsFiltered = list.filter(({ name }) => name.match(this.colorsRegex));
    this.data = { list: colorsFiltered, defaultTheme };
  };

  get cssVariablesLibs(): { [theme: string]: string[] } {
    const list = this.data.list.reduce<{ [theme: string]: string[] }>((acc, cur) => {
      const [theme, ...name] = cur.name.split('/');
      if (!acc[theme]) acc[theme] = [];
      acc[theme].push(`--${name.join('-')}: ${cur.value};`);
      return acc;
    }, {});
    return list;
  }

  static init = async (themes?: string[]): Promise<ThemeizerWorker> => {
    const themeizerWorker = new ThemeizerWorker(themes);
    await themeizerWorker.fetchValidThemes();
    return themeizerWorker;
  };
}

export default ThemeizerWorker;
