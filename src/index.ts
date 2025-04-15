import { Hono } from "hono";
import { pinoLogger } from "hono-pino";

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
app.get("/", (c) => c.text("Hello Vit22e!"));

app.get("/api/onedrive/webhook", (c) => {
  return c.json({
    message: "Hello World2",
  });
});

export default app;
