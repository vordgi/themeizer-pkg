import ThemeizerWorker from './Worker';

class Themeizer {
  static init = async (themes?: string[]): Promise<ThemeizerWorker> => {
    const themeizer = await ThemeizerWorker.init(themes);
    return themeizer;
  };
}

export default Themeizer;
