import { NikElement } from "./nik-element.mjs";
import { html } from "lit";
import {
  VARIANT_COLOR_LIST,
  COLOR_PALETTE_LIST,
  COLORS,
  NUMBERS,
  VARIANTS,
} from "./theme.mjs";

function toUpper(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export class PreferencesCard extends NikElement {
  static properties = {
    theme: { type: Object },
  };

  static queries = {
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
    bgNumberInputs: { all: ".box-radio" },
  };

  connectedCallback() {
    super.connectedCallback();
    this.init();
  }

  init() {
    this.theme = THEME;
    const bgArray = this.theme.backgroundColor?.split("-");
    this.bgNumber = bgArray?.at(-1) ? Number(bgArray.at(-1)) : 600;

    document.addEventListener("transitionstart", this);
    this.styleOberserver = new MutationObserver(() => this.handleCSSChange());
    this.styleOberserver.observe(document.documentElement, {
      attributeFilter: ["style"],
    });
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

  handleVariantChange(event) {
    let select = event.target;
    let variant = select.name;

    this.theme.setVariantColor(variant, select.value);
  }

  handleBackgroundColorChange() {
    let backgroundColor = this.backgroundColorSelect.value;
    console.log(backgroundColor);

    this.theme.backgroundColor = `--color-${backgroundColor}-${this.bgNumber}`;

    this.requestUpdate();
  }

  handleBackgroundNumberChange() {
    for (let input of this.bgNumberInputs) {
      if (input.checked) {
        this.bgNumber = Number(input.value);
        break;
      }
    }
    this.handleBackgroundColorChange();
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

        <wa-number-input
          min="0"
          max="4"
          step="0.1"
          .value=${this.theme.rounding}
          @input=${this.handleRoundingChange}
        ></wa-number-input>
      </div>

      <wa-button
        appearance="outlined"
        variant="danger"
        @click=${this.resetRounding}
        >Reset</wa-button
      >
    </div>`;
  }

  bgNumberRadioTemplate() {
    if (!this.backgroundColorSelect) {
      this.updateComplete.then(() => this.requestUpdate());
      return;
    }

    let color = this.backgroundColorSelect.value?.toLowerCase();
    if (!COLORS.includes(color)) {
      return;
    }

    return NUMBERS.map(
      (n) =>
        html`<input
          @input=${this.handleBackgroundNumberChange}
          class="box-radio bg-(--color-${color}-${n})"
          style="background-color: var(--color-${color}-${n});"
          type="radio"
          name="color-number"
          ?checked=${this.bgNumber === n}
          value=${n}
        />`,
    );
  }

  backgroundColorTemplate() {
    return html`<div class="wa-stack">
      <wa-select
        with-clear
        id="background-color"
        label="Background Color"
        @input=${this.handleBackgroundColorChange}
        >${COLORS.map(
          (color) =>
            html`<wa-option
              ?selected=${this.theme.backgroundColor?.includes(color)}
              value=${color}
              >${toUpper(color)}
            </wa-option>`,
        )}</wa-select
      >
      <div class="wa-cluster wa-nativ">${this.bgNumberRadioTemplate()}</div>
    </div>`;
  }

  variantsTemplate() {
    return VARIANTS.map(
      (variant) =>
        html`<wa-select
          with-clear
          id="${variant}-color"
          name=${variant}
          label="${toUpper(variant)} Color"
          @input=${this.handleVariantChange}
          >${VARIANT_COLOR_LIST.map(
            (color) =>
              html`<wa-option
                ?selected=${this.theme.getVariantColor(variant) === color}
                value=${color}
                ><div class="wa-split">
                  ${toUpper(color)}
                  <div
                    class="grow h-1"
                    style="background-color: var(--color-${color}-600);"
                  ></div></div
              ></wa-option>`,
          )}</wa-select
        >`,
    );
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
                >`,
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
            <h4>Advanced Theming Options</h4>

            <div class="wa-grid" style="--min-column-size: 20rem;">
              <div class="wa-stack">
                ${this.backgroundColorTemplate()}

                <wa-divider></wa-divider>

                ${this.variantsTemplate()}
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
