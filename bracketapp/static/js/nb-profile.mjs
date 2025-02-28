import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import { SignupCard } from "./nb-signup.mjs";

export class ProfileCard extends SignupCard {
  static properties = {
    username: { type: String },
  };

  async handleEmailInput() {
    console.log(this.emailInput.value, this.email);
    if (this.emailInput.value === this.email) {
      this.emailInput.helpText = "";
      this.emailValid = false;
      return;
    }

    super.handleEmailInput();
  }

  async handleUsernameInput() {
    if (this.usernameInput.value === this.username) {
      this.usernameInput.helpText = "";
      this.usernameValid = false;
      return;
    }

    super.handleUsernameInput();
  }

  render() {
    return html`<sl-card>
      <form id="profile-form" action="" method="POST" autocomplete="off"></form>
      <div class="d-flex flex-column gap-4">
        <h2>Profile</h2>

        <sl-input
          form="profile-form"
          @sl-input=${this.handleEmailInput}
          value=${this.email}
          original-value=${this.email}
          type="email"
          label="Email"
          id="email"
          name="email"
          maxlength="60"
          required
        ></sl-input>

        <sl-input
          form="profile-form"
          @sl-input=${this.handleUsernameInput}
          value=${this.username}
          original-value=${this.username}
          label="Username"
          id="username"
          name="username"
          maxlength="60"
          required
        ></sl-input>

        <sl-button
          form="profile-form"
          id="submitButton"
          class="w-100"
          variant="primary"
          type="submit"
          ?disabled=${!(this.emailValid || this.usernameValid)}
          >Update</sl-button
        >
        <small>
          <a href="${PASSWORD_RESET_REQUEST_URL}">Reset password</a>
        </small>
      </div>
    </sl-card>`;
  }
}

customElements.define("nb-profile", ProfileCard);
