/* eslint-disable */
import { CLOUD_COLORS, CLOUD_COLORS_WITH_SHARED } from "./constants";
jest.mock('node-fetch');
import fetch from 'node-fetch';

(fetch as any as jest.Mock<any, any>).mockImplementation(async (url, options: any) => {
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
    if (url === '/with-shared') {
        return ({
            ok: true,
            json: async () => {
                return CLOUD_COLORS_WITH_SHARED
            }
        })
    }
    return ({
        ok: true,
        json: async () => {
            return CLOUD_COLORS
        }
    }) as any;
});
