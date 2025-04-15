import { defineConfig } from "vite";
import HonoDev from "@hono/vite-dev-server";
import nodejsAdapter from "@hono/vite-dev-server/node";
import HonoBuild from "@hono/vite-build/node";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    HonoDev({
      entry: "src/index.ts",
      adapter: nodejsAdapter,
    }),
    HonoBuild({
      entry: "src/index.ts",
      port: 3000,
    }),
  ],
});
