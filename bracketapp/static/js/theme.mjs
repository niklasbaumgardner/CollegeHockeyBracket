import { DeferredTask } from "./DeferredTask.mjs";

const themeStorage = window.localStorage;

export const THEME_LIST = [
  "default",
  "awesome",
  "shoelace",
  "active",
  "brutalist",
  "glossy",
  "matter",
  "mellow",
  "playful",
  "premium",
  "tailspin",
];

export const THEME_MODE_LIST = ["light", "dark"];

export const PRIMARY_COLOR_LIST = [
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
];

export const BACKGROUND_COLOR_LIST = [
  "niks-favorite",
  "red",
  "gray",
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
];

export const COLOR_PALETTE_LIST = [
  "default",
  "bright",
  "shoelace",
  "rudimentary",
  "elegant",
  "mild",
  "natural",
  "anodized",
  "vogue",
];

function round(num, digits = 2) {
  if (num === null) {
    return null;
  }

  return (
    Math.round((num + Number.EPSILON) * Math.pow(10, digits)) /
    Math.pow(10, digits)
  );
}

export class Theme {
  #domProperties;
  #theme;
  #mode;
  #primaryColor;
  #backgroundColor;
  #colorPalette;
  #rounding;
  #spacing;
  #borderWidth;
  #initing;

  constructor(theme) {
    this.#initing = true;
    this.#domProperties = window.getComputedStyle(document.documentElement);
    this.theme = theme.theme;
    this.mode = theme.mode;
    this.primaryColor = theme.primary_color;
    this.backgroundColor = theme.background_color;
    this.colorPalette = theme.color_palette;
    this.rounding = theme.rounding;
    this.spacing = theme.spacing;
    this.borderWidth = theme.border_width;

    this.#initing = false;

    if (!this.theme) {
      this.makeDefault();
    }
  }

  get theme() {
    return this.#theme;
  }

  get mode() {
    return this.#mode;
  }

  get primaryColor() {
    return this.#primaryColor;
  }

  get backgroundColor() {
    return this.#backgroundColor;
  }

  get colorPalette() {
    return this.#colorPalette;
  }

  get rounding() {
    return (
      this.#rounding ??
      this.#domProperties.getPropertyValue("--wa-border-radius-scale")
    );
  }

  get spacing() {
    return (
      this.#spacing ?? this.#domProperties.getPropertyValue("--wa-space-scale")
    );
  }

  get borderWidth() {
    return (
      this.#borderWidth ??
      this.#domProperties.getPropertyValue("--wa-border-width-scale")
    );
  }

  get themeLinkEl() {
    return document.getElementById("theme");
  }
  get paletteLinkEl() {
    return document.getElementById("palette");
  }

  set theme(theme) {
    if (theme === this.theme) {
      return;
    }

    document.documentElement.classList.remove(`wa-theme-${this.theme}`);

    if (THEME_LIST.includes(theme)) {
      this.#theme = theme;
    } else {
      this.#theme = THEME_LIST[0];
    }

    themeStorage.setItem("theme", this.theme);
    document.documentElement.classList.add(`wa-theme-${this.theme}`);

    this.themeLinkEl.href = `/static/css/${this.theme}.min.css`;

    if (!this.#initing) {
      this.updateSettings({ theme: this.theme });
    }
  }

  set mode(mode) {
    if (mode && mode === this.mode) {
      return;
    }

    if (THEME_MODE_LIST.includes(mode)) {
      this.#mode = mode;
    } else {
      this.#mode = "light";
    }

    themeStorage.setItem("mode", this.mode);

    // Set theme mode on document
    document.documentElement.classList.toggle("wa-dark", this.mode === "dark");
    document.documentElement.classList.toggle(
      "wa-light",
      this.mode === "light"
    );

    if (!this.#initing) {
      this.updateSettings({ mode: this.mode });
    }
  }

  /**
   * Sets the primary color
   */
  set primaryColor(primaryColor) {
    if (primaryColor === this.primaryColor) {
      return;
    }

    document.documentElement.classList.remove(`${this.primaryColor}-brand`);

    if (PRIMARY_COLOR_LIST.includes(primaryColor)) {
      this.#primaryColor = primaryColor;
    } else {
      this.#primaryColor = null;
    }

    themeStorage.setItem("primaryColor", this.primaryColor);
    if (this.primaryColor) {
      document.documentElement.classList.add(`${this.primaryColor}-brand`);
    }

    if (!this.#initing) {
      this.updateSettings({ primary_color: this.primaryColor });
    }
  }

