import ThemeizerPlugin from '../webpack/plugin';

describe('Test webpack plugin', () => {
  test('should throw an error if url is undefined', async () => {
    expect(() => new ThemeizerPlugin({
      headers: {},
      revalidate: 1
    } as any)).toThrow("Please, add \"url\" option");
  });
  test('should use node-fetch if global.fetch is undefined', async () => {
    global.fetch = null as any;
    expect(() => new ThemeizerPlugin({
      headers: {},
      url: "any",
      revalidate: 1
    } as any)).not.toThrow();
  });
});
