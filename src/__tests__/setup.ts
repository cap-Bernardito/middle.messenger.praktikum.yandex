import { server } from "./api-mock";

import "@testing-library/jest-dom";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
