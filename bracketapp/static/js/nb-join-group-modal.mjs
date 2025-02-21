import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import { GroupCard } from "./nb-group-card.mjs";
import { RadioItem } from "./nb-radio-item.mjs";

export class JoinGroupModal extends NikElement {
  static properties = {
    bracket: { type: Object },
    groups: { type: Object },
  };

  static queries = {
    dialogEl: "sl-dialog",
  };

  get joinedGroups() {
    return this.bracket.group_brackets.map((gb) => gb.group);
  }

  get joinsCanJoin() {
    return this.groups.filter(
      (g) => !this.joinedGroups.find((jg) => jg.id === g.id)
    );
  }

  show() {
    this.updateComplete.then(() => {
      this.dialogEl.updateComplete.then(() => {
        this.dialogEl.show();
      });
    });
  }

  hide() {
    this.dialogEl.hide();
  }

  bracketTemplate() {
    return html`<div class="mb-4">
      <p>Joining bracket:</p>
      <sl-card style="--padding:var(--sl-spacing-small);"
        ><div class="d-flex align-items-center gap-2 ">
          <img
            class="standings-img"
            src="${this.bracket.winner_team.team.icon_path}"
            alt="${this.bracket.winner_team.team.name}"
          />${this.bracket.name}
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
      </sl-card>
    </div> `;
  }

  groupTemplate(group) {
    return html`<nb-radio-item
      name="group_id"
      icon="trophy"
      label=${group.name}
      value=${group.id}
      form="join-group-form"
    ></nb-radio-item>`;
  }

  groupsTemplate() {
    let groupCards = this.joinsCanJoin.map((g) => this.groupTemplate(g));

    return html`<div class="d-flex flex-column gap-2">
      <p>Available groups to join:</p>
      ${groupCards}
    </div>`;
  }

  render() {
    return html`<sl-dialog label="Add Bracket To Group">
      <form
        id="join-group-form"
        action="${this.bracket.bracket_join_group_url}"
        method="POST"
      ></form>

      ${this.bracketTemplate()} ${this.groupsTemplate()}
      <sl-button
        id="join-button"
        class="w-100"
        type="submit"
        form="join-group-form"
        slot="footer"
        variant="primary"
        >Add Bracket</sl-button
      ></sl-dialog
    >`;
  }
}

customElements.define("nb-join-group-modal", JoinGroupModal);
