import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

class GroupCardEl extends NikElement {
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

  messageTemplate() {
    if (this.isMember) {
      return html`<p>Welcome to this years bracket challenge!</p>
        <p>
          <a href=${CREATE_BRACKET_URL}>Create a bracket</a>
        </p>`;
    } else {
      let joinTemplate;
      if (this.group.is_private) {
        joinTemplate = html`<p>
          <sl-button @click=${this.handleJoinButtonClick}>Join group</sl-button>
        </p>`;
      } else {
        joinTemplate = html`<p>
          <sl-button href="${JOIN_GROUP_URL}">Join group</sl-button>
        </p>`;
      }
      return html`<p>Welcome to this years bracket challenge!</p>
        <p>You are not a member of this group.</p>
        <p>Join this group to create a bracket.</p>
        ${joinTemplate}`;
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

  render() {
    return html`<div class="d-flex justify-content-center">
        <sl-card class="mb-5 width-fit-content">
          <div slot="header">
            <h2>${this.group.name} standings</h2>
          </div>
          <div>${this.messageTemplate()}</div>
        </sl-card>
      </div>
      ${this.joinPrivateGroupTemplate()} ${this.createBracketDialogTemplate()}`;
  }
}

export default GroupCardEl;

customElements.define("nb-group", GroupCardEl);
