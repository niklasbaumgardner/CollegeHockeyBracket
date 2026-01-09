import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class RemoveGroupBracketModal extends BaseDialog {
  static properties = {
    bracket: { type: Object },
    group: { type: Object },
  };

  render() {
    return html`<wa-dialog label="Remove Bracket?">
      <form
        id="delete-group-bracket-form"
        action=${this.bracket.group_bracket.delete_url}
        method="POST"
      >
        <p>
          Are you sure want to remove <strong>${this.bracket.name}</strong> from
          <strong>${this.group.name}</strong>?
        </p>
      </form>
      <div slot="footer" class="d-flex gap-3">
        <wa-button class="w-50" variant="neutral" outline @click=${this.hide}
          >Cancel</wa-button
        >
        <wa-button
          class="w-50"
          variant="danger"
          type="submit"
          form="delete-group-bracket-form"
          >Remove Bracket</wa-button
        >
      </div>
    </wa-dialog>`;
  }
}

customElements.define("nb-remove-group-bracket-modal", RemoveGroupBracketModal);
