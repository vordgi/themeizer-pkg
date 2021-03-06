import ThemeizerPlugin from '../webpack/plugin';
import "./mockFetch";
import Wrapper from '../server/Wrapper';

describe('Test server wrapper', () => {
  test('should throw an error if config is undefined', async () => {
    await expect(async () => await Wrapper.init()).rejects.toThrow("Please, configure Wrapper");
  });
  test('should work with options passed via process environment', async () => {
    process.env.THEMEIZER_OPTIONS = JSON.stringify({
      url: "/colors-min",
      headers: {},
      revalidate: 1
    });
    const wrapper = await Wrapper.init();
    expect(wrapper && Object.keys(wrapper)).toEqual(["fetchValidThemes", "options", "data"]);
  });
  test('should work with multiple requests at same time and when revalidate is 0', async () => {
    new ThemeizerPlugin({
      headers: {},
      url: "/test-revalidate-0",
      revalidate: 0
    });
    await expect(Promise.all([
        Wrapper.init(),
        Wrapper.init(),
        Wrapper.init()
    ])).resolves.not.toThrow();
  });
  test('should work with multiple requests at same time and when revalidate is null', async () => {
    new ThemeizerPlugin({
      headers: {},
      url: "/test-revalidate-null",
      revalidate: null
    });
    await expect(Promise.all([
      Wrapper.init(),
      Wrapper.init(),
      Wrapper.init()
    ])).resolves.not.toThrow();
  });
  test('should work with multiple requests at chain', async () => {
    new ThemeizerPlugin({
      headers: {},
      url: "/test-revalidate-0-chain",
      revalidate: 0
    });
    await expect(
      Wrapper.init().then(() => Wrapper.init()).then(() => Wrapper.init())
    ).resolves.not.toThrow();
  });
});
