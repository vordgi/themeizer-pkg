import type { ThemesObj } from '../types/themeizer';

const { TOKEN, BIN } = process.env;

if (!TOKEN) throw new Error('Please, add token');
if (!BIN) throw new Error('Please, add bin');

const fetchThemes = async (): Promise<{ record: ThemesObj }> => {
  try {
    const resp = await fetch(`https://api.jsonbin.io/v3/b/${BIN}/latest`, {
      headers: {
        'X-Master-Key': TOKEN,
      },
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
