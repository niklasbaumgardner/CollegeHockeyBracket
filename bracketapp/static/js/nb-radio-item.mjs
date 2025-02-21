import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

export class RadioItem extends NikElement {
  static properties = {
    label: { type: String },
    value: { type: String },
    name: { type: String },
    icon: { type: String },
    form: { type: String },
  };

  static queries = {
    labelEl: "label",
    input: "input",
  };

  iconTemplate() {
    if (!this.icon) {
      return null;
    }

    return html`<sl-icon name=${this.icon}></sl-icon>`;
  }

  render() {
    return html`<sl-card class="nb-radio-item">
      <label class="d-flex align-items-center gap-2">
        <input
          type="radio"
          name=${this.name}
          value=${this.value}
          form=${this.form}
          required=""
        />${this.iconTemplate()}
        <span>${this.label}</span>
      </label>
    </sl-card>`;
  }
}

customElements.define("nb-radio-item", RadioItem);
