import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

const themeStorage = window["localStorage"];

export class ThemeSelector extends NikElement {
  static properties = {
    theme: { type: String, reflect: true },
  };

  static queries = {
    dropdown: "sl-dropdown",
    lightIcon: "#light-icon",
    darkIcon: "#dark-icon",
    icons: { all: "sl-icon" },
    themeItems: { all: "sl-menu-item" },
  };

  get currentThemeIcon() {
    if (this.theme === "dark") {
      return this.darkIcon;
    }
    return this.lightIcon;
  }

  connectedCallback() {
    super.connectedCallback();

    this.init();
  }

  async init() {
    await this.updateComplete;

    if (THEME === "") {
      let storedTheme = themeStorage.getItem("theme");
      this.setTheme(storedTheme);
    } else {
      this.setTheme(THEME, { dontSend: true });
    }
  }

  setTheme(theme, options) {
    this.theme = theme === "dark" ? "dark" : "light";

    console.log("setting theme", this.theme);

    themeStorage.setItem("theme", this.theme);
    // Set theme on document
    document.documentElement.setAttribute("data-bs-theme", this.theme);
    document.documentElement.classList.toggle(
      "sl-theme-dark",
      this.theme === "dark"
    );
    document.documentElement.classList.toggle(
      "sl-theme-light",
      this.theme === "light"
    );

    for (let button of this.themeItems) {
      button.checked = button.value === this.theme;
    }

    for (let icon of this.icons) {
      icon.hidden = true;
    }

    this.currentThemeIcon.hidden = false;

    if (!(options?.dontSend === true)) {
      fetch(THEME_URL + "?" + new URLSearchParams({ theme: this.theme }));
    }
  }

  handleThemeSelect(event) {
    const selectedTheme = event.detail.item;
    this.setTheme(selectedTheme.value);
  }

  render() {
    return html`<sl-dropdown @sl-select=${this.handleThemeSelect}>
      <sl-button id="theme-button" variant="text" slot="trigger" caret>
        <sl-icon id="light-icon" name="sun-fill" hidden></sl-icon>
        <sl-icon id="dark-icon" name="moon-fill" hidden></sl-icon>
      </sl-button>

      <sl-menu id="theme-selector">
        <sl-menu-item id="light" type="checkbox" value="light"
          >Light</sl-menu-item
        >
        <sl-menu-item id="dark" type="checkbox" value="dark">Dark</sl-menu-item>
      </sl-menu>
    </sl-dropdown>`;
  }
}

customElements.define("nb-theme-selector", ThemeSelector);