  /**
   * Sets the background color
   */
  set backgroundColor(backgroundColor) {
    if (backgroundColor === this.backgroundColor) {
      return;
    }

    document
      .querySelector("main")
      .classList.remove(`${this.backgroundColor}-background`);
    document
      .querySelector("wa-page")
      .classList.remove(`${this.backgroundColor}-background`);

    if (BACKGROUND_COLOR_LIST.includes(backgroundColor)) {
      this.#backgroundColor = backgroundColor;
    } else {
      this.#backgroundColor = null;
    }

    themeStorage.setItem("backgroundColor", this.backgroundColor);
    if (this.backgroundColor) {
      document
        .querySelector("main")
        .classList.add(`${this.backgroundColor}-background`);
      document
        .querySelector("wa-page")
        .classList.add(`${this.backgroundColor}-background`);
    }

    if (!this.#initing) {
      this.updateSettings({ background_color: this.backgroundColor });
    }
  }

  /**
   * Sets the color palette
   */
  set colorPalette(colorPalette) {
    if (colorPalette === this.colorPalette) {
      return;
    }

    document.documentElement.classList.remove(
      `wa-palette-${this.colorPalette}`
    );

    if (COLOR_PALETTE_LIST.includes(colorPalette)) {
      this.#colorPalette = colorPalette;
    } else {
      this.#colorPalette = null;
    }

    themeStorage.setItem("colorPalette", this.colorPalette);

    if (this.colorPalette) {
      document.documentElement.classList.add(`wa-palette-${this.colorPalette}`);
    }

    if (this.colorPalette) {
      this.paletteLinkEl.href = `/static/css/${this.colorPalette}.palette.min.css`;
    } else {
      this.paletteLinkEl.href = "";
    }

    if (!this.#initing) {
      this.updateSettings({ color_palette: this.colorPalette });
    }
  }

  set rounding(rounding) {
    rounding = rounding === null ? null : Number(rounding);
    if (isNaN(rounding) || rounding === this.#rounding) {
      return;
    }

    rounding = round(rounding, 1);

    document.documentElement.style.removeProperty("--wa-border-radius-scale");
    if (rounding >= 0 && rounding <= 4) {
      this.#rounding = rounding;
    } else {
      this.#rounding = null;
    }

    if (this.#rounding !== null) {
      document.documentElement.style.setProperty(
        "--wa-border-radius-scale",
        this.#rounding
      );
    }

    if (!this.#initing) {
      this.updateSettings({ rounding: this.#rounding });
    }
  }

  set spacing(spacing) {
    spacing = spacing === null ? null : Number(spacing);
    if (isNaN(spacing) || spacing === this.#spacing) {
      return;
    }

    spacing = round(spacing, 4);

    document.documentElement.style.removeProperty("--wa-space-scale");
    if (spacing >= 0.5 && spacing <= 2) {
      this.#spacing = spacing;
    } else {
      this.#spacing = null;
    }

    if (this.#spacing !== null) {
      document.documentElement.style.setProperty(
        "--wa-space-scale",
        this.#spacing
      );
    }

    if (!this.#initing) {
      this.updateSettings({ spacing: this.#spacing });
    }
  }

  set borderWidth(borderWidth) {
    borderWidth = borderWidth === null ? null : Number(borderWidth);
    if (isNaN(borderWidth) || borderWidth === this.#borderWidth) {
      return;
    }

    borderWidth = round(borderWidth, 1);

    document.documentElement.style.removeProperty("--wa-border-width-scale");
    if (borderWidth >= 0.5 && borderWidth <= 4) {
      this.#borderWidth = borderWidth;
    } else {
      this.#borderWidth = null;
    }

    if (this.#borderWidth !== null) {
      document.documentElement.style.setProperty(
        "--wa-border-width-scale",
        this.#borderWidth
      );
    }

    if (!this.#initing) {
      this.updateSettings({ border_width: this.#borderWidth });
    }
  }

  updateSettings(args) {
    if (!this.updateTask) {
      this.updateTask = new DeferredTask(
        (callbackArgs) => {
          return fetch(UPDATE_USER_SETTINGS, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(callbackArgs),
          });
        },
        1000,
        { finalizeBeforeUnload: true }
      );
    }
    this.updateTask.arm(args);
  }

  makeDefault() {
    this.theme = THEME_LIST[0];
    this.mode = "light";
  }

  migrateTheme(themeMode) {
    this.theme = THEME_LIST[0];
    this.mode = themeMode;
  }
}
