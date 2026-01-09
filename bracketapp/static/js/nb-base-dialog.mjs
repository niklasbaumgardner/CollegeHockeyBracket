import { NikElement } from "./nik-element.mjs";

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
}
