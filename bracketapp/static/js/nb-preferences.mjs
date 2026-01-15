import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import {
  THEME_LIST,
  PRIMARY_COLOR_LIST,
  BACKGROUND_COLOR_LIST,
  COLOR_PALETTE_LIST,
} from "./theme.mjs";

function toUpper(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export class PreferencesCard extends NikElement {
  static properties = {
    theme: { type: Object },
  };

  static queries = {
    themesSelect: "#themes",
    modeSelect: "#mode",
    primaryColorSelect: "#primary-color",
    backgroundColorSelect: "#background-color",
    colorContrastSelect: "#color-contrast",
    colorPaletteSelect: "#color-palette",
    roundingSlider: "#theme-rounding",
    spacingSlider: "#theme-spacing",
    borderWidthSlider: "#theme-border-width",
    roundingInput: "#theme-rounding-input",
    spacingInput: "#theme-spacing-input",
    borderWidthInput: "#theme-border-width-input",
  };

  connectedCallback() {
    super.connectedCallback();
    this.init();
  }

  init() {
    this.theme = THEME;

    document.addEventListener("transitionstart", this);
    this.styleOberserver = new MutationObserver(() => this.handleCSSChange());
    this.styleOberserver.observe(document.documentElement, {
      attributeFilter: ["style"],
    });
  }

  handleThemeChange() {
    let theme = this.themesSelect.value;
    console.log(theme);

    this.theme.theme = theme;
  }

  handleModeChange() {
    let mode = this.modeSelect.value;
    console.log(mode);

    this.theme.mode = mode;
  }

  handlePrimaryColorChange() {
    let primaryColor = this.primaryColorSelect.value;
    console.log(primaryColor);

    this.theme.primaryColor = primaryColor;
  }

  handleBackgroundColorChange() {
    let backgroundColor = this.backgroundColorSelect.value;
    console.log(backgroundColor);

    this.theme.backgroundColor = backgroundColor;
  }

  handleColorPaletteChange() {
    let colorPalette = this.colorPaletteSelect.value;
    console.log(colorPalette);

    this.theme.colorPalette = colorPalette;
  }

  handleColorContrastChange() {
    let colorContrast = this.colorContrastSelect.value;
    console.log(colorContrast);

    this.theme.colorContrast = colorContrast;
  }

  handleRoundingChange(event) {
    let rounding = event.target.value;
    // console.log(rounding);
    this.theme.rounding = rounding;
  }

  decrementRounding() {
    this.theme.rounding = Number(this.roundingInput.value) - 0.1;
  }

  incrementRounding() {
    this.theme.rounding = Number(this.roundingInput.value) + 0.1;
  }

  resetRounding() {
    this.theme.rounding = null;
  }

  handleSpacingChange(event) {
    let spacing = event.target.value;
    // console.log(spacing);
    this.theme.spacing = spacing;
  }

  decrementSpacing() {
    this.theme.spacing = Number(this.spacingInput.value) - 0.0125;
  }

  incrementSpacing() {
    this.theme.spacing = Number(this.spacingInput.value) + 0.0125;
  }

  resetSpacing() {
    this.theme.spacing = null;
  }

  handleBorderWidthChange(event) {
    let borderWidth = event.target.value;
    // console.log(borderWidth);
    this.theme.borderWidth = borderWidth;
  }

  decrementBorderWidth() {
    this.theme.borderWidth = Number(this.borderWidthInput.value) - 0.5;
  }

  incrementBorderWidth() {
    this.theme.borderWidth = Number(this.borderWidthInput.value) + 0.5;
  }

  resetBorderWidth() {
    this.theme.borderWidth = null;
  }

  handleEvent(event) {
    switch (event.type) {
      case "transitionstart": {
        this.handleCSSChange(event);
        break;
      }
    }
  }

  handleCSSChange() {
    this.requestUpdate();
  }

  roundingTemplate() {
    return html`<div class="wa-split">
      <div class="wa-stack grow">
        <wa-slider
          id="theme-rounding"
          label="Rounding"
          min="0"
          max="4"
          step="0.1"
          .value=${this.theme.rounding}
          with-tooltip
          @change=${this.handleRoundingChange}
        ></wa-slider>
        <wa-button-group label="Rounding">
          <wa-button
            appearance="filled-outlined"
            @click=${this.decrementRounding}
            ><wa-icon
              library="ion"
              name="remove-outline"
              label="Smaller rounding"
            ></wa-icon
          ></wa-button>
          <wa-input
            id="theme-rounding-input"
            min="0"
            max="4"
            step="0.1"
            @input=${this.handleRoundingChange}
            type="number"
            .value=${this.theme.rounding}
          ></wa-input>
          <wa-button
            appearance="filled-outlined"
            @click=${this.incrementRounding}
            ><wa-icon
              library="ion"
              name="add-outline"
              label="Bigger rounding"
            ></wa-icon
          ></wa-button>
        </wa-button-group>
      </div>

      <wa-button
        appearance="outlined"
        variant="danger"
        @click=${this.resetRounding}
        >Reset</wa-button
      >
    </div>`;
  }

  spacingTemplate() {
    return html`<div class="wa-split">
      <div class="wa-stack grow">
        <wa-slider
          id="theme-spacing"
          label="Spacing"
          min="0.5"
          max="2"
          step="0.0125"
          .value=${this.theme.spacing}
          with-tooltip
          @change=${this.handleSpacingChange}
        ></wa-slider>
        <wa-button-group label="Spacing">
          <wa-button
            appearance="filled-outlined"
            @click=${this.decrementSpacing}
            ><wa-icon
              library="ion"
              name="remove-outline"
              label="Smaller spacing"
            ></wa-icon
          ></wa-button>
          <wa-input
            id="theme-spacing-input"
            min="0.5"
            max="2"
            step="0.0125"
            @input=${this.handleSpacingChange}
            type="number"
            .value=${this.theme.spacing}
          ></wa-input>
          <wa-button
            appearance="filled-outlined"
            @click=${this.incrementSpacing}
            ><wa-icon
              library="ion"
              name="add-outline"
              label="Bigger spacing"
            ></wa-icon
          ></wa-button>
        </wa-button-group>
      </div>
      <wa-button
        appearance="outlined"
        variant="danger"
        @click=${this.resetSpacing}
        >Reset</wa-button
      >
    </div>`;
  }

  borderWidthTemplate() {
    return html`<div class="wa-split">
      <div class="wa-stack grow">
        <wa-slider
          id="theme-border-width"
          label="Border width"
          min="0.5"
          max="4"
          step="0.5"
          .value=${this.theme.borderWidth}
          with-tooltip
          @change=${this.handleBorderWidthChange}
        ></wa-slider>
        <wa-button-group label="Border width">
          <wa-button
            appearance="filled-outlined"
            @click=${this.decrementBorderWidth}
            ><wa-icon
              library="ion"
              name="remove-outline"
              label="Smaller border width"
            ></wa-icon
          ></wa-button>
          <wa-input
            id="theme-border-width-input"
            min="0.5"
            max="4"
            step="0.5"
            @input=${this.handleBorderWidthChange}
            type="number"
            .value=${this.theme.borderWidth}
          ></wa-input>
          <wa-button
            appearance="filled-outlined"
            @click=${this.incrementBorderWidth}
            ><wa-icon
              library="ion"
              name="add-outline"
              label="Bigger border width"
            ></wa-icon
          ></wa-button>
        </wa-button-group>
      </div>
      <wa-button
        appearance="outlined"
        variant="danger"
        @click=${this.resetBorderWidth}
        >Reset</wa-button
      >
    </div>`;
  }

  render() {
    if (!this.theme) {
      return null;
    }

    return html`<wa-card>
      <div class="wa-stack">
        <div class="wa-stack">
          <h2>Preferences</h2>

          <wa-select
            id="themes"
            label="Builtin Themes"
            @input=${this.handleThemeChange}
            >${THEME_LIST.map(
              (theme) =>
                html`<wa-option
                  ?selected=${this.theme.theme === theme}
                  value=${theme}
                  >${toUpper(theme)}</wa-option
                >`
            )}</wa-select
          >

          <wa-select id="mode" label="Mode" @input=${this.handleModeChange}
            ><wa-option value="light" ?selected=${this.theme.mode === "light"}
              >Light</wa-option
            ><wa-option value="dark" ?selected=${this.theme.mode === "dark"}
              >Dark</wa-option
            ></wa-select
          >

          <wa-divider></wa-divider>

          <div class="wa-stack">
            <h4>Custom Theming Options</h4>

            <div class="wa-grid" style="--min-column-size: 20rem;">
              <div class="wa-stack">
                <wa-select
                  with-clear
                  id="primary-color"
                  label="Primary Color"
                  @input=${this.handlePrimaryColorChange}
                  >${PRIMARY_COLOR_LIST.map(
                    (color) =>
                      html`<wa-option
                        ?selected=${this.theme.primaryColor === color}
                        value=${color}
                        >${toUpper(color)}</wa-option
                      >`
                  )}</wa-select
                >

                <wa-select
                  with-clear
                  id="background-color"
                  label="Background Color"
                  @input=${this.handleBackgroundColorChange}
                  >${BACKGROUND_COLOR_LIST.map(
                    (color) =>
                      html`<wa-option
                        ?selected=${this.theme.backgroundColor === color}
                        value=${color}
                        >${toUpper(color)}</wa-option
                      >`
                  )}</wa-select
                >

                <wa-select
                  with-clear
                  id="color-palette"
                  label="Color Palette"
                  @input=${this.handleColorPaletteChange}
                  >${COLOR_PALETTE_LIST.map(
                    (color) =>
                      html`<wa-option
                        ?selected=${this.theme.colorPalette === color}
                        value=${color}
                        >${toUpper(color)}</wa-option
                      >`
                  )}</wa-select
                >
              </div>

              <div class="wa-stack gap-(--wa-space-l)">
                ${this.roundingTemplate()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </wa-card>`;
  }
}

customElements.define("nb-preferences", PreferencesCard);
