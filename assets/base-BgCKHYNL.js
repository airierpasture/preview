import{_ as e,a as t,b as n,c as r,d as i,f as a,g as o,h as s,m as c,o as l,p as u,s as d,t as f,u as p,v as m,x as h,y as g}from"./registry-Cb8fpsxR.js";var _=.25;function v(e){let t=e.to[0]-e.from[0],n=e.to[1]-e.from[1],r=Math.hypot(t,n)||1,i=[t/r,n/r],a=e.drop??r*_,o=e.from[0]*i[0]+e.from[1]*i[1],s=e.mirror?e.mirror[0]*i[0]+e.mirror[1]*i[1]:o;return{dir:i,at:s,flat:o-s,reach:r,drop:a,k:e.past?-1:e.rigid?0:(a/_/r)**1.5,both:!!e.mirror}}var y=(e,t)=>e+t.k*(t.reach*Math.asin(Math.min(e/t.reach,1))-e);function b(e,t,n){let r=e*n.dir[0]+t*n.dir[1]-n.at,i=n.both&&r<0?-1:1,a=r*i-n.flat;if(a<=0||n.k<0)return[e,t];let o=0,s=n.reach;for(let e=0;e<16;e++){let e=(o+s)/2;y(e,n)<a?o=e:s=e}let c=(s-a)*i;return[e+n.dir[0]*c,t+n.dir[1]*c]}function x(e,t){return[[e.x,e.y],[e.x+e.w,e.y],[e.x,e.y+e.h],[e.x+e.w,e.y+e.h]].every(([e,n])=>{let r=e*t.dir[0]+n*t.dir[1]-t.at;return(t.both&&r<0?-r:r)<=t.flat})}function S(e,t){if(t.k<0)return e;let n=[[e.x,e.y],[e.x+e.w,e.y],[e.x,e.y+e.h],[e.x+e.w,e.y+e.h]].map(([e,n])=>b(e,n,t)),r=Math.min(...n.map(e=>e[0]))-2,i=Math.min(...n.map(e=>e[1]))-2,a=Math.max(...n.map(e=>e[0]))+2,o=Math.max(...n.map(e=>e[1]))+2;return{x:r,y:i,w:a-r,h:o-i}}var C={sine:0,vee:1,scoop:2};function w(e,t,n,r,i={}){return{type:`rect`,cx:e+n/2,cy:t+r/2,hw:n/2,hh:r/2,radius:Math.max(Math.min(i.radius??0,n/2,r/2),0),rotate:i.rotate??0,ripple:[0,0,0]}}function T(e,t,n,r={}){let[i,a,o]=r.scoop?[...r.scoop,C.scoop]:r.vee?[...r.vee,C.vee]:[...r.ripple??[0,0],C.sine];return{type:`rect`,cx:e,cy:t,hw:n,hh:n,radius:n,rotate:0,ripple:[i,a,o]}}function E(e,t,n,r,i,a){let o=n+a/2;return{type:`arc`,cx:e,cy:t,hw:o,hh:o,rotate:0,r:n,width:a,mid:(r+i)/2,half:Math.abs(i-r)/2}}function D(e,t,n,r,i,a){return{type:`capsule`,ax:e,ay:t,bx:n,by:r,ra:i,rb:a}}function O(e,t,n,r,i={}){return{type:`holes`,cx:e+n/2,cy:t+r/2,hw:n/2,hh:r/2,radius:i.radius??4,pitch:i.pitch??8,hole:i.hole??2.4,square:i.square??!1}}var k=e=>({type:`mask`,box:e});function A(e,t,n,r,i,a={}){let[o,s,c,l]=a.viewBox??[0,0,100,100];return{type:`field`,cx:t+r/2,cy:n+i/2,hw:r/2,hh:i/2,rotate:a.rotate??0,spread:a.spread??16,key:`p|${e}|${o},${s},${c},${l}|${Math.round(r)}x${Math.round(i)}|${a.rule??``}`,draw(t,n,r){t.scale(n/c,r/l),t.translate(-o,-s),t.fill(new Path2D(e),a.rule)}}}function j(e,t,n,r,i,a){return{type:`field`,cx:t+r/2,cy:n+i/2,hw:r/2,hh:i/2,rotate:a.rotate??0,spread:a.spread??8,key:`t|${e}|${a.font}|${a.letterSpacing??``}|${a.wordSpacing??``}|${a.align??``}|${Math.round(r)}x${Math.round(i)}`,draw(t,n,r){t.font=a.font,t.letterSpacing=a.letterSpacing||`0px`,t.wordSpacing=a.wordSpacing||`0px`,t.textBaseline=`middle`,t.textAlign=a.align??`center`,t.fillText(e,a.align===`left`?0:a.align===`right`?n:n/2,r/2)}}}function ee(e,t,n,r,i,a={}){return{type:`field`,cx:t+r/2,cy:n+i/2,hw:r/2,hh:i/2,rotate:0,spread:a.spread??4,key:`i|${e.currentSrc||e.src}|${Math.round(r)}x${Math.round(i)}`,draw(t,n,r){let i=new OffscreenCanvas(Math.ceil(n),Math.ceil(r)),a=i.getContext(`2d`);a.drawImage(e,0,0,n,r),a.globalCompositeOperation=`source-in`,a.fillStyle=t.fillStyle,a.fillRect(0,0,n,r),t.drawImage(i,0,0)}}}function M(e,t,n,r,i,a={}){let[o,s,c,l]=i,u=(e,t,n)=>e?`A${e} ${e} 0 0 1 ${t} ${n}`:`L${t} ${n}`;return A(`M${o} 0H${n-s}${u(s,n,s)}V${r-c}${u(c,n-c,r)}H${l}${u(l,0,r-l)}V${o}${u(o,o,0)}Z`,e,t,n,r,{viewBox:[0,0,n,r],...a})}function N(e,t,n,r,i={}){return A(`M0 ${r}A${n} ${r} 0 1 1 ${2*n} ${r}A${n} ${r} 0 1 1 0 ${r}Z`,e-n,t-r,2*n,2*r,{viewBox:[0,0,2*n,2*r],spread:Math.max(n,r),...i})}var P=e=>+e.toFixed(3);function F(e){let t=e.length,n=``;for(let r=0;r<t;r++){let[i,a,o=0]=e[r],[s,c]=e[(r+t-1)%t],[l,u]=e[(r+1)%t],d=s-i,f=c-a,p=l-i,m=u-a,h=Math.hypot(d,f),g=Math.hypot(p,m),_=Math.acos(Math.max(-1,Math.min(1,(d*p+f*m)/(h*g))))/2,v=Math.min(o/Math.tan(_),h/2,g/2),y=v*Math.tan(_),b=`${P(i+d/h*v)} ${P(a+f/h*v)}`,x=`${P(i+p/g*v)} ${P(a+m/g*v)}`;n+=`${r?`L`:`M`}${b}`,y>0&&(n+=`A${P(y)} ${P(y)} 0 0 ${+(d*m-f*p<0)} ${x}`)}return`${n}Z`}function I(e){let t=e.length,n=n=>e[(n+t)%t],r=`M${P(n(0)[0])} ${P(n(0)[1])}`;for(let e=0;e<t;e++){let[t,i]=n(e-1),[a,o]=n(e),[s,c]=n(e+1),[l,u]=n(e+2);r+=`C${P(a+(s-t)/6)} ${P(o+(c-i)/6)} ${P(s-(l-a)/6)} ${P(c-(u-o)/6)} ${P(s)} ${P(c)}`}return`${r}Z`}function te(e,t={}){let n=e.map(e=>e[0]),r=e.map(e=>e[1]),i=Math.min(...n),a=Math.min(...r),o=Math.max(...n)-i,s=Math.max(...r)-a;return A(F(e),i,a,o,s,{viewBox:[i,a,o,s],...t})}function L(e,t){switch(e.type){case`rect`:return{...e,hw:Math.max(e.hw+t,0),hh:Math.max(e.hh+t,0),radius:Math.max(e.radius+t,0)};case`capsule`:return{...e,ra:e.ra+t,rb:e.rb+t};case`arc`:return{...e,hw:e.hw+t,hh:e.hh+t,width:e.width+t*2};case`field`:return{...e,grow:(e.grow??0)+t,spread:Math.max(e.spread,Math.abs((e.grow??0)+t)+8)}}}function R(e,t){return e.type===`field`?{...e,ring:t,spread:Math.max(e.spread,t+Math.abs(e.grow??0)+8)}:{...e,ring:t}}function z(e,t){if(t.grow||t.ring)throw Error(`Combine shapes first, then grow or ring the result.`);if(e.save(),t.type===`capsule`){let n=Math.atan2(t.by-t.ay,t.bx-t.ax);e.beginPath(),e.arc(t.ax,t.ay,t.ra,n+Math.PI/2,n-Math.PI/2),e.arc(t.bx,t.by,t.rb,n-Math.PI/2,n+Math.PI/2),e.fill()}else if(e.translate(t.cx,t.cy),e.rotate(t.rotate),t.type===`rect`)e.beginPath(),e.roundRect(-t.hw,-t.hh,t.hw*2,t.hh*2,t.radius),e.fill();else if(t.type===`arc`)e.strokeStyle=e.fillStyle,e.lineWidth=t.width,e.lineCap=`round`,e.beginPath(),e.arc(0,0,t.r,t.mid-t.half-Math.PI/2,t.mid+t.half-Math.PI/2),e.stroke();else{let{hw:n,hh:r}=t.source??t;e.scale(t.hw/n,t.hh/r),e.translate(-n,-r),t.draw(e,n*2,r*2)}e.restore()}var ne=e=>ge(e.type===`field`?{...e,spread:0}:e,0),re=(e,t,n)=>{let{type:r,draw:i,cx:a,cy:o,ax:s,ay:c,bx:l,by:u,...d}=e,f=(e,t)=>(e-t).toFixed(2);return`${e.type===`capsule`?[f(s,t),f(c,n),f(l,t),f(u,n)]:[f(a,t),f(o,n)]}${JSON.stringify(d)}`};function B(e,t,n,r){let{x:i,y:a,w:o,h:s}=t;return{type:`field`,cx:i+o/2,cy:a+s/2,hw:o/2,hh:s/2,rotate:0,spread:16,key:`${e}|${Math.round(o)}x${Math.round(s)}|${n.map(e=>re(e,i,a)).join(`|`)}`,draw(e){e.translate(-i,-a),r(e)}}}function ie(e){let t=e.map(ne),n=Math.min(...t.map(e=>e.x)),r=Math.min(...t.map(e=>e.y));return{x:n,y:r,w:Math.max(...t.map(e=>e.x+e.w))-n,h:Math.max(...t.map(e=>e.y+e.h))-r}}function ae(...e){return B(`union`,ie(e),e,t=>e.forEach(e=>z(t,e)))}var oe=[],se=0;function ce(e,t,n){let r=e.getTransform(),i=[],a=[];for(let[e,n]of[[t.x,t.y],[t.x+t.w,t.y],[t.x,t.y+t.h],[t.x+t.w,t.y+t.h]]){let t=r.transformPoint({x:e,y:n});i.push(t.x),a.push(t.y)}let o=Math.max(Math.floor(Math.min(...i))-1,0),s=Math.max(Math.floor(Math.min(...a))-1,0),c=Math.min(Math.ceil(Math.max(...i))+1,e.canvas.width),l=Math.min(Math.ceil(Math.max(...a))+1,e.canvas.height),u=c-o,d=l-s;if(u<=0||d<=0)return;let f=oe[se]??=typeof OffscreenCanvas==`function`?new OffscreenCanvas(u,d):document.createElement(`canvas`);(f.width<u||f.height<d)&&(f.width=Math.max(f.width,u),f.height=Math.max(f.height,d));let p=f.getContext(`2d`);p.save(),p.setTransform(1,0,0,1,0,0),p.clearRect(0,0,u,d),p.setTransform(r.a,r.b,r.c,r.d,r.e-o,r.f-s),p.fillStyle=e.fillStyle,se++;try{n(p)}finally{se--,p.restore()}e.save(),e.setTransform(1,0,0,1,0,0),e.drawImage(f,0,0,u,d,o,s,u,d),e.restore()}function le(e,...t){let n=ne(e);return B(`minus`,n,[e,...t],r=>ce(r,n,n=>{z(n,e),n.globalCompositeOperation=`destination-out`,t.forEach(e=>z(n,e))}))}function ue(e,t){let n=ne(e);return B(`intersect`,n,[e,t],r=>ce(r,n,n=>{z(n,e),n.globalCompositeOperation=`destination-in`,z(n,t)}))}function de(e,t,n=8){let{cx:r,cy:i,hw:a,hh:o}=e;return{...e,key:`within|${n}|${e.key}|${re(t,r-a,i-o)}`,within:{steep:n,draw:e=>{e.translate(a-r,o-i),z(e,t)}}}}function fe(e){let t=e.length,n=e.slice(1).map((t,n)=>(t[1]-e[n][1])/Math.max(t[0]-e[n][0],1e-6)),r=e.map((e,r)=>{if(r===0)return n[0];if(r===t-1)return n[t-2];let i=n[r-1],a=n[r];return i*a<=0?0:2*i*a/(i+a)});return n=>{let i=0;for(;i<t-2&&n>e[i+1][0];)i++;let[a,o]=e[i],[s,c]=e[i+1],l=Math.max(s-a,1e-6),u=Math.min(Math.max((n-a)/l,0),1),d=u*u,f=d*u;return(2*f-3*d+1)*o+(f-2*d+u)*l*r[i]+(-2*f+3*d)*c+(f-d)*l*r[i+1]}}function pe(e,t,n,r={}){let i=fe(n),a=r.from??n[0][0],o=r.to??n[n.length-1][0],s=o-a,c=0;for(let e=0;e<=200;e++)c=Math.max(c,i(a+s*e/200));let l=r.spread??4,u=new Map;return{type:`field`,cx:e+a+s/2,cy:t,hw:s/2,hh:c,rotate:r.rotate??0,spread:l,bevel:c,radius:c*.25,key:`l|${a},${o}|${n.join(`;`)}`,draw(e){e.beginPath();for(let t=0;t<=200;t++)e.lineTo(s*t/200,c-i(a+s*t/200));for(let t=200;t>=0;t--)e.lineTo(s*t/200,c+i(a+s*t/200));e.fill()},solve(e,t){let n=t-c,r=u.get(e);r===void 0&&u.set(e,r=i(a+e));let o=Math.max(Math.abs(n)-r,-e,e-s);if(o>=0)return o;let l=Math.sqrt(Math.max(r*r-n*n,0))/c,d=1-Math.sqrt(Math.max(1-l*l,0));return Math.max(-d*c,o*c)}}}function me(e,t){let{hw:n,hh:r}=e.source??e;return{...e,hh:r*t,source:{hw:n,hh:r}}}function he(e,t){let{hw:n,hh:r}=e.source??e;return{...e,hw:n*t,source:{hw:n,hh:r}}}function ge(e,t=2){if(t+=e.ring??0,e.type===`mask`)return{x:e.box.x-t,y:e.box.y-t,w:e.box.w+t*2,h:e.box.h+t*2};if(e.type===`capsule`){let n=Math.max(e.ra,e.rb)+t;return{x:Math.min(e.ax,e.bx)-n,y:Math.min(e.ay,e.by)-n,w:Math.abs(e.ax-e.bx)+n*2,h:Math.abs(e.ay-e.by)+n*2}}let n=e.type===`field`?e.spread:0,r=e.hw+n,i=e.hh+n,a=e.type===`holes`?0:e.rotate,o=Math.abs(Math.cos(a)),s=Math.abs(Math.sin(a)),c=o*r+s*i+t,l=s*r+o*i+t;return{x:e.cx-c,y:e.cy-l,w:c*2,h:l*2}}var _e=[7,3.2,.5],ve=new WeakMap;function ye(e,t){ve.set(e,t)}function be(e){for(let t=e.parentElement;t;t=t.parentElement){let e=ve.get(t);if(e)return e}}var xe=new WeakMap;function Se(e,t){xe.set(e,{shape:t.shape,seed:t.seed,wear:t.material.wear,size:t.material.chip})}function Ce(e){return be(e.el)}function we(e){let t=be(e.el);return!!t&&(t.crown[0]!==0||t.crown[1]!==0)}var Te=e=>e===null?{}:{tangent:e*Math.PI/180};function Ee(e){let t=be(e.el);if(!t)return 4;if(t.at)return t.at(e.x+e.w/2,e.y+e.h/2);let n=(e.x+e.w/2-t.x-t.w/2)/(t.w/2),r=(e.y+e.h/2-t.y-t.h/2)/(t.h/2);return t.top-t.crown[0]*n*n-t.crown[1]*r*r}function De(e,t){let{k:n}=t,r=n===1?e:Oe(e,n),i=Math.cos(t.a),a=Math.sin(t.a),o=(e,r)=>t.x+(t.flip?-e:e)*n*i-r*n*a,s=(e,r)=>t.y+(t.flip?-e:e)*n*a+r*n*i,c=e=>t.a+(t.flip?-e:e);switch(r.type){case`capsule`:return{...r,ax:o(r.ax,r.ay),ay:s(r.ax,r.ay),bx:o(r.bx,r.by),by:s(r.bx,r.by)};case`mask`:{if(!t.a)return{...r,box:{...r.box,x:r.box.x+t.x,y:r.box.y+t.y}};let{x:e,y:n,w:o,h:s}=r.box,c=[e,e+o].flatMap(e=>[n,n+s].map(n=>t.x+e*i-n*a)),l=[e,e+o].flatMap(e=>[n,n+s].map(n=>t.y+e*a+n*i));return{...r,box:{x:Math.min(...c),y:Math.min(...l),w:Math.max(...c)-Math.min(...c),h:Math.max(...l)-Math.min(...l)}}}case`holes`:return{...r,cx:o(r.cx,r.cy),cy:s(r.cx,r.cy)};case`rect`:return{...r,cx:o(r.cx,r.cy),cy:s(r.cx,r.cy),rotate:c(r.rotate)};case`arc`:return{...r,cx:o(r.cx,r.cy),cy:s(r.cx,r.cy),rotate:c(r.rotate),mid:t.flip?-r.mid:r.mid};case`field`:{let e={...r,cx:o(r.cx,r.cy),cy:s(r.cx,r.cy),rotate:c(r.rotate)};return t.flip?{...e,key:`${r.key}|flip`,draw(e,t,n){e.translate(t,0),e.scale(-1,1),r.draw(e,t,n)}}:e}}}function Oe(e,t){let n={...e.grow&&{grow:e.grow*t},...e.ring&&{ring:e.ring*t}};switch(e.type){case`mask`:return e;case`capsule`:return{...e,...n,ra:e.ra*t,rb:e.rb*t};case`holes`:return{...e,...n,hw:e.hw*t,hh:e.hh*t,radius:e.radius*t,pitch:e.pitch*t,hole:e.hole*t};case`rect`:return{...e,...n,hw:e.hw*t,hh:e.hh*t,radius:e.radius*t,ripple:[e.ripple[0],e.ripple[1]*t,e.ripple[2]]};case`arc`:return{...e,...n,hw:e.hw*t,hh:e.hh*t,r:e.r*t,width:e.width*t};case`field`:return{...e,...n,hw:e.hw*t,hh:e.hh*t,spread:Math.max(e.spread,(Math.abs(e.grow??0)+(e.ring??0))*t+8),key:`${e.key}|x${t}`,...e.source&&{source:{hw:e.source.hw*t,hh:e.source.hh*t}},draw(n,r,i){n.scale(t,t),e.draw(n,r/t,i/t)}}}}var ke=class{seedBase;age;state;commands=[];count=0;bent;body;frame={x:0,y:0,a:0,flip:!1,k:1};level=4;top=4;seat=4;holder;printedOn;round=0;use=1;mid=0;constructor(e=0,t=0,n={}){this.seedBase=e,this.age=t,this.state=n}part(e,t=4,n=!1,r=t,i=1){this.count=(e+1)*1024,this.use=i,this.bent=n?void 0:this.body,this.mid=n?r:this.round,this.frame={x:0,y:0,a:0,flip:!1,k:1},this.level=this.top=this.seat=t}add(e,t=De(e.shape,this.frame)){return this.commands.push({...e,shape:t,...this.bent&&{bend:this.bent}}),this}px(e,t){return e===void 0?t:e*this.frame.k}resolve(e){return De(e,this.frame)}group(e,t){let{frame:n,level:r,top:i,seat:a}=this,[o,s]=e.at??[0,0],c=Math.cos(n.a),l=Math.sin(n.a),u=(n.flip?-o:o)*n.k,d=s*n.k,f=e.rotate??0;return this.frame={x:n.x+u*c-d*l,y:n.y+u*l+d*c,a:n.a+(n.flip?-f:f),flip:n.flip!==!!e.mirror,k:n.k*(e.scale??1)},this.level=r+(e.z??0),this.top=i+(e.z??0),this.seat=a+(e.z??0),t(),this.frame=n,this.level=r,this.top=i,this.seat=a,this}bend(e){return this.bent=e?v(e):this.body,this}roll(e,t=0){return this.body=this.bent=v(e),this.round=this.mid=t,this}seed(){this.count+=1;let e=this.count+this.seedBase*131;return[e*73.1%997,e*41.7%991]}surface(t,n={},r){let i=e(n.material??`plain`,{age:this.age,...this.state,...n.over}),a=this.use,o=a===1?i:{...i,touch:Math.min(i.touch*a,1),wear:Math.min(i.wear*a,1)},s=De(t,this.frame),c=n.rest??!1,l=!c&&(n.follow??!1),u=c?this.tallest(s):l?n.zEdge??0:n.zEdge===void 0?n.rise===void 0?this.seat-4:this.level:n.zEdge+this.seat,d=n.rise===void 0?l?n.zTop??4:(n.zTop??0)+this.seat:u+n.rise,f=l?this.top:0,p=s.type===`capsule`&&(n.profile??`round`)===`round`?Math.max(s.ra,s.rb)/4:0,m=`rotate`in s?s.rotate:this.frame.a,[h,g]=typeof n.tilt==`number`?[0,n.tilt]:n.tilt??[0,0],[_,v]=n.pivot??[0,0],y=[h/2,g/2],b=d+y[0]*_+y[1]*v,x=b+Math.abs(y[0])+Math.abs(y[1]);if(this.add({op:`surface`,shape:t,name:n.material??`plain`,material:m?{...o,tangent:o.tangent+m,marks:o.marks*Math.max(1-Math.abs(m)*8,0)}:o,zEdge:u,zTop:b,mid:this.mid,follow:l,bridge:this.px(n.bridge,0),rest:c,reach:l?this.tallest(s)+Math.max(u,x,0)+p:x+p,bevel:this.px(n.bevel,2),profile:n.profile??`round`,dish:typeof n.dish==`number`?[n.dish,n.dish]:n.dish??[0,0],crown:typeof n.crown==`number`?[n.crown,n.crown]:n.crown??[0,0],tilt:y,radial:n.radial??!1,seed:this.seed()},s),this.top=f+d,r){let{level:e,top:t,holder:n}=this;this.level=t,this.holder=s,r(),this.level=e,this.top=t,this.holder=n}return this}tallest(e){let t=ge(e,0),n=0;for(let e of this.commands){if(e.op!==`surface`||e.reach<=n)continue;let r=ge(e.shape,0);r.x<t.x+t.w&&r.x+r.w>t.x&&r.y<t.y+t.h&&r.y+r.h>t.y&&(n=e.reach)}return n}cut(e,t={}){return this.add({op:`cut`,shape:e,depth:t.depth??0,ink:t.ink??null,rough:t.rough??.5,metal:t.metal??0,wear:Math.min((t.wear??0)*this.use,1),emit:t.emit??null,soft:this.px(t.soft,.7),feather:this.px(t.feather,0),seed:this.seed(),...t.stop?{on:De(t.stop,this.frame)}:this.holder&&{on:this.holder},...this.printedOn&&{on:this.printedOn.shape,chips:this.printedOn}})}printing(e,t){let n;for(let t=e.parentElement;t&&!n;t=t.parentElement)n=xe.get(t);this.printedOn=n,t(),this.printedOn=void 0}print(e,t,n={}){return this.cut(e,{...n,ink:t})}engrave(e,t=.2,n={}){return this.cut(e,{...n,depth:t})}legend(e,t,n={}){if(!e.label)return this;let{frame:r}=this;return this.frame={x:0,y:0,a:0,flip:!1,k:1},this.cut(k(e.label),{depth:.04,...n,ink:t}),this.frame=r,this}well(e,t,n={},r){let{top:i}=this;return this.surface(e,{material:`well`,bevel:1/this.frame.k,follow:n.zEdge===void 0,...n,rise:-t},r),this.top=i,this}seam(e,t={}){return this.cut(R(e,t.width??.8/this.frame.k),{depth:t.depth??.5,ink:[.008,.008,.009],rough:.8,soft:.5/this.frame.k})}lamp(e,t,n=1,r={}){let i=r.dark??.02,a=r.gain??.6,o=e=>t.map(t=>t*e);return this.cut(e,{ink:o(i),emit:o(i+n*a)})}glass(e,t={}){let n=t.material&&d(t.material).ior||1.52,r=((n-1)/(n+1))**2,[i,a]=t.chamfer??[0,0];return this.add({op:`glass`,shape:e,covers:!!t.covers,height:t.height??1.2,bevel:this.px(t.bevel,8),coat:t.coat??1,curve:t.curve??0,film:t.film??0,rim:t.rim??.5,chamfer:[i,Math.tan(a*Math.PI/180)],reflect:2*r/(1+r),tint:t.tint??[1,1,1]})}frost(e,t={}){return this.add({op:`frost`,shape:e,blur:this.px(t.blur,14),tint:t.tint??[.8,.82,.85],opacity:t.opacity??.25,transmit:t.transmit??1,zoom:t.zoom??1,zEdge:(t.zEdge??0)+this.seat,zTop:(t.zTop??1.5)+this.seat,bevel:this.px(t.bevel,3),rough:t.rough??.42,coat:t.coat??.6})}screen(e,t,n={}){let r=n.kind??`crt`;return this.add({op:`screen`,shape:e,source:t,kind:r,gain:n.gain??3,color:n.color??[.008,.009,.01],ink:r===`crt`?[n.mono?0:.22,n.bulge??.24,0]:n.ink??(r===`tft`?[1,1,1]:[.02,.03,.02]),emit:n.emit??[0,0,0],inset:n.inset??[0,0],zTop:(n.zTop??-.6)+this.seat,rough:n.rough??.2,coat:n.coat??.8,metal:n.metal??0})}glow(e,t,n=1.1){return this.add({op:`glow`,shape:e,color:t,width:n*this.frame.k})}};function Ae(e,t){if(e==null||e===``)return t;let n=/^\s*(-?[\d.]+)\s*(mm|cm)?\s*$/.exec(e);return n?parseFloat(n[1])*(n[2]===`cm`?10:1):t}var je=e=>`${e*4}px`,Me=new WeakMap;function Ne(e){let t=e.getAttribute(`place`);if(t===null){Me.delete(e)&&(e.style.position=e.style.left=e.style.top=e.style.width=e.style.height=``);return}if(Me.get(e)===t)return;Me.set(e,t);let n=t.trim().split(/\s+/),r=n[0]===`corner`,i=(r?n.slice(1):n).map(Number),[a=NaN,o=NaN,s=NaN,c=s]=i;if(i.length<3||i.length>4||i.some(Number.isNaN))return g(`place takes "x y w h" or "corner x y w h" in mm, with h optional. ${h(e)}`);e.style.position=`absolute`,e.style.left=je(r?a:a-s/2),e.style.top=je(r?o:o-c/2),e.style.width=je(s),e.style.height=je(c)}function Pe(e){e.hasAttribute(`place`)&&Ne(e);for(let t of e.querySelectorAll(`[place]`))Ne(t)}var Fe=e=>Ne(e),Ie=Math.PI/180;function Le(e){let[t=0,n=0]=(e.closest(`d-device[angle]`)?.getAttribute(`angle`)??``).trim().split(/\s+/).map(e=>parseFloat(e)||0);return[t,n]}function Re(e){let[t,n]=Le(e);return[Math.cos(t*Ie)||1,Math.cos(n*Ie)||1]}var ze=new Set;function Be(e){return ze.add(e),()=>{ze.delete(e)}}function Ve(e,t,n,r){if(!e||!ze.size||e.el.hasAttribute?.(`quiet`))return;let i=e.el.closest(`d-device, [data-alone]`)?.__d;if(!i)return;let a=r?.motion??e.def?.motion,o={kind:t,part:e,device:i,material:(r?.heard?void 0:He(e))??i.material,speed:n,to:r?.to,motion:a};for(let e of ze)try{e(o)}catch(e){console.error(e)}}function He(e){let t=e.commands??[];for(let e=t.length-1;e>=0;e--){let n=t[e];if(n.op===`surface`)return n.name}}var Ue={willReadFrequently:!1};if(typeof HTMLCanvasElement<`u`){let e=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,n){return e.call(this,t,t===`2d`?{willReadFrequently:!0,...n}:n)}}var V=e=>e.el.querySelector(`input`),We=e=>[e.min===``?0:+e.min,e.max===``?100:+e.max],H=(e,t,n)=>Math.min(Math.max(e,t),n),Ge=()=>typeof matchMedia<`u`&&matchMedia(`(prefers-reduced-motion: reduce)`).matches,Ke=new Map;function qe(e,t){t.isTrusted?e.setPointerCapture(t.pointerId):Ke.set(t.pointerId,e)}var Je=e=>Ke.get(e);function Ye(e){let t=Ke.get(e);return Ke.delete(e),t}function Xe(e,t,n){let r=!1;e.el.addEventListener(`pointerdown`,t=>{if(r||t.button||n.accepts?.(t)===!1||e.el.querySelector(`input`)?.disabled)return;t.preventDefault(),e.el.querySelector(`input`)?.focus({preventScroll:!0}),qe(e.el,t),r=!0;let i=t.clientX,a=t.clientY;n.start?.(t);let o=e=>{e.pointerId===t.pointerId&&(n.move(e,e.clientX-i,e.clientY-a),i=e.clientX,a=e.clientY)},s=i=>{i.pointerId===t.pointerId&&(r=!1,e.el.removeEventListener(`pointermove`,o),e.el.removeEventListener(`pointerup`,s),e.el.removeEventListener(`pointercancel`,s),e.el.removeEventListener(`lostpointercapture`,s),n.end?.(i))};e.el.addEventListener(`pointermove`,o),e.el.addEventListener(`pointerup`,s),e.el.addEventListener(`pointercancel`,s),e.el.addEventListener(`lostpointercapture`,s)},{signal:t})}function Ze(e,t,n){let r=new AbortController,{signal:i}=r,a=-1;e.style.pointerEvents=`auto`,e.style.touchAction=`none`,e.style.cursor=`crosshair`;let o=n=>{let r=e.getBoundingClientRect(),i=r.width/(e.offsetWidth||1),a=t(),o=((n.clientX-r.left)/i-a.x)/a.w,s=((n.clientY-r.top)/i-a.y)/a.h;return{x:o*a.cols,y:s*a.rows,inside:o>=0&&o<=1&&s>=0&&s<=1,a}},s=(e,t)=>H(e,0,t-.001);e.addEventListener(`pointerdown`,t=>{if(t.button||a>=0)return;let{x:r,y:i,inside:s}=o(t);s&&n.down?.(r,i,t)!==!1&&(t.preventDefault(),a=t.pointerId,qe(e,t))},{signal:i}),e.addEventListener(`pointermove`,e=>{if(e.pointerId===a)for(let t of e.getCoalescedEvents?.()??[e]){let{x:r,y:i,a}=o(t);n.move?.(s(r,a.cols),s(i,a.rows),e)}},{signal:i});let c=e=>{if(e.pointerId!==a)return;a=-1;let{x:t,y:r,a:i}=o(e);n.up?.(s(t,i.cols),s(r,i.rows),e)};return e.addEventListener(`pointerup`,c,{signal:i}),e.addEventListener(`pointercancel`,c,{signal:i}),()=>r.abort()}function Qe(e,t){let n=e.value;Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,`value`).set.call(e,String(t)),e.value!==n&&e.dispatchEvent(new Event(`input`,{bubbles:!0}))}var $e=e=>Math.atan2(Math.sin(e),Math.cos(e));function et(e,t,n,r,i=0){let a=Math.hypot(e,t),o=Math.hypot(n,r);return Math.min(a,o)>=i?$e(Math.atan2(r,n)-Math.atan2(t,e)):(e*r-t*n)/(Math.max(a,o)*i)}var tt=.12,nt=class{at=0;seat=0;grab(e){this.at=this.seat=e}by(e,t){let{min:n,max:r,step:i,wrap:a,past:o=0}=t,s=r-n;if(this.at+=e,a&&s){let e=Math.floor((this.at-n)/s)*s;this.at-=e,this.seat-=e}else this.at=H(this.at,n-o,r+o);let c=a?this.at:H(this.at,n,r);if(!i)return this.seat=c;let l=Number.isFinite(n)?n:0,u=(this.seat-l)/i,d=(c-l)/i,f=d>u?Math.floor(d+.5-tt):Math.ceil(d-.5+tt);return(f-u)*(d-u)>0&&(this.seat=l+f*i),this.seat}},rt=e=>e.step===`any`?0:+e.step||1;function it(e,t,n=`pull`){e.data[n]!==t&&(e.data[n]=t,e.def.update?.(e))}var at=.4;function U(e,t,n){let r=(t,n)=>{let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r},i=e.createProgram(),a=[r(e.VERTEX_SHADER,t),r(e.FRAGMENT_SHADER,n)];for(let t of a)e.attachShader(i,t);return e.linkProgram(i),{program:i,finish:()=>{if(!e.getProgramParameter(i,e.LINK_STATUS)){let t=a.map(t=>e.getShaderInfoLog(t)).join(``)||e.getProgramInfoLog(i);throw Error(t||`link failed`)}let t={},n=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let r=0;r<n;r++){let{name:n}=e.getActiveUniform(i,r);t[n]=e.getUniformLocation(i,n)}return{program:i,u:t}}}}function ot(e,t,n){return U(e,t,n).finish()}var st=16,ct=class{gl;f;i;at={};buffers=[];size;stride;kept=new Float32Array;count=0;constructor(e,t,n){this.gl=e;let r=e.getUniformBlockIndex(t,n);e.uniformBlockBinding(t,r,0),this.size=e.getActiveUniformBlockParameter(t,r,e.UNIFORM_BLOCK_DATA_SIZE);let i=e.getParameter(e.UNIFORM_BUFFER_OFFSET_ALIGNMENT);this.stride=Math.ceil(this.size/i)*i;let a=e.getActiveUniformBlockParameter(t,r,e.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES),o=e.getActiveUniforms(t,[...a],e.UNIFORM_OFFSET);a.forEach((n,r)=>{this.at[e.getActiveUniform(t,n).name]=o[r]/4});let s=new ArrayBuffer(this.size);this.f=new Float32Array(s),this.i=new Int32Array(s)}two(e,t,n){this.f[e]=t,this.f[e+1]=n}four(e,t,n,r,i){this.two(e,t,n),this.two(e+2,r,i)}vec(e,t){for(let n=0;n<t.length;n++)this.f[e+n]=t[n]}keep(){let e=this.stride/4,t=this.count*e;if(t+e>this.kept.length){let t=new Float32Array(Math.max(e*256,this.kept.length*2));t.set(this.kept),this.kept=t}return this.kept.set(this.f,t),this.count++}send(){let{gl:e}=this,t=this.stride/4;for(let n=0,r=0;n<this.count;n+=st,r++)e.bindBuffer(e.UNIFORM_BUFFER,this.buffers[r]??=e.createBuffer()),e.bufferData(e.UNIFORM_BUFFER,this.kept,e.DYNAMIC_DRAW,n*t,Math.min(st,this.count-n)*t);this.count=0}use(e){this.gl.bindBufferRange(this.gl.UNIFORM_BUFFER,0,this.buffers[Math.floor(e/st)],e%st*this.stride,this.size)}};function W(e,t,n,r=e.TEXTURE_2D){e.texParameteri(r,e.TEXTURE_MIN_FILTER,t),e.texParameteri(r,e.TEXTURE_MAG_FILTER,n),e.texParameteri(r,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(r,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}var lt=`#version 300 es
precision highp float;
out vec2 vUv;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  vUv=vec2(c.x,1.-c.y);
  gl_Position=vec4(c*2.-1.,0.,1.);
}`,ut=[``,`albedo`,`height`,`normal`,`roughness`,`metal`,`emissive`,`occlusion`],dt=`
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
}`,ft=`// How far a view ray goes across for each mm it comes down, at a place on the face, mm.
vec2 viewSlope(vec2 at);
// The tallest thing near a place, which is as high as a ray landing there need start.
float nearTop(vec2 s);
// How much light reaches where the ray landed, if that's on a wall with something standing on it.
float gNear=1.;
// The ray went on under what stands clear and reached the page, so that's what it landed on, whatever the texel holds.
bool gGround=false;
// A wall has no texels of its own, so nothing can darken it. But the ray knows how deep it landed, so it can tell how far
// that is from what stands on the wall, the next texels along, and that's a contact shadow that needs no drawing.
float contact(vec2 uv,float z,vec2 du){
  float far=length(du*uCss),top=topOf(uv);
  if(far<.001||top-z<1.) return 1.;
  vec2 q=uv-du/far*2.;
  float low=underOf(q);
  if(low<1.||top-topOf(q)<1.) return 1.;
  float off=max(max(low-z,z-topOf(q)),0.);
  return mix(.3,1.,smoothstep(0.,5.,off));
}

// Halves the last step until it finds where the ray goes in.
vec2 enters(vec2 uv,float z,vec2 du,float dz){
  float k=.5,s=.25;
  for(int i=0;i<5;i++){
    float zk=z+dz*(1.-k);
    vec2 q=uv-du*(1.-k);
    k+=zk<=topOf(q)&&zk>underOf(q)?-s:s;
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
  lean=mix(lean,vec2(0.,viewSlope(vec2(0.,uBody.y*MM)).y),w);
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
  #define INSIDE(z,uv) ((z)<=topOf(uv)&&(z)>underOf(uv))
  // Starting inside the body, the ray was the other half's.
  if(INSIDE(z,ALONG(z))) return s;
  // Toward an end that meets another face, what's nearer that face is that face's, and so is all that's past the end. What stands clear of the body, as lugs do, is front and back's.
  #define OWNED(z,uv) ((z)>=(underOf(uv)>0.?plane:max(plane,OWNS(ACROSS(z)*size.x-M)))-tol)
  #define OWNS(dx) ((dx<0.?uOwn.y:uOwn.z)>0.?uFace-uOwn.x+abs(dx):plane)
  for(int i=0;i<n;i++){
    float a=z;
    z+=dz;
    vec2 uv=ALONG(z);
    // Coming down, a ray lands on a top. Going up from the middle, it comes in under whatever is there, the near side of it from the face turned away.
    if(away?INSIDE(z,uv):z<=topOf(uv)&&a>underOf(uv)){
      // A step is up to half a mm across a wall, and where it lands in the wall's few texels shows as ripples. So halve it down.
      float b=z;
      for(int k=0;k<6;k++){
        float m=(a+b)*.5;
        if(away?!INSIDE(m,ALONG(m)):m>topOf(ALONG(m))) a=m;else b=m;
      }
      uv=ALONG(b);
      if(!OWNED(b,uv)) return s;
      gUnder=away&&underOf(uv)>0.;
      gGround=false;
      gHit=true;
      gZ=b;
      // Bisected, it sits right on the height, so what says it's a wall is how fast the height falls either side of it.
      vec2 e=1./(uCss*uDpr);
      gWall=abs(topOf(uv-vec2(e.x,0.))-topOf(uv+vec2(e.x,0.)))+abs(topOf(uv-vec2(0.,e.y))-topOf(uv+vec2(0.,e.y)))>6.*MM/uDpr;
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
  vec2 slope=viewSlope(at);
  if(uSpin.y>0.) return across(s,slope,size);
  // It can only land on what stands near it, so it starts above that, not above the whole device.
  float top=length(slope)*uPeak/MM<48.?nearTop(s):uPeak;
  int n=int(clamp(ceil(length(slope)*top/MM*min(uDpr,3.)),1.,96.));
  float dz=top/float(n),z=top;
  vec2 uv=s+slope*(uFace-top)/size,du=slope*dz/size;
  float was=z-topOf(uv);
  for(int i=0;i<n;i++){
    z-=dz;
    uv+=du;
    float gap=z-topOf(uv);
    // One that was already below an underside goes on under it, so only a ray that lands looks there.
    if(gap<=0.&&z+dz>underOf(uv)){
      gNear=contact(uv,z,du);
      // Across a wall the two ends say nothing about where it stood, and guessing leaves a stair round anything thin.
      if(was-gap>dz*2.) return enters(uv,z,du,dz);
      return uv-du*(1.-was/max(was-gap,.0001));
    }
    was=max(gap,0.);
  }
  // Past what stands clear and on down to the ground, where the texel is still the part's and showing it would lay a copy on the page.
  gGround=underOf(uv)>0.;
  return uv;
}
`,pt=e=>e.op===`surface`?e.reach:e.zTop,mt=e=>`zTop`in e?pt(e):0,G=e=>{let t=ge(e.shape,e.op===`glow`?e.width+2:3);return e.bend?S(t,e.bend):t};function K(e,t){if(!e||!t)return e??t??null;let n=Math.min(e.x,t.x),r=Math.min(e.y,t.y);return{x:n,y:r,w:Math.max(e.x+e.w,t.x+t.w)-n,h:Math.max(e.y+e.h,t.y+t.h)-r}}var ht=`#version 300 es
precision highp float;
uniform vec2 uCanvas;
uniform vec4 uBox;
out vec2 vPx;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  vPx=mix(uBox.xy,uBox.zw,c);
  gl_Position=vec4(vPx/uCanvas*2.-1.,0.,1.);
}`,gt={rect:0,capsule:1,field:2,holes:3,mask:4,arc:5},_t={surface:0,cut:1,ink:2,glow:3,screen:4,glass:5,frost:6},vt={crt:0,led:1,lcd:2,oled:3,eink:4,coat:5,tft:6},yt={twill:1,knit:2,wood:3,stone:4,terrazzo:5,leather:6,pebble:6,hex:7,knurl:8,hazard:9,ribs:10,foil:11,dots:12,pits:13,stipple:0,lines:0},bt={flat:0,round:1,chamfer:2,dome:3,blend:4},xt=`layout(std140) uniform Command{
  vec4 uBox,uCap,uSeen,uFrom,uReach;
  // Where this face's outline's insets start, their step and count, in uRows: see \`across\`.
  vec4 uOutline;
  // Where the maps are on the canvas, which reach only as far as what's drawn: see the light pass.
  vec4 uMap;
  // Where frost's copy of what's under it, and a bridge's of the heights, lie on the maps: each is only as big as what reads it.
  vec4 uBackBox,uUnderBox;
  int uEdge;
  vec2 uCanvas,uCenter,uHalf,uSeed,uSpread,uCapR,uSubRM,uBareRM,uCrown,uDish,uTilt,uBendDir,uBendAt,uInset;
  vec3 uRipple,uColor,uColor2,uSub,uBare,uCoatTint,uPatina,uEmit,uGrain,uInk,uHoles;
  int uShape,uMode,uProfile,uRadial,uKind,uPattern,uBendBoth,uFollow;
  float uRadius,uRot,uBevel,uZEdge,uZTop,uMid;
  float uRough,uMetal,uCoat,uAniso,uTangent,uPeel,uWave,uRelief,uFeature,uSlope,uAcross,uMottle,uFleck,uWear,uDepth,uSoftLod,uWidth,uFeather;
  float uAge,uPatinaOn,uPatinaRough,uTouch,uDents,uFade,uRings,uPores,uFilmVary,uLeak;
  float uGain,uScale,uFilm,uBlur,uZoom,uOpacity,uTransmit,uBendReach,uBendDrop,uBendK,uGrow,uRing;
  float uSheen,uScatter,uMarks,uPolish,uBroad,uCoatRough;
  // What a mark lies on, which it stops at: its middle and half size, its corners, its turn and how far its field reaches.
  vec4 uClip;
  vec2 uClipSpread;
  float uClipRadius,uClipRot;
  // How chips run on a surface, and on what a mark is printed on: its wear, the seed it was drawn with, how big its chips are.
  vec2 uGroundSeed;
  float uChip,uGroundWear;
  int uClipShape;
};`,St=`mat2 rm(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
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

// What a surface is at a point of it, from its command's values: colour, finish, pattern, wear and age. Everything the
// material pass works out but where the surface is and how it's laid down, so a renderer that draws its pixels another way
// sees the same surface. It reads the command's values by their uniform names.
// Where chips are, and the level the field passes where one starts. Paint goes at raised edges first, and the distance tells us where they are.
float chipField(vec2 w,float size){return fbm(w*.034/size)*.6+fbm(w*.29/size+3.)*.4;}
float chipFrom(float inset,float wear,float size){return mix(.8,.5,clamp(exp(-inset/(11.*size))*wear*1.7,0.,1.))-wear*.05;}

struct Surface{vec3 col,emit;float rough,metal,coat,aniso,tang,sheen,h,t,film,tilt;};
// p is the point in the surface's own frame and w on the part, h how high it stands there, inset how far in from its edge,
// css px, texel one pixel in css px, and far the same where the surface turns away.
Surface surface(vec2 p,vec2 w,float h,float inset,float texel,float far){
  vec3 col=uColor,emit=uEmit;
  float rough=uRough,metal=uMetal,coat=uCoat,aniso=uAniso,tang=uTangent,sheen=uSheen;

  if(uRadial==1) tang=atan(p.y,p.x)+PI*.5;

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
  // Relief goes into t, because it can be far finer than height can hold.
  float t=0.,seen=1.;
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
    float field=chipField(w,uChip),t=chipFrom(inset,uWear,uChip);
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
  return Surface(col,emit,rough,metal,coat,aniso,tang,sheen,h,t,film,tilt);
}`,Ct=`void screenOf(vec2 st,vec2 px,out vec3 col,out vec3 emit,out float metalLeft){
  vec2 size=vec2(textureSize(uScreen,0));
  col=uColor;emit=uEmit;
  metalLeft=0.;
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
    vec3 mask=.78+uInk.x*(1.-smoothstep(1.2,2.2,uZoom))*cos(px.x*2.1+vec3(0.,2.1,4.2));
    vec3 pic=(texture(uScreen,st+foot*vec2(-.375,-.125)).rgb+texture(uScreen,st+foot*vec2(.125,-.375)).rgb+texture(uScreen,st+foot*vec2(.375,.125)).rgb+texture(uScreen,st+foot*vec2(-.125,.375)).rgb)*.25;
    emit+=pic*scan*mask*uGain*edge;
  }else if(uKind==3||uKind==6){
    // A colour panel's pixel is a cell of three stripes, red, green and blue, in a black matrix. Shown big, each pixel is a hard square
    // with an edge one shown pixel soft, and its stripes show. Once a stripe is down to a few shown pixels it averages to its colour, as in the eye.
    // The margin round its active pixels stays black.
    vec2 g=(st-uInset)/(1.-2.*uInset)*size,foot=fwidth(g)*uZoom,n=floor(g+.5);
    float inside=step(0.,min(g.x,g.y))*step(0.,min(size.x-g.x,size.y-g.y));
    vec2 sharp=n+clamp((g-n)/max(foot,vec2(1e-4)),-.5,.5);
    vec3 c=texture(uScreen,mix(sharp,g,smoothstep(.6,1.,max(foot.x,foot.y)))/size).rgb;
    vec2 f=fract(g);
    float sx=fract(f.x*3.),wx=min(foot.x*1.5,.2),wy=min(foot.y*.5,.2),which=floor(f.x*3.);
    float lit=smoothstep(.1-wx,.1+wx,sx)*smoothstep(.9+wx,.9-wx,sx)*smoothstep(.05-wy,.05+wy,f.y)*smoothstep(.95+wy,.95-wy,f.y);
    vec3 mask=vec3(equal(vec3(which),vec3(0.,1.,2.)))*lit*(3./.72);
    vec3 pic=c*mix(vec3(1.),mask,1.-smoothstep(.25,.5,foot.x*3.))*uGain*inside;
    // A TFT is lit from behind through its crystals, and the room's light goes through them too, off the reflector and back, so its picture still shows with the backlight off.
    if(uKind==6){pic*=uInk;col*=c*inside;}
    emit+=pic;
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
}`,wt=`#version 300 es
precision highp float;
precision highp int;
${xt}
out vec2 vPx;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  vPx=mix(uBox.xy,uBox.zw,c);
  gl_Position=vec4(vPx/uCanvas*2.-1.,0.,1.);
}`,Tt=`#version 300 es
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

${xt}
uniform sampler2D uScreen;
uniform sampler2D uMask,uField,uBackA,uBackE,uBackS,uBackH,uOwn,uRows,uClipField;
#ifdef SPLIT
uniform sampler2D uBackN;
// The heights under a bridge and how much they cover, which with SPLIT are in two maps.
#define UNDER(uv,lod) vec2(textureLod(uBackH,(uv)*uUnderBox.xy+uUnderBox.zw,lod).r,textureLod(uBackN,(uv)*uUnderBox.xy+uUnderBox.zw,lod).a)
#else
#define UNDER(uv,lod) textureLod(uBackH,(uv)*uUnderBox.xy+uUnderBox.zw,lod).ra
#endif
#define AT(uv) ((uv)*uMap.xy+uMap.zw)
#define BACK(uv) (AT(uv)*uBackBox.xy+uBackBox.zw)

const float MM=.25,PI=3.14159265;

${St}
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
    // Waves round the edge, sharp vees, or scoops: round cuts with a flat land left between each and the next.
    if(uRipple.x>0.){
      float a=atan(p.y,p.x)*uRipple.x,f=fract(a/6.2832);
      if(uRipple.z<.5) d+=uRipple.y*(.5+.5*sin(a));
      else if(uRipple.z<1.5) d+=uRipple.y*abs(2.*f-1.);
      else{float x=(f-.5)/.42;d+=uRipple.y*sqrt(max(1.-x*x,0.));}
    }
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
float toHolder(vec2 q){
  return uClipShape==2?texture(uClipField,q/(2.*(uClip.zw+uClipSpread))+.5).r:sdRR(q,uClip.zw,uClipRadius);
}
float held(){
  if(uClipShape<0) return 1.;
  float d=toHolder(rm(uClipRot)*(P-uClip.xy));
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
  float h=mix(uZEdge,uZTop-dot(uCrown,q*q)-dot(uTilt,q),pe);
  float deep=max(uDish.x,uDish.y);
  if(deep>0.){vec2 q=p/uHalf,w=uDish/deep;h-=deep*(1.-clamp(dot(w,q*q),0.,1.));}
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
float insetAt(int i,int k){
  if(i<0||i>=int(uOutline.z)) return 1e9;
  vec4 r=texelFetch(uRows,ivec2(i,0),0);
  return k==0?r.r:r.g;
}
float across(){
  vec2 q=vPx*MM-uFrom.xy;
  float H=q.x*uSeen.x+uSeen.w;
  // Where this face's outline turns in at a corner, what stands off the side beside it turns in with it.
  if(uOutline.z>0.){
    float f=(vPx.y-uOutline.x)/uOutline.y;int i0=int(floor(f)),k=uSeen.x<0.?1:0;
    float a=insetAt(i0,k),b=insetAt(i0+1,k);
    if(max(a,b)>1e8) discard;
    H+=mix(a,b,fract(f))*MM;
  }
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

${Ct}
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
    vec3 col,emit;
    float metalLeft;
    screenOf(st,vPx,col,emit,metalLeft);
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
      vec4 c=textureLod(uBackA,BACK(s),lod);
      back+=c.rgb/max(c.a,.05);
      light+=textureLod(uBackE,BACK(s),lod).rgb;
    }
    back/=12.;light/=12.;
    // Clear glass leaves what is under it as it was, metal included. The more a pane
    // scatters, the less of that survives, and bare metal has no colour to give back.
    vec4 under=textureLod(uBackS,BACK(seen),lod);
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
    // A chip in what it's printed on takes the print with it.
    if(uGroundWear>0.&&uClipShape>=0){
      vec2 q=rm(uClipRot)*(P-uClip.xy);
      float t=chipFrom(max(-toHolder(q),0.),uGroundWear,uChip);
      a*=1.-smoothstep(t,t+.012,chipField(q+uGroundSeed,uChip))*smoothstep(0.,.2,uGroundWear);
    }
    a*=held();
    oA=vec4(uColor,a);oS=vec4(uRough,uMetal*.5,0.,a);oE=vec4(uEmit*.25,a);oH=vec4(0.);oM=vec4(0.,0.,1.,a);
    return;
  }

  // A layer seen side on is all inside: its edges are where the section stops.
  float d=uEdge==4?-1e3:dist(p);
  float h=uEdge==4?seenAt:top(p,d);

  // What's underneath was bent already.
  if(uFollow==0) h-=fall;
  float inset=max(-d,0.);
  if(uFollow==3){
    // A spiral of taps as in frost, because one level of the mip chain alone shows its blocks.
    vec2 at=vPx/uCanvas;
    float k=float(textureSize(uBackH,0).x)*uUnderBox.x*uMap.x/uCanvas.x,lod=max(log2(uBlur*.7*k),0.);
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
  // One texel of the sheet in css px, then the same where it turns away, so all of this holds on a
  // zoomed or bent device.
  float texel=fwidth(vPx.x),far=uEdge==1?texel:max(max(fwidth(P.x),fwidth(P.y)),texel);
  Surface S=surface(p,w,h,inset,texel,far);
  vec3 col=S.col,emit=S.emit;
  float rough=S.rough,metal=S.metal,coat=S.coat,aniso=S.aniso,tang=S.tang,sheen=S.sheen,t=S.t,film=S.film,tilt=S.tilt;
  h=S.h;

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
}`,Et=`#version 300 es
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
}`,Dt=`#version 300 es
precision highp float;
in vec2 vPx;
layout(location=0) out vec4 oA;
layout(location=1) out vec4 oS;
uniform vec2 uCanvas,uSeed;
uniform float uAge,uDpr;
uniform sampler2D tH;
// What covers a place, which with SPLIT is in the normals' map.
#ifdef SPLIT
uniform sampler2D tN;
#define COVERS tN
#else
#define COVERS tH
#endif
uniform vec4 uMap;
#define AT(uv) ((uv)*uMap.xy+uMap.zw)

float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vnoise(vec2 p){
  vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}
float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*vnoise(p);p=mat2(1.62,1.19,-1.19,1.62)*p+17.1;a*=.5;}return s/.9375;}
// A height, as it stands where it covers, read as wide as lod and off css px from the pixel.
float at(vec2 uv,float lod,float off){
  return textureLod(tH,AT(uv),lod).r/max(textureLod(COVERS,AT(uv),lod).a,.05);
}

void main(){
  vec2 uv=vPx/uCanvas,w=vPx+uSeed;
  vec4 H=textureLod(tH,AT(uv),0.);
  float cov=textureLod(COVERS,AT(uv),0.).a;
  if(cov<.01) discard;
  float h=H.r/max(cov,.25),l=log2(uDpr);

  // Dirt settles wherever the surface sits below what is around it.
  float pit=clamp(max(at(uv,2.1+l,0.)-h,0.)*.9+max(at(uv,3.7+l,0.)-h,0.)*.3,0.,1.);
  pit*=.35+1.1*fbm(w*.05);
  // Nothing rests on a slope too steep to hold it, so the side of a tall body beside what stands on it stays clean.
  vec2 e=vec2(1.)/uCanvas;
  vec2 slope=vec2(at(uv+vec2(e.x,0.),l,1.)-at(uv-vec2(e.x,0.),l,1.),at(uv+vec2(0.,e.y),l,1.)-at(uv-vec2(0.,e.y),l,1.))/(2.*.25);
  pit*=1.-smoothstep(1.,2.5,length(slope));

  // Water carries it downhill from anything that stands proud.
  float run=0.;
  for(int i=1;i<=7;i++){
    float t=float(i)/7.;
    vec2 q=uv-vec2(0.,t*62./uCanvas.y);
    run+=max(at(q,2.+l,t*62.)-h-.4,0.)*(1.-t);
  }
  float column=smoothstep(.4,.8,vnoise(vec2(w.x*.075,w.y*.01)))*(.45+.55*vnoise(vec2(w.x*.5,w.y*.02)));
  run=clamp(run*.1*column,0.,1.);

  float dirt=clamp(pit*uAge*1.5+run*uAge*.9,0.,.9);
  float film=uAge*(.02+.09*fbm(w*.022+2.))*(.7+.6*vnoise(w*.8));
  float a=1.-(1.-dirt)*(1.-film);
  vec3 c=mix(vec3(.17,.15,.12),mix(vec3(.022,.017,.012),vec3(.07,.035,.016),run),dirt/max(a,.001));
  oA=vec4(c*cov,a);
  oS=vec4(.82*cov,0.,0.,a);
}`,Ot=`#version 300 es
precision highp float;
in vec2 vPx;
out vec4 o;
uniform sampler2D tH;
uniform vec2 uCanvas;
uniform float uDpr;
uniform vec4 uMap;
#define AT(uv) ((uv)*uMap.xy+uMap.zw)
const float MM=.25;
float at(vec2 s,float l){
  return textureLod(tH,AT(s),l).r;
}
void main(){
  vec2 uv=vPx/uCanvas,e=vec2(1.5)/uCanvas;
  float h0=textureLod(tH,AT(uv),0.).r,lod=log2(uDpr);
  // Measured from the surface's own slope, so a dome does not shade itself.
  vec2 g=vec2(at(uv+vec2(e.x,0.),lod)-at(uv-vec2(e.x,0.),lod),at(uv+vec2(0.,e.y),lod)-at(uv-vec2(0.,e.y),lod))/(3.*MM);
  float seen=0.;
  vec2 open=vec2(0.);
  // Samples start a texel out, so with fewer pixels to the mm than one to the css px, they reach further as well.
  for(int i=0;i<10;i++){
    float a=(float(i)+.5)*.62832,r=1.5/min(uDpr,1.),top=0.;
    vec2 dir=vec2(cos(a),sin(a));
    for(int j=0;j<6;j++){
      vec2 s=uv+dir*r/uCanvas;
      float d=r*MM,rise=at(s,max(log2(r*uDpr)-1.3,0.))-h0-dot(g,dir)*d;
      top=max(top,rise/sqrt(rise*rise+d*d)*(1.-float(j)*.1));
      r*=2.;
    }
    seen+=1.-top*top;
    open+=dir*(1.-top);
  }
  o=vec4(seen*.1,open*.1*.5+.5,1.);
}`,kt=`
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
}`,At=`
float radical(uint b){
  b=(b<<16u)|(b>>16u);
  b=((b&0x55555555u)<<1u)|((b&0xAAAAAAAAu)>>1u);
  b=((b&0x33333333u)<<2u)|((b&0xCCCCCCCCu)>>2u);
  b=((b&0x0F0F0F0Fu)<<4u)|((b&0xF0F0F0F0u)>>4u);
  b=((b&0x00FF00FFu)<<8u)|((b&0xFF00FF00u)>>8u);
  return float(b)*2.3283064365e-10;
}`,jt=`#version 300 es
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  gl_Position=vec4(c*2.-1.,0.,1.);
}`,Mt=`#version 300 es
precision highp float;
out vec4 o;
uniform float uSize,uDark,uGlow,uTent,uCamera;
uniform vec2 uLens;
uniform int uPanels;
uniform vec4 uPanelAt[6];
uniform vec2 uPanelLight[6];
${kt}
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
  // Below the horizon is the table, lit on the lamp's side and in the object's own shadow on the far one. Glass and what's matt don't
  // pick that out, but a steep polished edge sees little else, and bright down one side and dark down the other is how it reads as chrome.
  float table=mix(.5,3.2,smoothstep(-.3,.1,dot(normalize(d.xy+1e-5),vec2(-.6,-.8))));
  o=vec4(l+tent*mix(table,1.,smoothstep(-.1,.4,d.z)),g+tent,uTent*max(1.-d.z,0.),mix(.1,.98,t));
}`,Nt=`#version 300 es
precision highp float;
precision highp int;
out vec4 o;
${At}
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
}`,Pt=[.06,.12,.25,.5],Ft=.02,It=`#version 300 es
precision highp float;
precision highp int;
out vec4 o;
uniform sampler2D tRoom;
uniform float uSize,uTurn,uReach,uThin;
${kt}
${At}
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
}`,Lt=`#version 300 es
precision highp float;
precision highp int;
out vec4 o;
uniform sampler2D tRoom;
uniform float uRough,uSize,uSource;
uniform int uSamples;
const float PI=3.14159265;
${kt}
${At}
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
}`,q=`#version 300 es
precision highp float;
out vec2 vT;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  vT=c;
  gl_Position=vec4(c*2.-1.,0.,1.);
}`,Rt=`#version 300 es
precision highp float;
in vec2 vT;
layout(location=0) out vec4 oB;
layout(location=1) out vec4 oC;
uniform sampler2D tA,tH,tS,tC,tO,tM,tD,tN;
// Canvas to maps, as the light pass has it, mm a texel, the height eight bits cover, how coarse a smooth face's slope is read, and whether
// relief and grain are kept apart from height.
uniform vec4 uMap;
uniform float uMm,uMost,uLod;
uniform bool uRelief,uSplit;
float rise(ivec2 p){
  ivec2 q=clamp(p,ivec2(0),textureSize(tH,0)-1);
  return texelFetch(tH,q,0).r+(uRelief?texelFetch(tD,q,0).r:0.);
}
float wide(vec2 t,float l){return textureLod(tH,t,l).r+(uRelief?textureLod(tD,t,l).r:0.);}
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  vec4 A=texelFetch(tA,p,0),S=texelFetch(tS,p,0),C=texelFetch(tC,p,0),M=texelFetch(tM,p,0);
  if(A.a<=0.){oB=vec4(.5,.5,1.,0.);oC=vec4(1.,0.,0.,0.);return;}
  // The slope, from the heights as they're kept: thinned by cover, so an edge is as steep as it's drawn.
  vec2 g=vec2(rise(p-ivec2(1,0))-rise(p+ivec2(1,0)),rise(p-ivec2(0,1))-rise(p+ivec2(0,1)))/(2.*uMm);
  vec3 n=normalize(vec3(g,1.));
  float h=rise(p)/max(A.a,.25);
  float sa=max(S.a,.001),rough=clamp(S.r/sa,.03,1.),metal=clamp(S.g/sa*2.,0.,1.),coat=S.b/sa;
  // What handling left, as the engine's light takes it, here once: prints and scratches roughen what's glossy and go through a lacquer,
  // haze roughens, and dust lies pale over everything. Only what can hold a mark takes one.
  float takes=M.b/max(M.a,.001);
  C.rgb*=takes;C.a=mix(.5,C.a,takes);
  float gloss=1.-smoothstep(.12,.72,rough),mark=(C.r*.6+C.b*.55)*gloss;
  rough=clamp(rough*(1.+(C.a-.5)*.3)+mark*.2,.03,1.);
  coat*=1.-min(mark*1.1,.85);
  metal*=1.-C.g;
  rough=mix(rough,.9,C.g);
  coat*=1.-C.g;
  vec2 px=1./vec2(textureSize(tA,0));
  // A clear coat levels the texture under it, and a sharp reflection would show it as a weave: what's smooth takes its slope from further
  // apart, except across a real edge, where that would lean a bevel that isn't there.
  if(rough<.34||coat>.01){
    vec2 es=px*exp2(uLod);
    float l=max(uLod-1.5,0.),a=wide(vT+vec2(-es.x,-es.y),l),b=wide(vT+vec2(es.x,-es.y),l),c=wide(vT+vec2(-es.x,es.y),l),d=wide(vT+vec2(es.x,es.y),l);
    vec3 ns=normalize(vec3(vec2(a+c-b-d,a+b-c-d)/(4.*uMm*exp2(uLod)),1.));
    float stands=max(a,max(b,max(c,d)))-min(a,min(b,min(c,d)));
    ns=normalize(mix(ns,n,max(smoothstep(.16,.36,length(n.xy/n.z-ns.xy/ns.z)),smoothstep(.08,.24,stands))));
    n=normalize(mix(ns,n,smoothstep(.14,.34,rough)));
  }
  // The grooves of bare brushed metal lean across their length.
  float ma=max(M.a,.001),scatter=M.g/ma;
  vec4 Tq=uSplit?texelFetch(tN,p,0):texelFetch(tH,p,0);
  vec2 tv=uSplit?(Tq.rg-.5*Tq.a)*4./max(Tq.a,.001):Tq.gb/max(Tq.a,.001);
  tv*=1.-step(1.5,tv.x);
  float an=clamp(length(tv),0.,.92);
  if(an>.05&&metal>.5&&coat<=.01) n=normalize(vec3(n.xy/n.z+vec2(-tv.y,tv.x)/an*(M.r/ma-.5),1.));
  // What it can see of the room, kept at half size, so read about itself. Light that goes in and comes back out elsewhere fills what
  // would have been dark. Where one part stands on another the join is a dark line, far tighter than that reaches, and a pale metal
  // fills its own creases.
  vec2 cu=(vT-uMap.zw)/uMap.xy,eo=2.5*px/uMap.xy;
  float O=(texture(tO,cu+eo).r+texture(tO,cu-eo).r+texture(tO,cu+vec2(eo.x,-eo.y)).r+texture(tO,cu-vec2(eo.x,-eo.y)).r)*.25;
  float open=mix(O*O,O,scatter);
  vec2 ej=max(.3/uMm,1.2)*px;
  float hj=textureLod(tH,vT,0.).r*2.;
  float crease=max(textureLod(tH,vT-vec2(ej.x,0.),0.).r+textureLod(tH,vT+vec2(ej.x,0.),0.).r-hj,0.)+max(textureLod(tH,vT-vec2(0.,ej.y),0.).r+textureLod(tH,vT+vec2(0.,ej.y),0.).r-hj,0.);
  open*=1.-.82*smoothstep(.08,.7,crease);
  vec3 alb=mix(A.rgb/max(A.a,.001),vec3(.6,.58,.55),C.g),f0=mix(vec3(.04),alb+.04*(1.-alb),metal);
  float fill=min(max(f0.r,max(f0.g,f0.b)),.95);
  open=mix(open,open/(1.-fill*(1.-open)),metal);
  oB=vec4(n.xy*.5+.5,open,clamp(h/uMost,0.,1.));
  oC=vec4(rough,metal,clamp(coat,0.,1.),C.g);
}`,zt=`#version 300 es
precision highp float;
in vec2 vT;
out vec4 o;
uniform sampler2D tA,tH,tD;
uniform bool uRelief;
void main(){
  float a=texture(tA,vT).a,h=texture(tH,vT).r+(uRelief?texture(tD,vT).r:0.);
  o=vec4(a>.004?h/max(a,.25):0.,0.,0.,1.);
}`,Bt=`#version 300 es
precision highp float;
layout(location=0) out vec4 o0;
layout(location=1) out vec4 o1;
uniform sampler2D tB,tC,tB0,tC0;
uniform ivec2 uAt;
uniform float uF;
uniform bool uHalf;
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy)-uAt;
  vec4 b=texelFetch(tB,p,0),b0=texelFetch(tB0,p,0);
  if(uHalf){
    if(b.r==b0.r) discard;
    o0=vec4(mix(b0.r,b.r,uF),0.,0.,1.);
    o1=vec4(0.);
    return;
  }
  vec4 c=texelFetch(tC,p,0),c0=texelFetch(tC0,p,0);
  if(b==b0&&c==c0) discard;
  o0=mix(b0,b,uF);
  o1=mix(c0,c,uF);
}`,Vt=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D tA,tT;
uniform bool uSplit;
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  vec4 q=texelFetch(tT,p,0);
  vec2 tv=uSplit?(q.rg-.5*q.a)*4./max(q.a,.001):q.gb/max(q.a,.001);
  tv*=(1.-step(1.5,tv.x))*step(.0001,texelFetch(tA,p,0).a);
  o=vec4((127.+127.*clamp(tv,-1.,1.))/255.,0.,1.);
}`,Ht=`#version 300 es
precision highp float;
layout(location=0) out vec4 o0;
layout(location=1) out vec4 o1;
uniform sampler2D tU0,tR0,tU1,tR1,tMask,tOver,tF0,tF1;
uniform ivec2 uAt;
// Where it's gone, map px, how far it's turned, and the pin it turns about, from the crop's corner. And where its far end is.
uniform vec2 uGo,uPin,uFar;
uniform float uTurn,uScale,uW;
uniform ivec2 uKind;
vec2 spin(vec2 v,float a){float c=cos(a),s=sin(a);return vec2(c*v.x-s*v.y,s*v.x+c*v.y);}
vec4 turned(vec4 v,int kind){
  if(kind==1){v.xy=spin(v.xy*2.-1.,uTurn)*.5+.5;}
  else if(kind==2){v.xy=(127.+127.*spin((v.xy*255.-127.)/127.,uTurn))/255.;}
  return v;
}
// The part as it rests, gone by \`go\`, over the body without it, at \`p\`.
void carried(vec2 p,vec2 go,out vec4 a,out vec4 b){
  // Where this was on the part at rest.
  vec2 q=spin(p/uScale-go-uPin,-uTurn)+uPin;
  vec2 size=vec2(textureSize(tMask,0)),uq=q/size;
  float m=all(greaterThan(q,vec2(0.)))&&all(lessThan(q,size))?textureLod(tMask,uq,0.).r:0.;
  ivec2 ip=ivec2(p);
  // What of the body stands over it hides it there: a key gone into the side of a case is under the case.
  float part=m;
  m*=1.-texelFetch(tOver,ivec2(p/uScale),0).r;
  vec4 u0=texelFetch(tU0,ip,0);
  // What the part shades of the body round it goes where it goes: how much less open the body was there with it than without. Round
  // it, and not under it, where how open it is itself says nothing of the body.
  if(uKind.x==1&&uq==clamp(uq,0.,1.)) u0.b*=mix(clamp(textureLod(tR0,uq,0.).b/max(textureLod(tU0,uq,0.).b,.004),0.,1.),1.,part);
  a=mix(u0,turned(textureLod(tR0,uq,0.),uKind.x),m);
  b=mix(texelFetch(tU1,ip,0),turned(textureLod(tR1,uq,0.),uKind.y),m);
}
void main(){
  vec2 p=gl_FragCoord.xy-vec2(uAt);
  carried(p,uGo,o0,o1);
  if(uW>0.){
    vec4 f0,f1;
    carried(p,uFar,f0,f1);
    ivec2 ip=ivec2(p);
    o0+=uW*(texelFetch(tF0,ip,0)-f0);
    o1+=uW*(texelFetch(tF1,ip,0)-f1);
  }
}`,Ut=`float plain(sampler2D a0,sampler2D a1,sampler2D b0,sampler2D b1,sampler2D c0,sampler2D c1,ivec2 p){
  vec4 a=abs(texelFetch(a0,p,0)-texelFetch(a1,p,0)),b=abs(texelFetch(b0,p,0)-texelFetch(b1,p,0)),c=abs(texelFetch(c0,p,0)-texelFetch(c1,p,0));
  float form=max(max(b.r,b.g),b.a*4.),colour=max(max(a.r,a.g),max(a.b,a.a)),finish=max(c.r*.5,max(c.g,c.b));
  return max(form,max(colour*.5,finish*.5));
}`,Wt=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D tA,tA0,tB,tB0,tC,tC0;
${Ut}
void main(){
  o=vec4(step(.03,plain(tA,tA0,tB,tB0,tC,tC0,ivec2(gl_FragCoord.xy))));
}`,Gt=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D tA,tAF,tB,tBF,tC,tCF,tMask;
uniform vec2 uGo,uPin;
uniform float uTurn;
${Ut}
vec2 spin(vec2 v,float a){float c=cos(a),s=sin(a);return vec2(c*v.x-s*v.y,s*v.x+c*v.y);}
void main(){
  vec2 p=gl_FragCoord.xy,q=spin(p-uGo-uPin,-uTurn)+uPin,size=vec2(textureSize(tMask,0));
  float m=all(greaterThan(q,vec2(0.)))&&all(lessThan(q,size))?texture(tMask,q/size).r:0.;
  o=vec4(step(.5,m)*(1.-step(.03,plain(tA,tAF,tB,tBF,tC,tCF,ivec2(p)))));
}`,Kt=`#version 300 es
precision highp float;
precision highp int;
uniform vec4 uBox;
uniform vec2 uCanvas;
out vec2 vPx;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  vPx=mix(uBox.xy,uBox.zw,c);
  gl_Position=vec4(vPx/uCanvas*2.-1.,0.,1.);
}`,qt=`in vec2 vPx;
uniform sampler2D uScreen;
uniform int uKind;
uniform vec3 uInk,uColor,uEmit;
uniform vec2 uInset,uCenter,uHalf;
uniform float uZoom,uGain,uMetal,uRot;
${Ct}
// What the screen alone makes of its picture here, as the maker's maps hold it: its colour, and its light at a quarter.
void alone(out vec3 col,out vec3 emit){
  float c=cos(uRot),s=sin(uRot),metal;
  vec2 p=mat2(c,-s,s,c)*(vPx-uCenter);
  screenOf((p+uHalf)/(2.*uHalf),vPx,col,emit,metal);
  col=clamp(col,0.,1.);emit=clamp(emit*.25,0.,1.);
}`,Jt=`#version 300 es
precision highp float;
layout(location=0) out vec4 o0;
layout(location=1) out vec4 o1;
${qt}
void main(){vec3 col,emit;alone(col,emit);o0=vec4(col,1.);o1=vec4(emit,1.);}`,Yt=`#version 300 es
precision highp float;
layout(location=0) out vec4 oT;
layout(location=1) out vec4 oA;
layout(location=2) out vec4 oE;
uniform sampler2D tAb,tEb,tAw,tEw,tSAb,tSEb,tSAw,tSEw;
float through(vec3 fb,vec3 fw,vec3 sb,vec3 sw){vec3 d=sw-sb;float n=dot(d,d);return n<.0004?0.:clamp(dot(fw-fb,d)/n,0.,1.);}
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  vec4 ab=texelFetch(tAb,p,0),eb=texelFetch(tEb,p,0);
  vec3 sab=texelFetch(tSAb,p,0).rgb,seb=texelFetch(tSEb,p,0).rgb;
  float ta=through(ab.rgb,texelFetch(tAw,p,0).rgb,sab,texelFetch(tSAw,p,0).rgb),te=through(eb.rgb,texelFetch(tEw,p,0).rgb,seb,texelFetch(tSEw,p,0).rgb);
  oT=vec4(ta,te,0.,1.);
  oA=vec4(ab.rgb-ta*sab,ab.a);
  oE=vec4(eb.rgb-te*seb,eb.a);
}`,Xt=`#version 300 es
precision highp float;
layout(location=0) out vec4 o0;
layout(location=1) out vec4 o1;
uniform sampler2D tBaseA,tBaseE,tT,tRealA,tRealE;
uniform ivec2 uAt;
uniform bool uJudge,uLit;
${qt}
void main(){
  vec3 col,emit;
  alone(col,emit);
  ivec2 q=ivec2(gl_FragCoord.xy)-uAt;
  vec2 T=texelFetch(tT,q,0).rg;
  vec4 a=texelFetch(tBaseA,q,0),e=texelFetch(tBaseE,q,0);
  o0=vec4(a.rgb+T.r*col,a.a);
  o1=vec4(e.rgb+T.g*emit,e.a);
  if(uJudge){
    vec3 d=abs(o0.rgb-texelFetch(tRealA,q,0).rgb);
    if(uLit) d=max(d,abs(o1.rgb-texelFetch(tRealE,q,0).rgb));
    if(max(d.r,max(d.g,d.b))<=.06) discard;
    o0=vec4(1.);
  }
}`,Zt=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D tRest,tTo,tMid;
uniform ivec2 uAt;
uniform int uWhat;
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  float r=texelFetch(tRest,p+uAt,0).r,t=texelFetch(tTo,p,0).r,m=texelFetch(tMid,p,0).r,went=abs(t-r);
  if(went<=.004) discard;
  if(uWhat==1&&abs(m-(r+t)*.5)<=max(.02,went*.08)) discard;
  o=vec4(1.);
}`,Qt=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D tRestA,tToA,tMidA,tRestE,tToE,tMidE;
uniform ivec2 uAt;
uniform int uWhat;
float most(vec4 v){return max(max(v.r,v.g),max(v.b,v.a));}
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  vec4 r=texelFetch(tRestA,p+uAt,0),t=texelFetch(tToA,p,0),m=texelFetch(tMidA,p,0);
  vec4 re=texelFetch(tRestE,p+uAt,0),te=texelFetch(tToE,p,0),me=texelFetch(tMidE,p,0);
  if(max(most(abs(t-r)),most(abs(te-re)))<=.004) discard;
  if(uWhat==1&&max(most(abs(sqrt(m)-sqrt((r+t)*.5))),most(abs(sqrt(me)-sqrt((re+te)*.5))))<=.04) discard;
  o=vec4(1.);
}`,$t=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D tA,tB,tC,tHalf,tRoom,tE,tDFG,tT,tU;
uniform highp sampler2DArray tBrush;
uniform vec4 uMap,uFrame,uBody;
uniform vec2 uCss,uShift;
uniform bool uLinear;
// Glass with a face of its own, as the engine reads it: see PANE_FIELDS in maps.ts.
uniform int uPanes;
uniform float uPane[144];
uniform vec3 uKey,uCam,uRoomColor;
uniform float uDpr,uPeak,uFace,uLift,uRoom,uLamp,uLampSoft,uLampHead,uFill,uPageShade;
// The player's own: map px a mm, the height eight bits cover, and whether anything glows.
uniform float uPx,uMost;
// What glows: nothing, over the canvas, or over the maps.
uniform int uGlows;
uniform int uPoints;
uniform vec4 uPoint[4];
uniform vec3 uPointColor[4];
uniform vec4 uTorch,uBeam,uCone;
uniform vec3 uAim,uTint;
// A debug view: one of the maps as it is, past a split if there is one (mm across the canvas), or else in a torch's pool.
uniform int uDebug;
uniform float uSplit;
// Seen from off straight-on: how far the eye has gone from where it rests, mm, and a body turning over, as the engine has them.
uniform vec2 uLean,uSpin,uRound;
uniform vec3 uOwn;
const float MM=.25,PI=3.14159265,EXPOSURE=.62;
#define AT(uv) ((uv)*uMap.xy+uMap.zw)
${kt}
${dt}
float rnd(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
vec2 onMap(vec2 mm){return AT(mm/(uCss*MM));}
// What a view ray meets, and under what stands clear as the plate has it. The pack's heights are whole right out to an edge, and a ray
// that landed on one where there's hardly any cover would show the page through the wall: thinned by cover again, as the plate's are.
float topOf(vec2 uv){vec2 t=AT(uv);return textureLod(tB,t,0.).a*uMost*max(textureLod(tA,t,0.).a,.25);}
float underOf(vec2 uv){return textureLod(tU,AT(uv),0.).r;}
float rise(vec2 uv,float l){return textureLod(tHalf,AT(uv),max(l-1.,0.)).r;}
${ft}
// At rest the player sees every point from right over it, so a ray leans only by how far the eye has gone from there: the same all over
// the face, and nothing when it hasn't.
vec2 viewSlope(vec2 at){return -uLean/(uCam.z-uFace);}
float nearTop(vec2 s){return uPeak;}
// A turning body takes the room round with it the other way, and a wall that looks out past the room's plane sees the room again.
vec3 inRoom(vec3 r){
  vec3 o=vec3(r.x*uRound.y-r.z*uRound.x,r.y,r.x*uRound.x+r.z*uRound.y);
  if(uSpin.y>0.) o.z=abs(o.z);
  return o;
}
float D(float NoH,float ToH,float BoH,float at,float ab){float a2=at*ab;vec3 f=vec3(ab*ToH,at*BoH,a2*NoH);float w=a2/dot(f,f);return a2*w*w/PI;}
float V(float NoV,float NoL,float a){float a2=a*a;return .5/max(NoL*sqrt(NoV*NoV*(1.-a2)+a2)+NoV*sqrt(NoL*NoL*(1.-a2)+a2),.0005);}
// The lamp is a soft one on the surface itself, as the engine's: its highlight is as wide as it looks, and dimmer for it. Glass and a
// coat over it take the lamp as it is.
vec3 lobe(vec3 n,vec3 v,vec3 l,vec3 rad,vec3 dif,vec3 f0,float rough,float an,vec3 T,float soft){
  float NoL=dot(n,l);
  if(NoL<=0.) return vec3(0.);
  vec3 h=normalize(v+l);
  float NoV=max(dot(n,v),.02),NoH=max(dot(n,h),0.),VoH=max(dot(v,h),0.),r2=max(rough*rough,.0016),a=min(r2+soft,1.),k=soft>0.?min((r2+.04)/a,1.):1.;
  // Grooves spread a highlight across them and hardly along them.
  float at=max(a*(1.-an),.0008),ab=max(a*(1.+an),.0008);
  T=normalize(T-n*dot(T,n));
  vec3 F=f0+(1.-f0)*pow(1.-VoH,5.);
  // The viewer's own head is in the way of a lamp right behind it.
  float head=1.-uLampHead*smoothstep(.97,1.,n.z)*smoothstep(.9,.99,h.z);
  return (dif/PI*(1.-F)*NoL+F*D(NoH,dot(T,h),dot(cross(n,T),h),at,ab)*V(NoV,NoL,a)*k*k*head*NoL)*rad;
}
// Eight taps toward the lamp through the heights, as the engine's march goes but in its first eighth of the steps: each further off than
// the last by the same share, read as wide as its step, and started a little apart from pixel to pixel so the steps don't scallop an edge.
// How near the ray comes to what stands in its way, against how far along it is, is how soft the edge is there.
// Past the edge of the maps there's nothing, and what was blurred out of them runs out as it would into an empty pixel beyond the last
// at that size: left to itself the last pixel goes on for ever. The maps stop close to what's drawn: see \`Renderer\`.
float past(vec2 uv,float lod){float t=exp2(lod);vec2 f=clamp(.5-max(-uv,uv-1.)*vec2(textureSize(tA,0))/t,0.,1.);return f.x*f.y;}
float shadow(vec2 pm,float h0,vec3 L,float soft){
  float reach=min((uPeak-h0)/max(L.z,.1),40.);
  if(reach<=.3) return 1.;
  float k=1.,j=.5,grow=pow(reach/.25,1./8.);
  for(int i=0;i<8;i++){
    float t=.25*pow(grow,float(i)+j);
    vec3 q=vec3(pm,h0+.03)+L*t;
    vec2 qu=onMap(q.xy);
    float ql=clamp(log2(t*(grow-1.)*uPx)-2.,0.,4.),gap=q.z-textureLod(tHalf,qu,ql).r*past(qu,ql+1.);
    k=min(k,clamp(.5+gap/(t*soft+.05),0.,1.));
  }
  return k*k*(3.-2.*k);
}
// A torch, as the engine has it. How far off its axis a point is, where 1 is the edge of its beam, and what lands there: a hot core, a
// flood that eases off towards the edge with the reflector's rings in it, and a wide spill past that from the bulb itself.
float offAxis(vec3 P){return acos(clamp(dot(normalize(P-uTorch.xyz),uAim),-1.,1.))/uCone.x;}
float pool(vec3 P,float x){
  float near=uCone.y/length(P-uTorch.xyz),spill=1.-smoothstep(.6,2.6,x);
  return (uBeam.x*exp(-x*x*9.)+uBeam.y*(1.-smoothstep(uBeam.z,1.,x))*(1.+uCone.z*sin(x*26.))+uBeam.w*spill*spill)*near*near*uTorch.w;
}
// What a direction sees of the room from here: the eye is over the object's middle, so the far ends look a little outward.
vec3 facing(vec3 r,vec2 pm){return vec3(r.xy+(pm-uBody.xy*MM)/(2.4*max(uBody.z,uBody.w)*MM)*r.z,r.z);}
// The room as grooves smear it: right across them and hardly along them.
float brushed(vec3 r,vec2 b,float reach,float thin){
  float t=fract(atan(b.y,b.x)/PI)*${8 .toFixed(1)},l=floor(t),m=clamp(log2(reach/${Pt[0].toFixed(2)}),0.,${(Pt.length-1.01).toFixed(2)}),q=floor(m);
  float lod=clamp(log2(thin/${Ft.toFixed(2)}),0.,${3 .toFixed(1)}),f=t-l,g=mod(l+1.,${8 .toFixed(1)});
  vec2 u=oct(normalize(inRoom(r)));
  float x=mix(textureLod(tBrush,vec3(u,q*${8 .toFixed(1)}+l),lod).r,textureLod(tBrush,vec3(u,q*${8 .toFixed(1)}+g),lod).r,f);
  float y=mix(textureLod(tBrush,vec3(u,(q+1.)*${8 .toFixed(1)}+l),lod).r,textureLod(tBrush,vec3(u,(q+1.)*${8 .toFixed(1)}+g),lod).r,f);
  return mix(x,y,m-q);
}
// What's seen at a place on the canvas, where the view ray landed.
vec4 shade(vec2 s){
  vec2 uv=AT(s),pm=s*uCss*MM;
  float lodS=log2(uDpr);
  // A wall has one line of the top to go on, and read sharp that would streak the length of it.
  float wall=(1.+lodS)*gSide;
  vec4 a=textureLod(tA,uv,wall),b=textureLod(tB,uv,wall),c=textureLod(tC,uv,0.);
  float inside=step(0.,uv.x)*step(uv.x,1.)*step(0.,uv.y)*step(uv.y,1.),cov=gGround?0.:gHit?1.:a.a*inside;
  float h=gHit?gZ:b.a*uMost*inside;
  vec3 n=vec3(b.rg*2.-1.,0.);n.z=sqrt(max(1.-dot(n.xy,n.xy),.01));
  if(gUnder) n.z=-n.z;
  vec3 side=vec3(gFace,.04);
  if(gWall) n=normalize(mix(n,side,gSide));
  vec3 P=vec3(pm,h),L=normalize(uKey-P),v=normalize(uCam-P);
  // Seen from behind its own plane. Turned, a lamp really can be down at the horizon, and behind.
  if(uSpin.x<0.) v.xz=-v.xz;
  if(uSpin.y<=0.) L=normalize(vec3(L.xy,max(L.z,.6*length(L.xy))));
  vec3 lamp=uRoomColor*uLamp*uRoom,amb=uRoomColor*uRoom*uFill*mix(vec3(.62,.76,1.),vec3(1.),smoothstep(.04,.4,uRoom));
  // The page under it: what the lamp loses to the body, and a little more close in, where the room can't see past it.
  float shA=0.;
  if(cov<.996&&uLift<uFace&&uSpin.x>0.){
    // In a dark room what falls on the page falls from the torch.
    vec3 Lg=uTorch.w>0.&&uRoom<.5?normalize(uTorch.xyz-vec3(pm,0.)):L,Lp=normalize(vec3(Lg.xy,max(Lg.z,.75*length(Lg.xy))));
    float shp=shadow(pm,uLift,Lp,.6);
    // What stands 1mm or more crowds the light out, measured against the body.
    float deep=4./max(uFace,4.),crowd=min(textureLod(tHalf,uv,2.2+lodS).r*deep,textureLod(tA,uv,3.2+lodS).a)*past(uv,3.2+lodS),crowd2=min(textureLod(tHalf,uv,3.8+lodS).r*deep,textureLod(tA,uv,4.8+lodS).a)*past(uv,4.8+lodS);
    vec2 at=s*uCss,toEdge=min(at-uFrame.xy,uFrame.zw-at);
    float loss=(1.-(1.-min((1.-shp)*.38*uPageShade,.9))*(1.-crowd*.3)*(1.-crowd2*.22))*smoothstep(0.,36.,min(toEdge.x,toEdge.y))*mix(.45,1.,smoothstep(0.,.5,uRoom));
    // A body turning over lifts off the page, and comes back down.
    if(uSpin.y>0.) loss*=uRound.y*uRound.y;
    shA=1.-pow(1.-loss,1./2.2);
  }
  vec3 rgb=vec3(0.);
  if(cov>.004){
    float sh=uRoom>.15&&gSide<1.?mix(shadow(pm,h,L,.34),1.,gSide):1.,ao=mix(b.b,1.,gSide);
    // A dark metal is a clear oxide over metal, and that oxide reflects like anything else.
    vec3 alb=mix(a.rgb/max(a.a,.001),vec3(.6,.58,.55),c.a),dif=alb*(1.-c.g),f0=mix(vec3(.04),alb+.04*(1.-alb),c.g);
    // Which way its grain runs, if it has one, as the plate keeps it. A panel's mark is 2, and a real tangent at most 1.
    vec2 tv=(textureLod(tT,uv,0.).rg*255.-127.)/127.;
    // A grain on the top runs off the edge of it, so it says nothing about a wall.
    float an=clamp(length(tv),0.,.92)*(1.-gSide);
    vec3 T=normalize(mix(vec3(an>.001?normalize(tv):vec2(1.,0.),0.),vec3(0.,0.,1.),gSide));
    float rough=clamp(c.r,.03,1.),NoV=max(n.z,.02),polish=1.-smoothstep(.1,.4,rough);
    // Where the surface turns faster than a pixel, what it mirrors is spread over that turn.
    vec3 nx=dFdx(n),ny=dFdy(n);
    rough=sqrt(sqrt(min(rough*rough*rough*rough+min(.5*(dot(nx,nx)+dot(ny,ny)),.3),1.)));
    rgb=lobe(n,v,L,lamp,dif,f0,rough,an,T,uLampSoft)*sh*mix(1.,ao,.3);
    // Flashes and flames, and what glows on the devices round this one, as the engine lights by them: each falls off as its distance
    // squared from something its size, a size under nothing is a glowing face flat in the page, which gives most straight out and
    // none along itself, and only the strongest casts a shadow.
    for(int i=0;i<4;i++){
      if(i>=uPoints) break;
      vec3 d=uPoint[i].xyz-P;
      float r2=abs(uPoint[i].w),fall=r2/(r2+dot(d,d));
      if(uPoint[i].w<0.) fall*=max(-d.z,0.)*inversesqrt(max(dot(d,d),1e-6));
      vec3 Lq=normalize(d);
      float sp=mix(1.,ao,.3);
      if(i==0&&gSide<1.) sp*=shadow(pm,h,Lq,.3);
      rgb+=lobe(n,v,Lq,uPointColor[i]*fall*(PI/EXPOSURE),dif,f0,rough,an,T,0.)*sp;
    }
    // A torch is a second lamp, held off to one side and aimed at the pointer. What it throws comes back off everything near its pool.
    float beam=0.,st=0.;
    vec3 Lt=vec3(0.,0.,1.),beamTint=vec3(0.);
    if(uTorch.w>0.){
      float x=offAxis(P),bounce=1.-smoothstep(0.,3.,x);
      beam=pool(P,x);
      // A reflector's rim runs warmer than its centre.
      beamTint=uTint*mix(vec3(1.),vec3(1.,.92,.78),smoothstep(.6,1.,x))*10.;
      if(beam>.002){
        Lt=normalize(uTorch.xyz-P);
        st=(gSide<1.?mix(shadow(pm,h,Lt,.2),1.,gSide):1.)*mix(1.,ao,.3);
        // Close overhead, it would lay a sheen over a whole black dial. Only metal takes all of it.
        rgb+=lobe(n,v,Lt,beamTint*beam,dif,f0*mix(.15,1.,smoothstep(.04,.3,max(f0.r,max(f0.g,f0.b)))),rough,an,T,0.)*st;
        // Brighteners show in what's pale: paper, white plastic, white print.
        if(uCone.w>0.) rgb+=vec3(.6,.78,1.)*uCone.w*beam*st*max(dot(n,Lt),0.)*smoothstep(.25,.8,min(alb.r,min(alb.g,alb.b)))*(1.-c.g);
      }
      amb+=beamTint*(beam*.055+bounce*bounce*uTorch.w*.014);
    }
    // The room: what's mirrored of it, by how rough, and the plain light matt things take.
    vec2 ab=textureLod(tDFG,vec2(NoV,rough),0.).rg;
    vec3 F=(f0*ab.x+ab.y)*(1.+f0*(1./(ab.x+ab.y)-1.));
    vec3 Rr=facing(reflect(-v,n),pm);
    float kept=ao*clamp(ao+NoV-.6,.15,1.)*mix(1.,sh,.3);
    // Smooth metal looks one way, so only what's on that line can hide the room from it: three reads of the heights along it, and a
    // rolled edge that looks out past everything keeps all the room.
    float ln=max(length(Rr.xy),.01),sharp=c.g*polish*(1.-smoothstep(.6,.9,Rr.z));
    if(sharp>0.){
      float up=0.;
      for(float t=.5;t<5.;t*=3.) up=max(up,textureLod(tHalf,onMap(pm+Rr.xy/ln*t),0.).r-max(h+t*Rr.z/ln,0.));
      kept=mix(kept,1.,sharp*(1.-smoothstep(.05,.4,up)));
    }
    float seen=textureLod(tRoom,oct(normalize(inRoom(Rr))),rough*6.).r;
    if(an>.001){
      vec3 Tn=normalize(T-n*dot(T,n));
      float aa=rough*rough;
      seen=mix(seen,brushed(Rr,cross(n,Tn).xy,aa*(1.+an),aa*(1.-an)),smoothstep(0.,.2,an));
    }
    rgb+=seen*amb*F*kept;
    rgb+=dif*textureLod(tRoom,oct(normalize(inRoom(n))),6.).a*amb*ao*.45;
    rgb+=dif*textureLod(tRoom,oct(normalize(inRoom(n))),2.).b*amb*ao*2.5;
    // What the room no longer reaches, nearby surfaces hand on in their own colour.
    vec4 near=textureLod(tA,uv,3.+lodS);
    rgb+=dif*near.rgb/max(near.a,.1)*(1.-ao)*.34;
    // What glows, as it is: exposure is for what the lamps light.
    if(uGlows>0) rgb+=textureLod(tE,uv,0.).rgb*4.*(1.-c.a)*(.35+.65*pow(clamp(n.z,0.,1.),4.))/EXPOSURE;
    if(c.b>.01||uPanes>0){
      // A coat lies on what it coats, as smooth as that is in the large. A pane is a thing of its own over what's under it: nothing below
      // shades it, it's seen and lit where it is, on top, and each one adds a reflection. The pass after the last is the surface's own coat.
      vec4 bs=textureLod(tB,uv,lodS+.5);
      vec3 ns=vec3(bs.rg*2.-1.,0.);ns.z=sqrt(max(1.-dot(ns.xy,ns.xy),.01));
      if(gUnder) ns.z=-ns.z;
      if(gWall) ns=normalize(mix(ns,side,gSide));
      vec2 at=s*uCss;
      for(int i=0;i<=uPanes;i++){
        vec3 nc=ns,tint=vec3(1.),vc=v,Lc=L;
        float f0c=.04,gr=.05,hide=ao,lit=sh,amount=c.b;
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
          float cw=uPane[k+15];
          if(cw>0.) drop+=uPane[k+16]*smoothstep(-.5,.5,(cw+d)*uDpr);
          nc=normalize(vec3(out_*drop+p/half_*uPane[k+7],1.));
          vec3 Pc=vec3(pm,uPane[k+14]);
          vc=normalize(uCam-Pc);
          Lc=normalize(uKey-Pc);Lc=normalize(vec3(Lc.xy,max(Lc.z,.6*length(Lc.xy))));
          f0c=uPane[k+17];
          tint=vec3(uPane[k+9],uPane[k+10],uPane[k+11]);
          amount=uPane[k+12]*clamp(.5-d,0.,1.);
          gr=.02;
          hide=lit=1.;
        }else if(c.b<=.01) break;
        float Fc=(f0c+(1.-f0c)*pow(1.-max(dot(nc,vc),.02),5.))*amount;
        rgb*=1.-Fc;
        rgb+=textureLod(tRoom,oct(normalize(inRoom(facing(reflect(-vc,nc),pm)))),max(gr-.02,0.)*6.).g*amb/max(uFill,.1)*Fc*hide*tint;
        rgb+=lobe(nc,vc,Lc,vec3(1.,.95,.86)*.6923*lamp,vec3(0.),vec3(f0c),gr,0.,vec3(1.,0.,0.),0.)*lit*amount*tint;
        if(beam>.002) rgb+=lobe(nc,vc,i<uPanes?normalize(uTorch.xyz-vec3(pm,uPane[i*18+14])):Lt,beamTint*beam,vec3(0.),vec3(f0c),gr,0.,vec3(1.,0.,0.),0.)*(i<uPanes?1.:st)*amount*tint;
      }
    }
    // A picture the stage keeps is light, for its camera. One copied to a canvas of its own is finished here.
    rgb*=gNear*EXPOSURE;
    if(!uLinear) rgb=encode(neutral(rgb));
    if(uDebug>0){
      // A map shown as it is: what's lit stops at the split, or at the edge of the torch's pool.
      vec3 lit=rgb,m=vec3(clamp(c.r,.03,1.));
      if(uDebug==1) m=pow(alb,vec3(1./2.2));
      // The face is grey, lighter up to the tallest thing on it and as much darker below, so a thick body reads as well as a thin one.
      else if(uDebug==2) m=vec3(clamp(.5+.5*(h-uFace)/max(uPeak-uFace,1.),0.,1.));
      else if(uDebug==3) m=n*.5+.5;
      else if(uDebug==5) m=vec3(c.g);
      else if(uDebug==6) m=uGlows>0?pow(clamp(textureLod(tE,uv,0.).rgb*4.,0.,1.),vec3(1./2.2)):vec3(0.);
      else if(uDebug==7) m=vec3(b.b);
      if(uLinear) m=decode(m);
      rgb=uSplit>=0.?mix(lit,m,step(uSplit,pm.x)):uTorch.w>0.?mix(m,lit,smoothstep(.94,1.,offAxis(P))):m;
    }
  }
  return vec4(rgb*cov,cov+(1.-cov)*shA);
}
void main(){
  if(uLean==vec2(0.)&&uSpin.y<=0.) o=shade(vUv);
  else{
    vec2 uv=land(vUv);
    // Where the landing point jumps, the ray has crossed an edge, and one ray per pixel leaves it stepped. Only those pixels pay for more.
    vec2 jump=(abs(dFdx(uv))+abs(dFdy(uv)))*uCss*uDpr/vec2(abs(uSpin.x),1.);
    if(max(jump.x,jump.y)<2.2) o=shade(uv);
    else{
      vec2 px=1./(uCss*uDpr);
      o=(shade(land(vUv+px*vec2(-.125,-.375)))+shade(land(vUv+px*vec2(.375,-.125)))
        +shade(land(vUv+px*vec2(.125,.375)))+shade(land(vUv+px*vec2(-.375,.125))))*.25;
    }
  }
  if(!uLinear) o.rgb+=(rnd(gl_FragCoord.xy+uShift)-.5)/255.*o.a;
}`,en=e=>({x:e.x-24,y:e.y-24,w:e.w+48,h:e.h+48}),tn=e=>e.go?e.go.x!==0||e.go.y!==0||e.go.turn!==0:e.f!==0,nn=(e,t)=>Math.floor(Math.log2(Math.max(e,t)))+1,rn=(e,t)=>e.x<t.x+t.w&&t.x<e.x+e.w&&e.y<t.y+t.h&&t.y<e.y+e.h,an=e=>2*(e.w*e.h*(8+(e.A?4:0)+(e.E?4:0)+(e.T?2:0))+(e.w>>1)*(e.h>>1)*2),on=e=>e.w*e.h*12+(e.w>>1)*(e.h>>1)*2,sn=class{gl;stats={lights:0,moves:0,shows:0,crops:0,cropBytes:0,packs:0,packMs:0};packs=new Map;light=null;packer=null;heights=null;grain=null;layer=null;judge=null;glowJudge=null;carry=null;apart=null;cover=null;alone=null;through=null;shower=null;made=0;scratch=null;broken=!1;constructor(e){this.gl=e}ready(){return this.programs()}programs(){if(this.light)return!0;if(this.broken)return!1;let{gl:e}=this;try{this.light=U(e,lt,$t).finish(),this.packer=U(e,q,Rt).finish(),this.heights=U(e,q,zt).finish(),this.grain=U(e,q,Vt).finish(),this.layer=U(e,q,Bt).finish(),this.judge=U(e,q,Zt).finish(),this.glowJudge=U(e,q,Qt).finish(),this.carry=U(e,q,Ht).finish(),this.apart=U(e,q,Wt).finish(),this.cover=U(e,q,Gt).finish(),this.alone=U(e,Kt,Jt).finish(),this.through=U(e,q,Yt).finish(),this.shower=U(e,Kt,Xt).finish()}catch(e){return this.light=this.packer=this.heights=this.grain=this.layer=this.judge=this.glowJudge=this.carry=this.apart=this.cover=this.alone=this.through=this.shower=null,this.broken=!0,console.warn(`player: its programs didn't link, so the page stays plain: ${e.message.split(`
`)[0]}`),!1}let t=(t,n)=>{e.useProgram(t.program),n.forEach((n,r)=>t.u[n]&&e.uniform1i(t.u[n],r))};return t(this.packer,[`tA`,`tH`,`tS`,`tC`,`tO`,`tM`,`tD`,`tN`]),t(this.heights,[`tA`,`tH`,`tD`]),t(this.grain,[`tA`,`tT`]),t(this.layer,[`tB`,`tC`,`tB0`,`tC0`]),t(this.judge,[`tRest`,`tTo`,`tMid`]),t(this.glowJudge,[`tRestA`,`tToA`,`tMidA`,`tRestE`,`tToE`,`tMidE`]),t(this.carry,[`tU0`,`tR0`,`tU1`,`tR1`,`tMask`,`tOver`,`tF0`,`tF1`]),t(this.apart,[`tA`,`tA0`,`tB`,`tB0`,`tC`,`tC0`]),t(this.cover,[`tA`,`tAF`,`tB`,`tBF`,`tC`,`tCF`,`tMask`]),t(this.alone,[`uScreen`]),t(this.through,[`tAb`,`tEb`,`tAw`,`tEw`,`tSAb`,`tSEb`,`tSAw`,`tSEw`]),t(this.shower,[`uScreen`,`tBaseA`,`tBaseE`,`tT`,`tRealA`,`tRealE`]),t(this.light,[`tA`,`tT`,`tC`,`tHalf`,`tRoom`,`tE`,`tB`]),e.uniform1i(this.light.u.tDFG,14),e.uniform1i(this.light.u.tBrush,15),e.uniform1i(this.light.u.tU,12),!0}take(e,t,n,r){return!e.tex||!this.programs()?null:(this.pack(e,r.relief),this.stats.lights++,this.light)}pack(e,t){let{gl:n}=this,r=e.tex,i=e.map,a=this.packs.get(e);if(a&&(a.of!==r||a.w!==i.w||a.h!==i.h)&&(this.drop(e),a=void 0),a&&a.at===e.painted&&a.relief===t)return;let o=performance.now();if(!a){n.activeTexture(n.TEXTURE0);let o=this.make(n.RGBA8,i.w,i.h,!0),s=this.make(n.RGBA8,i.w,i.h,!1),c=this.make(n.R16F,Math.max(i.w>>1,1),Math.max(i.h>>1,1),!0),l=this.make(n.RG8,i.w,i.h,!1),u=n.createFramebuffer(),d=n.createFramebuffer(),f=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,u),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,o,0),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT1,n.TEXTURE_2D,s,0),n.drawBuffers([n.COLOR_ATTACHMENT0,n.COLOR_ATTACHMENT1]),n.bindFramebuffer(n.FRAMEBUFFER,d),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,c,0),n.bindFramebuffer(n.FRAMEBUFFER,f),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,l,0),this.packs.set(e,a={id:++this.made,of:r,at:-1,w:i.w,h:i.h,B:o,C:s,half:c,T:l,fbo:u,hfbo:d,tfbo:f,most:1,relief:t,moved:new Map,crops:new Set,screens:new Set})}a.relief=t,a.most=Math.max(Math.ceil(e.peak+1),1),this.drawing(()=>{this.draw(e,a,null);for(let t of a.moved.values())this.lay(e,a,t);this.mips(a)}),a.at=e.painted,this.stats.packs++,this.stats.packMs+=performance.now()-o}make(e,t,n,r){let{gl:i}=this,a=i.createTexture();return i.bindTexture(i.TEXTURE_2D,a),i.texStorage2D(i.TEXTURE_2D,r?nn(t,n):1,e,t,n),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,r?i.LINEAR_MIPMAP_LINEAR:i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),a}units(...e){let{gl:t}=this;e.forEach((e,n)=>{t.activeTexture(t.TEXTURE0+n),t.bindTexture(t.TEXTURE_2D,e)})}drawing(e){let{gl:t}=this,n=t.isEnabled(t.BLEND),r=t.isEnabled(t.SCISSOR_TEST);t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),e(),t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),this.units(null,null,null,null,null,null,null,null),t.activeTexture(t.TEXTURE0),n&&t.enable(t.BLEND),r&&t.enable(t.SCISSOR_TEST)}draw(e,t,n){let{gl:r}=this,i=e.tex,a=e.map,o=e.spec,s=this.packer,c=s.u;i.S&&(r.disable(r.BLEND),n?r.enable(r.SCISSOR_TEST):r.disable(r.SCISSOR_TEST),r.useProgram(s.program),this.units(i.A,i.H,i.S,i.C,i.O,i.M,i.D,i.N??null),r.uniform4f(c.uMap,o.pw/a.w,o.ph/a.h,-a.x/a.w,-a.y/a.h),r.uniform1f(c.uMm,o.cw/o.pw*.25),r.uniform1f(c.uMost,t.most),r.uniform1i(c.uRelief,t.relief&&i.D?1:0),r.uniform1i(c.uSplit,+!!i.N),r.uniform1f(c.uLod,Math.log2(o.dpr)+.5),r.bindFramebuffer(r.FRAMEBUFFER,t.fbo),r.viewport(0,0,a.w,a.h),n&&r.scissor(n.x,n.y,n.w,n.h),r.drawArrays(r.TRIANGLE_STRIP,0,4),r.useProgram(this.heights.program),r.uniform1i(this.heights.u.uRelief,t.relief&&i.D?1:0),this.units(i.A,i.H,i.D),r.bindFramebuffer(r.FRAMEBUFFER,t.hfbo),r.viewport(0,0,Math.max(a.w>>1,1),Math.max(a.h>>1,1)),n&&r.scissor(n.x>>1,n.y>>1,n.w>>1,n.h>>1),r.drawArrays(r.TRIANGLE_STRIP,0,4),r.useProgram(this.grain.program),r.uniform1i(this.grain.u.uSplit,+!!i.N),this.units(i.A,i.N??i.H),r.bindFramebuffer(r.FRAMEBUFFER,t.tfbo),r.viewport(0,0,a.w,a.h),n&&r.scissor(n.x,n.y,n.w,n.h),r.drawArrays(r.TRIANGLE_STRIP,0,4),this.units(null,null,null,null,null,null,null,null))}lay(e,t,n){let{gl:r}=this,i=this.layer;r.disable(r.BLEND),r.enable(r.SCISSOR_TEST);for(let a of n){let{crop:n,f:o}=a;!n.dead&&n.B0&&(n.mask?this.carried(e,t,a):(r.useProgram(i.program),r.uniform1f(i.u.uF,o),this.units(n.B,n.C,n.B0,n.C0),r.uniform1i(i.u.uHalf,0),r.uniform2i(i.u.uAt,n.x,n.y),r.bindFramebuffer(r.FRAMEBUFFER,t.fbo),r.viewport(0,0,t.w,t.h),r.scissor(n.x,n.y,n.w,n.h),r.drawArrays(r.TRIANGLE_STRIP,0,4),this.units(n.half,null,n.half0,null),r.uniform1i(i.u.uHalf,1),r.uniform2i(i.u.uAt,n.x>>1,n.y>>1),r.bindFramebuffer(r.FRAMEBUFFER,t.hfbo),r.viewport(0,0,Math.max(t.w>>1,1),Math.max(t.h>>1,1)),r.scissor(n.x>>1,n.y>>1,n.w>>1,n.h>>1),r.drawArrays(r.TRIANGLE_STRIP,0,4),this.glow(e,a)))}r.disable(r.SCISSOR_TEST),this.units(null,null,null,null)}glow(e,{crop:t,f:n}){let r=e.tex;if(!r||t.dead||t.mask||!t.A||!t.A0)return;let i=!!(t.E&&t.E0&&r.E),{gl:a}=this,o=this.layer,s=e.map,c=this.scratch??=a.createFramebuffer();a.useProgram(o.program),a.uniform1f(o.u.uF,n),a.uniform1i(o.u.uHalf,0),a.uniform2i(o.u.uAt,t.x,t.y),this.units(t.A,t.E,t.A0,t.E0),a.bindFramebuffer(a.FRAMEBUFFER,c),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,r.A,0),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT1,a.TEXTURE_2D,r.E,0),a.drawBuffers([a.COLOR_ATTACHMENT0,i?a.COLOR_ATTACHMENT1:a.NONE]),a.viewport(0,0,s.w,s.h),a.enable(a.SCISSOR_TEST),a.scissor(t.x,t.y,t.w,t.h),a.drawArrays(a.TRIANGLE_STRIP,0,4),this.units(null,null,null,null),a.activeTexture(a.TEXTURE0),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT1,a.TEXTURE_2D,null,0),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,null,0),a.drawBuffers([a.COLOR_ATTACHMENT0]),a.bindTexture(a.TEXTURE_2D,r.A),a.generateMipmap(a.TEXTURE_2D),a.bindTexture(a.TEXTURE_2D,null)}carried(e,t,{crop:n,go:r}){let{gl:i}=this,a=this.carry,o=e.tex,s=e.spec,c=e.map,l=s.pw/s.cw;if(!r||!n.mask||!n.over||!n.A||!n.A0||!n.T||!n.T0)return;i.useProgram(a.program),i.uniform2f(a.u.uGo,r.x*l,r.y*l),i.uniform2f(a.u.uPin,r.pin[0]*l-c.x-n.x,r.pin[1]*l-c.y-n.y),i.uniform1f(a.u.uTurn,r.turn);let u=n.toward,d=u&&n.FB?Math.min(Math.max((r.x*l*u[0]+r.y*l*u[1])/(u[0]*u[0]+u[1]*u[1]),0),1):0;u&&i.uniform2f(a.u.uFar,u[0],u[1]);let f=(e,r,o,s,c,l,u,f=null,p=null)=>{i.bindFramebuffer(i.FRAMEBUFFER,e);let m=r<1?n.x>>1:n.x,h=r<1?n.y>>1:n.y,g=r<1?n.w>>1:n.w,_=r<1?n.h>>1:n.h;i.viewport(0,0,r<1?Math.max(t.w>>1,1):t.w,r<1?Math.max(t.h>>1,1):t.h),i.scissor(m,h,g,_),i.uniform2i(a.u.uAt,m,h),i.uniform1f(a.u.uScale,r),i.uniform2i(a.u.uKind,o[0],o[1]),i.uniform1f(a.u.uW,f?d:0),this.units(s,c,l??s,u??c,n.mask,n.over,f,p??f),i.drawArrays(i.TRIANGLE_STRIP,0,4)};f(t.fbo,1,[1,0],n.B,n.B0,n.C,n.C0,n.FB,n.FC),f(t.hfbo,.5,[0,0],n.half,n.half0,null,null,n.FH),f(t.tfbo,1,[2,0],n.T,n.T0,null,null);let p=this.scratch??=i.createFramebuffer();i.bindFramebuffer(i.FRAMEBUFFER,p),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,o.A,0),f(p,1,[0,0],n.A,n.A0,null,null,n.FA),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,null,0),this.units(null,null,null,null,null,null,null,null),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,o.A),i.generateMipmap(i.TEXTURE_2D),i.bindTexture(i.TEXTURE_2D,null)}toward(e,t,n){let{gl:r}=this,i=e.spec.pw/e.spec.cw,a={x:0,y:0,w:t.w,h:t.h},o={x:0,y:0,w:t.w>>1,h:t.h>>1};Object.assign(t,{FB:this.lift(n.crop.B,r.RGBA8,a),FC:this.lift(n.crop.C,r.RGBA8,a),FH:this.lift(n.crop.half,r.R16F,o),FA:this.lift(n.crop.A,r.SRGB8_ALPHA8,a),toward:[n.go.x*i,n.go.y*i]}),this.stats.cropBytes+=on(t)}lift(e,t,n){let{gl:r}=this,i=this.scratch??=r.createFramebuffer();r.activeTexture(r.TEXTURE0);let a=this.make(t,n.w,n.h,!1);return r.bindFramebuffer(r.FRAMEBUFFER,i),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e,0),r.readBuffer(r.COLOR_ATTACHMENT0),r.bindTexture(r.TEXTURE_2D,a),r.copyTexSubImage2D(r.TEXTURE_2D,0,0,0,n.x,n.y,n.w,n.h),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,null,0),r.bindTexture(r.TEXTURE_2D,null),a}grained(e,t){let{gl:n}=this;n.activeTexture(n.TEXTURE0);let r=this.make(n.RG8,t.w,t.h,!1);return n.bindFramebuffer(n.FRAMEBUFFER,e.tfbo),n.readBuffer(n.COLOR_ATTACHMENT0),n.bindTexture(n.TEXTURE_2D,r),n.copyTexSubImage2D(n.TEXTURE_2D,0,0,0,t.x,t.y,t.w,t.h),n.bindTexture(n.TEXTURE_2D,null),r}mips(e){let{gl:t}=this;this.units(e.B,e.half),t.generateMipmap(t.TEXTURE_2D),t.activeTexture(t.TEXTURE0),t.generateMipmap(t.TEXTURE_2D)}plays(e){let t=this.packs.get(e);return!!t&&!!e.tex&&t.of===e.tex}packed(e){return this.packs.get(e)?.id??0}stands(e){let t=this.packs.get(e);return t&&e.tex&&t.of===e.tex?t.half:null}current(e){return this.plays(e)&&this.packs.get(e).at===e.painted}repack(e){let t=this.packs.get(e);return!t||!this.plays(e)||!e.tex?.S?!1:(t.at!==e.painted&&this.drawing(()=>this.pack(e,t.relief)),this.current(e))}boxOf(e,t){let n=e.spec,r=e.map,i=n.pw/n.cw,a=Math.ceil(6*i),o=Math.max(Math.floor(t.x*i)-r.x-a&-2,0),s=Math.max(Math.floor(t.y*i)-r.y-a&-2,0),c=Math.min(Math.ceil((t.x+t.w)*i)-r.x+a+1&-2,r.w&-2),l=Math.min(Math.ceil((t.y+t.h)*i)-r.y+a+1&-2,r.h&-2);return c-o>=2&&l-s>=2?{x:o,y:s,w:c-o,h:l-s}:null}read(e,t,n,r=!1,i=!1){let a=this.packs.get(e),o=this.boxOf(e,r?t:en(t)),s=n&&this.boxOf(e,r?n:en(n));if(!a||!o)return null;let{gl:c}=this,l=null;return this.drawing(()=>{this.draw(e,a,o);let t=[...a.moved.values()].flat().filter(e=>rn(e.crop,o));if(t.length&&this.lay(e,a,t),s){let[t,n,o]=this.cut(a,s),u=e.tex,d=i&&!r,f=this.lift(u.A,c.SRGB8_ALPHA8,s),p=r?this.grained(a,s):null,m=d?this.lift(u.E??u.A,c.SRGB8_ALPHA8,s):null;l={...s,B:t,C:n,half:o,B0:null,C0:null,half0:null,A:f,T:p,A0:null,T0:null,E:m,E0:null,mask:null,over:null,FB:null,FC:null,FH:null,FA:null,toward:null,dead:!1},a.crops.add(l),this.stats.crops++,this.stats.cropBytes+=an(l)/2}}),a.at=e.painted,l}readMid(e,t,n,r=!1){let i=this.packs.get(e),a=this.boxOf(e,en(t)),o=this.boxOf(e,en(n));if(!i||!a||!o)return null;let{gl:s}=this,c=null;return this.drawing(()=>{this.draw(e,i,a);let t=[...i.moved.values()].flat().filter(e=>rn(e.crop,a));t.length&&this.lay(e,i,t);let n=e.tex,l=this.make(s.R16F,o.w>>1,o.h>>1,!1);s.bindFramebuffer(s.FRAMEBUFFER,i.hfbo),s.bindTexture(s.TEXTURE_2D,l),s.copyTexSubImage2D(s.TEXTURE_2D,0,0,0,o.x>>1,o.y>>1,o.w>>1,o.h>>1),s.bindTexture(s.TEXTURE_2D,null);let u=r?this.lift(n.A,s.SRGB8_ALPHA8,o):null;c={half:l,A:u,E:r?n.E?this.lift(n.E,s.SRGB8_ALPHA8,o):u:null}}),i.at=e.painted,c}freeMid(e){let{gl:t}=this;t.deleteTexture(e.half),t.deleteTexture(e.A),e.E!==e.A&&t.deleteTexture(e.E)}cut(e,t){let{gl:n}=this;n.activeTexture(n.TEXTURE0);let r=this.make(n.RGBA8,t.w,t.h,!1),i=this.make(n.RGBA8,t.w,t.h,!1),a=this.make(n.R16F,t.w>>1,t.h>>1,!1);return n.bindFramebuffer(n.FRAMEBUFFER,e.fbo),n.readBuffer(n.COLOR_ATTACHMENT0),n.bindTexture(n.TEXTURE_2D,r),n.copyTexSubImage2D(n.TEXTURE_2D,0,0,0,t.x,t.y,t.w,t.h),n.readBuffer(n.COLOR_ATTACHMENT1),n.bindTexture(n.TEXTURE_2D,i),n.copyTexSubImage2D(n.TEXTURE_2D,0,0,0,t.x,t.y,t.w,t.h),n.readBuffer(n.COLOR_ATTACHMENT0),n.bindFramebuffer(n.FRAMEBUFFER,e.hfbo),n.bindTexture(n.TEXTURE_2D,a),n.copyTexSubImage2D(n.TEXTURE_2D,0,0,0,t.x>>1,t.y>>1,t.w>>1,t.h>>1),n.bindTexture(n.TEXTURE_2D,null),[r,i,a]}readEnd(e,t,n){let r=this.packs.get(e);r&&this.drawing(()=>{if(t&&!t.dead){if([t.B0,t.C0,t.half0]=this.cut(r,t),this.stats.cropBytes+=an(t)/2,!t.T&&e.tex){let{gl:n}=this,r=e.tex;t.A&&(t.A0=this.lift(r.A,n.SRGB8_ALPHA8,t)),t.E&&(t.E0=this.lift(r.E??r.A,n.SRGB8_ALPHA8,t))}else if(t.A&&e.tex){t.A0=this.lift(e.tex.A,this.gl.SRGB8_ALPHA8,t),t.T0=this.grained(r,t);let{gl:i}=this,a=t.mask=this.make(i.R8,t.w,t.h,!1);i.bindFramebuffer(i.FRAMEBUFFER,this.scratch??=i.createFramebuffer()),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,a,0),i.viewport(0,0,t.w,t.h),i.useProgram(this.apart.program),this.units(t.A,t.A0,t.B,t.B0,t.C,t.C0),i.drawArrays(i.TRIANGLE_STRIP,0,4);let o=t.over=this.make(i.R8,t.w,t.h,!1);i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,o,0);let s=n&&!n.crop.dead&&n.crop.A&&n.crop.w===t.w&&n.crop.h===t.h?n:null;if(s){let n=this.cover,r=e.spec.pw/e.spec.cw,o=e.map;i.useProgram(n.program),i.uniform2f(n.u.uGo,s.go.x*r,s.go.y*r),i.uniform2f(n.u.uPin,s.go.pin[0]*r-o.x-t.x,s.go.pin[1]*r-o.y-t.y),i.uniform1f(n.u.uTurn,s.go.turn),this.units(t.A,s.crop.A,t.B,s.crop.B,t.C,s.crop.C,a),i.drawArrays(i.TRIANGLE_STRIP,0,4)}else i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT);i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,null,0),this.units(null,null,null,null,null,null,null),s&&!s.go.turn&&(s.go.x||s.go.y)&&this.toward(e,t,s)}}this.mips(r)})}ask(e,t,n){let r=this.packs.get(e);if(!r||t.dead)return null;let{gl:i}=this,a=this.judge,o=t.w>>1,s=t.h>>1,c=i.createQuery(),l=i.createQuery(),u=t.E&&n.E?[i.createQuery(),i.createQuery()]:null;this.drawing(()=>{let d=i.createRenderbuffer(),f=i.createFramebuffer();i.bindRenderbuffer(i.RENDERBUFFER,d),i.renderbufferStorage(i.RENDERBUFFER,i.R8,o,s),i.bindFramebuffer(i.FRAMEBUFFER,f),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,d),i.viewport(0,0,o,s),i.useProgram(a.program),this.units(r.half,t.half,n.half),i.uniform2i(a.u.uAt,t.x>>1,t.y>>1),[c,l].forEach((e,t)=>{i.uniform1i(a.u.uWhat,t),i.beginQuery(i.ANY_SAMPLES_PASSED,e),i.drawArrays(i.TRIANGLE_STRIP,0,4),i.endQuery(i.ANY_SAMPLES_PASSED)});let p=e.tex;if(u&&p&&t.A&&t.E&&n.A&&n.E){let e=this.glowJudge;i.renderbufferStorage(i.RENDERBUFFER,i.R8,t.w,t.h),i.viewport(0,0,t.w,t.h),i.useProgram(e.program),this.units(p.A,t.A,n.A,p.E??p.A,t.E,n.E),i.uniform2i(e.u.uAt,t.x,t.y),u.forEach((t,n)=>{i.uniform1i(e.u.uWhat,n),i.beginQuery(i.ANY_SAMPLES_PASSED,t),i.drawArrays(i.TRIANGLE_STRIP,0,4),i.endQuery(i.ANY_SAMPLES_PASSED)})}this.units(null,null,null,null,null,null),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindRenderbuffer(i.RENDERBUFFER,null),i.deleteFramebuffer(f),i.deleteRenderbuffer(d)});let d={went:c,bent:l,glow:u,dead:!1};return this.asked.add(d),d}judged(e){let{gl:t}=this;if(e.dead||t.isContextLost())return!1;let n=[e.went,e.bent,...e.glow??[]];if(n.some(e=>!t.getQueryParameter(e,t.QUERY_RESULT_AVAILABLE)))return null;let[r,i,a,o]=n.map(e=>!!t.getQueryParameter(e,t.QUERY_RESULT)),s=r||!!a,c=i||!!o;for(let e of n)t.deleteQuery(e);return this.asked.delete(e),s&&!c}move(e,t,n,r){let i=this.packs.get(e);if(!i||!this.plays(e)||n.some(e=>e.crop.dead||!e.crop.B0))return!1;let a=!r||n.some(tn);return!a&&!i.moved.has(t)||(a?i.moved.set(t,n):i.moved.delete(t),this.stats.moves++,i.at!==e.painted)||this.drawing(()=>{this.lay(e,i,n),this.mips(i)}),!0}unmove(e,t){let n=this.packs.get(e),r=n?.moved.get(t);n&&r&&(n.moved.delete(t),e.tex&&n.of===e.tex&&(r.some(e=>e.crop.A0&&!e.crop.mask&&!e.crop.dead)&&this.drawing(()=>{for(let t of r)this.glow(e,{crop:t.crop,f:0})}),n.at===e.painted&&this.drawing(()=>{for(let t of r)t.crop.mask&&!t.crop.dead&&this.carried(e,n,{crop:t.crop,f:0,go:{x:0,y:0,turn:0,pin:[0,0]}});this.lay(e,n,r.filter(e=>!e.crop.mask).map(e=>({crop:e.crop,f:0})));for(let t of r)this.draw(e,n,t.crop);let t=[...n.moved.values()].flat().filter(e=>r.some(t=>rn(e.crop,t.crop)));t.length&&this.lay(e,n,t),this.mips(n)})))}settle(e){this.packs.get(e)?.moved.clear()}free(e){if(e.dead)return;let{gl:t}=this;e.dead=!0;for(let n of[e.B,e.C,e.half,e.B0,e.C0,e.half0,e.A,e.T,e.A0,e.T0,e.E,e.E0,e.mask,e.over,e.FB,e.FC,e.FH,e.FA])t.deleteTexture(n);this.stats.crops--,this.stats.cropBytes-=an(e)*(e.B0?1:.5)+(e.FB?on(e):0);for(let t of this.packs.values())if(t.crops.delete(e))for(let[n,r]of t.moved)r.some(t=>t.crop===e)&&t.moved.delete(n)}lifts(e,t){let n=this.boxOf(e,t),r=e.tex;if(!n||!r||!this.packs.has(e))return null;let{gl:i}=this,a=null;return this.drawing(()=>{let e=this.lift(r.A,i.SRGB8_ALPHA8,n);a={...n,A:e,E:r.E?this.lift(r.E,i.SRGB8_ALPHA8,n):e,lit:!!r.E}}),a}unlift(e){e&&(this.gl.deleteTexture(e.A),e.E!==e.A&&this.gl.deleteTexture(e.E))}picture(e){let{gl:t}=this,n=t.createTexture();return t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,n),Array.isArray(e)?t.texImage2D(t.TEXTURE_2D,0,t.SRGB8_ALPHA8,e[0],e[1],0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array(e[0]*e[1]*4).fill(e[2])):t.texImage2D(t.TEXTURE_2D,0,t.SRGB8_ALPHA8,t.RGBA,t.UNSIGNED_BYTE,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),n}screened(e,t,n,r){let{gl:i}=this,a=e.u,o=t.spec,s=t.map,c=n.shape,l=G(n);i.useProgram(e.program),i.viewport(-s.x-r[0],-s.y-r[1],o.pw,o.ph),i.uniform4f(a.uBox,l.x,l.y,l.x+l.w,l.y+l.h),i.uniform2f(a.uCanvas,o.cw,o.ch),i.uniform1i(a.uKind,vt[n.kind]),i.uniform3f(a.uInk,n.ink[0],n.ink[1],n.ink[2]),i.uniform3f(a.uColor,n.color[0],n.color[1],n.color[2]),i.uniform3f(a.uEmit,n.emit[0],n.emit[1],n.emit[2]),i.uniform2f(a.uInset,n.inset[0],n.inset[1]),i.uniform2f(a.uCenter,c.cx,c.cy),i.uniform2f(a.uHalf,c.hw,c.hh),i.uniform1f(a.uRot,c.rotate??0),i.uniform1f(a.uZoom,o.fine),i.uniform1f(a.uGain,n.gain),i.uniform1f(a.uMetal,n.metal)}screen(e,t,n,r,i,a){let o=this.packs.get(e);if(!o||!this.plays(e)||t.w!==n.w||t.h!==n.h||r.w!==n.w||r.h!==n.h)return null;let{gl:s}=this,{w:c,h:l}=t,u=null;return this.drawing(()=>{let d=s.createFramebuffer(),f=[],p=()=>{let e=this.make(s.SRGB8_ALPHA8,c,l,!1);return f.push(e),e},m=(...e)=>{s.bindFramebuffer(s.FRAMEBUFFER,d);for(let t=0;t<3;t++)s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+t,s.TEXTURE_2D,e[t]??null,0);s.drawBuffers(e.map((e,t)=>s.COLOR_ATTACHMENT0+t)),s.viewport(0,0,c,l)};s.activeTexture(s.TEXTURE0);let h=p(),g=p(),_=p(),v=p();for(let[n,r,o]of[[0,h,g],[255,_,v]]){let c=this.picture([a[0],a[1],n]);m(r,o),s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT),this.screened(this.alone,e,i,[t.x,t.y]),this.units(c),s.drawArrays(s.TRIANGLE_STRIP,0,4),s.deleteTexture(c)}s.activeTexture(s.TEXTURE0);let y=this.make(s.RG8,c,l,!1),b=this.make(s.RGBA16F,c,l,!1),x=this.make(s.RGBA16F,c,l,!1);m(y,b,x),s.useProgram(this.through.program),this.units(n.A,n.E,r.A,r.E,h,g,_,v),s.drawArrays(s.TRIANGLE_STRIP,0,4);let S={x:t.x,y:t.y,w:c,h:l,A:b,E:x,T:y,pic:this.picture(i.source),cmd:i,inked:i.kind!==`crt`&&i.kind!==`oled`,lit:t.lit,dead:!1};o.screens.add(S);let C=s.createRenderbuffer(),w=s.createQuery();s.bindRenderbuffer(s.RENDERBUFFER,C),s.renderbufferStorage(s.RENDERBUFFER,s.R8,c,l),m(),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,C),s.drawBuffers([s.COLOR_ATTACHMENT0]),this.screened(this.shower,e,i,[t.x,t.y]),s.uniform2i(this.shower.u.uAt,0,0),s.uniform1i(this.shower.u.uJudge,1),s.uniform1i(this.shower.u.uLit,+!!t.lit),this.units(S.pic,b,x,y,t.A,t.E),s.beginQuery(s.ANY_SAMPLES_PASSED,w),s.drawArrays(s.TRIANGLE_STRIP,0,4),s.endQuery(s.ANY_SAMPLES_PASSED),this.units(null,null,null,null,null,null,null,null),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,null),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindRenderbuffer(s.RENDERBUFFER,null),s.deleteFramebuffer(d),s.deleteRenderbuffer(C);for(let e of f)s.deleteTexture(e);let T={q:w,dead:!1};this.matching.add(T),u={shown:S,matching:T}}),u}matched(e){let{gl:t}=this;if(e.dead||t.isContextLost())return!1;if(!t.getQueryParameter(e.q,t.QUERY_RESULT_AVAILABLE))return null;let n=!!t.getQueryParameter(e.q,t.QUERY_RESULT);return t.deleteQuery(e.q),this.matching.delete(e),!n}matching=new Set;show(e,t,n){let r=this.packs.get(e),i=e.tex;if(!r||!i||t.dead||!r.screens.has(t)||!this.plays(e))return!1;let{gl:a}=this,o=this.shower;return this.drawing(()=>{a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,t.pic),a.texImage2D(a.TEXTURE_2D,0,a.SRGB8_ALPHA8,a.RGBA,a.UNSIGNED_BYTE,n);let r=this.scratch??=a.createFramebuffer(),s=t.lit&&!!i.E;a.bindFramebuffer(a.FRAMEBUFFER,r),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,t.inked?i.A:null,0),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT1,a.TEXTURE_2D,s?i.E:null,0),a.drawBuffers([t.inked?a.COLOR_ATTACHMENT0:a.NONE,s?a.COLOR_ATTACHMENT1:a.NONE]),(t.inked||s)&&(a.enable(a.SCISSOR_TEST),a.scissor(t.x,t.y,t.w,t.h),this.screened(o,e,t.cmd,[0,0]),a.uniform2i(o.u.uAt,t.x,t.y),a.uniform1i(o.u.uJudge,0),a.uniform1i(o.u.uLit,0),this.units(t.pic,t.A,t.E,t.T,null,null),a.drawArrays(a.TRIANGLE_STRIP,0,4),a.disable(a.SCISSOR_TEST)),this.units(null,null,null,null),a.activeTexture(a.TEXTURE0),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT1,a.TEXTURE_2D,null,0),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,null,0),a.drawBuffers([a.COLOR_ATTACHMENT0]),t.inked&&(a.bindTexture(a.TEXTURE_2D,i.A),a.generateMipmap(a.TEXTURE_2D)),a.bindTexture(a.TEXTURE_2D,null)}),this.stats.shows++,!0}unshow(e){if(!e.dead){e.dead=!0;for(let t of[e.A,e.E,e.T,e.pic])this.gl.deleteTexture(t);for(let t of this.packs.values())t.screens.delete(e)}}bind(e,t,n){let{gl:r}=this,i=e.tex,a=this.packs.get(e),o=e.spec,s=this.light.u;[i.A,a.T,a.C,a.half,t,i.E??n,a.B].forEach((e,t)=>{r.activeTexture(r.TEXTURE0+t),r.bindTexture(r.TEXTURE_2D,e)}),r.uniform1f(s.uPx,o.pw/o.cw*4),r.uniform1f(s.uMost,a.most),r.uniform1i(s.uGlows,+!!i.E)}bytes(e){let t=this.packs.get(e);return t?Math.round(t.w*t.h*(4/3*4+4+2+4/3*2/4))+[...t.crops].reduce((e,t)=>e+an(t)*(t.B0?1:.5),0):0}drop(e){let t=this.packs.get(e);if(!t)return;let{gl:n}=this;for(let e of[...t.crops])this.free(e);for(let e of[...t.screens])this.unshow(e);n.deleteTexture(t.B),n.deleteTexture(t.C),n.deleteTexture(t.half),n.deleteTexture(t.T),n.deleteFramebuffer(t.fbo),n.deleteFramebuffer(t.hfbo),n.deleteFramebuffer(t.tfbo),this.packs.delete(e)}close(e){this.drop(e)}asked=new Set;lost(){for(let e of this.packs.values())for(let t of e.crops)t.dead=!0;for(let e of this.packs.values())for(let t of e.screens)t.dead=!0;for(let e of this.matching)e.dead=!0;this.matching.clear();for(let e of this.asked)e.dead=!0;this.asked.clear(),this.packs.clear(),this.stats.crops=this.stats.cropBytes=0,this.light=this.packer=this.heights=this.grain=this.layer=this.judge=this.glowJudge=this.carry=this.apart=this.cover=this.alone=this.through=this.shower=null,this.scratch=null}},cn=[`cx`,`cy`,`halfW`,`halfH`,`radius`,`slope`,`bevel`,`curve`,`rim`,`tintR`,`tintG`,`tintB`,`coat`,`film`,`top`,`chamfer`,`chamferK`,`reflect`],ln=4;function un(e,t,n){let{w:r}=e,{x:i,y:a,w:o,h:s}=t,c=(e,t)=>{let n=new e.constructor(o*s*t);for(let c=0;c<s;c++)n.set(e.subarray(((a+c)*r+i)*t,((a+c)*r+i+o)*t),c*o*t);return n},l=c(e.colour,4);if(n)for(let e=0;e<s;e++)for(let t=0;t<o;t++)n((a+e)*r+i+t)||(l[(e*o+t)*4+3]=0);return{box:t,colour:l,height:c(e.height,1),normal:c(e.normal,2),surface:c(e.surface,4),more:e.more?c(e.more,4):null,emission:e.emission?c(e.emission,4):null}}function dn(e,t,n){let r=(e,t,r)=>{if(!e&&!t)return!1;for(let i=0;i<r;i++)if(Math.abs((e?.[n*r+i]??0)-(t?.[n*r+i]??0))>2)return!0;return!1};return Math.abs(e.height[n]-t.height[n])>.002||r(e.colour,t.colour,4)||r(e.surface,t.surface,4)||r(e.emission,t.emission,4)}function fn(e,t,n){let r=e,i=t,a=-1,o=-1;for(let s=0;s<t;s++)for(let t=0;t<e;t++)n(s*e+t)&&(t<r&&(r=t),t>a&&(a=t),s<i&&(i=s),s>o&&(o=s));return a<0?null:(r=Math.max(r-1,0),i=Math.max(i-1,0),a=Math.min(a+1,e-1),o=Math.min(o+1,t-1),{x:r,y:i,w:a-r+1,h:o-i+1})}function pn(e,t,n){t=mn(e,t);let r=n=>dn(e,t,n),i=fn(e.w,e.h,r);if(!i)return null;let a=-1/0;for(let t=i.y;t<i.y+i.h;t++)for(let n=i.x;n<i.x+i.w;n++){let i=t*e.w+n;r(i)&&(a=Math.max(a,e.height[i]))}let o=Math.min(i.x,n.x),s=Math.min(i.y,n.y),c={x:o,y:s,w:Math.max(i.x+i.w,n.x+n.w)-o,h:Math.max(i.y+i.h,n.y+n.h)-s};return{alone:un(e,i,r),under:un(t,c),peak:a}}function mn(e,t){if(t.box.x===e.box.x&&t.box.y===e.box.y&&t.w===e.w&&t.h===e.h)return t;let{w:n,h:r}=e,i=e.box.x-t.box.x,a=e.box.y-t.box.y,o=(e,o)=>{let s=new e.constructor(n*r*o);for(let c=0;c<r;c++){let r=c+a;if(r<0||r>=t.h)continue;let l=Math.max(0,-i),u=Math.min(n,t.w-i);u>l&&s.set(e.subarray((r*t.w+l+i)*o,(r*t.w+u+i)*o),(c*n+l)*o)}return s};return{...t,w:n,h:r,box:e.box,colour:o(t.colour,4),height:o(t.height,1),normal:o(t.normal,2),surface:o(t.surface,4),more:t.more&&o(t.more,4),emission:t.emission&&o(t.emission,4)}}function hn(e,t,n,r,i){t=mn(e,t),n=mn(e,n);let a=fn(e.w,e.h,n=>dn(e,t,n));if(!a)return null;let o=0,s=0;for(let r=a.y;r<a.y+a.h;r++)for(let i=a.x;i<a.x+a.w;i++){let a=r*e.w+i,c=t.height[a]-e.height[a];Math.abs(c)>.002&&(s=Math.max(s,Math.abs(c)),o=Math.max(o,Math.abs(n.height[a]-(e.height[a]+t.height[a])/2)))}return{from:r,to:i,linear:o<=Math.max(.01,s*.05),off:o,travel:s,...un(t,a)}}function gn(e,t){let n=[...e.attributes].find(e=>e.name.startsWith(`d-`)),r=e.tagName.toLowerCase()+(n?`[${n.name}${n.value?`="${n.value}"`:``}]`:``),i=[...t.querySelectorAll(r)];return i.length>1?`${r}:${i.indexOf(e)}`:r}function _n(e,t,n,r){let{w:i,h:a}=e,o=i*a,s=e.pw/e.cw,c=s*ln,l=new Float32Array(o),u=new Uint8Array(o*2),d=e.A;for(let t=0;t<o;t++)if(l[t]=e.H[t*4]+(e.D?e.D[t*4]:0),e.N)u[t*2]=e.N[t*4],u[t*2+1]=e.N[t*4+1];else for(let n=0;n<2;n++)u[t*2+n]=Math.max(0,Math.min(255,Math.round((.5+.25*e.H[t*4+1+n])*255)));for(let t of[d,e.S])for(let e=0;e<o*4;e+=4){let n=t[e+3];if(n>0&&n<255)for(let r=0;r<3;r++)t[e+r]=Math.min(255,Math.round(t[e+r]*255/n))}let f=new Uint8Array(o*2),p=1/c;for(let e=0;e<a;e++)for(let t=0;t<i;t++){let n=(e,t)=>l[Math.min(Math.max(t,0),a-1)*i+Math.min(Math.max(e,0),i-1)],r=(n(t+1,e)-n(t-1,e))/(2*p),o=(n(t,e+1)-n(t,e-1))/(2*p),s=Math.hypot(r,o,1),c=(e*i+t)*2;f[c]=Math.round((.5-.5*r/s)*255),f[c+1]=Math.round((.5-.5*o/s)*255)}let m=e.pw/e.O.w,h={w:i,h:a,pxPerMm:c,box:{x:e.x,y:e.y,w:i,h:a},body:{x:t[0]*s-e.x,y:t[1]*s-e.y,w:n[0]*s,h:n[1]*s},colour:d,height:l,normal:f,surface:e.S,more:e.M,grain:u,emission:e.E,condition:e.C,occlusion:{w:e.O.w,h:e.O.h,x:e.x/m,y:e.y/m,scale:m,data:e.O.data},bytes:0,facts:{...r,peak:e.peak,panes:[]},moves:[],screens:[],gaps:[]};for(let t=0;t+cn.length<=e.panes.length;t+=cn.length){let n=Object.fromEntries(cn.map((n,r)=>[n,e.panes[t+r]]));n.cx=n.cx*s-e.x,n.cy=n.cy*s-e.y,n.halfW*=s,n.halfH*=s,n.radius*=s,h.facts.panes.push(n)}return h.bytes=[d,l,f,e.S,e.M,u,e.E,e.C,e.O.data].reduce((e,t)=>e+(t?.byteLength??0),0),h}var vn=class{gl;block;fields;screenTex;later=[];drawing=null;relief=!0;blank=!1;stand=null;aim=null;constructor(e,t,n,r){this.gl=e,this.block=t,this.fields=n,this.screenTex=r}bindShape(e,t,n){let{gl:r,block:i}=this,{f:a,i:o,at:s}=i;if(i.four(s.uBox,n.x,n.y,n.x+n.w,n.y+n.h),o[s.uShape]=gt[e.type],a[s.uRot]=0,a[s.uGrow]=e.grow??0,a[s.uRing]=e.ring??0,i.vec(s.uRipple,[0,0,0]),o[s.uClipShape]=-1,a[s.uGroundWear]=0,e.type===`capsule`)i.four(s.uCap,e.ax,e.ay,e.bx,e.by),i.two(s.uCapR,e.ra,e.rb),i.two(s.uHalf,1,1),i.two(s.uCenter,(e.ax+e.bx)/2,(e.ay+e.by)/2);else if(e.type===`arc`)i.two(s.uCenter,e.cx,e.cy),i.two(s.uHalf,e.hw,e.hh),i.four(s.uCap,e.mid,e.half,e.r,e.width/2);else if(e.type===`mask`)i.two(s.uCenter,e.box.x,e.box.y);else if(i.two(s.uCenter,e.cx,e.cy),i.two(s.uHalf,e.hw,e.hh),e.type===`rect`)a[s.uRadius]=e.radius,a[s.uRot]=e.rotate,i.vec(s.uRipple,e.ripple);else if(e.type===`holes`)a[s.uRadius]=e.radius,i.vec(s.uHoles,[e.pitch,e.hole,+!!e.square]);else{a[s.uRot]=e.rotate,i.two(s.uSpread,e.spread,e.spread*(e.hh/(e.source?.hh??e.hh)));let n=this.fields.get(e,t);this.later.push(()=>{r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,n),r.activeTexture(r.TEXTURE0)})}}bindHolder(e,t){let{gl:n,block:r}=this,{f:i,i:a,at:o}=r;if(e?.type!==`rect`&&e?.type!==`field`)return;if(a[o.uClipShape]=gt[e.type],r.four(o.uClip,e.cx,e.cy,e.hw,e.hh),i[o.uClipRot]=e.rotate,e.type===`rect`){i[o.uClipRadius]=e.radius;return}r.two(o.uClipSpread,e.spread,e.spread*(e.hh/(e.source?.hh??e.hh)));let s=this.fields.get(e,t);this.later.push(()=>{n.activeTexture(n.TEXTURE7),n.bindTexture(n.TEXTURE_2D,s),n.activeTexture(n.TEXTURE0)})}draw(e,t){let n=t.spec,{gl:r,block:i,later:a}=this,{f:o,i:s,at:c}=i;this.drawing=e;let l=()=>{let e=i.keep();a.push(()=>{i.use(e),r.drawArrays(r.TRIANGLE_STRIP,0,4)})},u=()=>a.push(()=>r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA)),d=()=>a.push(()=>r.blendFunc(r.ONE,r.ONE));this.bindShape(e.shape,n.dpr,G(e)),s[c.uEdge]=0;let f=e.bend;if(o[c.uBendReach]=f?f.reach:0,f&&(i.two(c.uBendDir,f.dir[0],f.dir[1]),i.two(c.uBendAt,f.at,f.flat),o[c.uBendDrop]=f.drop,o[c.uBendK]=f.k,s[c.uBendBoth]=+!!f.both),e.op===`screen`){a.push(()=>{r.activeTexture(r.TEXTURE2),r.bindTexture(r.TEXTURE_2D,this.screenTex);let t=this.stand?.source===e.source?this.stand:null,{width:n,height:i}=e.source;t?r.texImage2D(r.TEXTURE_2D,0,r.SRGB8_ALPHA8,n,i,0,r.RGBA,r.UNSIGNED_BYTE,new Uint8Array(n*i*4).fill(t.level)):this.blank&&e.kind!==`coat`?r.texImage2D(r.TEXTURE_2D,0,r.SRGB8_ALPHA8,1,1,0,r.RGBA,r.UNSIGNED_BYTE,new Uint8Array(e.kind===`eink`?[255,255,255,255]:[0,0,0,255])):r.texImage2D(r.TEXTURE_2D,0,r.SRGB8_ALPHA8,r.RGBA,r.UNSIGNED_BYTE,e.source),r.activeTexture(r.TEXTURE0)}),s[c.uMode]=_t.screen,s[c.uKind]=vt[e.kind],o[c.uGain]=e.gain,i.vec(c.uColor,e.color),i.vec(c.uInk,e.ink),i.vec(c.uEmit,e.emit),i.two(c.uInset,e.inset[0],e.inset[1]),o[c.uZTop]=e.zTop,o[c.uRough]=e.rough,o[c.uCoat]=e.coat,o[c.uMetal]=e.metal,o[c.uZoom]=n.fine,l();return}if(e.op===`frost`){s[c.uMode]=_t.frost,i.two(c.uSeed,0,0),o[c.uBlur]=e.blur,o[c.uZoom]=e.zoom,i.vec(c.uColor,e.tint),o[c.uOpacity]=e.opacity,o[c.uTransmit]=e.transmit,o[c.uZEdge]=e.zEdge,o[c.uZTop]=e.zTop,o[c.uBevel]=e.bevel,o[c.uRough]=e.rough,o[c.uCoat]=e.coat,u(),l();return}if(e.op===`glass`){if(t.paned.has(e))return;s[c.uMode]=_t.glass,o[c.uZTop]=e.height,o[c.uBevel]=e.bevel,o[c.uCoat]=e.coat,a.push(()=>{r.drawBuffers([r.NONE,r.COLOR_ATTACHMENT1,r.NONE,r.NONE]),r.blendFunc(r.ONE,r.ONE)}),l(),a.push(()=>{r.drawBuffers([r.NONE,r.NONE,r.COLOR_ATTACHMENT2,r.NONE]),r.colorMask(!1,!1,!0,!1),r.blendFunc(r.ONE,r.ONE_MINUS_SRC_ALPHA)}),l(),a.push(()=>{r.colorMask(!0,!0,!0,!0),r.drawBuffers(t.tex.targets)}),u();return}if(e.op===`glow`){s[c.uMode]=_t.glow,i.vec(c.uEmit,e.color),o[c.uWidth]=e.width,d(),l(),u();return}if(e.op===`cut`){this.bindHolder(e.on,n.dpr),e.chips&&(o[c.uGroundWear]=e.chips.wear,i.vec(c.uGroundSeed,e.chips.seed),o[c.uChip]=e.chips.size),i.vec(c.uSeed,e.seed),o[c.uBevel]=e.soft,o[c.uWear]=e.wear,o[c.uSoftLod]=Math.log2(n.dpr)*.75+.1,e.depth&&(s[c.uMode]=_t.cut,o[c.uDepth]=e.depth,d(),l(),u()),e.ink&&(s[c.uMode]=_t.ink,o[c.uFeather]=e.feather,i.vec(c.uColor,e.ink),i.vec(c.uEmit,e.emit??[0,0,0]),o[c.uRough]=e.rough,o[c.uMetal]=e.metal,l());return}let p=e.material;s[c.uMode]=_t.surface,s[c.uProfile]=bt[e.profile],s[c.uRadial]=+!!e.radial,o[c.uBevel]=e.bevel,o[c.uZEdge]=e.zEdge,o[c.uZTop]=e.zTop,i.two(c.uDish,e.dish[0],e.dish[1]),o[c.uMid]=e.mid,i.two(c.uCrown,e.crown[0],e.crown[1]),i.two(c.uTilt,e.tilt[0],e.tilt[1]),i.vec(c.uColor,p.color),i.vec(c.uSub,p.sub),i.two(c.uSubRM,p.subRough,p.subMetal),i.vec(c.uBare,p.bare),i.two(c.uBareRM,p.bareRough,p.bareMetal),i.vec(c.uCoatTint,p.coatTint),o[c.uDents]=p.dents,o[c.uFade]=p.fade,o[c.uRings]=p.rings,o[c.uPores]=p.pores,o[c.uFilmVary]=p.filmVary,o[c.uLeak]=p.leak,i.vec(c.uEmit,p.emit),i.vec(c.uGrain,p.grain),o[c.uRough]=p.rough,o[c.uMetal]=p.metal,o[c.uCoat]=p.coat,o[c.uAniso]=p.aniso,o[c.uTangent]=p.tangent,o[c.uPeel]=p.peel,o[c.uWave]=p.wave,o[c.uRelief]=this.relief?p.relief:0,o[c.uFeature]=p.feature,o[c.uSlope]=p.slope,o[c.uAcross]=p.across,o[c.uMottle]=p.mottle,o[c.uFleck]=p.fleck,o[c.uWear]=p.wear,o[c.uAge]=p.age,o[c.uPatinaOn]=+!!p.patina,i.vec(c.uPatina,p.patina??[0,0,0]),o[c.uPatinaRough]=p.patinaRough,o[c.uTouch]=p.touch,o[c.uSheen]=p.sheen,o[c.uScatter]=p.scatter,o[c.uMarks]=p.marks,o[c.uPolish]=p.polish,o[c.uChip]=p.chip,o[c.uBroad]=p.broad,o[c.uCoatRough]=p.coatRough,s[c.uPattern]=p.pattern?yt[p.pattern]:0,i.vec(c.uColor2,p.color2),o[c.uScale]=p.scale,o[c.uFilm]=p.film,i.vec(c.uSeed,e.seed),s[c.uFollow]=e.bridge?3:+!!e.follow,o[c.uBlur]=e.bridge;let m=this.aim;if(m){let e=m.reach,t=m.box;s[c.uEdge]=m.rows?4:1;let n=m.inset;if(i.four(c.uOutline,n?.y0??0,n?.step??0,n?.n??0,0),n&&a.push(()=>{r.activeTexture(r.TEXTURE9),r.bindTexture(r.TEXTURE_2D,n.tex),r.activeTexture(r.TEXTURE0)}),m.rows){let{tex:e,y0:t,step:n,n:o}=m.rows;i.four(c.uCap,t,n,o,0),a.push(()=>{r.activeTexture(r.TEXTURE9),r.bindTexture(r.TEXTURE_2D,e),r.activeTexture(r.TEXTURE0)})}i.four(c.uBox,t.x,t.y,t.x+t.w,t.y+t.h),i.vec(c.uSeen,m.seen),i.vec(c.uFrom,m.from),i.four(c.uReach,e.x,e.y,e.x+e.w,e.y+e.h),l()}else l(),e.follow&&!e.bridge&&(s[c.uFollow]=2,d(),l(),u())}},yn=`#version 300 es
precision highp float;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  gl_Position=vec4(c*2.-1.,0.,1.);
}`,bn=`#version 300 es
precision highp float;
uniform highp sampler2D uBoxes;
uniform vec2 uAtlas;
flat out vec4 vBox;
flat out float vScale;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  ivec2 at=ivec2((gl_InstanceID*2)%1024,(gl_InstanceID*2)/1024);
  vBox=texelFetch(uBoxes,at,0);
  vScale=texelFetch(uBoxes,at+ivec2(1,0),0).r;
  gl_Position=vec4((vBox.xy+c*vBox.zw)/uAtlas*2.-1.,0.,1.);
}`,xn=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uMask;
flat in vec4 vBox;
float cov(ivec2 p){return texelFetch(uMask,clamp(p,ivec2(vBox.xy),ivec2(vBox.xy+vBox.zw)-1),0).r;}
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  float c=cov(p);
  bool inside=c>=.5;
  bool edge=c>0.&&c<1.;
  edge=edge||(cov(p+ivec2(1,0))>=.5)!=inside||(cov(p-ivec2(1,0))>=.5)!=inside
           ||(cov(p+ivec2(0,1))>=.5)!=inside||(cov(p-ivec2(0,1))>=.5)!=inside;
  o=edge?vec4(gl_FragCoord.xy-vBox.xy,c-.5,1.):vec4(0.);
}`,Sn=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uSeeds,uMask;
uniform int uStep;
flat in vec4 vBox;
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy),lo=ivec2(vBox.xy),hi=lo+ivec2(vBox.zw);
  vec2 at=gl_FragCoord.xy-vBox.xy;
  // The nearest edge is what counts, and that is not always the nearest seed.
  float side=texelFetch(uMask,p,0).r>=.5?1.:-1.;
  vec4 best=vec4(0.);
  float bestD=1e12;
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
    ivec2 q=p+ivec2(x,y)*uStep;
    if(q.x<lo.x||q.y<lo.y||q.x>=hi.x||q.y>=hi.y) continue;
    vec4 s=texelFetch(uSeeds,q,0);
    if(s.a==0.) continue;
    float dd=length(s.xy-at)+side*s.z;
    if(dd<bestD){bestD=dd;best=s;}
  }
  o=best;
}`,Cn=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uSeeds,uMask;
flat in vec4 vBox;
flat in float vScale;
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  vec4 s=texelFetch(uSeeds,p,0);
  bool inside=texelFetch(uMask,p,0).r>=.5;
  float d=s.a==0.?1e4:length(s.xy-(gl_FragCoord.xy-vBox.xy));
  // A covered seed has its edge beyond its centre, so outside pixels are closer than they look.
  d=inside?d+s.z:d-s.z;
  o=vec4((inside?-d:d)/vScale);
}`,wn=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uField;
uniform float uScale;
uniform ivec2 uSize,uAt;
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy),size=uSize;
  float d=texelFetch(uField,uAt+p,0).r,sum=0.,total=0.;
  float stride=clamp(abs(d)*uScale/6.,1.,6.);
  // Lopsided near the border it would drift, so it shrinks to stay centred.
  int r=min(3,int(float(min(min(p.x,p.y),min(size.x-1-p.x,size.y-1-p.y)))/stride));
  for(int y=-r;y<=r;y++)for(int x=-r;x<=r;x++){
    float w=float((4-abs(x))*(4-abs(y)));
    sum+=texture(uField,(vec2(uAt)+gl_FragCoord.xy+vec2(x,y)*stride)/vec2(textureSize(uField,0))).r*w;
    total+=w;
  }
  o=vec4(mix(d,sum/total,smoothstep(1.,3.,abs(d)*uScale)));
}`,Tn=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uField,uEdge;
uniform float uSteep;
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  o=vec4(max(texelFetch(uField,p,0).r,texelFetch(uEdge,p,0).r*uSteep));
}`,En=[`maps`,`bake`,`hold`,`field`,`picture`,`stage`],Dn=e=>+(e===`field`||e===`picture`),On={frame:-1,tier:2,far:1/0},kn=1.5,An=class{entries=new Map;worth=new Map;frame=0;keep=1/0;ceiling=1/0;shown=0;squeeze=1;given=0;refusals=0;refusedIn=-1;over=null;hold(e,t,n,r,i,a){let o=this.entries.get(e);o||this.entries.set(e,o=new Map);let s=this.squeeze;o.set(t,{owner:e,kind:t,size:n,give:r,at:i??(()=>s),most:a})}drop(e,t){let n=this.entries.get(e);n&&(t?n.delete(t):n.clear(),n.size||(this.entries.delete(e),this.worth.delete(e)))}judge(e,t,n,r){let i=this.worth.get(e);i?(i.tier=t,i.far=n,r&&(i.frame=this.frame)):this.worth.set(e,{frame:r?this.frame:-1,tier:t,far:n})}use(e){let t=this.worth.get(e);t?t.frame=this.frame:this.worth.set(e,{frame:this.frame,tier:0,far:0})}shows(e){return this.worth.get(e)?.frame===this.frame}get held(){let e=0;for(let t of this.entries.values())for(let n of t.values())e+=n.size();return e}next(){this.frame++}tally(){let e=0,t=0;for(let[n,r]of this.entries)if(this.shows(n)||r.has(`stage`))for(let n of r.values()){let r=n.size();e+=r,t+=(n.most?.()??r)/n.at()**2}this.shown=e;let n=Math.min(Math.max(Math.sqrt(this.ceiling*.8/Math.max(t,1)),1/16),1);this.squeeze=e>this.ceiling||n<this.squeeze?n:Math.min(n,this.squeeze*1.25)}room(e=0){let t=this.over;if(t&&t.frame===this.frame&&t.ceiling===this.ceiling&&t.keep===this.keep&&t.held+e<=this.ceiling&&t.kept+e<=this.keep)return t.held+=e,t.kept+=e,!0;let n=0,r=0,i=[];for(let[e,t]of this.entries){let a=this.shows(e),o=this.worth.get(e)??On;for(let e of t.values()){let t=e.size();n+=t,a||e.kind===`stage`||(r+=t,i.push({e,w:o}))}}let a=()=>n+e<=this.ceiling&&r<=this.keep;if(this.over=null,a())return this.over={frame:this.frame,held:n+e,kept:r+e,ceiling:this.ceiling,keep:this.keep},!0;i.sort((e,t)=>Dn(e.e.kind)-Dn(t.e.kind)||t.w.tier-e.w.tier||t.w.far-e.w.far||En.indexOf(e.e.kind)-En.indexOf(t.e.kind));for(let{e}of i){if(a())return!0;let t=e.size();e.give();let i=this.entries.get(e.owner)?.get(e.kind)===e?e.size():0;n-=t-i,r-=t-i,this.given+=t-i}return a()}kinds(){let e=Object.fromEntries(En.map(e=>[e,0]));for(let t of this.entries.values())for(let n of t.values())e[n.kind]+=n.size();return e}refused(){this.refusedIn!==this.frame&&(this.refusedIn=this.frame,this.refusals++,this.over=null,this.ceiling=Math.max(Math.min(this.ceiling,this.held)*.8,64e6))}lost(){this.over=null,this.entries.clear(),this.worth.clear(),this.shown=0,this.squeeze=1}},jn=1024,Mn=e=>`${e.key}|${e.spread}`,Nn=(e,t)=>{let{w:n,h:r}=Pn(e,t);return`${Mn(e)}|${n}x${r}`};function Pn(e,t){let{hw:n,hh:r}=e.source??e,i=(n+e.spread)*2,a=(r+e.spread)*2,o=Math.min(2**Math.ceil(Math.log2(t)-1e-6),jn/Math.max(i,a));return{cssW:i,cssH:a,w:Math.max(2,Math.round(i*o)),h:Math.max(2,Math.round(a*o))}}var Fn=class{gl;store;entries=new Map;sizes=new Map;seed;flood;resolve;smooth;within;canvas=document.createElement(`canvas`);ctx=this.canvas.getContext(`2d`);fbo;scratch=new Map;generated=0;table=null;rows=0;constructor(e,t){this.gl=e,this.store=t,this.seed=ot(e,bn,xn),this.flood=ot(e,bn,Sn),this.resolve=ot(e,bn,Cn),this.smooth=ot(e,yn,wn),this.within=ot(e,yn,Tn),this.fbo=e.createFramebuffer()}get(e,t){let n=this.near(e,t)??(this.make([e],t),Nn(e,t));return this.used(n),this.entries.get(n).tex}near(e,t){let n=Nn(e,t);if(this.entries.has(n))return n;let{w:r}=Pn(e,t),i=null,a=null;for(let[t,n]of this.sizes.get(Mn(e))??[])n.w>r?(!i||n.w<i[1].w)&&(i=[t,n]):(!a||n.w>a[1].w)&&(a=[t,n]);return(i??a)?.[0]??null}missing(e,t){return[...new Map(e.map(e=>[Nn(e,t),e])).entries()].filter(([e,n])=>!this.entries.has(e)&&!this.fine(n,t)).map(([,e])=>e)}fine(e,t){let{w:n}=Pn(e,t);for(let t of this.sizes.get(Mn(e))?.values()??[])if(t.w>n&&t.w<=n*2+1)return!0;return!1}held(e){return!!this.sizes.get(Mn(e))?.size}cost(e,t){let{w:n,h:r}=Pn(e,t);return n*r*(Math.ceil(Math.log2(Math.max(n,r)))+3)}used(e){this.store.judge(`f|${e}`,kn,-performance.now(),!0)}use(){for(let e of this.entries.keys())this.used(e);for(let e of this.scratch.keys())this.store.judge(`w|${e}`,kn,-performance.now(),!0)}forget(e){let t=this.entries.get(e);if(this.store.drop(`f|${e}`),!t)return;this.gl.deleteTexture(t.tex),this.entries.delete(e);let n=e.slice(0,e.lastIndexOf(`|`)),r=this.sizes.get(n);r?.delete(e),r&&!r.size&&this.sizes.delete(n)}release(){for(let e of[...this.scratch.keys()]){let t=this.scratch.get(e);for(let e of[t.a,t.b,t.raw])this.gl.deleteTexture(e);this.scratch.delete(e),this.store.drop(`w|${e}`)}}clear(){for(let e of[...this.entries.keys()])this.forget(e);this.release()}working(e,t){let{gl:n}=this,r=2**Math.ceil(Math.log2(e)),i=2**Math.ceil(Math.log2(t)),a=r*4096+i;this.store.judge(`w|${a}`,kn,-performance.now(),!0);let o=this.scratch.get(a);if(o)return o;this.release(),this.store.room(r*i*18),this.store.hold(`w|${a}`,`field`,()=>r*i*18,()=>{let e=this.scratch.get(a);if(this.store.drop(`w|${a}`),e){for(let t of[e.a,e.b,e.raw])n.deleteTexture(t);this.scratch.delete(a)}});let s=(e,t)=>{let a=n.createTexture();return n.bindTexture(n.TEXTURE_2D,a),n.texStorage2D(n.TEXTURE_2D,1,e,r,i),W(n,t,t),a},c={a:s(n.RGBA16F,n.NEAREST),b:s(n.RGBA16F,n.NEAREST),raw:s(n.R16F,n.LINEAR)};return this.scratch.set(a,c),c}make(e,t){let n=[...new Map(e.map(e=>[Nn(e,t),e])).entries()].filter(([e])=>!this.entries.has(e));for(let[e,r]of n)r.solve&&this.keep(e,r,this.solved(r,t));let r=n.filter(([,e])=>!e.solve);if(!r.length)return;let i=r.flatMap(([,e])=>e.within?[e,{...e,draw:e.within.draw,within:void 0}]:[e]),a=this.atlas(i,t),o=0;for(let[e,t]of r){let n=a[o++];this.keep(e,t,t.within?this.cut(n,a[o++],t.within.steep):n)}}keep(e,t,n){this.entries.set(e,n);let r=Mn(t);this.sizes.has(r)||this.sizes.set(r,new Map),this.sizes.get(r).set(e,n),this.store.hold(`f|${e}`,`field`,()=>n.w*n.h*2,()=>this.forget(e)),this.used(e)}solved(e,t){let{gl:n}=this,{cssW:r,cssH:i,w:a,h:o}=Pn(e,t),s=new Float32Array(a*o),c=r/a,l=i/o;for(let t=0;t<o;t++)for(let n=0;n<a;n++)s[t*a+n]=e.solve((n+.5)*c-e.spread,(t+.5)*l-e.spread);let u=n.createTexture();return n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,u),n.texStorage2D(n.TEXTURE_2D,1,n.R16F,a,o),W(n,n.LINEAR,n.LINEAR),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.texSubImage2D(n.TEXTURE_2D,0,0,0,a,o,n.RED,n.FLOAT,s),this.generated+=1,{tex:u,w:a,h:o}}atlas(e,t){let n=e.map(e=>Pn(e,t)),r=n.map((e,t)=>t).sort((e,t)=>n[t].h-n[e].h),i=[],a=[],o=[],s=0,c=0,l=0,u=()=>{o.length&&this.together(o.map(t=>({shape:e[t],...n[t],...i[t]})),c+l).forEach((e,t)=>a[o[t]]=e),o=[],s=c=l=0};for(let e of r){let{w:t,h:r}=n[e];s+t>jn&&(s=0,c+=l,l=0),c+r>jn&&u(),i[e]={x:s,y:c},o.push(e),s+=t,l=Math.max(l,r)}return u(),a}together(e,t){let{gl:n,canvas:r,ctx:i}=this,a=Math.max(...e.map(e=>e.x+e.w));r.width<a&&(r.width=a),r.height<t&&(r.height=t),i.setTransform(1,0,0,1,0,0),i.fillStyle=`#000`,i.fillRect(0,0,a,t),i.fillStyle=i.strokeStyle=`#fff`;for(let{shape:t,cssW:n,cssH:r,w:a,h:o,x:s,y:c}of e){let{hw:e,hh:l}=t.source??t;i.save(),i.beginPath(),i.rect(s,c,a,o),i.clip(),i.setTransform(a/n,0,0,o/r,s+a/n*t.spread,c+o/r*t.spread),t.draw(i,e*2,l*2),i.restore()}let o=n.createTexture();n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,o),W(n,n.NEAREST,n.NEAREST),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.texImage2D(n.TEXTURE_2D,0,n.R8,a,t,0,n.RED,n.UNSIGNED_BYTE,r);let s=e.length,c=Math.ceil(s*2/1024),l=new Float32Array(1024*c*4);e.forEach(({x:e,y:t,w:n,h:r,cssW:i},a)=>{l.set([e,t,n,r,n/i],a*8)}),n.activeTexture(n.TEXTURE2),this.rows<c?(n.deleteTexture(this.table),this.table=n.createTexture(),this.rows=c,n.bindTexture(n.TEXTURE_2D,this.table),n.texStorage2D(n.TEXTURE_2D,1,n.RGBA32F,1024,c),W(n,n.NEAREST,n.NEAREST)):n.bindTexture(n.TEXTURE_2D,this.table),n.texSubImage2D(n.TEXTURE_2D,0,0,0,c>1?1024:s*2,c,n.RGBA,n.FLOAT,l),n.activeTexture(n.TEXTURE0);let u=this.working(a,t),{raw:d}=u,{a:f,b:p}=u;n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.drawBuffers([n.COLOR_ATTACHMENT0]),n.disable(n.BLEND),n.disable(n.SCISSOR_TEST);let m=e=>n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0),h=2**Math.ceil(Math.log2(a)),g=2**Math.ceil(Math.log2(t));n.viewport(0,0,h,g);let _=e=>{n.useProgram(e.program),n.uniform1i(e.u.uBoxes,2),n.uniform2f(e.u.uAtlas,h,g)},v=()=>n.drawArraysInstanced(n.TRIANGLE_STRIP,0,4,s);_(this.seed),n.uniform1i(this.seed.u.uMask,0),n.bindTexture(n.TEXTURE_2D,o),m(f),v(),_(this.flood),n.uniform1i(this.flood.u.uSeeds,0),n.uniform1i(this.flood.u.uMask,1),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,o),n.activeTexture(n.TEXTURE0);let y=1<<Math.ceil(Math.log2(Math.max(...e.map(e=>Math.max(e.w,e.h)))));for(;y>=1&&(y>>=1,n.uniform1i(this.flood.u.uStep,Math.max(y,1)),n.bindTexture(n.TEXTURE_2D,f),m(p),v(),[f,p]=[p,f],y!==0););_(this.resolve),n.uniform1i(this.resolve.u.uSeeds,0),n.uniform1i(this.resolve.u.uMask,1),n.bindTexture(n.TEXTURE_2D,f),m(d),v(),n.useProgram(this.smooth.program),n.uniform1i(this.smooth.u.uField,0),n.bindTexture(n.TEXTURE_2D,d);let b=e.map(({w:e,h:t,x:r,y:i,cssW:a})=>{let o=n.createTexture();return n.bindTexture(n.TEXTURE_2D,o),n.texStorage2D(n.TEXTURE_2D,1,n.R16F,e,t),W(n,n.LINEAR,n.LINEAR),n.bindTexture(n.TEXTURE_2D,d),n.uniform1f(this.smooth.u.uScale,e/a),n.uniform2i(this.smooth.u.uSize,e,t),n.uniform2i(this.smooth.u.uAt,r,i),n.viewport(0,0,e,t),m(o),n.drawArrays(n.TRIANGLE_STRIP,0,4),{tex:o,w:e,h:t}});return n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,null,0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.deleteTexture(o),this.generated+=s,b}cut(e,t,n){let{gl:r}=this,{w:i,h:a}=e,o=r.createTexture();return r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,o),r.texStorage2D(r.TEXTURE_2D,1,r.R16F,i,a),W(r,r.LINEAR,r.LINEAR),r.bindFramebuffer(r.FRAMEBUFFER,this.fbo),r.drawBuffers([r.COLOR_ATTACHMENT0]),r.viewport(0,0,i,a),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,o,0),r.useProgram(this.within.program),r.uniform1i(this.within.u.uField,0),r.uniform1i(this.within.u.uEdge,1),r.uniform1f(this.within.u.uSteep,n),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,t.tex),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,e.tex),r.drawArrays(r.TRIANGLE_STRIP,0,4),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,null,0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(e.tex),r.deleteTexture(t.tex),{tex:o,w:i,h:a}}read(e,t){let{gl:n}=this;this.make([e],t);let r=this.entries.get(Nn(e,t));n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,r.tex,0);let i=new Float32Array(r.w*r.h*4);n.readPixels(0,0,r.w,r.h,n.RGBA,n.FLOAT,i);let a=i.filter((e,t)=>t%4==0);return n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,null,0),n.bindFramebuffer(n.FRAMEBUFFER,null),{w:r.w,h:r.h,data:a}}},In=new Map,Ln={panels:[{at:[-.55,-.35],size:[.42,.8],soft:.16,power:1.25},{at:[.75,.3],size:[.16,.9],soft:.12,power:1},{at:[.05,-1.5],size:[1.3,.25],soft:.2,power:1.2}],dark:.1,glow:.3,tent:.35,camera:.7,lamp:[-.96,-3.15],power:1.15,soft:.05,sway:3.2,fill:.6,shadow:1.5,color:[1,1,1]};function Rn(e,t){In.set(e,{...Ln,...t})}function zn(e){return In.get(e)??Ln}var Bn={flashlight:{cone:.2,core:1.1,flood:.4,spill:.07,edge:.3,rings:.03,color:[1,.97,.9],power:1,hold:1,arm:.4,flicker:0,fluoresce:0},candle:{cone:1.15,core:0,flood:1,spill:0,edge:0,rings:0,color:[1,.55,.2],power:.55,hold:.3,arm:.85,flicker:.2,fluoresce:0},blacklight:{cone:.3,core:.3,flood:.5,spill:.03,edge:.35,rings:0,color:[.3,.1,1],power:.5,hold:.8,arm:.4,flicker:0,fluoresce:7}};Rn(`studio`,{}),Rn(`desk`,{panels:[{at:[-.8,-.9],size:[.22,.22],soft:.14,power:2.6}],dark:.02,glow:.04,tent:.22,lamp:[-1.5,-1.9],power:1.35,soft:.04,sway:1.8,fill:.5,shadow:1.5}),Rn(`window`,{panels:[{at:[-1,-.2],size:[.55,1.2],soft:.3,power:1.5}],dark:.14,glow:.5,tent:.85,lamp:[-1.6,-.9],power:.7,soft:.28,sway:.5,fill:1.25,shadow:.65}),Rn(`control`,{panels:[{at:[0,-2.4],size:[1.6,.06],soft:.3,power:.35},{at:[0,-3.4],size:[1.6,.06],soft:.3,power:.25}],dark:.005,glow:.01,tent:.06,camera:.9,lamp:[.2,-3.6],power:.75,soft:.22,sway:.4,fill:.35,shadow:1.2}),Rn(`console`,{...zn(`control`),lamp:[-1.3,-1.7],power:.95,soft:.06,fill:.3,shadow:1.4,glow:.015}),Rn(`alert`,{...zn(`control`),color:[1.6,.05,.02],power:.9}),Rn(`blackout`,{...zn(`control`),panels:[{at:[0,-2.4],size:[1.6,.06],soft:.3,power:.03}],power:.06,fill:.08,dark:.002,glow:0,shadow:.4}),Rn(`tent`,{panels:[{at:[-.6,-.5],size:[.7,.9],soft:.3,power:1.5},{at:[.9,.5],size:[.4,.8],soft:.25,power:1.1},{at:[0,-1.5],size:[1.6,.4],soft:.3,power:1.4}],dark:.16,glow:.55,tent:.85,camera:.25,lamp:[-1.2,-2.6],power:.8,soft:.2,sway:.8,fill:1.1,shadow:.8}),Rn(`outdoors`,{panels:[{at:[0,-1.1],size:[2.4,1.3],soft:.5,power:1.5}],dark:.4,glow:.7,tent:.75,camera:0,lamp:[-1.25,-2.4],power:1,soft:.1,sway:.5,fill:1.1,shadow:1});var Vn=class{spec;tex=null;map={x:0,y:0,w:0,h:0};wanted=null;stood=!1;pool=null;mask=null;rough=!1;seat=null;lampOwed=!1;roughBox=null;drawn=``;peak=40;tall=40;panes=[];paned=new Set;painted=0;keep=!1;spare=void 0;shaped=0;edged=[];reedge=!1;made=null;known=!1;picture=null;constructor(e){this.spec=e}get ready(){return!!this.tex}},Hn=512,Un=class{gl;made=new Map;constructor(e){this.gl=e;let t=ot(e,jt,Nt),n=e.createTexture(),r=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,r),e.drawBuffers([e.COLOR_ATTACHMENT0]),e.disable(e.BLEND),e.activeTexture(e.TEXTURE14),e.bindTexture(e.TEXTURE_2D,n),e.texStorage2D(e.TEXTURE_2D,1,e.RG16F,64,64),W(e,e.LINEAR,e.LINEAR),e.activeTexture(e.TEXTURE0),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.viewport(0,0,64,64),e.useProgram(t.program),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(r),e.deleteProgram(t.program)}for(e,t){let n=this.made.get(e),{gl:r}=this;if(n?.tilt===t)return n;n&&(r.deleteTexture(n.room),r.deleteTexture(n.brush));let i=r.isEnabled(r.BLEND),a=r.isEnabled(r.SCISSOR_TEST),o=e=>{let t=r.createTexture();return r.bindTexture(r.TEXTURE_2D,t),r.texStorage2D(r.TEXTURE_2D,e,r.RGBA16F,Hn,Hn),W(r,r.LINEAR_MIPMAP_LINEAR,r.LINEAR),t},s=ot(r,jt,Mt),c=ot(r,jt,Lt),l=o(Math.log2(Hn)+1),u=o(7),d=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,d),r.drawBuffers([r.COLOR_ATTACHMENT0]),r.disable(r.BLEND),r.disable(r.SCISSOR_TEST),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,l,0),r.viewport(0,0,Hn,Hn),r.useProgram(s.program),r.uniform1f(s.u.uSize,Hn),r.uniform1f(s.u.uDark,e.dark),r.uniform1f(s.u.uGlow,e.glow),r.uniform1f(s.u.uTent,e.tent),r.uniform1f(s.u.uCamera,e.camera);let f=Math.tan(t*Math.PI/180);r.uniform2f(s.u.uLens,f*.44,-f*.9);let p=e.panels.slice(0,6);r.uniform1i(s.u.uPanels,p.length),p.length&&(r.uniform4fv(r.getUniformLocation(s.program,`uPanelAt`),p.flatMap(e=>[...e.at,...e.size])),r.uniform2fv(r.getUniformLocation(s.program,`uPanelLight`),p.flatMap(e=>[e.soft,e.power]))),r.drawArrays(r.TRIANGLE_STRIP,0,4),r.bindTexture(r.TEXTURE_2D,l),r.generateMipmap(r.TEXTURE_2D),r.useProgram(c.program),r.uniform1i(c.u.tRoom,0),r.uniform1f(c.u.uSource,Hn);for(let e=0;e<7;e++){let t=Hn>>e;r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,u,e),r.viewport(0,0,t,t),r.uniform1f(c.u.uSize,t),r.uniform1f(c.u.uRough,e/6),r.uniform1i(c.u.uSamples,e?32<<Math.min(e,3):1),r.drawArrays(r.TRIANGLE_STRIP,0,4)}let m=ot(r,jt,It),h=r.createTexture();r.activeTexture(r.TEXTURE15),r.bindTexture(r.TEXTURE_2D_ARRAY,h),r.texStorage3D(r.TEXTURE_2D_ARRAY,4,r.R16F,128,128,8*Pt.length),r.texParameteri(r.TEXTURE_2D_ARRAY,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),r.texParameteri(r.TEXTURE_2D_ARRAY,r.TEXTURE_MAG_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D_ARRAY,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D_ARRAY,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,u),r.useProgram(m.program),r.uniform1i(m.u.tRoom,0);for(let e=0;e<4;e++){let t=128>>e;r.viewport(0,0,t,t),r.uniform1f(m.u.uSize,t),r.uniform1f(m.u.uThin,Ft*2**e);for(let t=0;t<Pt.length;t++){r.uniform1f(m.u.uReach,Pt[t]);for(let n=0;n<8;n++)r.framebufferTextureLayer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,h,e,t*8+n),r.uniform1f(m.u.uTurn,n/8*Math.PI),r.drawArrays(r.TRIANGLE_STRIP,0,4)}}r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteFramebuffer(d),r.deleteTexture(l),r.deleteProgram(m.program),r.deleteProgram(s.program),r.deleteProgram(c.program),i&&r.enable(r.BLEND),a&&r.enable(r.SCISSOR_TEST);let g={room:u,brush:h,tilt:t};return this.made.set(e,g),g}get bytes(){return this.made.size*(Hn*Hn*8*4/3+262144*Pt.length*4/3)}},Wn=`#version 300 es
void main() {
  vec2 c = vec2(gl_VertexID & 1, gl_VertexID >> 1);
  gl_Position = vec4(c * 2.0 - 1.0, 0.0, 1.0);
}`,Gn=.03,Kn=7,qn=`#version 300 es
precision highp float;
uniform sampler2D tLight;
uniform float uExposure;
out vec4 o;
void main() {
  vec2 uv = gl_FragCoord.xy * 2.0 / vec2(textureSize(tLight, 0));
  o = vec4(max(texture(tLight, uv).rgb * uExposure - 1.0, 0.0), 1.0);
}`,Jn=`#version 300 es
precision highp float;
uniform sampler2D tPast;
uniform int uLevels;
out vec4 o;
void main() {
  vec2 uv = gl_FragCoord.xy / vec2(textureSize(tPast, 0));
  vec3 g = vec3(0);
  for (int i = 0; i < ${Kn}; i++) {
    if (i >= uLevels) break;
    vec2 t = 0.75 / vec2(textureSize(tPast, i));
    float l = float(i);
    g += textureLod(tPast, uv + t, l).rgb + textureLod(tPast, uv - t, l).rgb + textureLod(tPast, uv + vec2(t.x, -t.y), l).rgb + textureLod(tPast, uv + vec2(-t.x, t.y), l).rgb;
  }
  o = vec4(g * ${(Gn/4).toFixed(5)} / float(uLevels), 1.0);
}`,Yn=`#version 300 es
precision highp float;
uniform sampler2D tLight, tGlare;
uniform float uExposure;
uniform vec2 uShift;
uniform vec3 uBack;
out vec4 o;
${dt}
float rnd(vec2 p){return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715))));}
void main() {
  vec4 c = texelFetch(tLight, ivec2(gl_FragCoord.xy), 0);
  float a = clamp(c.a, 0.0, 1.0);
  vec3 rgb = max(c.rgb, 0.0) * uExposure;
  rgb += texture(tGlare, gl_FragCoord.xy / vec2(textureSize(tLight, 0))).rgb - max(rgb - 1.0, 0.0) * ${Gn.toFixed(5)};
  rgb = a > 0.002 ? encode(neutral(rgb / a)) * a : encode(min(decode(uBack) + neutral(rgb), 1.0)) - uBack;
  // Half a level of noise, so a smooth fall of light doesn't band at 8 bits.
  o = vec4(rgb + (rnd(gl_FragCoord.xy + uShift) - 0.5) / 255.0 * max(a, 0.004), a);
}`,Xn=class{gl;fbo;tex=null;past=null;glare=null;pastFbo;glareFbo;levels=1;w=0;h=0;show;passes;constructor(e){this.gl=e,this.fbo=e.createFramebuffer(),this.pastFbo=e.createFramebuffer(),this.glareFbo=e.createFramebuffer(),this.show=U(e,Wn,Yn).finish(),this.passes={past:U(e,Wn,qn).finish(),glare:U(e,Wn,Jn).finish()}}get bytes(){return this.w*this.h*8*(1+1/4*(4/3)+1/4)}get half(){return[Math.max(this.w>>1,1),Math.max(this.h>>1,1)]}begin(e,t){let{gl:n}=this;if(e!==this.w||t!==this.h||!this.tex){for(let e of[this.tex,this.past,this.glare])e&&n.deleteTexture(e);this.w=e,this.h=t;let[r,i]=this.half;this.levels=Math.min(Kn,Math.floor(Math.log2(Math.min(r,i)))+1);let a=(e,t,r,i,a)=>{let o=n.createTexture();return n.bindTexture(n.TEXTURE_2D,o),n.texStorage2D(n.TEXTURE_2D,i,n.RGBA16F,t,r),W(n,a,n.LINEAR),n.bindFramebuffer(n.FRAMEBUFFER,e),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,o,0),o};this.tex=a(this.fbo,e,t,1,n.LINEAR),this.past=a(this.pastFbo,r,i,this.levels,n.LINEAR_MIPMAP_LINEAR),this.glare=a(this.glareFbo,r,i,1,n.LINEAR)}n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.viewport(0,0,e,t),n.disable(n.SCISSOR_TEST),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT)}finish(e=1,t=[0,0,0]){let{gl:n}=this,[r,i]=this.half;n.disable(n.SCISSOR_TEST),n.disable(n.BLEND),n.disable(n.DEPTH_TEST),n.colorMask(!0,!0,!0,!0);let{past:a,glare:o}=this.passes;n.bindFramebuffer(n.FRAMEBUFFER,this.pastFbo),n.viewport(0,0,r,i),n.useProgram(a.program),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,this.tex),n.uniform1i(a.u.tLight,0),n.uniform1f(a.u.uExposure,e),n.drawArrays(n.TRIANGLE_STRIP,0,4),n.bindTexture(n.TEXTURE_2D,this.past),n.generateMipmap(n.TEXTURE_2D),n.bindFramebuffer(n.FRAMEBUFFER,this.glareFbo),n.useProgram(o.program),n.uniform1i(o.u.tPast,0),n.uniform1i(o.u.uLevels,this.levels),n.drawArrays(n.TRIANGLE_STRIP,0,4);let{program:s,u:c}=this.show;n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,this.w,this.h),n.useProgram(s),n.bindTexture(n.TEXTURE_2D,this.tex),n.uniform1i(c.tLight,0),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,this.glare),n.uniform1i(c.tGlare,1),n.uniform1f(c.uExposure,e),n.uniform2f(c.uShift,0,0),n.uniform3f(c.uBack,...t),n.drawArrays(n.TRIANGLE_STRIP,0,4),n.activeTexture(n.TEXTURE0)}lost(){this.tex=this.past=this.glare=null,this.w=this.h=0}free(){let{gl:e}=this;for(let t of[this.tex,this.past,this.glare])t&&e.deleteTexture(t);for(let t of[this.fbo,this.pastFbo,this.glareFbo])e.deleteFramebuffer(t);for(let t of[this.show,this.passes.past,this.passes.glare])e.deleteProgram(t.program);this.lost()}},Zn=e=>e<.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Qn(e,t,n){let r=.015,i=.785,a=Math.min(e,t,n),o=a<2*r?a-a*a/(4*r):r,s=Math.max(e,t,n),c=s<2*r?s*.25/r:1-r/Math.max(s,2*r),l=Math.min(Math.max((s-.03)/.07,0),1),u=l*l*(3-2*l),d=[e,t,n].map(e=>e*c*(1-u)+(e-o)*u),f=Math.max(...d);if(f>=i){let e=.21499999999999997,t=1-e*e/(f+e-i),n=1-1/(.15*(f-t)+1);d=d.map(e=>e*t/f*(1-n)+t*n)}return d.map(Zn)}function $n(e,t){let n=[],r=/[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/y,i=0,a=0,o=0,s=0,c=0,l=``,u=0,d=0,f=null,p=()=>{for(;i<e.length&&/[\s,]/.test(e[i]);)i++},m=()=>(p(),i<e.length&&/[-+.\d]/.test(e[i])),h=()=>{p(),r.lastIndex=i;let t=r.exec(e);return i=r.lastIndex,+t[0]},g=()=>(p(),e[i++]===`1`),_=(e,t)=>{f.push(e,t),a=e,o=t},v=(e,t)=>{for(let n=1;n<=e;n++)_(...t(n/e))};for(;i<e.length&&(p(),!(i>=e.length));){/[a-zA-Z]/.test(e[i])&&(l=e[i++]);let r=l.toUpperCase(),p=l!==r,y=p?a:0,b=p?o:0;if(r===`Z`)f&&f.length>2&&n.push(f),f=null,a=s,o=c,u=a,d=o;else if(r===`M`)f&&f.length>2&&n.push(f),a=h()+y,o=h()+b,s=a,c=o,f=[a,o],l=p?`l`:`L`,u=a,d=o;else{if(f??=[a,o],r===`L`)_(h()+y,h()+b);else if(r===`H`)_(h()+y,o);else if(r===`V`)_(a,h()+b);else if(r===`C`||r===`S`){let[e,n]=r===`C`?[h()+y,h()+b]:[2*a-u,2*o-d],i=h()+y,s=h()+b,c=h()+y,l=h()+b,f=a,p=o,m=Math.max(Math.hypot(f-2*e+i,p-2*n+s),Math.hypot(e-2*i+c,n-2*s+l));v(Math.max(1,Math.ceil(Math.sqrt(.75*m/t))),t=>{let r=1-t;return[r*r*r*f+3*r*r*t*e+3*r*t*t*i+t*t*t*c,r*r*r*p+3*r*r*t*n+3*r*t*t*s+t*t*t*l]}),u=i,d=s;continue}else if(r===`Q`||r===`T`){let[e,n]=r===`Q`?[h()+y,h()+b]:[2*a-u,2*o-d],i=h()+y,s=h()+b,c=a,l=o;v(Math.max(1,Math.ceil(Math.sqrt(.25*Math.hypot(c-2*e+i,l-2*n+s)/t))),t=>{let r=1-t;return[r*r*c+2*r*t*e+t*t*i,r*r*l+2*r*t*n+t*t*s]}),u=e,d=n;continue}else if(r===`A`){let e=Math.abs(h()),n=Math.abs(h()),r=h()*Math.PI/180,i=g(),s=g(),c=h()+y,l=h()+b,u=a,d=o;if(!e||!n)_(c,l);else{let f=Math.cos(r),p=Math.sin(r),m=(u-c)/2,h=(d-l)/2,g=f*m+p*h,_=-p*m+f*h,y=g*g/(e*e)+_*_/(n*n);y>1&&(e*=Math.sqrt(y),n*=Math.sqrt(y));let b=e*e*n*n-e*e*_*_-n*n*g*g,x=(i===s?-1:1)*Math.sqrt(Math.max(0,b/(e*e*_*_+n*n*g*g))),S=x*e*_/n,C=-x*n*g/e,w=f*S-p*C+(u+c)/2,T=p*S+f*C+(d+l)/2,E=(e,t,n,r)=>Math.atan2(e*r-t*n,e*n+t*r),D=E(1,0,(g-S)/e,(_-C)/n),O=E((g-S)/e,(_-C)/n,(-g-S)/e,(-_-C)/n);!s&&O>0?O-=2*Math.PI:s&&O<0&&(O+=2*Math.PI),v(Math.max(1,Math.ceil(Math.abs(O)/(2*Math.acos(Math.max(-1,1-t/Math.max(e,n)))))),t=>{let r=D+O*t,i=e*Math.cos(r),a=n*Math.sin(r);return[w+f*i-p*a,T+p*i+f*a]}),a=c,o=l}}u=a,d=o,!m()&&i<e.length&&!/[a-zA-Z]/.test(e[i])&&i++}}return f&&f.length>2&&n.push(f),n}var er=4,tr=.001,nr=2,rr=12,ir=1e9,ar=class{gl;cache=new Map;insets=new Map;canvas=new OffscreenCanvas(1,1);ctx=this.canvas.getContext(`2d`,{willReadFrequently:!0});constructor(e){this.gl=e}get(e){if(e.type!==`rect`&&e.type!==`field`||e.rotate||e.grow||e.ring||e.type===`rect`&&e.ripple[0])return null;let t=e.type===`field`?`${e.key}|${e.hw}x${e.hh}|${e.cx},${e.cy}`:`r|${e.cx},${e.cy},${e.hw},${e.hh},${e.radius}`,n=this.cache.get(t);return n||(n=this.make(e),this.cache.set(t,n)),n}inset(e){let t=this.get(e);if(!t)return null;let n=this.insets.get(t);if(!n){let{data:e,n:r}=t,i=new Float32Array(r*2),a=-1/0,o=1/0,s=0;for(let t=0;t<r;t++)e[t*2]>-1e9&&(a=Math.max(a,e[t*2]),o=Math.min(o,e[t*2+1]));for(let t=0;t<r;t++){let n=e[t*2],r=e[t*2+1],c=n<=-1e9||n<r;i[t*2]=c?ir:a-n,i[t*2+1]=c?ir:r-o,c||(s=Math.max(s,i[t*2],i[t*2+1]))}n={...this.upload(i,r),y0:t.y0,step:t.step,n:r,most:s},this.insets.set(t,n)}return n}make(e){let{gl:t}=this,n=Math.min(t.getParameter(t.MAX_TEXTURE_SIZE),8192),r=e.hh*2,i=e.cy-e.hh,a=Math.min(Math.ceil(r*er)+1,n),o=r/(a-1),s=e.type===`rect`?this.rounded(e,a,o):this.keyed(e,a,o)??this.traced(e,a,o);return{...this.upload(s,a),y0:i,step:o,n:a}}upload(e,t){let{gl:n}=this,r=n.createTexture();return n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,r),W(n,n.NEAREST,n.NEAREST),n.texImage2D(n.TEXTURE_2D,0,n.RG32F,t,1,0,n.RG,n.FLOAT,e),{tex:r,data:e}}rounded(e,t,n){let r=new Float32Array(t*2),i=e.cx-e.hw,a=e.hw*2,o=e.hh*2,s=Math.min(e.radius,e.hw,e.hh);for(let e=0;e<t;e++){let t=e*n,c=t<s?s-t:t>o-s?t-(o-s):0,l=s-Math.sqrt(Math.max(0,s*s-c*c));r[e*2]=i+a-l,r[e*2+1]=i+l}return r}keyed(e,t,n){let r=new Float32Array(t*2),i=e.cx-e.hw,a=e.key.split(`|`);if(a[0]!==`p`||a.length!==5)return null;let[o,s,c,l]=a[2].split(`,`).map(Number),{hw:u,hh:d}=e.source??e,f=u*2/c,p=d*2/l,m=new Float64Array(t).fill(1/0),h=new Float64Array(t).fill(-1/0);for(let e of $n(a[1],tr/Math.max(f,p))){let r=e.length/2;for(let i=0;i<r;i++){let a=(e[2*i]-o)*f,c=(e[2*i+1]-s)*p,l=(i+1)%r,u=(e[2*l]-o)*f,d=(e[2*l+1]-s)*p,g=Math.min(c,d),_=Math.max(c,d);for(let e=Math.max(0,Math.ceil(g/n)),r=Math.min(t-1,Math.floor(_/n));e<=r;e++){let t=e*n,r=c===d?[a,u]:[a+(t-c)*(u-a)/(d-c)];for(let t of r)t<m[e]&&(m[e]=t),t>h[e]&&(h[e]=t)}}}for(let e=0;e<t;e++)h[e]<m[e]?(r[e*2]=-1e9,r[e*2+1]=ir):(r[e*2]=i+h[e],r[e*2+1]=i+m[e]);return r}traced(e,t,n){let{canvas:r,ctx:i}=this,a=e.hw*2,o=e.cx-e.hw,s=Math.ceil(a*nr)+1;r.width=s,r.height=t,i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,s,t),i.fillStyle=`#fff`;let c=(s-1)/a,l=1/n;i.setTransform(c,0,0,l,.5,.5);let u=null,d,f=null,p=i.fill.bind(i);i.fill=((e,t)=>{e instanceof Path2D&&(u=e,d=t,f=i.getTransform()),p(e,t)}),i.save();let{hw:m,hh:h}=e.source??e;e.draw(i,m*2,h*2),i.restore(),i.fill=p;let g=i.getImageData(0,0,s,t).data;f&&i.setTransform(f);let _=(e,t)=>i.isPointInPath(u,e,t+.5,d),v=new Float32Array(t*2);for(let e=0;e<t;e++){let t=-1,n=-1;for(let n=s-1;n>=0;n--)if(g[(e*s+n)*4+3]>127){t=n;break}for(let t=0;t<s;t++)if(g[(e*s+t)*4+3]>127){n=t;break}if(t<0){v[e*2]=-1e9,v[e*2+1]=ir;continue}let r=(t,n)=>{let r=t+.5,i=n+.5;if(!u)return(r+i)/2;if(!_(r,e))return r;for(let t=0;t<rr;t++){let t=(r+i)/2;_(t,e)?r=t:i=t}return r};v[e*2]=o+(r(t,t+1)-.5)/c,v[e*2+1]=o+(r(n,n-1)-.5)/c}return v}},or=new Set,sr=new Set,cr=null;function lr(e){return or.add(e),ur(),()=>{or.delete(e)&&e.leave(cr)}}var ur=()=>sr.forEach(e=>e()),dr=()=>!!cr,fr=()=>or,pr=e=>sr.add(e);function mr(e){if(e===cr)return;let t=cr;if(cr=e,!e)for(let e of or)e.leave(t)}var hr=new Set,gr=null,_r=new Set,vr=()=>_r.forEach(e=>e());function yr(e){let t={...e,kind:`point`};return hr.add(t),vr(),{set(e){Object.assign(t,e),vr()},remove(){hr.delete(t)&&vr()}}}function br(){return gr?[gr,...hr]:[...hr]}var xr=()=>hr,Sr=e=>{if(Array.isArray(e))return e;let t=e.getBoundingClientRect();return[t.left+t.width/2,t.top+t.height/2]},Cr=(e,t)=>{let n=Math.max(...e.color);return n<=t?0:e.reach/2*Math.sqrt(n/t-1)},wr=e=>gr=e,Tr=null,Er=-1/0;function Dr(){return performance.now()-Er>Or&&_r.forEach(e=>e()),Er=performance.now(),Tr}var Or=1e3,kr=()=>performance.now()-Er<Or,Ar=e=>Tr=e,jr=()=>Tr;function Mr(e){return _r.add(e),()=>_r.delete(e)}var Nr=new Uint8Array,Pr=new Uint8Array,Fr=new Uint8Array,Ir=new Uint8Array;function Lr(e){return Nr.length<e&&(Nr=new Uint8Array(e)),Nr.fill(0,0,e),Nr.subarray(0,e)}function Rr(e,t,n,r){let i=2*r+1,a=Math.max(t,n)+2*r;Pr.length<a&&(Pr=new Uint8Array(a),Fr=new Uint8Array(a),Ir=new Uint8Array(a));let o=(t,n,a)=>{let o=t+2*r;Pr.fill(0,0,o);for(let i=0;i<t;i++)Pr[i+r]=e[n+i*a];for(let e=0;e<o;e++)Fr[e]=e%i&&Fr[e-1]>Pr[e]?Fr[e-1]:Pr[e];for(let e=o-1;e>=0;e--)Ir[e]=e%i!==i-1&&e!==o-1&&Ir[e+1]>Pr[e]?Ir[e+1]:Pr[e];for(let r=0;r<t;r++)e[n+r*a]=Math.max(Ir[r],Fr[r+i-1])};for(let e=0;e<n;e++)o(t,e*t,1);for(let e=0;e<t;e++)o(n,e,t)}var J=16,zr=500,Br=20,Y=.25,Vr=256,Hr=32,Ur=2,Wr=32,Gr=160,Kr=1/.6,qr=8,Jr=2e3,Yr=32,Xr=16,Zr=6,Qr=100,$r=12,ei=4e6,ti=260,ni=640,ri=3,ii=10,ai=18,oi=([e,t],[n,r,i])=>{let a=e*Math.PI/180,o=t*Math.PI/180,s=n*Math.cos(a)-i*Math.sin(a),c=i*Math.cos(a)+n*Math.sin(a);return[s,r*Math.cos(o)+c*Math.sin(o),c*Math.cos(o)-r*Math.sin(o)]},si=.75,ci=1.565,li={n:0,at:new Float32Array,color:new Float32Array},ui=`#version 300 es
uniform vec4 uRect, uUv;
uniform mat3 uH;
out vec2 vUv;
void main() {
  vec2 c = vec2(gl_VertexID & 1, gl_VertexID >> 1);
  vUv = mix(uUv.xy, uUv.zw, c);
  vec3 p = uH * vec3(mix(uRect.x, uRect.z, c.x), mix(uRect.y, uRect.w, c.y), 1.0);
  gl_Position = vec4(p.xy, 0.0, p.z);
}`,di=`#version 300 es
precision mediump float;
uniform sampler2D tP;
uniform float uGain, uSmear, uOver;
in vec2 vUv;
out vec4 o;
void main() {
  if (uOver > 0.0) {
    vec2 dx = dFdx(vUv), dy = dFdy(vUv);
    vec4 c = vec4(0.0);
    for (int i = 0; i < 16; i++) for (int j = 0; j < 16; j++) {
      vec2 q = vUv + dx * ((float(i) + 0.5) / 16.0 - 0.5) + dy * ((float(j) + 0.5) / 16.0 - 0.5);
      if (q == clamp(q, 0.0, 1.0)) c += texture(tP, q);
    }
    o = c / 256.0 * uGain;
    return;
  }
  if (uSmear <= 0.0) { o = texture(tP, vUv) * uGain; return; }
  vec4 c = vec4(0.0);
  float n = 0.0;
  for (int i = -3; i <= 3; i++) {
    float w = exp(-float(i * i) / 4.5);
    c += texture(tP, vUv + vec2(float(i) * uSmear / 3.0, 0.0)) * w;
    n += w;
  }
  o = c / n * uGain;
}`,fi=`#version 300 es
precision highp float;
uniform sampler2D tP, tBend;
uniform vec2 uStagePx, uUvPerMm;
uniform float uGain;
in vec2 vUv;
out vec4 o;
void main() {
  vec2 d = texture(tBend, gl_FragCoord.xy / uStagePx).rg;
  o = texture(tP, vUv + vec2(d.x, -d.y) * uUvPerMm) * uGain;
}`,pi=[1,0,0,0,1,0,0,0,1];function mi(e,t){let n=[];for(let r=0;r<3;r++)for(let i=0;i<3;i++)n.push(e[r*3]*t[i]+e[r*3+1]*t[3+i]+e[r*3+2]*t[6+i]);return n}function hi(e,t){let n=Math.floor(e.x*t),r=Math.floor(e.y*t);return{x:n,y:r,w:Math.ceil((e.x+e.w)*t)-n,h:Math.ceil((e.y+e.h)*t)-r}}var X=(e,t)=>e.x<t.x+t.w&&t.x<e.x+e.w&&e.y<t.y+t.h&&t.y<e.y+e.h,gi=(e,t)=>({x:e.x-t,y:e.y-t,w:e.w+t*2,h:e.h+t*2});function _i(e){let t=[];for(let n of e){for(let e=t.length-1;e>=0;e--)X(t[e],n)&&(n=K(n,t[e]),t.splice(e,1),e=t.length);t.push(n)}return t.length>Zr?[t.reduce((e,t)=>K(e,t))]:t}var vi=e=>!!e&&(e[0]>0||e[1]>0||e[2]>0),yi=e=>e.op===`screen`||e.op===`frost`||e.op===`glow`||(e.op===`surface`?vi(e.material.emit):e.op===`cut`&&vi(e.emit)),bi=e=>e>=1.5?2:1,xi=e=>({right:e.cw-e.x,bottom:e.ch-e.y,cx:e.cw/2,cy:e.ch/2,long:Math.max(e.cw-e.y*2,e.ch-e.y*2)}),Si=(e,t)=>{let n=e.pointer,r=e.lampFor?.(t,n.x,n.y);return r?{...n,x:r[0],y:r[1]}:n},Ci=(e,t)=>!!e.spin||!!e.lean&&(t.carried?e.hand>0:!!e.turn[0]||!!e.turn[1]);function wi(e){let t=(e.rotate%Math.PI+Math.PI)%Math.PI/Math.PI;return!e.rotate||e.hw===e.hh&&e.radius>=e.hw||t<1e-6||t>1-1e-6?{...e,rotate:0}:Math.abs(t-.5)<1e-6?{...e,rotate:0,hw:e.hh,hh:e.hw}:null}var Ti=class{stats;window;ok=!1;lost=!1;probe=!1;player=null;fields=null;sections=null;store=new An;madeFor=new Set;allocated=!1;askedAt=-1/0;askTimer=0;refusedBench=!1;refused=()=>{};plates=new Set;canvas=null;bench=null;benchTex=null;sheet={width:0,height:0};staged=!1;show_=null;lens=null;exposure=1;backdrop=[0,0,0];bent=null;glowAt=null;glowReads=[];glowBack=null;emitters=[];gl=null;mat=null;block=null;recorder=null;wea=null;con=null;occ=null;vao=null;screenTex=null;dark=null;rooms=null;px=new Uint8Array(4);pxLight=new Float32Array(4);fieldRoom=1/0;proven=!1;fence=null;fenced=0;mipFrom=null;heightFormat=0;maxSide=4096;undersides=!1;relief=!1;split=!1;raised=!0;targets=[];drawn=0;made=0;constructor(e,t,n=()=>[innerWidth*devicePixelRatio,innerHeight*devicePixelRatio]){this.stats=e,this.window=n;let r=document.createElement(`canvas`),i=r.getContext(`webgl2`,{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:`high-performance`});i&&i.getExtension(`EXT_color_buffer_float`)&&(this.canvas=r,this.sheet=r,this.gl=i,this.init(),this.ok=!0,r.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),this.lost=!0,this.fence=null,this.store.lost(),this.player?.lost(),this.madeFor.clear(),this.painting.clear();for(let e of this.plates)e.tex=e.picture=null;this.bench=this.benchTex=null,this.glowReads=[],this.glowAt=null,this.lens=null,mr(null)}),r.addEventListener(`webglcontextrestored`,()=>{this.lost=!1,this.init(),this.staged&&mr(i),t()}))}open(e){let t=new Vn(e);return this.plates.add(t),t}showRelief(e){this.raised=e,this.recorder&&(this.recorder.relief=e)}set blankScreens(e){this.recorder.blank=e}set standIn(e){this.recorder.stand=e}readMaps(e){let t=e.tex;if(!t||!e.ready||!t.H||!t.S||!t.C||!t.O)return null;let{gl:n}=this,r=e.map,i=e.spec,a=n.getParameter(n.FRAMEBUFFER_BINDING),o=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,o);let s=(e,t,r,i)=>(n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0),n.readPixels(0,0,t,r,n.RGBA,i instanceof Float32Array?n.FLOAT:n.UNSIGNED_BYTE,i),i),c=r.w*r.h*4,l=e=>e?s(e,r.w,r.h,new Uint8Array(c)):null,u=bi(i.dpr),d=Math.ceil(i.pw/u),f=Math.ceil(i.ph/u),p={w:r.w,h:r.h,x:r.x,y:r.y,pw:i.pw,ph:i.ph,cw:i.cw,ch:i.ch,dpr:i.dpr,split:this.split,tall:e.tall,A:l(t.A),H:s(t.H,r.w,r.h,new Float32Array(c)),S:l(t.S),M:this.targets.length>4?l(t.M):null,E:l(t.E),C:l(t.C),D:t.D?s(t.D,r.w,r.h,new Float32Array(c)):null,N:l(t.N),O:{w:d,h:f,data:s(t.O,d,f,new Uint8Array(d*f*4))},panes:[...e.panes??[]],peak:e.peak};return n.bindFramebuffer(n.FRAMEBUFFER,a),n.deleteFramebuffer(o),p}close(e){this.plates.delete(e),this.free(e),this.player?.close(e),this.freePicture(e),this.store.drop(e),this.madeFor.delete(e)}making_(e,t){this.store.room(t),this.allocated=!0,e&&this.madeFor.add(e)}begin(e,t){this.drawn=this.stats.paints+this.stats.lights,this.made=this.fields.generated,this.taken(),this.fieldRoom=e?1/0:t?ei*8:ei,this.store.next(),this.glowCollect()}glowCollect(){let{gl:e}=this;for(;this.glowReads.length&&e.clientWaitSync(this.glowReads[0].sync,0,0)!==e.TIMEOUT_EXPIRED;){let t=this.glowReads.shift(),n=new Uint8Array(t.w*t.h*4);e.bindBuffer(e.PIXEL_PACK_BUFFER,t.pbo),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,n),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),e.deleteSync(t.sync),e.deleteBuffer(t.pbo),this.glowBack={w:t.w,h:t.h,data:n,shots:t.shots}}}end(){if(this.stats.paints+this.stats.lights===this.drawn&&this.fields.generated===this.made)return this.asking();let{gl:e}=this;return this.fence&&e.deleteSync(this.fence),this.fence=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0),this.fenced=performance.now(),e.flush(),this.asking()}asking(){if(!this.allocated)return!1;let e=Math.max(this.askedAt+zr-performance.now(),this.behind()?Br:0);return e<=0||(this.askTimer||=window.setTimeout(()=>{this.askTimer=0,this.taken(),this.asking()},e),!1)}late(){return performance.now()-this.fenced>$r}making(e){if(!e.wanted)return!1;let t=e.wanted=this.fields.missing(e.wanted,e.spec.dpr),n=[];for(;t.length&&this.fieldRoom>0;){let r=t.pop();this.fieldRoom-=this.fields.cost(r,e.spec.dpr),n.push(r)}return this.fields.make(n,e.spec.dpr),t.length?!0:(e.wanted=null,!1)}behind(){let{gl:e,fence:t}=this;return!!t&&e.getSyncParameter(t,e.SYNC_STATUS)!==e.SIGNALED}taken(){if(!this.allocated||this.lost)return;let e=performance.now();if(e-this.askedAt<zr||this.behind())return;this.askedAt=e,this.allocated=!1;let{gl:t}=this,n=[...this.madeFor];this.madeFor.clear();let r=!1;for(let e=t.getError();e!==t.NO_ERROR&&e!==t.CONTEXT_LOST_WEBGL;e=t.getError())r||=e===t.OUT_OF_MEMORY||e===t.INVALID_OPERATION||e===t.INVALID_VALUE;if(r||this.refusedBench){r&&this.store.refused(),this.refusedBench=!1;for(let e of n)this.free(e),this.freePicture(e);this.refused()}}memory(){let e=this.store.kinds(),t=this.rooms?.bytes??0,n=0;for(let e of this.plates)e.tex&&n++;return{textures:e.maps+e.bake+e.hold,pictures:e.picture,fields:e.field,room:t,stage:e.stage-t,live:n}}recover(){let{gl:e}=this,{drawing:t,later:n}=this.recorder;return this.recorder.drawing=null,n.length=0,this.block.send(),e.bindFramebuffer(e.FRAMEBUFFER,this.bench),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.activeTexture(e.TEXTURE0),t}init(){let{gl:e}=this;e.getExtension(`EXT_color_buffer_float`),this.maxSide=e.getParameter(e.MAX_TEXTURE_SIZE),this.heightFormat=e.getExtension(`OES_texture_float_linear`)&&e.getExtension(`EXT_float_blend`)?e.RGBA32F:e.RGBA16F,this.targets=[e.COLOR_ATTACHMENT0,e.COLOR_ATTACHMENT1,e.COLOR_ATTACHMENT2,e.COLOR_ATTACHMENT3];let t=e.getParameter(e.MAX_DRAW_BUFFERS),n=t>4;n&&this.targets.push(e.COLOR_ATTACHMENT4),this.relief=this.heightFormat===e.RGBA16F&&t>5,this.split=this.heightFormat===e.RGBA32F&&t>5,this.split&&(this.heightFormat=e.R32F),(this.relief||this.split)&&this.targets.push(e.COLOR_ATTACHMENT5),this.undersides=t>6;let r=e=>this.relief||this.split?e.replace(`#version 300 es`,`#version 300 es\n#define ${this.relief?`RELIEF`:`SPLIT`}`):e,i=U(e,wt,(e=>r((n?e:e.replace(`layout(location=4) out vec4 oM;`,`vec4 oM;`)).replace(`layout(location=6) out vec4 oU;`,this.undersides?`$&`:`vec4 oU;`)))(Tt)),a=U(e,ht,r(Dt)),o=U(e,ht,Et),s=U(e,ht,Ot);this.mat=i.finish(),this.block=new ct(e,this.mat.program,`Command`),this.wea=a.finish(),this.con=o.finish(),this.occ=s.finish(),this.vao=e.createVertexArray(),e.bindVertexArray(this.vao),this.screenTex=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.screenTex),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,1,1,0,e.RGBA,e.UNSIGNED_BYTE,null),W(e,e.LINEAR,e.LINEAR),this.dark=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.dark),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,1,1,0,e.RGBA,e.UNSIGNED_BYTE,null),W(e,e.NEAREST,e.NEAREST),this.fields=new Fn(e,this.store),this.sections=new ar(e),this.recorder=new vn(e,this.block,this.fields,this.screenTex),this.recorder.relief=this.raised,this.rooms=new Un(e);let c=()=>{};this.store.hold(`rooms`,`stage`,()=>this.rooms.bytes,c),this.store.hold(`lens`,`stage`,()=>this.lens?.bytes??0,c),this.store.hold(`bench`,`stage`,()=>this.benchTex?this.sheet.width*this.sheet.height*8:0,c),this.store.hold(`glow`,`stage`,()=>this.glowAt?this.glowAt.w*this.glowAt.h*4:0,c),this.mipFrom=e.createFramebuffer(),this.show_=U(e,ui,di).finish(),this.bent=U(e,ui,fi).finish(),this.staged&&this.makeBench()}held(){let{gl:e,fence:t}=this;return t?e.getSyncParameter(t,e.SYNC_STATUS)!==e.SIGNALED&&performance.now()-this.fenced<Qr||(e.deleteSync(t),this.fence=null,!1):!1}prepare(e){if(e.tex||this.allocTextures(e,null),e.mask){let{gl:t}=this;t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,e.tex.mask),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.R8,e.spec.pw,e.spec.ph,0,t.RED,t.UNSIGNED_BYTE,e.mask),t.generateMipmap(t.TEXTURE_2D),e.mask=null,e.tex.blank=!1}}unlabelled(e){return!!e.tex?.blank&&!e.mask}condition(e){let t=e.spec,n=[t.pw,t.ph,t.seed,t.prints,t.dust,t.scuff,t.haze].join(),r=e.tex;if(n===e.drawn&&r.C)return;e.drawn=n;let{gl:i}=this,{u:a,program:o}=this.con;i.bindFramebuffer(i.FRAMEBUFFER,r.condition),r.C||(r.C=this.target(e,i.RGBA8,1),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,r.C,0)),i.viewport(-e.map.x,-e.map.y,t.pw,t.ph),i.drawBuffers([i.COLOR_ATTACHMENT0]),i.disable(i.BLEND),i.useProgram(o),i.uniform2f(a.uCanvas,t.cw,t.ch),i.uniform4f(a.uBox,0,0,t.cw,t.ch),i.uniform2f(a.uSeed,t.seed*73.1%997,t.seed*41.7%991),i.uniform1f(a.uPrints,t.prints),i.uniform1f(a.uDust,t.dust),i.uniform1f(a.uScuff,t.scuff),i.uniform1f(a.uHaze,t.haze),i.drawArrays(i.TRIANGLE_STRIP,0,4),i.bindFramebuffer(i.FRAMEBUFFER,this.bench)}occlusion(e,t){let n=e.spec,{gl:r}=this,{u:i,program:a}=this.occ,o=bi(n.dpr),s=e.tex;r.bindFramebuffer(r.FRAMEBUFFER,s.occlusion),s.O||(s.O=r.createTexture(),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,s.O),r.texStorage2D(r.TEXTURE_2D,1,r.RGBA8,Math.ceil(n.pw/o),Math.ceil(n.ph/o)),W(r,r.LINEAR,r.LINEAR),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,s.O,0),t=null),r.viewport(0,0,Math.ceil(n.pw/o),Math.ceil(n.ph/o)),t&&this.clip(gi(t,80/Math.min(n.dpr,1)),n.pw/n.cw/o,0),r.drawBuffers([r.COLOR_ATTACHMENT0]),r.useProgram(a),r.uniform2f(i.uCanvas,n.cw,n.ch),r.uniform4f(i.uBox,0,0,n.cw,n.ch),r.uniform1f(i.uDpr,n.dpr),r.uniform4f(i.uMap,...this.mapUv(e)),r.uniform1i(i.tH,0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,e.tex.H),r.drawArrays(r.TRIANGLE_STRIP,0,4),r.bindFramebuffer(r.FRAMEBUFFER,this.bench)}allocTextures(e,t){let n=e.spec,{gl:r}=this;this.making_(e,e.map.w*e.map.h*40+n.pw*n.ph*3),this.store.hold(e,`maps`,()=>e.tex?this.mapBytes(e):0,()=>this.freeMaps(e),void 0,()=>e.tex?Math.max(this.mapBytes(e),e.tex.most):0);let i=this.levels(e),a=this.target(e,r.SRGB8_ALPHA8,i),o=this.split?this.target(e,r.RGBA8,i):null,s=t??r.createTexture();t||(r.bindTexture(r.TEXTURE_2D,s),W(r,r.LINEAR_MIPMAP_LINEAR,r.LINEAR));let c=r.createFramebuffer(),l=r.createFramebuffer(),u=r.createFramebuffer(),d=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,c),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,a,0),o&&r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT5,r.TEXTURE_2D,o,0),r.bindFramebuffer(r.FRAMEBUFFER,l),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,a,0),r.bindFramebuffer(r.FRAMEBUFFER,this.bench);let f=Math.ceil(n.cw/J),p=Math.ceil(n.ch/J),m=r.createTexture();r.activeTexture(r.TEXTURE7),r.bindTexture(r.TEXTURE_2D,m),r.texStorage2D(r.TEXTURE_2D,1,r.RG8,f,p),W(r,r.NEAREST,r.NEAREST),r.activeTexture(r.TEXTURE0);let h=[...this.targets];h[3]=r.NONE,e.tex={A:a,H:null,S:null,E:null,targets:h,M:null,D:null,N:o,U:null,C:null,O:null,mask:s,fbo:c,weather:l,condition:u,occlusion:d,tops:new Uint8Array(f*p*2),tw:f,th:p,T:m,back:null,under:null,own:null,deep:null,most:0,blank:!1},e.drawn=``,this.work(e)}take(e){if(this.player)for(let t of[...this.painting])t!==e&&t.spare===void 0&&this.spare(t,!0)}painting=new Set;work(e){let{gl:t}=this,n=e.tex,r=this.levels(e);if(this.take(e),t.activeTexture(t.TEXTURE0),n.H??=this.target(e,this.heightFormat,r),this.split&&!n.N&&(n.N=this.target(e,t.RGBA8,r),t.bindFramebuffer(t.FRAMEBUFFER,n.fbo),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT5,t.TEXTURE_2D,n.N,0)),n.S=this.target(e,t.RGBA8,1),this.targets.length>4?n.M=this.target(e,t.RGBA8,1):(n.M=t.createTexture(),t.bindTexture(t.TEXTURE_2D,n.M),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array([0,0,255,255])),W(t,t.NEAREST,t.NEAREST)),this.relief&&(n.D=this.target(e,t.R16F,r)),t.bindFramebuffer(t.FRAMEBUFFER,n.fbo),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT1,t.TEXTURE_2D,n.H,0),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT2,t.TEXTURE_2D,n.S,0),this.targets.length>4&&t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT4,t.TEXTURE_2D,n.M,0),n.D&&t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT5,t.TEXTURE_2D,n.D,0),!this.proven&&t.checkFramebufferStatus(t.FRAMEBUFFER)!==t.FRAMEBUFFER_COMPLETE)throw Error(`framebuffer incomplete`);this.proven=!0,t.bindFramebuffer(t.FRAMEBUFFER,n.weather),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT1,t.TEXTURE_2D,n.S,0),this.painting.add(e),t.bindFramebuffer(t.FRAMEBUFFER,this.bench),e.drawn=``}hold(e,t){e.keep!==t&&(e.keep=t,t||this.settle(e))}working(e){return!!e.tex?.S}rest(e){this.player&&(clearTimeout(e.spare),e.spare=setTimeout(()=>this.spare(e),Jr))}settle(e){e.spare===void 0&&this.spare(e)}spare(e,t=!1){let{gl:n}=this,r=e.tex;if(clearTimeout(e.spare),e.spare=void 0,this.lost||!r?.S||e.keep&&!t||!this.player||!(t?this.player.repack(e):this.player.current(e)))return;r.most=this.mapBytes(e);let i=(e,t)=>{n.bindFramebuffer(n.FRAMEBUFFER,e),n.framebufferTexture2D(n.FRAMEBUFFER,t,n.TEXTURE_2D,null,0)};i(r.fbo,n.COLOR_ATTACHMENT1),n.deleteTexture(r.H),r.H=null,r.N&&=(i(r.fbo,n.COLOR_ATTACHMENT5),n.deleteTexture(r.N),null),i(r.fbo,n.COLOR_ATTACHMENT2),i(r.weather,n.COLOR_ATTACHMENT1),this.targets.length>4&&i(r.fbo,n.COLOR_ATTACHMENT4),r.D&&i(r.fbo,n.COLOR_ATTACHMENT5),i(r.condition,n.COLOR_ATTACHMENT0),i(r.occlusion,n.COLOR_ATTACHMENT0);for(let e of[r.S,r.M,r.D,r.C,r.O])e&&n.deleteTexture(e);r.S=r.M=r.D=r.C=r.O=null,this.freeBack(e),this.freeUnder(e),n.bindTexture(n.TEXTURE_2D,r.mask),n.texImage2D(n.TEXTURE_2D,0,n.R8,1,1,0,n.RED,n.UNSIGNED_BYTE,null),r.blank=!0,n.bindFramebuffer(n.FRAMEBUFFER,this.bench),this.painting.delete(e),this.painting.size||this.fields.clear()}get room(){let[e,t]=this.window(),n=(e,t)=>Math.min(Math.ceil(e/Vr)*Vr,t,this.maxSide);return[n(e,this.ceiling[0]),n(t,this.ceiling[1])]}grow(){let[e,t]=this.room,n=this.sheet;if(e===n.width&&t===n.height)return;if(n.width=e,n.height=t,this.staged)return this.sizeBench();let{drawingBufferWidth:r,drawingBufferHeight:i}=this.gl;(r<n.width||i<n.height)&&(this.ceiling=[r,i],n.width=r,n.height=i)}ceiling=[1/0,1/0];fit(e){return Math.min(1,this.sheet.width/e.pw,this.sheet.height/e.ph)}levels(e){return Math.floor(Math.log2(Math.max(e.map.w,e.map.h)))+1}target(e,t,n){let{gl:r}=this,i=r.createTexture();return r.bindTexture(r.TEXTURE_2D,i),r.texStorage2D(r.TEXTURE_2D,n,t,e.map.w,e.map.h),W(r,n>1?r.LINEAR_MIPMAP_LINEAR:r.LINEAR,r.LINEAR),i}free(e){this.freeMaps(e)}freeMaps(e){if(this.store.drop(e,`maps`),this.player?.drop(e),this.painting.delete(e),clearTimeout(e.spare),e.spare=void 0,!e.tex)return;let{gl:t}=this,{A:n,H:r,S:i,E:a,M:o,D:s,N:c,C:l,O:u,T:d,mask:f,fbo:p,weather:m,condition:h,occlusion:g,back:_,under:v,own:y,deep:b}=e.tex;if(!this.lost){for(let e of[n,r,i,a,o,s,c,l,u,d,f,_?.A,_?.E,_?.S,v?.H,v?.N,y?.H])e&&t.deleteTexture(e);y&&t.deleteFramebuffer(y.fbo),b&&t.deleteRenderbuffer(b),t.deleteFramebuffer(p),t.deleteFramebuffer(m),t.deleteFramebuffer(h),t.deleteFramebuffer(g),_&&t.deleteFramebuffer(_.fbo),v&&t.deleteFramebuffer(v.fbo),v?.nfbo&&t.deleteFramebuffer(v.nfbo)}e.tex=null}mapBytes(e){let{gl:t}=this,n=e.spec,r=e.tex,i=this.heightFormat===t.RGBA32F?16:this.heightFormat===t.R32F?4:8,a=(4+(r.H?i:0)+(r.D?2:0)+(r.N?4:0))*(4/3)+(r.E?4:0)+(r.S?4:0)+(r.C?4:0)+(r.S&&this.targets.length>4?4:0)+(r.U?2:0)+(r.own?(this.ownFormat()===t.R16F?2:4)+4:0),o=e=>e?e.w*e.h:0,s=o(r.back?.box)*12*(4/3)+o(r.under?.box)*(i+(r.under?.N?4:0))*(4/3),c=(r.O?4/bi(n.dpr)**2:0)+(r.blank?0:4/3);return e.map.w*e.map.h*a+s+n.pw*n.ph*c+r.tops.length+(this.player?.bytes(e)??0)}mapFor(e,t,n){let r=e.spec,i=r.pw/r.cw,a=null;for(let e of t)a=K(a,G(e));for(let e of n)a=K(a,{x:e.box.x/Y,y:e.box.y/Y,w:e.box.w/Y,h:e.box.h/Y});if(!a)return{x:0,y:0,w:r.pw,h:r.ph};let o=hi(gi(a,qr),i),s=Math.max(Math.floor(o.x/Yr)*Yr,0),c=Math.max(Math.floor(o.y/Yr)*Yr,0),l=Math.min(o.x+o.w,r.pw),u=Math.min(o.y+o.h,r.ph);return{x:s,y:c,w:Math.max(l-s,1),h:Math.max(u-c,1)}}mapUv(e){let t=e.spec,n=e.map;return[t.pw/n.w,t.ph/n.h,-n.x/n.w,-n.y/n.h]}clipMap(e,t){let{gl:n}=this,r=e.spec,{x:i,y:a,w:o,h:s}=hi(t,r.pw/r.cw);n.enable(n.SCISSOR_TEST),n.scissor(i-e.map.x,a-e.map.y,o,s)}onMap(e,t){let n=e.map;if(!t)return{x:0,y:0,w:n.w,h:n.h};let r=hi(t,e.spec.pw/e.spec.cw),i=Math.max(r.x-n.x,0),a=Math.max(r.y-n.y,0);return{x:i,y:a,w:Math.max(Math.min(r.x-n.x+r.w,n.w)-i,0),h:Math.max(Math.min(r.y-n.y+r.h,n.h)-a,0)}}cropOf(e,t){let n=e.map,r=this.onMap(e,t),i=Math.max(Math.floor(r.x/Yr)*Yr,0),a=Math.max(Math.floor(r.y/Yr)*Yr,0);return{x:i,y:a,w:Math.max(Math.min(r.x+r.w,n.w)-i,1),h:Math.max(Math.min(r.y+r.h,n.h)-a,1)}}copyBox(e,t,n){if(!n)return t;let r=this.cropOf(e,n);return t&&t.x<=r.x&&t.y<=r.y&&t.x+t.w>=r.x+r.w&&t.y+t.h>=r.y+r.h?t:r}cropUv(e,t){let n=e.map;return t?[n.w/t.w,n.h/t.h,-t.x/t.w,-t.y/t.h]:[1,1,0,0]}capture(e,t,n,r){let{gl:i}=this,a=e.tex,o=this.copyBox(e,a.back?.box,r);if(a.back&&a.back.box!==o&&this.freeBack(e),!a.back){let e=Math.floor(Math.log2(Math.max(o.w,o.h)))+1,t=t=>{let n=i.createTexture();return i.bindTexture(i.TEXTURE_2D,n),i.texStorage2D(i.TEXTURE_2D,e,t,o.w,o.h),W(i,i.LINEAR_MIPMAP_LINEAR,i.LINEAR),n},n=t(i.SRGB8_ALPHA8),r=t(i.SRGB8_ALPHA8),s=t(i.RGBA8),c=i.createFramebuffer();i.bindFramebuffer(i.FRAMEBUFFER,c),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,n,0),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT1,i.TEXTURE_2D,r,0),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT2,i.TEXTURE_2D,s,0),a.back={A:n,E:r,S:s,fbo:c,box:o},i.bindTexture(i.TEXTURE_2D,a.mask)}let{A:s,E:c,S:l,fbo:u,box:d}=a.back,f=this.onMap(e,n),p=Math.max(f.x,d.x),m=Math.max(f.y,d.y),h=Math.min(f.x+f.w,d.x+d.w)-p,g=Math.min(f.y+f.h,d.y+d.h)-m;i.bindFramebuffer(i.READ_FRAMEBUFFER,a.fbo),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,u);let _=(e,t)=>{h<=0||g<=0||(i.readBuffer(e),i.drawBuffers(t===i.COLOR_ATTACHMENT0?[t]:t===i.COLOR_ATTACHMENT1?[i.NONE,t]:[i.NONE,i.NONE,t]),i.blitFramebuffer(p,m,p+h,m+g,p-d.x,m-d.y,p-d.x+h,m-d.y+g,i.COLOR_BUFFER_BIT,i.NEAREST))};i.disable(i.BLEND);let v=i.isEnabled(i.SCISSOR_TEST);i.disable(i.SCISSOR_TEST),_(i.COLOR_ATTACHMENT0,i.COLOR_ATTACHMENT0),_(i.COLOR_ATTACHMENT3,i.COLOR_ATTACHMENT1),a.S&&_(i.COLOR_ATTACHMENT2,i.COLOR_ATTACHMENT2);for(let[e,n]of[[i.TEXTURE3,s],[i.TEXTURE4,c],[i.TEXTURE5,l]])i.activeTexture(e),i.bindTexture(i.TEXTURE_2D,n),t&&i.generateMipmap(i.TEXTURE_2D);i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.bindFramebuffer(i.FRAMEBUFFER,a.fbo),i.readBuffer(i.COLOR_ATTACHMENT0),i.drawBuffers(a.targets),i.enable(i.BLEND),v&&i.enable(i.SCISSOR_TEST)}weather(e,t){let n=e.spec,{gl:r}=this,{u:i,program:a}=this.wea;n.pw/n.cw,r.bindFramebuffer(r.FRAMEBUFFER,e.tex.weather),r.viewport(-e.map.x,-e.map.y,n.pw,n.ph),r.drawBuffers([r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1]),r.useProgram(a),r.uniform2f(i.uCanvas,n.cw,n.ch),r.uniform4f(i.uBox,0,0,n.cw,n.ch),r.uniform4f(i.uMap,...this.mapUv(e)),r.uniform2f(i.uSeed,n.seed*73.1%997,n.seed*41.7%991),r.uniform1f(i.uAge,n.grime),r.uniform1f(i.uDpr,n.dpr),r.uniform1i(i.tH,0),r.uniform1i(i.tN,1),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,e.tex.N),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,e.tex.H),r.enable(r.BLEND),r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);for(let n of t??[null])n&&this.clipMap(e,n),r.drawArrays(r.TRIANGLE_STRIP,0,4);r.disable(r.SCISSOR_TEST),r.disable(r.BLEND),r.bindFramebuffer(r.FRAMEBUFFER,this.bench)}raise(e,t,n,r=[]){let{tops:i,tw:a,th:o}=e.tex,s=Math.max(e.peak/.6/Y,48),c=[];for(let r of t)`zTop`in r&&c.push([G(r),Math.min(Math.ceil((pt(r)+n)/e.tall*255),255)]);for(let t of r)c.push([{x:t.box.x/Y,y:t.box.y/Y,w:t.box.w/Y,h:t.box.h/Y},Math.min(Math.ceil(t.hi/e.tall*255),255)]);let l=(e,t,n,r)=>{let s=Math.max(Math.floor((e.x-t)/J),0),c=Math.min(Math.floor((e.x+e.w+t)/J),a-1),l=Math.max(Math.floor((e.y-t)/J),0),u=Math.min(Math.floor((e.y+e.h+t)/J),o-1);for(let e=l;e<=u;e++)for(let t=s,o=(e*a+t)*2+n;t<=c;t++,o+=2)i[o]<r&&(i[o]=r)};for(let[e,t]of c)l(e,48,0,t);let u=Math.ceil(s/J),d=Math.max(1,Math.ceil(u/16)),f=Math.floor(u/d)+1,p=e=>[Math.floor(Math.floor(e.x/J)/d),Math.floor(Math.floor((e.x+e.w)/J)/d),Math.floor(Math.floor(e.y/J)/d),Math.floor(Math.floor((e.y+e.h)/J)/d)],m=1/0,h=-1/0,g=1/0,_=-1/0,v=0;for(let[e]of c){let[t,n,r,i]=p(e);m=Math.min(m,t-f),h=Math.max(h,n+f),g=Math.min(g,r-f),_=Math.max(_,i+f),v+=((n-t+1)*d+2*u)*((i-r+1)*d+2*u)}m=Math.max(m,-f),h=Math.min(h,Math.floor((a-1)/d)+f),g=Math.max(g,-f),_=Math.min(_,Math.floor((o-1)/d)+f);let y=h-m+1,b=_-g+1;if(y>0&&b>0&&v<4*y*b*d*d)for(let[e,t]of c)l(e,s,1,t);else if(y>0&&b>0){let e=Lr(y*b);for(let[t,n]of c){let[r,i,a,o]=p(t);for(let t=Math.max(a,g);t<=Math.min(o,_);t++)for(let a=Math.max(r,m),o=(t-g)*y+a-m;a<=Math.min(i,h);a++,o++)e[o]<n&&(e[o]=n)}Rr(e,y,b,f);let t=Math.max(m*d,0),n=Math.min((h+1)*d-1,a-1);for(let r=Math.max(g*d,0);r<=Math.min((_+1)*d-1,o-1);r++){let o=(Math.floor(r/d)-g)*y-m;for(let s=t,c=(r*a+s)*2+1;s<=n;s++,c+=2){let t=e[o+Math.floor(s/d)];i[c]<t&&(i[c]=t)}}}let{gl:x}=this,{T:S}=e.tex;x.activeTexture(x.TEXTURE7),x.bindTexture(x.TEXTURE_2D,S),x.pixelStorei(x.UNPACK_ALIGNMENT,1),x.texSubImage2D(x.TEXTURE_2D,0,0,0,a,o,x.RG,x.UNSIGNED_BYTE,i),x.pixelStorei(x.UNPACK_ALIGNMENT,4),x.activeTexture(x.TEXTURE0)}mips(e){let{gl:t}=this,n=t.getParameter(t.ACTIVE_TEXTURE);t.activeTexture(t.TEXTURE0+Xr),t.bindTexture(t.TEXTURE_2D,e),t.generateMipmap(t.TEXTURE_2D),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(n)}level(e,t,n){let{gl:r}=this,i=e.tex,a=this.copyBox(e,i.under?.box,n);if(i.under&&i.under.box!==a&&this.freeUnder(e),r.activeTexture(r.TEXTURE6),!i.under){let e=Math.floor(Math.log2(Math.max(a.w,a.h)))+1,t=t=>{let n=r.createTexture(),i=r.createFramebuffer();return r.bindTexture(r.TEXTURE_2D,n),r.texStorage2D(r.TEXTURE_2D,e,t,a.w,a.h),W(r,r.LINEAR_MIPMAP_LINEAR,r.LINEAR),r.bindFramebuffer(r.FRAMEBUFFER,i),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,n,0),[n,i]},[n,o]=t(this.heightFormat),[s,c]=i.N?t(r.RGBA8):[null,null];i.under={H:n,N:s,fbo:o,nfbo:c,box:a}}let o=i.under,s=o.box,c=this.onMap(e,t),l=Math.max(c.x,s.x),u=Math.max(c.y,s.y),d=Math.min(c.x+c.w,s.x+s.w)-l,f=Math.min(c.y+c.h,s.y+s.h)-u;r.bindTexture(r.TEXTURE_2D,o.H),r.activeTexture(r.TEXTURE10),r.bindTexture(r.TEXTURE_2D,o.N),r.activeTexture(r.TEXTURE0),r.disable(r.BLEND),r.disable(r.SCISSOR_TEST),r.bindFramebuffer(r.READ_FRAMEBUFFER,i.fbo);for(let[e,t,n]of[[r.COLOR_ATTACHMENT1,o.H,o.fbo],[r.COLOR_ATTACHMENT5,o.N,o.nfbo]])!t||d<=0||f<=0||(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,n),r.readBuffer(e),r.blitFramebuffer(l,u,l+d,u+f,l-s.x,u-s.y,l-s.x+d,u-s.y+f,r.COLOR_BUFFER_BIT,r.NEAREST));r.readBuffer(r.COLOR_ATTACHMENT0),this.mips(o.H),o.N&&this.mips(o.N),r.disable(r.SCISSOR_TEST),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.FRAMEBUFFER,i.fbo),r.enable(r.BLEND)}clip(e,t,n,r=0){let{gl:i}=this,{x:a,y:o,w:s,h:c}=hi(e,t);i.enable(i.SCISSOR_TEST),i.scissor(r+a,n?n-o-c:o,s,c)}edgesStale(e){let{body:t}=e.spec;return!!t&&!!e.tex&&t.some((t,n)=>t!==e&&!!t.made&&t.shaped!==e.edged[n])}known(e,t,n,r=!0){e.made=t,e.peak=this.reach(e,t,n,[],this.beside(e,!0)).peak,r&&e.shaped++,e.known=!0}beside(e,t=!1){let n=e.spec,r=[];if(!n.body)return r;let i=e=>Math.round(e*1e6)/1e6,a=e=>e.face-e.axis,o=(n.x+n.w/2)*Y,s=(n.y+n.h/2)*Y,c=a(n);for(let l of n.body){if(l===e||!l.made&&!t)continue;let u=l.spec,d=i(Math.cos(u.round-n.round)),f=i(Math.sin(u.round-n.round));if(Math.abs(d)>.01)continue;let p=(u.x+u.w/2)*Y,m=(u.y+u.h/2)*Y,h=a(u),g=[],_=[];for(let e of[u.x*Y-p,(u.x+u.w)*Y-p])for(let t of[0,l.peak-h])g.push(e*d+t*f+o),_.push(-e*f+t*d+c);let v=Math.max(..._);if(v<=0)continue;let y=Math.min(...g),b=Math.max(...g),x=u.y*Y-m+s;r.push({plate:l,turn:[d,f,u.cw*Y,u.ch*Y],at:[p,m,h],box:{x:y,y:x,w:b-y,h:u.h*Y},hi:v})}return r}section(e,t,n){let{recorder:r}=this,i=e.spec,a=(i.x+i.w/2)*Y,o=(i.y+i.h/2)*Y,s=i.face-i.axis,c=G(t);for(let e of n)for(let t of e.plate.made){if(t.op!==`surface`||!t.layer||t.bend)continue;let n=this.sections.get(t.shape);n&&(r.aim={box:c,seen:[e.turn[1],...e.at],from:[a,o,s],reach:G(t),rows:n},r.draw(t,e.plate))}r.aim=null}ownFormat(){let{gl:e}=this;return this.heightFormat===e.RGBA16F?e.R16F:e.R32F}across(e,t,n){let{gl:r,recorder:i}=this,{later:a}=i,o=e.spec,s=e.tex;if(o.pw/o.cw,!s.own){let t=this.target(e,this.ownFormat(),1),i=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,i),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t,0),s.own={H:t,fbo:i},n=null}s.deep||(s.deep=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,s.deep),r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_COMPONENT24,e.map.w,e.map.h),r.bindFramebuffer(r.FRAMEBUFFER,s.fbo),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,s.deep)),r.bindFramebuffer(r.FRAMEBUFFER,this.bench),e.edged=o.body.map(e=>e.shaped);let c=s.own,l=(n??[null]).map(t=>this.onMap(e,t));a.push(()=>{r.disable(r.BLEND),r.disable(r.SCISSOR_TEST),r.bindFramebuffer(r.READ_FRAMEBUFFER,s.fbo),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,c.fbo),r.readBuffer(r.COLOR_ATTACHMENT1);for(let{x:e,y:t,w:n,h:i}of l)r.blitFramebuffer(e,t,e+n,t+i,e,t,e+n,t+i,r.COLOR_BUFFER_BIT,r.NEAREST);r.readBuffer(r.COLOR_ATTACHMENT0),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.FRAMEBUFFER,s.fbo),r.drawBuffers(s.targets),r.activeTexture(r.TEXTURE8),r.bindTexture(r.TEXTURE_2D,c.H),r.activeTexture(r.TEXTURE0),r.enable(r.DEPTH_TEST),r.depthFunc(r.LESS),r.depthMask(!0)});let u=(o.x+o.w/2)*Y,d=(o.y+o.h/2)*Y,f=o.face-o.axis,p=e.made.find(e=>e.op===`surface`&&e.body),m=p?this.sections.inset(p.shape):null,h=(m?.most??0)*Y;for(let o of n??[null]){a.push(()=>{o?this.clipMap(e,o):r.disable(r.SCISSOR_TEST),r.clearBufferfv(r.DEPTH,0,[1])});for(let e of t){let t=e.turn[1],[n,r,a]=e.at;for(let s of e.plate.made){if(s.op!==`surface`||s.body||s.follow||s.bridge||s.bend&&!x(ge(s.shape,0),s.bend)||s.zTop<s.zEdge||s.shape.type===`holes`||s.shape.type===`mask`)continue;let c=pt(s),l=G(s),p=Math.max((n-l.x*Y)*t,(n-(l.x+l.w)*Y)*t)+f;if(c<=a||p<=0)continue;let g=u+(Math.max(Math.min(s.zEdge,c),a)-a)*t-Math.sign(t)*h,_=u+(c-a)*t,v={x:Math.min(g,_)/Y,y:(l.y*Y-r+d)/Y,w:Math.abs(_-g)/Y,h:l.h};(!o||X(v,o))&&(i.aim={box:v,seen:[t,n,r,a],from:[u,d,f],reach:l,inset:m},i.draw(s,e.plate))}}}i.aim=null,a.push(()=>{r.disable(r.DEPTH_TEST),r.disable(r.SCISSOR_TEST)})}reach(e,t,n,r,i){let a=e.spec,o=n,s=0;for(let e of t)e.op===`glass`?s=Math.max(s,e.height):`zTop`in e&&(o=Math.max(o,pt(e)));for(let e of i)o=Math.max(o,e.hi);o+=s+1;let c=xi(a),l=t.reduce((e,t)=>{if(t.op!==`surface`||!(t.bridge||t.rest))return e;let n=G(t);return Math.max(e,a.x-n.x,a.y-n.y,n.x+n.w-c.right,n.y+n.h-c.bottom)},0),u=r.reduce((e,{box:t})=>Math.max(e,a.x-t.x/Y,a.y-t.y/Y,t.x/Y+t.w/Y-c.right,t.y/Y+t.h/Y-c.bottom),0),d=Math.ceil((a.cast>0?o:0)/.75/Y)+36+Math.ceil(Math.max(l,u,0));return{peak:o,glass:s,margin:[Math.min(d,a.room[0]),Math.min(d,a.room[1])]}}narrow(e,[t,n]){return t>e.x||n>e.y}paint(e,t){this.store.use(e);let{gl:n,recorder:r}=this,{later:i}=r,{u:a,program:o}=this.mat,s=e.spec,{commands:c,began:l,stands:u,fixed:d,partial:f,moved:p,coloured:m,pictures:h,hot:g,stood:_,redrawn:v}=t,y=!!t.remade,b=h.filter(e=>{if(e.kind!==`crt`&&e.kind!==`oled`)return!1;let t=G(e);return!c.some(n=>n!==e&&yi(n)&&X(G(n),t))});for(let e of h)b.includes(e)||m.push(G(e));s.pw/s.cw;let x=c.filter(e=>e.op===`frost`);for(let e of x)e.blur===0&&e.zoom>=1&&p.some(t=>X(G(e),t))?p.push(G(e)):e.blur===0&&e.zoom>=1&&m.some(t=>X(G(e),t))&&m.push(G(e));let S=f?_i([...p,...m]):null,C=!!S?.length;S&&S.reduce((e,t)=>e+t.w*t.h,0)>s.cw*s.ch*.5&&(S=null),S?.some(e=>x.some(t=>t.blur>0&&X(gi(G(t),t.blur*3),e)))&&(S=null),S?.some(e=>c.some(t=>t.op===`surface`&&t.bridge>0&&X(G(t),e)))&&(S=null);let w=[],T=new Map,E=new Map;for(let e of c)if(e.op===`glass`){let t=e.shape.type===`rect`?wi(e.shape):null;if(t&&!(e.bend&&e.bend.k>=0)){w.push(e),E.set(e,t);let n=G(e);T.set(e,c.slice(0,c.indexOf(e)).reduce((e,t)=>t.op!==`glass`&&`zTop`in t&&X(G(t),n)?Math.max(e,pt(t)):e,0))}}let D=new Set([...w].sort((e,t)=>E.get(t).hw*E.get(t).hh-E.get(e).hw*E.get(e).hh).slice(0,8));e.paned=D,e.panes=w.filter(e=>D.has(e)).flatMap(e=>{let{height:t,bevel:n,curve:r,film:i,rim:a,tint:o,coat:s,chamfer:c,reflect:l}=e,u=E.get(e);return[u.cx,u.cy,u.hw,u.hh,u.radius,t/(n*Y),n,r,Math.max(a/Y,1),...o,s,i,T.get(e)+t,c[0]/Y,c[1],l]});let O=this.beside(e),{peak:k,glass:A,margin:j}=this.reach(e,c,u,O,this.beside(e,!0));e.peak=k;let ee=e.peak>40?40*2**Math.ceil(Math.log2(e.peak/40)):40;if(ee!==e.tall&&(S=null),e.tall=ee,S?.length&&e.tex&&!e.tex.S&&(S=null,y=!0),!S&&this.narrow(s,j)&&!d)return{margin:j};if(!S){let t=this.fields.missing(c.flatMap(e=>`shape`in e&&e.shape.type===`field`?[e.shape]:[]),s.dpr),n=t.reduce((e,t)=>e+this.fields.cost(t,s.dpr),0);if(t.length&&n>this.fieldRoom){if(e.wanted=t,!t.every(e=>this.fields.held(e)))return null;e.stood=this.making(e)}else this.fieldRoom-=n,t.length&&!e.tex?.S&&this.take(e),this.fields.make(t,s.dpr),e.stood=!1}let M=this.mapFor(e,c,O),N=e.map;if(!e.tex)e.map=M;else if(M.x<N.x||M.y<N.y||M.x+M.w>N.x+N.w||M.y+M.h>N.y+N.h){let t=e.tex.mask,n=e.tex.blank;e.tex.mask=null,this.free(e),e.map=M,this.allocTextures(e,t),e.tex.blank=n,S=null}S||this.prepare(e);let P=e.tex;!S&&!P.S&&this.work(e),!P.E&&c.some(yi)&&(P.E=this.target(e,n.SRGB8_ALPHA8,1),n.bindFramebuffer(n.FRAMEBUFFER,P.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT3,n.TEXTURE_2D,P.E,0),P.targets[3]=n.COLOR_ATTACHMENT3),!P.U&&this.undersides&&this.player&&c.some(e=>e.op===`surface`&&e.mid)&&(P.U=this.target(e,n.R16F,1),n.bindFramebuffer(n.FRAMEBUFFER,P.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT6,n.TEXTURE_2D,P.U,0),P.targets=[n.COLOR_ATTACHMENT0,n.COLOR_ATTACHMENT1,n.COLOR_ATTACHMENT2,P.targets[3],P.targets[4]??n.NONE,P.targets[5]??n.NONE,n.COLOR_ATTACHMENT6]),S&&this.stats.partial++,this.block.two(this.block.at.uCanvas,s.cw,s.ch),this.block.four(this.block.at.uMap,...this.mapUv(e)),i.length=0;let F=S?.length?S.reduce((e,t)=>K(e,t)):null,I=x.reduce((e,t)=>{let n=G(t);return K(e,gi(n,(t.zoom<1?Math.max(n.w,n.h)*(1/t.zoom-1)/2:0)+t.blur*2+4))},null),te=c.reduce((e,t)=>t.op===`surface`&&t.bridge?K(e,gi(G(t),t.bridge*3+4)):e,null);this.block.four(this.block.at.uBackBox,...this.cropUv(e,this.copyBox(e,P.back?.box,I))),this.block.four(this.block.at.uUnderBox,...this.cropUv(e,this.copyBox(e,P.under?.box,te)));for(let t of S??[null]){i.push(()=>{t&&this.clipMap(e,t);for(let e=0;e<P.targets.length;e++)n.clearBufferfv(n.COLOR,e,[0,0,0,0])});let a=!0;for(let n of c)(!t||X(G(n),t))&&(n.op===`frost`?a&&=(i.push(()=>this.capture(e,x.some(e=>e.blur>0),F,I)),!1):a=!0,n.op===`surface`&&n.bridge&&i.push(()=>this.level(e,gi(G(n),n.bridge*2),te)),n.op===`surface`&&n.section?this.section(e,n,O):r.draw(n,e))}if(S&&b.length){i.push(()=>n.drawBuffers([n.NONE,n.NONE,n.NONE,n.COLOR_ATTACHMENT3]));for(let t of b){let a=G(t);i.push(()=>{this.clipMap(e,a),n.clearBufferfv(n.COLOR,3,[0,0,0,0])}),r.draw(t,e);for(let n of c.slice(c.indexOf(t)+1))n.op!==`glass`&&X(G(n),a)&&r.draw(n,e)}}s.body&&(e.made=c,e.tex.S&&this.across(e,O,S)),r.drawing=null,this.block.send(),n.bindFramebuffer(n.FRAMEBUFFER,e.tex.fbo),n.viewport(-e.map.x,-e.map.y,s.pw,s.ph),n.drawBuffers(P.targets),n.disable(n.BLEND),n.disable(n.SCISSOR_TEST),n.useProgram(o),n.uniform1i(a.uMask,0),n.uniform1i(a.uField,1),n.uniform1i(a.uScreen,2),n.uniform1i(a.uBackA,3),n.uniform1i(a.uBackE,4),n.uniform1i(a.uBackS,5),n.uniform1i(a.uBackH,6),n.uniform1i(a.uBackN,10),n.uniform1i(a.uOwn,8),n.uniform1i(a.uRows,9),n.uniform1i(a.uClipField,7),n.activeTexture(n.TEXTURE8),n.bindTexture(n.TEXTURE_2D,e.tex.own?.H??this.dark),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,null),n.activeTexture(n.TEXTURE9),n.bindTexture(n.TEXTURE_2D,null),n.activeTexture(n.TEXTURE13),n.bindTexture(n.TEXTURE_2D,null),n.activeTexture(n.TEXTURE10),n.bindTexture(n.TEXTURE_2D,e.tex.under?.N??null),n.activeTexture(n.TEXTURE2),n.bindTexture(n.TEXTURE_2D,this.screenTex),n.activeTexture(n.TEXTURE3),n.bindTexture(n.TEXTURE_2D,e.tex.back?.A??null),n.activeTexture(n.TEXTURE4),n.bindTexture(n.TEXTURE_2D,e.tex.back?.E??null),n.activeTexture(n.TEXTURE5),n.bindTexture(n.TEXTURE_2D,e.tex.back?.S??null),n.activeTexture(n.TEXTURE6),n.bindTexture(n.TEXTURE_2D,e.tex.under?.H??null),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,e.tex.mask),n.enable(n.BLEND),n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);for(let e of i)e();n.disable(n.BLEND),n.bindFramebuffer(n.FRAMEBUFFER,this.bench),n.disable(n.SCISSOR_TEST),this.freeScratch(e),e.tex.S||(this.freeBack(e),this.freeUnder(e));let L=p.length?_i(p).reduce((e,t)=>K(e,t)):null,R=!S;P.H&&(R||L)&&this.mips(P.H),P.N&&(R||L)&&this.mips(P.N),s.grime>0&&(R||S.length)&&this.weather(e,S),(R||F)&&this.mips(P.A),P.E&&(this.glowDrawn=!0),P.D&&(R||L)&&this.mips(P.D),n.disable(n.SCISSOR_TEST),P.S&&(R||L)&&this.occlusion(e,L),n.disable(n.SCISSOR_TEST),P.S&&this.condition(e),this.probe&&this.wait(0,0),this.stats.paintMs+=performance.now()-l,this.stats.paints++,e.painted++,R?(e.tex.tops.fill(0),this.raise(e,c,A+1,O),e.reedge||e.known||y||e.shaped++,e.known=!1):L&&this.raise(e,v,A+1),e.reedge=!1;let z=e.panes.length?Gr:Math.min(Wr+(_+1)*Kr/Y,Gr),ne=(R?[]:[...p.map(e=>gi(e,z)),...m.map(e=>gi(e,Wr))]).reduce((e,t)=>K(e,t),null);return C&&!e.keep&&this.rest(e),{all:R||g,box:ne}}freeBack(e){let t=e.tex?.back;if(t){if(!this.lost){for(let e of[t.A,t.E,t.S])this.gl.deleteTexture(e);this.gl.deleteFramebuffer(t.fbo)}e.tex.back=null}}freeUnder(e){let t=e.tex?.under;if(t){if(!this.lost){for(let e of[t.H,t.N])e&&this.gl.deleteTexture(e);for(let e of[t.fbo,t.nfbo])e&&this.gl.deleteFramebuffer(e)}e.tex.under=null}}freeScratch(e){let t=e.tex;if(!t||this.lost)return;let{gl:n}=this,{own:r,deep:i}=t;r&&(n.deleteTexture(r.H),n.deleteFramebuffer(r.fbo)),i&&(n.bindFramebuffer(n.FRAMEBUFFER,t.fbo),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,null),n.bindFramebuffer(n.FRAMEBUFFER,this.bench),n.deleteRenderbuffer(i)),t.own=null,t.deep=null,this.fields.release()}beam(e,t,n){let r=Bn[n.handheld],i=Si(n,t),a=t.width/e.cw,o=(i.x-t.left)/a*Y,s=(i.y-t.top)/a*Y,c=xi(e),l=ti*(c.long*Y/150)**.75*r.hold,u=c.cx*Y,d=c.cy*Y+l*.7,f=performance.now()/1e3,p=r.flicker?Math.sin(f*9.1)*.5+Math.sin(f*14.7+1)*.3+Math.sin(f*23.3+2)*.2:0,m=u+(o-u)*r.arm+p*l*.03,h=d+(s-d)*r.arm,g=l*.85,_=Math.hypot(o-m,s-h,g),v=_*Math.tan(Math.min(r.cone*2,1.35))*1.6;return{sx:m,sy:h,sz:g,ax:(o-m)/_,ay:(s-h)/_,az:-g/_,far:_,shake:p,tx:o,ty:s,pool:{x:(o-v)/Y,y:(s-v)/Y,w:v*2/Y,h:v*2/Y}}}points(e,t){let n=xr(),r=e.spec;if(!n.size&&!this.emitters.length)return li;let i=new Float32Array(16),a=new Float32Array(12),o=t.width/r.cw,s=xi(r),c=t.left+s.cx*o,l=t.top+s.cy*o,u=[],d=(e,t,n,r,i,a,o)=>{let s=o*n*n/(n*n+(e-c)**2+(t-l)**2+r*r);if(u.length===4&&!(s>u[3].gives))return;let d=u.length;for(;d>0&&u[d-1].gives<s;)d--;u.splice(d,0,{x:e,y:t,half:n,up:r,color:i,flat:a,gives:s}),u.length>4&&u.pop()};for(let e of n){let[t,n]=Sr(e.at),r=e.reach/2;d(t,n,r,e.height??r,e.color,!1,Math.max(...e.color))}for(let t of this.emitters)t.from!==e&&d(t.at[0],t.at[1],t.half,0,t.color,!0,Math.max(t.color[0],t.color[1],t.color[2]));return u.forEach(({x:e,y:n,half:s,up:c,color:l,flat:u},d)=>{let f=Y/o;i.set([(e-t.left)*f,(n-t.top)*f,r.face+c*f,(u?-1:1)*(s*f)**2],d*4),a.set(l,d*3)}),{n:u.length,at:i,color:a}}poolMoved(e,t,n){let r=e.spec,i=e=>e.x<r.cw&&e.y<r.ch&&e.x+e.w>0&&e.y+e.h>0,{pool:a}=this.beam(r,n,t),o=i(e.pool);return e.pool=a,o||i(a)}light({plate:e,rect:t,lighting:n,ctx:r},i){let{gl:a}=this,o=this.sheet,s=e.spec,c=e.seat,{pw:l,ph:u,scale:d}=c,f=Si(i,t),{all:p,full:m,ambient:h,look:g,lights:_,torch:v}=i,y=performance.now(),b=p?null:s.lightDirty?s.lightBox:e.roughBox,x=l/s.cw,S=o.height-c.y-u,C=()=>a.viewport(c.x,S,l,u),w=Ci(s,i),T=this.points(e,t),E=this.player?.take(e,{plate:e,rect:t,lighting:n,ctx:r},i,{leaning:w,torch:v*f.i>0,points:T.n,linear:this.staged&&!r,relief:this.relief})??null;if(!E)return!1;this.settle(e);let D=zn(n),{room:O,brush:k}=this.rooms.for(D,i.tilt),A=Math.max(ni,xi(s).long*Y*(s.lean||s.turns?ii:ri)),j=Math.tan(g*Math.PI/180)*A*f.i,ee=Math.tan(i.tilt*Math.PI/180)*A,M=0,N=0,P=Math.sign(s.spin)*(Math.abs(s.spin)<Math.PI/2?Math.min(Math.abs(s.spin),ci):Math.max(Math.abs(s.spin),Math.PI-ci));if(w){let e=t.width/s.cw,n=Math.tan(s.lean*Math.PI/180)*A;if(s.spin)M=Math.tan(P)*A,N=s.turn[1]*n;else if(i.carried){let r=(f.x-t.left-(s.x+s.w/2)*e)/(s.w/2*e),i=(f.y-t.top-(s.y+s.h/2)*e)/(s.h/2*e),a=n*s.hand/Math.max(Math.hypot(r,i),1);M=r*a,N=i*a}else M=s.turn[0]*n,N=s.turn[1]*n}if(s.angle[0]||s.angle[1]||s.eye[0]||s.eye[1]){let[e,t,n]=oi(s.angle,s.eye),r=Math.hypot(e,t)/n,i=Math.min(1,Math.tan(ai*Math.PI/180)/r)/n;M+=e*i*A,N+=t*i*A}let F=Bn[i.handheld],I=v*f.i>0?this.beam(s,t,i):null,te=v*f.i*F.power*(1+(I?.shake??0)*F.flicker);I?(!p||m||_||g||!e.pool||s.lightDirty&&!s.lightBox||(b=K(K(e.pool,I.pool),s.lightDirty?s.lightBox:null)),e.pool=I.pool):e.pool=null;let L=e.rough;return e.rough=d<this.fit(s),e.roughBox=e.rough&&b&&(!L||e.roughBox)?K(e.roughBox,b):null,a.activeTexture(a.TEXTURE12),a.bindTexture(a.TEXTURE_2D,e.tex.U??this.dark),a.activeTexture(a.TEXTURE15),a.bindTexture(a.TEXTURE_2D_ARRAY,k),C(),(({u:n,program:o},c=I)=>{a.useProgram(o),a.uniform2f(n.uCss,s.cw,s.ch),a.uniform4f(n.uMap,...this.mapUv(e));let l=xi(s),u=l.cx*Y,p=l.cy*Y,m=l.long*Y;a.uniform4f(n.uFrame,0,0,s.cw,s.ch);let g=(f.x-i.width/2)/(i.width/2),v=(f.y-i.height/2)/(i.height/2);a.uniform3f(n.uCam,u-ee*.44+g*j+M,p+ee*.9+v*j+N,A),a.uniform2f(n.uLean??null,M,N),a.uniform1f(n.uPeak,e.peak),a.uniform1f(n.uTall??null,e.tall),a.uniform1f(n.uFace,s.face),a.uniform2f(n.uSpin,1/Math.cos(P),s.spin?s.axis:0),a.uniform3f(n.uOwn,...s.owns),a.uniform2f(n.uRound,Math.sin(P),Math.cos(P)),a.uniform1f(n.uLift,Math.max(s.face-s.cast,0)),a.uniform4f(n.uBody,s.x+s.w/2,s.y+s.h/2,s.w/2,s.h/2),a.uniform1i(n.uPanes,e.panes.length/18),a.uniform1i(n.uLinear,this.staged&&!r?1:0),e.panes.length&&a.uniform1fv(n[`uPane[0]`],e.panes),a.uniform1f(n.uDpr,s.dpr*d);let y=_*s.hand,b=Math.sqrt(i.width*i.height)/2,x=1-y*.65,S=t.width/s.cw,C=(f.x-t.left-l.cx*S)/b,w=(f.y-t.top-l.cy*S)/b,[E,O,k]=oi(s.angle,[m*(D.lamp[0]*x+C*D.sway*y),m*(D.lamp[1]*x+w*D.sway*y),m*3]),L=E,R=k-(s.face-s.axis),z=Math.sin(P),ne=Math.cos(P);a.uniform3f(n.uKey,u+L*ne+R*z,p+O,s.face-s.axis-L*z+R*ne),a.uniform1f(n.uLamp,5.2*D.power),a.uniform1f(n.uLampSoft,D.soft),a.uniform1f(n.uLampHead,D.camera),a.uniform1f(n.uFill,D.fill),a.uniform1f(n.uPageShade,D.shadow),a.uniform3f(n.uRoomColor,...D.color),a.uniform1f(n.uRoom,h),c?(a.uniform4f(n.uTorch,c.sx,c.sy,c.sz,te),a.uniform3f(n.uAim,c.ax,c.ay,c.az),a.uniform4f(n.uBeam,F.core,F.flood,F.edge,F.spill),a.uniform4f(n.uCone,F.cone,c.sz,F.rings,F.fluoresce),a.uniform3f(n.uTint,...F.color)):a.uniform4f(n.uTorch,0,0,1,0),a.uniform1i(n.uPoints,T.n),T.n&&(a.uniform4fv(n[`uPoint[0]`]??null,T.at),a.uniform3fv(n[`uPointColor[0]`]??null,T.color)),a.uniform1i(n.uDebug,s.debug),a.uniform1f(n.uSplit,s.split<0?-1:(s.x+s.w*s.split)*Y)})(E),a.uniform2f(E.u.uShift,-c.x,c.y),this.player.bind(e,O,this.dark),a.bindFramebuffer(a.FRAMEBUFFER,this.bench),b&&this.clip(b,x,S+u,c.x),a.drawArrays(a.TRIANGLE_STRIP,0,4),a.disable(a.SCISSOR_TEST),a.activeTexture(a.TEXTURE0),this.probe&&this.wait(c.x,S),c.box=b,this.stats.lightMs+=performance.now()-y,this.stats.lights++,!0}copyOut(e){let{plate:t,ctx:n}=e,r=performance.now(),{x:i,y:a,pw:o,ph:s,box:c}=t.seat,l=this.canvas,u=t.spec,d=n;if(d.canvas.width!==u.pw&&(d.canvas.width=u.pw),d.canvas.height!==u.ph&&(d.canvas.height=u.ph),d.globalCompositeOperation=`copy`,c){let{x:e,y:t,w:n,h:r}=hi(c,u.pw/u.cw),s=o/u.pw;d.save(),d.beginPath(),d.rect(e,t,n,r),d.clip(),d.drawImage(l,i+e*s,a+t*s,n*s,r*s,e,t,n,r),d.restore()}else d.drawImage(l,i,a,o,s,0,0,u.pw,u.ph);d.clearRect(u.pw-2,0,2,u.ph),d.clearRect(0,u.ph-2,u.pw,2),this.stats.copyMs+=performance.now()-r,this.stats.copies++}copyThrough(e){let{plate:t,ctx:n}=e,r=performance.now(),{gl:i}=this,a=this.canvas,o=t.spec,s=n,{x:c,y:l,pw:u,ph:d,box:f}=t.seat;s.canvas.width!==o.pw&&(s.canvas.width=o.pw),s.canvas.height!==o.ph&&(s.canvas.height=o.ph);let p=u/o.pw,m=this.sheet.height-l-d,h=f?hi(f,o.pw/o.cw):{x:0,y:0,w:o.pw,h:o.ph},g=Math.max(Math.floor(a.width/Math.max(p,1)),1),_=Math.max(Math.floor(a.height/Math.max(p,1)),1);i.bindFramebuffer(i.READ_FRAMEBUFFER,this.bench),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),s.globalCompositeOperation=`copy`;for(let e=h.y;e<h.y+h.h;e+=_)for(let t=h.x;t<h.x+h.w;t+=g){let n=Math.min(g,h.x+h.w-t),r=Math.min(_,h.y+h.h-e),o=Math.round(n*p),l=Math.round(r*p);i.blitFramebuffer(c+Math.round(t*p),m+d-Math.round((e+r)*p),c+Math.round(t*p)+o,m+d-Math.round((e+r)*p)+l,0,a.height-l,o,a.height,i.COLOR_BUFFER_BIT,i.NEAREST),s.save(),s.beginPath(),s.rect(t,e,n,r),s.clip(),s.drawImage(a,0,0,o,l,t,e,n,r),s.restore()}s.clearRect(o.pw-2,0,2,o.ph),s.clearRect(0,o.ph-2,o.pw,2),i.bindFramebuffer(i.FRAMEBUFFER,this.bench),this.stats.copyMs+=performance.now()-r,this.stats.copies++}keep({plate:e}){let t=performance.now(),{gl:n}=this,r=e.spec,{x:i,y:a,pw:o,ph:s}=e.seat,c=e.picture,l=e.seat.box;if(!c||c.pw!==r.pw||c.ph!==r.ph){this.freePicture(e),this.making_(e,r.pw*r.ph*8*(4/3)),this.shown(e);let t=n.createTexture(),i=n.createFramebuffer();n.bindTexture(n.TEXTURE_2D,t),n.texStorage2D(n.TEXTURE_2D,Math.floor(Math.log2(Math.max(r.pw,r.ph)))+1,n.RGBA16F,r.pw,r.ph),W(n,n.LINEAR_MIPMAP_LINEAR,n.LINEAR),n.bindFramebuffer(n.FRAMEBUFFER,i),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,t,0),c=e.picture={tex:t,fbo:i,pw:r.pw,ph:r.ph,box:[0,0,0,0,0]},l=null}let u=o/r.pw,d=this.sheet.height-a-s,f=l?hi(l,r.pw/r.cw):{x:0,y:0,w:r.pw,h:r.ph};n.bindFramebuffer(n.READ_FRAMEBUFFER,this.bench),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,c.fbo),n.blitFramebuffer(i+f.x*u,d+s-(f.y+f.h)*u,i+(f.x+f.w)*u,d+s-f.y*u,f.x,r.ph-f.y-f.h,f.x+f.w,r.ph-f.y,n.COLOR_BUFFER_BIT,u===1?n.NEAREST:n.LINEAR),n.bindFramebuffer(n.FRAMEBUFFER,c.fbo),n.enable(n.SCISSOR_TEST),n.clearColor(0,0,0,0),n.scissor(r.pw-2,0,2,r.ph),n.clear(n.COLOR_BUFFER_BIT),n.scissor(0,0,r.pw,2),n.clear(n.COLOR_BUFFER_BIT),this.mips(c.tex),n.disable(n.SCISSOR_TEST),n.bindFramebuffer(n.FRAMEBUFFER,this.bench),c.box=[r.x,r.y,r.cw,r.ch,r.w],this.stats.copyMs+=performance.now()-t}pictureBytes(e){let t=e.picture;return t?t.pw*t.ph*8*(4/3):0}shrink(e){let t=e.picture,n=t?Math.max(t.pw,t.ph):0;if(!t||this.lost||n<=Hr)return;let{gl:r}=this,i=Math.ceil(Math.log2(n/Hr)),a=Math.max(Math.floor(t.pw/2**i),1),o=Math.max(Math.floor(t.ph/2**i),1),s=r.createTexture(),c=r.createFramebuffer();r.bindTexture(r.TEXTURE_2D,s),r.texStorage2D(r.TEXTURE_2D,Math.floor(Math.log2(Math.max(a,o)))+1,r.RGBA16F,a,o),W(r,r.LINEAR_MIPMAP_LINEAR,r.LINEAR),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,c),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,s,0),r.bindFramebuffer(r.READ_FRAMEBUFFER,this.mipFrom),r.framebufferTexture2D(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t.tex,i),r.disable(r.SCISSOR_TEST),r.blitFramebuffer(0,0,a,o,0,0,a,o,r.COLOR_BUFFER_BIT,r.NEAREST),r.generateMipmap(r.TEXTURE_2D),r.bindFramebuffer(r.FRAMEBUFFER,this.bench),this.freePicture(e),e.picture={tex:s,fbo:c,pw:a,ph:o,box:t.box},this.shown(e)}shown(e){this.store.hold(e,`picture`,()=>this.pictureBytes(e),()=>this.shrink(e))}wait(e,t){let{gl:n}=this;this.staged?n.readPixels(e,t,1,1,n.RGBA,n.FLOAT,this.pxLight):n.readPixels(e,t,1,1,n.RGBA,n.UNSIGNED_BYTE,this.px)}forget(e){this.freePicture(e)}freePicture(e){let t=e.picture;this.store.drop(e,`picture`),e.picture=null,t&&!this.lost&&(this.gl.deleteTexture(t.tex),this.gl.deleteFramebuffer(t.fbo))}stage(){if(!this.staged){this.staged=!0;let[e,t]=this.room;this.sheet={width:e,height:t},this.makeBench()}return this.lost||mr(this.gl),this.canvas}unstage(){if(!this.staged)return;let{gl:e}=this,t=this.canvas;this.staged=!1,mr(null),t.remove(),t.width=this.sheet.width,t.height=this.sheet.height,this.lost||(this.benchTex&&e.deleteTexture(this.benchTex),this.bench&&e.deleteFramebuffer(this.bench),this.lens?.free()),this.bench=this.benchTex=null,this.lens=null,this.sheet=t;for(let e of this.plates)this.freePicture(e);e.bindFramebuffer(e.FRAMEBUFFER,null)}makeBench(){let{gl:e}=this;this.bench=e.createFramebuffer(),this.benchTex=null,this.sizeBench()}sizeBench(){let{gl:e}=this,{width:t,height:n}=this.sheet;this.benchTex&&e.deleteTexture(this.benchTex),this.benchTex=null,this.making_(null,t*n*8),this.benchTex=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.benchTex),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA16F,Math.max(t,1),Math.max(n,1)),W(e,e.NEAREST,e.NEAREST),e.bindFramebuffer(e.FRAMEBUFFER,this.bench),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this.benchTex,0);let r=this.canvas;e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE||t<=r.width&&n<=r.height||(this.store.refused(),this.refusedBench=!0,this.sheet.width=r.width,this.sheet.height=r.height,this.sizeBench())}show(e,t,n,r,i=0,a=0){let{gl:o}=this,s=this.canvas,c=Math.max(Math.round(t*r),1),l=Math.max(Math.round(n*r),1);s.width!==c&&(s.width=c),s.height!==l&&(s.height=l);let u=this.lens??=new Xn(o);u.begin(c,l);let d=fr(),f=d.size?{gl:o,w:t,h:n,left:i,top:a,ratio:r,target:u.fbo}:null,p=null;if(f)for(let e of d)p=e.before(f)??p;let{program:m,u:h}=p?this.bent:this.show_,g=[2*r/c,0,-1,0,-2*r/l,1,0,0,1],_=[c/(2*r),0,c/(2*r),0,-l/(2*r),l/(2*r),0,0,1],v=null,y=1,b=(e,t=y)=>{v=e,y=t;let n=e?mi(g,mi(e.h,_)):pi;o.uniformMatrix3fv(h.uH,!1,[n[0],n[3],n[6],n[1],n[4],n[7],n[2],n[5],n[8]]),o.uniform1f(h.uGain,(e?.gain??1)*y)},x=()=>{o.bindFramebuffer(o.FRAMEBUFFER,u.fbo),o.viewport(0,0,c,l),o.disable(o.SCISSOR_TEST),o.enable(o.BLEND),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.bindVertexArray(this.vao),o.useProgram(m),o.uniform1i(h.tP,0),b(v),p&&(o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,p),o.uniform1i(h.tBend,1),o.uniform2f(h.uStagePx,c,l)),o.activeTexture(o.TEXTURE0)};f?x():(o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.useProgram(m),o.uniform1i(h.tP,0),b(null),o.activeTexture(o.TEXTURE0));let S=({picture:e,x:t,y:n,w:i,h:a})=>[Math.round(t*r),Math.round(n*r),Math.abs(i*r-e.pw)<1?e.pw:i*r,Math.abs(a*r-e.ph)<1?e.ph:a*r],C=(e,[t,n,i,a],s,u,d,f)=>{d<=s||f<=u||(o.uniform4f(h.uRect,s/c*2-1,1-u/l*2,d/c*2-1,1-f/l*2),o.uniform4f(h.uUv,(s-t)/i,1-(u-n)/a,(d-t)/i,1-(f-n)/a),p?o.uniform2f(h.uUvPerMm,1/(e.box[2]*Y),1/(e.box[3]*Y)):o.uniform1f(h.uSmear,v?.smear?2*v.smear*r/i:0),o.bindTexture(o.TEXTURE_2D,e.tex),o.drawArrays(o.TRIANGLE_STRIP,0,4))},w=({picture:e,plate:t,turned:n},[i,a,o,s])=>{if(!f||n)return;let c=i/r,l=a/r,u=o/r,p=s/r,[m,h,g,_]=t.tex?this.mapUv(t):[1,1,0,0],v={height:t.tex?.H??this.player?.stands(t)??null,toMap:[m/u,h/p,g-m*c/u,_-h*l/p],mmPerPx:e.box[2]*Y/u,face:t.spec.face,box:[c,l,u,p]};for(let e of d)e.shot(v,f);x()};for(let t of e){b(t.turned??null,t.share??1);let e=S(t),[n,r,i,a]=e;C(t.picture,e,n,r,n+i,r+a),w(t,e)}if(f)for(let e of d)e.after(f),x();u.finish(this.exposure,this.backdrop),o.bindFramebuffer(o.FRAMEBUFFER,this.bench),this.stats.stages++}glowing(e,t,n,r=!0){let{gl:i}=this,a=this.glowBack;if(this.glowBack=null,this.glowReads.length||this.lost||!r)return a;let o=e(),s=this.glowAt;if(!s||s.w!==t||s.h!==n){s&&(i.deleteFramebuffer(s.fbo),i.deleteTexture(s.tex));let e=i.createTexture();i.bindTexture(i.TEXTURE_2D,e),i.texStorage2D(i.TEXTURE_2D,1,i.RGBA8,t,n);let r=i.createFramebuffer();i.bindFramebuffer(i.FRAMEBUFFER,r),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,e,0),s=this.glowAt={fbo:r,tex:e,w:t,h:n}}i.bindFramebuffer(i.FRAMEBUFFER,s.fbo),i.viewport(0,0,t,n),i.disable(i.SCISSOR_TEST),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE);let{program:c,u:l}=this.show_;i.useProgram(c),i.uniform1i(l.tP,0),i.uniform4f(l.uUv,0,1,1,0),i.uniformMatrix3fv(l.uH,!1,pi),i.uniform1f(l.uGain,1),i.uniform1f(l.uSmear,0),i.activeTexture(i.TEXTURE0);for(let{plate:e,x:r,y:a,w:s,h:c}of o){let o=e.tex;if(!o?.E)continue;i.uniform4f(l.uRect,r/t*2-1,a/n*2-1,(r+s)/t*2-1,(a+c)/n*2-1);let u=e.map,d=e.spec;i.uniform4f(l.uUv,-u.x/u.w,(d.ph-u.y)/u.h,(d.pw-u.x)/u.w,-u.y/u.h),i.uniform1f(l.uOver,1),i.bindTexture(i.TEXTURE_2D,o.E),i.drawArrays(i.TRIANGLE_STRIP,0,4)}i.uniform1f(l.uOver,0),i.disable(i.BLEND);let u=i.createBuffer();return i.bindBuffer(i.PIXEL_PACK_BUFFER,u),i.bufferData(i.PIXEL_PACK_BUFFER,t*n*4,i.STREAM_READ),i.readPixels(0,0,t,n,i.RGBA,i.UNSIGNED_BYTE,0),i.bindBuffer(i.PIXEL_PACK_BUFFER,null),this.glowReads.push({pbo:u,sync:i.fenceSync(i.SYNC_GPU_COMMANDS_COMPLETE,0),w:t,h:n,shots:o}),i.bindFramebuffer(i.FRAMEBUFFER,this.bench),i.flush(),a}glowDrawn=!1;get glowPending(){return this.glowReads.length>0||!!this.glowBack}read(e){let t=e.picture;if(!t||this.lost)return null;let{gl:n}=this,r=new Float32Array(t.pw*t.ph*4);return n.bindFramebuffer(n.FRAMEBUFFER,t.fbo),n.readPixels(0,0,t.pw,t.ph,n.RGBA,n.FLOAT,r),n.bindFramebuffer(n.FRAMEBUFFER,this.bench),Ei(r,t.pw,t.ph,this.exposure)}readSoon(e){let t=e.picture;if(!t||this.lost)return Promise.resolve(null);let{gl:n}=this,{pw:r,ph:i}=t,a=this.exposure,o=n.createBuffer();n.bindFramebuffer(n.FRAMEBUFFER,t.fbo),n.bindBuffer(n.PIXEL_PACK_BUFFER,o),n.bufferData(n.PIXEL_PACK_BUFFER,r*i*16,n.STREAM_READ),n.readPixels(0,0,r,i,n.RGBA,n.FLOAT,0),n.bindBuffer(n.PIXEL_PACK_BUFFER,null),n.bindFramebuffer(n.FRAMEBUFFER,this.bench);let s=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0);return n.flush(),new Promise(e=>{let t=()=>{if(!this.lost&&n.clientWaitSync(s,0,0)===n.TIMEOUT_EXPIRED)return void setTimeout(t,4);let c=null;if(!this.lost){let e=new Float32Array(r*i*4);n.bindBuffer(n.PIXEL_PACK_BUFFER,o),n.getBufferSubData(n.PIXEL_PACK_BUFFER,0,e),n.bindBuffer(n.PIXEL_PACK_BUFFER,null),c=Ei(e,r,i,a)}n.deleteSync(s),n.deleteBuffer(o),e(c)};setTimeout(t,4)})}seatFor(e,t,n){let r=n.sizing,i=t.width*(r?1:n.ratio)*(n.sweeping&&Ci(e,n)?si:1),a=Math.min(r||n.sweeping?Math.max(i/e.pw,.125):1,this.fit(e));return{x:0,y:0,scale:a,pw:Math.round(e.pw*a),ph:Math.round(e.ph*a),box:null}}lightAll(e,t,n,r){if(!this.player){for(let t of e)n(t);return}let i=[],a=this.gl,o=this.sheet,s=(e,t)=>{try{t()}catch(t){r(e,t)}};for(let t of e)this.store.use(t.plate);let c=0,l=0,u=0,d=()=>{for(let e of i)s(e,()=>{e.ctx?this.staged?this.copyThrough(e):this.copyOut(e):this.keep(e),n(e)});i.length=c=l=u=0};for(let n of e)n.plate.seat=this.seatFor(n.plate.spec,n.rect,t);a.bindFramebuffer(a.FRAMEBUFFER,this.bench),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT);for(let r of e.sort((e,t)=>t.plate.seat.ph-e.plate.seat.ph)){let e=r.plate.seat;c+e.pw>o.width&&(c=0,l+=u+Ur,u=0),l+e.ph>o.height&&(d(),a.clear(a.COLOR_BUFFER_BIT)),e.x=c,e.y=l,s(r,()=>{this.light(r,t)?i.push(r):n(r)}),c+=e.pw+Ur,u=Math.max(u,e.ph)}d()}};function Ei(e,t,n,r){let i=new Uint8ClampedArray(e.length),a=t*4;for(let t=0;t<n;t++)for(let o=(n-1-t)*a,s=t*a,c=o+a;o<c;o+=4,s+=4){let t=Math.min(Math.max(e[o+3],0),1),n=t>.002?t:1,a=Qn(e[o]*r/n,e[o+1]*r/n,e[o+2]*r/n);i[s]=a[0]*t*255+.5,i[s+1]=a[1]*t*255+.5,i[s+2]=a[2]*t*255+.5,i[s+3]=t*255+.5}return new ImageData(i,t,n)}function Di(e,t){let n=t.el.closest(`d-surface[twist], d-device[twist]`),r=n&&e.el.contains(n)?n.getAttribute(`twist`)*Math.PI/180:0;if(!r)return null;let i=n===e.el?null:e.parts.get(n);return{at:i?[i.x+i.w/2,i.y+i.h/2]:[e.x+e.w/2,e.y+e.h/2],rotate:r}}function Oi(e,t=e=>e.matches(s())){let n=document.createTreeWalker(e.el,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode:e=>e.nodeType===Node.TEXT_NODE?e.data.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP:t(e)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_SKIP}),r=[];for(;n.nextNode();)r.push(n.currentNode);return r}function ki(e,t,n){let r=getComputedStyle(e),i=t.map(e=>e.data).join(``).replace(/\s+/g,` `).trim(),a=r.textTransform===`uppercase`?i.toUpperCase():i;n.font=`${r.fontStyle} ${r.fontWeight} ${r.fontSize} ${r.fontFamily}`,n.letterSpacing=`0px`,n.wordSpacing=r.wordSpacing;let o=e.clientWidth-parseFloat(r.paddingLeft)-parseFloat(r.paddingRight),s=n.measureText(a).width;n.wordSpacing=`0px`;let c=(o-s)/Math.max([...a].length-1,1);(Math.abs(parseFloat(e.style.letterSpacing||`NaN`)-c)>.01||!e.style.letterSpacing)&&(e.style.letterSpacing=`${c.toFixed(2)}px`),e.style.textAlign!==`left`&&(e.style.textAlign=`left`)}function Ai(e,t,n,r=document.createRange()){let i=t(e);if(!i.length)return null;e.el.hasAttribute(`fit`)&&ki(e.el,i,n);let a=getComputedStyle(e.el),o=`${a.fontStyle} ${a.fontWeight} ${a.fontSize} ${a.fontFamily}`,s=a.letterSpacing===`normal`?`0px`:a.letterSpacing;n.font=o,n.letterSpacing=s;let c=n.measureText(`Hg`),l=a.textTransform===`uppercase`,u={font:o,letterSpacing:s,wordSpacing:a.wordSpacing===`normal`?`0px`:a.wordSpacing,asc:c.fontBoundingBoxAscent,desc:c.fontBoundingBoxDescent,words:[]};for(let e of i)for(let t of e.data.matchAll(/\S+/g)){r.setStart(e,t.index),r.setEnd(e,t.index+t[0].length);let n=r.getBoundingClientRect();n.width&&u.words.push({text:l?t[0].toUpperCase():t[0],left:n.left,top:n.top,width:n.width,height:n.height})}return u}function ji(e,t,n,r){return!e||!n?e===n:e.font!==n.font||e.letterSpacing!==n.letterSpacing||e.wordSpacing!==n.wordSpacing||e.asc!==n.asc||e.desc!==n.desc||e.words.length!==n.words.length?!1:e.words.every((e,i)=>{let a=n.words[i];return e.text===a.text&&e.width===a.width&&e.height===a.height&&e.left-t[0]===a.left-r[0]&&e.top-t[1]===a.top-r[1]})}function Mi(e,t,n,r,i,a,o,s=e=>Oi(e),c){t.width<e.pw&&(t.width=e.pw),t.height<e.ph&&(t.height=e.ph),n.setTransform(1,0,0,1,0,0),n.fillStyle=`#000`,n.fillRect(0,0,e.pw,e.ph),n.setTransform(e.dpr,0,0,e.dpr,0,0),n.fillStyle=n.strokeStyle=`#fff`;let l=document.createRange();for(let t of e.list){o(t.el),t.label=null,t.mask=null;let u=Di(e,t),d=()=>{n.save(),u&&(n.translate(...u.at),n.rotate(u.rotate),n.translate(-u.at[0],-u.at[1]))};if(t.def.mask&&(d(),t.mask=t.def.mask(n,t)??null,n.restore()),!t.def.label)continue;d(),n.textBaseline=`alphabetic`,n.textAlign=`left`;let f=c?.get(t.el);if(!f){if(f=Ai(t,s,n,l)??void 0,!f){n.restore();continue}c?.set(t.el,f)}n.font=f.font,n.letterSpacing=f.letterSpacing;let{font:p,letterSpacing:m,wordSpacing:h,asc:g,desc:_}=f,v=new Map;for(let e of f.words){let t=e.width/a,o=e.height/a;if(!t)continue;let{text:s}=e,c=(e.left-r)/a,l=(e.top-i)/a;n.fillText(s,c,l+(o-g-_)/2+g);let u=v.get(Math.round(l));u?(u.text+=` ${s}`,u.w=c+t-u.x):v.set(Math.round(l),{x:c,y:l,w:t,h:o,text:s})}n.restore();let y=[...v.values()];if(!y.length)continue;let b=Math.min(...y.map(e=>e.x)),x=y[0].y,S=Math.max(...y.map(e=>e.x+e.w)),C=y[y.length-1].y+y[y.length-1].h;t.label={x:b-2,y:x-2,w:S-b+4,h:C-x+4,text:y.map(e=>e.text).join(` `),font:p,letterSpacing:m,wordSpacing:h,lines:y.map(e=>({...e,x:e.x-2,y:e.y-2,w:e.w+4,h:e.h+4}))}}}var Ni={width:1.5,alpha:1},Pi={width:1,alpha:.9},Fi={width:1,alpha:.7},Ii=.55,Li=.35,Ri=4e6,zi=null;function Bi(e,t){if(!zi||zi.a.width<e||zi.a.height<t){let n=Math.max(e,zi?.a.width??0),r=Math.max(t,zi?.a.height??0),i=new OffscreenCanvas(n,r),a=new OffscreenCanvas(n,r);zi={a:i,b:a,x:i.getContext(`2d`),y:a.getContext(`2d`)}}return zi}var Vi=e=>{let t=[];for(let n=-e;n<=e;n++)for(let r=-e;r<=e;r++)(r||n)&&r*r+n*n<=e*e+.5&&t.push([r,n]);return t},Hi=new Map;function Ui(e,t,n=Ii){let r=e.map(e=>Math.min(Math.max(e,0),1)**(1/2.2)*n),i=t===`dark`?Math.max(Li-Math.max(...r),0):0;return`rgb(${r.map(e=>Math.round((e+(1-e)*i)*255)).join(` `)})`}function Wi(e,t){if(t.type===`mask`)return!1;if(t.type===`holes`){let n=t.hole/2;e.beginPath();for(let r=t.cy-t.hh+t.pitch/2;r<t.cy+t.hh;r+=t.pitch)for(let i=t.cx-t.hw+t.pitch/2;i<t.cx+t.hw;i+=t.pitch)t.square?e.rect(i-n,r-n,n*2,n*2):(e.moveTo(i+n,r),e.arc(i,r,n,0,Math.PI*2));return e.fill(),!0}let{grow:n,ring:r,...i}=t;return z(e,i),!0}function Gi(e,t){let n=e.getTransform();e.lineWidth=t/(Math.hypot(n.a,n.b)||1)}function Ki(e,t){let n=!1;return{ctx:new Proxy(e,{get(e,r){if(r===`fill`)return(...n)=>(Gi(e,t),e.stroke(...n.filter(e=>typeof e!=`string`)));if(r===`fillRect`)return(n,r,i,a)=>(Gi(e,t),e.strokeRect(n,r,i,a));if(r===`stroke`)return(...n)=>(Gi(e,t),e.stroke(...n));if(r===`drawImage`)return()=>void(n=!0);let i=Reflect.get(e,r);return typeof i==`function`?i.bind(e):i},set:(e,t,n)=>t===`fillStyle`||t===`strokeStyle`||t===`globalCompositeOperation`||t===`lineWidth`||Reflect.set(e,t,n)}),layered:()=>n}}function qi(e,t,n,r,i){if(t.type===`mask`)return;e.save(),e.setTransform(n,0,0,n,0,0),e.globalAlpha=i.alpha,e.fillStyle=e.strokeStyle=r;let a=Ki(e,i.width);if(t.type===`holes`){let n=t.hole/2;e.beginPath();for(let r=t.cy-t.hh+t.pitch/2;r<t.cy+t.hh;r+=t.pitch)for(let i=t.cx-t.hw+t.pitch/2;i<t.cx+t.hw;i+=t.pitch)t.square?e.rect(i-n,r-n,n*2,n*2):(e.moveTo(i+n,r),e.arc(i,r,n,0,Math.PI*2));a.ctx.fill()}else{let{grow:e,ring:n,...r}=t;z(a.ctx,r)}e.restore(),a.layered()&&Ji(e,t,n,r,i)}function Ji(e,t,n,r,i){let a=ge(t,2),o=Math.max(0,Math.floor(a.x*n)),s=Math.max(0,Math.floor(a.y*n)),c=Math.min(e.canvas.width,Math.ceil((a.x+a.w)*n))-o,l=Math.min(e.canvas.height,Math.ceil((a.y+a.h)*n))-s;if(c<=0||l<=0)return;let u=Bi(c,l),{x:d,y:f}=u;if(d.setTransform(1,0,0,1,0,0),d.clearRect(0,0,c+2,l+2),d.setTransform(n,0,0,n,-o,-s),d.fillStyle=`#000`,Wi(d,t)){d.setTransform(1,0,0,1,0,0),f.globalCompositeOperation=`copy`,f.drawImage(u.a,0,0,c,l,0,0,c,l),f.globalCompositeOperation=`destination-in`;for(let[e,t]of Hi.get(i.width)??Hi.set(i.width,Vi(i.width)).get(i.width))f.drawImage(u.a,0,0,c,l,e,t,c,l);d.globalCompositeOperation=`destination-out`,d.drawImage(u.b,0,0,c,l,0,0,c,l),d.globalCompositeOperation=`source-in`,d.fillStyle=r,d.fillRect(0,0,c,l),d.globalCompositeOperation=`source-over`,e.globalAlpha=i.alpha,e.drawImage(u.a,0,0,c,l,o,s,c,l),e.globalAlpha=1}}function Yi(e,t){let n=t.zoom||1,r=Math.min(t.dpr*n,Math.sqrt(Ri/Math.max(t.cw*t.ch,1)));e.width=Math.max(1,Math.round(t.cw*r)),e.height=Math.max(1,Math.round(t.ch*r)),Object.assign(e.style,{left:`${-t.x}px`,top:`${-t.y}px`,width:`${t.cw}px`,height:`${t.ch}px`});let i=e.getContext(`2d`);i.clearRect(0,0,e.width,e.height);let a=e=>({width:Math.max(1,Math.round(e.width*t.dpr)),alpha:e.alpha}),o=[.2,.2,.2];for(let e of t.commands)e.op===`surface`?(o=e.material.color,qi(i,e.shape,r,Ui(o,t.scheme),a(e.body?Ni:Pi))):e.op===`cut`?qi(i,e.shape,r,e.ink?Ui(e.ink,t.scheme,1):Ui(o,t.scheme),a(Fi)):e.op===`screen`?qi(i,e.shape,r,Ui(e.color,t.scheme),a(Pi)):(e.op===`glass`||e.op===`frost`)&&qi(i,e.shape,r,Ui(e.tint,t.scheme),a(Fi))}var Xi=e=>2*2**Math.max(Math.round(-Math.log2(e)),0),Zi=e=>`rgb(${e&255} ${e>>8&255} ${e*89&255})`,Qi=(e,t,n)=>{let r=e|t<<8;return(r*89&255)===n?r:0};function $i(e,t,n,r,i,a){let o=``,s=n=>{let r=[];for(let i=0;i<t;i++)if(e[n*t+i]){let a=i;for(;i<t&&e[n*t+i];)i++;r.push(a,i)}return r};for(let e=0;e<n;){let t=s(e),c=t.join(),l=e+1;for(;l<n&&s(l).join()===c;)l++;for(let n=0;n<t.length;n+=2)o+=`M${t[n]*a+r} ${e*a+i}h${(t[n+1]-t[n])*a}v${(l-e)*a}h${(t[n]-t[n+1])*a}z`;e=l}return o||`M0 0z`}function ea(e,t){e.reachDirty=!1;for(let t of e.list)t.shifted=!1;let n=e.reachCell,r=new Set;for(let t of e.list)for(let n=t.el.parentElement;n&&n!==e.el;n=n.parentElement)r.add(n);let i=Math.ceil(e.cw/n),a=Math.ceil(e.ch/n);t.width=i,t.height=a;let o=t.getContext(`2d`,{willReadFrequently:!0});o.scale(1/n,1/n);let s=new Map;e.list.forEach((t,n)=>{let i=getComputedStyle(t.el),a=n+1;t.hit=t.el!==e.el&&!r.has(t.el)&&i.pointerEvents!==`none`&&i.transform===`none`&&t.w>0;let c=!1;o.fillStyle=Zi(a);for(let e of t.commands??[]){if(e.op===`glass`?!e.covers:e.op!==`surface`||e.zTop<e.zEdge||e.shape.type===`mask`||e.shape.type===`holes`||e.shape.ring)continue;let n=e.bend&&!x(ge(e.shape,0),e.bend)?S(ge(e.shape,0),e.bend):null;if(n&&!t.hit)continue;let{grow:r,...i}=e.shape;n&&(o.save(),o.beginPath(),o.rect(n.x,n.y,n.w,n.h),o.clip()),z(o,i),n&&o.restore(),c=!0}t.hit&&c?s.set(a,t):(t.el.hasAttribute(`d-reach`)||t.el.style.clipPath)&&ta(t)});let{data:c}=o.getImageData(0,0,i,a),l=new Uint16Array(i*a),u=new Int32Array((e.list.length+1)*4).fill(-1);for(let t=0,n=0;t<a;t++)for(let r=0;r<i;r++,n++){if(c[n*4+3]!==255)continue;let i=Qi(c[n*4],c[n*4+1],c[n*4+2]);if(!i||i>e.list.length)continue;l[n]=i;let a=i*4;u[a]<0?(u[a]=u[a+2]=r,u[a+1]=u[a+3]=t):(u[a]=Math.min(u[a],r),u[a+1]=Math.min(u[a+1],t),u[a+2]=Math.max(u[a+2],r),u[a+3]=Math.max(u[a+3],t))}for(let[t,r]of s){let a=Math.floor(r.x/n),o=Math.floor(r.y/n),c=Math.ceil((r.x+r.w)/n),d=Math.ceil((r.y+r.h)/n),f=a,p=o,m=c,h=d,g=!0;u[t*4]>=0&&(f=Math.min(f,u[t*4]),p=Math.min(p,u[t*4+1]),m=Math.max(m,u[t*4+2]+1),h=Math.max(h,u[t*4+3]+1));let _=m-f,v=m>f?h-p:0,y=new Uint8Array(_*v),b=(e,t)=>y[(t-p)*_+(e-f)]=1;for(let n=p;n<h;n++)for(let u=f;u<m;u++){let f=l[n*i+u],p=u>=a&&u<c&&n>=o&&n<d;f===t||p&&(!f||f<t&&!s.has(f)||e.list[f-1].el.contains(r.el))?b(u,n):p&&(g=!1)}let x=f<a||p<o||m>c||h>d;if(g&&!x){ta(r);continue}getComputedStyle(r.el).position===`static`&&(r.el.style.position=`relative`);let S=f*n-r.x,C=p*n-r.y;r.el.style.clipPath=`path("${$i(y,_,v,+S.toFixed(2),+C.toFixed(2),n)}")`,x?(r.el.setAttribute(`d-reach`,``),r.el.style.setProperty(`--reach-x`,`${S}px`),r.el.style.setProperty(`--reach-y`,`${C}px`),r.el.style.setProperty(`--reach-w`,`${_*n}px`),r.el.style.setProperty(`--reach-h`,`${v*n}px`)):r.el.removeAttribute(`d-reach`)}e.observer.takeRecords()}function ta(e){e.el.style.clipPath=``,e.el.removeAttribute(`d-reach`)}var na=new WeakMap,ra=new WeakSet,ia=new Set;function Z(e,t){let n=e.currentCSSZoom;if(n===void 0)return e.offsetWidth?(t??e.getBoundingClientRect()).width/e.offsetWidth:1;let r=n;for(let t=e.closest(`[data-camera]`);t;t=t.parentElement?.closest(`[data-camera]`)??null)r*=na.get(t)?.scale??1;return r}var aa=[`transform`,`scale`,`translate`,`rotate`];function oa(e){let t=document.getAnimations().filter(t=>{let n=t.effect;return t.playState===`running`&&n instanceof KeyframeEffect&&n.target!==e&&!!n.target?.contains(e)&&n.getKeyframes().some(e=>aa.some(t=>t in e))});return t.length?Promise.all(t.map(e=>e.finished.catch(()=>{}))):null}var sa=null;function ca(e,t,n=!0){let r=na.get(e);r?r.scale=t:(na.set(e,{scale:t,stage:n,turns:0}),e.dataset.camera=``),sa=e;for(let t of ia)t(e)}function la(e){ra.add(e)}var ua=e=>ra.has(e);function da(e){let t=na.get(e);t&&t.turns++;for(let t of ia)t(e)}var fa=e=>na.get(e)?.turns??0,pa=`[data-camera] [data-far]`,ma=e=>na.get(e)?.scale,ha=e=>na.get(e)?.stage??!1,ga=e=>{ia.add(e),sa&&e(sa)},_a=new Map,va=new Set;function ya(e){let t=getComputedStyle(e),n=e.getBoundingClientRect();return n.width/Z(e,n)-parseFloat(t.paddingLeft)-parseFloat(t.paddingRight)-parseFloat(t.borderLeftWidth)-parseFloat(t.borderRightWidth)}var ba=(e,t)=>{let n=getComputedStyle(e.holder).overflowX;return n===`auto`||n===`scroll`?1/0:t/e.w},xa=e=>e.el.dispatchEvent(new Event(`fitted`,{bubbles:!0}));function Sa(e,t,n){let r=getComputedStyle(e);return[t.width/n+parseFloat(r.marginLeft)+parseFloat(r.marginRight),t.height/n+parseFloat(r.marginTop)+parseFloat(r.marginBottom)]}function Ca(e){for(let t of e)Number.isNaN(t.across)&&(t.across=ya(t.holder));for(let t of e)t.el.style.zoom&&t.el.style.zoom!==`1`&&(t.el.style.zoom=`1`);for(let t of e){let e=t.el.getBoundingClientRect();[t.w,t.h]=Sa(t.el,e,Z(t.el,e))}for(let t of e)t.el.style.zoom=String(Math.min(t.view(t.w,t.h),ba(t,t.across)))}function wa(e){let t=Array.isArray(e)?new Set(e.map(e=>e.target)):null,n=[..._a.values()].filter(e=>!t||t.has(e.holder)).flatMap(e=>{let t=e.el.getBoundingClientRect(),n=ya(e.holder),[r,i]=Sa(e.el,t,Z(e.el,t)),a=Math.abs(r-e.w)>.5||Math.abs(i-e.h)>.5;return n===e.across&&!a?[]:[{f:e,across:n,flows:a}]});for(let{f:e,across:t,flows:r}of n)e.across=t,r||(e.el.style.zoom=String(Math.min(e.view(e.w,e.h),ba(e,t))));Ca(n.filter(e=>e.flows).map(e=>e.f));for(let{f:e}of n)xa(e)}var Ta=null;function Ea(e,t,n){let r=e.parentElement;if(!r)return null;Ta||(Ta=new ResizeObserver(wa),addEventListener(`resize`,wa));let i={el:e,holder:r,view:t,framed:n,across:NaN,w:0,h:0};return _a.set(e,i),Ta.observe(r),i}function Da(e){let t=_a.get(e);t&&(_a.delete(e),va.delete(t),[..._a.values()].some(e=>e.holder===t.holder)||Ta.unobserve(t.holder))}function Oa(e,t=()=>1){Da(e);let n=Ea(e,t,!0);return n?(ja(n),()=>Da(e)):()=>{}}function ka(e){let t=_a.get(e);t&&(Ca([t]),xa(t))}function Aa(e,t=!1){if(_a.get(e)?.framed)return;Da(e);let n=e.getAttribute(`scale`)?.trim();if(!n){t&&(e.style.zoom=``);return}let[r,i]=n.split(/\s+/);if(r!==`fit`){e.style.zoom=String(+r||1);return}let a=+(i??1)||1,o=Ea(e,()=>a,!1);o&&ja(o)}function ja(e){va.size||queueMicrotask(()=>{let e=[...va];va.clear(),Ca(e),e.forEach(xa)}),va.add(e)}function Ma(e){_a.get(e)?.framed||Da(e)}var Na=.18,Pa=Na*120,Fa=e=>((1.219+Pa**.4)/(1.219+Math.max(e,1e-4)**.4))**2.5,Ia=.1,La=.4,Ra=e=>{let t=.04/(.04+e);return t*La+(1-t)*Ia},za=class e{adapted=null;at=0;settled=!0;static target(e){return 120*(Na*(e.room+e.lights)+e.glow)}look(t,n=performance.now()){let r=e.target(t),i=this.adapted===null||this.settled?0:Math.min(Math.max((n-this.at)/1e3,0),.25);return this.at=n,this.adapted===null?this.adapted=r:this.adapted+=(r-this.adapted)*(1-Math.exp(-i/Ra(r))),Math.abs(this.adapted-r)<=r*.002&&(this.adapted=r),this.settled=this.adapted===r,!this.settled}get exposure(){return this.adapted===null?1:Fa(this.adapted)}},Ba=.92,Va=.4,Ha=.5,Ua=.3,Wa=.75,Ga=()=>{},Ka=e=>{Ga=e},qa=class{value;target;velocity=0;part=null;stiffness;damping;through;rest;from;after;contact;motion;landed=!0;notch=0;held=0;jumped=!1;seat;constructor(e){this.stiffness=e.stiffness,this.damping=e.damping,this.through=e.through??!1,this.contact=e.contact||null,this.motion=e.motion,this.rest=this.from=this.value=this.target=this.seat=e.value??0}set(e){this.through&&e===this.rest&&this.target!==this.rest&&this.active?this.after=e:(this.after=void 0,e!==this.target&&(this.go(e),Ga(this)))}snap(e){this.value=this.target=this.seat=e,this.velocity=0,this.after=void 0,this.landed=!0,this.jumped=!0,Ga(this)}grip(e){this.held=e}notches(e){e!==this.notch&&(this.notch=e,this.seat=this.value)}get active(){return this.jumped||this.moving}get moving(){return this.value!==this.target||this.velocity!==0}step(e,t=!1){if(this.jumped=!1,!this.moving)return!1;if(t){let e=(this.contact===`toggle`?Ua:Wa)*Math.sqrt(this.stiffness)*Math.abs(this.target-this.from);return this.value=this.target,this.feel(e),this.after!==void 0&&(this.go(this.after),this.value=this.target,this.feel(e)),this.seat=this.value,this.velocity=0,this.after=void 0,!1}let n=Math.max(1,Math.ceil(e/(1/240))),r=e/n;for(let e=0;e<n;e++)this.held?this.velocity=(this.target-this.value)/this.held:this.velocity+=(this.stiffness*(this.target-this.value)-this.damping*this.velocity)*r,this.value+=this.velocity*r,(!this.landed||this.notch)&&this.feel(Math.abs(this.velocity));return this.after!==void 0&&this.arrived&&(this.go(this.after),this.after=void 0),Math.abs(this.velocity)<.01&&Math.abs(this.target-this.value)<.001?(this.value=this.target,this.velocity=0,!1):!0}past(e){return(this.value-this.from)/(this.target-this.from)>=e}get arrived(){return this.past(Ba)}go(e){this.from=this.value,this.target=e,this.landed=!this.contact}feel(e){if(!this.landed&&this.past(this.contact===`toggle`?Ba:Va)&&(this.landed=!0,Ve(this.part,this.contact===`toggle`?`toggle`:this.target===this.rest?`release`:`press`,e,{to:this.target,motion:this.motion})),!this.notch)return;let t=(this.value-this.seat)/this.notch;Math.abs(t)<Ha||(this.seat+=Math.sign(t)*this.notch,Ve(this.part,`detent`,e/Math.abs(this.notch),{motion:this.motion}))}},Ja=e=>`grip:${e}`,Ya=200;function Xa(e,t,n=!1){return e.scale*(n?8:4)/Z(t)}function Za(e,t={}){e.style.transformOrigin=`0 0`;let n=t.turns;n&&(la(n),Object.assign(n.style,{transformOrigin:`0 0`,transform:`rotate(0deg)`}));let r=0,i=0,a={scale:1,x:0,y:0,turned:{deg:0,x:0,y:0},set(n,i,o){n===a.scale&&i===a.x&&o===a.y&&e.style.scale||(a.scale=n,a.x=i,a.y=o,e.style.willChange=`translate, scale`,clearTimeout(r),r=window.setTimeout(()=>e.style.willChange=``,Ya),e.style.translate=`${-i}px ${-o}px`,e.style.scale=String(n),ca(e,n,t.stage??!0))},turn(t,r,o){if(!n)return;a.turned={deg:t,x:r,y:o};let s=t?`translate(${r}px, ${o}px) rotate(${t}deg) translate(${-r}px, ${-o}px)`:`rotate(0deg)`;n.style.transform!==s&&(n.style.willChange=`transform`,clearTimeout(i),i=window.setTimeout(()=>n.style.willChange=``,Ya),n.style.transform=s,da(e))}};return a}var Qa=null,$a=``;function eo(){let e=document.body,t=e.getAttribute(`camera`)?.trim().split(/[\s,]+/).map(Number),[n,r,i,a]=t??[];if(!t||t.length!==4||t.some(e=>!Number.isFinite(e))||!(i>0)||!(a>0)){if(!Qa)return;Qa.set(1,0,0),Object.assign(e.style,{translate:``,scale:``,willChange:``,transformOrigin:``}),document.documentElement.style.overflow=$a,Qa=null;return}Qa||=($a=document.documentElement.style.overflow,document.documentElement.style.overflow=`hidden`,Za(e,{stage:!1}));let o=e.getBoundingClientRect(),s=o.left+Qa.x,c=o.top+Qa.y,l=Math.min(innerWidth/i,innerHeight/a);Qa.set(l,s+(n+i/2-s)*l-innerWidth/2,c+(r+a/2-c)*l-innerHeight/2)}function to(){new MutationObserver(eo).observe(document.body,{attributes:!0,attributeFilter:[`camera`]}),addEventListener(`resize`,()=>Qa&&eo()),eo()}typeof document<`u`&&(document.body?to():document.addEventListener(`DOMContentLoaded`,to,{once:!0}));var no=new WeakSet,ro=64,io=16,ao=3,oo=32,so=4,co=24,lo=.25,uo=1e3/30,fo=new Set([`color`,`ink`,`emit`]),po=new Set([`shape`,`tangent`,`marks`]);function mo(e){let t=[-1/0,-1/0,1/0,1/0];for(let n=e;n&&n!==document.documentElement;n=n.parentElement){let e=getComputedStyle(n);if(e.overflowX===`visible`&&e.overflowY===`visible`&&!/paint|strict|content/.test(e.contain))continue;let r=n.getBoundingClientRect();(e.overflowX!==`visible`||e.contain!==`none`)&&([t[0],t[2]]=[Math.max(t[0],r.left),Math.min(t[2],r.right)]),(e.overflowY!==`visible`||e.contain!==`none`)&&([t[1],t[3]]=[Math.max(t[1],r.top),Math.min(t[3],r.bottom)])}return t}var ho=new WeakMap;function go(e,t=!1){for(let n=e;n&&n!==document.documentElement;n=n.parentElement){let e=ho.get(n);if(e===void 0&&t){let t=getComputedStyle(n).contain;ho.set(n,e=t===`strict`||/\bsize\b/.test(t)&&/\blayout\b/.test(t))}if(e)return n}return null}var _o=new WeakMap,vo=120,yo=.05;function bo(e,t){let n=``;for(let r=e;r&&r!==t;r=r.parentElement){let e=getComputedStyle(r);n+=`${e.transform} ${e.rotate} ${e.scale} ${e.translate},`}return n}var xo=300,So=`${xo}px`,Co=320,wo=96e6,To=globalThis.matchMedia?.(`(pointer: coarse)`).matches?6e8:3e9,Eo=Math.log(1.2),Do=1,Oo=`100%`,ko=40,Ao=.004,jo=.62,Mo=e=>({at:e.at,far:Cr({at:e.at,reach:e.half*2,color:e.color},Ao),from:e.from,flat:e}),No=8;function Po(e){if(!e.length)return null;let t=[0,0,0],n=0,r=0,i=0,a=0;for(let o of e){let e=(o.half/o.per)**2,s=(o.color[0]+o.color[1]+o.color[2])*e;for(let n=0;n<3;n++)t[n]+=o.color[n]*e;n+=s,r+=s*o.on[0]/o.per,i+=s*o.on[1]/o.per,a+=s*o.half/o.per}return n?{power:t,x:r/n,y:i/n,reach:a/n,per:e[0].per}:null}function Fo(e,t,n,r,i){let a=i/Math.min(r,t?.per??r);if(n<a*No)return!0;if(!e||!t)return!e&&!t;let o=Math.max(...e.power,...t.power);return e.power.every((e,n)=>Math.abs(e-t.power[n])<=o*.25)&&Math.hypot(e.x-t.x,e.y-t.y)<Math.max(a,t.reach*.25)&&Math.abs(e.reach-t.reach)<Math.max(Math.max(e.reach,t.reach)*.25,a/2)}var Io=(e,t)=>{let n=Math.max(...e.color);return Math.min(Cr({at:e.at,reach:e.half*2,color:e.color},Ao),Math.max(e.half,Math.cbrt(n*e.half*e.half*t/Ao)))},Lo=64,Ro=class e{all;bins=new Map;wide=[];seen;stamp=0;constructor(t){this.all=t,this.seen=new Uint32Array(t.length),t.forEach((t,n)=>{let[r,i,a,o]=e.cells(t.at[0]-t.far,t.at[1]-t.far,t.at[0]+t.far,t.at[1]+t.far);if(!((i-r+1)*(o-a+1)<=256))return void this.wide.push(n);for(let e=a;e<=o;e++)for(let t=r;t<=i;t++){let r=t*65536+e,i=this.bins.get(r);i?i.push(n):this.bins.set(r,[n])}})}static cells(e,t,n,r){let i=e=>Math.min(Math.max(Math.floor(e/Lo),-32e3),32e3)+32768;return[i(e),i(n),i(t),i(r)]}near(t,n,r,i,a){let[o,s,c,l]=e.cells(t,n,r,i);if(!((s-o+1)*(l-c+1)<=this.bins.size))return this.all.forEach(a);let{all:u,seen:d}=this,f=++this.stamp;for(let e of this.wide)a(u[e]);for(let e=c;e<=l;e++)for(let t=o;t<=s;t++)for(let n of this.bins.get(t*65536+e)??[])d[n]!==f&&(d[n]=f,a(u[n]))}},zo=16,Bo=4,Vo=120,Ho=100,Uo=1,Wo=2,Go=(e,t,n)=>t>=e.left&&t<e.right&&n>=e.top&&n<e.bottom,Ko=200,qo=100,Jo=1.5,Yo=2,Xo=.05,Zo=6,Qo=12,$o=12,es=400,ts=160,ns=3,rs=125,is=8;function as(e){let t=e.getAttribute(`split`);return t===null?-1:Math.min(Math.max(+t,0),1)}var os=8,ss=75,cs=e=>{let[t=0,n=0]=(e.getAttribute(`angle`)??``).trim().split(/\s+/).map(e=>Math.min(Math.max(parseFloat(e)||0,-75),ss));return[t,n]},ls=([e,t])=>{if(!e&&!t)return``;let n=e*Math.PI/360,r=t*Math.PI/360,i=[Math.cos(n)*Math.sin(r),Math.sin(n)*Math.cos(r),-Math.sin(n)*Math.sin(r)],a=Math.hypot(...i);return`${i.map(e=>+(e/a).toFixed(6)).join(` `)} ${+(Math.atan2(a,Math.cos(n)*Math.cos(r))*360/Math.PI).toFixed(4)}deg`};function us(e){for(let t=e.parentElement;t;t=t.parentElement){let n=getComputedStyle(t);if(n.perspective===`none`)continue;let r=e.getBoundingClientRect(),i=t.getBoundingClientRect(),a=Z(t,i),[o=0,s=0]=n.perspectiveOrigin.split(` `).map(parseFloat),c=[i.left+o*a-(r.left+r.width/2),i.top+s*a-(r.top+r.height/2),parseFloat(n.perspective)*a],l=Math.hypot(...c);return[c[0]/l,c[1]/l,c[2]/l]}return[0,0,1]}var ds=e=>Math.min(Math.max(parseFloat(e.getAttribute(`lean`)??``)||0,0),os),fs=e=>Math.max(ut.indexOf(e.getAttribute(`debug`)??``),0),ps={mint:{prints:0,dust:0,scuff:0,haze:0,wear:0,age:0,grime:0,dents:0,fade:0},new:{prints:.14,dust:.14,scuff:.12,haze:.35,wear:0,age:0,grime:0,dents:0,fade:0},used:{prints:.42,dust:.35,scuff:.42,haze:.6,wear:.12,age:.1,grime:.1,dents:.1,fade:.05},worn:{prints:.7,dust:.6,scuff:.75,haze:.8,wear:.3,age:.3,grime:.35,dents:.35,fade:.2},abused:{prints:1,dust:.9,scuff:1,haze:1,wear:.6,age:.7,grime:.7,dents:.75,fade:.4}},ms=(e,t)=>{let n=e.closest(`d-device`);return`${c(e)?.selector??e.localName} threw: ${t instanceof Error?t.message:String(t)}\n  in ${h(e)}${n&&n!==e?`\n  of ${h(n)}`:``}`},hs=e=>e.def.local?{at:[e.x,e.y],scale:e.def.local===!0?1:e.def.local}:{};function gs(e,t,n,r){let i=document.activeElement;for(;i&&!n.parts.has(i);)i=i.parentElement;if(i!==t.el)return;let a=e.commands.slice(r);if(a.some(e=>e.op===`glow`))return;let o=a.find(e=>e.op===`surface`)?.shape;o&&o.type!==`mask`&&o.type!==`holes`&&e.commands.push({op:`glow`,shape:L(o,1.5),color:_e,width:1.1})}function _s(e,t){let n=null;for(let r=t;r<e.length;r++)n=K(n,G(e[r]));return n}var vs=e=>e?.replace(ys,``),ys=/ ?(?:clip-path|--reach-[xywh]):(?:[^;"]|"[^"]*")*;?/g,bs=class extends Set{stirred;asked=new Set;constructor(e){super(),this.stirred=e}add(e){return this.stirred(),this.asked.delete(e),super.add(e)}ask(e){this.has(e)||(this.add(e),this.asked.add(e))}clear(){this.asked.clear(),super.clear()}},xs=()=>({r:null,at:-1,look:-1,local:null}),Ss={x:[1,0,0],y:[0,1,0],z:[0,0,1]},Cs={deg:1,rad:180/Math.PI,grad:.9,turn:360},ws=(e,t)=>e&&(e.endsWith(`%`)?parseFloat(e)/100*t:parseFloat(e))||0,Ts=e=>parseFloat(e)*(Cs[e.match(/[a-z]+$/)?.[0]??`deg`]??1);function Es(e,t,n){if(e.transform===`none`&&e.translate===`none`&&e.rotate===`none`&&e.scale===`none`)return null;let r=new DOMMatrix;if(e.translate!==`none`){let[i,a,o]=e.translate.split(` `);r.translateSelf(ws(i,t),ws(a,n),ws(o,0))}if(e.rotate!==`none`){let t=e.rotate.split(` `),n=t.length===4?t.slice(0,3).map(Number):t.length===2?Ss[t[0]]??Ss.z:Ss.z;r.rotateAxisAngleSelf(n[0],n[1],n[2],Ts(t[t.length-1]))}if(e.scale!==`none`){let[t=1,n=t,i=1]=e.scale.split(` `).map(e=>e.endsWith(`%`)?parseFloat(e)/100:parseFloat(e));r.scaleSelf(t,n,i)}return e.transform!==`none`&&r.multiplySelf(new DOMMatrix(e.transform)),r}var Ds=(e,t,n,r=0)=>new DOMMatrix().translate(t,n,r).multiply(e).translate(-t,-n,-r),Os=(e,t)=>t===1?e:new DOMMatrix().scale(t,t,t).multiply(e).scale(1/t,1/t,1/t),ks=e=>e.style.cssText.replace(/(^|;)\s*(translate|scale|will-change)\s*:[^;]*/g,``).trim(),As=[`layoutDirty`,`viewDirty`,`materialDirty`,`lightDirty`,`reachDirty`,`sharpen`,`visible`,`handy`,`used`],js=new Set([`data-veiled`,`data-far`,`data-asleep`,`data-over`,`data-up`,`data-turning`,`seated`,`moving`,`at`,`folded`,`data-face`]),Ms=e=>e?.replace(Ns,``),Ns=/ ?(?:zoom|translate|scale|transform-origin|will-change):[^;"]*;?/g,Ps=e=>e?.match(/zoom:[^;"]*/)?.join(``)??``,Fs=new WeakMap,Is=e=>(e??``).replace(Ls,``).replace(/\s*([:;])\s*/g,`$1`).replace(/;$/,``).trim(),Ls=/ ?(?:perspective|transform-style|isolation|rotate):[^;"]*;?/g,Rs=e=>e instanceof HTMLCanvasElement&&(e.dataset.d!==void 0||e.dataset.sketch!==void 0),zs=(e,t)=>{let n=e.nodeType===1?e:e.parentElement,r=n?.closest(`d-device, [data-alone]`),i=n&&r?.__d&&(r.__d.parts.get(n)??r.__d.parts.get(n.parentElement));return i&&i.def.live?.includes(t)?i:void 0},Bs=new Set([`d-reach`,`data-far`,`data-asleep`,`data-bent`,`data-flat`]),Vs=e=>Us(e??``).replace(ys,``).replace(Ls,``),Hs=null,Us=e=>(Hs??=document.createElement(`i`).style,Hs.cssText=e,Hs.cssText),Ws=e=>e.type===`mask`?e.box.w*e.box.h:e.type===`capsule`?Math.hypot(e.ax-e.bx,e.ay-e.by)*(e.ra+e.rb):e.hw*e.hh*4;function Gs(e,t){let n=0;for(let r=t;r<e.length;r++){let t=e[r];if(t.op===`screen`&&t.gain>0)return NaN;let i=t.op===`glow`?t.color:t.op===`surface`?t.material.emit:t.op===`cut`||t.op===`screen`?t.emit:null;i&&(n+=(i[0]+i[1]+i[2])*Ws(t.shape))}return n}function Ks(e,t,n,r){if(e===t)return!0;if(typeof e!=`object`||typeof t!=`object`||!e||!t)return!1;let i=Object.getPrototypeOf(e);if(i!==Object.getPrototypeOf(t)||i!==Object.prototype&&i!==Array.prototype)return!1;let a=e,o=t,s=Object.keys(a);return s.length===Object.keys(o).length&&s.every(e=>r?.has(e)||(typeof a[e]==`function`&&typeof o[e]==`function`?`key`in a:n?.has(e)&&a[e]&&o[e]||Ks(a[e],o[e],n,r)))}var qs=(e,t)=>e.el.compareDocumentPosition(t.el)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1;function Js(e,t){let n=0,r=e.length;for(;n<r;){let i=n+r>>1;qs(e[i],t)<0?n=i+1:r=i}return n}var Ys=(e,t)=>e?.x===t?.x&&e?.y===t?.y&&e?.w===t?.w&&e?.h===t?.h,Xs=e=>e.localName===`d-surface`&&e.hasAttribute(`path`)&&!e.style.width&&(parseFloat(e.getAttribute(`height`)??``)||0)>0,Zs=e=>[...e.children].reduce((e,t)=>e+(Xs(t)?parseFloat(t.getAttribute(`height`)):0),parseFloat(e.getAttribute(`height`)??``)||4),Qs=e=>[...e.querySelector(`:scope > d-device[reverse]`)?.children??[]].reduce((e,t)=>e+(Xs(t)?parseFloat(t.getAttribute(`height`)):0),0),$s={front:0,right:Math.PI/2,back:Math.PI,left:-Math.PI/2},ec=e=>{let t=e.getAttribute(`turned`);return t===null?`front`:t===`left`||t===`right`?t:`back`},tc=3,nc=.35,rc=.3,ic=.6,ac=2*rc*ic,oc=.6,sc=.015,cc=.25,lc=6,uc=.15,dc=.2,fc=.6,pc=(e,t)=>e+Math.atan2(Math.sin($s[t]-e),Math.cos($s[t]-e)),mc=[`full`,`one`,`fixed`],hc=3e3;function gc(e){for(;e;e=e.parentElement){let t=getComputedStyle(e).backgroundColor.match(/[\d.]+/g);if(t&&t.length>=3&&(t.length<4||Number(t[3])>=.5))return[Number(t[0])/255,Number(t[1])/255,Number(t[2])/255]}return[1,1,1]}var _c=class{devices=new Set;stats={paints:0,partial:0,lights:0,frames:0,layouts:0,measures:0,paintMs:0,lightMs:0,copyMs:0,copies:0,stages:0,layoutMs:0,held:0};ok=!1;maxRatio=globalThis.matchMedia?.(`(pointer: coarse)`).matches?2:6;oversample=this.maxRatio>2?2:1;cards=!0;sides=!1;raised=!0;get relief(){return this.raised}set relief(e){e!==this.raised&&(this.raised=e,this.renderer?.showRelief(e),typeof document<`u`&&this.repaintWithin(document.documentElement))}whips=new WeakMap;whipped=0;grounds=new WeakMap;keep=globalThis.matchMedia?.(`(pointer: coarse)`).matches?6e8:1/0;departures=0;renderer=null;get probe(){return this.renderer.probe}set probe(e){this.renderer.probe=e}get fields(){return this.renderer.fields}maskCanvas=new OffscreenCanvas(1,1);maskCtx=this.maskCanvas.getContext(`2d`);reachCanvas=document.createElement(`canvas`);io=null;view=null;far=null;farOff=new Set;farOn=new Set;judged=new Map;judgedAt=[-1,-1,-1];sleepers=new Map;sleptStale=!1;woken=null;handAt=null;stage=null;veils=new Map;staleStage=!1;ro=null;moves=0;shifts=0;unsure=new Map;arrived=new Set;changes=[];holderBox=new WeakMap;seen=null;wantsSeen=!1;doubt=-1;looks=0;lenses=new WeakMap;lensStyle=new WeakMap;quietAt=-1;ticking=null;tickAsked=!1;scrolledTo=[0,0];page=null;carries=new WeakMap;raf=0;last=0;lightDirty=!0;lightChanges=0;pointsMoved=!1;glowMoved=[];pointsAll=!0;glowStale=!0;glowAt=-1/0;points=null;flickered=0;pointer={x:0,y:0,tx:0,ty:0,i:0,ti:0,seen:!1};reduced=matchMedia(`(prefers-reduced-motion: reduce)`);byPointer=!1;tilt=0;strict=!1;ambient=1;lighting=`studio`;eye=new za;exposure=`auto`;scrollAt=-1/0;torch=0;handheld=`flashlight`;fullLight=!0;sweeping=!1;room=oo;arriving=4;lightEach=.2;behind=!1;scrolled=!1;carried=!1;leftOut=null;pinned=null;making=null;handsDue=!1;turnsDue=!1;handShifted=!1;blamed=null;sizing=!1;sizedUntil=0;sizedTimer=0;beatAt=0;beatTimer=0;owner=new WeakMap;markup=new MutationObserver(e=>this.remark(e));lights=1;lampHz=30;lampHzOf=null;live=globalThis.matchMedia?.(`(pointer: coarse)`).matches?`one`:`full`;livedAt=-1/0;shortSince=null;pressed=null;focusAt=-1;focusIs=null;lampFor=null;lampOwed=!1;look=0;constructor(){let e=document.createElement(`style`);e.dataset.diegetic=``,document.head.prepend(e);let t=e,r=null;if(n(e=>{r||(r=[],queueMicrotask(()=>{let e=document.createElement(`style`);e.dataset.diegetic=``,e.textContent=r.join(`
`),r=null,t.after(e),t=e})),r.push(e)},t=>e.append(t)),e.append(`[data-bent],[data-flat]{transform:none!important;translate:none!important;rotate:none!important;scale:none!important}`),this.renderer=new Ti(this.stats,()=>{for(let e of this.devices)e.layoutDirty=!0;this.schedule()},()=>{let e=this.sharpness(1)/this.renderer.store.squeeze;return[(innerWidth+128)*e,(innerHeight+128)*e]}),!this.renderer.ok||(this.player=this.renderer.player=new sn(this.renderer.gl),!this.player.ready()))return;this.renderer.store.ceiling=To,this.renderer.refused=()=>{this.renderer.store.tally();for(let e of this.devices)e.layoutDirty=!0;this.schedule()},this.ok=!0,this.io=new IntersectionObserver(e=>this.near(e.flatMap(e=>{let t=e.target.__d;return t?[[t,e.isIntersecting]]:[]})),{rootMargin:So}),this.view=new IntersectionObserver(e=>{for(let t of e)this.sighted(t.target.__d,t.isIntersecting);this.schedule()},{rootMargin:`${ko}px`}),this.far=new IntersectionObserver(e=>{for(let t of e)this.farFrom(t.target,t.isIntersecting)},{rootMargin:Oo}),this.ro=new ResizeObserver(e=>this.resized(e)),this.page=new MutationObserver(e=>this.changed(e)),this.page.observe(document.documentElement,{subtree:!0,childList:!0,attributes:!0,characterData:!0});let i=()=>{this.moves++,this.judged.size&&this.schedule()};addEventListener(`resize`,i),addEventListener(`load`,i,{capture:!0}),Ka(e=>{let t=e.part&&this.owner.get(e.part);t&&this.stir(t),t?.small&&!t.used?this.onBeat():this.schedule()}),Mr(()=>{this.pointsMoved=!0,this.schedule()});let a=()=>this.relight();addEventListener(`scroll`,()=>this.panned(),{passive:!0,capture:!0}),ga(e=>this.viewed(e)),pr(()=>{this.stage&&(this.staleStage=!0,this.schedule())}),addEventListener(`resize`,()=>{this.look||this.torch?a():this.lights&&this.pointer.i&&(this.handShifted=!0,this.schedule())}),addEventListener(`pointermove`,e=>{if(!this.look&&!this.lights&&!this.torch||this.reduced.matches||this.lampHeld||e.buttons&&!this.torch&&e.pointerType!==`touch`)return;let t=this.pointer;t.tx=e.clientX,t.ty=e.clientY,t.ti=1,this.carried=!1,t.seen||=(t.x=t.tx,t.y=t.ty,!0),this.schedule()},{passive:!0});let o=e=>{let t=e.clientX,n=e.clientY,r=this.woken;if(this.handAt=[t,n],r&&!Go(r.r,t,n)&&this.unhand(),!(this.woken||this.sizing||!this.sleepers.size)){if(this.sleptStale){for(let e of this.sleepers.keys())this.sleepers.set(e,this.where(e));this.sleptStale=!1}for(let[e,r]of this.sleepers)if(Go(r,t,n)&&!e.el.closest(`[inert]`)){this.woken={d:e,r},e.used|=Uo,this.rest(e);break}}};addEventListener(`pointermove`,o,{passive:!0}),addEventListener(`pointerdown`,o,{capture:!0,passive:!0}),addEventListener(`pointerdown`,e=>{let t=e.target instanceof Element?Q(e.target):null;t&&(this.pressed=t.front??t,this.focusAt=-1,this.live===`one`&&this.schedule())},{capture:!0,passive:!0}),addEventListener(`scroll`,()=>{this.pressed=null,this.focusAt=-1},{passive:!0,capture:!0});let s=e=>{e.pointerType!==`touch`||this.torch||this.lampHeld||(this.pointer.ti=0,this.schedule())};addEventListener(`pointerup`,s,{passive:!0}),addEventListener(`pointercancel`,s,{passive:!0}),addEventListener(`pointerdown`,()=>{this.byPointer=!0},{capture:!0,passive:!0}),addEventListener(`keydown`,()=>{if(this.byPointer){this.byPointer=!1;for(let e of this.devices)e.el.contains(document.activeElement)&&this.touch(e,document.activeElement);this.schedule()}},{capture:!0}),document.documentElement.addEventListener(`pointerleave`,()=>{this.pointer.ti=0,this.schedule()});let c=()=>{this.moves++;for(let e of this.devices)e.layoutDirty=!0,e.print=``;this.schedule()};document.fonts?.ready.then(c),document.fonts?.addEventListener(`loadingdone`,c);let l=matchMedia(`(forced-colors: active)`),u=()=>document.documentElement.classList.toggle(`d-gl`,!l.matches);l.addEventListener(`change`,u),u();let d=()=>{for(let e of this.devices)e.themed&&Cc(e.el)!==e.scheme&&(e.layoutDirty=e.materialDirty=!0,e.print=``,this.schedule())};new MutationObserver(d).observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`style`,`data-mode`,`data-theme`,`data-color-scheme`]}),matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,d)}add(e){if(Aa(e),!this.ok)return;for(let t of e.querySelectorAll(`:scope > canvas[data-d]`))t.remove();let t=document.createElement(`canvas`);t.dataset.d=``,t.setAttribute(`aria-hidden`,`true`),e.prepend(t);let n={el:e,canvas:t,ctx:t.getContext(`2d`,Ue),parts:new Map,list:[],movers:[],cleanups:new Map,observer:new MutationObserver(r=>{for(let i of r){if(i.target===t||i.target===n.drawing||i.attributeName===`data-bent`||i.attributeName===`data-flat`||no.has(i.target)||i.type===`childList`&&[...i.addedNodes,...i.removedNodes].every(e=>no.has(e))||i.type===`childList`&&[...i.addedNodes,...i.removedNodes].every(e=>e instanceof HTMLCanvasElement&&`sketch`in e.dataset))continue;let r=i.target.nodeType===1?i.target:i.target.parentElement;if(this.stage&&r===e&&i.attributeName===`style`&&xc(i.oldValue)!==xc(e.getAttribute(`style`))&&this.restage(n),r.closest(`d-device, [data-alone]`)!==e)continue;if(r===e&&i.attributeName&&js.has(i.attributeName)){this.reseen(e);continue}if(r===e&&i.attributeName===`turned`){let t=ec(e);(t===`front`||n.faces.some(e=>e.facing===t))&&(n.spun=pc(n.spun,t)),this.turnsDue=!0,this.schedule();continue}if(i.attributeName===`d-reach`||i.attributeName&&vs(i.oldValue)===vs(r.getAttribute(i.attributeName)))continue;if(r===e&&i.attributeName===`style`&&Is(Ms(i.oldValue))===Is(Ms(e.getAttribute(i.attributeName)))){let t=Ps(e.getAttribute(`style`));Fs.get(e)!==t&&(Fs.set(e,t),this.resized([{target:e}]));continue}if(r===e&&i.attributeName===`scale`){Aa(e,!0);continue}if(r===e&&i.attributeName===`split`){n.split=as(e),n.lightDirty=!0,n.lightBox=null,this.schedule();continue}if(r===e&&i.attributeName===`debug`){n.debug=fs(e);for(let e of n.faces)e.debug=n.debug;n.lightDirty=!0,n.lightBox=null,this.schedule();continue}if(r===e&&i.attributeName===`lighting`){n.lightDirty=!0,n.lightBox=null,this.schedule();continue}if(r===e&&i.attributeName===`angle`){n.angle=cs(e),e.style.rotate=ls(n.angle);for(let e of n.faces)e.angle=n.angle;n.lightDirty=!0,n.lightBox=null,this.schedule();continue}if(r===e&&i.attributeName===`lean`){n.lean=ds(e);for(let e of n.faces)e.lean=n.lean;n.lightDirty=!0,n.lightBox=null,this.schedule();continue}let a=zs(i.target,i.type===`attributes`?i.attributeName:`#text`);a?(a.def.update?.(a),n.moving.add(a)):n.layoutDirty=!0,this.schedule()}}),listeners:new AbortController,plate:null,x:e.hasAttribute(`fill`)?0:ro,y:e.hasAttribute(`fill`)?0:ro,w:0,h:0,room:[1/0,1/0],drawn:null,bare:null,plain:null,hid:null,bend:null,card:null,used:0,pointBox:null,glowedAt:``,gave:null,inked:null,shone:[],seenLight:-1,material:`plain`,wear:0,age:0,radius:10,pw:0,ph:0,cw:0,ch:0,dpr:1,fine:1,seed:this.devices.size+1,scheme:`light`,themed:!1,debug:0,split:-1,lean:ds(e),angle:cs(e),eye:[0,0,1],turns:e.matches(`[reverse], [side]`)||!!e.querySelector(`:scope > d-device:is([reverse], [side])`),faces:[],spin:0,axis:0,owns:[0,0,0],round:0,body:null,spun:0,spinning:0,over:!1,turning:!1,whipped:!1,hush:0,held:0,handy:!1,visible:!1,waited:0,stirred:0,stepped:0,small:!1,cost:0,toward:1,kept:[xs(),xs()],cam:void 0,quiet:!1,ticked:!1,left:0,hand:0,turn:[0,0],aim:[0,0],owed:!1,landing:!1,sharpen:!1,viewDirty:!1,marks:0,reshaped:0,compiled:null,layoutDirty:!0,materialDirty:!0,lightDirty:!0,placed:!1,version:0,prints:0,dust:0,scuff:0,haze:0,grime:0,dents:0,fade:0,print:``,face:4,cast:4,moving:null,lightBox:null,reachDirty:!0,reachCell:2,drawing:null,failed:null,staged:!1,leaving:!1,shown:!1,own:!1};n.moving=new bs(()=>this.stir(n));for(let e of As){let t=n[e];Object.defineProperty(n,e,{get:()=>t,set:e=>{t=e,e&&this.stir(n)}})}let r=e.hasAttribute(`reverse`)?`back`:e.getAttribute(`side`)===`left`?`left`:e.getAttribute(`side`)===`right`?`right`:null,i=e.parentElement.__d;r&&i?(n.front=i,n.facing=r,i.faces.push(n),r===`back`&&(i.reverse=n),n.lean=i.lean,n.angle=i.angle,r!==`back`&&e.style.setProperty(`--d-deep`,`${(Zs(i.el)+Qs(i.el))/.25}px`),ec(i.el)===r&&(i.spun=pc(i.spun,r),this.turnsDue=!0)):(n.angle[0]||n.angle[1])&&(e.style.rotate=ls(n.angle)),n.plate=this.renderer.open(n),n.front&&(n.round=$s[n.facing],this.bodied(n.front)),e.__d=n,this.devices.add(n),e.parentElement&&this.arrived.add(e.parentElement),this.io.observe(e),this.view.observe(e),this.far.observe(e);try{this.ro.observe(e,{box:`device-pixel-content-box`})}catch{this.ro.observe(e)}n.observer.observe(e,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeOldValue:!0}),this.markup.observe(e,{subtree:!0,childList:!0,characterData:!0,characterDataOldValue:!0,attributes:!0,attributeOldValue:!0}),this.bind(n)}bodied(e){let t=[e,...e.faces],n=e.faces.length?t.map(e=>e.plate):null;for(let e of t)e.body=n,e.plate.edged=[]}remove(e){Ma(e);let t=e.__d;if(t){this.devices.delete(t),t.shone.length&&(this.glowMoved.push(...t.shone),this.schedule()),t.front&&(t.front.faces=t.front.faces.filter(e=>e!==t),t.front.reverse===t&&delete t.front.reverse,this.bodied(t.front)),this.io.unobserve(e),this.view.unobserve(e),this.far.unobserve(e),this.judged.delete(t),this.farOff.delete(e),this.farOn.delete(e),e.removeAttribute(`data-far`),e.removeAttribute(`data-asleep`),this.sleepers.delete(t),this.woken?.d===t&&(this.woken=null),this.ro.unobserve(e),t.observer.disconnect(),t.listeners.abort();for(let e of t.cleanups.values())e();if(this.renderer.close(t.plate),t.canvas.remove(),this.grounds.get(t)?.canvas.remove(),this.grounds.delete(t),t.drawing?.remove(),(t.staged||t.leaving)&&this.stage){let{order:e}=this.stage,n=e?.indexOf(t)??-1;n>=0&&e.splice(n,1),this.staleStage=!0,this.schedule()}delete e.__d}}touch(e,t){for(let n=t;n&&n!==e.el.parentElement;n=n.parentElement){let t=e.parts.get(n);t&&e.moving.add(t)}}redraw(e,t){this.touch(t,e),this.schedule()}bind(e){let{signal:t}=e.listeners,n=t=>{this.touch(e,t.target),this.schedule()};e.el.addEventListener(`focusin`,n,{signal:t}),e.el.addEventListener(`focusout`,n,{signal:t});let r=t=>{t.type===`focusin`||e.el.contains(t.relatedTarget)?e.used|=Wo:e.used&=-3,this.sizing||this.rest(e)};e.el.addEventListener(`focusin`,r,{signal:t}),e.el.addEventListener(`focusout`,r,{signal:t});let i=e.front??e;if(!e.front&&e.turns)for(let[n,r]of[[`pointerenter`,!0],[`pointerleave`,!1]])e.el.addEventListener(n,()=>{e.handy=r,this.schedule()},{signal:t});let a=(t,n)=>{let r=Math.max(Math.hypot(t,n),1);e.aim=[t/r,n/r],this.turnsDue=!0,this.schedule()},o=!1;e.el.addEventListener(`pointerdown`,n=>{if(n.button||n.target!==e.el)return;if(i.faces.length&&!i.el.hasAttribute(`fixed`)){let e=i.el.getBoundingClientRect(),r=i.aim[1],{clientY:a}=n,s=i.spun,c=n.clientX;qe(i.el,n),o=!0;let l=t=>{let n=-((t.clientX-c)/e.width)*Math.PI;if(this.cards){let e=Math.sign(n),r=this.turnable(i).flatMap(e=>[-1,0,1].map(t=>pc(s,e.facing??`front`)+t*Math.PI*2)),a=Math.min(...r.map(t=>(t-s)*e).filter(e=>e>.001));Math.abs(n)>a*rc?(s+=e*a,c=t.clientX,i.spun=s):i.spun=s+n*ic}else i.spun=s-(t.clientX-c)/e.width*Math.PI;if(i.lean)for(let n of[i,...i.faces])n.aim=[0,Math.max(-1,Math.min(1,r-(t.clientY-a)/(e.height/2)))];this.turnsDue=!0,this.schedule()},u=()=>{o=!1;let e=this.turnable(i).map(e=>e.facing??`front`).reduce((e,t)=>Math.abs(pc(i.spun,t)-i.spun)<Math.abs(pc(i.spun,e)-i.spun)?t:e);i.spun=pc(i.spun,e),e===`front`?i.el.removeAttribute(`turned`):i.el.setAttribute(`turned`,e===`back`?``:e),this.turnsDue=!0,this.schedule(),i.el.removeEventListener(`pointermove`,l),i.el.removeEventListener(`lostpointercapture`,u)};i.el.addEventListener(`pointermove`,l,{signal:t}),i.el.addEventListener(`lostpointercapture`,u,{signal:t});return}if(!e.lean)return;let r=e.el.getBoundingClientRect(),[s,c]=e.aim,{clientX:l,clientY:u}=n;qe(e.el,n),o=!0;let d=e=>a(s-(e.clientX-l)/(r.width/2),c-(e.clientY-u)/(r.height/2)),f=()=>{o=!1,e.el.removeEventListener(`pointermove`,d),e.el.removeEventListener(`lostpointercapture`,f)};e.el.addEventListener(`pointermove`,d,{signal:t}),e.el.addEventListener(`lostpointercapture`,f,{signal:t})},{signal:t}),e.el.addEventListener(`pointerleave`,()=>{if(!o)for(let t of i.faces.length?[i,...i.faces]:[e])(t.aim[0]||t.aim[1])&&(t.aim=[0,0],this.turnsDue=!0,this.schedule())},{signal:t});let s=t=>{if(t.target.type===`radio`){for(let t of e.list)t.def.update?.(t),e.moving.add(t);this.schedule()}for(let n=t.target;n&&n!==e.el.parentElement;n=n.parentElement){let t=e.parts.get(n);t?.def.update&&(t.def.update(t),e.moving.add(t),this.schedule())}};e.el.addEventListener(`input`,s,{signal:t}),e.el.addEventListener(`change`,s,{signal:t})}relight(){this.lightDirty=this.fullLight=!0,this.schedule()}lampHeld=!1;get aimed(){return this.pointer}aim(e,t){let n=this.pointer;n.tx=e,n.ty=t,n.ti=1,this.carried=!0,this.schedule()}letGo(){this.lampHeld=!1,this.pointer.ti=0,this.schedule()}schedule(e){let t=e?Q(e):this.ticking;t&&(this.stir(t),t===this.ticking&&(this.tickAsked=!0)),!this.raf&&this.ok&&(this.raf=requestAnimationFrame(this.tick))}onBeat(){this.raf||this.beatTimer||!this.ok||(this.beatTimer=window.setTimeout(()=>(this.beatTimer=0,this.schedule()),Math.max(0,this.beatAt+rs-performance.now())))}told=new WeakSet;async flushed(e=240){await document.fonts.ready;for(let e=0;e<300&&![...this.devices].some(e=>e.visible);e++)await new Promise(e=>setTimeout(e,10));let t=[...this.devices].map(e=>e.el).filter(e=>!this.told.has(e));for(let e of t)this.told.add(e);t.length&&await new Promise(e=>{let n=new IntersectionObserver(()=>{n.disconnect(),e()});for(let e of t)n.observe(e)});let n=performance.now(),r=0,i=()=>this.stats.lights+this.stats.paints+this.stats.layouts;for(let t=0;t<e&&r<2;t++){let e=i();this.flush(n+=16.7);let t=this.sweeping||this.handsDue||this.turnsDue,a=!!this.player&&[...this.devices].some(e=>e.unread);r=i()===e&&!t&&!a?r+1:0,await new Promise(e=>setTimeout(e))}}flush(e=performance.now()){this.raf&&cancelAnimationFrame(this.raf),this.sizing&&this.settle(),this.tick(e,!0)}resized(e){let t=new Set;for(let n of e){let e=go(n.target.parentElement);if(!e){t.clear(),this.moves++;break}t.add(e)}t.size&&this.shifted(t);let n=!1,r=!1;for(let t of e){let e=t.target.__d;if(!e)continue;if(!e.placed){e.layoutDirty=!0;continue}let i=this.flat(e,()=>{let t=e.el.getBoundingClientRect(),n=Z(e.el,t);return Math.abs(t.width-e.w*n)<Xo&&Math.abs(t.height-e.h*n)<Xo});e.visible?(r=e.owed=!0,i||this.shown(e,e.el)&&(e.el.dispatchEvent(new Event(`resized`)),e.observer.takeRecords(),e.layoutDirty=n=!0)):i?e.owed=!0:e.layoutDirty=!0}r&&(this.sizing=!0,this.sizedUntil=Math.max(this.sizedUntil,performance.now()+Ko),this.sizedTimer||=window.setTimeout(this.waited,Ko)),n&&!this.renderer.lost?(this.renderer.begin(!1,performance.now()-this.scrollAt>200),this.weigh(),this.frame(performance.now())):this.schedule()}near(e){let t=[];for(let[n,r]of e)n.visible=r,r?(t.push(n),this.held(n)?n.lightDirty||=n.seenLight!==this.lightChanges:n.placed?(n.viewDirty=n.sharpen=!0,n.toward=1):n.layoutDirty=!0):(n.left=++this.departures,n.seenLight=this.lightChanges);this.stage&&this.restAll(this.sizing?t.filter(e=>e.el.closest(`[inert]`)):t),this.schedule()}sighted(e,t){e?.owed&&t&&!this.sizing&&(this.sharpenFor(e),e.owed=!1)}farFrom(e,t){let n=e.__d;t?(this.farOff.delete(e),this.sizing&&n?.staged&&this.bare(n)?this.farOn.add(e):e.removeAttribute(`data-far`)):(this.farOn.delete(e),this.sizing?this.farOff.add(e):e.setAttribute(`data-far`,``))}judge(){if(this.sure(),this.judgedAt[0]===this.moves&&this.judgedAt[1]===this.looks&&this.judgedAt[2]===this.shifts)return;this.judgedAt=[this.moves,this.looks,this.shifts];for(let e of this.devices)!this.judged.has(e)&&e.el.isConnected&&this.camOf(e)&&(this.io.unobserve(e.el),this.view.unobserve(e.el),this.far.unobserve(e.el),this.judged.set(e,{near:e.visible,shown:!1,far:e.el.matches(`[data-far]`)}));if(!this.judged.size)return;this.unbend([...this.judged.keys()].filter(e=>e.staged&&e.bend?.moved));let e=innerWidth,t=innerHeight,n=0,r=0,i=1,a=[-1/0,-1/0,1/0,1/0],o=new Map,s=(o,s,c,l,u,d)=>o+c>=(Math.max(-u,a[0])-n)/i&&o<=(Math.min(e+u,a[2])-n)/i&&s+l>=(Math.max(-d,a[1])-r)/i&&s<=(Math.min(t+d,a[3])-r)/i,c=[],l=!1;for(let[u,d]of this.judged){if(u.cam===void 0&&!this.camOf(u)){this.judged.delete(u),this.io.observe(u.el),this.view.observe(u.el),this.far.observe(u.el);continue}let f=u.kept[0],p=this.lens(u.cam);a=o.get(u.cam)??(o.set(u.cam,mo(u.cam)),o.get(u.cam));let m,h,g,_;if(p&&f.at===this.moves&&f.local)[m,h,g,_]=f.local,[n,r,i]=[p.left,p.top,p.s];else{let e=this.where(u);[m,h,g,_,n,r,i]=[e.left,e.top,e.width,e.height,0,0,1]}let v=s(m,h,g,_,xo,xo),y=s(m,h,g,_,ko,ko),b=!s(m,h,g,_,e*Do,t*Do);v!==d.near&&c.push([u,d.near=v]),y!==d.shown&&(this.sighted(u,d.shown=y),l=!0),b!==d.far&&this.farFrom(u.el,!(d.far=b))}this.see(),c.length?this.near(c):l&&this.schedule()}camOf(e){if(e.cam===void 0){let t=e.el.closest(`[data-camera]`);e.cam=t&&!t.parentElement?.closest(`[data-camera]`)?t:null}return e.cam}panned(e=!1){e?this.looks++:this.moves++,this.scrollAt=performance.now(),this.glowStale=!0,this.sleepers.size&&(this.sleptStale=!0),this.stage&&(this.staleStage=!0,this.schedule()),this.lights&&this.pointer.i&&(this.handShifted=!0,this.schedule()),this.torch&&(this.lightDirty=this.scrolled=!0,this.schedule())}viewed(e){!this.stage&&e.isConnected&&ha(e)&&this.stageIn(e),this.panned(!0);let t=!1;for(let n of this.devices)n.placed&&e.contains(n.el)&&(n.owed=t=!0);t&&(this.sizing=!0,this.sizedUntil=Math.max(this.sizedUntil,performance.now()+qo),this.sizedTimer||=window.setTimeout(this.waited,qo),this.schedule())}waited=()=>{let e=this.sizedUntil-performance.now();e>=1?this.sizedTimer=window.setTimeout(this.waited,e):this.settle()};settle(){clearTimeout(this.sizedTimer),this.sizedTimer=0,this.sizing=!1,this.quietAt=-1;for(let e of this.farOff)e.setAttribute(`data-far`,``);for(let e of this.farOn)e.removeAttribute(`data-far`);if(this.farOff.clear(),this.farOn.clear(),this.stage){let e=this.woken,t=this.handAt;!e||t&&Go(e.r=this.where(e.d),t[0],t[1])||this.unhand(),this.restAll([...this.devices].filter(e=>e.visible)),this.sleptStale=!1}for(let e of this.devices)e.owed&&e.visible&&(this.sharpenFor(e),e.owed=!1);this.schedule()}sharpenFor(e){let t=Z(e.el),n=this.whole(e.cw,e.ch,t),r=Xi(t);r!==e.reachCell&&(e.reachCell=r,e.reachDirty=!0),n>e.dpr*Jo||n<e.dpr/Yo?(e.viewDirty=e.sharpen=!0,e.toward=(n/e.dpr)**2):e.sharpen&&(this.held(e)||!e.staged||e.plate.picture?.pw===e.pw&&e.plate.picture.ph===e.ph)&&(e.viewDirty=e.sharpen=!1),e.viewDirty&&(e.quiet=!1)}standing(e,t){return!e.layoutDirty&&!e.viewDirty&&!e.materialDirty&&!e.lightDirty&&!this.lightDirty&&!e.moving.size&&e.version===t&&!e.movers.some(e=>e.p.def.tick||e.springs.some(e=>e.active))}sharpness(e){let t=(devicePixelRatio||1)*Math.min(e,8),n=(devicePixelRatio||1)>=2?1:this.oversample;return Math.max(Math.min(t*n,this.maxRatio),t)*this.renderer.store.squeeze}condition(e){let{el:t}=e.front??e;e.material=t.getAttribute(`material`)??`plain`,e.scheme=Cc(t);let n=ps[t.getAttribute(`condition`)??`new`]??ps.new;e.age=+(t.getAttribute(`age`)??n.age),e.wear=+(t.getAttribute(`wear`)??Math.max(n.wear,e.age*.6)),e.prints=+(t.getAttribute(`prints`)??n.prints),e.dust=+(t.getAttribute(`dust`)??n.dust),e.scuff=+(t.getAttribute(`scuff`)??n.scuff),e.haze=+(t.getAttribute(`haze`)??n.haze),e.grime=+(t.getAttribute(`grime`)??Math.max(n.grime,e.age)),e.dents=+(t.getAttribute(`dents`)??n.dents),e.fade=+(t.getAttribute(`fade`)??Math.max(n.fade,e.age*.5)),e.radius=Ae(t.getAttribute(`radius`),2.5)*4,e.seed=+(t.getAttribute(`seed`)??e.seed),e.debug=fs(t),e.split=as(t)}layout(e,t=!1){e.eye=us(e.front?.el??e.el),e.bare=e.plain=e.hid=null,e.kept[0].at=e.kept[1].at=-1,e.cam=void 0,this.flat(e,()=>this.measure(e,t&&e.placed&&!e.layoutDirty));let n=e.landing?null:oa(e.el);n&&(e.landing=!0,n.then(()=>{e.landing=!1,e.layoutDirty=!0,this.schedule()})),this.stage&&(this.restage(e),this.sizing||this.rest(e))}stageIn(e){let t=this.renderer.stage();t.dataset.d=`stage`,t.setAttribute(`aria-hidden`,`true`),Object.assign(t.style,{position:`absolute`,left:`0`,top:`0`,width:`0`,height:`0`,pointerEvents:`none`,transformOrigin:`0 0`,willChange:`transform`}),e.prepend(t),this.stage={world:e,canvas:t,order:null};for(let e of this.devices)e.placed&&this.restage(e);this.staleStage=!0}stageOut(){if(this.stage){this.stage=null,this.sleepers.clear(),this.woken=null;for(let e of this.devices)e.el.removeAttribute(`data-asleep`),e.used&=-2,e.reachDirty&&this.stir(e),e.leaving=!1,e.staged&&(e.staged=!1,e.lightDirty=!0,e.lightBox=null);this.renderer.unstage(),this.schedule()}}stageable(e){let t=this.stage?.world,n=e.bend;if(e.bend=null,!t||!t.contains(e.el))return!1;let r=e.el.parentElement?.closest(`d-device, [data-alone]`),i=r&&t.contains(r)?Q(r):null;if(r&&t.contains(r)&&(!i?.staged||!this.plain(i)))return!1;let a=getComputedStyle(e.canvas).visibility!==`visible`&&!e.el.closest(`[data-camera] [data-far]`),o=[e.canvas],s=!1,c=!!(e.front||e.faces.length||i||a);for(let n=e.el;n&&n!==t;n=n.parentElement){let e=getComputedStyle(n);if(e.filter!==`none`||e.opacity!==`1`||e.clipPath!==`none`&&!n.hasAttribute(`data-far`)||e.maskImage!==`none`||e.mixBlendMode!==`normal`||e.overflowX!==`visible`||e.overflowY!==`visible`)return!1;let t=e.transform!==`none`||e.translate!==`none`||e.rotate!==`none`||e.scale!==`none`;s||=t,c||=t||e.perspective!==`none`,o.push(n)}return!c&&getComputedStyle(t).perspective===`none`||(o.push(t),e.bend=n&&n.chain.length===o.length&&n.chain.every((e,t)=>e===o[t])?Object.assign(n,{moved:s,h:void 0}):{chain:o,moved:s,flat:null,zoom:[],at:-1}),!0}bare(e){return e.bare===null?e.el.closest(`[data-camera] [data-far]`)?!1:e.bare=this.paintless(e,!1):e.bare}plain(e){return e.plain===null?e.el.closest(`[data-camera] [data-far]`)?!1:e.plain=this.paintless(e,!0):e.plain}paintless(e,t){let n=r=>{for(let i of r.children){if(i===e.canvas||i===e.drawing||t&&i.matches(`d-device, [data-alone]`)||e.faces.some(e=>e.el===i))continue;let r=getComputedStyle(i);if(r.display!==`none`&&r.opacity!==`0`){if([`canvas`,`img`,`svg`,`video`,`iframe`,`object`,`embed`].includes(i.localName))return!1;if(r.visibility===`visible`){let e=r.backgroundColor!==`rgba(0, 0, 0, 0)`||r.backgroundImage!==`none`||r.boxShadow!==`none`||r.borderStyle!==`none`&&r.borderWidth!==`0px`||r.outlineStyle!==`none`&&r.outlineWidth!==`0px`,t=r.color!==`rgba(0, 0, 0, 0)`&&[...i.childNodes].some(e=>e.nodeType===Node.TEXT_NODE&&e.textContent.trim());if(e||t||[`input`,`select`,`textarea`].includes(i.localName)&&r.appearance!==`none`)return!1}if(!n(i))return!1}}return!0};return n(e.el)}unbend(e){let t=this.stage?.world,n=e.filter(e=>e.bend&&e.bend.at!==this.moves);if(!t||!n.length)return;for(let e of n)for(let n of e.bend.chain)n!==e.canvas&&n!==t&&n.setAttribute(`data-bent`,``);let r=t.getBoundingClientRect(),i=t.offsetWidth?r.width/t.offsetWidth:1;for(let e of n){let n=e.bend;n.flat=n.chain.map(n=>{if(n===t)return[0,0,t.offsetWidth,t.offsetHeight];let a=n===e.canvas?null:n.getBoundingClientRect();return a?[(a.left-r.left)/i,(a.top-r.top)/i,a.width/i,a.height/i]:[0,0,0,0]}),n.zoom=n.chain.map(()=>1);for(let e=n.chain.length-2;e>=0;e--)n.zoom[e]=n.zoom[e+1]*(parseFloat(getComputedStyle(n.chain[e]).zoom)||1);let[a,o]=n.flat[1],s=n.zoom[1];n.flat[0]=[a-e.x*s,o-e.y*s,e.cw*s,e.ch*s],n.at=this.moves}for(let e of n)for(let t of e.bend.chain)t.removeAttribute(`data-bent`)}flatOf(e){let t=e.bend,n=this.stage?.world;if(!e.staged||!t?.moved||!n)return null;this.unbend([e]);let[r,i,a,o]=t.flat[1],s=n.getBoundingClientRect(),c=n.offsetWidth?s.width/n.offsetWidth:1;return new DOMRect(s.left+r*c,s.top+i*c,a*c,o*c)}bent(e){let t=e.bend,n=this.stage.world,r=`${this.moves} ${(e.front??e).spinning} ${fa(n)}`;if(t.h!==void 0&&t.made===r)return t.h;this.unbend([e]);let i=new DOMMatrix,a=!1;return t.chain.forEach((e,r)=>{let o=getComputedStyle(e),[s,c,l,u]=t.flat[r],d=t.zoom[r];if(r){if(o.perspective!==`none`){let[e,t]=o.perspectiveOrigin.split(` `).map(e=>parseFloat(e)),n=new DOMMatrix;n.m34=-1/parseFloat(o.perspective),i=Ds(Os(n,d),s+e*d,c+t*d).multiply(i),a=!0}o.transformStyle!==`preserve-3d`&&(i.m13=i.m23=i.m33=i.m43=0)}let f=e===n?null:Es(o,l/d,u/d);if(!f)return;let[p,m,h]=o.transformOrigin.split(` `).map(e=>parseFloat(e));i=Ds(Os(f,d),s+p*d,c+m*d,(h||0)*d).multiply(i),a=!0}),t.made=r,t.h=a?[i.m11,i.m21,i.m41,i.m12,i.m22,i.m42,i.m14,i.m24,i.m44]:null}rest(e,t=this.restAt(e)){let n=!!t&&(Math.max(t.width,t.height)<Ho||!!e.el.closest(`[inert]`));n?this.sleepers.set(e,t):this.sleepers.delete(e)&&e.reachDirty&&this.stir(e),n!==e.el.hasAttribute(`data-asleep`)&&e.el.toggleAttribute(`data-asleep`,n)}restAll(e){let t=e.map(e=>this.restAt(e));e.forEach((e,n)=>this.rest(e,t[n]))}restAt(e){let t=this.stage?.world;return!t||e.used||!t.contains(e.el)?null:e.placed&&this.bare(e)||this.away(e)&&e.el.closest(`[inert]`)?this.where(e):null}unhand(){let e=this.woken;e&&(this.woken=null,e.d.used&=-2,this.sizing||this.rest(e.d))}restage(e){let t=this.stageable(e);if(t===e.staged)return;e.staged=t;let n=this.stage.order;t?((e.plate.picture||!e.canvas.width)&&this.vacate(e),e.leaving?e.leaving=!1:n?.splice(Js(n,e),0,e)):e.plate.picture&&n?e.leaving=!0:(this.renderer.forget(e.plate),n?.splice(n.indexOf(e),1)),e.lightDirty=!0,e.lightBox=null,this.staleStage=!0;for(let t of e.el.querySelectorAll(`d-device, [data-alone]`)){let n=Q(t);n?.placed&&n!==e&&this.restage(n)}}left(e){if(!e.leaving)return;e.leaving=!1;let t=this.stage?.order,n=t?.indexOf(e)??-1;n>=0&&t.splice(n,1),this.renderer.forget(e.plate),this.staleStage=!0,this.schedule()}vacate(e){e.own=!1,e.canvas.width&&(e.canvas.width=0),e.canvas.height&&(e.canvas.height=0);let t=e.canvas.style;(t.width!==`0px`||t.height!==`0px`)&&Object.assign(t,{width:`0px`,height:`0px`})}showStage(){let e=this.stage,{world:t,canvas:n}=e;if(this.staleStage=!1,!t.isConnected){this.stageOut();return}n.parentElement!==t&&t.prepend(n);let r=(t.parentElement??t).getBoundingClientRect(),i=Math.max(r.left,0),a=Math.max(r.top,0),o=Math.min(r.right,innerWidth),s=Math.min(r.bottom,innerHeight),c=t.getBoundingClientRect(),l=t.offsetWidth?c.width/t.offsetWidth:1;if(o<=i||s<=a||!l){n.style.width=n.style.height=`0`;return}e.order??=[...this.devices].filter(e=>e.staged).sort(qs);let u=[];this.unbend(e.order.filter(e=>e.bend&&e.visible));let d=[l,0,c.left-i,0,l,c.top-a,0,0,1],f=[1/l,0,(i-c.left)/l,0,1/l,(a-c.top)/l,0,0,1];for(let t of e.order){let e=t.plate.picture;if(!e||!t.visible||this.away(t)||t.card?.shows===!1||t.bend&&getComputedStyle(t.canvas).visibility!==`visible`&&!t.el.closest(`[data-camera] [data-far]`))continue;let n=this.where(t);if(!n.width||!t.w)continue;let r=this.veiled(t);if(!r)continue;let c=n.width/t.w,l=t.bend&&this.bent(t),p=l?{h:mi(d,mi(l,f)),gain:(t.card?.gain??1)**2.2,smear:(t.card?.smear??0)*c}:null,[m,h,g,_]=p?[-1/0,-1/0,1/0,1/0]:[0,0,o-i,s-a],[v,y,b,x]=e.box,S=n.left-v*c-i,C=n.top-y*c-a,w=b*c,T=x*c;S>g||C>_||S+w<m||C+T<h||u.push({picture:e,plate:t.plate,x:S,y:C,w,h:T,turned:p,share:r})}this.eye.look(this.metered(i,a,o,s))&&this.exposure===`auto`&&(this.staleStage=!0,this.schedule()),this.renderer.exposure=this.exposure===`auto`?this.eye.exposure:this.exposure,this.renderer.backdrop=gc(t),this.renderer.show(u,o-i,s-a,devicePixelRatio||1,i,a);let p=n.style,m=`${o-i}px`,h=`${s-a}px`,g=`translate(${(i-c.left)/l}px, ${(a-c.top)/l}px) scale(${1/l})`;(p.width!==m||p.height!==h)&&Object.assign(p,{width:m,height:h}),p.transform!==g&&(p.transform=g)}metered(e,t,n,r){let i=zn(this.lighting),a=e=>.2126*e[0]+.7152*e[1]+.0722*e[2],o=this.ambient*a(i.color)*(i.power/Ln.power),s=0;for(let i of xr()){let[o,c]=Sr(i.at),l=(i.reach/2)**2,u=i.height??i.reach/2,d=a(i.color);for(let i=0;i<3;i++)for(let a=0;a<3;a++){let f=e+(i+.5)/3*(n-e)-o,p=t+(a+.5)/3*(r-t)-c;s+=d*l/(l+f*f+p*p+u*u)/9}}let c=0,l=jr();if(l){let i=Math.max(Math.floor(e/l.cell),0),o=Math.min(Math.ceil(n/l.cell),l.w),s=Math.max(Math.floor(t/l.cell),0),u=Math.min(Math.ceil(r/l.cell),l.h),d=0;for(let e=s;e<u;e++)for(let t=i;t<o;t++,d++){let n=(e*l.w+t)*4;c+=a([l.data[n],l.data[n+1],l.data[n+2]])}c=d?c/d/255*l.gain:0}return{room:o,lights:s,glow:c}}turners(e){if(e.turners?.at===this.moves)return e.turners.els;let t=[];for(let n=(e.front??e).el.parentElement;n;n=n.parentElement){let e=getComputedStyle(n);(e.rotate!==`none`||e.transform!==`none`&&!/^matrix\([^,]+, 0, 0,/.test(e.transform))&&t.push(n)}return e.turners={at:this.moves,els:t},t}flat(e,t){let n=(e.front??e).el,{rotate:r,translate:i,scale:a}=n.style,o=!!r||getComputedStyle(n).translate.split(` `).length>=3,s=this.turners(e);if(!o&&!a&&!s.length)return t();for(let e of s)e.setAttribute(`data-flat`,``);n.style.rotate=``,n.style.scale=``,o&&(n.style.translate=`none`);try{return t()}finally{n.style.rotate=r,n.style.scale=a,o&&(n.style.translate=i);for(let e of s)e.removeAttribute(`data-flat`)}}whole(e,t,n){let[r,i]=this.renderer.room;return Math.min(this.sharpness(n),Math.min(r/e,i/t)*(1-1e-9))}held(e){return e.plate.ready}measure(e,t){let n=performance.now(),{el:r}=e,[i,a]=[e.x,e.y];t||!this.strict&&e.placed||this.auditDevice(e);let s=r.getBoundingClientRect(),c=Z(r,s);e.room=[Math.ceil(innerWidth/c),Math.ceil(innerHeight/c)],r.hasAttribute(`fill`)||(e.y=Math.min(e.y,e.room[1]),e.facing!==`left`&&e.facing!==`right`&&(e.x=Math.min(e.x,e.room[0]))),(e.facing===`left`||e.facing===`right`)&&(e.x=e.y+Math.max(e.front.el.getBoundingClientRect().width-s.width,0)/c/2);let l=Math.ceil(s.width/c-.01)+e.x*2,u=Math.ceil(s.height/c-.01)+e.y*2,d=e.window;d&&([e.x,e.y,l,u]=[-d.x,-d.y,d.w,d.h]);let[f,p]=this.renderer.room,m=this.renderer.store.squeeze,h=Math.min(e.dpr*m/(e.squeeze??1),f/l,p/u),g=d?d.dpr:e.sharp?e.sharp:this.sizing&&e.placed?h:this.whole(l,u,c);e.squeeze=m;let _=Math.ceil(l*g/io)*io,v=Math.ceil(u*g/io)*io;l=_/g,u=v/g,e.fine=g/((devicePixelRatio||1)*c);let y=Xi(c);y!==e.reachCell&&(e.reachCell=y,e.reachDirty=!0),(_!==e.pw||v!==e.ph||g!==e.dpr||e.x!==i||e.y!==a)&&(this.renderer.free(e.plate),Object.assign(e,{pw:_,ph:v,cw:l,ch:u,dpr:g}),this.renderer.grow()),e.w=s.width/c,e.h=s.height/c,t||this.condition(e);let b=s.left-e.x*c,x=s.top-e.y*c,S=new Set,C=!1;if(t)for(let t of e.parts.values())t.x+=e.x-i,t.y+=e.y-a;let w=t?null:this.compile(e),T=e.marks,E=`${this.moves},${this.looks},${T},${s.left},${s.top},${s.width},${s.height}`,D=w?.at===E&&e.print!==``,O=(e,t)=>{w?.rects.set(e.el,t),e.x=(t.left-b)/c,e.y=(t.top-x)/c,e.w=t.width/c,e.h=t.height/c};for(let[t,n]of w?.found??[]){this.blamed=t;let r=e.parts.get(t);if(!r||r.def!==n){r&&this.disconnect(e,r),r={el:t,def:n,x:0,y:0,w:0,h:0,focused:!1,label:null,mask:null,data:{},springs:Object.fromEntries(Object.entries(n.springs??{}).map(([e,t])=>[e,new qa({through:e===`press`,contact:e===`press`&&`press`,...t})]))};for(let e of Object.values(r.springs))e.part=r;this.owner.set(r,e),e.parts.set(t,r),C=!0;let i=n.connect?.(r);i&&e.cleanups.set(r,i),n.update?.(r);for(let e of Object.values(r.springs))e.snap(e.target)}else n.update?.(r);O(r,D&&w.rects.get(t)||t.getBoundingClientRect()),S.add(t)}for(let[n,r]of e.parts)t||S.has(n)||(this.disconnect(e,r),e.parts.delete(n),C=!0);if(t||this.remark(this.markup.takeRecords()),D&&e.marks!==T){D=!1;for(let t of S)O(e.parts.get(t),t.getBoundingClientRect())}let k=[_,v,g,e.fine,e.reshaped,...[e.w,e.h,...[...e.parts.values()].flatMap(e=>[e.x,e.y,e.w,e.h])].map(e=>Math.round(e*64))].join();if(!C&&k===e.print&&this.held(e)&&!e.plate.mask&&(D||this.letteredAsInked(e,w,b,x))){if(!t)for(let t of e.parts.values())e.moving.ask(t)}else{let t=e=>{let t=e.el.getAttribute(`d-layer`),n=e.el.getAttribute(`back`);return n===null?t===null?typeof e.def.layer==`function`?e.def.layer(e):e.def.layer??0:+t:-Math.max(+n,.001)},n=new Map(e.compiled?.found.map(([e],t)=>[e,t]));e.list=[...e.parts.values()].sort((e,r)=>t(e)-t(r)||n.get(e.el)-n.get(r.el));for(let n of e.list)n.under=t(n)<0;e.movers=e.list.map(e=>({p:e,springs:Object.values(e.springs)})).filter(e=>e.springs.length||e.p.def.tick),w&&!D&&w.labels.clear(),Mi(e,this.maskCanvas,this.maskCtx,b,x,c,e=>this.blamed=e,t=>this.textOf(e,t),w&&e.compiled===w?w.labels:void 0),e.plate.mask=this.maskCanvas,e.inked=w&&e.compiled===w?{of:w,ox:b,oy:x,z:c}:null,e.materialDirty=e.lightDirty=!0,e.print=k}w&&(w.at=e.compiled===w&&e.marks===T?E:``),e.version=o(),this.blamed=null,e.layoutDirty=e.viewDirty=e.sharpen=!1;let A=!e.placed;e.placed=!0,A&&this.stage&&e.el.closest(`[inert]`)&&this.rest(e),this.stats.layouts++,t||this.stats.measures++,this.stats.layoutMs+=performance.now()-n}compile(e){this.remark(this.markup.takeRecords());let t=o();if(e.compiled?.version===t)return e.compiled;let{el:n}=e,r=[],i=new Set;for(let e of[n,...n.querySelectorAll(p()||`never`)]){let t=c(e);t&&(i.add(e),(e===n||e.closest(`d-device, [data-alone]`)===n)&&r.push([e,t]))}return e.compiled={version:t,found:r,parts:i,texts:new Map,rects:new Map,labels:new Map,at:``}}textOf(e,t){let n=e.compiled;if(!n||!n.parts.has(t.el))return Oi(t);let r=n.texts.get(t.el);return r||n.texts.set(t.el,r=Oi(t,e=>n.parts.has(e))),r}remark(e){if(!e.length)return;let t=new Map,n=new Map,r=a(),i=(e,n)=>t.set(e,Math.max(t.get(e)??0,n));for(let t of e){let e=t.target;if(t.type===`childList`){[...t.addedNodes,...t.removedNodes].every(Rs)||i(e,2);continue}if(t.type===`attributes`&&(Rs(e)||Bs.has(t.attributeName))||zs(e,t.type===`attributes`?t.attributeName:`#text`))continue;let r=n.get(e);r||n.set(e,r=new Map);let a=t.type===`attributes`?t.attributeName:null;r.has(a)||r.set(a,t.oldValue)}for(let[e,t]of n)for(let[n,a]of t){if(n===null){a!==e.data&&i(e,1);continue}let t=e.getAttribute(n);(n===`style`?Vs(a)===Vs(t):a===t)||i(e,!r||r.has(n)||n===`data-alone`?2:0)}for(let[e,n]of t)for(let t=e;t;t=t.parentNode){let r=t.__d;r&&(r.marks++,(n===2||t===e)&&r.reshaped++,n===2?r.compiled=null:n===1&&r.compiled?.texts.clear())}}letteredAsInked(e,t,n,r){let i=e.inked;if(!t||e.compiled!==t||i?.of!==t)return!1;let a=document.createRange();for(let o of e.list)if(o.def.label&&(this.blamed=o.el,!ji(t.labels.get(o.el),[i.ox,i.oy],Ai(o,t=>this.textOf(e,t),this.maskCtx,a)??void 0,[n,r])))return!1;return!0}auditDevice(e){getComputedStyle(e.el).position===`static`&&g(`This is position: static, so its canvas lines up with whatever is positioned around it, not with it. ${h(e.el)}`);for(let t of[e.el,...e.el.querySelectorAll(`*`)])f(t)}shows(e){let t=!1;for(let n of this.devices)if(!n.front&&n.visible&&e.contains(n.el)){if(!(n.showing??n).shown)return!1;t=!0}return t}player=null;async maps(e,t={}){let n=Q(e),r=t.face?n?.faces.find(e=>e.facing===t.face):n;if(!r)throw Error(t.face?`maps: no ${t.face} face`:`maps: not a device`);if(this.making)throw Error(`maps: one at a time`);this.making=r,this.renderer.hold(r.plate,!0);let i=performance.now()+(t.timeout??2e4),a=()=>{if(performance.now()>i)throw Error(`maps: the device never settled`);return new Promise(requestAnimationFrame)};try{for(;!r.cw;)await a()}catch(e){throw this.making=null,this.renderer.hold(r.plate,!1),e}if(t.pxPerMm&&!t.box){let[e,n]=this.renderer.room,i=t.pxPerMm/4;if(r.cw*i>e||r.ch*i>n)throw this.making=null,this.renderer.hold(r.plate,!1),Error(`maps: ${t.pxPerMm} px/mm is ${Math.ceil(r.cw*i)} by ${Math.ceil(r.ch*i)} px, past the ${e} by ${n} one canvas holds: ask for a box`);r.sharp=i,r.layoutDirty=!0,this.schedule()}let o={start:performance.now(),drawn:0,read:0,decode:0,moves:0,total:0},s=async()=>{let e=performance.now();for(let e=0;e<3;)await a(),r.plate.ready?this.renderer.working(r.plate)?e=r.layoutDirty?0:this.finished(r.el)?e+1:0:(r.remake=!0,this.schedule(),e=0):(r.materialDirty=!0,this.schedule(),e=0);let t=performance.now(),n=this.renderer.readMaps(r.plate);if(!n)throw Error(`maps: the device holds none`);let i=performance.now();o.drawn+=t-e,o.read+=i-t;let s=r.el.getBoundingClientRect(),c=Z(r.el,s);try{return _n(n,[r.x,r.y],[s.width/c,s.height/c],{shadow:r.cast,lighting:zn(this.lighting)})}finally{o.decode+=performance.now()-i}};this.renderer.blankScreens=!0,r.materialDirty=!0,this.schedule();try{if(t.box)return await this.boxMaps(r,t.box,t.pxPerMm??4*r.pw/r.cw,s);let e=await s();e.ms=o;let n=e.pxPerMm/4,i=r.el.getBoundingClientRect(),a=Z(r.el,i);for(let t of r.parts.values())for(let o of t.commands??[]){if(o.op!==`screen`)continue;let s=t.el.getBoundingClientRect();e.screens.push({part:gn(t.el,r.el),kind:o.kind,gain:o.gain,lit:o.gain>0&&[`crt`,`led`,`oled`,`tft`].includes(o.kind)||o.emit.some(e=>e>0),colour:[...o.color],ink:[...o.ink],emit:[...o.emit],inset:[...o.inset],box:{x:((s.left-i.left)/a+r.x)*n-e.box.x,y:((s.top-i.top)/a+r.y)*n-e.box.y,w:s.width/a*n,h:s.height/a*n}})}for(let t of r.parts.values())for(let n of t.commands??[])n.op===`glow`&&e.gaps.push(`${gn(t.el,r.el)} glows onto what's round it, which the light pass draws`),n.op===`frost`&&n.blur>0&&e.screens.length&&e.gaps.push(`${gn(t.el,r.el)} is frost, which blurs whatever is drawn under it, a screen too`);if(t.moves===!1)return o.total=performance.now()-o.start,e;let c=performance.now(),l={...o},u=(e,t,n)=>{if(!e.def.carried)return null;let r=t.value;t.value=n;try{return e.def.carried.call(e.def,e)}finally{t.value=r}},d=t=>{let n=r.el.getBoundingClientRect(),i=Z(r.el,n),a=t.el.getBoundingClientRect(),o=e.pxPerMm/4;return[((a.left-n.left)/i+r.x)*o-e.box.x,((a.top-n.top)/i+r.y)*o-e.box.y]},f=(e,t,n)=>{t.value=t.target=n,t.velocity=0,this.redraw(e.el,r)};for(let t of r.parts.values())for(let[n,i]of Object.entries(t.springs)){let a=i.value,o=i.target;this.pinned=i;try{let o=await s(),c=e=>{let n=u(t,i,a);return e&&n?Math.hypot(e.x-n.x,e.y-n.y)+Math.abs(e.rotate-n.rotate)*100:0},l=t.def.ends?.(t)??null,p=l?Math.abs(l[0]-a)>Math.abs(l[1]-a)?l[0]:l[1]:t.def.carried?[1,-1,0].filter(e=>e!==a).reduce((e,n)=>c(u(t,i,n))>c(u(t,i,e))?n:e):a>.5?0:1;f(t,i,p);let m=await s();f(t,i,(a+p)/2);let h=hn(o,m,await s(),a,p);if(!h){let o=u(t,i,a),s=u(t,i,p);o&&s&&(o.x!==s.x||o.y!==s.y||o.rotate!==s.rotate)&&e.gaps.push(`${gn(t.el,r.el)} ${n} moves and looks the same at both ends, as a drum's ribs seen edge-on do, so the maps can't show it between`);continue}let g=u(t,i,a),_=u(t,i,p);if(g&&_&&(g.x!==_.x||g.y!==_.y||g.rotate!==_.rotate)){i.value=i.target=a,i.velocity=0,this.leftOut=t,this.redraw(t.el,r);let n=pn(o,await s().finally(()=>{this.leftOut=null}),h.box);if(n){let r=e.pxPerMm/4,o=.001*Math.sign(p-a),s=u(t,i,a+o),c=_.rotate!==g.rotate,f=d(t),m=c?(s.rotate-g.rotate)/o:Math.hypot(s.x-g.x,s.y-g.y)/Math.abs(o),v=c?(_.rotate-g.rotate)/m:Math.hypot(_.x-g.x,_.y-g.y)/m*Math.sign(p-a);h.rigid={kind:c?`turn`:`slide`,peak:n.peak,alone:n.alone,under:n.under,per:c?m:[(s.x-g.x)*r/o,(s.y-g.y)*r/o],ends:l??[Math.min(a,a+v),Math.max(a,a+v)],...c&&{pin:[f[0]+g.pin[0]*r,f[1]+g.pin[1]*r]}}}}let v=gn(t.el,r.el);e.moves.push({...h,spring:n,part:v,el:t.el}),!h.linear&&!h.rigid&&e.gaps.push(`${v} ${n} isn't linear between its ends, ${h.off.toFixed(2)} mm off half way, and its joint doesn't carry it whole`)}finally{this.pinned=null,i.value=a,i.target=o,i.velocity=0,this.redraw(t.el,r)}}for(let t of r.parts.values())t.def.tick&&!Object.keys(t.springs).length&&!t.commands?.some(e=>e.op===`screen`)&&e.gaps.push(`${gn(t.el,r.el)} moves on its own every frame, not by a spring`);return e.moves.length&&await s(),o.moves=performance.now()-c,Object.assign(o,{drawn:l.drawn,read:l.read,decode:l.decode}),o.total=performance.now()-o.start,e}finally{this.making=null,this.renderer.hold(r.plate,!1),this.renderer.blankScreens=!1,r.materialDirty=!0,r.window&&(r.window=void 0,r.layoutDirty=!0),r.sharp&&(r.sharp=void 0,r.layoutDirty=!0),this.schedule()}}async boxMaps(e,t,n,r){let i=n/4,a=Math.ceil(16*i),o=a/i,[s,c]=this.renderer.room,l=Math.round(t.w*n),u=Math.round(t.h*n),d=l*u,f=Math.max(64,Math.floor(Math.min(s,c)-2*a-32)),p={colour:new Uint8Array(d*4),height:new Float32Array(d),normal:new Uint8Array(d*2),surface:new Uint8Array(d*4),more:null,grain:new Uint8Array(d*2),emission:null,condition:new Uint8Array(d*4)},m=null,h=0;for(let s=0;s<u;s+=f)for(let c=0;c<l;c+=f){let g=Math.min(f,l-c),_=Math.min(f,u-s);e.window={x:t.x*4+c/i-o,y:t.y*4+s/i-o,w:g/i+2*o,h:_/i+2*o,dpr:i},e.layoutDirty=!0,this.schedule();let v=await r();if(h++,Math.abs(v.pxPerMm-n)>.001*n)throw Error(`maps: a window came out at ${v.pxPerMm} px/mm, not ${n}`);m??=v,v.more&&(p.more??=new Uint8Array(d*4)),v.emission&&(p.emission??=new Uint8Array(d*4));for(let e=0;e<_;e++){let t=e+a-v.box.y;if(!(t<0||t>=v.h))for(let n=0;n<g;n++){let r=n+a-v.box.x;if(r<0||r>=v.w)continue;let i=t*v.w+r,o=(s+e)*l+c+n;p.height[o]=v.height[i],p.colour.set(v.colour.subarray(i*4,i*4+4),o*4),p.surface.set(v.surface.subarray(i*4,i*4+4),o*4),p.condition.set(v.condition.subarray(i*4,i*4+4),o*4),p.normal.set(v.normal.subarray(i*2,i*2+2),o*2),p.grain.set(v.grain.subarray(i*2,i*2+2),o*2),v.more&&p.more.set(v.more.subarray(i*4,i*4+4),o*4),v.emission&&p.emission.set(v.emission.subarray(i*4,i*4+4),o*4)}}}let g=e.el.getBoundingClientRect(),_=Z(e.el,g),v=m,y=v.facts.panes.map(e=>({...e,cx:e.cx+v.box.x-a,cy:e.cy+v.box.y-a})),b={...p,w:l,h:u,pxPerMm:n,box:{x:t.x*n,y:t.y*n,w:l,h:u},body:{x:-t.x*n,y:-t.y*n,w:g.width/_*i,h:g.height/_*i},occlusion:{w:0,h:0,x:0,y:0,scale:1,data:new Uint8Array},bytes:d*20+(p.more?d*4:0)+(p.emission?d*4:0),facts:{...v.facts,panes:y,tiles:h},moves:[],screens:[],gaps:[`a box holds no moves and no occlusion: read the whole device for those`]};for(let r of e.parts.values())for(let a of r.commands??[]){if(a.op!==`screen`)continue;let o=r.el.getBoundingClientRect();b.screens.push({part:gn(r.el,e.el),kind:a.kind,gain:a.gain,lit:a.gain>0&&[`crt`,`led`,`oled`,`tft`].includes(a.kind)||a.emit.some(e=>e>0),colour:[...a.color],ink:[...a.ink],emit:[...a.emit],inset:[...a.inset],box:{x:(o.left-g.left)/_*i-t.x*n,y:(o.top-g.top)/_*i-t.y*n,w:o.width/_*i,h:o.height/_*i}})}return b}finished(e){let t=o();for(let n of this.devices)if(n.visible&&!n.quiet&&e.contains(n.el)&&!this.asleep(n)&&!this.drawn(n,t))return!1;return!0}veil(e,t){t>=1?this.veils.delete(e):this.veils.set(e,t),e.toggleAttribute(`data-veiled`,t<1),this.staleStage=!0,this.schedule()}veiled(e){if(this.veils.size){for(let[t,n]of this.veils)if(t.contains(e.el))return n}return 1}async still(e){if(!this.shows(e))return null;let t=[],n=()=>[...this.devices].filter(t=>!t.front&&t.visible&&e.contains(t.el)).sort(qs).map(e=>e.showing??e);for(let e=0;e<vo&&n().some(e=>e.staged&&!e.plate.picture);e++)await new Promise(requestAnimationFrame);let r=n();if(!r.length)return null;let i=this.turners(r[0]).filter(t=>t.contains(e));for(let e of i)e.setAttribute(`data-flat`,``);let a=e.getBoundingClientRect();for(let e of i)e.removeAttribute(`data-flat`);for(let e of r){let n=e.plate.picture;if(e.staged&&n){let r=this.where(e),i=e.w?r.width/e.w:1,[a,o,s,c]=n.box,l=this.renderer.readSoon(e.plate).then(e=>{if(!e)return null;let t=document.createElement(`canvas`);return t.width=e.width,t.height=e.height,t.getContext(`2d`).putImageData(e,0,0),t});t.push({from:l,r:new DOMRect(r.left-a*i,r.top-o*i,s*i,c*i)})}else if(!e.staged&&e.canvas.width){let n=document.createElement(`canvas`);n.width=e.canvas.width,n.height=e.canvas.height,n.getContext(`2d`).drawImage(e.canvas,0,0),t.push({from:Promise.resolve(n),r:this.boxOf(e,1)})}}if(!t.length)return null;let o=await Promise.all(t.map(e=>e.from));if(o.some(e=>!e))return null;let s=Math.min(...t.map(e=>e.r.left)),c=Math.min(...t.map(e=>e.r.top)),l=Math.max(...t.map(e=>e.r.right)),u=Math.max(...t.map(e=>e.r.bottom)),d=devicePixelRatio||1,f=document.createElement(`canvas`);f.width=Math.max(Math.ceil((l-s)*d),1),f.height=Math.max(Math.ceil((u-c)*d),1);let p=f.getContext(`2d`);return t.forEach(({r:e},t)=>p.drawImage(o[t],(e.left-s)*d,(e.top-c)*d,e.width*d,e.height*d)),{image:f,rect:new DOMRect(s,c,l-s,u-c),root:a}}relabel(e){let t=e.inked;return!t||e.compiled!==t.of?(e.print=``,e.layoutDirty=e.materialDirty=!0,this.schedule(),!1):(Mi(e,this.maskCanvas,this.maskCtx,t.ox,t.oy,t.z,e=>this.blamed=e,t=>this.textOf(e,t),t.of.labels),this.blamed=null,e.plate.mask=this.maskCanvas,!0)}repaintWithin(e){for(let t of this.devices)e.contains(t.el)&&(t.layoutDirty=t.materialDirty=!0,t.print=``);this.schedule()}disconnect(e,t){e.cleanups.get(t)?.(),e.cleanups.delete(t)}weigh(){let e=this.renderer.store,t=innerWidth*innerHeight*(devicePixelRatio||1)**2;for(let t of this.devices){let n=t.visible&&!this.away(t),r=t.movers.some(e=>e.p.def.tick),i=n?0:(this.departures-t.left)/(r?16:1);e.judge(t.plate,n?0:2,i,n)}e.tally(),e.squeeze>=1?this.shortSince=null:this.shortSince==null?this.shortSince=performance.now():performance.now()-this.shortSince>hc&&this.liveLess()&&(this.shortSince=null,this.schedule());for(let t of this.devices)t.visible&&Math.abs(Math.log(e.squeeze/(t.squeeze??1)))>Eo&&(t.layoutDirty=!0,this.schedule());e.keep=Math.min(this.keep,t*Co+wo),e.room()}memory(){let e=0;for(let t of this.devices)t.staged||(e+=t.pw*t.ph*4);let{textures:t,pictures:n,fields:r,room:i,stage:a,live:o}=this.renderer.memory();return{textures:t,pictures:n,canvases:e,fields:r,room:i,stage:a,live:o}}paint(e,t,n=!1,r=!1){let i=performance.now();if(!t&&!n&&e.body){let t=e.front??e,n=e=>e.facing===`left`||e.facing===`right`;for(let r of[t,...t.faces])r!==e&&n(r)!==n(e)&&!r.plate.tex&&this.know(r)}this.stir(e),m(e.scheme);let a={};e.wear&&(a.wear=e.wear),e.dents&&(a.dents=e.dents),e.fade&&(a.fade=e.fade);let o=new ke(e.seed,e.age,a),s=e.el.hasAttribute(`bare`)||e.el.localName!==`d-device`,c=e.facing===`left`||e.facing===`right`,l=e.front??e,{el:u}=c?e:l,d=Zs(l.el),f=Qs(l.el),p=c?l.owns[0]*2||l.w*.25:e.w*.25-2*(+(l.el.getAttribute(`roll`)?.trim().split(/\s+/)[2]??0)||0);e.face=c?p/2:d,e.axis=c?p/2:e.facing===`back`?(d-f)/2:(d+f)/2,e.cast=c?0:parseFloat(l.el.getAttribute(`shadow`)??``)||d;let h=e=>+l.faces.some(t=>t.facing===e),_=+!!l.reverse,v=Math.min(e.w*.25,p)/2;e.owns=e.facing===`right`?[v,1,_]:e.facing===`left`?[v,_,1]:e.facing===`back`?[p/2,h(`right`),h(`left`)]:[p/2,h(`left`),h(`right`)];let y=s?0:!c&&!e.facing?parseFloat(u.getAttribute(`height`)??``)||4:e.face,[b=0,x=0,S=0,C=0,T=y]=u.getAttribute(`roll`)?.trim().split(/\s+/).map(Number)??[],E=Math.max(T,y);if(b||x){let t=e.x+e.w/2,n=e.y+e.h/2,r=(b||x)/.25,i=e.w/2-S/.25,a=e.h/2-C/.25;o.roll(b?{from:[t+i-r,n],to:[t+i,n],mirror:[t,n],past:!0,drop:T}:{from:[t,n+a-r],to:[t,n+a],mirror:[t,n],past:!0,drop:T},T*2>=E?E-T:0)}let D=u.getAttribute(`path`),O=u.getAttribute(`viewbox`)?.trim().split(/[\s,]+/).map(Number),k=e.list.find(e=>e.def.outline),j;k&&o.group(hs(k),()=>j=o.resolve(k.def.outline(k)));let ee=D?A(D,e.x,e.y,e.w,e.h,{viewBox:O,spread:12,rule:u.getAttribute(`rule`)===`evenodd`?`evenodd`:void 0}):w(e.x,e.y,e.w,e.h,{radius:e.radius});!j&&e.facing===`back`&&o.group({at:[(e.x+e.w/2)*2,0],mirror:!0},()=>j=o.resolve(ee));let M=j??ee;e.shell=M;let N=[],P=[],F=[],I=[],te=[],L=!1,R=!1,z=0,ne=()=>{if(R=!0,s)return;o.part(-1,E),o.surface(M,{material:e.material,over:{wear:e.wear,...Te(u.getAttribute(`lay`))},zEdge:-E,bevel:Ae(u.getAttribute(`bevel`),0)*4||6*E/4});let t=o.commands[o.commands.length-1];t.body=!0,Se(u,t),e.facing||(t.layer=!0),c&&!D&&(t.section=!0)};for(let r=0;r<e.list.length;r++){let i=e.list[r];if(!R&&!i.under&&ne(),t&&!t.has(i)&&i.commands){for(let e of i.commands)o.commands.push(e);continue}i.focused=!this.byPointer&&(i.el.matches(`:focus-visible`)||!!i.el.querySelector(`:focus-visible`));let a=o.commands.length,c=()=>{let t=i.el.closest(`[back]`)?.getAttribute(`back`);t==null?o.part(r,Ee(i)+E-4,void 0,void 0,wc(i,e)):o.part(r,E-+t+Ee(i)-4,!0,E-+t,wc(i,e)),this.blamed=i.el;try{if(i.w&&i.h||i.def.spreads){let t=()=>i.def.local?o.group(hs(i),()=>i.def.paint(o,i,e)):i.def.paint(o,i,e),n=Di(e,i);if(n){let{at:e,rotate:r}=n;o.group({at:e,rotate:r},()=>o.group({at:[-e[0],-e[1]]},t))}else t()}}catch(e){if(this.strict)throw e;o.commands.length=a,g(ms(i.el,e),`error`)}if(i===this.leftOut&&(o.commands.length=a),(!e.facing||e.facing===`back`)&&!s&&i.el.parentElement===e.el&&Xs(i.el)){let e=o.commands.slice(a).find(e=>e.op===`surface`);e&&(e.body=e.layer=!0)}i.focused&&gs(o,i,e,a)},l=this.layers.get(i);if(l&&!n&&i.commands&&this.reading!==i){let n=[...l.springs.values()].some(e=>e.carry);if(n)c();else{let e=Object.values(i.springs).map(e=>e.value),t=Object.keys(i.springs).map(e=>Ja(e)).filter(e=>e in i.data).map(e=>[e,i.data[e]]);Object.entries(i.springs).forEach(([e,t])=>{t.value=l.at[e]??t.value});for(let[e]of t)delete i.data[e];try{c()}finally{Object.values(i.springs).forEach((t,n)=>{t.value=e[n]});for(let[e,n]of t)i.data[e]=n}}let r=o.commands.slice(a);if(o.commands.length=a,r.length!==l.rest.length||i.w!==l.size[0]||i.h!==l.size[1]||!r.every((e,t)=>Ks(l.rest[t],e,void 0,n?po:void 0)))this.unlayer(e,i);else if(t){let t=this.laid(e,i,l);if(t){for(let e of i.commands)o.commands.push(e);I.push([i,t,l]);continue}}}c(),t&&this.redraws.set(i,(this.redraws.get(i)??0)+1),t&&this.reading!==i&&this.redrew.set(i,performance.now());let u=_s(o.commands,a),d=Gs(o.commands,a),f=o.commands.slice(a),p=i.commands;if(t){if(L||=d!==i.glow,p?.length===f.length)f.forEach((n,r)=>{let a=p[r];if(n.op===`screen`&&Ks(a,n)){if(!t.asked.has(i)){let t=this.screens.get(i);t?.ok&&t.shown&&!t.shown.dead&&t.cmd.source===n.source&&this.reading!==i&&this.player.plays(e.plate)&&Ks(t.cmd,n)?te.push([t,n]):F.push(n)}}else Ks(a,n,fo)?Ks(a,n)||P.push(K(G(a),G(n))):(N.push(K(G(a),G(n))),z=Math.max(z,mt(a),mt(n)))});else{let e=K(i.painted,u);e&&N.push(e);for(let e of[...p??[],...f])z=Math.max(z,mt(e))}}(i.hit!==!1||i.commands?.some(e=>e.op===`glass`&&e.covers))&&!Ys(i.painted,u)&&(e.reachDirty=i.shifted=!0),i.painted=u,i.glow=d,i.commands=f,this.player&&this.made.set(i,Object.fromEntries(Object.entries(i.springs).map(([e,t])=>[e,t.value])))}if(this.blamed=null,R||ne(),e.facing===`back`&&!s){let t=e.front,n=e.x+e.w/2+t.x+t.w/2;t.list.forEach((r,i)=>{let a=r.el.closest(`[back]`)?.getAttribute(`back`);if(a==null||!(r.w&&r.h||r.def.spreads))return;let s=e.face-+a;o.part(e.list.length+i,E-s+Ee(r)-4,!0,E-s,wc(r,e)),this.blamed=r.el;let c=o.commands.length;try{o.group({at:[n,e.y-t.y],mirror:!0},()=>r.def.local?o.group(hs(r),()=>r.def.paint(o,r,e)):r.def.paint(o,r,e)),o.commands.slice(c).some(t=>mt(t)>E-e.face/2)||(o.commands.length=c)}catch(e){if(this.strict)throw e;o.commands.length=c,g(ms(r.el,e),`error`)}}),this.blamed=null}let re=()=>{if(!I.length&&!te.length)return;for(let[t,{laid:n,rests:r}]of I)this.player.move(e.plate,t,n,r);let t=I.reduce((e,[,,t])=>K(e,t.lit),null),n=!1;I.some(([,,e])=>e.hot)&&(n=this.renderer.glowDrawn=!0);for(let[r,i]of te)if(this.player.show(e.plate,r.shown,i.source),r.shown.lit)n=this.renderer.glowDrawn=!0;else{let e=G(i);t=K(t,{x:e.x-32,y:e.y-32,w:e.w+64,h:e.h+64})}n?e.lightBox=null:e.lightDirty?e.lightBox&&=K(e.lightBox,t):e.lightBox=t,e.lightDirty=!0};if(this.drew=t?{box:[...N,...P].reduce((e,t)=>K(e,t),null),plain:!P.length&&!F.length&&!L,pictures:!!F.length,hot:L,lit:null,painted:!1}:null,t&&!N.length&&!P.length&&!F.length)return re();if(r)return this.renderer.known(e.plate,o.commands,E,!(e.plate.known&&e.plate.made&&Ks(e.plate.made,o.commands)));if(n)return this.sketchOf(e,o.commands);if(m(e.scheme)&&(e.themed=!0),t&&e.screened?.size){let t=[...N,...P];for(let n of[...e.screened]){let r=this.screens.get(n);this.reading!==n&&r&&t.some(e=>X(e,G(r.cmd)))&&this.unlayer(e,n)}}if(this.renderer.unlabelled(e.plate)&&!this.relabel(e))return;let B=this.renderer.paint(e.plate,{commands:o.commands,began:i,stands:E,fixed:e.el.hasAttribute(`fill`)||!!e.window,partial:!!t,moved:N,coloured:P,pictures:F,hot:L,stood:z,redrawn:t&&N.length?[...t].flatMap(e=>e.commands??[]):null,remade:!t&&!!e.remake&&!e.materialDirty});t||(e.remake=!1),B&&(`margin`in B?([e.x,e.y]=B.margin,e.layoutDirty=!0):(e.drawn={commands:o.commands,x:e.x,y:e.y,stands:E,fixed:e.el.hasAttribute(`fill`)},e.materialDirty=!1,B.all?e.lightBox=null:e.lightDirty?e.lightBox&&=K(e.lightBox,B.box):e.lightBox=B.box,e.lightDirty=!0,this.drew&&(this.drew.painted=!0,this.drew.lit=B.box),this.player&&!t&&this.seated(e),re()))}seated(e){let t=e.plate.map,n=e.plate.spec.pw/e.plate.spec.cw,r=[n,e.x*n-t.x,e.y*n-t.y,t.w,t.h],i=e.seated;if(e.seated=r,this.player.settle(e.plate),i&&r.some((e,t)=>Math.abs(e-i[t])>1e-6))for(let t of e.list)this.unlayer(e,t);for(let t of[...e.screened??[]]){let n=this.screens.get(t),r=t.commands?.find(e=>e.op===`screen`);r&&Ks(n.cmd,r)&&Ks(n.round,this.round(e,r))||this.unlayer(e,t)}}layers=new WeakMap;screens=new WeakMap;made=new WeakMap;readTimer=0;reading=null;drew=null;unlayer(e,t){let n=this.screens.get(t);n&&(n.shown&&this.player?.unshow(n.shown),this.screens.delete(t),e.screened?.delete(t),e.read=!1);let r=this.layers.get(t);if(r){this.player?.unmove(e.plate,t);for(let e of r.springs.values())e.crop&&this.player?.free(e.crop);this.layers.delete(t),e.read=!1}}laid(e,t,n){if(!this.player?.plays(e.plate))return null;let r=[],i=this.made.get(t),a=!0;for(let[e,o]of Object.entries(t.springs)){let s=n.at[e]??o.value,c=n.springs.get(e),l=i?.[e]??s;if(c?.ok&&c.crop&&!c.crop.dead&&c.crop.B0){if(c.carry){let e=t.def.carried.call(t.def,t);r.push({crop:c.crop,f:0,go:{x:e.x-c.carry.x,y:e.y-c.carry.y,turn:e.rotate-c.carry.rotate,pin:c.carry.pin}})}else r.push({crop:c.crop,f:(o.value-s)/(c.to-s)});Math.abs(l-s)>1e-6&&(a=!1)}else if(Math.abs(o.value-s)>1e-4||Math.abs(l-s)>1e-4)return null}return r.length>1&&r.some(e=>e.go)&&r.filter(e=>e.go?e.go.x||e.go.y||e.go.turn:e.f).length>1?null:{laid:r,rests:a}}read(e){let t=this.player;if(!t)return!1;let n=t.packed(e.plate);if(n!==e.packed){if(e.packed)for(let t of e.list)this.unlayer(e,t);e.packed=n}let r=!e.read&&!e.small&&e.visible&&!this.away(e),i=r?this.nextRead(e):null,a=!!i&&(!!i.next||!!i.screen||i.soon),o=performance.now();this.reader&&this.reader!==e&&o-this.readerAt>500&&(this.reader=null),a?this.reader??=e:this.reader===e&&(this.reader=null);let s=a&&this.reader===e;if(s&&(this.readerAt=o),this.making!==e&&this.renderer.hold(e.plate,s),!r||this.making||!t.plays(e.plate))return!1;let c=!1;for(let{p:n}of e.movers)for(let e of this.layers.get(n)?.springs.values()??[]){if(!e.judging)continue;let n=t.judged(e.judging);n===null?c=!0:(e.judging=null,e.ok=n,n||(e.why=`half way is not half of each end`),!n&&e.crop&&(t.free(e.crop),e.crop=null))}for(let n of e.screened??[]){let e=this.screens.get(n);if(!e?.matching)continue;let r=t.matched(e.matching);r===null?c=!0:(e.matching=null,e.ok=r,r||(e.why=`its picture shown by the player is not what was painted`,e.shown&&t.unshow(e.shown),e.shown=null))}if(!a)return e.read=!i.held&&!c,c;if(!s)return!0;if(!this.shown(e,e.el))return c;if(this.scrolled||this.turnsDue||e.moving.size||e.materialDirty||e.remake||!t.current(e.plate))return this.readTimer||=window.setTimeout(()=>{this.readTimer=0,this.schedule()},150),!0;for(let n=performance.now();;){let r=this.readOne(e,t,c);if(e.read&&this.renderer.hold(e.plate,!1),r!==`next`||performance.now()-n>3)return r!==`done`}}reader=null;readerAt=0;nextRead(e){let t=null,n=!1,r=!1,i=performance.now();for(let{p:a}of e.movers){let o=this.layers.get(a),s=this.made.get(a);if(i-(this.redrew.get(a)??-1e9)<1e3)n=!0;else for(let i of Object.keys(a.springs))o?.springs.has(i)||(a.commands?a.w&&a.h&&(Object.values(a.springs).some(e=>e.active)||s&&Object.entries(a.springs).some(([e,t])=>Math.abs((s[e]??t.value)-t.value)>1e-6)?n=!0:(!t||!t[0].el.matches(`:hover`)&&a.el.matches(`:hover`))&&(t=[a,i])):r||=!e.plate.painted)}return{next:t,screen:t?null:e.list.find(e=>!this.screens.has(e)&&e.commands?.some(e=>e.op===`screen`))??null,held:n,soon:r}}readOne(e,t,n){let{next:r,screen:i,held:a}=this.nextRead(e);if((r||i)&&!this.renderer.working(e.plate))return e.remake=!0,this.schedule(),`wait`;if(!r)return i?(this.readScreen(e,i,t),`next`):(n||=[...e.screened??[]].some(e=>this.screens.get(e)?.matching),n||=e.movers.some(({p:e})=>[...this.layers.get(e)?.springs.values()??[]].some(e=>e.judging)),e.read=!a&&!n,n?`wait`:`done`);let[o,s]=r,c=o.springs[s],l=c.value,u=c.target,d=c.velocity,f=this.layers.get(o)??{at:Object.fromEntries(Object.entries(o.springs).map(([e,t])=>[e,t.value])),rest:o.commands,springs:new Map,lit:null,size:[o.w,o.h]};this.layers.set(o,f);let p=o.def.ends?.(o)??null,m=p?Math.abs(p[0]-l)>Math.abs(p[1]-l)?p[0]:p[1]:l>.5?0:1,h={to:m,crop:null,judging:null,ok:!1};f.springs.set(s,h);let g=e=>{c.value=e;try{return o.def.carried.call(o.def,o)}finally{c.value=l}},_=o.def.carried?g(l):null,v=_&&g(m),y=!!_&&!!v&&(_.x!==v.x||_.y!==v.y||_.rotate!==v.rotate),b=e=>{let t=[o.x+_.pin[0],o.y+_.pin[1]],[n,r]=p??[l,m],i=1/0,a=1/0,s=-1/0,c=-1/0;for(let o=0;o<=16;o++){let l=g(n+(r-n)*o/16),u=!p&&v.rotate!==_.rotate?o/16*2*Math.PI:l.rotate-_.rotate,d=Math.cos(u),f=Math.sin(u);for(let[n,r]of[[e.x,e.y],[e.x+e.w,e.y],[e.x,e.y+e.h],[e.x+e.w,e.y+e.h]]){let e=t[0]+(n-t[0])*d-(r-t[1])*f+l.x-_.x,o=t[1]+(n-t[0])*f+(r-t[1])*d+l.y-_.y;i=Math.min(i,e),a=Math.min(a,o),s=Math.max(s,e),c=Math.max(c,o)}}return{x:i,y:a,w:s-i,h:c-a}},x=e.lightDirty,S=e.lightBox,C=e.plate.peak,w=t=>{c.value=c.target=t,c.velocity=0,e.moving.add(o),this.drew=null,this.paint(e,e.moving),e.moving.clear();let n=this.drew;return n?.painted?n:null};this.reading=o;let T=null,E=null,D=null;try{if(y){this.leftOut=o;let n;try{n=w(l)}finally{this.leftOut=null}if(T=n?.box??null,n?.box&&n.plain){let r=b(n.box);h.crop=t.read(e.plate,K(n.box,r),r,!0),h.carry={..._,pin:[o.x+_.pin[0],o.y+_.pin[1]]},f.lit=K(f.lit,b(n.lit??n.box));let i=w(m);T=K(T,i?.box),h.crop&&i?.box&&(D=t.read(e.plate,K(i.box,r),r,!0))}else h.why=n?n.box?`more than its maps changed`:`no box`:`nothing painted`;return`next`}let n=w(m);if(T=n?.box??null,n&&e.plate.peak>C+.001)h.why=`it stands taller than the device did`;else if(n?.box&&!n.pictures){let r=!n.plain;h.crop=t.read(e.plate,n.box,n.box,!1,r);let i=w((l+m)/2);T=K(T,i?.box),h.crop&&i?.box&&(E=t.readMid(e.plate,T,n.box,r)),f.lit=K(f.lit,n.lit),n.hot&&(f.hot=!0)}else h.why=n?n.box?`a picture changed with it`:`no box`:`nothing painted`}finally{let n=w(l);c.target=u,c.velocity=d,T=K(T,n?.box),T&&t.read(e.plate,T,null),h.crop&&E&&(h.judging=t.ask(e.plate,h.crop,E)),E&&t.freeMid(E),h.crop&&!h.judging&&!y?(t.free(h.crop),h.crop=null,h.why??=E?`no query`:`no crop half way`):h.crop||(h.why??=`no crop`),t.readEnd(e.plate,h.crop,D&&h.carry&&{crop:D,go:{x:v.x-_.x,y:v.y-_.y,turn:v.rotate-_.rotate,pin:h.carry.pin}}),D&&t.free(D),y&&(h.ok=!!h.crop?.mask),this.reading=null,f.rest=o.commands,e.lightDirty=x,e.lightBox=S,t.packed(e.plate)||(f.springs.delete(s),e.lightDirty=!0,e.lightBox=null,this.schedule())}return`next`}round(e,t){let n=G(t);return e.list.flatMap(e=>e.commands??[]).filter(e=>e!==t&&X(G(e),n))}readScreen(e,t,n){let r=t.commands.filter(e=>e.op===`screen`),i=r[0],a={cmd:i,shown:null,matching:null,ok:!1,round:this.round(e,i)};this.screens.set(t,a),(e.screened??=new Set).add(t);let{width:o,height:s}=i.source,c=G(i);if(r.length>1?a.why=`more than one screen`:i.kind===`coat`?a.why=`a coat is its finish too`:i.bend||!(`hw`in i.shape)||i.shape.type===`arc`?a.why=`not flat on the plate`:!(o>0&&s>0)||o*s>4e6?a.why=`no picture of a size`:a.round.some(e=>e.op===`frost`&&e.blur>0)&&(a.why=`under frost, which blurs it`),a.why)return;let l=e.lightDirty,u=e.lightBox,d=this.renderer.glowDrawn,f=r=>{this.renderer.standIn=r===null?null:{source:i.source,level:r},e.moving.add(t),this.drew=null;try{this.paint(e,e.moving)}finally{this.renderer.standIn=null,e.moving.clear()}return this.drew?.painted?n.lifts(e.plate,c):null};this.reading=t;let p=null,m=null,h=null;try{p=f(0),m=p&&f(255)}finally{h=f(null),this.reading=null,n.read(e.plate,c,null),n.readEnd(e.plate,null),e.lightDirty=l,e.lightBox=u,this.renderer.glowDrawn=d}let g=h&&p&&m&&n.screen(e.plate,h,p,m,i,[o,s]);n.unlift(h),n.unlift(p),n.unlift(m),g?(a.shown=g.shown,a.matching=g.matching):a.why=h?!p||!m?`nothing painted`:`no pack`:`no maps to read`}redraws=new WeakMap;redrew=new WeakMap;redrawn(e){let t=Q(e)?.list.find(t=>t.el===e);return(t&&this.redraws.get(t))??0}played(e){let t=Q(e),n={held:0,makers:0,left:0,why:{}};if(!t)return n;for(let{p:e}of t.movers)for(let t of Object.keys(e.springs)){let r=this.layers.get(e)?.springs.get(t);if(r?.ok&&r.crop&&!r.crop.dead)n.held++;else if(r&&!r.judging){n.makers++;let e=r.why??`?`;n.why[e]=(n.why[e]??0)+1}else n.left++}return n}screened(e){let t=Q(e),n={held:0,makers:0,left:0,why:{}};if(!t)return n;for(let e of t.list){if(!e.commands?.some(e=>e.op===`screen`))continue;let t=this.screens.get(e);if(t?.ok&&t.shown&&!t.shown.dead)n.held++;else if(t&&!t.matching){n.makers++;let e=t.why??`?`;n.why[e]=(n.why[e]??0)+1}else n.left++}return n}sketched=new WeakSet;sketch(e){try{(e.layoutDirty||!e.placed)&&this.layout(e),this.paint(e,void 0,!0)}catch(e){if(this.strict)throw e}finally{this.blamed=null}}know(e){try{(e.layoutDirty||!e.placed)&&this.layout(e),this.paint(e,void 0,!0,!0)}catch(e){if(this.strict)throw e}finally{this.blamed=null}}sketchOf(e,t){if(!e.cw||!e.ch||!e.w)return;let n=this.where(e).width/e.w;if(Math.max(e.w,e.h)*n<64)return;let r=e.drawing??=document.createElement(`canvas`);r.dataset.sketch=``,r.setAttribute(`aria-hidden`,`true`),Yi(r,{commands:t,x:e.x,y:e.y,cw:e.cw,ch:e.ch,dpr:devicePixelRatio||1,zoom:n,scheme:e.scheme}),r.isConnected||(e.canvas.after(r),this.reduced.matches||r.animate([{opacity:0},{opacity:1}],{duration:ts,easing:`ease-out`}))}unsketch(e){let t=e.drawing;t&&(t.style.transition=`opacity ${es}ms`,t.style.opacity=`0`,setTimeout(()=>{t.remove(),e.drawing===t&&(e.drawing=null)},es))}place(e){if(e.staged)return this.box(e);let t=e.canvas.style,n=[`${-e.x}px`,`${-e.y}px`,`${e.cw}px`,`${e.ch}px`];return(t.left!==n[0]||t.top!==n[1]||t.width!==n[2]||t.height!==n[3])&&Object.assign(t,{left:n[0],top:n[1],width:n[2],height:n[3]}),this.boxOf(e,1,!0)}box(e){if(!e.staged&&e.canvas.style.width===`${e.cw}px`&&e.canvas.style.height===`${e.ch}px`)return this.boxOf(e,1);let t=this.where(e),n=e.w?t.width/e.w:1;return new DOMRect(t.left-e.x*n,t.top-e.y*n,e.cw*n,e.ch*n)}stir(e){let t=e.front??e;e.quiet=t.quiet=!1;for(let e of t.faces)e.quiet=!1}restful(e,t){return this.drawn(e,t)&&!(e.reachDirty&&!this.sleepers.has(e))&&!e.moving.size&&!e.ticked&&!e.unread&&!e.movers.some(e=>e.springs.some(e=>e.active))}drawn(e,t){return e.placed&&e.version===t&&this.held(e)&&!e.layoutDirty&&!e.viewDirty&&!e.materialDirty&&!e.lightDirty&&!e.sharpen&&!e.plate.wanted&&!e.plate.stood&&!this.rough(e)&&!this.renderer.edgesStale(e.plate)}where(e){return this.boxOf(e,0)}boxOf(e,t,n=!1){this.sure();let r=e.kept[t];if(!n&&r.at===this.moves&&r.look===this.looks)return r.r;let i=this.camOf(e)&&this.lens(e.cam);if(!n&&i&&r.at===this.moves&&r.local){let[e,t,n,a]=r.local;r.r=new DOMRect(i.left+e*i.s,i.top+t*i.s,n*i.s,a*i.s)}else{let n=r.r=!t&&this.flatOf(e)||(t?e.canvas:e.el).getBoundingClientRect();r.local=i?[(n.left-i.left)/i.s,(n.top-i.top)/i.s,n.width/i.s,n.height/i.s]:null,r.at=this.moves}return r.look=this.looks,r.r}lens(e){this.sure();let t=this.lenses.get(e);if(t?.at===this.moves&&t.look===this.looks)return t.s?t:null;let n=e.getBoundingClientRect(),r=ma(e);return this.lenses.set(e,t={left:n.left,top:n.top,s:r&&r>0?r:0,at:this.moves,look:this.looks}),t.s?t:null}changed(e){if(this.stage)for(let t of e){if(t.attributeName!==`inert`)continue;let e=t.target;e.inert&&this.woken&&e.contains(this.woken.d.el)&&this.unhand(),this.restAll([...this.devices].filter(t=>e.contains(t.el)))}for(let t of e){let e=t.target,n=e.nodeType===1?e:e.parentElement;if(!n||!n.isConnected||n===this.stage?.canvas||t.attributeName===`data-bent`||t.attributeName===`data-flat`)continue;let r=n.closest(`d-device, [data-alone]`);r&&(r!==n||t.attributeName&&js.has(t.attributeName))||t.attributeName!==`inert`&&(t.attributeName===`style`&&ua(n)||(t.attributeName!==`style`||ma(n)===void 0||this.lensStyle.get(n)!==(this.lensStyle.set(n,ks(n)),ks(n)))&&this.changes.push({el:n,m:t,own:r}))}this.changes.length&&this.judged.size&&this.schedule()}sortChanges(){let e=this.changes;this.changes=[];let t=null;for(let{el:n,m:r,own:i}of e){if(!n.isConnected)continue;if(r.type===`attributes`&&go(n,!0)===n){this.unsure.set(n,!0),this.judged.size&&this.schedule();continue}let e=go(r.type===`attributes`?n.parentElement:n);if(e)(t??=new Set).add(e);else if(i||!this.aside(n,r)){if(r.type===`attributes`&&!n.closest(`[data-camera]`)&&(this.wantsSeen=!0,this.seen?.at===this.moves))this.doubt=this.moves,this.judged.size&&this.schedule();else{this.moves++,this.judged.size&&this.schedule();return}}}t&&this.shifted(t)}aside(e,t){if(t.type===`attributes`&&t.attributeName!==`style`||e.querySelector(`d-device, [data-alone]`))return!1;let n=_o.get(e),r=getComputedStyle(e).position===`fixed`;return _o.set(e,r),!!n&&r}stayed(){let e=this.seen,t=e?.at===this.moves?this.lens(e.world):null;if(!e||!t||e.boxes.size!==this.devices.size)return!1;let n=e.world.getBoundingClientRect();if(Math.abs(n.left-t.left)>yo||Math.abs(n.top-t.top)>yo)return!1;for(let[n,{box:r}]of e.boxes){if(!n.el.isConnected)return!1;let e=n.el.getBoundingClientRect();if(Math.abs((e.left-t.left)/t.s-r[0])>yo||Math.abs((e.top-t.top)/t.s-r[1])>yo||Math.abs(e.width/t.s-r[2])>yo||Math.abs(e.height/t.s-r[3])>yo)return!1}for(let[t,{pose:n}]of e.boxes)if(bo(t.el,e.world)!==n)return!1;return!0}see(){if(!this.wantsSeen||this.seen?.at===this.moves)return;this.seen=null;let e=new Map,t=null;for(let e of this.devices)if(t??=this.camOf(e),!e.el.isConnected||!t||this.camOf(e)!==t)return;let n=t&&this.lens(t);if(n){for(let r of this.devices){let i=r.el.getBoundingClientRect();e.set(r,{box:[(i.left-n.left)/n.s,(i.top-n.top)/n.s,i.width/n.s,i.height/n.s],pose:bo(r.el,t)})}this.seen={at:this.moves,world:t,boxes:e}}}sure(){if(this.changes.length&&this.sortChanges(),this.doubt>=0){let e=this.doubt;this.doubt=-1,e===this.moves&&!this.stayed()&&(this.moves++,this.judged.size&&this.schedule())}for(let e of this.arrived){let t=e.isConnected?go(e,!0):null;t&&!this.holderBox.has(t)&&!this.unsure.has(t)&&this.unsure.set(t,!1)}if(this.arrived.clear(),!this.unsure.size)return;let e=new Set,t=!1;for(let[n,r]of this.unsure){let i=`${n.offsetLeft},${n.offsetTop},${n.offsetWidth},${n.offsetHeight}`,a=this.holderBox.get(n);this.holderBox.set(n,i),r&&((a===void 0||a!==i)&&(t=!0),e.add(n))}this.unsure.clear(),t?(this.moves++,this.judged.size&&this.schedule()):e.size&&this.shifted(e)}shifted(e){for(let t of e)for(let e of t.querySelectorAll(`d-device, [data-alone]`)){let t=e.__d;t&&(t.kept[0].at=t.kept[1].at=-1)}this.shifts++,this.judged.size&&this.schedule()}animating(){for(let e of document.getAnimations()){let t=e.effect?.target;if(!t||e.playState!==`running`)continue;let n=this.carries.get(t);if(n===void 0&&this.carries.set(t,n=t.matches(`d-device, [data-alone]`)||!!t.querySelector(`d-device, [data-alone]`)),n)return!0}return!1}shown(e,t){let n=t===e.el?this.where(e):t?t.getBoundingClientRect():this.box(e);return n.bottom>-40&&n.top<innerHeight+ko&&n.right>-40&&n.left<innerWidth+ko}lightPoints(){let e=this.pointer,t=Bn[this.handheld];if(wr(this.torch&&e.i>0?{kind:`beam`,at:[e.x,e.y],color:t.color.map(n=>n*10*t.core*t.power*e.i*this.torch*(jo/Math.PI))}:null),this.points=null,!this.pointsMoved&&!this.glowMoved.length||this.sizing)return!1;this.pointsAll=this.pointsMoved;let n=this.pointsMoved?[...xr()].map(e=>({at:Sr(e.at),far:Cr(e,Ao),from:null,flat:null})).concat(this.renderer.emitters.map(Mo)):this.glowMoved.map(Mo);return this.points=new Ro(n.filter(e=>e.far>0)),this.pointsMoved=!1,this.glowMoved=[],!0}glowOut(){if(this.sizing)return!1;let e=kr();if(!e&&!this.glowStale&&!this.renderer.glowPending)return!1;if(!e&&!this.renderer.glowPending&&performance.now()-this.glowAt<Vo)return!0;let t=[],n=0;for(let e of this.devices)e.visible&&!this.asleep(e)&&(n++,e.plate.tex?.E&&t.push(e));if(!t.length||!e&&n<2)return Ar(null),this.renderer.emitters.length?(this.renderer.emitters=[],this.shift([])):!1;let r=this.renderer.glowing(()=>t.map(e=>{let t=this.box(e);return{d:e,r:t,plate:e.plate,x:t.left/zo,y:t.top/zo,w:t.width/zo,h:t.height/zo}}),Math.ceil(innerWidth/zo),Math.ceil(innerHeight/zo),e||this.glowStale);return(r||this.renderer.glowPending)&&(this.glowStale=!1,this.glowAt=performance.now()),r&&(Ar({...r,cell:zo,gain:Bo}),this.emit(r))?!0:this.renderer.glowPending||this.glowStale}emit(e){let t=[],n=zo;for(let{d:r,r:i}of e.shots){let a=r.plate;if(!r.visible||!a.tex?.E||this.asleep(r))continue;let o=Math.max(0,Math.floor(i.left/n)),s=Math.min(e.w,Math.ceil(i.right/n)),c=Math.max(0,Math.floor(i.top/n)),l=Math.min(e.h,Math.ceil(i.bottom/n)),u=[i.left,i.top,i.right,i.bottom,e.w,e.h],d=r.gave;if(d&&d.plate===a&&d.at.every((e,t)=>e===u[t])){let n=!0;for(let t=c,r=0;n&&t<l;t++)for(let i=(t*e.w+o)*4,a=(t*e.w+s)*4;i<a;i++,r++)if(e.data[i]!==d.cells[r]){n=!1;break}if(n){t.push(...d.out);continue}}let f=[],p=new Uint8Array(Math.max(0,s-o)*Math.max(0,l-c)*4);for(let t=c;t<l;t++){p.set(e.data.subarray((t*e.w+o)*4,(t*e.w+s)*4),(t-c)*(s-o)*4);for(let n=o;n<s;n++){let r=(t*e.w+n)*4;e.data[r]+e.data[r+1]+e.data[r+2]>2&&f.push(r)}}let m=[];r.gave={plate:a,at:u,cells:p,out:m};let h=t=>t/4%e.w,g=t=>Math.floor(t/4/e.w),_=(t,r,o,s,c,l)=>{if(!t.length)return;if(l){let e=s-r>=c-o,n=e?(r+s)/2:(o+c)/2,i=e?h:g,a=t.filter(e=>i(e)+.5<n),u=t.filter(e=>i(e)+.5>=n);return e?(_(a,r,o,n,c,l-1),_(u,n,o,s,c,l-1)):(_(a,r,o,s,n,l-1),_(u,r,n,s,c,l-1))}let u=0,d=0,f=0,p=0,v=0,y=0,b=[0,0,0];for(let n of t){let t=(e.data[n]+e.data[n+1]+e.data[n+2])/3,r=h(n)+.5,i=g(n)+.5;for(let t=0;t<3;t++)b[t]+=e.data[n+t];u+=t,d+=t*r,f+=t*i,p+=t*r*r,v+=t*i*i,y+=t*r*i}if(!u)return;let x=d/u,S=f/u,C=p/u-x*x+1/12,w=v/u-S*S+1/12,T=y/u-x*S,E=4*Math.PI*Math.sqrt(Math.max(C*w-T*T,1/144)),D=Bo/255/E;m.push({from:a,at:[x*n,S*n],on:[x*n-i.left,S*n-i.top],half:Math.sqrt(E*256/Math.PI),per:i.width/a.spec.cw||1,color:b.map(e=>e*D)})};_(f,i.left/n,i.top/n,i.right/n,i.bottom/n,2),t.push(...m)}return this.renderer.emitters=t,this.shift(t)}shift(e){let t=zo,n=new Map,r=[];for(let t of e)n.get(t.from)?.push(t)??n.set(t.from,[t]);for(let e of this.devices){let i=e.plate;if(!e.visible||!i.tex||this.asleep(e))continue;let a=n.get(i)??[],o=e.shone;(a.length||o.length)&&(Fo(Po(a),Po(o),Math.min(i.spec.cw,i.spec.ch),a[0]?.per??this.box(e).width/i.spec.cw,t)||(e.shone=a,r.push(...o,...a)))}return r.length?(this.glowMoved.push(...r),!0):!1}pointsOn(e){let t=null;if(this.points.all.length){let n=this.box(e),r=n.width/e.cw||1;this.points.near(n.left,n.top,n.left+e.cw*r,n.top+e.ch*r,({at:[i,a],far:o,from:s,flat:c})=>{if(s===e.plate)return;let l=c?Io(c,e.plate.peak*4*r):o,u=Math.max((i-l-n.left)/r,0),d=Math.max((a-l-n.top)/r,0),f=Math.min((i+l-n.left)/r,e.cw),p=Math.min((a+l-n.top)/r,e.ch);f>u&&p>d&&(t=K(t,{x:u,y:d,w:f-u,h:p-d}))})}let n=this.pointsAll?K(e.pointBox,t):t;this.pointsAll&&(e.pointBox=t),n&&(e.lightDirty?e.lightBox&&=K(e.lightBox,n):e.lightBox=n,e.lightDirty=!0)}rough(e){return e.plate.rough}touched(e){return e.lightDirty||this.rough(e)&&!this.sweeping&&!this.sizing||this.fullLight||this.lights||this.look||!this.torch||!e.plate.pool?!0:this.renderer.poolMoved(e.plate,this.scene(),this.box(e))}abandon(e,t,n){let r=this.renderer.recover(),i=e.list.find(e=>r&&e.commands?.includes(r))?.el??this.blamed??e.el;return e.failed=n,this.blamed=null,ms(i,t)}focused(){if(this.live===`full`||this.live===`fixed`)return null;if(this.focusAt===0)return this.focusIs;let e=this.pressed?.visible&&!this.away(this.pressed)?this.pressed:null;if(!e){let t=1/0,n=1/0,r=innerWidth/2,i=innerHeight/2;for(let a of this.devices){if(!a.visible||a.front||this.away(a))continue;let o=this.where(a),s=Math.max(o.left-r,0,r-o.right),c=Math.max(o.top-i,0,i-o.bottom),l=s*s+c*c,u=o.width*o.height;(l<t||l===t&&u<n)&&(t=l,n=u,e=a)}}return this.focusAt=0,this.focusIs=e}isLive(e){if(this.live===`full`)return!0;let t=this.focused();return!!t&&(e.front??e)===t}liveLess(){let e=mc.indexOf(this.live),t=performance.now();return e>=mc.length-1?!1:(t-this.livedAt<hc||(this.live=mc[e+1],this.livedAt=t,this.focusAt=-1),!0)}under(){let{tx:e,ty:t}=this.pointer,n=null,r=1/0;for(let i of this.devices){if(!i.visible||this.away(i))continue;let a=this.where(i),o=a.width*a.height;o>=r||e<a.left-co||e>a.right+co||t<a.top-co||t>a.bottom+co||getComputedStyle(i.el).pointerEvents!==`none`&&(n=i,r=o)}return n}follow(e,t,n){let r=this.pointer,i=this.carried?null:this.under(),a=!1,o=!1;for(let s of this.devices){if(!s.visible){s.hand=0;continue}let c=!!this.lampFor&&!!this.lampFor(s.el.getBoundingClientRect(),r.x,r.y),l=((this.carried||s===i||c)&&this.isLive(s)?r.ti:0)-s.hand;if(l&&(s.hand=Math.abs(l)>.004?s.hand+l*(1-Math.exp(-e*5)):s.hand+l,a=!0),l||s.hand&&t||s.lampOwed){let e=this.lampHzOf?.(s.el)??this.lampHz;e&&n-(s.lampAt??-1/0)<1e3/e-4?s.lampOwed=o=!0:(s.lightDirty=!0,s.lightBox=null,s.lampAt=n,s.lampOwed=!1)}s.plate.lampOwed=!!s.lampOwed}return this.lampOwed=o,a||o}turned(e){let t=!1;for(let n of this.devices){let r=n.spun-n.spinning;if(n.faces.length&&(r||n.whipped||n.hush)){let i=n.spinning;this.reduced.matches||!n.visible||!(n.showing??n).shown||Math.abs(r)<.002?n.spinning=n.spun:(n.spinning+=r*(1-Math.exp(-e*(this.cards?lc:11))),t=!0);let a=e=>{let t=Math.atan2(Math.sin(e),Math.cos(e));return Math.abs(t)<1e-6?0:t},o=this.turnable(n),s=e=>$s[e.facing??`front`],c=e=>o.reduce((t,n)=>Math.abs(a(e-s(n)))<Math.abs(a(e-s(t)))?n:t),l=ac*Math.PI/o.length,u=c(n.spinning),d=c(n.spun),f=a(n.spinning-s(u));n.held=d===u?0:n.held+e;let p=e=>this.pictured(e)||n.held>fc;if(this.cards){n.whipped=d!==u||n.whipped&&Math.abs(f)>=l;let r=this.reduced.matches||!n.visible||!(n.showing??n).shown,i=+n.whipped;n.hush=r?i:i?p(u)?Math.min(n.hush+e/uc,1):n.hush:Math.max(n.hush-e/dc,0),n.hush!==i&&(t=!0),d!==u&&(n.hush<1||!p(d))&&Math.abs(f)>l&&(n.spinning+=Math.sign(f)*l-f)}else{let e=c(i),t=Math.sign(n.spun-i),r=c(s(e)+t*(2*Math.PI/o.length)),u=a(n.spinning-s(e))*t;d!==e&&r!==e&&!p(r)&&u>l&&(n.spinning=s(e)+a(i-s(e))+t*(l-a(i-s(e))*t))}n.showing=c(n.spinning),n.over=n.showing!==n,n.el.toggleAttribute(`data-over`,n.over),n.showing.facing?n.el.setAttribute(`data-up`,n.showing.facing):n.el.removeAttribute(`data-up`),n.turning=n.spinning!==n.spun||a(n.spinning-s(n.showing))!==0,n.el.toggleAttribute(`data-turning`,n.turning);let m=(e,t)=>{let n=a(e),r=Math.PI/2-1e-9;return t?Math.sign(n)*Math.min(Math.abs(n),r):Math.sign(n)*Math.max(Math.abs(n),Math.PI-r)};if(this.cards)this.dealt(n,o);else{let e=Math.cos(n.spinning)>=0,t=Math.cos(n.spinning-$s.right)>=0;for(let r of o)r.spin=m(n.spinning-s(r),r.facing===`back`?!e:r.facing===`right`?t:r.facing===`left`?!t:e);for(let e of o)e.lightDirty=!0,e.lightBox=null}}let[i,a]=n.aim,o=i-n.turn[0],s=a-n.turn[1];if(!o&&!s)continue;if(!n.visible){n.aim=[0,0],n.turn=[0,0];continue}let c=Math.hypot(o,s)>.002?1-Math.exp(-e*(i||a?18:5)):1;n.turn=[n.turn[0]+o*c,n.turn[1]+s*c],n.lightDirty=!0,n.lightBox=null,t=!0}return t}dealt(e,t){let n=[e,...e.faces];for(let e of n)e.spin&&(e.spin=0,e.lightDirty=!0,e.lightBox=null);let r=e=>Math.atan2(Math.sin(e),Math.cos(e)),i=e=>$s[e.facing??`front`],a=e.spinning,o=a+r(i(e.showing??e)-a),s=Math.sign(a-o)||1,c=Math.PI*2;for(let e of t)for(let t of[-1,0,1]){let n=(o+r(i(e)-o)+t*Math.PI*2-o)*s;n>.001&&(c=Math.min(c,n))}let l=Math.min(Math.abs(a-o)/(c/2),1),u=e.owns[0]/.25||e.el.offsetWidth/2,d=e.axis*2/.25||e.face/.25,f=Math.max(e.el.offsetWidth,e.el.offsetHeight)*tc,p=Math.min(l/ac,1),m=Math.max((l-ac)/.64,0),h=oc*Math.atan(u/f),g=m>0?n.reduce((e,t)=>Math.abs(r(a-i(t)))<Math.abs(r(a-i(e)))?t:e):e.showing??e,_=!t.includes(g),v=r(a-i(g)),y=Math.PI/n.length,b=_?a-v+v/y*Math.min(nc,y):o+s*(h*p+(Math.min(nc,c/2)-h)*m),x=d/2*Math.cos(b)**2+u*Math.sin(b)**2;e.el.style.perspective=`${f}px`;let S=(e,t)=>Math.min(Math.max(((_?1:l)-e)/(t-e),0),1)**2,C=S(.35,1)*e.el.offsetWidth*sc,w=1+cc*S(.6,1),T=this.whips.get(e);if(!T&&e.turning){let t=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`),n=document.createElementNS(t.namespaceURI,`filter`),r=document.createElementNS(`http://www.w3.org/2000/svg`,`feGaussianBlur`);n.id=`d-whip-${++this.whipped}`,n.setAttribute(`x`,`-20%`),n.setAttribute(`width`,`140%`),n.append(r),t.append(n),t.setAttribute(`aria-hidden`,`true`),Object.assign(t.style,{position:`absolute`,width:`0`,height:`0`}),document.body.append(t),this.whips.set(e,T=r)}T?.setAttribute(`stdDeviation`,`${C.toFixed(1)} 0`),this.ground(e,x+u+d),n.some(e=>e.staged)&&(this.staleStage=!0);for(let t of n){Object.assign(t.el.style,{transformStyle:`preserve-3d`,isolation:`auto`});let n=i(t)-b,r=Math.cos(n),a=t.canvas.style,o=t.facing===`left`||t.facing===`right`,s=o?u:d/2,c=t.el.offsetWidth,l=t.el.offsetHeight,f=t.x+c/2,p=o?c/2:u,h=[t.y,t.canvas.offsetWidth-f-p,t.canvas.offsetHeight-t.y-l,f-p].map(e=>`${Math.max(e,0).toFixed(1)}px`).join(` `),_=o?``:`inset(${h} round ${e.radius.toFixed(1)}px)`;if(!e.turning){Object.assign(a,{transform:``,filter:``,clipPath:e.hush?_:``,opacity:t===e.showing?``:`0`}),t.card=null;continue}let v=r-.5*Math.sin(n),y=Math.min(Math.max(.5+.5*v,.45),1.12)*w,S=r>.01&&(t===g||m>0);t.card={gain:y,smear:C>.2?C:0,shows:S},Object.assign(a,{transform:`translateZ(${-x}px) rotateY(${n}rad) translateZ(${s}px)`,transformOrigin:`${f}px ${t.y+l/2}px`,backfaceVisibility:`hidden`,filter:`${C>.2&&T?`url(#${T.parentElement.id}) `:``}brightness(${y.toFixed(3)})`,clipPath:_,opacity:S?``:`0`})}}ground(e,t){let n=this.grounds.get(e),r=e.showing??e,i=r.facing===`left`||r.facing===`right`,a=r.canvas;if(!(e.turning||e.hush)||i||!a.width||!r.own){n&&(n.canvas.style.display=`none`,n.of=null);return}if(!n){let t=document.createElement(`canvas`);t.dataset.d=``,t.setAttribute(`aria-hidden`,`true`),Object.assign(t.style,{position:`absolute`,pointerEvents:`none`}),no.add(t),e.el.prepend(t),this.grounds.set(e,n={canvas:t,of:null})}let o=n.canvas,s=(r===e?0:r.el.offsetLeft)-r.x,c=(r===e?0:r.el.offsetTop)-r.y;if(n.of!==r){n.of=r,o.width=a.width,o.height=a.height;let t=o.getContext(`2d`,Ue),i=a.width/(a.offsetWidth||1),l=e.owns[0]/.25||r.el.offsetWidth/2,u=r.x+r.el.offsetWidth/2;t.drawImage(a,0,0);let d=Math.floor((u-l)*i),f=Math.ceil((u+l)*i),p=Math.floor(r.y*i),m=Math.ceil(r.el.offsetHeight*i),h=Math.round(u*i);t.clearRect(d,p,f-d,m),d>0&&t.drawImage(a,d-1,p,1,m,d,p,h-d,m),f<o.width&&t.drawImage(a,f,p,1,m,h,p,f-h,m),Object.assign(o.style,{left:`${s}px`,top:`${c}px`,width:`${a.offsetWidth}px`,height:`${a.offsetHeight}px`})}let l=Math.max(e.el.offsetWidth,e.el.offsetHeight)*tc,u=e.el.offsetWidth,d=e.el.offsetHeight,f=Math.min(u/(a.offsetWidth||u),d/(a.offsetHeight||d)),p=1-e.hush*(1-f);Object.assign(o.style,{display:``,transformOrigin:`${u/2-s}px ${d/2-c}px`,transform:`translateZ(${-t}px) scale(${(l+t)/l*p})`,opacity:`${(1-e.hush).toFixed(3)}`})}pictured(e){return e.staged?e.shown:e.own}turnable(e){let t=[e,...e.faces],n=e=>e.facing===`left`||e.facing===`right`;return this.cards&&!this.sides&&!n(e.showing??e)?t.filter(e=>!n(e)):t}away(e){let t=e.front??e,n=t.showing??t,r=e=>e.facing===`left`||e.facing===`right`;return!t.turning&&n!==e&&!(r(n)&&!r(e))||this.hidden(e)}hidden(e){return e.hid??=!e.front&&getComputedStyle(e.canvas).visibility!==`visible`&&!e.el.closest(`[data-camera] [data-far]`)}reseen(e){for(let t of[e,...e.querySelectorAll(`d-device`)]){let e=Q(t);if(!e||e.hid===null)continue;let n=e.hid;e.hid=null,n&&!this.hidden(e)&&(this.stir(e),this.schedule())}}asleep(e){return this.away(e)&&!(e.front??e).handy&&e!==this.making}scene(){return{carried:this.carried,all:this.lightDirty,full:this.fullLight,sweeping:this.sweeping,sizing:this.sizing,tilt:this.tilt,look:this.look,lights:this.lights,ambient:this.ambient,torch:this.torch,handheld:this.handheld,lighting:this.lighting,pointer:this.pointer,lampFor:this.lampFor,width:innerWidth,height:innerHeight,ratio:devicePixelRatio}}tick=(e,t=!1)=>{this.raf=0,this.renderer.lost||(!t&&this.renderer.held()?(this.stats.held++,this.renderer.late()&&(this.behind=!0),this.schedule()):(this.renderer.begin(t,e-this.scrollAt>200),this.weigh(),this.frame(e)))};frame(e){let t=Math.max(0,Math.min(this.last?(e-this.last)/1e3:1/60,1/30));this.last=e,this.focusAt=-1,this.judge();let n=this.scrolled,r=this.pointer,i=r.tx-r.x,a=r.ty-r.y,s=r.ti-r.i,c=Math.abs(i)+Math.abs(a)>.3||Math.abs(s)>.004;if(c){let e=1-Math.exp(-t*7);r.x+=i*e,r.y+=a*e,r.i+=s*(1-Math.exp(-t*5)),(this.torch||this.look)&&(this.lightDirty=!0),n=this.sweeping=!0}else this.sweeping=this.scrolled;this.lights&&(c||this.lampOwed||this.handsDue||this.handShifted)&&(this.handsDue=this.follow(t,c||this.handShifted,e),this.handShifted=!1,this.handsDue&&(n=!0)),this.turnsDue&&(this.turnsDue=this.turned(t),this.turnsDue&&(n=this.sweeping=!0)),this.scrolled=!1,this.torch&&Bn[this.handheld].flicker&&!this.reduced.matches&&(e-this.flickered>=uo&&(this.flickered=e,this.lightDirty=!0),n=this.sweeping=!0),this.lightPoints()&&(n=!0,this.pointsAll&&(this.sweeping=!0));let l=this.page?.takeRecords();l?.length&&this.changed(l),(this.animating()||scrollX!==this.scrolledTo[0]||scrollY!==this.scrolledTo[1])&&this.moves++,this.scrolledTo=[scrollX,scrollY];let u=!1,d=null,f=o(),p=performance.now(),m=[],h=!1,_=0,v=!1,y=e-this.beatAt>=rs;this.sweeping&&(this.room=this.behind?Math.max(this.room*.8,ao):Math.min(this.room+.1,oo)),this.behind=!1;let b=this.lightDirty||this.fullLight||f!==this.quietAt||this.points||this.sweeping||this.turnsDue?[...this.devices]:[...this.devices].filter(e=>!e.quiet);this.quietAt=f;let x=new Map;for(let e of b){if(!e.sharpen||!e.visible)continue;let t=this.where(e),n=Math.hypot(t.left+t.width/2-innerWidth/2,t.top+t.height/2-innerHeight/2);x.set(e,n/Math.max(Math.sqrt(t.width*t.height),1))}let S=b.sort((e,t)=>+this.held(e)-this.held(t)||+e.sharpen-t.sharpen||(x.get(e)??0)-(x.get(t)??0)||e.stirred-t.stirred),C=this.sweeping||this.sizing?Zo:Qo;for(let e of S){if(this.held(e))break;if(!(!e.visible||e.shown||e.front?.shown||this.sketched.has(e)||e.failed===f||this.asleep(e)||!this.shown(e,e.el)||!this.veiled(e))){if(performance.now()-p>$o){n=!0;break}this.sketched.add(e),this.sketch(e)}}for(let r of S){if(this.points&&!r.visible&&(r.pointBox||this.points.all.length)&&this.pointsOn(r),!r.visible||r.failed===f)continue;if(this.asleep(r)){r.quiet=!0;continue}if(this.points&&(r.pointBox||this.points.all.length)&&this.pointsOn(r),!this.held(r)&&r.placed&&this.standing(r,f))continue;let i=!this.held(r)||r.sharpen,a=!this.held(r),o=performance.now(),s=r.cost?r.cost*(r.sharpen?Math.min(Math.max(r.toward,lo),1):1):this.arriving;if(i&&h&&o-p+s>C)n=!0;else{i&&(h=!0);try{if(this.renderer.making(r.plate)){n=!0;continue}r.plate.stood&&(r.materialDirty=!0),r.layoutDirty||!r.placed||r.version!==f?this.layout(r):(r.viewDirty||!this.held(r))&&this.layout(r,!0);let i=!1,a=!1;if(r.movers.some(e=>e.p.def.tick||e.springs.some(e=>e.active))){let n=this.where(r),o=Math.max(n.width,n.height),s=rs*Math.min(Math.ceil(Ho/Math.max(o,1)),is);if(a=r.small=o<Ho&&!r.used,a&&(!y||e-r.stepped<s-rs/2))v=!0;else{let n=a&&r.stepped?Math.min((e-r.stepped)/1e3,1):t;r.stepped=e,this.ticking=r,this.tickAsked=!1;for(let{p:e,springs:t}of r.movers){for(let a of t)a.active&&this.pinned!==a&&(a.step(n,this.reduced.matches)&&(i=!0),r.moving.add(e));this.blamed=e.el,e.def.tick?.(e,n)&&(r.moving.add(e),i=!0)}this.ticking=null,r.ticked=i||this.tickAsked}}if(i&&(n||this.shown(r,r.el))&&(a?v=!0:n=!0),[...r.moving].some(e=>e.def.spreads))for(let e of r.list)r.moving.add(e);if(!r.materialDirty&&this.renderer.edgesStale(r.plate)&&(r.materialDirty=r.plate.reedge=!0),r.materialDirty||r.remake)this.paint(r),r.moving.clear();else if(r.moving.size&&this.shown(r,r.el)){let e=this.where(r),t=Math.max(e.width,e.height)<Ho;if(t&&_>ns)n=!0;else{let e=performance.now();r.reverse&&[...r.moving].some(e=>e.el.closest(`[back]`))&&(r.reverse.materialDirty=!0),this.paint(r,r.moving),r.moving.clear(),r.stirred=e,t&&(_+=performance.now()-e)}}for(this.player&&!i&&(r.unread=this.read(r))&&(this.readTimer||=window.setTimeout(()=>{this.readTimer=0,this.schedule()},0));r.layoutDirty;)this.layout(r),this.paint(r);let o=r.front??r;if(r.body&&[o,...o.faces].some(e=>e!==r&&e.visible&&!this.asleep(e)&&this.renderer.edgesStale(e.plate))&&(n=!0),this.blamed=null,r.plate.wanted&&!r.plate.stood){n=!0;continue}this.away(r)&&!this.cards?(r.lightDirty||r.ctx.clearRect(0,0,r.canvas.width,r.canvas.height),r.own=!1,r.lightDirty=!0):(r.lightDirty||this.lightDirty||this.rough(r)&&!this.sweeping&&!this.sizing)&&(this.shown(r,this.sweeping?r.el:void 0)?this.touched(r)&&m.push(r):(r.lightDirty=!0,r.lightBox=null)),r.reachDirty&&!this.sizing&&!this.sleepers.has(r)&&!r.movers.some(e=>e.p.shifted&&e.springs.some(e=>e.active))&&ea(r,this.reachCanvas),this.restful(r,f)&&(r.quiet=!0)}catch(e){this.ticking=null;let t=this.abandon(r,e,f);this.strict?d??=Error(t,{cause:e}):g(t,`error`)}finally{let e=performance.now()-o;i&&e>.5&&(r.cost=e,r.toward=1,a&&(this.arriving+=(e-this.arriving)*.2))}}}let w=this.sweeping?this.room:Math.max(oo,C/this.lightEach);if(m.length>w){let e=e=>{let t=this.where(e);return r.x>=t.left&&r.x<=t.right&&r.y>=t.top&&r.y<=t.bottom?so:1},t=e=>e.front??e,i=new Map(m.map(n=>[n,Math.sqrt(t(n).pw*t(n).ph)*(t(n).waited+1)*e(t(n))]));m.sort((e,t)=>i.get(t)-i.get(e));let a=new Set,o=m.filter(e=>(a.has(t(e))||a.size<Math.floor(w))&&!!a.add(t(e)));for(let e of m.filter(e=>!o.includes(e)))e.lightDirty=!0,e.lightBox=null,e.waited++,n=!0;m.splice(0,m.length,...o)}for(let e of m)this.renderer.store.use(e.plate);for(let e of m){if(!e.plate.tex?.E)continue;let t=this.box(e),n=`${t.left},${t.top},${t.width},${t.height}`;n!==e.glowedAt&&(this.glowStale=!0,e.glowedAt=n)}if(m.length){let e=performance.now(),t=e=>e.el.getAttribute(`lighting`)??this.lighting;this.renderer.lightAll(m.map(e=>({d:e,plate:e.plate,ctx:e.staged?null:e.ctx,rect:this.place(e),lighting:t(e)})),this.scene(),({d:e})=>{e.lightDirty=!1,e.lightBox=null,e.waited=0,u=!0,e.shown||(e.shown=!0,e.el.dispatchEvent(new Event(`pictured`,{bubbles:!0})),this.unsketch(e)),e.staged?(this.staleStage=!0,e.canvas.width&&this.vacate(e)):(e.own=!0,this.left(e)),e.el.dispatchEvent(new Event(`lit`))},({d:e},t)=>{let n=this.abandon(e,t,f);this.strict?d??=Error(n,{cause:t}):g(n,`error`)}),this.lightEach+=((performance.now()-e)/m.length-this.lightEach)*.2}if((this.lightDirty||this.fullLight)&&this.lightChanges++,this.lightDirty=this.fullLight=!1,this.renderer.glowDrawn&&(this.glowStale=!0,this.renderer.glowDrawn=!1),this.glowOut()&&(n=!0),y&&(this.beatAt=e),this.stage&&(this.staleStage||m.length&&m.some(e=>!e.staged))&&this.showStage(),u&&this.stats.frames++,this.renderer.end()&&(n=!0),n?this.schedule():(this.last=0,v&&this.onBeat()),d)throw d}},vc=null;function yc(){return vc??=new _c}var bc=/(?:^|;)\s*(transform|translate|rotate|scale|opacity|filter|clip-path|mask[\w-]*|visibility|mix-blend-mode|perspective|overflow[\w-]*)\s*:[^;]*/g,xc=e=>(e?.match(bc)??[]).join(`;`),Q=e=>e.closest(`d-device, [data-alone]`)?.__d;function Sc(e){return Q(e)?.parts.get(e)}function Cc(e){let t=getComputedStyle(e.parentElement??e).colorScheme;return t.includes(`dark`)&&(!t.includes(`light`)||matchMedia(`(prefers-color-scheme: dark)`).matches)?`dark`:`light`}function wc(e,t){let n=e.el.closest(`[use]`),r=n&&n!==t.el&&t.el.contains(n)?parseFloat(n.getAttribute(`use`)):1;return Number.isFinite(r)&&r>=0?r:1}function Tc(e){let t=Q(e);t&&yc().redraw(e,t)}function Ec(e){let t=yc();e.tilt!==void 0&&(t.tilt=e.tilt),e.strict!==void 0&&(t.strict=e.strict),e.lights!==void 0&&(t.lights=e.lights),e.look!==void 0&&(t.look=e.look),e.ambient!==void 0&&(t.ambient=e.ambient),e.exposure!==void 0&&(t.exposure=e.exposure),e.torch!==void 0&&(t.torch=e.torch),e.handheld!==void 0&&(t.handheld=e.handheld),e.lighting!==void 0&&(t.lighting=e.lighting),e.relief!==void 0&&(t.relief=e.relief),e.lampHz!==void 0&&(t.lampHz=e.lampHz),e.live!==void 0&&(t.live=e.live),t.relight()}function Dc(e,t){let n=e.closest(`d-device, [data-alone]`),r=new MutationObserver(()=>!n.hasAttribute(`data-far`)&&t());return n&&r.observe(n,{attributes:!0,attributeFilter:[`data-far`]}),{far:()=>!!e.closest(pa),stop:()=>r.disconnect()}}var Oc={rolled:`round`,round:`round`,chamfer:`chamfer`,flat:`flat`,dome:`dome`,blend:`blend`},kc=2.2,Ac=[.35,.09];function jc(t,n,r,i,a,o,s){let{x:c,y:l,w:u,h:d}=n,f=i*4*.6,p=i*kc*4,m=(u+d)*2,h=e(r).sub,g=[[`top`,w(c-m,l-m,u+m*2,m+p)],[`bottom`,w(c-m,l+d-p,u+m*2,m+p)],[`left`,w(c-m,l-m,m+p,d+m*2)],[`right`,w(c+u-p,l-m,m+p,d+m*2)]],_=[[`top`,w(c,l,u,f)],[`bottom`,w(c,l+d-f,u,f)],[`left`,w(c,l,f,d)],[`right`,w(c+u-f,l,f,d)]];for(let[e,n]of _)a.includes(e)||t.cut(n,{ink:h,feather:s?.3:0,rough:.8});for(let[e,n]of g)a.includes(e)&&t.cut(n,{depth:i*.7,soft:p});for(let e of o)t.cut(w(c,l+(e-Ac[0]/2)*4,u,Ac[0]*4),{depth:Ac[1],soft:Ac[0]*4})}t({selector:`d-surface`,label:!0,paint(t,n,i){let a=e=>n.el.getAttribute(e),o=n.el.parentElement?.closest(`d-surface[material], d-device`),s=a(`material`)??(o?.localName===`d-surface`?o.getAttribute(`material`):i.material),c=Ae(a(`height`),1),[l=0,u=l]=(a(`crown`)??`0`).trim().split(/\s+/).map(e=>Ae(e,0)),d=[l,u],f=Ae(a(`bevel`),.625)*4;ye(n.el,{top:Ee(n)+c,crown:d,x:n.x,y:n.y,w:n.w,h:n.h});let p=a(`path`),m=a(`viewbox`)?.trim().split(/[\s,]+/).map(Number),h=(a(`rotate`)??0)*Math.PI/180,g=p?A(p,n.x,n.y,n.w,n.h,{viewBox:m,rotate:h,rule:a(`rule`)===`evenodd`?`evenodd`:void 0,spread:f+8}):null,_=a(`stop`),v=g?_?de(g,A(_,n.x,n.y,n.w,n.h,{viewBox:m,rotate:h,spread:f+8})):g:a(`shape`)===`circle`?T(n.x+n.w/2,n.y+n.h/2,Math.min(n.w,n.h)/2):w(n.x,n.y,n.w,n.h,{radius:Ae(a(`radius`),.75)*4,rotate:h}),y=c<0?Ce(n):void 0,b=Ae(a(`radius`),.75)*4,x=y&&(n.x<y.x||n.y<y.y||n.x+n.w>y.x+y.w||n.y+n.h>y.y+y.h)?de(v.type===`field`?v:M(n.x,n.y,n.w,n.h,[b,b,b,b],{rotate:h,spread:f+8}),w(y.x,y.y,y.w,y.h)):v;if(n.el.hasAttribute(`clear`)){let n=+(a(`clear`)||0);n&&t.frost(x,{blur:f/2,tint:e(s).color,opacity:n,zEdge:0,zTop:c,bevel:f}),t.glass(x,{material:s,height:c,bevel:f,rim:f/4,covers:!0,curve:+(a(`curve`)||0)});return}t.surface(x,{material:s,follow:we(n),rise:c,bevel:f,profile:Oc[a(`edge`)??`rolled`]??`round`,crown:d,radial:n.el.hasAttribute(`radial`),over:{wear:+(a(`wear`)??i.wear),...Te(a(`lay`))}}),Se(n.el,t.commands[t.commands.length-1]),a(`sheet`)!==null&&jc(t,n,s,Ae(a(`sheet`),.35),(a(`fold`)??``).trim().split(/\s+/),(a(`score`)??``).trim().split(/\s+/).filter(Boolean).map(Number),f);let S=a(`label`)??`engrave`;if(S===`emboss`&&n.label){let{lines:e,font:r,letterSpacing:i,wordSpacing:a}=n.label;for(let o of e)t.surface(j(o.text,o.x,o.y,o.w,o.h,{font:r,letterSpacing:i,wordSpacing:a}),{material:s,follow:we(n),rise:.5,bevel:1.2,over:{rough:.3}})}else n.label&&t.cut(k(n.label),{depth:S===`print`?0:.2,ink:r(s),wear:i.wear*.2})}}),t({selector:`d-set`,paint(){}}),l(`
d-device { display: block; position: relative; isolation: isolate; }
/* An app rather than an object: it takes the size of what holds it, and casts nothing outside it. */
d-device[fill] { width: 100%; height: 100%; overflow: clip; }
/* Far out of the window, nothing of it is painted or hit, and it keeps its place. Clipped, not hidden, so the keyboard and a screen reader still reach it. A printed page has no window, so all of it prints.
   Clipped to a sliver of its whole height, too thin to paint: clipped to nothing, an observer judges it by its top edge alone, so one a window or more taller than the window, jumped or scrolled up into, never came near. Its width is still judged by its left edge. A rectangle, as a polygon that keeps the whole box costs about twice the layerizing, and a camera's world has no observers to tell, so it's clipped to nothing there. */
@media screen { [data-far] { clip-path: inset(0 calc(100% - 0.01px) 0 0); } ${pa} { clip-path: inset(50%); } }
/* In a camera's world it's hidden, as the browser still walks what it clips every time anything in the world is painted again: a page
   of 2,000 loading one at a time painted for 16 ms a frame, all of it a window or more away (44 → 15 s to load). There a camera decides
   what's seen, which no key or scroll can bring into view, so the keyboard and a screen reader pass it by until it comes back. */
@media screen { ${pa}, ${pa} * { visibility: hidden !important; } }
/* Shown too small to use, its markup sleeps: hidden, the device's own box left as it was, and a hand coming over it wakes it. Hidden, not
   clipped, as the browser still paints what it clips, every frame a camera moves (1.15 → 0.36 s a wheel out over 5,000 objects): so
   until a hand comes, the keyboard and a screen reader pass it by too. All of it, as some parts show themselves inside a device. */
@media screen { [data-asleep] > :not(canvas[data-d], d-device), [data-asleep] > :not(canvas[data-d], d-device) * { visibility: hidden !important; } }
/* The same for what a page hasn't brought in yet: its picture has further to come. */
@media screen { [data-veiled] d-device > :not(canvas[data-d], d-device), [data-veiled] d-device > :not(canvas[data-d], d-device) * { visibility: hidden !important; } }
d-device > canvas[data-d] { position: absolute; z-index: -1; pointer-events: none; }
/* A device's edges, while it waits to be drawn. Over its canvas, so they give way to its picture as it lands. */
:is(d-device, [data-alone]) > canvas[data-sketch] { position: absolute; z-index: -1; pointer-events: none; }
@media print { canvas[data-sketch] { display: none; } }
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
/* A finger on an object works it, as a hand on the real one does: two quick presses are two presses and not a zoom, a long one is a hold
   and not a selection or a menu, and nothing flashes grey over what's pressed. The page still scrolls past it. */
:where(.d-gl d-device) { touch-action: manipulation; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; -webkit-tap-highlight-color: transparent; }
.d-gl :is(d-device[lean], d-device:has(> d-device:is([reverse], [side])), d-device:is([reverse], [side])) { cursor: grab; touch-action: pan-y; user-select: none; -webkit-user-select: none; }
.d-gl :is(d-device[lean], d-device:has(> d-device:is([reverse], [side])), d-device:is([reverse], [side])):active { cursor: grabbing; }
/* A finger on a run of keys slides along it, and doesn't move the page. */
.d-gl d-device [run] { touch-action: none; }
/* The other face of a body, in the same place, and the only one showing once it's up. */
d-device[reverse] { position: absolute; inset: 0; visibility: hidden; pointer-events: auto; }
/* A side, as wide as the body is deep, across its middle. */
d-device[side] { position: absolute; top: 0; bottom: 0; left: 50%; width: var(--d-deep); margin-left: calc(var(--d-deep) / -2); visibility: hidden; pointer-events: auto; }
/* A body and its long edges, each a device of its own in a holder that draws nothing, and only the one that's up showing. See tip.ts. */
/* The two faces of the half of a body that folds, each where it rests, and only the one that's up showing. */
d-device > d-device[fold] { position: absolute; }
d-device[folded] > d-device[fold="open"], d-device:not([folded]) > d-device[fold="shut"] { visibility: hidden; }
d-device > d-device[loose] { position: absolute; visibility: visible; pointer-events: auto; cursor: grab; touch-action: none; }
/* What's seated is drawn by what holds it, and only a hand's way to it stays here, on the face its seat is on: the thing and what's on it, so a lens's
   rings still turn on the body. What's still lying spare waits until there's a way in to see. */
d-device > d-device[loose][seated], d-device > d-device[loose][seated]:not([moving]) > canvas[data-d] { visibility: hidden; }
d-device:not([data-up]) > d-device[loose][seated][data-face="front"], d-device[data-up="back"] > d-device[loose][seated][data-face="back"],
d-device[data-up="left"] > d-device[loose][seated][data-face="left"], d-device[data-up="right"] > d-device[loose][seated][data-face="right"] { visibility: visible; }
d-device:not([data-up="back"]) > d-device[loose][at] { visibility: hidden; }
d-device[data-over] { visibility: hidden; }
d-device[data-up="back"] > d-device[reverse], d-device[data-up="left"] > d-device[side="left"], d-device[data-up="right"] > d-device[side="right"] { visibility: visible; }
/* Each face draws its part of the body, so all of them show while it goes round. */
d-device:is([data-turning], [data-up="left"], [data-up="right"]) > canvas[data-d], d-device:is([data-up="left"], [data-up="right"]) > d-device[reverse] > canvas[data-d], d-device[data-turning] > d-device:is([reverse], [side]) > canvas[data-d] { visibility: visible; }
/* Where a part is drawn outside its box. Behind its contents, so its own inputs still come first. */
:where([d-reach])::after { content: ''; position: absolute; z-index: -1; left: var(--reach-x); top: var(--reach-y); width: var(--reach-w); height: var(--reach-h); }
/* Its corners are the body's, as its radius says in mm at 4 css px a mm, so anything drawn round its box, an outline or a focus ring, follows
   it. Where attr() can't read a number, the default radius. */
d-device { background: #ddd; border: 1px solid #777; border-radius: 10px; border-radius: calc(attr(radius type(<number>), 2.5) * 4px); }
.d-gl d-device { background: none; border: 0; }
.d-gl d-surface { color: transparent; }
@media (forced-colors: active) {
  :is(d-device, [data-alone]) > canvas:is([data-d], [data-sketch]) { display: none; }
}
`);var Mc=typeof HTMLElement>`u`?class{}:HTMLElement,Nc=class extends Mc{connectedCallback(){Pe(this),yc().add(this)}disconnectedCallback(){yc().remove(this)}};typeof customElements<`u`&&!customElements.get(`d-device`)&&customElements.define(`d-device`,Nc);var Pc=new Set([`input`,`img`,`hr`,`br`,`canvas`,`select`,`textarea`,`meter`,`progress`,`table`,`details`]),Fc=`dialog, [popover]`;function Ic(e,t=s()){let n=s(),r=[...e instanceof Element&&e.matches(t)?[e]:[],...e.querySelectorAll(t)];for(let e of r)e.hasAttribute(`data-alone`)||e.closest(`d-device`)||Pc.has(e.localName)||(e.parentElement?.closest(`${n}, ${Fc}`))?.matches(n)||(e.setAttribute(`data-alone`,``),yc().add(e))}function Lc(e){for(let t of[e,...e.querySelectorAll(`[data-alone]`)])t.hasAttribute(`data-alone`)&&!t.isConnected&&(t.removeAttribute(`data-alone`),yc().remove(t))}var Rc=2e3,zc=new Set,Bc=0;function Vc(){Bc=0;for(let e of zc)if(e.isConnected)for(let t of[e,...e.querySelectorAll(`*`)])f(t);zc.clear()}if(typeof MutationObserver<`u`){let e=!1,t=0;i(()=>{e||(e=!0,queueMicrotask(()=>{e=!1;let n=u(),r=n.slice(0,n.length-t);t=n.length,r.length&&Ic(document,r.map(e=>e.selector).join(`,`)),zc.add(document.documentElement),clearTimeout(Bc),Bc=window.setTimeout(Vc,Rc)}))}),new MutationObserver(e=>{for(let t of e)if(t.type===`attributes`)Fe(t.target);else{for(let e of t.removedNodes)e instanceof Element&&Lc(e);for(let e of t.addedNodes)e instanceof Element&&e.isConnected&&(Pe(e),Ic(e),zc.add(e),Bc||=window.setTimeout(Vc,Rc))}}).observe(document,{subtree:!0,childList:!0,attributes:!0,attributeFilter:[`place`]}),Pe(document.documentElement)}var $=(e,t)=>typeof e==`function`?e(t):e,Hc={"ball-bearing":{drag:.06,start:.05},"finger-on-glass":{drag:0,start:0},"steel-on-steel":{drag:.15,start:.3},"brass-on-steel":{drag:.16,start:.35},"plastic-on-plastic":{drag:.2,start:.2},"plastic-on-rubber":{drag:.15,start:.1},"rubber-on-plastic":{drag:.3,start:.3},"metal-on-grease":{drag:.25,start:.15},governor:{drag:.75,start:0}},Uc=2e3,Wc=.5,Gc=226,Kc=.12,qc=.8,Jc=14,Yc={x:0,y:0,rotate:0,pin:[0,0]},Xc=.35;function Zc(e,t=`spring`,n={}){let r=e.material??`plastic-on-plastic`,i=e.mass??10,a=typeof e.friction==`number`?{drag:e.friction}:e.friction??{},o=a.drag??Hc[r].drag,s=a.start??Hc[r].start,c=e.detents?e.detents===!0?Xc:e.detents.strength??Xc:0,l=Uc*i**(-1/3)*(1+c)*(e.return?Math.sqrt(e.return/Wc):1),u=!e.return&&!c&&o?Math.sqrt(i)/o/Gc:0;return{...n,joint:t,sound:e.sound,arrives:!!e.contact,mass:i,material:r,drag:o,start:s,strength:c,returns:!!e.return,coast:u<Kc?0:u,landing:e.stops?.landing??`hard`,ratchet:e.ratchet??0,spring:{stiffness:l,damping:2*Math.min(.1+.9*o**.35,1)*Math.sqrt(l)}}}var Qc=e=>al(Zc(e),{contact:e.material?`press`:void 0,...e});function $c(e={}){let t=new WeakSet,n=e=>t.has(e)?0:+(e.el.getAttribute(`rpm`)??0);return{springs:{speed:Qc(e)},update:e=>e.springs.speed.set(n(e)),hold(e,r){r?(t.add(e),e.springs.speed.snap(0)):t.delete(e),e.springs.speed.set(n(e))},tick(e,t){let n=e.springs.speed.value;return Math.abs(n)<.02||Ge()?!1:(e.data.motor=((e.data.motor??0)+n/60*t*Math.PI*2)%(Math.PI*2),!0)},angle:e=>e.data.motor??0}}var el=3,tl=10,nl=.15,rl=1;function il(e){let t=Zc(e),n=Math.asin(e.drop??.9),r=t=>{let n=t.el.querySelectorAll(`input`);return n[e.input??n.length-1]},i=e=>{let t=e.el.getAttribute(`wound`);return t!==e.data.said&&(e.data.said=t,e.data.left=t===null?1/0:+t),e.data.left},a=e=>r(e).checked&&i(e)>0,{material:o,...s}=e;return{motion:t,springs:{swing:Qc(s)},update(e){let t=a(e),n=e.springs.swing;t&&n.value<.02&&(e.data.phase=0),n.set(+!!t)},connect(t){let n=new AbortController,{signal:i}=n,a=0,o=0;return t.el.addEventListener(`pointerdown`,e=>{a=e.clientX,o=e.clientY},{signal:i}),t.el.addEventListener(`click`,n=>{n.target===r(t)||Math.hypot(n.clientX-a,n.clientY-o)>el||e.accepts?.(t,n)===!1||r(t).click()},{signal:i}),()=>n.abort()},tick(r,o){let s=r.springs.swing,c=a(r);if(!c&&s.value<.002)return delete r.data.clock,!1;let l=performance.now(),u=r.data.clock===void 0?o:Math.min(rl,(l-r.data.clock)/1e3);r.data.clock=l;let d=r.data.phase??0,f=d+Math.PI*($(e.beats,r)/60)*u;r.data.phase=f,Math.floor((f-n)/Math.PI)!==Math.floor((d-n)/Math.PI)&&s.value>nl&&Ve(r,`detent`,tl*s.value,{motion:t,heard:`device`});let p=i(r);if(c&&p!==1/0){let e=Math.max(0,p-u);r.data.left=e,Math.ceil(e)!==Math.ceil(p)&&(r.data.said=String(Math.ceil(e)),r.el.setAttribute(`wound`,r.data.said),e||s.set(0))}return!0},angle:e=>Ge()?0:e.springs.swing.value*Math.sin(e.data.phase??0)}}var al=(e,t)=>({...e.spring,motion:e,...t.contact!==void 0&&{contact:t.contact}}),ol=`[data-carries]`,sl=!1,cl=e=>!sl&&!!e.el.closest(ol),ll=e=>{e.el.toggleAttribute(`data-carries`,!0)};function ul(e,t,n){sl=!0;try{t.el.querySelectorAll(`[d-mark]`).forEach(t=>{let r=Sc(t);r&&r.w&&r.h&&r.def.paint(e,r,n)})}finally{sl=!1}}function dl(e={}){let t=e.name??`follow`,n=n=>{let r=n.el.getAttribute(e.attr??`of`),i=r?n.el.closest(`d-device`)?.querySelector(r):null,a=i?Sc(i):null,o=a?.def?.value;a&&o&&n.springs[t].set(o(a))};return{springs:{[t]:Qc(e)},update:n,tick(e){return n(e),!1},value:e=>H(e.springs[t].value,0,1)}}function fl(){let e=e=>{let t=e.el.getAttribute(`of`),n=t?e.el.closest(`d-device`)?.querySelector(t):null,r=n?Sc(n):null,i=r?.def?.angle;return r&&i?i(r):0};return{tick(t){let n=e(t);return n!==t.data.driven&&(t.data.driven=n,!0)},angle:e}}var pl={hard:.004,soft:.02},ml={hard:1,soft:.3},hl=.25,gl=24,_l=.05,vl=60,yl=.25,bl=60,xl=(e,t)=>t===`touch`?.01:Math.min(.014+e*8e-4,.03);function Sl(e,t,n){let{motion:r,track:i}=n,a=new nt,o=0,s=0,c=0,l=0,u=0,d=!1,f=r.material===`finger-on-glass`,p={moved:0},m=(t,o=0)=>{if(t*r.ratchet<0)return;let c={...i.reach(e),past:o},l=c.max-c.min,u=Number.isFinite(l),p=a.by(t,c),m=i.read(e);i.write(e,p);let h=c.wrap?a.at:H(a.at,c.min,c.max),g=a.at-h,_=u&&!f?pl[r.landing]*l:0,v=_&&g?Math.sign(g)*_*(1-Math.exp(-Math.abs(g)/(_*4))):0;it(e,((c.step?at*Math.min(1,(1-r.strength)/.65):1)*(h-i.read(e))+v)/i.scale(e),n.pull);let y=!c.wrap&&u&&(p===c.min||p===c.max),b=u?Math.abs(s)/l:0;y&&!d&&b>hl&&!f&&!r.arrives&&Ve(e,`stop`,Math.min(b*2,10)*ml[r.landing],{motion:r}),d=y,i.read(e)!==m&&!c.step&&!f&&Ve(e,`rub`,b,{motion:r})},h=()=>{l&&(cancelAnimationFrame(l),l=0,it(e,0,n.pull))};t.addEventListener(`abort`,()=>cancelAnimationFrame(l));let g=t=>{let i=n.radians?.(e)??1,a=qc/i,o=Jc/i,c=H(t,-o,o),u=performance.now();if(Math.abs(c)<a)return;let f=t=>{let i=Math.max(0,Math.min(.05,(t-u)/1e3));u=t,c*=Math.exp(-i/r.coast),s=c,m(c*i),l=Math.abs(c)<a||d?0:requestAnimationFrame(f),l||it(e,0,n.pull)};l=requestAnimationFrame(f)};return Xe(e,t,{accepts:n.accepts&&(t=>n.accepts(e,t)),start(t){h(),a.grab(i.read(e)),!r.strength&&!i.reach(e).step&&e.springs[n.spring].grip(xl(r.mass,t.pointerType)),n.grab(e,t),e.el.querySelector(`input`)||(n.focus?.(e)??e.el).focus({preventScroll:!0}),o=r.start*2*r.mass**.25,s=0,c=t.timeStamp,p.moved=0;let l=n.seat?.(e,t);l!==void 0&&(a.grab(l),i.write(e,l),o=0)},move(t,r,l){let u=n.by(e,t,r,l);if(p.moved+=Math.hypot(r,l),o>0&&(o-=Math.hypot(r,l))>0||n.hold?.(e,u))return;let d=(t.timeStamp-c)/1e3;d>0&&(s+=(u/d-s)*(1-Math.exp(-d/_l))),c=t.timeStamp,m(u,n.past(e));let f=i.reach(e);e.data[Ja(n.spring)]=f.wrap?a.at:H(a.at,f.min,f.max)},end(t){delete e.data[Ja(n.spring)],e.springs[n.spring].grip(0),n.letGo?.(e);let o=n.rest?.(e);o!==void 0&&i.write(e,o),it(e,0,n.pull),a.grab(i.read(e)),r.coast&&t.type===`pointerup`&&t.timeStamp-c<vl&&!Ge()&&g(s)}}),e.el.addEventListener(`keydown`,()=>{h(),p.moved=0},{signal:t}),n.scroll&&e.el.addEventListener(`wheel`,t=>{let r=e.el.querySelector(`input`);if(!e.el.contains(document.activeElement)||r?.disabled)return;t.preventDefault(),h();let o=i.read(e),{step:s}=i.reach(e),c=-t.deltaY*(t.deltaMode?16:1);if(a.grab(o),s){u+=c/bl*s;let e=Math.trunc(u/s);e&&(u-=e*s,m(e*s))}else u+=c*yl*n.scroll(e),m(u),i.read(e)!==o&&(u=0);it(e,0,n.pull)},{signal:t,passive:!1}),p}var Cl=e=>typeof e.detents==`object`?e.detents:{},wl=e=>e.type===`checkbox`||e.type===`radio`,Tl=e=>wl(e)?[0,1]:We(e),El=e=>wl(e)?+e.checked:+e.value,Dl=!1,Ol=(e,t)=>{if(!wl(e))return Qe(e,t);e.checked!==t>=.5&&(Dl=!0,e.click(),Dl=!1)},kl=(e,t)=>{let[n,r]=Tl(t);return(r>n?H((El(t)-n)/(r-n),0,1):0)+(e.data.pull??0)},Al=3;function jl(e,t,n,r,i,a=!1){e.el.addEventListener(`click`,t=>{if(Dl||i?.(e,t)===!1)return;let o=n.moved>Al;n.moved=0,o?t.preventDefault():(a||!(t.target instanceof HTMLInputElement)||t.target.type===`range`)&&r(t)},{signal:t})}var Ml=(e,t,n)=>({read:e=>El(t(e)),write(e,n){t(e).disabled||Ol(t(e),n)},reach(r){let i=t(r),[a,o]=Tl(i),s=n?$(n,r):!1;return{min:a,max:o,step:e.detents?wl(i)?1:rt(i):0,wrap:s}},scale(e){let[n,r]=Tl(t(e));return r-n}}),Nl=(e,t,n)=>{let r=$(Cl(t).count??0,e);if(!r||wl(n))return;let[i,a]=We(n);n.step=String((a-i)/Math.max(r-1,1))},Pl=Math.PI/180,Fl=.45,Il=18,Ll=36;function Rl(e={}){let t=e.name??`turn`,n=e.keys??{ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1},r=Zc(e,`turn`,{rolled:!!e.rolled}),i=t=>e.stops?.at?$(e.stops.at,t):null,a=e=>{let t=i(e);return[t[0]*Pl,t[1]*Pl]},o=e=>{let[t,n]=a(e);return n-t},s=t=>e.at?$(e.at,t):[t.w/2,t.h/2],c=t=>{if(e.ticks)return $(e.ticks,t)*Pl;if(!e.detents)return 0;if(!e.input)return $(Cl(e).every??0,t)*Pl;let n=V(t),[r,i]=Tl(n);return(wl(n)?1:rt(n))/(i-r)*o(t)},l=e=>+(e.el.getAttribute(t)??0),u={read:l,write(n,r){let i=l(n),a=c(n);r!==i&&(n.el.setAttribute(t,String(r)),a&&n.el.dispatchEvent(new CustomEvent(e.event??`detent`,{bubbles:!0,detail:Math.round((r-i)/a)})))},reach(e){let t=i(e);return{min:t?t[0]*Pl:-1/0,max:t?t[1]*Pl:1/0,step:c(e)}},scale:()=>1},d=e.track??(e.input?Ml(e,V,e.wrap):u),f=e=>Math.min(e.w,e.h)/2,p=t=>e.travel?$(e.travel,t):e.input?o(t)*Ll:0,m=t=>e.track?.radians(t)??(e.input?d.scale(t)/o(t):1),h=t=>e.input?d.scale(t)/p(t):1/Math.max(f(t),Ll),g=new WeakMap;return{motion:r,springs:{[t]:al(r,e)},live:[t,`style`],update(n){let r=n.springs[t];if(r.notches(c(n)),e.track)return;if(!e.input)return r.set(l(n)+(n.data.pull??0));let[i]=a(n),s=o(n),u=i+s*kl(n,V(n));r.set(e.wrap&&$(e.wrap,n)?u+Math.round((r.target-u)/s)*s:u)},connect(i){let a=new AbortController,{signal:o}=a;e.input&&Nl(i,e,V(i)),!e.input&&!e.track&&(i.el.style.cursor=`grab`);let c=Sl(i,o,{motion:r,track:d,spring:t,accepts:e.accepts,hold:e.hold&&((t,n)=>e.hold(t,n/m(t))),letGo:e.letGo,grab(t,n){let[r,i]=Re(t.el),a=t.el.getBoundingClientRect(),o=a.width/r/t.w||1,[c,l]=s(t),u=a.left+c*o*r,d=a.top+l*o*i,f=Math.max(Fl*Math.min(a.width,a.height)/2,Il),p=!!e.rolled||!e.hubless&&Math.hypot(n.clientX-u,n.clientY-d)<f;g.set(t,{k:o,x:u,y:d,arm:Math.max(f,Ll),straight:p,last:[n.clientX,n.clientY],tall:i}),!e.input&&!e.track&&(t.el.style.cursor=`grabbing`)},by(t,n,r,i){let a=g.get(t),[o,s]=a.last;return a.last=[n.clientX,n.clientY],a.straight?(e.rolled===`x`?r:(e.rolled?0:r)-i)/a.k*h(t):et(o-a.x,(s-a.y)/a.tall,n.clientX-a.x,(n.clientY-a.y)/a.tall,a.arm)*m(t)},past(t){let n=g.get(t);return e.past===void 0?n?.straight?gl*h(t):Math.PI*m(t):$(e.past,t)},radians:e=>1/m(e),scroll:e.track&&!e.input?void 0:h});if(!e.input&&!e.track){let e=()=>i.el.style.cursor=`grab`;for(let t of[`pointerup`,`pointercancel`])i.el.addEventListener(t,e,{signal:o})}let l=t=>{let n=d.reach(i),r=d.read(i)+t*(n.step||.1),a=n.wrap?r:H(r,n.min,n.max);d.write(i,e.input&&wl(V(i))?1-d.read(i):a)};return e.input&&e.wrap&&i.el.addEventListener(`keydown`,t=>{let r=n[t.key],a=d.reach(i),o=d.read(i);!r||!$(e.wrap,i)||!a.step||(r>0?o<a.max:o>a.min)||(t.preventDefault(),d.write(i,(r>0?a.min:a.max)+r*a.step))},{signal:o,capture:!0}),r.ratchet&&i.el.addEventListener(`keydown`,e=>{let t=n[e.key];t&&t*r.ratchet<0&&(e.preventDefault(),e.stopImmediatePropagation())},{signal:o,capture:!0}),!e.input&&!e.track&&i.el.addEventListener(`keydown`,e=>{let t=n[e.key];t&&(e.preventDefault(),l(t))},{signal:o}),e.click&&jl(i,o,c,()=>l(1),e.accepts),e.tap&&jl(i,o,c,t=>e.tap(i,t),e.accepts),()=>a.abort()},angle(n){let a=n.springs[t].value,o=i(n);if(!o)return a;let s=o[0]*Pl,c=o[1]*Pl,l=pl[r.landing]*(c-s);return e.input?a:H(a,s-l,c+l)},carried(n){if(e.rolled)return Yc;let r=n.data[Ja(t)],[i,c]=e.input?Tl(V(n)):[0,1],l=e.track?(r??e.track.read(n))/e.track.radians(n):r===void 0?this.angle(n):e.input?a(n)[0]+o(n)*(r-i)/(c-i):r;return{...Yc,rotate:l,pin:s(n)}},ends(e){return i(e)?[...a(e)]:null},pin:s,place(e){let[t,n]=s(e);return{at:[e.x+t,e.y+n],rotate:this.angle(e)}}}}var zl=120,Bl=480,Vl=.6,Hl=new WeakMap,Ul=`d-held`;function Wl(e,t){e.dispatchEvent(new CustomEvent(Ul,{detail:t}))}var Gl=(e,t,n)=>e.addEventListener(Ul,e=>t(e.detail),{signal:n});function Kl(e={}){let{name:t=`press`}=e,n=Zc({return:Wc,...e},`press`,{latch:e.latch}),r=al(n,e),i=e.held??(e=>V(e).checked),a=new WeakSet,o=new WeakSet,s=t=>!!e.catches&&(e.of?t.el.querySelector(e.of):t.el)?.getAttribute(`aria-pressed`)===`true`,c=new WeakSet,l=t=>s(t)?e.catches:e.rests&&o.has(t)?e.rests:0,u=(n,r,i)=>{if(e.rocks){let[t,a,o=0]=e.rocks[i]??[0,0];n.springs.x.set(r?t:0),n.springs.y.set(r?a:0),n.springs.z?.set(r?o:0)}else n.springs[t].set(r?1:l(n));(r?e.down:e.up)?.(n)},d=(n,r,i)=>{let a=n.el,o=0,s=0,c=i=>{if(clearTimeout(s),i===o)return;let c=o;o=i,n.springs[t].set(i===2?1:i===1?r:l(n)),i&&!c&&e.down?.(n),i||e.up?.(n),a.dispatchEvent(new CustomEvent(`stage`,{bubbles:!0,detail:{stage:i}}))},u=()=>{c(2),s=window.setTimeout(()=>c(0),zl)},d=()=>!a.disabled&&!a.querySelector(`input`)?.disabled;a.addEventListener(`pointerdown`,e=>{!e.button&&d()&&c(1)},{signal:i}),a.addEventListener(`pointermove`,e=>{o===1&&e.pointerType===`pen`&&e.pressure>Vl&&c(2)},{signal:i}),a.addEventListener(`pointerup`,()=>o===1?u():c(0),{signal:i});for(let e of[`pointercancel`,`pointerleave`,`blur`])a.addEventListener(e,()=>o===1&&c(0),{signal:i});a.addEventListener(`keydown`,e=>{(e.key===` `||e.key===`Enter`)&&!e.repeat&&d()&&c(1)},{signal:i}),a.addEventListener(`keyup`,e=>{(e.key===` `||e.key===`Enter`)&&o===1&&u()},{signal:i}),Gl(a,e=>e?d()&&c(1):o===1?u():c(0),i),a.addEventListener(`click`,e=>{e.detail||o||!d()||(c(1),s=window.setTimeout(u,Bl))},{signal:i})};return{motion:n,springs:e.rocks?{x:{...r,through:!0,contact:`press`},y:{...r,through:!0,contact:`press`},...e.rocks.some(e=>e.length>2)&&{z:{...r,contact:`press`}}}:{[t]:r},update(n){if(e.latch)n.springs[t].set(i(n)?1:l(n));else if(e.held){let r=e.held(n);if(r===a.has(n))return;r?a.add(n):a.delete(n),n.springs[t].set(r?1:l(n))}else e.catches&&!c.has(n)&&n.springs[t].set(l(n))},connect(n){let r=new AbortController,{signal:a}=r;if(e.rests){let e=(e,r)=>{e.pointerType!==`mouse`||n.el.disabled||n.el.querySelector(`input`)?.disabled||(r?o.add(n):o.delete(n),n.springs[t].target<1&&n.springs[t].set(l(n)))};n.el.addEventListener(`pointerenter`,t=>e(t,!0),{signal:a}),n.el.addEventListener(`pointerleave`,t=>e(t,!1),{signal:a})}let f=n.el.getAttribute(`bank`);if(f){let t=()=>[...(n.el.closest(`d-device`)??document).querySelectorAll(`[bank="${CSS.escape(f)}"]`)].filter(e=>e!==n.el),r=()=>{for(let e of t()){let t=e.querySelector(`input`);t?.checked&&(t.checked=!1,t.dispatchEvent(new Event(`change`,{bubbles:!0})))}},i=e.latch?V(n):null;i?i.addEventListener(`change`,()=>i.checked&&r(),{signal:a}):n.el.addEventListener(`pointerdown`,e=>!e.button&&r(),{signal:a}),i||n.el.addEventListener(`keydown`,e=>(e.key===` `||e.key===`Enter`)&&r(),{signal:a}),i||Gl(n.el,e=>e&&r(),a)}if(e.latch&&V(n))return Gl(n.el,e=>e&&!V(n).disabled&&V(n).click(),a),()=>r.abort();let p=parseFloat(n.el.getAttribute(`stage`)??``);if(!e.rocks&&!e.of&&p>0&&p<1)return d(n,p,a),()=>r.abort();let m=!e.rocks&&!e.of?n.el.getAttribute(`run`):null;return(e.of?[...n.el.querySelectorAll(e.of)]:[n.el]).forEach((t,r)=>{let o=parseFloat(t.getAttribute(`long`)??``),[l=NaN,d=l]=(t.getAttribute(`repeat`)??``).trim().split(/\s+/).map(Number),f=[],p=!1,h=e=>t.dispatchEvent(new CustomEvent(e,{bubbles:!0})),g=e=>{if(e!==f.length>0&&(f.forEach(clearTimeout),f=[],e)){if(p=!1,o>0&&f.push(window.setTimeout(()=>{p=!0,h(`long`)},o)),l>0){let e=()=>{h(`repeat`),f.push(window.setTimeout(e,Math.max(d,16)))};f.push(window.setTimeout(e,l))}f.length||f.push(0)}};a.addEventListener(`abort`,()=>g(!1)),o>0&&t.addEventListener(`click`,e=>{p&&(p=!1,e.preventDefault(),e.stopImmediatePropagation())},{signal:a,capture:!0});let _=()=>{t.disabled||t.querySelector(`input`)?.disabled||(c.add(n),u(n,!0,r),g(!0))},v=()=>{g(!1),e.catches&&c.delete(n)&&t.setAttribute(`aria-pressed`,String(!s(n))),u(n,(!!e.latch||!!e.held)&&i(n),r)};t.addEventListener(`pointerdown`,e=>{e.button||_()},{signal:a});for(let e of[`pointerup`,`pointercancel`,`blur`])t.addEventListener(e,v,{signal:a});if(t.addEventListener(`pointerleave`,e=>{e.buttons&&v()},{signal:a}),t.addEventListener(`keyup`,e=>{(e.key===` `||e.key===`Enter`)&&v()},{signal:a}),t.addEventListener(`keydown`,e=>{(e.key===` `||e.key===`Enter`)&&_()},{signal:a}),Gl(t,e=>e?_():v(),a),m===null){t.addEventListener(`pointerleave`,v,{signal:a});return}let y=new Set;Hl.set(t,e=>{t.disabled||(y.add(e),_())}),t.addEventListener(`pointerdown`,e=>{e.button||(y.add(e.pointerId),t.hasPointerCapture(e.pointerId)&&t.releasePointerCapture(e.pointerId))},{signal:a});for(let e of[`pointerup`,`pointercancel`])t.addEventListener(e,e=>y.delete(e.pointerId),{signal:a});t.addEventListener(`pointerleave`,e=>{if(!y.delete(e.pointerId))return v();let n=(e.relatedTarget??document.elementFromPoint(e.clientX,e.clientY))?.closest(`[run="${CSS.escape(m)}"]`),r=n&&n!==t&&n.closest(`d-device`)===t.closest(`d-device`)&&e.buttons?n:null;r&&Hl.get(r)?.(e.pointerId),v(),t.dispatchEvent(new CustomEvent(`run`,{bubbles:!0,detail:{to:r}}))},{signal:a})}),()=>r.abort()},value:e=>H(e.springs[t].value,0,1)}}function ql(...e){let t=e.filter(e=>e.tick);return{...t.length&&{tick:(e,n)=>t.reduce((t,r)=>r.tick(e,n)||t,!1)},motion:e.find(e=>e.motion)?.motion,springs:Object.assign({},...e.map(e=>e.springs)),update(t){for(let n of e)n.update?.(t)},connect(t){let n=e.map(e=>e.connect?.(t));return()=>n.forEach(e=>e?.())},carried:t=>e.reduce((e,n)=>{let r=n.carried?.(t)??Yc;return{x:e.x+r.x,y:e.y+r.y,rotate:e.rotate+r.rotate,pin:r.pin[0]||r.pin[1]?r.pin:e.pin}},Yc)}}function Jl(e){let t=e.name??`thread`,n=e.on??1,r=Zc({material:`steel-on-steel`,...e}),i=t=>t.el.querySelectorAll(`input`)[$(e.input,t)],a=t=>$(e.turns,t),o=e=>e.data[t]??(i(e).checked?a(e):0),s=t=>{let n=t.el.querySelectorAll(`input`),r=i(t).checked;for(let i of e.locks?$(e.locks,t):[])n[i]&&(n[i].disabled=r)},c=!1,l=(e,t)=>{let n=i(e);n.checked!==t&&(n.checked=t,c=!0,n.dispatchEvent(new Event(`input`,{bubbles:!0})),n.dispatchEvent(new Event(`change`,{bubbles:!0})),c=!1)};return{motion:r,springs:{[t]:al(r,e)},update(e){e.springs[t].set(o(e)),s(e)},connect(e){let n=new AbortController;return i(e).addEventListener(`click`,e=>{e.detail&&e.preventDefault()},{signal:n.signal}),i(e).addEventListener(`change`,()=>{c||(e.data[t]=i(e).checked?a(e):0,e.def.update?.(e))},{signal:n.signal}),s(e),()=>n.abort()},hold(s,c){let u=c*n/(2*Math.PI),d=o(s),f=a(s);if(!i(s).checked&&(u<=0||!(e.catches?.(s)??!0)))return!1;let p=H(d+u,0,f);return p===d||(s.data[t]=p,p===f&&u>0&&Ve(s,`stop`,Math.min(Math.abs(u)*20,10)*ml[r.landing],{motion:r}),l(s,p>0),s.def.update?.(s)),!0},value:e=>H(e.springs[t].value/(a(e)||1),0,1),depth:n=>Math.max(n.springs[t].value,0)*$(e.pitch,n),angle:e=>e.springs[t].value*2*Math.PI*n}}function Yl(e){let t=Zc(e,e.joint,{seats:!!e.touch||e.seat!==void 0}),{name:n}=e,[r,i]=e.range,a=`pull:${n}`,o=t=>t.el.querySelectorAll(`input`)[e.input??0],s=e.track??Ml(e,o),c=t=>(e.axis?$(e.axis,t):`x`)===`x`,l=t=>s.scale(t)/($(e.travel,t)*4),u=e=>{let{min:t,max:n}=s.reach(e);return[t,n-t]},d=new WeakMap;return{motion:t,springs:{[n]:al(t,e)},update(e){let t=e.springs[n],[o,c]=u(e),{step:l}=s.reach(e);t.notches(l&&c/l>1.5?l/c*(i-r):0),t.set(r+(i-r)*((s.read(e)-o)/c+(e.data[a]??0)))},ends:()=>[r,i],carried(t){let a=t.data[Ja(n)],[o,s]=u(t),l=a===void 0?H((t.springs[n].value-r)/(i-r),0,1):(a-o)/s;if(e.pin)return{...Yc,rotate:l*$(e.pin.sweep,t),pin:$(e.pin.at,t)};if(e.joint===`hinge`)return Yc;let d=$(e.travel,t)*4*l;return{...Yc,x:c(t)?d:0,y:c(t)?0:d}},connect(r){let i=new AbortController,{signal:f}=i;e.input!==void 0&&Nl(r,e,o(r)),e.dress?.(r,f);let p=t=>{let n=r.el.getBoundingClientRect(),[i,a]=u(r),o=H(c(r)?(t.clientX-n.left)/n.width:(t.clientY-n.top)/n.height,0,1);return i+($(e.travel,r)<0?1-o:o)*a},m=()=>{let[t,n]=u(r);return e.catches!==void 0&&(s.read(r)-t)/n>=e.catches},h=()=>{let[t,n]=u(r);return m()?t+n:t+(e.home??0)*n},g=Sl(r,f,{motion:t,track:s,spring:n,pull:a,accepts:e.accepts,focus:e=>e.el.querySelector(`button`)??e.el,grab(t,n){let[r,i]=Re(t.el),a=t.el.getBoundingClientRect(),o=a.width/r/t.w||1,[s,l]=e.pin?$(e.pin.at,t):[0,0];d.set(t,{k:o*(c(t)?r:i),x:a.left+s*o,y:a.top+l*o,last:[n.clientX,n.clientY]})},by(t,n,r,i){let a=d.get(t),[o,u]=a.last;return a.last=[n.clientX,n.clientY],e.pin?et(o-a.x,u-a.y,n.clientX-a.x,n.clientY-a.y,Ll)/$(e.pin.sweep,t)*s.scale(t):(c(t)?r:i)/a.k*l(t)},seat:e.touch?(e,t)=>p(t):e.seat===void 0?void 0:t=>{let[n,r]=u(t);return n+e.seat*r},past:t=>e.touch?1/0:gl*Math.abs(l(t)),hold:e.catches===void 0?void 0:(e,t)=>t<0&&m(),radians:e=>1/(Math.abs(l(e))*Ll),scroll:e.return||e.touch||e.noWheel?void 0:e=>Math.abs(l(e)),rest:e.return?h:void 0});return e.return&&e.input!==void 0&&o(r).addEventListener(`keyup`,()=>s.write(r,h()),{signal:f}),e.catches!==void 0&&e.input!==void 0&&o(r).addEventListener(`keydown`,e=>{m()&&e.key!==`Tab`&&e.preventDefault()},{signal:f}),e.click&&jl(r,f,g,t=>{let[n,i]=u(r);e.input===void 0||wl(o(r))?s.write(r,s.read(r)<n+i/2?n+i:n):s.write(r,p(t))},e.accepts),e.jump&&$(e.jump,r)&&jl(r,f,g,e=>s.write(r,p(e)),e.accepts,!0),()=>i.abort()}}}var Xl=e=>e.el.querySelector(`button`),Zl=(e,t)=>{let n=Xl(e);n&&(e.el.style.pointerEvents=`none`,n.style.cssText=`position:absolute;inset:0;appearance:none;background:none;border:0;padding:0;outline:none;pointer-events:auto;${t}`)},Ql=15;function $l(e){let{axis:t=`x`,name:n=`slide`}=e,r=e.input!==void 0,i=new WeakMap,a=e=>+(e.el.getAttribute(`slide`)??0),o={read:a,write(e,t){e.el.setAttribute(`slide`,String(t)),Xl(e)?.setAttribute(`aria-valuenow`,String(t))},reach(t){let n=$(Cl(e).count??0,t),r=$(Cl(e).every??0,t);return{min:0,max:1,step:e.detents?n>1?1/(n-1):r/Math.abs($(e.travel,t)):0}},scale:()=>1},s=t=>t.el.querySelectorAll(`input`)[e.input??0],c=e.marks&&{read:t=>$(e.marks,t)[s(t).valueAsNumber-We(s(t))[0]]??0,write(t,n){let r=$(e.marks,t),i=r.reduce((e,t,i)=>Math.abs(t-n)<Math.abs(r[e]-n)?i:e,0)+We(s(t))[0];i!==s(t).valueAsNumber&&(Qe(s(t),i),Ve(t,`detent`,Ql))},reach:()=>({min:0,max:1,step:0}),scale:()=>1},l=Yl({...e,joint:`slide`,name:n,axis:t,range:[0,1],click:e.click??!r,...c&&{track:c},...!r&&{track:o,dress(e,t){let n=Xl(e);n&&(Zl(e,`cursor:grab`),n.setAttribute(`role`,`slider`),n.setAttribute(`aria-valuemin`,`0`),n.setAttribute(`aria-valuemax`,`1`),n.setAttribute(`aria-valuenow`,e.el.getAttribute(`slide`)??`0`),n.addEventListener(`keydown`,t=>{let n={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[t.key];n&&(t.preventDefault(),o.write(e,H(a(e)+n*(o.reach(e).step||.1),0,1)))},{signal:t}))}}});return c&&(l.motion.coast=0),{...l,...!r&&{live:[`slide`,`style`,`aria-valuenow`]},value:e=>H(e.springs[n].value,0,1),place(r){let a=$(e.travel,r)*4*H(r.springs[n].value,0,1),o=t===`x`?a:0,s=t===`y`?a:0;if(i.get(r)!==a){i.set(r,a);let e=Xl(r);e&&(e.style.transform=`translate(${o}px, ${s}px)`)}return{at:[r.x+o,r.y+s]}}}}function eu(e={}){let t=t=>$(e.stops?.at??[0,90],t).map(e=>e*Pl),n=t=>e.at?$(e.at,t):[0,0],r=new WeakMap,i={read:e=>+e.el.hasAttribute(`open`),write(e,t){let n=e.el.toggleAttribute(`open`,t>=.5);Xl(e)?.setAttribute(`aria-pressed`,String(n))},reach:()=>({min:0,max:1,step:1}),scale:()=>1};return{...Yl({detents:!0,contact:`toggle`,travel:10,...e,joint:`hinge`,name:`hinge`,range:[-1,1],input:e.input?0:void 0,click:!0,noWheel:!0,...e.at&&{pin:{at:e.at,sweep:e=>{let[n,r]=t(e);return r-n}}},...!e.input&&{track:i,dress(e){Zl(e,`cursor:pointer`),Xl(e)?.setAttribute(`aria-pressed`,String(e.el.hasAttribute(`open`)))}}}),...!e.input&&{live:[`open`,`style`,`aria-pressed`]},value:e=>H((e.springs.hinge.value+1)/2,0,1),place(e){let[i,a]=t(e),o=i+(a-i)*H((e.springs.hinge.value+1)/2,0,1),[s,c]=n(e);if(r.get(e)!==o){r.set(e,o);let t=Xl(e)?.style;t&&(t.transformOrigin=`${s}px ${c}px`,t.transform=`rotate(${o-i}rad)`)}return{at:[e.x+s,e.y+c],rotate:o}}}}var tu=8,nu=4,ru=2,iu=.4,au=new WeakMap,ou=typeof matchMedia==`function`?matchMedia(`(orientation: portrait)`):null;function su(e){let t=au.get(e);if(t)return t;let n=[],r=new Map,i={things:n,places:r,lay:()=>{let t=n.filter(e=>e.out()).sort((e,t)=>e.since-t.since),i=tu*4,a=e.offsetWidth,o=e.offsetHeight,s=!!ou?.matches,c=`${Math.max(0,...n.map(e=>s?e.el.offsetHeight:e.el.offsetWidth))+i*2}px`,[l,u]=s?[``,c]:[c,``];(e.style.marginRight!==l||e.style.marginBottom!==u)&&(e.style.marginRight=l,e.style.marginBottom=u,ka(e));for(let[e,n]of r)t.includes(e)||(n.remove(),r.delete(e));for(let e of n)e.el.style.zIndex=t.includes(e)?String(t.indexOf(e)+1):``;let d=e.getBoundingClientRect().width/a||1,f=t.length>1?(s?a-t.at(-1).el.offsetWidth:o-t.at(-1).el.offsetHeight)/(t.length-1):0,p=0;for(let n of t){let t=n.el.offsetWidth,c=n.el.offsetHeight,l=r.get(n);l||(l=document.createElement(`div`),l.dataset.place=``,l.setAttribute(`aria-hidden`,`true`),r.set(n,l),e.append(l));let u=parseFloat(n.el.getAttribute(`radius`)??``)||2,[m,h]=s?[p,o+i]:[a+i,p];l.style.cssText=`position:absolute;left:${m}px;top:${h}px;width:${t}px;height:${c}px;box-sizing:border-box;border:${1/d}px solid currentColor;border-radius:${u*4}px;opacity:.25;pointer-events:none`,n.place=[(m-n.el.offsetLeft)/4,(h-n.el.offsetTop)/4],n.rest(),p+=Math.min((s?t:c)+i,f)}}};return au.set(e,i),i}function cu(e,t){let n=new AbortController,{signal:r}=n,i=t.axis??`y`,a=Math.sign(t.run??0),o=Math.abs(t.run??0),s=t.near??10,c=t.twist??0,l=e[0].parentElement,u=su(l),d=0,f=0,p=e.map(e=>{let t={el:e,x:0,y:0,vx:0,vy:0,grip:-1,from:[0,0,0,0],home:!1,turn:+(e.getAttribute(`twist`)??0),turning:!1,shelved:!1,drawn:null,place:null,since:0,out:()=>!e.hasAttribute(`seated`)&&!t.home,rest:()=>{!t.shelved||t.grip>=0||!t.place||(f=performance.now(),d||=requestAnimationFrame(j))}};return t});u.things.push(...p);let m=e=>c?0:a*(i===`y`?e.y:e.x),h=e=>c?Math.hypot(e.x,e.y):i===`y`?e.x:e.y,g=e=>(e.el.parentElement.getBoundingClientRect().width/e.el.parentElement.offsetWidth||1)*4,_=e=>{let{el:n}=e,r=n.parentElement,i=document.createElement(`d-surface`),a=n.offsetLeft,o=n.offsetTop;for(let e=t.seat;e&&e!==r;e=e.offsetParent)a-=e.offsetLeft,o-=e.offsetTop;for(let e of[`material`,`radius`,`height`,`bevel`,`path`,`viewbox`,`rule`,`shape`,`twist`])n.hasAttribute(e)&&i.setAttribute(e,n.getAttribute(e));return i.style.cssText=`position:absolute;left:${a}px;top:${o}px;width:${n.offsetWidth}px;height:${n.offsetHeight}px`,i.append(...[...n.children].filter(e=>e.localName!==`canvas`).map(e=>e.cloneNode(!0))),i.inert=!0,i.setAttribute(`aria-hidden`,`true`),x(n,i),t.seat.append(i),i},v=(e,t)=>{let n=!1,i=()=>{n||(n=!0,clearTimeout(a),e.removeEventListener(`lit`,i),t())},a=setTimeout(i,400);e.addEventListener(`lit`,i,{signal:r})},y=t.seat.closest(`d-device`),b=y.hasAttribute(`reverse`)?`back`:y.getAttribute(`side`)||`front`;for(let e of p)e.el.dataset.face=b;let x=(e,t)=>{let n=t.querySelectorAll(`input`);e.querySelectorAll(`input`).forEach((e,t)=>{let r=n[t];!r||r.value===e.value&&r.checked===e.checked||(r.value=e.value,r.checked=e.checked,r.dispatchEvent(new Event(`input`)))})},S=e=>{let t=e.el.hasAttribute(`seated`);t&&!e.drawn&&(e.drawn=_(e),v(y,()=>{e.drawn&&e.el.removeAttribute(`moving`)})),t||(e.el.toggleAttribute(`moving`,!0),e.drawn?.remove(),e.drawn=null),e.drawn&&(e.drawn.style.translate=e.el.style.translate,e.drawn.getAttribute(`twist`)!==e.el.getAttribute(`twist`)&&e.drawn.setAttribute(`twist`,e.el.getAttribute(`twist`)??`0`))},C=!1,w=0,T=(e,n=0)=>{clearTimeout(w),C=e,t.release?.setAttribute(`aria-pressed`,String(e)),e&&n&&(w=window.setTimeout(()=>T(!1),n*1e3))};t.release&&(t.release.setAttribute(`aria-pressed`,`false`),t.release.addEventListener(`click`,()=>T(!0,nu),{signal:r}));let E=(e,t)=>{e.turn=Math.abs(t)<.05?0:t,e.turn?e.el.setAttribute(`twist`,e.turn.toFixed(1)):e.el.removeAttribute(`twist`),S(e)},D=(e,t)=>{let n=e.el.getBoundingClientRect();return Math.atan2(t.clientX-n.x-n.width/2,-(t.clientY-n.y-n.height/2))*180/Math.PI},O=e=>e.el.getAttribute(`aria-disabled`)===`true`,k=e=>{e.el.style.translate=e.x||e.y?`${(e.x*4).toFixed(2)}px ${(e.y*4).toFixed(2)}px`:``,S(e)},A=(e,t)=>{e.el.hasAttribute(`seated`)!==t&&(e.el.toggleAttribute(`seated`,t),S(e),e.el.dispatchEvent(new CustomEvent(`plug`,{bubbles:!0,detail:{seated:t}})))},j=e=>{d=0;let t=Math.min((e-f)/1e3||1/60,1/30);f=e;for(let e of p){let n=e.home?[0,0]:e.shelved&&e.grip<0?e.place:null;n&&(e.vx+=(-du*(e.x-n[0])-fu*e.vx)*t,e.vy+=(-du*(e.y-n[1])-fu*e.vy)*t,e.x+=e.vx*t,e.y+=e.vy*t,e.home&&!e.el.hasAttribute(`seated`)&&Math.abs(h(e))<.5&&m(e)<o&&(i===`y`?e.x=e.vx=0:e.y=e.vy=0,A(e,!0)),Ge()||Math.hypot(e.x-n[0],e.y-n[1])<.05?([e.x,e.y]=n,e.vx=e.vy=0,e.home&&(e.home=!1,A(e,!0),e.el.style.zIndex=``),k(e)):(k(e),d||=requestAnimationFrame(j)))}};addEventListener(`resize`,u.lay,{signal:r});for(let e of p){let{el:t}=e;t.addEventListener(`pointerdown`,n=>{if(n.button||e.grip>=0)return;let r=!!c&&t.hasAttribute(`seated`);(!r||!O(e)&&(C||e.turn))&&(e.turning=r,r&&(T(!0),e.from=[D(e,n),e.turn,0,0]),n.preventDefault(),n.stopPropagation(),qe(t,n),t.hasAttribute(`seated`)||(t.style.zIndex=String(u.things.length+1)),e.grip=n.pointerId,e.home=!1,r||(e.from=[n.clientX,n.clientY,e.x,e.y]))},{capture:!!c,signal:r}),t.addEventListener(`pointermove`,n=>{if(n.pointerId===e.grip){if(e.turning){let r=(D(e,n)-e.from[0]+540)%360-180,i=e.from[1]+r,a=Math.sign(c);E(e,a*Math.min(Math.max(i*a,0),Math.abs(c))),Math.abs(e.turn)>=Math.abs(c)?(e.turning=!1,T(!1),t.style.zIndex=String(u.things.length+1),A(e,!1),e.since=performance.now(),u.lay(),e.from=[n.clientX,n.clientY,e.x,e.y]):e.from=[D(e,n),e.turn,0,0]}else{if(e.x=e.from[2]+(n.clientX-e.from[0])/g(e),e.y=e.from[3]+(n.clientY-e.from[1])/g(e),t.hasAttribute(`seated`)){if(m(e)>=o&&!O(e))t.style.zIndex=String(u.things.length+1),A(e,!1),e.since=performance.now(),u.lay();else{let t=Math.min(Math.max(m(e),0),O(e)?iu:o)*a;e.x=i===`x`?t:0,e.y=i===`y`?t:0}}k(e)}}},{signal:r});for(let n of[`pointerup`,`pointercancel`])t.addEventListener(n,n=>{if(n.pointerId!==e.grip)return;if(e.grip=-1,e.turning){e.turning=!1,T(!1),Math.abs(e.turn)<ru&&E(e,0);return}let r=!p.some(t=>t!==e&&(t.el.hasAttribute(`seated`)||t.home));e.home=t.hasAttribute(`seated`)||r&&!O(e)&&Math.abs(h(e))<s&&m(e)>-s&&m(e)<o+s,e.shelved=!e.home,u.lay(),f=performance.now(),d||=requestAnimationFrame(j)},{signal:r})}for(let e of p)e.shelved=!e.el.hasAttribute(`seated`);u.lay(),ou?.addEventListener(`change`,()=>u.lay(),{signal:r});for(let e of p)e.shelved&&e.place&&([e.x,e.y]=e.place),k(e);return()=>{n.abort(),cancelAnimationFrame(d);for(let e of p)e.drawn?.remove(),u.places.get(e)?.remove(),u.places.delete(e),u.things.splice(u.things.indexOf(e),1)}}var lu=500,uu=30,du=180,fu=16,pu=5,mu=7;function hu(e,t){let n=t.reach??40,r=new AbortController,{signal:i}=r,a=[0,0];e.toggleAttribute(`carried`,!0);let o=0,s=0,c=0,l=0,u=-1,d=0,f=0,p=[0,0,0,0],m=0,h=0,g=0,_=()=>e.getBoundingClientRect().width/e.offsetWidth||1,v=()=>{e.style.transform=Ge()||!o&&!s?``:`translate(${(o*4).toFixed(2)}px,${(s*4).toFixed(2)}px) rotate(${(o*.05).toFixed(3)}deg)`},y=e=>{[(o-h)/e,(s-g)/e].forEach((e,n)=>{let r=a[n];Math.abs(e)<uu||(r&&Math.sign(e)!==Math.sign(r)&&t.jolt(Math.min((Math.abs(e)+Math.abs(r))/lu,1)),a[n]=e)}),h=o,g=s},b=e=>{d=0;let t=Math.min((e-f)/1e3||1/60,1/30),n=e*.001*pu*Math.PI*2;if(f=e,m>e){let t=mu*Math.min((m-e)/1e3*3,1);o=t*Math.sin(n),s=t*.45*Math.sin(n+1)}else u<0&&(c+=(-180*o-fu*c)*t,l+=(-180*s-fu*l)*t,o+=c*t,s+=l*t,Math.hypot(o,s)<.02&&Math.hypot(c,l)<.2&&(o=s=c=l=0));y(t),v(),(u>=0||m>e||o||s)&&(d=requestAnimationFrame(b))},x=()=>{d||=(f=performance.now(),requestAnimationFrame(b))};e.addEventListener(`pointerdown`,t=>{t.target!==e||t.button||u>=0||(t.preventDefault(),e.focus({preventScroll:!0}),qe(e,t),u=t.pointerId,p=[t.clientX,t.clientY,o,s],c=l=0,x())},{signal:i}),e.addEventListener(`pointermove`,e=>{if(e.pointerId!==u)return;let t=_()*4,r=e=>n*Math.tanh(e/n);o=r(p[2]+(e.clientX-p[0])/t),s=r(p[3]+(e.clientY-p[1])/t)},{signal:i});for(let t of[`pointerup`,`pointercancel`])e.addEventListener(t,e=>{e.pointerId===u&&(u=-1)},{signal:i});return{shake(e=1200){m=performance.now()+e,x()},stop(){r.abort(),cancelAnimationFrame(d),e.removeAttribute(`carried`),e.style.transform=``}}}var gu=1.7,_u=27,vu=.25;function yu(e){let t=Zc({mass:1,material:`steel-on-steel`,contact:!1},`pluck`),n=new WeakMap,r=e=>{let t=n.get(e);return t||n.set(e,t={ring:[],held:-1,x:0,y:0}),t},i=([e,t,n,r],i,a)=>{let o=n-e,s=r-t,c=Math.hypot(o,s)||1;return{at:H(((i-e)*o+(a-t)*s)/(c*c),.02,.98),off:((a-t)*o-(i-e)*s)/c}},a=()=>yc().schedule();return{motion:t,connect(t){let n=r(t),o=t.el,s=(e.pull??3)*4,c=()=>e.strings(t),l=(e,t,r,i)=>{n.ring[e]={at:t,by:r,swing:Math.abs(r)||s*i,phase:0},o.dispatchEvent(new CustomEvent(`pluck`,{bubbles:!0,detail:{string:e,at:t,force:H(i,.05,1)}})),a()},u=Ze(o,()=>{let e=o.offsetWidth,t=o.offsetHeight;return{x:0,y:0,w:e,h:t,cols:e,rows:t}},{down(e,t){let r=c(),o=-1,l=1/0;if(r.forEach((n,r)=>{let a=Math.abs(i(n,e,t).off);a<l&&([o,l]=[r,a])}),o<0)return!1;n.held=o,n.x=e,n.y=t;let{at:u,off:d}=i(r[o],e,t);return n.ring[o]={at:u,by:H(d,-s,s),swing:0,phase:0},a(),!0},move(e,t){let r=c(),o=r.map((r,a)=>({i:a,was:i(r,n.x,n.y).off,now:i(r,e,t).off})).filter(e=>e.i!==n.held&&e.was*e.now<0).sort((e,t)=>Math.abs(e.was)-Math.abs(t.was));if(n.held>=0){let{at:a,off:c}=i(r[n.held],e,t);Math.abs(c)>=s||o.length?(l(n.held,a,H(c,-s,s),1),n.held=-1):n.ring[n.held]={at:a,by:c,swing:0,phase:0}}let u=Math.hypot(e-n.x,t-n.y);for(let a of o){let{at:o,off:c}=i(r[a.i],e,t);u<s&&n.held<0?(n.held=a.i,n.ring[a.i]={at:o,by:c,swing:0,phase:0}):l(a.i,o,Math.sign(c||1)*s*.8,H(u/(s*4),.35,1))}n.x=e,n.y=t,a()},up(){if(n.held<0)return;let e=n.ring[n.held];l(n.held,e.at,e.by,H(.55+Math.abs(e.by)/s,0,1)),n.held=-1}});o.style.cursor=`grab`;let d=new AbortController;return o.querySelectorAll(`button`).forEach((e,t)=>{e.addEventListener(`click`,e=>{e.detail||l(t,.2,s*.8,.7)},{signal:d.signal})}),()=>{u(),d.abort()}},tick(e,t){let n=r(e),i=Ge(),a=n.held>=0;return n.ring.forEach((e,r)=>{e&&r!==n.held&&(e.swing*=Math.exp(-t*gu),e.phase+=t*Math.PI*2*(_u+r*3),e.by=i||e.swing<vu?0:e.swing*Math.cos(e.phase),e.by&&(a=!0))}),a},shape(e,t){let n=r(e).ring[t];return n?{at:n.at,by:n.by}:{at:.5,by:0}}}}var bu=0,xu=1,Su=2,Cu=3,wu=4,Tu=[20,20,20,12,26],Eu=4,Du=2,Ou=6,ku=.14,Au=.35,ju=.02;function Mu(e){let t=Zc({mass:2,material:`plastic-on-plastic`,contact:!1},`sheaf`),n=new WeakMap,r=()=>yc().schedule(),i=(e.spread??95)*Math.PI/180,a=e=>{let t=n.get(e);if(t)return t;let r=[...e.el.querySelectorAll(`:scope > [leaf]`)].map((e,t)=>({el:e,n:t,x:0,y:0,a:0,f:0,z:0,covered:!1,cased:!1,to:[0,0,0,0,0],v:[0,0,0,0,0],held:!1,skew:(t*7919%13/12-.5)*3*Math.PI/180,label:``})),i={};return e.el.querySelectorAll(`:scope > [grip]`).forEach(e=>i[e.getAttribute(`grip`)]=e),n.set(e,t={leaves:r,pile:[...r],order:[...r],home:[0,0],origin:[0,0],fan:0,cut:null,spots:[],dealt:0,cuts:0,cased:!1,then:null,grip:i}),t},o=(e,t)=>{let{spots:n}=a(e),r=Math.floor(n.length/2);if(!r)return[e.w*1.2,0];let i=Math.min(t,r-1);return[n[i*2],n[i*2+1]]},s=t=>{let n=a(t),{pile:o,order:s,fan:c,cut:l}=n,[u,d]=n.origin,[f,p]=e.pin?.(t)??[0,0],m=o.length,h=m-(l?.n??0);o.forEach((e,t)=>{let n=t>=h&&l,r=m>1?t/(m-1):0,a=c*i*r,o=Math.cos(a),s=Math.sin(a),g=(1-c)*4*ku,_=(e.n*37%7/3-1)*g,v=(e.n*53%5/2-1)*g;e.to[bu]=(n?l.x:u)+f-o*f+s*p+_,e.to[xu]=(n?l.y:d)+p-s*f-o*p+v,e.to[Su]=a});let g=[],_=(e,n)=>g.reduce((r,i)=>Math.abs(i.x-e)<t.w*.95&&Math.abs(i.y-n)<t.h*.95?Math.max(r,i.top):r,0),v=new Set(o),y=e.thick,b=-1;for(let e of s)if(v.has(e)){if(b<0){b=n.cased?0:_(u,d);let e=y*(1-c*.8);o.slice(0,h).forEach((t,n)=>t.to[wu]=b+n*e+(t.held?Du:0));let t=l?_(l.x,l.y)+Du:0;o.slice(h).forEach((n,r)=>n.to[wu]=t+r*e),g.push({x:u,y:d,top:b+h*e})}}else{let t=_(e.to[bu],e.to[xu]);e.to[wu]=t+(e.held?Du:0),g.push({x:e.to[bu],y:e.to[xu],top:t+y})}let x=o[m-1],S=c>ju;s.forEach((t,r)=>{t.cased=n.cased&&v.has(t);let i=!n.cased&&(!v.has(t)||t===x||S||l&&o.indexOf(t)===h-1),a=t.el.style,s=`translate(${t.to[bu].toFixed(2)}px, ${t.to[xu].toFixed(2)}px)`,c=`rotate(${t.to[Su].toFixed(4)}rad)`;a.transform!==`${s} ${c}`&&(a.transform=`${s} ${c}`),a.zIndex!==String(r+1)&&(a.zIndex=String(r+1));let u=i?`auto`:`none`;a.pointerEvents!==u&&(a.pointerEvents=u);let d=i?0:-1;t.el.tabIndex!==d&&(t.el.tabIndex=d);let f=t.to[Cu]>.5?e.named(t.el):`A card, face down`;t.label!==f&&t.el.setAttribute(`aria-label`,t.label=f)});let C=(e,t,r=0,i=0)=>{let a=n.grip[e];if(!a)return;let o=a.style,s=t?`auto`:`none`,c=`translate(${r.toFixed(2)}px, ${i.toFixed(2)}px)`;o.pointerEvents!==s&&(o.pointerEvents=s),o.transform!==c&&(o.transform=c),a.tabIndex!==(t?0:-1)&&(a.tabIndex=t?0:-1)},w=m>1,T=!S&&!l&&!n.cased;C(`cut`,w&&T,u,d),C(`over`,w&&T,u,d),C(`spread`,w&&!n.cased&&!l,u,d),C(`take`,n.cased,0,0),C(`away`,!n.cased,0,0),r()},c=(e,...t)=>{let n=new Set(t);e.order=[...e.order.filter(e=>!n.has(e)),...t]},l=e=>c(e,...e.pile),u=(e,t)=>{let n=a(e),r=n.pile.indexOf(t);r>=0&&n.pile.splice(r,1),c(n,t);let[i,l]=o(e,n.dealt++);t.to[bu]=i,t.to[xu]=l,t.to[Su]=t.skew,s(e)},d=e=>{e.to[Cu]=e.to[Cu]>.5?0:1},f=(e,t)=>{let n=a(e),r=n.pile.length;r<2||n.cased||(l(n),n.cut={n:H(Math.round(r*(.3+.4*t)),1,r-1),x:n.origin[0],y:n.origin[1]},s(e))},p=e=>{let t=a(e),{cut:n}=t;if(!n)return;let r=t.pile.length,i=t.pile.slice(0,r-n.n);t.pile=[...t.pile.slice(r-n.n),...i],t.order=[...t.order.filter(e=>!t.pile.includes(e)),...t.pile],t.origin=[n.x,n.y],t.cut=null,t.cuts++,s(e),t.then=()=>{t.origin=[...t.home],s(e)}},m=t=>{let n=a(t);f(t,.35+n.cuts*5%7/20),n.cut&&(n.cut.x=n.origin[0]+(e.cut??t.w/4+8)*4,n.cut.y=n.origin[1],s(t),n.then=()=>p(t))},h=(e,t)=>{let n=a(e),r=H(t,0,1);if(r===n.fan)return;n.fan===0&&l(n),n.fan=r;let i=n.grip.spread;i&&i.valueAsNumber!==r&&Qe(i,r),s(e)},g=e=>{let t=a(e);if(!(t.pile.length<2||t.cased)){l(t),t.pile.reverse(),t.order=[...t.order.filter(e=>!t.pile.includes(e)),...t.pile];for(let e of t.pile)d(e);s(e)}},_=t=>{let n=a(t);if(n.cased){if(e.open&&!e.open(t))return e.opening?.(t);n.origin=[...n.home],s(t),n.then=()=>{n.cased=!1,s(t)}}},v=t=>{let n=a(t),r=e.seat?.(t);if(n.cased||!r)return;e.open&&!e.open(t)&&e.opening?.(t),n.fan=0,n.cut=null,n.dealt=0;let i=n.grip.spread;i&&i.valueAsNumber&&Qe(i,0),n.pile=[...n.pile,...n.order.filter(e=>!n.pile.includes(e))],n.order=[...n.pile],n.origin=[...n.home];for(let e of n.pile)e.to[Cu]=0;s(t),n.then=()=>{n.cased=!0,n.origin=[...r],s(t)}};return{motion:t,live:[`style`,`aria-label`,`tabindex`,`value`,`aria-valuenow`],connect(t){let n=new AbortController,{signal:r}=n,i=a(t),o=e.seat?.(t);t.el.style.pointerEvents=`none`;for(let e of i.leaves)e.el.style.cssText=`position:absolute;inset:0;appearance:none;background:none;border:0;padding:0;outline:none;cursor:grab;transform-origin:50% 50%`;for(let e of Object.values(i.grip))e&&(e.style.pointerEvents=`auto`);if(o){i.cased=!0,i.origin=[...o];for(let e of i.leaves)e.x=o[0],e.y=o[1]}s(t);for(let e of i.leaves)e.x=e.to[bu],e.y=e.to[xu],e.z=e.to[wu];let y=()=>t.el.getBoundingClientRect().width/t.w||1,b=null;Xe(t,r,{accepts(e){let n=e.target.closest?.(`[leaf], [grip]`);return!!n&&n.parentElement===t.el},start(e){let t=e.target.closest(`[leaf], [grip]`),n=t.getAttribute(`grip`)??`leaf`;if(b={kind:n,moved:0,x:0,y:0,fan:i.fan},n===`leaf`&&(b.leaf=i.leaves.find(e=>e.el===t)),i.then=null,n===`cut`){let n=t.getBoundingClientRect();b.fan=H((e.clientY-n.top)/n.height,0,1)}},move(e,n,r){if(!b)return;let a=y(),o=n/a,l=r/a;if(b.moved+=Math.hypot(n,r),b.x+=o,b.y+=l,!(b.moved<Eu)){if(b.kind===`leaf`&&b.leaf){let e=b.leaf,n=i.pile.indexOf(e);e.held||(n>=0&&i.pile.splice(n,1),e.held=!0,c(i,e),e.to[Su]=e.a),e.to[bu]=e.x+=o,e.to[xu]=e.y+=l,s(t)}else b.kind===`cut`?(i.cut||f(t,b.fan),i.cut&&(i.cut.x=i.origin[0]+b.x,i.cut.y=i.origin[1]+b.y,s(t))):b.kind===`spread`&&h(t,b.fan+b.x/(t.w*1.1))}},end(){if(!b)return;let{kind:e,leaf:n,moved:r}=b,a=r<Eu;if(b=null,e===`leaf`&&n){if(a){i.pile.includes(n)?u(t,n):(c(i,n),d(n),s(t));return}n.held=!1,Math.abs(n.x-i.origin[0])<t.w*Au&&Math.abs(n.y-i.origin[1])<t.h*Au&&!i.cased&&!i.fan&&(i.pile.push(n),l(i)),s(t)}else e===`cut`?a?m(t):i.cut&&Math.hypot(i.cut.x-i.origin[0],i.cut.y-i.origin[1])>t.w/2?p(t):(i.cut=null,s(t)):e===`spread`?a&&h(t,i.fan>.5?0:1):a&&e===`over`?g(t):a&&e===`take`?_(t):a&&e===`away`&&v(t)}});for(let e of i.leaves)e.el.addEventListener(`click`,n=>{n.detail||(i.pile.includes(e)?u(t,e):(d(e),s(t)))},{signal:r});let x={cut:()=>m(t),over:()=>g(t),take:()=>_(t),away:()=>v(t)};for(let[e,t]of Object.entries(x))i.grip[e]?.addEventListener(`click`,e=>{e.detail||t()},{signal:r});return i.grip.spread?.addEventListener(`input`,e=>h(t,e.target.valueAsNumber),{signal:r}),()=>n.abort()},tick(e,t){let n=a(e),r=Ge(),i=!1,o=Math.max(1,Math.ceil(t/(1/240))),s=t/o;for(let e of n.leaves){let t=[e.x,e.y,e.a,e.f,e.z],n=!1;for(let i=0;i<5;i++){let a=t[i],c=e.v[i],l=e.to[i];if(a!==l||c){if(n=!0,r||e.held&&i!==wu)a=l,c=0;else{let e=Tu[i];for(let t=0;t<o;t++)c+=(e*e*(l-a)-2*e*c)*s,a+=c*s;Math.abs(l-a)<(i===Su||i===Cu?8e-4:.02)&&Math.abs(c)<.5&&(a=l,c=0)}t[i]=a,e.v[i]=c}}n&&([e.x,e.y,e.a,e.f,e.z]=t,i=!0)}if(!i&&n.then){let e=n.then;return n.then=null,e(),!0}return i},leaves(e){let{order:t}=a(e);return t.forEach((e,n)=>{let r=t[n+1];e.covered=!!r&&r.cased===e.cased&&Math.abs(r.x-e.x)<4&&Math.abs(r.y-e.y)<4&&Math.abs(r.a-e.a)<.002&&Math.abs(r.f-e.f)<.002&&(e.f===0||e.f===1)}),t},deals(e,t){a(e).spots=t.map(e=>e*4)},lift:e=>Math.sin(Math.PI*e)*Ou,stack(e){let t=a(e);return{x:t.origin[0],y:t.origin[1],n:t.pile.length,cased:t.cased}}}}var Nu=1.65,Pu=.7,Fu=10,Iu=1;function Lu(e,t,n=0){let r=e*Math.PI/180,i=t*Math.PI/180,a=n*Math.PI/180,o=-Math.cos(r)*Math.sin(i),s=Math.sin(r);return[o*Math.cos(a)-s*Math.sin(a),o*Math.sin(a)+s*Math.cos(a)]}function Ru({look:e=6,onState:t}={}){let n=yc(),r=`waiting`,i=null,a=0,o=0,s=0,c=0,l=e=>{e!==r&&(r=e,t?.(r))},u=()=>globalThis.orientation??screen.orientation?.angle??0,d=()=>{i=null},f=t=>{if(t.beta===null||t.gamma===null||matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;r!==`on`&&(c=n.look,n.lampHeld=!0,Ec({look:e}),l(`on`));let[d,f]=Lu(t.beta,t.gamma,u()),p=performance.now(),m=Math.min((p-a)/1e3,.2)/Fu;a=p,i??=[d,f],i[0]+=(d-i[0])*m,i[1]+=(f-i[1])*m;let h=Math.sqrt(innerWidth*innerHeight)/2*Nu,g=e=>Math.max(-.7,Math.min(Pu,e)),_=innerWidth/2+g(d-i[0])*h,v=innerHeight/2-g(f-i[1])*h;Math.hypot(_-o,v-s)<Iu||(o=_,s=v,n.aim(_,v))};addEventListener(`deviceorientation`,f),addEventListener(`orientationchange`,d),screen.orientation?.addEventListener(`change`,d);let p=globalThis.DeviceOrientationEvent,m=e=>r===`on`||(l(e===`granted`?`waiting`:`denied`),e===`granted`);return p?.requestPermission&&(l(`ask`),p.requestPermission().then(m,()=>{})),{get state(){return r},ask:()=>p?.requestPermission?.().then(m,()=>!1)??Promise.resolve(!0),stop(){removeEventListener(`deviceorientation`,f),removeEventListener(`orientationchange`,d),screen.orientation?.removeEventListener(`change`,d),r===`on`&&(Ec({look:c}),n.letGo()),l(`waiting`)}}}export{ye as $,ga as A,Je as B,Ec as C,j as Ct,Za as D,Tc as E,dr as F,Qe as G,We as H,ur as I,Ve as J,rt as K,Rn as L,yr as M,br as N,Xa as O,lr as P,Te as Q,zn as R,Dc as S,he as St,Sc as T,de as Tt,Ze as U,V,Ge as W,je as X,Be as Y,_e as Z,Qc as _,F as _t,ll as a,T as at,ql as b,I as bt,dl as c,O as ct,Wl as d,k as dt,Ae as et,Zc as f,le as ft,$l as g,te as gt,Kl as h,ee as ht,cl as i,D as it,Dr as j,Oa as k,hu as l,ue as lt,cu as m,A as mt,Mu as n,Ee as nt,ul as o,N as ot,$c as p,M as pt,Ye as q,yu as r,E as rt,fl as s,L as st,Ru as t,Ce as tt,eu as u,pe as ut,il as v,w as vt,yc as w,ae as wt,Rl as x,me as xt,Jl as y,R as yt,qe as z};