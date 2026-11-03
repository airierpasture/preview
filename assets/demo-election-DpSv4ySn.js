import"./preload-helper-9vAq-Yc_.js";import"./controls-BcrWij7w.js";import"./print-BNSsXJvI.js";import"./light-BlsVf-IK.js";import{a as e,c as t,i as n,n as r,o as i,r as a,s as o,t as s,u as c}from"./firmware-election-Qde8M1my.js";var l=720,u=8,d=8,f=92,p=232,m=30,h=124,g=[49,23],_=[206,155],v=[264,198],y=2,b=2,x=42,S=e=>`${e*4}px`,C=`#ff7a1a`,w=`#a8551a`,T=(e,t=``,n=C)=>`<span d-mark="label flat" ink="${n}" class="${t}">${e}</span>`,E=(e,t,n=``)=>`<div class="col ${n}">${e}${T(t)}</div>`,D=e=>`<i d-mark="print silk" class="rule ${e}" color="${C}" path="M0 0H100V1H0Z" viewbox="0 0 100 1"></i>`,O=(e,t)=>`<i d-mark="print silk" class="hazard ${e}" color="${C}" viewbox="0 0 ${t*2} 2" path="${Array.from({length:t},(e,t)=>`M${t*2} 2L${t*2+1} 0H${t*2+2}L${t*2+1} 2Z`).join(``)}"></i>`,k=(e,t)=>`<div class="head">${T(e,`jp`)}${T(t,`en`)}${D(`under`)}</div>`,A=[...e.map(([e,t,n],r)=>{let i=t===`S`?`Senate`:`Governor`;return`<div d-lamp="annunciator" class="m-${r} race" color="amber" data-race="${e} ${i}" role="button" aria-label="${e} ${i}">${n}${t===`S`?`上院`:`知事`}<br>${e} ${t===`S`?`Sen`:`Gov`}</div>`}),...s.map(([e,t,n,r])=>`<div d-lamp="annunciator" class="t-${e}" color="${r}">${t}<br>${n}</div>`)],j=(e,t,n,r)=>E(`<div d-meter="gauge" class="g-${e}" ticks="4" minor="3" zones="${r}-${n} amber" label="${t}"><meter min="0" max="${n}" value="0"></meter></div>`,t),M={id:`election`,title:`Election watch`,note:`The operations station, seconded to election night, reading every race from civicAPI. It powers up, says what its controls do, and then on Auto watches whatever is happening. Press a lamp, or Prev and Next, to pick a race; the view keys pick what the map shows.`,era:`retro`,order:91,dark:!0,height:2008,states:{"house view":[`.view-key:nth-child(2)`],"next race":[`.k-next`]},html:`<div id="election">
  <d-device class="alarms" material="paint-panel-black" radius="4" screws wear="0.35">
    <div class="ident">
      <span d-mark="print silk" class="nerv" color="${C}">NERV</span>
      ${T(`選挙監視所`,`jp`)}
      ${T(`Election watch 03`,`en`)}
      ${O(`id-band`,12)}
    </div>
    <div class="matrix">
      ${i.map((e,t)=>`${T(e,`rowname`,w)}${A.slice(t*8,(t+1)*8).join(``)}`).join(``)}
    </div>
    <div class="clock">
      <div class="clock-head">${T(`次の締切まで`,`jp`)}${T(`Next polls close`,`en`)}</div>
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
        <div class="views-head">${T(`表示`,`jp`)}${T(`View`,`en`)}</div>
        <div class="view-keys">${t.map(([e,t],n)=>`<button d-key="tab lit" class="view-key" aria-pressed="${n===0}" aria-label="Show ${t}">${e}<br>${t}</button>`).join(``)}</div>
      </div>
      ${E(`<d-screen class="s-magi" kind="crt" gain="2.6" live><canvas width="${a[0]}" height="${a[1]}"></canvas></d-screen>`,`MAGI 審議`)}
    </div>
    <div class="centre">
      <div class="orders">${T(`速報`,`jp`)}<div d-readout="matrix" class="order" color="amber" scroll pitch="${y}" frame="${b}"></div></div>
      ${E(`<d-screen class="s-main" kind="crt" gain="2.6" live><canvas width="${n[0]}" height="${n[1]}"></canvas></d-screen>`,`戦術 Tactical`)}
    </div>
    <div class="side">
      <div class="gauges">${r.map(([e,t,n,r])=>`<div class="gauge">${T(`${t} ${n}`,`small`)}<div d-readout="seven" class="r-${e}" color="${r}" digits="3"></div></div>`).join(``)}</div>
      ${E(`<d-screen class="s-sync" kind="crt" mono gain="2.4" live><canvas width="${o[0]}" height="${o[1]}"></canvas></d-screen>`,`シンクロ Harmonics`)}
    </div>
  </d-device>
  <d-device class="news" material="paint-panel-black" radius="4" wear="0.35">
    <div class="news-head">${T(`報道`,`jp`)}${T(`News`,`en`)}</div>
    <div d-readout="matrix" class="news-crawl" color="green" scroll pitch="${y}" frame="${b}"></div>
    ${T(`AP / Reuters / NPR`,`small news-src`,w)}
  </d-device>
  <d-device class="desk" material="paint-panel-black" radius="4" screws wear="0.35">
    <section class="s-watch">
      <div class="watch-head">${O(`w-band`,6)}${T(`選択`,`jp`)}${T(`Pick a race`,`en`)}${O(`w-band`,6)}</div>
      <div class="watch">
        ${E(`<button d-key="flush" class="k-prev" color="amber" on aria-label="Previous race">◀</button>`,`Prev`)}
        ${E(`<div d-knob="encoder" class="pick" color="cyan" segments="15"><input type="range" min="0" max="${e.length-1}" step="1" value="4" aria-label="Race"></div>`,`Turn for race`)}
        ${E(`<button d-key="flush" class="k-next" color="amber" on aria-label="Next race">▶</button>`,`Next`)}
        ${E(`<button d-key="lamp" class="k-auto" color="cyan" aria-label="Autopilot">自動<br>Auto</button>`,`Autopilot`)}
      </div>
    </section>
    ${D(`split`)}
    <section class="s-seats">
      ${k(`議席`,`Seats`)}
      <div class="row">${j(`hd`,`House D`,240,218)}${j(`hr`,`House R`,240,218)}${j(`sd`,`Sen D`,60,51)}${j(`sr`,`Sen R`,60,51)}</div>
    </section>
    ${D(`split`)}
    <section class="s-left">
      ${k(`残り`,`Uncalled`)}
      <div class="readouts">
        ${E(`<div d-readout="seven" class="r-left-s" color="amber" digits="3">  35</div>`,`Senate seats`)}
        ${E(`<div d-readout="seven" class="r-left-h" color="amber" digits="3"> 435</div>`,`House seats`)}
      </div>
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
#election { width: ${S(l)}; display: grid; gap: ${S(d)}; }
#election d-device { padding: ${S(u)}; box-sizing: border-box; font: 600 ${S(5)} / 1.05 'Barlow Condensed', 'Noto Sans JP', sans-serif; letter-spacing: .04em; text-transform: uppercase; }
#election .col { display: grid; gap: ${S(2)}; justify-items: center; align-content: end; }
#election .jp { font-family: 'Noto Sans JP', sans-serif; font-weight: 700; letter-spacing: .1em; }
#election .small { font-size: ${S(4.6)}; }
#election .rule { display: block; width: 100%; height: ${S(.7)}; }

#election .alarms { height: ${S(f)}; display: flex; align-items: center; gap: ${S(8)}; }
#election .ident { display: grid; gap: ${S(1.5)}; align-self: stretch; align-content: center; width: ${S(50)}; }
#election .nerv { font: 900 ${S(19)} / 1 'Noto Serif', serif; font-stretch: 62.5%; letter-spacing: 0; }
#election .ident .jp { font-size: ${S(6)}; }
#election .ident .en { font-size: ${S(4.6)}; }
#election .id-band { display: block; width: 100%; height: ${S(4)}; margin-top: ${S(2)}; }
#election .matrix { display: grid; grid-template-columns: auto repeat(8, ${S(g[0])}); grid-auto-rows: ${S(g[1])}; gap: ${S(2)}; align-items: center; }
#election .rowname { justify-self: end; font-size: ${S(4.6)}; }
#election [d-lamp~="annunciator"] { display: grid; place-items: center; text-align: center; font-size: ${S(5.2)}; line-height: 1.1; letter-spacing: .02em; }
#election .race { font-size: ${S(4.4)} !important; letter-spacing: 0 !important; cursor: pointer; }
#election .clock { margin-left: auto; display: grid; gap: ${S(2)}; }
#election .clock-head { display: flex; gap: ${S(3)}; align-items: baseline; }
#election .clock-head .jp { font-size: ${S(6)}; }
#election .clock-body { display: flex; gap: ${S(3)}; }
#election .timer { width: ${S(112)}; height: ${S(46)}; }
#election .supply { display: grid; gap: ${S(3)}; }
#election .supply [d-lamp] { width: ${S(36)}; height: ${S(21.5)}; font-size: ${S(4.4)}; }

#election .bay { height: ${S(p)}; padding-block: ${S(6)} !important; display: flex; justify-content: space-between; align-items: end; }
#election .side { display: grid; gap: ${S(4)}; align-content: end; }
#election .views { display: grid; gap: ${S(2.5)}; height: ${S(48)}; align-content: end; }
#election .views-head { display: flex; gap: ${S(3)}; align-items: baseline; }
#election .views-head .jp { font-size: ${S(6)}; }
#election .view-keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: ${S(3)}; }
#election .view-key { height: ${S(34)}; font-size: ${S(5.4)}; line-height: 1.15; }
#election .centre { display: grid; gap: ${S(3)}; align-content: end; }
#election .orders { display: flex; gap: ${S(3)}; align-items: center; }
#election .orders .jp { font-size: ${S(6)}; }
#election .order { flex: 1; height: ${S(18)}; }
#election .gauges { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: ${S(3)}; height: ${S(48)}; }
#election .gauge { display: grid; gap: ${S(1.5)}; align-content: end; }
#election .gauges [d-readout] { height: ${S(34)}; }
#election .s-magi, #election .s-sync { width: ${S(_[0])}; height: ${S(_[1])}; }
#election .s-main { width: ${S(v[0])}; height: ${S(v[1])}; }

#election .news { height: ${S(m)}; display: flex; align-items: center; gap: ${S(5)}; }
#election .news-head { display: grid; gap: ${S(1)}; }
#election .news-head .jp { font-size: ${S(6.4)}; }
#election .news-crawl { flex: 1; height: ${S(18)}; }

#election .desk { height: ${S(h)}; display: flex; align-items: stretch; justify-content: space-between; gap: ${S(5)}; }
#election .split { width: ${S(.7)}; height: auto; align-self: stretch; }
#election section { display: grid; grid-template-rows: auto minmax(0, 1fr); gap: ${S(3)}; }
#election .head { display: flex; gap: ${S(2.5)}; align-items: baseline; flex-wrap: wrap; align-self: start; }
#election .head .jp { font-size: ${S(6.4)}; }
#election .head .en { font-size: ${S(5)}; }
#election .head .under { flex-basis: 100%; }
#election section > .row { display: flex; gap: ${S(5)}; align-items: end; justify-self: stretch; }
#election [d-knob~="encoder"] { width: ${S(34)}; height: ${S(34)}; }
#election .watch-head { display: flex; gap: ${S(3)}; align-items: center; }
#election .watch-head .jp { font-size: ${S(8)}; }
#election .watch-head .en { font-size: ${S(6.4)}; }
#election .w-band { display: block; flex: 1; height: ${S(4)}; }
#election .watch { display: flex; gap: ${S(6)}; align-items: center; }
#election .watch .pick { width: ${S(70)}; height: ${S(70)}; }
#election .watch .k-prev, #election .watch .k-next { width: ${S(30)}; height: ${S(30)}; font-size: ${S(9)}; }
#election .watch .k-auto { width: ${S(40)}; height: ${S(40)}; font-size: ${S(6)}; line-height: 1.1; }
#election .watch .col > [d-mark] { font-size: ${S(5.4)}; }
#election [d-meter~="gauge"] { width: ${S(x)}; height: ${S(x)}; }
#election .readouts { display: grid; gap: ${S(3)}; align-content: end; }
#election .r-in, #election .r-margin, #election .r-left-s, #election .r-left-h { width: ${S(48)}; height: ${S(20)}; }
#election .b-in { width: ${S(48)}; height: ${S(8)}; }`,setup:e=>c(e)};export{M as default};