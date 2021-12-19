import type { Options, ThemesObj } from '../types/themeizer';
import fetchThemes from './fetchThemes';

class ThemeizerWorker {
  options;

  private colorsRegex = /[a-z0-9-_]*\/[a-z0-9-_]/;

  data!: ThemesObj;

  constructor(options: Options) {
    this.options = options;
  }

  private fetchValidThemes = async ():Promise<void> => {
    const themesData = await fetchThemes(this.options);
    const { list, defaultTheme } = themesData.record;
    const colorsFiltered = list.filter(({ name }) => name.match(this.colorsRegex));
    this.data = { list: colorsFiltered, defaultTheme };
  };

  get cssVariablesLibs(): { [theme: string]: string[] } {
    const list = this.data.list.reduce<{ [theme: string]: string[] }>((acc, cur) => {
      const [theme, ...name] = cur.name.split('/');
      if (!acc[theme]) acc[theme] = [];
      const varName = name.join('-')
      if (cur.type === 'solid') {
        acc[theme].push(`--${varName}: ${cur.value};`);
      } else if (cur.type === 'linear') {
        acc[theme].push(`--${varName}: linear-gradient(var(--${varName}-setting, 0), ${cur.value});`);
      } else if (cur.type === 'radial') {
        acc[theme].push(`--${varName}: radial-gradient(var(--${varName}-setting, circle), ${cur.value});`);
      }
      return acc;
    }, {});
    return list;
  }

  static init = async (options: Options): Promise<ThemeizerWorker> => {
    const themeizerWorker = new ThemeizerWorker(options);
    await themeizerWorker.fetchValidThemes();
    return themeizerWorker;
  };
}

export default ThemeizerWorker;
