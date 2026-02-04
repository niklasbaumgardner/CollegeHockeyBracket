import { NikElement } from "./nik-element.mjs";
import { html } from "lit";

export class BaseDialog extends NikElement {
  static queries = {
    dialog: "wa-dialog",
  };

  show() {
    customElements.whenDefined("wa-dialog").then(() => {
      this.updateComplete.then(() => {
        this.dialog.updateComplete.then(() => {
          this.dialog.open = true;
        });
      });
    });
  }

  hide() {
    this.dialog.open = false;
  }

  handleDialogShow(event) {
    if (event.target !== this.dialog) {
      return;
    }

    this.querySelector("wa-input")?.focus();
  }

  handleWaHide(event) {
    if (event.target !== this.dialog) {
      return;
    }

    if (event.explicitOriginalTarget.localName === "wa-option") {
      event.preventDefault();
    }
  }

  lableTemplate() {
    return null;
  }

  contentTemplate() {
    return null;
  }

  footerTemplate() {
    return null;
  }

  cancelButtonTemplate() {
    return html`<wa-button
      class="grow"
      data-dialog="close"
      variant="neutral"
      appearance="outlined"
      >Cancel</wa-button
    >`;
  }

  render() {
    return html`<wa-dialog>
      <div slot="label">${this.lableTemplate()}</div>
      ${this.contentTemplate()}
      <div class="wa-cluster w-full" slot="footer">
        ${this.footerTemplate()}
      </div>
    </wa-dialog>`;
  }
}
