import { NikElement } from "./nik-element.mjs";
import { html } from "lit";

export class BackButton extends NikElement {
  static properties = {
    href: { type: String },
  };

  connectedCallback() {
    super.connectedCallback();

    const storedPrev = localStorage.getItem("nb-bracket-back");
    const storedPrevPrev = localStorage.getItem("nb-bracket-back.prev");

    if (document.referrer) {
      const prevURL = new URL(storedPrev ?? document.referrer);
      const prevPrevURL = storedPrevPrev ? new URL(storedPrevPrev) : null;
      const url = new URL(document.URL);

      if (
        prevURL.origin === url.origin &&
        url.pathname !== "/leaderboard" &&
        url.pathname !== "/my_brackets"
      ) {
        this.href = prevURL.href;

        // TODO: prevent looping. Do i care about looping?
        //
        // if (url.href === prevPrevURL.href) {
        //   this.href = "/leaderboard";
        // } else {
        //   this.href = prevURL.href;
        // }
      }
    }

    localStorage.setItem("nb-bracket-back", location.href);
    localStorage.setItem("nb-bracket-back.prev", storedPrev);

    if (!this.href) {
      this.remove();
    }
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
