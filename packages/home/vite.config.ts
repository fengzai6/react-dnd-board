import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // 开发时直接使用源码
      "react-dnd-board": path.resolve(__dirname, "../react-dnd-board/src"),
    },
    // 确保这些依赖只有一个实例
    dedupe: ["react", "react-dom", "@hello-pangea/dnd"],
  },
  build: {
    outDir: "dist",
  },
});
