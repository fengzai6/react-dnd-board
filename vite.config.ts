import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vitest/config";

const isLib = process.env.BUILD_MODE === "lib";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
    // 只在构建 lib 时生成 dts
    isLib &&
      dts({
        pathsToAliases: true,
        tsconfigPath: "./tsconfig.app.json",
        insertTypesEntry: true,
        include: ["src/lib/**"],
        exclude: [
          "src/test/**",
          "**/__tests__/**",
          "**/*.test.ts",
          "**/*.test.tsx",
          "**/*.spec.ts",
          "**/*.spec.tsx",
        ],
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  publicDir: isLib ? false : "public",
  build: isLib
    ? {
        // 构建库文件
        outDir: "dist",
        lib: {
          entry: path.resolve(__dirname, "src/lib/index.ts"),
          name: "ReactDndBoard",
          fileName: (format) => `index.${format}.js`,
          formats: ["es", "umd"],
        },
        rollupOptions: {
          external: ["react", "react-dom", "@hello-pangea/dnd"],
          output: {
            assetFileNames: "style.css",
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "@hello-pangea/dnd": "HelloPangeaDnd",
            },
          },
        },
      }
    : {
        // 构建案例网站
        outDir: "dist/app",
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, "index.html"),
          },
        },
      },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
