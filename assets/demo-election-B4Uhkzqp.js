import"./preload-helper-Cu4TIj3n.js";import"./controls-Fl3xwPRe.js";import"./print-ChgasUQV.js";import"./light-aHNG5l6y.js";import"./synth-CMOaipao.js";import{a as e,c as t,f as n,i as r,l as i,n as a,o,r as s,s as c,t as l,u}from"./firmware-election-CZ2mWS67.js";var d=720,f=8,p=8,m=92,h=232,g=124,_=[112,78],v=[49,23],y=[206,155],b=[264,198],x=2,S=2,C=e=>`${e*4}px`,w=`#ff7a1a`,T=`#a8551a`,E=(e,t=``,n=w)=>`<span d-mark="label flat" ink="${n}" class="${t}">${e}</span>`,D=(e,t,n=``)=>`<div class="col ${n}">${e}${E(t)}</div>`,O=(e,t)=>`<i d-mark="print silk" class="hazard ${e}" color="${w}" viewbox="0 0 ${t*2} 2" path="${Array.from({length:t},(e,t)=>`M${t*2} 2L${t*2+1} 0H${t*2+2}L${t*2+1} 2Z`).join(``)}"></i>`,k=(e,t)=>`<div class="head">${E(e,`jp`)}${E(t,`en`)}</div>`,A=(e,t)=>`<div class="banded">${O(`w-band`,6)}${E(e,`jp`)}${E(t,`en`)}${O(`w-band`,6)}</div>`,j=[...e.map(([e,t,n],r)=>{let i=t===`S`?`Senate`:`Governor`;return`<div d-lamp="annunciator" class="m-${r} race" color="amber" data-race="${e} ${i}" role="button" aria-label="${e} ${i}">${n}${t===`S`?`上院`:`知事`}<br>${e} ${t===`S`?`Sen`:`Gov`}</div>`}),...l.map(([e,t,n,r])=>`<div d-lamp="annunciator" class="t-${e}" color="${r}">${t}<br>${n}</div>`)],M={id:`election`,title:`Election watch`,note:`The operations station, seconded to election night, reading every race from civicAPI. It powers up, says what its controls do, and then on Auto watches whatever is happening. Press a lamp, or Prev and Next, to pick a race; the view keys pick what the map shows.`,era:`retro`,order:91,dark:!0,height:1856,states:{"house view":[`.view-key:nth-child(2)`],"next race":[`.k-next`]},html:`<div id="election">
  <d-device class="alarms" material="paint-panel-black" radius="4" screws wear="0.35">
    <div class="ident">
      <span d-mark="print silk" class="nerv" color="${w}">NERV</span>
      ${E(`選挙監視所`,`jp`)}
      ${E(`Election watch 03`,`en`)}
      ${O(`id-band`,12)}
      ${E(`Data: civicAPI desk · not official · a lead is not a call`,`credit`,T)}
    </div>
    <div class="matrix">
      ${c.map((e,t)=>`${E(e,`rowname`,T)}${j.slice(t*8,(t+1)*8).join(``)}`).join(``)}
    </div>
    <div class="clock">
      <div class="clock-head">${E(`次の締切まで`,`jp`)}${E(`Next polls close`,`en`)}</div>
      <div class="clock-body">
        <div d-readout="seven" class="timer" color="red" digits="6">--:--:--</div>
        <div class="supply">
          <div d-lamp="annunciator" class="t-demo" color="violet">演習<br>Demo</div>
          <div d-lamp="annunciator" class="t-live" color="green">自動<br>Live</div>
        </div>
      </div>
      <div class="gauges">${a.map(([e,t,n,r])=>`<div class="gauge">${E(`${t} ${n}`,`small`)}<div d-readout="seven" class="r-${e}" color="${r}" digits="3"></div></div>`).join(``)}</div>
    </div>
  </d-device>
  <d-device class="bay" material="paint-panel-black" radius="4" wear="0.35">
    <div class="side">
      <div class="views">
        <div class="views-head">${E(`表示`,`jp`)}${E(`View`,`en`)}</div>
        <div class="view-keys">${i.map(([e,t],n)=>`<button d-key="tab lit" class="view-key" color="red" aria-pressed="${n===0}" aria-label="Show ${t}">${e}<br>${t}</button>`).join(``)}</div>
      </div>
      ${D(`<d-screen class="s-magi" kind="crt" gain="2.6" live><canvas width="${s[0]}" height="${s[1]}"></canvas></d-screen>`,`MAGI 審議`)}
    </div>
    <div class="centre">
      <div class="orders">${E(`速報`,`jp`)}<div d-readout="matrix" class="order" color="amber" scroll pitch="${x}" frame="${S}"></div></div>
      ${D(`<d-screen class="s-main" kind="crt" gain="2.6" live><canvas width="${r[0]}" height="${r[1]}"></canvas></d-screen>`,`戦術 Tactical`)}
    </div>
    <div class="side">
      ${D(`<d-screen class="s-sync" kind="crt" gain="2.4" live><canvas width="${t[0]}" height="${t[1]}"></canvas></d-screen>`,`シンクロ Harmonics`)}
    </div>
  </d-device>
  <div class="desk">
  <d-device class="d-watch" material="dial-black" radius="4" screws wear="0.35" lighting="console">
    <section class="s-watch">
      ${A(`選択`,`Pick a race`)}
      <div class="watch">
        ${D(`<button d-key="flush" color="amber" gain="0.3" class="k-prev" aria-label="Previous race">◀</button>`,`前 Prev`)}
        ${D(`<div d-knob="pointer" class="pick" sweep="150" leds color="amber" material="plastic-black-gloss"><input type="range" min="0" max="${e.length-1}" step="1" value="5" aria-label="Race"></div>`,`回して Turn`)}
        ${D(`<button d-key="flush" color="amber" gain="0.3" class="k-next" aria-label="Next race">▶</button>`,`次 Next`)}
        ${D(`<div class="rk"><div d-lamp="led" class="led l-auto" color="amber"></div><div d-switch="key" class="k-auto" labels="MAN,AUTO"><input type="checkbox" checked aria-label="Autopilot"></div></div>`,`自動操縦 Autopilot`)}
      </div>
    </section>
  </d-device>
  <d-device class="d-power" material="dial-black" radius="4" screws wear="0.35" lighting="console">
    <section class="s-power">
      ${A(`主電源`,`Main power`)}
      <div class="power">
        <div class="flank">
          <div class="checks">
            ${D(`<button d-key="arcade" class="k-ack" color="amber" material="plastic-orange" collar="plastic-black" aria-label="Acknowledge alarm">確認</button>`,`確認 Ack`)}
            ${D(`<button d-key="flush" class="k-test" color="amber" aria-label="Lamp test, hold">試験</button>`,`試験 Lamp test`)}
          </div>
          ${D(`<div class="rk"><div d-lamp="led" class="led l-sound" color="amber"></div><div d-switch="rocker" class="sw-sound"><input type="checkbox" aria-label="Sound"></div></div>`,`音声 Sound`)}
          ${D(`<div d-slider="fader" class="vol" leds="11" slot="2.5" cap="12" color="amber" material="brushed-aluminium-dull"><input type="range" min="0" max="10" step="1" value="6" aria-label="Volume"></div>`,`音量 Vol`)}
        </div>
        ${D(`<div d-cover="guard" class="guard" material="plastic-orange"><input type="checkbox" aria-label="Lift the guard"><button d-key="arcade" class="k-power" color="red" aria-label="Start">起動</button></div>`,`緊急起動 Start`)}
        <div class="flank">
          ${D(`<div class="rk"><div d-lamp="led" class="led l-wires" color="amber"></div><div d-switch="rocker" class="sw-wires"><input type="checkbox" checked aria-label="News wires"></div></div>`,`報道 Wires`)}
          ${D(`<div class="rk"><div d-lamp="led" class="led l-demo" color="amber"></div><div d-switch="rocker" class="sw-demo"><input type="checkbox" aria-label="Demo night"></div></div>`,`演習 Demo`)}
          ${D(`<div d-knob="pointer" class="room" labels="${o.map(([e])=>e).join(`,`)}" sweep="80" material="plastic-black"><input type="range" min="0" max="${o.length-1}" step="1" value="0" aria-label="Room lights"></div>`,`照明 Room`)}
        </div>
      </div>
    </section>
  </d-device>
  <d-device class="d-gauges" material="dial-black" radius="4" screws wear="0.35" lighting="console">
    <section class="s-left">
      ${k(`残り`,`Uncalled`)}
      <div class="readouts">
        ${D(`<div d-readout="seven" class="r-left-s" color="amber" digits="3">  35</div>`,`Senate seats`)}
        ${D(`<div d-readout="seven" class="r-left-h" color="amber" digits="3"> 435</div>`,`House seats`)}
      </div>
    </section>
    <section class="s-count">
      ${k(`開票`,`Count`)}
      <div class="readouts">
        ${D(`<div class="stack"><div d-readout="seven" class="r-in" color="amber" digits="3">  --</div><div d-meter="bargraph" class="b-in" segments="16" color="amber"><meter min="0" max="1" value="0"></meter></div></div>`,`Counted %`)}
        ${D(`<div d-readout="seven" class="r-margin" color="amber" digits="3"> --.-</div>`,`Margin pts`)}
      </div>
    </section>
    <section class="s-wires">
      ${k(`報道`,`Wires`)}
      <d-screen class="s-news" kind="crt" gain="2.4" live><canvas width="${u[0]}" height="${u[1]}"></canvas></d-screen>
    </section>
  </d-device>
  </div>
</div>`,css:`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Noto+Sans+JP:wght@700&family=Noto+Serif:wdth,wght@62.5..100,700..900&family=Shippori+Mincho+B1:wght@800&display=swap');
#election { width: ${C(d)}; display: grid; gap: ${C(p)}; }
#election d-device { padding: ${C(f)}; box-sizing: border-box; font: 600 ${C(5)} / 1.05 'Barlow Condensed', 'Noto Sans JP', sans-serif; letter-spacing: .04em; text-transform: uppercase; }
#election .col { display: grid; gap: ${C(2)}; justify-items: center; align-content: end; }
#election .jp { font-family: 'Noto Sans JP', sans-serif; font-weight: 700; letter-spacing: .1em; }
#election .small { font-size: ${C(4.6)}; }

#election .alarms { height: ${C(m)}; display: flex; align-items: center; gap: ${C(8)}; }
#election .ident { display: grid; gap: ${C(1.5)}; align-self: stretch; align-content: center; width: ${C(50)}; }
#election .nerv { font: 900 ${C(19)} / 1 'Noto Serif', serif; font-stretch: 62.5%; letter-spacing: 0; }
#election .ident .jp { font-size: ${C(6)}; }
#election .ident .en { font-size: ${C(4.6)}; }
#election .credit { font-size: ${C(3)}; letter-spacing: .02em; line-height: 1.2; }
#election .id-band { display: block; width: 100%; height: ${C(4)}; margin-top: ${C(2)}; }
#election .matrix { flex: 1; display: grid; grid-template-columns: auto repeat(8, minmax(0, 1fr)); grid-auto-rows: ${C(v[1])}; gap: ${C(2.5)} ${C(2)}; align-items: center; }
#election .rowname { justify-self: end; font-size: ${C(4.6)}; }
#election [d-lamp~="annunciator"] { display: grid; place-items: center; text-align: center; font-size: ${C(5.2)}; line-height: 1.1; letter-spacing: .02em; }
#election .race { font-size: ${C(4.8)} !important; letter-spacing: 0 !important; cursor: pointer; }
#election .clock { margin-left: auto; display: grid; gap: ${C(2)}; }
#election .clock-head { display: flex; gap: ${C(3)}; align-items: baseline; }
#election .clock-head .jp { font-size: ${C(6)}; }
#election .clock-body { display: flex; gap: ${C(3)}; }
#election .timer { width: ${C(84)}; height: ${C(30)}; }
#election .supply { display: grid; gap: ${C(3)}; }
#election .k-power { width: ${C(40)}; height: ${C(40)}; font: 700 ${C(8)} / 1 'Noto Sans JP', sans-serif; }
#election .supply [d-lamp] { width: ${C(30)}; height: ${C(13.5)}; font-size: ${C(3.8)}; }

#election .bay { height: ${C(h)}; padding-block: ${C(6)} !important; display: flex; justify-content: space-between; align-items: end; }
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
#election .gauges { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: ${C(3)}; }
#election .gauge { display: grid; gap: ${C(1.5)}; align-content: end; }
#election .gauges [d-readout] { height: ${C(17)}; }
#election .gauges .small { font-size: ${C(3.6)}; white-space: nowrap; }
#election .s-magi { width: ${C(y[0])}; height: ${C(y[1])}; }
#election .s-sync { width: ${C(y[0])}; height: ${C(y[0])}; }
#election .s-main { width: ${C(b[0])}; height: ${C(b[1])}; }

#election .desk { height: ${C(g)}; display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: ${C(p)}; }
#election .desk > d-device { height: 100%; display: flex; gap: ${C(8)}; padding-block: ${C(7)} ${C(6)}; }
#election .desk section { flex: 1; display: grid; grid-template-rows: ${C(9)} minmax(0, 1fr); gap: ${C(4)}; }
/* Every control on the desk sits centred in its column, with its name on one line along the bottom. */
#election .desk .col { grid-template-rows: minmax(0, 1fr) auto; align-items: center; align-content: stretch; gap: ${C(3)}; }
#election .rk { display: grid; gap: ${C(3)}; justify-items: center; }
#election .stack { display: grid; gap: ${C(2.5)}; }
#election .head { display: flex; gap: ${C(2.5)}; align-items: center; white-space: nowrap; height: ${C(9)}; }
#election .d-gauges .col { grid-template-rows: auto auto; align-content: end; }
#election .d-gauges .readouts { grid-template-rows: auto auto; align-content: end; gap: ${C(5)}; }
#election .head .jp { font: 800 ${C(7)} / 1 'Shippori Mincho B1', serif; }
#election .head .en { font-size: ${C(5)}; }
#election .head .under { flex-basis: 100%; }
#election section > .row { display: flex; gap: ${C(5)}; align-items: end; justify-self: stretch; }
#election [d-knob~="encoder"] { width: ${C(34)}; height: ${C(34)}; }
#election .banded { display: flex; gap: ${C(3)}; align-items: center; }
#election .banded .jp { font: 800 ${C(8.5)} / 1 'Shippori Mincho B1', serif; }
#election .banded .en { font-size: ${C(6.4)}; }
#election .w-band { display: block; flex: 1; height: ${C(4)}; }
#election .watch { display: flex; gap: ${C(6)}; align-items: stretch; }
#election .watch .pick { width: ${C(72)}; height: ${C(72)}; }
#election .watch .k-prev, #election .watch .k-next { width: ${C(30)}; height: ${C(30)}; font: ${C(11)} / 1 'Noto Sans JP', sans-serif; }
#election .power { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: ${C(8)}; align-items: stretch; }
#election .flank { display: flex; gap: ${C(6)}; align-items: stretch; }
#election .checks { display: grid; grid-template-rows: 1fr 1fr; gap: ${C(2)}; }
#election .checks .col > [d-mark] { font-size: ${C(4)}; }
#election .power .col > [d-mark] { white-space: nowrap; }
#election .k-ack { width: ${C(24)}; height: ${C(24)}; font: 700 ${C(5.5)} / 1 'Noto Sans JP', sans-serif; }
#election .k-test { width: ${C(17)}; height: ${C(17)}; font: 700 ${C(4.2)} / 1 'Noto Sans JP', sans-serif; }
#election .vol { width: ${C(22)}; height: ${C(48)}; }
#election .room { width: ${C(28)}; height: ${C(28)}; }
#election .flank:first-child { justify-self: end; }
#election .guard { width: ${C(58)}; height: ${C(58)}; display: grid; place-items: center; }
#election .k-power { width: ${C(50)}; height: ${C(50)}; font: 700 ${C(10)} / 1 'Noto Sans JP', sans-serif; }
#election .power [d-switch~="rocker"] { width: ${C(20)}; height: ${C(30)}; }
#election .power .led { width: ${C(7)}; height: ${C(7)}; }
#election .watch .k-auto { width: ${C(40)}; height: ${C(40)}; margin-inline: ${C(6)}; }
#election .watch .led { width: ${C(9)}; height: ${C(9)}; }
#election .watch .col > [d-mark] { font-size: ${C(5.4)}; }
#election .readouts { display: grid; grid-template-rows: 1fr 1fr; gap: ${C(3)}; }
#election .r-in, #election .r-margin, #election .r-left-s, #election .r-left-h { width: ${C(46)}; height: ${C(22)}; }
#election .d-gauges section { flex: none; }
#election d-screen.s-news { width: ${C(_[0])}; height: ${C(_[1])}; }
#election .b-in { width: ${C(46)}; height: ${C(6)}; }`,setup:e=>n(e)};export{M as default};