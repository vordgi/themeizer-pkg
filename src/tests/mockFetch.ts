import GlobalRef from "../Themeizer/GlobalRef";
import { COLORS_MIN } from "./constants";

const mockFetch = () => {
    const isMocked = new GlobalRef<boolean>('mock');
    global.fetch = async (url, options: any) => {
        if (options.headers.token === 'Invalid token') {
            return ({ ok: false, statusText: "Your token is invalid" })
        }
        if (url === '/invalid-status-in-response-with-error-key') {
            return ({
                ok: true,
                json: async () => {
                    return {
                        status: 323, error: "Invalid status in response with error key"
                    }
                }
            })
        }
        if (url === '/invalid-status-in-response-with-err-key') {
            return ({
                ok: true,
                json: async () => {
                    return {
                        status: 400, err: "Invalid status in response with err key"
                    }
                }
            })
        }
        return ({
            ok: true,
            json: async () => {
                return {
                    list: COLORS_MIN, defaultTheme: 'light'
                }
            }
        }) as any;
    };
    if (!isMocked.value) {
        isMocked.value = true;
    }
}

export default mockFetch;
