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
      addEventListener("visibilitychange", async () => {
        if (document.hidden) {
          await this.finalize();
        }
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
      this.#callback(this.#currentArgs);
      this.#timeoutId = null;
      this.#currentArgs = {};
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
      this.disarm();
      return this.#callback();
    }
  }
}
