import { NikElement } from "./nik-element.mjs";
import { html } from "lit";

export class BackButton extends NikElement {
  static properties = {
    href: { type: String },
  };

  connectedCallback() {
    super.connectedCallback();

    if (document.referrer) {
      const prevURL = new URL(document.referrer);
      const url = new URL(document.URL);

      if (prevURL.origin === url.origin) {
        this.href =
          localStorage.getItem("nb-bracket-back") ?? document.referrer;
      }
    }

    if (!this.href) {
      this.remove();
    }

    window.addEventListener("beforeunload", this);
  }

  handleEvent(event) {
    if (event.type !== "beforeunload") {
      return;
    }

    localStorage.setItem("nb-bracket-back", location.href);
  }

  render() {
    return html`<wa-button
      href=${this.href}
      id="back-button"
      variant="brand"
      appearance="outlined"
    >
      <wa-icon library="ion" name="chevron-back-outline"></wa-icon>
      Back</wa-button
    >`;
  }
}

customElements.define("nb-back-button", BackButton);
