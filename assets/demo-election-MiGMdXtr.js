import"./base-ZbI1fdHb.js";import"./controls-D3cbKU3P.js";import"./print-Bzw8zoiK.js";import"./light-ANijDnVr.js";import"./synth-DPpS3wn0.js";import{a as e,c as t,f as n,i as r,l as i,n as a,o,r as s,s as c,t as l,u}from"./firmware-election-Bs33VkJt.js";var d=820,f=8,p=8,m=92,h=268,g=124,_=[170,7],v=[112,78],y=[40,30],b=[52,20],x=[224,168],S=[300,225],C=2,w=2,T=e=>`${e*4}px`,E=`#ff7a1a`,D=`#a8551a`,O=(e,t=``,n=E)=>`<span d-mark="label flat" ink="${n}" class="${t}">${e}</span>`,k=(e,t,n=``)=>`<div class="col ${n}">${e}${O(t)}</div>`,A=(e,t)=>`<i d-mark="print silk" class="hazard ${e}" color="${E}" viewbox="0 0 ${t*2} 2" path="${Array.from({length:t},(e,t)=>`M${t*2} 2L${t*2+1} 0H${t*2+2}L${t*2+1} 2Z`).join(``)}"></i>`,j=(e,t)=>`<div class="head">${O(e,`jp`)}${O(t,`en`)}</div>`,M=(e,t,n,r,i,a)=>`<div class="tug">
      ${O(`${e} ${t}`,`tug-name small`)}
      <div d-readout="seven" class="r-${n}d" color="blue" digits="3"></div>
      <div class="bars" style="--at: ${i/r*100}%">
        <div d-meter="bargraph" class="g-${n}d" segments="${a}" color="blue"><meter min="0" max="${r}" value="0"></meter></div>
        <div d-meter="bargraph" class="g-${n}r" segments="${a}" color="red" from="end"><meter min="0" max="${r}" value="0"></meter></div>
        <i d-mark="print silk" class="line" color="#ffe6b0" viewbox="0 0 1 10" path="M0 0H1V10H0Z"></i>
        ${O(String(i),`at small`,`#ffe6b0`)}
      </div>
      <div d-readout="seven" class="r-${n}r" color="red" digits="3"></div>
    </div>`,N=(e,t)=>`<div class="banded">${A(`w-band`,6)}${O(e,`jp`)}${O(t,`en`)}${A(`w-band`,6)}</div>`,P=[...e.map(([e,t,n],r)=>{let i=t===`S`?`Senate`:`Governor`;return`<div d-lamp="annunciator" class="m-${r} race" color="amber" data-race="${e} ${i}" role="button" aria-label="${e} ${i}">${n}${t===`S`?`上院`:`知事`}<br>${e} ${t===`S`?`Sen`:`Gov`}</div>`}),...l.map(([e,t,n,r])=>`<div d-lamp="annunciator" class="t-${e}" color="${r}">${t}<br>${n}</div>`)],F={id:`election`,title:`Election watch`,note:`The operations station, seconded to election night, reading every race from civicAPI. It powers up, says what its controls do, and then on Auto watches whatever is happening. Press a lamp, or Prev and Next, to pick a race; the view keys pick what the map shows.`,era:`retro`,order:91,dark:!0,height:2e3,states:{"house view":[`.view-key:nth-child(2)`],"next race":[`.k-next`]},html:`<div id="election">
  <d-device class="alarms" material="paint-panel-black" radius="1" screws wear="0.35">
    <div class="matrix">
      ${c.map((e,t)=>`${O(e,`rowname`,D)}${P.slice(t*8,(t+1)*8).join(``)}`).join(``)}
    </div>
    <div class="tally">
      ${M(`上院`,`Senate`,`s`,100,51,50)}
      ${M(`下院`,`House`,`h`,435,218,87)}
    </div>
    <div class="clock">
      <div class="clock-head">${O(`次の締切まで`,`jp`)}${O(`Next polls close`,`en`)}</div>
      <div class="clock-body">
        <div d-readout="seven" class="timer" color="red" digits="6">--:--:--</div>
        <div class="supply">
          <div d-lamp="annunciator" class="t-demo" color="violet">演習<br>Demo</div>
          <div d-lamp="annunciator" class="t-live" color="green">自動<br>Live</div>
        </div>
      </div>
      <div class="link">
        <d-screen class="s-link" kind="crt" gain="2.4" live><canvas width="${a[0]}" height="${a[1]}"></canvas></d-screen>
        <div d-lamp="led" class="led l-tx" color="amber"></div><div d-lamp="led" class="led l-rx" color="green"></div><div d-lamp="led" class="led l-hold" color="red"></div>
        <div d-readout="seven" class="r-flight" color="amber" digits="2">  </div>
        <div d-readout="seven" class="r-hold" color="green" digits="2">  </div>
        ${O(`回線 Link`,`small`)}
      </div>
    </div>
  </d-device>
  <d-device class="bay" material="paint-panel-black" radius="1" wear="0.35">
    <div class="orders">${O(`速報`,`jp`)}<div d-readout="matrix" class="order" color="amber" scroll pitch="${C/4}" frame="${w/4}"></div></div>
    <div class="side">
      <div class="views">
        <div class="views-head">${O(`表示`,`jp`)}${O(`View`,`en`)}</div>
        <div class="view-keys">${i.map(([e,t],n)=>`<button d-key="tab lit" class="view-key" color="red" aria-pressed="${n===0}" aria-label="Show ${t}">${e}<br>${t}</button>`).join(``)}</div>
      </div>
      ${k(`<d-screen class="s-magi" kind="crt" gain="2.6" live><canvas width="${s[0]}" height="${s[1]}"></canvas></d-screen>`,`MAGI 審議`)}
    </div>
    <div class="centre">
      ${k(`<d-screen class="s-main" kind="crt" gain="2.6" live><canvas width="${r[0]}" height="${r[1]}"></canvas></d-screen>`,`戦術 Tactical`)}
    </div>
    <div class="side">
      ${k(`<d-screen class="s-sync" kind="crt" gain="2.4" live><canvas width="${t[0]}" height="${t[1]}"></canvas></d-screen>`,`シンクロ Harmonics`)}
    </div>
  </d-device>
  <div class="desk">
  <d-device class="d-watch" material="dial-black" radius="1" screws wear="0.35" lighting="console">
    <section class="s-watch">
      ${N(`選択`,`Pick a race`)}
      <div class="watch">
        ${k(`<button d-key="flush" color="amber" gain="0.3" class="k-prev" aria-label="Previous race">◀</button>`,`前 Prev`)}
        ${k(`<div d-knob="pointer" class="pick" sweep="150" leds color="amber" material="plastic-black-gloss"><input type="range" min="0" max="${e.length-1}" step="1" value="5" aria-label="Race"></div>`,`回して Turn`)}
        ${k(`<button d-key="flush" color="amber" gain="0.3" class="k-next" aria-label="Next race">▶</button>`,`次 Next`)}
        ${k(`<div class="rk"><div d-lamp="led" class="led l-auto" color="amber"></div><div d-switch="key" class="k-auto" labels="MAN,AUTO"><input type="checkbox" checked aria-label="Autopilot"></div></div>`,`自動操縦 Autopilot`)}
      </div>
    </section>
  </d-device>
  <d-device class="d-power" material="dial-black" radius="1" screws wear="0.35" lighting="console">
    <section class="s-power">
      ${N(`主電源`,`Main power`)}
      <div class="power">
        <div class="flank">
          <div class="checks">
            ${k(`<button d-key="arcade" class="k-ack" color="amber" material="plastic-orange" collar="plastic-black" aria-label="Acknowledge alarm">確認</button>`,`確認 Ack`)}
            ${k(`<button d-key="flush" class="k-test" color="amber" aria-label="Lamp test, hold">試験</button>`,`試験 Lamp test`)}
          </div>
          ${k(`<div class="rk"><div d-lamp="led" class="led l-sound" color="amber"></div><div d-switch="rocker" class="sw-sound"><input type="checkbox" aria-label="Sound"></div></div>`,`音声 Sound`)}
          ${k(`<div d-slider="fader" class="vol" leds="11" slot="2.5" cap="12" color="amber" material="brushed-aluminium-dull"><input type="range" min="0" max="10" step="1" value="6" aria-label="Volume"></div>`,`音量 Vol`)}
          ${k(`<div d-slider="fader" class="vol data-vol" leds="11" slot="2.5" cap="12" color="green" material="brushed-aluminium-dull"><input type="range" min="0" max="10" step="1" value="3" aria-label="Data sound volume"></div>`,`信号 Data`)}
        </div>
        ${k(`<div d-cover="guard" class="guard" material="plastic-orange"><input type="checkbox" aria-label="Lift the guard"><button d-key="arcade" class="k-power" color="red" aria-label="Start">起動</button></div>`,`緊急起動 Start`)}
        <div class="flank">
          ${k(`<div class="rk"><div d-lamp="led" class="led l-wires" color="amber"></div><div d-switch="rocker" class="sw-wires"><input type="checkbox" checked aria-label="News wires"></div></div>`,`報道 Wires`)}
          ${k(`<div class="rk"><div d-lamp="led" class="led l-demo" color="amber"></div><div d-switch="rocker" class="sw-demo"><input type="checkbox" aria-label="Demo night"></div></div>`,`演習 Demo`)}
          ${k(`<div d-knob="pointer" class="room" labels="${o.map(([e])=>e).join(`,`)}" sweep="80" material="plastic-black"><input type="range" min="0" max="${o.length-1}" step="1" value="0" aria-label="Room lights"></div>`,`照明 Room`)}
        </div>
      </div>
    </section>
  </d-device>
  <d-device class="d-gauges" material="dial-black" radius="1" screws wear="0.35" lighting="console">
    <section class="s-left">
      ${j(`残り`,`Uncalled`)}
      <div class="readouts">
        ${k(`<div d-readout="seven" class="r-left-s" color="amber" digits="3">  35</div>`,`Senate seats`)}
        ${k(`<div d-readout="seven" class="r-left-h" color="amber" digits="3"> 435</div>`,`House seats`)}
      </div>
    </section>
    <section class="s-count">
      ${j(`開票`,`Count`)}
      <div class="readouts">
        ${k(`<div class="stack"><div d-readout="seven" class="r-in" color="amber" digits="3">  --</div><div d-meter="bargraph" class="b-in" segments="16" color="amber"><meter min="0" max="1" value="0"></meter></div></div>`,`Counted %`)}
        ${k(`<div d-readout="seven" class="r-margin" color="amber" digits="3"> --.-</div>`,`Margin pts`)}
      </div>
    </section>
    <section class="s-wires">
      ${j(`報道`,`Wires`)}
      <d-screen class="s-news" kind="crt" gain="2.4" live><canvas width="${u[0]}" height="${u[1]}"></canvas></d-screen>
    </section>
  </d-device>
  </div>
