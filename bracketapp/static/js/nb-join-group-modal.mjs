import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";

export class JoinGroupModal extends NikElement {
  static properties = {
    bracket: { type: Object },
    groups: { type: Object },
  };

  static queries = {
    dialogEl: "sl-dialog",
  };

  show() {
    this.dialogEl.show();
    // this.updateComplete.then(() => {
    //   this.dialogEl.updateComplete.then(() => {
    //     this.dialogEl.show();
    //   });
    // });
  }

  hide() {
    this.dialogEl.hide();
  }

  render() {
    return html`<sl-dialog label="Join Group">
      <form id="join-group-form" action="" method="POST"></form>
      <div
        style="display:flex;flex-direction:column;gap:var(--sl-spacing-small);"
      >
        <div class="row">
          <p>Are you sure you want to delete this bracket?</p>
          <strong>This action cannot be undone.</strong>
        </div>
      </div>
      <sl-button
        slot="footer"
        id="close-button"
        variant="neutral"
        outline
        @click=${this.hide}
        >Cancel</sl-button
      >
      <sl-button
        type="submit"
        form="delete-bracket-form"
        slot="footer"
        id="delete-button"
        variant="danger"
        >Delete bracket</sl-button
      ></sl-dialog
    >`;
  }
}

customElements.define("nb-join-group-modal", JoinGroupModal);
