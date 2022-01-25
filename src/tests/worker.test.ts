import { CLOUD_COLORS, CLOUD_COLORS_WITH_SHARED, COLORS_VARIABLES_OBJ } from './constants';
import "./mockFetch";
import Worker from '../Themeizer/Worker';

describe('Test worker', () => {
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
    expect(resp).toEqual(CLOUD_COLORS);
  });
  test('should contain shared variables', async () => {
    const ThemeizerWorker = await Worker.init({
      url: "/with-shared",
      headers: {},
      revalidate: 1
    });
    const resp = ThemeizerWorker.data;
    expect(resp).toEqual(CLOUD_COLORS_WITH_SHARED);
  });
  test('should parse colors correctly', async () => {
    const ThemeizerWorker = await Worker.init({
      url: "/colors-min",
      headers: {},
      revalidate: 1
    });
    const resp = ThemeizerWorker.cssVariablesLibs;
    expect(resp).toEqual(COLORS_VARIABLES_OBJ);
  });
  test('should throw error if response not ok', async () => {
    const ThemeizerWorker = Worker.init({
      url: "/request-with-invalid-token",
      headers: { token: "Invalid token" },
      revalidate: 1
    });
    await expect(ThemeizerWorker).rejects.toThrow("Your token is invalid");
  });
  test('should throw error if invalid status in response with error key', async () => {
    const ThemeizerWorker = Worker.init({
      url: "/invalid-status-in-response-with-error-key",
      revalidate: 1
    });
    await expect(ThemeizerWorker).rejects.toThrow("Invalid status in response with error key");
  });
  test('should throw error if invalid status in response with error key', async () => {
    const ThemeizerWorker = Worker.init({
      url: "/invalid-status-in-response-with-err-key",
      revalidate: 1
    });
    await expect(ThemeizerWorker).rejects.toThrow("Status 400: Invalid status in response with err key");
  });
});
