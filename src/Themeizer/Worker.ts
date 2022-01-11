import type { Options, ThemesObj } from '../types/themeizer';
import FetchWrapper from 'fetch-cache-wrapper/dist/Wrapper';

class ThemeizerWorker {
  options;

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
        this.data = data;
        return data;
      } catch (e) {
        throw new Error((e as {message: string}).message);
      }
    });
  };

  get cssVariablesLibs (): { [theme: string]: {list: string[], type: string} } {
    const dataEntries = Object.entries(this.data).map(([theme, { list, type }]) => {
      const newList = list.map(item => {
        const varName = item.name.replace('/', '-');
        let value = '';
        if (item.type === 'solid') {
          value = `${item.value}`
        } else if (item.type === 'linear') {
          value = `linear-gradient(var(--${varName}-setting, 0), ${item.value})`
        } else if (item.type === 'radial') {
          value = `radial-gradient(var(--${varName}-setting, circle), ${item.value})`
        }
        return (`--${varName}: ${value};`);
      })
      return [theme, { list: newList, type }];
    })

    return Object.fromEntries(dataEntries);
  }

  static init = async (options: Options): Promise<ThemeizerWorker> => {
    const themeizerWorker = new ThemeizerWorker(options);
    await themeizerWorker.fetchValidThemes();
    return themeizerWorker;
  };
}

export default ThemeizerWorker;
