import { NikElement } from "./nik-element.mjs";
import { html } from "lit";

export class Admin extends NikElement {
  render() {
    return html`<wa-card>
      <div class="wa-stack">
        <wa-button variant="brand" href=${UPDATE_ALL_POINTS_URL}
          >Update all points</wa-button
        >
        <wa-button appearance="outlined" href=${CORRECT_BRACKET_PAGE}
          >Go to correct bracket page</wa-button
        >
        <wa-button appearance="outlined" href=${ADD_TEAM_PAGE}
          >Go to add team page</wa-button
        >
        <wa-button appearance="outlined" href=${DEFAULT_BRACKET_PAGE}
          >Go to default bracket page</wa-button
        >
        <wa-button appearance="outlined" href=${FLUSH_CACHE_URL}
          >Flush the cache</wa-button
        >
      </div>
    </wa-card>`;
  }
}

customElements.define("nb-admin", Admin);
