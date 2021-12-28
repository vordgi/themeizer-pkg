import compiler from "./compiler";
import mockFetch from "./mockFetch";

const expectedFile = `const SomeClass = () => (\n  "<html><head><style>{\`.theme-dark {--primary: rgb(102, 182, 255);--linear: linear-gradient(var(--linear-setting, 0), rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%);--radial: radial-gradient(var(--radial-setting, circle), rgb(224, 224, 224) 0%, rgba(223, 223, 223, 0) 100%);}.theme-light {--primary: rgb(0, 26, 119);--linear: linear-gradient(var(--linear-setting, 0), rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%);--radial: radial-gradient(var(--radial-setting, circle), rgb(51, 51, 51) 0%, rgba(51, 51, 51, 0) 100%);}\`}</style></head><body></body></html>"\n)`

describe('Test loader', () => {
  mockFetch();
  test('should test loader', async () => {
    const stats = await compiler('test.js');
    const output = stats.toJson({ source: true }).modules[0].source;    

    expect(output.replace(/\r\n/g, '\n')).toBe(expectedFile);
  });
});
