import"./preload-helper-9vAq-Yc_.js";import"./controls-BcrWij7w.js";import"./print-BNSsXJvI.js";import{a as e,i as t,n,o as r,r as i,t as a}from"./firmware-election-CH8dlrz5.js";var o=640,s=8,c=8,l=62,u=150,d=104,f=92,p=[46,22],m=62,h=[44,24],g=[34,14],_=e=>`${e*4}px`,v=`#e8e6df`,y=`#9a978e`,b=(e,t=``,n=v)=>`<span d-mark="label flat" ink="${n}" class="${t}">${e}</span>`,x=(e,t,n=``)=>`<div class="col ${n}">${e}${b(t)}</div>`,S=e=>`<i d-mark="print silk" class="rule ${e}" color="${v}" path="M0 0H100V1H0Z" viewbox="0 0 100 1"></i>`,C=e=>`<div class="asof">${b(`As of ET`,`small`,y)}<div d-readout="seven" class="${e}" color="amber" digits="4">--:--</div></div>`,w=(e,t,n,r,i,a)=>`<section class="${e}">
  <div class="head">${b(t,`title`)}${b(`${i} for control`,`small`,y)}${S(`under`)}</div>
  <div class="body">
    <div class="needles">
      ${x(`<div d-meter="gauge" class="g-D" ticks="${r}" minor="2" zones="${i}-${n} amber" label="DEM"><meter min="0" max="${n}" value="0"></meter></div>`,`Dem`)}
      ${x(`<div d-meter="gauge" class="g-R" ticks="${r}" minor="2" zones="${i}-${n} amber" label="REP"><meter min="0" max="${n}" value="0"></meter></div>`,`Rep`)}
    </div>
    <div class="digits">
      ${x(`<div d-readout="seven" class="r-D" color="blue" digits="3">  0</div>`,`Dem`)}
      ${x(`<div d-readout="seven" class="r-R" color="red" digits="3">  0</div>`,`Rep`)}
      ${x(`<div d-readout="seven" class="r-I" color="violet" digits="3">  0</div>`,`Ind`)}
      ${x(`<div d-readout="seven" class="r-left" color="white" digits="3">  0</div>`,`Not called`)}
    </div>
    <div class="foot">${C(`r-asof`)}${b(a,`small`,y)}</div>
  </div>
</section>`,T=([e,t,n])=>`<div d-lamp="annunciator" class="t-${e}" color="amber" data-race="${t} ${n}" role="img" aria-label="${t} ${n}: not called">${t}<br>${n===`Senate`?`Sen`:`Gov`}</div>`,E={id:`election`,title:`Election desk`,note:`An election-night results desk for the 2026 US midterms. The counts come from a file edited by hand as networks call races, and a race shows as called only once it says so. Lift the guard to call one early, if you must.`,era:`modern`,order:91,dark:!0,height:1728,states:{"guard up":[`.call-guard > input`],"called early":[`.call`]},html:`<div id="election">
  <d-device class="top" material="paint-panel-black" radius="4" screws wear="0.2">
    <div class="ident">
      ${b(`Election desk`,`name`)}
      ${b(`US midterms · Nov 3 2026`,`small`,y)}
    </div>
    <div class="sources">
      ${b(`Source`,`small`,y)}
      <div d-lamp="annunciator" class="src-live" color="green">Live</div>
      <div d-lamp="annunciator" class="src-manual" color="amber">Manual</div>
      <div d-lamp="annunciator" class="src-demo" color="violet">Demo</div>
      <div d-lamp="annunciator" class="src-stale" color="red">Stale</div>
    </div>
    <div class="updated">${b(`File updated ET`,`small`,y)}<div d-readout="seven" class="r-updated" color="amber" digits="4">--:--</div></div>
  </d-device>
  <d-device class="count" material="paint-panel-black" radius="4" wear="0.2">
    ${w(`house`,`House`,240,8,n.control,`${n.seats} seats, all up`)}
    ${S(`split`)}
    ${w(`senate`,`Senate`,60,6,e.control,`${e.up} up · 65 not up added`)}
  </d-device>
  <d-device class="races" material="paint-panel-black" radius="4" screws wear="0.2">
    <section class="block">
      <div class="head">${b(`Senate`,`title`)}${S(`under`)}</div>
      <div class="grid sen">${i.slice(0,t.length).map(T).join(``)}</div>
    </section>
    <section class="block">
      <div class="head">${b(`Governor`,`title`)}${S(`under`)}</div>
      <div class="grid gov">${i.slice(t.length,t.length+a.length).map(T).join(``)}</div>
    </section>
    <section class="block side">
      <div d-lamp="annunciator" class="too-close" color="amber">Too close<br>to call</div>
      <div class="key">
        <div d-lamp="led" class="led" color="blue" on></div>${b(`Dem`,`small`)}
        <div d-lamp="led" class="led" color="red" on></div>${b(`Rep`,`small`)}
        <div d-lamp="led" class="led" color="violet" on></div>${b(`Ind`,`small`)}
        <div d-lamp="led" class="led" color="amber" on></div>${b(`Blinking: too close`,`small`)}
      </div>
      ${C(`r-races`)}
    </section>
  </d-device>
  <d-device class="desk" material="paint-panel-black" radius="4" screws wear="0.2">
    <div class="status">
      ${b(`Status`,`small`,y)}
      <div d-readout="flip" class="board" cells="26">STANDING BY</div>
    </div>
    <div class="early">
      <div class="col">
        <div d-cover="guard" class="call-guard"><input type="checkbox" aria-label="Lift the guard"><div d-switch="toggle"><input type="checkbox" class="call" aria-label="Call it early"></div></div>
        ${b(`Call it early`,`warn`)}
      </div>
      <div d-lamp="annunciator" class="foul" color="red">Procedure<br>violation</div>
    </div>
    <div class="wire">
      ${b(`Wire`,`small`,y)}
      <div d-readout="matrix" class="ticker" color="amber" scroll pitch="8" frame="4"></div>
    </div>
    ${b(`Not an official source. Calls from AP and networks, entered by hand.`,`fine`,y)}
  </d-device>
</div>`,css:`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&display=swap');
#election { width: ${_(o)}; display: grid; gap: ${_(c)}; }
#election d-device { padding: ${_(s)}; box-sizing: border-box; font: 600 ${_(5)} / 1.05 'Barlow Condensed', sans-serif; letter-spacing: .05em; text-transform: uppercase; }
#election .col { display: grid; gap: ${_(2)}; justify-items: center; align-content: end; }
#election .small { font-size: ${_(4.2)}; }
#election .title { font-size: ${_(7.5)}; font-weight: 700; }
#election .rule { display: block; width: 100%; height: ${_(.6)}; }
#election .head { display: flex; gap: ${_(3)}; align-items: baseline; flex-wrap: wrap; }
#election .head .under { flex-basis: 100%; }
#election [d-lamp~="annunciator"] { display: grid; place-items: center; text-align: center; line-height: 1.1; font-size: ${_(4.8)}; }
#election [d-readout~="seven"] { width: ${_(h[0])}; height: ${_(h[1])}; }
#election .asof { display: flex; gap: ${_(2.5)}; align-items: center; }
#election .asof [d-readout], #election .updated [d-readout] { width: ${_(g[0])}; height: ${_(g[1])}; }

#election .top { height: ${_(l)}; display: flex; align-items: center; justify-content: space-between; gap: ${_(8)}; }
#election .ident { display: grid; gap: ${_(2)}; }
#election .name { font-size: ${_(13)}; font-weight: 700; letter-spacing: .03em; }
#election .sources { display: flex; gap: ${_(3)}; align-items: center; }
#election .sources [d-lamp] { width: ${_(30)}; height: ${_(16)}; }
#election .updated { display: grid; gap: ${_(2)}; justify-items: end; }

#election .count { height: ${_(u)}; display: flex; gap: ${_(6)}; }
#election .count section { flex: 1; display: grid; grid-template-rows: auto minmax(0, 1fr); gap: ${_(3)}; }
#election .split { width: ${_(.6)}; height: auto; align-self: stretch; }
#election .body { display: grid; grid-template-columns: auto 1fr; grid-template-rows: 1fr auto; gap: ${_(3)} ${_(5)}; align-items: center; }
#election .needles { display: grid; gap: ${_(3)}; grid-template-columns: repeat(2, auto); grid-row: span 2; }
#election [d-meter~="gauge"] { width: ${_(m)}; height: ${_(m)}; }
#election .digits { display: grid; grid-template-columns: repeat(2, auto); gap: ${_(3)}; justify-content: start; }
#election .foot { display: grid; gap: ${_(2)}; }

#election .races { height: ${_(d)}; display: flex; gap: ${_(7)}; align-items: start; }
#election .block { display: grid; gap: ${_(3)}; }
#election .grid { display: grid; gap: ${_(2.5)}; grid-auto-rows: ${_(p[1])}; }
#election .sen { grid-template-columns: repeat(5, ${_(p[0])}); }
#election .gov { grid-template-columns: repeat(3, ${_(p[0])}); }
#election .side { margin-left: auto; align-self: stretch; align-content: space-between; justify-items: end; }
#election .too-close { width: ${_(64)}; height: ${_(30)}; font-size: ${_(6.5)} !important; font-weight: 700; }
#election .key { display: grid; grid-template-columns: auto auto; gap: ${_(1.5)} ${_(2.5)}; align-items: center; }
#election .led { width: ${_(4.5)}; height: ${_(4.5)}; }

#election .desk { height: ${_(f)}; display: grid; grid-template: auto auto / 1fr auto; gap: ${_(3)} ${_(8)}; align-items: center; }
#election .status { display: grid; gap: ${_(2)}; }
#election .board { width: ${_(260)}; height: ${_(16)}; font-size: ${_(9)}; }
#election .early { grid-row: span 2; display: flex; gap: ${_(5)}; align-items: center; }
#election .call-guard { width: ${_(34)}; height: ${_(44)}; display: grid; place-items: center; }
#election .call-guard [d-switch] { width: ${_(16)}; height: ${_(28)}; }
#election .warn { margin-top: ${_(3)}; font-weight: 700; }
#election .foul { width: ${_(40)}; height: ${_(22)}; }
#election .wire { display: flex; gap: ${_(3)}; align-items: center; }
#election .ticker { flex: 1; height: ${_(18)}; }
#election .fine { grid-column: 1 / -1; font-size: ${_(3.6)}; }`,setup:e=>r(e)};export{E as default};