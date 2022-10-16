import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";
import { server } from "./mocks/server";

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ jo: "boss" }),
//   })
// ) as jest.Mock;

beforeAll(() =>  server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
