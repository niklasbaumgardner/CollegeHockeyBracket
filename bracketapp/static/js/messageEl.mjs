import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

class MessageEl extends NikElement {
  static properties = {
    data: {
      type: Object,
    },
  };

  render() {
    console.log(this);
    return html`<sl-card
      ><p>${this.data.user.name}</p>
      <p>${this.data.text}</p>
      <p>${this.data.updated_at}</p>
    </sl-card>`;
  }
}

export default MessageEl;

customElements.define("nb-message-el", MessageEl);
