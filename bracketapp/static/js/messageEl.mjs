import { html } from "lit";
import { NikElement } from "./nik-element.mjs";

class MessageEl extends NikElement {
  static properties = {
    data: {
      type: Object,
    },

    right: {
      type: Boolean,
      reflect: true,
    },
  };

  constructor() {
    super();

    this.init();
  }

  async init() {
    await this.updateComplete;

    this.right = this.myMessage;
  }

  get myMessage() {
    return (
      CHAT_USER.id == this.data.user.id ||
      CHAT_USER.id + CHAT_USER.username == this.data.user.id
    );
  }

  usernameTemplate() {
    if (!this.myMessage) {
      return html`<span class="font-size-2x-small"
        >${this.data.user.name}</span
      >`;
    }
  }

  render() {
    // <wa-format-date
    //       month="long"
    //       day="numeric"
    //       year="numeric"
    //       hour="numeric"
    //       minute="numeric"
    //       hour-format="12"
    //       date="${this.data.updated_at}"
    //       hidden
    //     ></wa-format-date>
    return html`${this.usernameTemplate()}<wa-card
        style="--padding: var(--wa-spacing-x-small);
    --border-radius: var(--wa-border-radius-x-large);
    ${this.myMessage
          ? "--wa-panel-background-color: var(--wa-color-primary-200);"
          : ""}"
        class="width-fit-content"
      >
        <p class="message-text">${this.data.text}</p>
      </wa-card>`;
  }
}

export default MessageEl;

customElements.define("nb-message-el", MessageEl);
