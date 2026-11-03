import"./preload-helper-CJ-RuuQs.js";import"./controls-DmWWBdN9.js";import"./print-DZK4ggvU.js";import"./light-BZbJzKlA.js";import{a as e,c as t,d as n,i as r,l as i,n as a,o,r as s,s as c,t as l}from"./firmware-election-dJfix0mP.js";var u=720,d=8,f=8,p=92,m=232,h=124,g=[112,78],_=[49,23],v=[206,155],y=[264,198],b=2,x=2,S=42,C=e=>`${e*4}px`,w=`#ff7a1a`,T=`#a8551a`,E=(e,t=``,n=w)=>`<span d-mark="label flat" ink="${n}" class="${t}">${e}</span>`,D=(e,t,n=``)=>`<div class="col ${n}">${e}${E(t)}</div>`,O=e=>`<i d-mark="print silk" class="rule ${e}" color="${w}" path="M0 0H100V1H0Z" viewbox="0 0 100 1"></i>`,k=(e,t)=>`<i d-mark="print silk" class="hazard ${e}" color="${w}" viewbox="0 0 ${t*2} 2" path="${Array.from({length:t},(e,t)=>`M${t*2} 2L${t*2+1} 0H${t*2+2}L${t*2+1} 2Z`).join(``)}"></i>`,A=(e,t)=>`<div class="head">${E(e,`jp`)}${E(t,`en`)}${O(`under`)}</div>`,j=[...e.map(([e,t,n],r)=>{let i=t===`S`?`Senate`:`Governor`;return`<div d-lamp="annunciator" class="m-${r} race" color="amber" data-race="${e} ${i}" role="button" aria-label="${e} ${i}">${n}${t===`S`?`上院`:`知事`}<br>${e} ${t===`S`?`Sen`:`Gov`}</div>`}),...l.map(([e,t,n,r])=>`<div d-lamp="annunciator" class="t-${e}" color="${r}">${t}<br>${n}</div>`)],M=(e,t,n,r)=>D(`<div d-meter="gauge" class="g-${e}" ticks="4" minor="3" zones="${r}-${n} amber" label="${t}"><meter min="0" max="${n}" value="0"></meter></div>`,t),N={id:`election`,title:`Election watch`,note:`The operations station, seconded to election night, reading every race from civicAPI. It powers up, says what its controls do, and then on Auto watches whatever is happening. Press a lamp, or Prev and Next, to pick a race; the view keys pick what the map shows.`,era:`retro`,order:91,dark:!0,height:1856,states:{"house view":[`.view-key:nth-child(2)`],"next race":[`.k-next`]},html:`<div id="election">
  <d-device class="alarms" material="paint-panel-black" radius="4" screws wear="0.35">
    <div class="ident">
      <span d-mark="print silk" class="nerv" color="${w}">NERV</span>
      ${E(`選挙監視所`,`jp`)}
      ${E(`Election watch 03`,`en`)}
      ${k(`id-band`,12)}
    </div>
    <div class="matrix">
      ${o.map((e,t)=>`${E(e,`rowname`,T)}${j.slice(t*8,(t+1)*8).join(``)}`).join(``)}
    </div>
    <div class="clock">
      <div class="clock-head">${E(`次の締切まで`,`jp`)}${E(`Next polls close`,`en`)}</div>
      <div class="clock-body">
        <div d-readout="seven" class="timer" color="red" digits="6">--:--:--</div>
        <div class="supply">
          <div d-lamp="annunciator" class="t-demo" color="violet">演習<br>Demo</div>
          <div d-lamp="annunciator" class="t-live" color="green">自動<br>Live</div>
        </div>
        <div class="col start"><button d-key="arcade" class="k-power" color="red" aria-label="Start">起動</button>${E(`Start`)}</div>
      </div>
    </div>
  </d-device>
  <d-device class="bay" material="paint-panel-black" radius="4" wear="0.35">
    <div class="side">
      <div class="views">
        <div class="views-head">${E(`表示`,`jp`)}${E(`View`,`en`)}</div>
        <div class="view-keys">${t.map(([e,t],n)=>`<button d-key="tab lit" class="view-key" aria-pressed="${n===0}" aria-label="Show ${t}">${e}<br>${t}</button>`).join(``)}</div>
      </div>
      ${D(`<d-screen class="s-magi" kind="crt" gain="2.6" live><canvas width="${s[0]}" height="${s[1]}"></canvas></d-screen>`,`MAGI 審議`)}
    </div>
    <div class="centre">
      <div class="orders">${E(`速報`,`jp`)}<div d-readout="matrix" class="order" color="amber" scroll pitch="${b}" frame="${x}"></div></div>
      ${D(`<d-screen class="s-main" kind="crt" gain="2.6" live><canvas width="${r[0]}" height="${r[1]}"></canvas></d-screen>`,`戦術 Tactical`)}
    </div>
    <div class="side">
      <div class="gauges">${a.map(([e,t,n,r])=>`<div class="gauge">${E(`${t} ${n}`,`small`)}<div d-readout="seven" class="r-${e}" color="${r}" digits="3"></div></div>`).join(``)}</div>
      ${D(`<d-screen class="s-sync" kind="crt" gain="2.4" live><canvas width="${c[0]}" height="${c[1]}"></canvas></d-screen>`,`シンクロ Harmonics`)}
    </div>
  </d-device>
  <d-device class="desk" material="paint-panel-black" radius="4" screws wear="0.35">
    <section class="s-watch">
      <div class="watch-head">${k(`w-band`,6)}${E(`選択`,`jp`)}${E(`Pick a race`,`en`)}${k(`w-band`,6)}</div>
      <div class="watch">
        ${D(`<button d-key="flush" class="k-prev" color="red" on aria-label="Previous race">◀</button>`,`Prev`)}
        ${D(`<div d-knob="encoder" class="pick" color="amber" segments="15" material="plastic-black"><input type="range" min="0" max="${e.length-1}" step="1" value="5" aria-label="Race"></div>`,`Turn for race`)}
        ${D(`<button d-key="flush" class="k-next" color="red" on aria-label="Next race">▶</button>`,`Next`)}
        ${D(`<button d-key="lamp" class="k-auto" color="amber" material="plastic-orange" aria-label="Autopilot">自動<br>Auto</button>`,`Autopilot`)}
      </div>
    </section>
    ${O(`split`)}
    <section class="s-seats">
      ${A(`議席`,`Seats`)}
      <div class="row">${M(`hd`,`House D`,240,218)}${M(`hr`,`House R`,240,218)}${M(`sd`,`Sen D`,60,51)}${M(`sr`,`Sen R`,60,51)}</div>
    </section>
    ${O(`split`)}
    <section class="s-left">
      ${A(`残り`,`Uncalled`)}
      <div class="readouts">
        ${D(`<div d-readout="seven" class="r-left-s" color="amber" digits="3">  35</div>`,`Senate seats`)}
        ${D(`<div d-readout="seven" class="r-left-h" color="amber" digits="3"> 435</div>`,`House seats`)}
      </div>
    </section>
    ${O(`split`)}
    <section class="s-count">
      ${A(`開票`,`Count`)}
      <div class="readouts">
        ${D(`<div d-readout="seven" class="r-in" color="green" digits="3">  --</div>`,`Counted %`)}
        ${D(`<div d-readout="seven" class="r-margin" color="amber" digits="3"> --.-</div>`,`Margin pts`)}
        ${D(`<div d-meter="bargraph" class="b-in" segments="16" color="green"><meter min="0" max="1" value="0"></meter></div>`,`Counted`)}
      </div>
    </section>
    ${O(`split`)}
    <section class="s-wires">
      ${A(`報道`,`Wires`)}
      <d-screen class="s-news" kind="crt" gain="2.4" live><canvas width="${i[0]}" height="${i[1]}"></canvas></d-screen>
    </section>
  </d-device>
</div>`,css:`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Noto+Sans+JP:wght@700&family=Noto+Serif:wdth,wght@62.5..100,700..900&family=Shippori+Mincho+B1:wght@800&display=swap');
#election { width: ${C(u)}; display: grid; gap: ${C(f)}; }
#election d-device { padding: ${C(d)}; box-sizing: border-box; font: 600 ${C(5)} / 1.05 'Barlow Condensed', 'Noto Sans JP', sans-serif; letter-spacing: .04em; text-transform: uppercase; }
#election .col { display: grid; gap: ${C(2)}; justify-items: center; align-content: end; }
#election .jp { font-family: 'Noto Sans JP', sans-serif; font-weight: 700; letter-spacing: .1em; }
#election .small { font-size: ${C(4.6)}; }
#election .rule { display: block; width: 100%; height: ${C(.7)}; }

#election .alarms { height: ${C(p)}; display: flex; align-items: center; gap: ${C(8)}; }
#election .ident { display: grid; gap: ${C(1.5)}; align-self: stretch; align-content: center; width: ${C(50)}; }
#election .nerv { font: 900 ${C(19)} / 1 'Noto Serif', serif; font-stretch: 62.5%; letter-spacing: 0; }
#election .ident .jp { font-size: ${C(6)}; }
#election .ident .en { font-size: ${C(4.6)}; }
#election .id-band { display: block; width: 100%; height: ${C(4)}; margin-top: ${C(2)}; }
#election .matrix { display: grid; grid-template-columns: auto repeat(8, ${C(_[0])}); grid-auto-rows: ${C(_[1])}; gap: ${C(2)}; align-items: center; }
#election .rowname { justify-self: end; font-size: ${C(4.6)}; }
#election [d-lamp~="annunciator"] { display: grid; place-items: center; text-align: center; font-size: ${C(5.2)}; line-height: 1.1; letter-spacing: .02em; }
#election .race { font-size: ${C(4.4)} !important; letter-spacing: 0 !important; cursor: pointer; }
#election .clock { margin-left: auto; display: grid; gap: ${C(2)}; }
#election .clock-head { display: flex; gap: ${C(3)}; align-items: baseline; }
#election .clock-head .jp { font-size: ${C(6)}; }
#election .clock-body { display: flex; gap: ${C(3)}; }
#election .timer { width: ${C(100)}; height: ${C(46)}; }
#election .supply { display: grid; gap: ${C(3)}; }
#election .k-power { width: ${C(40)}; height: ${C(40)}; font: 700 ${C(8)} / 1 'Noto Sans JP', sans-serif; }
#election .supply [d-lamp] { width: ${C(36)}; height: ${C(21.5)}; font-size: ${C(4.4)}; }

#election .bay { height: ${C(m)}; padding-block: ${C(6)} !important; display: flex; justify-content: space-between; align-items: end; }
#election .side { display: grid; gap: ${C(4)}; align-content: end; }
#election .views { display: grid; gap: ${C(2.5)}; height: ${C(48)}; align-content: end; }
#election .views-head { display: flex; gap: ${C(3)}; align-items: baseline; }
#election .views-head .jp { font-size: ${C(6)}; }
#election .view-keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: ${C(3)}; }
#election .view-key { height: ${C(34)}; font-size: ${C(5.4)}; line-height: 1.15; }
#election .centre { display: grid; gap: ${C(3)}; align-content: end; }
#election .orders { display: flex; gap: ${C(3)}; align-items: center; }
#election .orders .jp { font-size: ${C(6)}; }
#election .order { flex: 1; height: ${C(18)}; }
#election .gauges { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: ${C(3)}; height: ${C(48)}; }
#election .gauge { display: grid; gap: ${C(1.5)}; align-content: end; }
#election .gauges [d-readout] { height: ${C(34)}; }
#election .s-magi, #election .s-sync { width: ${C(v[0])}; height: ${C(v[1])}; }
#election .s-main { width: ${C(y[0])}; height: ${C(y[1])}; }

#election .desk { height: ${C(h)}; display: flex; align-items: stretch; justify-content: space-between; gap: ${C(5)}; }
#election .split { width: ${C(.7)}; height: auto; align-self: stretch; }
#election section { display: grid; grid-template-rows: auto minmax(0, 1fr); gap: ${C(3)}; }
#election .head { display: flex; gap: ${C(2.5)}; align-items: baseline; flex-wrap: wrap; align-self: start; }
#election .head .jp { font-size: ${C(6.4)}; }
#election .head .en { font-size: ${C(5)}; }
#election .head .under { flex-basis: 100%; }
#election section > .row { display: flex; gap: ${C(5)}; align-items: end; justify-self: stretch; }
#election [d-knob~="encoder"] { width: ${C(34)}; height: ${C(34)}; }
#election .watch-head { display: flex; gap: ${C(3)}; align-items: center; }
#election .watch-head .jp { font-size: ${C(8)}; }
#election .watch-head .en { font-size: ${C(6.4)}; }
#election .w-band { display: block; flex: 1; height: ${C(4)}; }
#election .watch { display: flex; gap: ${C(6)}; align-items: center; }
#election .watch .pick { width: ${C(70)}; height: ${C(70)}; }
#election .watch .k-prev, #election .watch .k-next { width: ${C(30)}; height: ${C(30)}; font-size: ${C(9)}; }
#election .watch .k-auto { width: ${C(40)}; height: ${C(40)}; font-size: ${C(6)}; line-height: 1.1; }
#election .watch .col > [d-mark] { font-size: ${C(5.4)}; }
#election [d-meter~="gauge"] { width: ${C(S)}; height: ${C(S)}; }
#election .readouts { display: grid; gap: ${C(3)}; align-content: end; }
#election .r-in, #election .r-margin, #election .r-left-s, #election .r-left-h { width: ${C(48)}; height: ${C(20)}; }
#election .s-wires { align-items: end; }
#election d-screen.s-news { width: ${C(g[0])}; height: ${C(g[1])}; }
#election .b-in { width: ${C(48)}; height: ${C(8)}; }`,setup:e=>n(e)};export{N as default};