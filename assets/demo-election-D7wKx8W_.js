import"./preload-helper-9vAq-Yc_.js";import"./controls-BcrWij7w.js";import"./print-BNSsXJvI.js";import"./light-BlsVf-IK.js";import{a as e,c as t,d as n,i as r,l as i,n as a,o,r as s,s as c,t as l}from"./firmware-election-Bc3U97_Z.js";var u=720,d=8,f=8,p=92,m=232,h=124,g=[49,23],_=[206,155],v=[264,198],y=2,b=2,x=42,S=e=>`${e*4}px`,C=`#ff7a1a`,w=`#a8551a`,T=(e,t=``,n=C)=>`<span d-mark="label flat" ink="${n}" class="${t}">${e}</span>`,E=(e,t,n=``)=>`<div class="col ${n}">${e}${T(t)}</div>`,D=e=>`<i d-mark="print silk" class="rule ${e}" color="${C}" path="M0 0H100V1H0Z" viewbox="0 0 100 1"></i>`,O=(e,t)=>`<i d-mark="print silk" class="hazard ${e}" color="${C}" viewbox="0 0 ${t*2} 2" path="${Array.from({length:t},(e,t)=>`M${t*2} 2L${t*2+1} 0H${t*2+2}L${t*2+1} 2Z`).join(``)}"></i>`,k=(e,t)=>`<div class="head">${T(e,`jp`)}${T(t,`en`)}${D(`under`)}</div>`,A=[...c.map(([e,t,n,r])=>`<div d-lamp="annunciator" class="t-${e} race" color="amber" data-race="${t} ${n}" role="img" aria-label="${t} ${n}">${r}${n===`Senate`?`上院`:`知事`}<br>${t} ${n===`Senate`?`Sen`:`Gov`}</div>`),...l.map(([e,t,n,r])=>`<div d-lamp="annunciator" class="t-${e}" color="${r}">${t}<br>${n}</div>`)],j=(e,t,n,r)=>E(`<div d-meter="gauge" class="g-${e}" ticks="4" minor="3" zones="${r}-${n} amber" label="${t}"><meter min="0" max="${n}" value="0"></meter></div>`,t),M={id:`election`,title:`Election watch`,note:`The operations station, seconded to election night. Turn the race knob to pick a race, the layer knob to change the map, and press a MAGI key to see its sources. Turn both keys and lift the guard to call one early, if you must.`,era:`retro`,order:91,dark:!0,height:1856,states:{"magi focus":[`.vote`],"guard up":[`.guard > input`]},html:`<div id="election">
  <d-device class="alarms" material="paint-panel-black" radius="4" screws wear="0.35">
    <div class="ident">
      <span d-mark="print silk" class="nerv" color="${C}">NERV</span>
      ${T(`選挙監視所`,`jp`)}
      ${T(`Election watch 03`,`en`)}
      ${O(`id-band`,12)}
    </div>
    <div class="matrix">
      ${t.map((e,t)=>`${T(e,`rowname`,w)}${A.slice(t*8,(t+1)*8).join(``)}`).join(``)}
    </div>
    <div class="acks">
      <button d-key="flush" class="k-ack" color="amber">Ack</button>
      <button d-key="flush" class="k-test" color="white">Test</button>
      <button d-key="flush" class="k-refresh" color="green">Fetch</button>
    </div>
    <div class="clock">
      <div class="clock-head">${T(`次の締切まで`,`jp`)}${T(`Next polls close`,`en`)}</div>
      <div class="clock-body">
        <div d-readout="seven" class="timer" color="red" digits="6">--:--:--</div>
        <div class="supply">
          <div d-lamp="annunciator" class="t-manual" color="amber">手動<br>Manual</div>
          <div d-lamp="annunciator" class="t-live" color="green">自動<br>Live</div>
        </div>
      </div>
    </div>
  </d-device>
  <d-device class="bay" material="paint-panel-black" radius="4" wear="0.35">
    <div class="side">
      <div class="votes">${[`Melchior·1`,`Balthasar·2`,`Casper·3`].map(e=>`<button d-key="lamp" class="vote" color="cyan">${e}</button>`).join(``)}</div>
      ${E(`<d-screen class="s-magi" kind="crt" gain="2.6" live><canvas width="${r[0]}" height="${r[1]}"></canvas></d-screen>`,`MAGI 審議`)}
    </div>
    <div class="centre">
      <div class="orders">${T(`速報`,`jp`)}<div d-readout="matrix" class="order" color="amber" scroll pitch="${y}" frame="${b}"></div></div>
      ${E(`<d-screen class="s-main" kind="crt" gain="2.6" live><canvas width="${e[0]}" height="${e[1]}"></canvas></d-screen>`,`戦術 Tactical`)}
    </div>
    <div class="side">
      <div class="gauges">${a.map(([e,t,n,r])=>`<div class="gauge">${T(`${t} ${n}`,`small`)}<div d-readout="seven" class="r-${e}" color="${r}" digits="3"></div></div>`).join(``)}</div>
      ${E(`<d-screen class="s-sync" kind="crt" mono gain="2.4" live><canvas width="${i[0]}" height="${i[1]}"></canvas></d-screen>`,`シンクロ Harmonics`)}
    </div>
  </d-device>
  <d-device class="desk" material="paint-panel-black" radius="4" screws wear="0.35">
    <section class="s-watch">
      ${k(`観測`,`Watch`)}
      <div class="row">
        ${E(`<div d-knob="encoder" class="pick" color="green"><input type="range" min="0" max="${c.length-1}" step="1" value="1" aria-label="Race"></div>`,`Race`)}
        ${E(`<div d-knob="pointer" class="layer" labels="${s.join(`,`)}" sweep="200"><input type="range" min="0" max="${s.length-1}" step="1" value="0" aria-label="Map layer"></div>`,`Layer`)}
      </div>
    </section>
    ${D(`split`)}
    <section class="s-seats">
      ${k(`議席`,`Seats`)}
      <div class="row">${j(`hd`,`House D`,240,218)}${j(`hr`,`House R`,240,218)}${j(`sd`,`Sen D`,60,51)}${j(`sr`,`Sen R`,60,51)}</div>
    </section>
    ${D(`split`)}
    <section class="s-arm">
      ${k(`早期判定`,`Call it early`)}
      <div class="row arm">
        ${E(`<div d-switch="key" labels="Safe,Arm"><input type="checkbox" class="key" aria-label="Hot take key"></div>`,`Hot take`)}
        <div class="col">
          <div class="pit">${O(`pit-band`,12)}<div d-cover="guard" class="guard"><input type="checkbox" aria-label="Lift the guard"><button d-key="arcade" class="go" material="plastic-red" aria-label="Call it"></button></div>${O(`pit-band`,12)}</div>
          ${T(`判定 Call it`)}
        </div>
        ${E(`<div d-switch="key" labels="Safe,Arm"><input type="checkbox" class="key" aria-label="Vibes key"></div>`,`Vibes`)}
      </div>
    </section>
    ${D(`split`)}
    <section class="s-modes">
      ${k(`模式`,`Modes`)}
      <div class="row">${o.map(([e,t])=>E(`<div d-switch="toggle"><input type="checkbox" class="m-${e}" aria-label="${t}"${e===`alarms`?` checked`:``}></div>`,t)).join(``)}</div>
    </section>
    ${D(`split`)}
    <section class="s-count">
      ${k(`開票`,`Count`)}
      <div class="readouts">
        ${E(`<div d-readout="seven" class="r-in" color="green" digits="3">  --</div>`,`Counted %`)}
        ${E(`<div d-readout="seven" class="r-margin" color="amber" digits="3"> --.-</div>`,`Margin pts`)}
        ${E(`<div d-meter="bargraph" class="b-in" segments="16" color="green"><meter min="0" max="1" value="0"></meter></div>`,`Counted`)}
      </div>
    </section>
  </d-device>
</div>`,css:`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Noto+Sans+JP:wght@700&family=Noto+Serif:wdth,wght@62.5..100,700..900&family=Shippori+Mincho+B1:wght@800&display=swap');
#election { width: ${S(u)}; display: grid; gap: ${S(f)}; }
#election d-device { padding: ${S(d)}; box-sizing: border-box; font: 600 ${S(5)} / 1.05 'Barlow Condensed', 'Noto Sans JP', sans-serif; letter-spacing: .04em; text-transform: uppercase; }
#election .col { display: grid; gap: ${S(2)}; justify-items: center; align-content: end; }
#election .jp { font-family: 'Noto Sans JP', sans-serif; font-weight: 700; letter-spacing: .1em; }
#election .small { font-size: ${S(4.6)}; }
#election .rule { display: block; width: 100%; height: ${S(.7)}; }

#election .alarms { height: ${S(p)}; display: flex; align-items: center; gap: ${S(8)}; }
#election .ident { display: grid; gap: ${S(1.5)}; align-self: stretch; align-content: center; width: ${S(50)}; }
#election .nerv { font: 900 ${S(19)} / 1 'Noto Serif', serif; font-stretch: 62.5%; letter-spacing: 0; }
#election .ident .jp { font-size: ${S(6)}; }
#election .ident .en { font-size: ${S(4.6)}; }
#election .id-band { display: block; width: 100%; height: ${S(4)}; margin-top: ${S(2)}; }
#election .matrix { display: grid; grid-template-columns: auto repeat(8, ${S(g[0])}); grid-auto-rows: ${S(g[1])}; gap: ${S(2)}; align-items: center; }
#election .rowname { justify-self: end; font-size: ${S(4.6)}; }
#election [d-lamp~="annunciator"] { display: grid; place-items: center; text-align: center; font-size: ${S(5.2)}; line-height: 1.1; letter-spacing: .02em; }
#election .race { font-size: ${S(4.4)} !important; letter-spacing: 0 !important; }
#election .acks { display: grid; gap: ${S(3)}; }
#election .acks [d-key] { width: ${S(21)}; height: ${S(21)}; font-size: ${S(4.2)}; }
#election .clock { margin-left: auto; display: grid; gap: ${S(2)}; }
#election .clock-head { display: flex; gap: ${S(3)}; align-items: baseline; }
#election .clock-head .jp { font-size: ${S(6)}; }
#election .clock-body { display: flex; gap: ${S(3)}; }
#election .timer { width: ${S(112)}; height: ${S(46)}; }
#election .supply { display: grid; gap: ${S(3)}; }
#election .supply [d-lamp] { width: ${S(36)}; height: ${S(21.5)}; font-size: ${S(4.4)}; }

#election .bay { height: ${S(m)}; padding-block: ${S(6)} !important; display: flex; justify-content: space-between; align-items: end; }
#election .side { display: grid; gap: ${S(4)}; align-content: end; }
#election .votes { display: grid; grid-template-columns: repeat(3, 1fr); gap: ${S(3)}; }
#election .vote { height: ${S(48)}; font-size: ${S(5.6)}; }
#election .centre { display: grid; gap: ${S(3)}; align-content: end; }
#election .orders { display: flex; gap: ${S(3)}; align-items: center; }
#election .orders .jp { font-size: ${S(6)}; }
#election .order { flex: 1; height: ${S(18)}; }
#election .gauges { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: ${S(3)}; height: ${S(48)}; }
#election .gauge { display: grid; gap: ${S(1.5)}; align-content: end; }
#election .gauges [d-readout] { height: ${S(34)}; }
#election .s-magi, #election .s-sync { width: ${S(_[0])}; height: ${S(_[1])}; }
#election .s-main { width: ${S(v[0])}; height: ${S(v[1])}; }

#election .desk { height: ${S(h)}; display: flex; align-items: stretch; justify-content: space-between; gap: ${S(5)}; }
#election .split { width: ${S(.7)}; height: auto; align-self: stretch; }
#election section { display: grid; grid-template-rows: auto minmax(0, 1fr); gap: ${S(3)}; }
#election .head { display: flex; gap: ${S(2.5)}; align-items: baseline; flex-wrap: wrap; align-self: start; }
#election .head .jp { font-size: ${S(6.4)}; }
#election .head .en { font-size: ${S(5)}; }
#election .head .under { flex-basis: 100%; }
#election section > .row { display: flex; gap: ${S(5)}; align-items: end; justify-self: stretch; }
#election [d-knob~="encoder"] { width: ${S(34)}; height: ${S(34)}; }
#election [d-knob~="pointer"] { width: ${S(40)}; height: ${S(40)}; font-size: ${S(4)}; }
#election [d-meter~="gauge"] { width: ${S(x)}; height: ${S(x)}; }
#election [d-switch~="key"] { width: ${S(44)}; height: ${S(44)}; }
#election .pit { display: grid; gap: ${S(2)}; justify-items: center; width: ${S(58)}; }
#election .pit-band { display: block; width: 100%; height: ${S(5)}; }
#election .guard { width: ${S(48)}; height: ${S(56)}; display: grid; place-items: center; }
#election .go { width: ${S(40)}; height: ${S(40)}; }
#election .arm .col > [d-mark] { margin-top: ${S(3)}; }
#election .s-modes [d-switch~="toggle"] { width: ${S(18)}; height: ${S(32)}; }
#election .s-modes .col > [d-mark] { margin-top: ${S(10)}; }
#election .readouts { display: grid; gap: ${S(3)}; align-content: end; }
#election .r-in, #election .r-margin { width: ${S(48)}; height: ${S(20)}; }
#election .b-in { width: ${S(48)}; height: ${S(8)}; }`,setup:e=>n(e)};export{M as default};