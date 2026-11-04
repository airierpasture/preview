import"./preload-helper-D7zDL3FE.js";import"./controls-CB5BhS0k.js";import"./print-C4l2Rbiy.js";import"./light-D4o25q-1.js";import"./synth-DZP-BE_m.js";import{a as e,c as t,d as n,i as r,l as i,n as a,o,p as s,r as c,s as l,t as u,u as d}from"./firmware-election-eRCwk5bx.js";var f=820,p=8,m=8,h=124,g=266,_=124,v=40,y=[112,78],b=[128,96],x=[49,23],S=[224,168],C=[300,225],w=2,T=2,E=e=>`${e*4}px`,D=`#ff7a1a`,O=`#a8551a`,k=(e,t=``,n=D)=>`<span d-mark="label flat" ink="${n}" class="${t}">${e}</span>`,A=(e,t,n=``)=>`<div class="col ${n}">${e}${k(t)}</div>`,j=(e,t)=>`<i d-mark="print silk" class="hazard ${e}" color="${D}" viewbox="0 0 ${t*2} 2" path="${Array.from({length:t},(e,t)=>`M${t*2} 2L${t*2+1} 0H${t*2+2}L${t*2+1} 2Z`).join(``)}"></i>`,M=(e,t)=>`<div class="head">${k(e,`jp`)}${k(t,`en`)}</div>`,N=(e,t,n,r,i)=>A(`<div d-meter="gauge" class="g-${e}" ticks="4" minor="3" zones="${r}-${n} ${i}" label="${t}"><meter min="0" max="${n}" value="0"></meter></div>`,t,`small`),P=(e,t)=>`<div class="banded">${j(`w-band`,6)}${k(e,`jp`)}${k(t,`en`)}${j(`w-band`,6)}</div>`,F=[...o.map(([e,t,n],r)=>{let i=t===`S`?`Senate`:`Governor`;return`<div d-lamp="annunciator" class="m-${r} race" color="amber" data-race="${e} ${i}" role="button" aria-label="${e} ${i}">${n}${t===`S`?`上院`:`知事`}<br>${e} ${t===`S`?`Sen`:`Gov`}</div>`}),...u.map(([e,t,n,r])=>`<div d-lamp="annunciator" class="t-${e}" color="${r}">${t}<br>${n}</div>`)],I={id:`election`,title:`Election watch`,note:`The operations station, seconded to election night, reading every race from civicAPI. It powers up, says what its controls do, and then on Auto watches whatever is happening. Press a lamp, or Prev and Next, to pick a race; the view keys pick what the map shows.`,era:`retro`,order:91,dark:!0,height:2120,states:{"house view":[`.view-key:nth-child(2)`],"next race":[`.k-next`]},html:`<div id="election">
  <d-device class="alarms" material="paint-panel-black" radius="4" screws wear="0.35">
    <div class="ident">
      <span d-mark="print silk" class="nerv" color="${D}">NERV</span>
      ${k(`選挙監視所`,`jp`)}
      ${k(`Election watch 03`,`en`)}
      ${j(`id-band`,12)}
      ${k(`Data: civicAPI desk · not official · a lead is not a call`,`credit`,O)}
    </div>
    <div class="matrix">
      ${t.map((e,t)=>`${k(e,`rowname`,O)}${F.slice(t*8,(t+1)*8).join(``)}`).join(``)}
    </div>
    <div class="link">
      <div class="link-head">${k(`回線`,`jp`)}${k(`Data link · civicAPI`,`en`)}</div>
      <div class="link-body">
        <d-screen class="s-link" kind="crt" gain="2.4" live><canvas width="${c[0]}" height="${c[1]}"></canvas></d-screen>
        <div class="link-side">
          <div class="link-lamps">
            ${A(`<div d-lamp="led" class="led l-tx" color="amber"></div>`,`送 TX`,`small`)}
            ${A(`<div d-lamp="led" class="led l-rx" color="green"></div>`,`受 RX`,`small`)}
            ${A(`<div d-lamp="led" class="led l-hold" color="red"></div>`,`保留 Hold`,`small`)}
          </div>
          ${A(`<div d-readout="seven" class="r-flight" color="amber" digits="2">  </div>`,`送信中 Out`,`small`)}
          ${A(`<div d-readout="seven" class="r-hold" color="green" digits="2">  </div>`,`待機 Hold s`,`small`)}
        </div>
      </div>
    </div>
    <div class="seats">
      ${N(`sd`,`Sen D`,60,51,`blue`)}${N(`sr`,`Sen R`,60,51,`red`)}
      ${N(`hd`,`House D`,240,218,`blue`)}${N(`hr`,`House R`,240,218,`red`)}
    </div>
    <div class="clock">
      <div class="clock-head">${k(`次の締切まで`,`jp`)}${k(`Next polls close`,`en`)}</div>
      <div class="clock-body">
        <div d-readout="seven" class="timer" color="red" digits="6">--:--:--</div>
        <div class="supply">
          <div d-lamp="annunciator" class="t-demo" color="violet">演習<br>Demo</div>
          <div d-lamp="annunciator" class="t-live" color="green">自動<br>Live</div>
        </div>
      </div>
      <div class="gauges">${a.map(([e,t,n,r])=>`<div class="gauge">${k(`${t} ${n}`,`small`)}<div d-readout="seven" class="r-${e}" color="${r}" digits="3"></div></div>`).join(``)}</div>
    </div>
    ${A(`<div d-slider="fader" class="data-vol" leds="11" slot="2.5" cap="12" color="green" material="brushed-aluminium-dull"><input type="range" min="0" max="10" step="1" value="3" aria-label="Data sound volume"></div>`,`信号 Data`,`data-col`)}
  </d-device>
  <d-device class="bay" material="paint-panel-black" radius="4" wear="0.35">
    <div class="side">
      <div class="views">
        <div class="views-head">${k(`表示`,`jp`)}${k(`View`,`en`)}</div>
        <div class="view-keys">${d.map(([e,t],n)=>`<button d-key="tab lit" class="view-key" color="red" aria-pressed="${n===0}" aria-label="Show ${t}">${e}<br>${t}</button>`).join(``)}</div>
      </div>
      ${A(`<d-screen class="s-magi" kind="crt" gain="2.6" live><canvas width="${r[0]}" height="${r[1]}"></canvas></d-screen>`,`MAGI 審議`)}
    </div>
    <div class="centre">
      <div class="orders">${k(`速報`,`jp`)}<div d-readout="matrix" class="order" color="amber" scroll pitch="${w}" frame="${T}"></div></div>
      ${A(`<d-screen class="s-main" kind="crt" gain="2.6" live><canvas width="${e[0]}" height="${e[1]}"></canvas></d-screen>`,`戦術 Tactical`)}
    </div>
    <div class="side">
      ${A(`<d-screen class="s-sync" kind="crt" gain="2.4" live><canvas width="${i[0]}" height="${i[1]}"></canvas></d-screen>`,`シンクロ Harmonics`)}
    </div>
  </d-device>
  <div class="desk">
  <d-device class="d-watch" material="dial-black" radius="4" screws wear="0.35" lighting="console">
    <section class="s-watch">
      ${P(`選択`,`Pick a race`)}
      <div class="watch">
        ${A(`<button d-key="flush" color="amber" gain="0.3" class="k-prev" aria-label="Previous race">◀</button>`,`前 Prev`)}
        ${A(`<div d-knob="pointer" class="pick" sweep="150" leds color="amber" material="plastic-black-gloss"><input type="range" min="0" max="${o.length-1}" step="1" value="5" aria-label="Race"></div>`,`回して Turn`)}
        ${A(`<button d-key="flush" color="amber" gain="0.3" class="k-next" aria-label="Next race">▶</button>`,`次 Next`)}
        ${A(`<div class="rk"><div d-lamp="led" class="led l-auto" color="amber"></div><div d-switch="key" class="k-auto" labels="MAN,AUTO"><input type="checkbox" checked aria-label="Autopilot"></div></div>`,`自動操縦 Autopilot`)}
      </div>
    </section>
  </d-device>
  <d-device class="d-power" material="dial-black" radius="4" screws wear="0.35" lighting="console">
    <section class="s-power">
      ${P(`主電源`,`Main power`)}
      <div class="power">
        <div class="flank">
          <div class="checks">
            ${A(`<button d-key="arcade" class="k-ack" color="amber" material="plastic-orange" collar="plastic-black" aria-label="Acknowledge alarm">確認</button>`,`確認 Ack`)}
            ${A(`<button d-key="flush" class="k-test" color="amber" aria-label="Lamp test, hold">試験</button>`,`試験 Lamp test`)}
          </div>
          ${A(`<div class="rk"><div d-lamp="led" class="led l-sound" color="amber"></div><div d-switch="rocker" class="sw-sound"><input type="checkbox" aria-label="Sound"></div></div>`,`音声 Sound`)}
          ${A(`<div d-slider="fader" class="vol" leds="11" slot="2.5" cap="12" color="amber" material="brushed-aluminium-dull"><input type="range" min="0" max="10" step="1" value="6" aria-label="Volume"></div>`,`音量 Vol`)}
        </div>
        ${A(`<div d-cover="guard" class="guard" material="plastic-orange"><input type="checkbox" aria-label="Lift the guard"><button d-key="arcade" class="k-power" color="red" aria-label="Start">起動</button></div>`,`緊急起動 Start`)}
        <div class="flank">
          ${A(`<div class="rk"><div d-lamp="led" class="led l-wires" color="amber"></div><div d-switch="rocker" class="sw-wires"><input type="checkbox" checked aria-label="News wires"></div></div>`,`報道 Wires`)}
          ${A(`<div class="rk"><div d-lamp="led" class="led l-demo" color="amber"></div><div d-switch="rocker" class="sw-demo"><input type="checkbox" aria-label="Demo night"></div></div>`,`演習 Demo`)}
          ${A(`<div d-knob="pointer" class="room" labels="${l.map(([e])=>e).join(`,`)}" sweep="80" material="plastic-black"><input type="range" min="0" max="${l.length-1}" step="1" value="0" aria-label="Room lights"></div>`,`照明 Room`)}
        </div>
      </div>
    </section>
  </d-device>
  <d-device class="d-gauges" material="dial-black" radius="4" screws wear="0.35" lighting="console">
    <section class="s-left">
      ${M(`残り`,`Uncalled`)}
      <div class="readouts">
        ${A(`<div d-readout="seven" class="r-left-s" color="amber" digits="3">  35</div>`,`Senate seats`)}
        ${A(`<div d-readout="seven" class="r-left-h" color="amber" digits="3"> 435</div>`,`House seats`)}
      </div>
    </section>
    <section class="s-count">
      ${M(`開票`,`Count`)}
      <div class="readouts">
        ${A(`<div class="stack"><div d-readout="seven" class="r-in" color="amber" digits="3">  --</div><div d-meter="bargraph" class="b-in" segments="16" color="amber"><meter min="0" max="1" value="0"></meter></div></div>`,`Counted %`)}
        ${A(`<div d-readout="seven" class="r-margin" color="amber" digits="3"> --.-</div>`,`Margin pts`)}
      </div>
    </section>
    <section class="s-wires">
      ${M(`報道`,`Wires`)}
      <d-screen class="s-news" kind="crt" gain="2.4" live><canvas width="${n[0]}" height="${n[1]}"></canvas></d-screen>
    </section>
  </d-device>
  </div>
</div>`,css:`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Noto+Sans+JP:wght@700&family=Noto+Serif:wdth,wght@62.5..100,700..900&family=Shippori+Mincho+B1:wght@800&display=swap');
#election { width: ${E(f)}; display: grid; gap: ${E(m)}; }
#election d-device { padding: ${E(p)}; box-sizing: border-box; font: 600 ${E(5)} / 1.05 'Barlow Condensed', 'Noto Sans JP', sans-serif; letter-spacing: .04em; text-transform: uppercase; }
#election .col { display: grid; gap: ${E(2)}; justify-items: center; align-content: end; }
#election .jp { font-family: 'Noto Sans JP', sans-serif; font-weight: 700; letter-spacing: .1em; }
#election .small { font-size: ${E(4.6)}; }

#election .alarms { height: ${E(h)}; display: flex; align-items: center; gap: ${E(6)}; }
#election .ident { display: grid; gap: ${E(1.5)}; align-self: stretch; align-content: center; width: ${E(50)}; }
#election .nerv { font: 900 ${E(19)} / 1 'Noto Serif', serif; font-stretch: 62.5%; letter-spacing: 0; }
#election .ident .jp { font-size: ${E(6)}; }
#election .ident .en { font-size: ${E(4.6)}; }
#election .credit { font-size: ${E(3)}; letter-spacing: .02em; line-height: 1.2; }
#election .id-band { display: block; width: 100%; height: ${E(4)}; margin-top: ${E(2)}; }
#election .matrix { flex: 1; display: grid; grid-template-columns: auto repeat(8, minmax(0, 1fr)); grid-auto-rows: ${E(x[1])}; gap: ${E(2.5)} ${E(2)}; align-items: center; }
#election .rowname { justify-self: end; font-size: ${E(4.6)}; }
#election [d-lamp~="annunciator"] { display: grid; place-items: center; text-align: center; font-size: ${E(3.3)}; line-height: 1.1; letter-spacing: .02em; }
#election .race { font-size: ${E(3)} !important; letter-spacing: 0 !important; cursor: pointer; }
#election .clock { margin-left: auto; display: grid; gap: ${E(2)}; }
#election .clock-head { display: flex; gap: ${E(3)}; align-items: baseline; }
#election .clock-head .jp { font-size: ${E(6)}; }
#election .clock-body { display: flex; gap: ${E(3)}; }
#election .timer { width: ${E(84)}; height: ${E(30)}; }
#election .supply { display: grid; gap: ${E(3)}; }
#election .k-power { width: ${E(40)}; height: ${E(40)}; font: 700 ${E(8)} / 1 'Noto Sans JP', sans-serif; }
#election .supply [d-lamp] { width: ${E(30)}; height: ${E(13.5)}; font-size: ${E(3.8)}; }

#election .bay { height: ${E(g)}; padding-block: ${E(6)} !important; display: flex; justify-content: space-between; align-items: end; }
#election .side { display: grid; gap: ${E(4)}; align-content: end; }
#election .views { display: grid; gap: ${E(2.5)}; height: ${E(48)}; align-content: end; }
#election .views-head { display: flex; gap: ${E(3)}; align-items: baseline; }
#election .views-head .jp { font-size: ${E(6)}; }
#election .view-keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: ${E(3)}; }
#election .view-key { height: ${E(34)}; font-size: ${E(5.4)}; line-height: 1.15; }
#election .centre { display: grid; gap: ${E(3)}; align-content: end; }
#election .orders { display: flex; gap: ${E(3)}; align-items: center; }
#election .orders .jp { font-size: ${E(6)}; }
#election .order { flex: 1; height: ${E(18)}; }
#election .gauges { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: ${E(3)}; }
#election .gauge { display: grid; gap: ${E(1.5)}; align-content: end; }
#election .gauges [d-readout] { height: ${E(17)}; }
#election .gauges .small { font-size: ${E(3.6)}; white-space: nowrap; }
#election .s-magi { width: ${E(S[0])}; height: ${E(S[1])}; }
#election .s-sync { width: ${E(S[0])}; height: ${E(S[0])}; }
#election .s-main { width: ${E(C[0])}; height: ${E(C[1])}; }
#election .link { display: grid; gap: ${E(2)}; align-self: stretch; align-content: center; }
#election .link-head { display: flex; gap: ${E(3)}; align-items: baseline; }
#election .link-head .jp { font-size: ${E(6)}; }
#election .link-body { display: flex; gap: ${E(3)}; align-items: stretch; }
#election .link-side { display: grid; gap: ${E(2)}; align-content: space-between; }
#election .link-lamps { display: grid; grid-template-columns: repeat(3, 1fr); gap: ${E(1.5)}; }
#election .link .led { width: ${E(6)}; height: ${E(6)}; }
#election .link-side [d-readout] { width: ${E(24)}; height: ${E(14)}; }
#election .link .col > [d-mark] { white-space: nowrap; font-size: ${E(3.4)}; }
#election .s-link { width: ${E(b[0])}; height: ${E(b[1])}; }
#election .seats { display: grid; grid-template-columns: repeat(4, auto); gap: ${E(2)} ${E(3)}; align-self: center; }
#election .seats .col > [d-mark] { font-size: ${E(3.4)}; white-space: nowrap; }
#election [d-meter~="gauge"] { width: ${E(v)}; height: ${E(v)}; }

#election .desk { height: ${E(_)}; display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: ${E(m)}; }
#election .desk > d-device { height: 100%; display: flex; gap: ${E(8)}; padding-block: ${E(7)} ${E(6)}; }
#election .desk section { flex: 1; display: grid; grid-template-rows: ${E(9)} minmax(0, 1fr); gap: ${E(4)}; }
/* Every control on the desk sits centred in its column, with its name on one line along the bottom. */
#election .desk .col { grid-template-rows: minmax(0, 1fr) auto; align-items: center; align-content: stretch; gap: ${E(3)}; }
#election .rk { display: grid; gap: ${E(3)}; justify-items: center; }
#election .stack { display: grid; gap: ${E(2.5)}; }
#election .head { display: flex; gap: ${E(2.5)}; align-items: center; white-space: nowrap; height: ${E(9)}; }
#election .d-gauges .col { grid-template-rows: auto auto; align-content: end; }
#election .d-gauges .readouts { grid-template-rows: auto auto; align-content: end; gap: ${E(5)}; }
#election .head .jp { font: 800 ${E(7)} / 1 'Shippori Mincho B1', serif; }
#election .head .en { font-size: ${E(5)}; }
#election .head .under { flex-basis: 100%; }
#election section > .row { display: flex; gap: ${E(5)}; align-items: end; justify-self: stretch; }
#election [d-knob~="encoder"] { width: ${E(34)}; height: ${E(34)}; }
#election .banded { display: flex; gap: ${E(3)}; align-items: center; }
#election .banded .jp { font: 800 ${E(8.5)} / 1 'Shippori Mincho B1', serif; }
#election .banded .en { font-size: ${E(6.4)}; }
#election .w-band { display: block; flex: 1; height: ${E(4)}; }
#election .watch { display: flex; gap: ${E(6)}; align-items: stretch; }
#election .watch .pick { width: ${E(72)}; height: ${E(72)}; }
#election .watch .k-prev, #election .watch .k-next { width: ${E(30)}; height: ${E(30)}; font: ${E(11)} / 1 'Noto Sans JP', sans-serif; }
#election .power { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: ${E(8)}; align-items: stretch; }
#election .flank { display: flex; gap: ${E(6)}; align-items: stretch; }
#election .checks { display: grid; grid-template-rows: 1fr 1fr; gap: ${E(2)}; }
#election .checks .col > [d-mark] { font-size: ${E(4)}; }
#election .power .col > [d-mark] { white-space: nowrap; }
#election .k-ack { width: ${E(24)}; height: ${E(24)}; font: 700 ${E(5.5)} / 1 'Noto Sans JP', sans-serif; }
#election .k-test { width: ${E(17)}; height: ${E(17)}; font: 700 ${E(4.2)} / 1 'Noto Sans JP', sans-serif; }
#election .vol { width: ${E(22)}; height: ${E(48)}; }
#election .data-col { align-self: stretch; align-content: center; }
#election .data-col > [d-mark] { white-space: nowrap; }
#election .data-vol { width: ${E(18)}; height: ${E(56)}; }
#election .room { width: ${E(28)}; height: ${E(28)}; }
#election .flank:first-child { justify-self: end; }
#election .guard { width: ${E(58)}; height: ${E(58)}; display: grid; place-items: center; }
#election .k-power { width: ${E(50)}; height: ${E(50)}; font: 700 ${E(10)} / 1 'Noto Sans JP', sans-serif; }
#election .power [d-switch~="rocker"] { width: ${E(20)}; height: ${E(30)}; }
#election .power .led { width: ${E(7)}; height: ${E(7)}; }
#election .watch .k-auto { width: ${E(40)}; height: ${E(40)}; margin-inline: ${E(6)}; }
#election .watch .led { width: ${E(9)}; height: ${E(9)}; }
#election .watch .col > [d-mark] { font-size: ${E(5.4)}; }
#election .readouts { display: grid; grid-template-rows: 1fr 1fr; gap: ${E(3)}; }
#election .r-in, #election .r-margin, #election .r-left-s, #election .r-left-h { width: ${E(46)}; height: ${E(22)}; }
#election .d-gauges section { flex: none; }
#election d-screen.s-news { width: ${E(y[0])}; height: ${E(y[1])}; }
#election .b-in { width: ${E(46)}; height: ${E(6)}; }`,setup:e=>s(e)};export{I as default};