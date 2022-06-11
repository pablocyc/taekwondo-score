import "./Player-Name.js";
import "./Timer-Round.js";

class BoardScore extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  handleEvent(e) {
    if (e.type === "reset") {
      this.playerName[0].resetScoreResult();
      this.playerName[1].resetScoreResult();
    }
  }

  static get styles() {
    return /* css */`
      :host {
        
      }

      .header {
        display: flex;
      }

      player-name {
        width: 50%;
      }

      .main {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5rem;
      }

      .buttons {
        display: flex;
        flex-direction: column;
        margin-top: 10rem;
      }

      button {
        width: 160px;
        font-family: aight;
        font-size: 4rem;
        background-color: #423e3e;
        color: #fff;
        border: 5px solid #000;
        border-radius: 8px;
        cursor: pointer;
        user-select: none;
      }

      .inc {
        background-color: var(--fail-color);
        color: #000;
        margin-bottom: 8rem;
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener("reset", this);
    this.init();
  }

  init() {
    this.playerName = this.shadowRoot.querySelectorAll("player-name");
    this.buttons = this.shadowRoot.querySelector(".main");
    this.buttons.addEventListener("click", e => {
      if (e.path[1].classList[1] === "blue") {
        console.log(e.target.className);
        this.updateFail(e.target.className, 0);
      }
      if (e.path[1].classList[1] === "red") {
        this.updateFail(e.target.className, 1);
      }
    });
  }

  updateFail(className, value) {
    if (className === "inc") {
      this.playerName[value].setFailInc();
    } else {
      this.playerName[value].setFailDec();
    }
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BoardScore.styles}</style>
    <div class="container">
      <div class="header">
        <player-name team="blue" style="--bg-title-color: #7378ef; --border-title-color: #1a22e5;--flex-content: flex-start;"></player-name>
        <player-name team="red" style="--bg-title-color: #e96a6a; --border-title-color: #de2121; --flex-content: flex-end; --order:1;"></player-name>
      </div>
      <div class="main">
        <div class="buttons blue">
          <button class="inc">+1</button>
          <button class="dec">-1</button>
        </div>
        <timer-round></timer-round>
        <div class="buttons red">
          <button class="inc">+1</button>
          <button class="dec">-1</button>
        </div>
      </div>
    </div>`;
  }
}

customElements.define("board-score", BoardScore);
