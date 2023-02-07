import { rest } from "msw";
import { setupServer } from "msw/node";

const handlers = [
  rest.post(`${process.env.API_ENDPOINT}/auth/logout`, (_req, res, ctx) => {
    console.log("Call logout endpoint");

    return res(ctx.status(100));
  }),
];

export const server = setupServer(...handlers);
