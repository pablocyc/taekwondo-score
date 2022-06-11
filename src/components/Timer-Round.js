class TimerRound extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        width: 50%;
        margin-bottom: auto;
      }

      .container {
        display: flex;
        flex-direction: column;
        font-family: "Road Rage";
      }

      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #514e4ecc;
        font-size: 5rem;
      }

      h1 {
        margin: 0;
      }

      .round {
        cursor: pointer;
        margin-left: 1rem;
        color: #000;
        font-family: "Road Rage";
        width: 120px;
        font-size: 10rem;
        border: none;
        background-color: inherit;
      }

      .timer {
        cursor: pointer;
        margin: 0 auto;
        color: #000;
        font-family: "Road Rage";
        font-size: 10rem;
        background-color: inherit;
        border: none;
        margin-top: 3rem;
      }

      input[type=time]::-webkit-datetime-edit-ampm-field {
        display: none;
      }

      .buttons {
        margin: 0 auto;
      }

      .button {
        cursor: pointer;
        margin-top: 5rem;
        width: 280px;
        height: 97px;
        font-family: aight;
        font-size: 4rem;
        background-color: var(--start-color);
        color: #fff;
        border: 8px solid #000;
        border-radius: 16px;
      }

      .stop,
      .reset {
        background-color: #fff;
        color: #000;
      }
    `;
  }

  connectedCallback() {
    this.nIntervId = null;
    this.render();
    this.clock = this.shadowRoot.querySelector(".timer");
    this.buttons = this.shadowRoot.querySelector(".buttons");
    this.init();
  }

  init() {
    this.buttons.addEventListener("click", (e) => {
      const minute = parseInt(this.clock.value.substring(0, 2));
      const second = parseInt(this.clock.value.substring(3, 5));
      if (e.target.className === "button start") {
        this.startTimer(minute, second);
      } else if (e.target.className === "button stop") {
        clearInterval(this.interval);
        this.nIntervId = null;
      } else if (e.target.className === "button reset") {
        clearInterval(this.interval);
        this.nIntervId = null;
        const ResetEvent = new CustomEvent("reset", {
          detail: { value: 0 },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(ResetEvent);
      }
    });
  }

  startTimer(minute, second) {
    let time = (minute * 60) + second;
    if (!this.nIntervId) {
      this.interval = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(this.interval);
          this.nIntervId = null;
        }
        let min = Math.floor(time / 60);
        let sec = time % 60;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        this.clock.value = `${min}:${sec}`;
      }, 1000);
    }
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${TimerRound.styles}</style>
    <div class="container">
      <div class="title">
        <h1>ROUND</h1>
        <input type="number" min="1" value="1" class="round">
      </div>
      <input type="time" min="15:00" max="23:00" value="05:00" class="timer">
      <div class="buttons">
        <button class="button stop">STOP</button>
        <button class="button start">START</button>
        <button class="button reset">RESET</button>
      </div>
    </div>`;
  }
}

customElements.define("timer-round", TimerRound);
