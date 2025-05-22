import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { pinoLogger } from "hono-pino";
import { printLogo, printVersion } from "../utils/logger";
import "dotenv/config";

const app = new Hono();
app.use(
  pinoLogger({
    pino: {
      level: "debug",
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          singleLine: true,
        },
      },
    },
  })
);
app.get("/", (c) => {
  return c.text(`Hello world!`);
});
if (import.meta.env.PROD) {
  serve(app, () => {
    printVersion();
  });
}

export const viteNodeApp = app;
