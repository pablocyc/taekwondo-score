const d=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}};d();class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.score=0,this.render(),this.init()}init(){this.buttons=this.shadowRoot.querySelector(".buttons"),this.value=this.shadowRoot.querySelector(".value"),this.buttons.addEventListener("click",t=>{t.target.classList.contains("inc")?this.value.innerHTML=`${++this.score}`:t.target.classList.contains("dec")&&(this.score=this.score-1,this.score<0&&(this.score=0),this.value.innerHTML=this.score)}),this.value.addEventListener("dblclick",t=>{this.score=0,this.value.innerHTML=this.score})}render(){this.shadowRoot.innerHTML=`
    <style>${n.styles}</style>
    <div class="container">
      <div class="buttons">
        <div class="btn inc"></div>
        <div class="btn dec"></div>
      </div>
      <div class="score">
        <p class="value"></p>
      </div>
    </div>`}}customElements.define("score-result",n);class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.name=this.getAttribute("team")}static get styles(){return`
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
    `}connectedCallback(){this.fail=0,this.render(),this.fails=this.shadowRoot.querySelector(".fails"),this.totalFail=this.shadowRoot.querySelector(".total-fail")}setFailInc(){this.fail++,this.fails.innerHTML=this.getFail(this.fail),this.totalFail.innerHTML=this.fail}setFailDec(){this.fail--,this.fail<0&&(this.fail=0),this.fails.innerHTML=this.getFail(this.fail),this.totalFail.innerHTML=this.fail}getFail(t){return'<div class="fail"></div>'.repeat(t)}render(){this.shadowRoot.innerHTML=`
    <style>${a.styles}</style>
    <div class="container">
      <h1 class="title">${this.name.toUpperCase()} PLAYER</h1>
      <div class="fails"></div>
      <div class="line"></div>
      <p class="total-fail"></p>
      <score-result></score-result>
    </div>`}}customElements.define("player-name",a);class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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

      .stop {
        background-color: #fff;
        color: #000;
      }
    `}connectedCallback(){this.nIntervId=null,this.render(),this.clock=this.shadowRoot.querySelector(".timer"),this.buttons=this.shadowRoot.querySelector(".buttons"),this.init()}init(){this.buttons.addEventListener("click",t=>{const o=parseInt(this.clock.value.substring(0,2)),r=parseInt(this.clock.value.substring(3,5));t.target.className==="button start"?this.startTimer(o,r):t.target.className==="button stop"&&(clearInterval(this.interval),this.nIntervId=null)})}startTimer(t,o){let r=t*60+o;this.nIntervId||(this.interval=setInterval(()=>{r--,r===0&&(clearInterval(this.interval),this.nIntervId=null);let e=Math.floor(r/60),i=r%60;e=e<10?"0"+e:e,i=i<10?"0"+i:i,this.clock.value=`${e}:${i}`},1e3))}render(){this.shadowRoot.innerHTML=`
    <style>${l.styles}</style>
    <div class="container">
      <div class="title">
        <h1>ROUND</h1>
        <input type="number" min="1" value="1" class="round">
      </div>
      <input type="time" min="15:00" max="23:00" value="05:00" class="timer">
      <div class="buttons">
        <button class="button stop">STOP</button>
        <button class="button start">START</button>
      </div>
    </div>`}}customElements.define("timer-round",l);class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render(),this.init()}init(){this.playerName=this.shadowRoot.querySelectorAll("player-name"),this.buttons=this.shadowRoot.querySelector(".main"),this.buttons.addEventListener("click",t=>{t.path[1].classList[1]==="blue"&&this.updateFail(t.target.className,0),t.path[1].classList[1]==="red"&&this.updateFail(t.target.className,1)})}updateFail(t,o){t==="inc"?this.playerName[o].setFailInc():this.playerName[o].setFailDec()}render(){this.shadowRoot.innerHTML=`
    <style>${c.styles}</style>
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
    </div>`}}customElements.define("board-score",c);
