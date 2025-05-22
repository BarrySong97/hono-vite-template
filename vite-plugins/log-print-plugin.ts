import type { ViteDevServer } from "vite";
import { printLogo } from "../app/utils/logger";

export function LogPrintPlugin() {
  return {
    name: "my-listener-plugin",
    configureServer(server: ViteDevServer) {
      return () => {
        server.httpServer?.on("listening", () => {
          printLogo();
        });
      };
    },
  };
}
