class ScoreResult extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
    :host {
      --width-triangle: 80px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 4rem;
      }

      .container {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .buttons {
        margin: 0 9rem;
        order: var(--order);
      }
      
      .inc {
        cursor: pointer;
        width: 0;
        height: 0;
        border-left: var(--width-triangle) solid transparent;
        border-right: var(--width-triangle) solid transparent;
        border-bottom: calc(var(--width-triangle) + 50px) solid var(--bg-title-color);
      }

      .dec {
        cursor: pointer;
        width: 0;
        height: 0;
        border-left: var(--width-triangle) solid transparent;
        border-right: var(--width-triangle) solid transparent;
        border-top: calc(var(--width-triangle) + 50px) solid var(--bg-title-color);
        margin-top: 2rem;
      }

      .score {
        cursor: pointer;
        user-select: none;
        font-family: Aight;
        font-size: 7.5rem;
        letter-spacing: 1rem;
        width: 200px;
        height: 200px;
        background-color: var(--bg-title-color);
        border: 6px solid var(--border-title-color);
        color: var(--text-color);
        border-radius: 8px;
        text-align: center;
      }

      p {
        margin-top: 1.5rem;
      }
    `;
  }

  connectedCallback() {
    this.score = 0;
    this.render();
    this.init();
  }

  init() {
    this.buttons = this.shadowRoot.querySelector(".buttons");
    this.value = this.shadowRoot.querySelector(".value");
    this.buttons.addEventListener("click", e => {
      if (e.target.classList.contains("inc")) {
        this.value.innerHTML = `${++this.score}`;
      } else if (e.target.classList.contains("dec")) {
        this.score = this.score - 1;
        if (this.score < 0) {
          this.score = 0;
        }
        this.value.innerHTML = this.score;
      }
    });
    this.value.addEventListener("dblclick", e => {
      this.score = 0;
      this.value.innerHTML = this.score;
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${ScoreResult.styles}</style>
    <div class="container">
      <div class="buttons">
        <div class="btn inc"></div>
        <div class="btn dec"></div>
      </div>
      <div class="score">
        <p class="value"></p>
      </div>
    </div>`;
  }
}

customElements.define("score-result", ScoreResult);
