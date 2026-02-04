import { html } from "lit";
import { NikElement } from "./nik-element.mjs";
import "./nb-bracket-card.mjs";
import "./nb-group-card.mjs";

export class RadioItem extends NikElement {
  static properties = {
    label: { type: String },
    value: { type: String },
    name: { type: String },
    icon: { type: String },
    form: { type: String },
  };

  static queries = {
    input: "input",
  };

  iconTemplate() {
    if (!this.icon) {
      return null;
    }

    return html`<wa-icon name=${this.icon}></wa-icon>`;
  }

  labelTemplate() {
    return html`<span>${this.label}</span>`;
  }

  render() {
    return html`<wa-card class="nb-radio-item">
      <label class="wa-cluster w-full">
        <input
          type="radio"
          name=${this.name}
          value=${this.value}
          form=${this.form}
          required=""
        />${this.iconTemplate()}${this.labelTemplate()}
      </label>
    </wa-card>`;
  }
}

customElements.define("nb-radio-item", RadioItem);

export class BracketRadioItem extends RadioItem {
  static properties = {
    bracket: { type: Object },
  };

  connectedCallback() {
    super.connectedCallback();

    this.value = this.bracket.id;
  }

  iconTemplate() {
    return null;
  }

  labelTemplate() {
    return html`<nb-bracket-card-content
      .bracket=${this.bracket}
    ></nb-bracket-card-content>`;
  }
}

customElements.define("nb-bracket-radio-item", BracketRadioItem);

export class GroupRadioItem extends RadioItem {
  static properties = {
    group: { type: Object },
  };

  connectedCallback() {
    super.connectedCallback();

    this.value = this.group.id;
  }

  iconTemplate() {
    return null;
  }

  labelTemplate() {
    return html`<nb-group-card-content
      .group=${this.group}
    ></nb-group-card-content>`;
  }
}

customElements.define("nb-group-radio-item", GroupRadioItem);
