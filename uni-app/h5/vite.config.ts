import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

export default defineConfig({
  plugins: [uni()],
  server: {
    proxy: {
      '/h5': {
        target: 'https://misxzaiz.github.io/h5',
        changeOrigin: true,
      },
    }
  }
});