</div>`,css:`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Noto+Sans+JP:wght@700&family=Noto+Serif:wdth,wght@62.5..100,700..900&family=Shippori+Mincho+B1:wght@800&display=swap');
#election { width: ${T(d)}; display: grid; gap: ${T(p)}; }
#election d-device { padding: ${T(f)}; box-sizing: border-box; font: 600 ${T(5)} / 1.05 'Barlow Condensed', 'Noto Sans JP', sans-serif; letter-spacing: .04em; text-transform: uppercase; }
#election .col { display: grid; gap: ${T(2)}; justify-items: center; align-content: end; }
#election .jp { font-family: 'Noto Sans JP', sans-serif; font-weight: 700; letter-spacing: .1em; }
#election .small { font-size: ${T(4.6)}; }

#election .alarms { height: ${T(m)}; display: flex; align-items: center; gap: ${T(8)}; }
#election .matrix { flex: 1 !important; }
#election .tally { flex: none; display: grid; gap: ${T(4)}; align-content: center; }
#election .tug { display: grid; grid-template-columns: ${T(26)} ${T(22)} ${T(_[0])} ${T(22)}; gap: ${T(2.5)}; align-items: end; }
#election .tug-name { white-space: nowrap; align-self: center; }
#election .tug [d-readout] { height: ${T(14)}; }
#election .bars { position: relative; display: grid; gap: ${T(1.5)}; padding-top: ${T(5)}; }
#election .bars [d-meter] { height: ${T(_[1])}; }
#election .bars .line { position: absolute; left: var(--at); top: ${T(4)}; bottom: ${T(-1)}; width: ${T(.8)}; margin-left: ${T(-.4)}; }
#election .bars .at { position: absolute; left: var(--at); top: 0; transform: translateX(-50%); font-size: ${T(3.4)}; }
#election .clock { flex: none; display: grid; gap: ${T(2.5)}; align-content: center; }
#election .timer { width: ${T(74)}; height: ${T(27)}; }
#election .supply [d-lamp] { width: ${T(26)}; height: ${T(12)}; font-size: ${T(3.6)}; }
#election .link { display: flex; gap: ${T(2)}; align-items: center; }
#election .s-link { width: ${T(y[0])}; height: ${T(y[1])}; }
#election .link .led { width: ${T(4.5)}; height: ${T(4.5)}; }
#election .link [d-readout] { width: ${T(14)}; height: ${T(10)}; }
#election .link > [d-mark] { white-space: nowrap; font-size: ${T(3.4)}; }
#election .bay { height: ${T(h)}; padding-block: ${T(6)} !important; display: grid; grid-template-columns: auto auto auto; grid-template-rows: auto auto; align-content: center; justify-content: space-between; align-items: end; row-gap: ${T(4)}; }
#election .bay > .orders { grid-column: 1 / -1; }
#election .side, #election .centre { display: grid; gap: ${T(4)}; align-content: end; }
#election .s-sync { width: ${T(S[1])}; height: ${T(S[1])}; }
#election .matrix { flex: 1; display: grid; grid-template-columns: auto repeat(8, minmax(0, 1fr)); grid-auto-rows: ${T(b[1])}; gap: ${T(2.5)} ${T(1.5)}; align-items: stretch; }
#election .rowname { justify-self: end; align-self: center; font-size: ${T(4.6)}; }
#election [d-lamp~="annunciator"] { display: grid; place-items: center; text-align: center; font-size: ${T(4.2)}; line-height: 1.1; letter-spacing: .02em; }
#election .race { font-size: ${T(5)} !important; white-space: nowrap; letter-spacing: 0 !important; cursor: pointer; }
#election .clock-head { display: flex; gap: ${T(3)}; align-items: baseline; }
#election .clock-head .jp { font-size: ${T(6)}; }
#election .clock-body { display: flex; gap: ${T(3)}; }
#election .supply { display: grid; gap: ${T(3)}; }
#election .k-power { width: ${T(40)}; height: ${T(40)}; font: 700 ${T(8)} / 1 'Noto Sans JP', sans-serif; }

