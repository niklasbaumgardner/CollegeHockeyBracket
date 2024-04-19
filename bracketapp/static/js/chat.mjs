import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import { getRequest } from "./fetch.mjs";
import "./messageEl.mjs";

class ChatEl extends NikElement {
  static properties = {};

  static get queries() {
    return {
      messageInputEl: "#messageInput",
      messageListEl: "#messageList",
      drawerEl: "sl-drawer",
    };
  }

  constructor() {
    super();
    this.init();
  }

  async init() {
    this.client = StreamChat.getInstance("w22wdxnm8jwk");

    if (!CHAT_USER.token) {
      let response = await getRequest(CREATE_STREAMCHAT_TOKEN_URL);
      let jsonResponse = await response.json();
      let chatUser = JSON.parse(jsonResponse.chat_user);
      CHAT_USER.token = chatUser.token;
    }

    await this.client.connectUser(
      {
        id: `${CHAT_USER.id}`,
        name: CHAT_USER.username,
      },
      CHAT_USER.token
    );

    this.channel = this.client.channel("messaging", "NHLBracketApp2024", {
      name: "2024 College Hockey Bracket App Live Chat",
    });
    await this.channel.watch();
    await this.channel.addMembers([`${CHAT_USER.id}`]);

    console.log(this.channel);

    this.channel.on("message.new", (event) => this.handleNewMessage(event));

    this.chatButton = document.getElementById("chatButton");
    this.chatButton.hidden = false;
    this.chatButton.addEventListener("click", this);

    this.chatButtonBadge = document.getElementById("message-badge");

    this.requestUpdate();
  }

  handleEvent(event) {
    switch (event.type) {
      case "click":
        this.handleClick(event);
    }
  }

  handleClick(event) {
    this.toggleChatVisibility();
    this.chatButtonBadge.textContent = 0;
    this.chatButtonBadge.hidden = true;
  }

  toggleChatVisibility() {
    if (this.drawerEl.open) {
      this.drawerEl.hide();
    } else {
      this.drawerEl.show();
    }
  }

  async handleNewMessage(event) {
    this.requestUpdate();

    await this.messageListEl.updateComplete;
    setTimeout(() => {
      console.log(
        `Trying to scroll to ${
          this.messageListEl.shadowRoot.querySelector("div").scrollHeight
        }`
      );
      this.messageListEl.shadowRoot.querySelector("div").scrollTo({
        left: 0,
        top: this.messageListEl.shadowRoot.querySelector("div").scrollHeight,
        behavior: "smooth",
      });
    }, 100);

    if (!this.drawerEl.open) {
      let currentNum = parseInt(this.chatButtonBadge.textContent) ?? 0;
      console.log(currentNum);
      this.chatButtonBadge.textContent = currentNum + 1;
      this.chatButtonBadge.hidden = false;
    }
  }

  messagesTemplate() {
    if (!this.channel) {
      return;
    }

    return this.channel.state.messages.map(
      (m) => html`<nb-message-el .data=${m}></nb-message-el>`
    );
  }

  get isMobileDevice() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  async handleSendClick() {
    let message = this.messageInputEl.value;

    if (!message) {
      return;
    }

    await this.channel.sendMessage({ text: message });

    this.messageInputEl.value = "";
  }

  async handleKeyDown(event) {
    let message = this.messageInputEl.value;
    if (!message) {
      return;
    }

    if (this.isMobileDevice || !(event.key === "Enter") || event.shiftKey) {
      return;
    }

    event.preventDefault();

    await this.channel.sendMessage({ text: message });

    this.messageInputEl.value = "";
  }

  render() {
    return html`<sl-drawer label="Group Message" style="--size: 35rem;">
      <sl-card id="messageList"
        ><div class="d-flex flex-column gap-3">
          ${this.messagesTemplate()}
        </div></sl-card
      >
      <div class="d-flex align-items-center mt-3 gap-1">
        <sl-textarea
          id="messageInput"
          rows="2"
          @keydown=${this.handleKeyDown}
        ></sl-textarea
        ><sl-icon-button
          @click=${this.handleSendClick}
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
