import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import "./messageEl.mjs";

class ChatEl extends NikElement {
  static properties = {};

  static get queries() {
    return {
      messageInputEl: "#message",
      messageListEl: "#messageList",
    };
  }

  constructor() {
    super();
    this.init();
  }

  async init() {
    this.client = StreamChat.getInstance("w22wdxnm8jwk");

    await this.client.connectUser(
      {
        id: `${CHAT_USER.id}`,
        name: CHAT_USER.name,
      },
      CHAT_USER.token
    );

    this.channel = this.client.channel("messaging", "BracketApp2024", {
      name: "2024 College Hockey Bracket App Live Chat",
    });
    await this.channel.watch();
    await this.channel.addMembers([`${CHAT_USER.id}`], {
      text: `${CHAT_USER.name} joined the channel.`,
    });

    console.log(this.channel);

    this.channel.on("message.new", (event) => this.handleNewMessage(event));

    this.requestUpdate();
  }

  handleNewMessage(event) {
    console.log(event);
    // this.messageListEl.appendChild(docu);
    this.requestUpdate();
  }

  messagesTemplate() {
    if (!this.channel) {
      return;
    }

    return this.channel.state.messages.map(
      (m) => html`<nb-message-el .data=${m}></nb-message-el>`
    );
  }

  async handleSendClick() {
    let message = this.messageInputEl.value;

    if (!message) {
      return;
    }

    await this.channel.sendMessage({ text: message });

    this.messageInputEl.value = "";
  }

  render() {
    return html`<sl-drawer
      ><div>
        <div id="messageList">${this.messagesTemplate()}</div>
        <sl-input id="message"></sl-input
        ><sl-icon-button
          @click=${this.handleSendClick}
          @touchstart=${this.handleSendClick}
          name="send"
          label="Send message"
        ></sl-icon-button></div
    ></sl-drawer>`;
  }
}

export default ChatEl;

customElements.define("nb-chat-el", ChatEl);

if (CHAT_USER) {
  document.body.appendChild(document.createElement("nb-chat-el"));
}
