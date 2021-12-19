import type { Options } from '../types/themeizer';
import ThemeizerWorker from './Worker';

class Themeizer {
  static init = async (options: Options): Promise<ThemeizerWorker> => {
    const themeizer = await ThemeizerWorker.init(options);
    return themeizer;
  };
}

export default Themeizer;
