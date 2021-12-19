import type { ColorObj, Options, ThemesObj } from '../types/themeizer';
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
    const { list, defaultTheme } = themesData;
    const colorsFiltered = list.filter(({ name }) => name.match(this.colorsRegex));
    this.data = { list: colorsFiltered, defaultTheme };
  };

  get cssVariablesObj(): ColorObj[] {
    const list = this.data.list.reduce<ColorObj[]>((acc, cur) => {
      const [theme, ...name] = cur.name.split('/');
      const varName = name.join('-');
      const baseColor = {theme, type: cur.type, name: `--${varName}`, origValue: cur.value};
      if (cur.type === 'solid') {
        acc.push({...baseColor, value: `${cur.value}`});
      } else if (cur.type === 'linear') {
        acc.push({...baseColor, value: `linear-gradient(var(--${varName}-setting, 0), ${cur.value})`});
      } else if (cur.type === 'radial') {
        acc.push({...baseColor, value: `radial-gradient(var(--${varName}-setting, circle), ${cur.value})`});
      }
      return acc;
    }, []);
    return list;
  }

  get cssVariablesLibs(): { [theme: string]: string[] } {
    const list = this.cssVariablesObj.reduce<{ [theme: string]: string[] }>((acc, cur) => {
      acc[cur.theme].push(`${cur.name}: ${cur.value};`)
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
