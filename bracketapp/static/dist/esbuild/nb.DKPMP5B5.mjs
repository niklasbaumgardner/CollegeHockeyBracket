import{d as t,h as be,j as we,k as y}from"./chunk-XGX4NMMB.mjs";import{a as fe,b as ke,c as ve,d as u}from"./chunk-NB5LNMQ2.mjs";import{a as d,b as Te,d as _e,e as $e,f as ye}from"./chunk-W5JEVNJA.mjs";function Ce(s,e){return()=>s.querySelector(e)}function xe(s,e){return()=>s.querySelectorAll(e)}var i=class extends we{constructor(){super();let{queries:e}=this.constructor;if(e)for(let[a,r]of Object.entries(e))r.all?Object.defineProperty(this,a,{get:xe(this,r.all)}):Object.defineProperty(this,a,{get:Ce(this,r)})}createRenderRoot(){return this}};var E=class extends i{render(){return t`<wa-card
      ><form method="POST">
        <div class="wa-stack">
          <wa-input
            name="team"
            label="New team name"
            type="text"
            placeholder="Michigan St."
            required
          ></wa-input>
          <wa-button variant="brand" type="submit">Add team</wa-button>
        </div>
      </form></wa-card
    >`}};customElements.define("nb-add-team",E);var C=class extends i{render(){return t`<wa-card>
      <div class="wa-stack">
        <wa-button variant="brand" href=${UPDATE_ALL_POINTS_URL}
          >Update all points</wa-button
        >
        <wa-button appearance="outlined" href=${CORRECT_BRACKET_PAGE}
          >Go to correct bracket page</wa-button
        >
        <wa-button appearance="outlined" href=${ADD_TEAM_PAGE}
          >Go to add team page</wa-button
        >
        <wa-button appearance="outlined" href=${DEFAULT_BRACKET_PAGE}
          >Go to default bracket page</wa-button
        >
      </div>
    </wa-card>`}};customElements.define("nb-admin",C);var x=class extends i{static properties={archivedYears:{type:Array}};imgTemplate(e){return e?t`<img
      class="w-[75px] h-[75px]"
      src=${e.team.icon_path}
      alt=${e.team.name}
    />`:null}yearsTemplate(){return this.archivedYears.map(e=>t`<wa-card class="w-full"
          ><a
            class="clickable-card p-(--wa-space-l)"
            href=${e.archive_url}
            ><div class="wa-stack">
              <div class="wa-cluster">
                ${this.imgTemplate(e.winner_team)}
                <h3>${e.year}</h3>
              </div>
              <h3>${e.winner_team.team.name}</h3>
            </div></a
          ></wa-card
        >`)}render(){return t`<wa-card>
      <div class="wa-stack">
        <h2>Archive</h2>
        <div
          class_="archive-grid"
          class="grid gap-(--wa-space-l) grid-cols-[auto] md:grid-cols-[auto_auto] lg:grid-cols-[auto_auto_auto]"
        >
          ${this.yearsTemplate()}
        </div>
      </div>
    </wa-card>`}};customElements.define("nb-archive-years",x);var B=class extends i{static properties={href:{type:String}};connectedCallback(){if(super.connectedCallback(),document.referrer){let e=new URL(document.referrer),a=new URL(document.URL);e.origin===a.origin&&(this.href=localStorage.getItem("nb-bracket-back")??document.referrer)}this.href||this.remove(),window.addEventListener("beforeunload",this)}handleEvent(e){e.type==="beforeunload"&&localStorage.setItem("nb-bracket-back",location.href)}render(){return t`<wa-button
      href=${this.href}
      id="back-button"
      variant="brand"
      appearance="outlined"
    >
      <wa-icon library="ion" name="chevron-back-outline"></wa-icon>
      Back</wa-button
    >`}};customElements.define("nb-back-button",B);var S=class extends i{static properties={message:{type:String},category:{type:String}};connectedCallback(){super.connectedCallback(),this.removeSelfTask=new d(()=>this.removeSelf(),5e3,{finalizeBeforeUnload:!0}),this.removeSelfTask.arm()}removeSelf(){this.remove()}render(){return t`<wa-callout variant=${this.category}>
      ${this.message}
      <wa-button
        class="icon-button"
        appearance="plain"
        @click=${this.removeSelf}
        ><wa-icon
          label="Remove"
          name="system/close-large-line"
          library="remix"
        ></wa-icon
      ></wa-button>
    </wa-callout>`}};customElements.define("nb-alert",S);var R=class extends i{static properties={messages:{type:Array,converter:(e,a)=>!e||!e.length||e==="[]"?[]:[...e.match(/(?<=\()[^()]+(?=\))/g)].map(r=>r.replaceAll("'","").split(", "))}};render(){return this.messages.length?t`<div id="alerts" class="wa-stack items-center">
      ${this.messages.map(([e,...a])=>t`<nb-alert
            category=${e}
            message=${a.join(", ")}
          ></nb-alert>`)}
    </div>`:null}};customElements.define("nb-alert-manager",R);var N=class extends i{static properties={theme:{type:Object}};static queries={dropdown:"wa-dropdown",icon:"#icon",themeItems:{all:"wa-dropdown-item"}};get currentThemeIcon(){return this.theme?.mode==="dark"?this.darkIcon:this.lightIcon}connectedCallback(){super.connectedCallback(),this.init()}async init(){await this.updateComplete,this.theme=THEME,this.setupThemeWatcher()}setupThemeWatcher(){this.mutationObserver=new MutationObserver(e=>this.handleThemeChange(e)),this.mutationObserver.observe(document.documentElement,{attributes:!0}),this.handleThemeChange()}handleThemeChange(){for(let e of this.themeItems)e.checked=e.id===this.theme.mode;this.icon.name=this.getThemeIconName(),window.localStorage.setItem("theme.mode",this.theme.mode)}setTheme(e){this.theme.mode=e;for(let a of this.themeItems)a.checked=a.id===this.theme.mode;this.icon.name=this.getThemeIconName(),console.log("setting theme mode",this.theme.mode)}handleThemeSelect(e){let a=e.detail.item;this.setTheme(a.value)}getThemeIconName(){return this.theme?.mode==="dark"?"moon-outline":"sunny-outline"}render(){return t`<wa-dropdown @wa-select=${this.handleThemeSelect}>
      <wa-button
        id="theme-button"
        variant="brand"
        appearance="plain"
        slot="trigger"
        with-caret
      >
        <wa-icon
          slot="start"
          id="icon"
          library="ion"
          name="${this.getThemeIconName()}"
        ></wa-icon>
      </wa-button>

      <wa-dropdown-item id="light" type="checkbox" value="light"
        >Light</wa-dropdown-item
      >
      <wa-dropdown-item id="dark" type="checkbox" value="dark"
        >Dark</wa-dropdown-item
      >
    </wa-dropdown>`}};customElements.define("nb-theme-selector",N);var v=new Date("2025-03-27T18:00:00.000Z"),I=class extends i{static properties={bracketsOpen:Boolean};get countdown(){let e=v-Date.now(),a=e/1e3,r=new Date(e),n=Math.floor(a/(3600*24)),l=r.toISOString().substring(11,13),m=r.toISOString().substring(14,16),k=r.toISOString().substring(17,19);return{days:n,hours:l,mins:m,secs:k}}connectedCallback(){super.connectedCallback(),!this.maybeDestroy()&&(this.intervalID=setInterval(()=>{this.maybeRequestUpdate()},1e3))}maybeRequestUpdate(){this.maybeDestroy()||this.requestUpdate()}destroy(){clearInterval(this.intervalID),this.remove()}maybeDestroy(){let e=v-Date.now();return!CAN_EDIT_BRACKET||e<0?(this.destroy(),!0):!1}timeCardTemplate(e,a){return t`<wa-card
      class="width-fit-content"
      style="--wa-panel-background-color:var(--wa-color-danger-300); --border-color:var(--wa-color-danger-300); --padding:var(--wa-spacing-x-small); --border-radius:var(--wa-border-radius-large);"
      ><div class="d-flex flex-column align-items-center">
        <h5>${e}</h5>
        <span>${a+(e==1?"":"s")}</span>
      </div></wa-card
    >`}countdownTemplate(){let{days:e,hours:a,mins:r,secs:n}=this.countdown;return t`<div class="d-flex gap-2">
      ${[[e,"day"],[a,"hour"],[r,"minute"],[n,"second"]].map(l=>this.timeCardTemplate(...l))}
    </div>`}render(){return t`<wa-card
      style="--wa-panel-background-color:var(--wa-color-danger-50);"
      ><div class="d-flex flex-column align-items-center">
        <h6>
          Brackets will close on
          <wa-format-date
            date=${v}
            month="long"
            day="numeric"
          ></wa-format-date>
          at
          <wa-format-date
            date=${v}
            hour="numeric"
            minute="numeric"
          ></wa-format-date>
        </h6>
        ${this.countdownTemplate()}
      </div></wa-card
    >`}};customElements.define("nb-countdown",I);var g=class extends i{static properties={winnerTop:{type:Object},winnerBottom:{type:Object},winner_id:{type:String},game:{type:String},teams:{type:Object}};static queries={topInputEl:"#top > input",bottomInputEl:"#bottom > input"};get winnerTopName(){let e=this.winnerTop;return this.teamTemplate(e)}get winnerBottomName(){let e=this.winnerBottom;return this.teamTemplate(e)}teamTemplate(e){return e?.team?`${e.rank} ${e.team.name}`:""}getImageElement(e){return e?.team?t`<img
      class="team-img"
      src="${e.team.icon_path}"
      alt="${e.team.name}"
    />`:null}topInput(){return t`<input
      type="radio"
      id="${this.game}top"
      name="${this.game}"
      value="${this.winnerTop?.id}"
      required=""
      ?checked="${!!(this.winnerTop&&this.winner_id&&this.winner_id===this.winnerTop.id)}"
    />`}bottomInput(){return t`<input
      type="radio"
      id="${this.game}bottom"
      name="${this.game}"
      value="${this.winnerBottom?.id}"
      required=""
      ?checked=${!!(this.winnerBottom&&this.winner_id&&this.winner_id===this.winnerBottom.id)}
    />`}render(){return t`<wa-card class="matchup default-bg default-border">
      <label class="nb-team" id="top">
        ${this.topInput()} ${this.getImageElement(this.winnerTop)}
        <span>${this.winnerTopName}</span>
      </label>
      <label class="nb-team" id="bottom">
        ${this.bottomInput()} ${this.getImageElement(this.winnerBottom)}
        <span>${this.winnerBottomName}</span>
      </label>
    </wa-card>`}};customElements.define("nb-edit-matchup",g);var G=class extends i{static properties={default:{type:Object},teams:{type:Array}};teamOptions(e,a){let r=this.teams.map(n=>t`<option
          value=${n.id}
          ?selected=${this.default.games[`game${e}`][a]?.team.id===n.id}
        >
          ${n.name}
        </option>`);return r.unshift(t`<option value="">-- Please choose and option --</option>`),r}gameTemplate(e){return t`<wa-card
      ><div slot="header" class="wa-split">
        <label>Game ${e}</label
        ><label
          >Id:
          <input
            name="game${e}-id"
            type="text"
            value=${this.default.games?.[`game${e}`].id}
        /></label>
      </div>
      <div class="wa-stack">
        <label>Game ${e} top team</label>
        <div class="wa-split">
          <input
            value=${e%2===1?1:2}
            name="game${e}-top-team-rank"
          />
          <select name="game${e}-top-team-id" class="grow">
            ${this.teamOptions(e,"top_team")}
          </select>
        </div>
        <input
          type="text"
          value=${this.default.games?.[`game${e}`].top_team_id}
          name="game${e}-top-bracket-team-id"
        />
        <wa-divider></wa-divider>
        <label>Game ${e} bottom team</label>
        <div class="wa-split">
          <input
            value=${e%2===1?4:3}
            name="game${e}-bottom-team-rank"
          />
          <select name="game${e}-bottom-team-id" class="grow">
            ${this.teamOptions(e,"bottom_team")}
          </select>
        </div>
        <input
          type="text"
          value=${this.default.games?.[`game${e}`].bottom_team_id}
          name="game${e}-bottom-bracket-team-id"
        /></div
    ></wa-card>`}gamesTemplate(e){return e.map(a=>this.gameTemplate(a))}render(){return t`<form action=${this.default.update_url} method="POST">
      <div class="wa-stack">
        <h2>${this.default.year} default bracket</h2>
        <div class="wa-split">
          <div class="wa-stack">${this.gamesTemplate([1,2,3,4])}</div>
          <div class="wa-stack">${this.gamesTemplate([5,6,7,8])}</div>
        </div>
        <wa-button class="w-full" variant="brand" type="submit"
          >Update bracket</wa-button
        >
      </div>
    </form>`}};customElements.define("nb-default-bracket",G);var b=class extends i{matchupTagName="nb-edit-matchup";static properties={bracket:{type:Object},default:{type:Object},type:{type:String}};static queries={formEl:"form",nbEditMatchupEls:{all:"nb-edit-matchup"},saveButtonEl:"#save-button"};get teams(){if(this._teams)return this._teams;let e={};for(let a of Object.values(this.default.games)){let r=a.top_team,n=a.bottom_team;e[r.id]=r,e[n.id]=n}return this._teams=e}async getUpdateComplete(){await super.getUpdateComplete();for(let e of this.nbEditMatchupEls)await e.updateComplete}async firstUpdated(){super.firstUpdated(),await this.updateComplete,this.initialFormData=new FormData(this.formEl),this.maybeToggleSaveButton()}getNextMatchup(e){let a="null";switch(e){case"game1top":case"game1bottom":case"game2top":case"game2bottom":a="game9";break;case"game3top":case"game3bottom":case"game4top":case"game4bottom":a="game10";break;case"game5top":case"game5bottom":case"game6top":case"game6bottom":a="game11";break;case"game7top":case"game7bottom":case"game8top":case"game8bottom":a="game12";break;case"game9top":case"game9bottom":case"game10top":case"game10bottom":a="game13";break;case"game11top":case"game11bottom":case"game12top":case"game12bottom":a="game14";break;case"game13top":case"game13bottom":case"game14top":case"game14bottom":a="game15";break}return this.querySelector(`#${a}`)}getImageUrl(e){if(!e)return"";let a=e.substring(2);return a=a.replaceAll(" ",""),a=a.replaceAll(".",""),`/static/images/${a}.svg`}matchupTemplate(e){return t`<nb-edit-matchup
      id=${e.game}
      game=${e.game}
      type="${e.type}"
      winner_id=${e.winner_id}
      .winnerTop=${e.winnerTop}
      .winnerBottom=${e.winnerBottom}
    ></nb-edit-matchup>`}roundOneLeftTemplate(){return t`<div class="round-one">
      ${this.matchupTemplate({game:"game1",type:"default-edit",default:this.default.games.game1,winnerTop:this.default.games.game1.top_team,winnerBottom:this.default.games.game1.bottom_team,winner_id:this.bracket.games.game1?.winner_id})}
      ${this.matchupTemplate({game:"game2",type:"default-edit",default:this.default.games.game2,winnerTop:this.default.games.game2.top_team,winnerBottom:this.default.games.game2.bottom_team,winner_id:this.bracket.games.game2?.winner_id})}
      ${this.matchupTemplate({game:"game3",type:"default-edit",default:this.default.games.game3,winnerTop:this.default.games.game3.top_team,winnerBottom:this.default.games.game3.bottom_team,winner_id:this.bracket.games.game3?.winner_id})}
      ${this.matchupTemplate({game:"game4",type:"default-edit",default:this.default.games.game4,winnerTop:this.default.games.game4.top_team,winnerBottom:this.default.games.game4.bottom_team,winner_id:this.bracket.games.game4?.winner_id})}
    </div>`}roundTwoLeftTemplate(){return t`<div class="round-two">
      ${this.matchupTemplate({game:"game9",type:"edit",winnerTop:this.bracket.games.game1?.winner_team,winnerBottom:this.bracket.games.game2?.winner_team,winner_id:this.bracket.games.game9?.winner_id})}
      ${this.matchupTemplate({game:"game10",type:"edit",winnerTop:this.bracket.games.game3?.winner_team,winnerBottom:this.bracket.games.game4?.winner_team,winner_id:this.bracket.games.game10?.winner_id})}
    </div>`}roundThreeLeftTemplate(){return t`<div class="round-three">
      ${this.matchupTemplate({game:"game13",type:"edit",winnerTop:this.bracket.games.game9?.winner_team,winnerBottom:this.bracket.games.game10?.winner_team,winner_id:this.bracket.games.game13?.winner_id})}
    </div>`}predictedScoreTemplate(){return t`<div class="wa-stack">
      <p class="text-center">Final Game Score</p>
      <div class="flex justify-center items-center gap-(--wa-space-m)">
        <wa-input
          class="goals"
          name="winner_goals"
          type="number"
          min="0"
          max="99"
          step="1"
          required=""
          value=${this.bracket.winner_goals}
        ></wa-input>
        <span>-</span>
        <wa-input
          class="goals"
          name="loser_goals"
          type="number"
          min="0"
          max="99"
          step="1"
          required=""
          value=${this.bracket.loser_goals}
        ></wa-input>
      </div>
    </div>`}championTemplate(){return t`<div class="round-final my-auto">
      <wa-card>
        <div class="wa-stack">
          <p class="text-center">National Champion</p>
          ${this.matchupTemplate({game:"game15",type:"edit",winnerTop:this.bracket.games.game13?.winner_team,winnerBottom:this.bracket.games.game14?.winner_team,winner_id:this.bracket.games.game15?.winner_id})}
          ${this.predictedScoreTemplate()}
        </div>
      </wa-card>
    </div>`}roundThreeRightTemplate(){return t`<div class="round-three">
      ${this.matchupTemplate({game:"game14",type:"edit",winnerTop:this.bracket.games.game11?.winner_team,winnerBottom:this.bracket.games.game12?.winner_team,winner_id:this.bracket.games.game14?.winner_id})}
    </div>`}roundTwoRightTemplate(){return t`<div class="round-two">
      ${this.matchupTemplate({game:"game11",type:"edit",winnerTop:this.bracket.games.game5?.winner_team,winnerBottom:this.bracket.games.game6?.winner_team,winner_id:this.bracket.games.game11?.winner_id})}
      ${this.matchupTemplate({game:"game12",type:"edit",winnerTop:this.bracket.games.game7?.winner_team,winnerBottom:this.bracket.games.game8?.winner_team,winner_id:this.bracket.games.game12?.winner_id})}
    </div>`}roundOneRightTemplate(){return t`<div class="round-one">
      ${this.matchupTemplate({game:"game5",type:"default-edit",default:this.default.games.game5,winnerTop:this.default.games.game5.top_team,winnerBottom:this.default.games.game5.bottom_team,winner_id:this.bracket.games.game5?.winner_id})}
      ${this.matchupTemplate({game:"game6",type:"default-edit",default:this.default.games.game6,winnerTop:this.default.games.game6.top_team,winnerBottom:this.default.games.game6.bottom_team,winner_id:this.bracket.games.game6?.winner_id})}
      ${this.matchupTemplate({game:"game7",type:"default-edit",default:this.default.games.game7,winnerTop:this.default.games.game7.top_team,winnerBottom:this.default.games.game7.bottom_team,winner_id:this.bracket.games.game7?.winner_id})}
      ${this.matchupTemplate({game:"game8",type:"default-edit",default:this.default.games.game8,winnerTop:this.default.games.game8.top_team,winnerBottom:this.default.games.game8.bottom_team,winner_id:this.bracket.games.game8?.winner_id})}
    </div>`}buttonsTemplate(){let e=t`<wa-button
      class="grow"
      id="save-button"
      variant="brand"
      type="submit"
      >Save bracket</wa-button
    >`;return t`<wa-button
        class="grow"
        appearance="outlined"
        href=${CANCEL_BRACKET_URL}
        >Cancel</wa-button
      >${e}`}setNext(e){let{id:a,value:r}=e,n=this.getNextMatchup(a);if(!n)return;let l=e.closest(this.matchupTagName);l.winner_id=e.value;let m=this.teams[r];if(a.match(/\d/g).join("")%2===1){n.winner_id===n.winnerTop?.id&&(n.winner_id="");let h=n.winnerTop;n.winnerTop=m,n.topInputEl.checked=!1,this.maybeClearInputs(n.id+"top",h)}else{n.winner_id===n.winnerBottom?.id&&(n.winner_id="");let h=n.winnerBottom;n.winnerBottom=m,n.bottomInputEl.checked=!1,this.maybeClearInputs(n.id+"bottom",h)}}maybeClearInputs(e,a){let r=this.getNextMatchup(e);if(!r)return;e.match(/\d/g).join("")%2===1?(a?.id===r.winnerTop?.id&&(r.winnerTop={},r.topInputEl.checked=!1),this.maybeClearInputs(r.id+"top",a)):(a?.id===r.winnerBottom?.id&&(r.winnerBottom={},r.bottomInputEl.checked=!1),this.maybeClearInputs(r.id+"bottom",a))}handleClick(e){let a=e.target;if(a instanceof HTMLInputElement){if(!a.value){e.preventDefault();return}this.setNext(a)}}async handleInput(){await this.updateComplete,this.maybeToggleSaveButton()}maybeToggleSaveButton(){let a=[...new FormData(this.formEl).entries()];if(a.length<18){this.saveButtonEl.disabled=!1;return}this.saveButtonEl.disabled=JSON.stringify([...this.initialFormData.entries()])===JSON.stringify(a)}resetForm(){this.formEl.reset()}topCardTemplate(){return t` <div class="flex justify-center">
      <wa-card>
        <div class="wa-stack">
          <h2>${this.bracket?.year} Bracket Challenge</h2>
          <div class="wa-stack gap-(--wa-space-3xs)">
            <p>
              To view current conference standings
              <a
                href="https://www.collegehockeynews.com/reports/standings.php"
                target="_blank"
                >click here</a
              >.
            </p>
            <p>
              To view current team stats
              <a href="https://www.collegehockeynews.com/stats/" target="_blank"
                >click here</a
              >.
            </p>
            <p>
              To view previous years brackets
              <a href="${ARCHIVE_URL}" target="_blank">click here</a>.
            </p>
          </div>

          <wa-input
            name="name"
            maxlength="60"
            label="Bracket name"
            placeholder="My bracket name"
            value=${this.bracket.name}
            class="w-full"
            required=""
          ></wa-input>

          <div class="wa-cluster">${this.buttonsTemplate()}</div>
        </div>
      </wa-card>
    </div>`}render(){return t`<div class="w-full">
      <form
        action=${this.bracket.form_url+location.search}
        method="POST"
        @input=${this.handleInput}
      >
        <input name="old_name" value=${this.bracket.name} hidden />
        <div class="wa-stack">
          ${this.topCardTemplate()}
          <div class="bracket-grid-edit" @click=${this.handleClick}>
            <div class="round-one-left">
              <wa-card class="round-details">Round 1</wa-card>
              ${this.roundOneLeftTemplate()}
            </div>

            <div class="round-two-left">
              <wa-card class="round-details">Round 2</wa-card>
              ${this.roundTwoLeftTemplate()}
            </div>

            <div class="round-three-left">
              <wa-card class="round-details">Round 3</wa-card>
              ${this.roundThreeLeftTemplate()}
            </div>

            ${this.championTemplate()}

            <div class="round-three-right">
              <wa-card class="round-details">Round 3</wa-card>
              ${this.roundThreeRightTemplate()}
            </div>

            <div class="round-two-right">
              <wa-card class="round-details">Round 2</wa-card>
              ${this.roundTwoRightTemplate()}
            </div>

            <div class="round-one-right round-one">
              <wa-card class="round-details">Round 1</wa-card>
              ${this.roundOneRightTemplate()}
            </div>
          </div>
        </div>
      </form>
    </div>`}};customElements.define("nb-edit-bracket",b);var O=class s extends g{static properties={topTeamGoals:{type:Number,converter:s.goalConverter},bottomTeamGoals:{type:Number,converter:s.goalConverter}};static goalConverter(e,a){return e.length?Number(e):null}teamTemplate(e){return e?.team?e.team.name:""}topScoreInput(){return t`<input
      type="number"
      name="${this.game}-h_goals"
      value="${this.topTeamGoals>=0?this.topTeamGoals:null}"
    />`}bottomScoreInput(){return t`<input
      type="number"
      name="${this.game}-a_goals"
      value="${this.bottomTeamGoals>=0?this.bottomTeamGoals:null}"
    />`}topInput(){return t`<input
      type="radio"
      id="${this.game}top"
      name="${this.game}"
      value="${this.winnerTop?.id}"
      ?checked="${!!(this.winnerTop&&this.winner_id&&this.winner_id===this.winnerTop.id)}"
    />`}bottomInput(){return t`<input
      type="radio"
      id="${this.game}bottom"
      name="${this.game}"
      value="${this.winnerBottom?.id}"
      ?checked=${!!(this.winnerBottom&&this.winner_id&&this.winner_id===this.winnerBottom.id)}
    />`}render(){return t`<wa-card
      class="matchup"
      style="--padding: var(--wa-spacing-2x-small);"
    >
      <label class="nb-team" id="top">
        ${this.topInput()}<span>${this.winnerTopName}</span>
        ${this.topScoreInput()}
      </label>
      <label class="nb-team" id="bottom">
        ${this.bottomInput()}<span>${this.winnerBottomName}</span>
        ${this.bottomScoreInput()}
      </label>
    </wa-card>`}};customElements.define("nb-edit-correct-matchup",O);var P=class extends b{matchupTagName="nb-edit-correct-matchup";maybeToggleSaveButton(){}matchupTemplate(e){return t`<nb-edit-correct-matchup
      id=${e.game}
      .teams=${this.default.teams}
      game=${e.game}
      type="${e.type}"
      winner_id=${e.winner_id}
      .winnerTop=${e.winnerTop}
      .winnerBottom=${e.winnerBottom}
      topTeamGoals=${e.topTeamGoals}
      bottomTeamGoals=${e.bottomTeamGoals}
    ></nb-edit-correct-matchup>`}roundOneLeftTemplate(){return t`<div class="round-one">
      ${this.matchupTemplate({game:"game1",type:"default-edit",default:this.default.games.game1,winnerTop:this.default.games.game1.top_team,winnerBottom:this.default.games.game1.bottom_team,winner_id:this.bracket?.games?.game1.winner_id,topTeamGoals:this.bracket?.games?.game1.top_team_goals,bottomTeamGoals:this.bracket?.games?.game1.bottom_team_goals})}
      ${this.matchupTemplate({game:"game2",type:"default-edit",default:this.default.games.game2,winnerTop:this.default.games.game2.top_team,winnerBottom:this.default.games.game2.bottom_team,winner_id:this.bracket?.games?.game2.winner_id,topTeamGoals:this.bracket?.games?.game2.top_team_goals,bottomTeamGoals:this.bracket?.games?.game2.bottom_team_goals})}
      ${this.matchupTemplate({game:"game3",type:"default-edit",default:this.default.games.game3,winnerTop:this.default.games.game3.top_team,winnerBottom:this.default.games.game3.bottom_team,winner_id:this.bracket?.games?.game3.winner_id,topTeamGoals:this.bracket?.games?.game3.top_team_goals,bottomTeamGoals:this.bracket?.games?.game3.bottom_team_goals})}
      ${this.matchupTemplate({game:"game4",type:"default-edit",default:this.default.games.game4,winnerTop:this.default.games.game4.top_team,winnerBottom:this.default.games.game4.bottom_team,winner_id:this.bracket?.games?.game4.winner_id,topTeamGoals:this.bracket?.games?.game4.top_team_goals,bottomTeamGoals:this.bracket?.games?.game4.bottom_team_goals})}
    </div>`}roundTwoLeftTemplate(){return t`<div class="round-two">
      ${this.matchupTemplate({game:"game9",type:"edit",winnerTop:this.bracket?.games?.game1.winner_team,winnerBottom:this.bracket?.games?.game2.winner_team,winner_id:this.bracket?.games?.game9.winner_id,topTeamGoals:this.bracket?.games?.game9.top_team_goals,bottomTeamGoals:this.bracket?.games?.game9.bottom_team_goals})}
      ${this.matchupTemplate({game:"game10",type:"edit",winnerTop:this.bracket?.games?.game3.winner_team,winnerBottom:this.bracket?.games?.game4.winner_team,winner_id:this.bracket?.games?.game10.winner_id,topTeamGoals:this.bracket?.games?.game10.top_team_goals,bottomTeamGoals:this.bracket?.games?.game10.bottom_team_goals})}
    </div>`}roundThreeLeftTemplate(){return t`<div class="round-three">
      ${this.matchupTemplate({game:"game13",type:"edit",winnerTop:this.bracket?.games?.game9.winner_team,winnerBottom:this.bracket?.games?.game10.winner_team,winner_id:this.bracket?.games?.game13.winner_id,topTeamGoals:this.bracket?.games?.game13.top_team_goals,bottomTeamGoals:this.bracket?.games?.game13.bottom_team_goals})}
    </div>`}championTemplate(){return t`<div class="round-final my-auto">
      <wa-card>
        <div class="championship-grid">
          <p class="round-details champion-top m-0">National Champion</p>
          ${this.matchupTemplate({game:"game15",type:"edit",winnerTop:this.bracket?.games?.game13.winner_team,winnerBottom:this.bracket?.games?.game14.winner_team,winner_id:this.bracket?.games?.game15.winner_id,topTeamGoals:this.bracket?.games?.game15.top_team_goals,bottomTeamGoals:this.bracket?.games?.game15.bottom_team_goals})}
        </div>
      </wa-card>
    </div>`}roundThreeRightTemplate(){return t`<div class="round-three">
      ${this.matchupTemplate({game:"game14",type:"edit",winnerTop:this.bracket?.games?.game11.winner_team,winnerBottom:this.bracket?.games?.game12.winner_team,winner_id:this.bracket?.games?.game14.winner_id,topTeamGoals:this.bracket?.games?.game14.top_team_goals,bottomTeamGoals:this.bracket?.games?.game14.bottom_team_goals})}
    </div>`}roundTwoRightTemplate(){return t`<div class="round-two">
      ${this.matchupTemplate({game:"game11",type:"edit",winnerTop:this.bracket?.games?.game5.winner_team,winnerBottom:this.bracket?.games?.game6.winner_team,winner_id:this.bracket?.games?.game11.winner_id,topTeamGoals:this.bracket?.games?.game11.top_team_goals,bottomTeamGoals:this.bracket?.games?.game11.bottom_team_goals})}
      ${this.matchupTemplate({game:"game12",type:"edit",winnerTop:this.bracket?.games?.game7.winner_team,winnerBottom:this.bracket?.games?.game8.winner_team,winner_id:this.bracket?.games?.game12.winner_id,topTeamGoals:this.bracket?.games?.game12.top_team_goals,bottomTeamGoals:this.bracket?.games?.game12.bottom_team_goals})}
    </div>`}roundOneRightTemplate(){return t`<div class="round-one">
      ${this.matchupTemplate({game:"game5",type:"default-edit",default:this.default.games.game5,winnerTop:this.default.games.game5.top_team,winnerBottom:this.default.games.game5.bottom_team,winner_id:this.bracket?.games?.game5.winner_id,topTeamGoals:this.bracket?.games?.game5.top_team_goals,bottomTeamGoals:this.bracket?.games?.game5.bottom_team_goals})}
      ${this.matchupTemplate({game:"game6",type:"default-edit",default:this.default.games.game6,winnerTop:this.default.games.game6.top_team,winnerBottom:this.default.games.game6.bottom_team,winner_id:this.bracket?.games?.game6.winner_id,topTeamGoals:this.bracket?.games?.game6.top_team_goals,bottomTeamGoals:this.bracket?.games?.game6.bottom_team_goals})}
      ${this.matchupTemplate({game:"game7",type:"default-edit",default:this.default.games.game7,winnerTop:this.default.games.game7.top_team,winnerBottom:this.default.games.game7.bottom_team,winner_id:this.bracket?.games?.game7.winner_id,topTeamGoals:this.bracket?.games?.game7.top_team_goals,bottomTeamGoals:this.bracket?.games?.game7.bottom_team_goals})}
      ${this.matchupTemplate({game:"game8",type:"default-edit",default:this.default.games.game8,winnerTop:this.default.games.game8.top_team,winnerBottom:this.default.games.game8.bottom_team,winner_id:this.bracket?.games?.game8.winner_id,topTeamGoals:this.bracket?.games?.game8.top_team_goals,bottomTeamGoals:this.bracket?.games?.game8.bottom_team_goals})}
    </div>`}topCardTemplate(){return t` <div class="flex justify-center">
      <wa-card>
        <div class="wa-stack">
          <h2>${this.bracket?.name}</h2>
          <div class="wa-cluster">${this.buttonsTemplate()}</div>
        </div>
      </wa-card>
    </div>`}};customElements.define("nb-edit-correct-bracket",P);var j=class extends i{static properties={email:{type:String}};connectedCallback(){super.connectedCallback();let a=new URLSearchParams(window.location.search).get("next");a&&window.localStorage.setItem("next",a)}nativeTemplate(){return t`<wa-card>
      <form id="login-form" action="${LOGIN_URL}" method="POST"></form>
      <div class="wa-stack">
        <h2>Login</h2>

        <label
          >Email *
          <input
            form="login-form"
            type="email"
            name="email"
            label="Email"
            placeholder="Your email"
            maxlength="60"
            value=${y(this.email)}
            required
        /></label>

        <label
          >Password *
          <input
            form="login-form"
            type="password"
            name="password"
            label="Password"
            placeholder="Your password"
            required
        /></label>

        <small
          ><a href="${PASSWORD_RESET_REQUEST_URL}">Forgot password?</a></small
        >

        <wa-checkbox form="login-form" name="remember" value="True" checked
          >Remember me?</wa-checkbox
        >

        <div>
          <!-- This submit button is hidden so "Enter" will submit the form -->
          <button form="login-form" type="submit" hidden></button>
          <wa-button
            class="w-full"
            type="submit"
            variant="brand"
            form="login-form"
            >Login</wa-button
          >
        </div>

        <p>
          Don't have an account?
          <a href="${SIGNUP_URL}">Sign Up</a>
        </p>
      </div>
    </wa-card>`}waTmeplate(){return t`<wa-card>
      <form id="login-form" action="${LOGIN_URL}" method="POST"></form>
      <div class="wa-stack">
        <h2>Login</h2>

        <wa-input
          label="Email"
          form="login-form"
          type="email"
          name="email"
          label="Email"
          placeholder="Your email"
          maxlength="60"
          value=${y(this.email)}
          required
        ></wa-input>

        <wa-input
          label="Password"
          form="login-form"
          type="password"
          name="password"
          placeholder="Your password"
          required
        ></wa-input>

        <small
          ><a href="${PASSWORD_RESET_REQUEST_URL}">Forgot password?</a></small
        >

        <wa-checkbox form="login-form" name="remember" value="True" checked
          >Remember me?</wa-checkbox
        >

        <div>
          <!-- This submit button is hidden so "Enter" will submit the form -->
          <button form="login-form" type="submit" class="hidden!"></button>
          <wa-button
            class="w-full"
            type="submit"
            variant="brand"
            form="login-form"
            >Login</wa-button
          >
        </div>

        <p>
          Don't have an account?
          <a href="${SIGNUP_URL}">Sign Up</a>
        </p>
      </div>
    </wa-card>`}render(){return this.waTmeplate()}};customElements.define("nb-login",j);import Be from"https://cdn.jsdelivr.net/npm/profanity-cleaner@0.0.3/+esm";var T=class extends i{get currentColorScheme(){return(document.documentElement.classList.contains("wa-dark")?"dark":"light")==="dark"?ke:fe}get gridTheme(){let e=4*window.THEME.rounding,a=window.THEME.theme==="shoelace"?"var(--wa-color-neutral-20)":"var(--wa-color-neutral-10)";return ve.withPart(this.currentColorScheme).withParams({borderRadius:e,wrapperBorderRadius:e,borderWidth:1,headerRowBorder:!0,rowBorder:!0,backgroundColor:`light-dark(var(--wa-color-neutral-95), ${a})`,borderColor:"light-dark(var(--wa-color-neutral-90), var(--wa-color-neutral-30))",cellTextColor:"var(--wa-color-text-normal)",headerTextColor:"var(--wa-color-text-normal)",fontFamily:"inherit"})}get baseGridOptions(){return{defaultColDef:{resizable:!1},domLayout:"autoHeight",suppressCellFocus:!0,suppressMovableColumns:!0,theme:this.gridTheme}}setupThemeWatcher(){this.mutationObserver=new MutationObserver(()=>{this.dataGrid?.setGridOption("theme",this.gridTheme)}),this.mutationObserver.observe(document.documentElement,{attributes:!0})}render(){return t`<div id="grid" style="--ag-grid-size: 4px;"></div>`}};var _=class extends i{static properties={bracket:{type:Object}};get bracketName(){return this.bracket.safeName??this.bracket.name}getImageElement(e){return e?t`<img
      class="standings-img"
      src="${e.team.icon_path}"
      alt="${e.team.name}"
    />`:null}groupsTemplate(){return null}clickableTemplate(){return t`<a
        class="block w-full h-full no-underline"
        href=${this.bracket.url}
        ><div class="flex gap-(--wa-space-xs)">
          ${this.getImageElement(this.bracket.winner_team)}
          <div class="name-cell">${this.nameTemplate()}</div>
        </div></a
      >
      ${this.groupsTemplate()}`}nameTemplate(){return t`<span class="standings-bracket-name underline"
        >${this.bracketName}</span
      ><span class="standings-username">${this.bracket.user.username}</span>`}safeTemplate(){return t`<div class="name-cell">
      <span class="standings-bracket-name">${this.bracketName}</span
      ><span class="standings-username">${this.bracket.user.username}</span>
    </div>`}render(){let e=null;return this.bracket.url&&this.bracket.winner_team?e=this.clickableTemplate():e=this.safeTemplate(),t`<div
      class="wa-stack pt-(--wa-space-2xs) pb-(--wa-space-xs) gap-(--wa-space-xs)"
    >
      ${e}
    </div>`}};customElements.define("nb-bracket-column",_);var A=class extends _{groupsTemplate(){return this.bracket.group_brackets.length?t`<nb-group-bracket-details
      size="small"
      .groupBrackets=${this.bracket.group_brackets}
    ></nb-group-bracket-details>`:null}nameTemplate(){return t`<span
      class="standings-bracket-name underline _text-(length:--wa-font-size-larger)"
      >${this.bracketName}</span
    >`}render(){return this.bracket.id===-1?t`<wa-button href="${NEW_BRACKET_LINK}" variant="brand"
        >Create new bracket</wa-button
      >`:super.render()}};customElements.define("nb-my-bracket-column",A);var c=class extends T{#e="agGridPaginationPageSize";static properties={brackets:{type:Object},year:{type:Number},headerName:{type:String}};constructor(){super(),this.headerName="Brackets",this.useSafeName=!0}static queries={standingsGridEl:"#standingsGrid"};get storedPageSize(){let e=parseInt(window.localStorage.getItem(this.#e));return isNaN(e)?25:e}get defaultBracketColumnWidth(){return 256}get gridOptions(){return{...super.baseGridOptions,rowHeight:50,autoSizeStrategy:{type:"fitGridWidth",columnLimits:[{colId:"rank",minWidth:65,maxWidth:65},{colId:"name",minWidth:this.defaultBracketColumnWidth,flex:1},{colId:"actions",minWidth:208},{colId:"points",minWidth:75,maxWidth:75},{colId:"max_points",minWidth:75,maxWidth:75},{colId:"round_one_points",minWidth:57,maxWidth:57},{colId:"round_two_points",minWidth:57,maxWidth:57},{colId:"round_three_points",minWidth:57,maxWidth:57},{colId:"round_four_points",minWidth:57,maxWidth:57}]},defaultColDef:{resizable:!1}}}cleanBracketNames(){for(let e of this.brackets)e.safeName=Be.clean(e.name,{keepFirstAndLastChar:!0})}sortBrackets(){this.brackets=this.brackets.sort((e,a)=>e.name.localeCompare(a.name)),CAN_EDIT_BRACKET&&CURRENT_YEAR===this.year||this.brackets.sort((e,a)=>e.rank-a.rank)}firstUpdated(){this.init()}async init(){await this.updateComplete,this.cleanBracketNames(),this.sortBrackets(),this.createDataGrid(),this.setupThemeWatcher()}getImageElement(e){return e?`<img
      class="standings-img"
      src="${e.team.icon_path}"
      alt="${e.team.name}"
    />`:null}createDataGrid(){if(!this.brackets.length)return;let e=[];e.push({field:"rank"},{field:"name",headerName:this.headerName,autoHeight:!0,valueGetter:r=>r.data.safeName,cellRenderer:r=>{let n=document.createElement("nb-bracket-column");return n.bracket=r.data,n;if(r.data.winner_team){let m=document.createElement("nb-bracket-column");return m.bracket=r.data,m}return`<div class="standings-row">
            <div class="name-cell">
              <span class="standings-bracket-name">${r.value}</span>
              <p class="standings-username"
                >${r.data.user.username}</p
              >
            </div>
          </div>`}},{field:"points"},{field:"max_points",headerName:"Max"}),(this.year<CURRENT_YEAR||!CAN_EDIT_BRACKET)&&e.push({field:"round_one_points",headerName:"R1"},{field:"round_two_points",headerName:"R2"},{field:"round_three_points",headerName:"R3"},{field:"round_four_points",headerName:"R4"});let a={columnDefs:e,rowData:this.brackets,...this.gridOptions,pagination:!0,paginationPageSize:this.storedPageSize,paginationPageSizeSelector:[25,50,75,100],onPaginationChanged:r=>this.handlePaginationChangedEvent(r)};this.dataGrid=u(this.standingsGridEl,a)}handlePaginationChangedEvent(e){e.newPageSize&&window.localStorage.setItem(this.#e,this.dataGrid.paginationGetPageSize())}render(){return this.brackets.length?t`<div id="standingsGrid" style="--ag-grid-size: 4px;"></div>`:t`<div class="flex justify-center">No brackets yet</div>`}};customElements.define("nb-standings-grid",c);var p=class extends i{static properties={brackets:{type:Object},winners:{type:Object},year:{type:Number}};get numWinners(){return this.winners.length}connectedCallback(){super.connectedCallback(),this.requestContent()}async requestContent(){let a=await(await fetch(LEADERBOARD_CONTENT_URL,{credentials:"include",mode:"no-cors"})).json(),{standings:r,winners:n,year:l}=a;this.brackets=r,this.winners=n,this.year=l}winnersTemplate(){let e="Winner"+(this.numWinners>1?"s":""),a=this.winners.flatMap(r=>[t`<b>${r.name}</b> <small>(${r.user.username})</small>`,t`, `]).slice(0,-1);return t`<wa-card
      ><div class="wa-stack gap-(--wa-space-s) justify-center items-center">
        <wa-icon
          style="color:var(--color-amber-50);font-size:var(--wa-font-size-3xl);"
          name="trophy"
          library="hero"
          variant="outline"
        ></wa-icon>
        <p>${e}</p>
        <p>${a}</p>
      </div></wa-card
    >`}titleTemplate(){return t`<div><h2>${this.year} Leaderboard</h2></div>`}messageTemplate(){return CAN_EDIT_BRACKET&&this.year===CURRENT_YEAR?t`<nb-countdown></nb-countdown>`:this.numWinners>0?this.winnersTemplate():this.brackets.length&&this.year===CURRENT_YEAR?"View the current standings below.":"View the final standings below."}bracketsTemplate(){return t`<nb-standings-grid
      year=${this.year}
      .brackets=${this.brackets}
    ></nb-standings-grid>`}render(){return this.year?t`<wa-card>
      <div class="wa-stack">
        ${this.titleTemplate()} ${this.messageTemplate()}
        ${this.bracketsTemplate()}
      </div>
    </wa-card>`:null}};customElements.define("nb-standings",p);var o=class extends i{inputEvent=!1;static queries={dialog:"wa-dialog"};show(){customElements.whenDefined("wa-dialog").then(()=>{this.updateComplete.then(()=>{this.dialog.updateComplete.then(()=>{this.dialog.open=!0})})})}hide(){this.dialog.open=!1}handleDialogShow(e){e.target===this.dialog&&this.querySelector("wa-input")?.focus()}handleWaHide(e){e.target===this.dialog&&e.explicitOriginalTarget.localName==="wa-option"&&e.preventDefault()}handleInput(){}lableTemplate(){return null}contentTemplate(){return null}footerTemplate(){return null}cancelButtonTemplate(){return t`<wa-button
      class="grow"
      data-dialog="close"
      variant="neutral"
      appearance="outlined"
      >Cancel</wa-button
    >`}render(){return t`<wa-dialog
      @input=${this.inputEvent?this.handleInput:be}
    >
      <div slot="label">${this.lableTemplate()}</div>
      ${this.contentTemplate()}
      <div class="wa-cluster w-full" slot="footer">
        ${this.footerTemplate()}
      </div>
    </wa-dialog>`}};var L=class extends o{static properties={bracket:{type:Object}};static queries={...o.queries,deleteButton:"#delete-button"};lableTemplate(){return t`Delete bracket named "${this.bracket.name}"?`}contentTemplate(){return t`<form
        id="delete-bracket-form"
        action=${this.bracket.delete_url}
        method="POST"
      ></form>
      <div class="wa-stack">
        <p>Are you sure you want to delete this bracket?</p>
        <strong>This action cannot be undone.</strong>
      </div>`}footerTemplate(){return t`${this.cancelButtonTemplate()}
      <wa-button
        class="grow"
        type="submit"
        form="delete-bracket-form"
        id="delete-button"
        variant="danger"
        >Delete bracket</wa-button
      >`}};customElements.define("nb-delete-bracket",L);var D=class extends c{sortBrackets(){for(let e of this.brackets)e.rank=e.group_bracket?.group_rank;super.sortBrackets()}};customElements.define("nb-group-standings-grid",D);var q=class extends i{static properties={bracket:{type:Object}};render(){return t`<div class="wa-cluster">
      <img
        class="standings-img"
        src=${this.bracket.winner_team.team.icon_path}
      />
      <div class="wa-stack gap-(--wa-space-xs)">
        <span>${this.bracket.name}</span>

        <div class="wa-cluster join-group-bracket">
          <div class="">
            <p class="m-0 bracket-details-content">
              ${this.bracket?.rank??"--"}
            </p>
            <p class="m-0 bracket-details-label">Rank</p>
          </div>
          <wa-divider orientation="vertical"></wa-divider>
          <div class="">
            <p class="m-0 bracket-details-content">${this.bracket?.points}</p>
            <p class="m-0 bracket-details-label">Points</p>
          </div>
          <wa-divider orientation="vertical"></wa-divider>
          <div class="">
            <p class="m-0 bracket-details-content">
              ${this.bracket?.max_points}
            </p>
            <p class="m-0 bracket-details-label">Max points</p>
          </div>
        </div>
      </div>
    </div>`}};customElements.define("nb-bracket-card-content",q);var M=class extends i{static properties={bracket:{type:Object}};render(){return t`<wa-card style="--spacing:var(--wa-space-s);"
      ><nb-bracket-card-content
        .bracket=${this.bracket}
      ></nb-bracket-card-content
    ></wa-card>`}};customElements.define("nb-bracket-card",M);var W=class extends i{static properties={group:{type:Object}};render(){return t`<div class="wa-cluster">
      <wa-icon
        style="font-size:var(--wa-font-size-2xl);"
        name="trophy"
        library="hero"
        variant="outline"
      ></wa-icon>
      <div class="wa-stack gap-(--wa-space-xs)">
        <div>${this.group.name}</div>
        <div class="wa-cluster">
          <small
            ><span class="font-semibold">Members</span> ${this.group.member_count}</small
          ><small
            ><span class="font-semibold">Brackets</span> ${this.group.brackets.length}</small
          >
          <small
            ><span class="font-semibold">Group type</span> ${this.group.is_private?"Private":"Public"}</small
          >
        </div>
      </div>
    </div>`}};customElements.define("nb-group-card-content",W);var F=class extends i{static properties={group:{type:Object}};render(){return t`<wa-card style="--spacing:var(--wa-space-s);"
      ><nb-group-card-content .group=${this.group}></nb-group-card-content
    ></wa-card>`}};customElements.define("nb-group-card",F);var w=class extends i{static properties={label:{type:String},value:{type:String},name:{type:String},icon:{type:String},form:{type:String}};static queries={input:"input"};iconTemplate(){return this.icon?t`<wa-icon name=${this.icon}></wa-icon>`:null}labelTemplate(){return t`<span>${this.label}</span>`}render(){return t`<wa-card class="nb-radio-item">
      <label class="wa-cluster w-full">
        <input
          type="radio"
          name=${this.name}
          value=${this.value}
          form=${this.form}
          required=""
        />${this.iconTemplate()}${this.labelTemplate()}
      </label>
    </wa-card>`}};customElements.define("nb-radio-item",w);var K=class extends w{static properties={bracket:{type:Object}};connectedCallback(){super.connectedCallback(),this.value=this.bracket.id}iconTemplate(){return null}labelTemplate(){return t`<nb-bracket-card-content
      .bracket=${this.bracket}
    ></nb-bracket-card-content>`}};customElements.define("nb-bracket-radio-item",K);var z=class extends w{static properties={group:{type:Object}};connectedCallback(){super.connectedCallback(),this.value=this.group.id}iconTemplate(){return null}labelTemplate(){return t`<nb-group-card-content
      .group=${this.group}
    ></nb-group-card-content>`}};customElements.define("nb-group-radio-item",z);var H=class extends o{static properties={myBrackets:{type:Object},group:{type:Object}};get joinedBrackets(){return this.group.brackets.filter(e=>e.user_id===CURRENT_USER.id)}get bracketsCanJoin(){return this.myBrackets.filter(e=>!this.joinedBrackets.find(a=>a.id===e.id))}groupTemplate(){return t`<div class="wa-stack">
      <p>Joining group:</p>
      <nb-group-card .group=${this.group}></nb-group-card>
    </div> `}bracketTemplate(e){return t`<nb-bracket-radio-item
      name="bracket_sqid"
      form="join-group-form"
      .bracket=${e}
    ></nb-bracket-radio-item>`}bracketsTemplate(){let e=this.bracketsCanJoin.map(r=>this.bracketTemplate(r)),a=null;return MY_BRACKET_COUNT<5&&(a=t`<wa-button
        class="w-full"
        appearance="outlined"
        href=${NEW_BRACKET_LINK+`?group_sqid=${this.group.id}`}
        >Create New Bracket</wa-button
      >`),t`<div class="wa-stack gap-(--wa-space-s)">
        <p>Available brackets to add:</p>
        ${e}
      </div>
      ${a}`}lableTemplate(){return t`Add Bracket To Group`}contentTemplate(){return t`<form
        id="join-group-form"
        action=${this.group.add_bracket_url}
        method="POST"
      ></form>
      <div class="wa-stack">
        ${this.groupTemplate()} ${this.bracketsTemplate()}
      </div>`}footerTemplate(){return t`<wa-button
      id="join-button"
      class="w-full"
      type="submit"
      form="join-group-form"
      variant="brand"
      >Add Bracket</wa-button
    >`}};customElements.define("nb-group-add-bracket",H);var V=class extends o{static properties={bracket:{type:Object},group:{type:Object}};lableTemplate(){return t`Remove Bracket?`}contentTemplate(){return t`<form
      id="delete-group-bracket-form"
      action=${this.bracket.group_bracket.delete_url}
      method="POST"
    >
      <p>
        Are you sure want to remove <strong>${this.bracket.name}</strong> from
        <strong>${this.group.name}</strong>?
      </p>
    </form>`}footerTemplate(){return t`${this.cancelButtonTemplate()}<wa-button
        class="grow"
        variant="danger"
        type="submit"
        form="delete-group-bracket-form"
        >Remove Bracket</wa-button
      >`}};customElements.define("nb-remove-group-bracket",V);var Y=class extends i{static properties={bracket:{type:Object},group:{type:Object}};handleRemoveFromGroupClick(){this.removeFromGroupModal||(this.removeFromGroupModal=document.createElement("nb-remove-group-bracket"),this.removeFromGroupModal.bracket=this.bracket,this.removeFromGroupModal.group=this.group,document.body.appendChild(this.removeFromGroupModal)),this.removeFromGroupModal.show()}render(){return t`<div class="flex w-full h-full">
      <wa-button
        size="small"
        variant="danger"
        appearance="outlined"
        @click=${this.handleRemoveFromGroupClick}
        >Remove From Group</wa-button
      >
    </div>`}};customElements.define("nb-my-group-bracket-actions",Y);var J=class extends c{static properties={group:{type:Object},brackets:{type:Object}};constructor(){super(),this.useSafeName=!1}cleanBracketNames(){}get defaultBracketColumnWidth(){return 250}createDataGrid(){if(!this.brackets.length)return;for(let r of this.brackets)r.rank=r.group_bracket?.group_rank;let e=[];CAN_EDIT_BRACKET||e.push({field:"rank"}),e.push({field:"name",headerName:this.headerName,autoHeight:!0,cellRenderer:r=>{let n=document.createElement("nb-my-bracket-column");return n.bracket=r.data,n}}),CAN_EDIT_BRACKET?e.push({field:"actions",cellRenderer:r=>{let n=document.createElement("nb-my-group-bracket-actions");return n.bracket=r.data,n.group=this.group,n},cellClass:"flex! items-center justify-content-start"}):e.push({field:"points"},{field:"max_points",headerName:"Max"},{field:"round_one_points",headerName:"R1"},{field:"round_two_points",headerName:"R2"},{field:"round_three_points",headerName:"R3"},{field:"round_four_points",headerName:"R4"});let a={columnDefs:e,rowData:this.brackets,...this.gridOptions};this.dataGrid=u(this.standingsGridEl,a)}};customElements.define("nb-my-group-brackets-grid",J);var Q=class extends i{static properties={group:{type:Object},myBrackets:{type:Object},shouldShowBrackets:{type:Boolean},year:{type:Number}};static queries={card:"wa-card"};connectedCallback(){super.connectedCallback(),document.addEventListener("wa-tab-show",this)}handleEvent(e){e.type==="wa-tab-show"&&e.detail.name==="groups"&&(this.shouldShowBrackets=!0,document.removeEventListener("wa-tab-show",this))}addABracket(){this.handleAddBracketClick()}handleAddBracketClick(){this.addBracketModal||(this.addBracketModal=document.createElement("nb-group-add-bracket"),this.addBracketModal.group=this.group,this.addBracketModal.myBrackets=this.myBrackets,document.body.appendChild(this.addBracketModal)),this.addBracketModal.show()}bracketsTemplate(){return this.shouldShowBrackets?t`<nb-my-group-brackets-grid
      class="w-full"
      headerName="My Brackets"
      .group=${this.group}
      .brackets=${this.group.brackets}
      year=${this.year}
    ></nb-my-group-brackets-grid>`:null}buttonsTemplate(){return CAN_EDIT_BRACKET?t`<div class="wa-cluster">
      <wa-button
        size="small"
        variant="brand"
        appearance="outlined"
        @click=${this.handleAddBracketClick}
        >Add A Bracket</wa-button
      >
      <div class="invite-others flex items-center">
        Invite friends
        <wa-copy-button
          value=${this.group.share_url}
          copy-label="Copy link to join"
        >
          <wa-icon
            slot="copy-icon"
            name="share"
            library="hero"
            variant="outline"
          ></wa-icon>
        </wa-copy-button>
      </div>
    </div>`:null}render(){return t`<wa-card class="default-bg">
      <div class="wa-stack items-center nb-group-card">
        <div class="wa-split">
          <a
            class="flex grow items-center no-underline"
            href="${this.group.url}"
          >
            <wa-icon
              class="trophy"
              name="trophy"
              library="hero"
              variant="outline"
            ></wa-icon>
            <div class="flex flex-col group-name">
              <span class="underline">${this.group.name}</span>
              <span class="group-size"
                >Group size: ${this.group.member_count}</span
              >
            </div>
          </a>
          ${this.buttonsTemplate()}
        </div>
        ${this.bracketsTemplate()}
      </div>
    </wa-card>`}};customElements.define("nb-my-brackets-group-standings",Q);var X=class extends o{static properties={bracket:{type:Object},groups:{type:Object}};get joinedGroups(){return this.bracket.group_brackets.map(e=>e.group)}get groupsCanJoin(){return this.groups.filter(e=>!this.joinedGroups.find(a=>a.id===e.id))}lableTemplate(){return t`Add Bracket To Group`}bracketTemplate(){return t`<div class="wa-stack">
      <p>Joining bracket:</p>
      <nb-bracket-card .bracket=${this.bracket}></nb-bracket-card>
    </div> `}groupTemplate(e){return t`<nb-group-radio-item
      name="group_sqid"
      icon="trophy"
      .group=${e}
      form="join-group-form"
    ></nb-group-radio-item>`}groupsTemplate(){let e=this.groupsCanJoin.map(a=>this.groupTemplate(a));return t`<div class="wa-stack gap-(--wa-space-s)">
      <p>Available groups to join:</p>
      ${e}
    </div>`}contentTemplate(){return t`<form
        id="join-group-form"
        action="${this.bracket.bracket_join_group_url}"
        method="POST"
      ></form>

      <div class="wa-stack">
        ${this.bracketTemplate()} ${this.groupsTemplate()}
      </div>`}footerTemplate(){return t`<wa-button
      id="join-button"
      class="w-full"
      type="submit"
      form="join-group-form"
      variant="brand"
      >Add Bracket</wa-button
    >`}};customElements.define("nb-add-bracket-to-group",X);var Z=class extends i{static properties={groupBrackets:{type:Array},size:{type:String}};groupBracketTemplate(e){return t`<wa-card class="group-bracket-card ${this.size} default-border"
      ><a
        class="flex items-center gap-(--wa-space-2xs) no-underline"
        href="${e.group.url}"
      >
        <wa-icon
          class="trophy"
          name="trophy"
          library="hero"
          variant="outline"
        ></wa-icon>
        <div class="flex flex-col">
          <span class="group-name underline">${e.group.name}</span
          ><span class="rank">Rank: ${e.group_rank??"--"}</span>
        </div>
      </a></wa-card
    >`}render(){return this.groupBrackets.length?t`<wa-details
      class="my-brackets-groups"
      summary="Groups (${this.groupBrackets.length})"
      ><div class="wa-cluster flex-wrap gap-(--wa-space-xs)">
        ${this.groupBrackets.map(e=>this.groupBracketTemplate(e))}
      </div></wa-details
    >`:null}};customElements.define("nb-group-bracket-details",Z);var ee=class extends i{static properties={bracket:{type:Object},groups:{type:Object}};handleJoinGroupClick(){this.joinGroupModal||(this.joinGroupModal=document.createElement("nb-add-bracket-to-group"),this.joinGroupModal.bracket=this.bracket,this.joinGroupModal.groups=this.groups,document.body.appendChild(this.joinGroupModal)),this.joinGroupModal.show()}handleDeleteClick(){this.deleteBracketModal||(this.deleteBracketModal=document.createElement("nb-delete-bracket"),this.deleteBracketModal.bracket=this.bracket,document.body.appendChild(this.deleteBracketModal)),this.deleteBracketModal.show()}render(){return t`<div class="wa-cluster">
      <wa-button
        size="small"
        variant="brand"
        appearance="outlined"
        @click=${this.handleJoinGroupClick}
        >Add To Group</wa-button
      ><wa-button
        size="small"
        variant="danger"
        appearance="outlined"
        @click=${this.handleDeleteClick}
        >Delete</wa-button
      >
    </div>`}};customElements.define("nb-my-bracket-actions",ee);var te=class extends c{static properties={groups:{type:Object}};constructor(){super(),this.useSafeName=!1}cleanBracketNames(){}createDataGrid(){if(!this.brackets.length)return;let e=[];CAN_EDIT_BRACKET||e.push({field:"rank"}),e.push({field:"name",headerName:this.headerName,autoHeight:!0,cellRenderer:r=>{let n=document.createElement("nb-my-bracket-column");return n.bracket=r.data,n}}),CAN_EDIT_BRACKET?e.push({field:"actions",cellRenderer:r=>{let n=document.createElement("nb-my-bracket-actions");return n.bracket=r.data,n.groups=this.groups,n},cellClass:"flex! items-center justify-content-start"}):e.push({field:"points"},{field:"max_points",headerName:"Max"},{field:"round_one_points",headerName:"R1"},{field:"round_two_points",headerName:"R2"},{field:"round_three_points",headerName:"R3"},{field:"round_four_points",headerName:"R4"});let a={columnDefs:e,rowData:this.brackets,...this.gridOptions};this.dataGrid=u(this.standingsGridEl,a)}};customElements.define("nb-my-brackets-grid",te);var ae=class extends i{static properties={results:{type:Object}};static queries={input:"wa-input",popup:"wa-popup",dropdown:"wa-dropdown",popover:"wa-popover"};constructor(){super(),this.results=[]}connectedCallback(){super.connectedCallback(),document.addEventListener("focusin",this.handleFocusIn.bind(this))}async search(){let e=this.input.value;if(!e){this.popup.active=!1;return}this.popup.active=!0;let a=await fetch(SEARCH_URL+"?"+new URLSearchParams({name:e}));this.results=await a.json(),this.lastSearchValue=e}handleInputEvent(e){if(!this.input.value){this.results=[];return}this.input.value.length<3||(this.searchTask=new d(async()=>{await this.search()},300),this.searchTask.arm())}handleFocusIn(e){this.contains(e.target)?this.popup.active=!0:this.popup.active=!1}groupTemplate(e){return t`<a class="clickable-group" href=${e.url}>
      <nb-group-card-content .group=${e}></nb-group-card-content>
    </a>`}resultsTemplate(){let e="";return this.results.length?e=this.results.flatMap(a=>[this.groupTemplate(a),t`<wa-divider></wa-divider>`]).slice(0,-1):e=t`<p class="text-center">No groups found</p>`,t`<wa-card>${e}</wa-card>`}popoverTemplate(){return t`<wa-popup placement="bottom"
      >${this.resultsTemplate()}</wa-popup
    >`}render(){return t`<wa-popup placement="bottom" sync="width"
      ><wa-input
        slot="anchor"
        id="search-input"
        placeholder="Search for groups"
        with-clear
        @input=${this.handleInputEvent}
        ><wa-icon name="search" slot="start"></wa-icon></wa-input
      >${this.resultsTemplate()}</wa-popup
    >`}};customElements.define("nb-search-groups",ae);var re=class extends p{static properties={groups:{type:Object},shouldShowBrackets:{type:Boolean}};static queries={tabGroup:"wa-tab-group"};constructor(){super(),this.url=new URL(window.location),this.initialTabPanel=this.url.hash.includes("group")?"groups":"my-brackets"}connectedCallback(){super.connectedCallback(),document.addEventListener("wa-tab-show",this),window.addEventListener("hashchange",this)}handleEvent(e){switch(e.type){case"wa-tab-show":{this.handleTabShow(e);break}case"hashchange":{this.handleHashChange(e);break}}}handleTabShow(e){let a=e.detail.name;a==="my-brackets"&&(this.shouldShowBrackets=!0),a==="groups"?window.location.hash="groups":window.location.hash=""}handleHashChange(e){new URL(e.newURL).hash==="#groups"?this.tabGroup.active="groups":this.tabGroup.active="my-brackets"}async requestContent(){let a=await(await fetch(MY_BRACKETS_CONTENT_URL)).json(),{brackets:r,groups:n,year:l}=a;this.brackets=r,this.groups=n,this.year=l}async updated(){!this.openedToGroups&&this.tabGroup&&this.initialTabPanel==="groups"&&(await this.tabGroup.updateComplete,this.tabGroup.active="groups",this.openedToGroups=!0,this.url.hash.includes("group_")&&document.querySelector(this.url.hash).addABracket())}handleCreateGroupClick(){document.dispatchEvent(new CustomEvent("CreateNewGroup"))}titleTemplate(){return t`<div>
      <h2>My Brackets ${this.year}</h2>
    </div>`}messageTemplate(){return t`<small class="text-(--wa-color-text-quiet)"
        >You created ${this.brackets.length}/5 brackets</small
      >${CAN_EDIT_BRACKET?t`<nb-countdown></nb-countdown>`:null}`}newBracketButtonTemplate(){return this.brackets.length<5&&CAN_EDIT_BRACKET?t`<wa-button
        variant="brand"
        appearance="outlined"
        href=${NEW_BRACKET_LINK}
        >Create Bracket</wa-button
      >`:null}bracketsTemplate(){if(!(this.initialTabPanel==="groups"&&!this.shouldShowBrackets))return t`<div class="wa-stack">
      ${this.newBracketButtonTemplate()}
      <nb-my-brackets-grid
        headerName="My Brackets"
        .brackets=${this.brackets}
        .groups=${this.groups}
        year=${this.year}
      ></nb-my-brackets-grid>
    </div>`}newGroupButtonTemplate(){return CAN_EDIT_BRACKET?t`<wa-button
        class="w-full"
        variant="brand"
        appearance="outlined"
        @click=${this.handleCreateGroupClick}
        >Create Group</wa-button
      >`:null}searchGroupsTemplate(){return CAN_EDIT_BRACKET?t`<nb-search-groups></nb-search-groups>`:null}groupCardsTemplate(){return this.groups.length?this.groups.map(e=>t`<nb-my-brackets-group-standings
            id="group_${e.id}"
            .group=${e}
            .myBrackets=${this.brackets}
            year=${this.year}
          ></nb-my-brackets-group-standings>`):null}groupSearchAndButtonTemplate(){return t`<div class="wa-cluster">
      <div class="grow">${this.newGroupButtonTemplate()}</div>
      <div class="grow">${this.searchGroupsTemplate()}</div>
    </div>`}groupsTemplate(){return t`<div class="wa-stack">
      ${this.groupSearchAndButtonTemplate()}${this.groupCardsTemplate()}
    </div>`}render(){return this.year?t`<wa-card>
      ${this.titleTemplate()}
      <div class="wa-stack">
        ${this.messageTemplate()}
        <wa-tab-group @wa-tab-show=${this.handleTabShow}>
          <wa-tab slot="nav" panel="my-brackets">My Brackets</wa-tab>
          <wa-tab slot="nav" panel="groups">Groups</wa-tab>

          <wa-tab-panel name="my-brackets"
            >${this.bracketsTemplate()}</wa-tab-panel
          >
          <wa-tab-panel name="groups">${this.groupsTemplate()}</wa-tab-panel>
        </wa-tab-group>
      </div>
    </wa-card>`:null}};customElements.define("nb-my-brackets",re);var ie=class extends o{static properties={private:{type:Boolean}};static queries={...o.queries,isPrivateCheckbox:"#is_private",password:"#password",form:"form"};constructor(){super(),this.private=!0}connectedCallback(){super.connectedCallback(),document.addEventListener("CreateNewGroup",this)}handleEvent(e){e.type==="CreateNewGroup"&&this.dialog.show()}handlePrivateChange(){this.private=!this.private}lableTemplate(){return t`Create A Group`}contentTemplate(){return t`<form
      id="new-group-form"
      action=${CREATE_GROUP_URL}
      method="POST"
      class="wa-native"
    >
      <div class="wa-stack">
        <wa-input
          form="new-group-form"
          placeholder="Group name"
          label="Group name"
          id="name"
          name="name"
          maxlength="60"
          required
          autofocus
        ></wa-input>

        <wa-checkbox
          form="new-group-form"
          id="is_private"
          name="is_private"
          @change=${this.handlePrivateChange}
          checked
          >Require Password To Join</wa-checkbox
        >

        <label ?hidden=${!this.private}
          >Password
          <input
            form="new-group-form"
            type="text"
            label="Password"
            id="password"
            name="password"
            placeholder="Password"
            maxlength="60"
            ?required=${this.private}
        /></label>
      </div>
    </form>`}footerTemplate(){return t`<wa-button
      class="w-full"
      variant="brand"
      type="submit"
      form="new-group-form"
      >Create</wa-button
    >`}};customElements.define("nb-create-group",ie);var se=class extends i{static properties={email:{type:String}};static queries={};render(){return t`<wa-card>
      <form id="password-reset-request-form" action="" method="POST"></form>
      <div class="wa-stack">
        <h2>Reset Password</h2>

        <wa-input
          form="password-reset-request-form"
          type="email"
          name="email"
          label="Email"
          placeholder="Your email"
          required
        ></wa-input>

        <wa-button
          form="password-reset-request-form"
          type="submit"
          variant="brand"
          class="w-full"
          >Request Link To Reset Password</wa-button
        >
      </div>
    </wa-card>`}};customElements.define("nb-password-reset-request",se);var Ee="Passwords do not match.",ne=class extends i{static properties={passwordsMatch:{type:Boolean}};static queries={password1:"#password1",password2:"#password2"};checkPasswordsMatch(){let e=this.password1.value,a=this.password2.value;e===a?(this.passwordsMatch=!0,this.password2.helpText=""):a.length<e.length?(this.passwordsMatch=!1,e.substring(0,a.length)===a?this.password2.helpText="":this.password2.helpText=Ee):(this.passwordsMatch=!1,this.password2.helpText=Ee)}render(){return t`<wa-card @input=${this.checkPasswordsMatch}>
      <form id="password-reset-form" action="" method="POST"></form>
      <div class="wa-stack">
        <h2>Reset Password</h2>

        <wa-input
          form="password-reset-form"
          type="password"
          label="New Password"
          id="password1"
          name="password1"
          placeholder="Password"
          required
        ></wa-input>

        <wa-input
          form="password-reset-form"
          type="password"
          label="Confirm New Password"
          id="password2"
          name="password2"
          placeholder="Password"
          required
        ></wa-input>

        <wa-button
          form="password-reset-form"
          class="w-full"
          type="submit"
          variant="brand"
          ?disabled=${!this.passwordsMatch}
          >Reset Password</wa-button
        >
      </div>
    </wa-card>`}};customElements.define("nb-reset-password",ne);function $(s){return s.charAt(0).toUpperCase()+s.slice(1)}var oe=class extends i{static properties={theme:{type:Object}};static queries={themesSelect:"#themes",modeSelect:"#mode",primaryColorSelect:"#primary-color",backgroundColorSelect:"#background-color",colorContrastSelect:"#color-contrast",colorPaletteSelect:"#color-palette",roundingSlider:"#theme-rounding",spacingSlider:"#theme-spacing",borderWidthSlider:"#theme-border-width",roundingInput:"#theme-rounding-input",spacingInput:"#theme-spacing-input",borderWidthInput:"#theme-border-width-input"};connectedCallback(){super.connectedCallback(),this.init()}init(){this.theme=THEME,document.addEventListener("transitionstart",this),this.styleOberserver=new MutationObserver(()=>this.handleCSSChange()),this.styleOberserver.observe(document.documentElement,{attributeFilter:["style"]})}handleThemeChange(){let e=this.themesSelect.value;console.log(e),this.theme.theme=e}handleModeChange(){let e=this.modeSelect.value;console.log(e),this.theme.mode=e}handlePrimaryColorChange(){let e=this.primaryColorSelect.value;console.log(e),this.theme.primaryColor=e}handleBackgroundColorChange(){let e=this.backgroundColorSelect.value;console.log(e),this.theme.backgroundColor=e}handleColorPaletteChange(){let e=this.colorPaletteSelect.value;console.log(e),this.theme.colorPalette=e}handleColorContrastChange(){let e=this.colorContrastSelect.value;console.log(e),this.theme.colorContrast=e}handleRoundingChange(e){let a=e.target.value;this.theme.rounding=a}decrementRounding(){this.theme.rounding=Number(this.roundingInput.value)-.1}incrementRounding(){this.theme.rounding=Number(this.roundingInput.value)+.1}resetRounding(){this.theme.rounding=null}handleSpacingChange(e){let a=e.target.value;this.theme.spacing=a}decrementSpacing(){this.theme.spacing=Number(this.spacingInput.value)-.0125}incrementSpacing(){this.theme.spacing=Number(this.spacingInput.value)+.0125}resetSpacing(){this.theme.spacing=null}handleBorderWidthChange(e){let a=e.target.value;this.theme.borderWidth=a}decrementBorderWidth(){this.theme.borderWidth=Number(this.borderWidthInput.value)-.5}incrementBorderWidth(){this.theme.borderWidth=Number(this.borderWidthInput.value)+.5}resetBorderWidth(){this.theme.borderWidth=null}handleEvent(e){e.type==="transitionstart"&&this.handleCSSChange(e)}handleCSSChange(){this.requestUpdate()}roundingTemplate(){return t`<div class="wa-split">
      <div class="wa-stack grow">
        <wa-slider
          id="theme-rounding"
          label="Rounding"
          min="0"
          max="4"
          step="0.1"
          .value=${this.theme.rounding}
          with-tooltip
          @change=${this.handleRoundingChange}
        ></wa-slider>

        <wa-number-input
          min="0"
          max="4"
          step="0.1"
          .value=${this.theme.rounding}
          @input=${this.handleRoundingChange}
        ></wa-number-input>
      </div>

      <wa-button
        appearance="outlined"
        variant="danger"
        @click=${this.resetRounding}
        >Reset</wa-button
      >
    </div>`}spacingTemplate(){return t`<div class="wa-split">
      <div class="wa-stack grow">
        <wa-slider
          id="theme-spacing"
          label="Spacing"
          min="0.5"
          max="2"
          step="0.0125"
          .value=${this.theme.spacing}
          with-tooltip
          @change=${this.handleSpacingChange}
        ></wa-slider>
        <wa-button-group label="Spacing">
          <wa-button
            appearance="filled-outlined"
            @click=${this.decrementSpacing}
            ><wa-icon
              library="ion"
              name="remove-outline"
              label="Smaller spacing"
            ></wa-icon
          ></wa-button>
          <wa-input
            id="theme-spacing-input"
            min="0.5"
            max="2"
            step="0.0125"
            @input=${this.handleSpacingChange}
            type="number"
            .value=${this.theme.spacing}
          ></wa-input>
          <wa-button
            appearance="filled-outlined"
            @click=${this.incrementSpacing}
            ><wa-icon
              library="ion"
              name="add-outline"
              label="Bigger spacing"
            ></wa-icon
          ></wa-button>
        </wa-button-group>
      </div>
      <wa-button
        appearance="outlined"
        variant="danger"
        @click=${this.resetSpacing}
        >Reset</wa-button
      >
    </div>`}borderWidthTemplate(){return t`<div class="wa-split">
      <div class="wa-stack grow">
        <wa-slider
          id="theme-border-width"
          label="Border width"
          min="0.5"
          max="4"
          step="0.5"
          .value=${this.theme.borderWidth}
          with-tooltip
          @change=${this.handleBorderWidthChange}
        ></wa-slider>
        <wa-button-group label="Border width">
          <wa-button
            appearance="filled-outlined"
            @click=${this.decrementBorderWidth}
            ><wa-icon
              library="ion"
              name="remove-outline"
              label="Smaller border width"
            ></wa-icon
          ></wa-button>
          <wa-input
            id="theme-border-width-input"
            min="0.5"
            max="4"
            step="0.5"
            @input=${this.handleBorderWidthChange}
            type="number"
            .value=${this.theme.borderWidth}
          ></wa-input>
          <wa-button
            appearance="filled-outlined"
            @click=${this.incrementBorderWidth}
            ><wa-icon
              library="ion"
              name="add-outline"
              label="Bigger border width"
            ></wa-icon
          ></wa-button>
        </wa-button-group>
      </div>
      <wa-button
        appearance="outlined"
        variant="danger"
        @click=${this.resetBorderWidth}
        >Reset</wa-button
      >
    </div>`}render(){return this.theme?t`<wa-card>
      <div class="wa-stack">
        <div class="wa-stack">
          <h2>Preferences</h2>

          <wa-select
            id="themes"
            label="Builtin Themes"
            @input=${this.handleThemeChange}
            >${Te.map(e=>t`<wa-option
                  ?selected=${this.theme.theme===e}
                  value=${e}
                  >${$(e)}</wa-option
                >`)}</wa-select
          >

          <wa-select id="mode" label="Mode" @input=${this.handleModeChange}
            ><wa-option value="light" ?selected=${this.theme.mode==="light"}
              >Light</wa-option
            ><wa-option value="dark" ?selected=${this.theme.mode==="dark"}
              >Dark</wa-option
            ></wa-select
          >

          <wa-divider></wa-divider>

          <div class="wa-stack">
            <h4>Custom Theming Options</h4>

            <div class="wa-grid" style="--min-column-size: 20rem;">
              <div class="wa-stack">
                <wa-select
                  with-clear
                  id="primary-color"
                  label="Primary Color"
                  @input=${this.handlePrimaryColorChange}
                  >${_e.map(e=>t`<wa-option
                        ?selected=${this.theme.primaryColor===e}
                        value=${e}
                        >${$(e)}</wa-option
                      >`)}</wa-select
                >

                <wa-select
                  with-clear
                  id="background-color"
                  label="Background Color"
                  @input=${this.handleBackgroundColorChange}
                  >${$e.map(e=>t`<wa-option
                        ?selected=${this.theme.backgroundColor===e}
                        value=${e}
                        >${$(e)}</wa-option
                      >`)}</wa-select
                >

                <wa-select
                  with-clear
                  id="color-palette"
                  label="Color Palette"
                  @input=${this.handleColorPaletteChange}
                  >${ye.map(e=>t`<wa-option
                        ?selected=${this.theme.colorPalette===e}
                        value=${e}
                        >${$(e)}</wa-option
                      >`)}</wa-select
                >
              </div>

              <div class="wa-stack gap-(--wa-space-l)">
                ${this.roundingTemplate()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </wa-card>`:null}};customElements.define("nb-preferences",oe);var Se="Email taken. Please choose a different email or login.",Re="Username taken. Please choose a different username.",f=class extends i{static properties={email:{type:String},emailValid:{type:Boolean},usernameValid:{type:Boolean}};static queries={emailInput:"#email",usernameInput:"#username",submitButton:"#submitButtn"};async checkEmailUnique(e){let a=await fetch(EMAIL_UNIQUE_URL+"?"+new URLSearchParams({email:e}));return a=await a.json(),a}async checkUsernameUnique(e){let a=await fetch(USERNAME_UNIQUE_URL+"?"+new URLSearchParams({username:e}));return a=await a.json(),a}async handleEmailInput(){this.emailTask||(this.emailTask=new d(async()=>{let e=this.emailInput.value,a=await this.checkEmailUnique(e);console.log("email is unique",a.isUnique),a.isUnique?(this.emailInput.hint="",this.emailValid=!0):(this.emailInput.hint=Se,this.emailValid=!1)},300)),this.emailTask.arm()}async handleUsernameInput(){this.usernameTask||(this.usernameTask=new d(async()=>{let e=this.usernameInput.value,a=await this.checkUsernameUnique(e);console.log("username is unique",a.isUnique),a.isUnique?(this.usernameInput.hint="",this.usernameValid=!0):(this.usernameInput.hint=Re,this.usernameValid=!1)},300)),this.usernameTask.arm()}render(){return t`<wa-card>
      <form id="signup-form" action="${SIGNUP_URL}" method="POST"></form>
      <div class="wa-stack">
        <h2>Sign Up</h2>

        <wa-input
          @input=${this.handleEmailInput}
          form="signup-form"
          placeholder="Your email"
          type="email"
          label="Email"
          id="email"
          name="email"
          maxlength="60"
          required
        ></wa-input>

        <wa-input
          @input=${this.handleUsernameInput}
          form="signup-form"
          placeholder="Your username"
          label="Username"
          id="username"
          name="username"
          maxlength="60"
          required
        ></wa-input>

        <wa-input
          form="signup-form"
          type="password"
          label="Password"
          id="password1"
          name="password1"
          placeholder="Password"
          minlength="6"
          required
        ></wa-input>

        <wa-button
          form="signup-form"
          id="submitButton"
          class="w-full"
          variant="brand"
          type="submit"
          ?disabled=${!(this.emailValid&&this.usernameValid)}
          >Sign Up</wa-button
        >
      </div>
    </wa-card>`}};customElements.define("nb-signup",f);var le=class extends f{static properties={username:{type:String}};async handleEmailInput(){if(this.emailInput.value===this.email){this.emailInput.helpText="",this.emailValid=!1;return}super.handleEmailInput()}async handleUsernameInput(){if(this.usernameInput.value===this.username){this.usernameInput.helpText="",this.usernameValid=!1;return}super.handleUsernameInput()}render(){return t`<wa-card>
      <form id="profile-form" action="" method="POST" autocomplete="off"></form>
      <div class="wa-stack">
        <h2>Profile</h2>

        <wa-input
          form="profile-form"
          @input=${this.handleEmailInput}
          value=${this.email}
          original-value=${this.email}
          type="email"
          label="Email"
          id="email"
          name="email"
          maxlength="60"
          required
        ></wa-input>

        <wa-input
          form="profile-form"
          @input=${this.handleUsernameInput}
          value=${this.username}
          original-value=${this.username}
          label="Username"
          id="username"
          name="username"
          maxlength="60"
          required
        ></wa-input>

        <wa-button
          form="profile-form"
          id="submitButton"
          class="w-full"
          variant="brand"
          type="submit"
          ?disabled=${!(this.emailValid||this.usernameValid)}
          >Update</wa-button
        >
        <small>
          <a href="${PASSWORD_RESET_REQUEST_URL}">Reset password</a>
        </small>
      </div>
    </wa-card>`}};customElements.define("nb-profile",le);var me=class extends i{static properties={correct:{type:Object},default:{type:Object},correctTop:{type:Object},correctBottom:{type:Object},winnerTop:{type:Object},winnerBottom:{type:Object},type:{type:String}};static queries={topInputEl:"#top > input",bottomInputEl:"#bottom > input"};get correctWinnerName(){return this.correct.winner_team.team.name}get defaultTopTeamName(){let e=this.default.top_team;return this.teamTemplate(e)}get defaultBottomTeamName(){let e=this.default.bottom_team;return this.teamTemplate(e)}get correctTopName(){let e=this.correctTop;return this.teamTemplate(e)}get correctBottomName(){let e=this.correctBottom;return this.teamTemplate(e)}get winnerTopName(){return this.winnerTop.team.name}get winnerBottomName(){return this.winnerBottom.team.name}teamTemplate(e){return e?`${e.rank} ${e.team.name}`:""}getImageElement(e){return e?t`<img
      class="team-img"
      src="${e.team.icon_path}"
      alt="${e.team.name}"
    />`:null}topIconTemplate(){return this.correctTop?t`<wa-icon
        auto-width
        library="hero"
        variant="16-solid"
        name="${this.correctTop?.id===this.winnerTop.id?"check-circle":"x-circle"}"
      ></wa-icon>`:null}bottomIconTemplate(){return this.correctBottom?t`<wa-icon
        auto-width
        library="hero"
        variant="16-solid"
        name="${this.correctBottom?.id===this.winnerBottom.id?"check-circle":"x-circle"}"
      ></wa-icon>`:null}topGameTemplate(){return t`<div class="nb-team user-pick p-0">
      <span class="team-name ms-auto">Final</span>
    </div>`}topPickTemplate(){return this.winnerTop?t`<div class="nb-team user-pick">
      ${this.topIconTemplate()}<span class="team-name"
        >${this.winnerTopName}</span
      >
    </div>`:null}bottomPickTemplate(){return this.winnerBottom?t`<div class="nb-team user-pick">
      ${this.bottomIconTemplate()}<span class="team-name"
        >${this.winnerBottomName}</span
      >
    </div>`:null}correctGameTemplate(){}defaultMatchupTemplate(){return t`<div class="nb-team">
        ${this.getImageElement(this.default.top_team)}
        <span
          class="team-name ${this.correct.winner_id&&this.correct.winner_id!==this.default.top_team_id?"loser-team":""}"
          >${this.defaultTopTeamName}</span
        ><span class="ms-auto">${this.correct?.top_team_goals}</span>
      </div>
      <div class="nb-team">
        ${this.getImageElement(this.default.bottom_team)}
        <span
          class="team-name ${this.correct.winner_id&&this.correct.winner_id!==this.default.bottom_team_id?"loser-team":""}"
          >${this.defaultBottomTeamName}</span
        ><span class="ms-auto">${this.correct?.bottom_team_goals}</span>
      </div>`}matchupTemplate(){return t`${this.topPickTemplate()}
      <div class="nb-team">
        ${this.getImageElement(this.correctTop)}
        <span
          class="team-name ${this.correct.winner_id&&this.correct.winner_id!==this.correctTop?.id?"loser-team":""}"
          >${this.correctTopName}</span
        ><span class="ms-auto">${this.correct?.top_team_goals}</span>
      </div>
      <div class="nb-team">
        ${this.getImageElement(this.correctBottom)}
        <span
          class="team-name ${this.correct.winner_id&&this.correct.winner_id!==this.correctBottom?.id?"loser-team":""}"
          >${this.correctBottomName}</span
        ><span class="ms-auto">${this.correct?.bottom_team_goals}</span>
      </div>
      ${this.bottomPickTemplate()}`}render(){let e;return this.type==="default"?e=this.defaultMatchupTemplate():e=this.matchupTemplate(),t`<wa-card class="matchup default-bg default-border"
      ><div class="flex flex-col">${e}</div></wa-card
    >`}};customElements.define("nb-matchup",me);var ce=class extends i{static properties={points:{type:Object}};static queries={pointsCharts:"#points-chart"};async firstUpdated(){await this.updateComplete,this.initChart(),this.setupThemeWatcher()}initChart(){this.computedStyle=getComputedStyle(document.body);let e=this.computedStyle.getPropertyValue("--wa-color-success-400"),a=this.computedStyle.getPropertyValue("--wa-color-danger-400"),r=this.computedStyle.getPropertyValue("--wa-color-neutral-400"),n=this.computedStyle.getPropertyValue("--wa-panel-background-color"),l=this.computedStyle.getPropertyValue("--wa-color-neutral-950"),k={type:"doughnut",data:{labels:["Points Gained","Points Lost","Points Unplayed"],datasets:[{data:[this.points.gained,this.points.lost,this.points.unplayed],backgroundColor:[e,a,r],borderColor:n,hoverOffset:4}]},options:{plugins:{legend:{labels:{color:l}}}}},h=this.pointsCharts.getContext("2d");this.chart=new Chart(h,k)}updateColors(){let e=this.computedStyle.getPropertyValue("--wa-color-success-400"),a=this.computedStyle.getPropertyValue("--wa-color-danger-400"),r=this.computedStyle.getPropertyValue("--wa-color-neutral-400"),n=this.computedStyle.getPropertyValue("--wa-panel-background-color"),l=this.computedStyle.getPropertyValue("--wa-color-neutral-950");this.chart.data.datasets[0].backgroundColor=[e,a,r],this.chart.data.datasets[0].borderColor=n,this.chart.options.plugins.legend.labels.color=l,this.chart.update()}setupThemeWatcher(){this.mutationObserver=new MutationObserver(()=>this.updateColors()),this.mutationObserver.observe(document.documentElement,{attributes:!0})}render(){return t`<div style="width:200px;height:200px;">
      <canvas id="points-chart"></canvas>
    </div>`}};customElements.define("nb-bracket-points-chart",ce);var de=class extends i{static properties={bracket:{type:Object},correct:{type:Object},default:{type:Object},type:{type:String}};getImageElement(e,a=!1){if(!e)return null;let r=a||!this.correct.winner_id||this.correct.winner_id===e.id;return t`<img
      class="winner-img ${r?"":"greyscale"}"
      src="${e.team.icon_path}"
      alt="${e.team.name}"
    />`}getBracketClass(){return this.type==="edit"?"bracket-grid-edit":this.type==="correct"?"cbracket-grid":this.type==="correct-edit"?"cbracket-grid-edit":"bracket-grid"}matchupTemplate(e){return e.type==="default"?t`<nb-matchup
        type="default"
        .default=${e.default}
        .correct=${e.correct}
      ></nb-matchup>`:t`<nb-matchup
      .winnerTop=${e.winnerTop}
      .winnerBottom=${e.winnerBottom}
      .correctTop=${e.correctTop}
      .correctBottom=${e.correctBottom}
      .correct=${e.correct}
    ></nb-matchup>`}roundOneLeftTemplate(){return t`<div class="round-one">
      ${this.matchupTemplate({type:"default",default:this.default.games.game1,correct:this.correct.games.game1})}
      ${this.matchupTemplate({type:"default",default:this.default.games.game2,correct:this.correct.games.game2})}
      ${this.matchupTemplate({type:"default",default:this.default.games.game3,correct:this.correct.games.game3})}
      ${this.matchupTemplate({type:"default",default:this.default.games.game4,correct:this.correct.games.game4})}
    </div>`}roundTwoLeftTemplate(){return t`<div class="round-two">
      ${this.matchupTemplate({winnerTop:this.bracket?.games.game1.winner_team,winnerBottom:this.bracket?.games.game2.winner_team,correctTop:this.correct.games.game1.winner_team,correctBottom:this.correct.games.game2.winner_team,correct:this.correct.games.game9})}
      ${this.matchupTemplate({winnerTop:this.bracket?.games.game3.winner_team,winnerBottom:this.bracket?.games.game4.winner_team,correctTop:this.correct.games.game3.winner_team,correctBottom:this.correct.games.game4.winner_team,correct:this.correct.games.game10})}
    </div>`}roundThreeLeftTemplate(){return t`<div class="round-three">
      ${this.matchupTemplate({winnerTop:this.bracket?.games.game9.winner_team,winnerBottom:this.bracket?.games.game10.winner_team,correctTop:this.correct.games.game9.winner_team,correctBottom:this.correct.games.game10.winner_team,correct:this.correct.games.game13})}
    </div>`}correctChampionTemplate(){return this.correct.winner_team?t`<div class="wa-stack">
      ${this.getImageElement(this.correct.winner_team)}
      <p class="text-center">Champion</p>
    </div>`:null}getChampionPickIcon(){return this.bracket?.winner_team&&this.correct.winner_team?this.correct.winner_id===this.bracket?.winner_id?t`<wa-icon
          library="hero"
          name="check-circle"
          variant="solid"
        ></wa-icon>`:t`<wa-icon
        library="hero"
        name="x-circle"
        variant="solid"
      ></wa-icon>`:null}pickedChampionTemplate(){return this.bracket?.winner_team?t`<div class="wa-stack">
      ${this.getImageElement(this.bracket?.winner_team)}
      <p class="text-center inline-flex justify-around items-center">
        ${IS_ME?"Your pick":"Their pick"}${this.getChampionPickIcon()}
      </p>
    </div>`:null}predictedScoreTemplate(){return!this.bracket?.winner_goals||!this.bracket?.loser_goals?null:t`<div class="wa-stack gap-(--wa-space-xs)">
      <span class="text-(length:--wa-font-size-s)">Predicted Score:</span>
      <div class="flex justify-center items-center gap-(--wa-space-s)">
        <wa-card style="--spacing:var(--wa-space-xs);"
          >${this.bracket?.winner_goals}</wa-card
        ><span>-</span
        ><wa-card style="--spacing:var(--wa-space-xs);"
          >${this.bracket?.loser_goals}</wa-card
        >
      </div>
    </div>`}championTemplate(){return t`<div class="round-final my-auto">
      <wa-card>
        <div class="wa-stack">
          <span class="text-center">${this.default.year} Championship</span>
          <div class="flex justify-center gap-(--wa-space-m)">
            ${this.pickedChampionTemplate()} ${this.correctChampionTemplate()}
          </div>
          <wa-divider></wa-divider>
          <div class="flex justify-between gap-(--wa-space-s)">
            ${this.matchupTemplate({winnerTop:this.bracket?.games.game13.winner_team,winnerBottom:this.bracket?.games.game14.winner_team,correctTop:this.correct.games.game13.winner_team,correctBottom:this.correct.games.game14.winner_team,correct:this.correct.games.game15})}
            ${this.predictedScoreTemplate()}
          </div>
        </div>
      </wa-card>
    </div>`}roundThreeRightTemplate(){return t`<div class="round-three">
      ${this.matchupTemplate({winnerTop:this.bracket?.games.game11.winner_team,winnerBottom:this.bracket?.games.game12.winner_team,correctTop:this.correct.games.game11.winner_team,correctBottom:this.correct.games.game12.winner_team,correct:this.correct.games.game14})}
    </div>`}roundTwoRightTemplate(){return t`<div class="round-two">
      ${this.matchupTemplate({winnerTop:this.bracket?.games.game5.winner_team,winnerBottom:this.bracket?.games.game6.winner_team,correctTop:this.correct.games.game5.winner_team,correctBottom:this.correct.games.game6.winner_team,correct:this.correct.games.game11})}
      ${this.matchupTemplate({winnerTop:this.bracket?.games.game7.winner_team,winnerBottom:this.bracket?.games.game8.winner_team,correctTop:this.correct.games.game7.winner_team,correctBottom:this.correct.games.game8.winner_team,correct:this.correct.games.game12})}
    </div>`}roundOneRightTemplate(){return t`<div class="round-one">
      ${this.matchupTemplate({type:"default",default:this.default.games.game5,correct:this.correct.games.game5})}
      ${this.matchupTemplate({type:"default",default:this.default.games.game6,correct:this.correct.games.game6})}
      ${this.matchupTemplate({type:"default",default:this.default.games.game7,correct:this.correct.games.game7})}
      ${this.matchupTemplate({type:"default",default:this.default.games.game8,correct:this.correct.games.game8})}
    </div>`}chartTemplate(){return null}groupsTemplate(){return this.bracket.group_brackets.length?t`<nb-group-bracket-details
      .groupBrackets=${this.bracket.group_brackets}
    ></nb-group-bracket-details>`:null}topCardStats(){if(this.type==="correct"){let e;return this.correct.winner_team.id===this.correct.games.game13.winner_team.id?e=this.correct.games.game14.winner_team:e=this.correct.games.game13.winner_team,t`<div class="wa-stack items-center">
        <h2>${this.correct.name}</h2>
        <p>
          ${this.correct.winner_team.team.name} beat ${e.team.name} to
          win the championship this year
        </p>
      </div> `}return t`<div class="wa-stack">
      <div class="wa-cluster">
        ${this.getImageElement(this.bracket?.winner_team,!0)}
        <div class="wa-stack">
          <h2>${this.bracket.name}</h2>
          <div class="flex justify-evenly">
            <div class="flex">
              <span
                ><p class="bracket-details-content">
                  ${this.bracket?.rank??"--"}
                </p>
                <p class="bracket-details-label">Rank</p></span
              >
            </div>
            <div class="flex">
              <wa-divider orientation="vertical"></wa-divider>
              <span
                ><p class="bracket-details-content">${this.bracket?.points}</p>
                <p class="bracket-details-label">Points</p></span
              >
            </div>
            <div class="flex">
              <wa-divider orientation="vertical"></wa-divider>
              <span
                ><p class="bracket-details-content">
                  ${this.bracket?.max_points}
                </p>
                <p class="bracket-details-label">Max points</p></span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="bracket-sub-details wa-stack">
        <div class="flex justify-evenly">
          <div class="flex">
            <span
              ><p class="bracket-details-content">
                ${this.bracket?.round_one_points??"--"} / 80
              </p>
              <p class="bracket-details-label">Round 1</p></span
            >
          </div>
          <div class="flex">
            <wa-divider orientation="vertical"></wa-divider>
            <span
              ><p class="bracket-details-content">
                ${this.bracket?.round_two_points??"--"} / 80
              </p>
              <p class="bracket-details-label">Round 2</p></span
            >
          </div>
          <div class="flex">
            <wa-divider orientation="vertical"></wa-divider>
            <span
              ><p class="bracket-details-content">
                ${this.bracket?.round_three_points??"--"} / 80
              </p>
              <p class="bracket-details-label">Final Four</p></span
            >
          </div>
          <div class="flex">
            <wa-divider orientation="vertical"></wa-divider>
            <span
              ><p class="bracket-details-content">
                ${this.bracket?.round_four_points??"--"} / 80
              </p>
              <p class="bracket-details-label">Championship</p></span
            >
          </div>
        </div>
      </div>
      ${this.groupsTemplate()}
    </div>`}topCardTemplate(){return t`<div class="flex justify-center">
      <wa-card>${this.topCardStats()}</wa-card>
    </div>`}render(){return t`<div class="w-full wa-stack">
      ${this.topCardTemplate()}

      <div class="${this.getBracketClass()}">
        <div class="round-one-left">
          <wa-card class="round-details">Round 1</wa-card>
          ${this.roundOneLeftTemplate()}
        </div>

        <div class="round-two-left">
          <wa-card class="round-details">Round 2</wa-card>
          ${this.roundTwoLeftTemplate()}
        </div>

        <div class="round-three-left">
          <wa-card class="round-details">Round 3</wa-card>
          ${this.roundThreeLeftTemplate()}
        </div>

        ${this.championTemplate()}

        <div class="round-three-right">
          <wa-card class="round-details">Round 3</wa-card>
          ${this.roundThreeRightTemplate()}
        </div>

        <div class="round-two-right">
          <wa-card class="round-details">Round 2</wa-card>
          ${this.roundTwoRightTemplate()}
        </div>

        <div class="round-one-right">
          <wa-card class="round-details">Round 1</wa-card>
          ${this.roundOneRightTemplate()}
        </div>
      </div>
    </div>`}};customElements.define("nb-bracket",de);var pe=class extends o{static properties={group:{type:Object},controller:{type:Object}};handleHide(){this.controller.show()}lableTemplate(){return t`Delete this group?`}contentTemplate(){return t`<form
      id="delete-group-form"
      action=${this.group.delete_url}
      method="POST"
    >
      <p>Are you sure want to delete <strong>${this.group.name}</strong>?</p>
    </form>`}footerTemplate(){return t`${this.cancelButtonTemplate()}
      <wa-button
        class="grow"
        variant="danger"
        type="submit"
        form="delete-group-form"
        >Delete Group</wa-button
      >`}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.boundHandleHide=this.handleHide.bind(this),this.dialog.addEventListener("wa-hide",this.boundHandleHide)}disconnectedCallback(){super.disconnectedCallback(),this.dialog.removeEventListener("wa-hide",this.boundHandleHide)}};customElements.define("nb-delete-group",pe);var ue=class extends o{inputEvent=!0;static properties={private:{type:Boolean},group:{type:Object}};static queries={...o.queries,form:"#edit-group-form",saveButton:"#save-button"};async firstUpdated(){super.firstUpdated(),await this.updateComplete,this.initialFormData=new FormData(this.form)}handlePrivateChange(){this.private=!this.private}async handleInput(){await this.updateComplete;let a=[...new FormData(this.form).entries()];this.saveButton.disabled=JSON.stringify([...this.initialFormData.entries()])===JSON.stringify(a)}handleDeleteClick(){this.deleteGroup||(this.deleteGroup=document.createElement("nb-delete-group"),this.deleteGroup.group=this.group,this.deleteGroup.controller=this,document.body.appendChild(this.deleteGroup)),this.deleteGroup.show(),this.hide()}lableTemplate(){return t`Edit Group`}contentTemplate(){return t`<form
      id="edit-group-form"
      action=${this.group.edit_url}
      method="POST"
      class="wa-native"
    >
      <input name="old_name" value=${this.group.name} hidden />
      <div class="wa-stack">
        <wa-input
          form="edit-group-form"
          placeholder="Group name"
          label="Group name"
          id="name"
          name="name"
          maxlength="60"
          value=${this.group.name}
          required
        ></wa-input>

        <wa-radio-group
          form="edit-group-form"
          label="Lock Group"
          name="locked"
          value=${this.group.locked}
          help-text="Locked groups prevent new members from joining."
          required
        >
          <wa-radio value="true">Locked</wa-radio>
          <wa-radio value="false">Unlocked</wa-radio>
        </wa-radio-group>
        <wa-radio-group
          form="edit-group-form"
          label="Group Type"
          name="is_private"
          value=${this.group.is_private}
          @input=${this.handlePrivateChange}
          help-text="Private groups require a password to join."
          required
        >
          <wa-radio value="true">Private</wa-radio>
          <wa-radio value="false">Public</wa-radio>
        </wa-radio-group>

        <label ?hidden=${!this.private}
          >Password
          <input
            form="edit-group-form"
            type="text"
            label="Password"
            id="password"
            name="password"
            placeholder="Password"
            maxlength="60"
            value=${this.group.password}
            ?required=${this.private}
        /></label>
      </div>
    </form>`}footerTemplate(){return t`<wa-button
        class="grow"
        variant="danger"
        appearance="outlined"
        @click=${this.handleDeleteClick}
        >Delete Group</wa-button
      >
      <wa-button
        class="grow"
        id="save-button"
        variant="brand"
        type="submit"
        form="edit-group-form"
        disabled
        >Save</wa-button
      >`}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.private=this.group.is_private}};customElements.define("nb-edit-group",ue);var he=class extends o{static properties={group:{type:Object}};lableTemplate(){return t`Join ${this.group.name}`}contentTemplate(){return t`<form
      id="join-private-group"
      action=${this.group.join_url}
      method="GET"
      class="wa-stack"
    >
      <p>This group is private. Please enter the password to join.</p>
      <wa-input
        type="text"
        id="password"
        name="password"
        label="Password"
        placeholder="Password"
        maxlength="60"
        required
      ></wa-input>
    </form>`}footerTemplate(){return t`${this.cancelButtonTemplate()}<wa-button
        class="grow"
        type="submit"
        form="join-private-group"
        variant="brand"
        >Join</wa-button
      >`}};customElements.define("nb-join-private-group",he);var ge=class extends p{static properties={group:{type:Object},isMember:{type:Boolean,converter:(e,a)=>e==="True"}};static queries={bracketDialog:"#create-bracket-dialog"};get canEditGroupBracket(){return CAN_EDIT_BRACKET&&CURRENT_YEAR===this.group.year}async requestContent(){let a=await(await fetch(VIEW_GROUP_CONTENT_URL,{credentials:"include",mode:"no-cors"})).json(),{brackets:r,winners:n,group:l,is_member:m}=a;this.brackets=r,this.winners=n,this.group=l,this.year=this.group.year,this.isMember=m}handleJoinGroupClick(){this.joinDialog||(this.joinDialog=document.createElement("nb-join-private-group"),this.joinDialog.group=this.group,document.body.appendChild(this.joinDialog)),this.joinDialog.show()}handleCreateBracketButtonClick(){this.bracketDialog.show()}handleEditGroupClick(){this.editGroup||(this.editGroup=document.createElement("nb-edit-group"),this.editGroup.group=this.group,this.editGroup.private=this.group.is_private,document.body.appendChild(this.editGroup)),this.editGroup.show()}closeDialog(e){e.target.closest("wa-dialog").hide()}memeberTemplate(){if(this.canEditGroupBracket&&MY_BRACKET_COUNT<5)return t`<nb-countdown></nb-countdown>
        <div class="wa-cluster">
          <wa-button
            class="grow"
            variant="brand"
            appearance="outlined"
            href=${this.group.new_bracket_url}
            >Create New Bracket</wa-button
          ><wa-button
            class="grow"
            variant="brand"
            appearance="outlined"
            href=${MY_BRACKETS_URL+"#group_"+this.group.id}
            >Add Existing Bracket</wa-button
          >
        </div>`;if(this.canEditGroupBracket)return t`<nb-countdown></nb-countdown
        ><wa-button
          variant="brand"
          appearance="outlined"
          href=${MY_BRACKETS_URL+"#group_"+this.group.id}
          >Add A Bracket</wa-button
        >`}nonMemberTemplate(){if(!(!CAN_EDIT_BRACKET||this.group.locked||!CURRENT_USER.id))return this.group.is_private?t`<wa-button variant="brand" @click=${this.handleJoinGroupClick}
        >Join Group</wa-button
      >`:t`<wa-button variant="brand" href=${this.group.join_url}
        >Join Group</wa-button
      >`}groupInfoTemplate(){let e=null;return this.group.is_private&&this.isMember&&(e=t`<small
        ><span class="font-semibold">Password</span> ${this.group.password}</small
      >`),t`<div class="wa-cluster">
        <small
          ><span class="font-semibold">Members</span> ${this.group.member_count}</small
        ><small
          ><span class="font-semibold">Brackets</span> ${this.brackets.length}</small
        >
        <small
          ><span class="font-semibold">Group type</span> ${this.group.is_private?"Private":"Public"}</small
        >${e}
      </div>
      ${this.group.year!==CURRENT_YEAR?t`<wa-alert open>
            You are viewing a group from ${this.group.year}</wa-alert
          >`:null}`}messageTemplate(){let e=this.groupInfoTemplate();return this.isMember?t`${e}${this.memeberTemplate()}${this.winnersTemplate()}`:t`${e}${this.nonMemberTemplate()}${this.winnersTemplate()}`}titleTemplate(){let e=t`<div class="wa-cluster">
      Invite friends
      <wa-copy-button
        value="${this.group.share_url}"
        copy-label="Copy link to join"
      >
        <wa-icon
          slot="copy-icon"
          name="share"
          library="hero"
          variant="outline"
        ></wa-icon>
      </wa-copy-button>
    </div>`,a=null;return CURRENT_USER.id===this.group.creator_id&&this.canEditGroupBracket&&(a=t`<wa-button
        variant="brand"
        appearance="plain"
        @click=${this.handleEditGroupClick}
        ><wa-icon library="hero" name="cog-6-tooth" variant="outline"
          >Edit Group</wa-icon
        ></wa-button
      >`),t`<div class="wa-split">
      <div class="wa-cluster">
        <h2>${this.group.name}</h2>
        ${a}
      </div>
      ${this.isMember&&!this.group.locked&&this.canEditGroupBracket?e:null}
    </div>`}bracketsTemplate(){return t`<nb-group-standings-grid
      .brackets=${this.brackets}
      year=${this.year}
    ></nb-group-standings-grid>`}render(){return this.year?t`${super.render()}`:null}};customElements.define("nb-group-standings",ge);
//# sourceMappingURL=nb.DKPMP5B5.mjs.map
