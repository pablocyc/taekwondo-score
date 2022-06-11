import "./Score-Result.js";

class PlayerName extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.name = this.getAttribute("team");
  }

  static get styles() {
    return /* css */`
      :host {
        flex: auto;
        margin: 2rem;
      }

      .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: var(--flex-content);
      }

      .title {
        display: flex;
        width: 100%;
        height: 50px;
        background-color: var(--bg-title-color);
        border: 6px solid var(--border-title-color);
        color: var(--text-color);
        padding: 0 25px;
        border-radius: 8px;
        justify-content: var(--flex-content);
        align-items: center;
      }
      
      h1 {
        margin: 0;
      }

      .fails {
        display: flex;
        margin: 1.5rem 0;
        height: 36px;
      }

      .fail {
        display: inline-block;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: var(--fail-color);
        border: 5px solid #000;
        box-sizing: border-box;
        margin-right: 1rem;
      }

      .line {
        width: 100%;
        height: 3px;
        background-color: #000;
      }

      .total-fail {
        font-family: "Road Rage";
        font-size: 10rem;
        margin: 0;
        color: var(--fail-color);
        -webkit-text-stroke: 1px #000;
        order: var(--order);
      }
    `;
  }

  connectedCallback() {
    this.fail = 0;
    this.render();
    this.fails = this.shadowRoot.querySelector(".fails");
    this.totalFail = this.shadowRoot.querySelector(".total-fail");
  }

  setFailInc() {
    this.fail++;
    this.fails.innerHTML = this.getFail(this.fail);
    this.totalFail.innerHTML = this.fail;
  }

  setFailDec() {
    this.fail--;
    if (this.fail < 0) {
      this.fail = 0;
    }
    this.fails.innerHTML = this.getFail(this.fail);
    this.totalFail.innerHTML = this.fail;
  }

  resetScoreResult() {
    this.shadowRoot.querySelector("score-result").resetScore();
  }

  getFail(num) {
    return /* html */"<div class=\"fail\"></div>".repeat(num);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PlayerName.styles}</style>
    <div class="container">
      <h1 class="title">${this.name.toUpperCase()} PLAYER</h1>
      <div class="fails"></div>
      <div class="line"></div>
      <p class="total-fail"></p>
      <score-result></score-result>
    </div>`;
  }
}

customElements.define("player-name", PlayerName);
