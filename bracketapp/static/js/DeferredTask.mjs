export class DeferredTask {
  #callback;
  #timeout;
  #timeoutId;
  #currentArgs;
  constructor(callback, timeout, options = {}) {
    this.#callback = callback;
    this.#timeout = timeout;
    this.#currentArgs = {};

    if (options?.finalizeBeforeUnload) {
      window.addEventListener("beforeunload", async (event) => {
        // event.preventDefault();
        await this.finalize();
      });
    }
  }

  get isArmed() {
    return this.#timeoutId !== null;
  }

  arm(args) {
    if (this.isArmed) {
      args = { ...this.#currentArgs, ...args };
    }

    this.disarm();
    this.#currentArgs = args;

    this.#timeoutId = setTimeout(() => {
      try {
        this.#callback(this.#currentArgs);
      } finally {
        this.#timeoutId = null;
        this.#currentArgs = {};
      }
    }, this.#timeout);
  }

  disarm() {
    if (this.isArmed) {
      clearTimeout(this.#timeoutId);
      this.#timeoutId = null;
      this.#currentArgs = {};
    }
  }

  finalize() {
    if (this.isArmed) {
      let args = this.#currentArgs;
      this.disarm();
      try {
        return this.#callback(args);
      } catch {}
    }
  }
}
