import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

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
    return CHAT_USER.id == this.data.user.id;
  }

  usernameTemplate() {
    if (!this.myMessage) {
      return html`<span class="font-size-2x-small"
        >${this.data.user.name}</span
      >`;
    }
  }

  render() {
    // <sl-format-date
    //       month="long"
    //       day="numeric"
    //       year="numeric"
    //       hour="numeric"
    //       minute="numeric"
    //       hour-format="12"
    //       date="${this.data.updated_at}"
    //       hidden
    //     ></sl-format-date>
    return html`${this.usernameTemplate()}<sl-card
        style="--padding: var(--sl-spacing-x-small);
    --border-radius: var(--sl-border-radius-x-large);
    ${CHAT_USER.id == this.data.user.id ||
        CHAT_USER.id + CHAT_USER.username == this.data.user.id
          ? "--sl-panel-background-color: var(--sl-color-primary-200);"
          : ""}"
        class="width-fit-content"
      >
        <p class="message-text">${this.data.text}</p>
      </sl-card>`;
  }
}

export default MessageEl;

customElements.define("nb-message-el", MessageEl);
