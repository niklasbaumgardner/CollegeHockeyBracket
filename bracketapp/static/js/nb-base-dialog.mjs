import { NikElement } from "./nik-element.mjs";
import { html, nothing } from "lit";

export class BaseDialog extends NikElement {
  inputEvent = false;
  submitEvent = true;

  static queries = {
    dialog: "wa-dialog",
    submitButton: "wa-button[type='submit']",
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

  handleInput() {
    // do nothing
  }

  handleSubmit() {
    // Disable submit button so form can only be submitted once
    this.submitButton.disabled = true;
    this.submitButton.loading = true;
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
    return html`<wa-dialog
      @input=${this.inputEvent ? this.handleInput : nothing}
      @submit=${this.submitEvent ? this.handleSubmit : nothing}
    >
      <div slot="label">${this.lableTemplate()}</div>
      ${this.contentTemplate()}
      <div class="wa-cluster w-full" slot="footer">
        ${this.footerTemplate()}
      </div>
    </wa-dialog>`;
  }
}
