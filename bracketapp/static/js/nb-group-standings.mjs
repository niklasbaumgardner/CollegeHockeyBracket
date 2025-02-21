import { html } from "./imports.mjs";
import { Standings } from "./nb-standings.mjs";
import { GroupStandingsGrid } from "./nb-group-standings-grid.mjs";

export class GroupStandings extends Standings {
  static properties = {
    group: {
      type: Object,
    },
    isMember: {
      type: Boolean,
      converter: (value, type) => {
        return value === "True";
      },
    },
  };

  static queries = {
    joinDialog: "#join-dialog",
    bracketDialog: "#create-bracket-dialog",
  };

  handleJoinButtonClick() {
    this.joinDialog.show();
  }

  handleCreateBracketButtonClick() {
    this.bracketDialog.show();
  }

  closeDialog(event) {
    event.target.closest("sl-dialog").hide();
  }

  memeberTemplate() {
    if (CAN_EDIT_BRACKET && MY_BRACKET_COUNT < 5) {
      return html`<sl-button
        variant="primary"
        outline
        href=${CREATE_BRACKET_URL}
        >Add a bracket</sl-button
      >`;
    } else if (this.numWinners > 0) {
      return this.getWinningMessage();
    } else if (this.brackets.length) {
      return "View the current standings below.";
    }
    return "No brackets were created for this group.";
  }

  nonMemberTemplate() {
    if (this.group.is_private) {
      return html`<sl-button
        variant="primary"
        @click=${this.handleJoinButtonClick}
        ><sl-icon slot="prefix" name="lock"></sl-icon> Join group</sl-button
      >`;
    } else {
      return html`<sl-button variant="primary" href="${JOIN_GROUP_URL}"
        >Join group</sl-button
      >`;
    }
  }

  groupInfoTemplate() {
    let passwordTemplate = null;
    if (this.group.is_private && this.isMember) {
      passwordTemplate = html`<small
        ><span class="fw-semibold">Password</span> ${this.group.password}</small
      >`;
    }
    return html`<div class="d-flex gap-4">
      <small
        ><span class="fw-semibold">Members</span> ${this.group.members
          .length}</small
      ><small
        ><span class="fw-semibold">Brackets</span> ${this.brackets
          .length}</small
      >
      <small
        ><span class="fw-semibold">Group type</span> ${this.group.is_private
          ? "Private"
          : "Public"}</small
      >${passwordTemplate}
    </div>`;
  }

  messageTemplate() {
    let template = this.groupInfoTemplate();
    if (this.isMember) {
      return html`${template}${this.memeberTemplate()}`;
    } else {
      return html`${template}${this.nonMemberTemplate()}`;
    }
  }

  joinPrivateGroupTemplate() {
    return html`<sl-dialog id="join-dialog" label="Join ${this.group.name}">
      <form id="join-private-group" action="${JOIN_GROUP_URL}" method="GET">
        <p class="mb-3">
          This group is private. Please enter the password to join.
        </p>
        <sl-input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          maxlength="60"
          required
        ></sl-input>
      </form>
      <sl-button @click=${this.closeDialog} slot="footer">Close</sl-button>
      <sl-button
        type="submit"
        form="join-private-group"
        slot="footer"
        variant="primary"
        >Join</sl-button
      >
    </sl-dialog>`;
  }

  createBracketDialogTemplate() {
    return html`<sl-dialog id="create-bracket-dialog" label="Create a bracket">
      This group is private. Please enter the password to join.
      <sl-button @click=${this.closeDialog} slot="footer">Close</sl-button>
      <sl-button slot="footer" variant="primary">Join</sl-button>
    </sl-dialog>`;
  }

  titleTemplate() {
    const inviteTemplate = html`<div>
      Invite friends
      <sl-copy-button
        value="${this.group.share_url}"
        copy-label="Copy link to join"
      >
        <sl-icon slot="copy-icon" name="share"></sl-icon>
      </sl-copy-button>
    </div>`;

    return html`<div class="d-flex justify-content-between">
      <h2>${this.group.name}</h2>
      ${this.isMember ? inviteTemplate : null}
    </div>`;
  }

  bracketsTemplate() {
    return html`<nb-group-standings-grid
      .brackets=${this.brackets}
      theme=${this.theme}
    ></nb-group-standings-grid>`;
  }

  render() {
    return html`${super.render()}${this.joinPrivateGroupTemplate()}${this.createBracketDialogTemplate()}`;
  }
}

customElements.define("nb-group-standings", GroupStandings);
