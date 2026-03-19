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
        <wa-button appearance="outlined" href=${DEFAULT_BRACKET_PAGE}
          >Go to default bracket page</wa-button
        >
        <wa-button appearance="outlined" href=${FLUSH_ENTIRE_CACHE_URL}
          >Flush the entire cache</wa-button
        >
        <wa-button appearance="outlined" href=${FLUSH_MAIN_CACHES_URL}
          >Flush the main caches</wa-button
        >

        <wa-divider></wa-divider>
        <form
          id="can_edit_bracket"
          method="POST"
          action=${UPDATE_CAN_EDIT_BRACKET_URL}
        ></form>
        <div class="wa-cluster">
          <wa-input
            form="can_edit_bracket"
            label="CAN_EDIT_BRACKET"
            value=${CAN_EDIT_BRACKET}
            name="CAN_EDIT_BRACKET"
          ></wa-input>
          <wa-button form="can_edit_bracket" type="submit"
            >Update CAN_EDIT_BRACKET</wa-button
          >
        </div>

        <wa-divider></wa-divider>
        <form id="year" method="POST" action=${UPDATE_YEAR_URL}></form>
        <div class="wa-cluster">
          <wa-input
            form="year"
            label="YEAR"
            value=${CURRENT_YEAR}
            name="YEAR"
          ></wa-input>
          <wa-button form="year" type="submit">Update YEAR</wa-button>
        </div>
      </div>
    </wa-card>`;
  }
}

customElements.define("nb-admin", Admin);
