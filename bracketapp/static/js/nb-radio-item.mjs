import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import "./nb-bracket-card.mjs";

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

    return html`<sl-icon name=${this.icon}></sl-icon>`;
  }

  labelTemplate() {
    return html`<span>${this.label}</span>`;
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
        />${this.iconTemplate()}${this.labelTemplate()}
      </label>
    </sl-card>`;
  }
}

customElements.define("nb-radio-item", RadioItem);

export class BracketRadioItem extends RadioItem {
  connectedCallback() {
    super.connectedCallback();

    this.value = this.bracket.id;
  }

  iconTemplate() {
    if (!this.bracket.winner_team?.team.icon_path) {
      return null;
    }

    return html`<img
      class="standings-img"
      src=${this.bracket.winner_team.team.icon_path}
    />`;
  }

  labelTemplate() {
    return html`<nb-bracket-card .bracket=${this.bracket}></nb-bracket-card>`;
  }
}

customElements.define("nb-bracket-radio-item", BracketRadioItem);

export class GroupRadioItem extends RadioItem {
  connectedCallback() {
    super.connectedCallback();

    this.value = this.group.id;
  }

  iconTemplate() {
    if (!this.bracket.winner_team?.team.icon_path) {
      return null;
    }

    return html`<img
      class="standings-img"
      src=${this.bracket.winner_team.team.icon_path}
    />`;
  }

  labelTemplate() {
    return html`<nb-bracket-card .bracket=${this.bracket}></nb-bracket-card>`;
  }
}

customElements.define("nb-group-radio-item", GroupRadioItem);
