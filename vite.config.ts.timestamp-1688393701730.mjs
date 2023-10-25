// vite.config.ts
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "file:///C:/Users/DELL/Desktop/LexAlgeria/node_modules/.pnpm/vite@4.1.4_@types+node@18.11.18_sass@1.57.1/node_modules/vite/dist/node/index.js";
import Vue from "file:///C:/Users/DELL/Desktop/LexAlgeria/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.1.4_vue@3.2.45/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueRouter from "file:///C:/Users/DELL/Desktop/LexAlgeria/node_modules/.pnpm/unplugin-vue-router@0.3.0_rollup@3.9.1_vue-router@4.1.6_vue@3.2.45/node_modules/unplugin-vue-router/dist/vite.mjs";
import { VueRouterAutoImports } from "file:///C:/Users/DELL/Desktop/LexAlgeria/node_modules/.pnpm/unplugin-vue-router@0.3.0_rollup@3.9.1_vue-router@4.1.6_vue@3.2.45/node_modules/unplugin-vue-router/dist/index.mjs";
import Components from "file:///C:/Users/DELL/Desktop/LexAlgeria/node_modules/.pnpm/unplugin-vue-components@0.22.12_rollup@3.9.1_vue@3.2.45/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///C:/Users/DELL/Desktop/LexAlgeria/node_modules/.pnpm/unplugin-auto-import@0.12.1_@vueuse+core@9.10.0_rollup@3.9.1/node_modules/unplugin-auto-import/dist/vite.js";
import { VitePluginFonts } from "file:///C:/Users/DELL/Desktop/LexAlgeria/node_modules/.pnpm/vite-plugin-fonts@0.7.0_vite@4.1.4/node_modules/vite-plugin-fonts/dist/index.js";
import { VitePluginRadar } from "file:///C:/Users/DELL/Desktop/LexAlgeria/node_modules/.pnpm/vite-plugin-radar@0.6.0_vite@4.1.4/node_modules/vite-plugin-radar/dist/index.js";
import PurgeIcons from "file:///C:/Users/DELL/Desktop/LexAlgeria/node_modules/.pnpm/vite-plugin-purge-icons@0.9.2_vite@4.1.4/node_modules/vite-plugin-purge-icons/dist/index.mjs";
import ImageMin from "file:///C:/Users/DELL/Desktop/LexAlgeria/node_modules/.pnpm/vite-plugin-imagemin@0.6.1_vite@4.1.4/node_modules/vite-plugin-imagemin/dist/index.mjs";
import VueI18nPlugin from "file:///C:/Users/DELL/Desktop/LexAlgeria/node_modules/.pnpm/@intlify+unplugin-vue-i18n@0.8.1_vue-i18n@9.3.0-beta.12/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import { VitePWA } from "file:///C:/Users/DELL/Desktop/LexAlgeria/node_modules/.pnpm/vite-plugin-pwa@0.14.1_vite@4.1.4_workbox-build@6.5.4_workbox-window@6.5.4/node_modules/vite-plugin-pwa/dist/index.mjs";
import purgecss from "file:///C:/Users/DELL/Desktop/LexAlgeria/node_modules/.pnpm/rollup-plugin-purgecss@5.0.0/node_modules/rollup-plugin-purgecss/lib/rollup-plugin-purgecss.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/DELL/Desktop/LexAlgeria/vite.config.ts";
var MINIFY_IMAGES = process.env.MINIFY ? process.env.MINIFY === "true" : false;
var vite_config_default = defineConfig({
  // Project root directory (where index.html is located).
  root: process.cwd(),
  // Base public path when served in development or production.
  // You also need to add this base like `history: createWebHistory('my-subdirectory')`
  // in ./src/router.ts
  // base: '/my-subdirectory/',
  base: "/",
  // Directory to serve as plain static assets.
  publicDir: "public",
  // Adjust console output verbosity.
  logLevel: "info",
  // development server configuration
  server: {
    port: 3e3,
    host: "0.0.0.0"
  },
  /**
   * By default, Vite will crawl your index.html to detect dependencies that
   * need to be pre-bundled. If build.rollupOptions.input is specified,
   * Vite will crawl those entry points instead.
   *
   * @see https://vitejs.dev/config/#optimizedeps-entries
   */
  optimizeDeps: {
    include: [
      "@ckeditor/ckeditor5-vue",
      "@ckeditor/ckeditor5-build-classic",
      "@iconify/iconify",
      "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.min.js",
      "@vee-validate/zod",
      "@vueuse/core",
      "@vueuse/head",
      "@vueform/multiselect",
      "@vueform/slider",
      "axios",
      "billboard.js",
      "dayjs",
      "dropzone",
      "dragula",
      "defu",
      "filepond",
      "filepond-plugin-file-validate-size",
      "filepond-plugin-file-validate-type",
      "filepond-plugin-image-exif-orientation",
      "filepond-plugin-image-crop",
      "filepond-plugin-image-edit",
      "filepond-plugin-image-preview",
      "filepond-plugin-image-resize",
      "filepond-plugin-image-transform",
      "imask",
      "nprogress",
      "notyf",
      "mapbox-gl",
      "photoswipe/lightbox",
      "photoswipe",
      "plyr",
      "v-calendar",
      "vee-validate",
      "vue",
      "vue-scrollto",
      "vue3-apexcharts",
      "vue-tippy",
      "vue-i18n",
      "vue-router",
      "unplugin-vue-router/runtime",
      "simplebar",
      "simple-datatables",
      "tiny-slider/src/tiny-slider",
      "vue-accessible-color-picker",
      "zod",
      "@stefanprobst/remark-shiki",
      "rehype-external-links",
      "rehype-raw",
      "rehype-sanitize",
      "rehype-stringify",
      "rehype-slug",
      "rehype-autolink-headings",
      "remark-gfm",
      "remark-parse",
      "remark-rehype",
      "shiki-es",
      "unified",
      "workbox-window",
      "textarea-markdown-editor/dist/esm/bootstrap"
    ],
    disabled: false
  },
  // Will be passed to @rollup/plugin-alias as its entries option.
  resolve: {
    alias: [
      {
        find: "/@src/",
        replacement: `/src/`
      }
    ]
  },
  build: {
    minify: "terser",
    // Do not warn about large chunks
    // chunkSizeWarningLimit: Infinity,
    // Double the default size threshold for inlined assets
    // https://vitejs.dev/config/build-options.html#build-assetsinlinelimit
    assetsInlineLimit: 4096 * 2,
    commonjsOptions: { include: [] }
  },
  plugins: [
    /**
     * plugin-vue plugin inject vue library and allow sfc files to work (*.vue)
     *
     * @see https://github.com/vitejs/vite/tree/main/packages/plugin-vue
     */
    Vue({
      include: [/\.vue$/]
    }),
    /**
     * vite-plugin-vue-i18n plugin does i18n resources pre-compilation / optimizations
     *
     * @see https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
     */
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(__vite_injected_original_import_meta_url)), "./src/locales/**"),
      fullInstall: false,
      compositionOnly: true
    }),
    /**
     * unplugin-vue-router plugin generate routes based on file system
     * allow to use typed routes and usage of defineLoader
     *
     * @see https://github.com/posva/unplugin-vue-router
     * @see https://github.com/vuejs/rfcs/blob/ad69da2aee9242ef88f036713db68f3ef274bb1b/active-rfcs/0000-router-use-loader.md
     */
    VueRouter({
      routesFolder: "src/pages",
      /**
       * Data Fetching is an experimental feature from vue & vue-router
       *
       * @see https://github.com/vuejs/rfcs/discussions/460
       * @see https://github.com/posva/unplugin-vue-router/tree/main/src/data-fetching
       */
      dataFetching: true
    }),
    /**
     * unplugin-auto-import allow to automaticaly import modules/components
     *
     * @see https://github.com/antfu/unplugin-auto-import
     */
    AutoImport({
      dts: true,
      imports: ["vue", "@vueuse/core", VueRouterAutoImports]
    }),
    /**
     * This is an internal vite plugin that load markdown files as vue components.
     *
     * @see /documentation
     * @see /vite-plugin-vuero-doc
     * @see /src/components/partials/documentation/DocumentationItem.vue
     * @see /src/composable/useMarkdownToc.ts
     */
    /*VitePluginVueroDoc({
      pathPrefix: 'documentation',
      wrapperComponent: 'DocumentationItem',
      shiki: {
        theme: {
          light: 'min-light',
          dark: 'github-dark',
        },
      },
      sourceMeta: {
        enabled: true,
        editProtocol: 'vscode://vscode-remote/wsl+Ubuntu', // or 'vscode://file'
      },
    }),*/
    /**
     * unplugin-vue-components plugin is responsible of autoloading components
     * documentation and md file are loaded for elements and components sections
     *
     * @see https://github.com/antfu/unplugin-vue-components
     */
    Components({
      dirs: ["documentation", "src/components", "src/layouts"],
      extensions: ["vue", "md"],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    }),
    /**
     * vite-plugin-purge-icons plugin is responsible of autoloading icones from multiples providers
     *
     * @see https://icones.netlify.app/
     * @see https://github.com/antfu/purge-icons/tree/main/packages/vite-plugin-purge-icons
     */
    PurgeIcons(),
    /**
     * vite-plugin-fonts plugin inject webfonts from differents providers
     *
     * @see https://github.com/stafyniaksacha/vite-plugin-fonts
     */
    VitePluginFonts({
      google: {
        families: [
          {
            name: "Fira Code",
            styles: "wght@400;600"
          },
          {
            name: "Montserrat",
            styles: "wght@500;600;700;800;900"
          },
          {
            name: "Roboto",
            styles: "wght@300;400;500;600;700"
          }
        ]
      }
    }),
    /**
     * vite-plugin-radar plugin inject snippets from analytics providers
     *
     * @see https://github.com/stafyniaksacha/vite-plugin-radar
     */
    !process.env.GTM_ID ? void 0 : VitePluginRadar({
      gtm: {
        id: process.env.GTM_ID
      }
    }),
    /**
     * vite-plugin-pwa generate manifest.json and register services worker to enable PWA
     *
     * @see https://github.com/antfu/vite-plugin-pwa
     */
    VitePWA({
      base: "/",
      includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Vuero - A complete Vue 3 design system",
        short_name: "Vuero",
        start_url: "/?utm_source=pwa",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    }),
    /**
     * rollup-plugin-purgecss plugin is responsible of purging css rules
     * that are not used in the bundle
     *
     * @see https://github.com/FullHuman/purgecss/tree/main/packages/rollup-plugin-purgecss
     */
    purgecss({
      output: false,
      content: [`./src/**/*.vue`],
      variables: false,
      safelist: {
        standard: [
          /(autv|lnil|lnir|fas?)/,
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /data-v-.*/
        ]
      },
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, "");
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
      }
    }),
    /**
     * vite-plugin-imagemin optimize all images sizes from public or asset folder
     *
     * @see https://github.com/anncwb/vite-plugin-imagemin
     */
    !MINIFY_IMAGES ? void 0 : ImageMin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 60
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
            active: false
          },
          {
            name: "removeEmptyAttrs",
            active: false
          }
        ]
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxERUxMXFxcXERlc2t0b3BcXFxcTGV4QWxnZXJpYVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcREVMTFxcXFxEZXNrdG9wXFxcXExleEFsZ2VyaWFcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0RFTEwvRGVza3RvcC9MZXhBbGdlcmlhL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSwgZGlybmFtZSB9IGZyb20gJ25vZGU6cGF0aCdcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IFZ1ZVJvdXRlciBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGUnXHJcbmltcG9ydCB7IFZ1ZVJvdXRlckF1dG9JbXBvcnRzIH0gZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlcidcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IHsgVml0ZVBsdWdpbkZvbnRzIH0gZnJvbSAndml0ZS1wbHVnaW4tZm9udHMnXHJcbmltcG9ydCB7IFZpdGVQbHVnaW5SYWRhciB9IGZyb20gJ3ZpdGUtcGx1Z2luLXJhZGFyJ1xyXG5pbXBvcnQgUHVyZ2VJY29ucyBmcm9tICd2aXRlLXBsdWdpbi1wdXJnZS1pY29ucydcclxuaW1wb3J0IEltYWdlTWluIGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlbWluJ1xyXG5pbXBvcnQgVnVlSTE4blBsdWdpbiBmcm9tICdAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4bi92aXRlJ1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xyXG5pbXBvcnQgcHVyZ2Vjc3MgZnJvbSAncm9sbHVwLXBsdWdpbi1wdXJnZWNzcydcclxuXHJcbi8vIGxvY2FsIHZpdGUgcGx1Z2luXHJcbi8vaW1wb3J0IHsgVml0ZVBsdWdpblZ1ZXJvRG9jIH0gZnJvbSAnLi92aXRlLXBsdWdpbi12dWVyby1kb2MnXHJcblxyXG4vLyBvcHRpb25zIHZpYSBlbnYgdmFyaWFibGVzXHJcbmNvbnN0IE1JTklGWV9JTUFHRVMgPSBwcm9jZXNzLmVudi5NSU5JRlkgPyBwcm9jZXNzLmVudi5NSU5JRlkgPT09ICd0cnVlJyA6IGZhbHNlXHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgbWFpbiBjb25maWd1cmF0aW9uIGZpbGUgZm9yIHZpdGVqc1xyXG4gKlxyXG4gKiBAc2VlIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWdcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgLy8gUHJvamVjdCByb290IGRpcmVjdG9yeSAod2hlcmUgaW5kZXguaHRtbCBpcyBsb2NhdGVkKS5cclxuICByb290OiBwcm9jZXNzLmN3ZCgpLFxyXG4gIC8vIEJhc2UgcHVibGljIHBhdGggd2hlbiBzZXJ2ZWQgaW4gZGV2ZWxvcG1lbnQgb3IgcHJvZHVjdGlvbi5cclxuICAvLyBZb3UgYWxzbyBuZWVkIHRvIGFkZCB0aGlzIGJhc2UgbGlrZSBgaGlzdG9yeTogY3JlYXRlV2ViSGlzdG9yeSgnbXktc3ViZGlyZWN0b3J5JylgXHJcbiAgLy8gaW4gLi9zcmMvcm91dGVyLnRzXHJcbiAgLy8gYmFzZTogJy9teS1zdWJkaXJlY3RvcnkvJyxcclxuICBiYXNlOiAnLycsXHJcbiAgLy8gRGlyZWN0b3J5IHRvIHNlcnZlIGFzIHBsYWluIHN0YXRpYyBhc3NldHMuXHJcbiAgcHVibGljRGlyOiAncHVibGljJyxcclxuICAvLyBBZGp1c3QgY29uc29sZSBvdXRwdXQgdmVyYm9zaXR5LlxyXG4gIGxvZ0xldmVsOiAnaW5mbycsXHJcbiAgLy8gZGV2ZWxvcG1lbnQgc2VydmVyIGNvbmZpZ3VyYXRpb25cclxuXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiAzMDAwLFxyXG4gICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEJ5IGRlZmF1bHQsIFZpdGUgd2lsbCBjcmF3bCB5b3VyIGluZGV4Lmh0bWwgdG8gZGV0ZWN0IGRlcGVuZGVuY2llcyB0aGF0XHJcbiAgICogbmVlZCB0byBiZSBwcmUtYnVuZGxlZC4gSWYgYnVpbGQucm9sbHVwT3B0aW9ucy5pbnB1dCBpcyBzcGVjaWZpZWQsXHJcbiAgICogVml0ZSB3aWxsIGNyYXdsIHRob3NlIGVudHJ5IHBvaW50cyBpbnN0ZWFkLlxyXG4gICAqXHJcbiAgICogQHNlZSBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnLyNvcHRpbWl6ZWRlcHMtZW50cmllc1xyXG4gICAqL1xyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogW1xyXG4gICAgICAnQGNrZWRpdG9yL2NrZWRpdG9yNS12dWUnLFxyXG4gICAgICAnQGNrZWRpdG9yL2NrZWRpdG9yNS1idWlsZC1jbGFzc2ljJyxcclxuICAgICAgJ0BpY29uaWZ5L2ljb25pZnknLFxyXG4gICAgICAnQG1hcGJveC9tYXBib3gtZ2wtZ2VvY29kZXIvZGlzdC9tYXBib3gtZ2wtZ2VvY29kZXIubWluLmpzJyxcclxuICAgICAgJ0B2ZWUtdmFsaWRhdGUvem9kJyxcclxuICAgICAgJ0B2dWV1c2UvY29yZScsXHJcbiAgICAgICdAdnVldXNlL2hlYWQnLFxyXG4gICAgICAnQHZ1ZWZvcm0vbXVsdGlzZWxlY3QnLFxyXG4gICAgICAnQHZ1ZWZvcm0vc2xpZGVyJyxcclxuICAgICAgJ2F4aW9zJyxcclxuICAgICAgJ2JpbGxib2FyZC5qcycsXHJcbiAgICAgICdkYXlqcycsXHJcbiAgICAgICdkcm9wem9uZScsXHJcbiAgICAgICdkcmFndWxhJyxcclxuICAgICAgJ2RlZnUnLFxyXG4gICAgICAnZmlsZXBvbmQnLFxyXG4gICAgICAnZmlsZXBvbmQtcGx1Z2luLWZpbGUtdmFsaWRhdGUtc2l6ZScsXHJcbiAgICAgICdmaWxlcG9uZC1wbHVnaW4tZmlsZS12YWxpZGF0ZS10eXBlJyxcclxuICAgICAgJ2ZpbGVwb25kLXBsdWdpbi1pbWFnZS1leGlmLW9yaWVudGF0aW9uJyxcclxuICAgICAgJ2ZpbGVwb25kLXBsdWdpbi1pbWFnZS1jcm9wJyxcclxuICAgICAgJ2ZpbGVwb25kLXBsdWdpbi1pbWFnZS1lZGl0JyxcclxuICAgICAgJ2ZpbGVwb25kLXBsdWdpbi1pbWFnZS1wcmV2aWV3JyxcclxuICAgICAgJ2ZpbGVwb25kLXBsdWdpbi1pbWFnZS1yZXNpemUnLFxyXG4gICAgICAnZmlsZXBvbmQtcGx1Z2luLWltYWdlLXRyYW5zZm9ybScsXHJcbiAgICAgICdpbWFzaycsXHJcbiAgICAgICducHJvZ3Jlc3MnLFxyXG4gICAgICAnbm90eWYnLFxyXG4gICAgICAnbWFwYm94LWdsJyxcclxuICAgICAgJ3Bob3Rvc3dpcGUvbGlnaHRib3gnLFxyXG4gICAgICAncGhvdG9zd2lwZScsXHJcbiAgICAgICdwbHlyJyxcclxuICAgICAgJ3YtY2FsZW5kYXInLFxyXG4gICAgICAndmVlLXZhbGlkYXRlJyxcclxuICAgICAgJ3Z1ZScsXHJcbiAgICAgICd2dWUtc2Nyb2xsdG8nLFxyXG4gICAgICAndnVlMy1hcGV4Y2hhcnRzJyxcclxuICAgICAgJ3Z1ZS10aXBweScsXHJcbiAgICAgICd2dWUtaTE4bicsXHJcbiAgICAgICd2dWUtcm91dGVyJyxcclxuICAgICAgJ3VucGx1Z2luLXZ1ZS1yb3V0ZXIvcnVudGltZScsXHJcbiAgICAgICdzaW1wbGViYXInLFxyXG4gICAgICAnc2ltcGxlLWRhdGF0YWJsZXMnLFxyXG4gICAgICAndGlueS1zbGlkZXIvc3JjL3Rpbnktc2xpZGVyJyxcclxuICAgICAgJ3Z1ZS1hY2Nlc3NpYmxlLWNvbG9yLXBpY2tlcicsXHJcbiAgICAgICd6b2QnLFxyXG4gICAgICAnQHN0ZWZhbnByb2JzdC9yZW1hcmstc2hpa2knLFxyXG4gICAgICAncmVoeXBlLWV4dGVybmFsLWxpbmtzJyxcclxuICAgICAgJ3JlaHlwZS1yYXcnLFxyXG4gICAgICAncmVoeXBlLXNhbml0aXplJyxcclxuICAgICAgJ3JlaHlwZS1zdHJpbmdpZnknLFxyXG4gICAgICAncmVoeXBlLXNsdWcnLFxyXG4gICAgICAncmVoeXBlLWF1dG9saW5rLWhlYWRpbmdzJyxcclxuICAgICAgJ3JlbWFyay1nZm0nLFxyXG4gICAgICAncmVtYXJrLXBhcnNlJyxcclxuICAgICAgJ3JlbWFyay1yZWh5cGUnLFxyXG4gICAgICAnc2hpa2ktZXMnLFxyXG4gICAgICAndW5pZmllZCcsXHJcbiAgICAgICd3b3JrYm94LXdpbmRvdycsXHJcbiAgICAgICd0ZXh0YXJlYS1tYXJrZG93bi1lZGl0b3IvZGlzdC9lc20vYm9vdHN0cmFwJyxcclxuICAgIF0sXHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgfSxcclxuICAvLyBXaWxsIGJlIHBhc3NlZCB0byBAcm9sbHVwL3BsdWdpbi1hbGlhcyBhcyBpdHMgZW50cmllcyBvcHRpb24uXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIGZpbmQ6ICcvQHNyYy8nLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiBgL3NyYy9gLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgLy8gRG8gbm90IHdhcm4gYWJvdXQgbGFyZ2UgY2h1bmtzXHJcbiAgICAvLyBjaHVua1NpemVXYXJuaW5nTGltaXQ6IEluZmluaXR5LFxyXG4gICAgLy8gRG91YmxlIHRoZSBkZWZhdWx0IHNpemUgdGhyZXNob2xkIGZvciBpbmxpbmVkIGFzc2V0c1xyXG4gICAgLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9idWlsZC1vcHRpb25zLmh0bWwjYnVpbGQtYXNzZXRzaW5saW5lbGltaXRcclxuICAgIGFzc2V0c0lubGluZUxpbWl0OiA0MDk2ICogMixcclxuICAgIGNvbW1vbmpzT3B0aW9uczogeyBpbmNsdWRlOiBbXSB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgLyoqXHJcbiAgICAgKiBwbHVnaW4tdnVlIHBsdWdpbiBpbmplY3QgdnVlIGxpYnJhcnkgYW5kIGFsbG93IHNmYyBmaWxlcyB0byB3b3JrICgqLnZ1ZSlcclxuICAgICAqXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS90cmVlL21haW4vcGFja2FnZXMvcGx1Z2luLXZ1ZVxyXG4gICAgICovXHJcbiAgICBWdWUoe1xyXG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvXSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdml0ZS1wbHVnaW4tdnVlLWkxOG4gcGx1Z2luIGRvZXMgaTE4biByZXNvdXJjZXMgcHJlLWNvbXBpbGF0aW9uIC8gb3B0aW1pemF0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ludGxpZnkvYnVuZGxlLXRvb2xzL3RyZWUvbWFpbi9wYWNrYWdlcy92aXRlLXBsdWdpbi12dWUtaTE4blxyXG4gICAgICovXHJcbiAgICBWdWVJMThuUGx1Z2luKHtcclxuICAgICAgaW5jbHVkZTogcmVzb2x2ZShkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSksICcuL3NyYy9sb2NhbGVzLyoqJyksXHJcbiAgICAgIGZ1bGxJbnN0YWxsOiBmYWxzZSxcclxuICAgICAgY29tcG9zaXRpb25Pbmx5OiB0cnVlLFxyXG4gICAgfSksXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1bnBsdWdpbi12dWUtcm91dGVyIHBsdWdpbiBnZW5lcmF0ZSByb3V0ZXMgYmFzZWQgb24gZmlsZSBzeXN0ZW1cclxuICAgICAqIGFsbG93IHRvIHVzZSB0eXBlZCByb3V0ZXMgYW5kIHVzYWdlIG9mIGRlZmluZUxvYWRlclxyXG4gICAgICpcclxuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Bvc3ZhL3VucGx1Z2luLXZ1ZS1yb3V0ZXJcclxuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3JmY3MvYmxvYi9hZDY5ZGEyYWVlOTI0MmVmODhmMDM2NzEzZGI2OGYzZWYyNzRiYjFiL2FjdGl2ZS1yZmNzLzAwMDAtcm91dGVyLXVzZS1sb2FkZXIubWRcclxuICAgICAqL1xyXG4gICAgVnVlUm91dGVyKHtcclxuICAgICAgcm91dGVzRm9sZGVyOiAnc3JjL3BhZ2VzJyxcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBEYXRhIEZldGNoaW5nIGlzIGFuIGV4cGVyaW1lbnRhbCBmZWF0dXJlIGZyb20gdnVlICYgdnVlLXJvdXRlclxyXG4gICAgICAgKlxyXG4gICAgICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy9yZmNzL2Rpc2N1c3Npb25zLzQ2MFxyXG4gICAgICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3N2YS91bnBsdWdpbi12dWUtcm91dGVyL3RyZWUvbWFpbi9zcmMvZGF0YS1mZXRjaGluZ1xyXG4gICAgICAgKi9cclxuICAgICAgZGF0YUZldGNoaW5nOiB0cnVlLFxyXG4gICAgfSksXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1bnBsdWdpbi1hdXRvLWltcG9ydCBhbGxvdyB0byBhdXRvbWF0aWNhbHkgaW1wb3J0IG1vZHVsZXMvY29tcG9uZW50c1xyXG4gICAgICpcclxuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWF1dG8taW1wb3J0XHJcbiAgICAgKi9cclxuICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICBkdHM6IHRydWUsXHJcbiAgICAgIGltcG9ydHM6IFsndnVlJywgJ0B2dWV1c2UvY29yZScsIFZ1ZVJvdXRlckF1dG9JbXBvcnRzXSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBpcyBhbiBpbnRlcm5hbCB2aXRlIHBsdWdpbiB0aGF0IGxvYWQgbWFya2Rvd24gZmlsZXMgYXMgdnVlIGNvbXBvbmVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHNlZSAvZG9jdW1lbnRhdGlvblxyXG4gICAgICogQHNlZSAvdml0ZS1wbHVnaW4tdnVlcm8tZG9jXHJcbiAgICAgKiBAc2VlIC9zcmMvY29tcG9uZW50cy9wYXJ0aWFscy9kb2N1bWVudGF0aW9uL0RvY3VtZW50YXRpb25JdGVtLnZ1ZVxyXG4gICAgICogQHNlZSAvc3JjL2NvbXBvc2FibGUvdXNlTWFya2Rvd25Ub2MudHNcclxuICAgICAqL1xyXG4gICAgLypWaXRlUGx1Z2luVnVlcm9Eb2Moe1xyXG4gICAgICBwYXRoUHJlZml4OiAnZG9jdW1lbnRhdGlvbicsXHJcbiAgICAgIHdyYXBwZXJDb21wb25lbnQ6ICdEb2N1bWVudGF0aW9uSXRlbScsXHJcbiAgICAgIHNoaWtpOiB7XHJcbiAgICAgICAgdGhlbWU6IHtcclxuICAgICAgICAgIGxpZ2h0OiAnbWluLWxpZ2h0JyxcclxuICAgICAgICAgIGRhcms6ICdnaXRodWItZGFyaycsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgc291cmNlTWV0YToge1xyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgZWRpdFByb3RvY29sOiAndnNjb2RlOi8vdnNjb2RlLXJlbW90ZS93c2wrVWJ1bnR1JywgLy8gb3IgJ3ZzY29kZTovL2ZpbGUnXHJcbiAgICAgIH0sXHJcbiAgICB9KSwqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogdW5wbHVnaW4tdnVlLWNvbXBvbmVudHMgcGx1Z2luIGlzIHJlc3BvbnNpYmxlIG9mIGF1dG9sb2FkaW5nIGNvbXBvbmVudHNcclxuICAgICAqIGRvY3VtZW50YXRpb24gYW5kIG1kIGZpbGUgYXJlIGxvYWRlZCBmb3IgZWxlbWVudHMgYW5kIGNvbXBvbmVudHMgc2VjdGlvbnNcclxuICAgICAqXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50c1xyXG4gICAgICovXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgZGlyczogWydkb2N1bWVudGF0aW9uJywgJ3NyYy9jb21wb25lbnRzJywgJ3NyYy9sYXlvdXRzJ10sXHJcbiAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXHJcbiAgICAgIGR0czogdHJ1ZSxcclxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdml0ZS1wbHVnaW4tcHVyZ2UtaWNvbnMgcGx1Z2luIGlzIHJlc3BvbnNpYmxlIG9mIGF1dG9sb2FkaW5nIGljb25lcyBmcm9tIG11bHRpcGxlcyBwcm92aWRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vaWNvbmVzLm5ldGxpZnkuYXBwL1xyXG4gICAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvcHVyZ2UtaWNvbnMvdHJlZS9tYWluL3BhY2thZ2VzL3ZpdGUtcGx1Z2luLXB1cmdlLWljb25zXHJcbiAgICAgKi9cclxuICAgIFB1cmdlSWNvbnMoKSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIHZpdGUtcGx1Z2luLWZvbnRzIHBsdWdpbiBpbmplY3Qgd2ViZm9udHMgZnJvbSBkaWZmZXJlbnRzIHByb3ZpZGVyc1xyXG4gICAgICpcclxuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3N0YWZ5bmlha3NhY2hhL3ZpdGUtcGx1Z2luLWZvbnRzXHJcbiAgICAgKi9cclxuICAgIFZpdGVQbHVnaW5Gb250cyh7XHJcbiAgICAgIGdvb2dsZToge1xyXG4gICAgICAgIGZhbWlsaWVzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdGaXJhIENvZGUnLFxyXG4gICAgICAgICAgICBzdHlsZXM6ICd3Z2h0QDQwMDs2MDAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ01vbnRzZXJyYXQnLFxyXG4gICAgICAgICAgICBzdHlsZXM6ICd3Z2h0QDUwMDs2MDA7NzAwOzgwMDs5MDAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ1JvYm90bycsXHJcbiAgICAgICAgICAgIHN0eWxlczogJ3dnaHRAMzAwOzQwMDs1MDA7NjAwOzcwMCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIHZpdGUtcGx1Z2luLXJhZGFyIHBsdWdpbiBpbmplY3Qgc25pcHBldHMgZnJvbSBhbmFseXRpY3MgcHJvdmlkZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vc3RhZnluaWFrc2FjaGEvdml0ZS1wbHVnaW4tcmFkYXJcclxuICAgICAqL1xyXG4gICAgIXByb2Nlc3MuZW52LkdUTV9JRFxyXG4gICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICA6IFZpdGVQbHVnaW5SYWRhcih7XHJcbiAgICAgICAgICBndG06IHtcclxuICAgICAgICAgICAgaWQ6IHByb2Nlc3MuZW52LkdUTV9JRCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSksXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB2aXRlLXBsdWdpbi1wd2EgZ2VuZXJhdGUgbWFuaWZlc3QuanNvbiBhbmQgcmVnaXN0ZXIgc2VydmljZXMgd29ya2VyIHRvIGVuYWJsZSBQV0FcclxuICAgICAqXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlLXBsdWdpbi1wd2FcclxuICAgICAqL1xyXG4gICAgVml0ZVBXQSh7XHJcbiAgICAgIGJhc2U6ICcvJyxcclxuICAgICAgaW5jbHVkZUFzc2V0czogWydmYXZpY29uLnN2ZycsICdmYXZpY29uLmljbycsICdyb2JvdHMudHh0JywgJ2FwcGxlLXRvdWNoLWljb24ucG5nJ10sXHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgbmFtZTogJ1Z1ZXJvIC0gQSBjb21wbGV0ZSBWdWUgMyBkZXNpZ24gc3lzdGVtJyxcclxuICAgICAgICBzaG9ydF9uYW1lOiAnVnVlcm8nLFxyXG4gICAgICAgIHN0YXJ0X3VybDogJy8/dXRtX3NvdXJjZT1wd2EnLFxyXG4gICAgICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcclxuICAgICAgICB0aGVtZV9jb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdwd2EtMTkyeDE5Mi5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3B3YS01MTJ4NTEyLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAncHdhLTUxMng1MTIucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcclxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXHJcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnkgbWFza2FibGUnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByb2xsdXAtcGx1Z2luLXB1cmdlY3NzIHBsdWdpbiBpcyByZXNwb25zaWJsZSBvZiBwdXJnaW5nIGNzcyBydWxlc1xyXG4gICAgICogdGhhdCBhcmUgbm90IHVzZWQgaW4gdGhlIGJ1bmRsZVxyXG4gICAgICpcclxuICAgICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL0Z1bGxIdW1hbi9wdXJnZWNzcy90cmVlL21haW4vcGFja2FnZXMvcm9sbHVwLXBsdWdpbi1wdXJnZWNzc1xyXG4gICAgICovXHJcbiAgICBwdXJnZWNzcyh7XHJcbiAgICAgIG91dHB1dDogZmFsc2UsXHJcbiAgICAgIGNvbnRlbnQ6IFtgLi9zcmMvKiovKi52dWVgXSxcclxuICAgICAgdmFyaWFibGVzOiBmYWxzZSxcclxuICAgICAgc2FmZWxpc3Q6IHtcclxuICAgICAgICBzdGFuZGFyZDogW1xyXG4gICAgICAgICAgLyhhdXR2fGxuaWx8bG5pcnxmYXM/KS8sXHJcbiAgICAgICAgICAvLShsZWF2ZXxlbnRlcnxhcHBlYXIpKHwtKHRvfGZyb218YWN0aXZlKSkkLyxcclxuICAgICAgICAgIC9eKD8hKHwuKj86KWN1cnNvci1tb3ZlKS4rLW1vdmUkLyxcclxuICAgICAgICAgIC9ecm91dGVyLWxpbmsofC1leGFjdCktYWN0aXZlJC8sXHJcbiAgICAgICAgICAvZGF0YS12LS4qLyxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICBkZWZhdWx0RXh0cmFjdG9yKGNvbnRlbnQpIHtcclxuICAgICAgICBjb25zdCBjb250ZW50V2l0aG91dFN0eWxlQmxvY2tzID0gY29udGVudC5yZXBsYWNlKC88c3R5bGVbXl0rPzxcXC9zdHlsZT4vZ2ksICcnKVxyXG4gICAgICAgIHJldHVybiBjb250ZW50V2l0aG91dFN0eWxlQmxvY2tzLm1hdGNoKC9bQS1aYS16MC05LV8vOl0qW0EtWmEtejAtOS1fL10rL2cpIHx8IFtdXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIHZpdGUtcGx1Z2luLWltYWdlbWluIG9wdGltaXplIGFsbCBpbWFnZXMgc2l6ZXMgZnJvbSBwdWJsaWMgb3IgYXNzZXQgZm9sZGVyXHJcbiAgICAgKlxyXG4gICAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5uY3diL3ZpdGUtcGx1Z2luLWltYWdlbWluXHJcbiAgICAgKi9cclxuICAgICFNSU5JRllfSU1BR0VTXHJcbiAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgIDogSW1hZ2VNaW4oe1xyXG4gICAgICAgICAgZ2lmc2ljbGU6IHtcclxuICAgICAgICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDcsXHJcbiAgICAgICAgICAgIGludGVybGFjZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9wdGlwbmc6IHtcclxuICAgICAgICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbW96anBlZzoge1xyXG4gICAgICAgICAgICBxdWFsaXR5OiA2MCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBwbmdxdWFudDoge1xyXG4gICAgICAgICAgICBxdWFsaXR5OiBbMC44LCAwLjldLFxyXG4gICAgICAgICAgICBzcGVlZDogNCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzdmdvOiB7XHJcbiAgICAgICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAncmVtb3ZlVmlld0JveCcsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3JlbW92ZUVtcHR5QXR0cnMnLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KSxcclxuICBdLFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRSLFNBQVMsU0FBUyxlQUFlO0FBQzdULFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGVBQWU7QUFDdEIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyx1QkFBdUI7QUFDaEMsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGNBQWM7QUFkNEosSUFBTSwyQ0FBMkM7QUFvQmxPLElBQU0sZ0JBQWdCLFFBQVEsSUFBSSxTQUFTLFFBQVEsSUFBSSxXQUFXLFNBQVM7QUFPM0UsSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQSxFQUUxQixNQUFNLFFBQVEsSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLbEIsTUFBTTtBQUFBO0FBQUEsRUFFTixXQUFXO0FBQUE7QUFBQSxFQUVYLFVBQVU7QUFBQTtBQUFBLEVBR1YsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU0EsY0FBYztBQUFBLElBQ1osU0FBUztBQUFBLE1BQ1A7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsVUFBVTtBQUFBLEVBQ1o7QUFBQTtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBS1IsbUJBQW1CLE9BQU87QUFBQSxJQUMxQixpQkFBaUIsRUFBRSxTQUFTLENBQUMsRUFBRTtBQUFBLEVBQ2pDO0FBQUEsRUFDQSxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTVAsSUFBSTtBQUFBLE1BQ0YsU0FBUyxDQUFDLFFBQVE7QUFBQSxJQUNwQixDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBT0QsY0FBYztBQUFBLE1BQ1osU0FBUyxRQUFRLFFBQVEsY0FBYyx3Q0FBZSxDQUFDLEdBQUcsa0JBQWtCO0FBQUEsTUFDNUUsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFTRCxVQUFVO0FBQUEsTUFDUixjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFRZCxjQUFjO0FBQUEsSUFDaEIsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9ELFdBQVc7QUFBQSxNQUNULEtBQUs7QUFBQSxNQUNMLFNBQVMsQ0FBQyxPQUFPLGdCQUFnQixvQkFBb0I7QUFBQSxJQUN2RCxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQStCRCxXQUFXO0FBQUEsTUFDVCxNQUFNLENBQUMsaUJBQWlCLGtCQUFrQixhQUFhO0FBQUEsTUFDdkQsWUFBWSxDQUFDLE9BQU8sSUFBSTtBQUFBLE1BQ3hCLEtBQUs7QUFBQSxNQUNMLFNBQVMsQ0FBQyxVQUFVLGNBQWMsT0FBTztBQUFBLElBQzNDLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVFELFdBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFPWCxnQkFBZ0I7QUFBQSxNQUNkLFFBQVE7QUFBQSxRQUNOLFVBQVU7QUFBQSxVQUNSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixRQUFRO0FBQUEsVUFDVjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFFBQVE7QUFBQSxVQUNWO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sUUFBUTtBQUFBLFVBQ1Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9ELENBQUMsUUFBUSxJQUFJLFNBQ1QsU0FDQSxnQkFBZ0I7QUFBQSxNQUNkLEtBQUs7QUFBQSxRQUNILElBQUksUUFBUSxJQUFJO0FBQUEsTUFDbEI7QUFBQSxJQUNGLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFPTCxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixlQUFlLENBQUMsZUFBZSxlQUFlLGNBQWMsc0JBQXNCO0FBQUEsTUFDbEYsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osV0FBVztBQUFBLFFBQ1gsU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFRRCxTQUFTO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixTQUFTLENBQUMsZ0JBQWdCO0FBQUEsTUFDMUIsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLFFBQ1IsVUFBVTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGlCQUFpQixTQUFTO0FBQ3hCLGNBQU0sNEJBQTRCLFFBQVEsUUFBUSwwQkFBMEIsRUFBRTtBQUM5RSxlQUFPLDBCQUEwQixNQUFNLGtDQUFrQyxLQUFLLENBQUM7QUFBQSxNQUNqRjtBQUFBLElBQ0YsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9ELENBQUMsZ0JBQ0csU0FDQSxTQUFTO0FBQUEsTUFDUCxVQUFVO0FBQUEsUUFDUixtQkFBbUI7QUFBQSxRQUNuQixZQUFZO0FBQUEsTUFDZDtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsbUJBQW1CO0FBQUEsTUFDckI7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUixTQUFTLENBQUMsS0FBSyxHQUFHO0FBQUEsUUFDbEIsT0FBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLE1BQU07QUFBQSxRQUNKLFNBQVM7QUFBQSxVQUNQO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixRQUFRO0FBQUEsVUFDVjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFFBQVE7QUFBQSxVQUNWO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNQO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
