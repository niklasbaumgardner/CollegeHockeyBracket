import { html } from "./imports.mjs";
import { Standings } from "./nb-standings.mjs";
import { GroupStandingsGrid } from "./nb-group-standings-grid.mjs";
import { EditGroup } from "./nb-edit-group.mjs";

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

  get canEditGroupBracket() {
    return CAN_EDIT_BRACKET && CURRENT_YEAR === this.group.year;
  }

  handleJoinButtonClick() {
    this.joinDialog.show();
  }

  handleCreateBracketButtonClick() {
    this.bracketDialog.show();
  }

  handleEditGroupClick() {
    if (!this.editGroup) {
      this.editGroup = document.createElement("nb-edit-group");
      this.editGroup.group = this.group;
      this.editGroup.private = this.group.is_private;
      document.body.appendChild(this.editGroup);
    }

    this.editGroup.show();
  }

  closeDialog(event) {
    event.target.closest("sl-dialog").hide();
  }

  memeberTemplate() {
    if (this.canEditGroupBracket && MY_BRACKET_COUNT < 6) {
      return html`<nb-countdown></nb-countdown>
        <div class="d-flex gap-3">
          <sl-button
            class="flex-grow-1"
            variant="primary"
            outline
            href=${CREATE_BRACKET_URL}
            >Create New Bracket</sl-button
          ><sl-button
            class="flex-grow-1"
            variant="primary"
            outline
            href=${MY_BRACKETS_URL + "#group_" + this.group.id}
            >Add Existing Bracket</sl-button
          >
        </div>`;
    } else if (this.canEditGroupBracket) {
      return html`<nb-countdown></nb-countdown
        ><sl-button
          variant="primary"
          outline
          href=${MY_BRACKETS_URL + "#group_" + this.group.id}
          >Add A Bracket</sl-button
        >`;
    } else if (this.numWinners > 0) {
      return this.getWinningMessage();
    } else if (this.brackets.length) {
      return "View the current standings below.";
    }
    return "No brackets were created for this group.";
  }

  nonMemberTemplate() {
    if (this.group.locked) {
      return;
    }

    if (this.group.is_private) {
      return html`<sl-button
        variant="primary"
        @click=${this.handleJoinButtonClick}
        >Join Group</sl-button
      >`;
    } else {
      return html`<sl-button variant="primary" href="${JOIN_GROUP_URL}"
        >Join Group</sl-button
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
      </div>
      ${this.group.year !== CURRENT_YEAR
        ? html`<sl-alert open>
            You are viewing a group from ${this.group.year}</sl-alert
          >`
        : null}`;
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

  titleTemplate() {
    const inviteTemplate = html`<div class="d-flex align-items-center">
      Invite friends
      <sl-copy-button
        value="${this.group.share_url}"
        copy-label="Copy link to join"
      >
        <sl-icon slot="copy-icon" name="share"></sl-icon>
      </sl-copy-button>
    </div>`;

    let editGroupTemplate = null;
    if (CURRENT_USER.id === this.group.created_by && this.canEditGroupBracket) {
      editGroupTemplate = html`<sl-button
        style="--sl-button-font-size-medium: var(--sl-font-size-x-large);"
        variant="text"
        @click=${this.handleEditGroupClick}
        ><sl-icon name="gear">Edit Group</sl-icon></sl-button
      >`;
    }

    return html`<div class="d-flex justify-content-between">
      <div class="d-flex">
        <h2>${this.group.name}</h2>
        ${editGroupTemplate}
      </div>
      ${this.isMember && !this.group.locked ? inviteTemplate : null}
    </div>`;
  }

  bracketsTemplate() {
    return html`<nb-group-standings-grid
      .brackets=${this.brackets}
      theme=${this.theme}
    ></nb-group-standings-grid>`;
  }

  render() {
    return html`${super.render()}${this.joinPrivateGroupTemplate()}`;
  }
}

customElements.define("nb-group-standings", GroupStandings);
