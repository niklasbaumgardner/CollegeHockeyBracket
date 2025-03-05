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

export class BracketRadioItem extends NikElement {
  static properties = {
    name: { type: String },
    form: { type: String },
    bracket: { type: Object },
  };

  static queries = {
    input: "input",
  };

  imageTemplate() {
    if (!this.bracket.winner_team?.team.icon_path) {
      return null;
    }

    return html`<img
      class="standings-img"
      src=${this.bracket.winner_team.team.icon_path}
    />`;
  }

  render() {
    return html`<sl-card class="nb-radio-item">
      <label class="d-flex gap-2">
        <input
          type="radio"
          name=${this.name}
          value=${this.bracket.id}
          form=${this.form}
          required=""
        />
        ${this.imageTemplate()}
        <div class="d-flex flex-column gap-2">
          <div class="d-flex align-items-center gap-2">
            <span>${this.bracket.name}</span>
          </div>

          <div class="d-flex align-items-center gap-2 join-group-bracket">
            <div class="d-flex">
              <span
                ><p class="bracket-details-content">
                  ${this.bracket?.rank ?? "--"}
                </p>
                <p class="bracket-details-label">Rank</p></span
              >
            </div>
            <div class="d-flex">
              <span
                ><p class="bracket-details-content">${this.bracket?.points}</p>
                <p class="bracket-details-label">Points</p></span
              >
            </div>
            <div class="d-flex">
              <span
                ><p class="bracket-details-content">
                  ${this.bracket?.max_points}
                </p>
                <p class="bracket-details-label">Max points</p></span
              >
            </div>
          </div>
        </div>
      </label>
    </sl-card>`;
  }
}

customElements.define("nb-bracket-radio-item", BracketRadioItem);
