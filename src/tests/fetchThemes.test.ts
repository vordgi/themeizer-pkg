import { COLORS_MIN } from './constants';
import fetchThemes from '../Themeizer/fetchThemes';
import mockFetch from "./mockFetch";

describe('Test fetching', () => {
  mockFetch();
  test('should return correct data', async () => {
    const data = await fetchThemes({
      url: "/colors-min",
      headers: {},
      revalidate: 1
    })
    expect(data).toEqual({
      list: COLORS_MIN, defaultTheme: 'light'
    });
  });
  test('should throw error if response not ok', async () => {
    const fetchThemesPromise = fetchThemes({
      url: "/colors-min",
      headers: { token: "Invalid token" },
      revalidate: 1
    })
    await expect(fetchThemesPromise).rejects.toThrow("Your token is invalid");
  });
  test('should throw error if invalid status in response with error key', async () => {
    const fetchThemesPromise = fetchThemes({
      url: "/invalid-status-in-response-with-error-key",
      revalidate: 1
    })
    await expect(fetchThemesPromise).rejects.toThrow("Invalid status in response with error key");
  });
  test('should throw error if invalid status in response with error key', async () => {
    const fetchThemesPromise = fetchThemes({
      url: "/invalid-status-in-response-with-err-key",
      revalidate: 1
    })
    await expect(fetchThemesPromise).rejects.toThrow("Status 400: Invalid status in response with err key");
  });
});
