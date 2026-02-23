import { html } from "lit";
import "./nb-delete-group.mjs";
import { NikElement } from "./nik-element.mjs";

export class FontPicker extends NikElement {
  static properties = { themes: { type: Array } };

  async connectedCallback() {
    super.connectedCallback();

    let response = await fetch(
      "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyC3q_WbgpIAHZpHBY9bpL7ow56yJ_nCSxE&subset=latin",
    );
    console.log(response);

    let json = await response.json();
    console.log(json);
    this.themes = json.items;
  }

  render() {
    if (!this.themes) {
      return null;
    }

    return html`<wa-select label="Font" with-clear
      >${this.themes.map(
        (t) => html`<wa-option value=${t.family}>${t.family}</wa-option>`,
      )}</wa-select
    >`;
  }
}
customElements.define("nb-font-picker", FontPicker);
