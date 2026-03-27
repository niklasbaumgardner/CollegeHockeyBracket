import { html } from "lit";
import "./nb-edit-group.mjs";
import "./nb-group-standings-grid.mjs";
import "./nb-join-private-group.mjs";
import { Standings } from "./nb-standings.mjs";

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
    // joinDialog: "#join-dialog",
    bracketDialog: "#create-bracket-dialog",
  };

  get canEditGroupBracket() {
    return CAN_EDIT_BRACKET && CURRENT_YEAR === this.group.year;
  }

  get joinKey() {
    const params = new URLSearchParams(location.search);
    return params.get("join_key");
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

    if (!this.isMember && location.hash === "#join-private-group") {
      this.handleJoinGroupClick();
    }
  }

  handleJoinGroupClick() {
    if (!this.joinDialog) {
      this.joinDialog = document.createElement("nb-join-private-group");
      this.joinDialog.group = this.group;

      document.body.appendChild(this.joinDialog);
    }
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
    const existingBracketButton = html`<wa-button
      class="grow"
      variant="brand"
      appearance="outlined"
      href=${MY_BRACKETS_URL + "#group_" + this.group.id}
      >Add Existing Bracket</wa-button
    >`;

    if (this.canEditGroupBracket && MY_BRACKET_COUNT < 5) {
      return html`<div class="wa-cluster">
        <wa-button
          class="grow"
          variant="brand"
          appearance="outlined"
          href=${this.group.create_bracket_url}
          >Create New Bracket</wa-button
        >${existingBracketButton}
      </div>`;
    } else if (this.canEditGroupBracket) {
      // || this.group.year === CURRENT_YEAR
      return existingBracketButton;
    }
  }

  nonMemberTemplate() {
    if (this.group.year !== CURRENT_YEAR || this.group.locked) {
      return;
    }

    // If the user is logged in then there shouldn't be a join key in the url so show the join dialog.
    // Is is possible for the user to have a join key in the url and be logged in?
    if (CURRENT_USER.id && this.group.is_private) {
      return html`<wa-button variant="brand" @click=${this.handleJoinGroupClick}
        >Join Group</wa-button
      >`;
    } else {
      return html`<form
        action=${this.group.join_safe_url}
        method="POST"
        class="flex"
      >
        ${this.joinKey
          ? html`<input
              name="join_key"
              value=${this.joinKey}
              class="hidden"
              hidden
            />`
          : null}
        <wa-button class="grow" variant="brand" type="submit"
          >Join Group</wa-button
        >
      </form>`;
    }
  }

  groupInfoTemplate() {
    let passwordTemplate = null;
    if (this.group.is_private && this.isMember) {
      passwordTemplate = html`<small
        ><span class="font-semibold">Password</span> ${this.group
          .password}</small
      >`;
    }

    return html`<div class="wa-cluster">
        <small
          ><span class="font-semibold">Brackets</span> ${this.group
            .bracket_count}</small
        >
        <small
          ><span class="font-semibold">Group type</span> ${this.group.is_private
            ? "Private"
            : "Public"}</small
        >${passwordTemplate}
      </div>
      ${this.group.year !== CURRENT_YEAR
        ? html`<wa-callout open>
            You are viewing a group from ${this.group.year}</wa-callout
          >`
        : null}`;
  }

  messageTemplate() {
    let memberTemplate = null;
    if (this.isMember) {
      memberTemplate = this.memeberTemplate();
    } else {
      memberTemplate = this.nonMemberTemplate();
    }

    return html`${this.groupInfoTemplate()}${super.messageTemplate()}${memberTemplate}`;
  }

  titleTemplate() {
    const inviteTemplate = html`<div class="wa-cluster">
      Invite friends
      <wa-copy-button
        value="${this.group.share_url}"
        copy-label="Copy link to join"
      >
        <wa-icon
          slot="copy-icon"
          name="share"
          library="hero"
          variant="outline"
        ></wa-icon>
      </wa-copy-button>
    </div>`;

    let editGroupTemplate = null;
    if (CURRENT_USER.id === this.group.creator_id && this.canEditGroupBracket) {
      editGroupTemplate = html`<wa-button
        variant="brand"
        appearance="plain"
        @click=${this.handleEditGroupClick}
        ><wa-icon library="hero" name="cog-6-tooth" variant="outline"
          >Edit Group</wa-icon
        ></wa-button
      >`;
    }

    return html`<div class="wa-split">
      <div class="wa-cluster">
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
      year=${this.year}
    ></nb-group-standings-grid>`;
  }

  render() {
    if (!this.year) {
      return null;
    }

    return html`${super.render()}`;
  }
}

customElements.define("nb-group-standings", GroupStandings);
