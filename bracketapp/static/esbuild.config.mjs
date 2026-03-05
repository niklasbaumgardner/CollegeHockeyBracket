import * as esbuild from "esbuild";
import { cleanPlugin } from "esbuild-clean-plugin";
import fs from "fs";
import crypto from "crypto";

const args = process.argv.slice(2);
const watchMode = args.filter((arg) => arg === "--watch").length > 0;
let buildFunction = watchMode ? esbuild.context : esbuild.build;

const destDir = "./bracketapp/static/dist/esbuild/";
const extraFilesForMapping = [];

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
    // shoelace: "./bracketapp/static/css/src/themes/shoelace.css",
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
  outdir: destDir,
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
          extraFilesForMapping.length = 0;
        });
      },
    },
    {
      name: "json",
      setup(build) {
        build.onEnd(async () => {
          const path = "./bracketapp/static/json/";
          const files = fs.readdirSync(path);
          for (let filename of files) {
            if (!fs.lstatSync(path + filename).isFile()) {
              continue;
            }

            let file = fs.readFileSync(path + filename, "utf8");
            let json = JSON.stringify(JSON.parse(file));
            const hash = crypto
              .createHash("sha256")
              .update(json)
              .digest("hex")
              .slice(0, 16);

            let [year, name, ext] = filename.split(".");
            const destFile = `${destDir}${year}.${name}.${hash}.${ext}`;

            extraFilesForMapping.push([
              "/static/json/" + filename,
              destFile.replace("./bracketapp", ""),
            ]);

            fs.writeFileSync(destFile, json);
          }
        });
      },
    },
    {
      name: "svg",
      setup(build) {
        build.onEnd(async () => {
          const path = "./bracketapp/static/images/";
          const files = fs.readdirSync(path);
          for (let filename of files) {
            if (
              !filename.endsWith(".svg") ||
              !fs.lstatSync(path + filename).isFile()
            ) {
              continue;
            }

            let file = fs.readFileSync(path + filename, "utf8");
            let svg = file;
            // TODO: confirm that trimming works
            // .split("\n")
            // .map((l) => l.trim())
            // .join("");

            const hash = crypto
              .createHash("sha256")
              .update(svg)
              .digest("hex")
              .slice(0, 16);

            let [name, ext] = filename.split(".");
            const destFile = `${destDir}${name}.${hash}.${ext}`;

            extraFilesForMapping.push([
              "/static/images/" + filename,
              destFile.replace("./bracketapp", ""),
            ]);

            fs.writeFileSync(destFile, svg);
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
  // console.log(await esbuild.analyzeMetafile(result.metafile));
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
  const staticFiles = [...extraFilesForMapping];
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
        staticFiles.push([name, "/static/dist/esbuild/" + filename]);
      }
    }
  }

  const jsonFilesMapScript = `<script>
  const STATIC_FILE_MAP = {
${staticFiles
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([k, v]) => {
    if (k.includes(".")) {
      return `    "${k}": "${v}",`;
    } else {
      return `    ${k}: "${v}",`;
    }
  })
  .join("\n")}
  };

  const myPalette = "{{ user_settings.settings.color_palette }}";
  if (myPalette.length) {
    let paletteLink = document.getElementById("palette");
    paletteLink.href = STATIC_FILE_MAP[myPalette + ".palette"] ?? "";
  }
</script>`;

  const themeImportScript = `<script type="module">
  import {
    Theme
  } from "/static/dist/esbuild/${themeFile}";
  window.THEME = new Theme({{ user_settings.settings|tojson }});
</script>`;

  const fileContents = `<link
  id="palette"
  rel="stylesheet"
  href=""
  render="blocking"
  fetchpriority="high"
/>

${jsonFilesMapScript}

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
  brandOverrides();
  // fs.writeFileSync("meta.json", JSON.stringify(myFiles, null, 2));
  // fs.writeFileSync("metafile.json", JSON.stringify(result.metafile));
}

function brandOverrides() {
  const COLORS = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "taupe",
    "mauve",
    "mist",
    "olive",
  ];

  const VARIANTS = ["brand", "danger", "neutral", "success", "warning"];

  let contents = [];
  for (let variant of VARIANTS) {
    for (let color of COLORS) {
      let neutralTemplate = "";
      if (variant === "neutral") {
        neutralTemplate = `
  &.wa-light {
    --wa-color-surface-super-raised: var(--wa-color-neutral-90);
    --wa-color-surface-raised: var(--wa-color-neutral-95);
    --wa-color-surface-border: var(--wa-color-neutral-80);
  }`;
      }

      contents.push(`.${color}-${variant} {
  --wa-color-${variant}-05: var(--color-${color}-950);
  --wa-color-${variant}-10: var(--color-${color}-900);
  --wa-color-${variant}-20: var(--color-${color}-800);
  --wa-color-${variant}-30: var(--color-${color}-700);
  --wa-color-${variant}-40: var(--color-${color}-600);
  --wa-color-${variant}-50: var(--color-${color}-500);
  --wa-color-${variant}-60: var(--color-${color}-400);
  --wa-color-${variant}-70: var(--color-${color}-300);
  --wa-color-${variant}-80: var(--color-${color}-200);
  --wa-color-${variant}-90: var(--color-${color}-100);
  --wa-color-${variant}-95: var(--color-${color}-50);
  --wa-color-${variant}: var(--color-${color}-600);
  --wa-color-${variant}-on: var(--wa-color-${color}-on);
  --wa-color-${color}-key: 60;

  --wa-color-${color}-gte-60: calc(
    100% - (clamp(0, 60 - var(--wa-color-${color}-key), 1) * 100%)
  );
  --wa-color-${color}-on: color-mix(
    in oklab,
    var(--wa-color-${color}-10) var(--wa-color-${color}-gte-60),
    white
  );${neutralTemplate}
}`);
    }
  }

  fs.writeFileSync(
    "./bracketapp/static/css/src/wa-overrides.css",
    contents.join("\n\n"),
  );
}
