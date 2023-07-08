import vue from "@vitejs/plugin-vue";
import path from "path";
import Unocss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import VueRouter from "unplugin-vue-router/vite";
import { defineConfig } from "vite";

const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    host: true,
    port: 8090,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    alias: {
      "@/": `${pathSrc}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      routesFolder: "src/pages",
      dts: "src/auto-router.d.ts",
    }),

    // Vue must be placed after VueRouter()
    vue(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", VueRouterAutoImports],
      eslintrc: {
        enabled: true,
      },
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/stores"],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
      dts: "src/components.d.ts",
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],
});
