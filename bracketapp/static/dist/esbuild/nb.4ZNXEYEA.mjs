import{d as t,h as x,j as ye,k as f}from"./chunk-XGX4NMMB.mjs";import{a as _e,b as $e,c as Ee,d as w}from"./chunk-YTZDMNTQ.mjs";import{a as u,c as Ce,d as xe,e as Se,f as S,i as Re}from"./chunk-XLOY4CXF.mjs";function Ne(i,e){return()=>i.querySelector(e)}function Ge(i,e){return()=>i.querySelectorAll(e)}var n=class extends ye{constructor(){super();let{queries:e}=this.constructor;if(e)for(let[a,r]of Object.entries(e))r.all?Object.defineProperty(this,a,{get:Ge(this,r.all)}):Object.defineProperty(this,a,{get:Ne(this,r)})}createRenderRoot(){return this}};var R=class extends n{render(){return t`<wa-card
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
    >`}};customElements.define("nb-add-team",R);var B=class extends n{render(){return t`<wa-card>
      <div class="wa-stack">
        <wa-button variant="brand" href=${UPDATE_ALL_POINTS_URL}
          >Update all points</wa-button
        >
        <wa-button appearance="outlined" href=${CORRECT_BRACKET_PAGE}
          >Go to correct bracket page</wa-button
        >
        <wa-button appearance="outlined" href=${DEFAULT_BRACKET_PAGE}
          >Go to default bracket page</wa-button
        >
        <wa-button appearance="outlined" href=${FLUSH_CACHE_URL}
          >Flush the cache</wa-button
        >
      </div>
    </wa-card>`}};customElements.define("nb-admin",B);var N=class extends n{static properties={archivedYears:{type:Array}};imgTemplate(e){if(!e)return null;let a=STATIC_FILE_MAP[e.team.icon_path];return t`<img
      class="w-[75px] h-[75px]"
      src=${a}
      alt=${e.team.name}
    />`}yearsTemplate(){return this.archivedYears.map(e=>t`<wa-card class="w-full"
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
    </wa-card>`}};customElements.define("nb-archive-years",N);var G=class extends n{static properties={message:{type:String},category:{type:String}};connectedCallback(){super.connectedCallback(),this.removeSelfTask=new u(()=>this.removeSelf(),5e3,{finalizeBeforeUnload:!0}),this.removeSelfTask.arm()}removeSelf(){this.remove()}render(){return t`<wa-callout variant=${this.category}>
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
    </wa-callout>`}};customElements.define("nb-alert",G);var I=class extends n{static properties={messages:{type:Array,converter:(e,a)=>!e||!e.length||e==="[]"?[]:[...e.match(/(?<=\()[^()]+(?=\))/g)].map(r=>r.replaceAll("'","").split(", "))}};render(){return this.messages.length?t`<div id="alerts" class="wa-stack items-center">
      ${this.messages.map(([e,...a])=>t`<nb-alert
            category=${e}
            message=${a.join(", ")}
          ></nb-alert>`)}
    </div>`:null}};customElements.define("nb-alert-manager",I);var P=class extends n{static properties={theme:{type:Object}};static queries={dropdown:"wa-dropdown",icon:"#icon",themeItems:{all:"wa-dropdown-item"}};get currentThemeIcon(){return this.theme?.mode==="dark"?this.darkIcon:this.lightIcon}connectedCallback(){super.connectedCallback(),this.init()}async init(){await this.updateComplete,this.theme=THEME,this.setupThemeWatcher()}setupThemeWatcher(){this.mutationObserver=new MutationObserver(e=>this.handleThemeChange(e)),this.mutationObserver.observe(document.documentElement,{attributes:!0}),this.handleThemeChange()}handleThemeChange(){for(let e of this.themeItems)e.checked=e.id===this.theme.mode;this.icon.name=this.getThemeIconName(),window.localStorage.setItem("theme.mode",this.theme.mode)}setTheme(e){this.theme.mode=e;for(let a of this.themeItems)a.checked=a.id===this.theme.mode;this.icon.name=this.getThemeIconName(),console.log("setting theme mode",this.theme.mode)}handleThemeSelect(e){let a=e.detail.item;this.setTheme(a.value)}getThemeIconName(){return this.theme?.mode==="dark"?"moon-outline":"sunny-outline"}render(){return t`<wa-dropdown @wa-select=${this.handleThemeSelect}>
      <wa-button
        id="theme-button"
        variant="brand"
        appearance="plain"
        slot="trigger"
      >
        <div class="wa-cluster flex-nowrap">
          <wa-icon
            auto-width
            id="icon"
            library="ion"
            name=${this.getThemeIconName()}
          ></wa-icon>
          <wa-icon
            auto-width
            library="ion"
            name="chevron-down-outline"
          ></wa-icon>
        </div>
      </wa-button>

      <wa-dropdown-item id="light" type="checkbox" value="light"
        >Light</wa-dropdown-item
      >
      <wa-dropdown-item id="dark" type="checkbox" value="dark"
        >Dark</wa-dropdown-item
      >
    </wa-dropdown>`}};customElements.define("nb-theme-selector",P);var _=new Date("2025-03-27T18:00:00.000Z"),A=class extends n{static properties={bracketsOpen:Boolean};get countdown(){let e=_-Date.now(),a=e/1e3,r=new Date(e),s=Math.floor(a/(3600*24)),o=r.toISOString().substring(11,13),l=r.toISOString().substring(14,16),m=r.toISOString().substring(17,19);return{days:s,hours:o,mins:l,secs:m}}connectedCallback(){super.connectedCallback(),!this.maybeDestroy()&&(this.intervalID=setInterval(()=>{this.maybeRequestUpdate()},1e3))}maybeRequestUpdate(){this.maybeDestroy()||this.requestUpdate()}destroy(){clearInterval(this.intervalID),this.remove()}maybeDestroy(){let e=_-Date.now();return!CAN_EDIT_BRACKET||e<0?(this.destroy(),!0):!1}timeCardTemplate(e,a){return t`<wa-card class="default-bg default-border"
      ><div class="wa-stack items-center gap-(--wa-space-xs)">
        <h5>${e}</h5>
        <span>${a+(e==1?"":"s")}</span>
      </div></wa-card
    >`}countdownTemplate(){let{days:e,hours:a,mins:r,secs:s}=this.countdown;return t`<div class="wa-cluster">
      ${[[e,"day"],[a,"hour"],[r,"minute"],[s,"second"]].map(o=>this.timeCardTemplate(...o))}
    </div>`}render(){return t`<wa-card class="default-bg default-border"
      ><div class="wa-stack items-center">
        <h4>
          Brackets will close on
          <wa-format-date
            date=${_}
            month="long"
            day="numeric"
          ></wa-format-date>
          at
          <wa-format-date
            date=${_}
            hour="numeric"
            minute="numeric"
          ></wa-format-date>
        </h4>
        ${this.countdownTemplate()}
      </div></wa-card
    >`}};customElements.define("nb-countdown",A);var Ie=[["Mich.","Michigan"],["St.","State"],["U.","University"],["UConn","Connecticut"]];function h(i){for(let[e,a]of Ie)if(i.endsWith(e))return i.replace(e,a);return i}var U=class{constructor(){this.cache=new Map,this.gamesRequestPromise=null,this.gamesJsonPromise=null,this.standingsRequestPromise=null,this.standingsJsonPromise=null,this.confStandingsRequestPromise=null,this.confStandingsJsonPromise=null}async getGames(){if(this.cache.has(`${CURRENT_YEAR}.games`)&&this.cache.get(`${CURRENT_YEAR}.games`),!this.gamesRequestPromise){let r=STATIC_FILE_MAP[`/static/json/${CURRENT_YEAR}.games.json`];this.gamesRequestPromise=fetch(r)}let e=await this.gamesRequestPromise;this.gamesJsonPromise||(this.gamesJsonPromise=e.json());let a=await this.gamesJsonPromise;return this.cache.set(`${CURRENT_YEAR}.games`,a),a}async getStandings(){if(this.cache.has(`${CURRENT_YEAR}.standings`)&&this.cache.get(`${CURRENT_YEAR}.standings`),!this.standingsRequestPromise){let s=STATIC_FILE_MAP[`/static/json/${CURRENT_YEAR}.standings.json`];this.standingsRequestPromise=fetch(s)}if(!this.confStandingsRequestPromise){let s=STATIC_FILE_MAP[`/static/json/${CURRENT_YEAR}.conference.json`];this.confStandingsRequestPromise=fetch(s)}let[e,a]=await Promise.all([this.standingsRequestPromise,this.confStandingsRequestPromise]);this.standingsJsonPromise||(this.standingsJsonPromise=e.json()),this.confStandingsJsonPromise||(this.confStandingsJsonPromise=a.json());let r=await Promise.all([this.standingsJsonPromise,this.confStandingsJsonPromise]);return this.cache.set(`${CURRENT_YEAR}.standings`,r),r}getRecordFromGames(e,a){let r=[0,0,0];for(let s of a)s.tie?r[2]+=1:s.winner===e?r[0]+=1:r[1]+=1;return r}async getHeadToHeadGames(e,a){let r=h(e.name),s=h(a.name),o=await this.getGames(),l=[];for(let m of o)(m.home===r&&m.away===s||m.home===s&&m.away===r)&&l.push(m);return[this.getRecordFromGames(r,l),this.getRecordFromGames(s,l)]}async getHomeAwayNeutralRecord(e){let a=h(e.name),r=await this.getGames(),s=[],o=[],l=[];for(let m of r)m.home===a?m.neutralSite?l.push(m):s.push(m):m.away===a&&(m.neutralSite?l.push(m):o.push(m));return[this.getRecordFromGames(a,s),this.getRecordFromGames(a,o),this.getRecordFromGames(a,l)]}async getStandingsForTeam(e){let a=h(e.name),[r,s]=await this.getStandings(),o=r[a],l=s[a];return!o||!l?(console.log("NO STATS FOR",e,a),null):{...o,...l}}async getNotableWins(e){let a=h(e.name),r=await this.getGames(),s=[];for(let o of r)(o.home===a||o.away===a)&&o.winner===a&&o.notable&&s.push(o);return s}async getNPIRank(e){let a=h(e.name),[r,s]=await this.getStandings();return r[a].rank}},d=new U;var O=class extends n{static properties={topTeam:{type:Object},topTeamStats:{type:Object},bottomTeam:{type:Object},bottomTeamStats:{type:Object},game:{type:String}};requestUpdate(e,a){return e==="topTeam"&&(this.topTeamStats=null,this.requestTopTeamStats()),e==="bottomTeam"&&(this.bottomTeamStats=null,this.requestBottomTeamStats()),(e==="topTeamStats"||e==="bottomTeamStats")&&this.topTeamStats&&this.bottomTeamStats&&this.requestHeadToHeadStats(),super.requestUpdate(e,a)}async requestHeadToHeadStats(){if(!(this.topTeam?.team&&this.bottomTeam?.team&&this.topTeamStats&&this.bottomTeamStats))return;let[e,a]=await d.getHeadToHeadGames(this.topTeam.team,this.bottomTeam.team);this.topTeamStats.h2h=e,this.bottomTeamStats.h2h=a,this.requestUpdate()}statsTemplate(e,a=!1){let r=a?"self-end text-right":"";return t`<small class="${r}">NPI: ${e.rank}</small>
      <small class="${r}"
        >${e.conference.name}: ${e.conference.rank}</small
      >
      ${e.notableWins?.length?t`<small
            class="${r} text-(length:--wa-font-size-2xs)!"
            >Notable wins:
            ${e.notableWins.map(s=>s.notable).join(", ")}</small
          >`:null}
      <wa-divider class="my-(--wa-space-xs)"></wa-divider>
      <div class="flex justify-between text-(length:--wa-font-size-2xs)!">
        <small>Home</small><span>${e.records[0].join("-")}</span>
      </div>
      <div class="flex justify-between text-(length:--wa-font-size-2xs)!">
        <small>Away</small><span>${e.records[1].join("-")}</span>
      </div>
      <div class="flex justify-between text-(length:--wa-font-size-2xs)!">
        <small>Neutral</small><span>${e.records[2].join("-")}</span>
      </div>

      <wa-divider class="my-(--wa-space-xs)"></wa-divider>
      ${e.h2h?t`<div
            class="flex justify-between text-(length:--wa-font-size-2xs)!"
          >
            <small>H2H</small><span>${e.h2h.join("-")}</span>
          </div>`:null}`}async requestTopTeamStats(){if(!this.topTeam.team){this.topTeamStats=null;return}let e=await d.getStandingsForTeam(this.topTeam.team),a=await d.getHomeAwayNeutralRecord(this.topTeam.team);this.topTeamStats={...e,records:a}}async requestBottomTeamStats(){if(!this.bottomTeam.team){this.bottomTeamStats=null;return}let e=await d.getStandingsForTeam(this.bottomTeam.team),a=await d.getHomeAwayNeutralRecord(this.bottomTeam.team);this.bottomTeamStats={...e,records:a}}topTeamStatsTemplate(){return this.topTeamStats?t`<div class="grow flex flex-col w-1/2 min-w-[7rem]">
      <div>${this.topTeam.team.name}</div>
      <div class="flex flex-col w-full">
        ${this.statsTemplate(this.topTeamStats)}
      </div>
    </div>`:null}bottomTeamStatsTemplate(){return this.bottomTeamStats?t`<div class="grow flex flex-col items-end w-1/2 min-w-[7rem]">
      <div>${this.bottomTeam.team.name}</div>
      <div class="flex flex-col w-full">
        ${this.statsTemplate(this.bottomTeamStats,!0)}
      </div>
    </div>`:null}render(){return this.topTeam?.team&&this.bottomTeam?.team&&this.topTeamStats&&this.bottomTeamStats?t`<wa-button
        id="${this.game}-info"
        class="info-button"
        appearance="plain"
        size="small"
        variant="brand"
        pill
        ><wa-icon
          auto-width
          library="hero"
          name="information-circle"
          variant="outline"
        ></wa-icon
      ></wa-button>
      <wa-popover placement="top" for="${this.game}-info">
        <div class="wa-stack gap-(--wa-space-2xs)">
          <div class="flex justify-between">
            ${this.topTeamStatsTemplate()}
            <div><wa-divider orientation="vertical"></wa-divider></div>
            ${this.bottomTeamStatsTemplate()}
          </div>
          <div class="text-center text-[10px]">
            Data from
            <a href="https://www.collegehockeynews.com/" target="_blank"
              >collegehockeynews.com</a
            >
          </div>
        </div>
      </wa-popover>`:null}};customElements.define("nb-matchup-info",O);var k=class extends n{static properties={winnerTop:{type:Object},winnerBottom:{type:Object},winner_id:{type:String},game:{type:String},teams:{type:Object}};static queries={topInputEl:"#top > input",bottomInputEl:"#bottom > input"};get winnerTopName(){let e=this.winnerTop;return this.teamTemplate(e)}get winnerBottomName(){let e=this.winnerBottom;return this.teamTemplate(e)}teamTemplate(e){return e?.team?`${e.rank} ${e.team.name}`:""}getImageElement(e){if(!e?.team)return null;let a=STATIC_FILE_MAP[e.team.icon_path];return t`<img
      class="team-img"
      src="${a}"
      alt="${e.team.name}"
    />`}topInput(){return t`<input
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
    />`}popoverTemplate(){return this.winnerTop?.team&&this.winnerBottom?.team?t`<wa-button
          id="${this.game}-info"
          class="info-button"
          appearance="plain"
          size="small"
          variant="brand"
          pill
          ><wa-icon library="ion" name="information-circle-outline"></wa-icon
        ></wa-button>
        <wa-popover placement="top" for="${this.game}-info">
          <div class="wa-cluster">
            <div class="flex flex-col">
              <span>${this.winnerTop.team.name}</span>
              <small>Rank: 1</small>
              <small>B1G rank: 1</small>
              <small>Record: 11-1</small>
              <span></span>
            </div>
            <div class="flex flex-col items-end">
              <span>${this.winnerBottom.team.name}</span>
              <small>Rank: 4</small>
              <small>B1G rank: 3</small>
              <small>Record: 8-4</small>
              <span></span>
            </div>
          </div>
        </wa-popover>`:null}render(){return t`<div class="flex items-center relative">
      <wa-card class="matchup default-bg default-border">
        <label class="nb-team" id="top">
          ${this.topInput()} ${this.getImageElement(this.winnerTop)}
          <span>${this.winnerTopName}</span>
        </label>
        <label class="nb-team" id="bottom">
          ${this.bottomInput()} ${this.getImageElement(this.winnerBottom)}
          <span>${this.winnerBottomName}</span>
        </label>
      </wa-card>
      <nb-matchup-info
        .topTeam=${this.winnerTop}
        .bottomTeam=${this.winnerBottom}
        game=${this.game}
      ></nb-matchup-info>
    </div>`}};customElements.define("nb-edit-matchup",k);var j=class extends n{static properties={default:{type:Object},teams:{type:Array}};teamOptions(e,a){let r=this.teams.map(s=>t`<option
          value=${s.id}
          ?selected=${this.default.games[`game${e}`][a]?.team.id===s.id}
        >
          ${s.name}
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
    </form>`}};customElements.define("nb-default-bracket",j);var v=class extends n{matchupTagName="nb-edit-matchup";static properties={bracket:{type:Object},default:{type:Object},type:{type:String}};static queries={formEl:"form",nbEditMatchupEls:{all:"nb-edit-matchup"},saveButtonEl:"#save-button",winnerGoals:"#winner_goals",loserGoals:"#loser_goals"};get teams(){if(this._teams)return this._teams;let e={};for(let a of Object.values(this.default.games)){let r=a.top_team,s=a.bottom_team;e[r.id]=r,e[s.id]=s}return this._teams=e}get matchupsSorted(){return[...this.nbEditMatchupEls].sort((e,a)=>Number(e.id.replace("game","")-Number(a.id.replace("game",""))))}async getUpdateComplete(){await super.getUpdateComplete();for(let e of this.nbEditMatchupEls)await e.updateComplete}async firstUpdated(){super.firstUpdated(),await this.updateComplete,this.initialFormData=new FormData(this.formEl),this.maybeToggleSaveButton()}getNextMatchup(e){let a="null";switch(e){case"game1top":case"game1bottom":case"game2top":case"game2bottom":a="game9";break;case"game3top":case"game3bottom":case"game4top":case"game4bottom":a="game10";break;case"game5top":case"game5bottom":case"game6top":case"game6bottom":a="game11";break;case"game7top":case"game7bottom":case"game8top":case"game8bottom":a="game12";break;case"game9top":case"game9bottom":case"game10top":case"game10bottom":a="game13";break;case"game11top":case"game11bottom":case"game12top":case"game12bottom":a="game14";break;case"game13top":case"game13bottom":case"game14top":case"game14bottom":a="game15";break}return this.querySelector(`#${a}`)}getImageUrl(e){if(!e)return"";let a=e.substring(2);return a=a.replaceAll(" ",""),a=a.replaceAll(".",""),`/static/images/${a}.svg`}matchupTemplate(e){return t`<nb-edit-matchup
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
          id="winner_goals"
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
          id="loser_goals"
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
      >${e}`}setNext(e){let{id:a,value:r}=e,s=this.getNextMatchup(a);if(!s)return;let o=e.closest(this.matchupTagName);o.winner_id=e.value;let l=this.teams[r];if(a.match(/\d/g).join("")%2===1){s.winner_id===s.winnerTop?.id&&(s.winner_id="");let b=s.winnerTop;s.winnerTop=l,s.topInputEl.checked=!1,this.maybeClearInputs(s.id+"top",b)}else{s.winner_id===s.winnerBottom?.id&&(s.winner_id="");let b=s.winnerBottom;s.winnerBottom=l,s.bottomInputEl.checked=!1,this.maybeClearInputs(s.id+"bottom",b)}}maybeClearInputs(e,a){let r=this.getNextMatchup(e);if(!r)return;e.match(/\d/g).join("")%2===1?(a?.id===r.winnerTop?.id&&(r.winnerTop={},r.topInputEl.checked=!1),this.maybeClearInputs(r.id+"top",a)):(a?.id===r.winnerBottom?.id&&(r.winnerBottom={},r.bottomInputEl.checked=!1),this.maybeClearInputs(r.id+"bottom",a))}handleClick(e){let a=e.target;if(a instanceof HTMLInputElement){if(!a.value){e.preventDefault();return}this.setNext(a)}}async handleInput(){await this.updateComplete,this.maybeToggleSaveButton()}handleSubmit(){this.saveButtonEl.disabled=!0,this.saveButtonEl.loading=!0}maybeToggleSaveButton(){let a=[...new FormData(this.formEl).entries()];if(a.length<18){this.saveButtonEl.disabled=!1;return}this.saveButtonEl.disabled=JSON.stringify([...this.initialFormData.entries()])===JSON.stringify(a)}resetForm(){this.formEl.reset()}getRandomInt(e,a,r=1){return Math.floor(Math.random()*r*(a-e)+e)}async randomSeed(){for(let e of this.matchupsSorted)Math.round(Math.random())===0?e.topInputEl.click():e.bottomInputEl.click(),await new Promise(r=>setTimeout(r,10));this.winnerGoals.value=this.getRandomInt(1,10,3/4),this.loserGoals.value=this.getRandomInt(0,this.winnerGoals.value),await this.winnerGoals.updateComplete,await this.loserGoals.updateComplete,this.winnerGoals.checkValidity(),this.loserGoals.checkValidity()}async topSeed(){for(let e of this.matchupsSorted){let a=await d.getNPIRank(e.winnerTop.team),r=await d.getNPIRank(e.winnerBottom.team);a<r?e.topInputEl.click():e.bottomInputEl.click(),await new Promise(s=>setTimeout(s,10))}}async simulate(){function e(r,s){let l=Math.abs(s-r);return 1/(1+Math.exp(-l/10))}function a(r,s){let o=e(r,s);return Math.random()<o?r:s}for(let r of this.matchupsSorted){let s=await d.getNPIRank(r.winnerTop.team),o=await d.getNPIRank(r.winnerBottom.team);a(s,o)===s?r.topInputEl.click():r.bottomInputEl.click(),await new Promise(m=>setTimeout(m,10))}}autoFillTemplate(){return t`<div class="wa-cluster">
      <wa-button appearance="filled-outlined" @click=${this.randomSeed}
        >Pick randomly</wa-button
      ><wa-button appearance="filled-outlined" @click=${this.topSeed}
        >Pick top seed</wa-button
      >
      <wa-button appearance="filled-outlined" @click=${this.simulate}
        >Simulate picks</wa-button
      >
    </div>`}topCardTemplate(){return t` <div class="flex justify-center">
      <wa-card>
        <div class="wa-stack">
          <h2>${this.bracket?.year} Bracket Challenge</h2>
          <wa-input
            name="name"
            maxlength="60"
            label="Bracket name"
            placeholder="My bracket name"
            value=${this.bracket.name}
            class="w-full"
            required=""
          ></wa-input>

          ${this.autoFillTemplate()}

          <div class="wa-cluster">${this.buttonsTemplate()}</div>
        </div>
      </wa-card>
    </div>`}render(){return t`<div class="w-full">
      <form
        action=${this.bracket.form_url+location.search}
        method="POST"
        @input=${this.handleInput}
        @submit=${this.handleSubmit}
        @wa-invalid=${e=>console.log(e)}
      >
        <input name="old_name" value=${this.bracket.name} hidden />
        <div class="wa-stack">
          ${this.topCardTemplate()}
          <wa-scroller
            ><div class="bracket-grid-edit" @click=${this.handleClick}>
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

              <div class="round-final-middle flex flex-col">
                <wa-card class="round-details">Championship</wa-card
                >${this.championTemplate()}
              </div>

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
            </div></wa-scroller
          >
        </div>
      </form>
    </div>`}};customElements.define("nb-edit-bracket",v);var L=class i extends k{static properties={topTeamGoals:{type:Number,converter:i.goalConverter},bottomTeamGoals:{type:Number,converter:i.goalConverter}};static goalConverter(e,a){return e.length?Number(e):null}teamTemplate(e){return e?.team?e.team.name:""}topScoreInput(){return t`<input
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
      <div class="nb-team flex justify-between" id="top">
        <label class="flex items-center gap-(--wa-space-2xs)"
          >${this.topInput()}${this.winnerTopName}</label
        >
        ${this.topScoreInput()}
      </div>
      <div class="nb-team flex justify-between" id="bottom">
        <label class="flex items-center gap-(--wa-space-2xs)"
          >${this.bottomInput()}${this.winnerBottomName}</label
        >
        ${this.bottomScoreInput()}
      </div>
    </wa-card>`}};customElements.define("nb-edit-correct-matchup",L);var q=class extends v{matchupTagName="nb-edit-correct-matchup";maybeToggleSaveButton(){}matchupTemplate(e){return t`<nb-edit-correct-matchup
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
    </div>`}};customElements.define("nb-edit-correct-bracket",q);var D=class extends n{static properties={email:{type:String}};connectedCallback(){super.connectedCallback();let a=new URLSearchParams(location.search).get("next");if(a)localStorage.setItem("next",a);else{let r=localStorage.getItem("next");if(r&&!location.search.length){let s=new URL(location.href);s.searchParams.set("next",r),history.replaceState(null,"",s)}}}nativeTemplate(){return t`<wa-card>
      <form id="login-form" method="POST"></form>
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
            value=${f(this.email)}
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
      <form id="login-form" method="POST"></form>
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
          value=${f(this.email)}
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
    </wa-card>`}render(){return this.waTmeplate()}};customElements.define("nb-login",D);import Pe from"https://cdn.jsdelivr.net/npm/profanity-cleaner@0.0.3/+esm";var $=class extends n{get currentColorScheme(){return(document.documentElement.classList.contains("wa-dark")?"dark":"light")==="dark"?$e:_e}get gridTheme(){let e=4*window.THEME.rounding,a=window.THEME.theme==="shoelace"?"var(--wa-color-neutral-20)":"var(--wa-color-neutral-10)";return Ee.withPart(this.currentColorScheme).withParams({borderRadius:e,wrapperBorderRadius:e,borderWidth:1,headerRowBorder:!0,rowBorder:!0,backgroundColor:"var(--wa-color-surface-super-raised)",borderColor:"light-dark(var(--wa-color-neutral-90), var(--wa-color-neutral-30))",cellTextColor:"var(--wa-color-text-normal)",headerTextColor:"var(--wa-color-text-normal)",fontFamily:"inherit"})}get baseGridOptions(){return{defaultColDef:{resizable:!1},domLayout:"autoHeight",suppressCellFocus:!0,suppressMovableColumns:!0,theme:this.gridTheme}}setupThemeWatcher(){this.mutationObserver=new MutationObserver(()=>{this.dataGrid?.setGridOption("theme",this.gridTheme)}),this.mutationObserver.observe(document.documentElement,{attributes:!0})}render(){return t`<div id="grid" style="--ag-grid-size: 4px;"></div>`}};var E=class extends n{static properties={bracket:{type:Object}};get bracketName(){return this.bracket.safeName??this.bracket.name}getImageElement(e){if(!e)return null;let a=STATIC_FILE_MAP[e.team.icon_path];return t`<img
      class="standings-img"
      src="${a}"
      alt="${e.team.name}"
    />`}groupsTemplate(){return null}clickableTemplate(){return t`<a
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
    </div>`}};customElements.define("nb-bracket-column",E);var F=class extends E{groupsTemplate(){return this.bracket.group_brackets.length?t`<nb-group-bracket-details
      size="small"
      .groupBrackets=${this.bracket.group_brackets}
    ></nb-group-bracket-details>`:null}nameTemplate(){return t`<span
      class="standings-bracket-name underline _text-(length:--wa-font-size-larger)"
      >${this.bracketName}</span
    >`}render(){return this.bracket.id===-1?t`<wa-button href="${CREATE_BRACKET_LINK}" variant="brand"
        >Create new bracket</wa-button
      >`:super.render()}};customElements.define("nb-my-bracket-column",F);var p=class extends ${#e="agGridPaginationPageSize";static properties={brackets:{type:Object},year:{type:Number},headerName:{type:String}};constructor(){super(),this.headerName="Brackets",this.useSafeName=!0}static queries={standingsGridEl:"#standingsGrid"};get storedPageSize(){let e=parseInt(window.localStorage.getItem(this.#e));return isNaN(e)?25:e}get defaultBracketColumnWidth(){return 256}get gridOptions(){return{...super.baseGridOptions,rowHeight:50,autoSizeStrategy:{type:"fitGridWidth",columnLimits:[{colId:"rank",minWidth:65,maxWidth:65},{colId:"name",minWidth:this.defaultBracketColumnWidth,flex:1},{colId:"actions",minWidth:208},{colId:"points",minWidth:75,maxWidth:75},{colId:"max_points",minWidth:75,maxWidth:75},{colId:"round_one_points",minWidth:57,maxWidth:57},{colId:"round_two_points",minWidth:57,maxWidth:57},{colId:"round_three_points",minWidth:57,maxWidth:57},{colId:"round_four_points",minWidth:57,maxWidth:57}]},defaultColDef:{resizable:!1}}}cleanBracketNames(){for(let e of this.brackets)e.safeName=Pe.clean(e.name,{keepFirstAndLastChar:!0})}sortBrackets(){this.brackets=this.brackets.sort((e,a)=>e.name.localeCompare(a.name)),CAN_EDIT_BRACKET&&CURRENT_YEAR===this.year||this.brackets.sort((e,a)=>e.rank==="-"?-1:a.rank==="-"?1:e.rank-a.rank)}firstUpdated(){this.init()}async init(){await this.updateComplete,this.cleanBracketNames(),this.sortBrackets(),this.createDataGrid(),this.setupThemeWatcher()}getImageElement(e){return e?`<img
      class="standings-img"
      src="${STATIC_FILE_MAP[e.team.icon_path]}"
      alt="${e.team.name}"
    />`:null}createDataGrid(){if(!this.brackets.length)return;let e=[];e.push({field:"rank"},{field:"name",headerName:this.headerName,autoHeight:!0,valueGetter:r=>r.data.safeName,cellRenderer:r=>{let s=document.createElement("nb-bracket-column");return s.bracket=r.data,s}},{field:"points"},{field:"max_points",headerName:"Max"}),(this.year<CURRENT_YEAR||!CAN_EDIT_BRACKET)&&e.push({field:"round_one_points",headerName:"R1"},{field:"round_two_points",headerName:"R2"},{field:"round_three_points",headerName:"R3"},{field:"round_four_points",headerName:"R4"});let a={columnDefs:e,rowData:this.brackets,...this.gridOptions,pagination:!0,paginationPageSize:this.storedPageSize,paginationPageSizeSelector:[25,50,75,100],onPaginationChanged:r=>this.handlePaginationChangedEvent(r)};this.dataGrid=w(this.standingsGridEl,a)}handlePaginationChangedEvent(e){e.newPageSize&&window.localStorage.setItem(this.#e,this.dataGrid.paginationGetPageSize())}render(){return this.brackets.length?t`<div id="standingsGrid" style="--ag-grid-size: 4px;"></div>`:t`<div class="flex justify-center">No brackets yet</div>`}};customElements.define("nb-standings-grid",p);var g=class extends n{static properties={brackets:{type:Object},winners:{type:Object},year:{type:Number}};get numWinners(){return this.winners.length}connectedCallback(){super.connectedCallback(),this.requestContent()}async requestContent(){let a=await(await fetch(LEADERBOARD_CONTENT_URL,{credentials:"include",mode:"no-cors"})).json(),{standings:r,winners:s,year:o}=a;this.brackets=r,this.winners=s,this.year=o}winnersTemplate(){let e="Winner"+(this.numWinners>1?"s":""),a=this.winners.flatMap(r=>[t`<b>${r.name}</b> <small>(${r.user.username})</small>`,t`, `]).slice(0,-1);return t`<wa-card
      ><div class="wa-stack gap-(--wa-space-s) justify-center items-center">
        <wa-icon
          style="color:var(--color-amber-500);font-size:var(--wa-font-size-3xl);"
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
    </wa-card>`:null}};customElements.define("nb-standings",g);var c=class extends n{inputEvent=!1;submitEvent=!0;static queries={dialog:"wa-dialog",submitButton:"wa-button[type='submit']"};show(){customElements.whenDefined("wa-dialog").then(()=>{this.updateComplete.then(()=>{this.dialog.updateComplete.then(()=>{this.dialog.open=!0})})})}hide(){this.dialog.open=!1}handleDialogShow(e){e.target===this.dialog&&this.querySelector("wa-input")?.focus()}handleWaHide(e){e.target===this.dialog&&e.explicitOriginalTarget.localName==="wa-option"&&e.preventDefault()}handleInput(){}handleSubmit(){this.submitButton.disabled=!0,this.submitButton.loading=!0}lableTemplate(){return null}contentTemplate(){return null}footerTemplate(){return null}cancelButtonTemplate(){return t`<wa-button
      class="grow"
      data-dialog="close"
      variant="neutral"
      appearance="outlined"
      >Cancel</wa-button
    >`}render(){return t`<wa-dialog
      @input=${this.inputEvent?this.handleInput:x}
      @submit=${this.submitEvent?this.handleSubmit:x}
    >
      <div slot="label">${this.lableTemplate()}</div>
      ${this.contentTemplate()}
      <div class="wa-cluster w-full" slot="footer">
        ${this.footerTemplate()}
      </div>
    </wa-dialog>`}};var Y=class extends c{static properties={bracket:{type:Object}};lableTemplate(){return t`Delete bracket named "${this.bracket.name}"?`}contentTemplate(){return t`<form
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
      >`}};customElements.define("nb-delete-bracket",Y);var W=class extends p{sortBrackets(){for(let e of this.brackets)e.rank=e.group_bracket?.group_rank;super.sortBrackets()}};customElements.define("nb-group-standings-grid",W);var H=class extends n{static properties={bracket:{type:Object}};render(){return t`<div class="wa-cluster">
      <img
        class="standings-img"
        src=${STATIC_FILE_MAP[this.bracket.winner_team.team.icon_path]}
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
    </div>`}};customElements.define("nb-bracket-card-content",H);var z=class extends n{static properties={bracket:{type:Object}};render(){return t`<wa-card style="--spacing:var(--wa-space-s);"
      ><nb-bracket-card-content
        .bracket=${this.bracket}
      ></nb-bracket-card-content
    ></wa-card>`}};customElements.define("nb-bracket-card",z);var V=class extends n{static properties={group:{type:Object}};render(){return t`<div class="wa-cluster">
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
            ><span class="font-semibold">Brackets</span> ${this.group.bracket_count}</small
          >
          <small
            ><span class="font-semibold">Group type</span> ${this.group.is_private?"Private":"Public"}</small
          >
        </div>
      </div>
    </div>`}};customElements.define("nb-group-card-content",V);var J=class extends n{static properties={group:{type:Object}};render(){return t`<wa-card style="--spacing:var(--wa-space-s);"
      ><nb-group-card-content .group=${this.group}></nb-group-card-content
    ></wa-card>`}};customElements.define("nb-group-card",J);var T=class extends n{static properties={label:{type:String},value:{type:String},name:{type:String},icon:{type:String},form:{type:String}};static queries={input:"input"};iconTemplate(){return this.icon?t`<wa-icon name=${this.icon}></wa-icon>`:null}labelTemplate(){return t`<span>${this.label}</span>`}render(){return t`<wa-card class="nb-radio-item">
      <label class="wa-cluster w-full">
        <input
          type="radio"
          name=${this.name}
          value=${this.value}
          form=${this.form}
          required=""
        />${this.iconTemplate()}${this.labelTemplate()}
      </label>
    </wa-card>`}};customElements.define("nb-radio-item",T);var K=class extends T{static properties={bracket:{type:Object}};connectedCallback(){super.connectedCallback(),this.value=this.bracket.id}iconTemplate(){return null}labelTemplate(){return t`<nb-bracket-card-content
      .bracket=${this.bracket}
    ></nb-bracket-card-content>`}};customElements.define("nb-bracket-radio-item",K);var Q=class extends T{static properties={group:{type:Object}};connectedCallback(){super.connectedCallback(),this.value=this.group.id}iconTemplate(){return null}labelTemplate(){return t`<nb-group-card-content
      .group=${this.group}
    ></nb-group-card-content>`}};customElements.define("nb-group-radio-item",Q);var X=class extends c{static properties={myBrackets:{type:Object},group:{type:Object}};get joinedBrackets(){return this.group.brackets.filter(e=>e.user_id===CURRENT_USER.id)}get bracketsCanJoin(){return this.myBrackets.filter(e=>!this.joinedBrackets.find(a=>a.id===e.id))}groupTemplate(){return t`<div class="wa-stack">
      <p>Joining group:</p>
      <nb-group-card .group=${this.group}></nb-group-card>
    </div> `}bracketTemplate(e){return t`<nb-bracket-radio-item
      name="bracket_sqid"
      form="join-group-form"
      .bracket=${e}
    ></nb-bracket-radio-item>`}bracketsTemplate(){let e=this.bracketsCanJoin.map(r=>this.bracketTemplate(r));e.length===0&&(e=t`<div class="flex justify-center">
        <small class="wa-color-text-quiet">No available brackets to add</small>
      </div>`);let a=null;return MY_BRACKET_COUNT<5&&(a=t`<wa-button
        class="w-full"
        appearance="outlined"
        variant="brand"
        href=${CREATE_BRACKET_LINK+`?group_sqid=${this.group.id}`}
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
      ?disabled=${this.bracketsCanJoin.length<1}
      >Add Bracket</wa-button
    >`}};customElements.define("nb-group-add-bracket",X);var Z=class extends c{static properties={bracket:{type:Object},group:{type:Object}};lableTemplate(){return t`Remove Bracket?`}contentTemplate(){return t`<form
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
      >`}};customElements.define("nb-delete-group-bracket",Z);var ee=class extends n{static properties={bracket:{type:Object},group:{type:Object}};handleRemoveFromGroupClick(){this.removeFromGroupModal||(this.removeFromGroupModal=document.createElement("nb-delete-group-bracket"),this.removeFromGroupModal.bracket=this.bracket,this.removeFromGroupModal.group=this.group,document.body.appendChild(this.removeFromGroupModal)),this.removeFromGroupModal.show()}render(){return t`<div class="flex w-full h-full">
      <wa-button
        size="small"
        variant="danger"
        appearance="outlined"
        @click=${this.handleRemoveFromGroupClick}
        >Remove From Group</wa-button
      >
    </div>`}};customElements.define("nb-my-group-bracket-actions",ee);var te=class extends p{useSafeName=!1;static properties={group:{type:Object},brackets:{type:Object}};get canCreateBracket(){return CAN_EDIT_BRACKET&&this.year===CURRENT_YEAR&&this.brackets.length>5}get canEditThisYearsBrackets(){return CAN_EDIT_BRACKET&&this.year===CURRENT_YEAR}async updateData(e,a,r){this.brackets=e,this.group=a,this.year=r,this.dataGrid&&(this.dataGrid.destroy(),this.createDataGrid())}cleanBracketNames(){}get defaultBracketColumnWidth(){return 250}createDataGrid(){if(!this.brackets.length)return;for(let r of this.brackets)r.rank=r.group_bracket?.group_rank;let e=[];this.canEditThisYearsBrackets||e.push({field:"rank"}),e.push({field:"name",headerName:this.headerName,autoHeight:!0,cellRenderer:r=>{let s=document.createElement("nb-my-bracket-column");return s.bracket=r.data,s}}),this.canEditThisYearsBrackets?e.push({field:"actions",cellRenderer:r=>{let s=document.createElement("nb-my-group-bracket-actions");return s.bracket=r.data,s.group=this.group,s},cellClass:"flex! items-center justify-content-start"}):e.push({field:"points"},{field:"max_points",headerName:"Max"},{field:"round_one_points",headerName:"R1"},{field:"round_two_points",headerName:"R2"},{field:"round_three_points",headerName:"R3"},{field:"round_four_points",headerName:"R4"});let a={columnDefs:e,rowData:this.brackets,...this.gridOptions};this.dataGrid=w(this.standingsGridEl,a)}};customElements.define("nb-my-group-brackets-grid",te);var ae=class extends n{static properties={group:{type:Object},myBrackets:{type:Object},shouldShowBrackets:{type:Boolean},year:{type:Number}};static queries={card:"wa-card",bracketsGrid:"nb-my-group-brackets-grid"};constructor(){super(),this.shouldShowBrackets=window.location.hash==="#groups"}get canCreateBracket(){return CAN_EDIT_BRACKET&&this.year===CURRENT_YEAR&&this.brackets.length>5}get canEditThisYearsBrackets(){return CAN_EDIT_BRACKET&&this.year===CURRENT_YEAR}async updateData(e,a,r){this.myBrackets=e,this.group=a,this.year=r,this.bracketsGrid?.updateData(this.group.brackets,this.group,this.year)}connectedCallback(){super.connectedCallback(),document.addEventListener("wa-tab-show",this)}handleEvent(e){e.type==="wa-tab-show"&&e.detail.name==="groups"&&(this.shouldShowBrackets=!0,document.removeEventListener("wa-tab-show",this))}addABracket(){this.handleAddBracketClick()}handleAddBracketClick(){this.addBracketModal||(this.addBracketModal=document.createElement("nb-group-add-bracket"),this.addBracketModal.group=this.group,this.addBracketModal.myBrackets=this.myBrackets,document.body.appendChild(this.addBracketModal)),this.addBracketModal.show()}bracketsTemplate(){return this.shouldShowBrackets?t`<nb-my-group-brackets-grid
      class="w-full"
      headerName="My Brackets"
      .group=${this.group}
      .brackets=${this.group.brackets}
      year=${this.year}
    ></nb-my-group-brackets-grid>`:null}buttonsTemplate(){return this.canEditThisYearsBrackets?t`<div class="wa-cluster">
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
    </wa-card>`}};customElements.define("nb-my-brackets-group-standings",ae);var re=class extends c{static properties={bracket:{type:Object},groups:{type:Object}};get joinedGroups(){return this.bracket.group_brackets.map(e=>e.group)}get groupsCanJoin(){return this.groups.filter(e=>!this.joinedGroups.find(a=>a.id===e.id))}lableTemplate(){return t`Add Bracket To Group`}bracketTemplate(){return t`<div class="wa-stack">
      <p>Joining bracket:</p>
      <nb-bracket-card .bracket=${this.bracket}></nb-bracket-card>
    </div> `}groupTemplate(e){return t`<nb-group-radio-item
      name="group_sqid"
      icon="trophy"
      .group=${e}
      form="join-group-form"
    ></nb-group-radio-item>`}groupsTemplate(){let e=this.groupsCanJoin.map(a=>this.groupTemplate(a));return e.length===0&&(e=t`<div class="flex justify-center">
        <small class="wa-color-text-quiet">No available groups to join</small>
      </div>`),t`<div class="wa-stack gap-(--wa-space-s)">
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
      ?disabled=${this.groupsCanJoin.length<1}
      >Add Bracket</wa-button
    >`}};customElements.define("nb-add-bracket-to-group",re);var se=class extends n{static properties={groupBrackets:{type:Array},size:{type:String}};groupBracketTemplate(e){return t`<wa-card class="group-bracket-card ${this.size} default-border"
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
    >`:null}};customElements.define("nb-group-bracket-details",se);var ie=class extends n{static properties={bracket:{type:Object},groups:{type:Object}};handleJoinGroupClick(){this.joinGroupModal||(this.joinGroupModal=document.createElement("nb-add-bracket-to-group"),this.joinGroupModal.bracket=this.bracket,this.joinGroupModal.groups=this.groups,document.body.appendChild(this.joinGroupModal)),this.joinGroupModal.show()}handleDeleteClick(){this.deleteBracketModal||(this.deleteBracketModal=document.createElement("nb-delete-bracket"),this.deleteBracketModal.bracket=this.bracket,document.body.appendChild(this.deleteBracketModal)),this.deleteBracketModal.show()}render(){return t`<div class="wa-cluster py-(--wa-space-2xs)">
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
    </div>`}};customElements.define("nb-my-bracket-actions",ie);var ne=class extends p{static properties={groups:{type:Object}};constructor(){super(),this.useSafeName=!1}get canCreateBracket(){return CAN_EDIT_BRACKET&&this.year===CURRENT_YEAR&&this.brackets.length>5}get canEditThisYearsBrackets(){return CAN_EDIT_BRACKET&&this.year===CURRENT_YEAR}updateData(e,a,r){this.dataGrid.destroy(),this.brackets=e,this.groups=a,this.year=r,this.createDataGrid()}cleanBracketNames(){}createDataGrid(){if(!this.brackets.length)return;let e=[];this.canEditThisYearsBrackets||e.push({field:"rank"}),e.push({field:"name",headerName:this.headerName,autoHeight:!0,cellRenderer:r=>{let s=document.createElement("nb-my-bracket-column");return s.bracket=r.data,s}}),this.canEditThisYearsBrackets?e.push({field:"actions",autoHeight:!0,cellRenderer:r=>{let s=document.createElement("nb-my-bracket-actions");return s.bracket=r.data,s.groups=this.groups,s},cellClass:"flex! items-center justify-content-start"}):e.push({field:"points"},{field:"max_points",headerName:"Max"},{field:"round_one_points",headerName:"R1"},{field:"round_two_points",headerName:"R2"},{field:"round_three_points",headerName:"R3"},{field:"round_four_points",headerName:"R4"});let a={columnDefs:e,rowData:this.brackets,...this.gridOptions};this.dataGrid=w(this.standingsGridEl,a)}};customElements.define("nb-my-brackets-grid",ne);var oe=class extends n{static properties={results:{type:Object}};static queries={input:"wa-input",popup:"wa-popup",dropdown:"wa-dropdown",popover:"wa-popover"};constructor(){super(),this.results=[]}connectedCallback(){super.connectedCallback(),document.addEventListener("focusin",this.handleFocusIn.bind(this))}async search(){let e=this.input.value;if(!e){this.popup.active=!1;return}this.popup.active=!0;let a=await fetch(SEARCH_URL+"?"+new URLSearchParams({name:e}));this.results=await a.json(),this.lastSearchValue=e}handleInputEvent(e){if(!this.input.value){this.results=[];return}this.input.value.length<3||(this.searchTask=new u(async()=>{await this.search()},300),this.searchTask.arm())}handleFocusIn(e){this.contains(e.target)?this.popup.active=!0:this.popup.active=!1}groupTemplate(e){return t`<a class="clickable-group" href=${e.url}>
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
    >`}};customElements.define("nb-search-groups",oe);var le=class extends g{cache={};updatedBrackets=!0;updatedGroups=!0;static properties={groups:{type:Object},shouldShowBrackets:{type:Boolean}};static queries={tabGroup:"wa-tab-group",yearSelect:"#year-select",bracketGrid:"nb-my-brackets-grid",groupGrids:{all:"nb-my-brackets-group-standings"}};constructor(){super(),this.url=new URL(window.location),this.initialTabPanel=this.url.hash.includes("group")?"groups":"my-brackets"}get canCreateBracket(){return CAN_EDIT_BRACKET&&this.year===CURRENT_YEAR&&this.brackets.length>5}get canEditThisYearsBrackets(){return CAN_EDIT_BRACKET&&this.year===CURRENT_YEAR}connectedCallback(){super.connectedCallback(),document.addEventListener("wa-tab-show",this),window.addEventListener("hashchange",this)}handleEvent(e){switch(e.type){case"wa-tab-show":{this.handleTabShow(e);break}case"hashchange":{this.handleHashChange(e);break}}}handleTabShow(e){let a=e.detail.name;a==="my-brackets"&&(this.shouldShowBrackets=!0,this.maybeUpdateBracketsGrid()),a==="groups"?(window.location.hash="groups",this.maybeUpdateGroupsGrids()):window.location.hash=""}handleHashChange(e){new URL(e.newURL).hash==="#groups"?this.tabGroup.active="groups":this.tabGroup.active="my-brackets"}async requestContentForYear(e=null){return(await fetch(MY_BRACKETS_CONTENT_URL+(e?`/${e}`:""))).json()}async requestContent(){let e=await this.requestContentForYear(),{brackets:a,groups:r,year:s,years:o}=e;this.brackets=a,this.groups=r,this.year=s,this.years=o,this.cache[s]=e}maybeUpdateBracketsGrid(){!this.updatedBrackets&&this.bracketGrid&&window.location.hash===""&&(this.bracketGrid?.updateData(this.brackets,this.groups,this.year),this.updatedBrackets=!0)}maybeUpdateGroupsGrids(){!this.updatedGroups&&this.groupGrids&&window.location.hash==="#groups"&&([...this.groupGrids].map(e=>e.updateData(this.brackets,e.group,this.year)),this.updatedGroups=!0)}async handleYearChange(){this.updatedBrackets=!1,this.updatedGroups=!1;let e=this.yearSelect.value,a;this.cache[e]?a=this.cache[e]:(a=await this.requestContentForYear(e),this.cache[e]=a);let{brackets:r,groups:s,year:o}=a;this.brackets=r,this.groups=s,this.year=o,this.requestUpdate(),await this.updateComplete,this.maybeUpdateBracketsGrid(),this.maybeUpdateGroupsGrids()}async updated(){!this.openedToGroups&&this.tabGroup&&this.initialTabPanel==="groups"&&(await this.tabGroup.updateComplete,this.tabGroup.active="groups",this.openedToGroups=!0,this.url.hash.includes("group_")&&document.querySelector(this.url.hash).addABracket())}handleCreateGroupClick(){document.dispatchEvent(new CustomEvent("CreateNewGroup"))}yearsDropdown(){return!this.years||this.years?.length<2?this.year:t`<wa-select
      id="year-select"
      class="w-5"
      @input=${this.handleYearChange}
    >
      ${this.years.map(e=>t`<wa-option value=${e} ?selected=${this.year===e}
            >${e}</wa-option
          >`)}
    </wa-select>`}titleTemplate(){return t`<div>
      <h2 class="wa-cluster m-0">My Brackets ${this.yearsDropdown()}</h2>
      ${this.subtitleTemplate()}
    </div>`}subtitleTemplate(){return this.year>=CURRENT_YEAR?t`<small class="text-(--wa-color-text-quiet)"
        >You created ${this.brackets.length}/5 brackets</small
      >`:null}previewYearMessage(){return t`<wa-callout variant="brand"
      >You are viewing brackets from a previous year.</wa-callout
    >`}messageTemplate(){let e=null;return e=t`<nb-countdown></nb-countdown>`,this.year!==CURRENT_YEAR&&(e=t`${e}${this.previewYearMessage()}`),e}newBracketButtonTemplate(){return this.canCreateBracket?t`<wa-button
        variant="brand"
        appearance="outlined"
        href=${CREATE_BRACKET_LINK}
        >Create Bracket</wa-button
      >`:null}bracketsTemplate(){if(!(this.initialTabPanel==="groups"&&!this.shouldShowBrackets))return this.bracketsTemplateCache||(this.bracketsTemplateCache={}),this.bracketsTemplateCache[this.year]=t`<div class="wa-stack">
      ${this.newBracketButtonTemplate()}
      <nb-my-brackets-grid
        headerName="My Brackets"
        .brackets=${this.brackets}
        .groups=${this.groups}
        year=${this.year}
      ></nb-my-brackets-grid>
    </div>`,this.bracketsTemplateCache[this.year]}newGroupButtonTemplate(){return this.canEditThisYearsBrackets?t`<wa-button
        class="w-full"
        variant="brand"
        appearance="outlined"
        @click=${this.handleCreateGroupClick}
        >Create Group</wa-button
      >`:null}searchGroupsTemplate(){return this.canEditThisYearsBrackets?t`<nb-search-groups></nb-search-groups>`:null}groupCardsTemplate(){return this.groups.length?this.groups.map(e=>t`<nb-my-brackets-group-standings
            id="group_${e.id}"
            .group=${e}
            .myBrackets=${this.brackets}
            year=${this.year}
          ></nb-my-brackets-group-standings>`):this.canEditThisYearsBrackets?t`<div class="flex justify-center">
        <h4>No groups yet</h4>
      </div>`:t`<div class="flex justify-center">
      <h4>No groups for this year</h4>
    </div>`}groupSearchAndButtonTemplate(){return this.canEditThisYearsBrackets?t`<div class="wa-cluster">
        <div class="grow">${this.newGroupButtonTemplate()}</div>
        <div class="grow">${this.searchGroupsTemplate()}</div>
      </div>`:null}groupsTemplate(){return t`<div class="wa-stack">
      ${this.groupSearchAndButtonTemplate()}${this.groupCardsTemplate()}
    </div>`}render(){return this.year?t`<wa-card>
      <div class="wa-stack">
        ${this.titleTemplate()} ${this.messageTemplate()}
        <wa-tab-group @wa-tab-show=${this.handleTabShow}>
          <wa-tab slot="nav" panel="my-brackets">My Brackets</wa-tab>
          <wa-tab slot="nav" panel="groups">Groups</wa-tab>

          <wa-tab-panel name="my-brackets"
            >${this.bracketsTemplate()}</wa-tab-panel
          >
          <wa-tab-panel name="groups">${this.groupsTemplate()}</wa-tab-panel>
        </wa-tab-group>
      </div>
    </wa-card>`:null}};customElements.define("nb-my-brackets",le);var me=class extends c{static properties={private:{type:Boolean}};static queries={...c.queries,isPrivateCheckbox:"#is_private",password:"#password",form:"form"};constructor(){super(),this.private=!0}connectedCallback(){super.connectedCallback(),document.addEventListener("CreateNewGroup",this)}handleEvent(e){e.type==="CreateNewGroup"&&this.dialog.show()}handlePrivateChange(){this.private=!this.private}lableTemplate(){return t`Create A Group`}contentTemplate(){return t`<form
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
    >`}};customElements.define("nb-create-group",me);var ce=class extends n{static properties={email:{type:String}};static queries={};render(){return t`<wa-card>
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
    </wa-card>`}};customElements.define("nb-password-reset-request",ce);var Be="Passwords do not match.",de=class extends n{static properties={passwordsMatch:{type:Boolean}};static queries={password1:"#password1",password2:"#password2"};checkPasswordsMatch(){let e=this.password1.value,a=this.password2.value;e===a?(this.passwordsMatch=!0,this.password2.helpText=""):a.length<e.length?(this.passwordsMatch=!1,e.substring(0,a.length)===a?this.password2.helpText="":this.password2.helpText=Be):(this.passwordsMatch=!1,this.password2.helpText=Be)}render(){return t`<wa-card @input=${this.checkPasswordsMatch}>
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
    </wa-card>`}};customElements.define("nb-reset-password",de);function C(i){return i.charAt(0).toUpperCase()+i.slice(1)}var pe=class extends n{static properties={theme:{type:Object}};static queries={modeSelect:"#mode",primaryColorSelect:"#primary-color",backgroundColorSelect:"#background-color",colorContrastSelect:"#color-contrast",colorPaletteSelect:"#color-palette",roundingSlider:"#theme-rounding",spacingSlider:"#theme-spacing",borderWidthSlider:"#theme-border-width",roundingInput:"#theme-rounding-input",spacingInput:"#theme-spacing-input",borderWidthInput:"#theme-border-width-input",bgNumberInputs:{all:".box-radio"},selects:{all:"wa-select"}};connectedCallback(){super.connectedCallback(),this.init()}async init(){this.theme=THEME;let e=this.theme.backgroundColor?.split("-");this.bgNumber=e?.at(-1)?Number(e.at(-1)):600,document.addEventListener("transitionstart",this),this.styleOberserver=new MutationObserver(()=>this.handleCSSChange()),this.styleOberserver.observe(document.documentElement,{attributeFilter:["style"]}),await this.updateComplete;let a=[...this.selects].filter(r=>r.value&&r.hasAttribute("with-clear"));for(let r of a)r.hasInteracted=!0}handleModeChange(){let e=this.modeSelect.value;console.log(e),this.theme.mode=e}handlePrimaryColorChange(){let e=this.primaryColorSelect.value;console.log(e),this.theme.primaryColor=e}handleVariantChange(e){let a=e.target,r=a.name;this.theme.setVariantColor(r,a.value)}handleBackgroundColorChange(){let e=this.backgroundColorSelect.value;console.log(e),this.theme.backgroundColor=`--color-${e}-${this.bgNumber}`,this.requestUpdate()}handleBackgroundNumberChange(){for(let e of this.bgNumberInputs)if(e.checked){this.bgNumber=Number(e.value);break}this.handleBackgroundColorChange()}handleColorPaletteChange(){let e=this.colorPaletteSelect.value;console.log(e),this.theme.colorPalette=e}handleColorContrastChange(){let e=this.colorContrastSelect.value;console.log(e),this.theme.colorContrast=e}handleRoundingChange(e){let a=e.target.value;this.theme.rounding=a}decrementRounding(){this.theme.rounding=Number(this.roundingInput.value)-.1}incrementRounding(){this.theme.rounding=Number(this.roundingInput.value)+.1}resetRounding(){this.theme.rounding=null}handleSpacingChange(e){let a=e.target.value;this.theme.spacing=a}decrementSpacing(){this.theme.spacing=Number(this.spacingInput.value)-.0125}incrementSpacing(){this.theme.spacing=Number(this.spacingInput.value)+.0125}resetSpacing(){this.theme.spacing=null}handleBorderWidthChange(e){let a=e.target.value;this.theme.borderWidth=a}decrementBorderWidth(){this.theme.borderWidth=Number(this.borderWidthInput.value)-.5}incrementBorderWidth(){this.theme.borderWidth=Number(this.borderWidthInput.value)+.5}resetBorderWidth(){this.theme.borderWidth=null}handleEvent(e){e.type==="transitionstart"&&this.handleCSSChange(e)}handleCSSChange(){this.requestUpdate()}roundingTemplate(){return t`<div class="wa-split">
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
    </div>`}bgNumberRadioTemplate(){if(!this.backgroundColorSelect){this.updateComplete.then(()=>this.requestUpdate());return}let e=this.backgroundColorSelect.value?.toLowerCase();if(S.includes(e))return Se.map(a=>t`<input
          @input=${this.handleBackgroundNumberChange}
          class="box-radio bg-(--color-${e}-${a})"
          style="background-color: var(--color-${e}-${a});"
          type="radio"
          name="color-number"
          ?checked=${this.bgNumber===a}
          value=${a}
        />`)}backgroundColorTemplate(){return t`<div class="wa-stack">
      <wa-select
        with-clear
        id="background-color"
        label="Background Color"
        @input=${this.handleBackgroundColorChange}
        >${S.map(e=>t`<wa-option
              ?selected=${this.theme.backgroundColor?.includes(e)}
              value=${e}
              >${C(e)}
            </wa-option>`)}</wa-select
      >
      <div class="wa-cluster wa-nativ">${this.bgNumberRadioTemplate()}</div>
    </div>`}variantsTemplate(){return xe.map(e=>t`<wa-select
          with-clear
          id="${e}-color"
          name=${e}
          label="${C(e)} Color"
          @input=${this.handleVariantChange}
          >${Ce.map(a=>t`<wa-option
                ?selected=${this.theme.getVariantColor(e)===a}
                value=${a}
                ><div class="wa-split">
                  ${C(a)}
                  <div
                    class="grow h-1"
                    style="background-color: var(--color-${a}-600);"
                  ></div></div
              ></wa-option>`)}</wa-select
        >`)}render(){return this.theme?t`<wa-card>
      <div class="wa-stack">
        <div class="wa-stack">
          <h2>Preferences</h2>

          <wa-select
            with-clear
            id="color-palette"
            label="Color Palette"
            @input=${this.handleColorPaletteChange}
            >${Re.map(e=>t`<wa-option
                  ?selected=${this.theme.colorPalette===e}
                  value=${e}
                  >${C(e)}</wa-option
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
            <h4>Advanced Theming Options</h4>

            <div class="wa-grid" style="--min-column-size: 20rem;">
              <div class="wa-stack">
                ${this.backgroundColorTemplate()}

                <wa-divider></wa-divider>

                ${this.variantsTemplate()}
              </div>

              <div class="wa-stack gap-(--wa-space-l)">
                ${this.roundingTemplate()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </wa-card>`:null}};customElements.define("nb-preferences",pe);var Ae="Email taken. Please choose a different email or login.",Ue="Username taken. Please choose a different username.",y=class extends n{static properties={email:{type:String},emailValid:{type:Boolean},usernameValid:{type:Boolean}};static queries={emailInput:"#email",usernameInput:"#username",submitButton:"#submitButtn"};async checkEmailUnique(e){let a=await fetch(EMAIL_UNIQUE_URL+"?"+new URLSearchParams({email:e}));return a=await a.json(),a}async checkUsernameUnique(e){let a=await fetch(USERNAME_UNIQUE_URL+"?"+new URLSearchParams({username:e}));return a=await a.json(),a}async handleEmailInput(){this.emailTask||(this.emailTask=new u(async()=>{let e=this.emailInput.value,a=await this.checkEmailUnique(e);console.log("email is unique",a.isUnique),a.isUnique?(this.emailInput.hint="",this.emailValid=!0):(this.emailInput.hint=Ae,this.emailValid=!1)},300)),this.emailTask.arm()}async handleUsernameInput(){this.usernameTask||(this.usernameTask=new u(async()=>{let e=this.usernameInput.value,a=await this.checkUsernameUnique(e);console.log("username is unique",a.isUnique),a.isUnique?(this.usernameInput.hint="",this.usernameValid=!0):(this.usernameInput.hint=Ue,this.usernameValid=!1)},300)),this.usernameTask.arm()}render(){return t`<wa-card>
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
    </wa-card>`}};customElements.define("nb-signup",y);var ue=class extends y{static properties={username:{type:String}};async handleEmailInput(){if(this.emailInput.value===this.email){this.emailInput.helpText="",this.emailValid=!1;return}super.handleEmailInput()}async handleUsernameInput(){if(this.usernameInput.value===this.username){this.usernameInput.helpText="",this.usernameValid=!1;return}super.handleUsernameInput()}render(){return t`<wa-card>
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
    </wa-card>`}};customElements.define("nb-profile",ue);var he=class extends n{static properties={correct:{type:Object},default:{type:Object},correctTop:{type:Object},correctBottom:{type:Object},winnerTop:{type:Object},winnerBottom:{type:Object},type:{type:String}};static queries={topInputEl:"#top > input",bottomInputEl:"#bottom > input"};get correctWinnerName(){return this.correct.winner_team.team.name}get defaultTopTeamName(){let e=this.default.top_team;return this.teamTemplate(e)}get defaultBottomTeamName(){let e=this.default.bottom_team;return this.teamTemplate(e)}get correctTopName(){let e=this.correctTop;return this.teamTemplate(e)}get correctBottomName(){let e=this.correctBottom;return this.teamTemplate(e)}get winnerTopName(){return this.winnerTop.team.name}get winnerBottomName(){return this.winnerBottom.team.name}teamTemplate(e){return e?`${e.rank} ${e.team.name}`:""}getImageElement(e){if(!e)return null;let a=STATIC_FILE_MAP[e.team.icon_path];return t`<img
      class="team-img"
      src="${a}"
      alt="${e.team.name}"
    />`}topIconTemplate(){return this.correctTop?t`<wa-icon
        auto-width
        library="hero"
        variant="16-solid"
        name="${this.correctTop?.id===this.winnerTop.id?"check-circle":"x-circle"}"
      ></wa-icon>`:null}bottomIconTemplate(){return this.correctBottom?t`<wa-icon
        auto-width
        library="hero"
        variant="16-solid"
        name="${this.correctBottom?.id===this.winnerBottom.id?"check-circle":"x-circle"}"
      ></wa-icon>`:null}topPickTemplate(){return this.winnerTop?t`<div class="flex justify-between">
      <div class="nb-team user-pick">
        ${this.topIconTemplate()}<span class="team-name"
          >${this.winnerTopName}</span
        >
      </div>
    </div>`:null}bottomPickTemplate(){return this.winnerBottom?t`<div class="nb-team user-pick">
      ${this.bottomIconTemplate()}<span class="team-name"
        >${this.winnerBottomName}</span
      >
    </div>`:null}combinedPickTemplate(){if(this.type==="default"){let e=this.winnerTop.team.id===this.default.top_team.team.id?this.default.bottom_team.team:this.default.top_team.team;return t`<div class="nb-team user-pick text-[10px]">
        Pick:
        <span class="team-name">${this.winnerTop.team.short_name}</span> over
        <span class="team-name">${e.short_name}</span>
      </div>`}return t`<div class="nb-team user-pick text-[10px]">
      Pick:
      <span class="team-name">${this.winnerTop.team.short_name}</span> over
      <span class="team-name">${this.winnerBottom.team.short_name}</span>
    </div>`}gameInfoTemplate(){let e=new Date(Date.parse(this.correct.start_time)),a=new Date,r=null;if(a<e){let s=new Intl.DateTimeFormat(void 0,{timeStyle:"long",timeZone:"America/New_York"});r=new Intl.DateTimeFormat(void 0,{month:"short",day:"numeric"}).format(e)+" "+s.format(e).replace(":00","")}else if(this.correct.winner_id){if(r="Final",this.correct.overtime){let s="";this.correct.number_overtimes>1&&(s=this.correct.number_overtimes),r+=` ${s}OT`}}else r="Live";return t`<div class="text-[10px] text-right user-pick">${r}</div>`}getTopLoserTeamClass(){let e=this.type==="default"?this.default.top_team_id:this.correctTop?.id;return this.correct.winner_id&&this.correct.winner_id!==e?"loser-team":""}getBottomLoserTeamClass(){let e=this.type==="default"?this.default.bottom_team_id:this.correctBottom?.id;return this.correct.winner_id&&this.correct.winner_id!==e?"loser-team":""}defaultMatchupTemplate(){return t`${this.gameInfoTemplate()}
      <div class="nb-team ${this.getTopLoserTeamClass()}">
        ${this.getImageElement(this.default.top_team)}
        <span class="team-name">${this.defaultTopTeamName}</span
        ><span class="ms-auto">${this.correct?.top_team_goals}</span>
      </div>
      <div class="nb-team ${this.getBottomLoserTeamClass()}">
        ${this.getImageElement(this.default.bottom_team)}
        <span class="team-name">${this.defaultBottomTeamName}</span
        ><span class="ms-auto">${this.correct?.bottom_team_goals}</span>
      </div>`}matchupTemplate(){return t`${this.gameInfoTemplate()}${this.topPickTemplate()}
      <div class="nb-team ${this.getTopLoserTeamClass()}">
        ${this.getImageElement(this.correctTop)}
        <span class="team-name">${this.correctTopName}</span
        ><span class="ms-auto">${this.correct?.top_team_goals}</span>
      </div>
      <div class="nb-team ${this.getBottomLoserTeamClass()}">
        ${this.getImageElement(this.correctBottom)}
        <span class="team-name">${this.correctBottomName}</span
        ><span class="ms-auto">${this.correct?.bottom_team_goals}</span>
      </div>
      ${this.bottomPickTemplate()}`}render(){let e;return this.type==="default"?e=this.defaultMatchupTemplate():e=this.matchupTemplate(),t`<wa-card class="matchup default-bg default-border"
      ><div class="flex flex-col">${e}</div></wa-card
    >`}};customElements.define("nb-matchup",he);var ge=class extends n{static properties={points:{type:Object}};static queries={pointsCharts:"#points-chart"};async firstUpdated(){await this.updateComplete,this.initChart(),this.setupThemeWatcher()}initChart(){this.computedStyle=getComputedStyle(document.body);let e=this.computedStyle.getPropertyValue("--wa-color-success-400"),a=this.computedStyle.getPropertyValue("--wa-color-danger-400"),r=this.computedStyle.getPropertyValue("--wa-color-neutral-400"),s=this.computedStyle.getPropertyValue("--wa-panel-background-color"),o=this.computedStyle.getPropertyValue("--wa-color-neutral-950"),m={type:"doughnut",data:{labels:["Points Gained","Points Lost","Points Unplayed"],datasets:[{data:[this.points.gained,this.points.lost,this.points.unplayed],backgroundColor:[e,a,r],borderColor:s,hoverOffset:4}]},options:{plugins:{legend:{labels:{color:o}}}}},b=this.pointsCharts.getContext("2d");this.chart=new Chart(b,m)}updateColors(){let e=this.computedStyle.getPropertyValue("--wa-color-success-400"),a=this.computedStyle.getPropertyValue("--wa-color-danger-400"),r=this.computedStyle.getPropertyValue("--wa-color-neutral-400"),s=this.computedStyle.getPropertyValue("--wa-panel-background-color"),o=this.computedStyle.getPropertyValue("--wa-color-neutral-950");this.chart.data.datasets[0].backgroundColor=[e,a,r],this.chart.data.datasets[0].borderColor=s,this.chart.options.plugins.legend.labels.color=o,this.chart.update()}setupThemeWatcher(){this.mutationObserver=new MutationObserver(()=>this.updateColors()),this.mutationObserver.observe(document.documentElement,{attributes:!0})}render(){return t`<div style="width:200px;height:200px;">
      <canvas id="points-chart"></canvas>
    </div>`}};customElements.define("nb-bracket-points-chart",ge);var we=class extends n{static properties={bracket:{type:Object},correct:{type:Object},default:{type:Object},type:{type:String}};getImageElement(e,a=!1){if(!e)return null;let r=STATIC_FILE_MAP[e.team.icon_path],s=a||!this.correct.winner_id||this.correct.winner_id===e.id;return t`<img
      class="winner-img ${s?"":"greyscale"}"
      src="${r}"
      alt="${e.team.name}"
    />`}getBracketClass(){return this.type==="edit"?"bracket-grid-edit":this.type==="correct"?"cbracket-grid":this.type==="correct-edit"?"cbracket-grid-edit":"bracket-grid"}matchupTemplate(e){return e.type==="default"?t`<nb-matchup
        type="default"
        .default=${e.default}
        .correct=${e.correct}
        .winnerTop=${f(e.winnerTop)}
      ></nb-matchup>`:t`<nb-matchup
      .winnerTop=${e.winnerTop}
      .winnerBottom=${e.winnerBottom}
      .correctTop=${e.correctTop}
      .correctBottom=${e.correctBottom}
      .correct=${e.correct}
    ></nb-matchup>`}roundOneLeftTemplate(){return t`<div class="round-one">
      ${this.matchupTemplate({type:"default",default:this.default.games.game1,correct:this.correct.games.game1,winnerTop:this.bracket?.games.game1.winner_team})}
      ${this.matchupTemplate({type:"default",default:this.default.games.game2,correct:this.correct.games.game2,winnerTop:this.bracket?.games.game2.winner_team})}
      ${this.matchupTemplate({type:"default",default:this.default.games.game3,correct:this.correct.games.game3,winnerTop:this.bracket?.games.game3.winner_team})}
      ${this.matchupTemplate({type:"default",default:this.default.games.game4,correct:this.correct.games.game4,winnerTop:this.bracket?.games.game4.winner_team})}
    </div>`}roundTwoLeftTemplate(){return t`<div class="round-two">
      ${this.matchupTemplate({winnerTop:this.bracket?.games.game1.winner_team,winnerBottom:this.bracket?.games.game2.winner_team,correctTop:this.correct.games.game1.winner_team,correctBottom:this.correct.games.game2.winner_team,correct:this.correct.games.game9})}
      ${this.matchupTemplate({winnerTop:this.bracket?.games.game3.winner_team,winnerBottom:this.bracket?.games.game4.winner_team,correctTop:this.correct.games.game3.winner_team,correctBottom:this.correct.games.game4.winner_team,correct:this.correct.games.game10})}
    </div>`}roundThreeLeftTemplate(){return t`<div class="round-three">
      ${this.matchupTemplate({winnerTop:this.bracket?.games.game9.winner_team,winnerBottom:this.bracket?.games.game10.winner_team,correctTop:this.correct.games.game9.winner_team,correctBottom:this.correct.games.game10.winner_team,correct:this.correct.games.game13})}
    </div>`}correctChampionTemplate(){return this.correct.winner_team?t`<div class="flex flex-col items-center gap-(--wa-space-2xs)">
      <div class="flex gap-(--wa-space-s) items-center">
        <h4>${this.correct.year} Champion</h4>
      </div>
      ${this.getImageElement(this.correct?.winner_team)}
    </div>`:null}getChampionPickIcon(){return this.bracket?.winner_team&&this.correct.winner_team?this.correct.winner_id===this.bracket?.winner_id?t`<wa-icon
          auto-width
          library="hero"
          name="check-circle"
          variant="solid"
        ></wa-icon>`:t`<wa-icon
        auto-width
        library="hero"
        name="x-circle"
        variant="solid"
      ></wa-icon>`:null}pickedChampionTemplate(){return this.bracket?.winner_team?t`<div class="flex flex-col items-center gap-(--wa-space-2xs)">
      <span>Championship pick</span>
      <div class="flex gap-(--wa-space-s) items-center wa-heading-l">
        <span>${this.bracket.winner_team.team.name}</span
        >${this.getChampionPickIcon()}
      </div>
      ${this.getImageElement(this.bracket?.winner_team)}
    </div>`:null}predictedScoreTemplate(){return!this.bracket?.winner_goals||!this.bracket?.loser_goals?null:t`<div class="flex flex-col text-(length:--wa-font-size-s)">
      <div>Tiebreaker</div>
      <div class="flex justify-center text-(length:--wa-font-size-xs)">
        Final score: ${this.bracket?.winner_goals} -
        ${this.bracket?.loser_goals}
      </div>
    </div>`}championTemplate(){return t`<div class="round-final">
      <wa-card class="final-card">
        <div class="wa-stack">
          ${this.type==="correct"?this.correctChampionTemplate():this.pickedChampionTemplate()}
          ${this.matchupTemplate({winnerTop:this.bracket?.games.game13.winner_team,winnerBottom:this.bracket?.games.game14.winner_team,correctTop:this.correct.games.game13.winner_team,correctBottom:this.correct.games.game14.winner_team,correct:this.correct.games.game15})}
          ${this.predictedScoreTemplate()}
        </div>
      </wa-card>
    </div>`}roundThreeRightTemplate(){return t`<div class="round-three">
      ${this.matchupTemplate({winnerTop:this.bracket?.games.game11.winner_team,winnerBottom:this.bracket?.games.game12.winner_team,correctTop:this.correct.games.game11.winner_team,correctBottom:this.correct.games.game12.winner_team,correct:this.correct.games.game14})}
    </div>`}roundTwoRightTemplate(){return t`<div class="round-two">
      ${this.matchupTemplate({winnerTop:this.bracket?.games.game5.winner_team,winnerBottom:this.bracket?.games.game6.winner_team,correctTop:this.correct.games.game5.winner_team,correctBottom:this.correct.games.game6.winner_team,correct:this.correct.games.game11})}
      ${this.matchupTemplate({winnerTop:this.bracket?.games.game7.winner_team,winnerBottom:this.bracket?.games.game8.winner_team,correctTop:this.correct.games.game7.winner_team,correctBottom:this.correct.games.game8.winner_team,correct:this.correct.games.game12})}
    </div>`}roundOneRightTemplate(){return t`<div class="round-one">
      ${this.matchupTemplate({type:"default",default:this.default.games.game5,correct:this.correct.games.game5,winnerTop:this.bracket?.games.game5.winner_team})}
      ${this.matchupTemplate({type:"default",default:this.default.games.game6,correct:this.correct.games.game6,winnerTop:this.bracket?.games.game6.winner_team})}
      ${this.matchupTemplate({type:"default",default:this.default.games.game7,correct:this.correct.games.game7,winnerTop:this.bracket?.games.game7.winner_team})}
      ${this.matchupTemplate({type:"default",default:this.default.games.game8,correct:this.correct.games.game8,winnerTop:this.bracket?.games.game8.winner_team})}
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
            <div>
              <p class="bracket-details-content">
                ${this.bracket?.rank??"--"}
              </p>
              <p class="bracket-details-label">Rank</p>
            </div>
            <div><wa-divider orientation="vertical"></wa-divider></div>
            <div>
              <p class="bracket-details-content">${this.bracket?.points}</p>
              <p class="bracket-details-label">Points</p>
            </div>
            <div><wa-divider orientation="vertical"></wa-divider></div>
            <div>
              <p class="bracket-details-content">${this.bracket?.max_points}</p>
              <p class="bracket-details-label">Max points</p>
            </div>
          </div>
          <div class="flex justify-evenly">
            <div>
              <p class="bracket-details-content">
                ${this.bracket?.round_one_points??"--"} / 80
              </p>
              <p class="bracket-details-label">Round 1</p>
            </div>
            <div>
              <wa-divider class="m-0" orientation="vertical"></wa-divider>
            </div>
            <div>
              <p class="bracket-details-content">
                ${this.bracket?.round_two_points??"--"} / 80
              </p>
              <p class="bracket-details-label">Round 2</p>
            </div>
            <div>
              <wa-divider class="m-0" orientation="vertical"></wa-divider>
            </div>
            <div>
              <p class="bracket-details-content">
                ${this.bracket?.round_three_points??"--"} / 80
              </p>
              <p class="bracket-details-label">Frozen Four</p>
            </div>
            <div>
              <wa-divider class="m-0" orientation="vertical"></wa-divider>
            </div>
            <div>
              <p class="bracket-details-content">
                ${this.bracket?.round_four_points??"--"} / 80
              </p>
              <p class="bracket-details-label">Championship</p>
            </div>
          </div>
        </div>
      </div>
      ${this.groupsTemplate()}
    </div>`}topCardTemplate(){return t`<div class="flex justify-center">
      <wa-card>${this.topCardStats()}</wa-card>
    </div>`}render(){return t`<div class="w-full wa-stack">
      ${this.topCardTemplate()}

      <wa-scroller>
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
            <wa-card class="round-details">Frozen Four</wa-card>
            ${this.roundThreeLeftTemplate()}
          </div>

          <div class="round-final-middle flex flex-col">
            <wa-card class="round-details">Championship</wa-card
            >${this.championTemplate()}
          </div>

          <div class="round-three-right">
            <wa-card class="round-details">Frozen Four</wa-card>
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
      </wa-scroller>
    </div>`}};customElements.define("nb-bracket",we);var be=class extends c{static properties={group:{type:Object},controller:{type:Object}};handleHide(){this.controller.show()}lableTemplate(){return t`Delete this group?`}contentTemplate(){return t`<form
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
      >`}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.boundHandleHide=this.handleHide.bind(this),this.dialog.addEventListener("wa-hide",this.boundHandleHide)}disconnectedCallback(){super.disconnectedCallback(),this.dialog.removeEventListener("wa-hide",this.boundHandleHide)}};customElements.define("nb-delete-group",be);var fe=class extends c{inputEvent=!0;static properties={private:{type:Boolean},group:{type:Object}};static queries={...c.queries,form:"#edit-group-form",saveButton:"#save-button"};async firstUpdated(){super.firstUpdated(),await this.updateComplete,this.initialFormData=new FormData(this.form)}handlePrivateChange(){this.private=!this.private}async handleInput(){await this.updateComplete;let a=[...new FormData(this.form).entries()];this.saveButton.disabled=JSON.stringify([...this.initialFormData.entries()])===JSON.stringify(a)}handleDeleteClick(){this.deleteGroup||(this.deleteGroup=document.createElement("nb-delete-group"),this.deleteGroup.group=this.group,this.deleteGroup.controller=this,document.body.appendChild(this.deleteGroup)),this.deleteGroup.show(),this.hide()}lableTemplate(){return t`Edit Group`}contentTemplate(){return t`<form
      id="edit-group-form"
      action=${this.group.edit_url}
      method="POST"
      class="wa-native"
    >
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
      >`}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.private=this.group.is_private}};customElements.define("nb-edit-group",fe);var ke=class extends c{static properties={group:{type:Object}};lableTemplate(){return t`Join ${this.group.name}`}contentTemplate(){return t`<form
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
      >`}};customElements.define("nb-join-private-group",ke);var ve=class extends g{static properties={group:{type:Object},isMember:{type:Boolean,converter:(e,a)=>e==="True"}};static queries={bracketDialog:"#create-bracket-dialog"};get canEditGroupBracket(){return CAN_EDIT_BRACKET&&CURRENT_YEAR===this.group.year}async requestContent(){let a=await(await fetch(VIEW_GROUP_CONTENT_URL,{credentials:"include",mode:"no-cors"})).json(),{brackets:r,winners:s,group:o,is_member:l}=a;this.brackets=r,this.winners=s,this.group=o,this.year=this.group.year,this.isMember=l,!this.isMember&&location.hash==="#join-private-group"&&this.handleJoinGroupClick()}handleJoinGroupClick(){this.joinDialog||(this.joinDialog=document.createElement("nb-join-private-group"),this.joinDialog.group=this.group,document.body.appendChild(this.joinDialog)),this.joinDialog.show()}handleCreateBracketButtonClick(){this.bracketDialog.show()}handleEditGroupClick(){this.editGroup||(this.editGroup=document.createElement("nb-edit-group"),this.editGroup.group=this.group,this.editGroup.private=this.group.is_private,document.body.appendChild(this.editGroup)),this.editGroup.show()}closeDialog(e){e.target.closest("wa-dialog").hide()}memeberTemplate(){if(this.canEditGroupBracket&&MY_BRACKET_COUNT<5)return t`<nb-countdown></nb-countdown>
        <div class="wa-cluster">
          <wa-button
            class="grow"
            variant="brand"
            appearance="outlined"
            href=${this.group.create_bracket_url}
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
          ><span class="font-semibold">Brackets</span> ${this.group.bracket_count}</small
        >
        <small
          ><span class="font-semibold">Group type</span> ${this.group.is_private?"Private":"Public"}</small
        >${e}
      </div>
      ${this.group.year!==CURRENT_YEAR?t`<wa-alert open>
            You are viewing a group from ${this.group.year}</wa-alert
          >`:null}`}messageTemplate(){let e=this.groupInfoTemplate();return this.isMember?t`${e}${this.memeberTemplate()}${super.messageTemplate()}`:t`${e}${this.nonMemberTemplate()}${super.messageTemplate()}`}titleTemplate(){let e=t`<div class="wa-cluster">
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
    ></nb-group-standings-grid>`}render(){return this.year?t`${super.render()}`:null}};customElements.define("nb-group-standings",ve);var Oe="https://www.collegehockeynews.com/external/widgets/ajaxprocess/makeJSONP.php?datafile=liveScoreboardData.json&callback=",je=new Set(["login","signup","profile","preferences","password_request","password_reset"]),Le=new Set(["leaderboard","group","bracket"]),Te=class extends n{static properties={games:{type:Array}};static queries={drawer:"wa-drawer",desktopEl:"#desktop",mobileEl:"#mobile",closeButton:"#close-scoreboard"};connectedCallback(){super.connectedCallback(),this.init()}get isOpen(){return this.checkVisibility()}get isMobile(){return this.mobileEl.checkVisibility()}get isDesktop(){return this.desktopEl.checkVisibility()}async getJsonP(){let e="callback_"+Math.floor(Date.now()/6e4),a=localStorage.getItem("previousCallBack");if(a===e)this.games=JSON.parse(localStorage.getItem(a));else{let r=document.createElement("script");r.src=Oe+e,document.head.append(r),this.games=await new Promise(s=>{window[e]=o=>{localStorage.removeItem(a),localStorage.setItem("previousCallBack",e),localStorage.setItem(e,JSON.stringify(o)),s(o),r.remove()}})}}async getJson(){let r=await(await fetch("/static/json/dev/live.otgame.json")).json();this.games=r}sortGames(){this.games.sort((e,a)=>{let r=0;if(e.gamestatus.includes("Final")&&a.gamestatus.includes("Final"))r=0;else if(e.gamestatus===a.gamestatus)r=0;else if(e.gamestatus.includes("Final"))r=1;else if(a.gamestatus.includes("Final"))r=-1;else{let s=!isNaN(e.gamestatus[0]),o=!isNaN(a.gamestatus[0]);s&&!o?r=-1:!s&&o?r=1:e.gamestatus.includes("in SO")?r=-1:a.gamestatus.includes("in SO")?r=1:r=e.gamestatus.localeCompare(a.gamestatus)}return r})}shouldShowOnPage(){let a=new URL(location.href).pathname.split("/").at(1);return!CURRENT_USER?.id||je.has(a)?-1:Le.has(a)?1:0}async init(){this.button=document.getElementById("scoreboard-button");let e=this.shouldShowOnPage();if(e===-1){this.button.remove(),this.remove();return}let a=(localStorage.getItem("scoreboardState")??"open")==="open"&&e===1;if(await this.getJsonP(),this.games.length===0){this.button.remove(),this.remove();return}else this.style.removeProperty("width");this.sortGames(),this.requestUpdate(),this.button.addEventListener("click",this),this.closeButton.addEventListener("click",this),this.isMobile&&(this.button.hidden=!1),this.isDesktop&&!a&&this.hide()}handleEvent(e){e.type==="click"&&(e.target===this.button?this.isMobile?this.drawer.open=!this.drawer.open:this.show():e.target===this.closeButton&&this.hide())}show(){this.desktopEl.hidden=!1,this.button.hidden=!0,localStorage.setItem("scoreboardState","open")}hide(){this.desktopEl.hidden=!0,this.button.hidden=!1,localStorage.setItem("scoreboardState","closed")}teamTemplate(e,a){return t`<div class="flex justify-between wa-heading-m">
      <div class="flex">
        <div class="wa-body-s min-w-[4ch]">${a.npi_rank?`(${a.npi_rank})`:""}</div>
        ${e}
      </div>
      <div">${a.score}</div>
    </div>`}gameTemplate(e){let a="danger";return e.gamestatus.startsWith("Final")?a="neutral":isNaN(e.gamestatus[0])||(a="warning"),t`<div>
      ${this.teamTemplate(e.visname,e.v)} ${this.teamTemplate(e.homename,e.h)}
      <div>
        <wa-badge appearance="filled-outlined" variant=${a}
          >${e.gamestatus.includes("Per.")?"LIVE - ":""}
          ${e.gamestatus}</wa-badge
        >
      </div>
      <div class="wa-body-xs">${e.arenaname} - ${e.location}</div>
    </div>`}gamesTemplate(){return this.games?.length?this.games.map(e=>t`<wa-card>${this.gameTemplate(e)}</wa-card>`):t`<div>No games today</div>`}template(){return t`<div class="wa-stack p-(--wa-space-m)">
      <div>
        <div class="wa-desktop-only">
          <div
            class="wa-cluster top-[calc(100% - 60px)] left-[calc(100% - 80px)]"
          >
            <a
              class="wa-heading-l"
              href="https://www.collegehockeynews.com/scoreboard"
              target="_blank"
              >Live Scoreboard from CHN</a
            ><a href="https://www.collegehockeynews.com" target="_blank"
              ><img
                src="https://www.collegehockeynews.com/images/logos/chn2006-notext-50x20-trans.png"
            /></a>
            <wa-button
              class="wa-desktop-only"
              appearance="plain"
              variant="neutral"
              id="close-scoreboard"
            >
              <wa-icon
                auto-width
                class="pointer-events-none"
                label="Close"
                name="system/close-large-line"
                library="remix"
              ></wa-icon>
            </wa-button>
          </div>
        </div>
      </div>

      ${this.gamesTemplate()}

      <div class="flex justify-center gap-(--wa-space-2xs)">
        More at CHN:
        <a href="https://www.collegehockeynews.com/stats/" target="_blank"
          >Stats</a
        >
        |
        <a href="https://www.collegehockeynews.com/news/" target="_blank"
          >News</a
        >
        |
        <a href="https://www.collegehockeynews.com/ratings/" target="_blank"
          >Pairwise</a
        >
      </div>
    </div>`}render(){return t`<aside>
      <div id="desktop" class="wa-desktop-only">${this.template()}</div>
      <div id="mobile" class="wa-mobile-only">
        <wa-drawer
          ><div class="wa-mobile-only" slot="label">
            <div
              class="wa-cluster top-[calc(100% - 60px)] left-[calc(100% - 80px)]"
            >
              <a
                class="wa-heading-l"
                href="https://www.collegehockeynews.com/scoreboard"
                target="_blank"
                >Live Scoreboard from CHN</a
              ><a href="https://www.collegehockeynews.com" target="_blank"
                ><img
                  src="https://www.collegehockeynews.com/images/logos/chn2006-notext-50x20-trans.png"
              /></a>
              <wa-button
                class="wa-desktop-only"
                appearance="plain"
                variant="neutral"
                id="close-scoreboard"
              >
                <wa-icon
                  auto-width
                  class="pointer-events-none"
                  label="Close"
                  name="system/close-large-line"
                  library="remix"
                ></wa-icon>
              </wa-button>
            </div>
          </div>
          ${this.template()}</wa-drawer
        >
      </div>
    </aside>`}};customElements.define("chn-scoreboard",Te);
//# sourceMappingURL=nb.4ZNXEYEA.mjs.map
