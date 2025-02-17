import { html } from "./imports.mjs";
import { Standings } from "./nb-standings.mjs";
import { StandingsGrid } from "./nb-standings-grid.mjs";

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
    console.log(event);
    event.target.closest("sl-dialog").hide();
  }

  memeberTemplate() {
    if (this.numWinners > 0) {
      return this.getWinningMessage();
    } else if (CAN_EDIT_BRACKET) {
      return html`<p>Welcome to this years bracket challenge!</p>
        <p>
          <a href=${CREATE_BRACKET_URL}
            >Create a bracket before time runs out!</a
          >
        </p>`;
      return "Create a bracket before time runs out!";
    } else if (this.brackets.length) {
      return "View the current standings below.";
    }
    return "No brackets were created for this group.";
  }

  nonMemberTemplate() {
    let joinTemplate;
    if (this.group.is_private) {
      joinTemplate = html`<p>
        <sl-button @click=${this.handleJoinButtonClick}
          ><sl-icon slot="prefix" name="lock"></sl-icon> Join group</sl-button
        >
      </p>`;
    } else {
      joinTemplate = html`<p>
        <sl-button href="${JOIN_GROUP_URL}">Join group</sl-button>
      </p>`;
    }
    return html`<p>Welcome to this years bracket challenge!</p>
      <p>You must be a member to create a bracket. Click below to join.</p>
      ${joinTemplate}`;
  }

  groupInfoTemplate() {
    return html`<div class="d-flex">
      <p>
        Members <b>${this.group.members.length}</b> Brackets
        <b>${this.brackets.length}</b> Group type
        ${this.group.is_private ? "private" : "public"} Password
        <b>${this.group.password}</b>
      </p>
    </div>`;
  }

  messageTemplate() {
    if (this.isMember) {
      return html`${this.groupInfoTemplate()}${this.memeberTemplate()}`;
    } else {
      return this.nonMemberTemplate();
    }
  }

  joinPrivateGroupTemplate() {
    return html`<sl-dialog id="join-dialog" label="Join ${this.group.name}">
      <form id="join-private-group" action="${JOIN_GROUP_URL}" method="POST">
        <p>This group is private. Please enter the password to join.</p>
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
    return html`<div><h2>${this.group.name} standings</h2></div>`;
  }

  render() {
    return html`${super.render()}${this.joinPrivateGroupTemplate()}${this.createBracketDialogTemplate()}`;
  }

  // render() {
  //   return html`<div class="d-flex justify-content-center">
  //       <sl-card class="mb-5 width-fit-content">
  //         <div slot="header">
  //           <h2>${this.group.name} standings</h2>
  //         </div>
  //         <div>${this.messageTemplate()}</div>
  //       </sl-card>
  //     </div>
  //     ${this.joinPrivateGroupTemplate()} ${this.createBracketDialogTemplate()}`;
  // }
}

customElements.define("nb-group-standings", GroupStandings);
