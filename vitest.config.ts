import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setup-vitest.ts"],
    include: ["projects/**/*.spec.ts", "src/**/*.spec.ts"]
  }
});
