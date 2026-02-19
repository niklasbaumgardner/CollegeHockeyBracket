import * as esbuild from "esbuild";
import { cleanPlugin } from "esbuild-clean-plugin";
import fs from "fs";

const args = process.argv.slice(2);
const watchMode = args.filter((arg) => arg === "--watch").length > 0;
let buildFunction = watchMode ? esbuild.context : esbuild.build;

const result = await buildFunction({
  entryPoints: {
    // JS
    main: "./bracketapp/static/js/main.mjs",
    agGrid: "./bracketapp/static/js/agGrid.mjs",
    nb: "./bracketapp/static/js/nb-components.mjs",
    theme: "./bracketapp/static/js/theme.mjs",
    sentry: "./bracketapp/static/js/sentry.mjs",
    // "2025standings": "./bracketapp/static/js/data/2025standings.mjs",

    // CSS bundle
    bundle: "./bracketapp/static/css/src/bundle.css",
    // Themes
    active: "./bracketapp/static/css/src/themes/active.css",
    awesome: "./bracketapp/static/css/src/themes/awesome.css",
    brutalist: "./bracketapp/static/css/src/themes/brutalist.css",
    glossy: "./bracketapp/static/css/src/themes/glossy.css",
    matter: "./bracketapp/static/css/src/themes/matter.css",
    mellow: "./bracketapp/static/css/src/themes/mellow.css",
    playful: "./bracketapp/static/css/src/themes/playful.css",
    premium: "./bracketapp/static/css/src/themes/premium.css",
    shoelace: "./bracketapp/static/css/src/themes/shoelace.css",
    tailspin: "./bracketapp/static/css/src/themes/tailspin.css",
    // Palettes
    "anodized.palette": "./bracketapp/static/css/src/color/anodized.css",
    "base.palette": "./bracketapp/static/css/src/color/base.css",
    "bright.palette": "./bracketapp/static/css/src/color/bright.css",
    "elegant.palette": "./bracketapp/static/css/src/color/elegant.css",
    "mild.palette": "./bracketapp/static/css/src/color/mild.css",
    "natural.palette": "./bracketapp/static/css/src/color/natural.css",
    "rudimentary.palette": "./bracketapp/static/css/src/color/rudimentary.css",
    "shoelace.palette": "./bracketapp/static/css/src/color/shoelace.css",
    "vogue.palette": "./bracketapp/static/css/src/color/vogue.css",
  },

  bundle: true,
  minify: true,
  splitting: true,
  format: "esm",
  outdir: "./bracketapp/static/dist/esbuild/",
  entryNames: "[name].[hash]",
  outExtension: { ".js": ".mjs" },
  metafile: true,
  sourcemap: true,

  plugins: [
    cleanPlugin(),
    {
      name: "rebuild-notify",
      setup(build) {
        build.onEnd((result) => {
          if (!result.errors.length) {
            buildTemplate(result);
            console.log("Build completed");
          }
        });
      },
    },
  ],
});

const runWatch = async () => {
  await result.watch();
};

if (watchMode) {
  runWatch();
} else {
  buildTemplate(result);
}

function scriptTemplate(filename, defer = false) {
  return `<script src="/static/dist/esbuild/${filename}" type="module" ${defer ? "defer" : ""}></script>`;
}
function linkTemplate(filename) {
  return `<link 
  rel="stylesheet" 
  href="/static/dist/esbuild/${filename}" 
  render="blocking" 
  fetchpriority="high"
/>`;
}

function buildTemplate(result) {
  const myFiles = [];
  const linkFiles = [];
  const scriptFiles = [];
  const cssFilesMap = {};
  let themeFile = null;
  let sentryFile = null;

  const { outputs } = result.metafile;
  for (let [path, fileObject] of Object.entries(outputs)) {
    let filename = path.split("/").at(-1);
    let origFilename = fileObject.entryPoint?.split("/").at(-1);
    if (!origFilename) {
      continue;
    }

    if (path.endsWith(".mjs")) {
      if (origFilename === "theme.mjs") {
        themeFile = filename;
        continue;
      }
      myFiles.push({ path, orignal: fileObject.entryPoint });
      if (origFilename === "sentry.mjs") {
        sentryFile = scriptTemplate(filename, true);
        continue;
      }
      scriptFiles.push(scriptTemplate(filename));
    } else if (path.endsWith(".css")) {
      myFiles.push({ path, orignal: fileObject.entryPoint });
      if (origFilename === "bundle.css") {
        linkFiles.unshift(linkTemplate(filename));
      } else {
        let name = origFilename.split(".")[0];
        if (path.includes("palette")) {
          name += ".palette";
        }
        cssFilesMap[name] = "/static/dist/esbuild/" + filename;
      }
    }
  }

  const cssFilesMapScript = `<script>
  const CSS_FILE_MAP = { 
${Object.entries(cssFilesMap)
  .map(([k, v]) => {
    if (k.includes(".")) {
      return `    "${k}": "${v}",`;
    } else {
      return `    ${k}: "${v}",`;
    }
  })
  .join("\n")}
  };

  const myTheme = "{{ user_settings.settings.theme }}";
  if (myTheme.length) {
    let themeLink = document.getElementById("theme");
    themeLink.href = CSS_FILE_MAP[myTheme] ?? "";
  }
  const myPalette = "{{ user_settings.settings.color_palette }}";
  if (myPalette.length) {
    let paletteLink = document.getElementById("palette");
    paletteLink.href = CSS_FILE_MAP[myPalette + ".palette"] ?? "";
  }
</script>`;

  const themeImportScript = `<script type="module">
  import {
    Theme,
    THEME_LIST,
    COLOR_PALETTE_LIST,
  } from "/static/dist/esbuild/${themeFile}";
  window.THEME = new Theme({{ user_settings.settings|tojson }});
</script>`;

  const fileContents = `<link
  id="theme"
  rel="stylesheet"
  href=""
  render="blocking"
  fetchpriority="high"
/>
<link
  id="palette"
  rel="stylesheet"
  href=""
  render="blocking"
  fetchpriority="high"
/>

${cssFilesMapScript}

${linkFiles.join("\n")}

${themeImportScript}
${scriptFiles.join("\n")}

<script
  src="https://js.sentry-cdn.com/d1913311367ec68822f82f8ced7bc88f.min.js"
  crossorigin="anonymous"
  defer
></script>
${sentryFile}
`;

  fs.writeFileSync("./bracketapp/templates/includes.html", fileContents);
  // fs.writeFileSync("meta.json", JSON.stringify(myFiles, null, 2));
  // fs.writeFileSync("metafile.json", JSON.stringify(result.metafile));
}
