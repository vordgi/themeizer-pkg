import ThemeizerPlugin from '../webpack/plugin';

describe('Test webpack plugin', () => {
  test('should throw an error if url is undefined', async () => {
    expect(() => new ThemeizerPlugin({
      headers: {},
      revalidate: 1
    } as any)).toThrow("Please, add \"url\" option");
  });
  test('plugin apply should not throw any error', async () => {
    expect(() => new ThemeizerPlugin({
      url: "/test-apply",
      headers: {},
      revalidate: 1
    }).apply()).not.toThrow();
  });
});
