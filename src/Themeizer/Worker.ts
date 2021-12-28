import type { ColorObj, Options, ThemesObj } from '../types/themeizer';
import FetchWrapper from 'fetch-cache-wrapper/dist/Wrapper';

class ThemeizerWorker {
  options;

  private colorsRegex = /[a-z0-9-_]*\/[a-z0-9-_]/;

  data!: ThemesObj;

  constructor (options: Options) {
    this.options = options;
  }

  private fetchValidThemes = async ():Promise<void> => {
    await FetchWrapper.fetch(this.options, async (resp) => {
      try {
        const data = await resp.json();
        if (data.status && data.status !== 200) {
          throw new Error(data.error || `Status ${data.status}: ${data.err}`);
        }
        const { list, defaultTheme } = data as ThemesObj;
        const colorsFiltered = list.filter(({ name }) => name.match(this.colorsRegex));
        this.data = { list: colorsFiltered, defaultTheme };
        return data;
      } catch (e) {
        throw new Error((e as {message: string}).message);
      }
    });
  };

  get cssVariablesObj (): ColorObj[] {
    const list = this.data.list.reduce<ColorObj[]>((acc, cur) => {
      const [theme, ...name] = cur.name.split('/');
      const varName = name.join('-');
      const baseColor = { theme, type: cur.type, name: `--${varName}`, origValue: cur.value };
      if (cur.type === 'solid') {
        acc.push({ ...baseColor, value: `${cur.value}` });
      } else if (cur.type === 'linear') {
        acc.push({ ...baseColor, value: `linear-gradient(var(--${varName}-setting, 0), ${cur.value})` });
      } else if (cur.type === 'radial') {
        acc.push({ ...baseColor, value: `radial-gradient(var(--${varName}-setting, circle), ${cur.value})` });
      }
      return acc;
    }, []);
    return list;
  }

  get cssVariablesLibs (): { [theme: string]: string[] } {
    const list = this.cssVariablesObj.reduce<{ [theme: string]: string[] }>((acc, cur) => {
      acc[cur.theme] = acc[cur.theme] || [];
      acc[cur.theme].push(`${cur.name}: ${cur.value};`);
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
