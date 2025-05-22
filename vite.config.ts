import { defineConfig } from "vite";
import path, { resolve } from "path";
import { VitePluginNode } from "vite-plugin-node";
import { getRequestListener } from "@hono/node-server";
import { LogPrintPlugin } from "./vite-plugins/log-print-plugin";
import { CodeUpdateLogPlugin } from "./vite-plugins/code-update-log-plugin";
import { readFileSync } from "fs";
function getPackageVersion(packageName: string) {
  try {
    const packageJsonPath = resolve(
      process.cwd(),
      "node_modules",
      packageName,
      "package.json"
    );
    // Or for a local package: resolve(__dirname, 'path/to/local-package/package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    return packageJson.version;
  } catch (error) {
    console.error(`Error reading package.json for ${packageName}:`, error);
    return null;
  }
}
// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    CodeUpdateLogPlugin(),
    ...VitePluginNode({
      adapter({ app, req, res }) {
        if (app && typeof app.fetch === "function") {
          if (getRequestListener) {
            try {
              const listener = getRequestListener(app.fetch);
              listener(req, res);
            } catch (e: any) {
              console.error(
                "Error creating or using Hono request listener:",
                e
              );
              res.statusCode = 500;
              res.end("Internal server error with Hono adapter.");
            }
          } else {
            console.error(
              "Hono's getRequestListener is not available. Please check your @hono/node-server installation and version."
            );
            res.statusCode = 500;
            res.end(
              "Hono adapter misconfiguration: getRequestListener not found."
            );
          }
        } else {
          console.error(
            "The exported 'app' (viteNodeApp) is not a valid Hono instance or lacks a .fetch method."
          );
          res.statusCode = 500;
          res.end(
            "Application (viteNodeApp) is not correctly configured or exported."
          );
        }
      },
      appPath: "./app/index.ts",
      exportName: "viteNodeApp",
      initAppOnBoot: false,
      tsCompiler: "esbuild",
      swcOptions: {},
    }),
    LogPrintPlugin(),
  ],
  define: {
    "import.meta.env.HONO_VERSION": JSON.stringify(getPackageVersion("hono")),
    "import.meta.env.VITE_VERSION": JSON.stringify(getPackageVersion("vite")),
    "import.meta.env.VITE_PORT": JSON.stringify(3000),
  },
});
