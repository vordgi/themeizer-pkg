import ThemeizerPlugin from '../webpack/plugin';
import Wrapper from '../webpack/Wrapper';
import mockFetch from "./mockFetch";

describe('Test webpack wrapper', () => {
  mockFetch();
  test('should throw an error if config is undefined', async () => {
    await expect(async () => await Wrapper.init()).rejects.toThrow("Please, configure Wrapper");
  });
  test('should work with options passed via process environment', async () => {
    process.env.THEMEIZER_OPTIONS = JSON.stringify({
      url: "/colors-min",
      headers: {},
      revalidate: 1
    });
    const { themesTag } = await Wrapper.init();
    expect(themesTag).toEqual("<style>{`.theme-light{--primary:rgb(0, 26, 119);--linear:linear-gradient(var(--linear-setting, 0), rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%);--radial:radial-gradient(var(--radial-setting, circle), rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%);color-scheme:light;}.theme-dark{--primary:rgb(102, 182, 255);--linear:linear-gradient(var(--linear-setting, 0), rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%);--radial:radial-gradient(var(--radial-setting, circle), rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%);color-scheme:dark;}`}</style>");
  });
  test('should return correct themes tag with shared variables', async () => {
    new ThemeizerPlugin({
      url: "/with-shared",
      headers: {},
      revalidate: 1
    });
    const { themesTag } = await Wrapper.init();
    expect(themesTag).toEqual("<style>{`.theme-light{--primary:rgb(0, 26, 119);--linear:linear-gradient(var(--linear-setting, 0), rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%);--radial:radial-gradient(var(--radial-setting, circle), rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%);color-scheme:light;}.theme-dark{--primary:rgb(102, 182, 255);--linear:linear-gradient(var(--linear-setting, 0), rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%);--radial:radial-gradient(var(--radial-setting, circle), rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%);color-scheme:dark;}:root{--custom-logo:rgb(0, 229, 255);}`}</style>");
  });
});
