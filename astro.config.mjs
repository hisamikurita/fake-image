import glsl from 'vite-plugin-glsl';
import viteImagemin from 'vite-plugin-imagemin'
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://hisamikurita.github.io',
  base: '/fake-image',
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'scripts/app.js',
          assetFileNames: 'assets/[name].[ext]'
        },
      },
    },
    plugins: [
      glsl(),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 80,
        },
        pngquant: {
          quality: [0.6, 0.8],
          speed: 4,
        },
        webp: {
          quality: 80,
        }
      }),
    ]
  },
});
