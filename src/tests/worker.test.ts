import { COLORS_MIN, COLORS_VARIABLES_LIBS, COLORS_VARIABLES_OBJ } from './constants';
import Worker from '../Themeizer/Worker';
import mockFetch from "./mockFetch";

describe('Test worker', () => {
  mockFetch();
  test('should contain orig options', async () => {
    const ThemeizerWorker = await Worker.init({
      url: "/colors-min",
      headers: {},
      revalidate: 1
    });
    const resp = ThemeizerWorker.options;
    expect(resp).toEqual({
      url: "/colors-min",
      headers: {},
      revalidate: 1
    });
  });
  test('should contain orig data', async () => {
    const ThemeizerWorker = await Worker.init({
      url: "/colors-min",
      headers: {},
      revalidate: 1
    });
    const resp = ThemeizerWorker.data;
    expect(resp).toEqual({
      list: COLORS_MIN, defaultTheme: 'light'
    });
  });
  test('should contain orig data', async () => {
    const ThemeizerWorker = await Worker.init({
      url: "/colors-min",
      headers: {},
      revalidate: 1
    });
    const resp = ThemeizerWorker.data;
    expect(resp).toEqual({
      list: COLORS_MIN, defaultTheme: 'light'
    });
  });
  test('should parse colors correctly', async () => {
    const ThemeizerWorker = await Worker.init({
      url: "/colors-min",
      headers: {},
      revalidate: 1
    });
    const resp = ThemeizerWorker.cssVariablesObj;
    expect(resp).toEqual(COLORS_VARIABLES_OBJ);
  });
  test('should sort colors correctly', async () => {
    const ThemeizerWorker = await Worker.init({
      url: "/colors-min",
      headers: {},
      revalidate: 1
    });
    const resp = ThemeizerWorker.cssVariablesLibs;
    expect(resp).toEqual(COLORS_VARIABLES_LIBS);
  });
});
