import { NikElement } from "./nik-element.mjs";
import { html } from "lit";

export class AddTeam extends NikElement {
  render() {
    return html`<wa-card
      ><form method="POST">
        <div class="wa-stack">
          <wa-input
            name="team"
            label="New team name"
            type="text"
            placeholder="Michigan St."
            required
          ></wa-input>
          <wa-button variant="brand" type="submit">Add team</wa-button>
        </div>
      </form></wa-card
    >`;
  }
}

customElements.define("nb-add-team", AddTeam);
