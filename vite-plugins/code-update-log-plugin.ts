import type { Plugin, ViteDevServer } from "vite";
import path from "path";
import chalk from "chalk";

export function CodeUpdateLogPlugin(): Plugin {
  return {
    name: "vite-plugin-code-update-log-with-ora",

    configureServer(server: ViteDevServer) {
      server.watcher.on("change", (filePath) => {
        const projectRoot = server.config.root;
        // Matches .env files like .env, .env.local, .env.development, etc.
        const envFilePattern = /^\.env(\..*)?$/;
        const relativeFilePath = path.relative(projectRoot, filePath);

        if (
          envFilePattern.test(path.basename(relativeFilePath)) &&
          relativeFilePath.startsWith(".env")
        ) {
          const currentTime = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          });
          const message = `${chalk.bgGreenBright(
            relativeFilePath
          )} file changed, restarting server...`;
          console.log(
            `\n ${currentTime} ${chalk.blue("[vite]")} ${chalk.blue(message)}`
          );
          server.restart();
        }
      });
    },
  };
}
