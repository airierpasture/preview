import{s as e}from"./registry-CbVz4zOy.js";import{Z as t}from"./base-BBGJU2EB.js";var n=[`pointerdown`,`keydown`,`touchend`,`click`],r=.015,i=800,a=null,o=null,s=!1,c=new Map,l=new Set,u=()=>{a?.state===`suspended`&&(navigator.userActivation?.isActive??!0)&&a.resume()};function d(){if(!a){a=new AudioContext({latencyHint:`interactive`}),o=a.createGain(),o.gain.value=+!s,o.connect(a.destination);for(let e of n)window.addEventListener(e,u,!0)}return u(),a}function f(e=()=>void d()){if(typeof window>`u`||typeof AudioContext>`u`)return()=>{};let t=window.requestIdleCallback??(e=>window.setTimeout(e,i)),n=window.cancelIdleCallback??window.clearTimeout,r=()=>{n(o),window.removeEventListener(`pointerover`,a,!0)},a=()=>{r(),e()},o=t(a,{timeout:i});return window.addEventListener(`pointerover`,a,{capture:!0,passive:!0}),r}function p(){return d(),o}function m(){return s}function h(e){if(e!==s){s=e,a&&o&&o.gain.setTargetAtTime(+!e,a.currentTime,r),u();for(let t of l)t(e)}}function g(e){return l.add(e),()=>l.delete(e)}function _(e,t){let n=c.get(e);if(!n){let r=URL.createObjectURL(new Blob([t],{type:`text/javascript`}));n=d().audioWorklet.addModule(r).finally(()=>URL.revokeObjectURL(r)),c.set(e,n)}return n}var v={plastic:{rate:1,tone:2e4,gain:1},metal:{rate:1.12,tone:2e4,gain:.85},iron:{rate:.85,tone:7e3,gain:1},bakelite:{rate:.82,tone:5e3,gain:1.1},rubber:{rate:.7,tone:1400,gain:1.2},wood:{rate:.8,tone:4e3,gain:1.1},glass:{rate:1.25,tone:2e4,gain:.7},stone:{rate:.95,tone:9e3,gain:.9}},y={bakelite:`bakelite`,lacquer:`bakelite`,cast:`iron`,rust:`iron`,gloss:`plastic`,hull:`plastic`,lcd:`plastic`,oled:`glass`,ips:`glass`,stoneware:`stone`,concrete:`stone`,slate:`stone`};function b(t){let n=y[t.split(`-`)[0]]??t;if(v[n])return n;let r=e(t);return(r.metal??0)>.5?`metal`:r.pattern===`wood`?`wood`:r.pattern===`stone`||r.pattern===`terrazzo`?`stone`:(r.rough??0)>=.6?`rubber`:(r.coat??0)>=.9&&(r.rough??1)<=.2?`glass`:`plastic`}var x={press:{full:25,level:1},release:{full:25,level:.7},toggle:{full:25,level:1},detent:{full:30,level:.6},rotary:{full:30,level:.7},slide:{full:25,level:.8},rocker:{full:25,level:1},latch:{full:10,level:1},unlatch:{full:10,level:.8},thumbwheel:{full:30,level:.5},jog:{full:30,level:.5,made:`metal`},clickwheel:{full:30,level:.5},crown:{full:30,level:.4,made:`metal`},bezel:{full:30,level:.6,made:`metal`},mech:{full:10,level:1},mechup:{full:10,level:.6},dome:{full:10,level:.9},transport:{full:10,level:1},tapedoor:{full:25,level:.8},eject:{full:25,level:.9},lidopen:{full:25,level:1,made:`metal`},lidshut:{full:25,level:1,made:`metal`},flint:{full:25,level:.9,made:`metal`},cam:{full:25,level:.5,made:`metal`},shutter:{full:10,level:1,made:`metal`},winder:{full:10,level:.8,made:`metal`},bolt:{full:10,level:1,made:`iron`},strike:{full:10,level:1,made:`metal`},bell:{full:10,level:.8,made:`metal`},carriage:{full:10,level:.8,made:`metal`},wipe:{full:4,level:.25,loop:!0},fader:{full:4,level:.25,loop:!0},plug:{full:10,level:.9,made:`metal`},hook:{full:10,level:1,made:`bakelite`},knock:{full:10,level:.7,made:`metal`},guard:{full:25,level:1},keylock:{full:25,level:.9,made:`metal`},flap:{full:10,level:.6}},S=5,C=10,w=500,T=1e3,E={stop:null},D={release:null,stop:null},O={mech:{...E,press:`mech`,release:`mechup`},dome:{...E,press:`dome`},latch:{...E,press:`latch`,release:`unlatch`},transport:{...E,press:`transport`,release:`unlatch`},lid:{toggle:`lidopen`,shut:`lidshut`,stop:null},carriage:{press:null,release:`carriage`,stop:null},hook:{press:null,release:`hook`,stop:null},bolt:{press:`bolt`,release:`bolt`,stop:`bolt`}},ee=e=>({press:e,toggle:e,detent:e,...D});function te(e){let{joint:t,material:n,mass:r,returns:i}=e,a=/rubber/.test(n);return t===`press`?e.latch?O.latch:a?O.dome:n===`plastic-on-plastic`&&r>=S?O.mech:E:t===`hinge`?r>=w?{toggle:`guard`,stop:null}:n===`steel-on-steel`&&r>=C?O.lid:{toggle:n===`steel-on-steel`?`toggle`:`rocker`,stop:null}:t===`slide`?{toggle:`slide`,detent:e.arrives?`slide`:`detent`,stop:`knock`,rub:i?null:`fader`}:t===`turn`?n===`governor`?{detent:`rotary`,stop:null,rub:null}:n===`finger-on-glass`?{detent:`clickwheel`,rub:null}:n===`ball-bearing`?{detent:`jog`,stop:`knock`,rub:null}:e.rolled?{detent:a?`thumbwheel`:`crown`,stop:`knock`,rub:null}:n===`brass-on-steel`?{toggle:`keylock`,detent:r<C?`crown`:`detent`,stop:`knock`,rub:null}:n===`steel-on-steel`?{detent:`bezel`,stop:r>=T?`bolt`:`knock`,rub:null}:{detent:`detent`,stop:`knock`,rub:`wipe`}:r>=T?O.bolt:{press:`knock`,...D}}function k(e){let t=e.sound;return t&&O[t]?O[t]:t&&t in x?ee(t):te(e)}var ne=.03,A=40,re=.4;function j(e,t=Math.random){let n=e.clip??`press`,r=x[n],i=v[r.made??`plastic`],a=e.own?i:v[e.voice],o=e.force??1;if(o<ne)return null;let s=e.own?1:Math.min(1.4,Math.max(.7,(A/(e.size??A))**.3));return{clip:n,level:Math.min(1,o*r.level*(a.gain/i.gain)*(.9+.2*t())),rate:a.rate/i.rate*s*(e.detune??1)*(.98+.04*t()),tone:a.tone*(re+.6*o),take:t(),hold:e.hold}}function M(e,t,n){if(e<2||t<0||t>=e)return Math.floor(n*e)%e;let r=Math.floor(n*(e-1))%(e-1);return r>=t?r+1:r}var ie={press:`press`,release:`release`,toggle:`toggle`,detent:`detent`,stop:`press`,rub:null};function N({kind:e,to:t,motion:n},r=()=>!0){let i=n?k(n):{},a=e===`toggle`&&(t??1)<=0?i.shut:void 0,o=a===void 0?i[e]:a;return o===null?null:o&&r(o)?o:ie[e]}function ae(e,t){let n=N(e,t);return!!n&&t(n)}function oe(e,t=Math.random,n,r=!1){let{part:i}=e,a=N(e,n);return a?j({voice:b(e.material),clip:a,force:Math.min(1,e.speed/x[a].full)**.7,size:Math.sqrt(i.w*i.h),detune:1+.03*Math.sin(i.x*12.9898+i.y*78.233),own:r},t):null}var se=({part:e,device:t})=>Math.max(-1,Math.min(1,.5*(2*(e.x+e.w/2)/t.w-1))),ce=24,le=.13,ue=.1,de=.09,fe=.012,P=.04,F=[`pointerdown`,`keydown`,`touchend`,`click`],I=[`pointerover`,`focusin`];function pe(e){let t=Math.ceil(le*e.sampleRate),n=e.createBuffer(2,t,e.sampleRate);for(let e=0;e<2;e++){let r=n.getChannelData(e),i=0;for(let e=0;e<t;e++)i+=.35*(Math.random()*2-1-i),r[e]=i*(1-e/t)**3}return n}function me(e){let n=e.volume??.6;e.muted!==void 0&&h(e.muted);let r=null,i=null,a=new Set,o=new Map,s=new OfflineAudioContext(1,1,44100),c=e=>{let t={};return{buffers:t,last:{},has:e=>!!t[e]?.length,ready:Promise.all(Object.entries(e).flatMap(([e,n])=>[n].flat().map(n=>fetch(n).then(e=>e.arrayBuffer()).then(e=>s.decodeAudioData(e)).then(n=>{(t[e]??=[]).push(n)}).catch(()=>console.warn(`diegetic-ui: no clip at ${n}`)))))}},l=c(e.clips),u=new Map,_=t=>{let n=t?e.devices?.[t]:void 0;if(!n)return l;let r=u.get(t);return r||u.set(t,r=c(n)),r},v=e=>{let t=e.target.closest?.(`d-device`);t&&_(t.id)};if(e.devices)for(let e of I)window.addEventListener(e,v,{passive:!0});let y=()=>{if(!r&&!m()){r=d(),i=r.createGain(),i.gain.value=n;let e=r.createDynamicsCompressor();e.threshold.value=-6,e.knee.value=6,e.ratio.value=12,e.attack.value=.002,e.release.value=.1;let t=r.createConvolver();t.buffer=pe(r);let a=r.createGain();a.gain.value=ue,i.connect(e).connect(p()),i.connect(t).connect(a).connect(e)}},b=f(y),S=()=>{if(y(),r)for(let e of F)window.removeEventListener(e,S,!0)},C=(e,t,n,r,i)=>{let a=e.createBufferSource();a.buffer=n,a.playbackRate.value=r.rate;let o=e.createBiquadFilter();o.type=`lowpass`,o.frequency.value=Math.min(r.tone,e.sampleRate/2);let s=e.createGain();s.gain.value=r.level;let c=e.createStereoPanner();return c.pan.value=i,a.connect(o).connect(s).connect(c).connect(t),a.onended=()=>c.disconnect(),{source:a,level:s}},w=(e,t,n)=>{if(!r||!i)return;let a=o.get(e.clip);if(!a){let{source:s,level:c}=C(r,i,n,e,t);c.gain.value=0,s.loop=!0,s.start(0,e.take*n.duration),a={source:s,level:c,off:0},o.set(e.clip,a)}let{source:s,level:c}=a,l=r.currentTime,u=e.hold??de,d=e.clip;s.playbackRate.value=e.rate,c.gain.cancelScheduledValues(l),c.gain.setTargetAtTime(e.level,l,fe),c.gain.setTargetAtTime(0,l+u,P),clearTimeout(a.off),a.off=setTimeout(()=>{o.delete(d),s.stop()},(u+P*6)*1e3)},T=(e,t,n)=>{let o=n.buffers[e.clip];if(!r||!i||m()||!o?.length)return;let s=M(o.length,n.last[e.clip]??-1,e.take);if(n.last[e.clip]=s,x[e.clip].loop)return w(e,t,o[s]);let{source:c}=C(r,i,o[s],e,t);if(c.addEventListener(`ended`,()=>a.delete(c)),a.size>=ce){let[e]=a;e?.stop(),a.delete(e)}a.add(c),c.start()};for(let e of F)window.addEventListener(e,S,!0);let E=g(e=>{!e&&navigator.userActivation?.isActive!==!1&&S()}),D=t(t=>{if(!r||m()||e.only?.(t)===!1)return;let n=_(t.device.el.id),i=n!==l&&ae(t,n.has),a=i?n:l,o=oe(t,Math.random,a.has,i);o&&T(o,se(t),a)});return{get volume(){return n},set volume(e){n=e,i&&(i.gain.value=e)},get muted(){return m()},set muted(e){h(e)},play(e){S();let t=_(e.device);t.ready.then(()=>{let n=j({...e,own:t!==l});n&&T(n,0,t)})},stop(){D(),E();for(let e of o.values())clearTimeout(e.off);o.clear(),b();for(let e of I)window.removeEventListener(e,v);for(let e of F)window.removeEventListener(e,S,!0);i?.disconnect(),r=i=null}}}var he=16,L=5;function ge(e={},t=.7){f();let n={shape:.3,bright:.6,decay:.3,echo:.2,ratio:2,bite:0,pure:!1,detune:0,...e},r=null,i,a,o,s,c,l=new Set,u=e=>Math.min(e*1.5+200*2**(n.bright*6),18e3),m=e=>e*e*1.6,h=e=>{i=e.createGain(),a=e.createGain(),o=e.createGain(),s=e.createAnalyser();let r=e.createDelay(1),l=e.createGain(),u=e.createBiquadFilter(),d=e.createDynamicsCompressor();s.fftSize=1024,c=new Float32Array(s.fftSize),r.delayTime.value=.28,l.gain.value=.42,u.type=`lowpass`,u.frequency.value=2600,a.gain.value=n.echo*.7,o.gain.value=m(t),d.threshold.value=-14,d.ratio.value=6,i.connect(d),i.connect(a).connect(r).connect(u).connect(l).connect(r),u.connect(d),d.connect(o).connect(s).connect(p())};return{get volume(){return t},set volume(e){t=e,r&&o.gain.setTargetAtTime(m(e),r.currentTime,.02)},get sounding(){let e=r?.currentTime??0;for(let t of l)t.over<e&&l.delete(t);return l.size},get now(){return r?.currentTime??0},wake(){r?d():h(r=d())},set(e){if(Object.assign(n,e),r){a.gain.setTargetAtTime(n.echo*.7,r.currentTime,.03);for(let e of l){e.filter.frequency.setTargetAtTime(u(e.hz),r.currentTime,.02);for(let t of e.pitched)t.detune.setTargetAtTime(n.detune+(t===e.pitched[1]?6:0),r.currentTime,.01)}}},play(e,t={}){this.wake();let a=r,o=Math.max(t.at??0,a.currentTime),s=(t.level??1)*.3;this.sounding>=he&&l.delete(l.values().next().value);let c=.003+n.decay*.04,d=.09+n.decay*.9,f=n.decay**1.5*.8,p=.07+n.decay*1.2,m=a.createOscillator(),h=a.createOscillator(),g=a.createOscillator(),_=a.createGain(),v=a.createGain(),y=a.createBiquadFilter(),b=a.createGain();m.type=n.pure?`sine`:`triangle`,h.type=`sawtooth`,g.frequency.value=e*n.ratio,m.frequency.value=h.frequency.value=e,m.detune.value=g.detune.value=n.detune,h.detune.value=n.detune+6;let x=e*L*n.shape**2;_.gain.setValueAtTime(x+e*L*n.bite,o),n.bite&&_.gain.setTargetAtTime(x,o,.03+n.decay*.25),v.gain.value=n.pure?0:n.shape*.5,y.type=`lowpass`,y.Q.value=1.2,y.frequency.value=u(e),g.connect(_).connect(m.frequency),_.connect(h.frequency),m.connect(y),h.connect(v).connect(y),y.connect(b).connect(i),b.gain.setValueAtTime(0,o),b.gain.linearRampToValueAtTime(s,o+c),b.gain.setTargetAtTime(s*Math.max(f,.001),o+c,d/3);let S={filter:y,pitched:[m,h,g],hz:e,over:1/0};l.add(S);for(let e of[m,h,g])e.start(o);let C=e=>{b.gain.cancelScheduledValues(e),e<=a.currentTime+.001&&b.gain.setValueAtTime(b.gain.value,e),b.gain.setTargetAtTime(0,e,p/4),S.over=e+p*1.4;for(let e of[m,h,g])e.stop(S.over);m.onended=()=>b.disconnect()},w=t.length!==void 0;return w&&C(o+t.length),()=>{w||C(a.currentTime),w=!0}},scope(){return r?(s.getFloatTimeDomainData(c),c):null},close(){l.clear(),o?.disconnect(),r=null}}}var R=e=>Math.sin(e*91234.7)*Math.sin(e*7341.9+Math.sin(e*51234)),z=e=>Math.sin(Math.PI*2*(46*e+6*(1-Math.exp(-e*28))))*Math.exp(-e*9)*.9,_e=e=>(R(e)*.5+Math.sin(e*1200)*.2)*Math.exp(-e*16),ve=e=>R(e*3.1)*Math.exp(-e*70)*.22,B=(e,t)=>Math.sin(Math.PI*2*e*t)>=0?1:-1,V=(e,t)=>[1,1.5,2.08,2.715,3.395,4.105].reduce((n,r)=>n+B(e*r,t),0)/6,H=e=>t=>Math.sin(Math.PI*2*(e*t+e/34*(1-Math.exp(-t*34))))*Math.exp(-t*7)*.9+R(t)*Math.exp(-t*200)*.2,U=(e,t,n)=>r=>Math.sin(Math.PI*2*e*r)*Math.exp(-r*26)*.55+Math.sin(Math.PI*2*e*1.48*r)*Math.exp(-r*34)*.3+R(r)*(t*Math.exp(-r*n)+.25*Math.exp(-r*90)),ye=e=>{let t=[0,.011,.023,.034].filter(t=>t<=e).at(-1)??0;return R(e)*Math.exp(e<.04?-(e-t)*220:-(e-.034)*14)*.9},W=4e4,G=2047,be=[{name:`HIHAT`,seconds:1.4,at:e=>(V(420,e)*.75+R(e*3.1)*.35)*Math.exp(-e*2.4)*.6,choked:!0},{name:`SNARE 1`,seconds:.34,at:U(196,.72,15)},{name:`SNARE 2`,seconds:.5,at:U(168,.6,9)},{name:`BASS`,seconds:.5,at:e=>z(e)+R(e)*Math.exp(-e*420)*.3},{name:`TOM 1`,seconds:.6,at:H(196)},{name:`TOM 2`,seconds:.65,at:H(147)},{name:`TOM 3`,seconds:.75,at:H(110)},{name:`TOM 4`,seconds:.85,at:H(82)},{name:`RIDE 1`,seconds:1.8,at:e=>(V(610,e)*.5+Math.sin(Math.PI*2*3120*e)*.12)*Math.exp(-e*3)*.6},{name:`RIDE 2`,seconds:1.8,at:e=>(V(760,e)*.5+Math.sin(Math.PI*2*2480*e)*.3*Math.exp(-e*9))*Math.exp(-e*3)*.6},{name:`CRASH 1`,seconds:2.2,at:e=>(V(530,e)*.5+R(e)*.5)*Math.exp(-e*2.4)*.7},{name:`CRASH 2`,seconds:2.2,at:e=>(V(680,e)*.4+R(e*1.3)*.6)*Math.exp(-e*3.2)*.7},{name:`PERC 1`,seconds:.3,at:e=>(B(540,e)+B(800,e))*.3*(Math.exp(-e*40)+Math.exp(-e*11)*.5)},{name:`PERC 2`,seconds:.35,at:ye},{name:`PERC 3`,seconds:.08,at:e=>(Math.sin(Math.PI*2*1720*e)*.8+R(e)*.3)*Math.exp(-e*110)},{name:`PERC 4`,seconds:.4,at:e=>Math.sin(Math.PI*2*(330*e+5*(1-Math.exp(-e*60))))*Math.exp(-e*13)*.85}];function xe(e,t=W,n=G){let r=Math.round(e.seconds*t),i=new Float32Array(r);for(let a=0;a<r;a++){let o=Math.min(1,(r-1-a)/(t*.01));i[a]=Math.round(Math.tanh(e.at(a/t)*1.2)*o*n)/n}return i}var Se=96,K=24;function Ce(e,t){let n=(e%48+48)%48,r=e-n,i=48*t;return r+(n<K?n/K*i:i+(n-K)/K*(48-i))}function we(e,t){let n=(e%48+48)%48,r=e-n,i=48*t;return r+(n<i?n/i*K:K+(n-i)/(48-i)*K)}var Te=class{notes=[];bars;constructor(e=2){this.bars=e}get ticks(){return this.bars*96*4}add(e,t,n,r=K,i=.5){let a=we(e,i),o={tick:(r?Math.round(a/r)*r:Math.round(a))%this.ticks,pad:t,level:n},s=this.notes.findIndex(e=>e.tick===o.tick&&e.pad===t);return s>=0&&this.notes.splice(s,1),this.notes.push(o),o}erase(e){this.notes=e===void 0?[]:this.notes.filter(t=>t.pad!==e)}};function Ee(e=.8,t=.4,{pads:n=be,rate:r=W,full:i=G}={}){f();let a=null,o,s,c,l=[],u=null,m=(e,t)=>{let n=xe(t,r,i),a=e.createBuffer(1,n.length,r);return a.copyToChannel(n,0),a};return{get volume(){return e},set volume(t){e=t,a&&o.gain.setTargetAtTime(t*t,a.currentTime,.02)},get decay(){return t},set decay(e){t=e},get now(){return a?.currentTime??0},wake(){if(a){d();return}let t=a=d();o=t.createGain(),o.gain.value=e*e,s=t.createAnalyser(),s.fftSize=2048,c=new Float32Array(s.fftSize),o.connect(s).connect(p()),l=n.map(e=>m(t,e))},remake(e){a&&(l[e]=m(a,n[e]))},hit(e,r=1,i){this.wake();let s=a,c=i??s.currentTime,d=s.createBufferSource(),f=s.createGain();d.buffer=l[e],f.gain.value=r**1.6,d.connect(f).connect(o);let{choked:p,own:m}=n[e];p&&(u?.gain.setTargetAtTime(0,c,.004),m||f.gain.setTargetAtTime(0,c+.01,.012+t*t*.5),u=f),d.start(c)},click(e,t){let n=a,r=n.createOscillator(),i=n.createGain();r.type=`square`,r.frequency.value=e?1600:1100,i.gain.setValueAtTime(.14,t),i.gain.exponentialRampToValueAtTime(.001,t+.03),r.connect(i).connect(o),r.start(t),r.stop(t+.04)},scope(){return a?(s.getFloatTimeDomainData(c),c):null},close(){o?.disconnect(),a=u=null}}}var De=.12;function Oe(e,t,n=90,r=.5){let i=null,a=0,o=0,s=()=>60/l.bpm/96,c=()=>{for(;o<e.now+De;){let n=a%t.ticks;for(let r of t.notes){if(r.tick!==n)continue;let t=Math.max(o+(Ce(n,l.swing)-n)*s(),e.now);e.hit(r.pad,r.level,t),l.onnote?.(r,t)}l.metronome&&n%96==0&&e.click(n%384==0,Math.max(o,e.now)),a++,o+=s()}},l={bpm:n,swing:r,metronome:!1,get playing(){return i!==null},get tick(){return i===null?0:((a-(o-e.now)/s())%t.ticks+t.ticks)%t.ticks},play(){i===null&&(e.wake(),a=0,o=e.now+.05,c(),i=setInterval(c,25))},stop(){i!==null&&clearInterval(i),i=null}};return l}var ke=`
class Head extends AudioWorkletProcessor {
  constructor() {
    super();
    this.clips = new Map();
    this.clip = null;
    this.rate = this.speed = this.at = this.left = this.peak = 0;
    this.writing = false;
    this.port.onmessage = ({ data: m }) => {
      if (m.end) this.ended = true;
      if (m.load) this.clips.set(m.load, { data: m.data, span: m.span });
      if (m.pick) {
        this.clip = this.clips.get(m.pick) ?? null;
        this.at = m.at;
        this.speed = 0;
      }
      if (m.rate !== undefined) this.rate = m.rate;
      if (m.write !== undefined) {
        this.writing = m.write;
        if (!m.write && this.clip) {
          this.clip.span = this.at;
          this.port.postMessage({ took: this.at });
        }
      }
    };
  }
  process(inputs, outputs) {
    if (this.ended) return false;
    const out = outputs[0][0], c = this.clip;
    if (!out || !c) return true;
    const n = out.length, length = c.data.length;
    if (this.writing) {
      const take = inputs[0][0];
      for (let i = 0; i < n && take && this.at < length; i++, this.at++) {
        c.data[this.at] = take[i];
        this.peak = Math.max(this.peak, Math.abs(take[i]));
      }
      out.fill(0);
    } else {
      for (let i = 0; i < n; i++) {
        this.speed += (this.rate - this.speed) * 0.004;
        const next = Math.max(0, Math.min(c.span, this.at + this.speed));
        // Stopped dead by either end of the tape.
        if (next !== this.at + this.speed) this.speed = 0;
        this.at = next;
        const k = Math.floor(next), f = next - k, a = c.data[k % length], b = c.data[(k + 1) % length];
        // A tape barely moving past the head makes no sound.
        out[i] = (a + (b - a) * f) * Math.min(1, Math.abs(this.speed) * 3);
        this.peak = Math.max(this.peak, Math.abs(out[i]));
      }
    }
    if ((this.left -= n) <= 0) {
      this.left = 1024;
      this.port.postMessage({ at: this.at, peak: this.peak });
      this.peak = 0;
    }
    return true;
  }
}
registerProcessor('tape-head', Head);
`;function Ae(){f();let e=null,t=null,n=null,r=null,i=0,a=0,o=0,s=1,c=0,l=null,u=new Map,m=()=>e?.sampleRate??48e3;return{get position(){return i},get span(){return c},get peak(){return a},get sampleRate(){return m()},get rate(){return o},set rate(e){o=e,t?.port.postMessage({rate:e})},wake(){return n??=(async()=>{let n=e=d();await _(`tape-head`,ke),t=new AudioWorkletNode(n,`tape-head`,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]}),t.port.onmessage=({data:e})=>{e.at!==void 0&&(i=e.at/m(),a=e.peak),e.took!==void 0&&(c=e.took/m(),u.set(s-1,c),l?.(c),l=null)},t.connect(p())})()},load(e,n){let r=s++;return u.set(r,n??e.length/m()),t.port.postMessage({load:r,data:e,span:u.get(r)*m()},[e.buffer]),r},pick(e,n=0){c=u.get(e),i=n,t.port.postMessage({pick:e,at:n*m()})},record(n,i){let a=this.load(new Float32Array(Math.ceil(i*m())));return this.pick(a),r=e.createMediaStreamSource(n),r.connect(t),t.port.postMessage({write:!0}),a},stop(){return r?.disconnect(),r=null,t.port.postMessage({write:!1}),new Promise(e=>l=e)},close(){r?.disconnect(),t?.port.postMessage({end:!0}),t?.disconnect(),e=t=r=null,n=null}}}function je(e,t=96,n=4){let r=60/t*e,i=Math.round(r*4*n),a=new Float32Array(i),o=(t,n,r)=>{let o=Math.round(t),s=Math.min(i,o+Math.round(n*e));for(let t=o;t<s;t++)a[t]=a[t]+r((t-o)/e)},s=e=>440*2**((e-69)/12),c=(e,t)=>n=>Math.sin(Math.PI*2*e*n+2.4*Math.exp(-n*7)*Math.sin(Math.PI*4*e*n))*Math.exp(-n*5)*t*Math.min(1,n*400),l=[[45,57,60,64],[41,53,60,65],[48,55,60,64],[43,55,59,62]];for(let e=0;e<n;e++){let[t,n,i,a]=l[e%l.length],u=e*4*r;for(let e of[0,1.5,2.5])o(u+e*r,.5,z);for(let e of[1,3])o(u+e*r,.3,_e);for(let e=0;e<8;e++)o(u+e*r/2,.08,ve);for(let e of[0,.75,1.5,2.5,3.25])o(u+e*r,.5,c(s(t),.3));[n,i,a,n+12,i+12,a+12,n+24,a+12].forEach((e,t)=>o(u+t*r/2,.7,c(s(e),.16)))}let u=0;for(let e of a)u=Math.max(u,Math.abs(e));for(let e=0;e<i;e++)a[e]=a[e]*.8/u;return a}var q={tune:.5,glide:0,glideOn:!1,blend:0,contourSource:!1,lfoSource:!1,wheel:0,bend:0,modPitch:!1,modFilter:!1,thirdFollows:!0,range:[3,3,3],wave:[2,2,2],detune:[0,0,0],level:[1,0,0],on:[!0,!1,!1],noise:0,noiseOn:!1,pink:!1,loop:0,loopOn:!1,cutoff:.6,emphasis:.2,amount:.4,followOne:!1,followTwo:!1,filterAttack:.1,filterDecay:.4,filterSustain:.4,ampAttack:.05,ampDecay:.4,ampSustain:.8,decay:!0,lfo:.4,tone:!1,output:!0},J=class{rate;patch;held;overload;hz;osc;drift;inc;stage;tan;delay;pinkState;note;pitch;gate;filterStep;ampStep;filterEnv;ampEnv;lfoPhase;beep;seed;tick;tune;feedback;last;third;noiseNow;constructor(e,t){this.rate=e,this.patch=t,this.held=[],this.overload=0,this.hz=1e3,this.osc=new Float64Array([.1,.37,.71]),this.drift=new Float64Array(3),this.inc=new Float64Array(3),this.stage=new Float64Array(4),this.tan=new Float64Array(3),this.delay=new Float64Array(6),this.pinkState=new Float64Array(3),this.note=60,this.pitch=60,this.gate=!1,this.filterStep=0,this.ampStep=0,this.filterEnv=0,this.ampEnv=0,this.lfoPhase=0,this.beep=0,this.seed=22222,this.tick=0,this.tune=0,this.feedback=0,this.last=0,this.third=0,this.noiseNow=0}press(e){this.held.indexOf(e)<0&&this.held.push(e);let t=!this.gate;this.note=Math.min(...this.held),t&&(this.gate=!0,this.filterStep=this.ampStep=1,this.patch.glideOn||(this.pitch=this.note))}release(e){this.held=this.held.filter(t=>t!==e),this.held.length?this.note=Math.min(...this.held):(this.gate=!1,this.filterStep=this.ampStep=3)}random(){let e=this.seed;return e^=e<<13,e^=e>>>17,e^=e<<5,this.seed=e|0,(e|0)/2147483648}blep(e,t){if(e<t){let n=e/t;return n+n-n*n-1}if(e>1-t){let n=(e-1)/t;return n*n+n+n+1}return 0}wave(e,t,n,r){let i=2*n-1-this.blep(n,r),a=4*Math.abs(n-.5)-1;if(t===0)return a;if(t===1)return e===2?-i:(a+i)*.5;if(t===2)return i;let o=t===3?.5:t===4?.3:.1,s=(n-o+1)%1;return(n<o?1:-1)+this.blep(n,r)-this.blep(s,r)}contour(e,t,n,r,i){return t===1?(e+=(1.25-e)*n,e>=1?[1,2]:[e,1]):t===2?[e+(i-e)*r,2]:t===3?(e+=(0-e)*(this.patch.decay?r:300/this.rate),e<1e-5?[0,0]:[e,3]):[e,0]}control(e){let t=this.patch,n=this.rate,r=(t,r,i)=>1-Math.exp(-1/(r*i**t*n/e));this.pitch=t.glideOn&&t.glide>.001?this.pitch+(this.note-this.pitch)*(1-Math.exp(-e/(n*3*t.glide*t.glide+1))):this.note,this.lfoPhase=(this.lfoPhase+.1*300**t.lfo*e/n)%1;let i=4*Math.abs(this.lfoPhase-.5)-1,a=t.contourSource?this.filterEnv:this.third,o=t.lfoSource?i:this.noiseNow,s=(a*(1-t.blend)+o*t.blend)*t.wheel*t.wheel,c=[-8,-2,-1,0,1,2],l=(t.tune-.5)*4+t.bend*5+(t.modPitch?s*12:0);for(let e=0;e<3;e++){this.drift[e]=this.drift[e]*.9995+this.random()*8e-4;let r=(e===2&&!t.thirdFollows?60:this.pitch+l)+c[t.range[e]]*12+t.detune[e]+this.drift[e];this.inc[e]=Math.min(440*2**((r-69)/12)/n,.45)}let u=r(t.filterAttack,.001,1e4),d=r(t.filterDecay,.004,5e3);for(let n=0;n<e;n++)[this.filterEnv,this.filterStep]=this.contour(this.filterEnv,this.filterStep,1-(1-u)**(1/e),1-(1-d)**(1/e),t.filterSustain);let f=(t.followOne?1/3:0)+(t.followTwo?2/3:0),p=t.cutoff*9+this.filterEnv*t.amount*4+f*(this.pitch-60)/12+(t.modFilter?s*3:0),m=Math.min(40*2**p,n*.42);this.hz=m;let h=m/n,g=h*.5,_=1.873*h*h*h+.4955*h*h-.649*h+.9988,v=-3.9364*h*h+1.8409*h+.9968;this.tune=1-Math.exp(-2*Math.PI*g*_),this.feedback=4*Math.min(t.emphasis*1.08,1.08)*v,this.overload*=.995}sat(e){let t=e>3?3:e<-3?-3:e;return t*(27+t*t)/(27+9*t*t)}ladder(e){let t=this.stage,n=this.tan,r=this.delay,i=this.tune,a=.8;for(let o=0;o<2;o++){let o=e-this.feedback*r[5],s=t[0]=r[0]+i/a*(this.sat(o*a)-n[0]);r[0]=s,n[0]=this.sat(s*a);let c=t[1]=r[1]+i/a*(n[0]-n[1]);r[1]=c,n[1]=this.sat(c*a);let l=t[2]=r[2]+i/a*(n[1]-n[2]);r[2]=l,n[2]=this.sat(l*a);let u=t[3]=r[3]+i/a*(n[2]-this.sat(r[3]*a));r[3]=u,r[5]=(u+r[4])*.5,r[4]=u}return Math.abs(r[5])<8||(t.fill(0),n.fill(0),r.fill(0)),r[5]}render(e){let t=this.patch,n=this.rate,r=1-Math.exp(-1/(.001*1e4**t.ampAttack*n)),i=1-Math.exp(-1/(.004*5e3**t.ampDecay*n));for(let a=0;a<e.length;a++){this.tick++%4==0&&this.control(4);let o=0,s=0;for(let e=0;e<3;e++){let n=this.inc[e],r=(this.osc[e]+n)%1;this.osc[e]=r;let i=this.wave(e,t.wave[e],r,n);e===2&&(s=i),t.on[e]&&(o+=i*t.level[e]*t.level[e])}this.third=s;let c=this.random(),l=this.pinkState;l[0]=.99765*l[0]+c*.099046,l[1]=.963*l[1]+c*.2965164,l[2]=.57*l[2]+c*1.0526913;let u=t.pink?(l[0]+l[1]+l[2]+c*.1848)*.2:c;this.noiseNow=u,t.noiseOn&&(o+=u*t.noise*t.noise),t.loopOn&&(o+=this.last*t.loop*2.5),Math.abs(o)*.62>.95&&(this.overload=1);let d=this.ladder(o*.62*(1+t.emphasis*.7));[this.ampEnv,this.ampStep]=this.contour(this.ampEnv,this.ampStep,r,i,t.ampSustain),this.last=d*this.ampEnv,this.beep=(this.beep+440/n)%1;let f=t.tone?Math.sin(this.beep*Math.PI*2)*.3:0;e[a]=t.output?this.last*.8+f:0}}},Me=`const Voice = (${J.toString()});
class Run extends AudioWorkletProcessor {
  constructor(o) {
    super();
    this.voice = new Voice(sampleRate, o.processorOptions.patch);
    this.left = 0;
    this.peak = 0;
    this.port.onmessage = ({ data: m }) => {
      if (m.end) this.ended = true;
      if (m.set) Object.assign(this.voice.patch, m.set);
      if (m.press !== undefined) this.voice.press(m.press);
      if (m.release !== undefined) this.voice.release(m.release);
    };
  }
  process(_, outputs) {
    if (this.ended) return false;
    const out = outputs[0][0];
    if (!out) return true;
    this.voice.render(out);
    for (let i = 1; i < outputs[0].length; i++) outputs[0][i].set(out);
    for (let i = 0; i < out.length; i++) this.peak = Math.max(this.peak, Math.abs(out[i]));
    if ((this.left -= out.length) <= 0) {
      this.left = 2048;
      this.port.postMessage({ hz: this.voice.hz, overload: this.voice.overload, peak: this.peak });
      this.peak = 0;
    }
    return true;
  }
}
registerProcessor('mono-voice', Run);
`;function Ne(e={},t=.7){f();let n={...q,...e},r=null,i=null,a,o,s,c=null,l=0,u=0,m=0,h=[],g=e=>i?i.port.postMessage(e):h.push(e),v=e=>e*e;return{get volume(){return t},set volume(e){t=e,r&&a&&a.gain.setTargetAtTime(v(e),r.currentTime,.02)},get cutoff(){return l},get overload(){return u},get peak(){return m},wake(){return c??=(async()=>{let e=r=d();await _(`mono-voice`,Me),i=new AudioWorkletNode(e,`mono-voice`,{numberOfInputs:0,outputChannelCount:[2],processorOptions:{patch:n}}),i.port.onmessage=({data:e})=>{l=e.hz,u=e.overload,m=e.peak},a=e.createGain(),o=e.createAnalyser(),o.fftSize=2048,s=new Float32Array(o.fftSize),a.gain.value=v(t),i.connect(a).connect(o).connect(p());for(let e of h.splice(0))i.port.postMessage(e)})()},set(e){Object.assign(n,e),g({set:e})},press(e){this.wake(),r&&d(),g({press:e})},release(e){g({release:e})},scope(){return i?(o.getFloatTimeDomainData(s),s):null},close(){i?.port.postMessage({end:!0}),i?.disconnect(),r=i=c=null}}}var Pe={lfoRate:.45,lfoDelay:0,lfoAuto:!0,trig:!1,dcoLfo:0,pwm:.4,pwmMode:1,pulse:!1,saw:!0,sub:!1,subLevel:.5,noise:0,hpf:0,cutoff:.65,resonance:.15,envUp:!0,envAmount:.2,vcfLfo:0,kybd:.5,gate:!1,level:.7,attack:.1,decay:.4,sustain:.6,release:.35,chorus:1,hold:!1,arp:!1,arpMode:0,arpRange:1,arpRate:.5,bend:0,bendDco:.2,bendVcf:0,transpose:0,output:!0},Fe=class{rate;patch;down;held;notes;gates;keyOf;born;phase;inc;width;square;env;step;amp;tune;feedback;ladders;hp;line;write;chorusAt;wetL;wetR;lfoPhase;lfoNow;lfoIn;lfoWait;seed;tick;clock;arpAt;arpLeft;arpGate;arpNote;arpDir;settled;constructor(e,t){this.rate=e,this.patch=t,this.down=[],this.held=[],this.notes=new Int16Array(6).fill(-1),this.gates=new Uint8Array(6),this.keyOf=new Float64Array(6).fill(60),this.born=new Float64Array(6),this.phase=new Float64Array([.1,.37,.71,.53,.89,.23]),this.inc=new Float64Array(6),this.width=new Float64Array(6).fill(.5),this.square=new Float64Array(6).fill(1),this.env=new Float64Array(6),this.step=new Uint8Array(6),this.amp=new Float64Array(6),this.tune=new Float64Array(6),this.feedback=new Float64Array(6),this.ladders=new Float64Array(54),this.hp=new Float64Array(4),this.line=new Float32Array(Math.ceil(e*.02)),this.write=0,this.chorusAt=new Float64Array(2),this.wetL=0,this.wetR=0,this.lfoPhase=0,this.lfoNow=0,this.lfoIn=0,this.lfoWait=0,this.seed=22222,this.tick=0,this.clock=0,this.arpAt=-1,this.arpLeft=0,this.arpGate=0,this.arpNote=-1,this.arpDir=1,this.settled=0}allocate(e){let t=-1,n=0;for(let r=0;r<6;r++){if(this.notes[r]===e)return r;!this.gates[r]&&(t<0||this.born[r]<this.born[t])&&(t=r),this.born[r]<this.born[n]&&(n=r)}return t>=0?t:n}start(e){let t=this.allocate(e);this.notes[t]=e,this.gates[t]=1,this.keyOf[t]=e,this.born[t]=this.clock+1,this.clock++,this.step[t]=1}stop(e){for(let t=0;t<6;t++)this.notes[t]===e&&this.gates[t]&&(this.gates[t]=0,this.step[t]=4)}press(e){let t=this.patch;if(t.hold&&!this.down.length){for(let e of this.held)t.arp||this.stop(e);this.held=[]}this.down.indexOf(e)<0&&this.down.push(e),this.held.indexOf(e)<0&&this.held.push(e),t.arp||this.start(e)}release(e){this.down=this.down.filter(t=>t!==e),this.patch.hold||(this.held=this.held.filter(t=>t!==e),this.patch.arp||this.stop(e))}random(){let e=this.seed;return e^=e<<13,e^=e>>>17,e^=e<<5,this.seed=e|0,(e|0)/2147483648}blep(e,t){if(e<t){let n=e/t;return n+n-n*n-1}if(e>1-t){let n=(e-1)/t;return n*n+n+n+1}return 0}run(){let e=this.held.slice().sort((e,t)=>e-t),t=[];for(let n=0;n<this.patch.arpRange;n++)for(let r of e)t.push(r+n*12);return t}arpStep(){let e=this.patch,t=this.run();this.arpNote>=0&&this.stop(this.arpNote),this.arpNote=-1,t.length?(e.arpMode===0?this.arpAt=(this.arpAt+1)%t.length:e.arpMode===2?this.arpAt=this.arpAt<=0?t.length-1:this.arpAt-1:t.length===1?this.arpAt=0:(this.arpAt>=t.length-1&&(this.arpDir=-1),this.arpAt<=0&&(this.arpDir=1),this.arpAt+=this.arpDir),this.arpAt=Math.min(Math.max(this.arpAt,0),t.length-1),this.arpNote=t[this.arpAt],this.start(this.arpNote)):this.arpAt=-1}control(e){let t=this.patch,n=this.rate,r=e/n;if(!t.hold&&this.held.length>this.down.length){for(let e of this.held)this.down.indexOf(e)<0&&!t.arp&&this.stop(e);this.held=this.held.filter(e=>this.down.indexOf(e)>=0)}if(!t.arp&&this.arpNote>=0){this.stop(this.arpNote),this.arpNote=-1;for(let e of this.held)this.start(e)}if(t.arp){for(let e=0;e<6;e++)this.gates[e]&&this.notes[e]!==this.arpNote&&this.stop(this.notes[e]);this.arpLeft-=r*2*15**t.arpRate,this.arpGate-=r*2*15**t.arpRate,this.arpLeft<=0?(this.arpLeft+=1,this.arpLeft<=0&&(this.arpLeft=1),this.arpGate=.5,this.arpStep()):this.arpGate<=0&&this.arpNote>=0&&(this.stop(this.arpNote),this.arpNote=-1)}this.lfoPhase=(this.lfoPhase+.1*300**t.lfoRate*r)%1,this.lfoNow=4*Math.abs(this.lfoPhase-.5)-1;let i=this.gates.some(e=>e>0);if(t.lfoAuto?i:t.trig){this.lfoWait+=r;let e=t.lfoDelay*t.lfoDelay*3;this.lfoWait>e&&(this.lfoIn=Math.min(this.lfoIn+r/(e*.5+.01),1))}else this.lfoWait=0,this.lfoIn=t.lfoAuto?this.lfoIn*.999:Math.max(this.lfoIn-r*8,0);let a=this.lfoNow*this.lfoIn,o=t.bend*t.bendDco*12+a*t.dcoLfo*t.dcoLfo*6+t.transpose;for(let e=0;e<6;e++){if(!this.step[e]&&!this.gates[e])continue;let r=this.keyOf[e],i=this.env[e];this.inc[e]=Math.min(440*2**((r+o-69)/12)/n,.45);let s=t.pwmMode===0?(a+1)/2:t.pwmMode===2?i:1;this.width[e]=.5-.45*t.pwm*s;let c=t.cutoff*10.5+(t.envUp?i:-i)*t.envAmount*7+a*t.vcfLfo*3+t.kybd*(r+t.transpose-60)/12+t.bend*t.bendVcf*3,l=Math.min(20*2**c,n*.42)/n,u=l*.5,d=1.873*l*l*l+.4955*l*l-.649*l+.9988,f=-3.9364*l*l+1.8409*l+.9968;this.tune[e]=1-Math.exp(-2*Math.PI*u*d),this.feedback[e]=4*Math.min(t.resonance*1.06,1.06)*f}}sat(e){let t=e>3?3:e<-3?-3:e;return t*(27+t*t)/(27+9*t*t)}ladder(e,t,n,r){let i=this.ladders,a=.9,o=i[e+8];for(let s=0;s<2;s++){let s=i[e]+n/a*(this.sat((t-r*o)*a)-i[e+4]);i[e]=s,i[e+4]=this.sat(s*a);let c=i[e+1]+n/a*(i[e+4]-i[e+5]);i[e+1]=c,i[e+5]=this.sat(c*a);let l=i[e+2]+n/a*(i[e+5]-i[e+6]);i[e+2]=l,i[e+6]=this.sat(l*a);let u=i[e+3]+n/a*(i[e+6]-this.sat(i[e+3]*a));i[e+3]=u,o=(u+i[e+7])*.5,i[e+7]=u}return Math.abs(o)<8||(i.fill(0,e,e+9),o=0),i[e+8]=o,o}voice(e,t,n,r,i,a){let o=this.patch,s=this.inc[e],c=this.env[e],l=this.step[e];l===1?(c+=t,c>=1&&(c=1,l=2)):l===2?c+=(r-c)*n:l===4&&(c*=1-i,c<2e-5&&(c=0,l=0)),this.env[e]=c;let u=+!!this.gates[e],d=this.amp[e];if(d+=((o.gate?u:c)-d)*a,this.amp[e]=d,this.step[e]=l,!l&&d<2e-5)return this.notes[e]=-1,0;let f=this.phase[e]+s;f>=1&&(--f,this.square[e]=-this.square[e]),this.phase[e]=f;let p=0;if(o.saw&&(p+=(2*f-1-this.blep(f,s))*.55),o.pulse){let t=this.width[e],n=(f-t+1)%1;p+=((f<t?1:-1)+this.blep(f,s)-this.blep(n,s))*.5}if(o.sub){let t=this.square[e];p+=(t+(f<s?t:-t)*this.blep(f,s))*o.subLevel*.5}return o.noise>0&&(p+=this.random()*o.noise*.4),this.ladder(e*9,p*(1+o.resonance*.7),this.tune[e],this.feedback[e])*d}tap(e){let t=this.line,n=t.length,r=(this.write-e*this.rate/1e3+n*2)%n,i=Math.floor(r),a=r-i,o=t[(i+n-1)%n],s=t[i],c=t[(i+1)%n],l=t[(i+2)%n];return s+.5*a*(c-o+a*(2*o-5*s+4*c-l+a*(3*(s-c)+l-o)))}render(e,t){let n=this.patch,r=this.rate,i=1/(r*.0015*2e3**n.attack),a=1-Math.exp(-1/(r*.0015*2600**n.decay)),o=1-Math.exp(-1/(r*.0015*2600**n.release)),s=1-Math.exp(-1/(r*.002)),c=[0,225,340,720][n.hpf]??0,l=1-Math.exp(-2*Math.PI*c/r),u=[0,.513,.863,9.75],d=[0,1.66,1.66,3.3],f=[0,5.35,5.35,3.7],p=u[n.chorus]/r,m=d[n.chorus],h=f[n.chorus],g=1-Math.exp(-2*Math.PI*8e3/r),_=this.line.length;for(let r=0;r<e.length;r++){this.tick++%16==0&&this.control(16);let u=0;for(let e=0;e<6;e++)(this.step[e]||this.amp[e]>2e-5||this.gates[e])&&(u+=this.voice(e,i,a,n.sustain,o,s));if(u*=1.1*n.level*n.level,c){this.hp[0]=this.hp[0]+(u-this.hp[0])*l;let e=u-this.hp[0];this.hp[1]=this.hp[1]+(e-this.hp[1])*l,u=e-this.hp[1]}this.line[this.write]=u,this.write=(this.write+1)%_;let d=u,f=u;if(n.chorus){let e=this.chorusAt[0]=(this.chorusAt[0]+p)%1,t=4*Math.abs(e-.5)-1,n=(m+h)/2,r=(h-m)/2;this.wetL+=(this.tap(n+t*r)-this.wetL)*g,this.wetR+=(this.tap(n-t*r)-this.wetR)*g,d=u*.7+this.wetL*.7,f=u*.7+this.wetR*.7}e[r]=n.output?this.sat(d*1.2)*.7:0,t[r]=n.output?this.sat(f*1.2)*.7:0}}},Ie=`const Voices = (${Fe.toString()});
class Run extends AudioWorkletProcessor {
  constructor(o) {
    super();
    this.voices = new Voices(sampleRate, o.processorOptions.patch);
    this.left = 0;
    this.peak = 0;
    this.port.onmessage = ({ data: m }) => {
      if (m.end) this.ended = true;
      if (m.set) Object.assign(this.voices.patch, m.set);
      if (m.press !== undefined) this.voices.press(m.press);
      if (m.release !== undefined) this.voices.release(m.release);
    };
  }
  process(_, outputs) {
    if (this.ended) return false;
    const [l, r] = outputs[0];
    if (!l) return true;
    this.voices.render(l, r ?? l);
    for (let i = 0; i < l.length; i++) this.peak = Math.max(this.peak, Math.abs(l[i]));
    if ((this.left -= l.length) <= 0) {
      this.left = 2048;
      this.port.postMessage({ peak: this.peak });
      this.peak = 0;
    }
    return true;
  }
}
registerProcessor('poly-voices', Run);
`;function Le(e={},t=.7){f();let n={...Pe,...e},r=null,i=null,a,o=null,s=0,c=[],l=e=>i?i.port.postMessage(e):c.push(e),u=e=>e*e;return{get volume(){return t},set volume(e){t=e,r&&a.gain.setTargetAtTime(u(e),r.currentTime,.02)},get peak(){return s},wake(){return o??=(async()=>{let e=r=d();await _(`poly-voices`,Ie),i=new AudioWorkletNode(e,`poly-voices`,{numberOfInputs:0,outputChannelCount:[2],processorOptions:{patch:n}}),i.port.onmessage=({data:e})=>{s=e.peak},a=e.createGain(),a.gain.value=u(t),i.connect(a).connect(p());for(let e of c.splice(0))i.port.postMessage(e)})()},set(e){Object.assign(n,e),l({set:e})},press(e){this.wake(),r&&d(),l({press:e})},release(e){l({release:e})},close(){i?.port.postMessage({end:!0}),i?.disconnect(),r=i=o=null}}}function Y(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function X(e,t,n){let r=0;for(let t of e)for(let e of t)r=Math.max(r,Math.abs(e));let i=r?t/r:0,a=Math.min(Math.round(n*.02),e[0].length);for(let t of e){for(let e=0;e<t.length;e++)t[e]*=i;for(let e=0;e<a;e++)t[t.length-1-e]*=e/a}}function Re(e,t){let{hz:n,seconds:r=2.5,damp:i=0,mallet:a=.3,glide:o=.04,level:s=.8}=t,c=new Float32Array(Math.ceil(r*e)),l=Y(Math.round(n*100)),u=[[.62,.7,.18],[1,1,1.8],[1.5,.45,1.3],[1.98,.3,1],[2.44,.18,.75],[2.94,.1,.6],[3.42,.06,.45]],d=1-i*.85;for(let[t,r,i]of u){let a=l()*Math.PI*2,s=i*d;for(let i=0;i<c.length;i++){let l=i/e,u=1+o*Math.exp(-l/.09);a+=2*Math.PI*n*t*u/e,c[i]+=Math.sin(a)*r*Math.exp(-l/s)}}let f=Math.round(e*.012),p=.15+a*.7,m=0;for(let e=0;e<f;e++)m+=(l()*2-1-m)*p,c[e]+=m*(1-e/f)**2*(.4+a*1.2);return X([c],s,e),c}var ze={a:[[800,1],[1150,.5],[2900,.18]],e:[[400,1],[1600,.35],[2700,.2]],i:[[350,1],[1700,.25],[2700,.2]],o:[[450,1],[800,.4],[2830,.08]],u:[[325,1],[700,.25],[2700,.05]]};function Be(e,t){let{notes:n,seconds:r,vowel:i=`a`,voices:a=4,attack:o=.6,release:s=1,spread:c=.7,detune:l=14,level:u=.8,seed:d=7}=t,f=Math.ceil(r*e),p=new Float32Array(f),m=new Float32Array(f),h=Y(d),g=new Float32Array(f),_=n.length*a;n.forEach((t,n)=>{for(let i=0;i<a;i++){let u=n*a+i,d=_>1?(u/(_-1)*2-1)*c:0,g=Math.cos((d+1)*Math.PI/4),v=Math.sin((d+1)*Math.PI/4),y=(h()*2-1)*l,b=4.6+h()*1.6,x=.004+h()*.004,S=h()*.25,C=h(),w=h()*Math.PI*2,T=t*2**(y/1200);for(let t=0;t<f;t++){let n=t/e;w+=2*Math.PI*b/e;let i=T*(1+Math.sin(w)*x*Math.min(n/.8,1))/e;C+=i,C>=1&&--C;let a=2*C-1;if(C<i){let e=C/i;a-=e+e-e*e-1}else if(C>1-i){let e=(C-1)/i;a-=e*e+e+e+1}let c=Math.min(Math.max((n-S)/o,0),1)*Math.min((r-n)/s,1);p[t]+=a*c*g,m[t]+=a*c*v}}});for(let t=0;t<f;t++)g[t]=(h()*2-1)*.03*Math.min(t/e/o,1)*Math.min((r-t/e)/s,1);for(let t of[p,m]){let n=new Float32Array(f);for(let[r,a]of ze[i]){let i=2*Math.PI*Math.min(r,e*.45)/e,o=r/(60+r*.06),s=Math.sin(i)/(2*o),c=1+s,l=s/c,u=-s/c,d=-2*Math.cos(i)/c,p=(1-s)/c,m=0,h=0,_=0,v=0;for(let e=0;e<f;e++){let r=t[e]+g[e],i=l*r+u*h-d*_-p*v;h=m,m=r,v=_,_=i,n[e]+=i*a}}t.set(n)}return X([p,m],u,e),[p,m]}function Ve(e,t){let{notes:n,seconds:r,players:i=4,attack:a=.8,release:o=1.2,swell:s=0,bright:c=.4,spread:l=.8,detune:u=8,level:d=.8,seed:f=11}=t,p=Math.ceil(r*e),m=new Float32Array(p),h=new Float32Array(p),g=Y(f),_=n.length*i,v=e=>{let t=e/r,n=s>=0?1-s+s*t**1.6:1+s*t;return Math.min(e/a,1)*Math.min((r-e)/o,1)*Math.max(0,n)};n.forEach((t,n)=>{for(let a=0;a<i;a++){let o=n*i+a,s=_>1?(o/(_-1)*2-1)*l:0,c=Math.cos((s+1)*Math.PI/4),d=Math.sin((s+1)*Math.PI/4),f=(g()*2-1)*u,y=5+g()*1.2,b=.0025+g()*.002,x=g()*.12,S=g(),C=g()*Math.PI*2,w=t*2**(f/1200);for(let t=0;t<p;t++){let n=t/e;C+=2*Math.PI*y/e;let i=w*(1+Math.sin(C)*b*Math.min(Math.max(n-.3,0)/.9,1))/e;S+=i,S>=1&&--S;let a=2*S-1;if(S<i){let e=S/i;a-=e+e-e*e-1}else if(S>1-i){let e=(S-1)/i;a-=e*e+e+e+1}let o=v(Math.max(n-x,0))*Math.min((r-n)/.02,1);m[t]+=a*o*c,h[t]+=a*o*d}}});let y=.02+c*.05;for(let t=0;t<p;t++){let n=v(t/e)*y*Math.sqrt(_);m[t]+=(g()*2-1)*n,h[t]+=(g()*2-1)*n}let b=1-Math.exp(-2*Math.PI*(900+c*4600)/e);for(let t of[m,h]){let n=0,r=0,i=new Float32Array(p);for(let e=0;e<p;e++)n+=(t[e]-n)*b,r+=(n-r)*b,i[e]=r;let a=new Float32Array(p);for(let[n,r]of[[280,.5],[460,.35],[2600,.12+c*.2]]){let i=2*Math.PI*Math.min(n,e*.45)/e,o=Math.sin(i)/5,s=1+o,c=o/s,l=-o/s,u=-2*Math.cos(i)/s,d=(1-o)/s,f=0,m=0,h=0,g=0;for(let e=0;e<p;e++){let n=t[e],i=c*n+l*m-u*h-d*g;m=f,f=n,g=h,h=i,a[e]+=i*r}}for(let e=0;e<p;e++)t[e]=i[e]+a[e]}return X([m,h],d,e),[m,h]}function He(e,t,n,r){let i=new J(e,{...q,...t}),a=new Float32Array(Math.ceil(n*e));for(let t=0;t<a.length;t+=128)r(i,t/e),i.render(a.subarray(t,Math.min(t+128,a.length)));return a}var Ue={range:[3,3,4],wave:[2,3,2],detune:[0,.09,-.07],level:[1,.8,.55],on:[!0,!0,!0],cutoff:.55,emphasis:.55,amount:.25,filterAttack:.15,filterDecay:.5,filterSustain:.75,ampAttack:.2,ampSustain:1};function We(e,t){let n=t*2,r=.025;return He(e,Ue,n*3,(e,i)=>{i===0&&e.press(79);let a=i%n,o=a<t?Math.max(0,1-a/r)*+(a<r):Math.min(1,(a-t)/r);e.patch.bend=-o}).slice(Math.round(n*2*e),Math.round(n*3*e))}function Ge(e,t,n={}){let r=We(e.sampleRate,n.half??.36),i=e.createBuffer(1,r.length,e.sampleRate);return i.copyToChannel(r,0),Ke(e,t,i,n.level??.16,n.seconds)}function Ke(e,t,n,r=.16,i){let a=n.duration,o=.006,s=e.createGain();s.gain.value=r,s.connect(t);let c=e.currentTime+.02,l=i===void 0?1/0:c+i,u=t=>{for(;c<Math.min(t,l);){let t=e.createBufferSource(),r=e.createGain();t.buffer=n,r.gain.setValueAtTime(0,c),r.gain.linearRampToValueAtTime(1,c+o),r.gain.setValueAtTime(1,c+a-o),r.gain.linearRampToValueAtTime(0,c+a+o),t.connect(r).connect(s),t.start(c),t.stop(c+a+o*2),c+=a}c>=l&&clearInterval(d)},d=0;return e instanceof AudioContext?(u(e.currentTime+.4),d=window.setInterval(()=>u(e.currentTime+.4),100)):u(e.length/e.sampleRate),(t=e.currentTime)=>{l=t,clearInterval(d),s.gain.setTargetAtTime(0,t,.06)}}var qe=.012,Je=e=>Math.max(0,e)**2*.5;function Ye(e,t,n={}){let r=(n.hz??60)*2,i=e.createGain(),a=e.createGain();i.gain.value=Je(n.level??1),a.gain.setValueAtTime(0,e.currentTime),a.gain.linearRampToValueAtTime(1,e.currentTime+.02);let o=e.createOscillator(),s=e.createOscillator(),c=e.createGain(),l=e.createWaveShaper(),u=e.createBiquadFilter(),d=e.createBiquadFilter(),f=e.createGain(),p=e.createGain();o.type=`sawtooth`,o.frequency.value=r,s.type=`square`,s.frequency.value=r*1.002,c.gain.value=.6;let m=new Float32Array(256);for(let e=0;e<256;e++)m[e]=Math.tanh((e/127.5-1)*4);return l.curve=m,u.type=`peaking`,u.frequency.value=620,u.Q.value=2.5,u.gain.value=12,d.type=`bandpass`,d.frequency.value=2400,d.Q.value=1.4,f.gain.value=.7,p.gain.value=.5,o.connect(c),s.connect(c),c.connect(l).connect(u),u.connect(f).connect(a),u.connect(d).connect(p).connect(a),a.connect(i).connect(t),o.start(),s.start(),{level(t){i.gain.setTargetAtTime(Je(t),e.currentTime,qe)},stop(t=e.currentTime){a.gain.setTargetAtTime(0,t,qe),o.stop(t+.2),s.stop(t+.2),o.onended=()=>i.disconnect()}}}var Xe=`
class Strings extends AudioWorkletProcessor {
  constructor({ processorOptions: { hz, pickups, ring } }) {
    super();
    this.pickups = pickups;
    this.gains = pickups.map(() => 1);
    this.strings = hz.map((f, i) => {
      const k = hz.length > 1 ? i / (hz.length - 1) : 0;
      const soft = 0.3 - 0.16 * k, seconds = ring[0] + (ring[1] - ring[0]) * k;
      const total = sampleRate / f - soft / (1 - soft), n = Math.floor(total - 0.3), frac = total - n;
      return {
        n, buf: new Float32Array(n), r: 0, soft, low: 0, keep: Math.pow(10, -3 / (f * seconds)),
        ap: (1 - frac) / (1 + frac), apIn: 0, apOut: 0, last: pickups.map(() => 0), level: 2.4 / (n * 0.002 + 1) * (0.7 + 0.3 * (n / 600)),
        tap: pickups.map(x => Math.max(1, Math.round((x * n) / 2))),
      };
    });
    this.port.onmessage = ({ data: m }) => {
      if (m.gains) this.gains = m.gains;
      if (m.pluck) this.pluck(m.pluck);
    };
  }
  pluck({ string, at, force }) {
    const s = this.strings[string];
    if (!s) return;
    const { n, buf, r } = s, half = n / 2, apex = Math.min(Math.max(at, 0.02), 0.98);
    const shape = new Float32Array(n);
    for (let k = 0; k < n; k++) {
      const x = k <= half ? k / half : 2 - k / half;
      const y = (x < apex ? x / apex : (1 - x) / (1 - apex)) * force * 0.5;
      shape[k] = k <= half ? y : -y;
    }
    // A finger or a pick has a width, and a soft stroke lays less top on the string than a hard one.
    for (let pass = 0, passes = Math.round(1 + (1 - force) * 5); pass < passes; pass++) {
      let before = shape[n - 1];
      for (let k = 0; k < n; k++) {
        const now = shape[k];
        shape[k] = 0.25 * before + 0.5 * now + 0.25 * shape[(k + 1) % n];
        before = now;
      }
    }
    // Whatever was ringing is mostly stopped by the pick that takes it.
    for (let k = 0; k < n; k++) {
      const i = (r + k) % n;
      buf[i] = buf[i] * 0.25 + shape[k];
    }
  }
  process(_, [out]) {
    const left = out[0], { gains, strings } = this;
    for (let i = 0; i < left.length; i++) {
      let sum = 0;
      for (const s of strings) {
        const { n, buf, tap, last } = s;
        const head = s.r;
        for (let p = 0; p < tap.length; p++) {
          if (!gains[p]) continue;
          // The string's height at the pickup, and a magnetic pickup hears how fast that's changing.
          const a = head + tap[p], b = head - tap[p];
          const y = buf[a >= n ? a - n : a] - buf[b < 0 ? b + n : b];
          sum += (y - last[p]) * gains[p] * s.level;
          last[p] = y;
        }
        const x = buf[head];
        s.low = (1 - s.soft) * x + s.soft * s.low;
        const v = s.low * s.keep, ap = s.ap * (v - s.apOut) + s.apIn;
        s.apIn = v;
        s.apOut = ap;
        buf[head] = ap;
        s.r = head + 1 === n ? 0 : head + 1;
      }
      left[i] = sum;
    }
    for (let c = 1; c < out.length; c++) out[c].set(left);
    return true;
  }
}
registerProcessor('plucked-strings', Strings);
`;function Ze(e){f();let t=null,n=null,r=!1,i=[],a=e=>t?t.port.postMessage(e):i.push(e);return{wake(){n??=(async()=>{let n=d();if(await _(`plucked-strings`,Xe),!r){t=new AudioWorkletNode(n,`plucked-strings`,{numberOfInputs:0,outputChannelCount:[1],processorOptions:{hz:[...e.hz],pickups:[...e.pickups],ring:[...e.ring??[7,3.5]]}}),t.connect(e.into?.(n)??p());for(let e of i.splice(0))t.port.postMessage(e)}})()},pluck:(e,t,n)=>a({pluck:{string:e,at:t,force:n}}),listen:e=>a({gains:[...e]}),close(){r=!0,t?.disconnect(),t=null}}}var Qe=343,Z=`
class BrassCore {
  constructor(rate, length, valves) {
    this.rate = rate;
    this.length = length;
    this.added = valves;
    this.down = valves.map(() => false);
    this.buf = new Float32Array(Math.ceil(rate * 2 * (length + valves.reduce((a, b) => a + b, 0)) / ${Qe}) + 8);
    this.w = 0;
    // The tube the air goes round: two of them while a valve is on its way, one fading into the other.
    this.from = this.to = this.delay();
    this.mix = 1;
    this.mixStep = 1 / (rate * 0.012);
    this.partial = this.partialTo = 4;
    this.pressure = this.pressureTo = 0;
    this.open = this.openTo = 0;
    this.y1 = this.y2 = 0;
    this.bell = 0;
    this.dcIn = this.dcOut = 0;
    this.rad = 0;
    this.tension = 0;
    this.slur = 1 - Math.exp(-1 / (rate * 0.03));
    this.attack = 1 - Math.exp(-1 / (rate * 0.012));
    this.release = 1 - Math.exp(-1 / (rate * 0.04));
    this.phase = 0;
    this.seed = 1;
  }
  delay() {
    let l = this.length;
    this.added.forEach((a, i) => { if (this.down[i]) l += a; });
    // The bell's roll-off holds the wave back a little itself, and that's part of the way round.
    return (this.rate * 2 * l) / ${Qe} - 1.38;
  }
  valve(i, down) {
    if (i < 0 || i >= this.down.length) return;
    this.down[i] = down;
    this.from = this.mix >= 1 ? this.to : this.from + (this.to - this.from) * this.mix;
    this.to = this.delay();
    this.mix = 0;
  }
  read(d) {
    const { buf } = this, n = buf.length, at = this.w - d + n + n, i = Math.floor(at), f = at - i;
    return buf[i % n] * (1 - f) + buf[(i + 1) % n] * f;
  }
  tick() {
    this.partial += (this.partialTo - this.partial) * this.slur;
    this.pressure += (this.pressureTo - this.pressure) * (this.pressureTo > this.pressure ? this.attack : this.release);
    this.open += (this.openTo - this.open) * this.release;
    if (this.mix < 1) this.mix = Math.min(this.mix + this.mixStep, 1);
    // A valve halfway has both ports half shut: both paths sound, and less gets through either.
    const m = this.mix, shut = 1 - 0.55 * Math.sin(Math.PI * m);
    const back = (this.read(this.from) * (1 - m) + this.read(this.to) * m) * shut;
    // The bell keeps the top and sends the bottom back: reflection rolls off above about 1.5k, and a hole in the tube sends less of it.
    this.bell += 0.42 * (back - this.bell);
    const bore = this.bell * 0.92 * (1 - 0.75 * this.open);
    // The lips aim at a resonance of the tube as it now is, which is what a player hears in their head. A slight wobble keeps it alive.
    this.phase += 5.1 / this.rate;
    const wobble = this.pressure > 0.01 ? 1 + 0.0016 * Math.sin(2 * Math.PI * this.phase) : 1;
    const tube = this.rate / (this.from + (this.to - this.from) * m);
    const hz = this.partial * tube * wobble;
    // A mass on a spring, which is what a lip is. Blowing harder shuts it faster, so it brightens.
    const r = 0.9985, a1 = 2 * r * Math.cos((2 * Math.PI * hz) / this.rate), a2 = -r * r;
    const mouth = this.pressure * 0.75;
    // Breath is never quite steady, and that's what starts a lip moving again when a jump has shaken it off the tube.
    this.seed = (Math.imul(this.seed, 1664525) + 1013904223) | 0;
    const dp = mouth * (0.3 + (this.seed / 2147483648) * 0.03) - bore * 0.85;
    // As soft a lip at any tension: a resonator's peak gets higher as it gets lower.
    const y = 0.3 * Math.sin((2 * Math.PI * hz) / this.rate) * dp + a1 * this.y1 + a2 * this.y2;
    this.y2 = this.y1;
    this.y1 = y;
    // The gap between the lips, opened by that motion: how much of the mouth gets through and how much of the bore is turned back.
    const gap = Math.min(y * y, 1), out = gap * mouth + (1 - gap) * bore;
    // No steady air comes back as sound.
    this.dcOut = out - this.dcIn + 0.995 * this.dcOut;
    this.dcIn = out;
    this.buf[this.w] = this.dcOut;
    this.w = (this.w + 1) % this.buf.length;
    // What leaves the bell is what wasn't reflected: the top of it, more than the bottom.
    const heard = back - this.bell * 0.72;
    return heard + (out - heard) * this.open * 0.5;
  }
}
`,$e=`${Z}
class BrassVoice extends AudioWorkletProcessor {
  constructor({ processorOptions: { length, valves } }) {
    super();
    this.core = new BrassCore(sampleRate, length, valves);
    this.port.onmessage = ({ data: m }) => {
      const c = this.core;
      if (m.blow !== undefined) c.pressureTo = m.blow;
      if (m.lip !== undefined) c.partialTo = m.lip;
      if (m.leak !== undefined) c.openTo = m.leak;
      if (m.valve !== undefined) c.valve(m.valve, m.down);
    };
  }
  process(_, [out]) {
    const left = out[0], c = this.core;
    for (let i = 0; i < left.length; i++) left[i] = c.tick();
    for (let k = 1; k < out.length; k++) out[k].set(left);
    return true;
  }
}
registerProcessor('brass-voice', BrassVoice);
`;function et(e){f();let t=null,n=null,r=!1,i=[],a=e=>t?t.port.postMessage(e):i.push(e);return{wake(){n??=(async()=>{let n=d();if(await _(`brass-voice`,$e),!r){t=new AudioWorkletNode(n,`brass-voice`,{numberOfInputs:0,outputChannelCount:[1],processorOptions:{length:e.length,valves:[...e.valves]}}),t.connect(e.into?.(n)??p());for(let e of i.splice(0))t.port.postMessage(e)}})()},blow:e=>a({blow:e}),lip:e=>a({lip:e}),valve:(e,t)=>a({valve:e,down:t}),leak:e=>a({leak:e}),close(){r=!0,t?.disconnect(),t=null}}}var Q=null,tt=e=>{if(Q)return Q;Q=e.createBuffer(1,e.sampleRate,e.sampleRate);let t=Q.getChannelData(0);for(let e=0;e<t.length;e++)t[e]=Math.random()*2-1;return Q};function $(e,t,n,r){let i=d(),a=i.createBufferSource(),o=i.createBiquadFilter(),s=i.createGain(),c=i.currentTime;a.buffer=tt(i),a.loop=!0,o.type=`bandpass`,o.frequency.setValueAtTime(e,c),o.Q.value=t;let l=n[n.length-1][0];r&&o.frequency.exponentialRampToValueAtTime(r,c+l),s.gain.setValueAtTime(0,c);for(let[e,t]of n)s.gain.linearRampToValueAtTime(t,c+e);a.connect(o).connect(s).connect(p()),a.start(c,Math.random()*.9),a.stop(c+l+.02)}function nt(e=.12,t=1){let n=Math.min(Math.max(t,0),1);$(3400,.8,[[.008,.5*n],[e*.7,.32*n],[e,0]],5200)}function rt(){$(5200,.6,[[.015,.55],[.12,.3],[.5,.05],[1,0]],1800),$(420,.7,[[.08,.28],[1.2,.05],[1.8,0]])}function it(){$(1900,1.2,[[.006,.34],[.03,.08],[.05,.3],[.09,.05],[.11,.2],[.17,0]],3200)}export{we as A,b as B,be as C,xe as D,Ee as E,oe as F,g as G,d as H,ae as I,_ as J,p as K,M as L,me as M,N,Oe as O,j as P,x as R,Ae as S,Te as T,m as U,v as V,h as W,Le as _,et as a,Ne as b,He as c,Ke as d,Ve as f,Fe as g,Pe as h,Z as i,ge as j,Ce as k,Ge as l,Re as m,nt as n,Ze as o,Be as p,f as q,it as r,Ye as s,rt as t,We as u,J as v,Se as w,je as x,q as y,k as z};