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

  async requestContent() {
    let response = await fetch(VIEW_GROUP_CONTENT_URL, {
      credentials: "include",
      mode: "no-cors",
    });
    let data = await response.json();

    let { brackets, winners, group, is_member } = data;
    this.brackets = brackets;
    this.winners = winners;
    this.group = group;
    this.year = this.group.year;
    this.isMember = is_member;
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
    event.target.closest("wa-dialog").hide();
  }

  memeberTemplate() {
    if (this.canEditGroupBracket && MY_BRACKET_COUNT < 5) {
      return html`<nb-countdown></nb-countdown>
        <div class="d-flex gap-3">
          <wa-button
            class="flex-grow-1"
            variant="primary"
            outline
            href=${this.group.new_bracket_url}
            >Create New Bracket</wa-button
          ><wa-button
            class="flex-grow-1"
            variant="primary"
            outline
            href=${MY_BRACKETS_URL + "#group_" + this.group.id}
            >Add Existing Bracket</wa-button
          >
        </div>`;
    } else if (this.canEditGroupBracket) {
      return html`<nb-countdown></nb-countdown
        ><wa-button
          variant="primary"
          outline
          href=${MY_BRACKETS_URL + "#group_" + this.group.id}
          >Add A Bracket</wa-button
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
      return html`<wa-button
        variant="primary"
        @click=${this.handleJoinButtonClick}
        >Join Group</wa-button
      >`;
    } else {
      return html`<wa-button variant="primary" href="${this.group.join_url}"
        >Join Group</wa-button
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
        ? html`<wa-alert open>
            You are viewing a group from ${this.group.year}</wa-alert
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
    return html`<wa-dialog id="join-dialog" label="Join ${this.group.name}">
      <form
        id="join-private-group"
        action="${this.group.join_url}"
        method="GET"
      >
        <p class="mb-3">
          This group is private. Please enter the password to join.
        </p>
        <wa-input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          maxlength="60"
          required
        ></wa-input>
      </form>
      <wa-button @click=${this.closeDialog} slot="footer">Close</wa-button>
      <wa-button
        type="submit"
        form="join-private-group"
        slot="footer"
        variant="primary"
        >Join</wa-button
      >
    </wa-dialog>`;
  }

  titleTemplate() {
    const inviteTemplate = html`<div class="d-flex align-items-center">
      Invite friends
      <wa-copy-button
        value="${this.group.share_url}"
        copy-label="Copy link to join"
      >
        <wa-icon slot="copy-icon" name="share"></wa-icon>
      </wa-copy-button>
    </div>`;

    let editGroupTemplate = null;
    if (CURRENT_USER.id === this.group.creator_id && this.canEditGroupBracket) {
      editGroupTemplate = html`<wa-button
        style="--wa-button-font-size-medium: var(--wa-font-size-x-large);"
        variant="text"
        @click=${this.handleEditGroupClick}
        ><wa-icon name="gear">Edit Group</wa-icon></wa-button
      >`;
    }

    return html`<div class="d-flex justify-content-between">
      <div class="d-flex">
        <h2>${this.group.name}</h2>
        ${editGroupTemplate}
      </div>
      ${this.isMember && !this.group.locked && this.canEditGroupBracket
        ? inviteTemplate
        : null}
    </div>`;
  }

  bracketsTemplate() {
    return html`<nb-group-standings-grid
      .brackets=${this.brackets}
      theme=${this.theme}
    ></nb-group-standings-grid>`;
  }

  render() {
    if (!this.year) {
      return null;
    }

    return html`${super.render()}${this.joinPrivateGroupTemplate()}`;
  }
}

customElements.define("nb-group-standings", GroupStandings);
