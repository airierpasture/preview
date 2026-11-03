import"./preload-helper-9vAq-Yc_.js";import"./controls-BcrWij7w.js";import"./print-BNSsXJvI.js";import"./light-BlsVf-IK.js";import{a as e,c as t,i as n,n as r,o as i,r as a,s as o,t as s,u as c}from"./firmware-election-D_TlRFjp.js";var l=720,u=8,d=8,f=92,p=232,m=124,h=[49,23],g=[206,155],_=[264,198],v=2,y=2,b=42,x=e=>`${e*4}px`,S=`#ff7a1a`,C=`#a8551a`,w=(e,t=``,n=S)=>`<span d-mark="label flat" ink="${n}" class="${t}">${e}</span>`,T=(e,t,n=``)=>`<div class="col ${n}">${e}${w(t)}</div>`,E=e=>`<i d-mark="print silk" class="rule ${e}" color="${S}" path="M0 0H100V1H0Z" viewbox="0 0 100 1"></i>`,D=(e,t)=>`<i d-mark="print silk" class="hazard ${e}" color="${S}" viewbox="0 0 ${t*2} 2" path="${Array.from({length:t},(e,t)=>`M${t*2} 2L${t*2+1} 0H${t*2+2}L${t*2+1} 2Z`).join(``)}"></i>`,O=(e,t)=>`<div class="head">${w(e,`jp`)}${w(t,`en`)}${E(`under`)}</div>`,k=[...e.map(([e,t,n],r)=>{let i=t===`S`?`Senate`:`Governor`;return`<div d-lamp="annunciator" class="m-${r} race" color="amber" data-race="${e} ${i}" role="button" aria-label="${e} ${i}">${n}${t===`S`?`上院`:`知事`}<br>${e} ${t===`S`?`Sen`:`Gov`}</div>`}),...s.map(([e,t,n,r])=>`<div d-lamp="annunciator" class="t-${e}" color="${r}">${t}<br>${n}</div>`)],A=(e,t,n,r)=>T(`<div d-meter="gauge" class="g-${e}" ticks="4" minor="3" zones="${r}-${n} amber" label="${t}"><meter min="0" max="${n}" value="0"></meter></div>`,t),j={id:`election`,title:`Election watch`,note:`The operations station, seconded to election night, reading every race from civicAPI. It powers up, says what its controls do, and then on Auto watches whatever is happening. Press a lamp, or Prev and Next, to pick a race; the view keys pick what the map shows.`,era:`retro`,order:91,dark:!0,height:1856,states:{"house view":[`.view-key:nth-child(2)`],"next race":[`.k-next`]},html:`<div id="election">
  <d-device class="alarms" material="paint-panel-black" radius="4" screws wear="0.35">
    <div class="ident">
      <span d-mark="print silk" class="nerv" color="${S}">NERV</span>
      ${w(`選挙監視所`,`jp`)}
      ${w(`Election watch 03`,`en`)}
      ${D(`id-band`,12)}
    </div>
    <div class="matrix">
      ${i.map((e,t)=>`${w(e,`rowname`,C)}${k.slice(t*8,(t+1)*8).join(``)}`).join(``)}
    </div>
    <div class="acks">
      <button d-key="flush" class="k-prev" color="amber" aria-label="Previous race">Prev</button>
      <button d-key="lamp" class="k-auto" color="cyan" aria-label="Autopilot">Auto</button>
      <button d-key="flush" class="k-next" color="amber" aria-label="Next race">Next</button>
    </div>
    <div class="clock">
      <div class="clock-head">${w(`次の締切まで`,`jp`)}${w(`Next polls close`,`en`)}</div>
      <div class="clock-body">
        <div d-readout="seven" class="timer" color="red" digits="6">--:--:--</div>
        <div class="supply">
          <div d-lamp="annunciator" class="t-demo" color="violet">演習<br>Demo</div>
          <div d-lamp="annunciator" class="t-live" color="green">自動<br>Live</div>
        </div>
      </div>
    </div>
  </d-device>
  <d-device class="bay" material="paint-panel-black" radius="4" wear="0.35">
    <div class="side">
      <div class="views">
        <div class="views-head">${w(`表示`,`jp`)}${w(`View`,`en`)}</div>
        <div class="view-keys">${t.map(([e,t],n)=>`<button d-key="tab lit" class="view-key" aria-pressed="${n===0}" aria-label="Show ${t}">${e}<br>${t}</button>`).join(``)}</div>
      </div>
      ${T(`<d-screen class="s-magi" kind="crt" gain="2.6" live><canvas width="${a[0]}" height="${a[1]}"></canvas></d-screen>`,`MAGI 審議`)}
    </div>
    <div class="centre">
      <div class="orders">${w(`速報`,`jp`)}<div d-readout="matrix" class="order" color="amber" scroll pitch="${v}" frame="${y}"></div></div>
      ${T(`<d-screen class="s-main" kind="crt" gain="2.6" live><canvas width="${n[0]}" height="${n[1]}"></canvas></d-screen>`,`戦術 Tactical`)}
    </div>
    <div class="side">
      <div class="gauges">${r.map(([e,t,n,r])=>`<div class="gauge">${w(`${t} ${n}`,`small`)}<div d-readout="seven" class="r-${e}" color="${r}" digits="3"></div></div>`).join(``)}</div>
      ${T(`<d-screen class="s-sync" kind="crt" mono gain="2.4" live><canvas width="${o[0]}" height="${o[1]}"></canvas></d-screen>`,`シンクロ Harmonics`)}
    </div>
  </d-device>
  <d-device class="desk" material="paint-panel-black" radius="4" screws wear="0.35">
    <section class="s-watch">
      ${O(`観測`,`Watch`)}
      <div class="row">
        ${T(`<div d-knob="encoder" class="pick" color="green"><input type="range" min="0" max="${e.length-1}" step="1" value="4" aria-label="Race"></div>`,`Race`)}
      </div>
    </section>
    ${E(`split`)}
    <section class="s-seats">
      ${O(`議席`,`Seats`)}
      <div class="row">${A(`hd`,`House D`,240,218)}${A(`hr`,`House R`,240,218)}${A(`sd`,`Sen D`,60,51)}${A(`sr`,`Sen R`,60,51)}</div>
    </section>
    ${E(`split`)}
    <section class="s-left">
      ${O(`残り`,`Uncalled`)}
      <div class="readouts">
        ${T(`<div d-readout="seven" class="r-left-s" color="amber" digits="3">  35</div>`,`Senate seats`)}
        ${T(`<div d-readout="seven" class="r-left-h" color="amber" digits="3"> 435</div>`,`House seats`)}
      </div>
    </section>
    ${E(`split`)}
    <section class="s-count">
      ${O(`開票`,`Count`)}
      <div class="readouts">
        ${T(`<div d-readout="seven" class="r-in" color="green" digits="3">  --</div>`,`Counted %`)}
        ${T(`<div d-readout="seven" class="r-margin" color="amber" digits="3"> --.-</div>`,`Margin pts`)}
        ${T(`<div d-meter="bargraph" class="b-in" segments="16" color="green"><meter min="0" max="1" value="0"></meter></div>`,`Counted`)}
      </div>
    </section>
  </d-device>
</div>`,css:`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Noto+Sans+JP:wght@700&family=Noto+Serif:wdth,wght@62.5..100,700..900&family=Shippori+Mincho+B1:wght@800&display=swap');
#election { width: ${x(l)}; display: grid; gap: ${x(d)}; }
#election d-device { padding: ${x(u)}; box-sizing: border-box; font: 600 ${x(5)} / 1.05 'Barlow Condensed', 'Noto Sans JP', sans-serif; letter-spacing: .04em; text-transform: uppercase; }
#election .col { display: grid; gap: ${x(2)}; justify-items: center; align-content: end; }
#election .jp { font-family: 'Noto Sans JP', sans-serif; font-weight: 700; letter-spacing: .1em; }
#election .small { font-size: ${x(4.6)}; }
#election .rule { display: block; width: 100%; height: ${x(.7)}; }

#election .alarms { height: ${x(f)}; display: flex; align-items: center; gap: ${x(8)}; }
#election .ident { display: grid; gap: ${x(1.5)}; align-self: stretch; align-content: center; width: ${x(50)}; }
#election .nerv { font: 900 ${x(19)} / 1 'Noto Serif', serif; font-stretch: 62.5%; letter-spacing: 0; }
#election .ident .jp { font-size: ${x(6)}; }
#election .ident .en { font-size: ${x(4.6)}; }
#election .id-band { display: block; width: 100%; height: ${x(4)}; margin-top: ${x(2)}; }
#election .matrix { display: grid; grid-template-columns: auto repeat(8, ${x(h[0])}); grid-auto-rows: ${x(h[1])}; gap: ${x(2)}; align-items: center; }
#election .rowname { justify-self: end; font-size: ${x(4.6)}; }
#election [d-lamp~="annunciator"] { display: grid; place-items: center; text-align: center; font-size: ${x(5.2)}; line-height: 1.1; letter-spacing: .02em; }
#election .race { font-size: ${x(4.4)} !important; letter-spacing: 0 !important; cursor: pointer; }
#election .acks { display: grid; gap: ${x(3)}; }
#election .acks [d-key] { width: ${x(21)}; height: ${x(21)}; font-size: ${x(4.2)}; }
#election .clock { margin-left: auto; display: grid; gap: ${x(2)}; }
#election .clock-head { display: flex; gap: ${x(3)}; align-items: baseline; }
#election .clock-head .jp { font-size: ${x(6)}; }
#election .clock-body { display: flex; gap: ${x(3)}; }
#election .timer { width: ${x(112)}; height: ${x(46)}; }
#election .supply { display: grid; gap: ${x(3)}; }
#election .supply [d-lamp] { width: ${x(36)}; height: ${x(21.5)}; font-size: ${x(4.4)}; }

#election .bay { height: ${x(p)}; padding-block: ${x(6)} !important; display: flex; justify-content: space-between; align-items: end; }
#election .side { display: grid; gap: ${x(4)}; align-content: end; }
#election .views { display: grid; gap: ${x(2.5)}; height: ${x(48)}; align-content: end; }
#election .views-head { display: flex; gap: ${x(3)}; align-items: baseline; }
#election .views-head .jp { font-size: ${x(6)}; }
#election .view-keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: ${x(3)}; }
#election .view-key { height: ${x(34)}; font-size: ${x(5.4)}; line-height: 1.15; }
#election .centre { display: grid; gap: ${x(3)}; align-content: end; }
#election .orders { display: flex; gap: ${x(3)}; align-items: center; }
#election .orders .jp { font-size: ${x(6)}; }
#election .order { flex: 1; height: ${x(18)}; }
#election .gauges { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: ${x(3)}; height: ${x(48)}; }
#election .gauge { display: grid; gap: ${x(1.5)}; align-content: end; }
#election .gauges [d-readout] { height: ${x(34)}; }
#election .s-magi, #election .s-sync { width: ${x(g[0])}; height: ${x(g[1])}; }
#election .s-main { width: ${x(_[0])}; height: ${x(_[1])}; }

#election .desk { height: ${x(m)}; display: flex; align-items: stretch; justify-content: space-between; gap: ${x(5)}; }
#election .split { width: ${x(.7)}; height: auto; align-self: stretch; }
#election section { display: grid; grid-template-rows: auto minmax(0, 1fr); gap: ${x(3)}; }
#election .head { display: flex; gap: ${x(2.5)}; align-items: baseline; flex-wrap: wrap; align-self: start; }
#election .head .jp { font-size: ${x(6.4)}; }
#election .head .en { font-size: ${x(5)}; }
#election .head .under { flex-basis: 100%; }
#election section > .row { display: flex; gap: ${x(5)}; align-items: end; justify-self: stretch; }
#election [d-knob~="encoder"] { width: ${x(34)}; height: ${x(34)}; }
#election [d-meter~="gauge"] { width: ${x(b)}; height: ${x(b)}; }
#election .readouts { display: grid; gap: ${x(3)}; align-content: end; }
#election .r-in, #election .r-margin, #election .r-left-s, #election .r-left-h { width: ${x(48)}; height: ${x(20)}; }
#election .b-in { width: ${x(48)}; height: ${x(8)}; }`,setup:e=>c(e)};export{j as default};