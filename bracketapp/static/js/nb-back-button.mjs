import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";

export class BackButton extends NikElement {
  click() {
    if (window.history?.length >= 1) {
      history.back();
    } else {
      window.location.href = document.referrer.length ? document.referrer : "/";
    }
  }

  render() {
    return html`<wa-button
      href="/"
      id="back-button"
      variant="brand"
      appearance="outlined"
      @click=${this.click}
    >
      <wa-icon library="ion" name="chevron-back-outline"></wa-icon>
      Back</wa-button
    >`;
  }
}

customElements.define("nb-back-button", BackButton);
