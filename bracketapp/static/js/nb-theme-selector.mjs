import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

export class ThemeSelector extends NikElement {
  static queries = {
    dropdown: "wa-dropdown",
    lightIcon: "#light-icon",
    darkIcon: "#dark-icon",
  };

  handleThemeSelect() {
    setTheme(this.dropdown.value);
  }

  render() {
    return html`<wa-dropdown @sl-select=${this.handleThemeSelect}>
      <wa-button id="theme-button" appearance="plain" slot="trigger" caret>
        <wa-icon id="light-icon" name="sun" library="default" hidden></wa-icon>
        <wa-icon id="dark-icon" name="moon" library="default" hidden></wa-icon>
      </wa-button>
      <wa-menu id="theme-selector">
        <wa-menu-item id="light" type="checkbox" value="light"
          >Light</wa-menu-item
        >
        <wa-menu-item id="dark" type="checkbox" value="dark">Dark</wa-menu-item>
      </wa-menu>
    </wa-dropdown>`;
  }
}

customElements.define("nb-theme-selector", ThemeSelector);
