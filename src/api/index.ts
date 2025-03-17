const MOCK_DELAY = 500;

export async function mockRequest<T>(data: T, fail = false): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject(new Error("Mock API error"));
      } else {
        resolve(data);
      }
    }, MOCK_DELAY);
  });
}