#election .views { display: grid; gap: ${T(2.5)}; height: ${T(48)}; align-content: end; }
#election .views-head { display: flex; gap: ${T(3)}; align-items: baseline; }
#election .views-head .jp { font-size: ${T(6)}; }
#election .view-keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: ${T(3)}; }
#election .view-key { height: ${T(34)}; font-size: ${T(5.4)}; line-height: 1.15; }
#election .orders { display: flex; gap: ${T(3)}; align-items: center; }
#election .orders .jp { font-size: ${T(6)}; }
#election .order { flex: 1; height: ${T(18)}; }
#election .s-magi { width: ${T(x[0])}; height: ${T(x[1])}; }
#election .s-main { width: ${T(S[0])}; height: ${T(S[1])}; }

#election .desk { height: ${T(g)}; display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: ${T(p)}; }
#election .desk > d-device { height: 100%; display: flex; gap: ${T(8)}; padding-block: ${T(7)} ${T(6)}; }
#election .desk section { flex: 1; display: grid; grid-template-rows: ${T(9)} minmax(0, 1fr); gap: ${T(4)}; }
/* Every control on the desk sits centred in its column, with its name on one line along the bottom. */
#election .desk .col { grid-template-rows: minmax(0, 1fr) auto; align-items: center; align-content: stretch; gap: ${T(3)}; }
#election .rk { display: grid; gap: ${T(3)}; justify-items: center; }
#election .stack { display: grid; gap: ${T(2.5)}; }
#election .head { display: flex; gap: ${T(2.5)}; align-items: center; white-space: nowrap; height: ${T(9)}; }
#election .d-gauges .col { grid-template-rows: auto auto; align-content: end; }
#election .d-gauges .readouts { grid-template-rows: auto auto; align-content: end; gap: ${T(5)}; }
#election .head .jp { font: 800 ${T(7)} / 1 'Shippori Mincho B1', serif; }
#election .head .en { font-size: ${T(5)}; }
#election .head .under { flex-basis: 100%; }
#election section > .row { display: flex; gap: ${T(5)}; align-items: end; justify-self: stretch; }
#election [d-knob~="encoder"] { width: ${T(34)}; height: ${T(34)}; }
#election .banded { display: flex; gap: ${T(3)}; align-items: center; }
#election .banded .jp { font: 800 ${T(8.5)} / 1 'Shippori Mincho B1', serif; }
#election .banded .en { font-size: ${T(6.4)}; }
#election .w-band { display: block; flex: 1; height: ${T(4)}; }
#election .watch { display: flex; gap: ${T(6)}; align-items: stretch; }
#election .watch .pick { width: ${T(72)}; height: ${T(72)}; }
#election .watch .k-prev, #election .watch .k-next { width: ${T(30)}; height: ${T(30)}; font: ${T(11)} / 1 'Noto Sans JP', sans-serif; }
#election .power { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: ${T(8)}; align-items: stretch; }
#election .flank { display: flex; gap: ${T(6)}; align-items: stretch; }
#election .checks { display: grid; grid-template-rows: 1fr 1fr; gap: ${T(2)}; }
#election .checks .col > [d-mark] { font-size: ${T(4)}; }
#election .power .col > [d-mark] { white-space: nowrap; }
#election .k-ack { width: ${T(24)}; height: ${T(24)}; font: 700 ${T(5.5)} / 1 'Noto Sans JP', sans-serif; }
#election .k-test { width: ${T(17)}; height: ${T(17)}; font: 700 ${T(4.2)} / 1 'Noto Sans JP', sans-serif; }
#election .vol { width: ${T(22)}; height: ${T(48)}; }
#election .room { width: ${T(28)}; height: ${T(28)}; }
#election .flank:first-child { justify-self: end; }
#election .guard { width: ${T(58)}; height: ${T(58)}; display: grid; place-items: center; }
#election .k-power { width: ${T(50)}; height: ${T(50)}; font: 700 ${T(10)} / 1 'Noto Sans JP', sans-serif; }
#election .power [d-switch~="rocker"] { width: ${T(20)}; height: ${T(30)}; }
#election .power .led { width: ${T(7)}; height: ${T(7)}; }
#election .watch .k-auto { width: ${T(25)}; height: ${T(25)}; margin: ${T(7.5)} ${T(13.5)}; }
#election .watch .led { width: ${T(9)}; height: ${T(9)}; }
#election .watch .col > [d-mark] { font-size: ${T(5.4)}; }
#election .readouts { display: grid; grid-template-rows: 1fr 1fr; gap: ${T(3)}; }
#election .r-in, #election .r-margin, #election .r-left-s, #election .r-left-h { width: ${T(46)}; height: ${T(22)}; }
#election .d-gauges section { flex: none; }
#election d-screen.s-news { width: ${T(v[0])}; height: ${T(v[1])}; }
#election .b-in { width: ${T(46)}; height: ${T(6)}; }`,setup:e=>n(e)};export{F as default};