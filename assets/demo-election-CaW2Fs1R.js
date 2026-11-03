import"./preload-helper-CJ-RuuQs.js";import"./controls-DmWWBdN9.js";import"./print-DZK4ggvU.js";import"./light-BZbJzKlA.js";import"./synth-YcfwWRaV.js";import{a as e,c as t,d as n,i as r,l as i,n as a,o,r as s,s as c,t as l}from"./firmware-election-BriN6Igj.js";var u=720,d=8,f=8,p=92,m=232,h=124,g=[112,78],_=[49,23],v=[206,155],y=[264,198],b=2,x=2,S=e=>`${e*4}px`,C=`#ff7a1a`,w=`#a8551a`,T=(e,t=``,n=C)=>`<span d-mark="label flat" ink="${n}" class="${t}">${e}</span>`,E=(e,t,n=``)=>`<div class="col ${n}">${e}${T(t)}</div>`,D=e=>`<i d-mark="print silk" class="rule ${e}" color="${C}" path="M0 0H100V1H0Z" viewbox="0 0 100 1"></i>`,O=(e,t)=>`<i d-mark="print silk" class="hazard ${e}" color="${C}" viewbox="0 0 ${t*2} 2" path="${Array.from({length:t},(e,t)=>`M${t*2} 2L${t*2+1} 0H${t*2+2}L${t*2+1} 2Z`).join(``)}"></i>`,k=(e,t)=>`<div class="head">${T(e,`jp`)}${T(t,`en`)}${D(`under`)}</div>`,A=[...e.map(([e,t,n],r)=>{let i=t===`S`?`Senate`:`Governor`;return`<div d-lamp="annunciator" class="m-${r} race" color="amber" data-race="${e} ${i}" role="button" aria-label="${e} ${i}">${n}${t===`S`?`上院`:`知事`}<br>${e} ${t===`S`?`Sen`:`Gov`}</div>`}),...l.map(([e,t,n,r])=>`<div d-lamp="annunciator" class="t-${e}" color="${r}">${t}<br>${n}</div>`)],j={id:`election`,title:`Election watch`,note:`The operations station, seconded to election night, reading every race from civicAPI. It powers up, says what its controls do, and then on Auto watches whatever is happening. Press a lamp, or Prev and Next, to pick a race; the view keys pick what the map shows.`,era:`retro`,order:91,dark:!0,height:1856,states:{"house view":[`.view-key:nth-child(2)`],"next race":[`.k-next`]},html:`<div id="election">
  <d-device class="alarms" material="paint-panel-black" radius="4" screws wear="0.35">
    <div class="ident">
      <span d-mark="print silk" class="nerv" color="${C}">NERV</span>
      ${T(`選挙監視所`,`jp`)}
      ${T(`Election watch 03`,`en`)}
      ${O(`id-band`,12)}
    </div>
    <div class="matrix">
      ${o.map((e,t)=>`${T(e,`rowname`,w)}${A.slice(t*8,(t+1)*8).join(``)}`).join(``)}
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
      ${E(`<d-screen class="s-magi" kind="crt" gain="2.6" live><canvas width="${s[0]}" height="${s[1]}"></canvas></d-screen>`,`MAGI 審議`)}
    </div>
    <div class="centre">
      <div class="orders">${T(`速報`,`jp`)}<div d-readout="matrix" class="order" color="amber" scroll pitch="${b}" frame="${x}"></div></div>
      ${E(`<d-screen class="s-main" kind="crt" gain="2.6" live><canvas width="${r[0]}" height="${r[1]}"></canvas></d-screen>`,`戦術 Tactical`)}
    </div>
    <div class="side">
      <div class="gauges">${a.map(([e,t,n,r])=>`<div class="gauge">${T(`${t} ${n}`,`small`)}<div d-readout="seven" class="r-${e}" color="${r}" digits="3"></div></div>`).join(``)}</div>
      ${E(`<d-screen class="s-sync" kind="crt" gain="2.4" live><canvas width="${c[0]}" height="${c[1]}"></canvas></d-screen>`,`シンクロ Harmonics`)}
    </div>
  </d-device>
  <d-device class="desk" material="paint-panel-black" radius="4" screws wear="0.35">
    <section class="s-watch">
      <div class="watch-head">${O(`w-band`,6)}${T(`選択`,`jp`)}${T(`Pick a race`,`en`)}${O(`w-band`,6)}</div>
      <div class="watch">
        ${E(`<button d-key="slab" lamp material="plastic-black" class="k-prev" color="red" on aria-label="Previous race">◀</button>`,`前 Prev`)}
        ${E(`<div d-knob="flared" class="pick" ticks="${e.length}" sweep="150" size="0.6" cap="plastic-orange" mark="#ff7a00"><input type="range" min="0" max="${e.length-1}" step="1" value="5" aria-label="Race"></div>`,`回して Turn`)}
        ${E(`<button d-key="slab" lamp material="plastic-black" class="k-next" color="red" on aria-label="Next race">▶</button>`,`次 Next`)}
      </div>
    </section>
    ${D(`split`)}
    <section class="s-power">
      ${k(`主電源`,`Main power`)}
      <div class="power">
        ${E(`<button d-key="arcade" class="k-power" color="red" aria-label="Start">起動</button>`,`Start`)}
        <div class="switches">
          ${E(`<div d-switch="toggle" nut class="k-auto"><input type="checkbox" checked aria-label="Autopilot"></div><div d-lamp="annunciator" class="l-auto" color="amber">自動</div>`,`Auto`)}
          ${E(`<div d-switch="toggle" nut class="sw-sound"><input type="checkbox" aria-label="Sound"></div>`,`音声 Sound`)}
          ${E(`<div d-switch="toggle" nut class="sw-wires"><input type="checkbox" checked aria-label="News wires"></div>`,`報道 Wires`)}
        </div>
      </div>
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
    ${D(`split`)}
    <section class="s-wires">
      ${k(`報道`,`Wires`)}
      <d-screen class="s-news" kind="crt" gain="2.4" live><canvas width="${i[0]}" height="${i[1]}"></canvas></d-screen>
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
#election .matrix { display: grid; grid-template-columns: auto repeat(8, ${S(_[0])}); grid-auto-rows: ${S(_[1])}; gap: ${S(2)}; align-items: center; }
#election .rowname { justify-self: end; font-size: ${S(4.6)}; }
#election [d-lamp~="annunciator"] { display: grid; place-items: center; text-align: center; font-size: ${S(5.2)}; line-height: 1.1; letter-spacing: .02em; }
#election .race { font-size: ${S(4.4)} !important; letter-spacing: 0 !important; cursor: pointer; }
#election .clock { margin-left: auto; display: grid; gap: ${S(2)}; }
#election .clock-head { display: flex; gap: ${S(3)}; align-items: baseline; }
#election .clock-head .jp { font-size: ${S(6)}; }
#election .clock-body { display: flex; gap: ${S(3)}; }
#election .timer { width: ${S(112)}; height: ${S(46)}; }
#election .supply { display: grid; gap: ${S(3)}; }
#election .k-power { width: ${S(40)}; height: ${S(40)}; font: 700 ${S(8)} / 1 'Noto Sans JP', sans-serif; }
#election .supply [d-lamp] { width: ${S(36)}; height: ${S(21.5)}; font-size: ${S(4.4)}; }

#election .bay { height: ${S(m)}; padding-block: ${S(6)} !important; display: flex; justify-content: space-between; align-items: end; }
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
#election .s-magi, #election .s-sync { width: ${S(v[0])}; height: ${S(v[1])}; }
#election .s-main { width: ${S(y[0])}; height: ${S(y[1])}; }

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
#election .watch .pick { width: ${S(78)}; height: ${S(78)}; }
#election .watch .k-prev, #election .watch .k-next { width: ${S(30)}; height: ${S(40)}; font-size: ${S(11)}; }
#election .power { display: flex; gap: ${S(6)}; align-items: end; }
#election .k-power { width: ${S(54)}; height: ${S(54)}; font: 700 ${S(9)} / 1 'Noto Sans JP', sans-serif; }
#election .switches { display: flex; gap: ${S(4)}; align-items: end; }
#election [d-switch~="toggle"] { width: ${S(14)}; height: ${S(26)}; }
#election .l-auto { width: ${S(14)}; height: ${S(7)}; font-size: ${S(3.6)} !important; }
#election .watch .col > [d-mark] { font-size: ${S(5.4)}; }
#election .readouts { display: grid; gap: ${S(3)}; align-content: end; }
#election .r-in, #election .r-margin, #election .r-left-s, #election .r-left-h { width: ${S(48)}; height: ${S(20)}; }
#election .s-wires { align-items: end; }
#election d-screen.s-news { width: ${S(g[0])}; height: ${S(g[1])}; }
#election .b-in { width: ${S(48)}; height: ${S(8)}; }`,setup:e=>n(e)};export{j as default};