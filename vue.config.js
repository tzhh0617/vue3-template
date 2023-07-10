const Unocss = require("@unocss/webpack").default;
const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const AutoImport = require("unplugin-auto-import/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const Components = require("unplugin-vue-components/webpack");
const { VueRouterExports } = require("unplugin-vue-router");
const VueRouter = require("unplugin-vue-router/webpack").default;

const pathSrc = path.resolve(__dirname, "src");

const name = 'global'

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    devServer: {
      open: true,
      port: 8090,
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    },
    resolve: {
      alias: {
        "@/": `${pathSrc}/`,
      },
    },
    css: {
      loaderOptions: {
        sass: {
          additionalData: `@use "@/styles/element/index.scss" as *;`,
        },
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

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          "vue",
          {
            "vue-router/auto": VueRouterExports,
          },
        ],
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
    optimization: {
      realContentHash: true,
    },
    // 把子应用打包成 umd 库格式
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },

});
