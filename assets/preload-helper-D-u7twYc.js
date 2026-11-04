(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=.25;function t(t){let n=t.to[0]-t.from[0],r=t.to[1]-t.from[1],i=Math.hypot(n,r)||1,a=[n/i,r/i],o=t.drop??i*e,s=t.from[0]*a[0]+t.from[1]*a[1],c=t.mirror?t.mirror[0]*a[0]+t.mirror[1]*a[1]:s;return{dir:a,at:c,flat:s-c,reach:i,drop:o,k:t.past?-1:t.rigid?0:(o/e/i)**1.5,both:!!t.mirror}}var n=(e,t)=>e+t.k*(t.reach*Math.asin(Math.min(e/t.reach,1))-e);function r(e,t,r){let i=e*r.dir[0]+t*r.dir[1]-r.at,a=r.both&&i<0?-1:1,o=i*a-r.flat;if(o<=0||r.k<0)return[e,t];let s=0,c=r.reach;for(let e=0;e<16;e++){let e=(s+c)/2;n(e,r)<o?s=e:c=e}let l=(c-o)*a;return[e+r.dir[0]*l,t+r.dir[1]*l]}function i(e,t){if(t.k<0)return e;let n=[[e.x,e.y],[e.x+e.w,e.y],[e.x,e.y+e.h],[e.x+e.w,e.y+e.h]].map(([e,n])=>r(e,n,t)),i=Math.min(...n.map(e=>e[0]))-2,a=Math.min(...n.map(e=>e[1]))-2,o=Math.max(...n.map(e=>e[0]))+2,s=Math.max(...n.map(e=>e[1]))+2;return{x:i,y:a,w:o-i,h:s-a}}var a=new Set;function o(e){return a.add(e),()=>{a.delete(e)}}function s(e,t,n,r){if(!e||!a.size)return;let i=e.el.closest(`d-device, [data-alone]`)?.__d;if(!i)return;let o=r?.motion??e.def?.motion,s={kind:t,part:e,device:i,material:c(e)??i.material,speed:n,to:r?.to,motion:o};for(let e of a)try{e(s)}catch(e){console.error(e)}}function c(e){let t=e.commands??[];for(let e=t.length-1;e>=0;e--){let n=t[e];if(n.op===`surface`)return n.name}}function l(e,t,n,r,i={}){return{type:`rect`,cx:e+n/2,cy:t+r/2,hw:n/2,hh:r/2,radius:Math.max(Math.min(i.radius??0,n/2,r/2),0),rotate:i.rotate??0,ripple:[0,0]}}function u(e,t,n,r={}){return{type:`rect`,cx:e,cy:t,hw:n,hh:n,radius:n,rotate:0,ripple:r.scoop?[-r.scoop[0],r.scoop[1]]:r.ripple??[0,0]}}function d(e,t,n,r,i,a){let o=n+a/2;return{type:`arc`,cx:e,cy:t,hw:o,hh:o,rotate:0,r:n,width:a,mid:(r+i)/2,half:Math.abs(i-r)/2}}function f(e,t,n,r,i,a){return{type:`capsule`,ax:e,ay:t,bx:n,by:r,ra:i,rb:a}}function p(e,t,n,r,i={}){return{type:`holes`,cx:e+n/2,cy:t+r/2,hw:n/2,hh:r/2,radius:i.radius??4,pitch:i.pitch??8,hole:i.hole??2.4,square:i.square??!1}}var m=e=>({type:`mask`,box:e});function h(e,t,n,r,i,a={}){let[o,s,c,l]=a.viewBox??[0,0,100,100];return{type:`field`,cx:t+r/2,cy:n+i/2,hw:r/2,hh:i/2,rotate:a.rotate??0,spread:a.spread??16,key:`p|${e}|${o},${s},${c},${l}|${Math.round(r)}x${Math.round(i)}|${a.rule??``}`,draw(t,n,r){t.scale(n/c,r/l),t.translate(-o,-s),t.fill(new Path2D(e),a.rule)}}}function g(e,t,n,r,i,a){return{type:`field`,cx:t+r/2,cy:n+i/2,hw:r/2,hh:i/2,rotate:a.rotate??0,spread:a.spread??8,key:`t|${e}|${a.font}|${a.letterSpacing??``}|${a.wordSpacing??``}|${a.align??``}|${Math.round(r)}x${Math.round(i)}`,draw(t,n,r){t.font=a.font,t.letterSpacing=a.letterSpacing||`0px`,t.wordSpacing=a.wordSpacing||`0px`,t.textBaseline=`middle`,t.textAlign=a.align??`center`,t.fillText(e,a.align===`left`?0:a.align===`right`?n:n/2,r/2)}}}function _(e,t,n,r,i,a={}){return{type:`field`,cx:t+r/2,cy:n+i/2,hw:r/2,hh:i/2,rotate:0,spread:a.spread??4,key:`i|${e.currentSrc||e.src}|${Math.round(r)}x${Math.round(i)}`,draw(t,n,r){let i=new OffscreenCanvas(Math.ceil(n),Math.ceil(r)),a=i.getContext(`2d`);a.drawImage(e,0,0,n,r),a.globalCompositeOperation=`source-in`,a.fillStyle=t.fillStyle,a.fillRect(0,0,n,r),t.drawImage(i,0,0)}}}function v(e,t,n,r,i,a={}){let[o,s,c,l]=i,u=(e,t,n)=>e?`A${e} ${e} 0 0 1 ${t} ${n}`:`L${t} ${n}`;return h(`M${o} 0H${n-s}${u(s,n,s)}V${r-c}${u(c,n-c,r)}H${l}${u(l,0,r-l)}V${o}${u(o,o,0)}Z`,e,t,n,r,{viewBox:[0,0,n,r],...a})}function y(e,t,n,r,i={}){return h(`M0 ${r}A${n} ${r} 0 1 1 ${2*n} ${r}A${n} ${r} 0 1 1 0 ${r}Z`,e-n,t-r,2*n,2*r,{viewBox:[0,0,2*n,2*r],spread:Math.max(n,r),...i})}var b=e=>+e.toFixed(3);function x(e){let t=e.length,n=``;for(let r=0;r<t;r++){let[i,a,o=0]=e[r],[s,c]=e[(r+t-1)%t],[l,u]=e[(r+1)%t],d=s-i,f=c-a,p=l-i,m=u-a,h=Math.hypot(d,f),g=Math.hypot(p,m),_=Math.acos(Math.max(-1,Math.min(1,(d*p+f*m)/(h*g))))/2,v=Math.min(o/Math.tan(_),h/2,g/2),y=v*Math.tan(_),x=`${b(i+d/h*v)} ${b(a+f/h*v)}`,S=`${b(i+p/g*v)} ${b(a+m/g*v)}`;n+=`${r?`L`:`M`}${x}`,y>0&&(n+=`A${b(y)} ${b(y)} 0 0 ${+(d*m-f*p<0)} ${S}`)}return`${n}Z`}function S(e){let t=e.length,n=n=>e[(n+t)%t],r=`M${b(n(0)[0])} ${b(n(0)[1])}`;for(let e=0;e<t;e++){let[t,i]=n(e-1),[a,o]=n(e),[s,c]=n(e+1),[l,u]=n(e+2);r+=`C${b(a+(s-t)/6)} ${b(o+(c-i)/6)} ${b(s-(l-a)/6)} ${b(c-(u-o)/6)} ${b(s)} ${b(c)}`}return`${r}Z`}function C(e,t={}){let n=e.map(e=>e[0]),r=e.map(e=>e[1]),i=Math.min(...n),a=Math.min(...r),o=Math.max(...n)-i,s=Math.max(...r)-a;return h(x(e),i,a,o,s,{viewBox:[i,a,o,s],...t})}function w(e,t){switch(e.type){case`rect`:return{...e,hw:Math.max(e.hw+t,0),hh:Math.max(e.hh+t,0),radius:Math.max(e.radius+t,0)};case`capsule`:return{...e,ra:e.ra+t,rb:e.rb+t};case`arc`:return{...e,hw:e.hw+t,hh:e.hh+t,width:e.width+t*2};case`field`:return{...e,grow:(e.grow??0)+t,spread:Math.max(e.spread,Math.abs((e.grow??0)+t)+8)}}}function T(e,t){return e.type===`field`?{...e,ring:t,spread:Math.max(e.spread,t+Math.abs(e.grow??0)+8)}:{...e,ring:t}}function E(e,t){if(t.grow||t.ring)throw Error(`Combine shapes first, then grow or ring the result.`);if(e.save(),t.type===`capsule`){let n=Math.atan2(t.by-t.ay,t.bx-t.ax);e.beginPath(),e.arc(t.ax,t.ay,t.ra,n+Math.PI/2,n-Math.PI/2),e.arc(t.bx,t.by,t.rb,n-Math.PI/2,n+Math.PI/2),e.fill()}else if(e.translate(t.cx,t.cy),e.rotate(t.rotate),t.type===`rect`)e.beginPath(),e.roundRect(-t.hw,-t.hh,t.hw*2,t.hh*2,t.radius),e.fill();else if(t.type===`arc`)e.strokeStyle=e.fillStyle,e.lineWidth=t.width,e.lineCap=`round`,e.beginPath(),e.arc(0,0,t.r,t.mid-t.half-Math.PI/2,t.mid+t.half-Math.PI/2),e.stroke();else{let{hw:n,hh:r}=t.source??t;e.scale(t.hw/n,t.hh/r),e.translate(-n,-r),t.draw(e,n*2,r*2)}e.restore()}var D=e=>L(e.type===`field`?{...e,spread:0}:e,0),O=(e,t,n)=>{let{type:r,draw:i,cx:a,cy:o,ax:s,ay:c,bx:l,by:u,...d}=e,f=(e,t)=>(e-t).toFixed(2);return`${e.type===`capsule`?[f(s,t),f(c,n),f(l,t),f(u,n)]:[f(a,t),f(o,n)]}${JSON.stringify(d)}`};function k(e,t,n,r){let{x:i,y:a,w:o,h:s}=t;return{type:`field`,cx:i+o/2,cy:a+s/2,hw:o/2,hh:s/2,rotate:0,spread:16,key:`${e}|${Math.round(o)}x${Math.round(s)}|${n.map(e=>O(e,i,a)).join(`|`)}`,draw(e){e.translate(-i,-a),r(e)}}}function A(e){let t=e.map(D),n=Math.min(...t.map(e=>e.x)),r=Math.min(...t.map(e=>e.y));return{x:n,y:r,w:Math.max(...t.map(e=>e.x+e.w))-n,h:Math.max(...t.map(e=>e.y+e.h))-r}}function j(...e){return k(`union`,A(e),e,t=>e.forEach(e=>E(t,e)))}function M(e,t){let n=document.createElement(`canvas`);n.width=e.canvas.width,n.height=e.canvas.height;let r=n.getContext(`2d`);r.setTransform(e.getTransform()),r.fillStyle=e.fillStyle,t(r),e.save(),e.setTransform(1,0,0,1,0,0),e.drawImage(n,0,0),e.restore()}function N(e,...t){return k(`minus`,D(e),[e,...t],n=>M(n,n=>{E(n,e),n.globalCompositeOperation=`destination-out`,t.forEach(e=>E(n,e))}))}function P(e,t){return k(`intersect`,D(e),[e,t],n=>M(n,n=>{E(n,e),n.globalCompositeOperation=`destination-in`,E(n,t)}))}function F(e,t,n=8){let{cx:r,cy:i,hw:a,hh:o}=e;return{...e,key:`within|${n}|${e.key}|${O(t,r-a,i-o)}`,within:{steep:n,draw:e=>{e.translate(a-r,o-i),E(e,t)}}}}function I(e,t){let{hw:n,hh:r}=e.source??e;return{...e,hh:r*t,source:{hw:n,hh:r}}}function L(e,t=2){if(t+=e.ring??0,e.type===`mask`)return{x:e.box.x-t,y:e.box.y-t,w:e.box.w+t*2,h:e.box.h+t*2};if(e.type===`capsule`){let n=Math.max(e.ra,e.rb)+t;return{x:Math.min(e.ax,e.bx)-n,y:Math.min(e.ay,e.by)-n,w:Math.abs(e.ax-e.bx)+n*2,h:Math.abs(e.ay-e.by)+n*2}}let n=e.type===`field`?e.spread:0,r=e.hw+n,i=e.hh+n,a=e.type===`holes`?0:e.rotate,o=Math.abs(Math.cos(a)),s=Math.abs(Math.sin(a)),c=o*r+s*i+t,l=s*r+o*i+t;return{x:e.cx-c,y:e.cy-l,w:c*2,h:l*2}}var R=e=>e.op===`surface`?e.reach:e.zTop,z=e=>`zTop`in e?R(e):0,B=e=>{let t=L(e.shape,e.op===`glow`?e.width+2:3);return e.bend?i(t,e.bend):t};function V(e,t){if(!e||!t)return e??t??null;let n=Math.min(e.x,t.x),r=Math.min(e.y,t.y);return{x:n,y:r,w:Math.max(e.x+e.w,t.x+t.w)-n,h:Math.max(e.y+e.h,t.y+t.h)-r}}var H=(e,t)=>({wave:e,height:t}),U=(e,t,n)=>({shape:e,size:t,depth:n}),W=(e,t,n)=>({ra:e,spacing:t,...n&&{dir:n}}),ee={"polished-mould":{broad:H(60,.005),pattern:`none`,fine:W(5e-5,.03)},"stoned-mould":{broad:H(60,.005),pattern:U(`lines`,.06,.002),fine:W(3e-4,.024,.15)},"bead-mould":{broad:H(60,.005),pattern:U(`stipple`,.12,.006),fine:W(.0012,.055)},"moulded-stipple":{broad:H(100,.01),pattern:U(`stipple`,.2,.025),fine:W(.003,.21)},"moulded-dots":{broad:H(100,.01),pattern:U(`dots`,.85,.12),fine:W(.003,.21)},"sintered-powder":{broad:H(50,.02),pattern:U(`stipple`,.15,.05),fine:W(.012,.6)},"layer-printed":{broad:H(5,.03),pattern:U(`ribs`,.3,.05),fine:W(.008,.3,.4)},"trowelled-plaster":{broad:H(140,.05),pattern:U(`stipple`,.5,.012),fine:W(.004,.12)},"soft-touch-lacquer":{broad:H(60,.005),pattern:U(`stipple`,.05,.003),fine:W(.001,.02)},"matte-paint":{broad:H(10,.005),pattern:U(`stipple`,.12,.002),fine:W(75e-5,.03)},"flowed-film":{broad:H(3,.005),pattern:`none`,fine:W(1e-4,.02)},"powder-coat":{broad:H(6,.01),pattern:U(`stipple`,1,.05),fine:W(.001,.04)},"textured-paint":{broad:H(20,.02),pattern:U(`pebble`,1.6,.04),fine:W(.0012,.05)},"metallic-paint":{broad:H(10,.005),pattern:U(`stipple`,.16,.006),fine:W(5e-4,.03)},"clear-lacquer":{broad:H(3,.001),pattern:`none`,fine:W(4e-5,.02),coat:1},"brushed-enamel":{broad:H(20,.005),pattern:U(`lines`,1.6,.006),fine:W(4e-5,.02),coat:1},"bead-blast":{broad:H(50,.003),pattern:U(`stipple`,.08,.004),fine:W(8e-4,.05)},"bead-blast-coarse":{broad:H(50,.003),pattern:U(`stipple`,.22,.007),fine:W(8e-4,.05)},"brushed-metal":{broad:H(100,.005),pattern:U(`lines`,.15,.004),fine:W(6e-4,.04,.72)},"brushed-metal-coarse":{broad:H(100,.005),pattern:U(`lines`,.3,.008),fine:W(.0012,.06,.72)},"brushed-metal-fine":{broad:H(100,.005),pattern:U(`lines`,.04,.0011),fine:W(2e-4,.02,.72)},"satin-metal":{broad:H(100,.005),pattern:U(`stipple`,.06,.002),fine:W(5e-4,.03)},"buffed-metal":{broad:H(10,.003),pattern:U(`stipple`,.03,2e-4),fine:W(15e-5,.04)},"polished-metal":{broad:H(10,.003),pattern:`none`,fine:`none`},"sand-cast":{broad:H(50,.2),pattern:U(`stipple`,.25,.07),fine:W(.011,.5)},"hot-foil":{broad:H(30,.005),pattern:U(`stipple`,.4,.006),fine:W(2e-4,.03)},"embossed-foil":{broad:H(30,.005),pattern:U(`foil`,2.25,.08),fine:W(2e-4,.05)},knurled:{broad:H(100,.005),pattern:U(`knurl`,1,.18),fine:W(6e-4,.04)},"roll-formed":{broad:H(100,.05),pattern:U(`ribs`,1.75,.18),fine:W(6e-4,.04)},perforated:{broad:H(100,.01),pattern:U(`hex`,1.5,.5),fine:W(6e-4,.04)},"moulded-rubber":{broad:H(50,.01),pattern:U(`stipple`,.4,.01),fine:W(.004,.093)},glazed:{broad:H(15,.02),pattern:U(`pits`,9,.02),fine:W(16e-6,.012),coat:1},unglazed:{broad:H(20,.05),pattern:U(`stipple`,.5,.05),fine:W(.004,.08)},"float-glass":{broad:H(60,3e-4),pattern:`none`,fine:`none`},"reeded-glass":{broad:H(60,3e-4),pattern:U(`ribs`,1.7,.2),fine:W(2e-4,.02)},"etched-glass":{broad:H(60,3e-4),pattern:U(`stipple`,.02,5e-4),fine:W(2e-4,.02)},"knitted-cloth":{broad:H(30,.3),pattern:U(`knit`,.7,.2),fine:W(.02,.25)},"woven-fibre":{broad:H(20,.003),pattern:U(`twill`,2,.01),fine:W(1e-4,.01),coat:.9},"pressed-felt":{broad:H(10,.2),pattern:U(`stipple`,.05,.02),fine:W(.02,.25)},"electrostatic-flock":{broad:H(30,.002),pattern:U(`stipple`,.05,.01),fine:W(.05,.05)},"book-cloth":{broad:H(40,.02),pattern:U(`twill`,.45,.03),fine:W(.012,.2)},"oiled-wood":{broad:H(4,.02),pattern:U(`wood`,.8,.035),fine:W(.005,.2,.3),coat:.2},"lacquered-wood":{broad:H(4,.01),pattern:U(`wood`,.8,.012),fine:W(1e-4,.011),coat:.6},"tanned-leather":{broad:H(30,.1),pattern:U(`pebble`,1.1,.12),fine:W(.006,.24)},"smooth-calf":{broad:H(30,.08),pattern:U(`pebble`,.5,.05),fine:W(.004,.2)},"pressed-vulcanite":{broad:H(30,.04),pattern:U(`pebble`,1.25,.2),fine:W(.0016,.1)},"sanded-cork":{broad:H(20,.1),pattern:U(`pebble`,1.1,.07),fine:W(.02,.3)},"polished-stone":{broad:H(50,.005),pattern:U(`stone`,30,5e-4),fine:W(8e-5,.04),coat:.9},"honed-stone":{broad:H(50,.01),pattern:U(`stipple`,3,.006),fine:W(6e-4,.024)},"ground-terrazzo":{broad:H(50,.005),pattern:U(`terrazzo`,1.5,5e-4),fine:W(2e-4,.03),coat:.5},"cast-concrete":{broad:H(150,.5),pattern:U(`pits`,12,.6),fine:W(.012,.16)},"cleft-stone":{broad:H(30,.3),pattern:U(`lines`,1,.03),fine:W(.006,.16)},"wire-cut-brick":{broad:H(90,.6),pattern:U(`lines`,2.5,.35),fine:W(.02,.3)},"struck-mortar":{broad:H(25,.3),pattern:U(`stipple`,1.2,.25),fine:W(.03,.4)},"uncoated-paper":{broad:H(5,.02),pattern:U(`stipple`,.06,.006),fine:W(.0045,.08,.1)},still:{broad:`none`,pattern:`none`,fine:`none`}},G=4,te={lines:{across:1},ribs:{across:1,depth:.18},dots:{slope:.8,depth:.12},pits:{slope:.1,feature:.2,depth:.05},pebble:{slope:.6,depth:.07},leather:{slope:.6,depth:.07},wood:{slope:.3,depth:.035,stretch:6},stone:{slope:0,depth:5e-4},terrazzo:{slope:0,depth:5e-4},twill:{depth:.012},knit:{depth:.2,stretch:1.7},knurl:{depth:.18},hex:{slope:0,depth:.5},foil:{slope:0,depth:.08},hazard:{slope:0,depth:0}},ne=new Set([`stipple`,`lines`]),re=Math.SQRT2*2*Math.PI*1.11,ie=.05,ae=e=>e===`none`?ie:Math.sqrt(Math.min(re*e.ra/e.spacing,1)),oe=(e,t)=>t>0?Math.exp(-((1.5*t**.75/e)**4)):1,se=4,ce=.01,le=(e,t)=>Math.max(t,Math.min(t*se,ce*e/Math.PI)),ue=e=>2/(e*G);function de(e,t){let n={wave:0,peel:0,grain:[0,1,1],pattern:null,relief:0,scale:G,feature:0,slope:0,across:0},r=t.peel===void 0?e?.broad??`none`:t.peel>0?H(2.3,t.peel/2):`none`;r!==`none`&&(n.wave=ue(r.wave),n.peel=le(r.wave,r.height)*oe(r.wave,t.coat));let i=t.pattern??(e?.pattern===`none`?void 0:e?.pattern.shape),a=e&&e.pattern!==`none`&&e.pattern.shape===i?e.pattern:void 0;if(i){let e=te[i]??{},r=t.size??a?.size??1,o=(a?.depth??e.depth??.01)*oe(r,t.coat),s=(e.slope??1.5)*o/r;if(n.feature=r*G*(e.feature??1),n.slope=s,n.across=e.across??0,ne.has(i)){let e=ue(r);n.grain=[o*1.4,i===`lines`?e*.04:e,e]}else n.pattern=i,n.relief=o,n.scale=r*G}if(t.grain){n.grain=t.grain,n.relief=0,n.across=0;let[e,r,i]=t.grain,a=Math.max(r,i);n.slope=e>0?2.1*e*a:0,e>0&&(n.feature=2/a)}return n}function fe(e){let t=parseInt(e.slice(1),16),n=e=>(e/=255,e<=.04045?e/12.92:((e+.055)/1.055)**2.4);return[n(t>>16&255),n(t>>8&255),n(t&255)]}var pe=new Set;function me(e,t=`warn`){pe.has(e)||(pe.add(e),console[t](`[diegetic-ui] ${e}`))}function he(e){let t=e.cloneNode(!1).outerHTML,n=t.slice(0,t.lastIndexOf(`</`));return n.length>120?`${n.slice(0,120)}…`:n}var ge={color:`#808080`,sub:`#8f9194`,rough:.5,metal:0,coat:0,aniso:0,tangent:0,mottle:0,fleck:0,wear:0,emit:[0,0,0],legend:`#e9e6dc`,patinaRough:.72,age:0,touch:0,film:0,filmVary:0,leak:0,dents:0,fade:0,rings:3.5,pores:.6},_e={metal:{finish:`satin-metal`,metal:1,marks:1,wears:`chip`,broad:.4},paint:{finish:`matte-paint`,marks:1,wears:`chip`,broad:.6,coatRough:.12},plastic:{finish:`bead-mould`,scatter:.3,marks:1,wears:`polish`,broad:.7,ior:1.49},rubber:{finish:`moulded-rubber`,sheen:.55,scatter:.45,marks:.4,wears:`polish`,broad:.6},ceramic:{finish:`glazed`,scatter:.15,marks:1,wears:`chip`,broad:.4},glass:{finish:`float-glass`,marks:1,wears:`none`,broad:.15,ior:1.52},stone:{finish:`honed-stone`,scatter:.1,marks:.6,wears:`polish`,broad:.5},wood:{finish:`oiled-wood`,scatter:.1,marks:.5,wears:`polish`,broad:.4,coatRough:.28},leather:{finish:`tanned-leather`,sheen:.15,scatter:.15,marks:.3,wears:`polish`,broad:.6},cloth:{finish:`knitted-cloth`,sheen:.8,scatter:.3,marks:0,wears:`none`,broad:.5},paper:{finish:`uncoated-paper`,sheen:.1,scatter:.3,marks:.2,wears:`none`,broad:.5},liquid:{finish:`still`,marks:0,wears:`none`,broad:0}};function ve(e,t){let n=t?.finish??e?.finish??(e?.substance&&_e[e.substance].finish),r=n?ee[n]:void 0;if(!r)return{finish:r,set:{}};let i=r.fine===`none`?0:r.fine.dir??0;return{finish:r,set:{rough:ae(r.fine),aniso:i,coat:r.coat??0}}}var ye=new Map([[`plain`,{substance:`paint`}]]);function be(e,t){ye.set(e,t)}function xe(e){for(let[t,n]of Object.entries(e))be(t,n)}var Se=`light`,Ce=!1;function we(e){let t=Ce;return Se=e,Ce=!1,t}function Te(e){if(!e.startsWith(`light-dark(`))return e;Ce=!0;let[t=``,n=t]=e.slice(11,-1).split(`,`).map(e=>e.trim());return Se===`dark`?n:t}function Ee(e){let t=ye.get(Te(e)),{finish:n,set:r}=ve(t),{substance:i}=t??{},a=n&&n.pattern!==`none`?n.pattern.shape:void 0;return{...ge,...i&&_e[i],...r,...a&&{pattern:a},...t}}var De=e=>typeof e==`string`?fe(e):e;function Oe(e,t){let n=Te(e);ye.has(n)||me(`unknown material "${n}"`);let r=ye.get(n),{finish:i,set:a}=ve(r,t),o={coatRough:.09,sheen:0,scatter:0,marks:0,wears:`none`,broad:0,...ge,...r?.substance&&_e[r.substance],...a,...r,...t},s=de(i,{...o,size:t?.size??r?.size}),c=o.metal>.5||o.sub===ge.sub,l=o.under?.[0]??{color:o.sub,rough:c?.44:Math.max(o.rough,.5),metal:+!!c},u=o.under?.[1]??l,d=o.wears!==`none`;return{coatRough:o.coatRough,sheen:o.sheen??0,scatter:o.grating??o.scatter??0,marks:o.marks??0,polish:+(o.wears===`polish`),broad:o.broad??0,color:De(o.color),sub:De(l.color),rough:o.rough,metal:o.metal,coat:o.coat,subRough:l.rough??.44,subMetal:l.metal??1,bare:De(u.color),bareRough:u.rough??.44,bareMetal:u.metal??1,coatTint:o.coatTint?De(o.coatTint):[1,1,1],dents:d?o.dents:0,fade:o.fade,rings:o.rings,pores:o.pores,filmVary:o.filmVary,leak:o.leak,aniso:o.aniso,tangent:o.tangent,mottle:o.mottle,...s,fleck:o.fleck,wear:d?o.wear:0,emit:o.emit,patina:o.patina?De(o.patina):null,patinaRough:o.patinaRough,age:o.age,touch:o.touch,color2:De(o.color2??o.color),film:o.film}}function ke(e){return fe(Ee(e).legend??ge.legend)}var Ae=[],je=0,Me=new Map,Ne=new Map,Pe=/^([a-z][\w-]*)?((?:\[[^\]]+\])*)$/i,Fe=e=>{let[,t,n]=Pe.exec(e.trim())??[];if(t)return t.toLowerCase();let r=n&&/^\[\s*([^\s~|^$*=\]]+)/.exec(n);return r?`[${r[1].toLowerCase()}`:``},Ie=new Set([`d-device`]),Le=new Set([`d-layer`,`d-reach`]),Re=new Map,ze=new Set,Be=new Map,Ve=/^d-/;function He(e){for(let[,t,n]of e.matchAll(/\[(d-[\w-]+)|(?<![\w.#[-])(d-[\w-]+)/g))t?Le.add(t):Ie.add(n);for(let[,t,n]of e.matchAll(/\[(d-[\w-]+)~?="([\w-]*)"/g))Re.has(t)||Re.set(t,new Set),Re.get(t).add(n);for(let[,t]of e.matchAll(/\[(d-[\w-]+)\]/g))ze.add(t)}function Ue({selector:e,options:t}){let n=/\[(d-[\w-]+)~="([\w-]+)"/.exec(e);if(!n||!t)return;let r=`${n[1]} ${n[2]}`;Be.set(r,new Set([...Be.get(r)??[],...t]))}function We(...e){e.forEach(He)}function Ge(e){return e.getAttributeNames().filter(e=>Ve.test(e)).flatMap(t=>{let[n,...r]=e.getAttribute(t).trim().split(/\s+/),i=Be.get(`${t} ${n}`);return i?r.filter(e=>!i.has(e)).map(e=>`[${t}="${n} ${e}"]`):[]})}function Ke(e){let t=Ve.test(e.localName)&&!Ie.has(e.localName)?[`<${e.localName}>`]:[];for(let n of e.getAttributeNames()){if(!Ve.test(n))continue;if(!Le.has(n)){t.push(`[${n}]`);continue}let r=e.getAttribute(n).trim(),i=Re.get(n);i&&!ze.has(n)&&!i.has(r.split(/\s+/)[0])&&t.push(`[${n}="${r}"]`)}return t}function qe(e){for(let t of Ke(e))me(`${t} matches no part, so it draws nothing. Is its pack imported? ${he(e)}`);for(let t of Ge(e))me(`${t} isn't an option of that form, so it's ignored. ${he(e)}`)}function Je(e){Ae.unshift(e);let t=Fe(e.selector);Me.set(t,[e,...Me.get(t)??[]]),Ne.set(e,Ae.length),He(e.selector),Ue(e),je++,e.motion&&at(`:where(.d-gl :is(${e.selector})) { pointer-events: auto; }`);for(let e of Ye)e()}var Ye=[];function Xe(e){Ye.push(e),e()}var Ze=()=>je;function Qe(e){let t,n=-1,r=r=>{let i=r?.find(t=>e.matches(t.selector));i&&Ne.get(i)>n&&([t,n]=[i,Ne.get(i)])};r(Me.get(e.localName));for(let t of e.getAttributeNames())r(Me.get(`[${t}`));return r(Me.get(``)),t}var $e=null,et=()=>{if($e?.version!==je){let e=[...Me].flatMap(([e,t])=>e===``?t.map(e=>e.selector):[e.startsWith(`[`)?`${e}]`:e]);$e={version:je,every:Ae.map(e=>e.selector).join(`,`),names:e.join(`,`)}}return $e},tt=()=>et().every,nt=()=>et().names,rt=[],it=null;function at(e){rt.push(e),it?.(e)}function ot(e){rt.forEach(e),it=e}var st=`#version 300 es
precision highp float;
uniform vec2 uCanvas;
uniform vec4 uBox;
out vec2 vPx;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  vPx=mix(uBox.xy,uBox.zw,c);
  gl_Position=vec4(vPx/uCanvas*2.-1.,0.,1.);
}`,ct={rect:0,capsule:1,field:2,holes:3,mask:4,arc:5},lt={surface:0,cut:1,ink:2,glow:3,screen:4,glass:5,frost:6},ut={crt:0,led:1,lcd:2,oled:3,eink:4,coat:5},dt={twill:1,knit:2,wood:3,stone:4,terrazzo:5,leather:6,pebble:6,hex:7,knurl:8,hazard:9,ribs:10,foil:11,dots:12,pits:13,stipple:0,lines:0},ft={flat:0,round:1,chamfer:2,dome:3,blend:4},pt=`layout(std140) uniform Command{
  vec4 uBox,uCap,uSeen,uFrom,uReach;
  // Where the maps are on the canvas, which reach only as far as what's drawn: see the light pass.
  vec4 uMap;
  int uEdge;
  vec2 uCanvas,uCenter,uHalf,uSeed,uRipple,uSpread,uCapR,uSubRM,uBareRM,uCrown,uBendDir,uBendAt,uInset;
  vec3 uColor,uColor2,uSub,uBare,uCoatTint,uPatina,uEmit,uGrain,uInk,uHoles;
  int uShape,uMode,uProfile,uRadial,uKind,uPattern,uBendBoth,uFollow;
  float uRadius,uRot,uBevel,uZEdge,uZTop,uDish,uMid;
  float uRough,uMetal,uCoat,uAniso,uTangent,uPeel,uWave,uRelief,uFeature,uSlope,uAcross,uMottle,uFleck,uWear,uDepth,uSoftLod,uWidth,uFeather;
  float uAge,uPatinaOn,uPatinaRough,uTouch,uDents,uFade,uRings,uPores,uFilmVary,uLeak;
  float uGain,uScale,uFilm,uBlur,uZoom,uOpacity,uTransmit,uBendReach,uBendDrop,uBendK,uGrow,uRing;
  float uSheen,uScatter,uMarks,uPolish,uBroad,uCoatRough;
  // What a mark lies on, which it stops at: its middle and half size, its corners, its turn and how far its field reaches.
  vec4 uClip;
  vec2 uClipSpread;
  float uClipRadius,uClipRot;
  int uClipShape;
};`,mt=`#version 300 es
precision highp float;
precision highp int;
${pt}
out vec2 vPx;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  vPx=mix(uBox.xy,uBox.zw,c);
  gl_Position=vec4(vPx/uCanvas*2.-1.,0.,1.);
}`,ht=`#version 300 es
precision highp float;
precision highp int;
in vec2 vPx;
layout(location=0) out vec4 oA;
layout(location=1) out vec4 oH;
layout(location=2) out vec4 oS;
layout(location=3) out vec4 oE;
layout(location=4) out vec4 oM;
#ifdef RELIEF
layout(location=5) out vec4 oD;
#else
vec4 oD;
#endif
#ifdef SPLIT
layout(location=5) out vec4 oN;
#else
vec4 oN;
#endif
vec4 grain(vec2 t,float c){return vec4(.5+.25*t,0.,c);}
layout(location=6) out vec4 oU;

${pt}
uniform sampler2D uScreen;
uniform sampler2D uMask,uField,uBackA,uBackE,uBackS,uBackH,uOwn,uRows,uClipField;
#ifdef SPLIT
uniform sampler2D uBackN;
// The heights under a bridge and how much they cover, which with SPLIT are in two maps.
#define UNDER(uv,lod) vec2(textureLod(uBackH,uv,lod).r,textureLod(uBackN,uv,lod).a)
#else
#define UNDER(uv,lod) textureLod(uBackH,uv,lod).ra
#endif
#define AT(uv) ((uv)*uMap.xy+uMap.zw)

const float MM=.25,PI=3.14159265;

mat2 rm(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
// Short factors repeat every 50 cells, which shows as bars in any fine noise.
float hash(vec2 p){p=fract(p*vec2(123.3417,456.2113));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vnoise(vec2 p){
  vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}
// Scratches across a line, from the spacing up, each band three times wider and fainter. A scratch is a row of its
// own, about 40 spacings long whatever its width, and fades out where it likes, so no two end together. Only those a
// texel can tell apart. Comes to about one standard deviation.
float lined(float across,vec2 along,float pitch,float texel){
  float s=0.,e=0.,f=pitch,l=pitch*40.,amp=1.;
  for(int i=0;i<3;i++){
    float row=2.*across/f+.8*vnoise(along/(f*160.)),r=floor(row),k=fract(row),b=float(i)*9.;
    float a=vnoise(along/l+vec2(hash(vec2(r,b))*91.,r+b)),c=vnoise(along/l+vec2(hash(vec2(r+1.,b))*91.,r+1.+b));
    s+=amp*smoothstep(.7,1.6,.5*f/texel)*(mix(a,c,k*k*(3.-2.*k))-.5);
    e+=amp*amp;
    f*=3.;l*=1.5;amp*=.42;
  }
  return s*1.6/sqrt(e);
}
float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*vnoise(p);p=mat2(1.62,1.19,-1.19,1.62)*p+17.1;a*=.5;}return s/.9375;}
float sdRR(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
// How far in from the edge of a rounded box, measured along contours that stay round. Plain
// distance has sharp corners inside, and a bevel built on it creases along the diagonal.
float bevelIn(vec2 p,vec2 b,float r){
  vec2 u=abs(p)-b+r;
  float t=r-max(u.x,u.y),gap=u.x-u.y,disc=2.*r*r-gap*gap;
  if(disc>0.){
    float c=(sqrt(disc)-u.x-u.y)*.5;
    if(min(u.x,u.y)+c>=0.) t=c;
  }
  return t;
}
float scratch(vec2 w,float ang,float seed,float amount){
  vec2 q=(rm(ang)*w)*vec2(.028,.55);
  float row=floor(q.y);
  float on=step(.988-amount*.05,hash(vec2(row,seed)));
  float seg=smoothstep(.56,.68,vnoise(vec2(q.x+row*3.1,row+seed)));
  float line=1.-abs(fract(q.y)-.5)*2.;
  return on*seg*smoothstep(.45,.95,line);
}

// Distance to the nearest cell point, the second nearest, and a number for the cell.
vec3 cells(vec2 g){
  vec2 i=floor(g);float a=9.,b=9.,id=0.;
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
    vec2 c=i+vec2(x,y);
    float e=length(g-c-vec2(hash(c),hash(c+7.3)));
    if(e<a){b=a;a=e;id=hash(c+3.1);}else if(e<b)b=e;
  }
  return vec3(a,b,id);
}

// Plates of a hide, each with a weight of its own, so they come in different sizes. Distance to the plate's border, and a number for it.
// The distance blends all the borders, so a plate is a dome and not a roof with a ridge along it.
vec2 hide(vec2 g){
  vec2 i=floor(g),m=vec2(0.);float a=99.,r0=0.,id=0.;
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
    vec2 c=i+vec2(x,y),o=c+vec2(hash(c),hash(c+7.3));
    float r=.22*hash(c+11.1),e=dot(g-o,g-o)-r;
    if(e<a){a=e;m=o;r0=r;id=hash(c+3.1);}
  }
  float w=0.,base=dot(g-m,g-m)-r0;
  for(int y=-2;y<=2;y++)for(int x=-2;x<=2;x++){
    vec2 c=i+vec2(x,y),o=c+vec2(hash(c),hash(c+7.3)),n=o-m;float l=dot(n,n);
    if(l<.0001) continue;
    w+=exp(-9.*((dot(g-o,g-o)-.22*hash(c+11.1))-base)/(2.*sqrt(l)));
  }
  return vec2(max(-log(max(w,1e-6))/9.,0.),id);
}

// Capsule keeps its own height profile, so it reports one through these.
float capT=0.,capLift=0.;

// Where this pixel falls on the flat sheet, how far the sheet has dropped there, and how much of the
// pixel is on this side of the point where the sheet goes out of sight.
vec2 P,gArc=vec2(0.);
float fall=0.,side=1.;

// A bend rolls the sheet over a curve seen from above. Each pixel looks up the point of the sheet
// that lands on it, so whatever is painted there closes up as it turns away.
void bend(){
  float t=dot(vPx,uBendDir)-uBendAt.x,aa=max(fwidth(t),.0001),along=uBendBoth==1?sign(t):1.;
  float y=t*along-uBendAt.y;
  if(y<=0.) return;
  if(uBendK>=0.){
    side=clamp((uBendReach-y)/aa+.5,0.,1.);
    if(side<=0.) discard;
  }
  float r=min(y/uBendReach,1.);
  P+=uBendDir*along*max(uBendK,0.)*(uBendReach*asin(r)-y);
  // A rigid body keeps its outline where it was measured, but its grain still runs round the curve, so that closes up as it turns away too.
  float k=abs(uBendDrop)*4./uBendReach;
  gArc=uBendDir*along*max(k*sqrt(k)-max(uBendK,0.),0.)*(uBendReach*asin(r)-y);
  fall=uBendDrop*(1.-sqrt(1.-r*r));
}

float cover(float d){return clamp(.5-d/max(fwidth(d),.0001),0.,1.)*side;}

float solid(vec2 p){
  if(uShape==0){
    float d=sdRR(p,uHalf,uRadius);
    // Waves round the edge, or scoops: round cuts with a flat land left between each and the next.
    float a=atan(p.y,p.x)*abs(uRipple.x);
    if(uRipple.x>0.) d+=uRipple.y*(.5+.5*sin(a));
    else if(uRipple.x<0.){float x=(fract(a/6.2832)-.5)/.42;d+=uRipple.y*sqrt(max(1.-x*x,0.));}
    return d;
  }
  if(uShape==1){
    vec2 a=uCap.xy,b=uCap.zw-a,q=P-a;
    float bb=max(dot(b,b),.0001);
    capT=clamp(dot(q,b)/bb,0.,1.);
    float rad=mix(uCapR.x,uCapR.y,capT*capT),dd=length(q-b*capT);
    capLift=sqrt(max(rad*rad-dd*dd,0.))*MM;
    return dd-rad;
  }
  if(uShape==2){
    vec2 t=p/(2.*(uHalf+uSpread))+.5;
    if(uEdge==0) return texture(uField,t).r;
    // A drawn outline's edge is only as good as its texels, so from row to row it wanders by half of one. Face-on that's under a
    // pixel; edge-on each row's wander is a step in depth, so the field is blurred over a texel first.
    vec2 k=.75/vec2(textureSize(uField,0));
    return .25*(texture(uField,t+k).r+texture(uField,t-k).r+texture(uField,t+vec2(k.x,-k.y)).r+texture(uField,t+vec2(-k.x,k.y)).r);
  }
  if(uShape==3){
    vec2 s=vec2(uHoles.x,uHoles.x*(uHoles.z>.5?1.:1.732));
    vec2 a=mod(p,s)-s*.5,b=mod(p+s*.5,s)-s*.5;
    vec2 c=uHoles.z>.5||dot(a,a)>=dot(b,b)?b:a;
    if(sdRR(p-c,uHalf,uRadius)>-uHoles.y) discard;
    return length(c)-uHoles.y;
  }
  if(uShape==5){
    float a=mod(atan(p.x,-p.y)-uCap.x+PI,2.*PI)-PI,l=length(p),b=abs(a)-uCap.y;
    if(b<=0.) return abs(l-uCap.z)-uCap.w;
    return length(l*vec2(cos(b),sin(b))-vec2(uCap.z,0.))-uCap.w;
  }
  return -1.;
}

// How much of a mark lands on what holds it. A lamp's light or ink past that edge has nothing to be on.
float held(){
  if(uClipShape<0) return 1.;
  vec2 q=rm(uClipRot)*(P-uClip.xy);
  float d=uClipShape==2?texture(uClipField,q/(2.*(uClip.zw+uClipSpread))+.5).r:sdRR(q,uClip.zw,uClipRadius);
  return clamp(.5-d/max(fwidth(d),.0001),0.,1.);
}
float dist(vec2 p){
  float d=solid(p)-uGrow;
  return uRing>0.?abs(d)-uRing*.5:d;
}

// How high a surface stands at a point, from its outline and profile, before anything is laid on it.
float top(vec2 p,float d){
  if(uShape==1&&uProfile==1) return mix(uZEdge,uZTop,capT)+capLift;
  float inner=-d;
  if(uShape==0&&uProfile!=3){
    float m=min(uHalf.x,uHalf.y);
    // Circles and pills are already round, all the way in.
    if(uRadius<m*.98) inner=bevelIn(p,uHalf,clamp(max(uRadius,uBevel*.8),.01,m*.9));
  }
  float e=clamp(inner/max(uBevel,.01),0.,1.);
  float pe=uProfile==0?1.:uProfile==1?sqrt(1.-(1.-e)*(1.-e)):uProfile==4?e*e*(3.-2.*e):e;
  if(uProfile==3){float n=clamp(length(p)/uHalf.x,0.,1.);pe=sqrt(1.-n*n);}
  vec2 q=clamp(p/uHalf,-1.,1.);
  float h=mix(uZEdge,uZTop-dot(uCrown,q*q),pe);
  if(uDish>0.){vec2 q=p/uHalf;h-=uDish*(1.-clamp(dot(q,q),0.,1.));}
  return h;
}

// A surface drawn on another face of the body is a solid there: its outline, standing from its ground to its top. Seen from this face,
// edge-on, a column of this plate is one height on that face, and looking down it runs along that face toward its middle. The first
// point of the outline that stands that high is what this face sees. Says how far that stands off this face's ground, mm, or nothing
// below \`stop\`, and leaves P on it.
float meet(float H,float y,float stop){
  float sn=uSeen.x,fx=uSeen.y,me=uFrom.z;
  float dir=sn>0.?1.:-1.,u=sn>0.?uReach.x:uReach.z,end=sn>0.?uReach.z:uReach.x;
  // Fine enough to find where a bevel reaches this height, in the outline's own px.
  float fine=max(min(uBevel,4.)/12.,.06),was=u;
  bool hit=false;
  for(int i=0;i<512;i++){
    if((end-u)*dir<0.||(fx-u*MM)*sn+me<=stop) break;
    P=vec2(u,y);
    vec2 p=rm(uRot)*(P-uCenter);
    float d=dist(p);
    if(d>0.){was=u;u+=dir*max(d,.25);continue;}
    float t=top(p,d);
    if(t>=H&&H>(uMid>0.?2.*uMid-t:-1e9)){hit=true;break;}
    was=u;u+=dir*fine;
  }
  if(!hit) return -1e9;
  // Halved down to where it starts, between the last step out and the first in.
  float a=was,b=u;
  for(int i=0;i<6;i++){
    float m=(a+b)*.5;P=vec2(m,y);vec2 p=rm(uRot)*(P-uCenter);float d=dist(p);
    if(d<=0.&&top(p,d)>=H) b=m; else a=m;
  }
  P=vec2(b,y);
  return (fx-b*MM)*sn+me;
}

// What this face sees of one of the others' parts. Its side wall is laid out by that face's height and its row, so what's on the
// wall doesn't smear along the line of sight.
vec2 wall;
float across(){
  vec2 q=vPx*MM-uFrom.xy;
  float H=q.x*uSeen.x+uSeen.w;
  if(H<uSeen.w) discard;
  float own=texelFetch(uOwn,ivec2(gl_FragCoord.xy),0).r,lo=own>.01?own+.35:0.,y=(q.y+uSeen.z)/MM;
  float z=meet(H,y,lo);
  if(z<=lo) discard;
  wall=vec2(H/MM,y);
  return z;
}

// A body is one solid, a stack of layers, each an outline standing from its ground to its top. A face beside them has no outline
// of its own: what it shows is each layer, side on. A column of it is one height in the layer, which its edge profile sets in
// from the outline by so much. How far the outline reaches toward this face, row by row, is worked out from the path itself
// (uRows, laid out by uCap: first row, step and count), and set in by rolling a ball of that size along it, so the corners come
// out round as well. Says how far that stands off this face's ground, as \`meet\` does.
float rowsAt(int i,int k){
  if(i<0||i>=int(uCap.z)) return k==0?-1e9:1e9;
  vec4 r=texelFetch(uRows,ivec2(i,0),0);
  return k==0?r.r:r.g;
}
float section(){
  vec2 q=vPx*MM-uFrom.xy;
  float H=q.x*uSeen.x+uSeen.w,y=(q.y+uSeen.z)/MM,D=uZTop-uZEdge;
  if(H<uZEdge||H>uZTop||D<=0.) discard;
  // The same profile the layer's own face shows, turned round: how far in its edge is at this height.
  float hf=(H-uZEdge)/D,a=0.,b=1.;
  if(uProfile==0) b=0.;
  else for(int i=0;i<14;i++){
    float e=(a+b)*.5,pe=uProfile==1||uProfile==3?sqrt(1.-(1.-e)*(1.-e)):uProfile==4?e*e*(3.-2.*e):e;
    if(pe<hf) a=e; else b=e;
  }
  float k=b*uBevel,sn=uSeen.x,f=(y-uCap.x)/uCap.y;
  // From the right the layer's right edge is nearest, so its reach is the least of what the ball allows; from the left, the most.
  int side=sn<0.?0:1;
  int i0=int(floor(f));
  float g=mix(rowsAt(i0,side),rowsAt(i0+1,side),fract(f))+(side==0?-k:k);
  if(k>0.){
    int n=int(ceil(k/uCap.y));
    for(int j=-n;j<=n;j++){
      int i=i0+j;float dy=float(i)*uCap.y+uCap.x-y,r=k*k-dy*dy;
      if(r<0.) continue;
      float e=rowsAt(i,side)+(side==0?-sqrt(r):sqrt(r));
      g=side==0?min(g,e):max(g,e);
    }
  }
  if(abs(g)>1e8) discard;
  float z=(uSeen.y-g*MM)*sn+uFrom.z;
  if(z<=0.) discard;
  return z;
}

void main(){
  oM=oD=oU=oN=vec4(0.);
  P=vPx;
  float seenAt=0.;
  if(uEdge==1) seenAt=across();
  else if(uEdge==4) seenAt=section();
  else if(uBendReach>0.) bend();
  vec2 p=rm(uRot)*(P-uCenter);
  // Everything in a surface is cut into the part, so it goes where the part goes.
  vec2 w=(uEdge==1?wall:p+rm(uRot)*gArc)+uSeed;
  vec2 uv=vPx/uCanvas,sheet=P/uCanvas;

  if(uMode==3){
    float c=cover(abs(dist(p))-uWidth);
    oE=vec4(uEmit*.25*c,c);oA=oH=oS=vec4(0.);
    return;
  }

  if(uMode==4){
    float d=dist(p),cov=cover(d);
    vec2 st=(p+uHalf)/(2.*uHalf);
    vec2 size=vec2(textureSize(uScreen,0));
    vec3 col=uColor,emit=uEmit;
    float metalLeft=0.;
    if(uKind==0){
      // A tube bulges, and its scanlines and phosphor stripes sit on the picture. A tube has no ink, so the command's ink says how
      // deep the stripes run, and a monochrome tube, with none, is the even phosphor they average to, then how far it bulges.
      vec2 o=st-.5;
      st=.5+o*(1.+dot(o,o)*uInk.y);
      // The raster may stop short of the glass, and black glass shows beyond it.
      st=(st-uInset)/(1.-2.*uInset);
      float edge=smoothstep(0.,.014,min(min(st.x,1.-st.x),min(st.y,1.-st.y)));
      // When the picture's rows get as fine as the display's pixels, scanlines and a one-pixel pattern would beat against them
      // in rings, so both average out over the pixel, as they do in the eye. On a screen uZoom is sheet pixels to a shown one.
      vec2 foot=fwidth(st)*uZoom;
      float scan=mix(.6+.4*cos((fract(st.y*size.y)-.5)*6.2832),.6,smoothstep(.3,.6,foot.y*size.y));
      vec3 mask=.78+uInk.x*(1.-smoothstep(1.2,2.2,uZoom))*cos(vPx.x*2.1+vec3(0.,2.1,4.2));
      vec3 pic=(texture(uScreen,st+foot*vec2(-.375,-.125)).rgb+texture(uScreen,st+foot*vec2(.125,-.375)).rgb+texture(uScreen,st+foot*vec2(.375,.125)).rgb+texture(uScreen,st+foot*vec2(-.125,.375)).rgb)*.25;
      emit+=pic*scan*mask*uGain*edge;
    }else if(uKind==3){
      // A colour panel's pixel is a cell of three stripes, red, green and blue, in a black matrix. Shown big, each pixel is a hard square
      // with an edge one shown pixel soft, and its stripes show. Once a stripe is down to a few shown pixels it averages to its colour, as in the eye.
      vec2 g=st*size,foot=fwidth(g)*uZoom,n=floor(g+.5);
      vec2 sharp=n+clamp((g-n)/max(foot,vec2(1e-4)),-.5,.5);
      vec3 c=texture(uScreen,mix(sharp,g,smoothstep(.6,1.,max(foot.x,foot.y)))/size).rgb;
      vec2 f=fract(g);
      float sx=fract(f.x*3.),wx=min(foot.x*1.5,.2),wy=min(foot.y*.5,.2),which=floor(f.x*3.);
      float lit=smoothstep(.1-wx,.1+wx,sx)*smoothstep(.9+wx,.9-wx,sx)*smoothstep(.05-wy,.05+wy,f.y)*smoothstep(.95+wy,.95-wy,f.y);
      vec3 mask=vec3(equal(vec3(which),vec3(0.,1.,2.)))*lit*(3./.72);
      emit+=c*mix(vec3(1.),mask,1.-smoothstep(.25,.5,foot.x*3.))*uGain;
    }else if(uKind==4){
      // Reflective, with a few levels of grey. A white canvas is bare paper.
      float y=dot(texture(uScreen,st).rgb,vec3(.2126,.7152,.0722));
      col=mix(uInk,col,floor(pow(y,.45)*7.+.5)/7.);
    }else if(uKind==5){
      // A coat on the back of a pane, with no light but the room's. White is all of it there, and black is none, showing what's behind.
      float left=pow(dot(texture(uScreen,st).rgb,vec3(.2126,.7152,.0722)),.45);
      col=mix(uInk,col,left);
      metalLeft=uMetal*left;
    }else{
      // The inset is the margin of a panel round its active pixels. Nothing there ever turns.
      vec2 g=(st-uInset)/(1.-2.*uInset)*size,f=fract(g)-.5;
      bool inside=all(greaterThanEqual(g,vec2(0.)))&&all(lessThan(g,size));
      vec3 c=inside?texelFetch(uScreen,ivec2(g),0).rgb:vec3(0.);
      if(uKind==1){
        float m=smoothstep(.47,.28,length(f));
        emit+=c*m*uGain;
        col=mix(col,col+c*.08,m);
      }else{
        // A pixel is a cell with a gap round it, until cells are so few of the sheet's pixels across that the gaps beat against them.
        vec2 foot=fwidth(g),w=max(foot*.5,vec2(.02)),e=smoothstep(.48+w,.48-w,abs(f));
        float m=inside?mix(e.x*e.y,.92,smoothstep(.2,.4,max(foot.x,foot.y))):0.;
        // Crystals block the backlight as well as the light from the room. A canvas is written in the eye's terms, so a grey there is that much of a turn, as on e-ink.
        float on=pow(clamp(dot(c,vec3(.3333)),0.,1.),.45)*m;
        // The reflector lies a glass thickness behind the crystals, so room light leaves each dark pixel a shadow on it.
        vec2 b=g-vec2(.2,.3);
        float dark=pow(clamp(dot(texelFetch(uScreen,ivec2(clamp(b,vec2(0.),size-1.)),0).rgb,vec3(.3333)),0.,1.),.45);
        col*=(1.-.24*dark*float(inside))*(1.-.03*m);
        col=mix(col,uInk,on);emit*=(1.-on)*(1.-.03*m);
      }
    }
    oA=vec4(col,cov);
    // Flat panels sit behind glass with nothing to scatter their light, so they mark themselves
    // to the light pass with a tangent longer than any real one. Tubes and LEDs do glow.
    oH=vec4(uZTop-fall,uKind>=2?2.:0.,0.,cov);
    oN=grain(oH.gb,cov);
    oD=vec4(0.,0.,0.,cov);
    oS=vec4(uRough,metalLeft*.5,uCoat,cov);
    oE=vec4(emit*.25,cov);
    oM=vec4(0.,0.,1.,cov);
    return;
  }

  if(uMode==5){
    // Glass adds to what is below, so the dial keeps its relief and only gains a shine.
    float d=dist(p),cov=cover(d);
    float e=clamp(-d/max(uBevel,.01),0.,1.);
    oH=vec4(uZTop*sqrt(1.-(1.-e)*(1.-e))*cov,0.,0.,0.);
    oS=vec4(0.,0.,uCoat*cov,cov);
    oA=oE=vec4(0.);
    return;
  }

  if(uMode==6){
    float d=dist(p),cov=cover(d);
    float e=clamp(-d/max(uBevel,.01),0.,1.);
    vec3 back=vec3(0.),light=vec3(0.);
    // A spiral of taps, because one level of the mip chain alone shows its blocks.
    float lod=uBlur>0.?max(log2(uBlur*.7),0.):0.;
    // A lens looks at less of what is under it, spread over the same pane.
    vec2 seen=(uCenter+(vPx-uCenter)/uZoom)/uCanvas;
    for(int i=0;i<12;i++){
      float t=float(i)*2.39996,r=sqrt((float(i)+.5)/12.)*uBlur;
      vec2 s=seen+vec2(cos(t),sin(t))*r/uCanvas;
      vec4 c=textureLod(uBackA,AT(s),lod);
      back+=c.rgb/max(c.a,.05);
      light+=textureLod(uBackE,AT(s),lod).rgb;
    }
    back/=12.;light/=12.;
    // Clear glass leaves what is under it as it was, metal included. The more a pane
    // scatters, the less of that survives, and bare metal has no colour to give back.
    vec4 under=textureLod(uBackS,AT(seen),lod);
    float ua=max(under.a,.05),scatter=clamp(uBlur/6.+uOpacity,0.,1.),mf=under.g/ua;
    back*=1.-min(mf*2.,1.)*scatter*.7;
    float pe=sqrt(1.-(1.-e)*(1.-e));
    oA=vec4(mix(back,uColor,uOpacity),cov);
    oH=vec4(mix(uZEdge,uZTop,pe)-fall+(vnoise(w*1.9)-.5)*.012*min(uBlur,1.),0.,0.,cov);
    oN=grain(vec2(0.),cov);
    oD=vec4(0.,0.,0.,cov);
    oS=vec4(mix(under.r/ua,uRough,scatter),mf*(1.-scatter),uCoat,cov);
    oE=vec4(light*uTransmit,cov);
    oM=vec4(0.,0.,1.,cov);
    return;
  }

  if(uMode==1||uMode==2){
    float d=uShape==4?0.:dist(p);
    if(uMode==1){
      float c=(uShape==4?textureLod(uMask,sheet,uSoftLod).r:clamp(-d/max(uBevel,.7),0.,1.))*held();
      oH=vec4(-uDepth*c,0.,0.,0.);
      oA=oS=oE=vec4(0.);
      return;
    }
    float a;
    if(uShape==4) a=texture(uMask,sheet).r;
    else a=cover(d);
    if(uFeather>0.) a=smoothstep(0.,uFeather,-d);
    if(uWear>0.){float t=1.-.42*sqrt(uWear);a*=1.-smoothstep(t,t+.08,fbm(w*.13));}
    a*=held();
    oA=vec4(uColor,a);oS=vec4(uRough,uMetal*.5,0.,a);oE=vec4(uEmit*.25,a);oH=vec4(0.);oM=vec4(0.,0.,1.,a);
    return;
  }

  // A layer seen side on is all inside: its edges are where the section stops.
  float d=uEdge==4?-1e3:dist(p);
  vec3 col=uColor,emit=uEmit;
  float rough=uRough,metal=uMetal,coat=uCoat,aniso=uAniso,tang=uTangent,sheen=uSheen,h;

  if(uRadial==1) tang=atan(p.y,p.x)+PI*.5;

  h=uEdge==4?seenAt:top(p,d);

  // What's underneath was bent already.
  if(uFollow==0) h-=fall;
  float inset=max(-d,0.);
  if(uFollow==3){
    // A spiral of taps as in frost, because one level of the mip chain alone shows its blocks.
    vec2 at=vPx/uCanvas;
    float k=float(textureSize(uBackH,0).x)*uMap.x/uCanvas.x,lod=max(log2(uBlur*.7*k),0.);
    vec2 wide=vec2(0.);
    for(int i=0;i<12;i++){
      float t=float(i)*2.39996,r=sqrt((float(i)+.5)/12.)*uBlur;
      wide+=UNDER(AT(at+vec2(cos(t),sin(t))*r/uCanvas),lod);
    }
    // Past the edge of what holds it there's nothing to read, so it carries straight on at the height it's stuck at.
    // Height is laid down by coverage, so dividing it out counts only what's there.
    vec2 all=UNDER(AT(uCenter/uCanvas),log2(max(uHalf.x,uHalf.y)*2.*k)),here=UNDER(AT(at),0.);
    float held=all.x/max(all.y,.001),over=mix(held,wide.x/max(wide.y,.001),smoothstep(.1,.6,wide.y/12.));
    h+=mix(max(over,mix(held,here.x/max(here.y,.001),here.y)),over,smoothstep(0.,uBlur*.5,inset));
  }
  // Light from under a part is strongest beneath it, and dies out across the gap.
  if(uLeak>0.) emit*=1.-exp(-inset*inset/(uLeak*uLeak));
  float film=0.;
  if(uFilm>0.){
    // Thickness sets the colour. It falls away from where the heat was, and wanders as it does.
    vec2 f=w*(.0034+.0042*uFilmVary)+uFilmVary*1.4*vec2(fbm(w*.0062),fbm(w*.0062+5.));
    film=uFilm*(1.+uFilmVary*(dot(p/max(uHalf,vec2(1.)),vec2(.8,.35))*.6+(fbm(f)-.5)*2.4));
  }
  if(uDents>0.){
    // A knock leaves a shallow cup, which only shows by bending what the surface reflects.
    vec3 c=cells(w*.0115);
    float cup=smoothstep(.44,.02,c.x)*step(1.-uDents*.6,c.z);
    h-=cup*cup*(.1+.36*fract(c.z*17.));
  }
  // One texel of the sheet in css px, then the same where it turns away, so all of this holds on a
  // zoomed or bent device. Relief goes into t, because it can be far finer than height can hold.
  float t=0.,texel=fwidth(vPx.x),far=uEdge==1?texel:max(max(fwidth(P.x),fwidth(P.y)),texel),seen=1.;
  float grooves=0.,held=1.,tilt=0.;
  if(uGrain.x>0.&&uAcross>.5&&metal>.5&&coat<=.01){
    // A line in brushed metal is no taller than the rest. It shows because a pixel holds only so many grooves, so
    // it sees part of the lobe, tilted a little off the middle. Fewer grooves to a pixel, stronger lines.
    float r=length(p);
    vec2 q=rm(uTangent-uRot)*w,along=uRadial==1?p/max(r,.001)*180.:vec2(q.x,0.);
    grooves=lined(uRadial==1?r:q.y,along,uFeature,far);
    held=max(far/uFeature,1.);
    seen=0.;
  }else if(uGrain.x>0.){
    // Noise can't run finer than the sheet. It holds there, keeping what a texel's average of it would.
    float keep=min(.8/(max(uGrain.y,uGrain.z)*texel),1.);
    vec2 q=rm(uTangent-uRot)*w*uGrain.yz*keep;
    // Value noise sits on a square grid, and the eye finds its rows. Each layer turns, so their grids never line up.
    float g=(vnoise(rm(.52)*q)*.42+vnoise(rm(-.79)*q*1.17+5.)*.36+vnoise(rm(1.3)*q*2.3+9.)*.22-.5)*1.45;
    seen=keep*texel/far;
    t+=g*uGrain.x*seen;col*=1.+g*min(uSlope,.2)*.5*seen;rough=clamp(rough+g*.08*seen,.03,1.);
  }
  if(uPeel>0.) t+=(fbm(w*uWave)-.5)*2.*uPeel;
  if(uBroad>0.){
    // Nothing comes out of a process even. Finish and tone drift, and they drift together.
    float m=fbm(w*.0075+21.);
    rough=clamp(rough+(m-.5)*.14*uBroad,.03,1.);
    col*=1.+(m-.5)*.035*uBroad;
  }
  if(uPattern>0){
    vec2 q=rm(uTangent-uRot)*w/uScale;
    seen*=smoothstep(1.6,3.,uFeature/far);
    float R=uRelief*seen;
    if(uPattern==1){
      // Two-by-two twill. Tows run both ways, so each diamond catches the light differently.
      vec2 c=floor(q),f=fract(q);
      bool warp=mod(c.x-c.y,4.)<2.;
      float across=warp?f.x:f.y,b=sin(PI*across);
      t+=R*b;col*=.8+.34*b;
      aniso=max(aniso,.78);tang+=warp?0.:PI*.5;
      col*=.94+.12*vnoise(vec2(across*8.,c.x+c.y));
    }else if(uPattern==2){
      vec2 g=q*vec2(1.,1.5);float row=floor(g.y);
      g.x+=mod(row,2.)*.5;
      vec2 c=floor(g),f=fract(g)-.5;
      float b=1.-smoothstep(.05,.56,length(f*vec2(1.,1.15)));
      t+=(b-.6)*R;col=mix(col,uColor2,step(.62,hash(c+row)));col*=.42+.85*b;
      rough=clamp(rough+.1*(1.-b),.03,1.);
    }else if(uPattern==3){
      // The rings are cylinders round the pith, and a board is a flat cut through them. So they
      // run close and straight at its edges and open into arches where the cut nears the pith.
      vec2 l=rm(uTangent-uRot)*p+vec2(hash(uSeed)*2000.,(hash(uSeed+3.)-.5)*120.),g=l/uScale;
      float cut=95.+70.*sin(l.x*.0021)+14.*sin(l.x*.0063+1.);
      float r=sqrt(l.y*l.y+cut*cut)+(fbm(l*vec2(.0028,.017))-.5)*16.+(fbm(l*vec2(.017,.1)+3.)-.5)*2.6;
      // Good years are wide and hard ones thin.
      float year=r*MM/uRings+.35*sin(r*.021+1.)+.2*sin(r*.057);
      float ring=fract(year),id=floor(year);
      // A year starts pale and ends tight and dark, then stops dead at winter.
      float late=pow(ring,2.6)*smoothstep(1.,.97,ring)*(.55+.7*hash(vec2(id,2.)));
      float streak=fbm(vec2(l.x*.0021,l.y*.028)+7.);
      float fibre=vnoise(vec2(g.x*.1,g.y*6.7))*.55+vnoise(vec2(g.x*.42,g.y*13.8)+5.)*.45;
      // Some trees pack their pores into the spring wood, and that band is what you see on oak.
      float spring=smoothstep(0.,.04,ring)*smoothstep(.5,.1,ring);
      float zone=mix(.4,spring,uPores);
      float pore=smoothstep(.72-zone*.22,.82-zone*.2,vnoise(vec2(g.x*.16,g.y*4.8)+id*3.))*(.25+.75*zone)*uPores;
      col=mix(uColor,uColor2,clamp(late*.8+spring*uPores*.22+(streak-.48)*.8,0.,1.));
      col*=.93+.14*fibre;
      col*=1.-.62*pore;t-=R*pore;rough=clamp(rough+.2*pore,.03,1.);coat*=1.-.5*pore;
      t+=(fibre-.5)*R*.17;
      // The fibres throw light along their length, so the grain shifts as a light moves.
      aniso=max(aniso,.42);tang=uTangent+(streak-.5)*.6;
    }else if(uPattern==4){
      // Stone is folded one way, so it runs along a direction. A vein comes and goes, changes width, and has a cloud round it.
      q*=120.;
      vec2 r=mat2(.82,.57,-.57,.82)*q*vec2(.34,1.);
      float warp=fbm(r*.016+7.),bend=fbm(r*.04+warp),n=fbm(r*.011+vec2(warp,bend)*.9),n2=fbm(r*.03+warp*1.1+3.);
      float gn=length(vec2(dFdx(n),dFdy(n))),g2=length(vec2(dFdx(n2),dFdy(n2)));
      float a=abs(n-.5)/(gn+.0001),b=abs(n2-.5)/(g2+.0001);
      float wide=.45+7.*pow(fbm(q*.02+11.),3.),gate=smoothstep(.36,.56,fbm(q*.012+5.));
      // Around a peak of the noise a contour closes into a ring, and there the slope gives it away.
      float open=smoothstep(.0008,.0024,gn),open2=smoothstep(.001,.003,g2);
      float core=(1.-smoothstep(.15*wide,1.5*wide,a))*open,halo=1.-smoothstep(0.,.035,abs(n-.5));
      float side=(1.-smoothstep(.1,1.1,b))*smoothstep(.48,.62,fbm(q*.03+21.))*open2;
      float vein=clamp(gate*(core*.8+halo*.14)+.35*side*gate,0.,1.);
      col=mix(col,uColor2,.09*smoothstep(.42,.68,fbm(r*.018+warp)));
      col=mix(col,uColor2,vein*(.5+.5*fbm(q*.07)));t-=R*vein;
    }else if(uPattern==5){
      vec3 c=cells(q);
      float on=smoothstep(.02,.07,c.y-c.x)*step(.34,c.z);
      col=mix(col,mix(uColor2,uSub,step(.68,c.z)),on);
      rough=mix(rough,rough*.8,on);t+=R*on;
    }else if(uPattern==6){
      // A hide is round domed plates parted by narrow creases: what looks longer one way is the light raking them. A crease is deeper in
      // some places than others. A finer set of creases crosses the plates, and pores sit in them.
      vec2 g=q+vec2(vnoise(q*1.7+2.),vnoise(q*1.7+5.))*.3+vec2(vnoise(q*.5),vnoise(q*.5+9.))*.86+vec2(vnoise(q*.15+4.),vnoise(q*.15+13.))*2.3;
      vec2 c=hide(g);
      vec3 f=cells(g*2.1+7.);
      float wide=max(.1,1.2*far/uScale),deep=min(.5+vnoise(g*2.3+3.),1.),v=exp(-c.x/wide)*deep;
      float b=1.-exp(-c.x/.45),vf=exp(-(f.y-f.x)/max(.16,2.*wide)),pore=smoothstep(.15,.07,f.x)*step(.8,f.z)*seen;
      t+=(.2*b-.85*v-.13*vf*(1.-v)-.2*pore+.06)*R*.66;
      col*=1.-(.3*v+.05*vf+.2*pore)*seen;
      rough=clamp(rough+(.12*v-.05*(1.-v))*seen,.03,1.);
    }else if(uPattern==7){
      vec2 s=vec2(1.,1.732),a=mod(q,s)-s*.5,b=mod(q-s*.5,s)-s*.5,g=dot(a,a)<dot(b,b)?a:b;
      float e=max(abs(g.x),dot(abs(g),vec2(.5,.866)));
      float hole=smoothstep(.43,.37,e);
      t-=R*hole;col=mix(col,col*.05,hole);metal*=1.-hole;coat*=1.-hole;
    }else if(uPattern==8){
      t+=(abs(sin(q.x*PI+q.y*PI))+abs(sin(q.x*PI-q.y*PI)))*R*.5;
    }else if(uPattern==9){
      float f=fract((q.x+q.y)*.7071),aa2=fwidth(q.x+q.y);
      col=mix(col,uColor2,smoothstep(.5-aa2,.5+aa2,f)*smoothstep(1.,1.-aa2,f));
    }else if(uPattern==10){
      t+=sin(q.y*PI*2.)*R*.5;
    }else if(uPattern==11){
      // Foil is pressed into tiles, each facing its own way, and the colour sweeps across them.
      vec2 g=rm(.7854)*q,c=floor(g),f=fract(g)-.5;
      float pick=hash(c+.3),a=pick*6.2832;
      film=uFilm*(.65+.75*abs(fract((q.x+q.y*.6)*.035)*2.-1.))+(pick-.5)*uFilmVary*.3;
      t+=dot(f,vec2(cos(a),sin(a)))*R;
    }else if(uPattern==12){
      // Cut into the tool on a staggered grid, so they sit in true rows and each one is a dome.
      vec2 s=vec2(1.,1.732),a=mod(q,s)-s*.5,b=mod(q-s*.5,s)-s*.5;
      float e=sqrt(max(1.-min(dot(a,a),dot(b,b))/.0784,0.));
      t+=R*e;col*=1.-.06*(1.-e)*seen;
    }else if(uPattern==13){
      // Most cells hold nothing. The few that do hold a hole, and dirt and shadow gather in it.
      vec3 c=cells(q);
      float o=step(.7,c.z)*smoothstep(.1,.05,c.x);
      t-=R*o;col*=1.-.3*o*seen;rough=clamp(rough+.2*o,.03,1.);coat*=1.-o;
    }
  }
  if(uSlope>0.){
    // What's too fine to see still tilts the light. Its slope joins the roughness, lengthwise or not.
    float s=2.*uSlope*uSlope*(1.-seen*seen),a=rough*rough;
    float at=sqrt(pow(a*(1.-aniso),2.)+s*(1.-uAcross)),ab=sqrt(pow(a*(1.+aniso),2.)+s);
    // What the pixel's grooves lean by comes out of the lobe, which keeps only the rest.
    if(grooves!=0.){tilt=clamp(ab*grooves/sqrt(held),-.5,.5);ab*=sqrt(max(1.-1./held,.2));}
    rough=sqrt(min((at+ab)*.5,1.));aniso=(ab-at)/(ab+at);
  }
  if(uFade>0.){
    float sun=uFade*(.72+.56*fbm(w*.008+13.));
    col=mix(col,vec3(dot(col,vec3(.2126,.7152,.0722)))*1.06+.035,clamp(sun,0.,1.));
  }
  if(uMottle>0.){
    float m=fbm(w*.016),m2=fbm(w*.085+4.);
    col*=mix(1.,(.5+m*1.1)*(.78+.44*m2),uMottle);
    rough+=(m-.5)*.14*uMottle;
  }
  if(uFleck>0.){float f=smoothstep(.74,.82,vnoise(w*.85));col=mix(col,col*2.4+.025,f*uFleck);}
  if(uWear>0.&&uPolish>0.){
    // Soft finishes don't chip. They burnish, shiny at the edges and wherever a hand rubs most.
    // A hand only reaches the tops of a texture, so they go first and the creases stay as they were.
    float rub=fbm(w*.012+7.)*.7+fbm(w*.09+2.)*.3+exp(-inset/18.)*.5+clamp(t/max(uRelief,.01),-1.,1.)*.35;
    float t=smoothstep(.75-uWear*.45,1.05-uWear*.3,rub)*min(uWear*3.,1.);
    rough=mix(rough,max(rough*.5,.1),t);sheen*=1.-t;col*=1.-.05*t;
  }else if(uWear>0.){
    // Paint goes at raised edges first. The distance tells us where they are.
    float edge=exp(-inset/11.);
    float field=fbm(w*.034)*.6+fbm(w*.29+3.)*.4;
    float t=mix(.8,.5,clamp(edge*uWear*1.7,0.,1.))-uWear*.05;
    // A clear coat is on top, so it goes first, and long before anything chips.
    coat*=1.-smoothstep(t-.3,t-.12,field)*min(uWear*2.5,1.);
    float chip=smoothstep(t,t+.012,field)*smoothstep(0.,.2,uWear);
    // A chip goes through one coat at its rim and on to what the thing is made of at its heart.
    float deep=smoothstep(t+.055,t+.07,field)*smoothstep(.05,.4,uWear);
    col=mix(mix(col,uSub,chip),uBare,deep);
    metal=mix(mix(metal,uSubRM.y,chip),uBareRM.y,deep);
    rough=mix(mix(rough,uSubRM.x,chip),uBareRM.x,deep);
    coat*=1.-chip;film*=1.-chip;
    h-=.05*chip+.05*deep;
    float scr=max(scratch(w,.32,1.,uWear),scratch(w,-.71,2.,uWear))*smoothstep(.02,.3,uWear);
    h-=.012*scr;rough=clamp(rough+.08*scr,.03,1.);col=mix(col,uSub*.9+.05,scr*.12);
    float rub=smoothstep(.45,.75,fbm(w*.012+7.));
    col*=1.-.1*rub*uWear;rough=mix(rough,rough*.8,rub*uWear);
  }

  if(uAge>0.){
    // Finishes go dull everywhere. Patina then creeps in unevenly, from wherever it started.
    coat*=1.-.6*uAge;rough=clamp(rough+.1*uAge,.03,1.);
    if(uPatinaOn>0.&&uPolish>0.){
      // Soft stuff changes in the light, all over and nearly evenly: plastic yellows, wood and leather darken. Only a broad drift tells where it got more sun.
      float t=clamp(uAge*1.5,0.,1.)*(.8+.4*fbm(w*.004+5.));
      col=mix(col,uPatina,t*.75);
      rough=mix(rough,uPatinaRough,t*.5);
    }else if(uPatinaOn>0.){
      // It starts at the edges and in corners, where nothing rubs it away.
      float f=fbm(w*.016+5.)*.42+fbm(w*.13+11.)*.38+fbm(w*.7+3.)*.2+exp(-inset/26.)*.14;
      float t=smoothstep(.68-uAge*.5,.92-uAge*.46,f)*min(uAge*2.2,1.);
      col=mix(col,uPatina,t);
      rough=mix(rough,uPatinaRough,t);metal*=1.-t;aniso*=1.-t;
    }
  }
  if(uTouch>0.){
    // Fingers land in the middle. They polish first, then rub through to what is underneath.
    vec2 q=p/max(uHalf,vec2(1.));
    float t=exp(-dot(q,q)*3.2)*uTouch*(.6+.9*fbm(w*.09));
    float through=smoothstep(.62,.8,t);
    rough=mix(rough,max(rough*.5,.08),clamp(t*1.6,0.,1.));coat*=1.-clamp(t,0.,1.);
    col=mix(col,uSub,through*.75);
  }
  // Varnish is a colour too, and it yellows as it ages.
  col*=mix(vec3(1.),uCoatTint,clamp(coat*(.7+uAge*.6),0.,1.));

  float cov=uEdge>0?1.:cover(d);
#ifndef RELIEF
  h+=t;
#endif
  oD=vec4(t,0.,0.,cov);
  oA=vec4(col,cov);
  oH=vec4(h,aniso*cos(tang),aniso*sin(tang),cov);
  oN=grain(oH.gb,cov);
  // Eight bits step visibly across a slow change of colour, so the steps are broken up.
  film=clamp(film+(hash(w)-.5)*.012,0.,1.)*step(.001,uFilm);
  oS=vec4(clamp(rough,.03,1.),metal*(1.+film)*.5,coat,cov);
  oE=vec4(emit*.25,cov);
  oM=vec4(coat>.01?uCoatRough:metal>.5?.5+tilt:sheen,uScatter,uMarks,cov);
  // As far below its middle as it stands above. With no middle that's below the ground, so it's solid all the way down.
  if(uFollow==0) oU=vec4(2.*uMid-h,0.,0.,cov);
  // A following surface goes down twice: its colour leaving the height be, then its height added on.
  // With SPLIT its grain's direction goes down with its colour, over what's there, as nothing can add a signed amount to eight bits.
  if(uFollow==1) oH=oD=vec4(0.);
  if(uFollow==2){oH=vec4(vec3(h,aniso*cos(tang),aniso*sin(tang))*cov,0.);oN=vec4(0.);oD=vec4(t*cov,0.,0.,0.);oA=oS=oE=oM=vec4(0.);}
  // Seen edge-on, its height is how far it stands toward this face, and the nearest of the others' solids is kept.
  if(uEdge==1){
    oH=vec4(seenAt,0.,0.,1.);oN=grain(vec2(0.),1.);oD=oU=vec4(0.);
    gl_FragDepth=1.-clamp(seenAt/1024.,0.,1.);
  }
}`,gt=`#version 300 es
precision highp float;
in vec2 vPx;
out vec4 o;
uniform vec2 uSeed;
uniform float uPrints,uDust,uScuff,uHaze;

mat2 rm(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vnoise(vec2 p){
  vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}
float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*vnoise(p);p=mat2(1.62,1.19,-1.19,1.62)*p+17.1;a*=.5;}return s/.9375;}

// A fingertip is about 17mm by 23mm, with ridges under half a millimetre apart.
float prints(vec2 w){
  const float CELL=150.;
  vec2 g=floor(w/CELL);
  float sum=0.;
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
    vec2 c=g+vec2(x,y);
    if(hash(c+.7)>uPrints*.85) continue;
    vec2 at=(c+.5+(vec2(hash(c+1.3),hash(c+2.9))-.5)*.9)*CELL;
    vec2 q=rm(hash(c+4.1)*6.2832)*(w-at)/(vec2(34.,46.)*(.75+.5*hash(c+5.7)));
    float r=length(q);
    if(r>1.) continue;
    // Ridges arch over a loop, and a finger drags half of them out into a smear.
    float ridge=.5+.5*sin((q.y*.62+q.x*q.x*.85+length(q-vec2(.12,-.3))*.5)*72.+fbm(w*.05+c)*11.);
    float press=smoothstep(1.,.45,r)*smoothstep(.22,.62,fbm(w*.06+c*3.));
    ridge=mix(ridge,.5,smoothstep(.38,.62,fbm(w*.028+c*7.)));
    sum=max(sum,press*(.5+.5*ridge));
  }
  return sum;
}

// Long and faint, on a slow curve, from every direction a cloth or a pocket ever moved.
float hairs(vec2 w,float ang,float seed){
  const float ROW=11.;
  vec2 q=rm(ang)*w;
  q.y+=sin(q.x*.011+seed*2.1)*17.;
  float row=floor(q.y/ROW);
  if(hash(vec2(row,seed))>uScuff*.2) return 0.;
  float seg=smoothstep(.5,.62,vnoise(vec2(q.x*.009+row*3.1,row+seed)));
  float y=abs(fract(q.y/ROW)-.5)*ROW;
  return seg*smoothstep(.62,.16,y)*(.45+.55*hash(vec2(row,seed+3.)));
}

float specks(vec2 w,float cell,float rad,float density){
  vec2 g=w/cell,i=floor(g);
  float best=0.;
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
    vec2 c=i+vec2(x,y);
    if(hash(c+2.2)>density) continue;
    float e=length(g-c-vec2(hash(c),hash(c+7.3)))*cell,r=rad*(.5+hash(c+3.1));
    best=max(best,smoothstep(r,r*.35,e));
  }
  return best;
}

float fibres(vec2 w){
  const float CELL=170.;
  vec2 g=floor(w/CELL);
  float sum=0.;
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
    vec2 c=g+vec2(x,y);
    if(hash(c+9.1)>uDust*.12) continue;
    vec2 at=(c+vec2(hash(c+1.7),hash(c+6.3)))*CELL;
    vec2 q=rm(hash(c+8.4)*6.2832)*(w-at);
    float k=(hash(c+2.6)-.5)*.03,len=4.+hash(c+5.2)*11.;
    float d=abs(q.y-k*q.x*q.x);
    sum=max(sum,smoothstep(.5,.1,d)*smoothstep(len,len*.7,abs(q.x)));
  }
  return sum;
}

void main(){
  vec2 w=vPx+uSeed;
  float smear=smoothstep(.5,.7,fbm(rm(1.1)*w*vec2(.0042,.02)+3.))*smoothstep(.45,.6,fbm(w*.009+9.));
  float oil=uPrints>0.?max(prints(w),smear*uPrints*.6):0.;

  // Most dust is too fine to see singly and shows as a soft bloom. A few grains stand out.
  float density=smoothstep(.3,.75,fbm(w*.011+5.));
  float dust=0.;
  if(uDust>0.){
    dust=smoothstep(.35,.8,fbm(w*1.3))*uDust*density*.025;
    dust=max(dust,specks(w,14.,.55,uDust*.05*density)*.3);
    dust=max(dust,fibres(w)*.12);
  }

  float hair=0.;
  if(uScuff>0.) for(int i=0;i<8;i++){
    float s=float(i);
    hair=max(hair,hairs(w,s*.78+.2,s+1.));
  }

  float haze=.5+(fbm(w*.0052+7.)*.8+fbm(w*.023+2.)*.2-.5)*2.*uHaze;
  o=vec4(oil,dust,hair,clamp(haze,0.,1.));
}`,_t=`#version 300 es
precision highp float;
in vec2 vPx;
layout(location=0) out vec4 oA;
layout(location=1) out vec4 oS;
uniform vec2 uCanvas,uSeed;
uniform float uAge,uDpr;
uniform sampler2D tH;
#ifdef SPLIT
uniform sampler2D tN;
#define COVER(uv,lod) textureLod(tN,uv,lod).a
#else
#define COVER(uv,lod) textureLod(tH,uv,lod).a
#endif
uniform vec4 uMap;
#define AT(uv) ((uv)*uMap.xy+uMap.zw)

float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vnoise(vec2 p){
  vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}
float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*vnoise(p);p=mat2(1.62,1.19,-1.19,1.62)*p+17.1;a*=.5;}return s/.9375;}
float at(vec2 uv,float lod){return textureLod(tH,AT(uv),lod).r/max(COVER(AT(uv),lod),.05);}

void main(){
  vec2 uv=vPx/uCanvas,w=vPx+uSeed;
  vec4 H=textureLod(tH,AT(uv),0.);
  float cov=COVER(AT(uv),0.);
  if(cov<.01) discard;
  float h=H.r/max(cov,.25),l=log2(uDpr);

  // Dirt settles wherever the surface sits below what is around it.
  float pit=clamp(max(at(uv,2.1+l)-h,0.)*.9+max(at(uv,3.7+l)-h,0.)*.3,0.,1.);
  pit*=.35+1.1*fbm(w*.05);

  // Water carries it downhill from anything that stands proud.
  float run=0.;
  for(int i=1;i<=7;i++){
    float t=float(i)/7.;
    vec2 q=uv-vec2(0.,t*62./uCanvas.y);
    run+=max(at(q,2.+l)-h-.4,0.)*(1.-t);
  }
  float column=smoothstep(.4,.8,vnoise(vec2(w.x*.075,w.y*.01)))*(.45+.55*vnoise(vec2(w.x*.5,w.y*.02)));
  run=clamp(run*.1*column,0.,1.);

  float dirt=clamp(pit*uAge*1.5+run*uAge*.9,0.,.9);
  float film=uAge*(.02+.09*fbm(w*.022+2.))*(.7+.6*vnoise(w*.8));
  float a=1.-(1.-dirt)*(1.-film);
  vec3 c=mix(vec3(.17,.15,.12),mix(vec3(.022,.017,.012),vec3(.07,.035,.016),run),dirt/max(a,.001));
  oA=vec4(c*cov,a);
  oS=vec4(.82*cov,0.,0.,a);
}`,vt=`#version 300 es
precision highp float;
in vec2 vPx;
out vec4 o;
uniform sampler2D tH;
uniform vec2 uCanvas;
uniform float uDpr;
uniform vec4 uMap;
#define AT(uv) ((uv)*uMap.xy+uMap.zw)
const float MM=.25;
void main(){
  vec2 uv=vPx/uCanvas,e=vec2(1.5)/uCanvas;
  float h0=textureLod(tH,AT(uv),0.).r,lod=log2(uDpr);
  // Measured from the surface's own slope, so a dome does not shade itself.
  vec2 g=vec2(textureLod(tH,AT(uv+vec2(e.x,0.)),lod).r-textureLod(tH,AT(uv-vec2(e.x,0.)),lod).r,
    textureLod(tH,AT(uv+vec2(0.,e.y)),lod).r-textureLod(tH,AT(uv-vec2(0.,e.y)),lod).r)/(3.*MM);
  float seen=0.;
  vec2 open=vec2(0.);
  // Samples start a texel out, so with fewer pixels to the mm than one to the css px, they reach further as well.
  for(int i=0;i<10;i++){
    float a=(float(i)+.5)*.62832,r=1.5/min(uDpr,1.),top=0.;
    vec2 dir=vec2(cos(a),sin(a));
    for(int j=0;j<6;j++){
      vec2 s=uv+dir*r/uCanvas;
      float d=r*MM,rise=textureLod(tH,AT(s),max(log2(r*uDpr)-1.3,0.)).r-h0-dot(g,dir)*d;
      top=max(top,rise/sqrt(rise*rise+d*d)*(1.-float(j)*.1));
      r*=2.;
    }
    seen+=1.-top*top;
    open+=dir*(1.-top);
  }
  o=vec4(seen*.1,open*.1*.5+.5,1.);
}`,yt=class{gl;block;fields;screenTex;later=[];drawing=null;relief=!0;aim=null;constructor(e,t,n,r){this.gl=e,this.block=t,this.fields=n,this.screenTex=r}bindShape(e,t,n){let{gl:r,block:i}=this,{f:a,i:o,at:s}=i;if(i.four(s.uBox,n.x,n.y,n.x+n.w,n.y+n.h),o[s.uShape]=ct[e.type],a[s.uRot]=0,a[s.uGrow]=e.grow??0,a[s.uRing]=e.ring??0,i.two(s.uRipple,0,0),o[s.uClipShape]=-1,e.type===`capsule`)i.four(s.uCap,e.ax,e.ay,e.bx,e.by),i.two(s.uCapR,e.ra,e.rb),i.two(s.uHalf,1,1),i.two(s.uCenter,(e.ax+e.bx)/2,(e.ay+e.by)/2);else if(e.type===`arc`)i.two(s.uCenter,e.cx,e.cy),i.two(s.uHalf,e.hw,e.hh),i.four(s.uCap,e.mid,e.half,e.r,e.width/2);else if(e.type===`mask`)i.two(s.uCenter,e.box.x,e.box.y);else if(i.two(s.uCenter,e.cx,e.cy),i.two(s.uHalf,e.hw,e.hh),e.type===`rect`)a[s.uRadius]=e.radius,a[s.uRot]=e.rotate,i.vec(s.uRipple,e.ripple);else if(e.type===`holes`)a[s.uRadius]=e.radius,i.vec(s.uHoles,[e.pitch,e.hole,+!!e.square]);else{a[s.uRot]=e.rotate,i.two(s.uSpread,e.spread,e.spread*(e.hh/(e.source?.hh??e.hh)));let n=this.fields.get(e,t);this.later.push(()=>{r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,n),r.activeTexture(r.TEXTURE0)})}}bindHolder(e,t){let{gl:n,block:r}=this,{f:i,i:a,at:o}=r;if(e?.type!==`rect`&&e?.type!==`field`)return;if(a[o.uClipShape]=ct[e.type],r.four(o.uClip,e.cx,e.cy,e.hw,e.hh),i[o.uClipRot]=e.rotate,e.type===`rect`){i[o.uClipRadius]=e.radius;return}r.two(o.uClipSpread,e.spread,e.spread*(e.hh/(e.source?.hh??e.hh)));let s=this.fields.get(e,t);this.later.push(()=>{n.activeTexture(n.TEXTURE7),n.bindTexture(n.TEXTURE_2D,s),n.activeTexture(n.TEXTURE0)})}draw(e,t){let n=t.spec,{gl:r,block:i,later:a}=this,{f:o,i:s,at:c}=i;this.drawing=e;let l=()=>{let e=i.keep();a.push(()=>{i.use(e),r.drawArrays(r.TRIANGLE_STRIP,0,4)})},u=()=>a.push(()=>r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA)),d=()=>a.push(()=>r.blendFunc(r.ONE,r.ONE));this.bindShape(e.shape,n.dpr,B(e)),s[c.uEdge]=0;let f=e.bend;if(o[c.uBendReach]=f?f.reach:0,f&&(i.two(c.uBendDir,f.dir[0],f.dir[1]),i.two(c.uBendAt,f.at,f.flat),o[c.uBendDrop]=f.drop,o[c.uBendK]=f.k,s[c.uBendBoth]=+!!f.both),e.op===`screen`){a.push(()=>{r.activeTexture(r.TEXTURE2),r.bindTexture(r.TEXTURE_2D,this.screenTex),r.texImage2D(r.TEXTURE_2D,0,r.SRGB8_ALPHA8,r.RGBA,r.UNSIGNED_BYTE,e.source),r.activeTexture(r.TEXTURE0)}),s[c.uMode]=lt.screen,s[c.uKind]=ut[e.kind],o[c.uGain]=e.gain,i.vec(c.uColor,e.color),i.vec(c.uInk,e.ink),i.vec(c.uEmit,e.emit),i.two(c.uInset,e.inset[0],e.inset[1]),o[c.uZTop]=e.zTop,o[c.uRough]=e.rough,o[c.uCoat]=e.coat,o[c.uMetal]=e.metal,o[c.uZoom]=n.fine,l();return}if(e.op===`frost`){s[c.uMode]=lt.frost,i.two(c.uSeed,0,0),o[c.uBlur]=e.blur,o[c.uZoom]=e.zoom,i.vec(c.uColor,e.tint),o[c.uOpacity]=e.opacity,o[c.uTransmit]=e.transmit,o[c.uZEdge]=e.zEdge,o[c.uZTop]=e.zTop,o[c.uBevel]=e.bevel,o[c.uRough]=e.rough,o[c.uCoat]=e.coat,u(),l();return}if(e.op===`glass`){if(t.paned.has(e))return;s[c.uMode]=lt.glass,o[c.uZTop]=e.height,o[c.uBevel]=e.bevel,o[c.uCoat]=e.coat,a.push(()=>{r.drawBuffers([r.NONE,r.COLOR_ATTACHMENT1,r.NONE,r.NONE]),r.blendFunc(r.ONE,r.ONE)}),l(),a.push(()=>{r.drawBuffers([r.NONE,r.NONE,r.COLOR_ATTACHMENT2,r.NONE]),r.colorMask(!1,!1,!0,!1),r.blendFunc(r.ONE,r.ONE_MINUS_SRC_ALPHA)}),l(),a.push(()=>{r.colorMask(!0,!0,!0,!0),r.drawBuffers(t.tex.targets)}),u();return}if(e.op===`glow`){s[c.uMode]=lt.glow,i.vec(c.uEmit,e.color),o[c.uWidth]=e.width,d(),l(),u();return}if(e.op===`cut`){this.bindHolder(e.on,n.dpr),i.vec(c.uSeed,e.seed),o[c.uBevel]=e.soft,o[c.uWear]=e.wear,o[c.uSoftLod]=Math.log2(n.dpr)*.75+.1,e.depth&&(s[c.uMode]=lt.cut,o[c.uDepth]=e.depth,d(),l(),u()),e.ink&&(s[c.uMode]=lt.ink,o[c.uFeather]=e.feather,i.vec(c.uColor,e.ink),i.vec(c.uEmit,e.emit??[0,0,0]),o[c.uRough]=e.rough,o[c.uMetal]=e.metal,l());return}let p=e.material;s[c.uMode]=lt.surface,s[c.uProfile]=ft[e.profile],s[c.uRadial]=+!!e.radial,o[c.uBevel]=e.bevel,o[c.uZEdge]=e.zEdge,o[c.uZTop]=e.zTop,o[c.uDish]=e.dish,o[c.uMid]=e.mid,i.two(c.uCrown,e.crown[0],e.crown[1]),i.vec(c.uColor,p.color),i.vec(c.uSub,p.sub),i.two(c.uSubRM,p.subRough,p.subMetal),i.vec(c.uBare,p.bare),i.two(c.uBareRM,p.bareRough,p.bareMetal),i.vec(c.uCoatTint,p.coatTint),o[c.uDents]=p.dents,o[c.uFade]=p.fade,o[c.uRings]=p.rings,o[c.uPores]=p.pores,o[c.uFilmVary]=p.filmVary,o[c.uLeak]=p.leak,i.vec(c.uEmit,p.emit),i.vec(c.uGrain,p.grain),o[c.uRough]=p.rough,o[c.uMetal]=p.metal,o[c.uCoat]=p.coat,o[c.uAniso]=p.aniso,o[c.uTangent]=p.tangent,o[c.uPeel]=p.peel,o[c.uWave]=p.wave,o[c.uRelief]=this.relief?p.relief:0,o[c.uFeature]=p.feature,o[c.uSlope]=p.slope,o[c.uAcross]=p.across,o[c.uMottle]=p.mottle,o[c.uFleck]=p.fleck,o[c.uWear]=p.wear,o[c.uAge]=p.age,o[c.uPatinaOn]=+!!p.patina,i.vec(c.uPatina,p.patina??[0,0,0]),o[c.uPatinaRough]=p.patinaRough,o[c.uTouch]=p.touch,o[c.uSheen]=p.sheen,o[c.uScatter]=p.scatter,o[c.uMarks]=p.marks,o[c.uPolish]=p.polish,o[c.uBroad]=p.broad,o[c.uCoatRough]=p.coatRough,s[c.uPattern]=p.pattern?dt[p.pattern]:0,i.vec(c.uColor2,p.color2),o[c.uScale]=p.scale,o[c.uFilm]=p.film,i.vec(c.uSeed,e.seed),s[c.uFollow]=e.bridge?3:+!!e.follow,o[c.uBlur]=e.bridge;let m=this.aim;if(m){let e=m.reach,t=m.box;if(s[c.uEdge]=m.rows?4:1,m.rows){let{tex:e,y0:t,step:n,n:o}=m.rows;i.four(c.uCap,t,n,o,0),a.push(()=>{r.activeTexture(r.TEXTURE9),r.bindTexture(r.TEXTURE_2D,e),r.activeTexture(r.TEXTURE0)})}i.four(c.uBox,t.x,t.y,t.x+t.w,t.y+t.h),i.vec(c.uSeen,m.seen),i.vec(c.uFrom,m.from),i.four(c.uReach,e.x,e.y,e.x+e.w,e.y+e.h),l()}else l(),e.follow&&!e.bridge&&(s[c.uFollow]=2,d(),l(),u())}},bt=37297;function K(e,t,n){let r=(t,n)=>{let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r},i=e.createProgram(),a=[r(e.VERTEX_SHADER,t),r(e.FRAGMENT_SHADER,n)];for(let t of a)e.attachShader(i,t);return e.linkProgram(i),{program:i,finish:()=>{if(!e.getProgramParameter(i,e.LINK_STATUS)){let t=a.map(t=>e.getShaderInfoLog(t)).join(``)||e.getProgramInfoLog(i);throw Error(t||`link failed`)}let t={},n=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let r=0;r<n;r++){let{name:n}=e.getActiveUniform(i,r);t[n]=e.getUniformLocation(i,n)}return{program:i,u:t}}}}function xt(e,t,n){return K(e,t,n).finish()}function St(e,t,n){let r=e.getExtension(`KHR_parallel_shader_compile`),{program:i,finish:a}=K(e,t,n),o=null;return()=>o??=!r||e.getProgramParameter(i,bt)?a():null}var Ct=16,wt=class{gl;f;i;at={};buffers=[];size;stride;kept=new Float32Array;count=0;constructor(e,t,n){this.gl=e;let r=e.getUniformBlockIndex(t,n);e.uniformBlockBinding(t,r,0),this.size=e.getActiveUniformBlockParameter(t,r,e.UNIFORM_BLOCK_DATA_SIZE);let i=e.getParameter(e.UNIFORM_BUFFER_OFFSET_ALIGNMENT);this.stride=Math.ceil(this.size/i)*i;let a=e.getActiveUniformBlockParameter(t,r,e.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES),o=e.getActiveUniforms(t,[...a],e.UNIFORM_OFFSET);a.forEach((n,r)=>{this.at[e.getActiveUniform(t,n).name]=o[r]/4});let s=new ArrayBuffer(this.size);this.f=new Float32Array(s),this.i=new Int32Array(s)}two(e,t,n){this.f[e]=t,this.f[e+1]=n}four(e,t,n,r,i){this.two(e,t,n),this.two(e+2,r,i)}vec(e,t){for(let n=0;n<t.length;n++)this.f[e+n]=t[n]}keep(){let e=this.stride/4,t=this.count*e;if(t+e>this.kept.length){let t=new Float32Array(Math.max(e*256,this.kept.length*2));t.set(this.kept),this.kept=t}return this.kept.set(this.f,t),this.count++}send(){let{gl:e}=this,t=this.stride/4;for(let n=0,r=0;n<this.count;n+=Ct,r++)e.bindBuffer(e.UNIFORM_BUFFER,this.buffers[r]??=e.createBuffer()),e.bufferData(e.UNIFORM_BUFFER,this.kept,e.DYNAMIC_DRAW,n*t,Math.min(Ct,this.count-n)*t);this.count=0}use(e){this.gl.bindBufferRange(this.gl.UNIFORM_BUFFER,0,this.buffers[Math.floor(e/Ct)],e%Ct*this.stride,this.size)}};function q(e,t,n,r=e.TEXTURE_2D){e.texParameteri(r,e.TEXTURE_MIN_FILTER,t),e.texParameteri(r,e.TEXTURE_MAG_FILTER,n),e.texParameteri(r,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(r,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}var Tt=`#version 300 es
precision highp float;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  gl_Position=vec4(c*2.-1.,0.,1.);
}`,Et=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uMask;
float cov(ivec2 p){return texelFetch(uMask,clamp(p,ivec2(0),textureSize(uMask,0)-1),0).r;}
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  float c=cov(p);
  bool inside=c>=.5;
  bool edge=c>0.&&c<1.;
  edge=edge||(cov(p+ivec2(1,0))>=.5)!=inside||(cov(p-ivec2(1,0))>=.5)!=inside
           ||(cov(p+ivec2(0,1))>=.5)!=inside||(cov(p-ivec2(0,1))>=.5)!=inside;
  o=edge?vec4(gl_FragCoord.xy,c-.5,1.):vec4(0.);
}`,Dt=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uSeeds,uMask;
uniform int uStep;
uniform ivec2 uSize;
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy),size=uSize;
  // The nearest edge is what counts, and that is not always the nearest seed.
  float side=texelFetch(uMask,p,0).r>=.5?1.:-1.;
  vec4 best=vec4(0.);
  float bestD=1e12;
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
    ivec2 q=p+ivec2(x,y)*uStep;
    if(q.x<0||q.y<0||q.x>=size.x||q.y>=size.y) continue;
    vec4 s=texelFetch(uSeeds,q,0);
    if(s.a==0.) continue;
    float dd=length(s.xy-gl_FragCoord.xy)+side*s.z;
    if(dd<bestD){bestD=dd;best=s;}
  }
  o=best;
}`,Ot=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uSeeds,uMask;
uniform float uScale;
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  vec4 s=texelFetch(uSeeds,p,0);
  bool inside=texelFetch(uMask,p,0).r>=.5;
  float d=s.a==0.?1e4:length(s.xy-gl_FragCoord.xy);
  // A covered seed has its edge beyond its centre, so outside pixels are closer than they look.
  d=inside?d+s.z:d-s.z;
  o=vec4((inside?-d:d)/uScale);
}`,kt=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uField;
uniform float uScale;
uniform ivec2 uSize;
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy),size=uSize;
  float d=texelFetch(uField,p,0).r,sum=0.,total=0.;
  float stride=clamp(abs(d)*uScale/6.,1.,6.);
  // Lopsided near the border it would drift, so it shrinks to stay centred.
  int r=min(3,int(float(min(min(p.x,p.y),min(size.x-1-p.x,size.y-1-p.y)))/stride));
  for(int y=-r;y<=r;y++)for(int x=-r;x<=r;x++){
    float w=float((4-abs(x))*(4-abs(y)));
    sum+=texture(uField,(gl_FragCoord.xy+vec2(x,y)*stride)/vec2(textureSize(uField,0))).r*w;
    total+=w;
  }
  o=vec4(mix(d,sum/total,smoothstep(1.,3.,abs(d)*uScale)));
}`,At=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uField,uEdge;
uniform float uSteep;
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  o=vec4(max(texelFetch(uField,p,0).r,texelFetch(uEdge,p,0).r*uSteep));
}`,jt=1024,Mt=96e6,Nt=2e3,Pt=(e,t)=>{let{w:n,h:r}=Ft(e,t);return`${e.key}|${e.spread}|${n}x${r}`};function Ft(e,t){let{hw:n,hh:r}=e.source??e,i=(n+e.spread)*2,a=(r+e.spread)*2,o=Math.min(2**Math.ceil(Math.log2(t)-1e-6),jt/Math.max(i,a));return{cssW:i,cssH:a,w:Math.max(2,Math.round(i*o)),h:Math.max(2,Math.round(a*o))}}var It=class{gl;entries=new Map;seed;flood;resolve;smooth;within;canvas=document.createElement(`canvas`);ctx=this.canvas.getContext(`2d`);fbo;scratch=new Map;idle=0;generated=0;constructor(e){this.gl=e,this.seed=xt(e,Tt,Et),this.flood=xt(e,Tt,Dt),this.resolve=xt(e,Tt,Ot),this.smooth=xt(e,Tt,kt),this.within=xt(e,Tt,At),this.fbo=e.createFramebuffer()}bytes=0;get(e,t){let n=Pt(e,t),r=this.entries.get(n);if(r)return this.entries.delete(n),this.entries.set(n,r),r.tex;let i=this.generate(e,t);return this.entries.set(n,i),this.bytes+=i.w*i.h*2,i.tex}missing(e,t){return[...new Map(e.map(e=>[Pt(e,t),e])).entries()].filter(([e])=>!this.entries.has(e)).map(([,e])=>e)}cost(e,t){let{w:n,h:r}=Ft(e,t);return n*r*(Math.ceil(Math.log2(Math.max(n,r)))+3)}trim(){for(let[e,t]of this.entries){if(this.bytes<=Mt)return;this.gl.deleteTexture(t.tex),this.entries.delete(e),this.bytes-=t.w*t.h*2}}working(e,t){let{gl:n}=this,r=2**Math.ceil(Math.log2(e)),i=2**Math.ceil(Math.log2(t)),a=r*4096+i;clearTimeout(this.idle),this.idle=window.setTimeout(()=>{for(let{a:e,b:t,raw:r}of this.scratch.values())for(let i of[e,t,r])n.deleteTexture(i);this.scratch.clear()},Nt);let o=this.scratch.get(a);if(o)return o;let s=(e,t)=>{let a=n.createTexture();return n.bindTexture(n.TEXTURE_2D,a),n.texStorage2D(n.TEXTURE_2D,1,e,r,i),q(n,t,t),a},c={a:s(n.RGBA16F,n.NEAREST),b:s(n.RGBA16F,n.NEAREST),raw:s(n.R16F,n.LINEAR)};return this.scratch.set(a,c),c}generate(e,t){let{gl:n,canvas:r,ctx:i}=this,{hw:a,hh:o}=e.source??e,{cssW:s,cssH:c,w:l,h:u}=Ft(e,t);r.width=l,r.height=u,i.setTransform(1,0,0,1,0,0),i.fillStyle=`#000`,i.fillRect(0,0,l,u),i.fillStyle=`#fff`,i.setTransform(l/s,0,0,u/c,l/s*e.spread,u/c*e.spread),i.save(),e.draw(i,a*2,o*2),i.restore();let d=n.createTexture();n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,d),q(n,n.NEAREST,n.NEAREST),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.texImage2D(n.TEXTURE_2D,0,n.R8,n.RED,n.UNSIGNED_BYTE,r);let f=this.working(l,u),{raw:p}=f,{a:m,b:h}=f;n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.drawBuffers([n.COLOR_ATTACHMENT0]),n.viewport(0,0,l,u),n.disable(n.BLEND),n.disable(n.SCISSOR_TEST);let g=e=>n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0);n.useProgram(this.seed.program),n.uniform1i(this.seed.u.uMask,0),n.bindTexture(n.TEXTURE_2D,d),g(m),n.drawArrays(n.TRIANGLE_STRIP,0,4),n.useProgram(this.flood.program),n.uniform1i(this.flood.u.uSeeds,0),n.uniform1i(this.flood.u.uMask,1),n.uniform2i(this.flood.u.uSize,l,u),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,d),n.activeTexture(n.TEXTURE0);let _=1<<Math.ceil(Math.log2(Math.max(l,u)));for(;_>=1;){_>>=1;let e=Math.max(_,1);if(n.uniform1i(this.flood.u.uStep,e),n.bindTexture(n.TEXTURE_2D,m),g(h),n.drawArrays(n.TRIANGLE_STRIP,0,4),[m,h]=[h,m],_===0)break}let v=n.createTexture();return n.bindTexture(n.TEXTURE_2D,v),n.texStorage2D(n.TEXTURE_2D,1,n.R16F,l,u),q(n,n.LINEAR,n.LINEAR),n.useProgram(this.resolve.program),n.uniform1i(this.resolve.u.uSeeds,0),n.uniform1i(this.resolve.u.uMask,1),n.uniform1f(this.resolve.u.uScale,l/s),n.bindTexture(n.TEXTURE_2D,m),g(p),n.drawArrays(n.TRIANGLE_STRIP,0,4),n.useProgram(this.smooth.program),n.uniform1i(this.smooth.u.uField,0),n.uniform1f(this.smooth.u.uScale,l/s),n.uniform2i(this.smooth.u.uSize,l,u),n.bindTexture(n.TEXTURE_2D,p),g(v),n.drawArrays(n.TRIANGLE_STRIP,0,4),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,null,0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.deleteTexture(d),this.generated++,e.within?this.cut({tex:v,w:l,h:u},this.generate({...e,draw:e.within.draw,within:void 0},t),e.within.steep):{tex:v,w:l,h:u}}cut(e,t,n){let{gl:r}=this,{w:i,h:a}=e,o=r.createTexture();return r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,o),r.texStorage2D(r.TEXTURE_2D,1,r.R16F,i,a),q(r,r.LINEAR,r.LINEAR),r.bindFramebuffer(r.FRAMEBUFFER,this.fbo),r.drawBuffers([r.COLOR_ATTACHMENT0]),r.viewport(0,0,i,a),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,o,0),r.useProgram(this.within.program),r.uniform1i(this.within.u.uField,0),r.uniform1i(this.within.u.uEdge,1),r.uniform1f(this.within.u.uSteep,n),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,t.tex),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,e.tex),r.drawArrays(r.TRIANGLE_STRIP,0,4),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,null,0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(e.tex),r.deleteTexture(t.tex),{tex:o,w:i,h:a}}read(e,t){let{gl:n}=this;this.get(e,t);let r=this.entries.get(Pt(e,t));n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,r.tex,0);let i=new Float32Array(r.w*r.h*4);n.readPixels(0,0,r.w,r.h,n.RGBA,n.FLOAT,i);let a=i.filter((e,t)=>t%4==0);return n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,null,0),n.bindFramebuffer(n.FRAMEBUFFER,null),{w:r.w,h:r.h,data:a}}},Lt=new Map,Rt={panels:[{at:[-.55,-.35],size:[.42,.8],soft:.16,power:1.25},{at:[.75,.3],size:[.16,.9],soft:.12,power:1},{at:[.05,-1.5],size:[1.3,.25],soft:.2,power:1.2}],dark:.1,glow:.3,tent:.35,camera:.7,lamp:[-.96,-3.15],power:1.15,soft:.05,sway:3.2,fill:.6,shadow:1.5,color:[1,1,1]};function zt(e,t){Lt.set(e,{...Rt,...t})}function Bt(e){return Lt.get(e)??Rt}var Vt={flashlight:{cone:.2,core:1.1,flood:.4,spill:.07,edge:.3,rings:.03,color:[1,.97,.9],power:1,hold:1,arm:.4,flicker:0,fluoresce:0},candle:{cone:1.15,core:0,flood:1,spill:0,edge:0,rings:0,color:[1,.55,.2],power:.55,hold:.3,arm:.85,flicker:.2,fluoresce:0},blacklight:{cone:.3,core:.3,flood:.5,spill:.03,edge:.35,rings:0,color:[.3,.1,1],power:.5,hold:.8,arm:.4,flicker:0,fluoresce:7}};zt(`studio`,{}),zt(`desk`,{panels:[{at:[-.8,-.9],size:[.22,.22],soft:.14,power:2.6}],dark:.02,glow:.04,tent:.22,lamp:[-1.5,-1.9],power:1.35,soft:.04,sway:1.8,fill:.5,shadow:1.5}),zt(`window`,{panels:[{at:[-1,-.2],size:[.55,1.2],soft:.3,power:1.5}],dark:.14,glow:.5,tent:.85,lamp:[-1.6,-.9],power:.7,soft:.28,sway:.5,fill:1.25,shadow:.65}),zt(`control`,{panels:[{at:[0,-2.4],size:[1.6,.06],soft:.3,power:.35},{at:[0,-3.4],size:[1.6,.06],soft:.3,power:.25}],dark:.005,glow:.01,tent:.06,camera:.9,lamp:[.2,-3.6],power:.75,soft:.22,sway:.4,fill:.35,shadow:1.2}),zt(`console`,{...Bt(`control`),lamp:[-1.3,-1.7],power:.95,soft:.06,fill:.3,shadow:1.4,glow:.015}),zt(`alert`,{...Bt(`control`),color:[1.6,.05,.02],power:.9}),zt(`blackout`,{...Bt(`control`),panels:[{at:[0,-2.4],size:[1.6,.06],soft:.3,power:.03}],power:.06,fill:.08,dark:.002,glow:0,shadow:.4}),zt(`outdoors`,{panels:[{at:[0,-1.1],size:[2.4,1.3],soft:.5,power:1.5}],dark:.4,glow:.7,tent:.75,camera:0,lamp:[-1.25,-2.4],power:1,soft:.1,sway:.5,fill:1.1,shadow:1});var Ht=`
vec2 oct(vec3 r){
  r/=abs(r.x)+abs(r.y)+abs(r.z);
  vec2 p=r.z>=0.?r.xy:(1.-abs(r.yx))*vec2(r.x>=0.?1.:-1.,r.y>=0.?1.:-1.);
  return p*.5+.5;
}
vec3 unoct(vec2 uv){
  vec2 p=uv*2.-1.;
  vec3 n=vec3(p,1.-abs(p.x)-abs(p.y));
  float t=max(-n.z,0.);
  n.x+=n.x>=0.?-t:t;
  n.y+=n.y>=0.?-t:t;
  return normalize(n);
}`,Ut=`
float radical(uint b){
  b=(b<<16u)|(b>>16u);
  b=((b&0x55555555u)<<1u)|((b&0xAAAAAAAAu)>>1u);
  b=((b&0x33333333u)<<2u)|((b&0xCCCCCCCCu)>>2u);
  b=((b&0x0F0F0F0Fu)<<4u)|((b&0xF0F0F0F0u)>>4u);
  b=((b&0x00FF00FFu)<<8u)|((b&0xFF00FF00u)>>8u);
  return float(b)*2.3283064365e-10;
}`,Wt=`#version 300 es
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  gl_Position=vec4(c*2.-1.,0.,1.);
}`,Gt=`#version 300 es
precision highp float;
out vec4 o;
uniform float uSize,uDark,uGlow,uTent,uCamera;
uniform vec2 uLens;
uniform int uPanels;
uniform vec4 uPanelAt[6];
uniform vec2 uPanelLight[6];
${Ht}
// Metal has no look of its own: it shows what it faces. So over the object hangs a dark room with big soft panels in
// it, turned so no edge lines up with anything built, and with nothing in them to recognise. A flat plate gets a run
// from bright to dark across it, as in a product photograph. Alpha keeps the plain even light that diffuse surfaces
// take, brightest overhead and to the top left, where the lamp is, so a matt thing is lit the same as it ever was.
// Blue is what a matt surface gets back as it turns away, from the tent and off the lit table.
// Green is the same room as clear glass sees it. Metal smears a panel however polished it is, so red's panels can fade
// out, but glass mirrors one with a hard edge and nothing else, and that edge is how an eye knows there's glass at all.
float panel(vec2 p,vec2 c,vec2 h,float s){
  vec2 d=abs(p-c)-h;
  return(1.-smoothstep(-s,s,d.x))*(1.-smoothstep(-s,s,d.y));
}
void main(){
  vec3 d=unoct(gl_FragCoord.xy/uSize);
  float t=smoothstep(.1,.97,dot(d,normalize(vec3(-.25,-.3,1.)))),l=uDark,g=uDark*.4;
  if(d.z>.02){
    vec2 p=d.xy/d.z,q=mat2(.929,.371,-.371,.929)*p;
    l+=uGlow*max(0.,1.-.3*length(p));
    for(int i=0;i<uPanels;i++){
      l+=panel(q,uPanelAt[i].xy,uPanelAt[i].zw,uPanelLight[i].x)*uPanelLight[i].y;
      g+=panel(q,uPanelAt[i].xy,uPanelAt[i].zw,uPanelLight[i].x*.04)*uPanelLight[i].y;
    }
    // Straight back along the view is the camera and the dark round it, which is what keeps a black dial black under glass.
    l*=1.-uCamera*(1.-smoothstep(.03,.32,length(p-uLens)));
  }
  // Round the sides and below the room is pale, as in a tent, so what turns away at an edge meets light and not black.
  float tent=uTent*(1.-smoothstep(.55,.95,d.z));
  o=vec4(l+tent,g+tent,uTent*max(1.-d.z,0.),mix(.1,.98,t));
}`,Kt=`#version 300 es
precision highp float;
precision highp int;
out vec4 o;
${Ut}
float V(float NoV,float NoL,float a2){
  return .5/max(NoL*sqrt(NoV*NoV*(1.-a2)+a2)+NoV*sqrt(NoL*NoL*(1.-a2)+a2),.0005);
}
void main(){
  vec2 uv=gl_FragCoord.xy/${64 .toFixed(1)};
  float NoV=max(uv.x,.02),a=max(uv.y*uv.y,.0016),a2=a*a;
  vec3 v=vec3(sqrt(1.-NoV*NoV),0.,NoV);
  vec2 sum=vec2(0.);
  const int N=1024;
  for(int i=0;i<N;i++){
    float u=(float(i)+.5)/float(N),phi=6.2831853*radical(uint(i));
    float c=sqrt((1.-u)/(1.+(a2-1.)*u)),s=sqrt(max(1.-c*c,0.));
    vec3 h=vec3(s*cos(phi),s*sin(phi),c),l=reflect(-v,h);
    float NoL=l.z,VoH=dot(v,h);
    if(NoL<=0.||VoH<=0.) continue;
    // What GGX weights by, once sampling it has cancelled its D.
    float g=V(NoV,NoL,a2)*4.*NoL*VoH/h.z,f=pow(1.-VoH,5.);
    sum+=vec2(1.-f,f)*g;
  }
  o=vec4(sum/float(N),0.,1.);
}`,qt=[.06,.12,.25,.5],Jt=.02,Yt=`#version 300 es
precision highp float;
precision highp int;
out vec4 o;
uniform sampler2D tRoom;
uniform float uSize,uTurn,uReach,uThin;
${Ht}
${Ut}
void main(){
  vec3 R=unoct(gl_FragCoord.xy/uSize),a=vec3(cos(uTurn),sin(uTurn),0.);
  vec3 U=normalize(a-R*dot(a,R)+vec3(0.,0.,1e-4)),W=cross(R,U);
  float sum=0.,weight=0.;
  const int N=96;
  for(int i=0;i<N;i++){
    float u=(float(i)+.5)/float(N),e=6.2831853*radical(uint(i));
    float phi=atan(uThin*sin(e),uReach*cos(e)),c=cos(phi),s=sin(phi);
    float t=sqrt(u/(1.-u)/(c*c/(uReach*uReach)+s*s/(uThin*uThin)));
    vec3 H=normalize(R+t*(U*c+W*s)),L=reflect(-R,H);
    float NoL=dot(R,L);
    if(NoL<=0.) continue;
    sum+=textureLod(tRoom,oct(L),1.).r*NoL;
    weight+=NoL;
  }
  o=vec4(sum/max(weight,.0001),0.,0.,1.);
}`,Xt=`#version 300 es
precision highp float;
precision highp int;
out vec4 o;
uniform sampler2D tRoom;
uniform float uRough,uSize,uSource;
uniform int uSamples;
const float PI=3.14159265;
${Ht}
${Ut}
void main(){
  vec3 N=unoct(gl_FragCoord.xy/uSize);
  vec3 up=abs(N.z)<.999?vec3(0.,0.,1.):vec3(1.,0.,0.);
  vec3 T=normalize(cross(up,N)),B=cross(N,T);
  float a=max(uRough*uRough,.002),a2=a*a;
  float texel=4.*PI/(uSource*uSource);
  vec4 sum=vec4(0.);
  float weight=0.;
  for(int i=0;i<uSamples;i++){
    float u=(float(i)+.5)/float(uSamples),v=radical(uint(i));
    float cosT=sqrt((1.-u)/(1.+(a2-1.)*u)),sinT=sqrt(max(1.-cosT*cosT,0.)),phi=6.2831853*v;
    vec3 H=normalize(T*sinT*cos(phi)+B*sinT*sin(phi)+N*cosT);
    vec3 L=reflect(-N,H);
    float NoL=dot(N,L);
    if(NoL<=0.) continue;
    // Taking a level that matches the sample's footprint keeps the softbox from turning to dots.
    float dn=cosT*cosT*(a2-1.)+1.,pdf=a2/(PI*dn*dn)*.25+.0001;
    float lod=.5*log2(1./(float(uSamples)*pdf)/texel)+1.;
    sum+=textureLod(tRoom,oct(L),max(lod,0.))*NoL;
    weight+=NoL;
  }
  o=sum/max(weight,.001);
}`,Zt=`#version 300 es
precision highp float;
out vec2 vUv;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  vUv=vec2(c.x,1.-c.y);
  gl_Position=vec4(c*2.-1.,0.,1.);
}`,Qt=[``,`albedo`,`height`,`normal`,`roughness`,`metal`,`emissive`,`occlusion`],$t=`
// Linear light to the screen. Hex colours are read with the same curve, so what comes in goes back out.
vec3 encode(vec3 c){return mix(12.92*c,1.055*pow(c,vec3(1./2.4))-.055,step(.0031308,c));}
vec3 decode(vec3 c){return mix(c/12.92,pow((c+.055)/1.055,vec3(2.4)),step(.04045,c));}
// Khronos PBR Neutral: colour stays as it is until it nears white, then only the brightest part bends. The toe
// is smaller than theirs, or a black part loses the faint sheen real black things have, and with it its shape.
vec3 neutral(vec3 c){
  const float K=.015,DES=.15,S=.8-K;
  float x=min(c.r,min(c.g,c.b)),f=x<2.*K?x-x*x/(4.*K):K;
  // Taking the same off every channel would turn anything pale muddy as the light on it went, so in the dark the whole
  // colour scales by the same toe, read from its brightest channel.
  float m=max(c.r,max(c.g,c.b)),g=m<2.*K?m*.25/K:1.-K/max(m,2.*K);
  c=mix(c*g,c-f,smoothstep(.03,.1,m));
  float p=max(c.r,max(c.g,c.b));
  if(p<S) return c;
  float d=1.-S,n=1.-d*d/(p+d-S);
  c*=n/p;
  return mix(c,vec3(n),1.-1./(DES*(p-n)+1.));
}`,en=`#version 300 es
precision highp float;
in vec2 vUv;
#ifdef BAKE
layout(location=0) out vec4 o;
layout(location=1) out vec4 oLand;
layout(location=2) out vec4 oSlope;
layout(location=3) out vec4 oRoom;
uniform bool uGlow;
const bool gLamp=false;
#elif defined(HOLD)
// Layers of a picture held for what glows: 0 all the rest and final alpha, 1 landing and slope, 2 what it takes of a glow.
layout(location=0) out vec4 o;
layout(location=1) out vec4 oLand;
layout(location=2) out vec4 oTake;
vec4 gTake=vec4(0.);
const bool gLamp=true;
#else
out vec4 o;
const bool gLamp=true;
#endif
#ifdef QUICK
uniform sampler2D tShadow;
uniform bool uGlow;
bool gBaked=false;
vec3 gBake,gBakeRoom;
#else
const bool gBaked=false;
#endif
#if defined(QUICK)||defined(SHADOWS)||defined(EMIT)
// Layers of a bake: 0 what stays, 1 landing and slope, 2 two more slopes, 3 what the room gives.
uniform highp sampler2DArray tBake;
#endif
uniform sampler2D tA,tH,tS,tE,tRoom,tC,tO,tTop,tM,tD,tU,tDFG;
#ifdef SPLIT
uniform sampler2D tN;
#endif
// What's drawn is kept only as far as it's read, and a shadow falls further, so the maps are a box inside the canvas: this takes a place on the canvas to it.
uniform vec4 uMap;
#define AT(uv) ((uv)*uMap.xy+uMap.zw)
uniform highp sampler2DArray tBrush;
uniform vec2 uCss,uShift;
// The whole canvas's edges, css px, in this one's: the canvas itself unless only part of the device is drawn.
uniform vec4 uFrame;
uniform vec4 uBody;
uniform float uDpr,uPeak,uTall,uFace,uLift;
// A body turning over: how much a face stretches to fill what it's narrowed to on screen, less than nothing on the face turned away, and how far below the face it turns about.
uniform vec2 uSpin;
// The sine and cosine of how far it's turned. The room stays where it is, so what a turned surface sees is looked up back in the room.
uniform vec2 uRound;
// How far either way from the middle the body is this face's, mm, and whether another face meets it at its left and right ends.
uniform vec3 uOwn;
// A wall looks out past the plane of the room, and the map of it is seamed behind. Nothing's there to see but the room again.
vec3 inRoom(vec3 r){
  vec3 o=vec3(r.x*uRound.y-r.z*uRound.x,r.y,r.x*uRound.x+r.z*uRound.y);
  if(uSpin.y>0.) o.z=abs(o.z);
  return o;
}
uniform vec3 uKey,uCam,uSky;
// A torch: where it stands and how strong, its axis, its beam (core, flood, where the edge starts, spill), its colour,
// and half its angle, how far off it's held, its reflector's rings and what it makes fluoresce.
uniform vec4 uTorch,uBeam,uCone;
uniform vec3 uAim,uTint;
// What else lights it for a while, a flash or a flame: where, mm, and the square of half its size, and its colour times strength.
uniform int uPoints;
uniform vec4 uPoint[4];
uniform vec3 uPointColor[4];
uniform float uSplit;
uniform float uRoom,uLamp,uLampSoft,uLampHead,uFill,uPageShade;
// The colour of the room's light and its lamp, linear. What glows by itself keeps its own.
uniform vec3 uRoomColor;
uniform int uDebug,uPanes;
// For the stage's camera: light as it is, scaled for the exposure white is shown at, which the camera shows and tone maps itself.
uniform bool uLinear;
uniform float uPane[144];
// A flat white under the lamp and the room comes to 1 at this exposure, so a colour comes out as it was written.
const float MM=.25,PI=3.14159265,EXPOSURE=.62;
vec2 gUv;
// What a bake holds for a pixel, handed to shade() in place of working it out.
vec2 gN=vec2(0.),gNs=vec2(0.),gNd=vec2(0.);
float gAo=1.;

// Height to take a slope from. In half floats relief is kept apart from it, or it would step.
float rise(vec2 uv,float l){
#ifdef RELIEF
  return textureLod(tH,AT(uv),l).r+textureLod(tD,AT(uv),l).r;
#else
  return textureLod(tH,AT(uv),l).r;
#endif
}

float D(float NoH,float ToH,float BoH,float at,float ab){
  float a2=at*ab;
  vec3 f=vec3(ab*ToH,at*BoH,a2*NoH);
  float w=a2/dot(f,f);
  return a2*w*w/PI;
}
float V(float NoV,float NoL,float a){
  float a2=a*a;
  return .5/max(NoL*sqrt(NoV*NoV*(1.-a2)+a2)+NoV*sqrt(NoL*NoL*(1.-a2)+a2),.0005);
}
${Ht}
// How much of the room's light there is here, which a torch adds to with what it scatters off the walls.
vec3 gAmbient=vec3(1.);
vec3 env(vec3 r,float ro){return textureLod(tRoom,oct(normalize(inRoom(r))),ro*${6 .toFixed(1)}).rrr*gAmbient;}
// The room as a clear coat mirrors it. Fill is what the room does for matt things, and a mirror shows the panels as they are.
vec3 mirrored(vec3 r,float ro){return textureLod(tRoom,oct(normalize(inRoom(r))),ro*${6 .toFixed(1)}).g*gAmbient/max(uFill,.1);}
// The plain light that matt surfaces take.
vec3 plain(vec3 r,float ro){return textureLod(tRoom,oct(normalize(inRoom(r))),ro*${6 .toFixed(1)}).a*gAmbient;}
// The room's panels hang over the object at about its own size, so a flat plate sees across them, whatever it is.
vec3 facing(vec3 r,vec3 P){return vec3(r.xy+(P.xy-uBody.xy*MM)/(2.4*max(uBody.z,uBody.w)*MM)*r.z,r.z);}
// The room through a lobe stretched along b, as far as reach, and as wide as thin the other way.
vec3 brushed(vec3 r,vec2 b,float reach,float thin){
  float t=fract(atan(b.y,b.x)/PI)*${8 .toFixed(1)},l=floor(t),m=clamp(log2(reach/${qt[0].toFixed(2)}),0.,${(qt.length-1.01).toFixed(2)}),q=floor(m);
  float lod=clamp(log2(thin/${Jt.toFixed(2)}),0.,${3 .toFixed(1)}),f=t-l,g=mod(l+1.,${8 .toFixed(1)});
  vec2 u=oct(normalize(inRoom(r)));
  float x=mix(textureLod(tBrush,vec3(u,q*${8 .toFixed(1)}+l),lod).r,textureLod(tBrush,vec3(u,q*${8 .toFixed(1)}+g),lod).r,f);
  float y=mix(textureLod(tBrush,vec3(u,(q+1.)*${8 .toFixed(1)}+l),lod).r,textureLod(tBrush,vec3(u,(q+1.)*${8 .toFixed(1)}+g),lod).r,f);
  return mix(x,y,m-q)*gAmbient;
}
${$t}
float rnd(vec2 p){return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715))));}
// How far above what's here a height is. Under something standing clear counts as above it too, by as far as it's below.
float clearOf(vec2 uv,float z,float lod){
  float gap=z-textureLod(tH,AT(uv),lod).r;
  return gap<0.?max(gap,textureLod(tU,AT(uv),0.).r-z):gap;
}
float grazes(vec2 uv,float h0,vec3 L,float t,float soft){
  vec2 size=uCss*MM;
  vec3 q=vec3(uv*size,h0+.03)+L*t;
  return clamp(.5+clearOf(q.xy/size,q.z,0.)/(t*soft+.05),0.,1.);
}
float shadow(vec2 uv,float h0,vec3 L,float soft,float stride){
  vec2 size=uCss*MM;
  // Steps land the same way from pixel to pixel, and scallop an edge. Each pixel steps a little
  // apart, which leaves a grain too fine to see. Plain noise, as rnd falls into diagonal lines.
  vec2 at=gl_FragCoord.xy+uShift;
  float k=1.,t=.25,near=0.,j=fract(sin(dot(at,vec2(12.9898,78.233)))*43758.5453),top=textureLod(tTop,uv,0.).g*uTall;
  // A low thing's shadow is short, and a step as long as a tall thing's would fray its edge. The steps there are run out
  // about 37mm along at the longest of these, so a ray that has further to go past whatever stands here takes longer ones.
  float clear=(top-h0)/max(L.z,.1),most=max(min(1.6,clear*.07),(clear-21.)*.1);
  for(int i=0;i<36;i++){
    // Steps stop growing, or a small tall object falls between them and casts a row of dots.
    float step=min(t*.22,most)*stride,lod=clamp(log2(step*4.*uDpr)-1.,0.,3.);
    vec3 q=vec3(uv*size,h0+.03)+L*(t+step*j);
    if(q.z>top) break;
    float was=clamp(.5+clearOf(q.xy/size,q.z,lod)/(t*soft+.05),0.,1.);
    if(was<k){k=was;near=t+step*j;}
    if(k<.01) break;
    t+=step;
  }
  // Steps that long land anywhere near an edge, and from pixel to pixel that's a torn line. So look again where the ray came closest.
  if(most>1.6&&k>.01) for(float s=most*.5;s>.5;s*=.5){
    float a=near>s?grazes(uv,h0,L,near-s,soft):1.,b=grazes(uv,h0,L,near+s,soft);
    if(a<k){k=a;near-=s;}
    if(b<k){k=b;near+=s;}
  }
  return k*k*(3.-2.*k);
}
// Light off the top of a clear film meets light off the metal below it. Thickness decides which
// wavelengths cancel, so colours run straw, purple, blue as a film grows, and slide with the angle.
float gFilm=0.;
// Rulings a little over a micron apart send each wavelength off at its own angle, so which colour reaches the eye depends on where the lamp is.
float gGrate=0.,gPitch=0.;
vec3 gRuled=vec3(0.);
vec3 spectrum(float nm){
  vec3 d=(nm-vec3(600.,540.,455.))/vec3(52.,44.,36.);
  return exp(-d*d);
}
vec3 thin(float c,vec3 f0){
  const float N=1.9;
  float path=gFilm*800.*sqrt(1.-(1.-c*c)/(N*N));
  float r1=mix(.31,1.,pow(1.-c,5.));
  vec3 r2=sqrt(f0),b=2.*r1*r2;
  // Three narrow bands per channel, or colour stays neon where real films wash out.
  vec3 w=(cos(6.2832*path/vec3(640.,540.,460.))+cos(6.2832*path/vec3(605.,515.,440.))+cos(6.2832*path/vec3(675.,565.,480.)))/3.;
  return mix(f0,(r1*r1+r2*r2+b*w)/(1.+r1*r1*r2*r2+b*w),smoothstep(0.,.03,gFilm));
}

// The key is a big soft lamp, not a point, so what a surface mirrors of it is as wide as it looks from there.
float gSoft=0.,gHead=0.;
// What the colour of a surface sees, when that isn't what its shine sees.
vec3 gColor=vec3(0.);
// How much of a surface is pile: fibres standing up, which hide the face under them and trap what gets between them.
float gPile=0.;
vec3 lobe(vec3 n,vec3 v,vec3 l,vec3 rad,vec3 dif,vec3 f0,float rough,float an,vec3 T,vec3 B){
  float NoL=dot(n,l);
  if(NoL<=0.) return vec3(0.);
  vec3 h=normalize(v+l);
  float NoV=max(dot(n,v),.02),NoH=max(dot(n,h),0.),VoH=max(dot(v,h),0.);
  float a=min(max(rough*rough,.0016)+gSoft,1.);
  float at=max(a*(1.-an),.0008),ab=max(a*(1.+an),.0008);
  vec3 f1=gFilm>0.?thin(VoH,f0):f0;
  vec3 F=f1+(1.-f1)*pow(1.-VoH,5.);
  // The grain runs where the surface's does, but square to this normal. A pane over a textured face has a normal of its
  // own, and a frame a few thousandths off it, far less than a sharp lobe is wide, would crumple its glint like foil.
  T=normalize(T-n*dot(T,n));B=cross(n,T);
  vec3 spec=F*D(NoH,dot(T,h),dot(B,h),at,ab)*V(NoV,NoL,a)*(1.-gPile);
  // A wide lamp is a dimmer one seen from a smooth surface: the room's panels carry what it would have added.
  if(gSoft>0.){float k=min((max(rough*rough,.0016)+.04)/a,1.);spec*=k*k;}
  // The viewer's own head is in the way of a lamp right behind it, so a flat face never takes the whole of it.
  if(gHead>0.) spec*=1.-gHead*smoothstep(.97,1.,n.z)*smoothstep(.9,.99,h.z);
  // A band of colour lies across the rulings and slides along them as the lamp goes round. Past it the foil is plain foil.
  if(gGrate>0.){
    float at=dot(h,gRuled)*5.+gPitch,band=.5+.5*cos(at*6.283);
    spec+=gGrate*mix(f0,vec3(1.),.4)*mix(vec3(1.),spectrum(400.+300.*abs(fract(at*2.)*2.-1.)),.6)*band*band*.3;
  }
  return (dif/PI*(1.-F)*(gColor.z>0.?max(dot(gColor,l),0.):NoL)+spec*NoL)*rad;
}
// One tap of a coarse mip shows its texels as blocks, and its ramp ends dead at a texel edge,
// which gamma turns into a visible line on a dark panel. So glow is taken from several levels.
// The four taps also say which side the light comes from, kept in gToward.
vec2 gToward;
vec3 wide(float lod,float k){
  vec2 o=exp2(lod)*.5/vec2(textureSize(tE,0));
  vec3 a=textureLod(tE,gUv+o,lod).rgb,b=textureLod(tE,gUv-o,lod).rgb,c=textureLod(tE,gUv+vec2(o.x,-o.y),lod).rgb,d=textureLod(tE,gUv+vec2(-o.x,o.y),lod).rgb;
  const vec3 Y=vec3(.3,.6,.1);
  float l=dot(a,Y),m=dot(b,Y),p=dot(c,Y),q=dot(d,Y);
  gToward+=vec2(l+p-m-q,l+q-m-p)*k;
  return(a+b+c+d)*.25;
}

// What glows, and what its glow lands on, which takes it by colour and by how it faces. It changes from frame to frame
// while all else stands still, so it has to be workable from only these. A coat doesn't reach it: it comes from under one.
vec3 gE=vec3(0.);
// How much of a glow from this far off, mm, lands on a surface at height z facing n. A glowing face, a screen or a lit cap,
// gives its light up out of its own plane: what's level with it or below it can't see it, like the panel round a lit key,
// and a flat top above it faces away. What takes it is what faces it from above its plane, the wall of a bezel over a
// screen or the side of a knob. The glow there is taken to be as high as what's there on average, which is the glowing
// face itself where that fills the place, and lower where it doesn't, so it errs towards less.
float faces(vec3 n,vec2 toward,float z,float lod,float far){
  float c=textureLod(tA,AT(gUv),lod).a;
  float dz=z-textureLod(tH,AT(gUv),lod).r/max(c,.25),R=sqrt(far*far+dz*dz);
  return max(dz,0.)/R*max(dot(n,vec3(toward*far,-dz))/R,0.);
}
vec3 glow(vec3 n,float clean,vec3 take){
  float lodS=log2(uDpr);
  gE=textureLod(tE,gUv,0.).rgb*4.*clean;
  gToward=vec2(0.);
  vec3 a=textureLod(tE,gUv,1.6+lodS).rgb*.7,b=wide(3.2+lodS,1.5)*1.5,c=wide(4.6+lodS,1.7)*1.7,d=wide(6.+lodS,1.2)*1.2,e=textureLod(tE,gUv,7.3+lodS).rgb*.8;
  // Exposure is for what the lamps light. What makes its own light doesn't go through it.
  if(dot(a+b+c+d+e,vec3(1.))<.0001) return gE/EXPOSURE;
  // Each size is the glow about half its width away, which is how far off it's taken to be.
  float z=textureLod(tH,AT(gUv),0.).r/max(textureLod(tA,AT(gUv),0.).a,.25);
  vec2 t=gToward/max(length(gToward),1e-6);
  vec3 spill=(a*faces(n,t,z,1.6+lodS,exp2(1.6)*MM*.5)+b*faces(n,t,z,3.2+lodS,exp2(3.2)*MM*.5)+c*faces(n,t,z,4.6+lodS,exp2(4.6)*MM*.5)
    +d*faces(n,t,z,6.+lodS,exp2(6.)*MM*.5)+e*faces(n,t,z,7.3+lodS,exp2(7.3)*MM*.5))*4.;
  return gE/EXPOSURE+spill*take;
}

// How much light reaches where the ray landed, if that's on a wall with something standing on it.
float gNear=1.;
// The ray went on under what stands clear and reached the page, so that's what it landed on, whatever the texel holds.
bool gGround=false;
// A wall has no texels of its own, so nothing can darken it. But the ray knows how deep it landed, so it can tell how far
// that is from what stands on the wall, the next texels along, and that's a contact shadow that needs no drawing.
float contact(vec2 uv,float z,vec2 du){
  float far=length(du*uCss),top=textureLod(tH,AT(uv),0.).r;
  if(far<.001||top-z<1.) return 1.;
  vec2 q=uv-du/far*2.;
  float low=textureLod(tU,AT(q),0.).r;
  if(low<1.||top-textureLod(tH,AT(q),0.).r<1.) return 1.;
  float off=max(max(low-z,z-textureLod(tH,AT(q),0.).r),0.);
  return mix(.3,1.,smoothstep(0.,5.,off));
}

// Halves the last step until it finds where the ray goes in.
vec2 enters(vec2 uv,float z,vec2 du,float dz){
  float k=.5,s=.25;
  for(int i=0;i<5;i++){
    float zk=z+dz*(1.-k);
    vec2 q=uv-du*(1.-k);
    k+=zk<=textureLod(tH,AT(q),0.).r&&zk>textureLod(tU,AT(q),0.).r?-s:s;
    s*=.5;
  }
  return uv-du*(1.-k);
}

// Follows the view ray down through the height until it lands, so a tall part leans and its
// side comes into view. A pixel is one texel of travel, so a head-on view takes few steps.
// Whether a ray on a turning body met it, which makes what it landed on solid however thin the edge of the picture is there, how high, and whether that was on a wall.
bool gHit=false,gWall=false;
// How far a wall is seen as a side of its own, square on, and not as the edge of the top beside it. A turn eases into that, as it eases out of the view's lean.
float gSide=0.;
// Turned away, the ray came in under something standing clear, so what it sees is the side of that facing down: the top the other way up.
bool gUnder=false;
float gZ=0.;
vec2 gFace=vec2(0.);
// A body turning over has two faces or more and a plate holds one, so each draws the part of the body nearer it than any other face.
// Front and back split at the plane through the middle, and a side takes what's nearer it than either, out to the diagonals of the box.
// The face that's up takes a ray from its top down. The first thing it goes into is what it sees, and it's only this face's if it's this face's part.
// One that reaches the plane has missed this half, and the face turned away takes it from there up to its own top. So what stands on any face
// comes into view as it should, and none reads another's textures.
vec2 across(vec2 s,vec2 slope,vec2 size){
  float mid=uBody.x*MM/size.x,plane=uFace-uSpin.y,sn=uRound.x,cs=uRound.y,M=uBody.x*MM;
  // Part of the slope is only the viewer stepped round to show the turn. What's left is the view's own lean, as a point's shift for how high it stands in the room.
  float t=sn/cs*uCam.z/(uCam.z-uFace),w=min(abs(sn)*4.,1.);
  vec2 lean=slope-vec2(-t,0.);
  // Across, the lean eases out over the first few degrees, so a face is narrowed by the turn alone and goes edge on at a right angle, with neither end of a side
  // wider than the other. Up and down it's the one lean through the middle, which is no lean on a side seen square.
  lean=mix(lean,vec2(0.,(uBody.y*MM-uCam.y)/(uCam.z-uFace)),w);
  // Turned, a point on the plane lands further from the middle than the pixel looking at it.
  s.x=mid+(s.x-mid)*uSpin.x;
  // Where a point at z on this ray is across the face: a straight line in z, solved with its lean, which goes by its height in the room and so by where it is across.
  // At rest that's the ray as land() takes it, so a turn settling down hands over without a jump.
  float k=lean.x/cs,D=1.+k*sn,A=(s.x*size.x+k*(uSpin.y+M*sn))/D,B=(t-lean.x)/D;
  bool away=cs<0.;
  gGround=true;
  // Each half runs a pixel or so past the plane into the other's, where both are the same side wall. Stopping dead on it,
  // the two edges meet with a sliver of page between them.
  // A side's own ground is inside the body, where there's nothing to meet, so no ray goes down to it.
  float tol=1.5*MM/uDpr,lo=max((uOwn.y*uOwn.z>0.?max(plane,uFace-uOwn.x):plane)-tol,tol),hi=uPeak;
  // Nearly edge on a ray crosses the whole picture in a few mm of height, so all it can use is the stretch that's over it. Lugs and the like stand past the body.
  if(abs(B)>.0005){
    float a=plane-A/B,b=plane+(size.x-A)/B;
    hi=min(hi,max(a,b));
    lo=max(lo,min(a,b));
  }
  if(hi<=lo) return s;
  // Up and down, what moves a point is how high it stands in the room, and turned that's along the face as much as off it.
  // Both faces say the same height for the same point, so nothing jumps as one hands over to the other edge on.
  #define ACROSS(z) ((A+B*((z)-plane))/size.x)
  #define ALONG(z) vec2(ACROSS(z),s.y+lean.y*(uSpin.y-(ACROSS(z)-mid)*size.x*sn-((z)-plane)*cs)/size.y)
  // Coming down, a step that went right through something thin still sees it, by where it was before. Going up only sees what a step lands in,
  // so it takes no more than half a mm at a time.
  // Edge on, a ray runs the length of the face at one height, and long strides catch a thin rim on one row and miss it on the next.
  // That's only the last moment of a turn and the picture it lands on, so it can take the steps. Going round, the strides are short enough for what's seen in passing.
  int n=int(clamp(max(ceil(length(vec2(B,lean.y))*(hi-lo)/MM*min(uDpr,3.)),away?ceil((hi-lo)*2.):0.),1.,abs(cs)<.006?512.:96.));
  float dz=(hi-lo)/float(n)*(away?1.:-1.),z=away?lo:hi;
  // Inside is under the top and over whatever is under that, so something standing clear has air beneath it.
  #define INSIDE(z,uv) ((z)<=textureLod(tH,AT(uv),0.).r&&(z)>textureLod(tU,AT(uv),0.).r)
  // Starting inside the body, the ray was the other half's.
  if(INSIDE(z,ALONG(z))) return s;
  // Toward an end that meets another face, what's nearer that face is that face's, and so is all that's past the end. What stands clear of the body, as lugs do, is front and back's.
  #define OWNED(z,uv) ((z)>=(textureLod(tU,AT(uv),0.).r>0.?plane:max(plane,OWNS(ACROSS(z)*size.x-M)))-tol)
  #define OWNS(dx) ((dx<0.?uOwn.y:uOwn.z)>0.?uFace-uOwn.x+abs(dx):plane)
  for(int i=0;i<n;i++){
    float a=z;
    z+=dz;
    vec2 uv=ALONG(z);
    // Coming down, a ray lands on a top. Going up from the middle, it comes in under whatever is there, the near side of it from the face turned away.
    if(away?INSIDE(z,uv):z<=textureLod(tH,AT(uv),0.).r&&a>textureLod(tU,AT(uv),0.).r){
      // A step is up to half a mm across a wall, and where it lands in the wall's few texels shows as ripples. So halve it down.
      float b=z;
      for(int k=0;k<6;k++){
        float m=(a+b)*.5;
        if(away?!INSIDE(m,ALONG(m)):m>textureLod(tH,AT(ALONG(m)),0.).r) a=m;else b=m;
      }
      uv=ALONG(b);
      if(!OWNED(b,uv)) return s;
      gUnder=away&&textureLod(tU,AT(uv),0.).r>0.;
      gGround=false;
      gHit=true;
      gZ=b;
      // Bisected, it sits right on the height, so what says it's a wall is how fast the height falls either side of it.
      vec2 e=1./(uCss*uDpr);
      gWall=abs(textureLod(tH,AT(uv-vec2(e.x,0.)),0.).r-textureLod(tH,AT(uv+vec2(e.x,0.)),0.).r)+abs(textureLod(tH,AT(uv-vec2(0.,e.y)),0.).r-textureLod(tH,AT(uv+vec2(0.,e.y)),0.).r)>6.*MM/uDpr;
      if(gWall){
        gSide=w;
        // Which way it faces is which way the height falls away, taken wide enough that where in its few texels a ray landed doesn't show.
        float l=2.+log2(uDpr);
        vec2 w=e*exp2(l)*1.5,g=vec2(rise(uv-vec2(w.x,0.),l)-rise(uv+vec2(w.x,0.),l),rise(uv-vec2(0.,w.y),l)-rise(uv+vec2(0.,w.y),l));
        gFace=g/max(length(g),.001);
        // A wall has no texels of its own, and what it's made of is what stands at the top of it.
        uv-=gFace*.75*w/size;
      }
      return uv;
    }
  }
  return s;
}

vec2 land(vec2 s){
  gHit=gWall=gUnder=false;
  gSide=0.;
  gNear=1.;
  gGround=false;
  vec2 size=uCss*MM,at=s*size;
  vec2 slope=(at-uCam.xy)/(uCam.z-uFace);
  if(uSpin.y>0.) return across(s,slope,size);
  // It can only land on what stands near it, so it starts above that, not above the whole device.
  float top=length(slope)*uPeak/MM<48.?textureLod(tTop,s,0.).r*uTall:uPeak;
  int n=int(clamp(ceil(length(slope)*top/MM*min(uDpr,3.)),1.,96.));
  float dz=top/float(n),z=top;
  vec2 uv=s+slope*(uFace-top)/size,du=slope*dz/size;
  float was=z-textureLod(tH,AT(uv),0.).r;
  for(int i=0;i<n;i++){
    z-=dz;
    uv+=du;
    float gap=z-textureLod(tH,AT(uv),0.).r;
    // One that was already below an underside goes on under it, so only a ray that lands looks there.
    if(gap<=0.&&z+dz>textureLod(tU,AT(uv),0.).r){
      gNear=contact(uv,z,du);
      // Across a wall the two ends say nothing about where it stood, and guessing leaves a stair round anything thin.
      if(was-gap>dz*2.) return enters(uv,z,du,dz);
      return uv-du*(1.-was/max(was-gap,.0001));
    }
    was=max(gap,0.);
  }
  // Past what stands clear and on down to the ground, where the texel is still the part's and showing it would lay a copy on the page.
  gGround=textureLod(tU,AT(uv),0.).r>0.;
  return uv;
}

// How far off a torch's axis a point is. 1 is the edge of its beam.
float offAxis(vec3 P){return acos(clamp(dot(normalize(P-uTorch.xyz),uAim),-1.,1.))/uCone.x;}
// What lands there from a torch: a hot core, a flood that eases off towards the edge with the reflector's rings in it,
// and a wide spill past that from the bulb itself. Nearer the torch is brighter, so a pool thrown far is fainter.
float pool(vec3 P,float x){
  float near=uCone.y/length(P-uTorch.xyz),spill=1.-smoothstep(.6,2.6,x);
  return (uBeam.x*exp(-x*x*9.)+uBeam.y*(1.-smoothstep(uBeam.z,1.,x))*(1.+uCone.z*sin(x*26.))+uBeam.w*spill*spill)*near*near*uTorch.w;
}

// Where the lamps stand as a surface and the page see them, kept above the horizon a soft light would dip under.
vec3 keyFrom(vec3 P){
  vec3 L=normalize(uKey-P);
  // Turned, a lamp really can be down at the horizon, and behind.
  if(uSpin.y>0.) return L;
  return normalize(vec3(L.xy,max(L.z,.6*length(L.xy))));
}
vec3 pageFrom(vec2 uv){
  vec3 L=normalize((uTorch.w>0.&&uRoom<.5?uTorch.xyz:uKey)-vec3(uv*uCss*MM,0.));
  return normalize(vec3(L.xy,max(L.z,.75*length(L.xy))));
}

// A bake keeps the room's share apart, because a torch adds to the room and so it's scaled every frame.
#ifdef BAKE
vec3 gRoom=vec3(0.);
#define ROOM gRoom
#else
#define ROOM rgb
#endif

vec4 shade(vec2 uv){
  gUv=uv;
  gFilm=gGrate=0.;
  float lodS=log2(uDpr);
  // What it has to go on is one line of the top, and read sharp that would streak the length of it.
  float wall=(1.+lodS)*gSide;
  vec4 A=textureLod(tA,AT(gUv),wall);
  float cov=gGround?0.:gHit?1.:A.a;

  // The page is a plane at z=0, so the device shadows it with the same march.
  float shA=0.;
  // Most of the margin is too far off for any shadow to reach, and the heights around it say so.
  if(gLamp&&uSpin.x>0.&&uLift<uFace&&cov<.996&&textureLod(tTop,gUv,0.).g>0.){
#ifdef QUICK
    float pk=textureLod(tShadow,vec2(vUv.x,1.-vUv.y),0.).g;
#else
    // A deep body keeps its shadow short: its lower part throws none, as if the page rose to meet it.
    float pk=shadow(gUv,uLift,pageFrom(gUv),.6,1.);
#endif
    // What stands 1mm or more crowds the light out. Print, and a slot in the surface, stand for nothing.
    float blur=3.2+lodS,blur2=4.8+lodS;
    // Measured against the body, or a deep one's blurred height passes 1mm far out and the crowding ends in a hard line.
    float deep=4./max(uFace,4.),amb=min(max(textureLod(tH,AT(gUv),blur).r*deep,0.),textureLod(tA,AT(gUv),blur).a),amb2=min(max(textureLod(tH,AT(gUv),blur2).r*deep,0.),textureLod(tA,AT(gUv),blur2).a);
    vec2 at=gUv*uCss,toEdge=min(at-uFrame.xy,uFrame.zw-at);
    float fade=smoothstep(0.,36.,min(toEdge.x,toEdge.y));
    shA=(1.-(1.-min((1.-pk)*.38*uPageShade,.9))*(1.-amb*.3)*(1.-amb2*.22))*fade*mix(.45,1.,smoothstep(0.,.5,uRoom));
    // A body turning over lifts off the page, and comes back down.
    if(uSpin.y>0.) shA*=uRound.y*uRound.y;
    // That's how much light is lost. The page beneath is blended as stored, so this is the alpha that loses that much.
    shA=1.-pow(1.-shA,1./2.2);
  }

  vec3 rgb=vec3(0.);
  if(cov>.004){
    vec4 H=textureLod(tH,AT(gUv),wall),S=textureLod(tS,AT(gUv),wall);
    float h=gHit?gZ:H.r/max(A.a,.25);
    vec3 alb=A.rgb/max(A.a,.001);
    float rough=clamp(S.r/max(S.a,.001),.03,1.),mf=S.g/max(S.a,.001)*2.,metal=clamp(mf,0.,1.),coat=S.b/max(S.a,.001);
    // Pure metal rounds to just over 1 here, and that speck of film would tint a dark metal.
    gFilm=clamp(mf-1.004,0.,1.);
    // Handling changes how smooth a surface is, not its colour, so it only shows in a highlight.
    vec4 C=textureLod(tC,AT(gUv),wall);
    vec4 M=textureLod(tM,AT(gUv),wall);
    float ma=max(M.a,.001),coatRough=M.r/ma<.01?.02:max(M.r/ma,.09),sheen=coat>.01||metal>.5?0.:M.r/ma,scatter=M.g/ma,takes=M.b/ma;
    // Rubber's sheen is its own face at a glance. Cloth's comes from a pile, and a pile has no face to shine: what it sends
    // back is its sheen and its colour, nothing more, as in Filament's cloth model. So flock is the blackest thing there is.
    gPile=smoothstep(.6,.8,sheen);
    // Only what can hold a mark takes one. Coffee has no scratches.
    C.rgb*=takes;C.a=mix(.5,C.a,takes);
    float gloss=1.-smoothstep(.12,.72,rough),mark=(C.r*.6+C.b*.55)*gloss;
    rough=clamp(rough*(1.+(C.a-.5)*.3)+mark*.2,.03,1.);
    // A scratch goes through a lacquer. It doesn't go through a pane, which is a thing apart.
    coat*=1.-min(mark*1.1,.85);
    // Dust sits on top of everything, and it is pale whatever is under it.
    alb=mix(alb,vec3(.6,.58,.55),C.g);
    metal*=1.-C.g;
    rough=mix(rough,.9,C.g);
    coat*=1.-C.g;
#ifdef SPLIT
    vec4 N=textureLod(tN,AT(gUv),wall);
    vec2 tv=(N.rg-.5*N.a)*4./max(N.a,.001);
#else
    vec2 tv=H.gb/max(H.a,.001);
#endif
    // A panel's mark is 2, and a real tangent at most 1, with room between for eight bits to round.
    float panel=step(1.5,tv.x);
    tv*=1.-panel;
    float an=clamp(length(tv),0.,.92);
    vec3 P=vec3(gUv*uCss*MM,h);
    // No metal scatters, so on one this says how hard it's ruled. The band is one wide one every 45mm or so, in real size, and wanders a little.
    if(metal>.5&&scatter>0.){
      gGrate=scatter;
      gRuled=vec3(.8,.6,0.);
      gPitch=dot(P.xy,gRuled.xy)/45.+.05*sin(P.y*.11-P.x*.07);
      scatter=0.;
    }

    vec2 e=1./(uCss*uDpr);
    float mmp=MM/uDpr;
    vec3 n,ns,nd;
    if(gBaked){
      n=normalize(vec3(gN,1.));
      ns=normalize(vec3(gNs,1.));
      nd=normalize(vec3(gNd,1.));
    }else{
    n=normalize(vec3(
      (rise(gUv-vec2(e.x,0.),0.)-rise(gUv+vec2(e.x,0.),0.))/(2.*mmp),
      (rise(gUv-vec2(0.,e.y),0.)-rise(gUv+vec2(0.,e.y),0.))/(2.*mmp),
      1.));
    // A clear coat levels the texture under it, and a sharp reflection would show it as a weave.
    ns=n;
    if(rough<.34||coat>.01){
      float lod=lodS+.5;
      vec2 es=e*exp2(lod);
      // Corners, from a level finer than the spacing, or the level's own blocks show in the slope.
      float l=max(lod-1.5,0.),a=rise(gUv+vec2(-es.x,-es.y),l),b=rise(gUv+vec2(es.x,-es.y),l);
      float c=rise(gUv+vec2(-es.x,es.y),l),d=rise(gUv+vec2(es.x,es.y),l);
      ns=normalize(vec3(vec2(a+c-b-d,a+b-c-d)/(4.*mmp*exp2(lod)),1.));
      // A real edge is far steeper than texture, and a wide slope only blurs it. Near a step the blur would lean
      // a band inside its edge, a bevel that isn't there, so wherever the corners straddle one it's left out.
      float stands=max(a,max(b,max(c,d)))-min(a,min(b,min(c,d)));
      ns=normalize(mix(ns,n,max(smoothstep(.16,.36,length(n.xy/n.z-ns.xy/ns.z)),smoothstep(.08,.24,stands))));
      n=normalize(mix(ns,n,smoothstep(.14,.34,rough)));
    }
    // The grooves of bare brushed metal lean across their length.
    if(an>.05&&metal>.5&&coat<=.01) n=normalize(vec3(n.xy/n.z+vec2(-tv.y,tv.x)/an*(M.r/ma-.5),1.));
    // Light that goes into the stuff comes out somewhere else, so its colour doesn't see the fine relief its shine does.
    nd=n;
    if(scatter>.05){
      float lod=lodS+scatter*4.;
      vec2 es=e*exp2(lod);
      float l=max(lod-1.,0.),a=rise(gUv+vec2(-es.x,-es.y),l),b=rise(gUv+vec2(es.x,-es.y),l);
      float c=rise(gUv+vec2(-es.x,es.y),l),d=rise(gUv+vec2(es.x,es.y),l);
      nd=normalize(vec3(vec2(a+c-b-d,a+b-c-d)/(4.*mmp*exp2(lod)),1.));
      // Only relief. Across a step the blur would lay a soft dish round it that isn't there.
      float stands=max(a,max(b,max(c,d)))-min(a,min(b,min(c,d)));
      nd=normalize(mix(nd,n,max(smoothstep(.2,.5,length(n.xy/n.z-nd.xy/nd.z)),smoothstep(.08,.24,stands))));
    }
    gN=n.xy/n.z;
    gNs=ns.xy/ns.z;
    gNd=nd.xy/nd.z;
    }
    if(gUnder){n.z=-n.z;ns.z=-ns.z;nd.z=-nd.z;}
    if(gWall){
      vec3 side=vec3(gFace,.04);
      n=normalize(mix(n,side,gSide));ns=normalize(mix(ns,side,gSide));nd=normalize(mix(nd,side,gSide));
    }
    // A pixel that spans a tight curve holds every slope on it, and one reflection for the lot makes beads
    // of a small ring's edge. So it goes as rough as what it spans.
    vec3 nx=dFdx(n),ny=dFdy(n);
    rough=sqrt(sqrt(min(rough*rough*rough*rough+min(.5*(dot(nx,nx)+dot(ny,ny)),.3),1.)));
    vec3 v=normalize(uCam-P);
    // Seen from behind its own plane.
    if(uSpin.x<0.) v.xz=-v.xz;

    // A grain on the top runs off the edge of it, so it says nothing about a wall.
    an*=1.-gSide;
    vec3 T=normalize(mix(normalize(vec3(an>.001?tv/an:vec2(1.,0.),0.)),vec3(0.,0.,1.),gSide));
    T=normalize(T-n*dot(T,n));
    vec3 B=normalize(cross(n,T));

    vec3 dif=alb*(1.-metal);
    // A dark metal is a clear oxide over metal, and that oxide reflects like anything else.
    vec3 f0=mix(vec3(.04),alb+.04*(1.-alb),metal);

    // Half size, and read straight it shows its pixels along every sharp edge.
    vec2 eo=e*2.5;
    float ao=gAo;
    vec3 open=n;
    if(!gBaked){
      vec4 O=(textureLod(tO,gUv+eo,0.)+textureLod(tO,gUv-eo,0.)+textureLod(tO,gUv+vec2(eo.x,-eo.y),0.)+textureLod(tO,gUv-vec2(eo.x,-eo.y),0.))*.25;
      // Light that goes in and comes back out elsewhere fills what would have been dark.
      ao=mix(O.r*O.r,O.r,scatter);
      open=normalize(n+vec3((O.gb*2.-1.)*1.4,0.));
      // Where one part stands on another the join is a dark line, far tighter than occlusion reaches. It takes only
      // what parts are built of, so texture stays out of it, and only a step up, so an edge stays lit.
      vec2 ej=max(vec2(.3)/(uCss*MM),e*1.2);
      float hj=textureLod(tH,AT(gUv),0.).r*2.;
      float crease=max(textureLod(tH,AT(gUv-vec2(ej.x,0.)),0.).r+textureLod(tH,AT(gUv+vec2(ej.x,0.)),0.).r-hj,0.)
        +max(textureLod(tH,AT(gUv-vec2(0.,ej.y)),0.).r+textureLod(tH,AT(gUv+vec2(0.,ej.y)),0.).r-hj,0.);
      ao*=1.-.82*smoothstep(.08,.7,crease);
      // A pale metal fills its own creases: what its walls hide from the room they hand across to each other.
      float fill=min(max(f0.r,max(f0.g,f0.b)),.95);
      ao=mix(ao,ao/(1.-fill*(1.-ao)),metal);
    }
    ao=mix(ao,1.,gSide);
    open=normalize(mix(open,n,gSide));
    gAo=ao;

    vec3 Lk=keyFrom(P);
    float sk=0.;
    if(gLamp){
#ifdef QUICK
      sk=textureLod(tShadow,vec2(vUv.x,1.-vUv.y),0.).r*mix(1.,ao,.3);
#else
      // In a dark room the lamp's shadows are too faint to pay for.
      sk=(uRoom>.15&&gSide<1.?mix(shadow(gUv,h,Lk,.34,1.),1.,gSide):1.)*mix(1.,ao,.3);
#endif
      gSoft=uLampSoft;
      gHead=uLampHead;
      gColor=nd;
      rgb+=lobe(n,v,Lk,uRoomColor*uLamp*uRoom,dif,f0,rough,an,T,B)*sk;
      gColor=vec3(0.);
      gSoft=0.;
      gHead=0.;
    }
    // A torch is a second lamp, held off to one side and aimed at the pointer.
    float beam=0.;
    vec3 Lt=vec3(0.,0.,1.),beamTint=vec3(0.);
    float st=0.,bounce=0.;
    if(uTorch.w>0.){
      float x=offAxis(P);
      beam=pool(P,x);
      bounce=1.-smoothstep(0.,3.,x);
      bounce*=bounce;
      // A reflector's rim runs warmer than its centre.
      beamTint=uTint*mix(vec3(1.),vec3(1.,.92,.78),smoothstep(.6,1.,x))*10.;
      if(beam>.002){
        Lt=normalize(uTorch.xyz-P);
#ifdef QUICK
        st=textureLod(tShadow,vec2(vUv.x,1.-vUv.y),0.).b*mix(1.,ao,.3);
#else
        st=shadow(gUv,h,Lt,.2,1.)*mix(1.,ao,.3);
#endif
        // Close overhead, it would lay a sheen over a whole black dial. Only metal takes all of it.
        rgb+=lobe(n,v,Lt,beamTint*beam,dif,f0*mix(.15,1.,smoothstep(.04,.3,max(f0.r,max(f0.g,f0.b)))),rough,an,T,B)*st;
        // Brighteners sit in what light gets into, and show in what's pale: paper, white plastic, white print.
        if(uCone.w>0.) rgb+=vec3(.6,.78,1.)*uCone.w*beam*st*max(dot(nd,Lt),0.)*smoothstep(.25,.8,min(alb.r,min(alb.g,alb.b)))*smoothstep(.1,.28,scatter)*(1.-metal);
      }
    }
    // Flashes and flames. Each falls off as its distance squared from something its size, and gives what shows white at 1, which
    // a flat white comes to at this exposure. Only the strongest casts a shadow: the rest are seldom on long enough to see one.
    // A size given as less than nothing is a glowing face on another device, flat in the page: it gives off most straight out
    // and none along itself, as the cosine of how far off square it's seen, so it lights only what stands above it.
    for(int i=0;i<4;i++){
      if(i>=uPoints) break;
      vec3 d=uPoint[i].xyz-P;
      float r2=abs(uPoint[i].w),fall=r2/(r2+dot(d,d));
      if(uPoint[i].w<0.) fall*=max(-d.z,0.)*inversesqrt(max(dot(d,d),1e-6));
      vec3 Lp=normalize(d),rad=uPointColor[i]*fall*(PI/EXPOSURE);
      float sp=mix(1.,ao,.3);
#ifndef QUICK
      if(i==0&&gSide<1.) sp*=shadow(gUv,h,Lp,.3,1.);
#endif
      rgb+=lobe(n,v,Lp,rad,dif,f0,rough,an,T,B)*sp;
    }
#ifdef BAKE
    gAmbient=vec3(1.);
#else
    // A dark room is cool beside a warm lamp, and what a torch throws comes back off everything near its pool.
    gAmbient=uRoomColor*uRoom*uFill*mix(vec3(.62,.76,1.),vec3(1.),smoothstep(.04,.4,uRoom))+beamTint*(beam*.055+bounce*uTorch.w*.014);
#endif
    float NoL=dot(n,Lk);
    if(gLamp&&scatter>0.){
      // So the turn into shade is gradual, and it stays warm with the colour of the stuff.
      float NoD=dot(nd,Lk),wrap=scatter*.55,gain=clamp((NoD+wrap)/(1.+wrap),0.,1.)-max(NoD,0.);
      rgb+=dif/PI*uLamp*uRoom*uRoomColor*gain*mix(1.,sk,.6)*mix(vec3(1.),sqrt(alb),scatter);
    }
    if(sheen>0.){
      // A velvety surface holds light at a glancing angle, which is what makes it look soft.
      float NoH=max(dot(n,normalize(v+Lk)),0.),sinH=sqrt(max(1.-NoH*NoH,0.));
      vec3 fuzz=mix(alb,vec3(1.),.12)*sheen;
      float fall=pow(1.-max(dot(n,v),.02),2.);
      if(gLamp) rgb+=fuzz*pow(sinH,3.)*max(NoL,0.)*uLamp*uRoom*uRoomColor*(.05+.6*fall)*sk;
      if(!gBaked) ROOM+=fuzz*plain(n,.8)*fall*ao*.7;
    }

    if(!gBaked){
    float NoV=max(dot(n,v),.02);
    vec3 f2=gFilm>0.?thin(NoV,f0):f0;
    // How much of the room comes back, with what bounces twice in a rough metal's grooves put back.
    vec2 ab=textureLod(tDFG,vec2(NoV,rough),0.).rg;
    vec3 F=(f2*ab.x+ab.y)*(1.+f2*(1./(ab.x+ab.y)-1.));
    float specOcc=clamp(ao+NoV-.6,.15,1.);
    vec3 seen=env(facing(reflect(-v,n),P),rough);
    if(an>.001){
      // Grooves smear the room right across them and hardly along them. Rough enough metal still sees only the room.
      float a=rough*rough;
      seen=mix(seen,vec3(brushed(facing(reflect(-v,n),P),B.xy,a*(1.+an),a*(1.-an))),smoothstep(0.,.2,an));
    }
    // What stands between a surface and the bright side of the room takes that away too, or a shadow on metal is only a lamp gone.
    float sky=uRoom>.15?shadow(gUv,h,uSky,.75,1.):1.;
    ROOM+=seen*F*(1.-gPile)*ao*specOcc*mix(1.,sky,.45);
    ROOM+=dif*plain(open,1.)*ao*.45*mix(1.,sky,.75);
    // What turns away from the lamp sees the lit table and the walls of the tent, and neither is the sky's to shade.
    ROOM+=dif*textureLod(tRoom,oct(n),2.).b*gAmbient*ao*2.5;
    // What the room no longer reaches, nearby surfaces hand on in their own colour.
    vec4 near=textureLod(tA,AT(gUv),3.+lodS);
    rgb+=dif*near.rgb/max(near.a,.1)*(1.-ao)*.34;
    }

    gPile=0.;
    if(coat>.01||uPanes>0){
      // A coat lies on what it coats, so it takes that thing's slopes and shade. A pane is a thing of its own, over
      // what's under it: its surface knows nothing of hands or numerals, nothing below can shade it, and each one adds
      // a reflection, so the glass stacked in a lens shows them all. The pass after the last is for the surface's own coat.
      vec2 at=gUv*uCss;
      for(int i=0;i<=uPanes;i++){
        vec3 nc=ns,tint=vec3(1.),vc=v,Lc=Lk,Ltc=Lt;
        float f0c=.04,gr=coatRough,hide=ao,lit=sk,lamp=st,amount=coat;
        if(i<uPanes){
          int k=i*18;
          vec2 p=at-vec2(uPane[k],uPane[k+1]),half_=vec2(uPane[k+2],uPane[k+3]);
          float r=uPane[k+4];
          vec2 q=abs(p)-half_+r;
          float d=length(max(q,0.))+min(max(q.x,q.y),0.)-r;
          if(d>=.5) continue;
          // Which way is out from here, and how fast the glass falls that way: its own dome, then the edge rolling over.
          vec2 out_=(max(q.x,q.y)>0.?normalize(max(q,0.)+.0001):q.x>q.y?vec2(1.,0.):vec2(0.,1.))*sign(p+.0001);
          float e=1.-clamp(-d/uPane[k+6],0.,1.),u=1.-clamp(-d/uPane[k+8],0.,1.);
          float drop=uPane[k+5]*e/max(sqrt(1.-e*e),.2)+4.*u*u;
          // A cut round the top edge is flat, so it tilts all the way across and stops at a sharp line.
          float cw=uPane[k+15];
          if(cw>0.) drop+=uPane[k+16]*smoothstep(-.5,.5,(cw+d)*uDpr);
          nc=normalize(vec3(out_*drop+p/half_*uPane[k+7],1.));
          // Two faces, with an air gap under them, each reflecting what its index says.
          f0c=uPane[k+17];
          tint=vec3(uPane[k+9],uPane[k+10],uPane[k+11]);
          amount=uPane[k+12]*clamp(.5-d,0.,1.);
          gr=.02;
          // A coating takes each face from 4% down to under half a percent, in the colour its film leaves at that angle, so
          // the dim room drops out and only what's far brighter than it, a softbox or a lamp, still shows. It's seen out of focus, past the glass above it.
          if(uPane[k+13]>0.){
          // It's seen and lit where it is, on top. From the surface under it, every step that surface takes would move its glint.
          vec3 Pc=vec3(P.xy,uPane[k+14]);
          vc=normalize(uCam-Pc);
          if(uSpin.x<0.) vc.xz=-vc.xz;
          Lc=keyFrom(Pc);
          if(beam>.002) Ltc=normalize(uTorch.xyz-Pc);
            float was=gFilm;
            gFilm=uPane[k+13];
            vec3 c=thin(max(dot(nc,vc),.02),vec3(f0c));
            tint*=mix(vec3(1.),c*3./max(c.r+c.g+c.b,.001),.6);
            gFilm=was;
            f0c=.008;
            gr=.1;
          }
          hide=lit=lamp=1.;
        }else if(coat<=.01) break;
        float Fc=(f0c+(1.-f0c)*pow(1.-max(dot(nc,vc),.02),5.))*amount;
        rgb*=1.-Fc;
#ifdef BAKE
        gRoom*=1.-Fc;
#endif
        if(!gBaked){
          vec3 seen=mirrored(facing(reflect(-vc,nc),P),gr-.02+(i<uPanes?0.:mark*.3));
          // The room's panels are a couple of times paper white, where a real softbox is tens of times it. Bare glass
          // hardly shows the difference, but a coating cuts so deep that only that range is left, so it's put back, as a guess.
          if(i<uPanes&&uPane[i*18+13]>0.) seen*=seen*seen/.64;
          ROOM+=seen*Fc*hide*tint;
        }
        if(gLamp){
          gHead=uLampHead;
          rgb+=lobe(nc,vc,Lc,vec3(1.,.95,.86)*uRoomColor*.6923*uLamp*uRoom,vec3(0.),vec3(f0c),gr,0.,T,B)*lit*amount*tint;
          gHead=0.;
        }
        if(beam>.002) rgb+=lobe(nc,vc,Ltc,beamTint*beam,vec3(0.),vec3(f0c),gr,0.,T,B)*lamp*amount*tint;
      }
    }

    // Anything takes a little of the light around it, unless it's black right through, like print on a lit bar.
    vec3 take=(dif*.9+.09*smoothstep(0.,.006,dot(alb,vec3(1.))))*mix(.55,1.,ao)*(1.-panel);
    // While what glows keeps changing it stays out of a bake, or each change would leave the bake stale.
#ifdef BAKE
    if(!uGlow) rgb+=glow(n,1.-C.g,take);
    return vec4(rgb,ao);
#elif defined(HOLD)
    gTake=vec4(take,1.-C.g);
    return vec4(rgb,cov+(1.-cov)*shA);
#elif defined(QUICK)
    if(uGlow) rgb+=glow(n,1.-C.g,take);
#else
    rgb+=glow(n,1.-C.g,take);
#endif
#ifdef QUICK
    if(gBaked) rgb+=gBake+gBakeRoom*gAmbient;
#endif

    rgb*=gNear*EXPOSURE;
    if(!uLinear) rgb=encode(neutral(rgb));

    vec3 lit=rgb;
    if(uDebug==1) rgb=pow(alb,vec3(1./2.2));
    else if(uDebug==2) rgb=vec3(clamp(h/20.,0.,1.));
    else if(uDebug==3) rgb=n*.5+.5;
    else if(uDebug==4) rgb=vec3(rough);
    else if(uDebug==5) rgb=vec3(metal);
    else if(uDebug==6) rgb=pow(clamp(gE,0.,1.),vec3(1./2.2));
    else if(uDebug==7) rgb=vec3(ao);
    // A channel is drawn as it's to be seen, so for the stage's camera it goes back to light.
    if(uDebug>0&&uLinear) rgb=decode(rgb);
    // A channel looks through the finished object: past a split if there is one, or under a torch only in the pool.
    if(uDebug>0&&uSplit>=0.) rgb=mix(lit,rgb,step(uSplit,P.x));
    else if(uDebug>0&&uTorch.w>0.) rgb=mix(rgb,lit,smoothstep(.94,1.,offAxis(P)));
  }
  return vec4(rgb*cov,cov+(1.-cov)*shA);
}

#if defined(SHADOWS)
// Soft shadows hold up at half size while a lamp moves. What's near an edge marches too, or the
// half size pixels beside it would bring an empty pixel's answer in.
void main(){
  vec2 uv=vUv+textureLod(tBake,vec3(vUv.x,1.-vUv.y,1.),0.).xy;
  float cov=textureLod(tA,AT(uv),0.).a,near=textureLod(tA,AT(uv),2.+log2(uDpr)).a,sk=1.,pk=1.,st=1.;
  if(near>.004){
    float h=textureLod(tH,AT(uv),0.).r/max(cov,.25);
    vec3 P=vec3(uv*uCss*MM,h);
    // Past a split a channel shows through, and it casts nothing.
    if(uDebug==0||uSplit<0.||P.x<uSplit+1.){
      if(uRoom>.15) sk=shadow(uv,h,keyFrom(P),.34,1.);
      if(uTorch.w>0.&&offAxis(P)<2.) st=shadow(uv,h,normalize(uTorch.xyz-P),.2,1.);
    }
  }
  // So soft that half the steps don't show.
  if(near<.996&&textureLod(tTop,uv,0.).g>0.) pk=shadow(uv,uLift,pageFrom(uv),.6,2.);
  o=vec4(sk,pk,st,1.);
}
#else
#ifdef QUICK
void main(){
  vec2 b=vec2(vUv.x,1.-vUv.y);
  vec4 k=textureLod(tBake,vec3(b,0.),0.);
  if(k.a>=0.){
    vec4 l=textureLod(tBake,vec3(b,1.),0.);
    gBaked=true;
    gBake=k.rgb;
    gBakeRoom=textureLod(tBake,vec3(b,3.),0.).rgb;
    gAo=k.a;
    gN=l.ba;
    vec4 sl=textureLod(tBake,vec3(b,2.),0.);
    gNs=sl.xy;
    gNd=sl.zw;
    o=shade(vUv+l.xy);
  }else{
#elif defined(EMIT)
void main(){
  vec2 b=vec2(vUv.x,1.-vUv.y);
  vec4 k=textureLod(tBake,vec3(b,0.),0.);
  if(k.a>=0.){
    vec4 l=textureLod(tBake,vec3(b,1.),0.);
    gUv=vUv+l.xy;
    float cov=textureLod(tA,AT(gUv),0.).a;
    vec3 rgb=vec3(0.);
    if(cov>.004){
      vec4 t=textureLod(tBake,vec3(b,2.),0.);
      rgb=(k.rgb+glow(normalize(vec3(l.ba,1.)),t.a,t.rgb))*EXPOSURE;
      if(!uLinear) rgb=encode(neutral(rgb));
    }
    o=vec4(rgb*cov,k.a);
  }else{
#else
void main(){
#endif
  vec2 uv=land(vUv);
  // Where the landing point jumps, the ray has crossed an edge, and one ray per pixel leaves it
  // stepped. Only those pixels pay for more, on a rotated grid.
  vec2 jump=(abs(dFdx(uv))+abs(dFdy(uv)))*uCss*uDpr/vec2(abs(uSpin.x),1.);
#if defined(BAKE)||defined(HOLD)
  // An edge is worked out whole every frame, so a bake only marks it.
  bool edge=max(jump.x,jump.y)>=2.2;
  o=edge?vec4(0.,0.,0.,-1.):shade(uv);
  oLand=vec4(uv-vUv,gN);
#ifdef BAKE
  oSlope=vec4(gNs,gNd);
  oRoom=vec4(gRoom,1.);
#else
  oTake=gTake;
#endif
#else
  if(max(jump.x,jump.y)<2.2) o=shade(uv);
  else{
    vec2 px=1./(uCss*uDpr);
    o=(shade(land(vUv+px*vec2(-.125,-.375)))+shade(land(vUv+px*vec2(.375,-.125)))
      +shade(land(vUv+px*vec2(.125,.375)))+shade(land(vUv+px*vec2(-.375,.125))))*.25;
  }
#endif
#if defined(QUICK)||defined(EMIT)
  }
#endif
#if !defined(BAKE)&&!defined(HOLD)
  if(!uLinear) o.rgb+=(rnd(gl_FragCoord.xy+uShift)-.5)/255.*o.a;
#endif
}
#endif`,tn=class{spec;tex=null;map={x:0,y:0,w:0,h:0};wanted=null;pool=null;mask=null;rough=!1;seat=null;roughBox=null;bake=null;hold=null;heat=0;warmed=0;glowing=!1;drawn=``;peak=40;tall=40;panes=[];paned=new Set;shaped=0;edged=[];reedge=!1;made=null;picture=null;constructor(e){this.spec=e}get ready(){return!!this.tex}},J=1024,nn=class{gl;made=new Map;constructor(e){this.gl=e;let t=xt(e,Wt,Kt),n=e.createTexture(),r=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,r),e.drawBuffers([e.COLOR_ATTACHMENT0]),e.disable(e.BLEND),e.activeTexture(e.TEXTURE14),e.bindTexture(e.TEXTURE_2D,n),e.texStorage2D(e.TEXTURE_2D,1,e.RG16F,64,64),q(e,e.LINEAR,e.LINEAR),e.activeTexture(e.TEXTURE0),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.viewport(0,0,64,64),e.useProgram(t.program),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(r),e.deleteProgram(t.program)}for(e,t){let n=this.made.get(e),{gl:r}=this;if(n?.tilt===t)return n;n&&(r.deleteTexture(n.room),r.deleteTexture(n.brush));let i=r.isEnabled(r.BLEND),a=r.isEnabled(r.SCISSOR_TEST),o=e=>{let t=r.createTexture();return r.bindTexture(r.TEXTURE_2D,t),r.texStorage2D(r.TEXTURE_2D,e,r.RGBA16F,J,J),q(r,r.LINEAR_MIPMAP_LINEAR,r.LINEAR),t},s=xt(r,Wt,Gt),c=xt(r,Wt,Xt),l=o(Math.log2(J)+1),u=o(7),d=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,d),r.drawBuffers([r.COLOR_ATTACHMENT0]),r.disable(r.BLEND),r.disable(r.SCISSOR_TEST),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,l,0),r.viewport(0,0,J,J),r.useProgram(s.program),r.uniform1f(s.u.uSize,J),r.uniform1f(s.u.uDark,e.dark),r.uniform1f(s.u.uGlow,e.glow),r.uniform1f(s.u.uTent,e.tent),r.uniform1f(s.u.uCamera,e.camera);let f=Math.tan(t*Math.PI/180);r.uniform2f(s.u.uLens,f*.44,-f*.9);let p=e.panels.slice(0,6);r.uniform1i(s.u.uPanels,p.length),p.length&&(r.uniform4fv(r.getUniformLocation(s.program,`uPanelAt`),p.flatMap(e=>[...e.at,...e.size])),r.uniform2fv(r.getUniformLocation(s.program,`uPanelLight`),p.flatMap(e=>[e.soft,e.power]))),r.drawArrays(r.TRIANGLE_STRIP,0,4),r.bindTexture(r.TEXTURE_2D,l),r.generateMipmap(r.TEXTURE_2D),r.useProgram(c.program),r.uniform1i(c.u.tRoom,0),r.uniform1f(c.u.uSource,J);for(let e=0;e<7;e++){let t=J>>e;r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,u,e),r.viewport(0,0,t,t),r.uniform1f(c.u.uSize,t),r.uniform1f(c.u.uRough,e/6),r.uniform1i(c.u.uSamples,e?32<<Math.min(e,3):1),r.drawArrays(r.TRIANGLE_STRIP,0,4)}let m=xt(r,Wt,Yt),h=r.createTexture();r.activeTexture(r.TEXTURE15),r.bindTexture(r.TEXTURE_2D_ARRAY,h),r.texStorage3D(r.TEXTURE_2D_ARRAY,4,r.R16F,128,128,8*qt.length),r.texParameteri(r.TEXTURE_2D_ARRAY,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),r.texParameteri(r.TEXTURE_2D_ARRAY,r.TEXTURE_MAG_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D_ARRAY,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D_ARRAY,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,u),r.useProgram(m.program),r.uniform1i(m.u.tRoom,0);for(let e=0;e<4;e++){let t=128>>e;r.viewport(0,0,t,t),r.uniform1f(m.u.uSize,t),r.uniform1f(m.u.uThin,Jt*2**e);for(let t=0;t<qt.length;t++){r.uniform1f(m.u.uReach,qt[t]);for(let n=0;n<8;n++)r.framebufferTextureLayer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,h,e,t*8+n),r.uniform1f(m.u.uTurn,n/8*Math.PI),r.drawArrays(r.TRIANGLE_STRIP,0,4)}}r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteFramebuffer(d),r.deleteTexture(l),r.deleteProgram(m.program),r.deleteProgram(s.program),r.deleteProgram(c.program),i&&r.enable(r.BLEND),a&&r.enable(r.SCISSOR_TEST);let g={room:u,brush:h,tilt:t};return this.made.set(e,g),g}get bytes(){return this.made.size*(J*J*8*4/3+262144*qt.length*4/3)}},rn=`#version 300 es
void main() {
  vec2 c = vec2(gl_VertexID & 1, gl_VertexID >> 1);
  gl_Position = vec4(c * 2.0 - 1.0, 0.0, 1.0);
}`,an=.03,on=7,sn=`#version 300 es
precision highp float;
uniform sampler2D tLight;
uniform float uExposure;
out vec4 o;
void main() {
  vec2 uv = gl_FragCoord.xy * 2.0 / vec2(textureSize(tLight, 0));
  o = vec4(max(texture(tLight, uv).rgb * uExposure - 1.0, 0.0), 1.0);
}`,cn=`#version 300 es
precision highp float;
uniform sampler2D tPast;
uniform int uLevels;
out vec4 o;
void main() {
  vec2 uv = gl_FragCoord.xy / vec2(textureSize(tPast, 0));
  vec3 g = vec3(0);
  for (int i = 0; i < ${on}; i++) {
    if (i >= uLevels) break;
    vec2 t = 0.75 / vec2(textureSize(tPast, i));
    float l = float(i);
    g += textureLod(tPast, uv + t, l).rgb + textureLod(tPast, uv - t, l).rgb + textureLod(tPast, uv + vec2(t.x, -t.y), l).rgb + textureLod(tPast, uv + vec2(-t.x, t.y), l).rgb;
  }
  o = vec4(g * ${(an/4).toFixed(5)} / float(uLevels), 1.0);
}`,ln=`#version 300 es
precision highp float;
uniform sampler2D tLight, tGlare;
uniform float uExposure;
uniform vec2 uShift;
uniform vec3 uBack;
out vec4 o;
${$t}
float rnd(vec2 p){return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715))));}
void main() {
  vec4 c = texelFetch(tLight, ivec2(gl_FragCoord.xy), 0);
  float a = clamp(c.a, 0.0, 1.0);
  vec3 rgb = max(c.rgb, 0.0) * uExposure;
  rgb += texture(tGlare, gl_FragCoord.xy / vec2(textureSize(tLight, 0))).rgb - max(rgb - 1.0, 0.0) * ${an.toFixed(5)};
  rgb = a > 0.002 ? encode(neutral(rgb / a)) * a : encode(min(decode(uBack) + neutral(rgb), 1.0)) - uBack;
  // Half a level of noise, so a smooth fall of light doesn't band at 8 bits.
  o = vec4(rgb + (rnd(gl_FragCoord.xy + uShift) - 0.5) / 255.0 * max(a, 0.004), a);
}`,un=class{gl;fbo;tex=null;past=null;glare=null;pastFbo;glareFbo;levels=1;w=0;h=0;show;passes;constructor(e){this.gl=e,this.fbo=e.createFramebuffer(),this.pastFbo=e.createFramebuffer(),this.glareFbo=e.createFramebuffer(),this.show=K(e,rn,ln).finish(),this.passes={past:K(e,rn,sn).finish(),glare:K(e,rn,cn).finish()}}get bytes(){return this.w*this.h*8*(1+1/4*(4/3)+1/4)}get half(){return[Math.max(this.w>>1,1),Math.max(this.h>>1,1)]}begin(e,t){let{gl:n}=this;if(e!==this.w||t!==this.h||!this.tex){for(let e of[this.tex,this.past,this.glare])e&&n.deleteTexture(e);this.w=e,this.h=t;let[r,i]=this.half;this.levels=Math.min(on,Math.floor(Math.log2(Math.min(r,i)))+1);let a=(e,t,r,i,a)=>{let o=n.createTexture();return n.bindTexture(n.TEXTURE_2D,o),n.texStorage2D(n.TEXTURE_2D,i,n.RGBA16F,t,r),q(n,a,n.LINEAR),n.bindFramebuffer(n.FRAMEBUFFER,e),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,o,0),o};this.tex=a(this.fbo,e,t,1,n.LINEAR),this.past=a(this.pastFbo,r,i,this.levels,n.LINEAR_MIPMAP_LINEAR),this.glare=a(this.glareFbo,r,i,1,n.LINEAR)}n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.viewport(0,0,e,t),n.disable(n.SCISSOR_TEST),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT)}finish(e=1,t=[0,0,0]){let{gl:n}=this,[r,i]=this.half;n.disable(n.SCISSOR_TEST),n.disable(n.BLEND),n.disable(n.DEPTH_TEST),n.colorMask(!0,!0,!0,!0);let{past:a,glare:o}=this.passes;n.bindFramebuffer(n.FRAMEBUFFER,this.pastFbo),n.viewport(0,0,r,i),n.useProgram(a.program),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,this.tex),n.uniform1i(a.u.tLight,0),n.uniform1f(a.u.uExposure,e),n.drawArrays(n.TRIANGLE_STRIP,0,4),n.bindTexture(n.TEXTURE_2D,this.past),n.generateMipmap(n.TEXTURE_2D),n.bindFramebuffer(n.FRAMEBUFFER,this.glareFbo),n.useProgram(o.program),n.uniform1i(o.u.tPast,0),n.uniform1i(o.u.uLevels,this.levels),n.drawArrays(n.TRIANGLE_STRIP,0,4);let{program:s,u:c}=this.show;n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,this.w,this.h),n.useProgram(s),n.bindTexture(n.TEXTURE_2D,this.tex),n.uniform1i(c.tLight,0),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,this.glare),n.uniform1i(c.tGlare,1),n.uniform1f(c.uExposure,e),n.uniform2f(c.uShift,0,0),n.uniform3f(c.uBack,...t),n.drawArrays(n.TRIANGLE_STRIP,0,4),n.activeTexture(n.TEXTURE0)}lost(){this.tex=this.past=this.glare=null,this.w=this.h=0}free(){let{gl:e}=this;for(let t of[this.tex,this.past,this.glare])t&&e.deleteTexture(t);for(let t of[this.fbo,this.pastFbo,this.glareFbo])e.deleteFramebuffer(t);for(let t of[this.show,this.passes.past,this.passes.glare])e.deleteProgram(t.program);this.lost()}},dn=e=>e<.0031308?12.92*e:1.055*e**(1/2.4)-.055;function fn(e,t,n){let r=.015,i=.785,a=Math.min(e,t,n),o=a<2*r?a-a*a/(4*r):r,s=Math.max(e,t,n),c=s<2*r?s*.25/r:1-r/Math.max(s,2*r),l=Math.min(Math.max((s-.03)/.07,0),1),u=l*l*(3-2*l),d=[e,t,n].map(e=>e*c*(1-u)+(e-o)*u),f=Math.max(...d);if(f>=i){let e=.21499999999999997,t=1-e*e/(f+e-i),n=1-1/(.15*(f-t)+1);d=d.map(e=>e*t/f*(1-n)+t*n)}return d.map(dn)}var pn=4,mn=2,hn=12,gn=1e9,_n=class{gl;cache=new Map;canvas=new OffscreenCanvas(1,1);ctx=this.canvas.getContext(`2d`,{willReadFrequently:!0});constructor(e){this.gl=e}get(e){if(e.type!==`rect`&&e.type!==`field`||e.rotate||e.grow||e.ring||e.type===`rect`&&e.ripple[0])return null;let t=e.type===`field`?`${e.key}|${e.hw}x${e.hh}|${e.cx},${e.cy}`:`r|${e.cx},${e.cy},${e.hw},${e.hh},${e.radius}`,n=this.cache.get(t);return n||(n=this.make(e),this.cache.set(t,n)),n}make(e){let{gl:t,canvas:n,ctx:r}=this,i=Math.min(t.getParameter(t.MAX_TEXTURE_SIZE),8192),a=e.hw*2,o=e.hh*2,s=e.cx-e.hw,c=e.cy-e.hh,l=Math.min(Math.ceil(o*pn)+1,i),u=o/(l-1),d=Math.ceil(a*mn)+1;n.width=d,n.height=l,r.setTransform(1,0,0,1,0,0),r.clearRect(0,0,d,l),r.fillStyle=`#fff`;let f=(d-1)/a,p=1/u;r.setTransform(f,0,0,p,.5,.5);let m=null,h,g=null;if(e.type===`rect`)m=new Path2D,m.roundRect(0,0,a,o,Math.min(e.radius,e.hw,e.hh)),g=r.getTransform(),r.fill(m);else{let t=r.fill.bind(r);r.fill=((e,n)=>{e instanceof Path2D&&(m=e,h=n,g=r.getTransform()),t(e,n)}),r.save();let{hw:n,hh:i}=e.source??e;e.draw(r,n*2,i*2),r.restore(),r.fill=t}let _=r.getImageData(0,0,d,l).data;g&&r.setTransform(g);let v=(e,t)=>r.isPointInPath(m,e,t+.5,h),y=new Float32Array(l*2);for(let e=0;e<l;e++){let t=-1,n=-1;for(let n=d-1;n>=0;n--)if(_[(e*d+n)*4+3]>127){t=n;break}for(let t=0;t<d;t++)if(_[(e*d+t)*4+3]>127){n=t;break}if(t<0){y[e*2]=-1e9,y[e*2+1]=gn;continue}let r=(t,n)=>{let r=t+.5,i=n+.5;if(!m)return(r+i)/2;if(!v(r,e))return r;for(let t=0;t<hn;t++){let t=(r+i)/2;v(t,e)?r=t:i=t}return r};y[e*2]=s+(r(t,t+1)-.5)/f,y[e*2+1]=s+(r(n,n-1)-.5)/f}let b=t.createTexture();return t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,b),q(t,t.NEAREST,t.NEAREST),t.texImage2D(t.TEXTURE_2D,0,t.RG32F,l,1,0,t.RG,t.FLOAT,y),{tex:b,y0:c,step:u,n:l}}},vn=new Set,yn=new Set,bn=null;function xn(e){return vn.add(e),Sn(),()=>{vn.delete(e)&&e.leave(bn)}}var Sn=()=>yn.forEach(e=>e()),Cn=()=>!!bn,wn=()=>vn,Tn=e=>yn.add(e);function En(e){if(e===bn)return;let t=bn;if(bn=e,!e)for(let e of vn)e.leave(t)}var Dn=new Set,On=null,kn=new Set,An=()=>kn.forEach(e=>e());function jn(e){let t={...e,kind:`point`};return Dn.add(t),An(),{set(e){Object.assign(t,e),An()},remove(){Dn.delete(t)&&An()}}}function Mn(){return On?[On,...Dn]:[...Dn]}var Nn=()=>Dn,Pn=e=>{if(Array.isArray(e))return e;let t=e.getBoundingClientRect();return[t.left+t.width/2,t.top+t.height/2]},Fn=(e,t)=>{let n=Math.max(...e.color);return n<=t?0:e.reach/2*Math.sqrt(n/t-1)},In=e=>On=e,Ln=null,Rn=-1/0;function zn(){return performance.now()-Rn>Bn&&kn.forEach(e=>e()),Rn=performance.now(),Ln}var Bn=1e3,Vn=()=>performance.now()-Rn<Bn,Hn=e=>Ln=e,Un=()=>Ln;function Wn(e){return kn.add(e),()=>kn.delete(e)}var Gn=new Uint8Array,Kn=new Uint8Array,qn=new Uint8Array,Jn=new Uint8Array;function Yn(e){return Gn.length<e&&(Gn=new Uint8Array(e)),Gn.fill(0,0,e),Gn.subarray(0,e)}function Xn(e,t,n,r){let i=2*r+1,a=Math.max(t,n)+2*r;Kn.length<a&&(Kn=new Uint8Array(a),qn=new Uint8Array(a),Jn=new Uint8Array(a));let o=(t,n,a)=>{let o=t+2*r;Kn.fill(0,0,o);for(let i=0;i<t;i++)Kn[i+r]=e[n+i*a];for(let e=0;e<o;e++)qn[e]=e%i&&qn[e-1]>Kn[e]?qn[e-1]:Kn[e];for(let e=o-1;e>=0;e--)Jn[e]=e%i!==i-1&&e!==o-1&&Jn[e+1]>Kn[e]?Jn[e+1]:Kn[e];for(let r=0;r<t;r++)e[n+r*a]=Math.max(Jn[r],qn[r+i-1])};for(let e=0;e<n;e++)o(t,e*t,1);for(let e=0;e<t;e++)o(n,e,t)}var Y=16,X=.25,Zn=256,Qn=32,$n=2,er=32,tr=160,nr=1/.6,rr=48,ir=32,ar=6,or=3,sr=400,cr=3e3,lr=100,ur=12,dr=4e6,fr=260,pr=640,mr=3,hr=10,gr=18,_r=([e,t],[n,r,i])=>{let a=e*Math.PI/180,o=t*Math.PI/180,s=n*Math.cos(a)-i*Math.sin(a),c=i*Math.cos(a)+n*Math.sin(a);return[s,r*Math.cos(o)+c*Math.sin(o),c*Math.cos(o)-r*Math.sin(o)]},vr=.75,yr=1.565,br={n:0,at:new Float32Array,color:new Float32Array},xr=`#version 300 es
uniform vec4 uRect;
out vec2 vUv;
void main() {
  vec2 c = vec2(gl_VertexID & 1, gl_VertexID >> 1);
  vUv = vec2(c.x, 1.0 - c.y);
  gl_Position = vec4(mix(uRect.x, uRect.z, c.x), mix(uRect.y, uRect.w, c.y), 0.0, 1.0);
}`,Sr=`#version 300 es
precision mediump float;
uniform sampler2D tP;
in vec2 vUv;
out vec4 o;
void main() { o = texture(tP, vUv); }`,Cr=`#version 300 es
precision highp float;
uniform sampler2D tP, tBend;
uniform vec2 uStagePx, uUvPerMm;
in vec2 vUv;
out vec4 o;
void main() {
  vec2 d = texture(tBend, gl_FragCoord.xy / uStagePx).rg;
  o = texture(tP, vUv + vec2(d.x, -d.y) * uUvPerMm);
}`;function wr(e,t){let n=Math.floor(e.x*t),r=Math.floor(e.y*t);return{x:n,y:r,w:Math.ceil((e.x+e.w)*t)-n,h:Math.ceil((e.y+e.h)*t)-r}}var Z=(e,t)=>e.x<t.x+t.w&&t.x<e.x+e.w&&e.y<t.y+t.h&&t.y<e.y+e.h,Tr=(e,t)=>({x:e.x-t,y:e.y-t,w:e.w+t*2,h:e.h+t*2});function Er(e){let t=[];for(let n of e){for(let e=t.length-1;e>=0;e--)Z(t[e],n)&&(n=V(n,t[e]),t.splice(e,1),e=t.length);t.push(n)}return t.length>ar?[t.reduce((e,t)=>V(e,t))]:t}var Dr=e=>!!e&&(e[0]>0||e[1]>0||e[2]>0),Or=e=>e.op===`screen`||e.op===`frost`||e.op===`glow`||(e.op===`surface`?Dr(e.material.emit):e.op===`cut`&&Dr(e.emit)),kr=e=>e>=1.5?2:1,Ar=e=>{let[t,n,r,i]=e.whole??[e.x,e.y,e.cw,e.ch],a=e.x-t,o=e.y-n;return{sx:a,sy:o,right:r-t+a,bottom:i-n+o,cx:r/2+a,cy:i/2+o,long:Math.max(r-n*2,i-n*2)}},jr=(e,t)=>!!e.spin||!!e.lean&&(t.carried?e.hand>0:!!e.turn[0]||!!e.turn[1]),Mr=class{stats;ok=!1;lost=!1;probe=!1;fields=null;sections=null;plates=new Set;canvas=null;bench=null;benchTex=null;sheet={width:0,height:0};staged=!1;show_=null;lens=null;exposure=1;backdrop=[0,0,0];bent=null;glowAt=null;glowReads=[];glowBack=null;emitters=[];gl=null;mat=null;block=null;recorder=null;wea=null;lit=null;fast=null;glow=null;linkingGlow=null;lightProgram;linking=[];con=null;occ=null;vao=null;screenTex=null;dark=null;rooms=null;px=new Uint8Array(4);pxLight=new Float32Array(4);fieldRoom=1/0;proven=!1;fence=null;fenced=0;mipFrom=null;mipTo=null;heightFormat=0;maxSide=4096;undersides=!1;relief=!1;split=!1;raised=!0;targets=[];drawn=0;made=0;constructor(e,t){this.stats=e;let n=document.createElement(`canvas`),r=n.getContext(`webgl2`,{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:`high-performance`});r&&r.getExtension(`EXT_color_buffer_float`)&&(this.canvas=n,this.sheet=n,this.gl=r,this.init(),this.ok=!0,n.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),this.lost=!0,this.fence=null;for(let e of this.plates)e.tex=e.picture=null,this.freeHold(e);this.bench=this.benchTex=null,this.glowReads=[],this.glowAt=null,this.lens=null,En(null)}),n.addEventListener(`webglcontextrestored`,()=>{this.lost=!1,this.init(),this.staged&&En(r),t()}))}open(e){let t=new tn(e);return this.plates.add(t),t}showRelief(e){this.raised=e,this.recorder&&(this.recorder.relief=e)}close(e){this.plates.delete(e),this.free(e),this.freePicture(e)}drop(e){this.freeBake(e),this.freeHold(e)}staleBakes(){for(let{bake:e}of this.plates)e&&(e.stale=!0)}begin(e,t){this.drawn=this.stats.paints+this.stats.lights,this.made=this.fields.generated,this.fieldRoom=e?1/0:t?dr*8:dr,this.glowCollect()}glowCollect(){let{gl:e}=this;for(;this.glowReads.length&&e.clientWaitSync(this.glowReads[0].sync,0,0)!==e.TIMEOUT_EXPIRED;){let t=this.glowReads.shift(),n=new Uint8Array(t.w*t.h*4);e.bindBuffer(e.PIXEL_PACK_BUFFER,t.pbo),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,n),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),e.deleteSync(t.sync),e.deleteBuffer(t.pbo),this.glowBack={w:t.w,h:t.h,data:n,shots:t.shots}}}end(){if(this.stats.paints+this.stats.lights===this.drawn&&this.fields.generated===this.made)return;let{gl:e}=this;this.fence&&e.deleteSync(this.fence),this.fence=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0),this.fenced=performance.now(),e.flush()}late(){return performance.now()-this.fenced>ur}making(e){let{wanted:t}=e;if(!t)return!1;for(;t.length&&this.fieldRoom>0;){let n=t.pop();this.fieldRoom-=this.fields.cost(n,e.spec.dpr),this.fields.get(n,e.spec.dpr)}return t.length?!0:(e.wanted=null,!1)}memory(){let e=0,t=0,n=0;for(let r of this.plates){if(t+=this.pictureBytes(r),!r.tex)continue;let i=r.spec;n++,e+=this.bytes(r),r.bake&&(e+=r.bake.pw*r.bake.ph*33),r.hold&&(e+=i.pw*i.ph*24)}let r=(this.benchTex?this.sheet.width*this.sheet.height*8:0)+(this.lens?.bytes??0);return{textures:e,pictures:t,fields:this.ok?this.fields.bytes:0,room:this.rooms?.bytes??0,stage:r,live:n}}recover(){let{gl:e}=this,{drawing:t,later:n}=this.recorder;return this.recorder.drawing=null,n.length=0,this.block.send(),e.bindFramebuffer(e.FRAMEBUFFER,this.bench),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.activeTexture(e.TEXTURE0),t}init(){let{gl:e}=this;e.getExtension(`EXT_color_buffer_float`),this.maxSide=e.getParameter(e.MAX_TEXTURE_SIZE),this.heightFormat=e.getExtension(`OES_texture_float_linear`)&&e.getExtension(`EXT_float_blend`)?e.RGBA32F:e.RGBA16F,this.targets=[e.COLOR_ATTACHMENT0,e.COLOR_ATTACHMENT1,e.COLOR_ATTACHMENT2,e.COLOR_ATTACHMENT3];let t=e.getParameter(e.MAX_DRAW_BUFFERS),n=t>4;n&&this.targets.push(e.COLOR_ATTACHMENT4),this.relief=this.heightFormat===e.RGBA16F&&t>5,this.split=this.heightFormat===e.RGBA32F&&t>5,this.split&&(this.heightFormat=e.R32F),(this.relief||this.split)&&this.targets.push(e.COLOR_ATTACHMENT5),this.undersides=t>6;let r=e=>this.relief||this.split?e.replace(`#version 300 es`,`#version 300 es\n#define ${this.relief?`RELIEF`:`SPLIT`}`):e,i=K(e,mt,(e=>r((n?e:e.replace(`layout(location=4) out vec4 oM;`,`vec4 oM;`)).replace(`layout(location=6) out vec4 oU;`,this.undersides?`$&`:`vec4 oU;`)))(ht)),a=K(e,st,r(_t)),o=K(e,Zt,r(en)),s=K(e,st,gt),c=K(e,st,vt);this.mat=i.finish(),this.block=new wt(e,this.mat.program,`Command`),this.wea=a.finish(),this.lit=o.finish(),this.samplers(this.lit),this.fast=this.glow=this.linkingGlow=null,this.lightProgram=t=>St(e,Zt,r(en).replace(`#version 300 es`,`#version 300 es\n#define ${t}`)),this.linking=[`BAKE`,`SHADOWS`,`QUICK`].map(this.lightProgram),this.con=s.finish(),this.occ=c.finish(),this.vao=e.createVertexArray(),e.bindVertexArray(this.vao),this.screenTex=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.screenTex),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,1,1,0,e.RGBA,e.UNSIGNED_BYTE,null),q(e,e.LINEAR,e.LINEAR),this.dark=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.dark),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,1,1,0,e.RGBA,e.UNSIGNED_BYTE,null),q(e,e.NEAREST,e.NEAREST),this.fields=new It(e),this.sections=new _n(e),this.recorder=new yt(e,this.block,this.fields,this.screenTex),this.recorder.relief=this.raised,this.rooms=new nn(e),this.mipFrom=e.createFramebuffer(),this.mipTo=e.createFramebuffer(),this.show_=K(e,xr,Sr).finish(),this.bent=K(e,xr,Cr).finish(),this.staged&&this.makeBench()}held(){let{gl:e,fence:t}=this;return t?e.getSyncParameter(t,e.SYNC_STATUS)!==e.SIGNALED&&performance.now()-this.fenced<lr||(e.deleteSync(t),this.fence=null,!1):!1}prepare(e){if(e.tex||this.allocTextures(e,null),e.mask){let{gl:t}=this;t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,e.tex.mask),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.R8,t.RED,t.UNSIGNED_BYTE,e.mask),t.generateMipmap(t.TEXTURE_2D),e.mask=null}this.condition(e)}condition(e){let t=e.spec,n=[t.pw,t.ph,t.seed,t.prints,t.dust,t.scuff,t.haze].join();if(n===e.drawn)return;e.drawn=n;let{gl:r}=this,{u:i,program:a}=this.con;r.bindFramebuffer(r.FRAMEBUFFER,e.tex.condition),r.viewport(-e.map.x,-e.map.y,t.pw,t.ph),r.drawBuffers([r.COLOR_ATTACHMENT0]),r.disable(r.BLEND),r.useProgram(a),r.uniform2f(i.uCanvas,t.cw,t.ch),r.uniform4f(i.uBox,0,0,t.cw,t.ch),r.uniform2f(i.uSeed,t.seed*73.1%997-Ar(t).sx,t.seed*41.7%991-Ar(t).sy),r.uniform1f(i.uPrints,t.prints),r.uniform1f(i.uDust,t.dust),r.uniform1f(i.uScuff,t.scuff),r.uniform1f(i.uHaze,t.haze),r.drawArrays(r.TRIANGLE_STRIP,0,4),r.bindFramebuffer(r.FRAMEBUFFER,this.bench)}occlusion(e,t){let n=e.spec,{gl:r}=this,{u:i,program:a}=this.occ,o=kr(n.dpr);r.bindFramebuffer(r.FRAMEBUFFER,e.tex.occlusion),r.viewport(0,0,Math.ceil(n.pw/o),Math.ceil(n.ph/o)),t&&this.clip(Tr(t,80/Math.min(n.dpr,1)),n.pw/n.cw/o,0),r.drawBuffers([r.COLOR_ATTACHMENT0]),r.useProgram(a),r.uniform2f(i.uCanvas,n.cw,n.ch),r.uniform4f(i.uBox,0,0,n.cw,n.ch),r.uniform1f(i.uDpr,n.dpr),r.uniform4f(i.uMap,...this.mapUv(e)),r.uniform1i(i.tH,0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,e.tex.H),r.drawArrays(r.TRIANGLE_STRIP,0,4),r.bindFramebuffer(r.FRAMEBUFFER,this.bench)}allocTextures(e,t){let n=e.spec,{gl:r}=this,i=this.levels(e),a=(t,n)=>this.target(e,t,n),o=a(r.SRGB8_ALPHA8,i),s=a(this.heightFormat,i),c=a(r.RGBA8,1),l=a(r.RGBA8,1),u;this.targets.length>4?u=a(r.RGBA8,1):(u=r.createTexture(),r.bindTexture(r.TEXTURE_2D,u),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,1,1,0,r.RGBA,r.UNSIGNED_BYTE,new Uint8Array([0,0,255,255])),q(r,r.NEAREST,r.NEAREST));let d=r.createTexture(),f=kr(n.dpr);r.bindTexture(r.TEXTURE_2D,d),r.texStorage2D(r.TEXTURE_2D,1,r.RGBA8,Math.ceil(n.pw/f),Math.ceil(n.ph/f)),q(r,r.LINEAR,r.LINEAR);let p=t??r.createTexture();t||(r.bindTexture(r.TEXTURE_2D,p),q(r,r.LINEAR_MIPMAP_LINEAR,r.LINEAR));let m=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,m),[o,s,c].forEach((e,t)=>r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+t,r.TEXTURE_2D,e,0)),this.targets.length>4&&r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT4,r.TEXTURE_2D,u,0);let h=this.relief?a(r.R16F,i):null,g=this.split?a(r.RGBA8,i):null;if((h??g)&&r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT5,r.TEXTURE_2D,h??g,0),!this.proven&&r.checkFramebufferStatus(r.FRAMEBUFFER)!==r.FRAMEBUFFER_COMPLETE)throw Error(`framebuffer incomplete`);this.proven=!0;let _=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,_),[o,c].forEach((e,t)=>r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+t,r.TEXTURE_2D,e,0));let v=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,v),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,l,0);let y=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,y),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,d,0),r.bindFramebuffer(r.FRAMEBUFFER,this.bench);let b=Math.ceil(n.cw/Y),x=Math.ceil(n.ch/Y),S=r.createTexture();r.activeTexture(r.TEXTURE7),r.bindTexture(r.TEXTURE_2D,S),r.texStorage2D(r.TEXTURE_2D,1,r.RG8,b,x),q(r,r.NEAREST,r.NEAREST),r.activeTexture(r.TEXTURE0);let C=[...this.targets];C[3]=r.NONE,e.tex={A:o,H:s,S:c,E:null,G:null,glow:null,targets:C,M:u,D:h,N:g,U:null,C:l,O:d,mask:p,fbo:m,weather:_,condition:v,occlusion:y,tops:new Uint8Array(b*x*2),tw:b,th:x,T:S,back:null,under:null,own:null,deep:null},e.drawn=``}grow(){let e=this.sheet,t=e.width,n=e.height;for(let{spec:e}of this.plates)t=Math.max(t,e.pw),n=Math.max(n,e.ph);if(t=Math.min(Math.ceil(t/Zn)*Zn,this.ceiling[0]),n=Math.min(Math.ceil(n/Zn)*Zn,this.ceiling[1]),t<=e.width&&n<=e.height)return;if(e.width=Math.max(t,e.width),e.height=Math.max(n,e.height),this.staged){e.width=Math.min(e.width,this.maxSide),e.height=Math.min(e.height,this.maxSide),this.sizeBench();return}let{drawingBufferWidth:r,drawingBufferHeight:i}=this.gl;(r<e.width||i<e.height)&&(this.ceiling=[r,i],e.width=r,e.height=i)}ceiling=[1/0,1/0];fit(e){return Math.min(1,this.sheet.width/e.pw,this.sheet.height/e.ph)}levels(e){return Math.floor(Math.log2(Math.max(e.map.w,e.map.h)))+1}target(e,t,n){let{gl:r}=this,i=r.createTexture();return r.bindTexture(r.TEXTURE_2D,i),r.texStorage2D(r.TEXTURE_2D,n,t,e.map.w,e.map.h),q(r,n>1?r.LINEAR_MIPMAP_LINEAR:r.LINEAR,r.LINEAR),i}samplers({program:e,u:t}){let{gl:n}=this;n.useProgram(e),[`tA`,`tH`,`tS`,`tE`,`tRoom`,`tC`,`tO`,`tTop`,`tM`,`tD`,`tBake`,`tShadow`,`tU`,`tN`,`tDFG`,`tBrush`].forEach((e,r)=>t[e]&&n.uniform1i(t[e],r))}linked(){if(this.fast)return!0;let[e,t,n]=this.linking.map(e=>e());return!e||!t||!n?!1:([e,t,n].forEach(e=>this.samplers(e)),this.fast={bake:e,shadows:t,quick:n},!0)}glowLinked(){if(this.glow)return!0;let[e,t]=(this.linkingGlow??=[`HOLD`,`EMIT`].map(this.lightProgram)).map(e=>e());return!e||!t?!1:([e,t].forEach(e=>this.samplers(e)),this.glow={hold:e,emit:t},!0)}freeHold(e){e.hold&&(clearTimeout(e.hold.timer),this.lost||(this.gl.deleteTexture(e.hold.maps),this.gl.deleteFramebuffer(e.hold.fbo)),e.hold=null,e.heat=0)}holding(e){let t=e.spec;if(e.hold)return e.hold;let{gl:n}=this,r=n.createTexture(),i=n.createFramebuffer(),a=[0,1,2];n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D_ARRAY,r),n.texStorage3D(n.TEXTURE_2D_ARRAY,1,n.RGBA16F,t.pw,t.ph,a.length),q(n,n.NEAREST,n.NEAREST,n.TEXTURE_2D_ARRAY),n.bindTexture(n.TEXTURE_2D_ARRAY,null),n.bindFramebuffer(n.FRAMEBUFFER,i);for(let e of a)n.framebufferTextureLayer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+e,r,0,e);n.drawBuffers(a.map(e=>n.COLOR_ATTACHMENT0+e));let o=()=>{performance.now()-e.warmed>cr?this.freeHold(e):e.hold.timer=setTimeout(o,cr)};return e.hold={maps:r,fbo:i,stale:!0,timer:setTimeout(o,cr)}}freeBake(e){if(!e.bake)return;let{gl:t}=this,{maps:n,shadow:r,fbo:i,shadows:a}=e.bake;this.lost||(t.deleteTexture(n),t.deleteTexture(r),t.deleteFramebuffer(i),t.deleteFramebuffer(a)),e.bake=null}baked(e,t,n,r){let{gl:i}=this;if(e.bake&&(e.bake.pw!==t||e.bake.ph!==n)&&this.freeBake(e),!e.bake){i.activeTexture(i.TEXTURE0);let a=i.createTexture(),o=i.createTexture(),s=[0,1,2,3];i.bindTexture(i.TEXTURE_2D_ARRAY,a),i.texStorage3D(i.TEXTURE_2D_ARRAY,1,i.RGBA16F,t,n,s.length),q(i,i.NEAREST,i.NEAREST,i.TEXTURE_2D_ARRAY),i.bindTexture(i.TEXTURE_2D_ARRAY,null),i.bindTexture(i.TEXTURE_2D,o),i.texStorage2D(i.TEXTURE_2D,1,i.RGBA8,Math.ceil(t/2),Math.ceil(n/2)),q(i,i.LINEAR,i.LINEAR);let c=i.createFramebuffer(),l=i.createFramebuffer();i.bindFramebuffer(i.FRAMEBUFFER,c);for(let e of s)i.framebufferTextureLayer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+e,a,0,e);i.drawBuffers(s.map(e=>i.COLOR_ATTACHMENT0+e)),i.bindFramebuffer(i.FRAMEBUFFER,l),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,o,0),e.bake={pw:t,ph:n,room:r.ambient,lit:Bt(r.lighting),glow:!1,stale:!0,maps:a,shadow:o,fbo:c,shadows:l}}return e.bake}free(e){if(this.freeBake(e),this.freeHold(e),!e.tex)return;let{gl:t}=this,{A:n,H:r,S:i,E:a,G:o,M:s,D:c,N:l,C:u,O:d,T:f,mask:p,fbo:m,glow:h,weather:g,condition:_,occlusion:v,back:y,under:b,own:x,deep:S}=e.tex;if(!this.lost){for(let e of[n,r,i,a,o,s,c,l,u,d,f,p,y?.A,y?.E,y?.S,b?.H,b?.N,x?.H])e&&t.deleteTexture(e);h&&t.deleteFramebuffer(h),x&&t.deleteFramebuffer(x.fbo),S&&t.deleteRenderbuffer(S),t.deleteFramebuffer(m),t.deleteFramebuffer(g),t.deleteFramebuffer(_),t.deleteFramebuffer(v),y&&t.deleteFramebuffer(y.fbo),b&&t.deleteFramebuffer(b.fbo),b?.nfbo&&t.deleteFramebuffer(b.nfbo)}e.tex=null}bytes(e){let{gl:t}=this,n=e.spec,r=e.tex,i=this.heightFormat===t.RGBA32F?16:this.heightFormat===t.R32F?4:8,a=(4+i+(r.D?2:0)+(r.N?4:0))*(4/3)+(r.under?.N?4/3*4:0)+(r.E?4:0)+4+4+(this.targets.length>4?4:0)+(r.U?2:0)+(r.back?16:0)+(r.under?4/3*i:0)+(r.own?i+4:0),o=4/kr(n.dpr)**2+4/3+(r.G?4/3*4:0);return e.map.w*e.map.h*a+n.pw*n.ph*o+r.tops.length}mapFor(e,t,n){let r=e.spec,i=r.pw/r.cw,a=null;for(let e of t)a=V(a,B(e));for(let e of n)a=V(a,{x:e.box.x/X,y:e.box.y/X,w:e.box.w/X,h:e.box.h/X});if(!a)return{x:0,y:0,w:r.pw,h:r.ph};let o=wr(Tr(a,rr),i),s=Math.max(Math.floor(o.x/ir)*ir,0),c=Math.max(Math.floor(o.y/ir)*ir,0),l=Math.min(o.x+o.w,r.pw),u=Math.min(o.y+o.h,r.ph);return{x:s,y:c,w:Math.max(l-s,1),h:Math.max(u-c,1)}}mapUv(e){let t=e.spec,n=e.map;return[t.pw/n.w,t.ph/n.h,-n.x/n.w,-n.y/n.h]}clipMap(e,t){let{gl:n}=this,r=e.spec,{x:i,y:a,w:o,h:s}=wr(t,r.pw/r.cw);n.enable(n.SCISSOR_TEST),n.scissor(i-e.map.x,a-e.map.y,o,s)}onMap(e,t){let n=e.map;if(!t)return{x:0,y:0,w:n.w,h:n.h};let r=wr(t,e.spec.pw/e.spec.cw),i=Math.max(r.x-n.x,0),a=Math.max(r.y-n.y,0);return{x:i,y:a,w:Math.max(Math.min(r.x-n.x+r.w,n.w)-i,0),h:Math.max(Math.min(r.y-n.y+r.h,n.h)-a,0)}}capture(e,t,n){e.spec;let{gl:r}=this,i=e.tex;if(!i.back){let t=this.levels(e),n=n=>{let i=r.createTexture();return r.bindTexture(r.TEXTURE_2D,i),r.texStorage2D(r.TEXTURE_2D,t,n,e.map.w,e.map.h),q(r,r.LINEAR_MIPMAP_LINEAR,r.LINEAR),i},a=n(r.SRGB8_ALPHA8),o=n(r.SRGB8_ALPHA8),s=n(r.RGBA8),c=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,c),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,a,0),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT1,r.TEXTURE_2D,o,0),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT2,r.TEXTURE_2D,s,0),i.back={A:a,E:o,S:s,fbo:c},r.bindTexture(r.TEXTURE_2D,i.mask)}let{A:a,E:o,S:s,fbo:c}=i.back,{x:l,y:u,w:d,h:f}=this.onMap(e,n);r.bindFramebuffer(r.READ_FRAMEBUFFER,i.fbo),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,c);let p=(e,t)=>{r.readBuffer(e),r.drawBuffers(t===r.COLOR_ATTACHMENT0?[t]:t===r.COLOR_ATTACHMENT1?[r.NONE,t]:[r.NONE,r.NONE,t]),r.blitFramebuffer(l,u,l+d,u+f,l,u,l+d,u+f,r.COLOR_BUFFER_BIT,r.NEAREST)};r.disable(r.BLEND);let m=r.isEnabled(r.SCISSOR_TEST);r.disable(r.SCISSOR_TEST),p(r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT0),p(r.COLOR_ATTACHMENT3,r.COLOR_ATTACHMENT1),p(r.COLOR_ATTACHMENT2,r.COLOR_ATTACHMENT2);for(let[e,n]of[[r.TEXTURE3,a],[r.TEXTURE4,o],[r.TEXTURE5,s]])r.activeTexture(e),r.bindTexture(r.TEXTURE_2D,n),t&&r.generateMipmap(r.TEXTURE_2D);r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.FRAMEBUFFER,i.fbo),r.readBuffer(r.COLOR_ATTACHMENT0),r.drawBuffers(i.targets),r.enable(r.BLEND),m&&r.enable(r.SCISSOR_TEST)}weather(e,t){let n=e.spec,{gl:r}=this,{u:i,program:a}=this.wea;n.pw/n.cw,r.bindFramebuffer(r.FRAMEBUFFER,e.tex.weather),r.viewport(-e.map.x,-e.map.y,n.pw,n.ph),r.drawBuffers([r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1]),r.useProgram(a),r.uniform2f(i.uCanvas,n.cw,n.ch),r.uniform4f(i.uBox,0,0,n.cw,n.ch),r.uniform4f(i.uMap,...this.mapUv(e)),r.uniform2f(i.uSeed,n.seed*73.1%997-Ar(n).sx,n.seed*41.7%991-Ar(n).sy),r.uniform1f(i.uAge,n.grime),r.uniform1f(i.uDpr,n.dpr),r.uniform1i(i.tH,0),r.uniform1i(i.tN,1),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,e.tex.N),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,e.tex.H),r.enable(r.BLEND),r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);for(let n of t??[null])n&&this.clipMap(e,n),r.drawArrays(r.TRIANGLE_STRIP,0,4);r.disable(r.SCISSOR_TEST),r.disable(r.BLEND),r.bindFramebuffer(r.FRAMEBUFFER,this.bench)}raise(e,t,n,r=[]){let{tops:i,tw:a,th:o}=e.tex,s=Math.max(e.peak/.6/X,48),c=[];for(let r of t)`zTop`in r&&c.push([B(r),Math.min(Math.ceil((R(r)+n)/e.tall*255),255)]);for(let t of r)c.push([{x:t.box.x/X,y:t.box.y/X,w:t.box.w/X,h:t.box.h/X},Math.min(Math.ceil(t.hi/e.tall*255),255)]);let l=(e,t,n,r)=>{let s=Math.max(Math.floor((e.x-t)/Y),0),c=Math.min(Math.floor((e.x+e.w+t)/Y),a-1),l=Math.max(Math.floor((e.y-t)/Y),0),u=Math.min(Math.floor((e.y+e.h+t)/Y),o-1);for(let e=l;e<=u;e++)for(let t=s,o=(e*a+t)*2+n;t<=c;t++,o+=2)i[o]<r&&(i[o]=r)};for(let[e,t]of c)l(e,48,0,t);let u=Math.ceil(s/Y),d=Math.max(1,Math.ceil(u/16)),f=Math.floor(u/d)+1,p=e=>[Math.floor(Math.floor(e.x/Y)/d),Math.floor(Math.floor((e.x+e.w)/Y)/d),Math.floor(Math.floor(e.y/Y)/d),Math.floor(Math.floor((e.y+e.h)/Y)/d)],m=1/0,h=-1/0,g=1/0,_=-1/0,v=0;for(let[e]of c){let[t,n,r,i]=p(e);m=Math.min(m,t-f),h=Math.max(h,n+f),g=Math.min(g,r-f),_=Math.max(_,i+f),v+=((n-t+1)*d+2*u)*((i-r+1)*d+2*u)}m=Math.max(m,-f),h=Math.min(h,Math.floor((a-1)/d)+f),g=Math.max(g,-f),_=Math.min(_,Math.floor((o-1)/d)+f);let y=h-m+1,b=_-g+1;if(y>0&&b>0&&v<4*y*b*d*d)for(let[e,t]of c)l(e,s,1,t);else if(y>0&&b>0){let e=Yn(y*b);for(let[t,n]of c){let[r,i,a,o]=p(t);for(let t=Math.max(a,g);t<=Math.min(o,_);t++)for(let a=Math.max(r,m),o=(t-g)*y+a-m;a<=Math.min(i,h);a++,o++)e[o]<n&&(e[o]=n)}Xn(e,y,b,f);let t=Math.max(m*d,0),n=Math.min((h+1)*d-1,a-1);for(let r=Math.max(g*d,0);r<=Math.min((_+1)*d-1,o-1);r++){let o=(Math.floor(r/d)-g)*y-m;for(let s=t,c=(r*a+s)*2+1;s<=n;s++,c+=2){let t=e[o+Math.floor(s/d)];i[c]<t&&(i[c]=t)}}}let{gl:x}=this,{T:S}=e.tex;x.activeTexture(x.TEXTURE7),x.bindTexture(x.TEXTURE_2D,S),x.pixelStorei(x.UNPACK_ALIGNMENT,1),x.texSubImage2D(x.TEXTURE_2D,0,0,0,a,o,x.RG,x.UNSIGNED_BYTE,i),x.pixelStorei(x.UNPACK_ALIGNMENT,4),x.activeTexture(x.TEXTURE0)}mips(e,t,n,r=!1){let i=e.spec,{gl:a}=this;if(!n){a.bindTexture(a.TEXTURE_2D,t),a.generateMipmap(a.TEXTURE_2D);return}let o=r?wr(n,i.pw/i.cw):this.onMap(e,n),s=r?i.pw:e.map.w,c=r?i.ph:e.map.h,l=Math.max(o.x,0),u=Math.max(o.y,0),d=Math.min(o.x+o.w,s),f=Math.min(o.y+o.h,c),p=s,m=c;a.disable(a.SCISSOR_TEST),a.bindFramebuffer(a.READ_FRAMEBUFFER,this.mipFrom),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,this.mipTo);for(let e=1;p>1||m>1;e++){let n=Math.max(p>>1,1),r=Math.max(m>>1,1);(p&1||m&1)&&([l,u,d,f]=[0,0,p,m]);let i=Math.floor(l*n/p),o=Math.floor(u*r/m),s=Math.ceil(d*n/p),c=Math.ceil(f*r/m);a.framebufferTexture2D(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,t,e-1),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,t,e),a.blitFramebuffer(Math.round(i*p/n),Math.round(o*m/r),Math.round(s*p/n),Math.round(c*m/r),i,o,s,c,a.COLOR_BUFFER_BIT,a.LINEAR),[l,u,d,f,p,m]=[i,o,s,c,n,r]}a.framebufferTexture2D(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,null,0),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,null,0),a.bindFramebuffer(a.FRAMEBUFFER,this.bench),a.enable(a.SCISSOR_TEST)}spread(e,t){let{gl:n}=this,r=e.tex,i=e.map,a=this.onMap(e,t);n.disable(n.SCISSOR_TEST),n.bindFramebuffer(n.READ_FRAMEBUFFER,r.fbo),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,r.glow),n.readBuffer(n.COLOR_ATTACHMENT3),n.drawBuffers([n.COLOR_ATTACHMENT0]),n.blitFramebuffer(a.x,a.y,a.x+a.w,a.y+a.h,a.x+i.x,a.y+i.y,a.x+i.x+a.w,a.y+i.y+a.h,n.COLOR_BUFFER_BIT,n.NEAREST),n.readBuffer(n.COLOR_ATTACHMENT0),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.bindFramebuffer(n.FRAMEBUFFER,this.bench),this.mips(e,r.G,t,!0)}level(e,t){let{gl:n}=this,r=e.tex;if(n.activeTexture(n.TEXTURE6),!r.under){let t=t=>{let r=this.target(e,t,this.levels(e)),i=n.createFramebuffer();return n.bindFramebuffer(n.FRAMEBUFFER,i),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,r,0),[r,i]},[i,a]=t(this.heightFormat),[o,s]=r.N?t(n.RGBA8):[null,null];r.under={H:i,N:o,fbo:a,nfbo:s}}let{x:i,y:a,w:o,h:s}=this.onMap(e,t),c=r.under;n.bindTexture(n.TEXTURE_2D,c.H),n.activeTexture(n.TEXTURE10),n.bindTexture(n.TEXTURE_2D,c.N),n.activeTexture(n.TEXTURE0),n.disable(n.BLEND),n.disable(n.SCISSOR_TEST),n.bindFramebuffer(n.READ_FRAMEBUFFER,r.fbo);for(let[e,t,r]of[[n.COLOR_ATTACHMENT1,c.H,c.fbo],[n.COLOR_ATTACHMENT5,c.N,c.nfbo]])t&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,r),n.readBuffer(e),n.blitFramebuffer(i,a,i+o,a+s,i,a,i+o,a+s,n.COLOR_BUFFER_BIT,n.NEAREST));n.readBuffer(n.COLOR_ATTACHMENT0),this.mips(e,c.H,t),c.N&&this.mips(e,c.N,t),n.disable(n.SCISSOR_TEST),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.bindFramebuffer(n.FRAMEBUFFER,r.fbo),n.enable(n.BLEND)}clip(e,t,n,r=0){let{gl:i}=this,{x:a,y:o,w:s,h:c}=wr(e,t);i.enable(i.SCISSOR_TEST),i.scissor(r+a,n?n-o-c:o,s,c)}edgesStale(e){let{body:t}=e.spec;return!!t&&!!e.tex&&t.some((t,n)=>t!==e&&!!t.made&&t.shaped!==e.edged[n])}beside(e){let t=e.spec,n=[];if(!t.body)return n;let r=e=>Math.round(e*1e6)/1e6,i=e=>e.face-e.axis,a=(t.x+t.w/2)*X,o=(t.y+t.h/2)*X,s=i(t);for(let c of t.body){if(c===e||!c.made)continue;let l=c.spec,u=r(Math.cos(l.round-t.round)),d=r(Math.sin(l.round-t.round));if(Math.abs(u)>.01)continue;let f=(l.x+l.w/2)*X,p=(l.y+l.h/2)*X,m=i(l),h=[],g=[];for(let e of[l.x*X-f,(l.x+l.w)*X-f])for(let t of[0,c.peak-m])h.push(e*u+t*d+a),g.push(-e*d+t*u+s);let _=Math.max(...g);if(_<=0)continue;let v=Math.min(...h),y=Math.max(...h),b=l.y*X-p+o;n.push({plate:c,turn:[u,d,l.cw*X,l.ch*X],at:[f,p,m],box:{x:v,y:b,w:y-v,h:l.h*X},hi:_})}return n}section(e,t,n){let{recorder:r}=this,i=e.spec,a=(i.x+i.w/2)*X,o=(i.y+i.h/2)*X,s=i.face-i.axis,c=B(t);for(let e of n)for(let t of e.plate.made){if(t.op!==`surface`||!t.layer||t.bend)continue;let n=this.sections.get(t.shape);n&&(r.aim={box:c,seen:[e.turn[1],...e.at],from:[a,o,s],reach:B(t),rows:n},r.draw(t,e.plate))}r.aim=null}across(e,t,n){let{gl:r,recorder:i}=this,{later:a}=i,o=e.spec,s=e.tex;if(o.pw/o.cw,!s.own){let t=this.target(e,this.heightFormat,1),i=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,i),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t,0),s.own={H:t,fbo:i},n=null}s.deep||(s.deep=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,s.deep),r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_COMPONENT24,e.map.w,e.map.h),r.bindFramebuffer(r.FRAMEBUFFER,s.fbo),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,s.deep)),r.bindFramebuffer(r.FRAMEBUFFER,this.bench),e.edged=o.body.map(e=>e.shaped);let c=s.own,l=(n??[null]).map(t=>this.onMap(e,t));a.push(()=>{r.disable(r.BLEND),r.disable(r.SCISSOR_TEST),r.bindFramebuffer(r.READ_FRAMEBUFFER,s.fbo),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,c.fbo),r.readBuffer(r.COLOR_ATTACHMENT1);for(let{x:e,y:t,w:n,h:i}of l)r.blitFramebuffer(e,t,e+n,t+i,e,t,e+n,t+i,r.COLOR_BUFFER_BIT,r.NEAREST);r.readBuffer(r.COLOR_ATTACHMENT0),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.FRAMEBUFFER,s.fbo),r.drawBuffers(s.targets),r.activeTexture(r.TEXTURE8),r.bindTexture(r.TEXTURE_2D,c.H),r.activeTexture(r.TEXTURE0),r.enable(r.DEPTH_TEST),r.depthFunc(r.LESS),r.depthMask(!0)});let u=(o.x+o.w/2)*X,d=(o.y+o.h/2)*X,f=o.face-o.axis;for(let o of n??[null]){a.push(()=>{o?this.clipMap(e,o):r.disable(r.SCISSOR_TEST),r.clearBufferfv(r.DEPTH,0,[1])});for(let e of t){let t=e.turn[1],[n,r,a]=e.at;for(let s of e.plate.made){if(s.op!==`surface`||s.body||s.follow||s.bridge||s.bend||s.shape.type===`holes`||s.shape.type===`mask`)continue;let c=R(s),l=B(s),p=Math.max((n-l.x*X)*t,(n-(l.x+l.w)*X)*t)+f;if(c<=a||p<=0)continue;let m=u,h=u+(c-a)*t,g={x:Math.min(m,h)/X,y:(l.y*X-r+d)/X,w:Math.abs(h-m)/X,h:l.h};(!o||Z(g,o))&&(i.aim={box:g,seen:[t,n,r,a],from:[u,d,f],reach:l},i.draw(s,e.plate))}}}i.aim=null,a.push(()=>{r.disable(r.DEPTH_TEST),r.disable(r.SCISSOR_TEST)})}paint(e,t){let{gl:n,recorder:r}=this,{later:i}=r,{u:a,program:o}=this.mat,s=e.spec,{commands:c,began:l,stands:u,fixed:d,partial:f,moved:p,coloured:m,pictures:h,hot:g,stood:_,redrawn:v}=t,y=h.filter(e=>{if(e.kind!==`crt`&&e.kind!==`oled`)return!1;let t=B(e);return!c.some(n=>n!==e&&Or(n)&&Z(B(n),t))});for(let e of h)y.includes(e)||m.push(B(e));s.pw/s.cw;let b=c.filter(e=>e.op===`frost`);for(let e of b)e.blur===0&&e.zoom>=1&&p.some(t=>Z(B(e),t))?p.push(B(e)):e.blur===0&&e.zoom>=1&&m.some(t=>Z(B(e),t))&&m.push(B(e));let x=f?Er([...p,...m]):null;x&&x.reduce((e,t)=>e+t.w*t.h,0)>s.cw*s.ch*.5&&(x=null),x?.some(e=>b.some(t=>t.blur>0&&Z(Tr(B(t),t.blur*3),e)))&&(x=null),x?.some(e=>c.some(t=>t.op===`surface`&&t.bridge>0&&Z(B(t),e)))&&(x=null);let S=u,C=0,w=[],T=new Map;for(let e of c)if(e.op===`glass`){if(C=Math.max(C,e.height),e.shape.type===`rect`&&!e.shape.rotate&&!(e.bend&&e.bend.k>=0)){w.push(e);let t=B(e);T.set(e,c.slice(0,c.indexOf(e)).reduce((e,n)=>n.op!==`glass`&&`zTop`in n&&Z(B(n),t)?Math.max(e,R(n)):e,0))}}else`zTop`in e&&(S=Math.max(S,R(e)));let E=new Set([...w].sort((e,t)=>t.shape.hw*t.shape.hh-e.shape.hw*e.shape.hh).slice(0,8));e.paned=E,e.panes=w.filter(e=>E.has(e)).flatMap(e=>{let{shape:t,height:n,bevel:r,curve:i,film:a,rim:o,tint:s,coat:c,chamfer:l,reflect:u}=e;return[t.cx,t.cy,t.hw,t.hh,t.radius,n/(r*X),r,i,Math.max(o/X,1),...s,c,a,T.get(e)+n,l[0]/X,l[1],u]});let D=this.beside(e);for(let e of D)S=Math.max(S,e.hi);e.peak=S+C+1;let O=e.peak>40?40*2**Math.ceil(Math.log2(e.peak/40)):40;O!==e.tall&&(x=null),e.tall=O;let k=Ar(s),A=c.reduce((e,t)=>{if(t.op!==`surface`||!(t.bridge||t.rest))return e;let n=B(t);return Math.max(e,s.x-n.x,s.y-n.y,n.x+n.w-k.right,n.y+n.h-k.bottom)},0),j=D.reduce((e,{box:t})=>Math.max(e,s.x-t.x/X,s.y-t.y/X,t.x/X+t.w/X-k.right,t.y/X+t.h/X-k.bottom),0),M=Math.min(Math.ceil((s.cast>0?e.peak:0)/.75/X)+36+Math.ceil(Math.max(A,j,0)),s.room);if(!x&&M>Math.min(...(s.whole??[s.x,s.y]).slice(0,2))&&!d)return{margin:M};if(!x){let t=this.fields.missing(c.flatMap(e=>`shape`in e&&e.shape.type===`field`?[e.shape]:[]),s.dpr),n=t.reduce((e,t)=>e+this.fields.cost(t,s.dpr),0);if(t.length&&n>this.fieldRoom)return e.wanted=t,null;this.fieldRoom-=n}let N=this.mapFor(e,c,D),P=e.map;if(!e.tex)e.map=N;else if(N.x<P.x||N.y<P.y||N.x+N.w>P.x+P.w||N.y+N.h>P.y+P.h){let t=e.tex.mask;e.tex.mask=null,this.free(e),e.map=N,this.allocTextures(e,t),x=null}x||this.prepare(e);let F=e.tex;if(!F.E&&c.some(Or)){F.E=this.target(e,n.SRGB8_ALPHA8,1);let t=e.spec;F.G=n.createTexture(),n.bindTexture(n.TEXTURE_2D,F.G),n.texStorage2D(n.TEXTURE_2D,Math.floor(Math.log2(Math.max(t.pw,t.ph)))+1,n.SRGB8_ALPHA8,t.pw,t.ph),q(n,n.LINEAR_MIPMAP_LINEAR,n.LINEAR),F.glow=n.createFramebuffer(),n.bindFramebuffer(n.FRAMEBUFFER,F.glow),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,F.G,0),n.bindFramebuffer(n.FRAMEBUFFER,F.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT3,n.TEXTURE_2D,F.E,0),F.targets[3]=n.COLOR_ATTACHMENT3}!F.U&&this.undersides&&c.some(e=>e.op===`surface`&&e.mid)&&(F.U=this.target(e,n.R16F,1),n.bindFramebuffer(n.FRAMEBUFFER,F.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT6,n.TEXTURE_2D,F.U,0),F.targets=[n.COLOR_ATTACHMENT0,n.COLOR_ATTACHMENT1,n.COLOR_ATTACHMENT2,F.targets[3],F.targets[4]??n.NONE,F.targets[5]??n.NONE,n.COLOR_ATTACHMENT6]),x&&this.stats.partial++,this.block.two(this.block.at.uCanvas,s.cw,s.ch),this.block.four(this.block.at.uMap,...this.mapUv(e)),i.length=0;let I=x?.length?x.reduce((e,t)=>V(e,t)):null;for(let t of x??[null]){i.push(()=>{t&&this.clipMap(e,t);for(let e=0;e<F.targets.length;e++)n.clearBufferfv(n.COLOR,e,[0,0,0,0])});let a=!0;for(let n of c)(!t||Z(B(n),t))&&(n.op===`frost`?a&&=(i.push(()=>this.capture(e,b.some(e=>e.blur>0),I)),!1):a=!0,n.op===`surface`&&n.bridge&&i.push(()=>this.level(e,Tr(B(n),n.bridge*2))),n.op===`surface`&&n.section?this.section(e,n,D):r.draw(n,e))}if(x&&y.length){i.push(()=>n.drawBuffers([n.NONE,n.NONE,n.NONE,n.COLOR_ATTACHMENT3]));for(let t of y){let a=B(t);i.push(()=>{this.clipMap(e,a),n.clearBufferfv(n.COLOR,3,[0,0,0,0])}),r.draw(t,e);for(let n of c.slice(c.indexOf(t)+1))n.op!==`glass`&&Z(B(n),a)&&r.draw(n,e)}}s.body&&(e.made=c,this.across(e,D,x)),r.drawing=null,this.block.send(),n.bindFramebuffer(n.FRAMEBUFFER,e.tex.fbo),n.viewport(-e.map.x,-e.map.y,s.pw,s.ph),n.drawBuffers(F.targets),n.disable(n.BLEND),n.disable(n.SCISSOR_TEST),n.useProgram(o),n.uniform1i(a.uMask,0),n.uniform1i(a.uField,1),n.uniform1i(a.uScreen,2),n.uniform1i(a.uBackA,3),n.uniform1i(a.uBackE,4),n.uniform1i(a.uBackS,5),n.uniform1i(a.uBackH,6),n.uniform1i(a.uBackN,10),n.uniform1i(a.uOwn,8),n.uniform1i(a.uRows,9),n.uniform1i(a.uClipField,7),n.activeTexture(n.TEXTURE8),n.bindTexture(n.TEXTURE_2D,e.tex.own?.H??this.dark),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,null),n.activeTexture(n.TEXTURE9),n.bindTexture(n.TEXTURE_2D,null),n.activeTexture(n.TEXTURE13),n.bindTexture(n.TEXTURE_2D,null),n.activeTexture(n.TEXTURE10),n.bindTexture(n.TEXTURE_2D,e.tex.under?.N??null),n.activeTexture(n.TEXTURE2),n.bindTexture(n.TEXTURE_2D,this.screenTex),n.activeTexture(n.TEXTURE3),n.bindTexture(n.TEXTURE_2D,e.tex.back?.A??null),n.activeTexture(n.TEXTURE4),n.bindTexture(n.TEXTURE_2D,e.tex.back?.E??null),n.activeTexture(n.TEXTURE5),n.bindTexture(n.TEXTURE_2D,e.tex.back?.S??null),n.activeTexture(n.TEXTURE6),n.bindTexture(n.TEXTURE_2D,e.tex.under?.H??null),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,e.tex.mask),n.enable(n.BLEND),n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);for(let e of i)e();n.disable(n.BLEND),n.bindFramebuffer(n.FRAMEBUFFER,this.bench),this.fields.trim(),n.disable(n.SCISSOR_TEST);let L=p.length?Er(p).reduce((e,t)=>V(e,t)):null,z=!x;(z||L)&&this.mips(e,F.H,L),F.N&&(z||L)&&this.mips(e,F.N,L),s.grime>0&&(z||x.length)&&this.weather(e,x),(z||I)&&this.mips(e,F.A,I),F.E&&(this.spread(e,z?null:y.reduce((e,t)=>V(e,B(t)),I)),this.glowDrawn=!0),F.D&&(z||L)&&this.mips(e,F.D,L),n.disable(n.SCISSOR_TEST),(z||L)&&this.occlusion(e,L),n.disable(n.SCISSOR_TEST),this.probe&&this.wait(0,0),this.stats.paintMs+=performance.now()-l,this.stats.paints++,z?(e.tex.tops.fill(0),this.raise(e,c,C+1,D),e.reedge||e.shaped++):L&&this.raise(e,v,C+1),e.reedge=!1;let H=e.panes.length?tr:Math.min(er+(_+1)*nr/X,tr),U=z?[]:[...p.map(e=>Tr(e,H)),...m.map(e=>Tr(e,er))],W=U.reduce((e,t)=>V(e,t),null);if(e.bake&&(e.bake.stale=z||g&&!e.bake.glow||e.bake.stale===!0?!0:e.bake.stale?V(e.bake.stale,W):W),e.hold&&(e.hold.stale=z||e.hold.stale===!0?!0:Er([...e.hold.stale??[],...U])),z)e.heat=0;else if(g){let t=performance.now();e.heat=t-e.warmed<sr?e.heat+1:1,e.warmed=t}return e.glowing=g&&!z,{all:z||g,box:W}}beam(e,t,n){let r=Vt[n.handheld],i=n.pointer,a=t.width/e.cw,o=(i.x-t.left)/a*X,s=(i.y-t.top)/a*X,c=Ar(e),l=fr*(c.long*X/150)**.75*r.hold,u=c.cx*X,d=c.cy*X+l*.7,f=performance.now()/1e3,p=r.flicker?Math.sin(f*9.1)*.5+Math.sin(f*14.7+1)*.3+Math.sin(f*23.3+2)*.2:0,m=u+(o-u)*r.arm+p*l*.03,h=d+(s-d)*r.arm,g=l*.85,_=Math.hypot(o-m,s-h,g),v=_*Math.tan(Math.min(r.cone*2,1.35))*1.6;return{sx:m,sy:h,sz:g,ax:(o-m)/_,ay:(s-h)/_,az:-g/_,far:_,shake:p,tx:o,ty:s,pool:{x:(o-v)/X,y:(s-v)/X,w:v*2/X,h:v*2/X}}}points(e,t){let n=Nn(),r=e.spec;if(!n.size&&!this.emitters.length)return br;let i=new Float32Array(16),a=new Float32Array(12),o=t.width/r.cw,s=t.left+t.width/2,c=t.top+t.height/2,l=[],u=(e,t,n,r,i,a,o)=>{let u=o*n*n/(n*n+(e-s)**2+(t-c)**2+r*r);if(l.length===4&&!(u>l[3].gives))return;let d=l.length;for(;d>0&&l[d-1].gives<u;)d--;l.splice(d,0,{x:e,y:t,half:n,up:r,color:i,flat:a,gives:u}),l.length>4&&l.pop()};for(let e of n){let[t,n]=Pn(e.at),r=e.reach/2;u(t,n,r,e.height??r,e.color,!1,Math.max(...e.color))}for(let t of this.emitters)t.from!==e&&u(t.at[0],t.at[1],t.half,0,t.color,!0,Math.max(t.color[0],t.color[1],t.color[2]));return l.forEach(({x:e,y:n,half:s,up:c,color:l,flat:u},d)=>{let f=X/o;i.set([(e-t.left)*f,(n-t.top)*f,r.face+c*f,(u?-1:1)*(s*f)**2],d*4),a.set(l,d*3)}),{n:l.length,at:i,color:a}}poolMoved(e,t,n){let r=e.spec,i=e=>e.x<r.cw&&e.y<r.ch&&e.x+e.w>0&&e.y+e.h>0,{pool:a}=this.beam(r,n,t),o=i(e.pool);return e.pool=a,o||i(a)}light({plate:e,rect:t,lighting:n,ctx:r},i){let{gl:a}=this,o=i.pointer,s=this.sheet,c=e.spec,l=e.seat,{pw:u,ph:d,scale:f}=l,{all:p,full:m,sweeping:h,ambient:g,look:_,lights:v,torch:y}=i,b=performance.now(),x=p?null:c.lightDirty?c.lightBox:e.roughBox,S=u/c.cw,C=s.height-l.y-d,w=()=>a.viewport(l.x,C,u,d),T=jr(c,i),E=h&&!i.sizing&&!_&&!T&&this.linked()?this.fast:null,D=e.heat>=or&&b-e.warmed<cr,O=D&&!c.debug&&f===1&&!E&&!T&&this.glowLinked()?this.glow:null,k=Bt(n),{room:A,brush:j}=this.rooms.for(k,i.tilt);e.hold&&(E||T||f<1||c.debug||p||c.lightDirty&&!x&&!e.glowing||e.hold.lit!==k)&&(e.hold.stale=!0),e.hold&&(e.hold.lit=k);let M=Math.max(pr,Ar(c).long*X*(c.lean||c.turns?hr:mr)),N=Math.tan(_*Math.PI/180)*M*o.i,P=Math.tan(i.tilt*Math.PI/180)*M,F=0,I=0,L=Math.sign(c.spin)*(Math.abs(c.spin)<Math.PI/2?Math.min(Math.abs(c.spin),yr):Math.max(Math.abs(c.spin),Math.PI-yr));if(T){let e=t.width/c.cw,n=Math.tan(c.lean*Math.PI/180)*M;if(c.spin)F=Math.tan(L)*M,I=c.turn[1]*n;else if(i.carried){let r=(o.x-t.left-(c.x+c.w/2)*e)/(c.w/2*e),i=(o.y-t.top-(c.y+c.h/2)*e)/(c.h/2*e),a=n*c.hand/Math.max(Math.hypot(r,i),1);F=r*a,I=i*a}else F=c.turn[0]*n,I=c.turn[1]*n}if(c.angle[0]||c.angle[1]||c.eye[0]||c.eye[1]){let[e,t,n]=_r(c.angle,c.eye),r=Math.hypot(e,t)/n,i=Math.min(1,Math.tan(gr*Math.PI/180)/r)/n;F+=e*i*M,I+=t*i*M}let R=Vt[i.handheld],z=y*o.i>0?this.beam(c,t,i):null,B=y*o.i*R.power*(1+(z?.shake??0)*R.flicker);z?(!p||m||v||_||!e.pool||c.lightDirty&&!c.lightBox||(x=V(V(e.pool,z.pool),c.lightDirty?c.lightBox:null)),e.pool=z.pool):e.pool=null;let H=e.rough;e.rough=f<this.fit(c)||!!E,e.roughBox=e.rough&&x&&(!H||e.roughBox)?V(e.roughBox,x):null;let U=this.points(e,t),W=({u:n,program:s},l=z)=>{a.useProgram(s),a.uniform2f(n.uCss,c.cw,c.ch),a.uniform4f(n.uMap,...this.mapUv(e));let u=Ar(c),d=u.cx*X,p=u.cy*X,m=u.long*X;a.uniform4f(n.uFrame,u.sx,u.sy,u.right+(c.whole?c.whole[0]:c.x),u.bottom+(c.whole?c.whole[1]:c.y));let h=(o.x-i.width/2)/(i.width/2),_=(o.y-i.height/2)/(i.height/2);a.uniform3f(n.uCam,d-P*.44+h*N+F,p+P*.9+_*N+I,M),a.uniform1f(n.uPeak,e.peak),a.uniform1f(n.uTall,e.tall),a.uniform1f(n.uFace,c.face),a.uniform2f(n.uSpin,1/Math.cos(L),c.spin?c.axis:0),a.uniform3f(n.uOwn,...c.owns),a.uniform2f(n.uRound,Math.sin(L),Math.cos(L)),a.uniform1f(n.uLift,Math.max(c.face-c.cast,0)),a.uniform4f(n.uBody,c.x+c.w/2,c.y+c.h/2,c.w/2,c.h/2),a.uniform1i(n.uPanes,e.panes.length/18),a.uniform1i(n.uGlow,D&&e.tex.E?1:0),a.uniform1i(n.uLinear,this.staged&&!r?1:0),e.panes.length&&a.uniform1fv(n[`uPane[0]`],e.panes),a.uniform1f(n.uDpr,c.dpr*f);let y=v*c.hand,b=Math.sqrt(i.width*i.height)/2,x=1-y*.65,S=(o.x-t.left-t.width/2)/b,C=(o.y-t.top-t.height/2)/b,[w,T,E]=_r(c.angle,[m*(k.lamp[0]*x+S*k.sway*y),m*(k.lamp[1]*x+C*k.sway*y),m*3]),O=w,A=E-(c.face-c.axis),j=Math.sin(L),V=Math.cos(L);a.uniform3f(n.uKey,d+O*V+A*j,p+T,c.face-c.axis-O*j+A*V);let[H,W,ee]=_r(c.angle,[k.lamp[0],k.lamp[1],3]),G=Math.hypot(H,W,ee);a.uniform3f(n.uSky,(H*V+ee*j)/G,W/G,(ee*V-H*j)/G),a.uniform1f(n.uLamp,5.2*k.power),a.uniform1f(n.uLampSoft,k.soft),a.uniform1f(n.uLampHead,k.camera),a.uniform1f(n.uFill,k.fill),a.uniform1f(n.uPageShade,k.shadow),a.uniform3f(n.uRoomColor,...k.color),a.uniform1f(n.uRoom,g),l?(a.uniform4f(n.uTorch,l.sx,l.sy,l.sz,B),a.uniform3f(n.uAim,l.ax,l.ay,l.az),a.uniform4f(n.uBeam,R.core,R.flood,R.edge,R.spill),a.uniform4f(n.uCone,R.cone,l.sz,R.rings,R.fluoresce),a.uniform3f(n.uTint,...R.color)):a.uniform4f(n.uTorch,0,0,1,0),a.uniform1i(n.uPoints,U.n),U.n&&(a.uniform4fv(n[`uPoint[0]`]??null,U.at),a.uniform3fv(n[`uPointColor[0]`]??null,U.color)),a.uniform1i(n.uDebug,c.debug),a.uniform1f(n.uSplit,c.split<0?-1:(c.x+c.w*c.split)*X)},ee=(...e)=>e.forEach((e,t)=>{a.activeTexture(a.TEXTURE0+t),a.bindTexture(a.TEXTURE_2D,e)});a.activeTexture(a.TEXTURE12),a.bindTexture(a.TEXTURE_2D,e.tex.U??this.dark),a.activeTexture(a.TEXTURE13),a.bindTexture(a.TEXTURE_2D,e.tex.N??this.dark),a.activeTexture(a.TEXTURE15),a.bindTexture(a.TEXTURE_2D_ARRAY,j);let G=[e.tex.A,e.tex.H,e.tex.S,e.tex.G??this.dark,A,e.tex.C,e.tex.O,e.tex.T,e.tex.M,e.tex.D];if(E){let t=this.baked(e,u,d,i);(t.room!==g||t.lit!==k||t.glow!==D)&&(t.stale=!0),t.room=g,t.lit=k,t.glow=D;let n=(e,t)=>{a.activeTexture(a.TEXTURE10),a.bindTexture(a.TEXTURE_2D_ARRAY,e),a.activeTexture(a.TEXTURE11),a.bindTexture(a.TEXTURE_2D,t)};n(null,null),ee(...G),t.stale&&(a.bindFramebuffer(a.FRAMEBUFFER,t.fbo),a.viewport(0,0,u,d),W(E.bake,null),t.stale!==!0&&this.clip(t.stale,S,d),a.drawArrays(a.TRIANGLE_STRIP,0,4),a.disable(a.SCISSOR_TEST),t.stale=null,this.stats.bakes++),a.bindFramebuffer(a.FRAMEBUFFER,t.shadows),a.viewport(0,0,Math.ceil(u/2),Math.ceil(d/2)),W(E.shadows),n(t.maps,null),x&&this.clip(Tr(x,4),S/2,Math.ceil(d/2)),a.drawArrays(a.TRIANGLE_STRIP,0,4),a.disable(a.SCISSOR_TEST),a.bindFramebuffer(a.FRAMEBUFFER,this.bench),w(),W(E.quick),a.uniform2f(E.quick.u.uShift,-l.x,l.y),n(t.maps,t.shadow)}else if(O){let t=this.holding(e),n=t.stale;if(a.activeTexture(a.TEXTURE10),a.bindTexture(a.TEXTURE_2D_ARRAY,null),ee(...G),n){a.bindFramebuffer(a.FRAMEBUFFER,t.fbo),a.viewport(0,0,u,d),W(O.hold),a.uniform2f(O.hold.u.uShift,0,s.height-d);for(let e of n===!0?[null]:n)e&&this.clip(e,S,d),a.drawArrays(a.TRIANGLE_STRIP,0,4);a.disable(a.SCISSOR_TEST),t.stale=null,a.bindFramebuffer(a.FRAMEBUFFER,this.bench)}w(),W(O.emit),a.uniform2f(O.emit.u.uShift,-l.x,l.y),a.activeTexture(a.TEXTURE10),a.bindTexture(a.TEXTURE_2D_ARRAY,t.maps),this.stats.glows++}else w(),W(this.lit),a.uniform2f(this.lit.u.uShift,-l.x,l.y),ee(...G);a.bindFramebuffer(a.FRAMEBUFFER,this.bench),x&&this.clip(x,S,C+d,l.x),a.drawArrays(a.TRIANGLE_STRIP,0,4),a.disable(a.SCISSOR_TEST),a.activeTexture(a.TEXTURE0),this.probe&&this.wait(l.x,C),l.box=x,this.stats.lightMs+=performance.now()-b,this.stats.lights++,e.glowing=!1}copyOut({plate:e,ctx:t}){let n=performance.now(),{x:r,y:i,pw:a,ph:o,box:s}=e.seat,c=this.canvas,l=e.spec,u=t;if(u.canvas.width!==l.pw&&(u.canvas.width=l.pw),u.canvas.height!==l.ph&&(u.canvas.height=l.ph),u.globalCompositeOperation=`copy`,s){let{x:e,y:t,w:n,h:o}=wr(s,l.pw/l.cw),d=a/l.pw;u.save(),u.beginPath(),u.rect(e,t,n,o),u.clip(),u.drawImage(c,r+e*d,i+t*d,n*d,o*d,e,t,n,o),u.restore()}else u.drawImage(c,r,i,a,o,0,0,l.pw,l.ph);u.clearRect(l.pw-2,0,2,l.ph),u.clearRect(0,l.ph-2,l.pw,2),this.stats.copyMs+=performance.now()-n,this.stats.copies++}copyThrough({plate:e,ctx:t}){let n=performance.now(),{gl:r}=this,i=this.canvas,a=e.spec,o=t,{x:s,y:c,pw:l,ph:u,box:d}=e.seat;o.canvas.width!==a.pw&&(o.canvas.width=a.pw),o.canvas.height!==a.ph&&(o.canvas.height=a.ph);let f=l/a.pw,p=this.sheet.height-c-u,m=d?wr(d,a.pw/a.cw):{x:0,y:0,w:a.pw,h:a.ph},h=Math.max(Math.floor(i.width/Math.max(f,1)),1),g=Math.max(Math.floor(i.height/Math.max(f,1)),1);r.bindFramebuffer(r.READ_FRAMEBUFFER,this.bench),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),o.globalCompositeOperation=`copy`;for(let e=m.y;e<m.y+m.h;e+=g)for(let t=m.x;t<m.x+m.w;t+=h){let n=Math.min(h,m.x+m.w-t),a=Math.min(g,m.y+m.h-e),c=Math.round(n*f),l=Math.round(a*f);r.blitFramebuffer(s+Math.round(t*f),p+u-Math.round((e+a)*f),s+Math.round(t*f)+c,p+u-Math.round((e+a)*f)+l,0,i.height-l,c,i.height,r.COLOR_BUFFER_BIT,r.NEAREST),o.save(),o.beginPath(),o.rect(t,e,n,a),o.clip(),o.drawImage(i,0,0,c,l,t,e,n,a),o.restore()}o.clearRect(a.pw-2,0,2,a.ph),o.clearRect(0,a.ph-2,a.pw,2),r.bindFramebuffer(r.FRAMEBUFFER,this.bench),this.stats.copyMs+=performance.now()-n,this.stats.copies++}keep({plate:e}){let t=performance.now(),{gl:n}=this,r=e.spec,{x:i,y:a,pw:o,ph:s}=e.seat,c=e.picture,l=e.seat.box;if(!c||c.pw!==r.pw||c.ph!==r.ph){this.freePicture(e);let t=n.createTexture(),i=n.createFramebuffer();n.bindTexture(n.TEXTURE_2D,t),n.texStorage2D(n.TEXTURE_2D,Math.floor(Math.log2(Math.max(r.pw,r.ph)))+1,n.RGBA16F,r.pw,r.ph),q(n,n.LINEAR_MIPMAP_LINEAR,n.LINEAR),n.bindFramebuffer(n.FRAMEBUFFER,i),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,t,0),c=e.picture={tex:t,fbo:i,pw:r.pw,ph:r.ph,box:[0,0,0,0,0]},l=null}let u=o/r.pw,d=this.sheet.height-a-s,f=l?wr(l,r.pw/r.cw):{x:0,y:0,w:r.pw,h:r.ph};n.bindFramebuffer(n.READ_FRAMEBUFFER,this.bench),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,c.fbo),n.blitFramebuffer(i+f.x*u,d+s-(f.y+f.h)*u,i+(f.x+f.w)*u,d+s-f.y*u,f.x,r.ph-f.y-f.h,f.x+f.w,r.ph-f.y,n.COLOR_BUFFER_BIT,u===1?n.NEAREST:n.LINEAR),n.bindFramebuffer(n.FRAMEBUFFER,c.fbo),n.enable(n.SCISSOR_TEST),n.clearColor(0,0,0,0),n.scissor(r.pw-2,0,2,r.ph),n.clear(n.COLOR_BUFFER_BIT),n.scissor(0,0,r.pw,2),n.clear(n.COLOR_BUFFER_BIT),this.mips(e,c.tex,l&&{x:l.x,y:r.ch-l.y-l.h,w:l.w,h:l.h},!0),n.disable(n.SCISSOR_TEST),n.bindFramebuffer(n.FRAMEBUFFER,this.bench),c.box=[r.x,r.y,r.cw,r.ch,r.w],this.stats.copyMs+=performance.now()-t}pictureBytes(e){let t=e.picture;return t?t.pw*t.ph*8*(4/3):0}shrink(e){let t=e.picture,n=t?Math.max(t.pw,t.ph):0;if(!t||this.lost||n<=Qn)return;let{gl:r}=this,i=Math.ceil(Math.log2(n/Qn)),a=Math.max(Math.floor(t.pw/2**i),1),o=Math.max(Math.floor(t.ph/2**i),1),s=r.createTexture(),c=r.createFramebuffer();r.bindTexture(r.TEXTURE_2D,s),r.texStorage2D(r.TEXTURE_2D,Math.floor(Math.log2(Math.max(a,o)))+1,r.RGBA16F,a,o),q(r,r.LINEAR_MIPMAP_LINEAR,r.LINEAR),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,c),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,s,0),r.bindFramebuffer(r.READ_FRAMEBUFFER,this.mipFrom),r.framebufferTexture2D(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t.tex,i),r.disable(r.SCISSOR_TEST),r.blitFramebuffer(0,0,a,o,0,0,a,o,r.COLOR_BUFFER_BIT,r.NEAREST),r.generateMipmap(r.TEXTURE_2D),r.bindFramebuffer(r.FRAMEBUFFER,this.bench),this.freePicture(e),e.picture={tex:s,fbo:c,pw:a,ph:o,box:t.box}}wait(e,t){let{gl:n}=this;this.staged?n.readPixels(e,t,1,1,n.RGBA,n.FLOAT,this.pxLight):n.readPixels(e,t,1,1,n.RGBA,n.UNSIGNED_BYTE,this.px)}forget(e){this.freePicture(e)}freePicture(e){let t=e.picture;e.picture=null,t&&!this.lost&&(this.gl.deleteTexture(t.tex),this.gl.deleteFramebuffer(t.fbo))}stage(){return this.staged||(this.staged=!0,this.sheet={width:this.canvas.width,height:this.canvas.height},this.makeBench()),this.lost||En(this.gl),this.canvas}unstage(){if(!this.staged)return;let{gl:e}=this,t=this.canvas;this.staged=!1,En(null),t.remove(),t.width=this.sheet.width,t.height=this.sheet.height,this.lost||(this.benchTex&&e.deleteTexture(this.benchTex),this.bench&&e.deleteFramebuffer(this.bench),this.lens?.free()),this.bench=this.benchTex=null,this.lens=null,this.sheet=t;for(let e of this.plates)this.freePicture(e);e.bindFramebuffer(e.FRAMEBUFFER,null)}makeBench(){let{gl:e}=this;this.bench=e.createFramebuffer(),this.benchTex=null,this.sizeBench()}sizeBench(){let{gl:e}=this,{width:t,height:n}=this.sheet;this.benchTex&&e.deleteTexture(this.benchTex),this.benchTex=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.benchTex),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA16F,Math.max(t,1),Math.max(n,1)),q(e,e.NEAREST,e.NEAREST),e.bindFramebuffer(e.FRAMEBUFFER,this.bench),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this.benchTex,0)}show(e,t,n,r,i=0,a=0){let{gl:o}=this,s=this.canvas,c=Math.max(Math.round(t*r),1),l=Math.max(Math.round(n*r),1);s.width!==c&&(s.width=c),s.height!==l&&(s.height=l);let u=this.lens??=new un(o);u.begin(c,l);let d=wn(),f=d.size?{gl:o,w:t,h:n,left:i,top:a,ratio:r,target:u.fbo}:null,p=null;if(f)for(let e of d)p=e.before(f)??p;let{program:m,u:h}=p?this.bent:this.show_,g=()=>{o.bindFramebuffer(o.FRAMEBUFFER,u.fbo),o.viewport(0,0,c,l),o.disable(o.SCISSOR_TEST),o.enable(o.BLEND),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.bindVertexArray(this.vao),o.useProgram(m),o.uniform1i(h.tP,0),p&&(o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,p),o.uniform1i(h.tBend,1),o.uniform2f(h.uStagePx,c,l)),o.activeTexture(o.TEXTURE0)};f?g():(o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.useProgram(m),o.uniform1i(h.tP,0),o.activeTexture(o.TEXTURE0));for(let{picture:t,plate:n,x:i,y:a,w:s,h:u}of e){let e=Math.round(i*r),m=Math.round(a*r),_=Math.abs(s*r-t.pw)<1?t.pw:s*r,v=Math.abs(u*r-t.ph)<1?t.ph:u*r;if(o.uniform4f(h.uRect,e/c*2-1,1-m/l*2,(e+_)/c*2-1,1-(m+v)/l*2),p&&o.uniform2f(h.uUvPerMm,1/(t.box[2]*X),1/(t.box[3]*X)),o.bindTexture(o.TEXTURE_2D,t.tex),o.drawArrays(o.TRIANGLE_STRIP,0,4),!f)continue;let y=e/r,b=m/r,x=_/r,S=v/r,[C,w,T,E]=n.tex?this.mapUv(n):[1,1,0,0],D={height:n.tex?.H??null,toMap:[C/x,w/S,T-C*y/x,E-w*b/S],mmPerPx:t.box[2]*X/x,face:n.spec.face,box:[y,b,x,S]};for(let e of d)e.shot(D,f);g()}if(f)for(let e of d)e.after(f),g();u.finish(this.exposure,this.backdrop),o.bindFramebuffer(o.FRAMEBUFFER,this.bench),this.stats.stages++}glowing(e,t,n,r=!0){let{gl:i}=this,a=this.glowBack;if(this.glowBack=null,this.glowReads.length||this.lost||!r)return a;let o=e(),s=this.glowAt;if(!s||s.w!==t||s.h!==n){s&&(i.deleteFramebuffer(s.fbo),i.deleteTexture(s.tex));let e=i.createTexture();i.bindTexture(i.TEXTURE_2D,e),i.texStorage2D(i.TEXTURE_2D,1,i.RGBA8,t,n);let r=i.createFramebuffer();i.bindFramebuffer(i.FRAMEBUFFER,r),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,e,0),s=this.glowAt={fbo:r,tex:e,w:t,h:n}}i.bindFramebuffer(i.FRAMEBUFFER,s.fbo),i.viewport(0,0,t,n),i.disable(i.SCISSOR_TEST),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE);let{program:c,u:l}=this.show_;i.useProgram(c),i.uniform1i(l.tP,0),i.activeTexture(i.TEXTURE0);for(let{plate:e,x:r,y:a,w:s,h:c}of o)e.tex?.G&&(i.uniform4f(l.uRect,r/t*2-1,a/n*2-1,(r+s)/t*2-1,(a+c)/n*2-1),i.bindTexture(i.TEXTURE_2D,e.tex.G),i.drawArrays(i.TRIANGLE_STRIP,0,4));i.disable(i.BLEND);let u=i.createBuffer();return i.bindBuffer(i.PIXEL_PACK_BUFFER,u),i.bufferData(i.PIXEL_PACK_BUFFER,t*n*4,i.STREAM_READ),i.readPixels(0,0,t,n,i.RGBA,i.UNSIGNED_BYTE,0),i.bindBuffer(i.PIXEL_PACK_BUFFER,null),this.glowReads.push({pbo:u,sync:i.fenceSync(i.SYNC_GPU_COMMANDS_COMPLETE,0),w:t,h:n,shots:o}),i.bindFramebuffer(i.FRAMEBUFFER,this.bench),a}glowDrawn=!1;get glowPending(){return this.glowReads.length>0||!!this.glowBack}read(e){let t=e.picture;if(!t||this.lost)return null;let{gl:n}=this,r=new Float32Array(t.pw*t.ph*4),i=t.pw*4;n.bindFramebuffer(n.FRAMEBUFFER,t.fbo),n.readPixels(0,0,t.pw,t.ph,n.RGBA,n.FLOAT,r),n.bindFramebuffer(n.FRAMEBUFFER,this.bench);let a=new Uint8ClampedArray(r.length),o=this.exposure;for(let e=0;e<t.ph;e++)for(let n=(t.ph-1-e)*i,s=e*i,c=n+i;n<c;n+=4,s+=4){let e=Math.min(Math.max(r[n+3],0),1),t=e>.002?e:1,i=fn(r[n]*o/t,r[n+1]*o/t,r[n+2]*o/t);a[s]=i[0]*e*255+.5,a[s+1]=i[1]*e*255+.5,a[s+2]=i[2]*e*255+.5,a[s+3]=e*255+.5}return new ImageData(a,t.pw,t.ph)}seatFor(e,t,n){let r=t.width*(n.sizing?1:n.ratio)*(n.sweeping&&jr(e,n)?vr:1),i=Math.min(n.sizing||n.sweeping?Math.max(r/e.pw,.125):1,this.fit(e));return{x:0,y:0,scale:i,pw:Math.round(e.pw*i),ph:Math.round(e.ph*i),box:null}}lightAll(e,t,n,r){let i=[],a=this.gl,o=this.sheet,s=(e,t)=>{try{t()}catch(t){r(e,t)}},c=0,l=0,u=0,d=()=>{for(let e of i)s(e,()=>e.ctx?this.staged?this.copyThrough(e):this.copyOut(e):this.keep(e));i.length=c=l=u=0};for(let n of e)n.plate.seat=this.seatFor(n.plate.spec,n.rect,t);a.bindFramebuffer(a.FRAMEBUFFER,this.bench),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT);for(let r of e.sort((e,t)=>t.plate.seat.ph-e.plate.seat.ph)){let e=r.plate.seat;c+e.pw>o.width&&(c=0,l+=u+$n,u=0),l+e.ph>o.height&&(d(),a.clear(a.COLOR_BUFFER_BIT)),e.x=c,e.y=l,s(r,()=>{this.light(r,t),n(r),i.push(r)}),c+=e.pw+$n,u=Math.max(u,e.ph)}d()}};function Nr(e,t){let n=document.createTreeWalker(e.el,NodeFilter.SHOW_TEXT),r=[];for(;n.nextNode();){let i=n.currentNode;i.data.trim()&&i.parentElement.closest(t)===e.el&&r.push(i)}return r}function Pr(e,t,n){let r=getComputedStyle(e),i=t.map(e=>e.data).join(``).replace(/\s+/g,` `).trim(),a=r.textTransform===`uppercase`?i.toUpperCase():i;n.font=`${r.fontStyle} ${r.fontWeight} ${r.fontSize} ${r.fontFamily}`,n.letterSpacing=`0px`,n.wordSpacing=r.wordSpacing;let o=e.clientWidth-parseFloat(r.paddingLeft)-parseFloat(r.paddingRight),s=n.measureText(a).width;n.wordSpacing=`0px`;let c=(o-s)/Math.max([...a].length-1,1);(Math.abs(parseFloat(e.style.letterSpacing||`NaN`)-c)>.01||!e.style.letterSpacing)&&(e.style.letterSpacing=`${c.toFixed(2)}px`),e.style.textAlign!==`left`&&(e.style.textAlign=`left`)}function Fr(e,t,n,r,i,a,o){t.width=e.pw,t.height=e.ph,n.setTransform(e.dpr,0,0,e.dpr,0,0),n.fillStyle=`#000`,n.fillRect(0,0,e.cw,e.ch),n.fillStyle=n.strokeStyle=`#fff`;let s=document.createRange(),c=tt();for(let t of e.list){if(o(t.el),t.label=null,n.save(),t.mask=t.def.mask?.(n,t)??null,n.restore(),!t.def.label)continue;let e=Nr(t,c);if(!e.length)continue;t.el.hasAttribute(`fit`)&&Pr(t.el,e,n);let l=getComputedStyle(t.el),u=`${l.fontStyle} ${l.fontWeight} ${l.fontSize} ${l.fontFamily}`,d=l.letterSpacing===`normal`?`0px`:l.letterSpacing;n.font=u,n.letterSpacing=d,n.textBaseline=`alphabetic`,n.textAlign=`left`;let f=n.measureText(`Hg`),p=f.fontBoundingBoxAscent,m=f.fontBoundingBoxDescent,h=new Map;for(let t of e)for(let e of t.data.matchAll(/\S+/g)){s.setStart(t,e.index),s.setEnd(t,e.index+e[0].length);let o=s.getBoundingClientRect(),c=o.width/a,u=o.height/a;if(!c)continue;let d=l.textTransform===`uppercase`?e[0].toUpperCase():e[0],f=(o.left-r)/a,g=(o.top-i)/a;n.fillText(d,f,g+(u-p-m)/2+p);let _=h.get(Math.round(g));_?(_.text+=` ${d}`,_.w=f+c-_.x):h.set(Math.round(g),{x:f,y:g,w:c,h:u,text:d})}let g=[...h.values()];if(!g.length)continue;let _=Math.min(...g.map(e=>e.x)),v=g[0].y,y=Math.max(...g.map(e=>e.x+e.w)),b=g[g.length-1].y+g[g.length-1].h;t.label={x:_-2,y:v-2,w:y-_+4,h:b-v+4,text:g.map(e=>e.text).join(` `),font:u,letterSpacing:d,wordSpacing:l.wordSpacing===`normal`?`0px`:l.wordSpacing,lines:g.map(e=>({...e,x:e.x-2,y:e.y-2,w:e.w+4,h:e.h+4}))}}}var Ir=e=>2*2**Math.max(Math.round(-Math.log2(e)),0),Lr=e=>`rgb(${e&255} ${e>>8&255} ${e*89&255})`,Rr=(e,t,n)=>{let r=e|t<<8;return(r*89&255)===n?r:0};function zr(e,t,n,r,i,a){let o=``,s=n=>{let r=[];for(let i=0;i<t;i++)if(e[n*t+i]){let a=i;for(;i<t&&e[n*t+i];)i++;r.push(a,i)}return r};for(let e=0;e<n;){let t=s(e),c=t.join(),l=e+1;for(;l<n&&s(l).join()===c;)l++;for(let n=0;n<t.length;n+=2)o+=`M${t[n]*a+r} ${e*a+i}h${(t[n+1]-t[n])*a}v${(l-e)*a}h${(t[n]-t[n+1])*a}z`;e=l}return o||`M0 0z`}function Br(e,t){e.reachDirty=!1;let n=e.reachCell,r=new Set;for(let t of e.list)for(let n=t.el.parentElement;n&&n!==e.el;n=n.parentElement)r.add(n);let i=Math.ceil(e.cw/n),a=Math.ceil(e.ch/n);t.width=i,t.height=a;let o=t.getContext(`2d`,{willReadFrequently:!0});o.scale(1/n,1/n);let s=new Map;e.list.forEach((t,n)=>{let i=getComputedStyle(t.el),a=n+1;t.hit=t.el!==e.el&&!r.has(t.el)&&i.pointerEvents!==`none`&&i.transform===`none`&&t.w>0;let c=!1;o.fillStyle=Lr(a);for(let e of t.commands??[]){if(e.op===`glass`?!e.covers:e.op!==`surface`||e.zTop<e.zEdge||e.bend||e.shape.type===`mask`||e.shape.type===`holes`||e.shape.ring)continue;let{grow:t,...n}=e.shape;E(o,n),c=!0}t.hit&&c?s.set(a,t):(t.el.hasAttribute(`d-reach`)||t.el.style.clipPath)&&Vr(t)});let{data:c}=o.getImageData(0,0,i,a),l=new Uint16Array(i*a),u=new Int32Array((e.list.length+1)*4).fill(-1);for(let t=0,n=0;t<a;t++)for(let r=0;r<i;r++,n++){if(c[n*4+3]!==255)continue;let i=Rr(c[n*4],c[n*4+1],c[n*4+2]);if(!i||i>e.list.length)continue;l[n]=i;let a=i*4;u[a]<0?(u[a]=u[a+2]=r,u[a+1]=u[a+3]=t):(u[a]=Math.min(u[a],r),u[a+1]=Math.min(u[a+1],t),u[a+2]=Math.max(u[a+2],r),u[a+3]=Math.max(u[a+3],t))}for(let[t,r]of s){let a=Math.floor(r.x/n),o=Math.floor(r.y/n),c=Math.ceil((r.x+r.w)/n),d=Math.ceil((r.y+r.h)/n),f=a,p=o,m=c,h=d,g=!0;u[t*4]>=0&&(f=Math.min(f,u[t*4]),p=Math.min(p,u[t*4+1]),m=Math.max(m,u[t*4+2]+1),h=Math.max(h,u[t*4+3]+1));let _=m-f,v=m>f?h-p:0,y=new Uint8Array(_*v),b=(e,t)=>y[(t-p)*_+(e-f)]=1;for(let n=p;n<h;n++)for(let u=f;u<m;u++){let f=l[n*i+u],p=u>=a&&u<c&&n>=o&&n<d;f===t||p&&(!f||f<t&&!s.has(f)||e.list[f-1].el.contains(r.el))?b(u,n):p&&(g=!1)}let x=f<a||p<o||m>c||h>d;if(g&&!x){Vr(r);continue}getComputedStyle(r.el).position===`static`&&(r.el.style.position=`relative`);let S=f*n-r.x,C=p*n-r.y;r.el.style.clipPath=`path("${zr(y,_,v,+S.toFixed(2),+C.toFixed(2),n)}")`,x?(r.el.setAttribute(`d-reach`,``),r.el.style.setProperty(`--reach-x`,`${S}px`),r.el.style.setProperty(`--reach-y`,`${C}px`),r.el.style.setProperty(`--reach-w`,`${_*n}px`),r.el.style.setProperty(`--reach-h`,`${v*n}px`)):r.el.removeAttribute(`d-reach`)}e.observer.takeRecords()}function Vr(e){e.el.style.clipPath=``,e.el.removeAttribute(`d-reach`)}var Hr=new WeakMap,Ur=new Set;function Wr(e,t){let n=e.currentCSSZoom;if(n===void 0)return e.offsetWidth?(t??e.getBoundingClientRect()).width/e.offsetWidth:1;let r=n;for(let t=e.closest(`[data-camera]`);t;t=t.parentElement?.closest(`[data-camera]`)??null)r*=Hr.get(t)?.scale??1;return r}function Gr(e,t,n=!0){let r=Hr.get(e);r?r.scale=t:(Hr.set(e,{scale:t,stage:n}),e.dataset.camera=``);for(let t of Ur)t(e)}var Kr=e=>Hr.get(e)?.scale,qr=e=>Hr.get(e)?.stage??!1,Jr=e=>Ur.add(e),Yr=new Map,Xr=new Set;function Zr(e){let t=getComputedStyle(e),n=e.getBoundingClientRect();return n.width/Wr(e,n)-parseFloat(t.paddingLeft)-parseFloat(t.paddingRight)-parseFloat(t.borderLeftWidth)-parseFloat(t.borderRightWidth)}var Qr=e=>e.el.dispatchEvent(new Event(`fitted`,{bubbles:!0}));function $r(e){for(let t of e)t.el.style.zoom=`1`;for(let t of e){let e=t.el.getBoundingClientRect(),n=Wr(t.el,e);t.w=e.width/n,t.h=e.height/n}for(let t of e)t.el.style.zoom=String(Math.min(t.view(t.w,t.h),t.across/t.w))}function ei(e){let t=Array.isArray(e)?new Set(e.map(e=>e.target)):null,n=[...Yr.values()].filter(e=>!t||t.has(e.holder)).flatMap(e=>{let t=Zr(e.holder),n=e.el.getBoundingClientRect(),r=Wr(e.el,n),i=Math.abs(n.width/r-e.w)>.5||Math.abs(n.height/r-e.h)>.5;return t===e.across&&!i?[]:[{f:e,across:t,flows:i}]});for(let{f:e,across:t,flows:r}of n)e.across=t,r||(e.el.style.zoom=String(Math.min(e.view(e.w,e.h),t/e.w)));$r(n.filter(e=>e.flows).map(e=>e.f));for(let{f:e}of n)Qr(e)}var ti=null;function ni(e,t,n){let r=e.parentElement;if(!r)return null;ti||(ti=new ResizeObserver(ei),addEventListener(`resize`,ei));let i={el:e,holder:r,view:t,framed:n,across:Zr(r),w:0,h:0};return Yr.set(e,i),ti.observe(r),i}function ri(e){let t=Yr.get(e);t&&(Yr.delete(e),Xr.delete(t),[...Yr.values()].some(e=>e.holder===t.holder)||ti.unobserve(t.holder))}function ii(e,t=()=>1){ri(e);let n=ni(e,t,!0);return n?($r([n]),Qr(n),()=>ri(e)):()=>{}}function ai(e,t=!1){if(Yr.get(e)?.framed)return;ri(e);let n=e.getAttribute(`scale`)?.trim();if(!n){t&&(e.style.zoom=``);return}let[r,i]=n.split(/\s+/);if(r!==`fit`){e.style.zoom=String(+r||1);return}let a=+(i??1)||1,o=ni(e,()=>a,!1);o&&(Xr.size||queueMicrotask(()=>{let e=[...Xr];Xr.clear(),$r(e),e.forEach(Qr)}),Xr.add(o))}function oi(e){Yr.get(e)?.framed||ri(e)}var si=.18,ci=si*120,li=e=>((1.219+ci**.4)/(1.219+Math.max(e,1e-4)**.4))**2.5,ui=.1,di=.4,fi=e=>{let t=.04/(.04+e);return t*di+(1-t)*ui},pi=class e{adapted=null;at=0;settled=!0;static target(e){return 120*(si*(e.room+e.lights)+e.glow)}look(t,n=performance.now()){let r=e.target(t),i=this.adapted===null||this.settled?0:Math.min(Math.max((n-this.at)/1e3,0),.25);return this.at=n,this.adapted===null?this.adapted=r:this.adapted+=(r-this.adapted)*(1-Math.exp(-i/fi(r))),Math.abs(this.adapted-r)<=r*.002&&(this.adapted=r),this.settled=this.adapted===r,!this.settled}get exposure(){return this.adapted===null?1:li(this.adapted)}},mi=[7,3.2,.5],hi=new WeakMap;function gi(e,t){hi.set(e,t)}function _i(e){for(let t=e.parentElement;t;t=t.parentElement){let e=hi.get(t);if(e)return e}}function vi(e){let t=_i(e.el);return!!t&&(t.crown[0]!==0||t.crown[1]!==0)}var yi=e=>e===null?{}:{tangent:e*Math.PI/180};function bi(e){let t=_i(e.el);if(!t)return 4;if(t.at)return t.at(e.x+e.w/2,e.y+e.h/2);let n=(e.x+e.w/2-t.x-t.w/2)/(t.w/2),r=(e.y+e.h/2-t.y-t.h/2)/(t.h/2);return t.top-t.crown[0]*n*n-t.crown[1]*r*r}function xi(e,t){let{k:n}=t,r=n===1?e:Si(e,n),i=Math.cos(t.a),a=Math.sin(t.a),o=(e,r)=>t.x+(t.flip?-e:e)*n*i-r*n*a,s=(e,r)=>t.y+(t.flip?-e:e)*n*a+r*n*i,c=e=>t.a+(t.flip?-e:e);switch(r.type){case`capsule`:return{...r,ax:o(r.ax,r.ay),ay:s(r.ax,r.ay),bx:o(r.bx,r.by),by:s(r.bx,r.by)};case`mask`:return{...r,box:{...r.box,x:r.box.x+t.x,y:r.box.y+t.y}};case`holes`:return{...r,cx:o(r.cx,r.cy),cy:s(r.cx,r.cy)};case`rect`:return{...r,cx:o(r.cx,r.cy),cy:s(r.cx,r.cy),rotate:c(r.rotate)};case`arc`:return{...r,cx:o(r.cx,r.cy),cy:s(r.cx,r.cy),rotate:c(r.rotate),mid:t.flip?-r.mid:r.mid};case`field`:{let e={...r,cx:o(r.cx,r.cy),cy:s(r.cx,r.cy),rotate:c(r.rotate)};return t.flip?{...e,key:`${r.key}|flip`,draw(e,t,n){e.translate(t,0),e.scale(-1,1),r.draw(e,t,n)}}:e}}}function Si(e,t){let n={...e.grow&&{grow:e.grow*t},...e.ring&&{ring:e.ring*t}};switch(e.type){case`mask`:return e;case`capsule`:return{...e,...n,ra:e.ra*t,rb:e.rb*t};case`holes`:return{...e,...n,hw:e.hw*t,hh:e.hh*t,radius:e.radius*t,pitch:e.pitch*t,hole:e.hole*t};case`rect`:return{...e,...n,hw:e.hw*t,hh:e.hh*t,radius:e.radius*t,ripple:[e.ripple[0],e.ripple[1]*t]};case`arc`:return{...e,...n,hw:e.hw*t,hh:e.hh*t,r:e.r*t,width:e.width*t};case`field`:return{...e,...n,hw:e.hw*t,hh:e.hh*t,spread:e.spread*t,key:`${e.key}|x${t}`,...e.source&&{source:{hw:e.source.hw*t,hh:e.source.hh*t}},draw(n,r,i){n.scale(t,t),e.draw(n,r/t,i/t)}}}}var Ci=class{seedBase;age;state;commands=[];count=0;bent;body;frame={x:0,y:0,a:0,flip:!1,k:1};level=4;top=4;seat=4;holder;round=0;use=1;mid=0;constructor(e=0,t=0,n={}){this.seedBase=e,this.age=t,this.state=n}part(e,t=4,n=!1,r=t,i=1){this.count=(e+1)*1024,this.use=i,this.bent=n?void 0:this.body,this.mid=n?r:this.round,this.frame={x:0,y:0,a:0,flip:!1,k:1},this.level=this.top=this.seat=t}add(e,t=xi(e.shape,this.frame)){return this.commands.push({...e,shape:t,...this.bent&&{bend:this.bent}}),this}px(e,t){return e===void 0?t:e*this.frame.k}resolve(e){return xi(e,this.frame)}group(e,t){let{frame:n,level:r,top:i}=this,[a,o]=e.at??[0,0],s=Math.cos(n.a),c=Math.sin(n.a),l=(n.flip?-a:a)*n.k,u=o*n.k,d=e.rotate??0;return this.frame={x:n.x+l*s-u*c,y:n.y+l*c+u*s,a:n.a+(n.flip?-d:d),flip:n.flip!==!!e.mirror,k:n.k*(e.scale??1)},this.level=r+(e.z??0),this.top=i+(e.z??0),t(),this.frame=n,this.level=r,this.top=i,this}bend(e){return this.bent=e?t(e):this.body,this}roll(e,n=0){return this.body=this.bent=t(e),this.round=this.mid=n,this}seed(){this.count+=1;let e=this.count+this.seedBase*131;return[e*73.1%997,e*41.7%991]}surface(e,t={},n){let r=Oe(t.material??`plain`,{age:this.age,...this.state,...t.over}),i=this.use,a=i===1?r:{...r,touch:Math.min(r.touch*i,1),wear:Math.min(r.wear*i,1)},o=xi(e,this.frame),s=t.rest??!1,c=!s&&(t.follow??!1),l=s?this.tallest(o):c?t.zEdge??0:t.zEdge===void 0?t.rise===void 0?this.seat-4:this.level:t.zEdge+this.seat,u=t.rise===void 0?c?t.zTop??4:(t.zTop??0)+this.seat:l+t.rise,d=c?this.top:0,f=`rotate`in o?o.rotate:this.frame.a;if(this.add({op:`surface`,shape:e,name:t.material??`plain`,material:f?{...a,tangent:a.tangent+f,marks:a.marks*Math.max(1-Math.abs(f)*8,0)}:a,zEdge:l,zTop:u,mid:this.mid,follow:c,bridge:this.px(t.bridge,0),rest:s,reach:c?this.tallest(o)+Math.max(l,u,0):u,bevel:this.px(t.bevel,2),profile:t.profile??`round`,dish:t.dish??0,crown:typeof t.crown==`number`?[t.crown,t.crown]:t.crown??[0,0],radial:t.radial??!1,seed:this.seed()},o),this.top=d+u,n){let{level:e,top:t,holder:r}=this;this.level=t,this.holder=o,n(),this.level=e,this.top=t,this.holder=r}return this}tallest(e){let t=L(e,0),n=0;for(let e of this.commands){if(e.op!==`surface`||e.reach<=n)continue;let r=L(e.shape,0);r.x<t.x+t.w&&r.x+r.w>t.x&&r.y<t.y+t.h&&r.y+r.h>t.y&&(n=e.reach)}return n}cut(e,t={}){return this.add({op:`cut`,shape:e,depth:t.depth??0,ink:t.ink??null,rough:t.rough??.5,metal:t.metal??0,wear:Math.min((t.wear??0)*this.use,1),emit:t.emit??null,soft:this.px(t.soft,.7),feather:this.px(t.feather,0),seed:this.seed(),...this.holder&&{on:this.holder}})}print(e,t,n={}){return this.cut(e,{...n,ink:t})}engrave(e,t=.2,n={}){return this.cut(e,{...n,depth:t})}legend(e,t,n={}){if(!e.label)return this;let{frame:r}=this;return this.frame={x:0,y:0,a:0,flip:!1,k:1},this.cut(m(e.label),{depth:.04,...n,ink:t}),this.frame=r,this}well(e,t,n={},r){let{top:i}=this;return this.surface(e,{material:`well`,bevel:1/this.frame.k,follow:n.zEdge===void 0,...n,rise:-t},r),this.top=i,this}seam(e,t={}){return this.cut(T(e,t.width??.8/this.frame.k),{depth:t.depth??.5,ink:[.008,.008,.009],rough:.8,soft:.5/this.frame.k})}lamp(e,t,n=1,r={}){let i=r.dark??.02,a=r.gain??.6,o=e=>t.map(t=>t*e);return this.cut(e,{ink:o(i),emit:o(i+n*a)})}glass(e,t={}){let n=t.material&&Ee(t.material).ior||1.52,r=((n-1)/(n+1))**2,[i,a]=t.chamfer??[0,0];return this.add({op:`glass`,shape:e,covers:!!t.covers,height:t.height??1.2,bevel:this.px(t.bevel,8),coat:t.coat??1,curve:t.curve??0,film:t.film??0,rim:t.rim??.5,chamfer:[i,Math.tan(a*Math.PI/180)],reflect:2*r/(1+r),tint:t.tint??[1,1,1]})}frost(e,t={}){return this.add({op:`frost`,shape:e,blur:this.px(t.blur,14),tint:t.tint??[.8,.82,.85],opacity:t.opacity??.25,transmit:t.transmit??1,zoom:t.zoom??1,zEdge:(t.zEdge??0)+this.seat,zTop:(t.zTop??1.5)+this.seat,bevel:this.px(t.bevel,3),rough:t.rough??.42,coat:t.coat??.6})}screen(e,t,n={}){let r=n.kind??`crt`;return this.add({op:`screen`,shape:e,source:t,kind:r,gain:n.gain??3,color:n.color??[.008,.009,.01],ink:r===`crt`?[n.mono?0:.22,n.bulge??.24,0]:n.ink??[.02,.03,.02],emit:n.emit??[0,0,0],inset:n.inset??[0,0],zTop:(n.zTop??-.6)+this.seat,rough:n.rough??.2,coat:n.coat??.8,metal:n.metal??0})}glow(e,t,n=1.1){return this.add({op:`glow`,shape:e,color:t,width:n*this.frame.k})}},wi=.92,Ti=.4,Ei=.5,Di=.3,Oi=.75,ki=()=>{},Ai=e=>{ki=e},ji=class{value;target;velocity=0;part=null;stiffness;damping;through;rest;from;after;contact;motion;landed=!0;notch=0;held=0;jumped=!1;seat;constructor(e){this.stiffness=e.stiffness,this.damping=e.damping,this.through=e.through??!1,this.contact=e.contact||null,this.motion=e.motion,this.rest=this.from=this.value=this.target=this.seat=e.value??0}set(e){this.through&&e===this.rest&&this.target!==this.rest&&this.active?this.after=e:(this.after=void 0,e!==this.target&&(this.go(e),ki(this)))}snap(e){this.value=this.target=this.seat=e,this.velocity=0,this.after=void 0,this.landed=!0,this.jumped=!0,ki(this)}grip(e){this.held=e}notches(e){e!==this.notch&&(this.notch=e,this.seat=this.value)}get active(){return this.jumped||this.moving}get moving(){return this.value!==this.target||this.velocity!==0}step(e,t=!1){if(this.jumped=!1,!this.moving)return!1;if(t){let e=(this.contact===`toggle`?Di:Oi)*Math.sqrt(this.stiffness)*Math.abs(this.target-this.from);return this.value=this.target,this.feel(e),this.after!==void 0&&(this.go(this.after),this.value=this.target,this.feel(e)),this.seat=this.value,this.velocity=0,this.after=void 0,!1}let n=Math.max(1,Math.ceil(e/(1/240))),r=e/n;for(let e=0;e<n;e++)this.held?this.velocity=(this.target-this.value)/this.held:this.velocity+=(this.stiffness*(this.target-this.value)-this.damping*this.velocity)*r,this.value+=this.velocity*r,(!this.landed||this.notch)&&this.feel(Math.abs(this.velocity));return this.after!==void 0&&this.arrived&&(this.go(this.after),this.after=void 0),Math.abs(this.velocity)<.01&&Math.abs(this.target-this.value)<.001?(this.value=this.target,this.velocity=0,!1):!0}past(e){return(this.value-this.from)/(this.target-this.from)>=e}get arrived(){return this.past(wi)}go(e){this.from=this.value,this.target=e,this.landed=!this.contact}feel(e){if(!this.landed&&this.past(this.contact===`toggle`?wi:Ti)&&(this.landed=!0,s(this.part,this.contact===`toggle`?`toggle`:this.target===this.rest?`release`:`press`,e,{to:this.target,motion:this.motion})),!this.notch)return;let t=(this.value-this.seat)/this.notch;Math.abs(t)<Ei||(this.seat+=Math.sign(t)*this.notch,s(this.part,`detent`,e/Math.abs(this.notch),{motion:this.motion}))}},Mi=64,Ni=16,Pi=3,Fi=32,Ii=4,Li=24,Ri=1e3/30,zi=new Set([`color`,`ink`,`emit`]),Bi=`300px`,Vi=160,Hi=`100%`,Ui=40,Wi=.004,Gi=.62,Ki=e=>({at:e.at,far:Fn({at:e.at,reach:e.half*2,color:e.color},Wi),from:e.from,flat:e}),qi=(e,t)=>{let n=Math.max(...e.color);return Math.min(Fn({at:e.at,reach:e.half*2,color:e.color},Wi),Math.max(e.half,Math.cbrt(n*e.half*e.half*t/Wi)))},Ji=64,Yi=class e{all;bins=new Map;wide=[];seen;stamp=0;constructor(t){this.all=t,this.seen=new Uint32Array(t.length),t.forEach((t,n)=>{let[r,i,a,o]=e.cells(t.at[0]-t.far,t.at[1]-t.far,t.at[0]+t.far,t.at[1]+t.far);if(!((i-r+1)*(o-a+1)<=256))return void this.wide.push(n);for(let e=a;e<=o;e++)for(let t=r;t<=i;t++){let r=t*65536+e,i=this.bins.get(r);i?i.push(n):this.bins.set(r,[n])}})}static cells(e,t,n,r){let i=e=>Math.min(Math.max(Math.floor(e/Ji),-32e3),32e3)+32768;return[i(e),i(n),i(t),i(r)]}near(t,n,r,i,a){let[o,s,c,l]=e.cells(t,n,r,i);if(!((s-o+1)*(l-c+1)<=this.bins.size))return this.all.forEach(a);let{all:u,seen:d}=this,f=++this.stamp;for(let e of this.wide)a(u[e]);for(let e=c;e<=l;e++)for(let t=o;t<=s;t++)for(let n of this.bins.get(t*65536+e)??[])d[n]!==f&&(d[n]=f,a(u[n]))}},Xi=16,Zi=4,Qi=100,$i=1,ea=2,ta=(e,t,n)=>t>=e.left&&t<e.right&&n>=e.top&&n<e.bottom,na=200,ra=2,ia=4e6,aa=1.5,oa=2,sa=.05,ca=6,la=12,ua=3,da=125,fa=8;function pa(e){let t=e.getAttribute(`split`);return t===null?-1:Math.min(Math.max(+t,0),1)}var ma=8,ha=75,ga=e=>{let[t=0,n=0]=(e.getAttribute(`angle`)??``).trim().split(/\s+/).map(e=>Math.min(Math.max(parseFloat(e)||0,-75),ha));return[t,n]},_a=([e,t])=>{if(!e&&!t)return``;let n=e*Math.PI/360,r=t*Math.PI/360,i=[Math.cos(n)*Math.sin(r),Math.sin(n)*Math.cos(r),-Math.sin(n)*Math.sin(r)],a=Math.hypot(...i);return`${i.map(e=>+(e/a).toFixed(6)).join(` `)} ${+(Math.atan2(a,Math.cos(n)*Math.cos(r))*360/Math.PI).toFixed(4)}deg`};function va(e){for(let t=e.parentElement;t;t=t.parentElement){let n=getComputedStyle(t);if(n.perspective===`none`)continue;let r=e.getBoundingClientRect(),i=t.getBoundingClientRect(),a=Wr(t,i),[o=0,s=0]=n.perspectiveOrigin.split(` `).map(parseFloat),c=[i.left+o*a-(r.left+r.width/2),i.top+s*a-(r.top+r.height/2),parseFloat(n.perspective)*a],l=Math.hypot(...c);return[c[0]/l,c[1]/l,c[2]/l]}return[0,0,1]}var ya=e=>Math.min(Math.max(parseFloat(e.getAttribute(`lean`)??``)||0,0),ma),ba=e=>Math.max(Qt.indexOf(e.getAttribute(`debug`)??``),0),xa={mint:{prints:0,dust:0,scuff:0,haze:0,wear:0,age:0,grime:0,dents:0,fade:0},new:{prints:.14,dust:.14,scuff:.12,haze:.35,wear:0,age:0,grime:0,dents:0,fade:0},used:{prints:.42,dust:.35,scuff:.42,haze:.6,wear:.12,age:.1,grime:.1,dents:.1,fade:.05},worn:{prints:.7,dust:.6,scuff:.75,haze:.8,wear:.3,age:.3,grime:.35,dents:.35,fade:.2},abused:{prints:1,dust:.9,scuff:1,haze:1,wear:.6,age:.7,grime:.7,dents:.75,fade:.4}},Sa=(e,t)=>{let n=e.closest(`d-device`);return`${Qe(e)?.selector??e.localName} threw: ${t instanceof Error?t.message:String(t)}\n  in ${he(e)}${n&&n!==e?`\n  of ${he(n)}`:``}`},Ca=e=>e.def.local?{at:[e.x,e.y],scale:e.def.local===!0?1:e.def.local}:{};function wa(e,t,n,r){let i=document.activeElement;for(;i&&!n.parts.has(i);)i=i.parentElement;if(i!==t.el)return;let a=e.commands.slice(r);if(a.some(e=>e.op===`glow`))return;let o=a.find(e=>e.op===`surface`)?.shape;o&&o.type!==`mask`&&o.type!==`holes`&&e.commands.push({op:`glow`,shape:w(o,1.5),color:mi,width:1.1})}function Ta(e,t){let n=null;for(let r=t;r<e.length;r++)n=V(n,B(e[r]));return n}var Ea=e=>e?.replace(Da,``),Da=/ ?clip-path:[^;"]*;?/g,Oa=class extends Set{stirred;constructor(e){super(),this.stirred=e}add(e){return this.stirred(),super.add(e)}},ka=()=>({r:null,at:-1,look:-1,local:null}),Aa=e=>e.style.cssText.replace(/(^|;)\s*(translate|scale|will-change)\s*:[^;]*/g,``).trim(),ja=[`layoutDirty`,`viewDirty`,`materialDirty`,`lightDirty`,`reachDirty`,`sharpen`,`visible`,`handy`,`used`],Ma=new Set([`data-far`,`data-asleep`,`data-over`,`data-up`,`data-turning`,`seated`,`moving`,`at`,`folded`]),Na=/<canvas data-d[^>]*><\/canvas>/g,Pa=e=>e?.replace(Fa,``),Fa=/ ?(?:zoom|translate|scale|transform-origin|will-change):[^;"]*;?/g,Ia=(e,t)=>e?.match(t?/(?:zoom|translate):[^;"]*/g:/zoom:[^;"]*/)?.join(``)??``,La=new WeakMap,Ra=e=>(e??``).replace(za,``).replace(/\s*([:;])\s*/g,`$1`).replace(/;$/,``).trim(),za=/ ?(?:perspective|transform-style|isolation|rotate):[^;"]*;?/g,Ba=/ data-(?:far|asleep)=""/g,Va=e=>e.type===`mask`?e.box.w*e.box.h:e.type===`capsule`?Math.hypot(e.ax-e.bx,e.ay-e.by)*(e.ra+e.rb):e.hw*e.hh*4;function Ha(e,t){let n=0;for(let r=t;r<e.length;r++){let t=e[r];if(t.op===`screen`&&t.gain>0)return NaN;let i=t.op===`glow`?t.color:t.op===`surface`?t.material.emit:t.op===`cut`||t.op===`screen`?t.emit:null;i&&(n+=(i[0]+i[1]+i[2])*Va(t.shape))}return n}function Ua(e,t,n){if(e===t)return!0;if(typeof e!=`object`||typeof t!=`object`||!e||!t)return!1;let r=Object.getPrototypeOf(e);if(r!==Object.getPrototypeOf(t)||r!==Object.prototype&&r!==Array.prototype)return!1;let i=e,a=t,o=Object.keys(i);return o.length===Object.keys(a).length&&o.every(e=>typeof i[e]==`function`&&typeof a[e]==`function`?`key`in i:n?.has(e)&&i[e]&&a[e]||Ua(i[e],a[e],n))}var Wa=(e,t)=>e.el.compareDocumentPosition(t.el)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1;function Ga(e,t){let n=0,r=e.length;for(;n<r;){let i=n+r>>1;Wa(e[i],t)<0?n=i+1:r=i}return n}var Ka=(e,t)=>e?.x===t?.x&&e?.y===t?.y&&e?.w===t?.w&&e?.h===t?.h,qa=e=>e.localName===`d-surface`&&e.hasAttribute(`path`)&&!e.style.width&&(parseFloat(e.getAttribute(`height`)??``)||0)>0,Ja=e=>[...e.children].reduce((e,t)=>e+(qa(t)?parseFloat(t.getAttribute(`height`)):0),parseFloat(e.getAttribute(`height`)??``)||4),Ya=e=>[...e.querySelector(`:scope > d-device[reverse]`)?.children??[]].reduce((e,t)=>e+(qa(t)?parseFloat(t.getAttribute(`height`)):0),0),Xa={front:0,right:Math.PI/2,back:Math.PI,left:-Math.PI/2},Za=e=>{let t=e.getAttribute(`turned`);return t===null?`front`:t===`left`||t===`right`?t:`back`},Qa=3,$a=.35,eo=.3,to=.6,no=2*eo*to,ro=.6,io=.015,ao=.25,oo=6,so=(e,t)=>e+Math.atan2(Math.sin(Xa[t]-e),Math.cos(Xa[t]-e));function co(e){for(;e;e=e.parentElement){let t=getComputedStyle(e).backgroundColor.match(/[\d.]+/g);if(t&&t.length>=3&&(t.length<4||Number(t[3])>=.5))return[Number(t[0])/255,Number(t[1])/255,Number(t[2])/255]}return[1,1,1]}var lo=class{devices=new Set;stats={paints:0,partial:0,lights:0,frames:0,layouts:0,measures:0,paintMs:0,lightMs:0,bakes:0,copyMs:0,copies:0,stages:0,layoutMs:0,held:0,glows:0};ok=!1;maxRatio=globalThis.matchMedia?.(`(pointer: coarse)`).matches?2:6;oversample=this.maxRatio>2?2:1;cards=!0;sides=!1;raised=!0;get relief(){return this.raised}set relief(e){e!==this.raised&&(this.raised=e,this.renderer?.showRelief(e),typeof document<`u`&&this.repaintWithin(document.documentElement))}whips=new WeakMap;whipped=0;maxPixels=1e7;keep=globalThis.matchMedia?.(`(pointer: coarse)`).matches?1e8:5e8;departures=0;renderer=null;get probe(){return this.renderer.probe}set probe(e){this.renderer.probe=e}get fields(){return this.renderer.fields}maskCanvas=document.createElement(`canvas`);maskCtx=this.maskCanvas.getContext(`2d`);reachCanvas=document.createElement(`canvas`);io=null;view=null;far=null;farOff=new Set;farOn=new Set;sleepers=new Map;sleptStale=!1;woken=null;handAt=null;stage=null;staleStage=!1;ro=null;moves=0;looks=0;lenses=new WeakMap;lensStyle=new WeakMap;quietAt=-1;ticking=null;tickAsked=!1;scrolledTo=[0,0];page=null;carries=new WeakMap;raf=0;last=0;lightDirty=!0;pointsMoved=!1;glowMoved=[];glowLit=[];pointsAll=!0;glowStale=!0;points=null;flickered=0;pointer={x:0,y:0,tx:0,ty:0,i:0,ti:0,seen:!1};reduced=matchMedia(`(prefers-reduced-motion: reduce)`);byPointer=!1;tilt=0;strict=!1;ambient=1;lighting=`studio`;eye=new pi;exposure=`auto`;scrollAt=-1/0;torch=0;handheld=`flashlight`;fullLight=!0;sweeping=!1;room=Fi;arriving=4;lightEach=.2;behind=!1;scrolled=!1;carried=!1;handsDue=!1;turnsDue=!1;handShifted=!1;blamed=null;sizing=!1;sizedAt=0;sizedTimer=0;beatAt=0;beatTimer=0;owner=new WeakMap;lights=1;look=0;constructor(){let e=document.createElement(`style`);if(e.dataset.diegetic=``,document.head.prepend(e),ot(t=>e.append(t)),this.renderer=new Mr(this.stats,()=>{for(let e of this.devices)e.layoutDirty=!0;this.schedule()}),!this.renderer.ok)return;this.ok=!0,this.io=new IntersectionObserver(e=>{let t=[];for(let n of e){let e=n.target.__d;e&&(e.visible=n.isIntersecting,e.visible?(t.push(e),e.plate.ready?e.lightDirty=!0:e.placed?e.viewDirty=e.sharpen=!0:e.layoutDirty=!0):(e.left=++this.departures,this.renderer.drop(e.plate)))}this.stage&&!this.sizing&&this.restAll(t),this.trim(),this.schedule()},{rootMargin:Bi}),this.view=new IntersectionObserver(e=>{for(let t of e){let e=t.target.__d;e?.owed&&t.isIntersecting&&!this.sizing&&(this.sharpenFor(e),e.owed=!1)}this.schedule()},{rootMargin:`${Ui}px`}),this.far=new IntersectionObserver(e=>{for(let t of e){let e=t.target,n=e.__d;t.isIntersecting?(this.farOff.delete(e),this.sizing&&n?.staged&&this.bare(n)?this.farOn.add(e):e.removeAttribute(`data-far`)):(this.farOn.delete(e),this.sizing?this.farOff.add(e):e.setAttribute(`data-far`,``))}},{rootMargin:Hi}),this.ro=new ResizeObserver(e=>this.resized(e)),this.page=new MutationObserver(e=>this.changed(e)),this.page.observe(document.documentElement,{subtree:!0,childList:!0,attributes:!0,characterData:!0});let t=()=>void this.moves++;addEventListener(`resize`,t),addEventListener(`load`,t,{capture:!0}),Ai(e=>{let t=e.part&&this.owner.get(e.part);t&&this.stir(t),t?.small&&!t.used?this.onBeat():this.schedule()}),Wn(()=>{this.pointsMoved=!0,this.schedule()});let n=()=>this.relight();addEventListener(`scroll`,()=>this.panned(),{passive:!0,capture:!0}),Jr(e=>this.viewed(e)),Tn(()=>{this.stage&&(this.staleStage=!0,this.schedule())}),addEventListener(`resize`,()=>{this.look||this.torch?n():this.lights&&this.pointer.i&&(this.handShifted=!0,this.schedule())}),addEventListener(`pointermove`,e=>{if(!this.look&&!this.lights&&!this.torch||this.reduced.matches||this.lampHeld||e.buttons&&!this.torch)return;let t=this.pointer;t.tx=e.clientX,t.ty=e.clientY,t.ti=1,this.carried=!1,t.seen||=(t.x=t.tx,t.y=t.ty,!0),this.schedule()},{passive:!0});let r=e=>{let t=e.clientX,n=e.clientY,r=this.woken;if(this.handAt=[t,n],r&&!ta(r.r,t,n)&&this.unhand(),!(this.woken||this.sizing||!this.sleepers.size)){if(this.sleptStale){for(let e of this.sleepers.keys())this.sleepers.set(e,this.where(e));this.sleptStale=!1}for(let[e,r]of this.sleepers)if(ta(r,t,n)){this.woken={d:e,r},e.used|=$i,this.rest(e);break}}};addEventListener(`pointermove`,r,{passive:!0}),addEventListener(`pointerdown`,r,{capture:!0,passive:!0}),addEventListener(`pointerdown`,()=>{this.byPointer=!0},{capture:!0,passive:!0}),addEventListener(`keydown`,()=>{if(this.byPointer){this.byPointer=!1;for(let e of this.devices)e.el.contains(document.activeElement)&&this.touch(e,document.activeElement);this.schedule()}},{capture:!0}),document.documentElement.addEventListener(`pointerleave`,()=>{this.pointer.ti=0,this.schedule()});let i=()=>{this.moves++;for(let e of this.devices)e.layoutDirty=!0,e.print=``;this.schedule()};document.fonts?.ready.then(i),document.fonts?.addEventListener(`loadingdone`,i);let a=matchMedia(`(forced-colors: active)`),o=()=>document.documentElement.classList.toggle(`d-gl`,!a.matches);a.addEventListener(`change`,o),o();let s=()=>{for(let e of this.devices)e.themed&&_o(e.el)!==e.scheme&&(e.layoutDirty=e.materialDirty=!0,e.print=``,this.schedule())};new MutationObserver(s).observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`style`,`data-mode`,`data-theme`,`data-color-scheme`]}),matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,s)}add(e){if(ai(e),!this.ok)return;for(let t of e.querySelectorAll(`:scope > canvas[data-d]`))t.remove();let t=document.createElement(`canvas`);t.dataset.d=``,t.setAttribute(`aria-hidden`,`true`),e.prepend(t);let n={el:e,canvas:t,ctx:t.getContext(`2d`),parts:new Map,list:[],movers:[],cleanups:new Map,observer:new MutationObserver(r=>{for(let i of r){if(i.target===t||i.target===n.under||i.type===`childList`&&[...i.addedNodes,...i.removedNodes].every(e=>e===n.under||e instanceof HTMLCanvasElement&&e.dataset.d===`under`))continue;let r=i.target.nodeType===1?i.target:i.target.parentElement;if(this.stage&&r===e&&i.attributeName===`style`&&mo(i.oldValue)!==mo(e.getAttribute(`style`))&&this.restage(n),r.closest(`d-device, [data-alone]`)!==e||r===e&&i.attributeName&&Ma.has(i.attributeName))continue;if(r===e&&i.attributeName===`turned`){let t=Za(e);(t===`front`||n.faces.some(e=>e.facing===t))&&(n.spun=so(n.spun,t)),this.turnsDue=!0,this.schedule();continue}if(i.attributeName===`d-reach`||i.attributeName&&Ea(i.oldValue)===Ea(r.getAttribute(i.attributeName)))continue;if(r===e&&i.attributeName===`style`&&Ra(Pa(i.oldValue))===Ra(Pa(e.getAttribute(i.attributeName)))){let t=Ia(e.getAttribute(`style`),!!n.whole);La.get(e)!==t&&(La.set(e,t),this.resized([{target:e}]));continue}if(r===e&&i.attributeName===`scale`){ai(e,!0);continue}if(r===e&&i.attributeName===`split`){n.split=pa(e),n.lightDirty=!0,n.lightBox=null,this.schedule();continue}if(r===e&&i.attributeName===`debug`){n.debug=ba(e);for(let e of n.faces)e.debug=n.debug;n.lightDirty=!0,n.lightBox=null,this.schedule();continue}if(r===e&&i.attributeName===`lighting`){n.lightDirty=!0,n.lightBox=null,this.schedule();continue}if(r===e&&i.attributeName===`angle`){n.angle=ga(e),e.style.rotate=_a(n.angle);for(let e of n.faces)e.angle=n.angle;n.lightDirty=!0,n.lightBox=null,this.schedule();continue}if(r===e&&i.attributeName===`lean`){n.lean=ya(e);for(let e of n.faces)e.lean=n.lean;n.lightDirty=!0,n.lightBox=null,this.schedule();continue}let a=n.parts.get(r)??n.parts.get(r.parentElement);a?.def.live?.includes(i.type===`attributes`?i.attributeName:`#text`)?(a.def.update?.(a),n.moving.add(a)):n.layoutDirty=!0,this.schedule()}}),listeners:new AbortController,plate:null,x:e.hasAttribute(`fill`)?0:Mi,y:e.hasAttribute(`fill`)?0:Mi,w:0,h:0,room:1/0,whole:null,crop:null,bare:null,used:0,pointBox:null,glowedAt:``,gave:null,material:`plain`,wear:0,age:0,radius:10,pw:0,ph:0,cw:0,ch:0,dpr:1,fine:1,seed:this.devices.size+1,scheme:`light`,themed:!1,debug:0,split:-1,lean:ya(e),angle:ga(e),eye:[0,0,1],turns:e.matches(`[reverse], [side]`)||!!e.querySelector(`:scope > d-device:is([reverse], [side])`),faces:[],spin:0,axis:0,owns:[0,0,0],round:0,body:null,spun:0,spinning:0,over:!1,turning:!1,handy:!1,visible:!1,waited:0,stirred:0,stepped:0,small:!1,cost:0,kept:[ka(),ka()],cam:void 0,quiet:!1,ticked:!1,left:0,hand:0,turn:[0,0],aim:[0,0],owed:!1,sharpen:!1,viewDirty:!1,html:``,layoutDirty:!0,materialDirty:!0,lightDirty:!0,placed:!1,version:0,prints:0,dust:0,scuff:0,haze:0,grime:0,dents:0,fade:0,print:``,face:4,cast:4,moving:new Set,lightBox:null,reachDirty:!0,reachCell:2,under:null,failed:null,staged:!1};n.moving=new Oa(()=>this.stir(n));for(let e of ja){let t=n[e];Object.defineProperty(n,e,{get:()=>t,set:e=>{t=e,e&&this.stir(n)}})}let r=e.hasAttribute(`reverse`)?`back`:e.getAttribute(`side`)===`left`?`left`:e.getAttribute(`side`)===`right`?`right`:null,i=e.parentElement.__d;r&&i?(n.front=i,n.facing=r,i.faces.push(n),r===`back`&&(i.reverse=n),n.lean=i.lean,n.angle=i.angle,r!==`back`&&e.style.setProperty(`--d-deep`,`${(Ja(i.el)+Ya(i.el))/.25}px`),Za(i.el)===r&&(i.spun=so(i.spun,r),this.turnsDue=!0)):(n.angle[0]||n.angle[1])&&(e.style.rotate=_a(n.angle)),n.plate=this.renderer.open(n),n.front&&(n.round=Xa[n.facing],this.bodied(n.front)),e.__d=n,this.devices.add(n),this.io.observe(e),this.view.observe(e),this.far.observe(e);try{this.ro.observe(e,{box:`device-pixel-content-box`})}catch{this.ro.observe(e)}n.observer.observe(e,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeOldValue:!0}),this.bind(n)}bodied(e){let t=[e,...e.faces],n=e.faces.length?t.map(e=>e.plate):null;for(let e of t)e.body=n,e.plate.edged=[]}remove(e){oi(e);let t=e.__d;if(t){this.devices.delete(t),t.front&&(t.front.faces=t.front.faces.filter(e=>e!==t),t.front.reverse===t&&delete t.front.reverse,this.bodied(t.front)),this.io.unobserve(e),this.view.unobserve(e),this.far.unobserve(e),this.farOff.delete(e),this.farOn.delete(e),e.removeAttribute(`data-far`),e.removeAttribute(`data-asleep`),this.sleepers.delete(t),this.woken?.d===t&&(this.woken=null),this.ro.unobserve(e),t.observer.disconnect(),t.listeners.abort();for(let e of t.cleanups.values())e();if(this.renderer.close(t.plate),t.canvas.remove(),t.under?.remove(),t.staged&&this.stage){let{order:e}=this.stage,n=e?.indexOf(t)??-1;n>=0&&e.splice(n,1),this.staleStage=!0,this.schedule()}delete e.__d}}touch(e,t){for(let n=t;n&&n!==e.el.parentElement;n=n.parentElement){let t=e.parts.get(n);t&&e.moving.add(t)}}redraw(e,t){this.touch(t,e),this.schedule()}bind(e){let{signal:t}=e.listeners,n=t=>{this.touch(e,t.target),this.schedule()};e.el.addEventListener(`focusin`,n,{signal:t}),e.el.addEventListener(`focusout`,n,{signal:t});let r=t=>{t.type===`focusin`||e.el.contains(t.relatedTarget)?e.used|=ea:e.used&=-3,this.sizing||this.rest(e)};e.el.addEventListener(`focusin`,r,{signal:t}),e.el.addEventListener(`focusout`,r,{signal:t});let i=e.front??e;if(!e.front&&e.turns)for(let[n,r]of[[`pointerenter`,!0],[`pointerleave`,!1]])e.el.addEventListener(n,()=>{e.handy=r,this.schedule()},{signal:t});let a=(t,n)=>{let r=Math.max(Math.hypot(t,n),1);e.aim=[t/r,n/r],this.turnsDue=!0,this.schedule()},o=!1;e.el.addEventListener(`pointerdown`,n=>{if(n.button||n.target!==e.el)return;if(i.faces.length&&!i.el.hasAttribute(`fixed`)){let e=i.el.getBoundingClientRect(),r=i.aim[1],{clientY:a,pointerId:s}=n,c=i.spun,l=n.clientX;i.el.setPointerCapture(s),o=!0;let u=t=>{let n=-((t.clientX-l)/e.width)*Math.PI;if(this.cards){let e=Math.sign(n),r=this.turnable(i).flatMap(e=>[-1,0,1].map(t=>so(c,e.facing??`front`)+t*Math.PI*2)),a=Math.min(...r.map(t=>(t-c)*e).filter(e=>e>.001));Math.abs(n)>a*eo?(c+=e*a,l=t.clientX,i.spun=c):i.spun=c+n*to}else i.spun=c-(t.clientX-l)/e.width*Math.PI;if(i.lean)for(let n of[i,...i.faces])n.aim=[0,Math.max(-1,Math.min(1,r-(t.clientY-a)/(e.height/2)))];this.turnsDue=!0,this.schedule()},d=()=>{o=!1;let e=this.turnable(i).map(e=>e.facing??`front`).reduce((e,t)=>Math.abs(so(i.spun,t)-i.spun)<Math.abs(so(i.spun,e)-i.spun)?t:e);i.spun=so(i.spun,e),e===`front`?i.el.removeAttribute(`turned`):i.el.setAttribute(`turned`,e===`back`?``:e),this.turnsDue=!0,this.schedule(),i.el.removeEventListener(`pointermove`,u),i.el.removeEventListener(`lostpointercapture`,d)};i.el.addEventListener(`pointermove`,u,{signal:t}),i.el.addEventListener(`lostpointercapture`,d,{signal:t});return}if(!e.lean)return;let r=e.el.getBoundingClientRect(),[s,c]=e.aim,{clientX:l,clientY:u,pointerId:d}=n;e.el.setPointerCapture(d),o=!0;let f=e=>a(s-(e.clientX-l)/(r.width/2),c-(e.clientY-u)/(r.height/2)),p=()=>{o=!1,e.el.removeEventListener(`pointermove`,f),e.el.removeEventListener(`lostpointercapture`,p)};e.el.addEventListener(`pointermove`,f,{signal:t}),e.el.addEventListener(`lostpointercapture`,p,{signal:t})},{signal:t}),e.el.addEventListener(`pointerleave`,()=>{if(!o)for(let t of i.faces.length?[i,...i.faces]:[e])(t.aim[0]||t.aim[1])&&(t.aim=[0,0],this.turnsDue=!0,this.schedule())},{signal:t});let s=t=>{if(t.target.type===`radio`){for(let t of e.list)t.def.update?.(t),e.moving.add(t);this.schedule()}for(let n=t.target;n&&n!==e.el.parentElement;n=n.parentElement){let t=e.parts.get(n);t?.def.update&&(t.def.update(t),e.moving.add(t),this.schedule())}};e.el.addEventListener(`input`,s,{signal:t}),e.el.addEventListener(`change`,s,{signal:t})}relight(){this.lightDirty=this.fullLight=!0,this.renderer.staleBakes(),this.schedule()}lampHeld=!1;get aimed(){return this.pointer}aim(e,t){let n=this.pointer;n.tx=e,n.ty=t,n.ti=1,this.carried=!0,this.schedule()}letGo(){this.lampHeld=!1,this.pointer.ti=0,this.schedule()}schedule(e){let t=e?ho(e):this.ticking;t&&(this.stir(t),t===this.ticking&&(this.tickAsked=!0)),!this.raf&&this.ok&&(this.raf=requestAnimationFrame(this.tick))}onBeat(){this.raf||this.beatTimer||!this.ok||(this.beatTimer=window.setTimeout(()=>(this.beatTimer=0,this.schedule()),Math.max(0,this.beatAt+da-performance.now())))}flush(e=performance.now()){this.raf&&cancelAnimationFrame(this.raf),this.sizing&&this.settle(),this.tick(e,!0)}resized(e){this.moves++;let t=!1,n=!1;for(let r of e){let e=r.target.__d;if(!e)continue;if(!e.placed){e.layoutDirty=!0;continue}let i=this.flat(e,()=>{let t=e.el.getBoundingClientRect(),n=Wr(e.el,t);return Math.abs(t.width-e.w*n)<sa&&Math.abs(t.height-e.h*n)<sa});e.visible?(n=e.owed=!0,i||this.shown(e,e.el)&&(e.el.dispatchEvent(new Event(`resized`)),e.observer.takeRecords(),e.layoutDirty=t=!0)):i?e.owed=!0:e.layoutDirty=!0}n&&(this.sizing=!0,this.sizedAt=performance.now(),this.sizedTimer||=window.setTimeout(this.waited,na)),t&&!this.renderer.lost?(this.renderer.begin(!1,performance.now()-this.scrollAt>200),this.frame(performance.now())):this.schedule()}panned(e=!1){e?this.looks++:this.moves++,this.scrollAt=performance.now(),this.glowStale=!0,this.sleepers.size&&(this.sleptStale=!0),this.stage&&(this.staleStage=!0,this.schedule()),this.lights&&this.pointer.i&&(this.handShifted=!0,this.schedule()),this.torch&&(this.lightDirty=this.scrolled=!0,this.schedule())}viewed(e){!this.stage&&e.isConnected&&qr(e)&&this.stageIn(e),this.panned(!0);let t=!1;for(let n of this.devices)n.placed&&e.contains(n.el)&&(n.owed=t=!0);t&&(this.sizing=!0,this.sizedAt=performance.now(),this.sizedTimer||=window.setTimeout(this.waited,na),this.schedule())}waited=()=>{let e=this.sizedAt+na-performance.now();e>=1?this.sizedTimer=window.setTimeout(this.waited,e):this.settle()};settle(){clearTimeout(this.sizedTimer),this.sizedTimer=0,this.sizing=!1,this.quietAt=-1;for(let e of this.farOff)e.setAttribute(`data-far`,``);for(let e of this.farOn)e.removeAttribute(`data-far`);if(this.farOff.clear(),this.farOn.clear(),this.stage){let e=this.woken,t=this.handAt;!e||t&&ta(e.r=this.where(e.d),t[0],t[1])||this.unhand(),this.restAll([...this.devices].filter(e=>e.visible)),this.sleptStale=!1}for(let e of this.devices)e.owed&&e.visible&&(this.sharpenFor(e),e.owed=!1);this.schedule()}sharpenFor(e){let t=Wr(e.el),n=this.sharpness(e.cw,e.ch,t),r=Ir(t);r!==e.reachCell&&(e.reachCell=r,e.reachDirty=!0),n>e.dpr*aa||n<e.dpr/oa?e.viewDirty=e.sharpen=!0:e.sharpen&&e.plate.ready&&(e.viewDirty=e.sharpen=!1),e.crop&&this.flat(e,()=>this.outside(e))&&(e.viewDirty=!0)}standing(e,t){return!e.layoutDirty&&!e.viewDirty&&!e.materialDirty&&!e.lightDirty&&!this.lightDirty&&!e.moving.size&&e.version===t&&!e.movers.some(e=>e.p.def.tick||e.springs.some(e=>e.active))}sharpness(e,t,n){let r=(devicePixelRatio||1)*n,i=Math.min(r,1),a=Math.sqrt(this.maxPixels/(e*t)),o=(this.renderer.maxSide-Ni)/Math.max(e,t);return Math.min(Math.max(Math.min(Math.max(Math.min(Math.max(r,i)*this.oversample,a),Math.min(a,i)),this.maxRatio),r),o)}condition(e){let{el:t}=e.front??e;e.material=t.getAttribute(`material`)??`plain`,e.scheme=_o(t);let n=xa[t.getAttribute(`condition`)??`new`]??xa.new;e.age=+(t.getAttribute(`age`)??n.age),e.wear=+(t.getAttribute(`wear`)??Math.max(n.wear,e.age*.6)),e.prints=+(t.getAttribute(`prints`)??n.prints),e.dust=+(t.getAttribute(`dust`)??n.dust),e.scuff=+(t.getAttribute(`scuff`)??n.scuff),e.haze=+(t.getAttribute(`haze`)??n.haze),e.grime=+(t.getAttribute(`grime`)??Math.max(n.grime,e.age)),e.dents=+(t.getAttribute(`dents`)??n.dents),e.fade=+(t.getAttribute(`fade`)??Math.max(n.fade,e.age*.5)),e.radius=+(t.getAttribute(`radius`)??10),e.seed=+(t.getAttribute(`seed`)??e.seed),e.debug=ba(t),e.split=pa(t)}layout(e,t=!1){e.eye=va(e.front?.el??e.el),e.bare=null,e.kept[0].at=e.kept[1].at=-1,e.cam=void 0,this.flat(e,()=>this.measure(e,t&&e.placed&&!e.layoutDirty)),this.stage&&(this.restage(e),this.sizing||this.rest(e))}stageIn(e){let t=this.renderer.stage();t.dataset.d=`stage`,t.setAttribute(`aria-hidden`,`true`),Object.assign(t.style,{position:`absolute`,left:`0`,top:`0`,width:`0`,height:`0`,pointerEvents:`none`,transformOrigin:`0 0`,willChange:`transform`}),e.prepend(t),this.stage={world:e,canvas:t,order:null};for(let e of this.devices)e.placed&&this.restage(e);this.staleStage=!0}stageOut(){if(this.stage){this.stage=null,this.sleepers.clear(),this.woken=null;for(let e of this.devices)e.el.removeAttribute(`data-asleep`),e.used&=-2,e.staged&&(e.staged=!1,e.canvas.style.visibility=``,e.lightDirty=!0,e.lightBox=null);this.renderer.unstage(),this.schedule()}}stageable(e){let t=this.stage?.world;if(!t||!t.contains(e.el)||e.front||e.reverse||e.faces.length||e.el.parentElement?.closest(`d-device, [data-alone]`)&&t.contains(e.el.parentElement.closest(`d-device, [data-alone]`)))return!1;for(let n=e.el;n&&n!==t;n=n.parentElement){let e=getComputedStyle(n);if(e.transform!==`none`||e.translate!==`none`||e.rotate!==`none`||e.scale!==`none`||e.filter!==`none`||e.opacity!==`1`||e.clipPath!==`none`&&!n.hasAttribute(`data-far`)||e.maskImage!==`none`||e.perspective!==`none`||e.mixBlendMode!==`normal`||e.visibility!==`visible`||e.overflowX!==`visible`||e.overflowY!==`visible`)return!1}return!0}bare(e){if(e.bare!==null)return e.bare;let t=n=>{for(let r of n.children){if(r===e.canvas)continue;let n=getComputedStyle(r);if(n.display!==`none`&&n.opacity!==`0`){if([`canvas`,`img`,`svg`,`video`,`iframe`,`object`,`embed`].includes(r.localName))return!1;if(n.visibility===`visible`){let e=n.backgroundColor!==`rgba(0, 0, 0, 0)`||n.backgroundImage!==`none`||n.boxShadow!==`none`||n.borderStyle!==`none`&&n.borderWidth!==`0px`||n.outlineStyle!==`none`&&n.outlineWidth!==`0px`,t=n.color!==`rgba(0, 0, 0, 0)`&&[...r.childNodes].some(e=>e.nodeType===Node.TEXT_NODE&&e.textContent.trim());if(e||t||[`input`,`select`,`textarea`].includes(r.localName)&&n.appearance!==`none`)return!1}if(!t(r))return!1}}return!0};return e.bare=t(e.el)}rest(e,t=this.restAt(e)){let n=!!t&&Math.max(t.width,t.height)<Qi;n?this.sleepers.set(e,t):this.sleepers.delete(e),n!==e.el.hasAttribute(`data-asleep`)&&e.el.toggleAttribute(`data-asleep`,n)}restAll(e){let t=e.map(e=>this.restAt(e));e.forEach((e,n)=>this.rest(e,t[n]))}restAt(e){let t=this.stage?.world;return t&&e.placed&&!e.used&&t.contains(e.el)&&this.bare(e)?this.where(e):null}unhand(){let e=this.woken;e&&(this.woken=null,e.d.used&=-2,this.sizing||this.rest(e.d))}restage(e){let t=this.stageable(e);if(t===e.staged)return;e.staged=t,t?((e.plate.picture||!e.canvas.width)&&this.vacate(e),e.under?.remove(),e.under=null):(e.canvas.style.visibility=``,this.renderer.forget(e.plate)),e.lightDirty=!0,e.lightBox=null;let n=this.stage.order;n&&(t?n.splice(Ga(n,e),0,e):n.splice(n.indexOf(e),1)),this.staleStage=!0}vacate(e){e.canvas.width&&(e.canvas.width=0),e.canvas.height&&(e.canvas.height=0),e.canvas.style.visibility!==`hidden`&&(e.canvas.style.visibility=`hidden`)}showStage(){let e=this.stage,{world:t,canvas:n}=e;if(this.staleStage=!1,!t.isConnected){this.stageOut();return}n.parentElement!==t&&t.prepend(n);let r=(t.parentElement??t).getBoundingClientRect(),i=Math.max(r.left,0),a=Math.max(r.top,0),o=Math.min(r.right,innerWidth),s=Math.min(r.bottom,innerHeight),c=t.getBoundingClientRect(),l=t.offsetWidth?c.width/t.offsetWidth:1;if(o<=i||s<=a||!l){n.style.width=n.style.height=`0`;return}e.order??=[...this.devices].filter(e=>e.staged).sort(Wa);let u=[];for(let t of e.order){let e=t.plate.picture;if(!e||!t.visible)continue;let n=this.where(t);if(!n.width||!t.w)continue;let r=n.width/t.w,[c,l,d,f]=e.box,p=n.left-c*r-i,m=n.top-l*r-a,h=d*r,g=f*r;p>o-i||m>s-a||p+h<0||m+g<0||u.push({picture:e,plate:t.plate,x:p,y:m,w:h,h:g})}this.eye.look(this.metered(i,a,o,s))&&this.exposure===`auto`&&(this.staleStage=!0,this.schedule()),this.renderer.exposure=this.exposure===`auto`?this.eye.exposure:this.exposure,this.renderer.backdrop=co(t),this.renderer.show(u,o-i,s-a,devicePixelRatio||1,i,a);let d=n.style,f=`${o-i}px`,p=`${s-a}px`,m=`translate(${(i-c.left)/l}px, ${(a-c.top)/l}px) scale(${1/l})`;(d.width!==f||d.height!==p)&&Object.assign(d,{width:f,height:p}),d.transform!==m&&(d.transform=m)}metered(e,t,n,r){let i=Bt(this.lighting),a=e=>.2126*e[0]+.7152*e[1]+.0722*e[2],o=this.ambient*a(i.color)*(i.power/Rt.power),s=0;for(let i of Nn()){let[o,c]=Pn(i.at),l=(i.reach/2)**2,u=i.height??i.reach/2,d=a(i.color);for(let i=0;i<3;i++)for(let a=0;a<3;a++){let f=e+(i+.5)/3*(n-e)-o,p=t+(a+.5)/3*(r-t)-c;s+=d*l/(l+f*f+p*p+u*u)/9}}let c=0,l=Un();if(l){let i=Math.max(Math.floor(e/l.cell),0),o=Math.min(Math.ceil(n/l.cell),l.w),s=Math.max(Math.floor(t/l.cell),0),u=Math.min(Math.ceil(r/l.cell),l.h),d=0;for(let e=s;e<u;e++)for(let t=i;t<o;t++,d++){let n=(e*l.w+t)*4;c+=a([l.data[n],l.data[n+1],l.data[n+2]])}c=d?c/d/255*l.gain:0}return{room:o,lights:s,glow:c}}flat(e,t){let n=(e.front??e).el,{rotate:r,translate:i,scale:a}=n.style,o=!!r||getComputedStyle(n).translate.split(` `).length>=3;if(!o&&!a)return t();n.style.rotate=``,n.style.scale=``,o&&(n.style.translate=`none`);try{return t()}finally{n.style.rotate=r,n.style.scale=a,o&&(n.style.translate=i)}}outside(e){let t=this.where(e),n=Wr(e.el,t),[r,i,a,o]=e.crop;return-t.left/n<r||-t.top/n<i||(innerWidth-t.left)/n>a||(innerHeight-t.top)/n>o}hold(e,t,n,r,i){if(e.staged)return;let a=e.under,o=Math.min(ra,Math.sqrt(ia/(r*i))),s=a&&!a.hidden&&a.style.left===`${-t}px`&&a.style.top===`${-n}px`&&a.style.width===`${r}px`&&a.style.height===`${i}px`,c=s?a:document.createElement(`canvas`);s||(c.dataset.d=`under`,c.setAttribute(`aria-hidden`,`true`),Object.assign(c.style,{left:`${-t}px`,top:`${-n}px`,width:`${r}px`,height:`${i}px`}),c.width=Math.max(Math.round(r*o),1),c.height=Math.max(Math.round(i*o),1));let l=c.getContext(`2d`),u=c.width/r,d=e=>{if(!e.width||!e.height||e.hidden||e.style.opacity===`0`)return;let r=parseFloat(e.style.left)+t,i=parseFloat(e.style.top)+n;l.drawImage(e,r*u,i*u,parseFloat(e.style.width)*u,parseFloat(e.style.height)*u)};!s&&a&&d(a),d(e.canvas),s||(a?.remove(),e.canvas.before(c),e.under=c),e.canvas.style.transition=`none`,e.canvas.style.opacity=`0`}cropTo(e,t,n,r,i){let a=(devicePixelRatio||1)*n;if(e.el.hasAttribute(`fill`)||r*i*a*a<=this.maxPixels){e.whole=e.crop=null;return}let o=-t.left/n,s=-t.top/n,c=(innerWidth-t.left)/n,l=(innerHeight-t.top)/n,u=e.crop,d=e.whole&&e.whole[0]===e.x&&e.whole[1]===e.y&&e.whole[2]===r&&e.whole[3]===i;if(e.whole=[e.x,e.y,r,i],d&&u&&u[0]<=o&&u[1]<=s&&u[2]>=c&&u[3]>=l)return;let f=Math.max(Math.max(innerWidth,innerHeight)/n/4,16);e.crop=[Math.floor(Math.max(-e.x,o-f)),Math.floor(Math.max(-e.y,s-f)),Math.ceil(Math.min(r-e.x,c+f)),Math.ceil(Math.min(i-e.y,l+f))]}measure(e,t){let n=performance.now(),{el:r}=e,[i,a]=[e.x,e.y];t||!this.strict&&e.placed||this.auditDevice(e);let o=r.getBoundingClientRect(),s=Wr(r,o);e.whole&&([e.x,e.y]=e.whole),e.room=Math.max(Math.ceil(Math.max(innerWidth-o.width,innerHeight-o.height)/s),Mi),!r.hasAttribute(`fill`)&&e.y>e.room&&(e.y=e.room,e.facing!==`left`&&e.facing!==`right`&&(e.x=e.room)),(e.facing===`left`||e.facing===`right`)&&(e.x=e.y+Math.max(e.front.el.getBoundingClientRect().width-o.width,0)/s/2);let c=Math.ceil(o.width/s)+e.x*2,l=Math.ceil(o.height/s)+e.y*2;if(this.cropTo(e,o,s,c,l),e.whole){let[t,n,r,i]=e.crop;[e.x,e.y,c,l]=[-t,-n,Math.max(r-t,1),Math.max(i-n,1)]}let u=this.sizing&&e.placed?e.dpr:this.sharpness(c,l,s),d=Math.ceil(c*u/Ni)*Ni,f=Math.ceil(l*u/Ni)*Ni;c=d/u,l=f/u,e.fine=u/((devicePixelRatio||1)*s);let p=Ir(s);p!==e.reachCell&&(e.reachCell=p,e.reachDirty=!0),(d!==e.pw||f!==e.ph||u!==e.dpr||e.x!==i||e.y!==a)&&((e.whole||e.under&&!e.under.hidden)&&this.hold(e,...e.whole??[e.x,e.y,c,l]),this.renderer.free(e.plate),Object.assign(e,{pw:d,ph:f,cw:c,ch:l,dpr:u}),this.renderer.grow()),e.w=o.width/s,e.h=o.height/s,t||this.condition(e);let m=o.left-e.x*s,h=o.top-e.y*s,g=new Set,_=!1;if(t)for(let t of e.parts.values())t.x+=e.x-i,t.y+=e.y-a;let v=t?[]:[r,...r.querySelectorAll(nt()||`never`)];for(let t of v){let n=Qe(t);if(!n||t!==r&&t.closest(`d-device, [data-alone]`)!==r)continue;this.blamed=t;let i=e.parts.get(t);if(!i||i.def!==n){i&&this.disconnect(e,i),i={el:t,def:n,x:0,y:0,w:0,h:0,focused:!1,label:null,mask:null,data:{},springs:Object.fromEntries(Object.entries(n.springs??{}).map(([e,t])=>[e,new ji({through:e===`press`,contact:e===`press`&&`press`,...t})]))};for(let e of Object.values(i.springs))e.part=i;this.owner.set(i,e),e.parts.set(t,i),_=!0;let r=n.connect?.(i);r&&e.cleanups.set(i,r),n.update?.(i);for(let e of Object.values(i.springs))e.snap(e.target)}else n.update?.(i);let a=t.getBoundingClientRect();i.x=(a.left-m)/s,i.y=(a.top-h)/s,i.w=a.width/s,i.h=a.height/s,g.add(t)}for(let[n,r]of e.parts)t||g.has(n)||(this.disconnect(e,r),e.parts.delete(n),_=!0);t||(e.html=r.outerHTML.replace(Da,``).replace(Na,``).replace(za,``).replace(Ba,``).replaceAll(` d-reach=""`,``));let y=[d,f,u,e.fine,e.w,e.h,e.html,...[...e.parts.values()].flatMap(e=>[e.x,e.y,e.w,e.h].map(e=>Math.round(e*64)))].join();if(!_&&y===e.print&&e.plate.ready&&!e.plate.mask){if(!t)for(let t of e.parts.values())e.moving.add(t)}else{let t=e=>{let t=e.el.getAttribute(`d-layer`),n=e.el.getAttribute(`back`);return n===null?t===null?typeof e.def.layer==`function`?e.def.layer(e):e.def.layer??0:+t:-Math.max(+n,.001)};e.list=[...e.parts.values()].sort((e,n)=>t(e)-t(n));for(let n of e.list)n.under=t(n)<0;e.movers=e.list.map(e=>({p:e,springs:Object.values(e.springs)})).filter(e=>e.springs.length||e.p.def.tick),Fr(e,this.maskCanvas,this.maskCtx,m,h,s,e=>this.blamed=e),e.plate.mask=this.maskCanvas,e.materialDirty=e.lightDirty=!0,e.print=y}e.version=Ze(),this.blamed=null,e.layoutDirty=e.viewDirty=e.sharpen=!1,e.placed=!0,this.stats.layouts++,t||this.stats.measures++,this.stats.layoutMs+=performance.now()-n}auditDevice(e){getComputedStyle(e.el).position===`static`&&me(`This is position: static, so its canvas lines up with whatever is positioned around it, not with it. ${he(e.el)}`);for(let t of[e.el,...e.el.querySelectorAll(`*`)])qe(t)}repaintWithin(e){for(let t of this.devices)e.contains(t.el)&&(t.layoutDirty=t.materialDirty=!0,t.print=``);this.schedule()}disconnect(e,t){e.cleanups.get(t)?.(),e.cleanups.delete(t)}trim(){let e=this.renderer,t=[],n=t=>(t.plate.ready?e.bytes(t.plate):0)+e.pictureBytes(t.plate),r=0;for(let e of this.devices)(!e.visible||this.away(e))&&(e.plate.ready||e.plate.picture)&&(t.push(e),r+=n(e));let i=Math.min(this.keep,innerWidth*innerHeight*(devicePixelRatio||1)**2*Vi);t.sort((e,t)=>e.left-t.left);for(let a of t){if(r<=i)break;r-=n(a),e.free(a.plate),e.shrink(a.plate),r+=n(a)}}memory(){let e=0;for(let t of this.devices)t.staged||(e+=t.pw*t.ph*4);let{textures:t,pictures:n,fields:r,room:i,stage:a,live:o}=this.renderer.memory();return{textures:t,pictures:n,canvases:e,fields:r,room:i,stage:a,live:o}}paint(e,t){let n=performance.now();this.stir(e),we(e.scheme);let r={};e.wear&&(r.wear=e.wear),e.dents&&(r.dents=e.dents),e.fade&&(r.fade=e.fade);let i=new Ci(e.seed,e.age,r),a=e.el.hasAttribute(`bare`)||e.el.localName!==`d-device`,o=e.facing===`left`||e.facing===`right`,s=e.front??e,{el:c}=o?e:s,u=Ja(s.el),d=Ya(s.el),f=o?s.owns[0]*2||s.w*.25:e.w*.25-2*(+(s.el.getAttribute(`roll`)?.trim().split(/\s+/)[2]??0)||0);e.face=o?f/2:u,e.axis=o?f/2:e.facing===`back`?(u-d)/2:(u+d)/2,e.cast=o?0:parseFloat(s.el.getAttribute(`shadow`)??``)||u;let p=e=>+s.faces.some(t=>t.facing===e),m=+!!s.reverse,g=Math.min(e.w*.25,f)/2;e.owns=e.facing===`right`?[g,1,m]:e.facing===`left`?[g,m,1]:e.facing===`back`?[f/2,p(`right`),p(`left`)]:[f/2,p(`left`),p(`right`)];let _=a?0:!o&&!e.facing?parseFloat(c.getAttribute(`height`)??``)||4:e.face,[v=0,y=0,b=0,x=0,S=_]=c.getAttribute(`roll`)?.trim().split(/\s+/).map(Number)??[],C=Math.max(S,_);if(v||y){let t=e.x+e.w/2,n=e.y+e.h/2,r=(v||y)/.25,a=e.w/2-b/.25,o=e.h/2-x/.25;i.roll(v?{from:[t+a-r,n],to:[t+a,n],mirror:[t,n],past:!0,drop:S}:{from:[t,n+o-r],to:[t,n+o],mirror:[t,n],past:!0,drop:S},S*2>=C?C-S:0)}let w=c.getAttribute(`path`),T=c.getAttribute(`viewbox`)?.trim().split(/[\s,]+/).map(Number),E=e.list.find(e=>e.def.outline),D;E&&i.group(Ca(E),()=>D=i.resolve(E.def.outline(E)));let O=w?h(w,e.x,e.y,e.w,e.h,{viewBox:T,spread:12}):l(e.x,e.y,e.w,e.h,{radius:e.radius});!D&&e.facing===`back`&&i.group({at:[(e.x+e.w/2)*2,0],mirror:!0},()=>D=i.resolve(O));let k=D??O;e.shell=k;let A=[],j=[],M=[],N=!1,P=!1,F=0,I=()=>{if(P=!0,a)return;i.part(-1,C),i.surface(k,{material:e.material,over:{wear:e.wear,...yi(c.getAttribute(`lay`))},zEdge:-C,bevel:parseFloat(c.getAttribute(`bevel`)??``)||6*C/4});let t=i.commands[i.commands.length-1];t.body=!0,e.facing||(t.layer=!0),o&&!w&&(t.section=!0)};for(let n=0;n<e.list.length;n++){let r=e.list[n];if(!P&&!r.under&&I(),t&&!t.has(r)&&r.commands){for(let e of r.commands)i.commands.push(e);continue}r.focused=!this.byPointer&&(r.el.matches(`:focus-visible`)||!!r.el.querySelector(`:focus-visible`));let o=i.commands.length,s=r.el.closest(`[back]`)?.getAttribute(`back`);s==null?i.part(n,bi(r)+C-4,void 0,void 0,vo(r,e)):i.part(n,C-+s+bi(r)-4,!0,C-+s,vo(r,e)),this.blamed=r.el;try{(r.w&&r.h||r.def.spreads)&&(r.def.local?i.group(Ca(r),()=>r.def.paint(i,r,e)):r.def.paint(i,r,e))}catch(e){if(this.strict)throw e;i.commands.length=o,me(Sa(r.el,e),`error`)}if((!e.facing||e.facing===`back`)&&!a&&r.el.parentElement===e.el&&qa(r.el)){let e=i.commands.slice(o).find(e=>e.op===`surface`);e&&(e.body=e.layer=!0)}r.focused&&wa(i,r,e,o);let c=Ta(i.commands,o),l=Ha(i.commands,o),u=i.commands.slice(o),d=r.commands;if(t){if(N||=l!==r.glow,d?.length===u.length)u.forEach((e,t)=>{let n=d[t];e.op===`screen`&&Ua(n,e)?M.push(e):Ua(n,e,zi)?Ua(n,e)||j.push(V(B(n),B(e))):(A.push(V(B(n),B(e))),F=Math.max(F,z(n),z(e)))});else{let e=V(r.painted,c);e&&A.push(e);for(let e of[...d??[],...u])F=Math.max(F,z(e))}}(r.hit!==!1||r.commands?.some(e=>e.op===`glass`&&e.covers))&&!Ka(r.painted,c)&&(e.reachDirty=!0),r.painted=c,r.glow=l,r.commands=u}if(this.blamed=null,P||I(),e.facing===`back`&&!a){let t=e.front,n=e.x+e.w/2+t.x+t.w/2;t.list.forEach((r,a)=>{let o=r.el.closest(`[back]`)?.getAttribute(`back`);if(o==null||!(r.w&&r.h||r.def.spreads))return;let s=e.face-+o;i.part(e.list.length+a,C-s+bi(r)-4,!0,C-s,vo(r,e)),this.blamed=r.el;let c=i.commands.length;try{i.group({at:[n,e.y-t.y],mirror:!0},()=>r.def.local?i.group(Ca(r),()=>r.def.paint(i,r,e)):r.def.paint(i,r,e)),i.commands.slice(c).some(t=>z(t)>C-e.face/2)||(i.commands.length=c)}catch(e){if(this.strict)throw e;i.commands.length=c,me(Sa(r.el,e),`error`)}}),this.blamed=null}if(t&&!A.length&&!j.length&&!M.length)return;we(e.scheme)&&(e.themed=!0);let L=this.renderer.paint(e.plate,{commands:i.commands,began:n,stands:C,fixed:e.el.hasAttribute(`fill`),partial:!!t,moved:A,coloured:j,pictures:M,hot:N,stood:F,redrawn:t&&A.length?[...t].flatMap(e=>e.commands??[]):null});L&&(`margin`in L?(e.x=e.y=L.margin,e.whole=e.crop=null,e.layoutDirty=!0):(e.materialDirty=!1,L.all?e.lightBox=null:e.lightDirty?e.lightBox&&=V(e.lightBox,L.box):e.lightBox=L.box,e.lightDirty=!0))}place(e){if(e.staged)return this.box(e);let t=e.canvas.style,n=[`${-e.x}px`,`${-e.y}px`,`${e.cw}px`,`${e.ch}px`];return(t.left!==n[0]||t.top!==n[1]||t.width!==n[2]||t.height!==n[3])&&Object.assign(t,{left:n[0],top:n[1],width:n[2],height:n[3]}),this.boxOf(e,1,!0)}box(e){if(!e.staged)return this.boxOf(e,1);let t=this.where(e),n=e.w?t.width/e.w:1;return new DOMRect(t.left-e.x*n,t.top-e.y*n,e.cw*n,e.ch*n)}stir(e){let t=e.front??e;e.quiet=t.quiet=!1;for(let e of t.faces)e.quiet=!1}restful(e,t){return e.placed&&e.version===t&&e.plate.ready&&!e.layoutDirty&&!e.viewDirty&&!e.materialDirty&&!e.lightDirty&&!e.reachDirty&&!e.sharpen&&!e.moving.size&&!e.plate.wanted&&!e.plate.rough&&!this.renderer.edgesStale(e.plate)&&!e.ticked&&!e.movers.some(e=>e.springs.some(e=>e.active))}where(e){return this.boxOf(e,0)}boxOf(e,t,n=!1){let r=e.kept[t];if(!n&&r.at===this.moves&&r.look===this.looks)return r.r;if(e.cam===void 0){let t=e.el.closest(`[data-camera]`);e.cam=t&&!t.parentElement?.closest(`[data-camera]`)?t:null}let i=e.cam&&this.lens(e.cam);if(!n&&i&&r.at===this.moves&&r.local){let[e,t,n,a]=r.local;r.r=new DOMRect(i.left+e*i.s,i.top+t*i.s,n*i.s,a*i.s)}else{let n=r.r=(t?e.canvas:e.el).getBoundingClientRect();r.local=i?[(n.left-i.left)/i.s,(n.top-i.top)/i.s,n.width/i.s,n.height/i.s]:null,r.at=this.moves}return r.look=this.looks,r.r}lens(e){let t=this.lenses.get(e);if(t?.at===this.moves&&t.look===this.looks)return t.s?t:null;let n=e.getBoundingClientRect(),r=Kr(e);return this.lenses.set(e,t={left:n.left,top:n.top,s:r&&r>0?r:0,at:this.moves,look:this.looks}),t.s?t:null}changed(e){for(let t of e){let e=t.target,n=e.nodeType===1?e:e.parentElement;if(!n||n===this.stage?.canvas)continue;let r=n.closest(`d-device, [data-alone]`);if(!(r&&(r!==n||t.attributeName&&Ma.has(t.attributeName)))&&(t.attributeName!==`style`||Kr(n)===void 0||this.lensStyle.get(n)!==(this.lensStyle.set(n,Aa(n)),Aa(n)))){this.moves++;return}}}animating(){for(let e of document.getAnimations()){let t=e.effect?.target;if(!t||e.playState!==`running`)continue;let n=this.carries.get(t);if(n===void 0&&this.carries.set(t,n=t.matches(`d-device, [data-alone]`)||!!t.querySelector(`d-device, [data-alone]`)),n)return!0}return!1}shown(e,t){let n=t===e.el?this.where(e):t?t.getBoundingClientRect():this.box(e);return n.bottom>-40&&n.top<innerHeight+Ui&&n.right>-40&&n.left<innerWidth+Ui}lightPoints(){let e=this.pointer,t=Vt[this.handheld];if(In(this.torch&&e.i>0?{kind:`beam`,at:[e.x,e.y],color:t.color.map(n=>n*10*t.core*t.power*e.i*this.torch*(Gi/Math.PI))}:null),this.points=null,!this.pointsMoved&&!this.glowMoved.length||this.sizing)return!1;this.pointsAll=this.pointsMoved;let n=this.pointsMoved?[...Nn()].map(e=>({at:Pn(e.at),far:Fn(e,Wi),from:null,flat:null})).concat(this.renderer.emitters.map(Ki)):this.glowMoved.map(Ki);return this.points=new Yi(n.filter(e=>e.far>0)),this.pointsMoved=!1,this.glowMoved=[],!0}glowOut(){if(this.sizing)return!1;let e=Vn();if(!e&&!this.glowStale&&!this.renderer.glowPending)return!1;let t=[],n=0;for(let e of this.devices)e.visible&&!this.asleep(e)&&(n++,e.plate.tex?.G&&t.push(e));if(!t.length||!e&&n<2)return Hn(null),this.renderer.emitters.length?(this.glowMoved.push(...this.renderer.emitters),this.renderer.emitters=this.glowLit=[],!0):!1;let r=this.renderer.glowing(()=>t.map(e=>{let t=this.box(e);return{d:e,r:t,plate:e.plate,x:t.left/Xi,y:t.top/Xi,w:t.width/Xi,h:t.height/Xi}}),Math.ceil(innerWidth/Xi),Math.ceil(innerHeight/Xi),e||this.glowStale);return this.renderer.glowPending&&(this.glowStale=!1),r&&(Hn({...r,cell:Xi,gain:Zi}),this.emit(r))?!0:this.renderer.glowPending||this.glowStale}emit(e){let t=[],n=Xi;for(let{d:r,r:i}of e.shots){if(!r.visible||!r.plate.tex?.G||this.asleep(r))continue;let a=Math.max(0,Math.floor(i.left/n)),o=Math.min(e.w,Math.ceil(i.right/n)),s=Math.max(0,Math.floor(i.top/n)),c=Math.min(e.h,Math.ceil(i.bottom/n)),l=[i.left,i.top,i.right,i.bottom,e.w,e.h],u=r.gave;if(u&&u.plate===r.plate&&u.at.every((e,t)=>e===l[t])){let n=!0;for(let t=s,r=0;n&&t<c;t++)for(let i=(t*e.w+a)*4,s=(t*e.w+o)*4;i<s;i++,r++)if(e.data[i]!==u.cells[r]){n=!1;break}if(n){t.push(...u.out);continue}}let d=[],f=new Uint8Array(Math.max(0,o-a)*Math.max(0,c-s)*4);for(let t=s;t<c;t++){f.set(e.data.subarray((t*e.w+a)*4,(t*e.w+o)*4),(t-s)*(o-a)*4);for(let n=a;n<o;n++){let r=(t*e.w+n)*4;e.data[r]+e.data[r+1]+e.data[r+2]>2&&d.push(r)}}let p=[];r.gave={plate:r.plate,at:l,cells:f,out:p};let m=t=>t/4%e.w,h=t=>Math.floor(t/4/e.w),g=(t,a,o,s,c,l)=>{if(!t.length)return;if(l){let e=s-a>=c-o,n=e?(a+s)/2:(o+c)/2,r=e?m:h,i=t.filter(e=>r(e)+.5<n),u=t.filter(e=>r(e)+.5>=n);return e?(g(i,a,o,n,c,l-1),g(u,n,o,s,c,l-1)):(g(i,a,o,s,n,l-1),g(u,a,n,s,c,l-1))}let u=0,d=0,f=0,_=0,v=0,y=0,b=[0,0,0];for(let n of t){let t=(e.data[n]+e.data[n+1]+e.data[n+2])/3,r=m(n)+.5,i=h(n)+.5;for(let t=0;t<3;t++)b[t]+=e.data[n+t];u+=t,d+=t*r,f+=t*i,_+=t*r*r,v+=t*i*i,y+=t*r*i}if(!u)return;let x=d/u,S=f/u,C=_/u-x*x+1/12,w=v/u-S*S+1/12,T=y/u-x*S,E=4*Math.PI*Math.sqrt(Math.max(C*w-T*T,1/144)),D=Zi/255/E;p.push({from:r.plate,at:[x*n,S*n],on:[x*n-i.left,S*n-i.top],half:Math.sqrt(E*256/Math.PI),color:b.map(e=>e*D)})};g(d,i.left/n,i.top/n,i.right/n,i.bottom/n,2),t.push(...p)}let r=this.glowLit,i=(e,t)=>e===t||e.from===t.from&&Math.hypot(e.on[0]-t.on[0],e.on[1]-t.on[1])<Math.max(n,t.half*.25)&&Math.abs(e.half-t.half)<Math.max(e.half*.25,n/2)&&e.color.every((e,n)=>Math.abs(e-t.color[n])<Math.max(Math.max(...t.color)*.25,Wi)),a=e=>{let t=new Map;for(let n of e)t.get(n.from)?.push(n)??t.set(n.from,[n]);return t},o=a(r),s=a(t),c=[...t.filter(e=>!o.get(e.from)?.some(t=>i(e,t))),...r.filter(e=>!s.get(e.from)?.some(t=>i(t,e)))];return this.renderer.emitters=t,c.length?(this.glowLit=t,this.glowMoved.push(...c),!0):!1}pointsOn(e){let t=null;if(this.points.all.length){let n=this.box(e),r=n.width/e.cw||1;this.points.near(n.left,n.top,n.left+e.cw*r,n.top+e.ch*r,({at:[i,a],far:o,from:s,flat:c})=>{if(s===e.plate)return;let l=c?qi(c,e.plate.peak*4*r):o,u=Math.max((i-l-n.left)/r,0),d=Math.max((a-l-n.top)/r,0),f=Math.min((i+l-n.left)/r,e.cw),p=Math.min((a+l-n.top)/r,e.ch);f>u&&p>d&&(t=V(t,{x:u,y:d,w:f-u,h:p-d}))})}let n=this.pointsAll?V(e.pointBox,t):t;this.pointsAll&&(e.pointBox=t),n&&(e.lightDirty?e.lightBox&&=V(e.lightBox,n):e.lightBox=n,e.lightDirty=!0)}touched(e){return e.lightDirty||e.plate.rough&&!this.sweeping&&!this.sizing||this.fullLight||this.lights||this.look||!this.torch||!e.plate.pool?!0:this.renderer.poolMoved(e.plate,this.scene(),this.box(e))}abandon(e,t,n){let r=this.renderer.recover(),i=e.list.find(e=>r&&e.commands?.includes(r))?.el??this.blamed??e.el;return e.failed=n,this.blamed=null,Sa(i,t)}under(){let{tx:e,ty:t}=this.pointer,n=null,r=1/0;for(let i of this.devices){if(!i.visible||this.away(i))continue;let a=this.where(i),o=a.width*a.height;o>=r||e<a.left-Li||e>a.right+Li||t<a.top-Li||t>a.bottom+Li||getComputedStyle(i.el).pointerEvents!==`none`&&(n=i,r=o)}return n}follow(e,t){let n=this.pointer,r=this.carried?null:this.under(),i=!1;for(let a of this.devices){if(!a.visible){a.hand=0;continue}let o=(this.carried||a===r?n.ti:0)-a.hand;o&&(a.hand=Math.abs(o)>.004?a.hand+o*(1-Math.exp(-e*5)):a.hand+o,i=!0),(o||a.hand&&t)&&(a.lightDirty=!0,a.lightBox=null)}return i}turned(e){let t=!1;for(let n of this.devices){let r=n.spun-n.spinning;if(n.faces.length&&r){this.reduced.matches||!n.visible||Math.abs(r)<.002?n.spinning=n.spun:(n.spinning+=r*(1-Math.exp(-e*(this.cards?oo:11))),t=!0);let i=e=>{let t=Math.atan2(Math.sin(e),Math.cos(e));return Math.abs(t)<1e-6?0:t},a=this.turnable(n),o=e=>Xa[e.facing??`front`];n.showing=a.reduce((e,t)=>Math.abs(i(n.spinning-o(t)))<Math.abs(i(n.spinning-o(e)))?t:e),n.over=n.showing!==n,n.el.toggleAttribute(`data-over`,n.over),n.showing.facing?n.el.setAttribute(`data-up`,n.showing.facing):n.el.removeAttribute(`data-up`),n.turning=n.spinning!==n.spun||i(n.spinning-o(n.showing))!==0,n.el.toggleAttribute(`data-turning`,n.turning);let s=(e,t)=>{let n=i(e),r=Math.PI/2-1e-9;return t?Math.sign(n)*Math.min(Math.abs(n),r):Math.sign(n)*Math.max(Math.abs(n),Math.PI-r)};if(this.cards)this.dealt(n,a);else{let e=Math.cos(n.spinning)>=0,t=Math.cos(n.spinning-Xa.right)>=0;for(let r of a)r.spin=s(n.spinning-o(r),r.facing===`back`?!e:r.facing===`right`?t:r.facing===`left`?!t:e);for(let e of a)e.lightDirty=!0,e.lightBox=null}}let[i,a]=n.aim,o=i-n.turn[0],s=a-n.turn[1];if(!o&&!s)continue;if(!n.visible){n.aim=[0,0],n.turn=[0,0];continue}let c=Math.hypot(o,s)>.002?1-Math.exp(-e*(i||a?18:5)):1;n.turn=[n.turn[0]+o*c,n.turn[1]+s*c],n.lightDirty=!0,n.lightBox=null,t=!0}return t}dealt(e,t){let n=[e,...e.faces];for(let e of n)e.spin&&(e.spin=0,e.lightDirty=!0,e.lightBox=null);let r=e=>Math.atan2(Math.sin(e),Math.cos(e)),i=e=>Xa[e.facing??`front`],a=e.spinning,o=a+r(i(e.showing??e)-a),s=Math.sign(a-o)||1,c=Math.PI*2;for(let e of t)for(let t of[-1,0,1]){let n=(o+r(i(e)-o)+t*Math.PI*2-o)*s;n>.001&&(c=Math.min(c,n))}let l=Math.min(Math.abs(a-o)/(c/2),1),u=e.owns[0]/.25||e.el.offsetWidth/2,d=e.axis*2/.25||e.face/.25,f=Math.max(e.el.offsetWidth,e.el.offsetHeight)*Qa,p=Math.min(l/no,1),m=Math.max((l-no)/.64,0),h=ro*Math.atan(u/f),g=m>0?n.reduce((e,t)=>Math.abs(r(a-i(t)))<Math.abs(r(a-i(e)))?t:e):e.showing??e,_=!t.includes(g),v=r(a-i(g)),y=Math.PI/n.length,b=_?a-v+v/y*Math.min($a,y):o+s*(h*p+(Math.min($a,c/2)-h)*m),x=d/2*Math.cos(b)**2+u*Math.sin(b)**2;e.el.style.perspective=`${f}px`;let S=(e,t)=>Math.min(Math.max(((_?1:l)-e)/(t-e),0),1)**2,C=S(.35,1)*e.el.offsetWidth*io,w=1+ao*S(.6,1),T=this.whips.get(e);if(!T&&e.turning){let t=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`),n=document.createElementNS(t.namespaceURI,`filter`),r=document.createElementNS(`http://www.w3.org/2000/svg`,`feGaussianBlur`);n.id=`d-whip-${++this.whipped}`,n.setAttribute(`x`,`-20%`),n.setAttribute(`width`,`140%`),n.append(r),t.append(n),t.setAttribute(`aria-hidden`,`true`),Object.assign(t.style,{position:`absolute`,width:`0`,height:`0`}),document.body.append(t),this.whips.set(e,T=r)}T?.setAttribute(`stdDeviation`,`${C.toFixed(1)} 0`);for(let t of n){Object.assign(t.el.style,{transformStyle:`preserve-3d`,isolation:`auto`});let n=i(t)-b,r=Math.cos(n),a=t.canvas.style;if(!e.turning){Object.assign(a,{transform:``,filter:``,clipPath:``,opacity:t===e.showing?``:`0`});continue}let o=t.facing===`left`||t.facing===`right`?u:d/2,s=t.el.offsetWidth,c=t.el.offsetHeight,l=t.x+s/2,f=r-.5*Math.sin(n);Object.assign(a,{transform:`translateZ(${-x}px) rotateY(${n}rad) translateZ(${o}px)`,transformOrigin:`${l}px ${t.y+c/2}px`,backfaceVisibility:`hidden`,filter:`${C>.2&&T?`url(#${T.parentElement.id}) `:``}brightness(${(Math.min(Math.max(.5+.5*f,.45),1.12)*w).toFixed(3)})`,opacity:r>.01&&(t===g||m>0)?``:`0`})}}turnable(e){let t=[e,...e.faces],n=e=>e.facing===`left`||e.facing===`right`;return this.cards&&!this.sides&&!n(e.showing??e)?t.filter(e=>!n(e)):t}away(e){let t=e.front??e,n=t.showing??t,r=e=>e.facing===`left`||e.facing===`right`;return!t.turning&&n!==e&&!(r(n)&&!r(e))}asleep(e){return this.away(e)&&!(e.front??e).handy}scene(){return{carried:this.carried,all:this.lightDirty,full:this.fullLight,sweeping:this.sweeping,sizing:this.sizing,tilt:this.tilt,look:this.look,lights:this.lights,ambient:this.ambient,torch:this.torch,handheld:this.handheld,lighting:this.lighting,pointer:this.pointer,width:innerWidth,height:innerHeight,ratio:devicePixelRatio}}tick=(e,t=!1)=>{this.raf=0,this.renderer.lost||(!t&&this.renderer.held()?(this.stats.held++,this.renderer.late()&&(this.behind=!0),this.schedule()):(this.renderer.begin(t,e-this.scrollAt>200),this.frame(e)))};frame(e){let t=Math.max(0,Math.min(this.last?(e-this.last)/1e3:1/60,1/30));this.last=e;let n=this.scrolled,r=this.pointer,i=r.tx-r.x,a=r.ty-r.y,o=r.ti-r.i,s=Math.abs(i)+Math.abs(a)>.3||Math.abs(o)>.004;if(s){let e=1-Math.exp(-t*7);r.x+=i*e,r.y+=a*e,r.i+=o*(1-Math.exp(-t*5)),(this.torch||this.look)&&(this.lightDirty=!0),n=this.sweeping=!0}else this.sweeping=this.scrolled;this.lights&&(s||this.handsDue||this.handShifted)&&(this.handsDue=this.follow(t,s||this.handShifted),this.handShifted=!1,this.handsDue&&(n=this.sweeping=!0)),this.turnsDue&&(this.turnsDue=this.turned(t),this.turnsDue&&(n=this.sweeping=!0)),this.scrolled=!1,this.torch&&Vt[this.handheld].flicker&&!this.reduced.matches&&(e-this.flickered>=Ri&&(this.flickered=e,this.lightDirty=!0),n=this.sweeping=!0),this.lightPoints()&&(n=!0,this.pointsAll&&(this.sweeping=!0));let c=this.page?.takeRecords();c?.length&&this.changed(c),(this.animating()||scrollX!==this.scrolledTo[0]||scrollY!==this.scrolledTo[1])&&this.moves++,this.scrolledTo=[scrollX,scrollY];let l=!1,u=null,d=Ze(),f=performance.now(),p=[],m=!1,h=0,g=!1,_=e-this.beatAt>=da;this.sweeping&&(this.room=this.behind?Math.max(this.room*.8,Pi):Math.min(this.room+.1,Fi)),this.behind=!1;let v=this.lightDirty||this.fullLight||d!==this.quietAt||this.points||this.sweeping||this.turnsDue?[...this.devices]:[...this.devices].filter(e=>!e.quiet);this.quietAt=d;let y=new Map;for(let e of v){if(!e.sharpen||!e.visible)continue;let t=this.where(e),n=Math.hypot(t.left+t.width/2-innerWidth/2,t.top+t.height/2-innerHeight/2);y.set(e,n/Math.max(Math.sqrt(t.width*t.height),1))}let b=v.sort((e,t)=>+e.plate.ready-t.plate.ready||+e.sharpen-t.sharpen||(y.get(e)??0)-(y.get(t)??0)||e.stirred-t.stirred),x=this.sweeping?ca:la;for(let r of b){if(!r.visible||r.failed===d)continue;if(this.asleep(r)){r.quiet=!0;continue}if(this.points&&(r.pointBox||this.points.all.length)&&this.pointsOn(r),!r.plate.ready&&r.placed&&this.standing(r,d))continue;let i=!r.plate.ready||r.sharpen,a=!r.plate.ready,o=performance.now();if(i&&m&&o-f+(r.cost||this.arriving)>x)n=!0;else{i&&(m=!0);try{if(this.renderer.making(r.plate)){n=!0;continue}r.layoutDirty||!r.placed||r.version!==d?this.layout(r):(r.viewDirty||!r.plate.ready)&&this.layout(r,!0);let i=!1,a=!1;if(r.movers.some(e=>e.p.def.tick||e.springs.some(e=>e.active))){let n=this.where(r),o=Math.max(n.width,n.height),s=da*Math.min(Math.ceil(Qi/Math.max(o,1)),fa);if(a=r.small=o<Qi&&!r.used,a&&(!_||e-r.stepped<s-da/2))g=!0;else{let n=a&&r.stepped?Math.min((e-r.stepped)/1e3,1):t;r.stepped=e,this.ticking=r,this.tickAsked=!1;for(let{p:e,springs:t}of r.movers){for(let a of t)a.active&&(a.step(n,this.reduced.matches)&&(i=!0),r.moving.add(e));this.blamed=e.el,e.def.tick?.(e,n)&&(r.moving.add(e),i=!0)}this.ticking=null,r.ticked=i||this.tickAsked}}if(i&&(n||this.shown(r,r.el))&&(a?g=!0:n=!0),[...r.moving].some(e=>e.def.spreads))for(let e of r.list)r.moving.add(e);if(!r.materialDirty&&this.renderer.edgesStale(r.plate)&&(r.materialDirty=r.plate.reedge=!0),r.materialDirty)this.paint(r),r.moving.clear();else if(r.moving.size&&this.shown(r,r.el)){let e=this.where(r),t=Math.max(e.width,e.height)<Qi;if(t&&h>ua)n=!0;else{let e=performance.now();r.reverse&&[...r.moving].some(e=>e.el.closest(`[back]`))&&(r.reverse.materialDirty=!0),this.paint(r,r.moving),r.moving.clear(),r.stirred=e,t&&(h+=performance.now()-e)}}for(;r.layoutDirty;)this.layout(r),this.paint(r);let o=r.front??r;if(r.body&&[o,...o.faces].some(e=>e!==r&&e.visible&&!this.asleep(e)&&this.renderer.edgesStale(e.plate))&&(n=!0),this.blamed=null,r.plate.wanted){n=!0;continue}this.away(r)&&!this.cards?(r.lightDirty||r.ctx.clearRect(0,0,r.canvas.width,r.canvas.height),r.lightDirty=!0):(r.lightDirty||this.lightDirty||r.plate.rough&&!this.sweeping&&!this.sizing)&&(this.shown(r,this.sweeping?r.el:void 0)?this.touched(r)&&p.push(r):(r.lightDirty=!0,r.lightBox=null)),r.reachDirty&&!this.sizing&&!r.movers.some(e=>e.springs.some(e=>e.active))&&Br(r,this.reachCanvas),this.restful(r,d)&&(r.quiet=!0)}catch(e){this.ticking=null;let t=this.abandon(r,e,d);this.strict?u??=Error(t,{cause:e}):me(t,`error`)}finally{let e=performance.now()-o;i&&e>.5&&(r.cost=e,a&&(this.arriving+=(e-this.arriving)*.2))}}}let S=this.sweeping?this.room:Math.max(Fi,x/this.lightEach);if(p.length>S){let e=e=>{let t=this.where(e);return r.x>=t.left&&r.x<=t.right&&r.y>=t.top&&r.y<=t.bottom?Ii:1},t=e=>e.front??e,i=new Map(p.map(n=>[n,Math.sqrt(t(n).pw*t(n).ph)*(t(n).waited+1)*e(t(n))]));p.sort((e,t)=>i.get(t)-i.get(e));let a=new Set,o=p.filter(e=>(a.has(t(e))||a.size<Math.floor(S))&&!!a.add(t(e)));for(let e of p.filter(e=>!o.includes(e)))e.lightDirty=!0,e.lightBox=null,e.waited++,n=!0;p.splice(0,p.length,...o)}for(let e of p){if(!e.plate.tex?.G)continue;let t=this.box(e),n=`${t.left},${t.top},${t.width},${t.height}`;n!==e.glowedAt&&(this.glowStale=!0,e.glowedAt=n)}if(p.length){let e=performance.now();this.renderer.lightAll(p.map(e=>({d:e,plate:e.plate,ctx:e.staged?null:e.ctx,rect:this.place(e),lighting:e.el.getAttribute(`lighting`)??this.lighting})),this.scene(),({d:e})=>{e.lightDirty=!1,e.lightBox=null,e.waited=0,l=!0,e.staged&&(this.staleStage=!0,e.canvas.width&&this.vacate(e)),e.canvas.style.opacity===`0`&&(e.canvas.style.transition=`opacity .12s`,e.canvas.style.opacity=``,!e.whole&&e.under&&setTimeout(()=>e.under&&!e.whole&&(e.under.hidden=!0),150))},({d:e},t)=>{let n=this.abandon(e,t,d);this.strict?u??=Error(n,{cause:t}):me(n,`error`)}),this.lightEach+=((performance.now()-e)/p.length-this.lightEach)*.2}if(this.lightDirty=this.fullLight=!1,this.renderer.glowDrawn&&(this.glowStale=!0,this.renderer.glowDrawn=!1),this.glowOut()&&(n=!0),_&&(this.beatAt=e),this.stage&&(this.staleStage||p.length&&p.some(e=>!e.staged))&&this.showStage(),l&&this.stats.frames++,this.renderer.end(),n?this.schedule():(this.last=0,g&&this.onBeat()),u)throw u}},uo=null;function fo(){return uo??=new lo}var po=/(?:^|;)\s*(transform|translate|rotate|scale|opacity|filter|clip-path|mask[\w-]*|visibility|mix-blend-mode|perspective|overflow[\w-]*)\s*:[^;]*/g,mo=e=>(e?.match(po)??[]).join(`;`),ho=e=>e.closest(`d-device, [data-alone]`)?.__d;function go(e){return ho(e)?.parts.get(e)}function _o(e){let t=getComputedStyle(e.parentElement??e).colorScheme;return t.includes(`dark`)&&(!t.includes(`light`)||matchMedia(`(prefers-color-scheme: dark)`).matches)?`dark`:`light`}function vo(e,t){let n=e.el.closest(`[use]`),r=n&&n!==t.el&&t.el.contains(n)?parseFloat(n.getAttribute(`use`)):1;return Number.isFinite(r)&&r>=0?r:1}function yo(e){let t=ho(e);t&&fo().redraw(e,t)}function bo(e){let t=fo();e.tilt!==void 0&&(t.tilt=e.tilt),e.strict!==void 0&&(t.strict=e.strict),e.lights!==void 0&&(t.lights=e.lights),e.look!==void 0&&(t.look=e.look),e.ambient!==void 0&&(t.ambient=e.ambient),e.exposure!==void 0&&(t.exposure=e.exposure),e.torch!==void 0&&(t.torch=e.torch),e.handheld!==void 0&&(t.handheld=e.handheld),e.lighting!==void 0&&(t.lighting=e.lighting),e.relief!==void 0&&(t.relief=e.relief),t.relight()}function xo(e,t){if(e==null||e===``)return t;let n=/^\s*(-?[\d.]+)\s*(mm|cm)?\s*$/.exec(e);return n?parseFloat(n[1])*(n[2]===`cm`?10:1):t}var So={rolled:`round`,round:`round`,chamfer:`chamfer`,flat:`flat`,dome:`dome`,blend:`blend`};Je({selector:`d-surface`,label:!0,paint(e,t,n){let r=e=>t.el.getAttribute(e),i=r(`material`)??n.material,a=xo(r(`height`),1),[o=0,s=o]=(r(`crown`)??`0`).trim().split(/\s+/).map(e=>xo(e,0)),c=[o,s],d=+(r(`bevel`)??2.5);gi(t.el,{top:bi(t)+a,crown:c,x:t.x,y:t.y,w:t.w,h:t.h});let f=r(`path`),p=r(`viewbox`)?.trim().split(/[\s,]+/).map(Number),_=(r(`rotate`)??0)*Math.PI/180,v=f?h(f,t.x,t.y,t.w,t.h,{viewBox:p,rotate:_,rule:r(`rule`)===`evenodd`?`evenodd`:void 0,spread:d+8}):null,y=r(`stop`),b=v?y?F(v,h(y,t.x,t.y,t.w,t.h,{viewBox:p,rotate:_,spread:d+8})):v:r(`shape`)===`circle`?u(t.x+t.w/2,t.y+t.h/2,Math.min(t.w,t.h)/2):l(t.x,t.y,t.w,t.h,{radius:+(r(`radius`)??3),rotate:_});e.surface(b,{material:i,follow:vi(t),rise:a,bevel:d,profile:So[r(`edge`)??`rolled`]??`round`,crown:c,radial:t.el.hasAttribute(`radial`),over:{wear:+(r(`wear`)??n.wear),...yi(r(`lay`))}});let x=r(`label`)??`engrave`;if(x===`emboss`&&t.label){let{lines:n,font:r,letterSpacing:a,wordSpacing:o}=t.label;for(let s of n)e.surface(g(s.text,s.x,s.y,s.w,s.h,{font:r,letterSpacing:a,wordSpacing:o}),{material:i,follow:vi(t),rise:.5,bevel:1.2,over:{rough:.3}})}else t.label&&e.cut(m(t.label),{depth:x===`print`?0:.2,ink:ke(i),wear:n.wear*.2})}}),Je({selector:`d-set`,paint(){}}),at(`
d-device { display: block; position: relative; isolation: isolate; }
/* An app rather than an object: it takes the size of what holds it, and casts nothing outside it. */
d-device[fill] { width: 100%; height: 100%; overflow: clip; }
/* Far out of the window, nothing of it is painted or hit, and it keeps its place. Clipped, not hidden, so the keyboard and a screen reader still reach it. A printed page has no window, so all of it prints. */
@media screen { [data-far] { clip-path: inset(50%); } }
/* Shown too small to use, its markup sleeps the same way, the device's own box left as it was, and a hand coming over it wakes it. */
@media screen { [data-asleep] > :not(canvas[data-d]) { clip-path: inset(50%); } }
d-device > canvas[data-d] { position: absolute; z-index: -1; pointer-events: none; }
d-surface { display: block; position: relative; }
d-set { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
/* A part out on the page holds its own canvas. Most rules should win over this, so it weighs nothing. */
:where([data-alone]) { isolation: isolate; }
/* Named here so a framework's reset, in its base layer, can't undo what's in ours. This sheet comes first in the head, so this sets the order. */
@layer theme, base, diegetic, components, utilities;
/* In a layer so a page's own position wins. */
@layer diegetic { :where([data-alone]) { position: relative; } }
[data-alone] > canvas[data-d] { position: absolute; z-index: -1; pointer-events: none; }
/* A box is only what the page lays out, and most of one isn't what's drawn. What can't be used stays out of the way of what can. */
:where(.d-gl d-device *) { pointer-events: none; }
:where(.d-gl d-device :is(a, button, input, label, select, summary, textarea, [tabindex])) { pointer-events: auto; }
.d-gl :is(d-device[lean], d-device:has(> d-device:is([reverse], [side])), d-device:is([reverse], [side])) { cursor: grab; touch-action: pan-y; user-select: none; -webkit-user-select: none; }
.d-gl :is(d-device[lean], d-device:has(> d-device:is([reverse], [side])), d-device:is([reverse], [side])):active { cursor: grabbing; }
/* The other face of a body, in the same place, and the only one showing once it's up. */
d-device[reverse] { position: absolute; inset: 0; visibility: hidden; pointer-events: auto; }
/* A side, as wide as the body is deep, across its middle. */
d-device[side] { position: absolute; top: 0; bottom: 0; left: 50%; width: var(--d-deep); margin-left: calc(var(--d-deep) / -2); visibility: hidden; pointer-events: auto; }
/* The two faces of the half of a body that folds, each where it rests, and only the one that's up showing. */
d-device > d-device[fold] { position: absolute; }
d-device[folded] > d-device[fold="open"], d-device:not([folded]) > d-device[fold="shut"] { visibility: hidden; }
d-device > d-device[loose] { position: absolute; visibility: visible; pointer-events: auto; cursor: grab; touch-action: none; }
/* What's seated is drawn by what holds it, and only a hand's way to it stays here. What's still lying spare waits until there's a way in to see. */
d-device:not([data-up="back"]) > d-device[loose][seated], d-device > d-device[loose][seated]:not([moving]) > * { visibility: hidden; }
d-device:not([data-up="back"]) > d-device[loose][at] { visibility: hidden; }
d-device[data-over] { visibility: hidden; }
d-device[data-up="back"] > d-device[reverse], d-device[data-up="left"] > d-device[side="left"], d-device[data-up="right"] > d-device[side="right"] { visibility: visible; }
/* Each face draws its part of the body, so all of them show while it goes round. */
d-device:is([data-turning], [data-up="left"], [data-up="right"]) > canvas[data-d], d-device:is([data-up="left"], [data-up="right"]) > d-device[reverse] > canvas[data-d], d-device[data-turning] > d-device:is([reverse], [side]) > canvas[data-d] { visibility: visible; }
/* Where a part is drawn outside its box. Behind its contents, so its own inputs still come first. */
:where([d-reach])::after { content: ''; position: absolute; z-index: -1; left: var(--reach-x); top: var(--reach-y); width: var(--reach-w); height: var(--reach-h); }
d-device { background: #ddd; border: 1px solid #777; border-radius: 8px; }
.d-gl d-device { background: none; border: 0; }
.d-gl d-surface { color: transparent; }
@media (forced-colors: active) {
  :is(d-device, [data-alone]) > canvas[data-d] { display: none; }
}
`);var Co=typeof HTMLElement>`u`?class{}:HTMLElement,wo=class extends Co{connectedCallback(){fo().add(this)}disconnectedCallback(){fo().remove(this)}};typeof customElements<`u`&&!customElements.get(`d-device`)&&customElements.define(`d-device`,wo);var To=new Set([`input`,`img`,`hr`,`br`,`canvas`,`select`,`textarea`,`meter`,`progress`,`table`,`details`]),Eo=`dialog, [popover]`;function Do(e){let t=tt(),n=[...e instanceof Element&&e.matches(t)?[e]:[],...e.querySelectorAll(t)];for(let e of n)e.hasAttribute(`data-alone`)||e.closest(`d-device`)||To.has(e.localName)||(e.parentElement?.closest(`${t}, ${Eo}`))?.matches(t)||(e.setAttribute(`data-alone`,``),fo().add(e))}function Oo(e){for(let t of[e,...e.querySelectorAll(`[data-alone]`)])t.hasAttribute(`data-alone`)&&!t.isConnected&&(t.removeAttribute(`data-alone`),fo().remove(t))}var ko=2e3,Ao=new Set,jo=0;function Mo(){jo=0;for(let e of Ao)if(e.isConnected)for(let t of[e,...e.querySelectorAll(`*`)])qe(t);Ao.clear()}if(typeof MutationObserver<`u`){let e=!1;Xe(()=>{e||(e=!0,queueMicrotask(()=>{e=!1,Do(document),Ao.add(document.documentElement),clearTimeout(jo),jo=window.setTimeout(Mo,ko)}))}),new MutationObserver(e=>{for(let t of e){for(let e of t.removedNodes)e instanceof Element&&Oo(e);for(let e of t.addedNodes)e instanceof Element&&e.isConnected&&(Do(e),Ao.add(e),jo||=window.setTimeout(Mo,ko))}}).observe(document,{subtree:!0,childList:!0})}var No=e=>e.el.querySelector(`input`),Po=e=>[e.min===``?0:+e.min,e.max===``?100:+e.max],Q=(e,t,n)=>Math.min(Math.max(e,t),n),Fo=()=>typeof matchMedia<`u`&&matchMedia(`(prefers-reduced-motion: reduce)`).matches,Io=new Map;function Lo(e,t){t.isTrusted?e.setPointerCapture(t.pointerId):Io.set(t.pointerId,e)}var Ro=e=>Io.get(e);function zo(e){let t=Io.get(e);return Io.delete(e),t}function Bo(e,t,n){let r=!1;e.el.addEventListener(`pointerdown`,t=>{if(r||t.button||n.accepts?.(t)===!1||e.el.querySelector(`input`)?.disabled)return;t.preventDefault(),e.el.querySelector(`input`)?.focus({preventScroll:!0}),Lo(e.el,t),r=!0;let i=t.clientX,a=t.clientY;n.start?.(t);let o=e=>{e.pointerId===t.pointerId&&(n.move(e,e.clientX-i,e.clientY-a),i=e.clientX,a=e.clientY)},s=i=>{i.pointerId===t.pointerId&&(r=!1,e.el.removeEventListener(`pointermove`,o),e.el.removeEventListener(`pointerup`,s),e.el.removeEventListener(`pointercancel`,s),e.el.removeEventListener(`lostpointercapture`,s),n.end?.(i))};e.el.addEventListener(`pointermove`,o),e.el.addEventListener(`pointerup`,s),e.el.addEventListener(`pointercancel`,s),e.el.addEventListener(`lostpointercapture`,s)},{signal:t})}function Vo(e,t,n){let r=new AbortController,{signal:i}=r,a=-1;e.style.pointerEvents=`auto`,e.style.touchAction=`none`,e.style.cursor=`crosshair`;let o=n=>{let r=e.getBoundingClientRect(),i=r.width/(e.offsetWidth||1),a=t(),o=((n.clientX-r.left)/i-a.x)/a.w,s=((n.clientY-r.top)/i-a.y)/a.h;return{x:o*a.cols,y:s*a.rows,inside:o>=0&&o<=1&&s>=0&&s<=1,a}},s=(e,t)=>Q(e,0,t-.001);e.addEventListener(`pointerdown`,t=>{if(t.button||a>=0)return;let{x:r,y:i,inside:s}=o(t);s&&n.down?.(r,i,t)!==!1&&(t.preventDefault(),a=t.pointerId,t.isTrusted&&e.setPointerCapture(t.pointerId))},{signal:i}),e.addEventListener(`pointermove`,e=>{if(e.pointerId===a)for(let t of e.getCoalescedEvents?.()??[e]){let{x:r,y:i,a}=o(t);n.move?.(s(r,a.cols),s(i,a.rows),e)}},{signal:i});let c=e=>{if(e.pointerId!==a)return;a=-1;let{x:t,y:r,a:i}=o(e);n.up?.(s(t,i.cols),s(r,i.rows),e)};return e.addEventListener(`pointerup`,c,{signal:i}),e.addEventListener(`pointercancel`,c,{signal:i}),()=>r.abort()}function Ho(e,t){let n=e.value;Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,`value`).set.call(e,String(t)),e.value!==n&&e.dispatchEvent(new Event(`input`,{bubbles:!0}))}var Uo=e=>Math.atan2(Math.sin(e),Math.cos(e));function Wo(e,t,n,r,i=0){let a=Math.hypot(e,t),o=Math.hypot(n,r);return Math.min(a,o)>=i?Uo(Math.atan2(r,n)-Math.atan2(t,e)):(e*r-t*n)/(Math.max(a,o)*i)}var Go=.12,Ko=class{at=0;seat=0;grab(e){this.at=this.seat=e}by(e,t){let{min:n,max:r,step:i,wrap:a,past:o=0}=t,s=r-n;if(this.at+=e,a&&s){let e=Math.floor((this.at-n)/s)*s;this.at-=e,this.seat-=e}else this.at=Q(this.at,n-o,r+o);let c=a?this.at:Q(this.at,n,r);if(!i)return this.seat=c;let l=Number.isFinite(n)?n:0,u=(this.seat-l)/i,d=(c-l)/i,f=d>u?Math.floor(d+.5-Go):Math.ceil(d-.5+Go);return(f-u)*(d-u)>0&&(this.seat=l+f*i),this.seat}},qo=e=>e.step===`any`?0:+e.step||1;function Jo(e,t,n=`pull`){e.data[n]!==t&&(e.data[n]=t,e.def.update?.(e))}var Yo=.4,$=(e,t)=>typeof e==`function`?e(t):e,Xo={"ball-bearing":{drag:.06,start:.05},"finger-on-glass":{drag:0,start:0},"steel-on-steel":{drag:.15,start:.3},"brass-on-steel":{drag:.16,start:.35},"plastic-on-plastic":{drag:.2,start:.2},"plastic-on-rubber":{drag:.15,start:.1},"rubber-on-plastic":{drag:.3,start:.3},"metal-on-grease":{drag:.25,start:.15},governor:{drag:.75,start:0}},Zo=2e3,Qo=.5,$o=226,es=.12,ts=.8,ns=14,rs={x:0,y:0,rotate:0,pin:[0,0]},is=.35;function as(e,t=`spring`,n={}){let r=e.material??`plastic-on-plastic`,i=e.mass??10,a=typeof e.friction==`number`?{drag:e.friction}:e.friction??{},o=a.drag??Xo[r].drag,s=a.start??Xo[r].start,c=e.detents?e.detents===!0?is:e.detents.strength??is:0,l=Zo*i**(-1/3)*(1+c)*(e.return?Math.sqrt(e.return/Qo):1),u=!e.return&&!c&&o?Math.sqrt(i)/o/$o:0;return{...n,joint:t,sound:e.sound,arrives:!!e.contact,mass:i,material:r,drag:o,start:s,strength:c,returns:!!e.return,coast:u<es?0:u,landing:e.stops?.landing??`hard`,ratchet:e.ratchet??0,spring:{stiffness:l,damping:2*Math.min(.1+.9*o**.35,1)*Math.sqrt(l)}}}var os=e=>cs(as(e),{contact:e.material?`press`:void 0,...e});function ss(e={}){let t=new WeakSet,n=e=>t.has(e)?0:+(e.el.getAttribute(`rpm`)??0);return{springs:{speed:os(e)},update:e=>e.springs.speed.set(n(e)),hold(e,r){r?(t.add(e),e.springs.speed.snap(0)):t.delete(e),e.springs.speed.set(n(e))},tick(e,t){let n=e.springs.speed.value;return Math.abs(n)<.02||Fo()?!1:(e.data.motor=((e.data.motor??0)+n/60*t*Math.PI*2)%(Math.PI*2),!0)},angle:e=>e.data.motor??0}}var cs=(e,t)=>({...e.spring,motion:e,...t.contact!==void 0&&{contact:t.contact}});function ls(e={}){let t=e.name??`follow`,n=e=>{let n=e.el.getAttribute(`of`),r=n?e.el.closest(`d-device`)?.querySelector(n):null,i=r?go(r):null,a=i?.def?.value;i&&a&&e.springs[t].set(a(i))};return{springs:{[t]:os(e)},update:n,tick(e){return n(e),!1},value:e=>Q(e.springs[t].value,0,1)}}var us={hard:.004,soft:.02},ds={hard:1,soft:.3},fs=.25,ps=24,ms=.05,hs=60,gs=.25,_s=60,vs=(e,t)=>t===`touch`?.01:Math.min(.014+e*8e-4,.03),ys=e=>`grip:${e}`;function bs(e,t,n){let{motion:r,track:i}=n,a=new Ko,o=0,c=0,l=0,u=0,d=0,f=!1,p=r.material===`finger-on-glass`,m={moved:0},h=(t,o=0)=>{if(t*r.ratchet<0)return;let l={...i.reach(e),past:o},u=l.max-l.min,d=Number.isFinite(u),m=a.by(t,l),h=i.read(e);i.write(e,m);let g=l.wrap?a.at:Q(a.at,l.min,l.max),_=a.at-g,v=d&&!p?us[r.landing]*u:0,y=v&&_?Math.sign(_)*v*(1-Math.exp(-Math.abs(_)/(v*4))):0;Jo(e,((l.step?Yo*Math.min(1,(1-r.strength)/.65):1)*(g-i.read(e))+y)/i.scale(e),n.pull);let b=!l.wrap&&d&&(m===l.min||m===l.max),x=d?Math.abs(c)/u:0;b&&!f&&x>fs&&!p&&!r.arrives&&s(e,`stop`,Math.min(x*2,10)*ds[r.landing],{motion:r}),f=b,i.read(e)!==h&&!l.step&&!p&&s(e,`rub`,x,{motion:r})},g=()=>{u&&(cancelAnimationFrame(u),u=0,Jo(e,0,n.pull))};t.addEventListener(`abort`,()=>cancelAnimationFrame(u));let _=t=>{let i=n.radians?.(e)??1,a=ts/i,o=ns/i,s=Q(t,-o,o),l=performance.now();if(Math.abs(s)<a)return;let d=t=>{let i=Math.max(0,Math.min(.05,(t-l)/1e3));l=t,s*=Math.exp(-i/r.coast),c=s,h(s*i),u=Math.abs(s)<a||f?0:requestAnimationFrame(d),u||Jo(e,0,n.pull)};u=requestAnimationFrame(d)};return Bo(e,t,{accepts:n.accepts&&(t=>n.accepts(e,t)),start(t){g(),a.grab(i.read(e)),!r.strength&&!i.reach(e).step&&e.springs[n.spring].grip(vs(r.mass,t.pointerType)),n.grab(e,t),e.el.querySelector(`input`)||(n.focus?.(e)??e.el).focus({preventScroll:!0}),o=r.start*2*r.mass**.25,c=0,l=t.timeStamp,m.moved=0;let s=n.seat?.(e,t);s!==void 0&&(a.grab(s),i.write(e,s),o=0)},move(t,r,s){let u=n.by(e,t,r,s);if(m.moved+=Math.hypot(r,s),o>0&&(o-=Math.hypot(r,s))>0||n.hold?.(e,u))return;let d=(t.timeStamp-l)/1e3;d>0&&(c+=(u/d-c)*(1-Math.exp(-d/ms))),l=t.timeStamp,h(u,n.past(e));let f=i.reach(e);e.data[ys(n.spring)]=f.wrap?a.at:Q(a.at,f.min,f.max)},end(t){delete e.data[ys(n.spring)],e.springs[n.spring].grip(0),n.letGo?.(e);let o=n.rest?.(e);o!==void 0&&i.write(e,o),Jo(e,0,n.pull),a.grab(i.read(e)),r.coast&&t.type===`pointerup`&&t.timeStamp-l<hs&&!Fo()&&_(c)}}),e.el.addEventListener(`keydown`,()=>{g(),m.moved=0},{signal:t}),n.scroll&&e.el.addEventListener(`wheel`,t=>{let r=e.el.querySelector(`input`);if(!e.el.contains(document.activeElement)||r?.disabled)return;t.preventDefault(),g();let o=i.read(e),{step:s}=i.reach(e),c=-t.deltaY*(t.deltaMode?16:1);if(a.grab(o),s){d+=c/_s*s;let e=Math.trunc(d/s);e&&(d-=e*s,h(e*s))}else d+=c*gs*n.scroll(e),h(d),i.read(e)!==o&&(d=0);Jo(e,0,n.pull)},{signal:t,passive:!1}),m}var xs=e=>typeof e.detents==`object`?e.detents:{},Ss=e=>e.type===`checkbox`||e.type===`radio`,Cs=e=>Ss(e)?[0,1]:Po(e),ws=e=>Ss(e)?+e.checked:+e.value,Ts=!1,Es=(e,t)=>{if(!Ss(e))return Ho(e,t);e.checked!==t>=.5&&(Ts=!0,e.click(),Ts=!1)},Ds=(e,t)=>{let[n,r]=Cs(t);return(r>n?Q((ws(t)-n)/(r-n),0,1):0)+(e.data.pull??0)},Os=3;function ks(e,t,n,r,i,a=!1){e.el.addEventListener(`click`,t=>{if(Ts||i?.(e,t)===!1)return;let o=n.moved>Os;n.moved=0,o?t.preventDefault():(a||!(t.target instanceof HTMLInputElement)||t.target.type===`range`)&&r(t)},{signal:t})}var As=(e,t,n)=>({read:e=>ws(t(e)),write:(e,n)=>Es(t(e),n),reach(r){let i=t(r),[a,o]=Cs(i),s=n?$(n,r):!1;return{min:a,max:o,step:e.detents?Ss(i)?1:qo(i):0,wrap:s}},scale(e){let[n,r]=Cs(t(e));return r-n}}),js=(e,t,n)=>{let r=$(xs(t).count??0,e);if(!r||Ss(n))return;let[i,a]=Po(n);n.step=String((a-i)/Math.max(r-1,1))},Ms=Math.PI/180,Ns=.45,Ps=18,Fs=36;function Is(e={}){let t=e.name??`turn`,n=e.keys??{ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1},r=as(e,`turn`,{rolled:!!e.rolled}),i=t=>e.stops?.at?$(e.stops.at,t):null,a=e=>{let t=i(e);return[t[0]*Ms,t[1]*Ms]},o=e=>{let[t,n]=a(e);return n-t},s=t=>e.at?$(e.at,t):[t.w/2,t.h/2],c=t=>{if(e.ticks)return $(e.ticks,t)*Ms;if(!e.detents)return 0;if(!e.input)return $(xs(e).every??0,t)*Ms;let n=No(t),[r,i]=Cs(n);return(Ss(n)?1:qo(n))/(i-r)*o(t)},l=e=>+(e.el.getAttribute(t)??0),u={read:l,write(n,r){let i=l(n),a=c(n);r!==i&&(n.el.setAttribute(t,String(r)),a&&n.el.dispatchEvent(new CustomEvent(e.event??`detent`,{bubbles:!0,detail:Math.round((r-i)/a)})))},reach(e){let t=i(e);return{min:t?t[0]*Ms:-1/0,max:t?t[1]*Ms:1/0,step:c(e)}},scale:()=>1},d=e.track??(e.input?As(e,No,e.wrap):u),f=e=>Math.min(e.w,e.h)/2,p=t=>e.travel?$(e.travel,t):e.input?o(t)*Fs:0,m=t=>e.track?.radians(t)??(e.input?d.scale(t)/o(t):1),h=t=>e.input?d.scale(t)/p(t):1/Math.max(f(t),Fs),g=new WeakMap;return{motion:r,springs:{[t]:cs(r,e)},live:[t,`style`],update(n){let r=n.springs[t];if(r.notches(c(n)),e.track)return;if(!e.input)return r.set(l(n)+(n.data.pull??0));let[i]=a(n),s=o(n),u=i+s*Ds(n,No(n));r.set(e.wrap&&$(e.wrap,n)?u+Math.round((r.target-u)/s)*s:u)},connect(i){let a=new AbortController,{signal:o}=a;e.input&&js(i,e,No(i)),!e.input&&!e.track&&(i.el.style.cursor=`grab`);let c=bs(i,o,{motion:r,track:d,spring:t,accepts:e.accepts,hold:e.hold&&((t,n)=>e.hold(t,n/m(t))),letGo:e.letGo,grab(t,n){let r=t.el.getBoundingClientRect(),i=r.width/t.w||1,[a,o]=s(t),c=r.left+a*i,l=r.top+o*i,u=Math.max(Ns*Math.min(r.width,r.height)/2,Ps),d=!!e.rolled||!e.hubless&&Math.hypot(n.clientX-c,n.clientY-l)<u;g.set(t,{k:i,x:c,y:l,arm:Math.max(u,Fs),straight:d,last:[n.clientX,n.clientY]}),!e.input&&!e.track&&(t.el.style.cursor=`grabbing`)},by(t,n,r,i){let a=g.get(t),[o,s]=a.last;return a.last=[n.clientX,n.clientY],a.straight?(e.rolled===`x`?r:(e.rolled?0:r)-i)/a.k*h(t):Wo(o-a.x,s-a.y,n.clientX-a.x,n.clientY-a.y,a.arm)*m(t)},past(t){let n=g.get(t);return e.past===void 0?n?.straight?ps*h(t):Math.PI*m(t):$(e.past,t)},radians:e=>1/m(e),scroll:e.track&&!e.input?void 0:h});if(!e.input&&!e.track){let e=()=>i.el.style.cursor=`grab`;for(let t of[`pointerup`,`pointercancel`])i.el.addEventListener(t,e,{signal:o})}let l=t=>{let n=d.reach(i),r=d.read(i)+t*(n.step||.1),a=n.wrap?r:Q(r,n.min,n.max);d.write(i,e.input&&Ss(No(i))?1-d.read(i):a)};return r.ratchet&&i.el.addEventListener(`keydown`,e=>{let t=n[e.key];t&&t*r.ratchet<0&&(e.preventDefault(),e.stopImmediatePropagation())},{signal:o,capture:!0}),!e.input&&!e.track&&i.el.addEventListener(`keydown`,e=>{let t=n[e.key];t&&(e.preventDefault(),l(t))},{signal:o}),e.click&&ks(i,o,c,()=>l(1),e.accepts),e.tap&&ks(i,o,c,t=>e.tap(i,t),e.accepts),()=>a.abort()},angle(n){let a=n.springs[t].value,o=i(n);if(!o)return a;let s=o[0]*Ms,c=o[1]*Ms,l=us[r.landing]*(c-s);return e.input?a:Q(a,s-l,c+l)},carried(n){if(e.rolled)return rs;let r=n.data[ys(t)],[i,c]=e.input?Cs(No(n)):[0,1],l=e.track?(r??e.track.read(n))/e.track.radians(n):r===void 0?this.angle(n):e.input?a(n)[0]+o(n)*(r-i)/(c-i):r;return{...rs,rotate:l,pin:s(n)}},pin:s,place(e){let[t,n]=s(e);return{at:[e.x+t,e.y+n],rotate:this.angle(e)}}}}function Ls(e={}){let{name:t=`press`}=e,n=as({return:Qo,...e},`press`,{latch:e.latch}),r=cs(n,e),i=e.held??(e=>No(e).checked),a=new WeakSet,o=t=>e.rests&&a.has(t)?e.rests:0,s=(n,r,i)=>{if(e.rocks){let[t,a,o=0]=e.rocks[i]??[0,0];n.springs.x.set(r?t:0),n.springs.y.set(r?a:0),n.springs.z?.set(r?o:0)}else n.springs[t].set(r?1:o(n));(r?e.down:e.up)?.(n)};return{motion:n,springs:e.rocks?{x:{...r,through:!0,contact:`press`},y:{...r,through:!0,contact:`press`},...e.rocks.some(e=>e.length>2)&&{z:{...r,contact:`press`}}}:{[t]:r},update(n){e.latch&&n.springs[t].set(i(n)?1:o(n))},connect(n){let r=new AbortController,{signal:c}=r;if(e.rests){let e=(e,r)=>{e.pointerType!==`mouse`||n.el.disabled||n.el.querySelector(`input`)?.disabled||(r?a.add(n):a.delete(n),n.springs[t].target<1&&n.springs[t].set(o(n)))};n.el.addEventListener(`pointerenter`,t=>e(t,!0),{signal:c}),n.el.addEventListener(`pointerleave`,t=>e(t,!1),{signal:c})}return e.latch&&No(n)||(e.of?[...n.el.querySelectorAll(e.of)]:[n.el]).forEach((t,r)=>{let a=()=>{!t.disabled&&!t.querySelector(`input`)?.disabled&&s(n,!0,r)},o=()=>s(n,!!e.latch&&i(n),r);t.addEventListener(`pointerdown`,e=>{e.button||a()},{signal:c});for(let e of[`pointerup`,`pointercancel`,`pointerleave`,`blur`,`keyup`])t.addEventListener(e,o,{signal:c});t.addEventListener(`keydown`,e=>{(e.key===` `||e.key===`Enter`)&&a()},{signal:c})}),()=>r.abort()},value:e=>Q(e.springs[t].value,0,1)}}function Rs(...e){return{motion:e[0].motion,springs:Object.assign({},...e.map(e=>e.springs)),update(t){for(let n of e)n.update?.(t)},connect(t){let n=e.map(e=>e.connect?.(t));return()=>n.forEach(e=>e?.())},carried:t=>e.reduce((e,n)=>{let r=n.carried?.(t)??rs;return{x:e.x+r.x,y:e.y+r.y,rotate:e.rotate+r.rotate,pin:r.pin[0]||r.pin[1]?r.pin:e.pin}},rs)}}function zs(e){let t=as(e,e.joint,{seats:!!e.touch||e.seat!==void 0}),{name:n}=e,[r,i]=e.range,a=`pull:${n}`,o=t=>t.el.querySelectorAll(`input`)[e.input??0],s=e.track??As(e,o),c=t=>(e.axis?$(e.axis,t):`x`)===`x`,l=t=>s.scale(t)/($(e.travel,t)*4),u=e=>{let{min:t,max:n}=s.reach(e);return[t,n-t]},d=new WeakMap;return{motion:t,springs:{[n]:cs(t,e)},update(e){let t=e.springs[n],[o,c]=u(e),{step:l}=s.reach(e);t.notches(l&&c/l>1.5?l/c*(i-r):0),t.set(r+(i-r)*((s.read(e)-o)/c+(e.data[a]??0)))},carried(t){let a=t.data[ys(n)],[o,s]=u(t),l=a===void 0?Q((t.springs[n].value-r)/(i-r),0,1):(a-o)/s;if(e.pin)return{...rs,rotate:l*$(e.pin.sweep,t),pin:$(e.pin.at,t)};if(e.joint===`hinge`)return rs;let d=$(e.travel,t)*4*l;return{...rs,x:c(t)?d:0,y:c(t)?0:d}},connect(r){let i=new AbortController,{signal:f}=i;e.input!==void 0&&js(r,e,o(r)),e.dress?.(r,f);let p=t=>{let n=r.el.getBoundingClientRect(),[i,a]=u(r),o=Q(c(r)?(t.clientX-n.left)/n.width:(t.clientY-n.top)/n.height,0,1);return i+($(e.travel,r)<0?1-o:o)*a},m=()=>{let[t,n]=u(r);return t+(e.home??0)*n},h=bs(r,f,{motion:t,track:s,spring:n,pull:a,accepts:e.accepts,focus:e=>e.el.querySelector(`button`)??e.el,grab(t,n){let r=t.el.getBoundingClientRect(),i=r.width/t.w||1,[a,o]=e.pin?$(e.pin.at,t):[0,0];d.set(t,{k:i,x:r.left+a*i,y:r.top+o*i,last:[n.clientX,n.clientY]})},by(t,n,r,i){let a=d.get(t),[o,u]=a.last;return a.last=[n.clientX,n.clientY],e.pin?Wo(o-a.x,u-a.y,n.clientX-a.x,n.clientY-a.y,Fs)/$(e.pin.sweep,t)*s.scale(t):(c(t)?r:i)/a.k*l(t)},seat:e.touch?(e,t)=>p(t):e.seat===void 0?void 0:t=>{let[n,r]=u(t);return n+e.seat*r},past:t=>e.touch?1/0:ps*Math.abs(l(t)),radians:e=>1/(Math.abs(l(e))*Fs),scroll:e.return||e.touch||e.noWheel?void 0:e=>Math.abs(l(e)),rest:e.return?m:void 0});return e.return&&e.input!==void 0&&o(r).addEventListener(`keyup`,()=>s.write(r,m()),{signal:f}),e.click&&ks(r,f,h,t=>{let[n,i]=u(r);e.input===void 0||Ss(o(r))?s.write(r,s.read(r)<n+i/2?n+i:n):s.write(r,p(t))},e.accepts),e.jump&&$(e.jump,r)&&ks(r,f,h,e=>s.write(r,p(e)),e.accepts,!0),()=>i.abort()}}}var Bs=e=>e.el.querySelector(`button`),Vs=(e,t)=>{let n=Bs(e);n&&(e.el.style.pointerEvents=`none`,n.style.cssText=`position:absolute;inset:0;appearance:none;background:none;border:0;padding:0;outline:none;pointer-events:auto;${t}`)};function Hs(e){let{axis:t=`x`,name:n=`slide`}=e,r=e.input!==void 0,i=new WeakMap,a=e=>+(e.el.getAttribute(`slide`)??0),o={read:a,write(e,t){e.el.setAttribute(`slide`,String(t)),Bs(e)?.setAttribute(`aria-valuenow`,String(t))},reach(t){let n=$(xs(e).count??0,t),r=$(xs(e).every??0,t);return{min:0,max:1,step:e.detents?n>1?1/(n-1):r/Math.abs($(e.travel,t)):0}},scale:()=>1};return{...zs({...e,joint:`slide`,name:n,axis:t,range:[0,1],click:e.click??!r,...!r&&{track:o,dress(e,t){let n=Bs(e);n&&(Vs(e,`cursor:grab`),n.setAttribute(`role`,`slider`),n.setAttribute(`aria-valuemin`,`0`),n.setAttribute(`aria-valuemax`,`1`),n.setAttribute(`aria-valuenow`,e.el.getAttribute(`slide`)??`0`),n.addEventListener(`keydown`,t=>{let n={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[t.key];n&&(t.preventDefault(),o.write(e,Q(a(e)+n*(o.reach(e).step||.1),0,1)))},{signal:t}))}}}),...!r&&{live:[`slide`,`style`,`aria-valuenow`]},value:e=>Q(e.springs[n].value,0,1),place(r){let a=$(e.travel,r)*4*Q(r.springs[n].value,0,1),o=t===`x`?a:0,s=t===`y`?a:0;if(i.get(r)!==a){i.set(r,a);let e=Bs(r);e&&(e.style.transform=`translate(${o}px, ${s}px)`)}return{at:[r.x+o,r.y+s]}}}}function Us(e={}){let t=t=>$(e.stops?.at??[0,90],t).map(e=>e*Ms),n=t=>e.at?$(e.at,t):[0,0],r=new WeakMap,i={read:e=>+e.el.hasAttribute(`open`),write(e,t){let n=e.el.toggleAttribute(`open`,t>=.5);Bs(e)?.setAttribute(`aria-pressed`,String(n))},reach:()=>({min:0,max:1,step:1}),scale:()=>1};return{...zs({detents:!0,contact:`toggle`,travel:10,...e,joint:`hinge`,name:`hinge`,range:[-1,1],input:e.input?0:void 0,click:!0,noWheel:!0,...e.at&&{pin:{at:e.at,sweep:e=>{let[n,r]=t(e);return r-n}}},...!e.input&&{track:i,dress(e){Vs(e,`cursor:pointer`),Bs(e)?.setAttribute(`aria-pressed`,String(e.el.hasAttribute(`open`)))}}}),...!e.input&&{live:[`open`,`style`,`aria-pressed`]},value:e=>Q((e.springs.hinge.value+1)/2,0,1),place(e){let[i,a]=t(e),o=i+(a-i)*Q((e.springs.hinge.value+1)/2,0,1),[s,c]=n(e);if(r.get(e)!==o){r.set(e,o);let t=Bs(e)?.style;t&&(t.transformOrigin=`${s}px ${c}px`,t.transform=`rotate(${o-i}rad)`)}return{at:[e.x+s,e.y+c],rotate:o}}}}function Ws(e,t){let n=new AbortController,{signal:r}=n,i=t.axis??`y`,a=Math.sign(t.run),o=Math.abs(t.run),s=t.near??10,c=e.map(e=>{let[t=0,n=0]=(e.getAttribute(`at`)??``).split(` `).map(Number);return{el:e,x:t,y:n,vx:0,vy:0,grip:-1,from:[0,0,0,0],home:!1,drawn:null}}),l=0,u=0,d=e=>a*(i===`y`?e.y:e.x),f=e=>i===`y`?e.x:e.y,p=e=>(e.el.parentElement.getBoundingClientRect().width/e.el.parentElement.offsetWidth||1)*4,m=e=>{let{el:n}=e,r=n.parentElement,i=document.createElement(`d-surface`),a=n.offsetLeft,o=n.offsetTop;for(let e=t.seat;e&&e!==r;e=e.offsetParent)a-=e.offsetLeft,o-=e.offsetTop;for(let e of[`material`,`radius`,`height`,`bevel`])n.hasAttribute(e)&&i.setAttribute(e,n.getAttribute(e));return i.style.cssText=`position:absolute;left:${a}px;top:${o}px;width:${n.offsetWidth}px;height:${n.offsetHeight}px`,i.append(...[...n.children].filter(e=>e.localName!==`canvas`).map(e=>e.cloneNode(!0))),t.seat.append(i),i},h=e=>{let t=!!(e.x||e.y),n=e.el.hasAttribute(`seated`)&&!t;e.el.toggleAttribute(`moving`,t),n&&!e.drawn&&(e.drawn=m(e)),!n&&e.drawn&&(e.drawn.remove(),e.drawn=null)},g=e=>{e.el.style.translate=e.x||e.y?`${(e.x*4).toFixed(2)}px ${(e.y*4).toFixed(2)}px`:``,h(e)},_=(e,t)=>{e.el.hasAttribute(`seated`)!==t&&(e.el.toggleAttribute(`seated`,t),h(e),e.el.dispatchEvent(new CustomEvent(`plug`,{bubbles:!0,detail:{seated:t}})))},v=e=>{if(e.el.hasAttribute(`seated`))return;let t=e.el.getBoundingClientRect(),n=p(e),r=e.el.parentElement.getBoundingClientRect();if(t.right>r.left&&t.left<r.right&&t.bottom>r.top&&t.top<r.bottom){let i=t.right-r.left+8,a=r.right-t.left+8;e.x+=(t.left-i>=8&&(i<a||t.right+a>innerWidth-8)?-i:a)/n,g(e),t=e.el.getBoundingClientRect()}e.x-=(Math.max(t.right-innerWidth+8,0)+Math.min(t.left-8,0))/n,e.y-=(Math.max(t.bottom-innerHeight+8,0)+Math.min(t.top-8,0))/n,g(e)},y=e=>{l=0;let t=Math.min((e-u)/1e3||1/60,1/30);u=e;for(let e of c)e.home&&(e.vx+=(-qs*e.x-Js*e.vx)*t,e.vy+=(-qs*e.y-Js*e.vy)*t,e.x+=e.vx*t,e.y+=e.vy*t,(Fo()||Math.hypot(e.x,e.y)<.05)&&(e.x=e.y=e.vx=e.vy=0,e.home=!1,_(e,!0)),g(e),l||=requestAnimationFrame(y))};addEventListener(`resize`,()=>c.forEach(v),{signal:r});for(let e of c){let{el:t}=e;g(e),v(e),t.addEventListener(`pointerdown`,n=>{n.button||e.grip>=0||(n.preventDefault(),n.stopPropagation(),Lo(t,n),t.removeAttribute(`at`),e.grip=n.pointerId,e.home=!1,e.from=[n.clientX,n.clientY,e.x,e.y])},{signal:r}),t.addEventListener(`pointermove`,n=>{if(n.pointerId===e.grip){if(e.x=e.from[2]+(n.clientX-e.from[0])/p(e),e.y=e.from[3]+(n.clientY-e.from[1])/p(e),t.hasAttribute(`seated`)){if(d(e)>=o)_(e,!1);else{let t=Math.max(d(e),0)*a;e.x=i===`x`?t:0,e.y=i===`y`?t:0}}g(e)}},{signal:r});for(let n of[`pointerup`,`pointercancel`])t.addEventListener(n,n=>{if(n.pointerId!==e.grip)return;e.grip=-1;let r=!c.some(t=>t!==e&&(t.el.hasAttribute(`seated`)||t.home));t.hasAttribute(`seated`)||r&&Math.abs(f(e))<s&&d(e)>-s&&d(e)<o+s?(e.home=!0,u=performance.now(),l||=requestAnimationFrame(y)):v(e)},{signal:r})}return()=>{n.abort(),cancelAnimationFrame(l);for(let e of c)e.drawn?.remove()}}var Gs=500,Ks=30,qs=180,Js=16,Ys=5,Xs=7;function Zs(e,t){let n=t.reach??40,r=new AbortController,{signal:i}=r,a=[0,0];e.toggleAttribute(`carried`,!0);let o=0,s=0,c=0,l=0,u=-1,d=0,f=0,p=[0,0,0,0],m=0,h=0,g=0,_=()=>e.getBoundingClientRect().width/e.offsetWidth||1,v=()=>{e.style.transform=Fo()||!o&&!s?``:`translate(${(o*4).toFixed(2)}px,${(s*4).toFixed(2)}px) rotate(${(o*.05).toFixed(3)}deg)`},y=e=>{[(o-h)/e,(s-g)/e].forEach((e,n)=>{let r=a[n];Math.abs(e)<Ks||(r&&Math.sign(e)!==Math.sign(r)&&t.jolt(Math.min((Math.abs(e)+Math.abs(r))/Gs,1)),a[n]=e)}),h=o,g=s},b=e=>{d=0;let t=Math.min((e-f)/1e3||1/60,1/30),n=e*.001*Ys*Math.PI*2;if(f=e,m>e){let t=Xs*Math.min((m-e)/1e3*3,1);o=t*Math.sin(n),s=t*.45*Math.sin(n+1)}else u<0&&(c+=(-180*o-Js*c)*t,l+=(-180*s-Js*l)*t,o+=c*t,s+=l*t,Math.hypot(o,s)<.02&&Math.hypot(c,l)<.2&&(o=s=c=l=0));y(t),v(),(u>=0||m>e||o||s)&&(d=requestAnimationFrame(b))},x=()=>{d||=(f=performance.now(),requestAnimationFrame(b))};e.addEventListener(`pointerdown`,t=>{t.target!==e||t.button||u>=0||(t.preventDefault(),e.focus({preventScroll:!0}),Lo(e,t),u=t.pointerId,p=[t.clientX,t.clientY,o,s],c=l=0,x())},{signal:i}),e.addEventListener(`pointermove`,e=>{if(e.pointerId!==u)return;let t=_()*4,r=e=>n*Math.tanh(e/n);o=r(p[2]+(e.clientX-p[0])/t),s=r(p[3]+(e.clientY-p[1])/t)},{signal:i});for(let t of[`pointerup`,`pointercancel`])e.addEventListener(t,e=>{e.pointerId===u&&(u=-1)},{signal:i});return{shake(e=1200){m=performance.now()+e,x()},stop(){r.abort(),cancelAnimationFrame(d),e.removeAttribute(`carried`),e.style.transform=``}}}var Qs=1.65,$s=.7,ec=10,tc=1;function nc(e,t,n=0){let r=e*Math.PI/180,i=t*Math.PI/180,a=n*Math.PI/180,o=-Math.cos(r)*Math.sin(i),s=Math.sin(r);return[o*Math.cos(a)-s*Math.sin(a),o*Math.sin(a)+s*Math.cos(a)]}function rc({look:e=6,onState:t}={}){let n=fo(),r=`waiting`,i=null,a=0,o=0,s=0,c=0,l=e=>{e!==r&&(r=e,t?.(r))},u=()=>globalThis.orientation??screen.orientation?.angle??0,d=()=>{i=null},f=t=>{if(t.beta===null||t.gamma===null||matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;r!==`on`&&(c=n.look,n.lampHeld=!0,bo({look:e}),l(`on`));let[d,f]=nc(t.beta,t.gamma,u()),p=performance.now(),m=Math.min((p-a)/1e3,.2)/ec;a=p,i??=[d,f],i[0]+=(d-i[0])*m,i[1]+=(f-i[1])*m;let h=Math.sqrt(innerWidth*innerHeight)/2*Qs,g=e=>Math.max(-.7,Math.min($s,e)),_=innerWidth/2+g(d-i[0])*h,v=innerHeight/2-g(f-i[1])*h;Math.hypot(_-o,v-s)<tc||(o=_,s=v,n.aim(_,v))};addEventListener(`deviceorientation`,f),addEventListener(`orientationchange`,d),screen.orientation?.addEventListener(`change`,d);let p=globalThis.DeviceOrientationEvent,m=e=>r===`on`||(l(e===`granted`?`waiting`:`denied`),e===`granted`);return p?.requestPermission&&(l(`ask`),p.requestPermission().then(m,()=>{})),{get state(){return r},ask:()=>p?.requestPermission?.().then(m,()=>!1)??Promise.resolve(!0),stop(){removeEventListener(`deviceorientation`,f),removeEventListener(`orientationchange`,d),screen.orientation?.removeEventListener(`change`,d),r===`on`&&(bo({look:c}),n.letGo()),l(`waiting`)}}}var ic=200;function ac(e,t={}){e.style.transformOrigin=`0 0`;let n=0,r={scale:1,x:0,y:0,set(i,a,o){i===r.scale&&a===r.x&&o===r.y&&e.style.scale||(r.scale=i,r.x=a,r.y=o,e.style.willChange=`translate, scale`,clearTimeout(n),n=window.setTimeout(()=>e.style.willChange=``,ic),e.style.translate=`${-a}px ${-o}px`,e.style.scale=String(i),Gr(e,i,t.stage??!0))}};return r}var oc=null,sc=``;function cc(){let e=document.body,t=e.getAttribute(`camera`)?.trim().split(/[\s,]+/).map(Number),[n,r,i,a]=t??[];if(!t||t.length!==4||t.some(e=>!Number.isFinite(e))||!(i>0)||!(a>0)){if(!oc)return;oc.set(1,0,0),Object.assign(e.style,{translate:``,scale:``,willChange:``,transformOrigin:``}),document.documentElement.style.overflow=sc,oc=null;return}oc||=(sc=document.documentElement.style.overflow,document.documentElement.style.overflow=`hidden`,ac(e,{stage:!1}));let o=e.getBoundingClientRect(),s=o.left+oc.x,c=o.top+oc.y,l=Math.min(innerWidth/i,innerHeight/a);oc.set(l,s+(n+i/2-s)*l-innerWidth/2,c+(r+a/2-c)*l-innerHeight/2)}function lc(){new MutationObserver(cc).observe(document.body,{attributes:!0,attributeFilter:[`camera`]}),addEventListener(`resize`,()=>oc&&cc()),cc()}typeof document<`u`&&(document.body?lc():document.addEventListener(`DOMContentLoaded`,lc,{once:!0}));var uc=[`pointerdown`,`keydown`,`touchend`,`click`],dc=.015,fc=null,pc=null,mc=!1,hc=new Map,gc=new Set,_c=()=>{fc?.state===`suspended`&&(navigator.userActivation?.isActive??!0)&&fc.resume()};function vc(){if(!fc){fc=new AudioContext({latencyHint:`interactive`}),pc=fc.createGain(),pc.gain.value=+!mc,pc.connect(fc.destination);for(let e of uc)window.addEventListener(e,_c,!0)}return _c(),fc}function yc(){return vc(),pc}function bc(){return mc}function xc(e){if(e!==mc){mc=e,fc&&pc&&pc.gain.setTargetAtTime(+!e,fc.currentTime,dc),_c();for(let t of gc)t(e)}}function Sc(e){return gc.add(e),()=>gc.delete(e)}function Cc(e,t){let n=hc.get(e);if(!n){let r=URL.createObjectURL(new Blob([t],{type:`text/javascript`}));n=vc().audioWorklet.addModule(r).finally(()=>URL.revokeObjectURL(r)),hc.set(e,n)}return n}var wc=`modulepreload`,Tc=function(e,t){return new URL(e,t).href},Ec={},Dc=function(e){return e.pathname.endsWith(`.css`)},Oc=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},kc=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Tc(t,n);let r=s(t),i=Dc(r);return Oc(Ec,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:wc,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};export{Ee as $,xo as A,zn as B,No as C,S as Ct,Ho as D,F as Dt,Fo as E,j as Et,mi as F,Sn as G,Mn as H,yi as I,be as J,zt as K,gi as L,fo as M,go as N,qo as O,s as Ot,yo as P,at as Q,bi as R,Ro as S,T as St,Vo as T,g as Tt,xn as U,jn as V,Cn as W,We as X,xe as Y,Je as Z,Hs as _,h as _t,Sc as a,ee as at,Is as b,x as bt,ac as c,f as ct,Zs as d,w as dt,ke as et,Us as f,p as ft,Ls as g,v as gt,Ws as h,N as ht,xc as i,he as it,bo as j,zo as k,o as kt,rc as l,u as lt,ss as m,m as mt,vc as n,Oe as nt,yc as o,ae as ot,as as p,P as pt,Bt as q,bc as r,me as rt,Cc as s,d as st,kc as t,fe as tt,ls as u,y as ut,os as v,_ as vt,Po as w,I as wt,Lo as x,l as xt,Rs as y,C as yt,ii as z};