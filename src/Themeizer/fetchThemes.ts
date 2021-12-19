import type { Options, ThemesObj } from '../types/themeizer';

const fetchThemes = async (options: Options): Promise<{ record: ThemesObj }> => {
  try {
    const resp = await fetch(options.url, {
      headers: options.headers || {},
    });
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    const data = await resp.json();
    if (data.status && data.status !== 200) {
      throw new Error(data.error || `Status ${data.status}: ${data.err}`);
    }

    return data;
  } catch (e) {
    throw new Error((e as {message: string}).message);
  }
};
export default fetchThemes;
