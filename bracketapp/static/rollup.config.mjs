import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import del from "rollup-plugin-delete";
// import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import { createTransform } from "rollup-copy-transform-css";
import html from "@rollup/plugin-html";
// import { terser } from "rollup-plugin-terser";
// import path from "path";
// import { fileURLToPath } from "url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const transformCss = createTransform({
  minify: {
    // calc: false,
    fast: true,
  },
  // map: { inline: false },
});

export default {
  // Mapping your Webpack entries
  input: {
    main: "./bracketapp/static/js/main.mjs",
    agGrid: "./bracketapp/static/js/agGrid.mjs",
    nb: "./bracketapp/static/js/nb-components.mjs",

    // css
    bundle: "./bracketapp/static/js/css.mjs",
    active: "./bracketapp/static/js/css/active.mjs",
    // awesome: "./bracketapp/static/js/css/awesome.css.mjs",
    // brutalist: "./bracketapp/static/js/css/brutalist.css.mjs",
    // default: "./bracketapp/static/js/css/default.css.mjs",
    // glossy: "./bracketapp/static/js/css/glossy.css.mjs",
    // matter: "./bracketapp/static/js/css/matter.css.mjs",
    // mellow: "./bracketapp/static/js/css/mellow.css.mjs",
    // playful: "./bracketapp/static/js/css/playful.css.mjs",
    // premium: "./bracketapp/static/js/css/premium.css.mjs",
    // shoelace: "./bracketapp/static/js/css/shoelace.css.mjs",
    // tailspin: "./bracketapp/static/js/css/tailspin.css.mjs",
  },
  output: {
    dir: "./bracketapp/static/dist/rollup",
    format: "es", // Equivalent to outputModule: true
    entryFileNames: "[name].[hash].mjs",
    chunkFileNames: "[name].[hash].mjs",
    assetFileNames: "[name].[hash].css",
    sourcemap: true,
  },
  // Manual chunks mimic Webpack's dependOn and splitChunks
  // manualChunks: {
  //   "lit-vendor": ["lit"],
  // },
  plugins: [
    del({
      targets: ["./bracketapp/static/dist/rollup/*"],
    }),
    // 1. Resolve node_modules and convert CommonJS
    resolve({ browser: true }),
    // commonjs(),

    // 2. CSS Handling (MiniCssExtractPlugin equivalent)
    postcss({
      extract: true,
      // extract: path.resolve(__dirname, "css/bundle.min.css"),
      minimize: true,
      extensions: [".css"],
      // minimize: {
      //   preset: ["default", { calc: false }],
      // },
    }),

    // postcss({
    //   include: "./bracketapp/static/js/css/active.mjs",
    //   extract: "./bracketapp/static/dist/active.css",
    //   // extract: path.resolve(__dirname, "css/bundle.min.css"),
    //   minimize: true,
    //   // minimize: {
    //   //   preset: ["default", { calc: false }],
    //   // },
    // }),

    // 3. Copy Plugin (CopyPlugin equivalent)
    // copy({
    //   targets: [
    //     {
    //       src: ["./bracketapp/static/css/src/themes/*", "!default.css"],
    //       dest: "./bracketapp/static/rollup/css",
    //       rename: (name, extension) => `${name}.${Date.now()}.${extension}`,
    //       transform: transformCss,
    //     },
    //     {
    //       src: ["./bracketapp/static/css/src/color/*", "!default.css"],
    //       dest: "./bracketapp/static/rollup/css",
    //       rename: (name, extension) => `${name}.palette.min.${extension}`,
    //       transform: transformCss,
    //     },
    //     {
    //       src: "./bracketapp/static/css/src/color/base.css",
    //       dest: "./bracketapp/static/rollup/css",
    //       transform: transformCss,
    //     },
    //   ],
    //   flatten: true,
    // }),

    // 4. Minification (CssMinimizer + Terser)
    terser(),

    html({
      fileName: "scripts.html",
      template: ({ attributes, bundle, files, publicPath, title }) => {
        const scriptTemplate = (filename) =>
          `<script src="/static/rollup/dist/${filename}" type="module"></script>`;
        const linkTemplate = (filename) =>
          `<link rel="stylesheet" href="/static/rollup/dist/${filename}" render="blocking" fetchpriority="high"/>`;
        const scriptOrLinkFiles = [];
        for (let file of files.mjs) {
          if (file.name === "bundle") {
            continue;
          }
          scriptOrLinkFiles.push(scriptTemplate(file.fileName));
        }

        // console.log(JSON.stringify(files.css));
        const cssFiles = {};
        for (let file of files.css) {
          let name = file.fileName.split(".")[0];
          if (name === "bundle") {
            // css.BXEz0NIU.css
            scriptOrLinkFiles.push(linkTemplate(file.fileName));
          } else {
            cssFiles[name] = file.fileName;
          }
        }

        return scriptOrLinkFiles.join("\n") + "\n\n" + JSON.stringify(cssFiles);
      },
    }),
  ],
};
