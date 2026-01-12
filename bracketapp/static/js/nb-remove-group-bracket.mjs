import { html } from "./lit.bundle.mjs";
import { BaseDialog } from "./nb-base-dialog.mjs";

export class RemoveGroupBracket extends BaseDialog {
  static properties = {
    bracket: { type: Object },
    group: { type: Object },
  };

  lableTemplate() {
    return html`Remove Bracket?`;
  }

  contentTemplate() {
    return html`<form
      id="delete-group-bracket-form"
      action=${this.bracket.group_bracket.delete_url}
      method="POST"
    >
      <p>
        Are you sure want to remove <strong>${this.bracket.name}</strong> from
        <strong>${this.group.name}</strong>?
      </p>
    </form>`;
  }

  footerTemplate() {
    return html`${this.cancelButtonTemplate()}<wa-button
        class="grow"
        variant="danger"
        type="submit"
        form="delete-group-bracket-form"
        >Remove Bracket</wa-button
      >`;
  }
}

customElements.define("nb-remove-group-bracket", RemoveGroupBracket);
