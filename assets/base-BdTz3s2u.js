import{_ as e,a as t,b as n,c as r,d as i,f as a,g as o,h as s,m as c,o as l,p as u,s as d,t as f,u as p,v as m,x as h,y as g}from"./registry-B8W02Fcl.js";import{t as _}from"./preload-helper-CRzLMJPS.js";var v=.25;function y(e){let t=e.to[0]-e.from[0],n=e.to[1]-e.from[1],r=Math.hypot(t,n)||1,i=[t/r,n/r],a=e.drop??r*v,o=e.from[0]*i[0]+e.from[1]*i[1],s=e.mirror?e.mirror[0]*i[0]+e.mirror[1]*i[1]:o;return{dir:i,at:s,flat:o-s,reach:r,drop:a,k:e.past?-1:e.rigid?0:(a/v/r)**1.5,both:!!e.mirror}}var b=(e,t)=>e+t.k*(t.reach*Math.asin(Math.min(e/t.reach,1))-e);function x(e,t,n){let r=e*n.dir[0]+t*n.dir[1]-n.at,i=n.both&&r<0?-1:1,a=r*i-n.flat;if(a<=0||n.k<0)return[e,t];let o=0,s=n.reach;for(let e=0;e<16;e++){let e=(o+s)/2;b(e,n)<a?o=e:s=e}let c=(s-a)*i;return[e+n.dir[0]*c,t+n.dir[1]*c]}function S(e,t){return[[e.x,e.y],[e.x+e.w,e.y],[e.x,e.y+e.h],[e.x+e.w,e.y+e.h]].every(([e,n])=>{let r=e*t.dir[0]+n*t.dir[1]-t.at;return(t.both&&r<0?-r:r)<=t.flat})}function C(e,t){if(t.k<0)return e;let n=[[e.x,e.y],[e.x+e.w,e.y],[e.x,e.y+e.h],[e.x+e.w,e.y+e.h]].map(([e,n])=>x(e,n,t)),r=Math.min(...n.map(e=>e[0]))-2,i=Math.min(...n.map(e=>e[1]))-2,a=Math.max(...n.map(e=>e[0]))+2,o=Math.max(...n.map(e=>e[1]))+2;return{x:r,y:i,w:a-r,h:o-i}}var w={sine:0,vee:1,scoop:2};function T(e,t,n,r,i={}){return{type:`rect`,cx:e+n/2,cy:t+r/2,hw:n/2,hh:r/2,radius:Math.max(Math.min(i.radius??0,n/2,r/2),0),rotate:i.rotate??0,ripple:[0,0,0]}}function E(e,t,n,r={}){let[i,a,o]=r.scoop?[...r.scoop,w.scoop]:r.vee?[...r.vee,w.vee]:[...r.ripple??[0,0],w.sine];return{type:`rect`,cx:e,cy:t,hw:n,hh:n,radius:n,rotate:0,ripple:[i,a,o]}}function D(e,t,n,r,i,a){let o=n+a/2;return{type:`arc`,cx:e,cy:t,hw:o,hh:o,rotate:0,r:n,width:a,mid:(r+i)/2,half:Math.abs(i-r)/2}}function O(e,t,n,r,i,a){return{type:`capsule`,ax:e,ay:t,bx:n,by:r,ra:i,rb:a}}function k(e,t,n,r,i={}){return{type:`holes`,cx:e+n/2,cy:t+r/2,hw:n/2,hh:r/2,radius:i.radius??4,pitch:i.pitch??8,hole:i.hole??2.4,square:i.square??!1}}var A=e=>({type:`mask`,box:e});function j(e,t,n,r,i,a={}){let[o,s,c,l]=a.viewBox??[0,0,100,100];return{type:`field`,cx:t+r/2,cy:n+i/2,hw:r/2,hh:i/2,rotate:a.rotate??0,spread:a.spread??16,key:`p|${e}|${o},${s},${c},${l}|${Math.round(r)}x${Math.round(i)}|${a.rule??``}`,draw(t,n,r){t.scale(n/c,r/l),t.translate(-o,-s),t.fill(new Path2D(e),a.rule)}}}function M(e,t,n,r,i,a){return{type:`field`,cx:t+r/2,cy:n+i/2,hw:r/2,hh:i/2,rotate:a.rotate??0,spread:a.spread??8,key:`t|${e}|${a.font}|${a.letterSpacing??``}|${a.wordSpacing??``}|${a.align??``}|${Math.round(r)}x${Math.round(i)}`,draw(t,n,r){t.font=a.font,t.letterSpacing=a.letterSpacing||`0px`,t.wordSpacing=a.wordSpacing||`0px`,t.textBaseline=`middle`,t.textAlign=a.align??`center`,t.fillText(e,a.align===`left`?0:a.align===`right`?n:n/2,r/2)}}}function N(e,t,n,r,i,a={}){return{type:`field`,cx:t+r/2,cy:n+i/2,hw:r/2,hh:i/2,rotate:0,spread:a.spread??4,key:`i|${e.currentSrc||e.src}|${Math.round(r)}x${Math.round(i)}`,draw(t,n,r){let i=new OffscreenCanvas(Math.ceil(n),Math.ceil(r)),a=i.getContext(`2d`);a.drawImage(e,0,0,n,r),a.globalCompositeOperation=`source-in`,a.fillStyle=t.fillStyle,a.fillRect(0,0,n,r),t.drawImage(i,0,0)}}}function P(e,t,n,r,i,a={}){let[o,s,c,l]=i,u=(e,t,n)=>e?`A${e} ${e} 0 0 1 ${t} ${n}`:`L${t} ${n}`;return j(`M${o} 0H${n-s}${u(s,n,s)}V${r-c}${u(c,n-c,r)}H${l}${u(l,0,r-l)}V${o}${u(o,o,0)}Z`,e,t,n,r,{viewBox:[0,0,n,r],...a})}function F(e,t,n,r,i={}){return j(`M0 ${r}A${n} ${r} 0 1 1 ${2*n} ${r}A${n} ${r} 0 1 1 0 ${r}Z`,e-n,t-r,2*n,2*r,{viewBox:[0,0,2*n,2*r],spread:Math.max(n,r),...i})}var I=e=>+e.toFixed(3);function L(e){let t=e.length,n=``;for(let r=0;r<t;r++){let[i,a,o=0]=e[r],[s,c]=e[(r+t-1)%t],[l,u]=e[(r+1)%t],d=s-i,f=c-a,p=l-i,m=u-a,h=Math.hypot(d,f),g=Math.hypot(p,m),_=Math.acos(Math.max(-1,Math.min(1,(d*p+f*m)/(h*g))))/2,v=Math.min(o/Math.tan(_),h/2,g/2),y=v*Math.tan(_),b=`${I(i+d/h*v)} ${I(a+f/h*v)}`,x=`${I(i+p/g*v)} ${I(a+m/g*v)}`;n+=`${r?`L`:`M`}${b}`,y>0&&(n+=`A${I(y)} ${I(y)} 0 0 ${+(d*m-f*p<0)} ${x}`)}return`${n}Z`}function R(e){let t=e.length,n=n=>e[(n+t)%t],r=`M${I(n(0)[0])} ${I(n(0)[1])}`;for(let e=0;e<t;e++){let[t,i]=n(e-1),[a,o]=n(e),[s,c]=n(e+1),[l,u]=n(e+2);r+=`C${I(a+(s-t)/6)} ${I(o+(c-i)/6)} ${I(s-(l-a)/6)} ${I(c-(u-o)/6)} ${I(s)} ${I(c)}`}return`${r}Z`}function ee(e,t={}){let n=e.map(e=>e[0]),r=e.map(e=>e[1]),i=Math.min(...n),a=Math.min(...r),o=Math.max(...n)-i,s=Math.max(...r)-a;return j(L(e),i,a,o,s,{viewBox:[i,a,o,s],...t})}function z(e,t){switch(e.type){case`rect`:return{...e,hw:Math.max(e.hw+t,0),hh:Math.max(e.hh+t,0),radius:Math.max(e.radius+t,0)};case`capsule`:return{...e,ra:e.ra+t,rb:e.rb+t};case`arc`:return{...e,hw:e.hw+t,hh:e.hh+t,width:e.width+t*2};case`field`:return{...e,grow:(e.grow??0)+t,spread:Math.max(e.spread,Math.abs((e.grow??0)+t)+8)}}}function te(e,t){return e.type===`field`?{...e,ring:t,spread:Math.max(e.spread,t+Math.abs(e.grow??0)+8)}:{...e,ring:t}}function B(e,t){if(t.grow||t.ring)throw Error(`Combine shapes first, then grow or ring the result.`);if(e.save(),t.type===`capsule`){let n=Math.atan2(t.by-t.ay,t.bx-t.ax);e.beginPath(),e.arc(t.ax,t.ay,t.ra,n+Math.PI/2,n-Math.PI/2),e.arc(t.bx,t.by,t.rb,n-Math.PI/2,n+Math.PI/2),e.fill()}else if(e.translate(t.cx,t.cy),e.rotate(t.rotate),t.type===`rect`)e.beginPath(),e.roundRect(-t.hw,-t.hh,t.hw*2,t.hh*2,t.radius),e.fill();else if(t.type===`arc`)e.strokeStyle=e.fillStyle,e.lineWidth=t.width,e.lineCap=`round`,e.beginPath(),e.arc(0,0,t.r,t.mid-t.half-Math.PI/2,t.mid+t.half-Math.PI/2),e.stroke();else{let{hw:n,hh:r}=t.source??t;e.scale(t.hw/n,t.hh/r),e.translate(-n,-r),t.draw(e,n*2,r*2)}e.restore()}var ne=e=>he(e.type===`field`?{...e,spread:0}:e,0),V=(e,t,n)=>{let{type:r,draw:i,cx:a,cy:o,ax:s,ay:c,bx:l,by:u,...d}=e,f=(e,t)=>(e-t).toFixed(2);return`${e.type===`capsule`?[f(s,t),f(c,n),f(l,t),f(u,n)]:[f(a,t),f(o,n)]}${JSON.stringify(d)}`};function re(e,t,n,r){let{x:i,y:a,w:o,h:s}=t;return{type:`field`,cx:i+o/2,cy:a+s/2,hw:o/2,hh:s/2,rotate:0,spread:16,key:`${e}|${Math.round(o)}x${Math.round(s)}|${n.map(e=>V(e,i,a)).join(`|`)}`,draw(e){e.translate(-i,-a),r(e)}}}function ie(e){let t=e.map(ne),n=Math.min(...t.map(e=>e.x)),r=Math.min(...t.map(e=>e.y));return{x:n,y:r,w:Math.max(...t.map(e=>e.x+e.w))-n,h:Math.max(...t.map(e=>e.y+e.h))-r}}function H(...e){return re(`union`,ie(e),e,t=>e.forEach(e=>B(t,e)))}var ae=[],oe=0;function se(e,t,n){let r=e.getTransform(),i=[],a=[];for(let[e,n]of[[t.x,t.y],[t.x+t.w,t.y],[t.x,t.y+t.h],[t.x+t.w,t.y+t.h]]){let t=r.transformPoint({x:e,y:n});i.push(t.x),a.push(t.y)}let o=Math.max(Math.floor(Math.min(...i))-1,0),s=Math.max(Math.floor(Math.min(...a))-1,0),c=Math.min(Math.ceil(Math.max(...i))+1,e.canvas.width),l=Math.min(Math.ceil(Math.max(...a))+1,e.canvas.height),u=c-o,d=l-s;if(u<=0||d<=0)return;let f=ae[oe]??=typeof OffscreenCanvas==`function`?new OffscreenCanvas(u,d):document.createElement(`canvas`);(f.width<u||f.height<d)&&(f.width=Math.max(f.width,u),f.height=Math.max(f.height,d));let p=f.getContext(`2d`);p.save(),p.setTransform(1,0,0,1,0,0),p.clearRect(0,0,u,d),p.setTransform(r.a,r.b,r.c,r.d,r.e-o,r.f-s),p.fillStyle=e.fillStyle,oe++;try{n(p)}finally{oe--,p.restore()}e.save(),e.setTransform(1,0,0,1,0,0),e.drawImage(f,0,0,u,d,o,s,u,d),e.restore()}function ce(e,...t){let n=ne(e);return re(`minus`,n,[e,...t],r=>se(r,n,n=>{B(n,e),n.globalCompositeOperation=`destination-out`,t.forEach(e=>B(n,e))}))}function le(e,t){let n=ne(e);return re(`intersect`,n,[e,t],r=>se(r,n,n=>{B(n,e),n.globalCompositeOperation=`destination-in`,B(n,t)}))}function ue(e,t,n=8){let{cx:r,cy:i,hw:a,hh:o}=e;return{...e,key:`within|${n}|${e.key}|${V(t,r-a,i-o)}`,within:{steep:n,draw:e=>{e.translate(a-r,o-i),B(e,t)}}}}function de(e){let t=e.length,n=e.slice(1).map((t,n)=>(t[1]-e[n][1])/Math.max(t[0]-e[n][0],1e-6)),r=e.map((e,r)=>{if(r===0)return n[0];if(r===t-1)return n[t-2];let i=n[r-1],a=n[r];return i*a<=0?0:2*i*a/(i+a)});return n=>{let i=0;for(;i<t-2&&n>e[i+1][0];)i++;let[a,o]=e[i],[s,c]=e[i+1],l=Math.max(s-a,1e-6),u=Math.min(Math.max((n-a)/l,0),1),d=u*u,f=d*u;return(2*f-3*d+1)*o+(f-2*d+u)*l*r[i]+(-2*f+3*d)*c+(f-d)*l*r[i+1]}}function fe(e,t,n,r={}){let i=de(n),a=r.from??n[0][0],o=r.to??n[n.length-1][0],s=o-a,c=0;for(let e=0;e<=200;e++)c=Math.max(c,i(a+s*e/200));let l=r.spread??4,u=new Map;return{type:`field`,cx:e+a+s/2,cy:t,hw:s/2,hh:c,rotate:r.rotate??0,spread:l,bevel:c,radius:c*.25,key:`l|${a},${o}|${n.join(`;`)}`,draw(e){e.beginPath();for(let t=0;t<=200;t++)e.lineTo(s*t/200,c-i(a+s*t/200));for(let t=200;t>=0;t--)e.lineTo(s*t/200,c+i(a+s*t/200));e.fill()},solve(e,t){let n=t-c,r=u.get(e);r===void 0&&u.set(e,r=i(a+e));let o=Math.max(Math.abs(n)-r,-e,e-s);if(o>=0)return o;let l=Math.sqrt(Math.max(r*r-n*n,0))/c,d=1-Math.sqrt(Math.max(1-l*l,0));return Math.max(-d*c,o*c)}}}function pe(e,t){let{hw:n,hh:r}=e.source??e;return{...e,hh:r*t,source:{hw:n,hh:r}}}function me(e,t){let{hw:n,hh:r}=e.source??e;return{...e,hw:n*t,source:{hw:n,hh:r}}}function he(e,t=2){if(t+=e.ring??0,e.type===`mask`)return{x:e.box.x-t,y:e.box.y-t,w:e.box.w+t*2,h:e.box.h+t*2};if(e.type===`capsule`){let n=Math.max(e.ra,e.rb)+t;return{x:Math.min(e.ax,e.bx)-n,y:Math.min(e.ay,e.by)-n,w:Math.abs(e.ax-e.bx)+n*2,h:Math.abs(e.ay-e.by)+n*2}}let n=e.type===`field`?e.spread:0,r=e.hw+n,i=e.hh+n,a=e.type===`holes`?0:e.rotate,o=Math.abs(Math.cos(a)),s=Math.abs(Math.sin(a)),c=o*r+s*i+t,l=s*r+o*i+t;return{x:e.cx-c,y:e.cy-l,w:c*2,h:l*2}}var ge=[7,3.2,.5],_e=new WeakMap;function ve(e,t){_e.set(e,t)}function ye(e){for(let t=e.parentElement;t;t=t.parentElement){let e=_e.get(t);if(e)return e}}var be=new WeakMap;function xe(e,t){be.set(e,{shape:t.shape,seed:t.seed,wear:t.material.wear,size:t.material.chip})}function Se(e){return ye(e.el)}function Ce(e){let t=ye(e.el);return!!t&&(t.crown[0]!==0||t.crown[1]!==0)}var we=e=>e===null?{}:{tangent:e*Math.PI/180};function Te(e){let t=ye(e.el);if(!t)return 4;if(t.at)return t.at(e.x+e.w/2,e.y+e.h/2);let n=(e.x+e.w/2-t.x-t.w/2)/(t.w/2),r=(e.y+e.h/2-t.y-t.h/2)/(t.h/2);return t.top-t.crown[0]*n*n-t.crown[1]*r*r}function Ee(e,t){let{k:n}=t,r=n===1?e:De(e,n),i=Math.cos(t.a),a=Math.sin(t.a),o=(e,r)=>t.x+(t.flip?-e:e)*n*i-r*n*a,s=(e,r)=>t.y+(t.flip?-e:e)*n*a+r*n*i,c=e=>t.a+(t.flip?-e:e);switch(r.type){case`capsule`:return{...r,ax:o(r.ax,r.ay),ay:s(r.ax,r.ay),bx:o(r.bx,r.by),by:s(r.bx,r.by)};case`mask`:{if(!t.a)return{...r,box:{...r.box,x:r.box.x+t.x,y:r.box.y+t.y}};let{x:e,y:n,w:o,h:s}=r.box,c=[e,e+o].flatMap(e=>[n,n+s].map(n=>t.x+e*i-n*a)),l=[e,e+o].flatMap(e=>[n,n+s].map(n=>t.y+e*a+n*i));return{...r,box:{x:Math.min(...c),y:Math.min(...l),w:Math.max(...c)-Math.min(...c),h:Math.max(...l)-Math.min(...l)}}}case`holes`:return{...r,cx:o(r.cx,r.cy),cy:s(r.cx,r.cy)};case`rect`:return{...r,cx:o(r.cx,r.cy),cy:s(r.cx,r.cy),rotate:c(r.rotate)};case`arc`:return{...r,cx:o(r.cx,r.cy),cy:s(r.cx,r.cy),rotate:c(r.rotate),mid:t.flip?-r.mid:r.mid};case`field`:{let e={...r,cx:o(r.cx,r.cy),cy:s(r.cx,r.cy),rotate:c(r.rotate)};return t.flip?{...e,key:`${r.key}|flip`,draw(e,t,n){e.translate(t,0),e.scale(-1,1),r.draw(e,t,n)}}:e}}}function De(e,t){let n={...e.grow&&{grow:e.grow*t},...e.ring&&{ring:e.ring*t}};switch(e.type){case`mask`:return e;case`capsule`:return{...e,...n,ra:e.ra*t,rb:e.rb*t};case`holes`:return{...e,...n,hw:e.hw*t,hh:e.hh*t,radius:e.radius*t,pitch:e.pitch*t,hole:e.hole*t};case`rect`:return{...e,...n,hw:e.hw*t,hh:e.hh*t,radius:e.radius*t,ripple:[e.ripple[0],e.ripple[1]*t,e.ripple[2]]};case`arc`:return{...e,...n,hw:e.hw*t,hh:e.hh*t,r:e.r*t,width:e.width*t};case`field`:return{...e,...n,hw:e.hw*t,hh:e.hh*t,spread:Math.max(e.spread,(Math.abs(e.grow??0)+(e.ring??0))*t+8),key:`${e.key}|x${t}`,...e.source&&{source:{hw:e.source.hw*t,hh:e.source.hh*t}},draw(n,r,i){n.scale(t,t),e.draw(n,r/t,i/t)}}}}var Oe=class{seedBase;age;state;commands=[];count=0;bent;body;frame={x:0,y:0,a:0,flip:!1,k:1};level=4;top=4;seat=4;holder;printedOn;round=0;use=1;mid=0;constructor(e=0,t=0,n={}){this.seedBase=e,this.age=t,this.state=n}part(e,t=4,n=!1,r=t,i=1){this.count=(e+1)*1024,this.use=i,this.bent=n?void 0:this.body,this.mid=n?r:this.round,this.frame={x:0,y:0,a:0,flip:!1,k:1},this.level=this.top=this.seat=t}add(e,t=Ee(e.shape,this.frame)){return this.commands.push({...e,shape:t,...this.bent&&{bend:this.bent}}),this}px(e,t){return e===void 0?t:e*this.frame.k}resolve(e){return Ee(e,this.frame)}group(e,t){let{frame:n,level:r,top:i,seat:a}=this,[o,s]=e.at??[0,0],c=Math.cos(n.a),l=Math.sin(n.a),u=(n.flip?-o:o)*n.k,d=s*n.k,f=e.rotate??0;return this.frame={x:n.x+u*c-d*l,y:n.y+u*l+d*c,a:n.a+(n.flip?-f:f),flip:n.flip!==!!e.mirror,k:n.k*(e.scale??1)},this.level=r+(e.z??0),this.top=i+(e.z??0),this.seat=a+(e.z??0),t(),this.frame=n,this.level=r,this.top=i,this.seat=a,this}bend(e){return this.bent=e?y(e):this.body,this}roll(e,t=0){return this.body=this.bent=y(e),this.round=this.mid=t,this}seed(){this.count+=1;let e=this.count+this.seedBase*131;return[e*73.1%997,e*41.7%991]}surface(t,n={},r){let i=e(n.material??`plain`,{age:this.age,...this.state,...n.over}),a=this.use,o=a===1?i:{...i,touch:Math.min(i.touch*a,1),wear:Math.min(i.wear*a,1)},s=Ee(t,this.frame),c=n.rest??!1,l=!c&&(n.follow??!1),u=c?this.tallest(s):l?n.zEdge??0:n.zEdge===void 0?n.rise===void 0?this.seat-4:this.level:n.zEdge+this.seat,d=n.rise===void 0?l?n.zTop??4:(n.zTop??0)+this.seat:u+n.rise,f=l?this.top:0,p=s.type===`capsule`&&(n.profile??`round`)===`round`?Math.max(s.ra,s.rb)/4:0,m=`rotate`in s?s.rotate:this.frame.a,[h,g]=typeof n.tilt==`number`?[0,n.tilt]:n.tilt??[0,0],[_,v]=n.pivot??[0,0],y=[h/2,g/2],b=d+y[0]*_+y[1]*v,x=b+Math.abs(y[0])+Math.abs(y[1]);if(this.add({op:`surface`,shape:t,name:n.material??`plain`,material:m?{...o,tangent:o.tangent+m,marks:o.marks*Math.max(1-Math.abs(m)*8,0)}:o,zEdge:u,zTop:b,mid:this.mid,follow:l,bridge:this.px(n.bridge,0),rest:c,reach:l?this.tallest(s)+Math.max(u,x,0)+p:x+p,bevel:this.px(n.bevel,2),profile:n.profile??`round`,dish:typeof n.dish==`number`?[n.dish,n.dish]:n.dish??[0,0],crown:typeof n.crown==`number`?[n.crown,n.crown]:n.crown??[0,0],tilt:y,radial:n.radial??!1,seed:this.seed()},s),this.top=f+d,r){let{level:e,top:t,holder:n}=this;this.level=t,this.holder=s,r(),this.level=e,this.top=t,this.holder=n}return this}tallest(e){let t=he(e,0),n=0;for(let e of this.commands){if(e.op!==`surface`||e.reach<=n)continue;let r=he(e.shape,0);r.x<t.x+t.w&&r.x+r.w>t.x&&r.y<t.y+t.h&&r.y+r.h>t.y&&(n=e.reach)}return n}cut(e,t={}){return this.add({op:`cut`,shape:e,depth:t.depth??0,ink:t.ink??null,rough:t.rough??.5,metal:t.metal??0,wear:Math.min((t.wear??0)*this.use,1),emit:t.emit??null,soft:this.px(t.soft,.7),feather:this.px(t.feather,0),seed:this.seed(),...t.stop?{on:Ee(t.stop,this.frame)}:this.holder&&{on:this.holder},...this.printedOn&&{on:this.printedOn.shape,chips:this.printedOn}})}printing(e,t){let n;for(let t=e.parentElement;t&&!n;t=t.parentElement)n=be.get(t);this.printedOn=n,t(),this.printedOn=void 0}print(e,t,n={}){return this.cut(e,{...n,ink:t})}engrave(e,t=.2,n={}){return this.cut(e,{...n,depth:t})}legend(e,t,n={}){if(!e.label)return this;let{frame:r}=this;return this.frame={x:0,y:0,a:0,flip:!1,k:1},this.cut(A(e.label),{depth:.04,...n,ink:t}),this.frame=r,this}well(e,t,n={},r){let{top:i}=this;return this.surface(e,{material:`well`,bevel:1/this.frame.k,follow:n.zEdge===void 0,...n,rise:-t},r),this.top=i,this}seam(e,t={}){return this.cut(te(e,t.width??.8/this.frame.k),{depth:t.depth??.5,ink:[.008,.008,.009],rough:.8,soft:.5/this.frame.k})}lamp(e,t,n=1,r={}){let i=r.dark??.02,a=r.gain??.6,o=e=>t.map(t=>t*e);return this.cut(e,{ink:o(i),emit:o(i+n*a)})}glass(e,t={}){let n=t.material&&d(t.material).ior||1.52,r=((n-1)/(n+1))**2,[i,a]=t.chamfer??[0,0];return this.add({op:`glass`,shape:e,covers:!!t.covers,height:t.height??1.2,bevel:this.px(t.bevel,8),coat:t.coat??1,curve:t.curve??0,film:t.film??0,rim:t.rim??.5,chamfer:[i,Math.tan(a*Math.PI/180)],reflect:2*r/(1+r),tint:t.tint??[1,1,1]})}frost(e,t={}){return this.add({op:`frost`,shape:e,blur:this.px(t.blur,14),tint:t.tint??[.8,.82,.85],opacity:t.opacity??.25,transmit:t.transmit??1,zoom:t.zoom??1,zEdge:(t.zEdge??0)+this.seat,zTop:(t.zTop??1.5)+this.seat,bevel:this.px(t.bevel,3),rough:t.rough??.42,coat:t.coat??.6})}screen(e,t,n={}){let r=n.kind??`crt`;return this.add({op:`screen`,shape:e,source:t,kind:r,gain:n.gain??3,color:n.color??[.008,.009,.01],ink:r===`crt`?[n.mono?0:.22,n.bulge??.24,0]:n.ink??(r===`tft`?[1,1,1]:[.02,.03,.02]),emit:n.emit??[0,0,0],inset:n.inset??[0,0],zTop:(n.zTop??-.6)+this.seat,rough:n.rough??.2,coat:n.coat??.8,metal:n.metal??0})}glow(e,t,n=1.1){return this.add({op:`glow`,shape:e,color:t,width:n*this.frame.k})}};function ke(e,t){if(e==null||e===``)return t;let n=/^\s*(-?[\d.]+)\s*(mm|cm)?\s*$/.exec(e);return n?parseFloat(n[1])*(n[2]===`cm`?10:1):t}var Ae=e=>`${e*4}px`,je=new WeakMap;function Me(e){let t=e.getAttribute(`place`);if(t===null){je.delete(e)&&(e.style.position=e.style.left=e.style.top=e.style.width=e.style.height=``);return}if(je.get(e)===t)return;je.set(e,t);let n=t.trim().split(/\s+/),r=n[0]===`corner`,i=(r?n.slice(1):n).map(Number),[a=NaN,o=NaN,s=NaN,c=s]=i;if(i.length<3||i.length>4||i.some(Number.isNaN))return g(`place takes "x y w h" or "corner x y w h" in mm, with h optional. ${h(e)}`);e.style.position=`absolute`,e.style.left=Ae(r?a:a-s/2),e.style.top=Ae(r?o:o-c/2),e.style.width=Ae(s),e.style.height=Ae(c)}function Ne(e){e.hasAttribute(`place`)&&Me(e);for(let t of e.querySelectorAll(`[place]`))Me(t)}var Pe=e=>Me(e),Fe=Math.PI/180;function Ie(e){let[t=0,n=0]=(e.closest(`d-device[angle]`)?.getAttribute(`angle`)??``).trim().split(/\s+/).map(e=>parseFloat(e)||0);return[t,n]}function Le(e){let[t,n]=Ie(e);return[Math.cos(t*Fe)||1,Math.cos(n*Fe)||1]}var Re=new Set;function ze(e){return Re.add(e),()=>{Re.delete(e)}}function Be(e,t,n,r){if(!e||!Re.size)return;let i=e.el.closest(`d-device, [data-alone]`)?.__d;if(!i)return;let a=r?.motion??e.def?.motion,o={kind:t,part:e,device:i,material:(r?.heard?void 0:Ve(e))??i.material,speed:n,to:r?.to,motion:a};for(let e of Re)try{e(o)}catch(e){console.error(e)}}function Ve(e){let t=e.commands??[];for(let e=t.length-1;e>=0;e--){let n=t[e];if(n.op===`surface`)return n.name}}var He=37297;function Ue(e,t,n){let r=(t,n)=>{let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r},i=e.createProgram(),a=[r(e.VERTEX_SHADER,t),r(e.FRAGMENT_SHADER,n)];for(let t of a)e.attachShader(i,t);return e.linkProgram(i),{program:i,finish:()=>{if(!e.getProgramParameter(i,e.LINK_STATUS)){let t=a.map(t=>e.getShaderInfoLog(t)).join(``)||e.getProgramInfoLog(i);throw Error(t||`link failed`)}let t={},n=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let r=0;r<n;r++){let{name:n}=e.getActiveUniform(i,r);t[n]=e.getUniformLocation(i,n)}return{program:i,u:t}}}}function We(e,t,n){return Ue(e,t,n).finish()}function Ge(e,t,n){let r=e.getExtension(`KHR_parallel_shader_compile`),{program:i,finish:a}=Ue(e,t,n),o=null;return()=>o??=!r||e.getProgramParameter(i,He)?a():null}var Ke=16,qe=class{gl;f;i;at={};buffers=[];size;stride;kept=new Float32Array;count=0;constructor(e,t,n){this.gl=e;let r=e.getUniformBlockIndex(t,n);e.uniformBlockBinding(t,r,0),this.size=e.getActiveUniformBlockParameter(t,r,e.UNIFORM_BLOCK_DATA_SIZE);let i=e.getParameter(e.UNIFORM_BUFFER_OFFSET_ALIGNMENT);this.stride=Math.ceil(this.size/i)*i;let a=e.getActiveUniformBlockParameter(t,r,e.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES),o=e.getActiveUniforms(t,[...a],e.UNIFORM_OFFSET);a.forEach((n,r)=>{this.at[e.getActiveUniform(t,n).name]=o[r]/4});let s=new ArrayBuffer(this.size);this.f=new Float32Array(s),this.i=new Int32Array(s)}two(e,t,n){this.f[e]=t,this.f[e+1]=n}four(e,t,n,r,i){this.two(e,t,n),this.two(e+2,r,i)}vec(e,t){for(let n=0;n<t.length;n++)this.f[e+n]=t[n]}keep(){let e=this.stride/4,t=this.count*e;if(t+e>this.kept.length){let t=new Float32Array(Math.max(e*256,this.kept.length*2));t.set(this.kept),this.kept=t}return this.kept.set(this.f,t),this.count++}send(){let{gl:e}=this,t=this.stride/4;for(let n=0,r=0;n<this.count;n+=Ke,r++)e.bindBuffer(e.UNIFORM_BUFFER,this.buffers[r]??=e.createBuffer()),e.bufferData(e.UNIFORM_BUFFER,this.kept,e.DYNAMIC_DRAW,n*t,Math.min(Ke,this.count-n)*t);this.count=0}use(e){this.gl.bindBufferRange(this.gl.UNIFORM_BUFFER,0,this.buffers[Math.floor(e/Ke)],e%Ke*this.stride,this.size)}};function U(e,t,n,r=e.TEXTURE_2D){e.texParameteri(r,e.TEXTURE_MIN_FILTER,t),e.texParameteri(r,e.TEXTURE_MAG_FILTER,n),e.texParameteri(r,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(r,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}var Je=`
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
}`,Ye=`
float radical(uint b){
  b=(b<<16u)|(b>>16u);
  b=((b&0x55555555u)<<1u)|((b&0xAAAAAAAAu)>>1u);
  b=((b&0x33333333u)<<2u)|((b&0xCCCCCCCCu)>>2u);
  b=((b&0x0F0F0F0Fu)<<4u)|((b&0xF0F0F0F0u)>>4u);
  b=((b&0x00FF00FFu)<<8u)|((b&0xFF00FF00u)>>8u);
  return float(b)*2.3283064365e-10;
}`,Xe=`#version 300 es
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  gl_Position=vec4(c*2.-1.,0.,1.);
}`,Ze=`#version 300 es
precision highp float;
out vec4 o;
uniform float uSize,uDark,uGlow,uTent,uCamera;
uniform vec2 uLens;
uniform int uPanels;
uniform vec4 uPanelAt[6];
uniform vec2 uPanelLight[6];
${Je}
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
}`,Qe=`#version 300 es
precision highp float;
precision highp int;
out vec4 o;
${Ye}
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
}`,$e=[.06,.12,.25,.5],et=.02,tt=`#version 300 es
precision highp float;
precision highp int;
out vec4 o;
uniform sampler2D tRoom;
uniform float uSize,uTurn,uReach,uThin;
${Je}
${Ye}
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
}`,nt=`#version 300 es
precision highp float;
precision highp int;
out vec4 o;
uniform sampler2D tRoom;
uniform float uRough,uSize,uSource;
uniform int uSamples;
const float PI=3.14159265;
${Je}
${Ye}
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
}`,rt=1024,it=class{gl;made=new Map;constructor(e){this.gl=e;let t=We(e,Xe,Qe),n=e.createTexture(),r=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,r),e.drawBuffers([e.COLOR_ATTACHMENT0]),e.disable(e.BLEND),e.activeTexture(e.TEXTURE14),e.bindTexture(e.TEXTURE_2D,n),e.texStorage2D(e.TEXTURE_2D,1,e.RG16F,64,64),U(e,e.LINEAR,e.LINEAR),e.activeTexture(e.TEXTURE0),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.viewport(0,0,64,64),e.useProgram(t.program),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(r),e.deleteProgram(t.program)}for(e,t){let n=this.made.get(e),{gl:r}=this;if(n?.tilt===t)return n;n&&(r.deleteTexture(n.room),r.deleteTexture(n.brush));let i=r.isEnabled(r.BLEND),a=r.isEnabled(r.SCISSOR_TEST),o=e=>{let t=r.createTexture();return r.bindTexture(r.TEXTURE_2D,t),r.texStorage2D(r.TEXTURE_2D,e,r.RGBA16F,rt,rt),U(r,r.LINEAR_MIPMAP_LINEAR,r.LINEAR),t},s=We(r,Xe,Ze),c=We(r,Xe,nt),l=o(Math.log2(rt)+1),u=o(7),d=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,d),r.drawBuffers([r.COLOR_ATTACHMENT0]),r.disable(r.BLEND),r.disable(r.SCISSOR_TEST),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,l,0),r.viewport(0,0,rt,rt),r.useProgram(s.program),r.uniform1f(s.u.uSize,rt),r.uniform1f(s.u.uDark,e.dark),r.uniform1f(s.u.uGlow,e.glow),r.uniform1f(s.u.uTent,e.tent),r.uniform1f(s.u.uCamera,e.camera);let f=Math.tan(t*Math.PI/180);r.uniform2f(s.u.uLens,f*.44,-f*.9);let p=e.panels.slice(0,6);r.uniform1i(s.u.uPanels,p.length),p.length&&(r.uniform4fv(r.getUniformLocation(s.program,`uPanelAt`),p.flatMap(e=>[...e.at,...e.size])),r.uniform2fv(r.getUniformLocation(s.program,`uPanelLight`),p.flatMap(e=>[e.soft,e.power]))),r.drawArrays(r.TRIANGLE_STRIP,0,4),r.bindTexture(r.TEXTURE_2D,l),r.generateMipmap(r.TEXTURE_2D),r.useProgram(c.program),r.uniform1i(c.u.tRoom,0),r.uniform1f(c.u.uSource,rt);for(let e=0;e<7;e++){let t=rt>>e;r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,u,e),r.viewport(0,0,t,t),r.uniform1f(c.u.uSize,t),r.uniform1f(c.u.uRough,e/6),r.uniform1i(c.u.uSamples,e?32<<Math.min(e,3):1),r.drawArrays(r.TRIANGLE_STRIP,0,4)}let m=We(r,Xe,tt),h=r.createTexture();r.activeTexture(r.TEXTURE15),r.bindTexture(r.TEXTURE_2D_ARRAY,h),r.texStorage3D(r.TEXTURE_2D_ARRAY,4,r.R16F,128,128,8*$e.length),r.texParameteri(r.TEXTURE_2D_ARRAY,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),r.texParameteri(r.TEXTURE_2D_ARRAY,r.TEXTURE_MAG_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D_ARRAY,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D_ARRAY,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,u),r.useProgram(m.program),r.uniform1i(m.u.tRoom,0);for(let e=0;e<4;e++){let t=128>>e;r.viewport(0,0,t,t),r.uniform1f(m.u.uSize,t),r.uniform1f(m.u.uThin,et*2**e);for(let t=0;t<$e.length;t++){r.uniform1f(m.u.uReach,$e[t]);for(let n=0;n<8;n++)r.framebufferTextureLayer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,h,e,t*8+n),r.uniform1f(m.u.uTurn,n/8*Math.PI),r.drawArrays(r.TRIANGLE_STRIP,0,4)}}r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteFramebuffer(d),r.deleteTexture(l),r.deleteProgram(m.program),r.deleteProgram(s.program),r.deleteProgram(c.program),i&&r.enable(r.BLEND),a&&r.enable(r.SCISSOR_TEST);let g={room:u,brush:h,tilt:t};return this.made.set(e,g),g}get bytes(){return this.made.size*(rt*rt*8*4/3+262144*$e.length*4/3)}},at=`#version 300 es
precision highp float;
uniform vec2 uCanvas;
uniform vec4 uBox;
out vec2 vPx;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  vPx=mix(uBox.xy,uBox.zw,c);
  gl_Position=vec4(vPx/uCanvas*2.-1.,0.,1.);
}`,ot={rect:0,capsule:1,field:2,holes:3,mask:4,arc:5},st={surface:0,cut:1,ink:2,glow:3,screen:4,glass:5,frost:6},ct={crt:0,led:1,lcd:2,oled:3,eink:4,coat:5,tft:6},lt={twill:1,knit:2,wood:3,stone:4,terrazzo:5,leather:6,pebble:6,hex:7,knurl:8,hazard:9,ribs:10,foil:11,dots:12,pits:13,stipple:0,lines:0},ut={flat:0,round:1,chamfer:2,dome:3,blend:4},dt=`layout(std140) uniform Command{
  vec4 uBox,uCap,uSeen,uFrom,uReach;
  // Where the maps are on the canvas, which reach only as far as what's drawn: see the light pass.
  vec4 uMap;
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
};`,ft=`mat2 rm(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
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
}`,pt=`#version 300 es
precision highp float;
precision highp int;
${dt}
out vec2 vPx;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  vPx=mix(uBox.xy,uBox.zw,c);
  gl_Position=vec4(vPx/uCanvas*2.-1.,0.,1.);
}`,mt=`#version 300 es
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

${dt}
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

${ft}
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
}`,ht=`#version 300 es
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
}`,gt=`#version 300 es
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
}`,_t=`#version 300 es
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
}`,vt=e=>e.op===`surface`?e.reach:e.zTop,yt=e=>`zTop`in e?vt(e):0,W=e=>{let t=he(e.shape,e.op===`glow`?e.width+2:3);return e.bend?C(t,e.bend):t};function G(e,t){if(!e||!t)return e??t??null;let n=Math.min(e.x,t.x),r=Math.min(e.y,t.y);return{x:n,y:r,w:Math.max(e.x+e.w,t.x+t.w)-n,h:Math.max(e.y+e.h,t.y+t.h)-r}}var bt=class{gl;block;fields;screenTex;later=[];drawing=null;relief=!0;aim=null;constructor(e,t,n,r){this.gl=e,this.block=t,this.fields=n,this.screenTex=r}bindShape(e,t,n){let{gl:r,block:i}=this,{f:a,i:o,at:s}=i;if(i.four(s.uBox,n.x,n.y,n.x+n.w,n.y+n.h),o[s.uShape]=ot[e.type],a[s.uRot]=0,a[s.uGrow]=e.grow??0,a[s.uRing]=e.ring??0,i.vec(s.uRipple,[0,0,0]),o[s.uClipShape]=-1,a[s.uGroundWear]=0,e.type===`capsule`)i.four(s.uCap,e.ax,e.ay,e.bx,e.by),i.two(s.uCapR,e.ra,e.rb),i.two(s.uHalf,1,1),i.two(s.uCenter,(e.ax+e.bx)/2,(e.ay+e.by)/2);else if(e.type===`arc`)i.two(s.uCenter,e.cx,e.cy),i.two(s.uHalf,e.hw,e.hh),i.four(s.uCap,e.mid,e.half,e.r,e.width/2);else if(e.type===`mask`)i.two(s.uCenter,e.box.x,e.box.y);else if(i.two(s.uCenter,e.cx,e.cy),i.two(s.uHalf,e.hw,e.hh),e.type===`rect`)a[s.uRadius]=e.radius,a[s.uRot]=e.rotate,i.vec(s.uRipple,e.ripple);else if(e.type===`holes`)a[s.uRadius]=e.radius,i.vec(s.uHoles,[e.pitch,e.hole,+!!e.square]);else{a[s.uRot]=e.rotate,i.two(s.uSpread,e.spread,e.spread*(e.hh/(e.source?.hh??e.hh)));let n=this.fields.get(e,t);this.later.push(()=>{r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,n),r.activeTexture(r.TEXTURE0)})}}bindHolder(e,t){let{gl:n,block:r}=this,{f:i,i:a,at:o}=r;if(e?.type!==`rect`&&e?.type!==`field`)return;if(a[o.uClipShape]=ot[e.type],r.four(o.uClip,e.cx,e.cy,e.hw,e.hh),i[o.uClipRot]=e.rotate,e.type===`rect`){i[o.uClipRadius]=e.radius;return}r.two(o.uClipSpread,e.spread,e.spread*(e.hh/(e.source?.hh??e.hh)));let s=this.fields.get(e,t);this.later.push(()=>{n.activeTexture(n.TEXTURE7),n.bindTexture(n.TEXTURE_2D,s),n.activeTexture(n.TEXTURE0)})}draw(e,t){let n=t.spec,{gl:r,block:i,later:a}=this,{f:o,i:s,at:c}=i;this.drawing=e;let l=()=>{let e=i.keep();a.push(()=>{i.use(e),r.drawArrays(r.TRIANGLE_STRIP,0,4)})},u=()=>a.push(()=>r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA)),d=()=>a.push(()=>r.blendFunc(r.ONE,r.ONE));this.bindShape(e.shape,n.dpr,W(e)),s[c.uEdge]=0;let f=e.bend;if(o[c.uBendReach]=f?f.reach:0,f&&(i.two(c.uBendDir,f.dir[0],f.dir[1]),i.two(c.uBendAt,f.at,f.flat),o[c.uBendDrop]=f.drop,o[c.uBendK]=f.k,s[c.uBendBoth]=+!!f.both),e.op===`screen`){a.push(()=>{r.activeTexture(r.TEXTURE2),r.bindTexture(r.TEXTURE_2D,this.screenTex),r.texImage2D(r.TEXTURE_2D,0,r.SRGB8_ALPHA8,r.RGBA,r.UNSIGNED_BYTE,e.source),r.activeTexture(r.TEXTURE0)}),s[c.uMode]=st.screen,s[c.uKind]=ct[e.kind],o[c.uGain]=e.gain,i.vec(c.uColor,e.color),i.vec(c.uInk,e.ink),i.vec(c.uEmit,e.emit),i.two(c.uInset,e.inset[0],e.inset[1]),o[c.uZTop]=e.zTop,o[c.uRough]=e.rough,o[c.uCoat]=e.coat,o[c.uMetal]=e.metal,o[c.uZoom]=n.fine,l();return}if(e.op===`frost`){s[c.uMode]=st.frost,i.two(c.uSeed,0,0),o[c.uBlur]=e.blur,o[c.uZoom]=e.zoom,i.vec(c.uColor,e.tint),o[c.uOpacity]=e.opacity,o[c.uTransmit]=e.transmit,o[c.uZEdge]=e.zEdge,o[c.uZTop]=e.zTop,o[c.uBevel]=e.bevel,o[c.uRough]=e.rough,o[c.uCoat]=e.coat,u(),l();return}if(e.op===`glass`){if(t.paned.has(e))return;s[c.uMode]=st.glass,o[c.uZTop]=e.height,o[c.uBevel]=e.bevel,o[c.uCoat]=e.coat,a.push(()=>{r.drawBuffers([r.NONE,r.COLOR_ATTACHMENT1,r.NONE,r.NONE]),r.blendFunc(r.ONE,r.ONE)}),l(),a.push(()=>{r.drawBuffers([r.NONE,r.NONE,r.COLOR_ATTACHMENT2,r.NONE]),r.colorMask(!1,!1,!0,!1),r.blendFunc(r.ONE,r.ONE_MINUS_SRC_ALPHA)}),l(),a.push(()=>{r.colorMask(!0,!0,!0,!0),r.drawBuffers(t.tex.targets)}),u();return}if(e.op===`glow`){s[c.uMode]=st.glow,i.vec(c.uEmit,e.color),o[c.uWidth]=e.width,d(),l(),u();return}if(e.op===`cut`){this.bindHolder(e.on,n.dpr),e.chips&&(o[c.uGroundWear]=e.chips.wear,i.vec(c.uGroundSeed,e.chips.seed),o[c.uChip]=e.chips.size),i.vec(c.uSeed,e.seed),o[c.uBevel]=e.soft,o[c.uWear]=e.wear,o[c.uSoftLod]=Math.log2(n.dpr)*.75+.1,e.depth&&(s[c.uMode]=st.cut,o[c.uDepth]=e.depth,d(),l(),u()),e.ink&&(s[c.uMode]=st.ink,o[c.uFeather]=e.feather,i.vec(c.uColor,e.ink),i.vec(c.uEmit,e.emit??[0,0,0]),o[c.uRough]=e.rough,o[c.uMetal]=e.metal,l());return}let p=e.material;s[c.uMode]=st.surface,s[c.uProfile]=ut[e.profile],s[c.uRadial]=+!!e.radial,o[c.uBevel]=e.bevel,o[c.uZEdge]=e.zEdge,o[c.uZTop]=e.zTop,i.two(c.uDish,e.dish[0],e.dish[1]),o[c.uMid]=e.mid,i.two(c.uCrown,e.crown[0],e.crown[1]),i.two(c.uTilt,e.tilt[0],e.tilt[1]),i.vec(c.uColor,p.color),i.vec(c.uSub,p.sub),i.two(c.uSubRM,p.subRough,p.subMetal),i.vec(c.uBare,p.bare),i.two(c.uBareRM,p.bareRough,p.bareMetal),i.vec(c.uCoatTint,p.coatTint),o[c.uDents]=p.dents,o[c.uFade]=p.fade,o[c.uRings]=p.rings,o[c.uPores]=p.pores,o[c.uFilmVary]=p.filmVary,o[c.uLeak]=p.leak,i.vec(c.uEmit,p.emit),i.vec(c.uGrain,p.grain),o[c.uRough]=p.rough,o[c.uMetal]=p.metal,o[c.uCoat]=p.coat,o[c.uAniso]=p.aniso,o[c.uTangent]=p.tangent,o[c.uPeel]=p.peel,o[c.uWave]=p.wave,o[c.uRelief]=this.relief?p.relief:0,o[c.uFeature]=p.feature,o[c.uSlope]=p.slope,o[c.uAcross]=p.across,o[c.uMottle]=p.mottle,o[c.uFleck]=p.fleck,o[c.uWear]=p.wear,o[c.uAge]=p.age,o[c.uPatinaOn]=+!!p.patina,i.vec(c.uPatina,p.patina??[0,0,0]),o[c.uPatinaRough]=p.patinaRough,o[c.uTouch]=p.touch,o[c.uSheen]=p.sheen,o[c.uScatter]=p.scatter,o[c.uMarks]=p.marks,o[c.uPolish]=p.polish,o[c.uChip]=p.chip,o[c.uBroad]=p.broad,o[c.uCoatRough]=p.coatRough,s[c.uPattern]=p.pattern?lt[p.pattern]:0,i.vec(c.uColor2,p.color2),o[c.uScale]=p.scale,o[c.uFilm]=p.film,i.vec(c.uSeed,e.seed),s[c.uFollow]=e.bridge?3:+!!e.follow,o[c.uBlur]=e.bridge;let m=this.aim;if(m){let e=m.reach,t=m.box;if(s[c.uEdge]=m.rows?4:1,m.rows){let{tex:e,y0:t,step:n,n:o}=m.rows;i.four(c.uCap,t,n,o,0),a.push(()=>{r.activeTexture(r.TEXTURE9),r.bindTexture(r.TEXTURE_2D,e),r.activeTexture(r.TEXTURE0)})}i.four(c.uBox,t.x,t.y,t.x+t.w,t.y+t.h),i.vec(c.uSeen,m.seen),i.vec(c.uFrom,m.from),i.four(c.uReach,e.x,e.y,e.x+e.w,e.y+e.h),l()}else l(),e.follow&&!e.bridge&&(s[c.uFollow]=2,d(),l(),u())}},xt=5,St=`#version 300 es
precision highp float;
out vec2 vUv;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  vUv=vec2(c.x,1.-c.y);
  gl_Position=vec4(c*2.-1.,0.,1.);
}`,Ct=[``,`albedo`,`height`,`normal`,`roughness`,`metal`,`emissive`,`occlusion`],wt=`
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
}`,Tt=`#ifdef BAKE
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
`,Et=`// What's drawn is kept only as far as it's read, and a shadow falls further, so the maps are a box inside the canvas: this takes a place on the canvas to it.
vec4 uMap;
vec2 uCss,uShift;
// The canvas's edges, css px.
vec4 uFrame;
vec4 uBody;
float uDpr,uPeak,uTall,uFace,uLift;
// A body turning over: how much a face stretches to fill what it's narrowed to on screen, less than nothing on the face turned away, and how far below the face it turns about.
vec2 uSpin;
// The sine and cosine of how far it's turned. The room stays where it is, so what a turned surface sees is looked up back in the room.
vec2 uRound;
// How far either way from the middle the body is this face's, mm, and whether another face meets it at its left and right ends.
vec3 uOwn;
vec3 uKey,uCam,uSky;
// A torch: where it stands and how strong, its axis, its beam (core, flood, where the edge starts, spill), its colour,
// and half its angle, how far off it's held, its reflector's rings and what it makes fluoresce.
vec4 uTorch,uBeam,uCone;
vec3 uAim,uTint;
// What else lights it for a while, a flash or a flame: where, mm, and the square of half its size, and its colour times strength.
int uPoints;
vec4 uPoint[4];
vec3 uPointColor[4];
float uSplit;
float uRoom,uLamp,uLampSoft,uLampHead,uFill,uPageShade;
// The colour of the room's light and its lamp, linear. What glows by itself keeps its own.
vec3 uRoomColor;
int uDebug,uPanes;
// For the stage's camera: light as it is, scaled for the exposure white is shown at, which the camera shows and tone maps itself.
bool uLinear;
`,Dt=`#ifdef QUICK
bool gBaked=false;
vec3 gBake,gBakeRoom;
#else
const bool gBaked=false;
#endif
// A flat white under the lamp and the room comes to 1 at this exposure, so a colour comes out as it was written.
const float MM=.25,PI=3.14159265,EXPOSURE=.62;
vec2 gUv;
// What a bake holds for a pixel, handed to shade() in place of working it out.
vec2 gN=vec2(0.),gNs=vec2(0.),gNd=vec2(0.);
float gAo=1.;

// A wall looks out past the plane of the room, and the map of it is seamed behind. Nothing's there to see but the room again.
vec3 inRoom(vec3 r){
  vec3 o=vec3(r.x*uRound.y-r.z*uRound.x,r.y,r.x*uRound.x+r.z*uRound.y);
  if(uSpin.y>0.) o.z=abs(o.z);
  return o;
}`,Ot=Et.replace(/^(\w)/gm,`uniform $1`),kt=`// What the light asks of a renderer, which it defines: the maps, read as it keeps them (readA to readTop), and these. The core is
// the same for every renderer, so one change to how a thing is lit reaches all of them.
// How much light the page loses to the device's shadow there.
float pageLoss(float cov,float lodS);
// How much of each light reaches a point h high: the lamp, the torch, the strongest flash or flame, and the bright side of the room.
float keyShadow(float h,vec3 L);
float torchShadow(float h,vec3 L);
float pointShadow(float h,vec3 L);
float skyShadow(float h);
// The room's occlusion where the ray landed, and which way it's open, as r and gb.
vec4 openness(vec2 eo);
// Whether nothing on the device glows, which saves looking.
bool glowless();
// Pane i's numbers, into gP, or false where it's sure the pane isn't over this place.
bool paneLoad(int i,vec2 at);
float gP[${xt*4}];
// A height, colour and cover, and what glows, read as wide as l.
float hAt(vec2 uv,float l){return readH(AT(uv),l).r;}
vec4 aAt(vec2 uv,float l){return readA(AT(uv),l);}
vec3 eAt(vec2 uv,float l){return readE(uv,l).rgb;}
// What a view ray meets on its way down, read sharp: the top, and what's under something standing clear.
float hOn(vec2 uv){return readH(AT(uv),0.).r;}
float topOf(vec2 uv){return readH(AT(uv),0.).r;}
float underOf(vec2 uv){return readU(AT(uv),0.).r;}
// Height to take a slope from. In half floats relief is kept apart from it, or it would step.
float rise(vec2 uv,float l){
#ifdef RELIEF
  return readH(AT(uv),l).r+textureLod(tD,AT(uv),l).r;
#else
  return readH(AT(uv),l).r;
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
${Je}
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
  float t=fract(atan(b.y,b.x)/PI)*${8 .toFixed(1)},l=floor(t),m=clamp(log2(reach/${$e[0].toFixed(2)}),0.,${($e.length-1.01).toFixed(2)}),q=floor(m);
  float lod=clamp(log2(thin/${et.toFixed(2)}),0.,${3 .toFixed(1)}),f=t-l,g=mod(l+1.,${8 .toFixed(1)});
  vec2 u=oct(normalize(inRoom(r)));
  float x=mix(textureLod(tBrush,vec3(u,q*${8 .toFixed(1)}+l),lod).r,textureLod(tBrush,vec3(u,q*${8 .toFixed(1)}+g),lod).r,f);
  float y=mix(textureLod(tBrush,vec3(u,(q+1.)*${8 .toFixed(1)}+l),lod).r,textureLod(tBrush,vec3(u,(q+1.)*${8 .toFixed(1)}+g),lod).r,f);
  return mix(x,y,m-q)*gAmbient;
}
${wt}
float rnd(vec2 p){return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715))));}
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
  // The grain runs where the surface's does, but square to this normal. A pane over a textured face has a normal of its
  // own, and a frame a few thousandths off it, far less than a sharp lobe is wide, would crumple its glint like foil.
  T=normalize(T-n*dot(T,n));B=cross(n,T);
  vec3 f1=gFilm>0.?thin(VoH,f0):f0;
  vec3 F=f1+(1.-f1)*pow(1.-VoH,5.);
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
  vec2 o=exp2(lod)*.5/(uCss*uDpr);
  vec3 a=eAt(gUv+o,lod),b=eAt(gUv-o,lod),c=eAt(gUv+vec2(o.x,-o.y),lod),d=eAt(gUv+vec2(-o.x,o.y),lod);
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
  float c=aAt(gUv,lod).a;
  float dz=z-hAt(gUv,lod)/max(c,.25),R=sqrt(far*far+dz*dz);
  return max(dz,0.)/R*max(dot(n,vec3(toward*far,-dz))/R,0.);
}
vec3 glow(vec3 n,float clean,vec3 take){
  float lodS=log2(uDpr);
  // Light from inside a lens leaves it mostly straight out, so a lit dome or facet is brightest where it faces you and dims
  // down its slopes, which is how its form still reads once it's lit. Anything flat that glows is as it was.
  gE=readE(gUv,0.).rgb*4.*clean*(.35+.65*pow(clamp(n.z,0.,1.),4.));
  if(glowless()) return gE/EXPOSURE;
  gToward=vec2(0.);
  vec3 a=eAt(gUv,1.6+lodS)*.7,b=wide(3.2+lodS,1.5)*1.5,c=wide(4.6+lodS,1.7)*1.7,d=wide(6.+lodS,1.2)*1.2,e=eAt(gUv,7.3+lodS)*.8;
  // Exposure is for what the lamps light. What makes its own light doesn't go through it.
  if(dot(a+b+c+d+e,vec3(1.))<.0001) return gE/EXPOSURE;
  // Each size is the glow about half its width away, which is how far off it's taken to be.
  float z=readH(AT(gUv),0.).r/max(readA(AT(gUv),0.).a,.25);
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
  vec2 slope=(at-uCam.xy)/(uCam.z-uFace);
  if(uSpin.y>0.) return across(s,slope,size);
  // It can only land on what stands near it, so it starts above that, not above the whole device.
  float top=length(slope)*uPeak/MM<48.?readTop(s,0.).r*uTall:uPeak;
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
  vec4 A=readA(AT(gUv),wall);
  float cov=gGround?0.:gHit?1.:A.a;

  // The page is a plane at z=0, and shadowed by the device. That's how much light is lost. The page beneath is blended as stored, so this is the alpha that loses that much.
  float shA=1.-pow(1.-pageLoss(cov,lodS),1./2.2);

  vec3 rgb=vec3(0.);
  if(cov>.004){
    vec4 H=readH(AT(gUv),wall),S=readS(AT(gUv),wall);
    float h=gHit?gZ:H.r/max(A.a,.25);
    vec3 alb=A.rgb/max(A.a,.001);
    float rough=clamp(S.r/max(S.a,.001),.03,1.),mf=S.g/max(S.a,.001)*2.,metal=clamp(mf,0.,1.),coat=S.b/max(S.a,.001);
    // Pure metal rounds to just over 1 here, and that speck of film would tint a dark metal.
    gFilm=clamp(mf-1.004,0.,1.);
    // Handling changes how smooth a surface is, not its colour, so it only shows in a highlight.
    vec4 C=readC(AT(gUv),wall);
    vec4 M=readM(AT(gUv),wall);
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
    // No metal scatters, so on one this says how hard it's ruled. The band is one every 16mm or so, in real size, and wanders a little, so any patch you can see has some colour in it wherever the lamp is.
    if(metal>.5&&scatter>0.){
      gGrate=scatter;
      gRuled=vec3(.8,.6,0.);
      gPitch=dot(P.xy,gRuled.xy)/16.+.05*sin(P.y*.11-P.x*.07);
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
    float polish=1.-smoothstep(.1,.4,rough);
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
    float ao=gAo,join=1.;
    vec3 open=n;
    if(!gBaked){
      vec4 O=openness(eo);
      // Light that goes in and comes back out elsewhere fills what would have been dark.
      ao=mix(O.r*O.r,O.r,scatter);
      open=normalize(n+vec3((O.gb*2.-1.)*1.4,0.));
      // Where one part stands on another the join is a dark line, far tighter than occlusion reaches. It takes only
      // what parts are built of, so texture stays out of it, and only a step up, so an edge stays lit.
      vec2 ej=max(vec2(.3)/(uCss*MM),e*1.2);
      float hj=hOn(gUv)*2.;
      float crease=max(hOn(gUv-vec2(ej.x,0.))+hOn(gUv+vec2(ej.x,0.))-hj,0.)+max(hOn(gUv-vec2(0.,ej.y))+hOn(gUv+vec2(0.,ej.y))-hj,0.);
      join=1.-.82*smoothstep(.08,.7,crease);
      ao*=join;
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
      sk=(uRoom>.15&&gSide<1.?mix(keyShadow(h,Lk),1.,gSide):1.)*mix(1.,ao,.3);
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
        st=torchShadow(h,Lt)*mix(1.,ao,.3);
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
    // A flame flickers and a flash goes off, so they're lit with the lamp, never baked.
    for(int i=0;i<4;i++){
      if(i>=uPoints||!gLamp) break;
      vec3 d=uPoint[i].xyz-P;
      float r2=abs(uPoint[i].w),fall=r2/(r2+dot(d,d));
      if(uPoint[i].w<0.) fall*=max(-d.z,0.)*inversesqrt(max(dot(d,d),1e-6));
      vec3 Lp=normalize(d),rad=uPointColor[i]*fall*(PI/EXPOSURE);
      float sp=mix(1.,ao,.3);
#ifdef QUICK
      if(i==0) sp*=mix(textureLod(tShadow,vec2(vUv.x,1.-vUv.y),0.).a,1.,gSide);
#else
      if(i==0&&gSide<1.) sp*=pointShadow(h,Lp);
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
    vec3 R=facing(reflect(-v,n),P);
    vec3 seen=env(R,rough);
    if(an>.001){
      // Grooves smear the room right across them and hardly along them. Rough enough metal still sees only the room.
      float a=rough*rough;
      seen=mix(seen,vec3(brushed(facing(reflect(-v,n),P),B.xy,a*(1.+an),a*(1.-an))),smoothstep(0.,.2,an));
    }
    // What stands between a surface and the bright side of the room takes that away too, or a shadow on metal is only a lamp gone.
    float sky=uRoom>.15?skyShadow(h):1.;
    float kept=ao*specOcc*mix(1.,sky,.45);
    // Smooth metal looks one way, so only what's on that line can hide anything from it. A rolled edge beside a taller part
    // looks out and away from it, and keeps all the room. What looks nearly straight up goes as before.
    float lean=max(length(R.xy),.01),sharp=metal*polish*(1.-smoothstep(.6,.9,R.z));
    if(sharp>0.){
      float rise=0.;
      for(float t=.5;t<5.;t*=3.){
        vec2 q=gUv+R.xy/lean*t/(uCss*MM);
        rise=max(rise,hOn(q)-max(h+t*R.z/lean,0.));
      }
      kept=mix(kept,join,sharp*(1.-smoothstep(.05,.4,rise)));
    }
    ROOM+=seen*F*(1.-gPile)*kept;
    ROOM+=dif*plain(open,1.)*ao*.45*mix(1.,sky,.75);
    // What turns away from the lamp sees the lit table and the walls of the tent, and neither is the sky's to shade.
    ROOM+=dif*textureLod(tRoom,oct(n),2.).b*gAmbient*ao*2.5;
    // What the room no longer reaches, nearby surfaces hand on in their own colour.
    vec4 near=aAt(gUv,3.+lodS);
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
          if(!paneLoad(i,at)) continue;
          vec2 p=at-vec2(gP[0],gP[1]),half_=vec2(gP[2],gP[3]);
          float r=gP[4];
          vec2 q=abs(p)-half_+r;
          float d=length(max(q,0.))+min(max(q.x,q.y),0.)-r;
          if(d>=.5) continue;
          // Which way is out from here, and how fast the glass falls that way: its own dome, then the edge rolling over.
          vec2 out_=(max(q.x,q.y)>0.?normalize(max(q,0.)+.0001):q.x>q.y?vec2(1.,0.):vec2(0.,1.))*sign(p+.0001);
          float e=1.-clamp(-d/gP[6],0.,1.),u=1.-clamp(-d/gP[8],0.,1.);
          float drop=gP[5]*e/max(sqrt(1.-e*e),.2)+4.*u*u;
          // A cut round the top edge is flat, so it tilts all the way across and stops at a sharp line.
          float cw=gP[15];
          if(cw>0.) drop+=gP[16]*smoothstep(-.5,.5,(cw+d)*uDpr);
          nc=normalize(vec3(out_*drop+p/half_*gP[7],1.));
          // It's seen and lit where it is, on top. From the surface under it, every step that surface takes would move its glint.
          vec3 Pc=vec3(P.xy,gP[14]);
          vc=normalize(uCam-Pc);
          if(uSpin.x<0.) vc.xz=-vc.xz;
          Lc=keyFrom(Pc);
          if(beam>.002) Ltc=normalize(uTorch.xyz-Pc);
          // Two faces, with an air gap under them, each reflecting what its index says.
          f0c=gP[17];
          tint=vec3(gP[9],gP[10],gP[11]);
          amount=gP[12]*clamp(.5-d,0.,1.);
          gr=.02;
          // A coating takes each face from 4% down to under half a percent, in the colour its film leaves at that angle, so
          // the dim room drops out and only what's far brighter than it, a softbox or a lamp, still shows. It's seen out of focus, past the glass above it.
          if(gP[13]>0.){
            float was=gFilm;
            gFilm=gP[13];
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
          if(i<uPanes&&gP[13]>0.) seen*=seen*seen/.64;
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

`,At=`// How far above what's here a height is. Under something standing clear counts as above it too, by as far as it's below.
// It's off along the ray, css px.
float clearOf(vec2 uv,float z,float lod){
  float gap=z-marchH(uv,lod);
  return gap<0.?max(gap,marchU(uv)-z):gap;
}
float grazes(vec2 uv,float h0,vec3 L,float t,float soft){
  vec2 size=uCss*MM;
  vec3 q=vec3(uv*size,h0+.03)+L*t;
  return clamp(.5+clearOf(q.xy/size,q.z,0.)/(t*soft+.05),0.,1.);
}
float shadow(vec2 uv,float h0,vec3 L,float soft,float stride){
  vec2 size=uCss*MM;
  // Steps land the same way from pixel to pixel, and scallop an edge, so each pixel starts a little apart: see marchStart.
  float k=1.,t=.25,near=0.,j=marchStart(uv),top=marchTop(uv,h0,L);
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
`,jt=`#version 300 es
precision highp float;
in vec2 vUv;
${Tt}#ifdef QUICK
uniform sampler2D tShadow;
uniform bool uGlow;
#endif
#if defined(QUICK)||defined(SHADOWS)||defined(EMIT)
// Layers of a bake: 0 what stays, 1 landing and slope, 2 two more slopes, 3 what the room gives.
uniform highp sampler2DArray tBake;
#endif
uniform sampler2D tA,tH,tS,tE,tRoom,tC,tO,tTop,tM,tD,tU,tDFG;
#ifdef SPLIT
uniform sampler2D tN;
#endif
#define AT(uv) ((uv)*uMap.xy+uMap.zw)
${Ot}
uniform float uPane[144];
uniform highp sampler2DArray tBrush;
${Dt}
// The maps, as this renderer keeps them: t is a place on them, from AT, and l the level read.
vec4 readA(vec2 t,float l){return textureLod(tA,t,l);}
vec4 readH(vec2 t,float l){return textureLod(tH,t,l);}
vec4 readS(vec2 t,float l){return textureLod(tS,t,l);}
vec4 readC(vec2 t,float l){return textureLod(tC,t,l);}
vec4 readM(vec2 t,float l){return textureLod(tM,t,l);}
vec4 readU(vec2 t,float l){return textureLod(tU,t,l);}
// What glows and what stands tallest within reach are read at a place on the canvas, as they cover all of it.
vec4 readE(vec2 uv,float l){return textureLod(tE,uv,l);}
vec4 readTop(vec2 uv,float l){return textureLod(tTop,uv,l);}
// The march's heights, what's under them, how high it need look, and where along its first step a pixel starts. Plain noise, as rnd falls
// into diagonal lines: it leaves a grain too fine to see.
float marchH(vec2 uv,float lod){return textureLod(tH,AT(uv),lod).r;}
float marchU(vec2 uv){return textureLod(tU,AT(uv),0.).r;}
float marchTop(vec2 uv,float h0,vec3 L){return textureLod(tTop,uv,0.).g*uTall;}
float marchStart(vec2 uv){return fract(sin(dot(gl_FragCoord.xy+uShift,vec2(12.9898,78.233)))*43758.5453);}
${At}${kt}
// How light reaches what the core lights, worked out here by marching each ray through the heights.
// The page's share: the device shadows it with the same march, as a plane at z=0.
float pageLoss(float cov,float lodS){
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
  float deep=4./max(uFace,4.),amb=min(max(hAt(gUv,blur)*deep,0.),aAt(gUv,blur).a),amb2=min(max(hAt(gUv,blur2)*deep,0.),aAt(gUv,blur2).a);
  vec2 at=gUv*uCss,toEdge=min(at-uFrame.xy,uFrame.zw-at);
  float fade=smoothstep(0.,36.,min(toEdge.x,toEdge.y));
  shA=(1.-(1.-min((1.-pk)*.38*uPageShade,.9))*(1.-amb*.3)*(1.-amb2*.22))*fade*mix(.45,1.,smoothstep(0.,.5,uRoom));
  // A body turning over lifts off the page, and comes back down.
  if(uSpin.y>0.) shA*=uRound.y*uRound.y;
  }
  return shA;
}
float keyShadow(float h,vec3 L){return shadow(gUv,h,L,.34,1.);}
float torchShadow(float h,vec3 L){return shadow(gUv,h,L,.2,1.);}
float pointShadow(float h,vec3 L){return shadow(gUv,h,L,.3,1.);}
float skyShadow(float h){return shadow(gUv,h,uSky,.75,1.);}
// How open the place a view ray landed on is, and which way, from a map at half size: read straight it shows its pixels along every sharp edge.
vec4 openness(vec2 eo){
  return (textureLod(tO,gUv+eo,0.)+textureLod(tO,gUv-eo,0.)+textureLod(tO,gUv+vec2(eo.x,-eo.y),0.)+textureLod(tO,gUv-vec2(eo.x,-eo.y),0.))*.25;
}
bool glowless(){return false;}
bool paneLoad(int i,vec2 at){for(int t=0;t<18;t++) gP[t]=uPane[i*18+t];return true;}
#if defined(SHADOWS)
// Soft shadows hold up at half size while a lamp moves. What's near an edge marches too, or the
// half size pixels beside it would bring an empty pixel's answer in.
void main(){
  vec2 uv=vUv+textureLod(tBake,vec3(vUv.x,1.-vUv.y,1.),0.).xy;
  float cov=textureLod(tA,AT(uv),0.).a,near=textureLod(tA,AT(uv),2.+log2(uDpr)).a,sk=1.,pk=1.,st=1.,sp=1.;
  if(near>.004){
    float h=textureLod(tH,AT(uv),0.).r/max(cov,.25);
    vec3 P=vec3(uv*uCss*MM,h);
    // Past a split a channel shows through, and it casts nothing.
    if(uDebug==0||uSplit<0.||P.x<uSplit+1.){
      if(uRoom>.15) sk=shadow(uv,h,keyFrom(P),.34,1.);
      if(uTorch.w>0.&&offAxis(P)<2.) st=shadow(uv,h,normalize(uTorch.xyz-P),.2,1.);
      // Only the strongest flash or flame casts, as in the full light.
      if(uPoints>0) sp=shadow(uv,h,normalize(uPoint[0].xyz-P),.3,1.);
    }
  }
  // Every step, as the full light takes it: with half of them it missed the body close in, and the band along it came out light.
  if(near<.996&&textureLod(tTop,uv,0.).g>0.) pk=shadow(uv,uLift,pageFrom(uv),.6,1.);
  o=vec4(sk,pk,st,sp);
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
#endif`,Mt=new Map,Nt={panels:[{at:[-.55,-.35],size:[.42,.8],soft:.16,power:1.25},{at:[.75,.3],size:[.16,.9],soft:.12,power:1},{at:[.05,-1.5],size:[1.3,.25],soft:.2,power:1.2}],dark:.1,glow:.3,tent:.35,camera:.7,lamp:[-.96,-3.15],power:1.15,soft:.05,sway:3.2,fill:.6,shadow:1.5,color:[1,1,1]};function Pt(e,t){Mt.set(e,{...Nt,...t})}function Ft(e){return Mt.get(e)??Nt}var It={flashlight:{cone:.2,core:1.1,flood:.4,spill:.07,edge:.3,rings:.03,color:[1,.97,.9],power:1,hold:1,arm:.4,flicker:0,fluoresce:0},candle:{cone:1.15,core:0,flood:1,spill:0,edge:0,rings:0,color:[1,.55,.2],power:.55,hold:.3,arm:.85,flicker:.2,fluoresce:0},blacklight:{cone:.3,core:.3,flood:.5,spill:.03,edge:.35,rings:0,color:[.3,.1,1],power:.5,hold:.8,arm:.4,flicker:0,fluoresce:7}};Pt(`studio`,{}),Pt(`desk`,{panels:[{at:[-.8,-.9],size:[.22,.22],soft:.14,power:2.6}],dark:.02,glow:.04,tent:.22,lamp:[-1.5,-1.9],power:1.35,soft:.04,sway:1.8,fill:.5,shadow:1.5}),Pt(`window`,{panels:[{at:[-1,-.2],size:[.55,1.2],soft:.3,power:1.5}],dark:.14,glow:.5,tent:.85,lamp:[-1.6,-.9],power:.7,soft:.28,sway:.5,fill:1.25,shadow:.65}),Pt(`control`,{panels:[{at:[0,-2.4],size:[1.6,.06],soft:.3,power:.35},{at:[0,-3.4],size:[1.6,.06],soft:.3,power:.25}],dark:.005,glow:.01,tent:.06,camera:.9,lamp:[.2,-3.6],power:.75,soft:.22,sway:.4,fill:.35,shadow:1.2}),Pt(`console`,{...Ft(`control`),lamp:[-1.3,-1.7],power:.95,soft:.06,fill:.3,shadow:1.4,glow:.015}),Pt(`alert`,{...Ft(`control`),color:[1.6,.05,.02],power:.9}),Pt(`blackout`,{...Ft(`control`),panels:[{at:[0,-2.4],size:[1.6,.06],soft:.3,power:.03}],power:.06,fill:.08,dark:.002,glow:0,shadow:.4}),Pt(`tent`,{panels:[{at:[-.6,-.5],size:[.7,.9],soft:.3,power:1.5},{at:[.9,.5],size:[.4,.8],soft:.25,power:1.1},{at:[0,-1.5],size:[1.6,.4],soft:.3,power:1.4}],dark:.16,glow:.55,tent:.85,camera:.25,lamp:[-1.2,-2.6],power:.8,soft:.2,sway:.8,fill:1.1,shadow:.8}),Pt(`outdoors`,{panels:[{at:[0,-1.1],size:[2.4,1.3],soft:.5,power:1.5}],dark:.4,glow:.7,tent:.75,camera:0,lamp:[-1.25,-2.4],power:1,soft:.1,sway:.5,fill:1.1,shadow:1});var Lt=.25,Rt={surface:0,cut:1,screen:2,glass:3,frost:4,glow:5},zt=7,Bt={rect:0,capsule:1,field:2,holes:3,arc:5,mask:6},Vt={crt:0,led:1,lcd:2,oled:3,eink:4,coat:5,tft:6},Ht={flat:0,round:1,chamfer:2,dome:3,blend:4};function Ut(e,t,n,r,i,a){if(typeof t.draw==`function`){let{hw:o,hh:s}=t.source??t,c=(o+t.spread)*2,l=(s+t.spread)*2;return e.save(),e.setTransform(i/c,0,0,a/l,n+i/c*t.spread,r+a/l*t.spread),e.fillStyle=`#fff`,t.draw(e,o*2,s*2),e.restore(),!0}let o=t.key.split(`|`),s=t.hw*2,c=t.hh*2,l=s+t.spread*2,u=c+t.spread*2;if(o[0]!==`p`&&o[0]!==`t`)return!1;if(e.save(),e.setTransform(i/l,0,0,a/u,n+i/l*t.spread,r+a/u*t.spread),e.fillStyle=`#fff`,o[0]===`p`){let[t,n,r,i]=o[2].split(`,`).map(Number);e.scale(s/r,c/i),e.translate(-t,-n),e.fill(new Path2D(o[1]),o[4]||`nonzero`)}else{let[,t,n,r,i,a]=o;e.font=n,e.letterSpacing=r||`0px`,e.wordSpacing=i||`0px`,e.textBaseline=`middle`,e.textAlign=a||`center`,e.fillText(t,a===`left`?0:a===`right`?s:s/2,c/2)}return e.restore(),!0}function Wt(e,t){if(typeof e.draw==`function`){let{hw:n,hh:r}=e.source??e,i=(n+e.spread)*2,a=(r+e.spread)*2,o=Math.max(4,Math.ceil(i*t)),s=Math.max(4,Math.ceil(a*t)),c=new OffscreenCanvas(o,s).getContext(`2d`,{willReadFrequently:!0});c.fillStyle=`#fff`,c.setTransform(o/i,0,0,s/a,o/i*e.spread,s/a*e.spread),c.save(),e.draw(c,n*2,r*2),c.restore();let l=c.getImageData(0,0,o,s).data,u=new Float32Array(o*s);for(let e=0;e<o*s;e++)u[e]=l[e*4+3]/255;return{w:o,h:s,cover:u}}if(e.mask){let{w:n,h:r,bits:i,packed:a}=e.mask,o=atob(a??i),s=new Float32Array(n*r);if(a)for(let e=0;e<n*r;e++)s[e]=o.charCodeAt(e>>3)>>7-(e&7)&1;else for(let e=0;e<n*r;e++)s[e]=o.charCodeAt(e);let c=t/e.mask.r;if(!(c<.999))return{w:n,h:r,cover:s};let l=Math.max(4,Math.ceil(n*c)),u=Math.max(4,Math.ceil(r*c)),d=new Float32Array(l*u),f=new Float32Array(l*u);for(let e=0;e<r;e++)for(let t=0;t<n;t++){let r=Math.min(u-1,Math.floor(e*c))*l+Math.min(l-1,Math.floor(t*c));d[r]+=s[e*n+t],f[r]++}for(let e=0;e<l*u;e++)d[e]=f[e]?d[e]/f[e]:0;return{w:l,h:u,cover:d}}let n=(e.hw+e.spread)*2,r=(e.hh+e.spread)*2,i=Math.max(4,Math.ceil(n*t)),a=Math.max(4,Math.ceil(r*t)),o=new OffscreenCanvas(i,a).getContext(`2d`,{willReadFrequently:!0});Ut(o,e,0,0,i,a)||(o.fillStyle=`#fff`,o.fillRect(0,0,i,a));let s=o.getImageData(0,0,i,a).data,c=new Float32Array(i*a);for(let e=0;e<i*a;e++)c[e]=s[e*4+3]/255;return{w:i,h:a,cover:c}}function Gt(e,t,n,r,i){let a=0;r[0]=0,i[0]=-0x56bc75e2d63100000,i[1]=0x56bc75e2d63100000;for(let n=1;n<t;n++){let t=(e[n]+n*n-(e[r[a]]+r[a]*r[a]))/(2*n-2*r[a]);for(;t<=i[a];)a--,t=(e[n]+n*n-(e[r[a]]+r[a]*r[a]))/(2*n-2*r[a]);a++,r[a]=n,i[a]=t,i[a+1]=0x56bc75e2d63100000}a=0;for(let o=0;o<t;o++){for(;i[a+1]<o;)a++;n[o]=(o-r[a])**2+e[r[a]]}}function Kt(e,t,n){let r=Math.max(t,n),i=new Float64Array(r),a=new Float64Array(r),o=new Int32Array(r),s=new Float64Array(r+1);for(let r=0;r<t;r++){for(let a=0;a<n;a++)i[a]=e[a*t+r];Gt(i,n,a,o,s);for(let i=0;i<n;i++)e[i*t+r]=a[i]}for(let r=0;r<n;r++){for(let n=0;n<t;n++)i[n]=e[r*t+n];Gt(i,t,a,o,s);for(let n=0;n<t;n++)e[r*t+n]=a[n]}}function qt({w:e,h:t,cover:n},r){let i=new Float64Array(e*t),a=new Float64Array(e*t),o=new Float32Array(e*t);for(let r=0;r<e*t;r++){let e=n[r],t=.5-e;e>=1?(i[r]=0,a[r]=0x56bc75e2d63100000):e<=0?(i[r]=0x56bc75e2d63100000,a[r]=0):(i[r]=t>0?t*t:0,a[r]=t<0?t*t:0)}Kt(i,e,t),Kt(a,e,t);for(let n=0;n<e*t;n++)o[n]=(Math.sqrt(i[n])-Math.sqrt(a[n]))/r;return o}var Jt=new Map,Yt=new Map,Xt=null;function Zt(){let e=`${Gt}\n${Kt}\n${qt}\nonmessage = e => { const { k, w, h, cover, r } = e.data, d = sdf({ w, h, cover }, r); postMessage({ k, d }, [d.buffer]); };`,t=new Worker(URL.createObjectURL(new Blob([e],{type:`text/javascript`})));return t.onmessage=e=>{let{k:t,d:n}=e.data;Jt.set(t,{m:Yt.get(t),d:n}),Yt.delete(t)},t}var Qt=class e{constructor(e){this.gl=e,this.bytes=0,this.texture=null,this.placed=new Map,this.sig=null}static sharp(e,t,n){let r=Math.max(e.shape.hw+e.shape.spread,e.shape.hh+e.shape.spread)*2,i=Math.min(n,t/r);return e.shape.mask?Math.min(e.shape.mask.r,i):i}static made(e,t){let n=`${e.key}|${t}`;return Jt.get(n)??Jt.set(n,(e=>({m:e,d:qt(e,t)}))(Wt(e.shape,t))).get(n)}static prepare(t,n,r,i){let a=!0;for(let o of t){let t=e.sharp(o,n,r),s=`${o.key}|${t}`;if(Jt.has(s)||(a=!1,Yt.has(s)||performance.now()>i))continue;let c=Wt(o.shape,t);Yt.set(s,{w:c.w,h:c.h}),(Xt??=Zt()).postMessage({k:s,w:c.w,h:c.h,cover:c.cover,r:t},[c.cover.buffer])}return a}place(t,n,r=8){let i=this.gl,a=4096,o=t.map(t=>{let i=e.sharp(t,n,r);return{key:t.key,r:i,...e.made(t,i)}}),s=o.map(e=>`${e.key}|${e.r}`).join(`
`);if(s===this.sig)return this.placed;o.sort((e,t)=>t.m.h-e.m.h);let c=o.reduce((e,t)=>e+(t.m.w+1)*(t.m.h+1),0),l=Math.max(1,...o.map(e=>e.m.w+1)),u=Math.min(a,Math.max(l,2**Math.ceil(Math.log2(Math.max(1,Math.sqrt(c*1.15)))))),d=0,f=0,p=0,m=o.map(e=>{d+e.m.w>u&&(d=0,f+=p+1,p=0);let t=[d,f];return d+=e.m.w+1,p=Math.max(p,e.m.h),t}),h=Math.max(1,f+p);if(h>a||l>a)return this.place(t,n/2,r/2);this.texture&&i.deleteTexture(this.texture),this.texture=i.createTexture(),i.bindTexture(i.TEXTURE_2D,this.texture),i.texStorage2D(i.TEXTURE_2D,1,i.R32F,u,h);for(let[e,t]of[[i.TEXTURE_MIN_FILTER,i.NEAREST],[i.TEXTURE_MAG_FILTER,i.NEAREST],[i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE],[i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE]])i.texParameteri(i.TEXTURE_2D,e,t);let g=i.createFramebuffer();return i.bindFramebuffer(i.FRAMEBUFFER,g),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,this.texture,0),i.drawBuffers([i.COLOR_ATTACHMENT0]),i.clearBufferfv(i.COLOR,0,[64,0,0,0]),i.deleteFramebuffer(g),i.bindTexture(i.TEXTURE_2D,this.texture),this.placed=new Map,o.forEach(({key:e,r:t,m:n,d:r},a)=>{let[o,s]=m[a];i.texSubImage2D(i.TEXTURE_2D,0,o,s,n.w,n.h,i.RED,i.FLOAT,r),this.placed.set(e,{rect:[o/u,s/h,n.w/u,n.h/h],texels:t,area:n.w*n.h})}),this.sig=s,this.bytes=u*h*4,this.placed}destroy(){this.texture&&this.gl.deleteTexture(this.texture),this.texture=null,this.bytes=0,this.sig=null}},$t=new WeakMap,en=(e,t,n)=>`uniform sampler2D tBlk;\n${e.map(e=>`${e.type} ${e.name};`).join(``)}\nvoid load(int i){\n${t.map((e,t)=>`vec4 b${t}=texelFetch(tBlk,ivec2(${t},i),0);`).join(``)}\n${e.map(e=>`${e.name}=${e.type===`int`?`int(b${e.row}.${n[e.col]})`:`b${e.row}.${n.slice(e.col,e.col+e.size)}`};`).join(``)}}`;function tn(e){if($t.has(e))return $t.get(e);e.canvas.addEventListener(`webglcontextlost`,()=>$t.delete(e),{once:!0});let t=e.createProgram();for(let[n,r]of[[e.VERTEX_SHADER,pt],[e.FRAGMENT_SHADER,mt]]){let i=e.createShader(n);e.shaderSource(i,r),e.compileShader(i),e.attachShader(t,i)}if(e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS))throw Error(`material: `+e.getProgramInfoLog(t));let n=new qe(e,t,`Command`),r=e.getUniformBlockIndex(t,`Command`),i={[e.FLOAT]:[`float`,1],[e.FLOAT_VEC2]:[`vec2`,2],[e.FLOAT_VEC3]:[`vec3`,3],[e.FLOAT_VEC4]:[`vec4`,4],[e.INT]:[`int`,1]},a=ft+rn,o=[...e.getActiveUniformBlockParameter(t,r,e.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)].map(r=>{let a=e.getActiveUniform(t,r),[o,s]=i[a.type];return{name:a.name,type:o,size:s,at:n.at[a.name]}}).filter(e=>RegExp(`\\b${e.name}\\b`).test(a)).sort((e,t)=>t.size-e.size),s=[];for(let e of o){let t=s.findIndex(t=>t+e.size<=4);t<0&&(t=s.push(0)-1),e.row=t,e.col=s[t],s[t]+=e.size}let c={program:t,vals:o,rows:s,glsl:en(o,s,`xyzw`)};return e.isContextLost()||$t.set(e,c),c}function nn(e,t){let{program:n,vals:r,rows:i,glsl:a}=tn(e),o=new qe(e,n,`Command`),s=i.length,c=new Float32Array(Math.max(t.length,1)*s*4),l=new bt(e,o,{get:()=>null},null),u={spec:{dpr:1,fine:1},paned:new Set,tex:{targets:[]}};return t.forEach((e,t)=>{if(e.op===`surface`||e.op===`cut`){o.f.fill(0),l.draw(e,u),l.later.length=0;for(let e of r)for(let n=0;n<e.size;n++)c[(t*s+e.row)*4+e.col+n]=e.type===`int`?o.i[e.at]:o.f[e.at+n]}}),{data:c,width:s,glsl:a,count:r.length}}var rn=`uRot uCenter uSeed uWear uFilm uCoatRough uScatter uMarks uBendDir uBendAt uBendReach uBendDrop uBendK uBendBoth uGroundWear uGroundSeed uChip`,an=(e,t)=>e.x<t.x+t.w&&t.x<e.x+e.w&&e.y<t.y+t.h&&t.y<e.y+e.h,on=(e=null)=>!!e&&(e[0]>0||e[1]>0||e[2]>0),sn=e=>e.op===`screen`||e.op===`glow`||(e.op===`surface`?on(e.material?.emit):e.op===`cut`&&on(e.emit));function cn(e){let t=[],n=new Map;e.forEach((r,i)=>{if(r.op!==`glass`||r.shape.type!==`rect`||r.shape.rotate||r.bend&&r.bend.k>=0)return;t.push(r);let a=W(r);n.set(r,e.slice(0,i).reduce((e,t)=>t.op!==`glass`&&`zTop`in t&&an(W(t),a)?Math.max(e,vt(t)):e,0))});let r=new Set([...t].sort((e,t)=>t.shape.hw*t.shape.hh-e.shape.hw*e.shape.hh).slice(0,8));return{kept:r,data:t.filter(e=>r.has(e)).flatMap(e=>{let{shape:t,height:r,bevel:i,curve:a,film:o,rim:s,tint:c,coat:l,chamfer:u,reflect:d}=e;return[t.cx,t.cy,t.hw,t.hh,t.radius,r/(i*Lt),i,a,Math.max(s/Lt,1),...c,l,o,n.get(e)+r,u[0]/Lt,u[1],d]})}}function ln(e){let t=new Map;for(let n of e.commands)if(!n.section)for(let e of[n.shape,n.on])e?.type===`field`&&!t.has(e.key+`|`+e.spread)&&t.set(e.key+`|`+e.spread,{key:e.key+`|`+e.spread,shape:e});return t}function un(e,t,n={}){let{fieldBudget:r=1024,fieldMost:i=8}=n,a=performance.now(),o={},s=[],c=e=>o[e]=(o[e]??0)+1,l=ln(t),u=cn(t.commands);for(let e of t.commands)u.kept.has(e)||(e.bend&&c(`bend`),e.section?c(`section`):(e.shape?.type===`field`&&e.shape.key[0]===`i`&&c(`image field`),e.shape?.type===`mask`&&c(`mask (print from DOM)`),e.op===`screen`&&c(`screen content (DOM)`),s.push(e)));let d=n.fields??=new Qt(e),f=performance.now(),p=d.place([...l.values()],r,i),m=performance.now()-f,h=s.length,g=new Float32Array(h*15*4),_=[],v=[...new Set(s.flatMap(e=>e.aim?.rows?[e.aim.rows]:[]))];s.forEach((e,t)=>{let n=e.shape,r=t*15*4,i=(e,t,n,i,a)=>g.set([t,n,i,a],r+e*4),a=Bt[n.type]??0,o=e.op===`cut`&&(n.type===`mask`||n.type===`field`&&n.key[0]===`t`)?1:e.op===`screen`&&(Vt[e.kind]??2)>=2?2:0;if(i(0,Rt[e.op],a,n.cx??0,n.cy??0),i(1,n.hw??0,n.hh??0,n.radius??0,n.rotate??0),n.type===`mask`&&(i(0,Rt[e.op],a,n.box.x+n.box.w/2,n.box.y+n.box.h/2),i(1,n.box.w/2,n.box.h/2,0,0)),n.type===`capsule`&&(i(1,n.ax,n.ay,n.bx,n.by),i(6,n.ra,n.rb,0,0)),e.op===`surface`)i(2,e.zEdge,e.zTop,e.bevel,Ht[e.profile]??0),i(5,e.bridge??0,0,+!!e.bend,e.follow&&!e.bridge?1:0),i(4,e.crown[0],e.crown[1],e.dish,0),i(3,e.tilt[0],e.tilt[1],0,0),i(7,0,0,0,o);else if(e.op===`cut`){i(2,e.depth,e.soft,e.feather,+!!e.ink),i(3,...e.ink??[0,0,0],e.rough);let t=e.on?.type===`rect`||e.on?.type===`field`?e.on:null;i(4,e.metal,+!!t,0,0),i(5,...e.emit??[0,0,0],0),i(7,0,0,0,o),t&&(i(8,t.cx,t.cy,t.hw,t.hh),i(9,t.type===`field`?2:1,t.type===`field`?t.spread:t.radius,t.rotate??0,t.type===`field`?t.spread*(t.hh/(t.source?.hh??t.hh)):0),t.type===`field`&&i(10,...p.get(t.key+`|`+t.spread).rect))}else e.op===`screen`?(i(2,Vt[e.kind]??2,e.zTop,e.gain??1,e.inset?.[0]??0),i(3,...e.color??[.1,.1,.1],e.rough??.1),i(4,e.metal??0,e.coat??1,e.inset?.[1]??0,+!!e.at),i(5,...e.emit??[0,0,0],0),i(6,...e.at??[0,0,0,0]),i(7,...e.ink??[0,0,0],o)):e.op===`glass`?i(2,e.height,e.bevel,e.coat,0):e.op===`frost`?(i(2,e.zTop,e.zEdge,e.bevel,e.blur),i(3,...e.tint,e.opacity),i(4,e.rough,e.coat,e.zoom,e.transmit)):e.op===`glow`&&(i(2,e.width,0,0,0),i(5,...e.color,0));n.type===`field`?(i(6,...p.get(n.key+`|`+n.spread).rect),g[r+28+2]=n.spread,g[r+20+3]+=0,g[r+28+0]=n.grow??0):n.type===`arc`?i(6,n.mid,n.half,n.r,n.width/2):n.type===`rect`&&e.op!==`screen`&&n.ripple?i(6,n.ripple[0],n.ripple[1],0,0):n.type===`holes`&&i(6,n.pitch??n.holes?.[0]??0,n.hole??n.holes?.[1]??0,+!!n.square,0),(e.op===`surface`||e.op===`cut`)&&(g[r+28+0]=n.grow??0,g[r+28+1]=n.ring??0);let s;if(e.aim){let{box:t,seen:n,from:a,reach:o,rows:c}=e.aim;g[r]=c?zt:6,i(11,...n),i(12,...a,c?v.indexOf(c):0),i(13,o.x,o.y,o.x+o.w,o.y+o.h),i(14,c?.y0??0,c?.step??0,c?.n??0,e.mid??0),s=[t.x,t.y,t.x+t.w,t.y+t.h]}else if(n.type===`capsule`){let e=Math.max(n.ra,n.rb);s=[Math.min(n.ax,n.bx)-e,Math.min(n.ay,n.by)-e,Math.max(n.ax,n.bx)+e,Math.max(n.ay,n.by)+e]}else if(n.type===`mask`)s=[n.box.x,n.box.y,n.box.x+n.box.w,n.box.y+n.box.h];else{let t=n.rotate??0,r=Math.abs(Math.cos(t)),i=Math.abs(Math.sin(t)),a=2+Math.max(n.grow??0,0)+(n.ring??0)+(n.spread??0)+(e.op===`cut`?e.soft??0:e.op===`glow`?e.width:0),o=n.hw*r+n.hh*i+a,c=n.hw*i+n.hh*r+a;s=[n.cx-o,n.cy-c,n.cx+o,n.cy+c]}_.push(s)});let y=_.filter((e,t)=>s[t].op!==`cut`),b=(y.length?y:_).reduce((e,t)=>[Math.min(e[0],t[0]),Math.min(e[1],t[1]),Math.max(e[2],t[2]),Math.max(e[3],t[3])],[1e9,1e9,-1e9,-1e9]);_.forEach((e,t)=>{s[t].op===`cut`&&(e[0]=Math.max(e[0],b[0]),e[1]=Math.max(e[1],b[1]),e[2]=Math.max(e[0],Math.min(e[2],b[2])),e[3]=Math.max(e[1],Math.min(e[3],b[3])))});let x=n.into?.n===h?n.into:null,S=(t,n)=>t?(e.bindTexture(e.TEXTURE_2D,t),t):(t=e.createTexture(),e.bindTexture(e.TEXTURE_2D,t),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA32F,n,Math.max(h,1)),dn(e),t),C=S(x?.tex,15);h&&e.texSubImage2D(e.TEXTURE_2D,0,0,0,15,h,e.RGBA,e.FLOAT,g);let w=performance.now(),T=nn(e,s),E=performance.now()-w,D=S(x?.valuesWidth===T.width?x.blk:null,T.width);h&&e.texSubImage2D(e.TEXTURE_2D,0,0,0,T.width,h,e.RGBA,e.FLOAT,T.data);let O=s.flatMap((e,t)=>e.op===`frost`&&s[t-1]?.op!==`frost`?[t]:[]),k=_.filter((e,t)=>s[t].op===`frost`),A=Math.max(0,...s.map(e=>e.op===`frost`?e.blur:0)),j=k.length?k.reduce((e,t)=>[Math.min(e[0],t[0]),Math.min(e[1],t[1]),Math.max(e[2],t[2]),Math.max(e[3],t[3])]).map((e,t)=>e+(t<2?-1:1)*(A+2)):null,M=[];s.forEach((e,t)=>{if(e.op!==`surface`||!e.bridge)return;let n=_[t],r=Math.max(n[2]-n[0],n[3]-n[1])/2,i=[n[0]-e.bridge*2,n[1]-e.bridge*2,n[2]+e.bridge*2,n[3]+e.bridge*2];g[t*15*4+20+1]=r;let a=M.at(-1),o=e=>_[e][0]<i[2]&&i[0]<_[e][2]&&_[e][1]<i[3]&&i[1]<_[e][3],s=!!a;for(let e=a?.at??t;s&&e<t;e++)s=!o(e);s?(a.boxes.push(i),a.half=Math.max(a.half,r)):M.push({at:t,boxes:[i],half:r})}),M.length&&(e.bindTexture(e.TEXTURE_2D,C),e.texSubImage2D(e.TEXTURE_2D,0,0,0,15,h,e.RGBA,e.FLOAT,g));let N=null;v.length&&(N=e.createTexture(),e.bindTexture(e.TEXTURE_2D,N),e.texStorage2D(e.TEXTURE_2D,1,e.RG32F,Math.max(...v.map(e=>e.n)),v.length),dn(e),v.forEach((t,n)=>e.texSubImage2D(e.TEXTURE_2D,0,0,n,t.n,1,e.RG,e.FLOAT,t.data)));let P=[];s.forEach((e,t)=>{if(e.aim?.rows){let e=P[P.length-1];e?.to===t?e.to=t+1:P.push({at:t,to:t+1})}});let F=h;for(;F>0&&s[F-1].aim&&!s[F-1].aim.rows;)F--;return{sections:P,plain:F,rowsTex:N,levels:M,splits:O,blur:A,frostBox:j,panes:u.data,glows:t.commands.some(sn),tex:C,blk:D,glsl:T.glsl,values:T.count,n:h,boxes:_,cmds:s,packed:g,valuesPacked:T.data,valuesWidth:T.width,fields:d,fieldArea:[...p.values()].reduce((e,t)=>e+t.area,0),unfit:o,extent:b,bytes:(15+T.width)*Math.max(h,1)*16,compileMs:performance.now()-a,fieldsMs:m,valuesMs:E,peak:Math.max(n.peak??0,...s.map(e=>Math.max(e.zTop??0,e.zEdge??0)))+Math.max(0,...s.map(e=>e.op===`glass`?e.height:0))}}function dn(e){for(let[t,n]of[[e.TEXTURE_MIN_FILTER,e.NEAREST],[e.TEXTURE_MAG_FILTER,e.NEAREST],[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE]])e.texParameteri(e.TEXTURE_2D,t,n)}var fn=`#version 300 es
void main(){vec2 c=vec2(gl_VertexID&1,gl_VertexID>>1);gl_Position=vec4(c*4.-1.,0.,1.);}`,pn=`
const float MM=${Lt},PI=3.14159265;
`,mn=`vec4 C[15];
// Catmull-Rom over the field's texels: it passes through them and its slope is continuous, so a bevel built on it shows no
// facets however far it's magnified. Its bumps between texels are still the texels' own: a path is only as true as its field.
vec4 cr(float t){float t2=t*t,t3=t2*t;return vec4(-.5*t3+t2-.5*t,1.5*t3-2.5*t2+1.,-1.5*t3+2.*t2+.5*t,.5*t3-.5*t2);}
float fieldAt(vec2 uv){
  vec2 sz=vec2(textureSize(tField,0)),t=uv*sz-.5,f=fract(t);ivec2 i=ivec2(floor(t))-1;
  vec4 wx=cr(f.x),wy=cr(f.y);float s=0.;
  for(int y=0;y<4;y++){float r=0.;for(int x=0;x<4;x++) r+=wx[x]*texelFetch(tField,i+ivec2(x,y),0).r;s+=wy[y]*r;}
  return s;
}
// A field's distance at its own place t, 0 to 1 over its box and spread: from the atlas, or, where the page has one, from a
// sharper copy it keeps of what's on screen.
#ifdef CLOSE_FIELDS
float fieldT(vec2 t);
#else
float fieldT(vec2 t){return fieldAt(C[6].xy+t*C[6].zw);}
#endif
float sdRR(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float bevelIn(vec2 p,vec2 b,float r){vec2 u=abs(p)-b+r;float t=r-max(u.x,u.y),gap=u.x-u.y,disc=2.*r*r-gap*gap;
  if(disc>0.){float c=(sqrt(disc)-u.x-u.y)*.5;if(min(u.x,u.y)+c>=0.)t=c;}return t;}
float capT,capLift;
float dist(int type,vec2 P,out vec2 q){
  vec2 c=C[0].zw,h=C[1].xy;q=rm(C[1].w)*(P-c);
  if(type==6) return sdRR(q,h,C[1].z);
  if(type==0){
    float d=sdRR(q,h,C[1].z),n=C[6].x;
    // Waves round the edge, or scoops: round cuts with a flat land left between each and the next.
    if(n!=0.&&(C[0].x<2.||C[0].x>5.)){float a=atan(q.y,q.x)*abs(n);if(n>0.) d+=C[6].y*(.5+.5*sin(a));else{float x=(fract(a/6.2832)-.5)/.42;d+=C[6].y*sqrt(max(1.-x*x,0.));}}
    return d;
  }
  if(type==1){vec2 a=C[1].xy,b=C[1].zw-a,d=P-a;float bb=max(dot(b,b),1e-4);capT=clamp(dot(d,b)/bb,0.,1.);
    float rad=mix(C[6].x,C[6].y,capT*capT),dd=length(d-b*capT);capLift=sqrt(max(rad*rad-dd*dd,0.))*MM;return dd-rad;}
  if(type==2){vec2 sp=vec2(C[7].z);vec2 t=q/(2.*(h+sp))+.5;t.y=t.y;
    if(any(lessThan(t,vec2(0)))||any(greaterThan(t,vec2(1)))) return 1e3;
    return fieldT(t)-C[7].x;}
  if(type==5){float a=mod(atan(q.x,-q.y)-C[6].x+3.14159265,6.2831853)-3.14159265,l=length(q),b=abs(a)-C[6].y;
    if(b<=0.) return abs(l-C[6].z)-C[6].w;return length(l*vec2(cos(b),sin(b))-vec2(C[6].z,0.))-C[6].w;}
  if(type==3){vec2 s=vec2(C[6].x,C[6].x*(C[6].z>.5?1.:1.732));vec2 a=mod(q,s)-s*.5,b=mod(q+s*.5,s)-s*.5;
    vec2 cc=C[6].z>.5||dot(a,a)>=dot(b,b)?b:a;if(sdRR(q-cc,h,C[1].z)>-C[6].y) return 1e3;return length(cc)-C[6].y;}
  return 1e3;
}
float top(int type,vec2 q,float d){
  float inner=-d;int prof=int(C[2].w);
  if(type==1&&prof==1) return mix(C[2].x,C[2].y,capT)+capLift;
  if(type==0&&prof!=3){float m=min(C[1].x,C[1].y);if(C[1].z<m*.98) inner=bevelIn(q,C[1].xy,clamp(max(C[1].z,C[2].z*.8),.01,m*.9));}
  float e=clamp(inner/max(C[2].z,.01),0.,1.);
  float pe=prof==0?1.:prof==1?sqrt(1.-(1.-e)*(1.-e)):prof==4?e*e*(3.-2.*e):e;
  vec2 hh=type==1?vec2(1e3):C[1].xy;
  if(prof==3){float n=clamp(length(q)/hh.x,0.,1.);pe=sqrt(1.-n*n);}
  vec2 qq=clamp(q/hh,-1.,1.);
  float z=mix(C[2].x,C[2].y-dot(C[4].xy,qq*qq)-dot(C[3].xy,qq),pe);
  if(C[4].z>0.){vec2 u=q/hh;z-=C[4].z*(1.-clamp(dot(u,u),0.,1.));}
  return z;
}
`,hn=`#version 300 es
precision highp float;
uniform sampler2D tH;uniform int uLod;
out vec4 o;
void main(){ivec2 p=ivec2(gl_FragCoord.xy)*2;ivec2 m=textureSize(tH,uLod)-1;
  float a=texelFetch(tH,min(p,m),uLod).r,b=texelFetch(tH,min(p+ivec2(1,0),m),uLod).r,c=texelFetch(tH,min(p+ivec2(0,1),m),uLod).r,d=texelFetch(tH,min(p+ivec2(1,1),m),uLod).r;
  o=vec4(max(max(a,b),max(c,d)));}`;`${pn}${Je}${wt}${6 .toFixed(1)}${8 .toFixed(1)}${$e[0].toFixed(2)}${($e.length-1.01).toFixed(2)}${et.toFixed(2)}${3 .toFixed(1)}${8 .toFixed(1)}${8 .toFixed(1)}${8 .toFixed(1)}${8 .toFixed(1)}${8 .toFixed(1)}`;function K(e,t,n={},r=fn){let i=t;for(let[e,t]of Object.entries(n))i=i.replaceAll(RegExp(`\\b${e}\\b`,`g`),t);let a=e.createProgram(),o=[r,i].map((t,n)=>{let r=e.createShader(n?e.FRAGMENT_SHADER:e.VERTEX_SHADER);return e.shaderSource(r,t),e.compileShader(r),e.attachShader(a,r),[r,t]});e.linkProgram(a);let s={p:a,warm:!1,get u(){if(!e.getProgramParameter(a,e.LINK_STATUS)&&!e.isContextLost()){let t=o.find(([t])=>!e.getShaderParameter(t,e.COMPILE_STATUS));throw Error(t?e.getShaderInfoLog(t[0])+`
`+t[1].split(`
`).map((e,t)=>`${t+1} ${e}`).join(`
`).slice(0,4e3):e.getProgramInfoLog(a))}let t={};for(let n=0;n<e.getProgramParameter(a,e.ACTIVE_UNIFORMS);n++){let{name:r}=e.getActiveUniform(a,n);t[r]=e.getUniformLocation(a,r)}for(let t=0;t<e.getProgramParameter(a,e.ACTIVE_UNIFORM_BLOCKS);t++)e.uniformBlockBinding(a,t,t);return Object.defineProperty(s,"u",{value:t}),t}};return _n(e,s),s}var gn=[];function _n(e,t){gn.push([e,t]),gn.length===1&&(t.fence=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0),vn())}function vn(){(globalThis.requestIdleCallback??(e=>setTimeout(e,50)))(()=>{let[e,t]=gn[0],n=e.getExtension(`KHR_parallel_shader_compile`);if(e.isContextLost()){gn.shift(),gn.length&&vn();return}let r=!t.fence||e.clientWaitSync(t.fence,0,0)!==e.TIMEOUT_EXPIRED;if(t.fence&&r&&(e.deleteSync(t.fence),t.fence=null),r&&(!n||e.getProgramParameter(t.p,n.COMPLETION_STATUS_KHR))){gn.shift();try{t.u,e.useProgram(t.p),e.useProgram(null),t.warm=!0}catch{}}let i=gn[0]?.[1];i&&!i.fence&&(i.fence=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0),e.flush()),gn.length&&vn()})}function q(e,t,n,r,i=1){let a=e.createTexture();return e.bindTexture(e.TEXTURE_2D,a),e.texStorage2D(e.TEXTURE_2D,i,r,t,n),dn(e),a}function yn(e,t){let n=[],r=/[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/y,i=0,a=0,o=0,s=0,c=0,l=``,u=0,d=0,f=null,p=()=>{for(;i<e.length&&/[\s,]/.test(e[i]);)i++},m=()=>(p(),i<e.length&&/[-+.\d]/.test(e[i])),h=()=>{p(),r.lastIndex=i;let t=r.exec(e);return i=r.lastIndex,+t[0]},g=()=>(p(),e[i++]===`1`),_=(e,t)=>{f.push(e,t),a=e,o=t},v=(e,t)=>{for(let n=1;n<=e;n++)_(...t(n/e))};for(;i<e.length&&(p(),!(i>=e.length));){/[a-zA-Z]/.test(e[i])&&(l=e[i++]);let r=l.toUpperCase(),p=l!==r,y=p?a:0,b=p?o:0;if(r===`Z`)f&&f.length>2&&n.push(f),f=null,a=s,o=c,u=a,d=o;else if(r===`M`)f&&f.length>2&&n.push(f),a=h()+y,o=h()+b,s=a,c=o,f=[a,o],l=p?`l`:`L`,u=a,d=o;else{if(f??=[a,o],r===`L`)_(h()+y,h()+b);else if(r===`H`)_(h()+y,o);else if(r===`V`)_(a,h()+b);else if(r===`C`||r===`S`){let[e,n]=r===`C`?[h()+y,h()+b]:[2*a-u,2*o-d],i=h()+y,s=h()+b,c=h()+y,l=h()+b,f=a,p=o,m=Math.max(Math.hypot(f-2*e+i,p-2*n+s),Math.hypot(e-2*i+c,n-2*s+l));v(Math.max(1,Math.ceil(Math.sqrt(.75*m/t))),t=>{let r=1-t;return[r*r*r*f+3*r*r*t*e+3*r*t*t*i+t*t*t*c,r*r*r*p+3*r*r*t*n+3*r*t*t*s+t*t*t*l]}),u=i,d=s;continue}else if(r===`Q`||r===`T`){let[e,n]=r===`Q`?[h()+y,h()+b]:[2*a-u,2*o-d],i=h()+y,s=h()+b,c=a,l=o;v(Math.max(1,Math.ceil(Math.sqrt(.25*Math.hypot(c-2*e+i,l-2*n+s)/t))),t=>{let r=1-t;return[r*r*c+2*r*t*e+t*t*i,r*r*l+2*r*t*n+t*t*s]}),u=e,d=n;continue}else if(r===`A`){let e=Math.abs(h()),n=Math.abs(h()),r=h()*Math.PI/180,i=g(),s=g(),c=h()+y,l=h()+b,u=a,d=o;if(!e||!n)_(c,l);else{let f=Math.cos(r),p=Math.sin(r),m=(u-c)/2,h=(d-l)/2,g=f*m+p*h,_=-p*m+f*h,y=g*g/(e*e)+_*_/(n*n);y>1&&(e*=Math.sqrt(y),n*=Math.sqrt(y));let b=e*e*n*n-e*e*_*_-n*n*g*g,x=(i===s?-1:1)*Math.sqrt(Math.max(0,b/(e*e*_*_+n*n*g*g))),S=x*e*_/n,C=-x*n*g/e,w=f*S-p*C+(u+c)/2,T=p*S+f*C+(d+l)/2,E=(e,t,n,r)=>Math.atan2(e*r-t*n,e*n+t*r),D=E(1,0,(g-S)/e,(_-C)/n),O=E((g-S)/e,(_-C)/n,(-g-S)/e,(-_-C)/n);!s&&O>0?O-=2*Math.PI:s&&O<0&&(O+=2*Math.PI),v(Math.max(1,Math.ceil(Math.abs(O)/(2*Math.acos(Math.max(-1,1-t/Math.max(e,n)))))),t=>{let r=D+O*t,i=e*Math.cos(r),a=n*Math.sin(r);return[w+f*i-p*a,T+p*i+f*a]}),a=c,o=l}}u=a,d=o,!m()&&i<e.length&&!/[a-zA-Z]/.test(e[i])&&i++}}return f&&f.length>2&&n.push(f),n}var bn=/;(?![^(]*\))(?=(?:[^"']|"[^"]*"|'[^']*')*$)/,xn=/^.*?\d[\d.]*(?:px|pt|em|rem|%|vw|vh|ch|ex|q|mm|cm|in|pc)(?:\s*\/\s*\S+)?\s+/i;function Sn(e){return e.replace(xn,``).split(`,`).map(e=>e.trim().replace(/^["']|["']$/g,``)).filter(Boolean)}function Cn(e){let t=e.key?.split(`|`);if(t?.[0]!==`t`||t.length<7)return null;let n=t.slice(7);if(!n.every(e=>e===`flip`||/^x[\d.e+-]+$/.test(e)))return null;let[,r,i,a,o,s]=t,{hw:c,hh:l}=e.source??e;return{str:r,font:i,ls:a,ws:o,align:s,mods:n,hw:c,hh:l,spread:e.spread}}function wn(e,t,n,r,i,a){let o=(t.hw+t.spread)*2,s=(t.hh+t.spread)*2;e.save(),e.setTransform(i/o,0,0,a/s,n+i/o*t.spread,r+a/s*t.spread),e.fillStyle=`#fff`;let c=t.hw*2,l=t.hh*2;for(let n=t.mods.length-1;n>=0;n--){let r=t.mods[n];if(r===`flip`){e.translate(c,0),e.scale(-1,1);continue}let i=+r.slice(1);e.scale(i,i),c/=i,l/=i}e.font=t.font,e.letterSpacing=t.ls||`0px`,e.wordSpacing=t.ws||`0px`,e.textBaseline=`middle`,e.textAlign=t.align||`center`,e.fillText(t.str,t.align===`left`?0:t.align===`right`?c:c/2,l/2),e.restore()}function Tn(){let e=new Set,t=Promise.resolve(),n=async t=>{for(let n of t){let t=n.css,r=n.base;if(n.href)try{t=await(await fetch(n.href)).text(),r=n.href}catch{continue}for(let n of t.matchAll(/@font-face\s*\{([^}]*)\}/g)){let t=new Map;for(let e of n[1].split(bn)){let n=e.indexOf(`:`);n>0&&t.set(e.slice(0,n).trim().toLowerCase(),e.slice(n+1).trim())}let i=t.get(`font-family`)?.replace(/^["']|["']$/g,``),a=t.get(`src`);if(!i||!a)continue;let o=a.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/g,(e,t,n)=>`url("${new URL(n,r)}")`),s={};for(let[e,n]of[[`font-weight`,`weight`],[`font-style`,`style`],[`font-stretch`,`stretch`],[`unicode-range`,`unicodeRange`],[`font-feature-settings`,`featureSettings`]])t.has(e)&&(s[n]=t.get(e));try{self.fonts.add(new FontFace(i,o,s)),e.add(i)}catch{}}}postMessage({families:[...e]})},r=null;onmessage=async e=>{if(e.data.faces){t=n(e.data.faces);return}let{id:i,W:a,H:o,items:s}=e.data;await t;let c=[...new Set(s.map(e=>e.L.font))];await Promise.all(c.map(e=>self.fonts.load(e).catch(()=>null))),r&&r.width===a&&r.height===o||(r=new OffscreenCanvas(a,o));let l=r.getContext(`2d`);l.setTransform(1,0,0,1,0,0),l.fillStyle=`#000`,l.fillRect(0,0,a,o);for(let e of s)e.clip?(l.save(),l.beginPath(),l.rect(...e.clip),l.clip(),wn(l,e.L,e.x,e.y,e.w,e.h),l.restore()):wn(l,e.L,e.x,e.y,e.w,e.h);let u=r.transferToImageBitmap();postMessage({id:i,bitmap:u},[u])}}var En=null,Dn=null,On=0,kn=new Map,An=()=>new Set([...document.fonts].map(e=>e.family.replace(/^["']|["']$/g,``)));function jn(){if(En!==null||typeof Worker>`u`||typeof OffscreenCanvas>`u`)return;let e=`const SPLIT = ${bn}, FAMILY = ${xn};\n${wn}\n(${Tn})();`;En=new Worker(URL.createObjectURL(new Blob([e],{type:`text/javascript`}))),En.onmessage=e=>{if(e.data.families){Dn=new Set(e.data.families);return}let t=kn.get(e.data.id);kn.delete(e.data.id),t&&(t.bitmap=e.data.bitmap,t.ready=!0)},En.onerror=()=>{En=!1;for(let e of kn.values())e.ready=!0;kn.clear()};let t=[];for(let e of document.styleSheets)try{for(let n of e.cssRules)n instanceof CSSFontFaceRule&&t.push({css:n.cssText,base:e.href??document.baseURI})}catch{e.href&&t.push({href:e.href})}En.postMessage({faces:t})}function Mn(e){if(jn(),!En||!Dn)return!1;let t=Cn(e);if(!t)return!1;let n=An();return Sn(t.font).every(e=>!n.has(e)||Dn.has(e))}function Nn(e,t,n){let r=++On,i={ready:!1,bitmap:null};return kn.set(r,i),En.postMessage({id:r,W:e,H:t,items:n.map(({shape:e,...t})=>({L:Cn(e),...t}))}),i}var Pn=8,Fn=3,In=2,J=4,Ln=4096,Rn=64,zn=3e3,Bn=`#version 300 es
precision highp float;precision highp int;precision highp isampler2D;
uniform isampler2D tInfo;uniform int uMode,uL;uniform vec2 uTo;
flat out ivec4 vA,vB,vC,vRect;
void main(){
  int f=gl_InstanceID;
  vA=texelFetch(tInfo,ivec2(0,f),0);vB=texelFetch(tInfo,ivec2(1,f),0);vC=texelFetch(tInfo,ivec2(2,f),0);
  if(uMode>0&&vC.z!=uL){gl_Position=vec4(2,2,2,1);return;}
  ivec2 o=uMode==0?vA.xy:uMode==1?vA.xy>>uL:vC.xy,s=uMode==0?vA.zw:vA.zw>>uL;
  if(uMode==2){o-=${In};s+=2*${In};}
  vRect=ivec4(o,o+s);
  vec2 P=vec2(o)+vec2(gl_VertexID&1,gl_VertexID>>1)*vec2(s);
  gl_Position=vec4(P/uTo*2.-1.,0,1);
}`,Vn=`#version 300 es
precision highp float;precision highp int;precision highp usampler2D;
flat in ivec4 vA,vB,vC,vRect;out vec4 o;`,Hn=`${Vn}
uniform usampler2D tBits;
void main(){
  if(vB.z<0) discard; // drawn from its key
  ivec2 l=ivec2(gl_FragCoord.xy)-vA.xy;
  if(l.x>=vB.x||l.y>=vB.y){o=vec4(0);return;}
  int i=l.y*vB.x+l.x,b=vB.z+(i>>3);
  uint v=texelFetch(tBits,ivec2(b%${Ln},b/${Ln}),0).r;
  o=vec4(float((v>>uint(7-(i&7)))&1u));
}`,Un=`#version 300 es
precision highp float;
layout(location=0) in vec2 aP;uniform vec2 uAt,uTo;
void main(){gl_Position=vec4((aP+uAt)/uTo*2.-1.,0,1);}`,Wn=`#version 300 es
precision highp float;out vec4 o;void main(){o=vec4(1);}`,Gn=`${Vn}
uniform sampler2D tCov;
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  float b=step(.5,texelFetch(tCov,p,0).r);bool edge=false;
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++) if(step(.5,texelFetch(tCov,p+ivec2(x,y),0).r)!=b) edge=true;
  vec2 px=1./vec2(textureSize(tCov,0)),uv=(vec2(p)+.5)*px;vec3 moved;
  for(int k=1;k<=${Fn};k++){
    bool near=false;
    for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++) if(step(.5,textureLod(tCov,uv+vec2(x,y)*px,float(k)).r)==b) near=true;
    moved[k-1]=near?0.:1.;
  }
  o=vec4(moved,edge?1.:0.);
}`,Kn=`uniform highp sampler2D tSeg;
vec4 seg(int i){return texelFetch(tSeg,ivec2((i&1023)*2,i>>10),0);}
vec4 segN(int i){return texelFetch(tSeg,ivec2((i&1023)*2+1,i>>10),0);}
float segD(vec2 p,vec4 s,out float t){vec2 ab=s.zw-s.xy,ap=p-s.xy;t=clamp(dot(ap,ab)/max(dot(ab,ab),1e-12),0.,1.);return length(ap-ab*t);}
float segD(vec2 p,int i){float t;return segD(p,seg(i),t);}
// A seed, in half floats: an edge's, where it is from the texel holding it and which way it faces, as halves are finest near nought
// and that's where an edge's distance needs them; a path's, its segment, split in two to stay whole. None is far below either.
int segOf(vec4 s){return int(s.x)+int(s.y)*2048;}
bool none(vec4 s){return s.x<-5e4;}`,qn=`#version 300 es
precision highp float;precision highp int;precision highp isampler2D;
uniform isampler2D tInfo;uniform int uL;uniform vec2 uTo;
${Kn}
flat out int vI;flat out ivec4 vRect;
void main(){
  int i=gl_InstanceID;vec4 s=seg(i);int f=int(segN(i).z);
  ivec4 A=texelFetch(tInfo,ivec2(0,f),0),C=texelFetch(tInfo,ivec2(2,f),0);
  vI=i;vRect=ivec4(A.xy>>uL,(A.xy+A.zw)>>uL);
  if(C.z!=uL){gl_Position=vec4(2,2,2,1);return;}
  float sc=float(1<<uL);vec2 lo=(min(s.xy,s.zw)-2.*sc)/sc,hi=(max(s.xy,s.zw)+2.*sc)/sc;
  gl_Position=vec4(mix(lo,hi,vec2(gl_VertexID&1,gl_VertexID>>1))/uTo*2.-1.,0,1);
}`,Jn=`#version 300 es
precision highp float;precision highp int;
uniform int uL;
${Kn}
flat in int vI;flat in ivec4 vRect;out vec4 o;
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  if(any(lessThan(p,vRect.xy))||any(greaterThanEqual(p,vRect.zw))) discard;
  float sc=float(1<<uL),d=segD((vec2(p)+.5)*sc,vI)/sc;
  if(d>1.5) discard;
  o=vec4(float(vI&2047),float(vI>>11),0,4);gl_FragDepth=d/2.;
}`,Yn=`${Vn}
uniform sampler2D tCov;uniform int uL;
float at(ivec2 p){return texelFetch(tCov,p,uL).r;}
void main(){
  if(vB.z==-2){o=vec4(-6e4);return;} // a path's: from its segments
  ivec2 p=ivec2(gl_FragCoord.xy);float c=at(p);bool inside=c>=.5;
  vec2 best=vec2(0);float bd=1e9;
  vec2 g=vec2(at(p+ivec2(1,0))-at(p-ivec2(1,0)),at(p+ivec2(0,1))-at(p-ivec2(0,1)));
  g+=.5*vec2(at(p+ivec2(1,1))-at(p+ivec2(-1,1))+at(p+ivec2(1,-1))-at(p+ivec2(-1,-1)),at(p+ivec2(1,1))-at(p+ivec2(1,-1))+at(p+ivec2(-1,1))-at(p+ivec2(-1,-1)));
  ivec2 N[4]=ivec2[4](ivec2(1,0),ivec2(-1,0),ivec2(0,1),ivec2(0,-1));
  for(int k=0;k<4;k++){
    float q=texelFetch(tCov,p+N[k],uL).r;
    if((q>=.5)==inside) continue;
    float t=(c-.5)/(c-q);vec2 s=t*vec2(N[k]);float d=t;
    if(d<bd){bd=d;best=s;}
  }
  o=bd<1e9?vec4(best,length(g)>1e-4?normalize(g):vec2(0)):vec4(-6e4);
}`,Xn=`${Vn}
uniform sampler2D tSeed;uniform int uStep,uL;
${Kn}
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);vec2 pf=(vec2(p)+.5)*float(1<<uL);vec4 best=texelFetch(tSeed,p,0);
  bool sg=vB.z==-2; // a path's seeds are segments, and how far one is is how far its segment is
  float bd=none(best)?1e9:sg?segD(pf,segOf(best)):length(best.xy);
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
    ivec2 q=p+ivec2(x,y)*uStep;
    if(any(lessThan(q,vRect.xy))||any(greaterThanEqual(q,vRect.zw))) continue;
    vec4 s=texelFetch(tSeed,q,0);
    if(none(s)) continue;
    if(!sg) s.xy+=vec2(q-p);
    float d=sg?segD(pf,segOf(s)):length(s.xy);
    if(d<bd){bd=d;best=s;}
  }
  o=best;
}`,Zn=`${Vn}
uniform sampler2D tSeed,tCov;uniform int uL;
${Kn}
void main(){
  // Its ring, outside its rect, takes the seed and the side of the texel inside nearest it, and how far that seed is from
  // the ring's own texel: so a filter reading past the edge reads on where the field goes, not a wall.
  ivec2 r0=vA.xy>>uL,p=r0+ivec2(gl_FragCoord.xy)-vC.xy,q=clamp(p,r0,r0+(vA.zw>>uL)-1);
  vec4 s=texelFetch(tSeed,q,0);vec2 v=vec2(p-q)-s.xy;
  bool inside=texelFetch(tCov,q,uL).r>=.5;
  if(vB.z==-2){
    // A path's: how far its outline is, exactly, from the nearest of its segment and the two either side, and near the outline
    // which side it's on from that segment, each knowing which of its sides the fill is on. Where two meet at a corner the
    // point is as near to both, and the one it lies more squarely off says the side. Further off, the coverage says it, as
    // it can't be wrong a texel or more from an edge, or for the ring, a ring's breadth.
    if(none(s)){o=vec4(inside?-${Rn}.:${Rn}.);return;}
    float sc=float(1<<uL),e=1e9,side=0.;vec2 pf=(vec2(p)+.5)*sc;int i=segOf(s);vec4 n=segN(i);
    for(int k=0;k<3;k++){
      int j=k==0?i:int(k==1?n.x:n.y);if(j<0)continue;
      vec4 S=seg(j);float t,d=segD(pf,S,t);vec2 ab=S.zw-S.xy;
      float sd=dot(pf-S.xy-ab*t,vec2(-ab.y,ab.x))/max(length(ab),1e-9)*segN(j).w;
      if(d<e-1e-4*sc||(d<e+1e-4*sc&&abs(sd)>abs(side))){e=min(e,d);side=sd;}
    }
    if(e<(2.+float(${In}))*sc) inside=side>0.;
    float d=e/intBitsToFloat(vB.w);
    o=vec4(inside?-d:d);return;
  }
  // Near the edge, how far its line is; further off, how far the seed is, which is right round a corner as well.
  float dp=length(v),dl=dot(s.zw,s.zw)>0.?abs(dot(v,s.zw)):dp,e=mix(dl,dp,smoothstep(1.,3.,dp));
  float r=intBitsToFloat(vB.w)/float(1<<uL),d=none(s)?${Rn}.:e/r; // as deep as it goes: a big surface's crown reads it far inside
  o=vec4(inside?-d:d);
}`,Qn=`#version 300 es
precision highp float;
uniform vec4 uRect,uFrom;uniform vec2 uTo;
out vec2 vUv;
void main(){
  vec2 c=vec2(gl_VertexID&1,gl_VertexID>>1);
  vUv=uFrom.xy+c*uFrom.zw;
  gl_Position=vec4((uRect.xy+c*uRect.zw)/uTo*2.-1.,0,1);
}`,$n=`#version 300 es
precision highp float;
uniform sampler2D tEdge;uniform float uSteep;
in vec2 vUv;out vec4 o;
void main(){o=vec4(texture(tEdge,vUv).r*uSteep);}`;function er(e){let t=/^within\|([\d.]+)\|(.*)\|(-?[\d.]+),(-?[\d.]+)(\{.*\})$/s.exec(e.key??``);if(!t)return null;let n=JSON.parse(t[5]),r=+t[3],i=+t[4],a=e.hw*2,o=e.hh*2,s={...e,within:void 0,mask:void 0,draw:void 0},c={...e,within:void 0,draw:void 0,key:t[2]};if(n.key?.startsWith(`p|`)){if(Math.abs(r-e.hw)>.01||Math.abs(i-e.hh)>.01)throw Error(`fields: a cut by a path off its box`);return{steep:+t[1],field:c,edge:{...s,key:n.key}}}if(n.hw==null||n.key||n.rotate)throw Error(`fields: a cut by what it can't draw: ${t[5].slice(0,80)}`);let l=r-n.hw,u=i-n.hh,d=r+n.hw,f=i+n.hh,p=Math.min(n.radius??0,n.hw,n.hh),m=`A${p} ${p} 0 0 1`,h=`M${l+p} ${u}H${d-p}${m} ${d} ${u+p}V${f-p}${m} ${d-p} ${f}H${l+p}${m} ${l} ${f-p}V${u+p}${m} ${l+p} ${u}Z`;return{steep:+t[1],field:c,edge:{...s,key:`p|${h}|0,0,${a},${o}|${Math.ceil(a)}x${Math.ceil(o)}|`}}}function tr(e,t,n){let r=1/0,i=-1/0,a=0,o=0;for(let t of e){let e=t.length/2;a+=e;for(let n=0;n<e;n++){let a=t[2*n+1];r=Math.min(r,a),i=Math.max(i,a),o+=Math.abs(t[2*((n+1)%e)+1]-a)}}let s=Math.max(1,o/Math.max(i-r,1e-9)),c=Math.max(1,Math.min(a,Math.ceil(a/Math.sqrt(s)))),l=c/Math.max(i-r,1e-9),u=e=>Math.min(c-1,Math.max(0,Math.floor((e-r)*l))),d=Array.from({length:c},()=>[]);for(let t of e)for(let e=0,n=t.length/2;e<n;e++){let r=t[2*e+1],i=t[2*((e+1)%n)+1];for(let n=u(Math.min(r,i)),a=u(Math.max(r,i));n<=a;n++)d[n].push(t,e)}let f=(e,n)=>{let r=0,i=d[u(n)];for(let t=0;t<i.length;t+=2){let a=i[t],o=i[t+1],s=(o+1)%(a.length/2),c=a[2*o],l=a[2*o+1],u=a[2*s],d=a[2*s+1];if(l<=n==d<=n)continue;let f=(u-c)*(n-l)-(e-c)*(d-l);d>l&&f>0?r++:d<l&&f<0&&r--}return t===`evenodd`?(r&1)==1:r!==0};return(e,t)=>{let r=e.length/2,i=(t+1)%r,a=e[2*i]-e[2*t],o=e[2*i+1]-e[2*t+1],s=n/Math.hypot(a,o),c=(e[2*t]+e[2*i])/2,l=(e[2*t+1]+e[2*i+1])/2;return f(c-o*s,l+a*s)?1:-1}}var nr=new Uint8Array(128);for(let e=0;e<64;e++)nr[`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(e)]=e;function rr(e){if(Uint8Array.fromBase64)return Uint8Array.fromBase64(e);let t=e.length,n=e.endsWith(`==`)?2:+!!e.endsWith(`=`),r=new Uint8Array(t/4*3-n);for(let n=0,i=0;n<t;n+=4){let t=nr[e.charCodeAt(n)]<<18|nr[e.charCodeAt(n+1)]<<12|nr[e.charCodeAt(n+2)]<<6|nr[e.charCodeAt(n+3)];r[i++]=t>>16,i<r.length&&(r[i++]=t>>8&255),i<r.length&&(r[i++]=t&255)}return r}function ir(e,t,n,r,i=1,a=t){let o=e=>Math.ceil(e/i)*i,s=n,c=n,l=0,u=[];for(let i of e){if(s+i.W+n>t&&(s=n,c=o(c+l+r),l=0),c+i.H+n>a)break;u.push([s,c]),s=o(s+i.W+r),l=Math.max(l,i.H)}return{at:u,height:c+l+n}}var ar=new Map,or=0,sr=(e,t)=>ar.get(e+`|`+t),cr=(e,t)=>{ar.set(e+`|`+t.r,t),or+=t.raw.length;for(let[e,t]of ar){if(or<=64e6)break;ar.delete(e),or-=t.raw.length}return t},lr=class{constructor(e,t={}){this.gl=e,this.share=t.share??.002,this.most=t.most??2,this.moved=t.moved??1.5,this.coarsest=t.coarsest??Fn,this.log=t.log,this.budget=Math.min(t.budget??1024,4064);let n=t=>K(e,t,{},Bn);this.p={cover:n(Hn),test:n(Gn),seed:n(Yn),jfa:n(Xn),dist:n(Zn),segseed:K(e,Jn,{},qn),cut:K(e,$n,{},Qn),fan:K(e,Wn,{},Un)},this.fanVao=e.createVertexArray(),this.fanBuf=e.createBuffer(),e.bindVertexArray(this.fanVao),e.bindBuffer(e.ARRAY_BUFFER,this.fanBuf),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null),this.stencil=e.createRenderbuffer(),this.generated=0,this.depth=e.createRenderbuffer(),this.fbo=e.createFramebuffer(),this.vao=e.createVertexArray()}rest(){let{gl:e}=this;e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.bindVertexArray(null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.activeTexture(e.TEXTURE0),e.useProgram(null)}build(e,t={}){let n=this.paced(e,t);for(;;){let{value:e,done:t}=n.next();if(t)return e}}*paced(e,t={}){let n=this.gl,r=performance.now(),i=()=>this.rest(),a=()=>{i();let e=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0);return n.flush(),e};n.getExtension(`EXT_color_buffer_float`);let o=new Map;e=e.map(e=>{let t=er(e.shape);return t&&o.set(e.key,t),t?{...e,shape:t.field}:e});let s=o.size?yield*this.paced(e.filter(e=>o.has(e.key)).map(e=>({key:e.key,shape:o.get(e.key).edge,crop:e.crop,r:e.r})),{steps:!1,r:t.r,paced:t.paced}):null,c=({key:e,shape:n,crop:r,r:i})=>{let a=e=>Math.ceil(e/8)*8,o=[(n.hw+n.spread)*2,(n.hh+n.spread)*2],s=n.key?.split(`|`)??[];if(n.solve){let s=r?[o[0]*i,o[1]*i]:null,c=r?Math.floor(r[0]*s[0]):0,l=r?Math.floor(r[1]*s[1]):0,u=r?i:Math.min(8,t.r??8,this.budget/Math.max(...o)),d=Math.max(4,r?Math.ceil(r[2]*s[0])-c:Math.ceil(o[0]*u)),f=Math.max(4,r?Math.ceil(r[3]*s[1])-l:Math.ceil(o[1]*u)),p=a(d),m=a(f),h=o[0]/(s?.[0]??d),g=o[1]/(s?.[1]??f),_=new Float32Array(p*m);return Object.assign({key:e,w:d,h:f,W:p,H:m,r:u,raw:new Uint8Array,solved:_,row:e=>{for(let t=0;t<p;t++)_[e*p+t]=n.solve((c+t+.5)*h-n.spread,(l+e+.5)*g-n.spread)},L:0},r?{from:[c,l],full:s}:{})}if(s[0]===`p`||(s[0]===`t`?document.fonts.check(s[2]):typeof n.draw==`function`&&!n.mask)){if(r){let t=[o[0]*i,o[1]*i],s=Math.floor(r[0]*t[0]),c=Math.floor(r[1]*t[1]),l=Math.max(4,Math.ceil(r[2]*t[0])-s),u=Math.max(4,Math.ceil(r[3]*t[1])-c);return this.outlined({key:e,w:l,h:u,W:a(l),H:a(u),r:i,raw:new Uint8Array,shape:n,vector:!0,from:[s,c],full:t})}let s=Math.min(8,t.r??8,this.budget/Math.max(...o)),c=Math.max(4,Math.ceil(o[0]*s)),l=Math.max(4,Math.ceil(o[1]*s));return this.outlined({key:e,w:c,h:l,W:a(c),H:a(l),r:s,raw:new Uint8Array,shape:n,vector:!0})}if(r)return null;let c=n.mask;if(!c){let r=Math.min(8,t.r??8,1024/(Math.max(n.hw+n.spread,n.hh+n.spread)*2));if(c=sr(e,r),!c){let t=Wt(n,r),i=new Uint8Array(Math.ceil(t.w*t.h/8));for(let e=0;e<t.w*t.h;e++)t.cover[e]>=.5&&(i[e>>3]|=128>>(e&7));c=cr(e,{w:t.w,h:t.h,r,raw:i})}}let l=c.raw??rr(c.packed);return{key:e,w:c.w,h:c.h,W:a(c.w),H:a(c.h),r:c.r,raw:l}},l=[];for(let t of e){let e=c(t);if(e?.row){for(let t=0;t<e.H;t++)e.row(t),yield;e.row=null}e&&l.push(e),yield}let u=performance.now()-r,d=n.getParameter(n.MAX_TEXTURE_SIZE),f=[],p=e=>Math.ceil(e/8)*8,m=e=>e.vector&&!e.fan;for(let e of[l.filter(e=>!e.solved&&!m(e)),l.filter(m)].map(e=>e.sort((e,t)=>t.H-e.H)))for(;e.length;){let n=Math.max(...e.map(e=>e.W))+16,r=t.into?n:Math.max(n,Math.sqrt(1.3*e.reduce((e,t)=>e+(t.W+Pn)*(t.H+Pn),0))),i=Math.min(4096,p(r)),{at:a}=ir(e,i,Pn,Pn,8,4096),o=e.splice(0,a.length);if(!o.length)throw Error(`fields: a field too big for a working atlas`);o.forEach((e,t)=>{e.x=a[t][0],e.y=a[t][1]});let s=Math.max(...o.map(e=>e.y+e.H))+Pn;f.push({batch:o,SW:i,SH:p(s)})}if(t.steps===!1)for(let e of l)e.L=0;let h=[0,0,0,0],g={cover:0,test:0,read:0,flood:0},_=new Float32Array(1),v=new Int32Array(_.buffer),y=({batch:e})=>{let t=new Int32Array(e.length*12);e.forEach((e,n)=>{_[0]=e.r,t.set([e.x,e.y,e.W,e.H,e.w,e.h,e.segs?-2:e.vector?-1:e.off,v[0],e.ax??0,e.ay??0,e.L??-1,0],n*12)});let r=n.createTexture();return n.bindTexture(n.TEXTURE_2D,r),n.texStorage2D(n.TEXTURE_2D,1,n.RGBA32I,3,e.length),n.texSubImage2D(n.TEXTURE_2D,0,0,0,3,e.length,n.RGBA_INTEGER,n.INT,t),this.nearest(),r},b=function*(e){if(e.cov)return e.cov;let{batch:r,SW:a,SH:o}=e,s=performance.now(),c=r.reduce((e,t)=>e+t.raw.length,0),l=Math.max(1,Math.ceil(c/Ln)),u=new Uint8Array(l*Ln),d=0;for(let e of r)e.off=d,u.set(e.raw,d),d+=e.raw.length;let f=n.createTexture();n.bindTexture(n.TEXTURE_2D,f),n.texStorage2D(n.TEXTURE_2D,1,n.R8UI,Ln,l),n.pixelStorei(n.UNPACK_ALIGNMENT,1),n.texSubImage2D(n.TEXTURE_2D,0,0,0,Ln,l,n.RED_INTEGER,n.UNSIGNED_BYTE,u),n.pixelStorei(n.UNPACK_ALIGNMENT,4),this.nearest();let p=y(e),m=this.take(a,o,n.R8,4);n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,m,0),n.enable(n.SCISSOR_TEST),n.scissor(0,0,a,o),n.clearBufferfv(n.COLOR,0,[0,0,0,0]),n.disable(n.SCISSOR_TEST);let h=r.filter(e=>e.vector&&!e.fan);if(h.length){let e=t.paced&&h.every(e=>Mn(e.shape))?Nn(a,o,h.map(e=>e.from?{shape:e.shape,x:e.x-e.from[0],y:e.y-e.from[1],w:e.full[0],h:e.full[1],clip:[e.x,e.y,e.w,e.h]}:{shape:e.shape,x:e.x,y:e.y,w:e.w,h:e.h})):null;for(;e&&!e.ready;)yield e;if(e?.bitmap)i(),n.bindTexture(n.TEXTURE_2D,m),n.texSubImage2D(n.TEXTURE_2D,0,0,0,n.RED,n.UNSIGNED_BYTE,e.bitmap),e.bitmap.close();else{let e=t.paced?this.pacedCanvas??=new OffscreenCanvas(1,1):this.canvas??=new OffscreenCanvas(1,1);(e.width!==a||e.height!==o)&&(e.width=a,e.height=o),i();let r=e.getContext(`2d`);r.setTransform(1,0,0,1,0,0),r.fillStyle=`#000`,r.fillRect(0,0,a,o);for(let e of h)e.from?(r.save(),r.beginPath(),r.rect(e.x,e.y,e.w,e.h),r.clip(),Ut(r,e.shape,e.x-e.from[0],e.y-e.from[1],e.full[0],e.full[1]),r.restore(),yield):(Ut(r,e.shape,e.x,e.y,e.w,e.h),yield);n.bindTexture(n.TEXTURE_2D,m),n.texSubImage2D(n.TEXTURE_2D,0,0,0,n.RED,n.UNSIGNED_BYTE,e)}}return this.fill(r.filter(e=>e.fan),m,a,o),this.draw(this.p.cover,m,0,a,o,r.length,{tInfo:[p,0],tBits:[f,1]},{uMode:0}),n.bindTexture(n.TEXTURE_2D,m),n.generateMipmap(n.TEXTURE_2D),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR_MIPMAP_NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.deleteTexture(f),n.deleteTexture(p),g.cover+=performance.now()-s,e.cov=m}.bind(this);for(let e of t.steps===!1?[]:f){let{batch:r,SW:i,SH:s}=e,c=yield*b(e),l=y(e),u=performance.now(),d=this.take(i,s,n.RGBA16F,4);this.draw(this.p.test,d,0,i,s,r.length,{tInfo:[l,0],tCov:[c,1]},{uMode:0},!0),n.bindTexture(n.TEXTURE_2D,d),n.generateMipmap(n.TEXTURE_2D),n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,d,3);let f=i>>3,p=s>>3,m=new Float32Array(f*p*4);if(g.test+=performance.now()-u,u=performance.now(),t.paced){let e=n.createBuffer();n.bindBuffer(n.PIXEL_PACK_BUFFER,e),n.bufferData(n.PIXEL_PACK_BUFFER,m.byteLength,n.STREAM_READ),n.readPixels(0,0,f,p,n.RGBA,n.FLOAT,0),n.bindBuffer(n.PIXEL_PACK_BUFFER,null),yield a(),n.bindBuffer(n.PIXEL_PACK_BUFFER,e),n.getBufferSubData(n.PIXEL_PACK_BUFFER,0,m),n.bindBuffer(n.PIXEL_PACK_BUFFER,null),n.deleteBuffer(e)}else n.readPixels(0,0,f,p,n.RGBA,n.FLOAT,m);g.read+=performance.now()-u;for(let e of r){let t=[0,0,0],n=0;for(let r=e.y>>3;r<e.y+e.H>>3;r++)for(let i=e.x>>3;i<e.x+e.W>>3;i++){let e=(r*f+i)*4;m[e+3]>0&&n++;for(let n=0;n<Fn;n++)m[e+n]*64>this.moved&&t[n]++}let r=Math.min(this.most,Math.floor(n*this.share)),i=0;for(;!o.has(e.key)&&i<this.coarsest&&t[i]<=r;)i++;e.L=i,e.fail=t,e.edges=n,h[i]++}this.give(d),n.deleteTexture(l)}let x,S,C,w=null,T=[...l].sort((e,t)=>(t.H>>t.L)-(e.H>>e.L));if(t.into){let e=t.into;({texture:x,AW:S,AH:C}=e);let n=[];for(let t of T){let r=t.W+J,i=t.H+J,a=e.free.findIndex(e=>e.w>=r&&e.h>=i),o;if(a>=0)o=e.free.splice(a,1)[0];else{if(e.x+r>S&&(e.x=J,e.y+=e.row,e.row=0),e.y+i>C)return e.free.push(...n),null;o={x:e.x,y:e.y,w:r,h:i},e.x+=r,e.row=Math.max(e.row,i)}n.push(o),t.ax=o.x,t.ay=o.y,t.slot=o}}else{let e=l.reduce((e,t)=>e+((t.W>>t.L)+J)*((t.H>>t.L)+J),0);S=Math.min(d,Math.max(t.room?1024:16,...l.map(e=>(e.W>>e.L)+8),2**Math.ceil(Math.log2(Math.sqrt(e*1.1)))));let r=J,i=J,a=0;for(let e of T){let t=e.W>>e.L,n=e.H>>e.L;r+t+J>S&&(r=J,i+=a+J,a=0),e.ax=r,e.ay=i,e.slot={x:r,y:i,w:t+J,h:n+J},r+=t+J,a=Math.max(a,n)}if(C=Math.min(d,i+a+J+(t.room??0)),i+a+J>d)throw Error(`fields: the atlas needs ${C} rows, this GPU has ${d}`);x=this.target(S,C,n.R16F,1),t.room&&(w={texture:x,AW:S,AH:C,x:J,y:i+a+J,row:0,free:[],slots:new Map})}if(n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,x,0),t.into){n.enable(n.SCISSOR_TEST);for(let e of l)n.scissor(e.slot.x,e.slot.y,e.slot.w-J,e.slot.h-J),n.clearBufferfv(n.COLOR,0,[Rn,0,0,0]);n.disable(n.SCISSOR_TEST)}else n.clearBufferfv(n.COLOR,0,[Rn,0,0,0]);let E=w??t.into;if(E)for(let e of l)E.slots.set(e.key,e.slot);n.bindTexture(n.TEXTURE_2D,x);for(let e of l)e.solved&&=(n.texSubImage2D(n.TEXTURE_2D,0,e.ax,e.ay,e.W,e.H,n.RED,n.FLOAT,e.solved),null);for(let e of f){let{batch:r,SW:i,SH:o}=e,s=yield*b(e),c=y(e),l=performance.now(),u=this.segments(r);for(let e=0;e<=Fn;e++){let l=r.filter(t=>t.L===e);if(!l.length)continue;let d=i>>e,f=o>>e,p=[this.take(d,f,n.RGBA16F,1),this.take(d,f,n.RGBA16F,1)];if(this.draw(this.p.seed,p[0],0,d,f,r.length,{tInfo:[c,0],tCov:[s,1]},{uMode:1,uL:e}),u.n){this.room(this.depth,n.DEPTH_COMPONENT32F,p[0]),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,this.depth),n.clearBufferfv(n.DEPTH,0,[1]),n.enable(n.DEPTH_TEST),n.depthFunc(n.LESS);let t=this.p.segseed;n.useProgram(t.p),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,c),n.uniform1i(t.u.tInfo,0),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,u.tex),n.uniform1i(t.u.tSeg,1),n.uniform1i(t.u.uL,e),n.uniform2f(t.u.uTo,d,f),n.drawArraysInstanced(n.TRIANGLE_STRIP,0,4,u.n),n.disable(n.DEPTH_TEST),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,null)}let m=Math.max(...l.map(t=>Math.max(t.W,t.H)>>e)),h=0,g=[];for(let e=2**Math.ceil(Math.log2(m))/2;e>=1;e/=2)g.push(e);g.push(1);for(let t of g)this.draw(this.p.jfa,p[1-h],0,d,f,r.length,{tInfo:[c,0],tSeed:[p[h],1],tSeg:[u.tex,3]},{uMode:1,uL:e,uStep:t}),h=1-h,n.flush();this.draw(this.p.dist,x,0,S,C,r.length,{tInfo:[c,0],tSeed:[p[h],1],tCov:[s,2],tSeg:[u.tex,3]},{uMode:2,uL:e}),this.give(...p),t.paced&&(yield a())}this.give(s),[c,u.tex].forEach(e=>n.deleteTexture(e)),g.flood+=performance.now()-l}s&&this.cut(l.filter(e=>o.has(e.key)),s,o,x,S,C);let D=l.reduce((e,t)=>e+t.W*t.H,0),O=l.reduce((e,t)=>e+(t.W>>t.L)*(t.H>>t.L),0),k=new Map;for(let e of l){let t={rect:[e.ax/S,e.ay/C,e.w/2**e.L/S,e.h/2**e.L/C],texels:e.r/2**e.L,area:(e.W>>e.L)*(e.H>>e.L),step:2**e.L};e.from&&Object.assign(t,{map:[(e.ax-e.from[0])/S,(e.ay-e.from[1])/C,e.full[0]/S,e.full[1]/C],holds:[e.from[0]/e.full[0],e.from[1]/e.full[1],(e.from[0]+e.w)/e.full[0],(e.from[1]+e.h)/e.full[1]]}),k.set(e.key,t)}return i(),this.generated+=l.length,this.stats={ms:performance.now()-r,unpacked:u,...g,batches:f.length,fields:l.length,fine:D,kept:O,steps:h,size:[S,C]},{texture:x,placed:k,bytes:S*C*2,room:w}}read(e,t){let n=this.gl,{texture:r,placed:i}=this.build([{key:`read`,shape:e}],{steps:!1,r:t}),a=i.get(`read`),[o,s]=this.stats.size,c=Math.round(a.rect[0]*o),l=Math.round(a.rect[1]*s),u=Math.round(a.rect[2]*o),d=Math.round(a.rect[3]*s),f=new Float32Array(u*d*4);return n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,r,0),n.readPixels(c,l,u,d,n.RGBA,n.FLOAT,f),n.deleteTexture(r),this.rest(),this.generated--,{w:u,h:d,data:Float32Array.from({length:u*d},(e,t)=>f[t*4])}}cut(e,t,n,r,i,a){let o=this.gl,s=this.p.cut;o.bindFramebuffer(o.FRAMEBUFFER,this.fbo),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,r,0),o.drawBuffers([o.COLOR_ATTACHMENT0]),o.viewport(0,0,i,a),o.enable(o.BLEND),o.blendEquation(o.MAX),o.useProgram(s.p),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t.texture),o.uniform1i(s.u.tEdge,0),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.uniform2f(s.u.uTo,i,a),o.bindVertexArray(this.vao);for(let r of e){let[e,i,a,c]=t.placed.get(r.key).rect,l=a/r.w,u=c/r.h;o.uniform1f(s.u.uSteep,n.get(r.key).steep),o.uniform4f(s.u.uRect,r.ax-In,r.ay-In,r.w+4,r.h+4),o.uniform4f(s.u.uFrom,e-In*l,i-In*u,(r.w+4)*l,(r.h+4)*u),o.drawArrays(o.TRIANGLE_STRIP,0,4)}o.blendEquation(o.FUNC_ADD),o.disable(o.BLEND),o.deleteTexture(t.texture)}outlined(e){let t=e.shape.key.split(`|`);if(t[0]!==`p`)return e;let n=e.shape,r=n.hw*2,i=n.hh*2,a=r+n.spread*2,o=i+n.spread*2,[s,c,l,u]=t[2].split(`,`).map(Number),d=e.full?.[0]??e.w,f=e.full?.[1]??e.h,p=t.filter(e=>e===`flip`).length%2==1,m=d/a*(r/l),h=f/o*(i/u),g=d/a*n.spread-(e.from?.[0]??0),_=f/o*n.spread-(e.from?.[1]??0),v=e=>g+(p?l-(e-s):e-s)*m,y=yn(t[1],.02/Math.max(m,h)),b=[],x=tr(y,t[4]||`nonzero`,.005/Math.max(m,h));for(let t of y){let n=t.length/2,r=b.length,i=0;for(let a=0;a<n;a++){let o=v(t[2*a]),s=_+(t[2*a+1]-c)*h,l=(a+1)%n,u=v(t[2*l]),d=_+(t[2*l+1]-c)*h;if(o===u&&s===d)continue;let f=Math.max(o,u)>-4&&Math.min(o,u)<e.w+4&&Math.max(s,d)>-4&&Math.min(s,d)<e.h+4;b.push(f?Object.assign([o,s,u,d,r],{side:p?-x(t,a):x(t,a)}):null),i++}for(let e=0;e<i;e++)b[r+e]&&b[r+e].push(r+(e+i-1)%i,r+(e+1)%i)}let S=new Float32Array(y.reduce((e,t)=>e+Math.max(0,t.length/2-2)*6,0)),C=0;for(let e of y){let t=e.length/2,n=v(e[0]),r=_+(e[1]-c)*h;for(let i=1;i<t-1;i++)S.set([n,r,v(e[2*i]),_+(e[2*i+1]-c)*h,v(e[2*i+2]),_+(e[2*i+3]-c)*h],C++*6)}return e.segs=b,e.fan=S,e.rule=t[4]||`nonzero`,e}fill(e,t,n,r){if(!e.length)return;let i=this.gl,a=this.p.fan,o=e.reduce((e,t)=>e+t.fan.length+12,0),s=new Float32Array(o),c=[],l=0;for(let t of e)s.set(t.fan,l),s.set([0,0,t.w,0,0,t.h,t.w,0,t.w,t.h,0,t.h],l+t.fan.length),c.push([l/2,t.fan.length/2]),l+=t.fan.length+12;i.bindBuffer(i.ARRAY_BUFFER,this.fanBuf),i.bufferData(i.ARRAY_BUFFER,s,i.STREAM_DRAW),i.bindBuffer(i.ARRAY_BUFFER,null),this.room(this.stencil,i.STENCIL_INDEX8,t),i.bindFramebuffer(i.FRAMEBUFFER,this.fbo),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,t,0),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.STENCIL_ATTACHMENT,i.RENDERBUFFER,this.stencil),i.drawBuffers([i.COLOR_ATTACHMENT0]),i.viewport(0,0,n,r),i.disable(i.BLEND),i.disable(i.DEPTH_TEST),i.disable(i.CULL_FACE),i.clearBufferiv(i.STENCIL,0,[0]),i.enable(i.STENCIL_TEST),i.enable(i.SCISSOR_TEST),i.useProgram(a.p),i.uniform2f(a.u.uTo,n,r),i.bindVertexArray(this.fanVao),e.forEach((e,t)=>{let[n,r]=c[t],o=e.rule===`evenodd`;i.scissor(e.x,e.y,e.w,e.h),i.uniform2f(a.u.uAt,e.x,e.y),i.colorMask(!1,!1,!1,!1),i.stencilFunc(i.ALWAYS,0,255),o?i.stencilOp(i.KEEP,i.KEEP,i.INVERT):(i.stencilOpSeparate(i.FRONT,i.KEEP,i.KEEP,i.INCR_WRAP),i.stencilOpSeparate(i.BACK,i.KEEP,i.KEEP,i.DECR_WRAP)),i.drawArrays(i.TRIANGLES,n,r),i.colorMask(!0,!0,!0,!0),i.stencilFunc(i.NOTEQUAL,0,o?1:255),i.stencilOp(i.ZERO,i.ZERO,i.ZERO),i.drawArrays(i.TRIANGLES,n+r,6)}),i.disable(i.STENCIL_TEST),i.disable(i.SCISSOR_TEST),i.stencilFunc(i.ALWAYS,0,255),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.STENCIL_ATTACHMENT,i.RENDERBUFFER,null),i.bindVertexArray(null)}segments(e){let t=this.gl,n=[],r=new Map;e.forEach((e,t)=>{e.segs&&e.segs.forEach((i,a)=>{i&&(r.set(i,n.length),n.push([i,e,t]))})});let i=Math.max(1,Math.ceil(n.length/1024)),a=new Float32Array(i*2048*4);n.forEach(([e,t,n],i)=>{let o=e=>{let n=t.segs[e];return n?r.get(n):-1};a.set([t.x+e[0],t.y+e[1],t.x+e[2],t.y+e[3],o(e[5]),o(e[6]),n,e.side],i*8)});let o=t.createTexture();return t.bindTexture(t.TEXTURE_2D,o),t.texStorage2D(t.TEXTURE_2D,1,t.RGBA32F,2048,i),t.texSubImage2D(t.TEXTURE_2D,0,0,0,2048,i,t.RGBA,t.FLOAT,a),this.nearest(),{tex:o,n:n.length}}take(e,t,n,r){let i=this.free??=[],a=-1;for(let o=0;o<i.length;o++){let s=i[o];s.format===n&&s.levels===r&&s.w>=e&&s.h>=t&&(a<0||s.w*s.h<i[a].w*i[a].h)&&(a=o)}if(clearTimeout(this.freeTimer),a>=0)return this.held(i.splice(a,1)[0]);let o=Math.min(4096,Math.ceil(e/512)*512),s=Math.min(4096,Math.ceil(t/512)*512);return this.held({tex:this.target(o,s,n,r),format:n,levels:r,w:o,h:s})}held(e){return(this.using??=new Map).set(e.tex,e),e.tex}give(...e){for(let t of e){let e=this.using.get(t);this.using.delete(t),this.free.push(e)}clearTimeout(this.freeTimer),this.freeTimer=setTimeout(()=>{if(!this.gl.isContextLost())for(let e of this.free.splice(0))this.gl.deleteTexture(e.tex)},zn)}room(e,t,n){let r=this.gl,{w:i,h:a}=this.using.get(n);r.bindRenderbuffer(r.RENDERBUFFER,e),(e.w!==i||e.h!==a)&&(e.w=i,e.h=a,r.renderbufferStorage(r.RENDERBUFFER,t,i,a))}target(e,t,n,r){let i=this.gl,a=i.createTexture();return i.bindTexture(i.TEXTURE_2D,a),i.texStorage2D(i.TEXTURE_2D,r,n,e,t),this.nearest(),a}nearest(){let e=this.gl;for(let[t,n]of[[e.TEXTURE_MIN_FILTER,e.NEAREST],[e.TEXTURE_MAG_FILTER,e.NEAREST],[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE]])e.texParameteri(e.TEXTURE_2D,t,n)}draw(e,t,n,r,i,a,o,s,c=!1){let l=this.gl;l.bindFramebuffer(l.FRAMEBUFFER,this.fbo),l.framebufferTexture2D(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,t,n),l.drawBuffers([l.COLOR_ATTACHMENT0]),l.viewport(0,0,r,i),l.disable(l.BLEND),l.disable(l.DEPTH_TEST),c&&l.clearBufferfv(l.COLOR,0,[0,0,0,0]),l.useProgram(e.p);for(let[t,[n,r]]of Object.entries(o))l.activeTexture(l.TEXTURE0+r),l.bindTexture(l.TEXTURE_2D,n),l.uniform1i(e.u[t],r);for(let[t,n]of Object.entries(s))e.u[t]&&l.uniform1i(e.u[t],n);e.u.uTo&&l.uniform2f(e.u.uTo,r,i),l.bindVertexArray(this.vao),l.drawArraysInstanced(l.TRIANGLE_STRIP,0,4,a)}};function ur(e,t){return t instanceof WebGLSync?e.clientWaitSync(t,0,0)!==e.TIMEOUT_EXPIRED&&(e.deleteSync(t),!0):!!t.ready}var dr=typeof location<`u`&&new URLSearchParams(location.search).get(`gpu`)===`webgpu`,fr=null,pr=null,mr=!dr,hr=dr?_(()=>import(`./context-CsoJkMRg.js`).then(e=>(pr=e,e.gpuDevice())),[],import.meta.url).then(e=>(fr=e,mr=!0,e||console.warn(`webgpu: no device with what the raster needs, WebGL draws`),e),e=>(mr=!0,console.warn(`webgpu: no device, WebGL draws: ${e.message}`),null)):Promise.resolve(null),gr=typeof location<`u`?new URLSearchParams(location.search).get(`light`):null,_r=`#version 300 es
void main() {
  vec2 c = vec2(gl_VertexID & 1, gl_VertexID >> 1);
  gl_Position = vec4(c * 2.0 - 1.0, 0.0, 1.0);
}`,vr=.03,yr=7,br=`#version 300 es
precision highp float;
uniform sampler2D tLight;
uniform float uExposure;
out vec4 o;
void main() {
  vec2 uv = gl_FragCoord.xy * 2.0 / vec2(textureSize(tLight, 0));
  o = vec4(max(texture(tLight, uv).rgb * uExposure - 1.0, 0.0), 1.0);
}`,xr=`#version 300 es
precision highp float;
uniform sampler2D tPast;
uniform int uLevels;
out vec4 o;
void main() {
  vec2 uv = gl_FragCoord.xy / vec2(textureSize(tPast, 0));
  vec3 g = vec3(0);
  for (int i = 0; i < ${yr}; i++) {
    if (i >= uLevels) break;
    vec2 t = 0.75 / vec2(textureSize(tPast, i));
    float l = float(i);
    g += textureLod(tPast, uv + t, l).rgb + textureLod(tPast, uv - t, l).rgb + textureLod(tPast, uv + vec2(t.x, -t.y), l).rgb + textureLod(tPast, uv + vec2(-t.x, t.y), l).rgb;
  }
  o = vec4(g * ${(vr/4).toFixed(5)} / float(uLevels), 1.0);
}`,Sr=`#version 300 es
precision highp float;
uniform sampler2D tLight, tGlare;
uniform float uExposure;
uniform vec2 uShift;
uniform vec3 uBack;
out vec4 o;
${wt}
float rnd(vec2 p){return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715))));}
void main() {
  vec4 c = texelFetch(tLight, ivec2(gl_FragCoord.xy), 0);
  float a = clamp(c.a, 0.0, 1.0);
  vec3 rgb = max(c.rgb, 0.0) * uExposure;
  rgb += texture(tGlare, gl_FragCoord.xy / vec2(textureSize(tLight, 0))).rgb - max(rgb - 1.0, 0.0) * ${vr.toFixed(5)};
  rgb = a > 0.002 ? encode(neutral(rgb / a)) * a : encode(min(decode(uBack) + neutral(rgb), 1.0)) - uBack;
  // Half a level of noise, so a smooth fall of light doesn't band at 8 bits.
  o = vec4(rgb + (rnd(gl_FragCoord.xy + uShift) - 0.5) / 255.0 * max(a, 0.004), a);
}`,Cr=class{gl;fbo;tex=null;past=null;glare=null;pastFbo;glareFbo;levels=1;w=0;h=0;show;passes;constructor(e){this.gl=e,this.fbo=e.createFramebuffer(),this.pastFbo=e.createFramebuffer(),this.glareFbo=e.createFramebuffer(),this.show=Ue(e,_r,Sr).finish(),this.passes={past:Ue(e,_r,br).finish(),glare:Ue(e,_r,xr).finish()}}get bytes(){return this.w*this.h*8*(1+1/4*(4/3)+1/4)}get half(){return[Math.max(this.w>>1,1),Math.max(this.h>>1,1)]}begin(e,t){let{gl:n}=this;if(e!==this.w||t!==this.h||!this.tex){for(let e of[this.tex,this.past,this.glare])e&&n.deleteTexture(e);this.w=e,this.h=t;let[r,i]=this.half;this.levels=Math.min(yr,Math.floor(Math.log2(Math.min(r,i)))+1);let a=(e,t,r,i,a)=>{let o=n.createTexture();return n.bindTexture(n.TEXTURE_2D,o),n.texStorage2D(n.TEXTURE_2D,i,n.RGBA16F,t,r),U(n,a,n.LINEAR),n.bindFramebuffer(n.FRAMEBUFFER,e),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,o,0),o};this.tex=a(this.fbo,e,t,1,n.LINEAR),this.past=a(this.pastFbo,r,i,this.levels,n.LINEAR_MIPMAP_LINEAR),this.glare=a(this.glareFbo,r,i,1,n.LINEAR)}n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.viewport(0,0,e,t),n.disable(n.SCISSOR_TEST),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT)}finish(e=1,t=[0,0,0]){let{gl:n}=this,[r,i]=this.half;n.disable(n.SCISSOR_TEST),n.disable(n.BLEND),n.disable(n.DEPTH_TEST),n.colorMask(!0,!0,!0,!0);let{past:a,glare:o}=this.passes;n.bindFramebuffer(n.FRAMEBUFFER,this.pastFbo),n.viewport(0,0,r,i),n.useProgram(a.program),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,this.tex),n.uniform1i(a.u.tLight,0),n.uniform1f(a.u.uExposure,e),n.drawArrays(n.TRIANGLE_STRIP,0,4),n.bindTexture(n.TEXTURE_2D,this.past),n.generateMipmap(n.TEXTURE_2D),n.bindFramebuffer(n.FRAMEBUFFER,this.glareFbo),n.useProgram(o.program),n.uniform1i(o.u.tPast,0),n.uniform1i(o.u.uLevels,this.levels),n.drawArrays(n.TRIANGLE_STRIP,0,4);let{program:s,u:c}=this.show;n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,this.w,this.h),n.useProgram(s),n.bindTexture(n.TEXTURE_2D,this.tex),n.uniform1i(c.tLight,0),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,this.glare),n.uniform1i(c.tGlare,1),n.uniform1f(c.uExposure,e),n.uniform2f(c.uShift,0,0),n.uniform3f(c.uBack,...t),n.drawArrays(n.TRIANGLE_STRIP,0,4),n.activeTexture(n.TEXTURE0)}lost(){this.tex=this.past=this.glare=null,this.w=this.h=0}free(){let{gl:e}=this;for(let t of[this.tex,this.past,this.glare])t&&e.deleteTexture(t);for(let t of[this.fbo,this.pastFbo,this.glareFbo])e.deleteFramebuffer(t);for(let t of[this.show,this.passes.past,this.passes.glare])e.deleteProgram(t.program);this.lost()}},wr=e=>e<.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Tr(e,t,n){let r=.015,i=.785,a=Math.min(e,t,n),o=a<2*r?a-a*a/(4*r):r,s=Math.max(e,t,n),c=s<2*r?s*.25/r:1-r/Math.max(s,2*r),l=Math.min(Math.max((s-.03)/.07,0),1),u=l*l*(3-2*l),d=[e,t,n].map(e=>e*c*(1-u)+(e-o)*u),f=Math.max(...d);if(f>=i){let e=.21499999999999997,t=1-e*e/(f+e-i),n=1-1/(.15*(f-t)+1);d=d.map(e=>e*t/f*(1-n)+t*n)}return d.map(wr)}function Er(e){let t=[],n=new WeakMap,r={activeTexture:e.activeTexture,bindTexture:e.bindTexture,deleteTexture:e.deleteTexture,useProgram:e.useProgram,uniform1i:e.uniform1i},i=e.TEXTURE0,a=null,o=()=>t[i-e.TEXTURE0]??=new Map;e.activeTexture=t=>{t!==i&&(i=t,r.activeTexture.call(e,t))},e.bindTexture=(t,n)=>{let i=o();i.get(t)===n&&n||(i.set(t,n),r.bindTexture.call(e,t,n))},e.deleteTexture=n=>{for(let e of t)if(e)for(let[t,r]of e)r===n&&e.set(t,null);r.deleteTexture.call(e,n)},e.useProgram=t=>{t===a&&t||(a=t,r.useProgram.call(e,t))},e.uniform1i=(t,i)=>{t&&n.get(t)!==i&&(n.set(t,i),r.uniform1i.call(e,t,i))},e.canvas.addEventListener(`webglcontextrestored`,()=>{t.length=0,i=e.TEXTURE0,a=null})}var Y=1024,Dr=8,Or=6e6,kr=16,Ar=4,jr=8,Mr=`uniform float uLive[${jr}];uniform vec3 uLiveKey[${jr}];
int live(float id){int l=-1;for(int i=0;i<${jr};i++) if(abs(uLive[i]-id)<.5) l=i;return l;}`,Nr=6,Pr=8,Fr=`
uniform sampler2D tClose,tCloseMap;uniform float uClose[${Dr}];uniform int uCloseN;
float closeAt(vec2 uv){
  vec2 sz=vec2(textureSize(tClose,0)),t=uv*sz-.5,f=fract(t);ivec2 i=ivec2(floor(t))-1;
  vec4 wx=cr(f.x),wy=cr(f.y);float s=0.;
  for(int y=0;y<4;y++){float r=0.;for(int x=0;x<4;x++) r+=wx[x]*texelFetch(tClose,i+ivec2(x,y),0).r;s+=wy[y]*r;}
  return s;
}
float fieldT(vec2 t){
  for(int j=0;j<uCloseN;j++){
    if(abs(uClose[j]-vInst)>.5) continue;
    vec4 A=texelFetch(tCloseMap,ivec2(3*vI,j),0),B=texelFetch(tCloseMap,ivec2(3*vI+1,j),0);
    if(A.z<=0.||any(lessThan(t,B.xy))||any(greaterThan(t,B.zw))) break;
    float m=texelFetch(tCloseMap,ivec2(3*vI+2,j),0).x,c=closeAt(A.xy+t*A.zw),k=smoothstep(.6*m,m,abs(c));
    return k>0.?mix(c,fieldAt(C[6].xy+t*C[6].zw),k):c; // the atlas only where the two meet
  }
  return fieldAt(C[6].xy+t*C[6].zw);
}`,Ir=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
uniform sampler2D tBox,tInst,tVis;
uniform int uN,uVis0,uC0,uNs;
uniform vec3 uScroll; // the camera: world px at the window's corner, and window px per world px
uniform vec2 uG,uBoxTo;uniform float uMargin,uLayer,uLayers;
flat out int vI;flat out float vInst,vPx;out vec2 vP;
void main(){
  int k=gl_InstanceID,ci=uC0+k%uNs,vi=uVis0+k/uNs;
  int g=int(texelFetch(tVis,ivec2(vi%${Y},vi/${Y}),0).r);
  vec4 ins=texelFetch(tInst,ivec2(g%${Y},g/${Y}),0); // where the device's commands start in the world, css px, and how big one of theirs is
  // A device has its canvas and no more: what's drawn past it isn't there, and here it would land in its neighbour.
  vec4 b=texelFetch(tBox,ivec2(ci,0),0);b=vec4(max(b.xy,vec2(0)),min(b.zw,uBoxTo));
  float px=ins.z*uScroll.z; // window px per css px of the device
  vI=ci;vInst=float(g+1);vPx=px;
  // Smaller than half a pixel both ways: left out. What it would add is under the pixel's colour already.
  vec2 size=(b.zw-b.xy)*px;
  if(max(size.x,size.y)<.5){gl_Position=vec4(2,2,2,1);return;}
  vec2 corner=vec2(gl_VertexID&1,gl_VertexID>>1),pad=vec2(1./px);
  vec2 P=mix(b.xy-pad,b.zw+pad,corner);vP=P;
  vec2 w=(ins.xy+P*ins.z)*uScroll.z-uScroll.xy+uMargin; // G-buffer px, rows down
  gl_Position=vec4(w.x/uG.x*2.-1.,1.-w.y/uG.y*2.,1.-2.*(uLayer+float(ci+1)/float(uN+1))/uLayers,1); // a later command nearer, and a plate on top nearer than any of what it's on
}`,Lr=`
void screen(vec2 p,inout vec3 col,inout vec3 emit,inout float metal){
  int kind=int(C[2].x);float gain=C[2].z;vec2 inset=vec2(C[2].w,C[4].z),hs=C[1].xy;vec3 ink=C[7].rgb;
  vec2 tsz=vec2(textureSize(tScr,0)),org=C[6].xy*tsz,size=C[6].zw*tsz;
  vec2 st=(p+hs)/(2.*hs);
  #define PIC(u) texture(tScr,(org+clamp(u,vec2(0),vec2(1))*size)/tsz)
  #define PIX(g) texelFetch(tScr,ivec2(org+clamp(g,vec2(0),size-1.)),0)
  float metalLeft=0.;
  if(kind==0){
    vec2 o=st-.5;
    st=.5+o*(1.+dot(o,o)*ink.y);
    st=(st-inset)/(1.-2.*inset);
    float edge=smoothstep(0.,.014,min(min(st.x,1.-st.x),min(st.y,1.-st.y)));
    vec2 foot=fwidth(st);
    float scan=mix(.6+.4*cos((fract(st.y*size.y)-.5)*6.2832),.6,smoothstep(.3,.6,foot.y*size.y));
    vec3 mask=.78+ink.x*cos(gl_FragCoord.x*2.1+vec3(0.,2.1,4.2));
    vec3 pic=(PIC(st+foot*vec2(-.375,-.125)).rgb+PIC(st+foot*vec2(.125,-.375)).rgb+PIC(st+foot*vec2(.375,.125)).rgb+PIC(st+foot*vec2(-.125,.375)).rgb)*.25;
    emit+=pic*scan*mask*gain*edge;
  }else if(kind==3||kind==6){
    vec2 g=(st-inset)/(1.-2.*inset)*size,foot=fwidth(g),n=floor(g+.5);
    float inside=step(0.,min(g.x,g.y))*step(0.,min(size.x-g.x,size.y-g.y));
    vec2 sharp=n+clamp((g-n)/max(foot,vec2(1e-4)),-.5,.5);
    vec3 c=PIC(mix(sharp,g,smoothstep(.6,1.,max(foot.x,foot.y)))/size).rgb;
    vec2 f=fract(g);
    float sx=fract(f.x*3.),wx=min(foot.x*1.5,.2),wy=min(foot.y*.5,.2),which=floor(f.x*3.);
    float lit=smoothstep(.1-wx,.1+wx,sx)*smoothstep(.9+wx,.9-wx,sx)*smoothstep(.05-wy,.05+wy,f.y)*smoothstep(.95+wy,.95-wy,f.y);
    vec3 m=vec3(equal(vec3(which),vec3(0.,1.,2.)))*lit*(3./.72);
    vec3 pic=c*mix(vec3(1.),m,1.-smoothstep(.25,.5,foot.x*3.))*gain*inside;
    // As the library's: lit from behind through its crystals, and the room's light goes through them too.
    if(kind==6){pic*=ink;col*=c*inside;}
    emit+=pic;
  }else if(kind==4){
    float y=dot(PIC(st).rgb,vec3(.2126,.7152,.0722));
    col=mix(ink,col,floor(pow(y,.45)*7.+.5)/7.);
  }else if(kind==5){
    float left=pow(dot(PIC(st).rgb,vec3(.2126,.7152,.0722)),.45);
    col=mix(ink,col,left);
    metalLeft=metal*left;
  }else{
    vec2 g=(st-inset)/(1.-2.*inset)*size,f=fract(g)-.5;
    bool inside=all(greaterThanEqual(g,vec2(0.)))&&all(lessThan(g,size));
    vec3 c=inside?PIX(g).rgb:vec3(0.);
    if(kind==1){
      float m=smoothstep(.47,.28,length(f));
      emit+=c*m*gain;
      col=mix(col,col+c*.08,m);
    }else{
      vec2 foot=fwidth(g),w=max(foot*.5,vec2(.02)),e=smoothstep(.48+w,.48-w,abs(f));
      float m=inside?mix(e.x*e.y,.92,smoothstep(.2,.4,max(foot.x,foot.y))):0.;
      float on=pow(clamp(dot(c,vec3(.3333)),0.,1.),.45)*m;
      float dark=pow(clamp(dot(PIX(g-vec2(.2,.3)).rgb,vec3(.3333)),0.,1.),.45);
      col*=(1.-.24*dark*float(inside))*(1.-.03*m);
      col=mix(col,ink,on);emit*=(1.-on)*(1.-.03*m);
    }
  }
  metal=kind==5?metalLeft:0.;
}`,Rr=`void written(Surface S,vec2 w,float c){
  o1=vec4(S.col*c,c);
  o2=vec4(clamp(S.rough,.03,1.)*c,S.metal*c,S.coat*c,c);
  o3=vec4(vec3(S.coat>.01?uCoatRough:S.metal>.5?.5+S.tilt:S.sheen,uScatter,uMarks)*c,c);
  o4=vec4(S.emit*c,c);
  o5=vec4(S.aniso*cos(S.tang)*c,S.aniso*sin(S.tang)*c,C[7].w*c,c);
  float film=clamp(S.film+(hash(w)-.5)*.012,0.,1.)*step(.001,uFilm);
  o6=vec4(c,film*c,vInst*c,c);
}`,zr=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
${pn}
/*COMMAND*/
${ft}
#define CLOSE_FIELDS
uniform sampler2D tCmd,tField;
// The kind's print, as the page painted it into its mask, uMaskR texels a css px of a canvas uCss across; and its screens' pictures side by side.
uniform sampler2D tMask,tScr;uniform highp sampler2DArray tBack,tLevel;uniform vec2 uCss;uniform float uMaskR,uRise;
flat in int vI;flat in float vInst,vPx;in vec2 vP;
${mn}
${Fr}
${Lr}
layout(location=0) out vec4 o0;layout(location=1) out vec4 o1;layout(location=2) out vec4 o2;layout(location=3) out vec4 o3;
layout(location=4) out vec4 o4;layout(location=5) out vec4 o5;layout(location=6) out vec4 o6;
// What was under here so far, as the library's map of heights has it: mean height by coverage, and coverage.
vec2 level(vec2 at,float lod){vec3 t=vec3(at/vec2(textureSize(tLevel,0).xy),0.);return vec2(textureLod(tLevel,t,lod).r,textureLod(tLevel,t+vec3(0,0,1),lod).r);}
// A chip in what it's printed on takes the print with it: k is here on what holds it, dk how far inside that.
float chips(vec2 k,float dk){
  if(uGroundWear<=0.) return 1.;
  float t=chipFrom(max(-dk,0.),uGroundWear,uChip);
  return 1.-smoothstep(t,t+.012,chipField(k+uGroundSeed,uChip))*smoothstep(0.,.2,uGroundWear);
}
${Rr}
void main(){
  int i=vI;
  for(int r=0;r<8;r++) C[r]=texelFetch(tCmd,ivec2(r,i),0);
  int op=int(C[0].x),type=int(C[0].y);
  vec2 P=vP,q,arc=vec2(0);float aa=1./vPx,fall=0.,side=1.;
  if(op<2){
    load(i);
    // A bend rolls the sheet over a curve seen from above, as the library's does: each pixel looks up the point of the sheet that
    // lands on it, so whatever is painted there closes up as it turns away. A rigid body keeps its outline, and only its grain closes up.
    if(uBendReach>0.){
      float t=dot(vP,uBendDir)-uBendAt.x,along=uBendBoth==1?sign(t):1.,y=t*along-uBendAt.y;
      if(y>0.){
        if(uBendK>=0.){side=clamp((uBendReach-y)/aa+.5,0.,1.);if(side<=0.) discard;}
        float r=min(y/uBendReach,1.),k=abs(uBendDrop)*4./uBendReach,run=uBendReach*asin(r)-y;
        P+=uBendDir*along*max(uBendK,0.)*run;
        arc=uBendDir*along*max(k*sqrt(k)-max(uBendK,0.),0.)*run;
        fall=uBendDrop*(1.-sqrt(1.-r*r));
      }
    }
  }
  float d=dist(type,P,q);
  if(op==5) d=abs(d)-C[2].x;
  if(op<2){if(type!=2) d-=C[7].x;if(C[7].y>0.) d=abs(d)-C[7].y*.5;}
  float c=clamp(.5-d/aa,0.,1.)*side;
  if(c<=0.) discard;
  o0=o1=o2=o3=o4=o5=o6=vec4(0);
  // A mark stops at what it lies on.
  float held=1.,chip=1.;
  if(op==1&&C[4].y>.5){
    vec4 K=texelFetch(tCmd,ivec2(8,i),0),L=texelFetch(tCmd,ivec2(9,i),0);
    vec2 k=rm(L.z)*(P-K.xy);
    float dk=L.x>1.5?1e3:sdRR(k,K.zw,L.y);
    if(L.x>1.5){vec2 t=k/(2.*(K.zw+L.yw))+.5;if(all(greaterThanEqual(t,vec2(0)))&&all(lessThanEqual(t,vec2(1)))){vec4 F=texelFetch(tCmd,ivec2(10,i),0);dk=fieldAt(F.xy+t*F.zw);}}
    held=clamp(.5-dk/aa,0.,1.);
    if(held<=0.) discard;
    chip=chips(k,dk);
  }
  if(op==0){
    // The surface as the library's material pass works it out, from its own values.
    float z=top(type,q,d)-(C[5].w>.5||C[5].x>0.?0.:fall);
    vec2 p=rm(uRot)*(P-uCenter),w=p+rm(uRot)*arc+uSeed;
    // A sheet lies over what's under it, with its stiffness for a blur. Past the edge of what holds it, it carries straight on at the height it's stuck at.
    if(C[5].x>0.){
      float blur=C[5].x;vec2 wide=vec2(0.),px=vec2(vPx,-vPx),at=gl_FragCoord.xy;
      float lod=clamp(log2(blur*.7*vPx),0.,${Pr}.);
      for(int k=0;k<12;k++){float t=float(k)*2.39996,r=sqrt((float(k)+.5)/12.)*blur;wide+=level(at+vec2(cos(t),sin(t))*r*px,lod);}
      vec2 all=level(at+(uCenter-vP)*px,clamp(log2(C[5].y*2.*vPx),0.,${Pr}.)),here=level(at,0.);
      float held=all.x/max(all.y,.001),over=mix(held,wide.x/max(wide.y,.001),smoothstep(.1,.6,wide.y/12.));
      z+=mix(max(over,mix(held,here.x/max(here.y,.001),here.y)),over,smoothstep(0.,blur*.5,-d))-uRise;
    }
    Surface S=surface(p,w,z,max(-d,0.),aa,aa);
    z=S.h+S.t;
    // One that follows what it lies on adds to its height; any other covers it.
    o0=C[5].w>.5?vec4(c*z,0,0,0):vec4(c*(z+uRise),0,0,c);
    written(S,w,c);
  }else if(op==1&&type==6){
    // As the library's: the cut softened at a fixed level of the mask, so its walls are as wide in css px however sharp the mask
    // was painted, and no finer than a shown pixel; the ink read as sharp as it's shown.
    vec2 sheet=P/uCss;
    float lr=log2(uMaskR),cut=textureLod(tMask,sheet,max(lr*.75+.1,lr-log2(vPx))).r*c*held;
    o0=vec4(-C[2].x*cut,0,0,0);
    if(C[2].w>.5){
      float a=texture(tMask,sheet).r*c*held*chip;
      if(uWear>0.){float t=1.-.42*sqrt(uWear);a*=1.-smoothstep(t,t+.08,fbm((rm(uRot)*(P-uCenter)+uSeed)*.13));}
      o1=vec4(C[3].rgb*a,a);o2=vec4(C[3].a*a,C[4].x*a,0,a);o3=vec4(0,0,a,a);o4=vec4(C[5].rgb*a,a);o5=vec4(0,0,a,a);
    }
  }else if(op==1){
    float soft=max(C[2].y,aa),cut=clamp(-d/soft,0.,1.);
    o0=vec4(-C[2].x*cut*c*held,0,0,0);
    if(C[2].w>.5){
      // Print, worn in patches as the library's is.
      float a=(C[2].z>0.?smoothstep(0.,C[2].z,-d)*side:c)*held*chip;
      if(uWear>0.){float t=1.-.42*sqrt(uWear);a*=1.-smoothstep(t,t+.08,fbm((rm(uRot)*(P-uCenter)+uSeed)*.13));}
      o1=vec4(C[3].rgb*a,a);o2=vec4(C[3].a*a,C[4].x*a,0,a);o3=vec4(0,0,a,a);o4=vec4(C[5].rgb*a,a);
    }
    float l=C[7].w*c*held;
    if(l>0.) o5=vec4(0,0,l,l);
  }else if(op==2){
    vec3 col=C[3].rgb,emit=C[5].rgb;float metal=C[4].x;
    if(C[4].w>.5) screen(q,col,emit,metal);
    o0=vec4((C[2].y+uRise)*c,0,0,c);o1=vec4(col*c,c);o2=vec4(C[3].a*c,metal*c,C[4].y*c,c);o3=vec4(0,0,c,c);
    o4=vec4(emit*c,c);o5=vec4(0,0,C[7].w*c,c);
  }else if(op==3){
    // Glass the panes can't hold adds to what's below, so a dial keeps its relief and only gains a shine.
    float e=clamp(-d/max(C[2].y,.01),0.,1.);
    o0=vec4(C[2].x*sqrt(1.-(1.-e)*(1.-e))*c,0,0,0);
    o2=vec4(0,0,C[2].z*c,0);
  }else if(op==4){
    // Frost, as the library's: what's under it, seen through a spiral of taps, and only what scatters less than it does stays as it was.
    float zTop=C[2].x,zEdge=C[2].y,bevel=C[2].z,blur=C[2].w,opacity=C[3].a,zoom=C[4].z;
    float e=clamp(-d/max(bevel,.01),0.,1.),pe=sqrt(1.-(1.-e)*(1.-e));
    vec2 sz=vec2(textureSize(tBack,0).xy),seen=gl_FragCoord.xy+(q/zoom-q)*vec2(vPx,-vPx);
    float lod=blur>0.?max(min(log2(blur*.7),log2(blur*vPx)),0.):0.;
    vec3 back=vec3(0),light=vec3(0);
    for(int t=0;t<12;t++){
      float a=float(t)*2.39996,r=sqrt((float(t)+.5)/12.)*blur*vPx;
      vec2 s=(seen+vec2(cos(a),sin(a))*r)/sz;
      vec4 b=textureLod(tBack,vec3(s,0.),lod);
      back+=b.rgb/max(b.a,.05);
      light+=textureLod(tBack,vec3(s,2.),lod).rgb;
    }
    back/=12.;light/=12.;
    vec4 under=textureLod(tBack,vec3(seen/sz,1.),lod);
    float ua=max(under.a,.05),scatter=clamp(blur/6.+opacity,0.,1.),mf=.5*under.g/ua;
    back*=1.-min(mf*2.,1.)*scatter*.7;
    float z=mix(zEdge,zTop,pe)-fall+(vnoise(q*1.9)-.5)*.012*min(blur,1.);
    o0=vec4((z+uRise)*c,0,0,c);o1=vec4(mix(back,C[3].rgb,opacity)*c,c);
    o2=vec4(mix(under.r/ua,C[4].x,scatter)*c,2.*mf*(1.-scatter)*c,C[4].y*c,c);o3=vec4(0,0,c,c);
    o4=vec4(light*C[4].w*c,c);o5=vec4(0,0,0,c);o6=vec4(c,0,vInst*c,c);
  }else if(op==5) o4=vec4(C[5].rgb*c,0);
  else discard;
}`,Br=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
${pn}
/*COMMAND*/
${ft}
#define CLOSE_FIELDS
uniform sampler2D tCmd,tField,tRows,tOwn;uniform float uRise;
flat in int vI;flat in float vInst,vPx;in vec2 vP;
${mn}
${Fr}
layout(location=0) out vec4 o0;layout(location=1) out vec4 o1;layout(location=2) out vec4 o2;layout(location=3) out vec4 o3;
layout(location=4) out vec4 o4;layout(location=5) out vec4 o5;layout(location=6) out vec4 o6;
${Rr}
// Row 11 how it's turned, and where its face's middle is: sine, x, y, plane. Row 12 this face's middle and plane, and which set of rows. Row 13 how far its outline goes on its own face. Row 14 where the rows start, their step and count, and the middle of the part.
vec4 S0,F0,R0,K0;
float outline(vec2 P,out vec2 q){int t=int(C[0].y);float d=dist(t,P,q);if(t!=2) d-=C[7].x;if(C[7].y>0.) d=abs(d)-C[7].y*.5;return d;}
// A column of this plate is one height on that face, and looking down it runs along that face toward its middle. The first point of the outline that stands that high is what this face sees.
float meet(float H,float y,float stop,out vec2 at){
  float sn=S0.x,fx=S0.y,me=F0.z,bevel=C[2].z,mid=K0.w;
  float dir=sn>0.?1.:-1.,u=sn>0.?R0.x:R0.z,end=sn>0.?R0.z:R0.x,fine=max(min(bevel,4.)/12.,.06),was=u;
  bool hit=false;vec2 q;int type=int(C[0].y);
  for(int i=0;i<512;i++){
    if((end-u)*dir<0.||(fx-u*MM)*sn+me<=stop) break;
    float d=outline(vec2(u,y),q);
    if(d>0.){was=u;u+=dir*max(d,.25);continue;}
    float t=top(type,q,d);
    if(t>=H&&H>(mid>0.?2.*mid-t:-1e9)){hit=true;break;}
    was=u;u+=dir*fine;
  }
  if(!hit) return -1e9;
  float a=was,b=u;
  for(int i=0;i<6;i++){
    float m=(a+b)*.5,d=outline(vec2(m,y),q);
    if(d<=0.&&top(type,q,d)>=H) b=m; else a=m;
  }
  at=vec2(b,y);
  return (fx-b*MM)*sn+me;
}
float rowsAt(int i,int k){
  if(i<0||i>=int(K0.z)) return k==0?-1e9:1e9;
  vec4 r=texelFetch(tRows,ivec2(i,int(F0.w)),0);
  return k==0?r.r:r.g;
}
// A layer of the body side on: a column is one height in it, which its edge sets in from the outline by so much, and a ball of that size rolled along the outline makes the corners round.
float section(float H,float y){
  float zEdge=C[2].x,zTop=C[2].y,D=zTop-zEdge,bevel=C[2].z;int prof=int(C[2].w);
  if(H<zEdge||H>zTop||D<=0.) discard;
  float hf=(H-zEdge)/D,a=0.,b=1.;
  if(prof==0) b=0.;
  else for(int i=0;i<14;i++){
    float e=(a+b)*.5,pe=prof==1||prof==3?sqrt(1.-(1.-e)*(1.-e)):prof==4?e*e*(3.-2.*e):e;
    if(pe<hf) a=e; else b=e;
  }
  float k=b*bevel,sn=S0.x,f=(y-K0.x)/K0.y;
  int side=sn<0.?0:1,i0=int(floor(f));
  float g=mix(rowsAt(i0,side),rowsAt(i0+1,side),fract(f))+(side==0?-k:k);
  if(k>0.){
    int n=int(ceil(k/K0.y));
    for(int j=-n;j<=n;j++){
      int i=i0+j;float dy=float(i)*K0.y+K0.x-y,r=k*k-dy*dy;
      if(r<0.) continue;
      float e=rowsAt(i,side)+(side==0?-sqrt(r):sqrt(r));
      g=side==0?min(g,e):max(g,e);
    }
  }
  if(abs(g)>1e8) discard;
  float z=(S0.y-g*MM)*sn+F0.z;
  if(z<=0.) discard;
  return z;
}
void main(){
  int i=vI;
  for(int r=0;r<8;r++) C[r]=texelFetch(tCmd,ivec2(r,i),0);
  S0=texelFetch(tCmd,ivec2(11,i),0);F0=texelFetch(tCmd,ivec2(12,i),0);R0=texelFetch(tCmd,ivec2(13,i),0);K0=texelFetch(tCmd,ivec2(14,i),0);
  load(i);
  float aa=1./vPx;
  vec2 at=vP*MM-F0.xy;
  float H=at.x*S0.x+S0.w,y=(at.y+S0.z)/MM;
  if(int(C[0].x)==6){
    if(H<S0.w) discard;
    float own=texelFetch(tOwn,ivec2(gl_FragCoord.xy),0).r,lo=own>.01?own+.35:0.;
    vec2 P,q;
    float seen=meet(H,y,lo,P);
    if(seen<=lo) discard;
    float d=outline(P,q);
    vec2 w=vec2(H/MM,y)+uSeed;
    Surface S=surface(rm(uRot)*(P-uCenter),w,top(int(C[0].y),q,d),max(-d,0.),aa,aa);
    S.aniso=0.;
    written(S,w,1.);
    o0=vec4(seen+uRise,0,0,1);
    gl_FragDepth=1.-clamp(seen/1024.,0.,1.);
  }else{
    float z=section(H,y);
    vec2 p=rm(uRot)*(vP-uCenter),w=p+uSeed;
    Surface S=surface(p,w,z,1e3,aa,aa);
    written(S,w,1.);
    o0=vec4(S.h+S.t+uRise,0,0,1);
    gl_FragDepth=gl_FragCoord.z;
  }
}`,Vr=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
${pn}
mat2 rm(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
#define CLOSE_FIELDS
uniform sampler2D tCmd,tField;
flat in int vI;flat in float vInst,vPx;in vec2 vP;
${mn}
${Fr}
void main(){
  int i=vI;
  C[0]=texelFetch(tCmd,ivec2(0,i),0);
  if(int(C[0].x)!=0) discard;
  for(int r=1;r<8;r++) C[r]=texelFetch(tCmd,ivec2(r,i),0);
  // One that follows or is bent doesn't hide what's under it, and a sheet needs it to lie over.
  if(C[5].w>.5||C[5].z>.5||C[5].x>0.) discard;
  vec2 q;float d=dist(int(C[0].y),vP,q);
  if(C[0].y!=2.) d-=C[7].x;if(C[7].y>0.) d=abs(d)-C[7].y*.5;
  if(d>-1./vPx) discard;
}`,Hr=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
uniform sampler2D tInst,tVis,tDev;
uniform vec3 uScroll;uniform vec2 uTo;uniform float uToM; // the target's size, and how far the window is into it
flat out float vInst,vS;flat out vec4 vE;out vec2 vP;
void main(){
  int vi=gl_InstanceID,g=int(texelFetch(tVis,ivec2(vi%${Y},vi/${Y}),0).r);
  vec4 ins=texelFetch(tInst,ivec2(g%${Y},g/${Y}),0),d=texelFetch(tDev,ivec2(0,int(ins.w)),0);
  vE=texelFetch(tDev,ivec2(8,int(ins.w)),0);vS=ins.z;vP=vec2(gl_VertexID&1,gl_VertexID>>1)*d.xy;
  // The library's canvas has room for the device's shadow already, and its light fades the page to plain before its edge.
  vec2 corner=vec2(gl_VertexID&1,gl_VertexID>>1),w=(ins.xy+corner*d.xy*ins.z)*uScroll.z-uScroll.xy+uToM;
  vInst=float(g+1);
  gl_Position=vec4(w.x/uTo.x*2.-1.,1.-w.y/uTo.y*2.,0,1);
}`,Ur=`#version 300 es
precision highp float;flat in float vInst,vS;flat in vec4 vE;in vec2 vP;
layout(location=0) out vec4 o0;layout(location=1) out vec4 o1;layout(location=2) out vec4 o2;layout(location=3) out vec4 o3;
layout(location=4) out vec4 o4;layout(location=5) out vec4 o5;layout(location=6) out vec4 o6;
// Canvases overlap on a stage, and a bare pixel is whichever's body is nearest: that's the one with a wall or a part that can be seen from here.
void main(){vec2 p=max(vE.xy-vP,vP-vE.zw);gl_FragDepth=clamp(max(max(p.x,p.y),0.)*vS/16384.,0.,1.);o0=o1=o2=o3=o4=o5=vec4(0);o6=vec4(0,0,vInst,1);}`,Wr=()=>`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
uniform sampler2D tInst,tVis,tDev;
uniform vec3 uScroll;uniform vec2 uTo;uniform float uToM;
out vec2 vPx;flat out vec4 vA;flat out vec2 vB;
void main(){
  int vi=gl_InstanceID,g=int(texelFetch(tVis,ivec2(vi%${Y},vi/${Y}),0).r);
  vec4 ins=texelFetch(tInst,ivec2(g%${Y},g/${Y}),0),d=texelFetch(tDev,ivec2(0,int(ins.w)),0);
  vA=texelFetch(tDev,ivec2(${ci},int(ins.w)),0);vB=texelFetch(tDev,ivec2(${ci+1},int(ins.w)),0).xy;
  // Nothing to it, or a prints' ridges and a scratch's width are well under a pixel.
  if(ins.z*uScroll.z<.45||vA.z+vA.w+vB.x<=0.&&abs(vB.y-.5)<.01){gl_Position=vec4(2,2,2,1);return;}
  vec2 corner=vec2(gl_VertexID&1,gl_VertexID>>1),w=(ins.xy+corner*d.xy*ins.z)*uScroll.z-uScroll.xy+uToM;
  vPx=corner*d.xy;
  gl_Position=vec4(w.x/uTo.x*2.-1.,1.-w.y/uTo.y*2.,0,1);
}`,Gr=()=>ht.replace(`uniform vec2 uSeed;`,`flat in vec4 vA;flat in vec2 vB;`).replace(`uniform float uPrints,uDust,uScuff,uHaze;`,`#define uSeed vA.xy
#define uPrints vA.z
#define uDust vA.w
#define uScuff vB.x
#define uHaze vB.y`),Kr=()=>`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
uniform sampler2D tInst,tVis,tDev;
uniform vec3 uScroll;uniform vec2 uTo;uniform float uToM;
out vec2 vPx;flat out vec4 vA;flat out vec4 vMap;flat out vec3 vB;
void main(){
  int vi=gl_InstanceID,g=int(texelFetch(tVis,ivec2(vi%${Y},vi/${Y}),0).r);
  vec4 ins=texelFetch(tInst,ivec2(g%${Y},g/${Y}),0),d=texelFetch(tDev,ivec2(0,int(ins.w)),0);
  float age=texelFetch(tDev,ivec2(${ci+1},int(ins.w)),0).z;
  if(age<=0.){gl_Position=vec4(2,2,2,1);return;}
  vec2 corner=vec2(gl_VertexID&1,gl_VertexID>>1),o=ins.xy*uScroll.z-uScroll.xy+uToM,sz=d.xy*ins.z*uScroll.z,w=o+corner*sz;
  vPx=corner*d.xy;
  vA=vec4(texelFetch(tDev,ivec2(${ci},int(ins.w)),0).xy,age,float(g+1));
  vMap=vec4(sz.x/uTo.x,-sz.y/uTo.y,o.x/uTo.x,1.-o.y/uTo.y);
  vB=vec3(d.xy,ins.z*uScroll.z);
  gl_Position=vec4(w.x/uTo.x*2.-1.,1.-w.y/uTo.y*2.,0,1);
}`,qr=()=>{let e=gt,t=(t,n)=>{if(!e.includes(t))throw Error(`weather: `+t.slice(0,60));e=e.replace(t,n)};t(`layout(location=0) out vec4 oA;
layout(location=1) out vec4 oS;`,`out vec4 o;flat in vec4 vA;flat in vec4 vMap;flat in vec3 vB;`),t(`uniform vec2 uCanvas,uSeed;`,`#define uCanvas vB.xy
#define uSeed vA.xy
#define uAge vA.z
#define uDpr vB.z`);let n=(t,n,r)=>{let i=e.indexOf(t),a=e.indexOf(n,i);if(i<0||a<0)throw Error(`weather: `+t.slice(0,60));e=e.slice(0,i)+r+e.slice(a+n.length)};n(`uniform float uAge,uDpr;`,`uniform vec4 uMap;`,`uniform sampler2D tG0;uniform highp sampler2DArray tGa,tPyrs;uniform vec2 uNearK;
#define uMap vMap`),n(`float at(vec2 uv,float lod,float off){`,`
}
`,`float at(vec2 uv,float lod,float off){vec3 t=vec3(AT(uv)*uNearK,0.);float l=max(lod-1.,0.);return textureLod(tPyrs,t+vec3(0,0,1),l).a/max(textureLod(tPyrs,t,l).a,.05);}
`),n(`vec4 H=textureLod(tH,AT(uv),0.);`,`float cov=textureLod(COVERS,AT(uv),0.).a;`,`ivec2 i=ivec2(gl_FragCoord.xy);vec4 g5=texelFetch(tGa,ivec3(i,5),0);if(abs(g5.b-vA.w)>=.5) discard;vec4 H=vec4(texelFetch(tG0,i,0).r,0,0,g5.r);float cov=H.a;`);let r=e.indexOf(`vec3 c=mix(`);return e.slice(0,r)+`o=vec4(dirt/max(a,.001),run,a,1.);}`},Jr=`#version 300 es
precision highp float;uniform sampler2D tG;out vec4 o;void main(){o=vec4(texelFetch(tG,ivec2(gl_FragCoord.xy),0).r);}`,Yr=`#version 300 es
precision highp float;uniform sampler2D tS;uniform vec2 uAt;uniform float uK;uniform int uFlip;out vec4 o;
void main(){ivec2 p=ivec2(gl_FragCoord.xy-uAt);if(uFlip==1) p.y=textureSize(tS,0).y-1-p.y;o=texelFetch(tS,p,0)*uK;}`,Xr=`#version 300 es
precision highp float;uniform highp sampler2DArray tGa;uniform sampler2D tG0;layout(location=0) out vec4 o0;layout(location=1) out vec4 o1;
void main(){ivec2 p=ivec2(gl_FragCoord.xy)*2,m=textureSize(tG0,0)-1;vec4 a=vec4(0),b=vec4(0);
  for(int y=0;y<2;y++)for(int x=0;x<2;x++){ivec2 q=min(p+ivec2(x,y),m);a+=vec4(texelFetch(tGa,ivec3(q,0),0).rgb,texelFetch(tGa,ivec3(q,5),0).r);b+=vec4(texelFetch(tGa,ivec3(q,3),0).rgb,texelFetch(tG0,q,0).r);}
  o0=a/4.;o1=b/4.;}`,Zr=`#version 300 es
precision highp float;uniform sampler2D tLit,tHist,tWeight;
uniform vec2 uWin,uLow;uniform float uS,uCap;uniform vec2 uJ;uniform vec3 uNow,uPrev;uniform float uHist,uAll,uPhase;uniform vec4 uMoved,uLit;uniform int uReach;layout(location=0) out vec4 o;layout(location=1) out vec4 oW;
bool inBox(vec2 p,vec4 b){return all(greaterThanEqual(p,b.xy))&&all(lessThanEqual(p,b.zw));}
vec4 hist(vec2 uv){vec2 sz=uWin,p=uv*sz-.5,f=fract(p),t=floor(p)+.5;
  vec2 w0=f*(-.5+f*(1.-.5*f)),w1=1.+f*f*(-2.5+1.5*f),w2=f*(.5+f*(2.-1.5*f)),w3=f*f*(-.5+.5*f),w12=w1+w2;
  vec2 a=(t-1.)/sz,b=(t+w2/w12)/sz,c=(t+2.)/sz;
  return (texture(tHist,vec2(a.x,a.y))*w0.x+texture(tHist,vec2(b.x,a.y))*w12.x+texture(tHist,vec2(c.x,a.y))*w3.x)*w0.y
        +(texture(tHist,vec2(a.x,b.y))*w0.x+texture(tHist,vec2(b.x,b.y))*w12.x+texture(tHist,vec2(c.x,b.y))*w3.x)*w12.y
        +(texture(tHist,vec2(a.x,c.y))*w0.x+texture(tHist,vec2(b.x,c.y))*w12.x+texture(tHist,vec2(c.x,c.y))*w3.x)*w3.y;}
void main(){vec2 pd=vec2(gl_FragCoord.x,uWin.y-gl_FragCoord.y),qd=pd*uS-uJ,qc=floor(qd)+.5,dd=(qd-qc)/uS;
  ivec2 m=ivec2(uLow)-1,qi=clamp(ivec2(qc.x,uLow.y-qc.y),ivec2(0),m);
  vec4 now=uS<1.?texture(tLit,vec2(qd.x,uLow.y-qd.y)/uLow):texelFetch(tLit,qi,0),lo=vec4(1e9),hi=vec4(-1e9);
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec4 c=texelFetch(tLit,clamp(qi+ivec2(x,y)*uReach,ivec2(0),m),0);lo=min(lo,c);hi=max(hi,c);}
  float wn=exp(-2.*dot(dd,dd))*(uS<1.?.25:1.);
  // Still, and nothing here changed this frame: the plain mean of one sample at each of the frames' 16 phases since it last did, from the first
  // frame it didn't, and once it has them all, held. A phase it has already is passed over, as one twice would weigh its jitter and cells
  // twice. What's kept from before was of something else, so none of it stays, and the picture is the scene's, whatever came first.
  if(uAll<.5&&!inBox(pd,uMoved)&&!inBox(pd,uLit)){vec4 W=texelFetch(tWeight,ivec2(gl_FragCoord.xy),0),H=texelFetch(tHist,ivec2(gl_FragCoord.xy),0);
    int m=int(W.g)|(int(W.b)<<8),bit=1<<int(uPhase);
    if((m&bit)!=0){o=H;oW=W;return;}
    if(m==0){o=now;oW=vec4(wn,float(bit&255),float(bit>>8),0);return;}
    m|=bit;o=(H*W.r+now*wn)/(W.r+wn);oW=vec4(W.r+wn,float(m&255),float(m>>8),0);return;}
  float cap=uCap;
  vec2 pp=(pd+uNow.xy)/uNow.z*uPrev.z-uPrev.xy,uv=vec2(pp.x,uWin.y-pp.y)/uWin;
  float hw=0.;vec4 h=vec4(0);
  if(uHist>0.&&all(greaterThanEqual(uv,vec2(0)))&&all(lessThanEqual(uv,vec2(1)))){vec4 H=hist(uv);h=clamp(H,lo,hi);if(all(greaterThanEqual(pd,uMoved.xy))&&all(lessThanEqual(pd,uMoved.zw)))cap=min(uCap,mix(8.,.25,smoothstep(.04,.12,length(now.rgb-H.rgb)/(max(max(now.r,now.g),now.b)+.05))));hw=min(texture(tWeight,uv).r,cap)*min(1.,pow(uPrev.z/uNow.z,2.));}
  o=(h*hw+now*wn)/(hw+wn);oW=vec4(min(hw+wn,cap),0,0,0);}`,Qr=`#version 300 es
precision highp float;uniform sampler2D tHist;uniform ivec2 uOff;uniform int uClear;uniform float uExposure;uniform vec3 uBack;uniform sampler2D tGlare;out vec4 o;
${wt}
void main(){ivec2 at=ivec2(gl_FragCoord.xy)-uOff;o=texelFetch(tHist,at,0);if(uClear==0){o.a=1.;return;}
  o.a=clamp(o.a,0.,1.);
  // A stage keeps light as it is, so the eye can change how it's seen without any of it being drawn again. A canvas of its own has been seen already, which is uExposure 0.
  if(uExposure>0.){vec3 rgb=max(o.rgb,vec3(0))*uExposure;rgb+=texture(tGlare,vec2(at)/vec2(textureSize(tHist,0))).rgb-max(rgb-1.,vec3(0))*.03;o.rgb=o.a>.002?encode(neutral(rgb/o.a))*o.a:encode(min(decode(uBack)+neutral(rgb),vec3(1)))-uBack;}
  else o.rgb=min(max(o.rgb,vec3(0)),vec3(o.a));
  float n=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))));o.rgb+=(n-.5)/255.*o.a;}`,$r=`#version 300 es
precision highp float;uniform sampler2D tHist,tBend;uniform float uPxPerMm;out vec4 o;
void main(){vec2 d=texture(tBend,gl_FragCoord.xy/vec2(textureSize(tHist,0))).rg;o=texture(tHist,(gl_FragCoord.xy+vec2(d.x,-d.y)*uPxPerMm)/vec2(textureSize(tHist,0)));}`,ei=24,ti=16,ni=`.5`,ri=e=>{let t=0;for(;e;e&=e-1)t++;return t},ii=e=>Math.max(e[2]-e[0],0)*Math.max(e[3]-e[1],0),ai=(e,t)=>[Math.min(e[0],t[0]),Math.min(e[1],t[1]),Math.max(e[2],t[2]),Math.max(e[3],t[3])],oi=(e,t,n)=>{for(let r=0;r<e.length;r++)for(let i=r+1;i<e.length;i++){let a=e[r],o=e[i],s=ai(a,o);(a[0]<o[2]&&o[0]<a[2]&&a[1]<o[3]&&o[1]<a[3]||t(s)<=t(a)+t(o)+n)&&(e[r]=s,e.splice(i,1),i=r)}},si=(e,t)=>{let n=1,r=0;for(;e>0;e=Math.floor(e/t))n/=t,r+=e%t*n;return r},ci=27,li=ci+2,ui=5,X=li+1+8*ui,di=[0,8,ci,ci+1],fi=(e,t)=>{let n=new Float32Array(8*ui*4);for(let r=0;r*18<e.length;r++)n.set(e.slice(r*18,(r+1)*18),r*ui*4),n[r*ui*4+14]+=t;return n},pi=(e,t,n,r=0)=>{let i=n.uTorch,a=!!i&&i[3]>0,o=n.uPoints??0,s=e=>t+e*4;e.set([...n.uSpin??[1,0],...n.uRound??[0,1]],s(11)),e.set([...n.uOwn??[0,0,0],(n.uFace??0)+r],s(12)),e.set([n.uSplit??-1,n.uDebug??0,+!!a,o],s(13)),a&&(e.set(i,s(14)),e.set(n.uBeam,s(15)),e.set(n.uCone,s(16)),e.set([...n.uAim,0],s(17)),e.set([...n.uTint,0],s(18)));let c=n.uCondition??[0,0,0,0,0,.5];e.set(c.slice(0,4),s(ci)),e.set([c[4],c[5],c[6]??0,0],s(ci+1));for(let t=0;t<o;t++)e.set(n[`uPoint[0]`].slice(t*4,t*4+4),s(19+t)),e.set([...n[`uPointColor[0]`].slice(t*3,t*3+3),0],s(23+t))},mi=`
uniform sampler2D tInst,tDev;
vec4 gIns;
vec4 dev(int r){return texelFetch(tDev,ivec2(r,int(gIns.w)),0);}
vec4 paneAt(int i,int t){return texelFetch(tDev,ivec2(${li+1}+i*${ui}+t,int(gIns.w)),0);}
void device(float id){int g=int(id+.5)-1;gIns=texelFetch(tInst,ivec2(g%${Y},g/${Y}),0);}`,hi={NO_PANES:1,GLOWLESS:2,PLAIN:4,NO_TORCH:8,NO_POINTS:16};function gi(e=0){let t=t=>!(e&hi[t]),n={uCss:`uRow[0].xy`,uTall:`uRow[0].w`,uKey:`uKeyNow`,uLift:`uRow[1].w`,uCam:`uRow[2].xyz`,uLamp:`uRow[2].w`,uBody:`uRow[3]`,uFrame:`uRow[4]`,uRoomColor:`uRow[5].rgb`,uLampSoft:`uRow[5].a`,uSky:`uRow[6].xyz`,uLampHead:`uRow[6].w`,uFill:`uRow[7].x`,uRoom:`uRow[7].y`,uPageShade:`uRow[7].z`,uPeak:`uRow[10].w`,uSpin:`uRow[11].xy`,uRound:`uRow[11].zw`,uOwn:`uRow[12].xyz`,uFace:`uRow[12].w`,uSplit:`-1.`,uShift:`vec2(0.)`,uDpr:`uNow.x`,uLinear:`(uKeepsLight>0)`,uPanes:t(`NO_PANES`)?`int(uRow[${li}].x)`:`0`,uDebug:t(`PLAIN`)?`uDebugNow`:`0`,uPoints:t(`NO_POINTS`)?`uPointsNow`:`0`,uTorch:t(`NO_TORCH`)?`uRow[14]`:`vec4(0,0,1,0)`,uBeam:t(`NO_TORCH`)?`uRow[15]`:`vec4(0)`,uCone:t(`NO_TORCH`)?`uRow[16]`:`vec4(0)`,uAim:t(`NO_TORCH`)?`uRow[17].xyz`:`vec3(0)`,uTint:t(`NO_TORCH`)?`uRow[18].xyz`:`vec3(0)`};return`layout(std140) uniform Rows{vec4 uRow[${X}];};uniform vec4 uIns,uNow;uniform vec3 uKeyNow;uniform int uDebugNow,uPointsNow;
${Et.replace(/^(\w+) ([^;\n]+);$/gm,(e,t,r)=>{let i=r.split(`,`).filter(e=>!(e.replace(/\[.*/,``)in n));return i.length?`uniform ${t} ${i.join(`,`)};`:``})}${Object.entries(n).map(([e,t])=>`#define ${e} ${t}\n`).join(``)}#define gIns uIns
#define gIn uNow.yz
#define gGlowless ${e&hi.GLOWLESS?`true`:`(uRow[${li}].y<.5)`}
vec4 paneAt(int i,int t){return uRow[${li+1}+i*${ui}+t];}
`}function _i(){return`${mi}
${Mr}
uniform int uDebugAll;uniform float uLighting;
${Et}vec4 uNow;
#define gIn uNow.yz
#define gGlowless (dev(${li}).y<.5)
bool rowsFor(float id){
  device(id);
  vec4 r0=dev(0);
  if(abs(r0.z-uLighting)>.5) return false;
  float dz=gIns.z*uScroll.z;vec2 c=r0.xy*dz,x0=gIns.xy*uScroll.z-uScroll.xy,G=vec2(textureSize(tG0,0));
  uNow=vec4(dz,.5/c,id);
  uMap=vec4(c.x/G.x,-c.y/G.y,(x0.x+uMargin)/G.x,1.-(x0.y+uMargin)/G.y);
  uCss=r0.xy;uTall=r0.w;uShift=vec2(0.);uSplit=-1.;uDpr=dz;uLinear=uKeepsLight>0;
  int l=live(id);vec4 r1=dev(1);uKey=l<0?r1.xyz:uLiveKey[l];uLift=r1.w;
  vec4 r2=dev(2);uCam=r2.xyz;uLamp=r2.w;uBody=dev(3);uFrame=dev(4);
  vec4 r5=dev(5);uRoomColor=r5.rgb;uLampSoft=r5.a;vec4 r6=dev(6);uSky=r6.xyz;uLampHead=r6.w;vec4 r7=dev(7);uFill=r7.x;uRoom=r7.y;uPageShade=r7.z;
  uPeak=dev(10).w;vec4 t0=dev(11);uSpin=t0.xy;uRound=t0.zw;vec4 t1=dev(12);uOwn=t1.xyz;uFace=t1.w;
  uPanes=int(dev(${li}).x);
  vec4 e=dev(13);
  uDebug=uDebugAll!=0?uDebugAll:int(e.y);
  bool torch=e.z>.5;
  uTorch=torch?dev(14):vec4(0,0,1,0);uBeam=torch?dev(15):vec4(0);uCone=torch?dev(16):vec4(0);uAim=torch?dev(17).xyz:vec3(0);uTint=torch?dev(18).xyz:vec3(0);
  uPoints=dz<.75?0:int(e.w);
  for(int i=0;i<4;i++){uPoint[i]=dev(19+i);uPointColor[i]=dev(23+i).xyz;}
  return true;
}
`}var vi=`#version 300 es
uniform vec4 uBox;
void main(){vec2 c=vec2(gl_VertexID&1,gl_VertexID>>1);gl_Position=vec4(mix(uBox.xy,uBox.zw,c),0.,1.);}`,yi=`#version 300 es
precision highp float;precision highp int;
${pn}
uniform sampler2D tWorld,tBake;uniform highp sampler2DArray tGa,tPyrs;uniform int uClear;
uniform vec3 uScroll;uniform vec2 uG;uniform float uMargin,uPyrTop;uniform int uFrame,uLampOnly,uShadeDiv;uniform ivec2 uShadeAt;
${mi}
${Mr}
const float PI_=3.14159;
float gPx;vec2 gCss;
flat in float vInst;
layout(location=0) out vec4 o;layout(location=1) out vec4 o2;
float ME,UP,TOP;
// A texel's height if it's this plate's, and the page's otherwise. Plates of a device are numbered in a row from the bottom, so
// the next UP are what's on this one, and what stands on it hides as much of it as stands there.
float mine(ivec2 i){
  float b=texelFetch(tGa,ivec3(i,5),0).b;
  if(abs(b-ME)<.5) return texelFetch(tWorld,i,0).r;
  if(b<ME||b>ME+UP+.5) return 0.;
  int g=int(b+.5)-1;
  return texelFetch(tDev,ivec2(10,int(texelFetch(tInst,ivec2(g%${Y},g/${Y}),0).w)),0).z>0.?min(texelFetch(tWorld,i,0).r,TOP):0.;
}
const float COARSEST=log2(128.);
// Whether a read at this level is of this device. Two of its cells past what it has standing is the page, and so is any nearer than a cell to the next seat: a device's seat ends where its canvas does, and the gap is all that's known to be clear beyond it.
bool ownReach(vec2 P,float l){vec4 E=dev(8);float cell=exp2(ceil(l)),c=max(min(exp2(l+1.),128.-cell),0.)/gPx;return !(any(lessThan(P,E.xy-c))||any(greaterThan(P,E.zw+c)));}
// How high what's this device's stands here, at a level of the library's map of its heights: mean height, as that takes its steps through.
// Past its own reach, the page, as a neighbour's never casts by a lamp that isn't its own.
float heightAt(vec2 P,float l){
  if(!ownReach(P,l)) return 0.;
  vec2 w=(gIns.xy+P*gIns.z)*uScroll.z-uScroll.xy+uMargin,uv=vec2(w.x,uG.y-w.y)/uG;
  if(any(lessThan(uv,vec2(0)))||any(greaterThan(uv,vec2(1)))) return 0.;
  if(l>=.5) return textureLod(tPyrs,vec3(uv*uG/(2.*vec2(textureSize(tPyrs,0).xy)),1.),min(l,COARSEST)-1.).a;
  vec2 t=uv*uG-.5,f=fract(t);ivec2 i=ivec2(floor(t));
  return mix(mix(mine(i),mine(i+ivec2(1,0)),f.x),mix(mine(i+ivec2(0,1)),mine(i+ivec2(1,1)),f.x),f.y);}
// What stands tall within a lamp ray's reach of here, as the library's map of tops has it, so a ray stops when it's above that and takes steps for what's near and not for the device's tallest part: four cells of the pyramid as big as the reach, side by side.
// The reach is as far along as this ray goes before it's above the device's tallest part, from where it starts and as steep as it is. A ray off the page under a
// lifted device starts below it, and one by a low lamp climbs slowly: a reach of the tallest part over the lowest lamp alone stops both short, and where the
// pyramid's cells happen to fall round the seat decides how much of the shadow's tail is left. And the march's long steps read mean heights up to
// level 3, filtered, where ownReach lets a read land 16 px past what stands and the filter carries it a cell further: 32 px is past both, and 16 isn't.
float topAt(vec2 P,float h0,vec3 L){
  vec2 w=(gIns.xy+P*gIns.z)*uScroll.z-uScroll.xy+uMargin,c=vec2(w.x,uG.y-w.y);
  float m=max(max(dev(0).w-h0,0.)*length(L.xy)/max(L.z,.1)/${Lt},48.)*gPx+32.;int k=int(clamp(ceil(log2(2.*m)),0.,uPyrTop));
  ivec2 z=textureSize(tWorld,k)-1,a=clamp(ivec2(c-m)>>k,ivec2(0),z),b=clamp(ivec2(c+m)>>k,ivec2(0),z);
  return max(max(texelFetch(tWorld,a,k).r,texelFetch(tWorld,b,k).r),max(texelFetch(tWorld,ivec2(a.x,b.y),k).r,texelFetch(tWorld,ivec2(b.x,a.y),k).r))+.01;}
// The library's own march, with its heights read from here: mean height, and nothing standing clear, so nothing under. Its start along the step is one hash
// a texel, moved on by the golden ratio each frame, so the frames a still view gathers spread over the step evenly: four fresh hashes leave a grain where the
// steps are long, as under a crystal. The hash is of where on the device it is, and a seat's frames are its steps, so a device comes out the same wherever it
// sits and whatever came before.
float marchH(vec2 uv,float lod){return heightAt(uv*gCss,lod);}
float marchU(vec2 uv){return -1e9;}
float marchTop(vec2 uv,float h0,vec3 L){return topAt(uv*gCss,h0,L);}
float marchStart(vec2 uv){vec2 at=uv*gCss*gPx;return fract(fract(sin(dot(at,vec2(12.9898,78.233)))*43758.5453)+float(uFrame)*.618034);}
#define uCss gCss
#define uDpr gPx
${At}
#undef uCss
#undef uDpr
// How high things stand on average here, at this level of a device's own css px, as the library's map of its heights has it.
float meanAt(vec2 P,float l){if(!ownReach(P,l)) return 0.;vec2 w=(gIns.xy+P*gIns.z)*uScroll.z-uScroll.xy+uMargin;
  return textureLod(tPyrs,vec3(vec2(w.x,uG.y-w.y)/(2.*vec2(textureSize(tPyrs,0).xy)),1.),max(min(l,COARSEST)-1.,0.)).a;}
float coverAt(vec2 P,float l){if(!ownReach(P,l)) return 0.;vec2 w=(gIns.xy+P*gIns.z)*uScroll.z-uScroll.xy+uMargin;
  return textureLod(tPyrs,vec3(vec2(w.x,uG.y-w.y)/(2.*vec2(textureSize(tPyrs,0).xy)),0.),max(min(l,COARSEST)-1.,0.)).a;}
// What this device leaves of the page, as the library works it out for its canvas: its shadow, and what stands close crowding the light out, over about
// 2 and 7 mm, all fading before its canvas ends. It's worked out per device and multiplied, so a canvas lying over another's cuts nothing: whoever is marked at a pixel, every device has had its say there.
float leftOfPage(vec2 P,float pk){
  vec4 turn=dev(11),F=dev(4),E=dev(8);float face=dev(12).w;
  if(turn.x<=0.||dev(1).w>=face) return 1.;
  vec2 past=max(E.xy-P,P-E.zw),toEdge=min(P-F.xy,F.zw-P);
  float out_=max(past.x,past.y),lod=log2(gPx),b=3.2+lod,b2=4.8+lod,deep=4./max(face,4.);
  // Measured against the body, or a deep one's blurred height passes 1mm far out and the crowding ends in a hard line. The maps have every device in them: only what's within reach of this one is its.
  float amb=min(max(meanAt(P,b)*deep,0.),coverAt(P,b))*(1.-smoothstep(9.,18.,out_)),amb2=min(max(meanAt(P,b2)*deep,0.),coverAt(P,b2))*(1.-smoothstep(28.,56.,out_));
  float room=dev(7).y,loss=(1.-(1.-min((1.-pk)*.38*dev(7).z,.9))*(1.-amb*.3)*(1.-amb2*.22))*smoothstep(0.,36.,min(toEdge.x,toEdge.y))*mix(.45,1.,smoothstep(0.,.5,room));
  // A body turning over lifts off the page, and comes back down.
  if(turn.y>0.) loss*=turn.w*turn.w;
  return 1.-loss;
}
void main(){
  ivec2 gp=ivec2(gl_FragCoord.xy)*uShadeDiv+uShadeAt+ivec2(uMargin);
  o2=vec4(1);
  vec4 g6=texelFetch(tGa,ivec3(gp,5),0);float id=g6.b;
  bool own=abs(id-vInst)<.5;
  device(vInst);ME=vInst;
  gPx=gIns.z*uScroll.z;gCss=dev(0).xy;
  // At the pixel its height is from: half a cell off, on a steep wall, is a point inside the wall or clear of it.
  vec2 wp=vec2(gp)+.5,P=((vec2(wp.x,uG.y-wp.y)-uMargin+uScroll.xy)/uScroll.z-gIns.xy)/gIns.z;
  float H0=texelFetch(tWorld,gp,0).r;
  // Whether anything's here, and not how high: a well can go below the page's level, as a flat sheet can lie on it.
  bool page=g6.r<.01;
  vec4 plate=dev(10);
  bool under=!own&&!page&&id<vInst&&id>vInst-plate.x-.5;
  if(!own&&!page&&!under){o=vec4(1);return;}
  UP=page?plate.y:-1.;TOP=plate.w;
  bool ground=page||under;
  // A device not zoomed into reads what its kind baked: see \`bake\`. Its lamp stays where it is, and nothing but its own body
  // stands in the way of it, so the bake is the same for every one of a kind, wherever it is and however it's shown. Only its own part of
  // the atlas: what's next to it there is another device's.
  int l=live(vInst);vec4 R=dev(9);
  if(l<0&&R.w>.5){vec4 b=texture(tBake,(R.xy+clamp(P*R.z,vec2(.5),dev(0).xy*R.z-.5))/vec2(textureSize(tBake,0)));o=own?b:under?vec4(b.www,1):vec4(1,1,1,b.w);if(own) o2.rg=vec2(.5);return;}
  float C0=g6.r,HS=H0/max(C0,.25);
  vec3 key=l<0?dev(1).xyz:uLiveKey[l];
  vec2 PU=P/gCss;
  vec4 TR=dev(13);
  // By night, what throws the page's shadow is the torch.
  // The share is of the page seen at this pixel, and every device sees it from its own camera: a view ray through here comes down on the page further out from under that, by this much.
  // Worked out here for each device and kept at the pixel, it can't jump where the device marked at the pixel changes.
  float face=dev(12).w;vec3 cam=dev(2).xyz;
  vec2 PG=uClear>0&&dev(11).y<=0.?P+(P*MM-cam.xy)/(cam.z-face)*face/MM:P;
  vec3 pageKey=TR.z>.5&&dev(7).y<.5?dev(14).xyz:key,Lg=normalize(pageKey-vec3(PG*MM,0.));Lg=normalize(vec3(Lg.xy,max(Lg.z,.75*length(Lg.xy))));
  vec3 L=normalize(key-vec3(P*MM,HS));
  // Turned, a lamp really can be down at the horizon, and behind.
  if(dev(11).y<=0.) L=normalize(vec3(L.xy,max(L.z,.6*length(L.xy))));
  float LIFT=dev(1).w+plate.z,lamp=ground?shadow(PG/gCss,LIFT,Lg,.6,1.):shadow(PU,HS,L,.34,1.);
  vec4 F=dev(4);vec2 toEdge=min(P-F.xy,F.zw-P);
  float share=ground?1.-min((1.-lamp)*.38*dev(7).z,.9)*smoothstep(0.,36.,min(toEdge.x,toEdge.y)):1.;
  // A device with a canvas of its own: what its lamp leaves of the page, for the light pass to work its share out from. Page is what's seen here: a pixel only partly over the
  // body, and one whose view ray goes on past a low edge and comes down on the page. Where none of it can be seen there's no share, which nothing else can leave as 0.
  if(uClear>0){
    if(under){o=vec4(lamp,lamp,lamp,1);return;}
    vec2 gw=(gIns.xy+PG*gIns.z)*uScroll.z-uScroll.xy+uMargin;
    share=ground?leftOfPage(PG,lamp):C0<.996||texelFetch(tWorld,ivec2(gw.x,uG.y-gw.y),0).r<.01?leftOfPage(PG,shadow(PG/gCss,LIFT,Lg,.6,1.)):0.;
  }
  if(under){o=vec4(share,share,share,1);return;}
  if(!own){o=vec4(1,1,1,share);return;}
  if(uLampOnly>0){o=vec4(lamp,1,1,share);return;}
  vec3 p=vec3(P*MM,HS);
  float sky=shadow(PU,HS,normalize(dev(6).xyz),.75,1.);
  if(TR.z>.5) o2.b=shadow(PU,HS,normalize(dev(14).xyz-p),.2,1.);
  if(TR.w>.5) o2.a=shadow(PU,HS,normalize(dev(19).xyz-p),.3,1.);
  // The room's occlusion, as the library works it out: how far up the mean height round it stands, in ten directions, each looking further and coarser.
  float px=gIns.z*uScroll.z,lod=log2(px);
  vec2 g=vec2(meanAt(P+vec2(1.5,0),lod)-meanAt(P-vec2(1.5,0),lod),meanAt(P+vec2(0,1.5),lod)-meanAt(P-vec2(0,1.5),lod))/(3.*MM);
  float seen=0.;vec2 open=vec2(0);
  for(int i=0;i<10;i++){
    float a=(float(i)+.5)*.62832,r=1.5/min(px,1.),top=0.;
    vec2 dir=vec2(cos(a),sin(a));
    for(int k=0;k<6;k++){
      float d=r*MM,rise=meanAt(P+dir*r,max(log2(r*px)-1.3,0.))-H0-dot(g,dir)*d;
      top=max(top,rise/sqrt(rise*rise+d*d)*(1.-float(k)*.1));
      r*=2.;
    }
    seen+=1.-top*top;
    open+=dir*(1.-top);
  }
  o=vec4(lamp,seen*.1,sky,share);
  o2.rg=open*.1*.5+.5;
}`,bi={lit:`vec4 c=shade(land(vUv));
  o=uClear>0?c:vec4(c.rgb+encode(pageAt(ip))*(1.-c.a),1.);`,hold:`vec2 uv=land(vUv);
  o=shade(uv);
  oLand=vec4(uv-vUv,gN);
  oTake=gTake;`,emit:`ivec2 hq=ivec2(gl_FragCoord.xy-uFc);
  vec4 hk=texelFetch(tHold0,hq,0),hl=texelFetch(tHold1,hq,0),ht=texelFetch(tHold2,hq,0);
  gUv=vUv+hl.xy;
  float hc=readA(AT(gUv),0.).a;
  vec3 hrgb=vec3(0.);
  if(hc>.004) {hrgb=(hk.rgb+glow(normalize(vec3(hl.ba,1.)),ht.a,ht.rgb))*EXPOSURE;if(!uLinear) hrgb=encode(neutral(hrgb));}
  o=vec4(hrgb*hc,hk.a);`};function xi(e=`lit`,t=0,n=!1,r=!1){let i=n===`all`;i&&(n=!1);let a=`#version 300 es
${e===`hold`?`#define HOLD
`:``}${n?`#define PAGE
`:``}${i?`#define ALL
`:``}${Object.entries(hi).filter(([,e])=>t&e).map(([e])=>`#define ${e}\n`).join(``)}precision highp float;
vec2 vUv;
${Tt}uniform sampler2D tRoom,tDFG,tG0,tShadow,tShade2,tPyr,tCond,tDirt;uniform highp sampler2DArray tGa,tPyrs,tBrush;
uniform vec3 uScroll,uPage;uniform vec2 uWin;uniform float uPyrTop,uMargin,uS0,uShadeDiv;uniform int uKeepsLight;uniform vec2 uShadeAt,uShadeHeld;uniform int uClear;
vec2 gNearK;
// The numbers the light reads, from the row of the device this draw is lighting.
${i?_i():gi(t)}
// A plate's maps end at its canvas, and what looks past that finds the edge: here it would find whoever sits next in the window.
#define AT(uv) (clamp(uv,gIn,1.-gIn)*uMap.xy+uMap.zw)
${Dt}
// What the maps hold, from what's here. A t is where AT() put it, on these targets.
#define GA(t,k) textureLod(tGa,vec3(t,k),0.)
vec4 pyr(vec2 t,float k,float l){return textureLod(tPyrs,vec3(t*gNearK,k),l-1.);}
vec4 readA(vec2 t,float l){
  vec4 A=l>=.5?pyr(t,0.,l):vec4(GA(t,0.).rgb,GA(t,5.).r),D=textureLod(tDirt,t,0.);
  A.rgb=A.rgb*(1.-D.z)+mix(vec3(.17,.15,.12),mix(vec3(.022,.017,.012),vec3(.07,.035,.016),D.y),D.x)*A.a*D.z;
  return A;
}
vec4 readH(vec2 t,float l){
  if(l>=.5) return vec4(pyr(t,1.,l).a,0.,0.,pyr(t,0.,l).a);
  vec4 g=GA(t,4.);float c=GA(t,5.).r;
  // A screen says so as the library's does, by a grain past 1.
  if(g.b>1.5*max(c,.001)) g.r=2.*c;
  return vec4(textureLod(tG0,t,0.).r,g.rg,c);
}
vec4 readS(vec2 t,float l){vec4 g=GA(t,1.),f=GA(t,5.);float c=max(g.a,.001),d=textureLod(tDirt,t,0.).z;g.rgb*=1.-d;g.r+=.82*f.r*d;return vec4(g.r,g.g*(1.+f.g/c)*.5,g.b,g.a);}
vec4 readM(vec2 t,float l){return GA(t,2.);}
vec4 readC(vec2 t,float l){return textureLod(tCond,t,0.);}
vec4 readU(vec2 t,float l){return vec4(0.);}
vec4 readE(vec2 uv,float l){vec2 t=AT(uv);return l<.5?vec4(GA(t,3.).rgb*.25,0.):vec4(pyr(t,1.,l).rgb*.25,0.);}
// The tallest within reach of a view ray here: four cells of the pyramid as big as that reach, side by side, cover it wherever it falls.
vec4 readTop(vec2 uv,float l){
  float m=48.*uDpr;vec2 w=vec2(AT(uv))*vec2(textureSize(tG0,0))/vec2(textureSize(tPyr,0)),d=m/vec2(textureSize(tPyr,0));
  float k=clamp(ceil(log2(2.*m)),0.,uPyrTop);
  return vec4(max(max(textureLod(tPyr,w+d,k).r,textureLod(tPyr,w-d,k).r),max(textureLod(tPyr,w+vec2(d.x,-d.y),k).r,textureLod(tPyr,w+vec2(-d.x,d.y),k).r))/max(uTall,.001),1.,0.,0.);
}
// Each cell of the shadows is worked out at one pixel of it, a different one each frame. A pixel takes the four cells round it by how near they
// fall and by how near the height they were worked out at is its own: one across a step is of something else, and the groove at a key's foot
// would take a share of what lights the key's top. Where none is near its height, as up a wall, it takes them by where they fall alone.
vec2 tapUv=vec2(-1),tapAt=vec2(-1);ivec2 tapK;vec4 tapW;
void taps(vec2 uv,vec2 at){
  if(uv==tapUv&&at==tapAt) return;
  tapUv=uv;tapAt=at;
  vec2 w=(gIns.xy+uv*uCss*gIns.z)*uScroll.z-uScroll.xy,g=vec2(w.x,uWin.y-w.y),t=(g-at-.5)/uShadeDiv,f=t-floor(t);
  ivec2 M=ivec2(uMargin),G=textureSize(tG0,0)-1,top=textureSize(tShadow,0)-1;
  tapK=ivec2(floor(t));
  float h=texelFetch(tG0,clamp(ivec2(g)+M,ivec2(0),G),0).r;
  vec4 b=vec4((1.-f.x)*(1.-f.y),f.x*(1.-f.y),(1.-f.x)*f.y,f.x*f.y),s;
  for(int i=0;i<4;i++){ivec2 k=clamp(tapK+ivec2(i&1,i>>1),ivec2(0),top);float d=(texelFetch(tG0,clamp(k*int(uShadeDiv)+ivec2(at)+M,ivec2(0),G),0).r-h)/${ni};s[i]=b[i]*exp(-d*d);}
  tapW=(s+b*.001)/(s.x+s.y+s.z+s.w+.001);
}
vec4 tapped(sampler2D T,vec2 uv,vec2 at){taps(uv,at);ivec2 top=textureSize(T,0)-1;vec4 o=vec4(0);for(int i=0;i<4;i++)o+=tapW[i]*texelFetch(T,clamp(tapK+ivec2(i&1,i>>1),ivec2(0),top),0);return o;}
vec4 SH(vec2 uv){return tapped(tShadow,uv,uShadeAt);}
// What a moving lamp doesn't draw again is at the cells it was drawn at, and what it does at the cells of this frame.
vec4 SHheld(vec2 uv){return tapped(tShadow,uv,uShadeHeld);}
// The page's share at this pixel, from the shade texels round it that saw any: what's under a body says nothing about the page, and would leave a pale edge along one.
float pageShare(){
  vec2 t=(gl_FragCoord.xy-uShadeAt-.5)/uShadeDiv,f=t-floor(t);ivec2 b=ivec2(floor(t));
  float sum=0.,all_=0.;ivec2 top=textureSize(tShadow,0)-1;
  for(int j=0;j<2;j++) for(int i=0;i<2;i++){
    ivec2 k=clamp(b+ivec2(i,j),ivec2(0),top);
    float v=texelFetch(tShadow,k,0).w,w=(i==0?1.-f.x:f.x)*(j==0?1.-f.y:f.y)*step(.001,v);
    sum+=w*v;all_+=w;
  }
  return all_>.001?sum/all_:1.;
}
vec4 SH2(vec2 uv,vec2 at){return tapped(tShade2,uv,at);}
// The page, on the world's one picture: plain, times every device's share of it, and crowded where any body stands close, over about 2 and 7 mm.
// Crowding is the blurred coverage of every device at once, so it needs no fade at a canvas's edge. Its widths are css px of a device at the grid's middle scale, uS0.
vec3 pageAt(ivec2 ip){vec2 uv=(vec2(ip)+.5)/vec2(textureSize(tG0,0))*gNearK;
  float k=uScroll.z*uS0/2.,amb=textureLod(tPyrs,vec3(uv,0.),max(log2(9.19*k),0.)).a,amb2=textureLod(tPyrs,vec3(uv,0.),max(log2(27.86*k),0.)).a;
  return uPage*texture(tShadow,((gl_FragCoord.xy-uShadeAt-.5)/uShadeDiv+.5)/vec2(textureSize(tShadow,0))).w*(1.-amb*.3)*(1.-amb2*.22);}
${kt}
// What it would march for its shadows and occlusion the shadow pass has.
float keyShadow(float h,vec3 L){return SH(gUv).x;}
float torchShadow(float h,vec3 L){return SH2(gUv,uShadeHeld).b;}
float pointShadow(float h,vec3 L){return SH2(gUv,uShadeAt).a;}
float skyShadow(float h){return SHheld(gUv).z;}
vec4 openness(vec2 eo){return vec4(SHheld(gUv).y,SH2(gUv,uShadeHeld).rg,1.);}
// The page's own shadow is on a canvas's alpha. On the world's one picture, the page is lit once under all of them: see pageAt.
// On a canvas of its own, each device worked out its share in the shadow pass, as what's at a pixel needn't be the one that casts there.
float pageLoss(float cov,float lodS){return uClear>0&&cov<.996?1.-pageShare():0.;}
// Most things glow not at all, and it takes many reads to find that out.
bool glowless(){return gGlowless;}
// A device's panes are in its row, so each has its own. One read says most pixels aren't under a pane, and the rest are read once, for one that is.
bool paneLoad(int i,vec2 at){
  vec4 p0=paneAt(i,0);vec2 off0=abs(at-p0.xy)-p0.zw;if(max(off0.x,off0.y)>=.5) return false;
  for(int t=0;t<${ui};t++){vec4 v=paneAt(i,t);gP[t*4]=v.x;gP[t*4+1]=v.y;gP[t*4+2]=v.z;gP[t*4+3]=v.w;}
  return true;
}
// Its picture is one sample of this frame's, for the resolve to gather, and its edges come out of that: no rays to spare for them.
void main(){
  ivec2 ip=ivec2(gl_FragCoord.xy)+ivec2(uMargin);
  gNearK=vec2(textureSize(tG0,0))/(2.*vec2(textureSize(tPyrs,0).xy));
  float id=texelFetch(tGa,ivec3(ip,5),0).b;
#ifdef PAGE
  // The page, once, under every device.
  if(id>=.5) discard;
  o=uClear>0?vec4(0):vec4(encode(pageAt(ip)),1);
#ifdef HOLD
  // Every layer it's held in is written, or it isn't one of this program's: nothing lands or takes a glow on the page.
  oLand=vec4(0);oTake=vec4(0);
#endif
#elif defined(ALL)
  if(id<.5){
    if(uLighting>.5) discard;
    o=uClear>0?vec4(0):vec4(encode(pageAt(ip)),1);
    return;
  }
  if(!rowsFor(id)) discard;
  vec2 wp=vec2(gl_FragCoord.x,uWin.y-gl_FragCoord.y);
  vUv=((wp+uScroll.xy)/uScroll.z-gIns.xy)/gIns.z/uCss;
  ${bi[e]}
#else
  // What of this canvas is another's, one standing over it, is that one's draw.
  if(abs(id-uNow.w)>.5) discard;
  vec2 wp=vec2(gl_FragCoord.x,uWin.y-gl_FragCoord.y);
  vUv=((wp+uScroll.xy)/uScroll.z-gIns.xy)/gIns.z/uCss;
  ${bi[e]}
#endif
}`;return e===`hold`&&(a=a.split(`gl_FragCoord`).join(`(gl_FragCoord+vec4(uFc,0.,0.))`).replace(`uniform vec3 uScroll,uPage;`,`uniform vec2 uFc;uniform vec3 uScroll,uPage;`)),e===`emit`&&(a=a.replace(`uniform vec3 uScroll,uPage;`,`uniform sampler2D tHold0,tHold1,tHold2;uniform vec2 uFc;uniform vec3 uScroll,uPage;`)),r&&(a=a.split(`gl_FragCoord`).join(`gFc`).replace(`vec2 vUv;`,`vec2 vUv;vec4 gFc;uniform vec2 uSparseAt;`).replace(`void main(){`,`void main(){gFc=vec4(floor(gl_FragCoord.xy)*2.+uSparseAt+.5,gl_FragCoord.zw);`)),a}var Si=class{constructor(e,t,n={}){let r=fr?pr.webgpuContext(e,fr,{alpha:!!n.clear}):e.getContext(`webgl2`,{antialias:!1,alpha:!!n.clear,powerPreference:n.power??`default`});if(!r)throw Error(`no webgl2`);Er(r);for(let e of[`EXT_color_buffer_float`,`EXT_float_blend`,`OES_texture_float_linear`])if(!r.getExtension(e))throw Error(`no `+e);this.gl=r,this.canvas=e,this.o=n,this.timer=r.getExtension(`EXT_disjoint_timer_query_webgl2`),this.queries=[],this.gpuMs=0,this.frame=0,this.stats={};let i=performance.now();this.vao=r.createVertexArray(),this.rooms=new it(r);let a=(t.page.match(/[\d.]+/g)??[236,235,230]).slice(0,3).map(e=>(e/255)**2.2);this.page=a,this.gridCell=t.cell,this.kinds=Array(kr),this.spare=0,this.layers=kr,this.lightings=[],this.lists=new Map,this.pictureBytes=0,this.fieldBytes=0,n.cpuFields||(this.gpuFields=new lr(r,n.fields??{}),this.fieldKeys=[],this.stats.fields=this.gpuFields.stats);let o=zr.replace(`/*COMMAND*/`,tn(r).glsl);this.cmd=K(r,n.lite?o.replace(`Surface S=surface(p,w,z,max(-d,0.),aa,aa);`,`Surface S=Surface(uColor,uEmit,uRough,uMetal,uCoat,0.,0.,uSheen,z,0.,0.,0.);`):o,{},Ir),this.pre=K(r,Vr,{},Ir),this.edgeProgram=()=>this.edge??=K(r,Br.replace(`/*COMMAND*/`,tn(r).glsl),{},Ir),this.bg=K(r,Ur,{},Hr),this.copy=K(r,Jr),this.maxdown=K(r,hn),this.nearp=K(r,Xr),this.conP=K(r,Gr(),{},Wr()),this.weaP=K(r,qr(),{},Kr()),this.shadow=K(r,yi,{},Hr),this.place=K(r,Yr),this.lightPs=new Map,this.lightWants=new Map,this.lightStamp=0,this.lightAll=n.lightAll??(gr===`all`||gr===`draw`),this.lightComputes=this.lightAll&&!!r.computes&&gr!==`draw`,this.parallel=r.getExtension(`KHR_parallel_shader_compile`);for(let e of[`lit`,`hold`,`emit`])this.lightP(e,0,!0),this.lightP(e,0);this.lightAll&&this.lightP(`lit`,0,`all`),this.resolve=K(r,Zr),this.out=K(r,Qr),this.bent=K(r,$r),this.rowsN=kr,this.order=Array.from({length:kr},(e,t)=>t),this.devRows=new Float32Array(256*X*4),this.tDev=this.tex(X,256,this.devRows),this.closeAt={items:[],n:0},this.closeMapW=3,this.closeMap=this.tex(this.closeMapW,Dr,null),this.closeTex=this.tex(1,1,null,r.R16F),this.live=[],this.touched=[],this.pointer={x:0,y:0,in:!1},this.instances=[],this.s0=1,this.bakeB=n.bake===0?1/0:n.bake??1,this.shelf={x:0,y:0,tall:0},this.coming=[],this.joining=null,this.fence=null,this.plan(Object.keys(t.kinds??{}),n.many??500),this.stats.compileMs=this.stats.loadMs=0,this.add(Object.values(t.kinds??{})),r.finish(),this.stats.loadMs=performance.now()-i}add(e){this.coming.push(...e)}arrive(){let e=this.gl,t=performance.now()+Ar;if(this.fence){if(!ur(e,this.fence))return!1;this.fence=null}do{if(!this.joining){let e=this.coming.shift();if(!e)return!1;if(this.lists.has(e.kind))continue;this.joining=this.join([e])}let{value:e,done:t}=this.joining.next();if(t)return this.joining=null,!0;if(e)return this.fence=e,!1}while(performance.now()<t);return!1}*join(e){let t=this.gl,n=this.o,r=performance.now(),i=e.filter(e=>!this.lists.has(e.kind)).map(e=>[e,...e.plates??[]]);if(!i.length)return;let a=Math.max(...i.map(e=>e.length));if(a>kr)throw Error(`${a} plates on one device: the most is ${kr}`);let o=[];for(let e=0;e<a;e++)for(let t of i)t[e]&&o.push(Object.assign(t[e],{layer:e}));let s=o.map(e=>({commands:e.commands,device:e.device,cw:e.cw,ch:e.ch})),c=()=>new Qt(t),l=null,u=this.kinds.length;if(!n.cpuFields){let e=new Map,t=s.map(t=>{let n=new Map;for(let r of ln(t).values()){let t=r.shape.mask,i=t?`${r.key}|${t.w}x${t.h}|${t.r}`:r.key;e.has(i)||e.set(i,{key:i,shape:r.shape}),n.set(r.key,i)}return n});l=yield*this.gpuFields.paced([...e.values()],{paced:!0}),this.fieldBytes+=l.bytes,t.forEach((e,t)=>{this.fieldKeys[u+t]=e});let n=0;c=()=>{let e=t[n++];return{texture:l.texture,bytes:0,place:()=>new Map([...e].map(([e,t])=>[e,l.placed.get(t)]))}}}for(let[e,r]of o.entries()){let i=s[e],a=this.pictures(r.mask?.img,r.mask?.r,r.commands.filter(e=>e.op===`screen`&&e.pixels?.img).map(e=>({c:e,img:e.pixels.img,w:e.pixels.w,h:e.pixels.h})));this.pictureBytes+=a.pictureBytes;let o=un(t,i,{fields:c(),fieldMost:n.fieldMost??8,fieldBudget:n.fieldBudget??1024}),u=r.light,d=JSON.stringify([u.lighting,u.tilt]),f=this.lightings.findIndex(e=>e.key===d);f<0&&(f=this.lightings.push({key:d,lighting:u.lighting,tilt:u.tilt,...this.rooms.for(structuredClone(u.lighting),u.tilt)})-1);let p=t.createTexture();t.bindTexture(t.TEXTURE_2D,p),t.texStorage2D(t.TEXTURE_2D,1,t.RGBA32F,Math.max(o.n,1),1),o.n&&t.texSubImage2D(t.TEXTURE_2D,0,0,0,o.n,1,t.RGBA,t.FLOAT,new Float32Array(o.boxes.flat())),dn(t),this.kinds.push({name:r.kind,k:r,c:o,box:p,lighting:f,prog:null,layer:r.layer,rise:0,atlas:l,...a}),yield}for(let e of i){let t=e.map(e=>u+o.indexOf(e));this.lists.set(e[0].kind,t),t.forEach((e,n)=>{let r=this.kinds[e],{k:i}=r,a=i.at.x+(i.device.x+i.device.w/2)*i.at.s,o=i.at.y+(i.device.y+i.device.h/2)*i.at.s;for(let e of t.slice(0,n)){let t=this.kinds[e],n=(a-t.k.at.x)/t.k.at.s,i=(o-t.k.at.y)/t.k.at.s;t.k.hidden||t.c.cmds.forEach((e,a)=>{let o=t.c.boxes[a];e.op===`surface`&&!e.follow&&n>=o[0]&&i>=o[1]&&n<=o[2]&&i<=o[3]&&(r.rise=Math.max(r.rise,t.rise+vt(e)))})}});let n=Math.max(...t.map(e=>this.kinds[e].c.peak+this.kinds[e].rise));for(let e of t)this.kinds[e].tall=n}this.stats.compileMs+=performance.now()-r,this.rowsN=this.kinds.length;let d=e=>e<kr?e:this.kinds[e].layer;this.order=Array.from({length:this.rowsN},(e,t)=>t).sort((e,t)=>d(e)-d(t)),this.roomForRows();let f=o.map((e,t)=>u+t),p=this.devRows;for(let e of f){let{k:t,c:n,lighting:r,layer:i,rise:a,tall:o}=this.kinds[e],s=t.light.uniforms,c=(t,n)=>p.set(n,(e*X+t)*4),l=this.above(t.kind,i);c(0,[t.cw,t.ch,r,o]),c(1,[s.uKey[0],s.uKey[1],s.uKey[2]+a,s.uLift??0]),c(2,[s.uCam[0],s.uCam[1],s.uCam[2]+a,s.uLamp]),c(3,s.uBody),c(4,s.uFrame??[0,0,t.cw,t.ch]),c(5,[...s.uRoomColor,s.uLampSoft]),c(6,[...s.uSky??[0,0,1],s.uLampHead]),c(7,[s.uFill,s.uRoom,s.uPageShade,0]),c(8,l?this.cellIn(t.at):n.extent),c(10,[i,l,a,n.peak+a]),pi(p,e*X*4,s,a),c(li,[n.panes.length/18,+!!n.glows,0,0]),c(li+1,fi(n.panes,a))}this.uploadRows(f),this.tInst||this.placeAll([]),n.bake!==0&&(yield*this.bake(f)),this.placeAll(i.map(e=>e[0].kind))}roomForRows(){if(this.rowsN*X*4<=this.devRows.length)return;let e=new Float32Array(this.devRows.length*2);e.set(this.devRows),this.devRows=e,this.gl.deleteTexture(this.tDev),this.tDev=this.tex(X,e.length/X/4,e)}uploadRows(e){let t=this.gl,n=this.shapeRows??=new Map;for(let t of e){let e=di.flatMap(e=>[...this.devRows.subarray((t*X+e)*4,(t*X+e)*4+4)]),r=n.get(t);if(!r||e.some((e,t)=>e!==r[t])){n.set(t,e);for(let e of this.instances)e&&!e.hidden&&e.kind===t&&this.changed(e,[{x:0,y:0,w:this.kinds[t]?.k.cw??0,h:this.kinds[t]?.k.ch??0}],this.kinds[t]?.tall??0)}}t.bindTexture(t.TEXTURE_2D,this.tDev);for(let n of e)t.texSubImage2D(t.TEXTURE_2D,0,0,n,X,1,t.RGBA,t.FLOAT,this.devRows,n*X*4)}above(e,t){return this.lists.get(e).length-1-t}cellIn(e){let t=this.gridCell;return[-e.x/e.s,-e.y/e.s,(t-e.x)/e.s,(t-e.y)/e.s]}tex(e,t,n,r=this.gl.RGBA32F){let i=this.gl,a=i.createTexture();return i.bindTexture(i.TEXTURE_2D,a),i.texStorage2D(i.TEXTURE_2D,1,r,e,t),n&&i.texSubImage2D(i.TEXTURE_2D,0,0,0,e,t,r===i.R32F?i.RED:i.RGBA,i.FLOAT,n),dn(i),a}plan(e,t){let n=this.cell=this.gridCell,r=innerWidth,i=innerHeight,a=this.cols=Math.max(Math.round(Math.sqrt(t*r/i)),4),o=this.rows=Math.ceil(t/a),s=7,c=()=>((s=s*16807%2147483647)-1)/2147483646,l=[];for(;e.length&&l.length<a*o;){let t=e.map((e,t)=>t);for(let e=t.length-1;e>0;e--){let n=Math.floor(c()*(e+1));[t[e],t[n]]=[t[n],t[e]]}l.push(...t)}this.cells=l.slice(0,a*o).map(t=>e[t]),this.world={w:a*n,h:o*n}}placeAll(e){let t=this.cell,n=this.cols,r=new Set(e),i=this.gl;this.reshaped=!0;for(let t of e)this.cells.includes(t)||this.cells.push(t);this.world.h=Math.max(this.world.h,Math.ceil(this.cells.length/n)*t),this.cells.forEach((e,i)=>{if(!r.has(e))return;let a=i%n,o=Math.floor(i/n),s=this.instances.length,c=this.lists.get(e);c.forEach((e,n)=>{let{at:r,hidden:i}=this.kinds[e].k;this.instances.push({kind:e,layer:n,hidden:i,up:n?s:null,plates:n?null:c.map((e,t)=>s+t),x:a*t+r.x,y:o*t+r.y,s:r.s,cell:[a*t,o*t]})})});let a=Math.ceil(this.instances.length/Y)||1,o=new Float32Array(Y*a*4);this.instances.forEach((e,t)=>o.set([e.x,e.y,e.s,e.kind],t*4)),a===this.instRows?(i.bindTexture(i.TEXTURE_2D,this.tInst),i.texSubImage2D(i.TEXTURE_2D,0,0,0,Y,a,i.RGBA,i.FLOAT,o)):(this.tInst&&(i.deleteTexture(this.tInst),i.deleteTexture(this.tVis)),this.tInst=this.tex(Y,a,o),this.tVis=this.tex(Y,a,null,i.R32F),this.instRows=a),this.s0=this.instances.map(e=>e.s).sort((e,t)=>e-t)[this.instances.length>>1]}targets(e,t,n){let r=this.gl,i=[e+2*n,t+2*n],a=`${e}x${t}`,o=this.sets??=new Map,s=o.get(a);if(s&&s.size[0]===i[0]&&s.size[1]===i[1])return s.usedAt=performance.now(),s;s&&(this.free(s),o.delete(a)),r.getError(),s={win:[e,t],size:i,usedAt:performance.now()};let c=()=>r.createFramebuffer();s.cond=this.linear(q(r,i[0],i[1],r.RGBA8)),s.fCond=c(),r.bindFramebuffer(r.FRAMEBUFFER,s.fCond),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,s.cond,0),s.g0=this.linear(q(r,i[0],i[1],r.R32F)),s.ga=this.array(i[0],i[1],Nr,1,r.LINEAR),s.fboG=c(),r.bindFramebuffer(r.FRAMEBUFFER,s.fboG),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,s.g0,0);for(let e=0;e<Nr;e++)r.framebufferTextureLayer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT1+e,s.ga,0,e);s.depth=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,s.depth),r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_COMPONENT32F,i[0],i[1]),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,s.depth),s.pyrSize=i.map(e=>2**Math.ceil(Math.log2(e))),s.levels=Math.log2(Math.max(...s.pyrSize))+1,s.pyr=q(r,s.pyrSize[0],s.pyrSize[1],r.R32F,s.levels);let l=Math.ceil(i[0]/2),u=Math.ceil(i[1]/2),d=Math.floor(Math.log2(Math.max(l,u)))+1;if(s.pyrs=this.array(l,u,2,d,r.LINEAR_MIPMAP_LINEAR,r.RGBA32F),s.pyrsSize=[l,u],s.fPyrs=c(),r.bindFramebuffer(r.FRAMEBUFFER,s.fPyrs),r.framebufferTextureLayer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,s.pyrs,0,0),r.framebufferTextureLayer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT1,s.pyrs,0,1),s.shade=this.linear(q(r,Math.ceil(e/2),Math.ceil(t/2),r.RGBA16F)),s.shade2=this.linear(q(r,Math.ceil(e/2),Math.ceil(t/2),r.RGBA16F)),s.fShade=c(),r.bindFramebuffer(r.FRAMEBUFFER,s.fShade),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,s.shade,0),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT1,r.TEXTURE_2D,s.shade2,0),s.lit=this.linear(q(r,e,t,r.RGBA16F)),this.lightComputes&&r.storable(s.lit),s.fLit=c(),r.bindFramebuffer(r.FRAMEBUFFER,s.fLit),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,s.lit,0),s.f1=c(),s.all=[s.cond,s.g0,s.ga,s.pyr,s.pyrs,s.shade,s.shade2,s.lit],s.fbos=[s.fCond,s.fboG,s.f1,s.fLit,s.fPyrs,s.fShade],s.bytes=i[0]*i[1]*56+i[0]*i[1]*4+s.pyrSize[0]*s.pyrSize[1]*4*4/3+l*u*2*16*4/3+e*t/4*16+e*t*8,r.getError()===r.OUT_OF_MEMORY){if(this.free(s),!o.size)throw Error(`no room for targets of ${i[0]}x${i[1]}`);for(let[e,t]of o)this.free(t),o.delete(e);return this.bytes=0,this.targets(e,t,n)}return o.set(a,s),this.bytes=[...o.values()].reduce((e,t)=>e+t.bytes,0),s}free(e){let t=this.gl;for(let n of e.all)t.deleteTexture(n);for(let n of e.fbos)t.deleteFramebuffer(n);t.deleteRenderbuffer(e.depth)}array(e,t,n,r,i,a=this.gl.RGBA16F){let o=this.gl,s=o.createTexture();o.activeTexture(o.TEXTURE31),o.bindTexture(o.TEXTURE_2D_ARRAY,s),o.texStorage3D(o.TEXTURE_2D_ARRAY,r,a,e,t,n),o.texParameteri(o.TEXTURE_2D_ARRAY,o.TEXTURE_MIN_FILTER,i),o.texParameteri(o.TEXTURE_2D_ARRAY,o.TEXTURE_MAG_FILTER,o.LINEAR);for(let e of[o.TEXTURE_WRAP_S,o.TEXTURE_WRAP_T])o.texParameteri(o.TEXTURE_2D_ARRAY,e,o.CLAMP_TO_EDGE);return s}backOf(e){let t=this.gl;e.back=this.array(e.size[0],e.size[1],3,6,t.LINEAR_MIPMAP_LINEAR),e.fBack??=t.createFramebuffer(),e.fBackR??=t.createFramebuffer(),e.all.push(e.back),e.fbos.push(e.fBack,e.fBackR),e.bytes+=e.size[0]*e.size[1]*32}underLevels(e,t){return e>0?Math.min(Math.ceil(Math.max(Math.min(Math.log2(e*.7),Math.log2(e*t)),0)),5):0}levelOf(e){return e.level||(e.level=this.array(e.size[0],e.size[1],2,9,this.gl.LINEAR_MIPMAP_LINEAR),e.fBack??=this.gl.createFramebuffer(),e.fBackR??=this.gl.createFramebuffer(),e.all.push(e.level),e.fbos.push(e.fBack,e.fBackR)),e.level}copyDown(e,t,n,r,i){let a=this.gl,o=a.READ_FRAMEBUFFER,s=a.DRAW_FRAMEBUFFER,c=a.isEnabled(a.SCISSOR_TEST);a.disable(a.BLEND),a.disable(a.SCISSOR_TEST),a.bindFramebuffer(s,t.fBack),a.drawBuffers([a.COLOR_ATTACHMENT0]),n.forEach((n,c)=>{a.bindFramebuffer(o,t.fboG),a.readBuffer(a.COLOR_ATTACHMENT0+n),a.framebufferTextureLayer(s,a.COLOR_ATTACHMENT0,e,0,c);for(let[e,t,n,i]of r)a.blitFramebuffer(e,t,n,i,e,t,n,i,a.COLOR_BUFFER_BIT,a.NEAREST);a.bindFramebuffer(o,t.fBackR),a.readBuffer(a.COLOR_ATTACHMENT0);for(let t=1;t<=i;t++){a.framebufferTextureLayer(o,a.COLOR_ATTACHMENT0,e,t-1,c),a.framebufferTextureLayer(s,a.COLOR_ATTACHMENT0,e,t,c);let n=2**t;for(let[e,t,i,o]of r){let r=Math.floor(e/n),s=Math.floor(t/n),c=Math.ceil(i/n),l=Math.ceil(o/n);a.blitFramebuffer(r*2,s*2,c*2,l*2,r,s,c,l,a.COLOR_BUFFER_BIT,a.LINEAR)}}}),a.bindFramebuffer(a.FRAMEBUFFER,t.fboG),a.readBuffer(a.COLOR_ATTACHMENT0),a.drawBuffers(Array.from({length:7},(e,t)=>a.COLOR_ATTACHMENT0+t)),a.enable(a.BLEND),c&&a.enable(a.SCISSOR_TEST)}bindA(e,t,n){let r=this.gl;r.activeTexture(r.TEXTURE0+t),r.bindTexture(r.TEXTURE_2D_ARRAY,n),r.uniform1i(e,t)}linear(e){let t=this.gl;return t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),e}pictures(e,t,n,r,i=e?[e.width,e.height]:null){let a=this.gl,o=()=>(this.black||(this.black=a.createTexture(),a.bindTexture(a.TEXTURE_2D,this.black),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,1,1,0,a.RGBA,a.UNSIGNED_BYTE,new Uint8Array(4)),dn(a)),this.black),s=e=>{a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,e?a.LINEAR_MIPMAP_LINEAR:a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);for(let e of[a.TEXTURE_WRAP_S,a.TEXTURE_WRAP_T])a.texParameteri(a.TEXTURE_2D,e,a.CLAMP_TO_EDGE)},c=null,l=null,u=0;if(e instanceof WebGLTexture?c=e:e&&(c=a.createTexture(),a.bindTexture(a.TEXTURE_2D,c),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.texImage2D(a.TEXTURE_2D,0,a.R8,i[0],i[1],0,a.RED,a.UNSIGNED_BYTE,e),a.generateMipmap(a.TEXTURE_2D),s(!0),u+=i[0]*i[1]*4/3),n.length){let e=n.reduce((e,t)=>e+t.w+1,-1),t=Math.max(...n.map(e=>e.h));r?.screens?.length===n.length&&r.screens.every((e,t)=>e.w===n[t].w&&e.h===n[t].h)?(l=r.scr,a.bindTexture(a.TEXTURE_2D,l)):(l=a.createTexture(),a.bindTexture(a.TEXTURE_2D,l),a.texStorage2D(a.TEXTURE_2D,1,a.SRGB8_ALPHA8,e,t));let i=0;for(let r of n)r.x=i,a.texSubImage2D(a.TEXTURE_2D,0,i,0,a.RGBA,a.UNSIGNED_BYTE,r.img),Object.defineProperty(r.c,"at",{value:[i/e,0,r.w/e,r.h/t],enumerable:!1,writable:!0,configurable:!0}),i+=r.w+1;s(!1),u+=e*t*4}return{mask:c??o(),maskR:t??1,scr:l??o(),screens:n,pictureBytes:u}}bind(e,t,n){let r=this.gl;r.activeTexture(r.TEXTURE0+t),r.bindTexture(r.TEXTURE_2D,n),r.uniform1i(e,t)}lightP(e,t,n=!1){let r=!!this.sparseNow&&e===`lit`&&n!==`all`,i=(n?e+(n===`all`?`all`:`page`):e+t)+(r?`sparse`:``),a=this.lightPs.get(i);return n||!t?(a||this.lightPs.set(i,a=K(this.gl,xi(e,t,n,r),{},n?fn:vi)),a):a?.warm?a:(!a&&!this.lightWants.has(i)&&(this.lightWants.set(i,[e,t,r]),this.lightWants.size===1&&this.lightIdle()),this.lightP(e,0))}lightIdle(){(globalThis.requestIdleCallback??(e=>setTimeout(e,50)))(()=>{if(this.gl.isContextLost()||!this.lightWants.size)return;let[e,[t,n,r]]=this.lightWants.entries().next().value;this.lightWants.delete(e),this.lightPs.set(e,K(this.gl,xi(t,n,!1,r),{},vi)),this.lightWants.size&&this.lightIdle()})}render(e,t,n,r,i,a,o=a,s=!1){let c=this.gl,l=performance.now(),u=0,d=0,f=(e-r/2)/n,p=(t-i/2)/n,m=this.cell;if(!this.o.clear)for(let e of this.instances)e.cell[0]+m>f&&e.cell[0]<f+2*r/n&&e.cell[1]+m>p&&e.cell[1]<p+2*i/n&&(u=Math.max(u,this.kinds[e.kind].tall*e.s),d=Math.max(d,this.kinds[e.kind].tall));let h=this.o.clear||this.path===`seats`?0:Math.min(Math.ceil(u/.6/Lt*n),Math.ceil(Math.max(r,i)/4)),g=this.targets(r,i,32*Math.ceil(h/32)),_=(g.size[0]-r)/2,[v,y]=g.size,b=this.shadeDiv??2,x=this.shadeAt??[0,0],S=this.path??`grid`,C=(this.drawnBy??={})[S];(g!==C?.T||b!==C?.D||g.by!==S)&&(a=o=null,s=!1),g.by=S,s||(this.shadeHeld=x),this.drawnBy[S]={T:g,D:b},this.drawnBox=a;let w=(e,t,n,r)=>{if(!e)return void c.disable(c.SCISSOR_TEST);c.enable(c.SCISSOR_TEST);let a=Math.floor((e[0]+n)/t)-r,o=Math.floor((i-e[3]+n)/t)-r;c.scissor(a,o,Math.ceil((e[2]+n)/t)+r-a,Math.ceil((i-e[1]+n)/t)+r-o)};this.measure();let T=[],E=!1,D=e=>this.o.skip?.has(e)||this.o.only&&!this.o.only.has(e)||o===!1&&(e===`gbuffer`||e===`commands`||e===`pyramid`||e===`near`),O=e=>{if(!this.timer)return;E&&c.endQuery(this.timer.TIME_ELAPSED_EXT);let t=c.createQuery();c.beginQuery(this.timer.TIME_ELAPSED_EXT,t),T.push([e,t]),E=!0};O(`gbuffer`);let k=(e+(a?a[0]:-_))/n,A=(t+(a?a[1]:-_))/n,j=(e+(a?a[2]:r+_))/n,M=(t+(a?a[3]:i+_))/n,N=this.cell,P=Array.from({length:this.rowsN},()=>[]),F=S===`stage`;this.instances.forEach((e,t)=>{!e.hidden&&!!e.staged===F&&e.cell[0]<j&&e.cell[0]+(e.cw??N)>k&&e.cell[1]<M&&e.cell[1]+(e.ch??N)>A&&P[e.kind].push(t)});let I=this.order.flatMap(e=>P[e]),L=new Float32Array(I);c.bindTexture(c.TEXTURE_2D,this.tVis);for(let e=0;e*Y<I.length;e++)c.texSubImage2D(c.TEXTURE_2D,0,0,e,Math.min(Y,I.length-e*Y),1,c.RED,c.FLOAT,L.subarray(e*Y,(e+1)*Y));if(c.bindFramebuffer(c.FRAMEBUFFER,g.fboG),c.drawBuffers(Array.from({length:7},(e,t)=>c.COLOR_ATTACHMENT0+t)),c.viewport(0,0,v,y),w(o,1,_,0),c.disable(c.DEPTH_TEST),!D(`gbuffer`))for(let e=0;e<=Nr;e++)c.clearBufferfv(c.COLOR,e,[0,0,0,0]);c.enable(c.BLEND),c.blendFunc(c.ONE,c.ONE_MINUS_SRC_ALPHA),c.bindVertexArray(this.vao);let R=this.bg.u;c.useProgram(this.bg.p),this.bind(R.tInst,0,this.tInst),this.bind(R.tVis,1,this.tVis),this.bind(R.tDev,2,this.tDev),c.uniform3f(R.uScroll,e,t,n),c.uniform2f(R.uTo,v,y),c.uniform1f(R.uToM,_),D(`gbuffer`)||(c.enable(c.DEPTH_TEST),c.depthFunc(c.LEQUAL),c.clearBufferfv(c.DEPTH,0,[1]),c.drawArraysInstanced(c.TRIANGLE_STRIP,0,4,I.length),c.depthFunc(c.LESS),c.disable(c.DEPTH_TEST));let ee=0,z=r=>{this.bind(r.tInst,0,this.tInst),this.bind(r.tVis,1,this.tVis),c.uniform3f(r.uScroll,e,t,n),c.uniform2f(r.uG,v,y),c.uniform1f(r.uMargin,_),this.bind(r.tClose,6,this.closeTex),this.bind(r.tCloseMap,7,this.closeMap),c.uniform1i(r.uCloseN,this.closeAt.n),this.closeAt.n&&c.uniform1fv(r[`uClose[0]`],this.closeAt.inst),c.uniform1f(r.uLayers,this.layers)},te=(e,t,n)=>{c.uniform1f(e.uLayer,t.layer),c.uniform1f(e.uRise,t.rise),this.bind(e.tBox,2,t.box),this.bind(e.tCmd,3,t.c.tex),this.bind(e.tField,4,t.c.fields.texture),e.tBlk&&this.bind(e.tBlk,5,t.c.blk),e.tMask&&(this.bind(e.tMask,8,t.mask),this.bind(e.tScr,9,t.scr),c.uniform2f(e.uCss,t.k.cw,t.k.ch),c.uniform1f(e.uMaskR,t.maskR)),c.uniform1i(e.uN,t.c.n),c.uniform1i(e.uVis0,n),c.uniform2f(e.uBoxTo,t.k.cw,t.k.ch)},B=(e,t,n,r)=>{c.uniform1i(e.uC0,n),c.uniform1i(e.uNs,r-n),c.drawArraysInstanced(c.TRIANGLE_STRIP,0,4,(r-n)*t)},ne=e=>{let t=e.u;c.useProgram(e.p),z(t);let n=0;this.order.forEach(e=>{let r=P[e].length,i=this.kinds[e];r&&i.c.n&&(te(t,i,n),B(t,r,0,i.c.plain??i.c.n)),n+=r})},V=r=>{let i=r.u,a=()=>this.edgeProgram(),o=[],s=[],l=0,u=0;for(let i of this.order){let a=P[i].length,c=this.kinds[i];if(a&&c.c.n){let d=r=>P[i].map(i=>{let a=this.instances[i],o=a.s*n,s=a.x*n-e+_,c=a.y*n-t+_;return[Math.max(Math.floor(s+r[0]*o),0),Math.max(Math.floor(y-c-r[3]*o),0),Math.min(Math.ceil(s+r[2]*o),v),Math.min(Math.ceil(y-c-r[1]*o),y),o]}).filter(e=>e[2]>e[0]&&e[3]>e[1]),f=e=>e.length>8?[e.reduce((e,t)=>[Math.min(e[0],t[0]),Math.min(e[1],t[1]),Math.max(e[2],t[2]),Math.max(e[3],t[3])])]:e,p=e=>Math.max(.001,...e.map(e=>e[4])),m=[...(c.c.splits??[]).map(e=>({at:e})),...c.c.levels??[],...c.c.sections??[]].sort((e,t)=>e.at-t.at),h=[[]],g=[],b=0,x=c.c.extent;for(let e of m){if(e.at>b&&h.at(-1).push([r,b,e.at]),e.to){h.at(-1).push([null,e.at,e.to]),b=e.to;continue}let t=e.boxes??[c.c.frostBox],n=t.flatMap(d);for(let e of t)x=[Math.min(x[0],e[0]),Math.min(x[1],e[1]),Math.max(x[2],e[2]),Math.max(x[3],e[3])];g.push(e.boxes?{level:f(n),levels:Math.min(Math.ceil(Math.log2(Math.max(e.half*2*p(n),1))),Pr)}:{under:f(n),blur:c.c.blur,scale:p(n)}),h.push([]),b=e.at}h.at(-1).push([r,b,c.c.plain??c.c.n]);let S=d(x).map(([e,t,n,r])=>[e-1,t-1,n+1,r+1]),C=0;for(let[e,t]of s)t>C&&S.some(t=>t[0]<e[2]&&e[0]<t[2]&&t[1]<e[3]&&e[1]<t[3])&&(C=t);let w=C+g.length;if(w>0)for(let e of S)s.push([e,w]);u=Math.max(u,w),o.push({i,k:c,n:a,at:l,runs:h,copies:g,first:C})}l+=a}for(let e=0;e<=u;e++){c.useProgram(r.p),z(i);for(let t of o){let n=t.runs[e-t.first];if(!n)continue;let{k:o,n:s}=t;te(i,o,t.at),o.c.splits?.length&&!g.back&&this.backOf(g),this.bindA(i.tBack,10,o.c.splits?.length?g.back:this.noBack??=this.array(1,1,3,1,c.LINEAR)),this.bindA(i.tLevel,11,o.c.levels?.length?this.levelOf(g):this.noLevel??=this.array(1,1,2,1,c.LINEAR));for(let[e,l,u]of n){if(e){B(i,s,l,u);continue}let n=a();c.useProgram(n.p),z(n.u),te(n.u,o,t.at),this.bind(n.u.tRows,12,o.c.rowsTex),B(n.u,s,l,u),c.useProgram(r.p)}e===t.first&&(ee+=o.c.n*s)}if(e===u)break;let t=[],n=[],s=0,l=0;for(let r of o){let i=r.copies[e-r.first];i&&(i.level?(t.push(...i.level),s=Math.max(s,i.levels)):(n.push(...i.under),l=Math.max(l,this.underLevels(i.blur,i.scale))))}t.length&&this.copyDown(this.levelOf(g),g,[0,6],t,s),n.length&&(g.back||this.backOf(g),this.copyDown(g.back,g,[1,2,4],n,l))}this.stats.waves=u};if(!D(`gbuffer`)&&!D(`commands`)){if(c.enable(c.DEPTH_TEST),c.clearBufferfv(c.DEPTH,0,[1]),this.o.skip?.has(`pre`)||(c.disable(c.BLEND),c.colorMask(!1,!1,!1,!1),c.depthMask(!0),c.depthFunc(c.LESS),ne(this.pre),c.colorMask(!0,!0,!0,!0),c.enable(c.BLEND)),c.depthMask(!1),c.depthFunc(c.LEQUAL),V(this.cmd),c.depthMask(!0),this.order.some(e=>P[e].length&&this.kinds[e].c.n>(this.kinds[e].c.plain??this.kinds[e].c.n))){let e=this.edgeProgram();g.own||(g.own=q(c,v,y,c.R32F),g.fOwn=c.createFramebuffer(),c.bindFramebuffer(c.FRAMEBUFFER,g.fOwn),c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_2D,g.own,0),g.all.push(g.own),g.fbos.push(g.fOwn),c.bindFramebuffer(c.FRAMEBUFFER,g.fboG)),c.bindFramebuffer(c.READ_FRAMEBUFFER,g.fboG),c.readBuffer(c.COLOR_ATTACHMENT0),c.bindFramebuffer(c.DRAW_FRAMEBUFFER,g.fOwn),c.blitFramebuffer(0,0,v,y,0,0,v,y,c.COLOR_BUFFER_BIT,c.NEAREST),c.bindFramebuffer(c.FRAMEBUFFER,g.fboG),c.disable(c.BLEND),c.depthFunc(c.LESS),c.clearBufferfv(c.DEPTH,0,[1]),c.useProgram(e.p),z(e.u),this.bind(e.u.tOwn,13,g.own);let t=0;this.order.forEach(n=>{let r=P[n].length,i=this.kinds[n];r&&i.c.n>(i.c.plain??i.c.n)&&(te(e.u,i,t),B(e.u,r,i.c.plain,i.c.n)),t+=r})}c.disable(c.DEPTH_TEST)}if(c.disable(c.BLEND),O(`pyramid`),!D(`pyramid`)){c.bindFramebuffer(c.FRAMEBUFFER,g.f1),c.drawBuffers([c.COLOR_ATTACHMENT0]),c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_2D,g.pyr,0),c.clearBufferfv(c.COLOR,0,[0,0,0,0]),c.viewport(0,0,v,y),c.useProgram(this.copy.p),this.bind(this.copy.u.tG,0,g.g0),c.drawArrays(c.TRIANGLES,0,3),c.useProgram(this.maxdown.p),c.bindTexture(c.TEXTURE_2D,g.pyr),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.NEAREST_MIPMAP_NEAREST);for(let e=1;e<g.levels;e++)c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_2D,g.pyr,e),c.viewport(0,0,Math.max(1,g.pyrSize[0]>>e),Math.max(1,g.pyrSize[1]>>e)),w(o,2**e,_,1),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_BASE_LEVEL,e-1),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAX_LEVEL,e-1),c.uniform1i(this.maxdown.u.tH,0),c.uniform1i(this.maxdown.u.uLod,0),c.drawArrays(c.TRIANGLES,0,3);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_BASE_LEVEL,0),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAX_LEVEL,g.levels-1)}if(O(`near`),D(`near`)||(c.bindFramebuffer(c.FRAMEBUFFER,g.fPyrs),c.drawBuffers([c.COLOR_ATTACHMENT0,c.COLOR_ATTACHMENT1]),c.viewport(0,0,...g.pyrsSize),w(o,2,_,1),c.useProgram(this.nearp.p),this.bindA(this.nearp.u.tGa,0,g.ga),this.bind(this.nearp.u.tG0,1,g.g0),c.drawArrays(c.TRIANGLES,0,3),c.activeTexture(c.TEXTURE0),c.bindTexture(c.TEXTURE_2D_ARRAY,g.pyrs),c.generateMipmap(c.TEXTURE_2D_ARRAY)),!D(`near`)){c.bindFramebuffer(c.FRAMEBUFFER,g.fCond),c.drawBuffers([c.COLOR_ATTACHMENT0]),c.viewport(0,0,v,y),w(o,1,_,0),c.clearBufferfv(c.COLOR,0,[0,0,0,.5]),R=this.conP.u,c.useProgram(this.conP.p),this.bind(R.tInst,0,this.tInst),this.bind(R.tVis,1,this.tVis),this.bind(R.tDev,2,this.tDev),c.uniform3f(R.uScroll,e,t,n),c.uniform2f(R.uTo,v,y),c.uniform1f(R.uToM,_),c.drawArraysInstanced(c.TRIANGLE_STRIP,0,4,I.length),g.dirty=!1;for(let e=0;e<this.rowsN&&!g.dirty;e++)g.dirty=this.devRows[(e*X+ci+1)*4+2]>0;g.dirty&&(g.dirt||(g.dirt=this.linear(q(c,v,y,c.RGBA8)),g.all.push(g.dirt),g.fDirt=c.createFramebuffer(),g.fbos.push(g.fDirt),c.bindFramebuffer(c.FRAMEBUFFER,g.fDirt),c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_2D,g.dirt,0)),c.bindFramebuffer(c.FRAMEBUFFER,g.fDirt),c.drawBuffers([c.COLOR_ATTACHMENT0]),c.clearBufferfv(c.COLOR,0,[0,0,0,0]),R=this.weaP.u,c.useProgram(this.weaP.p),this.bind(R.tInst,0,this.tInst),this.bind(R.tVis,1,this.tVis),this.bind(R.tDev,2,this.tDev),this.bind(R.tG0,3,g.g0),this.bindA(R.tGa,4,g.ga),this.bindA(R.tPyrs,5,g.pyrs),c.uniform3f(R.uScroll,e,t,n),c.uniform2f(R.uTo,v,y),c.uniform1f(R.uToM,_),c.uniform2f(R.uNearK,v/(2*g.pyrsSize[0]),y/(2*g.pyrsSize[1])),c.drawArraysInstanced(c.TRIANGLE_STRIP,0,4,I.length))}if(O(`shadow`),!D(`shadow`)){c.bindFramebuffer(c.FRAMEBUFFER,g.fShade),c.drawBuffers([c.COLOR_ATTACHMENT0,c.COLOR_ATTACHMENT1]),c.viewport(0,0,Math.ceil(r/b),Math.ceil(i/b)),R=this.shadow.u,c.useProgram(this.shadow.p),this.bind(R.tWorld,0,g.pyr),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.NEAREST_MIPMAP_NEAREST),c.uniform1f(R.uPyrTop,g.levels-1),this.bindA(R.tGa,1,g.ga),this.bindA(R.tPyrs,6,g.pyrs),c.uniform1i(R.uClear,+!!this.o.clear),this.bind(R.tInst,2,this.tInst),this.bind(R.tDev,3,this.tDev),this.bind(R.tVis,4,this.tVis),this.bind(R.tBake,5,this.tBake),this.lives(R),c.uniform3f(R.uScroll,e,t,n),c.uniform2f(R.uG,v,y),c.uniform1f(R.uMargin,_),c.uniform2f(R.uTo,r,i),c.uniform1f(R.uToM,0),c.uniform1i(R.uFrame,this.path===`seats`?this.lampStep??0:this.frame%(this.still??ti)),c.uniform1i(R.uShadeDiv,b),c.uniform2i(R.uShadeAt,...x),c.enable(c.BLEND),c.blendFunc(c.DST_COLOR,c.ZERO);let l=(e,t)=>{w(e,b,0,2),c.uniform1i(R.uLampOnly,+!!t),c.colorMask(!0,!t,!t,!0),c.clearBufferfv(c.COLOR,0,[1,1,1,1]),t||c.clearBufferfv(c.COLOR,1,[1,1,1,1]),c.drawArraysInstanced(c.TRIANGLE_STRIP,0,4,this.baking?1:I.length)};s&&o&&l(o,!1),s&&o&&o[0]<=a[0]&&o[1]<=a[1]&&o[2]>=a[2]&&o[3]>=a[3]||l(a,s),c.colorMask(!0,!0,!0,!0),c.disable(c.BLEND)}O(`light`);let re=!!this.sparseNow&&!this.lightTo&&!this.lightAll,ie=this.lightTo,H=ie?.kind??`lit`,ae=ie?.w??(re?2*Math.ceil(r/2):r),oe=ie?.h??(re?2*Math.ceil(i/2):i),[se,ce]=ie?.off??[0,0];if(c.bindFramebuffer(c.FRAMEBUFFER,ie?.fbo??g.fLit),c.drawBuffers(ie?.buffers??[c.COLOR_ATTACHMENT0]),c.viewport(0,0,re?ae/2:ae,re?oe/2:oe),w(ie?.whole?null:a,re?2:1,0,+!!re),ie?.once?.(),!D(`light`)&&this.lightings.length){this.bind(null,0,g.g0),this.bindA(null,1,g.ga),this.bindA(null,2,g.pyrs),this.bind(null,3,g.pyr),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.NEAREST_MIPMAP_NEAREST),this.bind(null,7,g.shade),this.bind(null,9,g.shade2),this.bind(null,10,g.cond),this.bind(null,15,g.dirty?g.dirt:this.noDirt??=this.tex(1,1,new Float32Array(4)));let o={tG0:0,tGa:1,tPyrs:2,tPyr:3,tShadow:7,tBrush:8,tShade2:9,tCond:10,tRoom:13,tDFG:14,tDirt:15},l=++this.lightStamp,u=s?this.shadeHeld??x:x,d=a=>{c.useProgram(a.p);let s=a.u;if(a.stamp===l)return s;a.stamp=l;for(let e in o)c.uniform1i(s[e],o[e]);return c.uniform3f(s.uScroll,e,t,n),c.uniform1f(s.uMargin,_),c.uniform2f(s.uWin,r,i),c.uniform1f(s.uPyrTop,g.levels-1),c.uniform1i(s.uClear,+!!this.o.clear),c.uniform1i(s.uKeepsLight,+(this.path===`stage`)),c.uniform1f(s.uShadeDiv,b),c.uniform2f(s.uShadeAt,...x),c.uniform2f(s.uShadeHeld,...u),c.uniform3f(s.uPage,...this.page),c.uniform1f(s.uS0,this.s0),s.uSparseAt&&c.uniform2f(s.uSparseAt,...this.sparseAt),ie?.begin?.(s),s},f=e=>{let t=this.lightings[e];this.bind(null,13,t.room),c.activeTexture(c.TEXTURE8),c.bindTexture(c.TEXTURE_2D_ARRAY,t.brush)},p=this.devRows,m=new Map(this.live.map(e=>[e.g,e.key])),h=this.o.debug??0,S=[],{NO_PANES:C,GLOWLESS:w,PLAIN:T,NO_TORCH:E,NO_POINTS:D}=hi;for(let r of I){let i=this.instances[r],o=i.kind*X*4,s=i.s*n,c=i.x*n-e,l=i.y*n-t,u=c+p[o]*s,d=l+p[o+1]*s,f=p[o+2]|0;if(!this.lightings[f]||a&&(u<a[0]||c>a[2]||d<a[1]||l>a[3]))continue;let m=o+52,g=o+li*4,_=h||p[m+1]|0,v=s<.75?0:p[m+3]|0,y=(p[g]?0:C)|(p[g+1]<.5?w:0)|(_?0:T)|(p[m+2]>.5?0:E)|(v?0:D);S.push({g:r,d:i,b:o,L:f,lacks:y,debug:_,points:v,dz:s,x0:c,y0:l,x1:u,y1:d})}S.sort((e,t)=>e.lacks-t.lacks||e.L-t.L||e.d.kind-t.d.kind);let O=this.rowAlign??=c.getParameter(c.UNIFORM_BUFFER_OFFSET_ALIGNMENT)/4,k=Math.ceil(X*4/O)*O,A=new Map;for(let e of S)A.has(e.d.kind)||A.set(e.d.kind,(A.size+1)*k);let j=(A.size+1)*k;this.rowStage?.length>=j||(this.rowStage=new Float32Array(Math.max(j,16*k)*2));for(let[e,t]of A)this.rowStage.set(p.subarray(e*X*4,(e+1)*X*4),t);if(c.bindBuffer(c.UNIFORM_BUFFER,this.rowBuffer??=c.createBuffer()),c.bufferData(c.UNIFORM_BUFFER,this.rowStage.subarray(0,j),c.DYNAMIC_DRAW),c.bindBufferRange(c.UNIFORM_BUFFER,0,this.rowBuffer,0,X*16),this.lightAll&&H===`lit`){let e=d(this.lightP(H,0,`all`));this.bind(e.tInst,11,this.tInst),this.bind(e.tDev,12,this.tDev),this.lives(e),c.uniform1i(e.uDebugAll,h);for(let t of new Set([0,...S.map(e=>e.L)]))f(t),c.uniform1f(e.uLighting,t),this.lightComputes&&!ie?c.dispatchRect():c.drawArrays(c.TRIANGLES,0,3);S.length=0}else f(0),d(this.lightP(H,0,!0)),c.drawArrays(c.TRIANGLES,0,3);let M=null,N=null,P=this.pointColors??=new Float32Array(12),F=0,L=-1;for(let e of S){let t=this.lightP(H,e.lacks);t!==M&&(M=t,N=d(M)),e.L!==F&&f(F=e.L),e.d.kind!==L&&(L=e.d.kind,c.bindBufferRange(c.UNIFORM_BUFFER,0,this.rowBuffer,A.get(L)*4,X*16));let n=e.d,r=p[e.b]*e.dz,a=p[e.b+1]*e.dz;c.uniform4f(N.uIns,n.x,n.y,n.s,n.kind),c.uniform4f(N.uNow,e.dz,.5/r,.5/a,e.g+1),c.uniform4f(N.uMap,r/v,-a/y,(e.x0+_)/v,1-(e.y0+_)/y);let o=m.get(e.g);if(c.uniform3f(N.uKeyNow,...o??[p[e.b+4],p[e.b+5],p[e.b+6]]),e.debug&&c.uniform1i(N.uDebugNow,e.debug),e.points){c.uniform1i(N.uPointsNow,e.points),c.uniform4fv(N[`uPoint[0]`],p.subarray(e.b+76,e.b+92));for(let t=0;t<4;t++)P.set(p.subarray(e.b+(23+t)*4,e.b+(23+t)*4+3),3*t);c.uniform3fv(N[`uPointColor[0]`],P)}c.uniform4f(N.uBox,(e.x0-1-se)/ae*2-1,(i-e.y1-1-ce)/oe*2-1,(e.x1+1-se)/ae*2-1,(i-e.y0+1-ce)/oe*2-1),c.drawArrays(c.TRIANGLE_STRIP,0,4)}this.stats.lightDraws=S.length}return c.disable(c.SCISSOR_TEST),c.disable(c.BLEND),this.laps={laps:T,open:E,lap:O},Object.assign(this.stats,{cpuMs:performance.now()-l,visible:I.length,quads:ee,margin:_,gbuffer:g.size}),g}draw(e,t){let n=this.gl,r=this.o.dpr??devicePixelRatio,i=performance.now(),[a,o]=this.win(),s=e.zoom*r,c=this.o.temporal!==!1,l=this.last,u=this.o.hold??120;if(this.panned&&l&&l.zoom===e.zoom&&l.x===e.x&&l.y===e.y&&i-this.movedAt<u)return;this.panned=!1,l&&l.zoom===e.zoom&&l.x===e.x&&l.y===e.y||(this.movedAt=i),this.last={...e};let d=this.kept,f=d?.view;if(c&&this.o.panCopy!==!1&&this.o.keepGeometry!==!1&&this.sWas===1&&d&&d.w===a&&d.h===o&&!d.fresh&&f&&f.zoom===e.zoom&&(f.x!==e.x||f.y!==e.y)){let t=Math.round(e.x*s)-Math.round(f.x*s),n=Math.round(e.y*s)-Math.round(f.y*s);if(Math.abs(t)<a/2&&Math.abs(n)<o/2)return this.panFrame(e,t,n)}let p=c&&i-this.movedAt<u?this.o.scale??.5:1,m=this.closeAt;p===1&&this.gpuFields&&(this.o.close!==!1||this.path===`stage`)&&this.close(e,r),this.closeAt!==m&&(this.reshaped=!0);let h=this.lamps(e,r,i),g=h||this.touched.length>0;this.pointerMoved=!1;let _=l&&l.zoom===e.zoom&&l.x===e.x&&l.y===e.y,v=h&&!this.touched.length&&_&&p===1&&this.o.lampOnly!==!1&&!!this.j,y=p===1&&this.o.keepGeometry!==!1,b=y&&_&&this.sWas===1&&!this.reshaped&&!v,x=this.frame%16+1,S=v?this.j:y?[0,0]:c?[si(x,2)-.5,si(x,3)-.5]:[0,0];this.j=S;let C=Math.ceil(a*p),w=Math.ceil(o*p),T=s*p,E=this.live[0]&&this.instances[this.live[0].g],D=E?T*E.s:0;this.shadeDiv=this.o.shadeDiv??Math.min(4,Math.max(2,Math.round(D/3)));let O=this.shadeDiv;this.still=y?O*O:ti;let k=this.frame%this.still*5%(O*O);v||(this.shadeAt=c&&this.o.shadeAt!==!1?[k%O,k/O|0]:[0,0]);let A=this.movedRect(e,r);this.changedNow=A;let j=t&&p===1&&this.o.box!==!1,M=j?this.boxRect(e,r,g):null,N=M&&M.reduce(ai);j||(this.litBox=this.litWas=null,this.litLeft=0,this.settles=[]);let P=A[2]>A[0]&&[Math.floor(A[0])-8,Math.floor(A[1])-8,Math.ceil(A[2])+8,Math.ceil(A[3])+8],F=M??[[0,0,a,o]],I=M?[...M]:[null];if(!b)v||(this.geoOwed=[]);else{let t=this.geoOwed??=[],n=e=>[Math.floor(e[0])-8,Math.floor(e[1])-8,Math.ceil(e[2])+8,Math.ceil(e[3])+8];for(let e of this.changedEach??[])t.push(n(e));for(let r of this.touched)t.push(n([(r[0]-e.x)*s,(r[1]-e.y)*s,(r[2]-e.x)*s,(r[3]-e.y)*s]));I.fill(!1),this.geoOwed=t.filter(e=>{let t=!1,n=!1;return F.forEach((r,i)=>{let a=[Math.max(e[0],r[0]),Math.max(e[1],r[1]),Math.min(e[2],r[2]),Math.min(e[3],r[3])];a[2]<=a[0]||a[3]<=a[1]||(n=!0,I[i]=I[i]?ai(I[i],a):a,a[0]===e[0]&&a[1]===e[1]&&a[2]===e[2]&&a[3]===e[3]&&(t=!0))}),n?!t:e[2]>0&&e[3]>0&&e[0]<a&&e[1]<o})}let L=y?Math.round(e.x*T):e.x*T+S[0],R=y?Math.round(e.y*T):e.y*T+S[1],ee,z=[];if(v)ee=this.render(L,R,T,C,w,N,P,!0),z=[this.drawnBox];else for(let e=0;e<F.length;e++){if(e&&this.laps?.open&&(n.endQuery(this.timer.TIME_ELAPSED_EXT),this.queries.push(this.laps.laps),this.laps.open=!1),ee=this.render(L,R,T,C,w,M?M[e]:null,I[e]),!this.drawnBox){z=[null];break}z.push(this.drawnBox)}this.stats.boxes=z.length,this.stats.boxPx=z[0]?z.reduce((e,t)=>e+ii(t),0):C*w,this.touched.length=0,this.reshaped=!1,this.sWas=p,this.stillRun=p===1&&_?(this.stillRun??0)+1:+(p===1);let te=z[0]?z:null,{laps:B,lap:ne}=this.laps;ne(`resolve`);let V=this.kept;V&&V.w===a&&V.h===o||(V&&([...V.t,...V.wt].forEach(e=>n.deleteTexture(e)),V.f.forEach(e=>n.deleteFramebuffer(e))),V=this.kept={w:a,h:o,i:0,t:[0,1].map(()=>this.linear(q(n,a,o,n.RGBA16F))),wt:[0,1].map(()=>this.linear(q(n,a,o,n.RGBA16F))),f:[],fresh:!0},V.t.forEach((e,t)=>{let r=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,r),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT1,n.TEXTURE_2D,V.wt[t],0),V.f.push(r)}));let re=V.i,ie=1-V.i;if(te){n.bindFramebuffer(n.READ_FRAMEBUFFER,V.f[re]),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,V.f[ie]),n.disable(n.SCISSOR_TEST);for(let e of V.wrote??[[0,0,a,o]])e[2]<=e[0]||e[3]<=e[1]||(n.readBuffer(n.COLOR_ATTACHMENT0),n.drawBuffers([n.COLOR_ATTACHMENT0,n.NONE]),n.blitFramebuffer(e[0],e[1],e[2],e[3],e[0],e[1],e[2],e[3],n.COLOR_BUFFER_BIT,n.NEAREST),n.readBuffer(n.COLOR_ATTACHMENT1),n.drawBuffers([n.NONE,n.COLOR_ATTACHMENT1]),n.blitFramebuffer(e[0],e[1],e[2],e[3],e[0],e[1],e[2],e[3],n.COLOR_BUFFER_BIT,n.NEAREST));n.readBuffer(n.COLOR_ATTACHMENT0)}V.wrote=te?te.map(e=>[Math.max(e[0],0),Math.max(o-e[3],0),Math.min(e[2],a),Math.min(o-e[1],o)]):null,n.bindFramebuffer(n.FRAMEBUFFER,V.f[ie]),n.drawBuffers([n.COLOR_ATTACHMENT0,n.COLOR_ATTACHMENT1]),n.viewport(0,0,a,o);let H=this.resolve.u;n.useProgram(this.resolve.p),this.bind(H.tLit,0,ee.lit),this.bind(H.tHist,1,V.t[re]),this.bind(H.tWeight,2,V.wt[re]),n.uniform2f(H.uWin,a,o),n.uniform2f(H.uLow,C,w),n.uniform1f(H.uS,p),n.uniform2f(H.uJ,...S),n.uniform1f(H.uCap,p<1?.5:g?1:this.o.cap??32),n.uniform3f(H.uNow,e.x*s,e.y*s,s);let ae=V.view??e,oe=ae.zoom*r;n.uniform3f(H.uPrev,ae.x*oe,ae.y*oe,oe),n.uniform1f(H.uHist,c&&!V.fresh?1:0);let se=j&&this.firstSeen;n.uniform4f(H.uMoved,...se?A[2]>A[0]?[Math.min(A[0],se[0]),Math.min(A[1],se[1]),Math.max(A[2],se[2]),Math.max(A[3],se[3])]:se:A);let ce=c&&!V.fresh&&p===1&&ae.zoom===e.zoom&&ae.x===e.x&&ae.y===e.y&&(!g||j);n.uniform1f(H.uAll,+!ce),n.uniform1f(H.uPhase,this.frame%this.still),n.uniform4f(H.uLit,...g&&j&&this.litBox?this.toWindow(this.litBox,e,r):[1,1,0,0]),n.uniform1i(H.uReach,this.shadeDiv-1);for(let e of te??[null])e&&(n.enable(n.SCISSOR_TEST),n.scissor(e[0],o-e[3],e[2]-e[0],e[3]-e[1])),n.drawArrays(n.TRIANGLES,0,3);n.disable(n.SCISSOR_TEST),V.i=ie,V.fresh=!1,V.view={...e},this.drawnT=ee,this.showKept(),this.laps.open&&(n.endQuery(this.timer.TIME_ELAPSED_EXT),this.queries.push(B)),this.frame++,this.stats.scale=p,this.stats.mb=Math.round(this.memory()/1e6)}glareOf(e,t){let n=this.gl,r=`${e.i},${this.frame},${this.exposure}`,i=Math.max(e.w>>1,1),a=Math.max(e.h>>1,1),o=this.lensPasses??=new Cr(n).passes,s=this.lensAt;if(!s||s.w!==i||s.h!==a){s&&(n.deleteTexture(s.past),n.deleteTexture(s.glare),n.deleteFramebuffer(s.pastF),n.deleteFramebuffer(s.glareF));let e=Math.min(7,Math.floor(Math.log2(Math.min(i,a)))+1),t=e=>{let t=n.createTexture();n.bindTexture(n.TEXTURE_2D,t),n.texStorage2D(n.TEXTURE_2D,e,n.RGBA16F,i,a),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,e>1?n.LINEAR_MIPMAP_LINEAR:n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR);let r=n.createFramebuffer();return n.bindFramebuffer(n.FRAMEBUFFER,r),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,t,0),[t,r]},[r,o]=t(e),[c,l]=t(1);s=this.lensAt={w:i,h:a,levels:e,past:r,pastF:o,glare:c,glareF:l}}return s.at===r||(s.at=r,n.disable(n.BLEND),n.bindVertexArray(this.vao),n.bindFramebuffer(n.FRAMEBUFFER,s.pastF),n.viewport(0,0,i,a),n.useProgram(o.past.program),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t),n.uniform1i(o.past.u.tLight,0),n.uniform1f(o.past.u.uExposure,this.exposure),n.drawArrays(n.TRIANGLE_STRIP,0,4),n.bindTexture(n.TEXTURE_2D,s.past),n.generateMipmap(n.TEXTURE_2D),n.bindFramebuffer(n.FRAMEBUFFER,s.glareF),n.useProgram(o.glare.program),n.uniform1i(o.glare.u.tPast,0),n.uniform1i(o.glare.u.uLevels,s.levels),n.drawArrays(n.TRIANGLE_STRIP,0,4)),s.glare}layered(e){let t=this.gl,n=this.onStage,r=this.o.dpr??devicePixelRatio,i=e.w/r,a=e.h/r,o=this.drawnT,s=this.layerAt;s&&s.w===e.w&&s.h===e.h||(s&&(t.deleteTexture(s.t),t.deleteFramebuffer(s.f)),s=this.layerAt={w:e.w,h:e.h,t:this.linear(q(t,e.w,e.h,t.RGBA16F)),f:t.createFramebuffer()},t.bindFramebuffer(t.FRAMEBUFFER,s.f),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,s.t,0));let c={gl:t,w:i,h:a,left:n.corner[0],top:n.corner[1],ratio:r,target:s.f},l=null;for(let e of this.onLayers)l=e.before(c)??l;if(t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.disable(t.DEPTH_TEST),t.bindFramebuffer(t.FRAMEBUFFER,s.f),t.viewport(0,0,e.w,e.h),l){let i=this.bent.u;t.useProgram(this.bent.p),this.bind(i.tHist,0,e.t[e.i]),this.bind(i.tBend,1,l),t.uniform1f(i.uPxPerMm,4*n.view.zoom*r),t.bindVertexArray(this.vao),t.drawArrays(t.TRIANGLES,0,3)}else t.bindFramebuffer(t.READ_FRAMEBUFFER,e.f[e.i]),t.readBuffer(t.COLOR_ATTACHMENT0),t.blitFramebuffer(0,0,e.w,e.h,0,0,e.w,e.h,t.COLOR_BUFFER_BIT,t.NEAREST);let[u,d]=o.size,[f,p]=o.win,m=f/i,h=p/a,g={height:o.g0,toMap:[m/u,-h/d,(u-f)/2/u,(p+(d-p)/2)/d],mmPerPx:.25/n.view.zoom,face:0,box:[0,0,i,a]};for(let e of this.onLayers)e.shot(g,c);for(let e of this.onLayers)e.after(c);return s.t}panFrame(e,t,n){let r=this.gl,i=this.o.dpr??devicePixelRatio,[a,o]=this.win(),s=e.zoom*i,c=this.kept,l=c.i,u=1-c.i;this.movedRect(e,i),this.touched.length=0,this.settles=[],this.litBox=this.litWas=null,this.litLeft=0,this.shadeAt=[0,0],this.j=[0,0],r.disable(r.SCISSOR_TEST),r.bindFramebuffer(r.READ_FRAMEBUFFER,c.f[l]),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,c.f[u]);let d=Math.max(0,t),f=Math.min(a,a+t),p=Math.max(0,-n),m=Math.min(o,o-n);for(let e of[0,1])r.readBuffer(r.COLOR_ATTACHMENT0+e),r.drawBuffers(e?[r.NONE,r.COLOR_ATTACHMENT1]:[r.COLOR_ATTACHMENT0,r.NONE]),f>d&&m>p&&r.blitFramebuffer(d,p,f,m,d-t,p+n,f-t,m+n,r.COLOR_BUFFER_BIT,r.NEAREST);r.readBuffer(r.COLOR_ATTACHMENT0);let h=[];t&&h.push(t>0?[a-t-2,0,a,o]:[0,0,-t+2,o]),n&&h.push(n>0?[0,o-n-2,a,o]:[0,0,a,-n+2]);let g=this.drawnT;for(let t of h){let n=(this.stats.margin??0)+8;g=this.render(Math.round(e.x*s),Math.round(e.y*s),s,a,o,t,[t[0]-n,t[1]-n,t[2]+n,t[3]+n]),r.bindFramebuffer(r.FRAMEBUFFER,c.f[u]),r.drawBuffers([r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1]),r.viewport(0,0,a,o),r.enable(r.SCISSOR_TEST),r.scissor(t[0],o-t[3],t[2]-t[0],t[3]-t[1]);let i=this.resolve.u;r.useProgram(this.resolve.p),r.bindVertexArray(this.vao),this.bind(i.tLit,0,g.lit),this.bind(i.tHist,1,c.t[l]),this.bind(i.tWeight,2,c.wt[l]),r.uniform2f(i.uWin,a,o),r.uniform2f(i.uLow,a,o),r.uniform1f(i.uS,1),r.uniform2f(i.uJ,0,0),r.uniform1f(i.uCap,1),r.uniform3f(i.uNow,e.x*s,e.y*s,s),r.uniform3f(i.uPrev,e.x*s,e.y*s,s),r.uniform1f(i.uHist,0),r.uniform4f(i.uMoved,1,1,0,0),r.uniform1f(i.uAll,1),r.uniform1f(i.uPhase,0),r.uniform4f(i.uLit,1,1,0,0),r.uniform1i(i.uReach,this.shadeDiv-1),r.drawArrays(r.TRIANGLES,0,3),r.disable(r.SCISSOR_TEST),this.laps.open&&(r.endQuery(this.timer.TIME_ELAPSED_EXT),this.queries.push(this.laps.laps),this.laps.open=!1)}c.i=u,c.wrote=null,c.view={...e},this.panned=!0,this.reshaped=!0,this.sWas=1,this.stillRun=0,this.drawnT=g,this.showKept(),this.frame++,this.stats.scale=1,this.stats.pan=[t,n]}showKept(){let e=this.gl,t=this.kept,n=this.canvas.height-t.h,r=this.onStage&&this.onLayers?.size?this.layered(t):t.t[t.i],i=this.onStage?this.glareOf(t,r):null;e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,n,t.w,t.h),e.disable(e.BLEND),this.o.clear&&(e.enable(e.SCISSOR_TEST),e.scissor(0,n,t.w,t.h),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.disable(e.SCISSOR_TEST));let a=this.out.u;e.useProgram(this.out.p),this.bind(a.tHist,0,r),i&&this.bind(a.tGlare,1,i),e.uniform2i(a.uOff,0,n),e.uniform1i(a.uClear,+!!this.o.clear),e.uniform1f(a.uExposure,this.onStage?this.exposure:0),e.uniform3f(a.uBack,...this.backdrop??[0,0,0]),e.bindVertexArray(this.vao),e.drawArrays(e.TRIANGLES,0,3)}close(e,t){let n=innerWidth/e.zoom,r=innerHeight/e.zoom,i=[];for(let[a,o]of this.instances.entries()){if(o.hidden||this.path===`stage`&&!o.staged)continue;let s=this.kinds[o.kind],c=s.k.cw*o.s,l=s.k.ch*o.s;if(o.x+c<e.x||o.y+l<e.y||o.x>e.x+n||o.y>e.y+r)continue;let u=e.zoom*t*o.s;if(u<3)continue;let d=[(e.x-o.x)/o.s,(e.y-o.y)/o.s,(e.x+n-o.x)/o.s,(e.y+r-o.y)/o.s];s.c.cmds.forEach((e,t)=>{let n=e.shape;if(n?.type!==`field`)return;let r=this.fieldKeys?.[o.kind]?.get(n.key+`|`+n.spread),c=(s.own?.placed??s.atlas?.placed)?.get(r);if(!c||u<1.5*c.texels)return;let l=n.spread,f=(n.hw+l)*2,p=(n.hh+l)*2,m=n.rotate??0,h=Math.cos(m),g=Math.sin(m),_=[1/0,1/0],v=[-1/0,-1/0];for(let[e,t]of[[d[0],d[1]],[d[2],d[1]],[d[0],d[3]],[d[2],d[3]]]){let r=h*(e-n.cx)+g*(t-n.cy),i=-g*(e-n.cx)+h*(t-n.cy),a=[r/f+.5,i/p+.5];_=[Math.min(_[0],a[0]),Math.min(_[1],a[1])],v=[Math.max(v[0],a[0]),Math.max(v[1],a[1])]}let y=Math.min(l,8),b=[Math.max(_[0],0),Math.max(_[1],0),Math.min(v[0],1),Math.min(v[1],1)];if(b[0]>=b[2]||b[1]>=b[3])return;let x=[Math.max(b[0]-y/f,0),Math.max(b[1]-y/p,0),Math.min(b[2]+y/f,1),Math.min(b[3]+y/p,1)];i.push({g:a,i:t,key:r,shape:n,crop:x,held:b,m:y,px:u,css:[(x[2]-x[0])*f,(x[3]-x[1])*p]})})}let a=t=>{let i=this.instances[t],a=this.kinds[i.kind].k;return Math.hypot(i.x+a.cw*i.s/2-e.x-n/2,i.y+a.ch*i.s/2-e.y-r/2)},o=[...new Set(i.map(e=>e.g))].sort((e,t)=>a(e)-a(t)).slice(0,Dr),s=i.filter(e=>o.includes(e.g));if(!s.length)return;let c=s.reduce((e,t)=>e+t.css[0]*t.css[1]*t.px*t.px,0),l=Math.min(1,Math.sqrt(Or/c));for(let e of s)e.r=Math.min(32,e.px*l,4e3/Math.max(...e.css));let u=this.closeAt.items,d=e=>u.find(t=>t.g===e.g&&t.i===e.i&&t.key===e.key&&t.r>=.8*e.r&&t.held[0]<=e.held[0]&&t.held[1]<=e.held[1]&&t.held[2]>=e.held[2]&&t.held[3]>=e.held[3]);if(s.every(d))return;let f=performance.now(),p=this.gl,m=new Map;for(let e of s){let t=d(e);t?(e.id=t.id,e.r=t.r):(e.id=`${e.key}|${e.crop.map(e=>e.toFixed(5))}|${e.r.toFixed(3)}`,m.has(e.id)||m.set(e.id,{key:e.id,shape:e.shape,crop:e.crop,r:e.r}))}this.closeFields??=new lr(p,{});let h=this.closeRoom,g=new Set(s.map(e=>e.id)),_=null;if(h&&m.size<=8){for(let e of h.slots.keys())g.has(e)||(h.free.push(h.slots.get(e)),h.slots.delete(e),this.closePlaced.delete(e));_=this.closeFields.build([...m.values()],{steps:!1,into:h})}if(_)for(let[e,t]of _.placed)this.closePlaced.set(e,t);else{for(let e of s)e.id=`${e.key}|${e.crop.map(e=>e.toFixed(5))}|${e.r.toFixed(3)}`,m.has(e.id)||m.set(e.id,{key:e.id,shape:e.shape,crop:e.crop,r:e.r});let e=this.closeFields.build([...new Map([...m].filter(([e])=>s.some(t=>t.id===e))).values()],{steps:!1,room:1024});p.deleteTexture(this.closeTex),this.closeTex=e.texture,this.closeBytes=e.bytes,this.closeRoom=e.room,this.closePlaced=e.placed}let v=this.closePlaced,y=Math.max(...this.kinds.filter(Boolean).map(e=>e.c.n),1),b=new Float32Array(3*y*Dr*4),x=new Float32Array(Dr);o.forEach((e,t)=>{x[t]=e+1});for(let e of s){let t=v.get(e.id);if(!t)continue;let n=(o.indexOf(e.g)*3*y+3*e.i)*4;b.set(t.map,n),b.set([Math.max(e.held[0],t.holds[0]),Math.max(e.held[1],t.holds[1]),Math.min(e.held[2],t.holds[2]),Math.min(e.held[3],t.holds[3])],n+4),b[n+8]=e.m}3*y>this.closeMapW&&(p.deleteTexture(this.closeMap),this.closeMap=this.tex(3*y,Dr,null),this.closeMapW=3*y),p.bindTexture(p.TEXTURE_2D,this.closeMap),p.texSubImage2D(p.TEXTURE_2D,0,0,0,3*y,Dr,p.RGBA,p.FLOAT,b),this.closeAt={items:s,n:o.length,inst:x},this.stats.close={ms:performance.now()-f,fields:m.size,devices:o.length,texels:[...v.values()].reduce((e,t)=>e+t.area,0),r:Math.max(...s.map(e=>e.r))}}feed(e,{commands:t,cw:n,ch:r,mask:i,maskR:a,moved:o,place:s}){let c=this.gl,l=this.instances[e],u=performance.now(),d=l.up??e;this.fed!=null&&this.fed!==d&&this.unfeed();let f=l.home==null,p=this.spare+l.layer;f&&this.touched.push(this.plateBox(e));let m=l.home??l.kind,h=this.kinds[m],g=this.kinds[p],_={commands:t,device:h.k.device,cw:n,ch:r},v=this.fieldKeys?.[m],y=[...ln(_).values()],b=v&&y.every(e=>v.has(e.key)),x=y.map(e=>e.key).sort().join(`
`),S=!b&&g?.own&&g.sig===x&&!f,C=b?{texture:h.atlas.texture,bytes:0,place:()=>new Map(y.map(e=>[e.key,h.atlas.placed.get(v.get(e.key))]))}:S?g.own:this.gpuFields?this.ownFields(y,(this.last?.zoom??1)*(this.o.dpr??devicePixelRatio)*l.s,f?null:g?.own):new Qt(c),w=t.filter(e=>e.op===`screen`&&e.source?.width).map(e=>({c:e,img:e.source,w:e.source.width,h:e.source.height})),T=!f&&g,E=performance.now(),D=this.pictures(i,a,w,T?g:null),O=performance.now();!i&&g?.mask&&g.mask!==this.black&&!f&&Object.assign(D,{mask:g.mask,maskR:g.maskR});let k=performance.now(),A=un(c,_,{fields:C,fieldMost:this.o.fieldMost??8,fieldBudget:this.o.fieldBudget??1024,into:T?g.c:null}),j=T&&g.c.n===A.n?g.box:null;j?c.bindTexture(c.TEXTURE_2D,j):(j=c.createTexture(),c.bindTexture(c.TEXTURE_2D,j),c.texStorage2D(c.TEXTURE_2D,1,c.RGBA32F,Math.max(A.n,1),1),dn(c)),A.n&&c.texSubImage2D(c.TEXTURE_2D,0,0,0,A.n,1,c.RGBA,c.FLOAT,new Float32Array(A.boxes.flat())),g&&this.drop(g,new Set([j,A.tex,A.blk,D.mask,D.scr,C.texture]));let M=Math.max(h.tall,A.peak+h.rise),N=this.above(h.name,l.layer);this.kinds[p]={name:h.name,k:{...h.k,commands:t,cw:n,ch:r},c:A,box:j,lighting:h.lighting,prog:null,layer:l.layer,rise:h.rise,tall:M,atlas:h.atlas,...D,own:b?null:C,sig:x},this.fieldKeys&&(this.fieldKeys[p]=new Map(y.map(e=>[e.key,b?v.get(e.key):e.key])));let P=this.devRows,F=p*X*4;if(P.copyWithin(F,m*X*4,(m+1)*X*4),P.set([n,r,h.lighting,M],F),P.set(N?this.cellIn(s??{x:l.x-l.cell[0],y:l.y-l.cell[1],s:l.s}):A.extent,F+32),P.set([l.layer,N,h.rise,A.peak+h.rise],F+40),P.fill(0,F+li*4,F+X*4),P.set([A.panes.length/18,+!!A.glows],F+li*4),P.set(fi(A.panes,h.rise),F+(li+1)*4),c.bindTexture(c.TEXTURE_2D,this.tDev),c.texSubImage2D(c.TEXTURE_2D,0,0,p,X,1,c.RGBA,c.FLOAT,P,F),f&&(this.rest(l),l.home=m,this.kindOf(e,p),this.fed=d,this.closeAt={items:[],n:0}),s&&(l.x!==l.cell[0]+s.x||l.y!==l.cell[1]+s.y||l.s!==s.s)&&(l.x=l.cell[0]+s.x,l.y=l.cell[1]+s.y,l.s=s.s,this.kindOf(e,p)),!f&&this.closeAt.items.length){let t=this.fieldKeys[p],n=this.kinds[p].c.cmds,r=new Float32Array(12);this.closeAt.items=this.closeAt.items.filter(i=>{let a=i.g===e?n[i.i]?.shape:null;return i.g!==e||a?.type===`field`&&t.get(a.key+`|`+a.spread)===i.key||(c.bindTexture(c.TEXTURE_2D,this.closeMap),c.texSubImage2D(c.TEXTURE_2D,0,3*i.i,this.closeAt.inst.indexOf(e+1),3,1,c.RGBA,c.FLOAT,r),!1)})}f&&this.touched.push(this.plateBox(e)),this.changed(l,o?.length?o:[{x:0,y:0,w:n,h:r}],M),this.stats.feed={parts:{fields:E-u,pictures:O-E,compile:performance.now()-k},ms:performance.now()-u,commands:A.n,fields:b?`atlas`:S?`kept`:`made`,screens:w.length}}ownFields(e,t,n){let r=Math.max(2,1.5*t);if(n?.room){let t=new Set(e.map(e=>e.key)),{room:r,placed:i}=n,a=e.filter(e=>!i.has(e.key));for(let e of i.keys())t.has(e)||(r.free.push(r.slots.get(e)),r.slots.delete(e),i.delete(e));let o=this.gpuFields.build(a.map(e=>({key:e.key,shape:e.shape})),{steps:!1,r:n.r,into:r});if(o){for(let[e,t]of o.placed)i.set(e,t);return n}}let{texture:i,placed:a,bytes:o,room:s}=this.gpuFields.build(e.map(e=>({key:e.key,shape:e.shape})),{steps:!1,r,room:1024});return{texture:i,bytes:o,placed:a,room:s,r,place:()=>a}}plateAt(e,t,n){let r=this.instances[e],i=[r.cell[0]+t.x,r.cell[1]+t.y,t.s];(r.x!==i[0]||r.y!==i[1]||r.s!==i[2]||!!r.hidden!==n)&&(this.rest(r),this.touched.push(this.plateBox(e)),[r.x,r.y,r.s]=i,r.hidden=n,this.kindOf(e,r.kind),this.touched.push(this.plateBox(e)))}rest(e){e.rest??={x:e.x,y:e.y,s:e.s,hidden:e.hidden}}changed(e,t,n){let r=n/.6,i=this.moved,a=1/0,o=1/0,s=-1/0,c=-1/0;for(let n of t)a=Math.min(a,e.x+(n.x-r)*e.s),o=Math.min(o,e.y+(n.y-r)*e.s),s=Math.max(s,e.x+(n.x+n.w+r)*e.s),c=Math.max(c,e.y+(n.y+n.h+r)*e.s);(this.movedEach??=[]).push([a,o,s,c]),this.moved=i?[Math.min(i[0],a),Math.min(i[1],o),Math.max(i[2],s),Math.max(i[3],c)]:[a,o,s,c]}movedRect(e,t){let n=this.moved,r=this.movedWas,i=n&&r?[Math.min(n[0],r[0]),Math.min(n[1],r[1]),Math.max(n[2],r[2]),Math.max(n[3],r[3])]:n??r;if(this.moved=null,this.movedWas=n,n&&this.path===`stage`){let e=this.settles??=[];for(let t of this.movedEach??[]){let n=e.find(({box:e})=>e[0]<=t[0]&&e[1]<=t[1]&&e[2]>=t[2]&&e[3]>=t[3]);n?(n.phases=0,n.seen=!1):e.push({box:t,phases:0,seen:!1})}this.settling=e.length+1}else n&&(this.boxLast=i,this.settling=ei);let a=this.movedEach??[];return this.changedEach=[...a,...this.movedEachWas??[]].map(n=>this.toWindow(n,e,t)),this.movedEachWas=a,this.movedEach=null,i?this.toWindow(i,e,t):[1,1,0,0]}toWindow(e,t,n){if(this.fed==null&&this.path!==`stage`)return[1,1,0,0];let r=t.zoom*n,i=e=>(e-t.x)*r,a=e=>(e-t.y)*r;return[i(e[0]),a(e[1]),i(e[2]),a(e[3])]}boxRect(e,t,n){if(this.settling--,n){let e=this.live.map(e=>this.plateBox(e.g));this.litBox=[...e,...this.litWas??[],...this.touched].reduce((e,t)=>[Math.min(e[0],t[0]),Math.min(e[1],t[1]),Math.max(e[2],t[2]),Math.max(e[3],t[3])],[1/0,1/0,-1/0,-1/0]),this.litWas=e,this.litLeft=ei}else this.litLeft>0&&--this.litLeft===0&&(this.litBox=this.litWas=null);let r=e.zoom*t,i=this.litBox,a=this.path===`stage`?this.nextSettle(e,t):this.settling>=0&&this.boxLast&&this.fed!=null?[this.toWindow(this.boxLast,e,t)]:[];if(i&&isFinite(i[0])){let t=[(i[0]-e.x)*r,(i[1]-e.y)*r,(i[2]-e.x)*r,(i[3]-e.y)*r];this.o.rects===!1&&a.length?a[0]=ai(a[0],t):a.push(t),oi(a,ii,0)}let o=a.filter(e=>isFinite(e[0])).map(e=>[Math.floor(e[0])-8,Math.floor(e[1])-8,Math.ceil(e[2])+8,Math.ceil(e[3])+8]);return o.length?o:[[0,0,0,0]]}nextSettle(e,t){let n=this.settles??=[],[r,i]=this.win(),a=r*i,o=this.still??ti,s=1<<this.frame%o,c=(1<<o)-1,l=e=>o-ri(e.phases&c)+ +!e.seen,u=n=>this.toWindow(n.box,e,t);for(let e=n.length;e--;){let t=u(n[e]);(t[2]<=0||t[3]<=0||t[0]>=r||t[1]>=i)&&n.splice(e,1)}n.sort((e,t)=>e.seen-t.seen||(e.phases&s?1:0)-(t.phases&s?1:0)||l(t)-l(e));let d=n.reduce((e,t)=>e+ii(u(t))*l(t),0)>a*(n[0]?l(n[0]):0)?1/0:a/4,f=this.o.rects===!1,p=f?1:6,m=f?0:a/64,h=[],g=e=>ii([Math.max(e[0],0),Math.max(e[1],0),Math.min(Math.max(e[2],0),r),Math.min(Math.max(e[3],0),i)]),_=()=>h.reduce((e,t)=>e+g(t)+m,0);for(let e of n){let t=u(e),n=-1,r=h.length<p?g(t)+m:1/0;h.forEach((e,i)=>{let a=g(ai(e,t))-g(e);a<r&&(r=a,n=i)}),h.length&&_()+r>d||(n<0?h.push(t):h[n]=ai(h[n],t),oi(h,g,m))}return this.firstSeen=null,h.length?(this.settles=n.filter(n=>{let r=this.toWindow(n.box,e,t);if(!h.some(e=>r[0]>=e[0]&&r[1]>=e[1]&&r[2]<=e[2]&&r[3]<=e[3]))return!0;let i=n.seen,a=this.changedEach.some(e=>r[0]<e[2]&&e[0]<r[2]&&r[1]<e[3]&&e[1]<r[3]);return i||(this.firstSeen=this.firstSeen?[Math.min(this.firstSeen[0],r[0]),Math.min(this.firstSeen[1],r[1]),Math.max(this.firstSeen[2],r[2]),Math.max(this.firstSeen[3],r[3])]:r),n.seen=!0,i&&!a&&(n.phases|=s),(n.phases&c)!==c}),this.settling=this.settles.length,h):(this.settling=0,[])}win(){return this.windowSize??[this.canvas.width,this.canvas.height]}plateBox(e){let t=this.instances[e],n=this.kinds[t.kind].k;return[t.x,t.y,t.x+n.cw*t.s,t.y+n.ch*t.s]}busy(){return this.coming.length>0||this.joining!=null||this.touched.length>0||this.pointerMoved||this.going||this.moved!=null||this.settling>0||this.litLeft>0}screens(e){let t=this.instances[e],n=this.kinds[this.spare+t.layer],r=this.gl;if(n?.screens?.length){this.changed(t,n.screens.map(({c:{shape:e}})=>({x:e.cx-e.hw,y:e.cy-e.hh,w:2*e.hw,h:2*e.hh})),0),r.bindTexture(r.TEXTURE_2D,n.scr);for(let e of n.screens)e.img.width===e.w&&e.img.height===e.h&&r.texSubImage2D(r.TEXTURE_2D,0,e.x,0,r.RGBA,r.UNSIGNED_BYTE,e.img)}}unfeed(){if(this.fed!=null){for(let e of this.instances[this.fed].plates){let t=this.instances[e];this.touched.push(this.plateBox(e)),t.rest&&(Object.assign(t,t.rest),delete t.rest),this.kindOf(e,t.home??t.kind),delete t.home,this.touched.push(this.plateBox(e))}this.moved=this.movedWas=this.boxLast=null,this.fed=null,this.closeAt={items:[],n:0}}}kindOf(e,t){let n=this.instances[e],r=this.gl;n.kind=t,r.bindTexture(r.TEXTURE_2D,this.tInst),r.texSubImage2D(r.TEXTURE_2D,0,e%Y,Math.floor(e/Y),1,1,r.RGBA,r.FLOAT,new Float32Array([n.x,n.y,n.s,t]))}drop(e,t=new Set){let n=this.gl;for(let r of[e.box,e.c.tex,e.c.blk,e.c.rowsTex,e.mask,e.scr,e.own?.texture])r&&r!==this.black&&!t.has(r)&&n.deleteTexture(r)}*bake(e){let t=this.gl,n=this.bakeB,r=this.o.bakeFrames??8,i=performance.now(),a=4096,o=this.shelf,s=new Map(e.map(e=>{let{k:t}=this.kinds[e],r=Math.ceil(t.cw*t.at.s*n),i=Math.ceil(t.ch*t.at.s*n);o.x+r>a&&(o.x=0,o.y+=o.tall,o.tall=0);let s=[o.x,o.y,r,i];return o.x+=r+2,o.tall=Math.max(o.tall,i+2),[e,s]})),c=t.createFramebuffer();if(t.bindFramebuffer(t.FRAMEBUFFER,c),!this.tBake||o.y+o.tall>this.bakeSize[1]){let e=1024*Math.ceil((o.y+o.tall)/1024),n=this.tBake,r=this.linear(q(t,a,e,t.RGBA8));if(t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,r,0),t.clearBufferfv(t.COLOR,0,[1,1,1,1]),n){let e=t.createFramebuffer();t.bindFramebuffer(t.READ_FRAMEBUFFER,e),t.framebufferTexture2D(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0),t.blitFramebuffer(0,0,a,this.bakeSize[1],0,0,a,this.bakeSize[1],t.COLOR_BUFFER_BIT,t.NEAREST),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.deleteFramebuffer(e),t.deleteTexture(n)}this.tBake=r,this.bakeSize=[a,e]}t.deleteFramebuffer(c);let l=this.place.u;for(let i of e){let{k:e,name:a}=this.kinds[i],[o,c,u,d]=s.get(i),f=this.lists.get(a).filter(e=>this.kinds[e].layer>=this.kinds[i].layer),p=f.map(t=>{let n=this.kinds[t].k.at;return{kind:t,hidden:this.kinds[t].k.hidden&&t!==i,x:n.x-e.at.x,y:n.y-e.at.y,s:n.s,cell:[0,0]}}),m=this.tex(f.length,1,new Float32Array(p.flatMap(e=>[e.x,e.y,e.s,e.kind]))),h=q(t,u,d,t.RGBA16F),g=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,g),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,h,0),t.clearBufferfv(t.COLOR,0,[0,0,0,0]);let _={instances:this.instances,tInst:this.tInst,timer:this.timer,only:this.o.only,frame:this.frame,live:this.live,closeAt:this.closeAt,shadeDiv:this.shadeDiv,shadeAt:this.shadeAt},v=new Set(this.sets?.keys()??[]);this.timer=null,this.live=[],this.closeAt={items:[],n:0},this.instances=p,this.tInst=m,this.baking=!0;for(let e=0;e<r;e++){this.frame=e,this.o.only=new Set(e?[`shadow`]:[`gbuffer`,`commands`,`pyramid`,`near`,`shadow`]),this.shadeDiv=2,this.shadeAt=[0,0];let i=this.render(0,0,2*n,2*u,2*d);t.bindFramebuffer(t.FRAMEBUFFER,g),t.drawBuffers([t.COLOR_ATTACHMENT0]),t.viewport(0,0,u,d),t.useProgram(this.place.p),this.bind(l.tS,0,i.shade),t.uniform2f(l.uAt,0,0),t.uniform1f(l.uK,1/r),t.uniform1i(l.uFlip,1),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.BLEND)}this.baking=!1;for(let[e,t]of this.sets)v.has(e)||(this.free(t),this.sets.delete(e));this.bytes=[...this.sets.values()].reduce((e,t)=>e+t.bytes,0),Object.assign(this,_),this.o.only=_.only;let y=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,y),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,this.tBake,0),t.drawBuffers([t.COLOR_ATTACHMENT0]),t.viewport(o,c,u,d),t.useProgram(this.place.p),this.bind(l.tS,0,h),t.uniform2f(l.uAt,o,c),t.uniform1f(l.uK,1),t.uniform1i(l.uFlip,0),t.drawArrays(t.TRIANGLES,0,3),t.deleteTexture(h),t.deleteFramebuffer(g),t.deleteFramebuffer(y),t.deleteTexture(m),this.devRows.set([o,c,e.at.s*n,1],(i*X+9)*4),this.uploadRows([i]),this.drawnT=null,yield this.waited()}let u=this.stats.bake??={ms:0,texels:0};u.ms+=performance.now()-i,u.texels+=[...s.values()].reduce((e,t)=>e+t[2]*t[3],0),u.size=this.bakeSize}waited(){let e=this.gl,t=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0);return e.bindFramebuffer(e.FRAMEBUFFER,null),e.flush(),t}lives(e){let t=this.gl,n=new Float32Array(jr),r=new Float32Array(24);this.live.forEach((e,t)=>{n[t]=e.g+1,r.set(e.key,3*t)}),t.uniform1fv(e[`uLive[0]`],n),t.uniform3fv(e[`uLiveKey[0]`],r)}lamps(e,t,n){let r=this.o,i=e.zoom*t,a=this.bakeB,o=Math.min((n-(this.lampAt??n))/1e3,.1),s=this.pointer;this.lampAt=n;let c=innerWidth/e.zoom,l=innerHeight/e.zoom,u=new Map(this.live.map(e=>[e.g,e])),d=i/2>(u.size?1.1:1.3)*a,f=e=>{let t=this.instances[e],n=this.kinds[t.kind].k;return[t.x,t.y,t.x+n.cw*t.s,t.y+n.ch*t.s]},p=t=>{let n=f(t);return Math.hypot((n[0]+n[2])/2-e.x-c/2,(n[1]+n[3])/2-e.y-l/2)},m=e=>this.instances[e].up??e,h=this.live.filter(e=>e.hand>0).map(e=>m(e.g)),g=[];d&&this.instances.forEach((t,n)=>{if(t.up!=null)return;let r=f(n);r[2]>e.x&&r[3]>e.y&&r[0]<e.x+c&&r[1]<e.y+l&&g.push(n)}),g.sort((e,t)=>p(e)-p(t));let _=e.x+s.x/e.zoom,v=e.y+s.y/e.zoom,y=s.in?g.find(e=>{let t=f(e);return _>=t[0]&&v>=t[1]&&_<=t[2]&&v<=t[3]}):void 0,b=r.liveAll?g:(y??g[0])===void 0?[]:[y??g[0]],x=g.includes(this.fed)?[this.fed]:[],S=[...new Set([...h,...x,...b])].flatMap(e=>this.instances[e].plates).slice(0,jr),C=!1,w=!1;return this.live=S.map(t=>{let n=u.get(t)??{g:t,hand:0},r=+(m(t)===y)-n.hand;r&&(n.hand=Math.abs(r)>.004?n.hand+r*(1-Math.exp(-o*5)):n.hand+r,C=!0);let i=this.keyFor(t,n.hand,e);return(!n.key||i.some((e,t)=>Math.abs(e-n.key[t])>.001))&&(w=!0),n.key=i,n}),this.going=C,this.active=r.liveAll?null:y??(g.includes(this.active)?this.active:null),w}keyFor(e,t,n){let r=this.instances[e],{k:i,rise:a}=this.kinds[r.kind],o=i.light.uniforms,s=i.light.lighting,c=o.uKey,l=this.pointer,u=(c[2]-(o.uFace??0))/3,d=c[0]-u*s.lamp[0],f=c[1]-u*s.lamp[1],p=Math.sqrt(innerWidth*innerHeight)/2,m=(l.x-(r.x+i.cw*r.s/2-n.x)*n.zoom)/p,h=(l.y-(r.y+i.ch*r.s/2-n.y)*n.zoom)/p,g=1-t*.65;return[d+u*(s.lamp[0]*g+m*s.sway*t),f+u*(s.lamp[1]*g+h*s.sway*t),c[2]+a]}measure(){if(!this.timer)return;let e=this.gl;for(;this.queries.length&&this.queries[0].every(([,t])=>e.getQueryParameter(t,e.QUERY_RESULT_AVAILABLE));){let t=this.queries.shift(),n={};for(let[r,i]of t)n[r]=e.getQueryParameter(i,e.QUERY_RESULT)/1e6,e.deleteQuery(i);let r=t.map(([,e])=>e.v).filter(e=>e?.[0]!=null&&e[1]!=null&&e[1]>e[0]);if(this.gpuSpan=r.length?Number(r.reduce((e,t)=>t[1]>e?t[1]:e,0n)-r.reduce((e,t)=>t[0]<e?t[0]:e,r[0][0]))/1e6:null,!e.getParameter(this.timer.GPU_DISJOINT_EXT)&&(this.gpuParts=n,this.gpuMs=Object.values(n).reduce((e,t)=>e+t,0),t.px)){let e=this.costs??={ms:0,mp:0};e.ms=e.ms*.95+this.gpuMs,e.mp=e.mp*.95+t.px/1e6,this.msPerMP=e.ms/e.mp}}}profile(){let e=(this.gpuLog??[]).slice(-120).sort((e,t)=>e-t),t=t=>+(e[Math.floor(e.length*t)]??0).toFixed(1);return{gpuMs:{p50:t(.5),p95:t(.95)},msPerMP:+(this.msPerMP??0).toFixed(1),parts:this.gpuParts,mb:Math.round(this.memory()/1e6),...this.stats}}memory(){let e=(this.bytes??0)+(this.bakeSize?this.bakeSize[0]*this.bakeSize[1]*4:0)+this.fieldBytes+(this.closeBytes??0)+(this.kept?this.kept.w*this.kept.h*16:0),t=new Set(this.kinds.filter(Boolean).map(e=>e.c)),n=new Set([...t].map(e=>e.fields));for(let n of t)e+=n.bytes+n.n*16;for(let t of n)e+=t.bytes??0;return e+=this.pictureBytes,e}},Ci=32,wi=.25,Ti=48,Ei=.34;function Di(e,{x:t,y:n,w:r,h:i},a){let o=e/wi,s=Math.max(Ti,o*Ei),c=[s,s,s,s];if(!a)return c.map(()=>o/.6+s);for(let{at:e,along:l}of a)for(let[a,u]of[[t,n],[t+r,n],[t,n+i],[t+r,n+i]]){let t=l??[e[0]-a*wi,e[1]-u*wi,e[2]],n=Math.hypot(t[0],t[1]),r=Math.max(t[2],.6*n);if(!n)continue;let i=-t[0]/r*o,d=-t[1]/r*o;c[0]=Math.max(c[0],-i+s),c[1]=Math.max(c[1],-d+s),c[2]=Math.max(c[2],i+s),c[3]=Math.max(c[3],d+s)}return c}var Oi={seat:{reach:()=>[0,0,0,0],geometry:!0,all:!0},shape:{reach:(e,t,n)=>Di(e,t,n),geometry:!0},colour:{reach:()=>[32,32,32,32],geometry:!0},picture:{reach:()=>[32,32,32,32],geometry:!0},light:{reach:()=>[0,0,0,0],geometry:!1}},ki=(e,t)=>e?t?[Math.min(e[0],t[0]),Math.min(e[1],t[1]),Math.max(e[2],t[2]),Math.max(e[3],t[3])]:e:t,Ai=e=>Math.max(e[2]-e[0],0)*Math.max(e[3]-e[1],0),ji=(e,t)=>({box:ki(e.box,t.box),all:e.all||t.all,left:Math.max(e.left,t.left),n:Math.max(e.n,t.n),geo:ki(e.geo,t.geo),fresh:ki(e.fresh,t.fresh),out:ki(e.out,t.out),lamp:e.lamp||t.lamp,lamped:e.lamped||t.lamped,carried:e.carried||t.carried,turn:Math.min(e.turn,t.turn),why:new Set([...e.why,...t.why])}),Mi=(e,t)=>e[0]>=t[0]&&e[1]>=t[1]&&e[2]<=t[2]&&e[3]<=t[3];function Ni(e,t,n,[r,i,a],o){let s=Oi[t],c=!n||!!s.all,l=!c&&s.reach(a,n,o),u=c?[0,0,r,i]:[n.x-l[0],n.y-l[1],n.x+n.w+l[2],n.y+n.h+l[3]],d=s.geometry?c?u:[n.x-2,n.y-2,n.x+n.w+2,n.y+n.h+2]:null,f=c?null:u;if(c){let n={box:u,all:c,left:4,n:0,geo:d,fresh:f,lamp:!1,turn:-1,why:new Set([t])};for(let t of e)if(n.geo=ki(n.geo,t.geo),n.fresh=ki(n.fresh,t.fresh),n.out=ki(n.out,t.out),!t.n)for(let e of t.why)n.why.add(e);return e.length=0,e.push(n),n}let p=e.find(e=>!e.all&&Mi(u,e.box)&&Ai(e.box)<=2*Ai(u));if(p)return p.left=Math.max(p.left,4),p.geo=ki(p.geo,d),p.fresh=ki(p.fresh,f),p.why.add(t),p;let m={box:u,all:c,left:4,n:0,geo:d,fresh:f,lamp:!1,turn:-1,why:new Set([t])};for(e.push(m);e.length>Ci;){let t=null,n=1/0;for(let r=0;r<e.length;r++)for(let i=r+1;i<e.length;i++){if(e[r].all||e[i].all)continue;let a=Ai(ki(e[r].box,e[i].box))-Ai(e[r].box)-Ai(e[i].box);a<n&&(n=a,t=[r,i])}let r=e.splice(t[1],1)[0],i=e.splice(t[0],1)[0];e.push(ji(i,r))}return m}var Pi=e=>e.all||e.why.has(`shape`)||e.why.has(`seat`);function Fi(e,t,n=!1){let r=[],i=new Set,a=new Set,o=e.some(e=>e.r.lamp),s=0;for(let c of e){let e=Ai(c.work),l=c.r.lamp,u=c.S.step%4,d=(!c.r.n||!!c.r.geo||!!c.r.fresh)&&Pi(c.r),f=!!c.sparse,p=r.find(t=>t.lampOnly===l&&t.sparse===f&&(l||t.step===u)&&Ai(ki(t.box,c.work))<=1.25*(t.sum+e)),m=l?0:p?Ai(ki(p.box,c.work))-Ai(p.box):e;if(d&&a.has(c.S))continue;let h=n&&c.S.drawn&&!c.S.wrong;(s||h||o&&c.r.all&&c.S.drawn)&&!l&&s+m>t&&!(d&&i.has(c.S))&&!(c.S.wrong&&c.S.inView)?d&&a.add(c.S):(s+=m,d&&i.add(c.S),p?(p.items.push(c),p.box=ki(p.box,c.work),p.sum+=e):r.push({items:[c],box:c.work,sum:e,lampOnly:l,step:u,sparse:f}))}return r}var Ii=128,Li=e=>Math.ceil(e/128)*128,Ri=(e,t,n,r,i)=>{for(let i of e)if(n<=i.h&&i.x+t<=r){let e={x:i.x,y:i.y,w:t,h:n};return i.x=Li(i.x+t+Ii),e}let a=Li(e.reduce((e,t)=>Math.max(e,t.y+t.h+Ii),0));return t>r||a+n>i?null:(e.push({x:Li(t+Ii),y:a,h:n}),{x:0,y:a,w:t,h:n})},zi=new Set([1,2,4,8,16]),Bi=96,Vi=e=>2**Math.ceil(Math.log2(e))/e,Hi=3e5,Ui=2e7,Wi=14,Gi=8,Ki=300,qi=12,Ji=4,Yi=`100%`,Xi=3,Zi=100,Qi=.9976,$i=25e4,ea=3072,ta=2e3,na=15e3,ra=4,ia=new Set([`uPoints`,`uPoint[0]`,`uPointColor[0]`]),aa=e=>e.seen!==!1&&!e.parked,oa=e=>{if(!e?.uKey||e.uTorch?.[3]>0||e.uSpin?.[1]>0)return null;let t=[{at:e.uKey}];if(e.uSky&&t.push({along:e.uSky}),e.uPoints>0){if(!e[`uPoint[0]`])return null;t.push({at:e[`uPoint[0]`]})}return t},sa=(e,t,n)=>{for(let r in{...e,...t}){if(n?.has(r))continue;let i=e[r],a=t[r];if(i!==a){if(!i?.length||i.length!==a?.length)return!1;for(let e=0;e<i.length;e++)if(Math.abs(i[e]-a[e])>1e-4)return!1}}return!0},ca=1024,la=24,ua=`.12`,da=`#version 300 es
precision highp float;uniform sampler2D tLit,tHist,tG0;
uniform vec2 uWin,uJ;uniform float uCount,uCap;uniform vec4 uMoved;uniform ivec4 uSeat;uniform int uReach,uSparse;uniform ivec2 uPh;layout(location=0) out vec4 o;layout(location=1) out vec4 oStep;
// Where the surface steps, as against what its relief does: over this many mm between the corners round a pixel, as the library's light tells them apart.
float stepAt(ivec2 p){float a=texelFetch(tG0,clamp(p+ivec2(-1,-1),uSeat.xy,uSeat.zw),0).r,b=texelFetch(tG0,clamp(p+ivec2(1,-1),uSeat.xy,uSeat.zw),0).r,c=texelFetch(tG0,clamp(p+ivec2(-1,1),uSeat.xy,uSeat.zw),0).r,d=texelFetch(tG0,clamp(p+ivec2(1,1),uSeat.xy,uSeat.zw),0).r;
  return max(a,max(b,max(c,d)))-min(a,min(b,min(c,d)));}
void main(){oStep=vec4(step(${ua},stepAt(ivec2(gl_FragCoord.xy))));vec2 pd=vec2(gl_FragCoord.x,uWin.y-gl_FragCoord.y),qd=pd-uJ,qc=floor(qd)+.5,dd=qd-qc;
  ivec2 qi=clamp(ivec2(qc.x,uWin.y-qc.y),uSeat.xy,uSeat.zw);
  // A sparse frame lit one pixel of each 2×2, at uPh, into a target half the size. Each pixel is what it held, changed as the lit ones
  // round it changed, by the ratio of each one's light now to what it held: so the print and grain it held stay its own, and only the
  // light moves. Lit ones on another surface, by height, count for little. A lit pixel is its own light.
  if(uSparse==1){
    ivec2 k0=(qi-uPh)>>1;ivec4 ls=ivec4((uSeat.xy-uPh+1)>>1,(uSeat.zw-uPh)>>1);
    vec2 f=vec2(qi-(k0*2+uPh))*.5;float h0=texelFetch(tG0,qi,0).r,ws=0.;vec4 r=vec4(0),H=texelFetch(tHist,ivec2(gl_FragCoord.xy),0);
    for(int i=0;i<4;i++){ivec2 e=ivec2(i&1,i>>1),k=clamp(k0+e,ls.xy,ls.zw),sp=k*2+uPh;
      vec4 L=texelFetch(tLit,k,0),P=texelFetch(tHist,sp,0);
      float b=(e.x==1?f.x:1.-f.x)*(e.y==1?f.y:1.-f.y),d=(texelFetch(tG0,sp,0).r-h0)/${ua},w=b*(exp(-d*d)+.001);
      r+=w*vec4((L.rgb+.02)/(P.rgb+.02),L.a-P.a);ws+=w;}
    r/=max(ws,1e-6);
    o=vec4(H.rgb*clamp(r.rgb,0.,8.),clamp(H.a+r.a,0.,1.));return;}
  vec4 now=texelFetch(tLit,qi,0),lo=vec4(1e9),hi=vec4(-1e9);
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec4 c=texelFetch(tLit,clamp(qi+ivec2(x,y)*uReach,uSeat.xy,uSeat.zw),0);lo=min(lo,c);hi=max(hi,c);}
  float wn=exp(-2.*dot(dd,dd)),hw=uCount;vec4 H=texelFetch(tHist,ivec2(gl_FragCoord.xy),0);
  bool moved=all(greaterThanEqual(pd,uMoved.xy))&&all(lessThanEqual(pd,uMoved.zw));
  if(hw>0.&&moved) hw=min(hw,mix(8.,.25,smoothstep(.04,.12,length(now.rgb-H.rgb)/(max(max(now.r,now.g),now.b)+.05))));
  hw=min(hw,uCap);
  // Only what moved can be out of date: everywhere else what's kept stands, and held to this frame's neighbours it would keep this frame's half-size cells.
  if(moved||uCap<31.) H=clamp(H,lo,hi);
  o=hw>0.?(H*hw+now*wn)/(hw+wn):now;}`,fa=`#version 300 es
precision highp float;precision highp sampler2DArray;uniform sampler2DArray tGa;uniform vec2 uSize;uniform vec4 uFrom;out vec4 o;
void main(){vec2 cell=uFrom.zw/uSize,at=uFrom.xy+floor(gl_FragCoord.xy)*cell;vec4 sum=vec4(0);
  for(int y=0;y<8;y++)for(int x=0;x<8;x++)sum+=texelFetch(tGa,ivec3(at+(vec2(x,y)+.5)/8.*cell,3),0);
  o=vec4(sum.rgb/64.*.25,1);}`,pa=`#version 300 es
precision highp float;precision highp sampler2DArray;uniform sampler2D tC,tKeep;uniform sampler2DArray tG;uniform ivec4 uAt;out vec4 o;
void main(){
  ivec2 b=ivec2(gl_FragCoord.xy),p=uAt.xy+b;
  float id=texelFetch(tG,ivec3(p.x+uAt.w,uAt.z-1-p.y+uAt.w,5),0).b;
  if(id>.5){int k=int(id+.5);if(texelFetch(tKeep,ivec2(k&1023,k>>10),0).r<.5){o=vec4(0);return;}}
  vec4 c=texelFetch(tC,ivec2(b.x,textureSize(tC,0).y-1-b.y),0);
  o=c.a>0.?vec4(c.rgb/c.a,c.a):vec4(0);}`,ma=`#version 300 es
precision highp float;uniform sampler2D tHist,tStep;uniform vec4 uSeat;uniform vec2 uWin;uniform float uPage;out vec4 o;
vec4 at(vec2 p){return texture(tHist,clamp(p,uSeat.xy,uSeat.zw)/uWin);}
float lum(vec4 c){return dot(c.rgb,vec3(.299,.587,.114))+(1.-c.a)*uPage;}
void main(){
  o=texelFetch(tHist,ivec2(gl_FragCoord.xy),0);
  if(uSeat.z>0.&&texelFetch(tStep,ivec2(gl_FragCoord.xy),0).r>.5){
    vec2 p=gl_FragCoord.xy;
    float a=lum(at(p+vec2(-1,-1))),b=lum(at(p+vec2(1,-1))),c=lum(at(p+vec2(-1,1))),d=lum(at(p+vec2(1,1))),m=lum(o);
    float lo=min(m,min(a,min(b,min(c,d)))),hi=max(m,max(a,max(b,max(c,d))));
    if(hi-lo>max(.03,hi*.1)){
      vec2 dir=vec2((c+d)-(a+b),(a+c)-(b+d));
      dir=clamp(dir/(min(abs(dir.x),abs(dir.y))+max((a+b+c+d)*.03,.008)),-2.,2.);
      vec4 A=.5*(at(p+dir*(1./3.-.5))+at(p+dir*(2./3.-.5))),B=.5*A+.25*(at(p-dir*.5)+at(p+dir*.5));
      float l=lum(B);
      o=l<lo||l>hi?A:B;
    }
  }
  o.rgb=min(o.rgb,vec3(o.a));
  float n=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))));o.rgb+=(n-.5)/255.*o.a;}`,ha=e=>Math.round(e*5)/5,ga=e=>Math.round(e*1e4)/1e4,_a=new Set([`cx`,`cy`,`hw`,`hh`,`ax`,`ay`,`bx`,`by`,`x`,`y`,`w`,`h`,`spread`,`r`]),va=0,ya=0,ba=e=>{va=Math.imul(va^e,2654435761),va^=va>>>15,ya=Math.imul(ya^e,2246822519),ya^=ya>>>13},xa=new Map,Sa=e=>{let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return t},Ca=(e,t)=>{let n=t===`key`?`k\0`+e:e,r=xa.get(n);return r===void 0&&xa.set(n,r=Sa(t===`key`?e.replace(/\d+\.\d+/g,e=>+e>=10?ha(+e):ga(+e)):e)),r},wa=(e,t)=>{switch(typeof e){case`number`:return ba(_a.has(t)?Math.round(e*5):Math.round(e*1e4));case`string`:return ba(Ca(e,t));case`boolean`:return ba(e?3:5);case`object`:break;default:return ba(7)}if(e===null||e.nodeType)return ba(11);if(Array.isArray(e)||ArrayBuffer.isView(e)){ba(13);for(let t=0;t<e.length;t++)wa(e[t],``);return ba(17)}ba(19);for(let t in e)t!==`seed`&&(ba(Ca(t,``)),t===`source`?(ba(e[t]?.width??0),ba(e[t]?.height??0)):wa(e[t],t));ba(23)},Ta=(e,t,n)=>(va=305419896,ya=2596069104,ba(Math.round(t*5)),ba(Math.round(n*5)),wa(e,``),(va>>>0).toString(36)+(ya>>>0).toString(36)),Ea=e=>[e.seed*73.1%997,e.seed*41.7%991,e.prints,e.dust,e.scuff,e.haze,e.grime],Da=(e,t)=>e+`|`+Math.max(2,1.5*t),Oa=class extends Si{constructor(e,t={}){super(e,{cell:400,page:`rgb(255, 255, 255)`},{...t,clear:!0,bake:0,close:!1}),this.placeAll([]),this.plates=new Map,this.due=new Set,this.seated=new Set,this.rows=[],this.spare=[],this.freeG=[],this.freeSlot=[],this.resolveSeat=K(this.gl,da),this.outSeat=K(this.gl,ma),this.stillOut=K(this.gl,pa),this.glowGrab=K(this.gl,fa);for(let e of this.reads??[])e.take(null);this.reads=[],this.seatRoom=2e6,this.glowDirty=new Set,this.glowToRead=new Set,this.glowBack=null,this.keyOf=new WeakMap,this.stats.seats={frames:0,copies:0,ms:0,copyMs:0,why:{},drawn:0},this.stats.stage={frames:0,whole:0,ms:0},this.onStage=null,this.drawings=new Map,this.fieldSets=new Map,this.building=new Map,this.held=new Map,this.seatMs=Wi,this.stirred=this.scrolled=0,addEventListener(`scroll`,()=>{this.stirred=this.scrolled=performance.now()},{passive:!0,capture:!0}),addEventListener(`pointermove`,()=>{this.stirred=performance.now()},{passive:!0}),this.canvasOf=new WeakMap,this.watchedTurns=new WeakSet;let n=(e,t)=>new IntersectionObserver(t=>{let n=!1;for(let r of t){let t=this.canvasOf.get(r.target);t&&(t[e]=r.isIntersecting,n||=t[e]&&this.due.has(t))}n&&this.onBack?.()},{rootMargin:t});this.seen=n(`seen`,`${Yi} 0px`),this.inView=n(`inView`,`0px`)}hold(e){e!==this.black&&this.held.set(e,(this.held.get(e)??0)+1)}unhold(e){if(e===this.black)return;let t=(this.held.get(e)??1)-1;if(t>0)return void this.held.set(e,t);this.held.delete(e),this.gl.deleteTexture(e)}letGo(e){if(--e.refs>0)return;this.drawings.delete(e.key);let t=this.gl;e.c&&(t.deleteTexture(e.box),t.deleteTexture(e.c.tex),e.c.blk&&t.deleteTexture(e.c.blk),e.c.rowsTex&&t.deleteTexture(e.c.rowsTex)),this.unhold(e.mask),this.letFieldsGo(e.own)}letFieldsGo(e){--e.refs>0||(this.fieldSets.delete(e.id),this.gl.deleteTexture(e.texture))}fieldsFor(e,t,n,r){let i=Da(t,n),a=this.fieldSets.get(i);if(a)return a.refs++,a;let o=r?.refs===1&&r.own.refs===1?r.own:null,s=this.ownFields(e,n,o);return s===o?(this.fieldSets.delete(o.id),o.refs++):s.refs=1,s.id=i,this.fieldSets.set(i,s),s}stateOf(e){return this.plates.get(e)??this.plates.set(e,{plate:e,slot:null,seat:null,g:null,stale:[],count:0,frames:0}).get(e)}paintPlate(e,t,n){let r=this.stateOf(e),i=r.arriving;if(!i&&r.slot!=null)return this.paintNow(e,t,n);let a=e.spec,o=[...ln({commands:t.commands,device:{x:a.x,y:a.y,w:a.w,h:a.h},cw:a.cw,ch:a.ch}).values()],s=Da(o.map(e=>e.key).sort().join(`
`),a.pw/a.cw);if(!i&&(!o.length||this.fieldSets.has(s)))return this.paintNow(e,t,n);let c=n?this.pictures(n,1,[],null,[a.pw,a.ph]).mask:null;c&&i?.print&&this.gl.deleteTexture(i.print);let l=r.arriving={job:{...t,partial:!1,moved:null,coloured:null,pictures:null},print:c??i?.print??null,light:i?.light??null,id:s};if(i&&i.id!==s&&this.building.get(i.id)?.waiting.delete(r),this.fieldSets.has(s))return this.land(r);let u=this.building.get(s);return u||this.building.set(s,u={id:s,waiting:new Set,fence:null,r:Math.max(2,1.5*a.pw/a.cw),run:this.gpuFields.paced(o.map(e=>({key:e.key,shape:e.shape})),{steps:!1,r:Math.max(2,1.5*a.pw/a.cw),room:1024,paced:!0})}),u.waiting.add(r),l}land(e){let{job:t,print:n,light:r}=e.arriving;e.arriving=null,this.paintNow(e.plate,t,n),r&&this.lightPlate(...r),this.relight?.()}arrive(e){if(!this.building.size)return;let t=this.gl,n=e-this.stirred<Ki?Ji:qi,r=e=>[...e.waiting].some(e=>{let t=e.plate.spec.el?.getBoundingClientRect();return t&&t.bottom>0&&t.top<innerHeight}),i=null,a=()=>{let e=[...this.building.values()];return e.length>1?e.find(r)??e[0]:e[0]};for(;(i=a())&&performance.now()-e<n;){if(i.fence){if(!ur(t,i.fence))break;i.fence=null}let{value:e,done:n}=i.run.next();if(!n){i.fence=e??null;continue}this.building.delete(i.id);let{texture:r,bytes:a,placed:o,room:s}=e,c={texture:r,bytes:a,placed:o,room:s,r:i.r,place:()=>o,refs:0,id:i.id};this.fieldSets.set(i.id,c);for(let e of i.waiting)this.land(e);c.refs||(this.fieldSets.delete(i.id),t.deleteTexture(r))}this.gpuFields.rest()}paintNow(e,{commands:t,partial:n,moved:r,coloured:i,pictures:a},o){this.glowDirty.add(e);let s=this.gl,c=this.stateOf(e),l=e.spec,u=c.painted;c.painted=!0;let d=performance.now();c.seat&&c.seat.pw*c.seat.ph*4>this.canvas.width*this.canvas.height&&n&&d-(c.paintedAt??-1e9)<1e3&&(c.crowded=!0),c.paintedAt=d;let f=c.slot==null?null:this.kinds[c.slot],p=f&&n&&!r?.length?this.freshScreens(f,a,i):null;if(p){s.bindTexture(s.TEXTURE_2D,f.scr);for(let e of p)s.texSubImage2D(s.TEXTURE_2D,0,e.x,0,s.RGBA,s.UNSIGNED_BYTE,e.img);if(c.seat&&!c.on){c.painted=u,c.pics??=new Map;for(let e of p)c.pics.set(e.img,e);c.changedAt=d,this.emitting(c,p,i);return}let e=p.map(({c:{shape:e}})=>({x:e.cx-e.hw,y:e.cy-e.hh,w:2*e.hw,h:2*e.hh}));for(let t of e)this.stale(c,`picture`,t);c.on&&this.repainted(c,e);return}c.slot??(c.slot=this.freeSlot.pop()??this.rowsN++,this.roomForRows(),this.order=Array.from({length:this.rowsN},(e,t)=>t));let m={commands:t,device:{x:l.x,y:l.y,w:l.w,h:l.h},cw:l.cw,ch:l.ch},h=[...ln(m).values()],g=h.map(e=>e.key).sort().join(`
`),_=t.filter(e=>e.op===`screen`&&e.source?.width).map(e=>({c:e,img:e.source,w:e.source.width,h:e.source.height})),v=o?`${e.spec.pw}x${e.spec.ph}|${l.el?.textContent??``}`:f?.print??``,y=n&&f?.D?.refs===1&&!o?`own${this.owned=(this.owned??0)+1}`:v+`
`+(l.el?.getAttribute(`seed`)??``)+`
`+Ta(t,l.cw,l.ch),b=this.drawings.get(y);b&&o instanceof WebGLTexture&&s.deleteTexture(o);let x=this.pictures(b?null:o,o?e.spec.pw/l.cw:1,_,f,[e.spec.pw,e.spec.ph]);if(b)b.refs++,f?.D&&this.letGo(f.D);else{let t=l.pw/l.cw,n=this.fieldsFor(h,g,t,f?.D),r=f?.D?.refs===1?f.D:null,i=un(s,m,{fields:n,fieldMost:this.o.fieldMost??8,fieldBudget:this.o.fieldBudget??1024,into:r?.c??null,peak:l.body?e.peak:0}),a=r&&r.c.n===i.n?r.box:null;a?s.bindTexture(s.TEXTURE_2D,a):(a=s.createTexture(),s.bindTexture(s.TEXTURE_2D,a),s.texStorage2D(s.TEXTURE_2D,1,s.RGBA32F,Math.max(i.n,1),1),dn(s)),i.n&&s.texSubImage2D(s.TEXTURE_2D,0,0,0,i.n,1,s.RGBA,s.FLOAT,new Float32Array(i.boxes.flat()));let c=o?x.mask:f?.D?.mask??x.mask,u=o?x.maskR:f?.D?.maskR??x.maskR;this.hold(c),b={key:y,refs:1,c:i,box:a,own:n,sig:g,mask:c,maskR:u},this.drawings.set(y,b),r&&(r.c.tex!==i.tex&&s.deleteTexture(r.c.tex),r.c.blk!==i.blk&&s.deleteTexture(r.c.blk),r.c.rowsTex&&s.deleteTexture(r.c.rowsTex),r.box!==a&&s.deleteTexture(r.box),r.c=null,r.box=null),f?.D&&this.letGo(f.D)}f&&f.scr!==x.scr&&f.scr!==this.black&&s.deleteTexture(f.scr),this.kinds[c.slot]={name:``,k:{commands:t,cw:l.cw,ch:l.ch,device:m.device},D:b,print:v,c:b.c,box:b.box,lighting:f?.lighting??0,layer:0,rise:0,tall:b.c.peak,...x,mask:b.mask,maskR:b.maskR,own:b.own,sig:g};let{c:S}=b,C=this.devRows,w=c.slot*X*4;C.set(S.extent,w+32),C.set([0,0,0,S.peak],w+40),C.fill(0,w+li*4,w+X*4),C.set([S.panes.length/18,+!!S.glows],w+li*4),C.set(fi(S.panes,0),w+(li+1)*4),this.fieldKeys[c.slot]=new Map(h.map(e=>[e.key,e.key]));let T=n?[...r??[],...i??[]]:null;if(n||(c.count=c.step=0),this.dropHolds(c,T),!T?.length)this.stale(c,`shape`,null);else{for(let e of r??[])this.stale(c,`shape`,e);for(let e of i??[])this.stale(c,`colour`,e)}if(c.on&&this.repainted(c,T),n&&c.seat&&a?.length){let e=this.kinds[c.slot].screens.filter(e=>a.some(t=>t.source===e.img));c.pics??=new Map;for(let t of e)c.pics.set(t.img,t);this.emitting(c,e,i)}}freshScreens(e,t,n){if(!e.screens?.length||!t?.length)return null;let r=e.screens.filter(e=>t.some(t=>t.source===e.img));if(r.length!==t.length||r.some(e=>e.img.width!==e.w||e.img.height!==e.h))return null;let i=({x:e,y:t,w:n,h:r},{c:{shape:i}})=>Math.abs(e+n/2-i.cx)<i.hw&&Math.abs(t+r/2-i.cy)<i.hh;return(n??[]).every(e=>r.some(t=>i(e,t)))?r:null}emitting(e,t,n){let r=({x:e,y:t,w:n,h:r},i)=>Math.abs(e+n/2-i.cx)<i.hw&&Math.abs(t+r/2-i.cy)<i.hh;for(let e of t)e.glowOnly=!(n??[]).some(t=>r(t,e.c.shape))}dropHolds(e,t){if(e.holds)for(let[n,r]of e.holds){let i=r.shape;(!t?.length||t.some(e=>e.x<i.cx+i.hw+32&&e.x+e.w>i.cx-i.hw-32&&e.y<i.cy+i.hh+32&&e.y+e.h>i.cy-i.hh-32))&&(this.freeHold(r),e.holds.delete(n))}}freeHold(e){let t=this.gl;e.t.forEach(e=>t.deleteTexture(e)),t.deleteFramebuffer(e.fbo)}screenRect(e,t){let n=e.seat,r=n.pw/e.plate.spec.cw,i=t.c.shape,a=t.glowOnly?32:0;return[Math.max(Math.floor(n.x+(i.cx-i.hw-a)*r),n.x),Math.max(Math.floor(n.y+(i.cy-i.hh-a)*r),n.y),Math.min(Math.ceil(n.x+(i.cx+i.hw+a)*r),n.x+n.pw),Math.min(Math.ceil(n.y+(i.cy+i.hh+a)*r),n.y+n.ph)]}holdFor(e,t,n,r){let i=this.gl,a=e.holds??=new Map,o=a.get(t.img);if(o&&(o.w!==n||o.h!==r)&&(this.freeHold(o),o=null),o)return o;let s=[0,1,2].map(()=>q(i,n,r,i.RGBA16F)),c=i.createFramebuffer();return i.bindFramebuffer(i.FRAMEBUFFER,c),s.forEach((e,t)=>i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+t,i.TEXTURE_2D,e,0)),o={t:s,fbo:c,w:n,h:r,n:0,shape:t.c.shape},a.set(t.img,o),o}screensFrame(e){let t=[...this.seated].filter(e=>e.pics?.size);if(!t.length)return!1;let n=this.gl,r=this.canvas.width,i=this.canvas.height,a=this.o.skip,o=[],s=[0,0];this.seatJ=s,this.shadeDiv=2,this.live=[];let c=(e,t,o)=>{this.o.skip=new Set([...a??[],...t]),this.lightTo=o;let s=this.render(0,0,1,r,i,e,e,!1);return this.laps.open&&(n.endQuery(this.timer.TIME_ELAPSED_EXT),this.queries.push(this.laps.laps),this.laps.open=!1),s},l=[`gbuffer`,`commands`,`pyramid`,`near`];for(let a of t){let t=!e||a.stale.some(e=>e.all);for(let u of a.pics.values()){let d=this.screenRect(a,u);if(t){let e=u.c.shape;this.stale(a,`picture`,{x:e.cx-e.hw,y:e.cy-e.hh,w:2*e.hw,h:2*e.hh});continue}if(!u.glowOnly){let t=c(d,[`shadow`],null);this.gather(t,e,[{S:a,work:d}],s,r,i,!0),o.push([a,d]);continue}let f=this.holdFor(a,u,d[2]-d[0],d[3]-d[1]),p=[d[0],i-d[3]],m=f.n++;m<ra&&(this.shadeAt=[m%2,m>>1],c(d,[],{kind:`hold`,fbo:f.fbo,buffers:[0,1,2].map(e=>n.COLOR_ATTACHMENT0+e),w:f.w,h:f.h,whole:!0,off:p,once:()=>{if(!m)for(let e=0;e<3;e++)n.clearBufferfv(n.COLOR,e,[0,0,0,0]);n.enable(n.BLEND),n.blendColor(0,0,0,1/(m+1)),n.blendFunc(n.CONSTANT_ALPHA,n.ONE_MINUS_CONSTANT_ALPHA)},begin:e=>n.uniform2f(e.uFc,...p)})),c(d,m<ra?[...l,`shadow`]:[`shadow`],{kind:`emit`,fbo:e.f[a.side??0],buffers:[n.COLOR_ATTACHMENT0],w:r,h:i,begin:e=>{n.uniform2f(e.uFc,...p),f.t.forEach((t,n)=>this.bind(e[`tHold${n}`],4+n,t))}}),o.push([a,d])}a.pics.clear()}return this.o.skip=a,this.lightTo=null,o.length&&this.copyOut(o,r,i),this.stats.seats.screens=(this.stats.seats.screens??0)+o.length,!0}stale(e,t,n){if(!e.seat)return null;let r=this.stats.seats.why;return r[t]=(r[t]??0)+1,Ni(e.stale,t,n,[e.plate.spec.cw,e.plate.spec.ch,this.kinds[e.slot]?.c.peak??0],oa(e.U))}whole(e){let t=e.ctx?.canvas,n=e.seat;return!!t&&!!n&&e.wholeOn===t&&t.width===n.pw&&t.height===n.ph}inWindow(e,t){let n=e.seat,r=n.pw/e.plate.spec.cw;return[Math.max(Math.floor(n.x+t[0]*r),n.x),Math.max(Math.floor(n.y+t[1]*r),n.y),Math.min(Math.ceil(n.x+t[2]*r),n.x+n.pw),Math.min(Math.ceil(n.y+t[3]*r),n.y+n.ph)]}shownOf(e,t){let n=e.ctx?.canvas.getBoundingClientRect();if(!n?.width)return t;let r=e.plate.spec.cw/n.width,i=Bi;return[Math.max(t[0],(-n.left-i)*r),Math.max(t[1],(-n.top-i)*r),Math.min(t[2],(innerWidth-n.left+i)*r),Math.min(t[3],(innerHeight-n.top+i)*r)]}geoIn(e,t){let n=e.seat;return n.unclear?(n.unclear=!1,[Math.max(n.x-Ii,0),Math.max(n.y-Ii,0),n.x+Math.max(n.w,n.pw)+Ii,n.y+Math.max(n.h,n.ph)+Ii]):this.inWindow(e,t)}closePlate(e){let t=this.plates.get(e);if(!t)return;t.arriving&&=(this.building.get(t.arriving.id)?.waiting.delete(t),t.arriving.print&&this.gl.deleteTexture(t.arriving.print),null),t.ctx&&(this.seen.unobserve(t.ctx.canvas),this.inView.unobserve(t.ctx.canvas)),this.dropHolds(t,null),this.unseat(t),this.offStage(t);let n=t.slot!=null&&this.kinds[t.slot];n&&(this.letGo(n.D),n.scr!==this.black&&this.gl.deleteTexture(n.scr)),t.slot!=null&&(this.kinds[t.slot]=void 0,this.freeSlot.push(t.slot)),this.due.delete(t),this.glowDirty.delete(t.plate),t.glow&&(this.glowToRead.delete(t.glow),this.gl.deleteTexture(t.glow.tex),this.gl.deleteFramebuffer(t.glow.fbo)),this.plates.delete(e)}lightPlate(e,t,n,r){let{plate:i,ctx:a,shown:o=1,d:s,cards:c}=e,l=this.stateOf(i),u=i.spec,d=this.kinds[l.slot];if(l.arriving){l.arriving.light=[e,t,n,r??l.arriving.light?.[3]];return}if(!d)return;if(!t.uKey)throw Error(`A light pass set nothing the raster could read`);let f=c&&s?.faces?s.front??s:null,p=!!f?.faces.length&&f.turning,m=(f?.showing??f)===s;if(l.passedBy=!!f?.faces.length&&!!s.facing&&s.facing!==`back`&&!m,f?.faces.length&&l.drawn&&(l.passedBy||!l.half&&!l.blurred&&(p||!m))){l.parked=!0,this.watchTurn(f),r?.();return}l.parked=!1;let h=!l.U||t.uKey.some((e,t)=>Math.abs(e-l.U.uKey[t])>.001)||t.uCam.some((e,t)=>Math.abs(e-l.U.uCam[t])>.001);if(h&&l.U&&!p&&!e.sizing){let e=performance.now();e-(l.lampAt??-1e9)<Zi&&l.lightOwed&&(l.crowded=!0),l.lampAt=e,l.lightOwed=!0}l.half=!l.crowded&&!e.sizing&&!l.drawn&&i.seat.pw*i.seat.ph>$i;let g=l.crowded||e.sizing;i.rough=!!e.sizing&&!l.crowded;let _=g?Math.min(2**(Math.ceil(2*Math.log2(Math.max(o,1/16)))/2),1):l.half?.5:1,v=Math.ceil(i.seat.pw*_),y=Math.ceil(i.seat.ph*_),b=this.lightingOf(n),x=this.devRows,S=l.slot*X*4;x.set([u.cw,u.ch,b,d.c.peak],S),x.set([t.uKey[0],t.uKey[1],t.uKey[2],t.uLift??0],S+4),x.set([t.uCam[0],t.uCam[1],t.uCam[2],t.uLamp],S+8),x.set(t.uBody,S+12),x.set(t.uFrame??[0,0,u.cw,u.ch],S+16),x.set([...t.uRoomColor,t.uLampSoft],S+20),x.set([...t.uSky??[0,0,1],t.uLampHead],S+24),x.set([t.uFill,t.uRoom,t.uPageShade,0],S+28),x.fill(0,S+36,S+40),t.uCondition=Ea(u);let C=l.painted,w=l.on;if(l.painted=!1,pi(x,S,t),this.uploadRows([l.slot]),d.lighting=b,!a&&this.onStage){this.unseat(l),this.due.delete(l),l.on??=!0,l.U=t,i.picture??={tex:null,fbo:null,pw:u.pw,ph:u.ph,box:[]},i.picture.pw=u.pw,i.picture.ph=u.ph,i.picture.box=[u.x,u.y,u.cw,u.ch,u.w],l.g!=null&&l.placed&&this.repainted(l,null),r?.();return}this.offStage(l);let T=!w&&!!l.U&&l.ctx===a&&l.want?.[0]===v&&l.want[1]===y&&sa(t,l.U);if(T&&!C){this.due.has(l)||l.seat&&(l.stale.length||l.pics?.size)?l.lit=r??l.lit:r?.();return}let E=!T&&l.U&&l.seat&&l.want?.[0]===v&&l.want[1]===y&&l.ctx===a&&!w,D=E&&sa(t,l.U,ia),O=s?.flashBox??null;if(s&&(s.flashBox=null),D&&!O&&!s?.lightBox&&!C){l.U=t,this.due.has(l)||l.seat&&(l.stale.length||l.pics?.size)?l.lit=r??l.lit:r?.();return}let k=E&&t.uDebug===l.U.uDebug&&t.uSplit===l.U.uSplit?s?.lightBox??(D?O:null):null;if(k)this.stale(l,`light`,k),this.dropHolds(l,[k]);else if(!T&&!D){this.dropHolds(l,null);let e=t.uTorch?.[3]>0||t.uSpin?.[1]>0||l.U?.uSpin?.[1]>0||l.U?.uTorch?.[3]>0||l.U&&[...ia].some(e=>!sa({[e]:t[e]},{[e]:l.U[e]})),n=this.stale(l,`light`,null);n&&(n.lamp=!!l.U&&h&&!e&&n.why.size===1);let r=t.uKey,i=l.U?.uKey,a=!!i&&!t.uCam.some((e,t)=>Math.abs(e-l.U.uCam[t])>.001)&&r[0]*i[0]+r[1]*i[1]+r[2]*i[2]>=Qi*Math.hypot(...r)*Math.hypot(...i);n&&(l.count=a&&(h||e)?Math.min(l.count,1):0),n&&(n.carried=l.count>0),n&&!l.count&&(l.step=0)}l.ctx!==a&&(l.ctx&&(this.seen.unobserve(l.ctx.canvas),this.inView.unobserve(l.ctx.canvas)),a&&(this.canvasOf.set(a.canvas,l),this.seen.observe(a.canvas),this.inView.observe(a.canvas))),l.changedAt=performance.now(),l.U=t,l.ctx=a,l.want=[v,y],l.lit=r??l.lit,l.drawn&&!l.seat&&(l.behind=!0),l.drawn&&l.shape&&l.shape!==`${u.cw}x${u.ch}`&&(l.wrong=!0),this.due.add(l)}watchTurn(e){this.watchedTurns.has(e)||(this.watchedTurns.add(e),new MutationObserver(()=>{for(let t of[e,...e.faces])this.plates.get(t.plate)?.parked&&(t.lightDirty=!0,t.lightBox=null);this.relight?.()}).observe(e.el,{attributes:!0,attributeFilter:[`data-turning`]}))}lightingOf({lighting:e,tilt:t}){let n=this.keyOf.get(e);n||this.keyOf.set(e,n=JSON.stringify(e));let r=n+`|`+t,i=this.lightings.findIndex(e=>e.key===r);return i<0&&(i=this.lightings.push({key:r,lighting:e,tilt:t,...this.rooms.for(structuredClone(e),t)})-1),i}take(e,t){let n=this.canvas.width,r=this.canvas.height,i=this.spare.findIndex(n=>n.w>=e&&n.h>=t&&n.w<2*e&&n.h<2*t);return i>=0?this.spare.splice(i,1)[0]:Ri(this.rows,e,t,n,r)}unseat(e){e.seat&&(this.spare.push(e.seat),e.seat=null,this.seated.delete(e),e.g!=null&&(this.instances[e.g].hidden=!0,this.freeG.push(e.g),e.g=null),this.seated.size||(this.rows=[],this.spare=[]))}seatIt(e){let[t,n]=e.want;if(e.seat&&e.seat.pw===t&&e.seat.ph===n)return!0;this.unseat(e);let r=this.take(t,n);if(!r)return!1;e.seat=Object.assign(r,{pw:t,ph:n,unclear:!0}),e.count=0,e.step=0,e.sat=0,e.frames=0,e.stale=[],this.stale(e,`seat`,null),this.dropHolds(e,null),e.pics?.clear(),this.seated.add(e);let i=e.g=this.freeG.pop()??this.instances.length,a=e.plate.spec;this.instances[i]={kind:e.slot,hidden:!1,x:r.x,y:r.y,s:t/a.cw,cell:[r.x,r.y],cw:t,ch:n,layer:0,up:null,plates:[i]};let o=this.gl;return o.bindTexture(o.TEXTURE_2D,this.tInst),o.texSubImage2D(o.TEXTURE_2D,0,i%ca,Math.floor(i/ca),1,1,o.RGBA,o.FLOAT,new Float32Array([r.x,r.y,t/a.cw,e.slot])),!0}roomFor(e,t){let n=this.gl,r=this.canvas,i=n.getParameter(n.MAX_TEXTURE_SIZE),a=performance.now();if(e<=r.width&&t<=r.height)return;let o=[...this.due,...this.seated].filter(e=>aa(e)),s=a-(this.sizedAt??-1e9)>na,c=Math.max(e,...o.map(e=>e.want[0]),s?0:r.width),l=Math.max(t,...o.map(e=>e.want[1]),s?0:r.height);c>r.width&&(c=Math.max(c,r.width*1.25)),l>r.height&&(l=Math.max(l,r.height*1.25)),this.sizeTo(Math.min(i,256*Math.ceil(c/256)),Math.min(i,256*Math.ceil(l/256)))}roomOnlyFor(e){if(performance.now()-(this.sizedAt??-1e9)<na)return;let t=this.canvas,n=256*Math.ceil(Math.max(...e.map(e=>e.want[0]))/256),r=256*Math.ceil(Math.max(...e.map(e=>e.want[1]))/256);e.length&&!this.onStage&&t.width*t.height>=1.5*n*r&&this.sizeTo(n,r)}sizeTo(e,t){let n=this.canvas;n.width=e,n.height=t,this.sizedAt=performance.now(),this.onStage&&(this.fitCanvas(),this.kept&&(this.onStage.left=Math.max(this.onStage.left,1)));for(let e of[...this.seated])this.unseat(e),this.due.add(e);this.rows=[],this.spare=[],this.keptSeats=null,this.dropTargets(0)}dropTargets(e){let t=performance.now(),n=this.onStage,r=n&&`${n.w}x${n.h}`,i=this.seated.size?`${this.canvas.width}x${this.canvas.height}`:null;for(let[n,a]of this.sets??[])n!==r&&n!==i&&t-a.usedAt>=e&&(this.free(a),this.sets.delete(n));this.bytes=[...this.sets?.values()??[]].reduce((e,t)=>e+t.bytes,0),e&&!this.seated.size&&(this.seatKept&&=([...this.seatKept.t,this.seatKept.step].forEach(e=>this.gl.deleteTexture(e)),this.seatKept.f.forEach(e=>this.gl.deleteFramebuffer(e)),this.keptSeats=null))}owing(){return[...this.plates.values()].filter(e=>e.stale.length||this.due.has(e)&&aa(e)).map(e=>({id:e.plate.spec.el?.id,due:this.due.has(e),inView:e.inView,drawn:!!e.drawn,stale:e.stale.map(e=>({box:e.box.map(Math.round),left:e.left,why:[...e.why]}))}))}leave(e,t){for(let n of[...this.seated])!n.stale.length&&e-(n.changedAt??-1e9)>t&&(this.thumb(n),this.unseat(n))}resting(){this.resting_||=setTimeout(()=>{this.resting_=null,this.gl.isContextLost()||(this.leave(performance.now(),na),this.dropTargets(na),(this.seated.size||this.sets?.size>+!!this.onStage||this.seatKept)&&this.resting())},na/3)}run(){let e=performance.now(),t=this.gl;this.resting(),this.measure();let n=[...this.due].some(e=>e.wrong&&e.inView);if(this.seatFence){if(t.clientWaitSync(this.seatFence,0,0)===t.TIMEOUT_EXPIRED){if(this.seatMs=Math.max(this.seatMs*.9,2),this.msPerMP||(this.seatRoom=Math.max(this.seatRoom*.85,Hi)),!n)return!1}else this.seatMs=Math.min(this.seatMs*1.02,Wi),this.msPerMP||(this.seatRoom=e-this.seatAt<22?Math.min(this.seatRoom*1.1,Ui):Math.max(this.seatRoom*.8,Hi));t.deleteSync(this.seatFence),this.seatFence=null}this.arrive(e),this.msPerMP&&(this.seatRoom=Math.min(Math.max(Math.min(this.seatMs,e-this.stirred<Ki?Gi:Wi)/this.msPerMP*1e6,Hi),Ui)),this.seated.size||this.roomOnlyFor([...this.due].filter(e=>aa(e)));for(let e of this.due)aa(e)&&this.roomFor(...e.want);for(let e of[...this.seated])e.stale.length&&!aa(e)&&(this.unseat(e),this.due.add(e));this.leave(e,ta),this.path=`seats`,this.windowSize=null;let r=!1,i=e=>(!e.drawn||e.wrong?0:e.blurred?2:4)+ +!e.inView,a=e=>e.sort((e,t)=>i(e)-i(t));for(let e of a([...this.due]))aa(e)&&(this.seatIt(e)?this.due.delete(e):r=!0);let o=e=>e.inView&&(!e.drawn||e.wrong),s=[...this.due].filter(e=>aa(e)&&(!e.drawn||e.wrong||e.blurred||e.behind&&e.inView)),c=s.some(o)?1:4;if(r&&(s.some(o)||![...this.seated].some(e=>e.stale.length&&e.sat<c))){let e=[...a([...this.due].filter(e=>aa(e))),...[...this.seated].filter(e=>e.stale.length)];for(let e of[...this.seated])this.unseat(e);this.rows=[],this.spare=[];for(let t of e)this.due.delete(t),this.seatIt(t)||this.due.add(t);let n=t=>{let n=[];for(let r of e)Ri(n,r.want[0],r.want[1],t,1/0);return n.reduce((e,t)=>Math.max(e,t.y+t.h),0)},r=Math.max(ea,...e.map(e=>e.want[1])),i=t.getParameter(t.MAX_TEXTURE_SIZE),o=this.canvas.width,s=n(o);if(s>r){let t=Math.min(Li(e.reduce((e,t)=>e+t.want[0]+Ii,0)),i);n(t)<=r&&(o=t,s=n(t))}if(this.due.size&&(s>this.canvas.height||o>this.canvas.width)&&s<=r){this.roomFor(o,s);for(let e of[...this.due])aa(e)&&this.seatIt(e)&&this.due.delete(e)}}this.sparseNow=!1;let l=this.screensFrame(this.keptSeats);for(let e of this.seated)e.lit&&!e.stale.length&&(e.lit(),e.lit=null);let u=[...this.seated].flatMap(e=>{let t=e.stale.find(e=>e.all&&!e.n);return(t?[t]:e.stale).map(t=>{!t.lamp&&t.out&&(t.fresh=ki(t.fresh,t.out),t.out=null);let n=t.lamp&&this.whole(e)?this.shownOf(e,t.box):t.box,r=n[2]>n[0]&&n[3]>n[1]&&n.some((e,n)=>e!==t.box[n]);return{S:e,r:t,cut:r,work:this.inWindow(e,r?n:t.box),sparse:t.lamp&&(this.sparseOf?!!this.sparseOf(e.ctx?.canvas):!!this.sparseLamp)}})});if(!u.length)return this.path=null,l&&this.endFrame(e),l;let d=this.canvas.width,f=this.canvas.height,p=this.seatJ=[0,0],m=this.stats.seats,h=[],g=e=>e.r.lamp,_=e=>e.half&&e.inView;u.sort((e,t)=>(e.r.n||!_(e.S)?1:0)-(t.r.n||!_(t.S)?1:0)||+!!g(t)-!!g(e)||e.r.turn-t.r.turn||+!!t.r.geo-!!e.r.geo);let v=this.keptSeats;if(!v){this.seatKept&&([...this.seatKept.t,this.seatKept.step].forEach(e=>t.deleteTexture(e)),this.seatKept.f.forEach(e=>t.deleteFramebuffer(e)));for(let e of this.seated)e.side=0;v=this.keptSeats=this.seatKept={t:[0,1].map(()=>q(t,d,f,t.RGBA16F)),step:q(t,d,f,t.R8),f:[]},v.t.forEach(e=>{let n=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,n),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT1,t.TEXTURE_2D,v.step,0),v.f.push(n)})}this.shadeDiv=2;let y=Fi(u,this.seatRoom,e-this.scrolled<Ki);for(let e of new Set(y.flatMap(e=>e.items.map(e=>e.S)))){let t=t=>t.S===e&&(!t.r.n||t.r.geo||t.r.fresh),n=y.flatMap(e=>e.items).filter(t).length;n&&n<u.filter(t).length&&(m.parted=(m.parted??0)+1)}for(let e of y){this.live=[],e.lampOnly?e.items.some(e=>e.r.geo)||(this.lampStep=((this.lampStep??0)+1)%4):this.lampStep=e.step,this.shadeAt=[this.lampStep%2,this.lampStep>>1],this.sparseNow=e.sparse&&e.lampOnly&&!e.items.some(e=>e.r.geo),this.sparseAt=this.shadeAt;let n=null;for(let{S:t,r}of e.items)if(r.geo){let e=this.geoIn(t,r.geo);n=n?[Math.min(n[0],e[0]),Math.min(n[1],e[1]),Math.max(n[2],e[2]),Math.max(n[3],e[3])]:e}let r=this.render(p[0],p[1],1,d,f,e.box,n??!1,e.lampOnly);this.laps.open&&(t.endQuery(this.timer.TIME_ELAPSED_EXT),this.laps.laps.px=e.sum,this.queries.push(this.laps.laps),this.laps.open=!1),m.drawn+=e.items.reduce((e,t)=>e+(t.work[2]-t.work[0])*(t.work[3]-t.work[1]),0)/(this.sparseNow?4:1);let i=new Map;for(let t of e.items)t.restart=!t.r.lamp&&(!!t.r.lamped||!!t.r.carried&&t.r.n>0);for(let t of e.items){let{S:e,r:n,work:r}=t,a=i.get(e);a?(a.work=[Math.min(a.work[0],r[0]),Math.min(a.work[1],r[1]),Math.max(a.work[2],r[2]),Math.max(a.work[3],r[3])],a.r.all||=n.all&&!t.cut,a.r.lamp&&=n.lamp,a.r.geo||=n.geo,a.r.restart||=t.restart,a.r.since=a.r.since==null?n.since:n.since==null?a.r.since:Math.min(a.r.since,n.since),a.r.fresh=n.fresh?a.r.fresh?[Math.min(a.r.fresh[0],n.fresh[0]),Math.min(a.r.fresh[1],n.fresh[1]),Math.max(a.r.fresh[2],n.fresh[2]),Math.max(a.r.fresh[3],n.fresh[3])]:n.fresh:a.r.fresh):i.set(e,{S:e,work:[...r],r:{all:n.all&&!t.cut,lamp:n.lamp,geo:n.geo,fresh:n.fresh,since:n.since,restart:t.restart}})}this.gather(r,v,[...i.values()],p,d,f,!1);for(let t of e.items){let{S:e,r:n}=t;n.n++,n.left--,n.turn=this.frame,t.cut&&(n.out=ki(n.out,n.box)),e.ctx&&(n.n===1||n.left===0||n.lamp||n.geo||zi.has(n.n))&&h.push([e,t.work]);let r=n.lamp;r?n.lamped=!0:t.restart&&(n.lamped=n.carried=!1,n.left=3,e.count=0),n.since=n.fresh?1:n.since&&n.since+1,n.geo=null,n.fresh=null,n.lamp=!1,e.turn!==this.frame&&(e.turn=this.frame,e.count=r?1:Math.min(e.count+1,32),e.frames++,e.step=r?0:e.step+1,e.sat++,e.drawn=!0,e.wrong=!1,e.shape=`${e.plate.spec.cw}x${e.plate.spec.ch}`,e.sat>=4&&(e.behind=!1)),e.half?(e.half=!1,e.blurred=!0,e.parked=!!e.passedBy,e.want=[e.plate.seat.pw,e.plate.seat.ph],this.due.add(e)):e.blurred&&=!1,e.lit&&=(e.lit(),null)}}this.sparseNow=!1;for(let e of this.seated)e.stale=e.stale.filter(e=>e.left>0),e.stale.length||(e.lightOwed=!1);return this.copyOut(h,d,f),this.endFrame(e),this.onStage&&this.kept&&this.showKept(),!0}endFrame(e){let t=this.gl,n=this.stats.seats;this.frame++,this.frameEnd(),this.seatFence=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0),t.flush(),this.seatAt=performance.now(),n.frames++,n.ms+=performance.now()-e,this.path=null}gather(e,t,n,r,i,a,o){let s=this.gl;s.viewport(0,0,i,a),s.disable(s.BLEND);let c=this.resolveSeat.u;s.useProgram(this.resolveSeat.p),this.bind(c.tLit,0,e.lit),this.bind(c.tG0,2,e.g0),s.uniform2f(c.uWin,i,a),s.uniform2f(c.uJ,...r),s.uniform1i(c.uReach,this.shadeDiv-1),s.uniform1i(c.uSparse,+!!this.sparseNow),s.uniform2i(c.uPh,...this.sparseAt??[0,0]),s.enable(s.SCISSOR_TEST),s.bindVertexArray(this.vao);let l=-1,u=[],d=new Set;for(let e of[0,1])for(let r of n){let{S:n,r:i,work:f}=r;if((n.side??0)!==e||d.has(r))continue;d.add(r),l!==e&&(l=e,s.bindFramebuffer(s.FRAMEBUFFER,t.f[1-e]),s.drawBuffers([s.COLOR_ATTACHMENT0,s.COLOR_ATTACHMENT1]),this.bind(c.tHist,1,t.t[e]));let p=n.seat;i?.all?n.side=1-e:u.push([f,e]),s.scissor(f[0],a-f[3],f[2]-f[0],f[3]-f[1]),s.uniform4i(c.uSeat,p.x,a-p.y-p.ph,p.x+p.pw-1,a-p.y-1);let m=i?.lamp&&n.count>0;s.uniform1f(c.uCount,m?Xi:i?.restart?0:i?.since?Math.min(n.count,i.since):n.count),s.uniform1f(c.uCap,m?Xi:32);let h=i?.fresh&&n.count>0?this.inWindow(n,i.fresh):o?f:null;h?s.uniform4f(c.uMoved,h[0],h[1],h[2],h[3]):s.uniform4f(c.uMoved,1,1,0,0),s.drawArrays(s.TRIANGLES,0,3)}for(let[e,n]of u)s.bindFramebuffer(s.READ_FRAMEBUFFER,t.f[1-n]),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,t.f[n]),s.drawBuffers([s.COLOR_ATTACHMENT0]),s.scissor(e[0],a-e[3],e[2]-e[0],e[3]-e[1]),s.blitFramebuffer(e[0],a-e[3],e[2],a-e[1],e[0],a-e[3],e[2],a-e[1],s.COLOR_BUFFER_BIT,s.NEAREST);s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.bindFramebuffer(s.FRAMEBUFFER,null)}pageLum(){let e=performance.now();if(this.pageAt==null||e-this.pageAt>1e3){this.pageAt=e;let[t,n,r]=getComputedStyle(document.body).backgroundColor.match(/[\d.]+/g).map(Number);this.pageBright=(.299*t+.587*n+.114*r)/255}return this.pageBright}copyOut(e,t,n){let r=this.gl,i=this.keptSeats;r.bindFramebuffer(r.FRAMEBUFFER,null),r.drawBuffers([r.BACK]),r.viewport(0,0,t,n);let a=this.outSeat.u;r.useProgram(this.outSeat.p),r.disable(r.BLEND),r.enable(r.SCISSOR_TEST),r.bindVertexArray(this.vao);for(let o of[0,1]){let s=e.filter(([e])=>(e.side??0)===o);if(s.length){this.bind(a.tStep,1,i.step),this.bind(a.tHist,0,i.t[o]),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.uniform2f(a.uWin,t,n),r.uniform1f(a.uPage,this.pageLum());for(let[e,t]of s){let i=e.seat;Vi(i.pw/e.plate.spec.cw)>1.1?r.uniform4f(a.uSeat,i.x+.5,n-i.y-i.ph+.5,i.x+i.pw-.5,n-i.y-.5):r.uniform4f(a.uSeat,0,0,0,0),r.scissor(t[0],n-t[3],t[2]-t[0],t[3]-t[1]),r.drawArrays(r.TRIANGLES,0,3)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST)}}r.disable(r.SCISSOR_TEST);let o=performance.now();for(let[t,n]of e){let{seat:e,ctx:r}=t;if(!r)continue;(r.canvas.width!==e.pw||r.canvas.height!==e.ph)&&(t.wholeOn=null),r.canvas.width!==e.pw&&(r.canvas.width=e.pw),r.canvas.height!==e.ph&&(r.canvas.height=e.ph);let i=n[0]-e.x,a=n[1]-e.y,o=n[2]-n[0],s=n[3]-n[1];i<=0&&a<=0&&o>=e.pw&&s>=e.ph&&(t.wholeOn=r.canvas),r.globalCompositeOperation=`copy`,r.save(),r.beginPath(),r.rect(i,a,o,s),r.clip(),r.drawImage(this.canvas,n[0],n[1],o,s,i,a,o,s),r.restore(),r.clearRect(e.pw-2,0,2,e.ph),r.clearRect(0,e.ph-2,e.pw,2)}let s=this.stats.seats;s.copies+=e.length,s.copyMs+=performance.now()-o}unsettled(){return this.building.size>0||[...this.due].some(e=>aa(e))||[...this.seated].some(e=>e.stale.length)||this.stageWants()}stageIn(){if(this.onStage)return this.onStage.el;let e=document.createElement(`div`),t=this.canvas;return e.style.overflow=`hidden`,Object.assign(t.style,{position:`absolute`,left:`0`,top:`0`,pointerEvents:`none`}),e.append(t),this.onStage={el:e,view:null,left:0,changed:!0},this.fitCanvas(),e}stageOut(){if(this.onStage){for(let e of this.plates.values())this.offStage(e);this.onStage.el.remove(),this.canvas.remove(),this.onStage=null}}fitCanvas(){let e=this.canvas,t=this.o.dpr??devicePixelRatio;e.style.width=`${e.width/t}px`,e.style.height=`${e.height/t}px`}offStage(e){if(e.on){if(e.on=!1,e.placed=!1,e.plate.picture=null,e.g!=null){let t=this.instances[e.g];this.onStage&&!t.hidden&&this.changed(t,[{x:0,y:0,w:this.kinds[t.kind]?.k.cw??0,h:this.kinds[t.kind]?.k.ch??0}],this.kinds[t.kind]?.tall??0),t.hidden=!0,t.staged=!1,this.freeG.push(e.g),e.g=null}this.onStage&&(this.onStage.changed=!0)}}repainted(e,t){let n=this.onStage;if(!n||e.g==null)return;let r=this.instances[e.g],{cw:i,ch:a}=e.plate.spec;this.changed(r,t?.length?t:[{x:0,y:0,w:i,h:a}],this.kinds[e.slot].tall),n.moved=!0}show(e,t,n,r,i,a){let o=this.onStage;if(!o)return;let s=o.el.parentElement,c=s.getBoundingClientRect(),l=s.offsetWidth?c.width/s.offsetWidth:1,u=this.gl,d=o.shown??new Set,f=new Set,p=[];for(let{plate:t,x:n,y:r,w:o}of e){let e=this.plates.get(t);if(!e||e.slot==null||!this.kinds[e.slot])continue;let s=this.kinds[e.slot],d=(n+i-c.left)/l,m=(r+a-c.top)/l,h=o/s.k.cw/l;e.g??(e.g=this.freeG.pop()??this.instances.length,this.roomForInstances(),this.instances[e.g]={kind:e.slot,staged:!0,hidden:!0,x:NaN,y:NaN,s:0,cell:[0,0],layer:0,up:null,plates:[e.g]});let g=this.instances[e.g];f.add(g),(g.hidden||Math.abs(g.x-d)>.001||Math.abs(g.y-m)>.001||Math.abs(g.s-h)>1e-6||g.kind!==e.slot)&&(g.hidden||this.changed(g,[{x:0,y:0,w:this.kinds[g.kind]?.k.cw??0,h:this.kinds[g.kind]?.k.ch??0}],this.kinds[g.kind]?.tall??0),Object.assign(g,{kind:e.slot,hidden:!1,staged:!0,x:d,y:m,s:h,cell:[d,m],cw:s.k.cw*h,ch:s.k.ch*h}),u.bindTexture(u.TEXTURE_2D,this.tInst),u.texSubImage2D(u.TEXTURE_2D,0,e.g%ca,Math.floor(e.g/ca),1,1,u.RGBA,u.FLOAT,new Float32Array([d,m,h,e.slot])),e.placed=!0,p.push(g))}for(let e of d)f.has(e)||(e.hidden=!0,p.push(e));o.shown=f;let m={zoom:l,x:(i-c.left)/l,y:(a-c.top)/l},h=o.view,g=Math.max(Math.round(t*r),1),_=Math.max(Math.round(n*r),1);if(this.roomFor(g,_),!h||h.zoom!==m.zoom||h.x!==m.x||h.y!==m.y||o.w!==g||o.h!==_)o.left=la;else if(p.length){for(let e of p)this.changed(e,[{x:0,y:0,w:this.kinds[e.kind]?.k.cw??0,h:this.kinds[e.kind]?.k.ch??0}],this.kinds[e.kind]?.tall??0);o.moved=!0}o.view=m,o.w=g,o.h=_,o.corner=[i,a];let v=e.map(({plate:e})=>this.plates.get(e)?.slot).filter(e=>e!=null);if(v.length!==o.order?.length||v.some((e,t)=>e!==o.order[t])){let t=o.order??[],n=new Map(t.map((e,t)=>[e,t])),r=new Map,i=e=>{let t=r.get(e);return t&&[t.x,t.y,t.x+t.cw,t.y+t.ch]};for(let{plate:t}of e){let e=this.plates.get(t);e?.g!=null&&r.set(e.slot,this.instances[e.g])}let a=v.filter(e=>n.has(e));for(let e=0;e<a.length;e++)for(let t=e+1;t<a.length;t++){if(n.get(a[e])<n.get(a[t]))continue;let s=i(a[e]),c=i(a[t]);if(s&&c&&s[0]<c[2]&&c[0]<s[2]&&s[1]<c[3]&&c[1]<s[3]){for(let n of[a[e],a[t]]){let e=r.get(n);this.changed(e,[{x:0,y:0,w:this.kinds[e.kind]?.k.cw??0,h:this.kinds[e.kind]?.k.ch??0}],this.kinds[e.kind]?.tall??0)}o.moved=!0}}o.order=v;let s=new Set(v);this.order=[...v,...Array.from({length:this.rowsN},(e,t)=>t).filter(e=>!s.has(e))]}o.ratio=r,this.drawStage()}stillBox(e){let t=this.plates.get(e),n=this.onStage,r=e.picture?.box,i=t?.g==null?null:this.instances[t.g];if(!n?.view||!i||!r)return null;let a=n.view.zoom*n.ratio,o=Math.round((i.x-n.view.x)*a),s=Math.round((i.y-n.view.y)*a),c=Math.ceil(r[2]*i.s*a),l=Math.ceil(r[3]*i.s*a),u=Math.max(o,0),d=Math.max(s,0),f=Math.min(o+c,n.w),p=Math.min(s+l,n.h);return f>u&&p>d?{S:t,d:i,k:a,x:o,y:s,w:c,h:l,x0:u,y0:d,x1:f,y1:p}:null}stillRead(e,t,n){let r=this.gl,i=this.onStage,a=this.sets.get(`${i.w}x${i.h}`),o=(a.size[0]-a.win[0])/2,s=e.x1-e.x0,c=e.y1-e.y0,l=e.S,u=i.order,d=u.indexOf(l.slot),f=this.instances.length+2,p=new Uint8Array(1024*Math.ceil(f/1024));p[l.g+1]=255;for(let e of this.plates.values())e.g!=null&&t?.contains(e.plate.spec.el)&&u.indexOf(e.slot)>d&&(p[e.g+1]=255);let m=r.createTexture(),h=q(r,s,c,r.RGBA8),g=q(r,s,c,r.RGBA8),_=r.createFramebuffer();r.bindTexture(r.TEXTURE_2D,m),r.texStorage2D(r.TEXTURE_2D,1,r.R8,1024,p.length/1024),r.pixelStorei(r.UNPACK_ALIGNMENT,1),r.texSubImage2D(r.TEXTURE_2D,0,0,0,1024,p.length/1024,r.RED,r.UNSIGNED_BYTE,p),dn(r),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.readBuffer(r.BACK),r.bindTexture(r.TEXTURE_2D,h),r.copyTexSubImage2D(r.TEXTURE_2D,0,0,0,e.x0,this.canvas.height-e.y1,s,c),r.bindFramebuffer(r.FRAMEBUFFER,_),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,g,0),r.drawBuffers([r.COLOR_ATTACHMENT0]),r.viewport(0,0,s,c),r.disable(r.BLEND),r.disable(r.SCISSOR_TEST);let v=this.stillOut.u;r.useProgram(this.stillOut.p),this.bind(v.tC,0,h),this.bind(v.tKeep,1,m),r.activeTexture(r.TEXTURE2),r.bindTexture(r.TEXTURE_2D_ARRAY,a.ga),r.uniform1i(v.tG,2),r.uniform4i(v.uAt,e.x0,e.y0,i.h,o),r.bindVertexArray(this.vao),r.drawArrays(r.TRIANGLES,0,3),r.readPixels(0,0,s,c,r.RGBA,r.UNSIGNED_BYTE,n??0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteFramebuffer(_),r.deleteTexture(g),r.deleteTexture(h),r.deleteTexture(m)}stillImage({x:e,y:t,w:n,h:r,x0:i,y0:a,x1:o,y1:s},c){let l=(o-i)*4,u=new Uint8ClampedArray(c.buffer,c.byteOffset,c.byteLength);if(i===e&&a===t&&o-i===n&&s-a===r)return new ImageData(u,n,r);let d=new ImageData(n,r);for(let r=0;r<s-a;r++)d.data.set(u.subarray(r*l,r*l+l),((a-t+r)*n+i-e)*4);return d}stillOf(e,t){return new Promise(n=>{(this.stillsAsked??=[]).push({plate:e,among:t,done:n}),this.stillsAsked.length===1&&queueMicrotask(()=>this.stillsRead())})}stillsRead(){let e=this.stillsAsked,t=this.gl;if(this.stillsAsked=[],t.isContextLost()||!this.onStage)return e.forEach(e=>e.done(null));this.drawStage(!0);let n=0;for(let t of e)t.b=this.stillBox(t.plate),t.b&&(t.at=n,n+=(t.b.x1-t.b.x0)*(t.b.y1-t.b.y0)*4);if(!n)return e.forEach(e=>e.done(null));this.readBack(n,()=>{for(let t of e)t.b&&this.stillRead(t.b,t.among,t.at)},t=>{for(let n of e)n.done(t&&n.b&&this.onStage?this.stillImage(n.b,t.subarray(n.at,n.at+(n.b.x1-n.b.x0)*(n.b.y1-n.b.y0)*4)):null)})}stillNow(e){if(!this.onStage)return null;this.drawStage(!0);let t=this.stillBox(e);if(!t)return null;let n=new Uint8Array((t.x1-t.x0)*(t.y1-t.y0)*4);return this.stillRead(t,null,n),this.stillImage(t,n)}roomForInstances(){let e=this.gl,t=Math.ceil((this.instances.length+1)/ca);if(t<=this.instRows)return;let n=new Float32Array(ca*t*4);this.instances.forEach((e,t)=>e&&n.set([e.x,e.y,e.s,e.kind],t*4)),e.deleteTexture(this.tInst),e.deleteTexture(this.tVis),this.tInst=this.tex(ca,t,n),this.tVis=this.tex(ca,t,null,e.R32F),this.instRows=t}thumb(e){let t=this.gl,n=e.plate.spec,r=e.slot==null?null:this.kinds[e.slot];if(!r?.c?.glows)return!0;let i,a,o,s,c;if(e.seat){if(!e.frames)return!1;i=this.sets?.get(`${this.canvas.width}x${this.canvas.height}`),{x:a,y:o,pw:s,ph:c}=e.seat}else if(e.g!=null&&this.onStage?.view&&this.onStage.left<=0&&!this.onStage.moved){let t=this.onStage,n=this.instances[e.g],l=t.view.zoom*t.ratio;i=this.sets?.get(`${t.w}x${t.h}`),a=(n.x-t.view.x)*l,o=(n.y-t.view.y)*l,s=r.k.cw*n.s*l,c=r.k.ch*n.s*l}if(!i)return!1;let[l,u]=i.win,d=(i.size[0]-l)/2,f=Math.max(Math.ceil(n.cw/8),1),p=Math.max(Math.ceil(n.ch/8),1);if(e.glow&&(e.glow.w!==f||e.glow.h!==p)&&(this.glowToRead.delete(e.glow),t.deleteTexture(e.glow.tex),t.deleteFramebuffer(e.glow.fbo),e.glow=null),!e.glow){let n=this.linear(q(t,f,p,t.RGBA8)),r=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0),e.glow={tex:n,fbo:r,w:f,h:p}}t.bindFramebuffer(t.FRAMEBUFFER,e.glow.fbo),t.drawBuffers([t.COLOR_ATTACHMENT0]),t.viewport(0,0,f,p),t.disable(t.SCISSOR_TEST),t.disable(t.BLEND),t.disable(t.DEPTH_TEST);let{u:m,p:h}=this.glowGrab;return t.useProgram(h),this.bindA(m.tGa,0,i.ga),t.uniform2f(m.uSize,f,p),t.uniform4f(m.uFrom,a+d,u-o+d,s,-c),t.bindVertexArray(this.vao),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),this.glowToRead.add(e.glow),!0}readBack(e,t,n,r=!1){let i=this.gl,a=i.createBuffer();i.bindBuffer(i.PIXEL_PACK_BUFFER,a),i.bufferData(i.PIXEL_PACK_BUFFER,e,i.STREAM_READ),t(),i.bindBuffer(i.PIXEL_PACK_BUFFER,null),this.reads.push({pbo:a,sync:i.fenceSync(i.SYNC_GPU_COMMANDS_COMPLETE,0),bytes:e,take:n,glow:r,at:performance.now()}),i.flush(),this.readLater()}readLater(){!this.readTimer&&this.reads.length&&(this.readTimer=setTimeout(()=>{this.readTimer=0,this.collect(),this.readLater()},4))}collect(){let e=this.gl,t=t=>e.clientWaitSync(t,0,0)!==e.TIMEOUT_EXPIRED;if(e.isContextLost())return this.reads.splice(0).forEach(e=>e.take(null));let n=!this.quiet||t(this.quiet);for(;this.reads.length&&(n||performance.now()-this.reads[0].at>500)&&t(this.reads[0].sync);){let t=this.reads.shift(),n=new Uint8Array(t.bytes);e.bindBuffer(e.PIXEL_PACK_BUFFER,t.pbo),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,n),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),e.deleteSync(t.sync),e.deleteBuffer(t.pbo),t.take(n)}}frameEnd(){let e=this.gl;this.quiet&&e.deleteSync(this.quiet),this.quiet=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0),e.flush()}get glowPending(){return this.reads.some(e=>e.glow)||!!this.glowFresh}glowRead(){let e=this.gl,t=[],n=0;for(let e of this.glowToRead)t.push({glow:e,at:n,bytes:e.w*e.h*4}),n+=e.w*e.h*4;this.glowToRead.clear(),this.readBack(n,()=>{for(let{glow:n,at:r}of t)e.bindFramebuffer(e.READ_FRAMEBUFFER,n.fbo),e.readBuffer(e.COLOR_ATTACHMENT0),e.readPixels(0,0,n.w,n.h,e.RGBA,e.UNSIGNED_BYTE,r);e.bindFramebuffer(e.READ_FRAMEBUFFER,null)},e=>{if(e){for(let{glow:n,at:r,bytes:i}of t)n.px=e.subarray(r,r+i);this.glowFresh=!0}},!0)}glowing(e,t,n,r){let i=this.onStage,a=this.glowFresh;if(this.glowFresh=!1,!r&&!a)return null;let o=performance.now();if(i&&i.left>0||o-(this.glowAsked??-1e9)<100)return this.glowFresh=a,null;this.glowAsked=o;let s=[],c=e();for(let e of c){let t=this.plates.get(e.plate);t&&(this.glowDirty.has(e.plate)&&this.thumb(t)&&this.glowDirty.delete(e.plate),t.glow?.px&&s.push([t.glow,e]))}this.glowToRead.size&&!this.reads.some(e=>e.glow)&&this.glowRead();let l=new Uint8Array(t*n*4);for(let[{px:e,w:r,h:i},{x:a,y:o,w:c,h:u}]of s)for(let s=Math.max(Math.ceil(o-.5),0),d=Math.min(Math.floor(o+u-.5),n-1);s<=d;s++){let n=Math.max((s+.5-o)/u*i-.5,0),d=Math.floor(n),f=Math.min(d+1,i-1),p=n-d;for(let n=Math.max(Math.ceil(a-.5),0),i=Math.min(Math.floor(a+c-.5),t-1);n<=i;n++){let i=Math.max((n+.5-a)/c*r-.5,0),o=Math.floor(i),u=Math.min(o+1,r-1),m=i-o,h=(s*t+n)*4,g=(d*r+o)*4,_=(d*r+u)*4,v=(f*r+o)*4,y=(f*r+u)*4;for(let t=0;t<3;t++){let n=(e[g+t]*(1-m)+e[_+t]*m)*(1-p)+(e[v+t]*(1-m)+e[y+t]*m)*p;l[h+t]=Math.min(l[h+t]+n+.5,255)}l[h+3]=255}}return{w:t,h:n,data:l,shots:c}}stageWants(){let e=this.onStage;return!!e&&!!e.view&&(e.left>0||this.settling>0||this.litLeft>0||!!e.moved)}drawStage(e){let t=this.onStage,n=performance.now(),r=this.gl;if(!t?.view)return;let{zoom:i,x:a,y:o}=t.view,s=`${i},${a},${o},${t.w},${t.h}`;if(t.fence){if(!e&&s===t.drewAt&&r.clientWaitSync(t.fence,0,0)===r.TIMEOUT_EXPIRED)return t.moved=!0,!1;r.deleteSync(t.fence),t.fence=null}if(t.drewAt=s,t.shown.size===0&&!this.onLayers?.size){let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT);return}let c=this.o.dpr;this.path=`stage`,this.windowSize=[t.w,t.h],this.o.dpr=t.ratio,this.draw(t.view,t.left<=0),this.o.dpr=c,this.path=null,t.left>0&&t.left--,t.left>0&&this.o.keepGeometry!==!1&&this.stillRun>=this.still&&(t.left=0),t.moved=!1,this.frameEnd(),t.fence=r.fenceSync(r.SYNC_GPU_COMMANDS_COMPLETE,0),r.flush();let l=this.stats.stage;return l.frames++,l.ms+=performance.now()-n,!0}},ka=new Set(`uCam.uKey.uSky.uLamp.uLampSoft.uLampHead.uFill.uPageShade.uRoomColor.uRoom.uBody.uFace.uLift.uFrame.uSpin.uRound.uOwn.uSplit.uDebug.uTorch.uBeam.uCone.uAim.uTint.uPoints.uPoint[0].uPointColor[0]`.split(`.`));function Aa(e,t){let n=new WeakMap,r={};for(let e of t)for(let t of ka)e?.u?.[t]&&n.set(e.u[t],t);let i=e.getUniformLocation.bind(e);e.getUniformLocation=(e,t)=>{let r=i(e,t);return r&&ka.has(t)&&n.set(r,t),r};for(let t of[`uniform1i`,`uniform1f`,`uniform2f`,`uniform3f`,`uniform4f`,`uniform3fv`,`uniform4fv`]){let i=e[t].bind(e);e[t]=(e,...a)=>{let o=e&&n.get(e);o&&(r[o]=t.endsWith(`v`)?[...a[0]]:a.length>1?a:a[0]),i(e,...a)}}return()=>{let e=r;return r={},e}}var ja=.25;function Ma(e,t,n){let r=t.spec;if(!r.body)return n;let i=e.beside(t);if(!i.length)return n.filter(e=>!e.section);let a=(r.x+r.w/2)*ja,o=(r.y+r.h/2)*ja,s=r.face-r.axis,c=[];for(let t of n){if(!t.section){c.push(t);continue}let n=W(t);for(let t of i)for(let r of t.plate.made){if(r.op!==`surface`||!r.layer||r.bend)continue;let i=e.sections.get(r.shape);i&&c.push({...r,aim:{box:n,seen:[t.turn[1],...t.at],from:[a,o,s],reach:W(r),rows:i}})}}for(let e of i){let t=e.turn[1],[n,r,i]=e.at;for(let l of e.plate.made){if(l.op!==`surface`||l.body||l.follow||l.bridge||l.bend&&!S(he(l.shape,0),l.bend)||l.zTop<l.zEdge||l.shape.type===`holes`||l.shape.type===`mask`)continue;let e=vt(l),u=W(l),d=Math.max((n-u.x*ja)*t,(n-(u.x+u.w)*ja)*t)+s;if(e<=i||d<=0)continue;let f=a+(Math.max(Math.min(l.zEdge,e),i)-i)*t,p=a+(e-i)*t;c.push({...l,aim:{box:{x:Math.min(f,p)/ja,y:(u.y*ja-r+o)/ja,w:Math.abs(p-f)/ja,h:u.h},seen:[t,n,r,i],from:[a,o,s],reach:u}})}}return c}var Na=new Set,Pa=new Set,Fa=null;function Ia(e){return Na.add(e),La(),()=>{Na.delete(e)&&e.leave(Fa)}}var La=()=>Pa.forEach(e=>e()),Ra=()=>!!Fa,za=()=>Na,Ba=e=>Pa.add(e);function Va(e){if(e===Fa)return;let t=Fa;if(Fa=e,!e)for(let e of Na)e.leave(t)}var Ha=[`drawArrays`,`drawElements`,`drawArraysInstanced`,`drawElementsInstanced`,`clear`,`clearBufferfv`,`clearBufferiv`,`clearBufferuiv`,`blitFramebuffer`,`generateMipmap`],Ua=null,Wa=()=>{Ua||(Ua=HTMLCanvasElement.prototype.getContext,HTMLCanvasElement.prototype.getContext=function(e,t){return Ua.call(this,e,e===`2d`&&this.dataset.d===void 0?{willReadFrequently:!0,...t}:t)})};function Ga(e,t=e.stage?.world){for(let t of e.devices)t.plate&&(t.plate.seat=null),t.failed=!1,t.layoutDirty=!0;t&&(e.stageOut(),e.stageIn(t)),e.schedule()}function Ka(e,t){if(!mr)return hr.then(()=>{!t.lost&&Ka(e,t)&&Ga(e,null)}),!1;let n=document.createElement(`canvas`);n.width=Math.ceil(Math.max(innerWidth*devicePixelRatio,2048)/256)*256,n.height=Math.ceil(Math.max(innerHeight*devicePixelRatio,2048)/256)*256;let r;try{r=new Oa(n,{dpr:devicePixelRatio})}catch(e){return console.warn(`raster off, the engine draws: ${e.message}`),!1}Wa();let i=!!t.lost,a=!1;Object.defineProperty(t,"lost",{get:()=>i||a||r.gl.isContextLost(),set:e=>{i=e}});let o=t.gl;for(let e of Ha)o[e]=()=>{};for(let e of[`texImage2D`,`texImage3D`,`texSubImage2D`,`texSubImage3D`,`texStorage2D`,`texStorage3D`,`renderbufferStorage`,`renderbufferStorageMultisample`,`copyTexSubImage2D`,`readPixels`])o[e]=()=>{};o.checkFramebufferStatus=()=>o.FRAMEBUFFER_COMPLETE,o.getError=()=>o.NO_ERROR;let s=()=>({tex:null,w:0,h:0});Object.assign(t.fields,{solved:s,atlas:e=>e.map(s),cut:s});let c=null;o.texImage2D=(...e)=>{e[8]instanceof Float32Array&&(c=e[8])};let l=t.sections.make.bind(t.sections);t.sections.make=e=>{let t=l(e);return Object.defineProperty(t,"data",{value:c}),t},t.held=()=>!1,t.late=()=>!1,t.bytes=()=>0,t.pictureBytes=()=>0,t.glowing=(e,n,i,a)=>t.lost?null:r.glowing(e,n,i,a),Object.defineProperty(t,"room",{get:()=>[1<<20,1<<20]}),Object.defineProperty(t,"glowPending",{get:()=>r.glowPending});let u=t.begin.bind(t);t.begin=(...e)=>(t.lost||r.collect(),u(...e));let d=e.stage?.world;d&&e.stageOut(),e.stageable=t=>{let n=e.stage?.world;if(!n||!n.contains(t.el))return!1;for(let e=t.el;e&&e!==n;e=e.parentElement){let t=getComputedStyle(e);if(t.transform!==`none`||t.translate!==`none`||t.rotate!==`none`||t.scale!==`none`||t.filter!==`none`||t.opacity!==`1`||t.clipPath!==`none`&&!e.hasAttribute(`data-far`)||t.maskImage!==`none`||t.perspective!==`none`||t.mixBlendMode!==`normal`||t.visibility!==`visible`||t.overflowX!==`visible`||t.overflowY!==`visible`)return!1}return!0};let f=e=>Va(e);r.onLayers=za(),t.stage=()=>(f(r.gl),r.stageIn()),t.unstage=()=>{f(null),r.stageOut()},t.show=(e,n,i,a,o,s)=>{t.lost||(r.exposure=t.exposure,r.backdrop=t.backdrop,r.show(e,n,i,a,o,s),w=!0,E())},t.forget=e=>{e.picture=null},t.read=e=>{if(t.lost)return null;let n=r.plates.get(e)?.ctx;return n?.canvas.width?n.getImageData(0,0,n.canvas.width,n.canvas.height):(r.exposure=t.exposure,r.backdrop=t.backdrop,r.stillNow(e))};let p=null,m=e.still.bind(e);e.still=e=>(p=e,m(e)),t.readSoon=e=>t.lost?Promise.resolve(null):r.stillOf(e,p);let h=(e,t)=>e?{x:Math.min(e.x,t.x),y:Math.min(e.y,t.y),w:Math.max(e.x+e.w,t.x+t.w)-Math.min(e.x,t.x),h:Math.max(e.y+e.h,t.y+t.h)-Math.min(e.y,t.y)}:t,g=e.pointsOn.bind(e);e.pointsOn=e=>{let t=e.lightDirty,n=e.lightBox;e.lightDirty=!1,e.lightBox=null,g(e);let r=e.lightDirty?e.lightBox:null;r&&(e.flashBox=h(e.flashBox,r)),e.lightDirty=t||!!r,e.lightBox=t?n&&r?h(n,r):r?null:n:r};let _=null,v=t.prepare.bind(t);t.prepare=e=>(e.mask&&(_={canvas:e.mask,plate:e}),v(e));let y=null,b=t.rooms.for.bind(t.rooms);t.rooms.for=(e,t)=>(y={lighting:e,tilt:t},b(e,t));let x=Aa(o,[t.lit,...Object.values(t.fast??{}),...Object.values(t.glow??{})]),S=t.paint.bind(t);t.paint=(e,n)=>{e.mask&&(_={canvas:e.mask,plate:e});let i=S(e,n);return e.spec.body&&!t.lost&&r.edgeProgram(),i&&!(`margin`in i)&&!t.lost&&r.paintPlate(e,e.spec.body?{...n,commands:Ma(t,e,n.commands)}:n,_?.plate===e?_.canvas:null),_=null,E(),i};let C=t.close.bind(t);t.close=e=>(t.lost||r.closePlate(e),C(e)),t.grow=()=>{},t.fit=e=>Math.min(1,t.maxSide/e.pw,t.maxSide/e.ph),t.lightAll=(n,i,a,o)=>{if(!t.lost){for(let s of n)try{s.cards=e.cards;let n=s.d.front??s.d,o=e.cards&&n.faces.length>0,c=o?{...i,sweeping:!1,sizing:!1}:i;s.plate.seat=t.seatFor(s.plate.spec,s.rect,{...c,sweeping:!1,sizing:!1}),x(),t.light(s,c),s.shown=o&&n.turning?1:s.rect.width*i.ratio/s.plate.spec.pw,s.sizing=!o&&!!i.sizing,r.lightPlate(s,x(),y,()=>a(s))}catch(e){o(s,e)}r.run(),w=!0,E()}};let w=!1,T=!1,E=()=>{!T&&r.unsettled()&&(T=!0,requestAnimationFrame(()=>setTimeout(()=>{T=!1,!w&&!t.lost&&(r.run(),r.drawStage()),w=!1,E()},0)))};return n.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),a=!0}),n.addEventListener(`webglcontextrestored`,()=>{r=new Oa(n,{dpr:devicePixelRatio}),r.onLayers=za(),Object.assign(window,{seats:r}),a=!1,r.onBack=E,r.relight=()=>e.schedule(),Ga(e,d)}),Object.assign(window,{seats:r}),r.onBack=E,r.relight=()=>e.schedule(),d&&e.stageIn(d),t.settling=()=>!t.lost&&r.unsettled(),!0}var qa=`#version 300 es
precision highp float;
void main(){
  vec2 c=vec2(gl_VertexID&1,(gl_VertexID>>1)&1);
  gl_Position=vec4(c*2.-1.,0.,1.);
}`,Ja=`#version 300 es
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
}`,Ya=`#version 300 es
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
}`,Xa=`#version 300 es
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
}`,Za=`#version 300 es
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
}`,Qa=`#version 300 es
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
}`,$a=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uField,uEdge;
uniform float uSteep;
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  o=vec4(max(texelFetch(uField,p,0).r,texelFetch(uEdge,p,0).r*uSteep));
}`,eo=[`maps`,`bake`,`hold`,`field`,`picture`,`stage`],to=e=>+(e===`field`||e===`picture`),no={frame:-1,tier:2,far:1/0},ro=1.5,io=class{entries=new Map;worth=new Map;frame=0;keep=1/0;ceiling=1/0;shown=0;squeeze=1;given=0;refusals=0;refusedIn=-1;over=null;hold(e,t,n,r){let i=this.entries.get(e);i||this.entries.set(e,i=new Map),i.set(t,{owner:e,kind:t,size:n,give:r,at:this.squeeze})}drop(e,t){let n=this.entries.get(e);n&&(t?n.delete(t):n.clear(),n.size||(this.entries.delete(e),this.worth.delete(e)))}judge(e,t,n,r){let i=this.worth.get(e);i?(i.tier=t,i.far=n,r&&(i.frame=this.frame)):this.worth.set(e,{frame:r?this.frame:-1,tier:t,far:n})}use(e){let t=this.worth.get(e);t?t.frame=this.frame:this.worth.set(e,{frame:this.frame,tier:0,far:0})}shows(e){return this.worth.get(e)?.frame===this.frame}get held(){let e=0;for(let t of this.entries.values())for(let n of t.values())e+=n.size();return e}next(){this.frame++}tally(){let e=0,t=0;for(let[n,r]of this.entries)if(this.shows(n)||r.has(`stage`))for(let n of r.values()){let r=n.size();e+=r,t+=r/(n.at*n.at)}this.shown=e;let n=Math.min(Math.max(Math.sqrt(this.ceiling*.8/Math.max(t,1)),1/16),1);this.squeeze=e>this.ceiling||n<this.squeeze?n:Math.min(n,this.squeeze*1.25)}room(e=0){let t=this.over;if(t&&t.frame===this.frame&&t.ceiling===this.ceiling&&t.keep===this.keep&&t.held+e<=this.ceiling&&t.kept+e<=this.keep)return t.held+=e,t.kept+=e,!0;let n=0,r=0,i=[];for(let[e,t]of this.entries){let a=this.shows(e),o=this.worth.get(e)??no;for(let e of t.values()){let t=e.size();n+=t,a||e.kind===`stage`||(r+=t,i.push({e,w:o}))}}let a=()=>n+e<=this.ceiling&&r<=this.keep;if(this.over=null,a())return this.over={frame:this.frame,held:n+e,kept:r+e,ceiling:this.ceiling,keep:this.keep},!0;i.sort((e,t)=>to(e.e.kind)-to(t.e.kind)||t.w.tier-e.w.tier||t.w.far-e.w.far||eo.indexOf(e.e.kind)-eo.indexOf(t.e.kind));for(let{e}of i){if(a())return!0;let t=e.size();e.give();let i=this.entries.get(e.owner)?.get(e.kind)===e?e.size():0;n-=t-i,r-=t-i,this.given+=t-i}return a()}kinds(){let e=Object.fromEntries(eo.map(e=>[e,0]));for(let t of this.entries.values())for(let n of t.values())e[n.kind]+=n.size();return e}refused(){this.refusedIn!==this.frame&&(this.refusedIn=this.frame,this.refusals++,this.over=null,this.ceiling=Math.max(Math.min(this.ceiling,this.held)*.8,64e6))}lost(){this.over=null,this.entries.clear(),this.worth.clear(),this.shown=0,this.squeeze=1}},ao=1024,oo=e=>`${e.key}|${e.spread}`,so=(e,t)=>{let{w:n,h:r}=co(e,t);return`${oo(e)}|${n}x${r}`};function co(e,t){let{hw:n,hh:r}=e.source??e,i=(n+e.spread)*2,a=(r+e.spread)*2,o=Math.min(2**Math.ceil(Math.log2(t)-1e-6),ao/Math.max(i,a));return{cssW:i,cssH:a,w:Math.max(2,Math.round(i*o)),h:Math.max(2,Math.round(a*o))}}var lo=class{gl;store;entries=new Map;sizes=new Map;seed;flood;resolve;smooth;within;canvas=document.createElement(`canvas`);ctx=this.canvas.getContext(`2d`);fbo;scratch=new Map;generated=0;table=null;rows=0;constructor(e,t){this.gl=e,this.store=t,this.seed=We(e,Ja,Ya),this.flood=We(e,Ja,Xa),this.resolve=We(e,Ja,Za),this.smooth=We(e,qa,Qa),this.within=We(e,qa,$a),this.fbo=e.createFramebuffer()}get(e,t){let n=this.near(e,t)??(this.make([e],t),so(e,t));return this.used(n),this.entries.get(n).tex}near(e,t){let n=so(e,t);if(this.entries.has(n))return n;let{w:r}=co(e,t),i=null,a=null;for(let[t,n]of this.sizes.get(oo(e))??[])n.w>r?(!i||n.w<i[1].w)&&(i=[t,n]):(!a||n.w>a[1].w)&&(a=[t,n]);return(i??a)?.[0]??null}missing(e,t){return[...new Map(e.map(e=>[so(e,t),e])).entries()].filter(([e,n])=>!this.entries.has(e)&&!this.fine(n,t)).map(([,e])=>e)}fine(e,t){let{w:n}=co(e,t);for(let t of this.sizes.get(oo(e))?.values()??[])if(t.w>n&&t.w<=n*2+1)return!0;return!1}held(e){return!!this.sizes.get(oo(e))?.size}cost(e,t){let{w:n,h:r}=co(e,t);return n*r*(Math.ceil(Math.log2(Math.max(n,r)))+3)}used(e){this.store.judge(`f|${e}`,ro,-performance.now(),!0)}use(){for(let e of this.entries.keys())this.used(e);for(let e of this.scratch.keys())this.store.judge(`w|${e}`,ro,-performance.now(),!0)}forget(e){let t=this.entries.get(e);if(this.store.drop(`f|${e}`),!t)return;this.gl.deleteTexture(t.tex),this.entries.delete(e);let n=e.slice(0,e.lastIndexOf(`|`)),r=this.sizes.get(n);r?.delete(e),r&&!r.size&&this.sizes.delete(n)}working(e,t){let{gl:n}=this,r=2**Math.ceil(Math.log2(e)),i=2**Math.ceil(Math.log2(t)),a=r*4096+i;this.store.judge(`w|${a}`,ro,-performance.now(),!0);let o=this.scratch.get(a);if(o)return o;this.store.room(r*i*18),this.store.hold(`w|${a}`,`field`,()=>r*i*18,()=>{let e=this.scratch.get(a);if(this.store.drop(`w|${a}`),e){for(let t of[e.a,e.b,e.raw])n.deleteTexture(t);this.scratch.delete(a)}});let s=(e,t)=>{let a=n.createTexture();return n.bindTexture(n.TEXTURE_2D,a),n.texStorage2D(n.TEXTURE_2D,1,e,r,i),U(n,t,t),a},c={a:s(n.RGBA16F,n.NEAREST),b:s(n.RGBA16F,n.NEAREST),raw:s(n.R16F,n.LINEAR)};return this.scratch.set(a,c),c}make(e,t){let n=[...new Map(e.map(e=>[so(e,t),e])).entries()].filter(([e])=>!this.entries.has(e));for(let[e,r]of n)r.solve&&this.keep(e,r,this.solved(r,t));let r=n.filter(([,e])=>!e.solve);if(!r.length)return;let i=r.flatMap(([,e])=>e.within?[e,{...e,draw:e.within.draw,within:void 0}]:[e]),a=this.atlas(i,t),o=0;for(let[e,t]of r){let n=a[o++];this.keep(e,t,t.within?this.cut(n,a[o++],t.within.steep):n)}}keep(e,t,n){this.entries.set(e,n);let r=oo(t);this.sizes.has(r)||this.sizes.set(r,new Map),this.sizes.get(r).set(e,n),this.store.hold(`f|${e}`,`field`,()=>n.w*n.h*2,()=>this.forget(e)),this.used(e)}solved(e,t){let{gl:n}=this,{cssW:r,cssH:i,w:a,h:o}=co(e,t),s=new Float32Array(a*o),c=r/a,l=i/o;for(let t=0;t<o;t++)for(let n=0;n<a;n++)s[t*a+n]=e.solve((n+.5)*c-e.spread,(t+.5)*l-e.spread);let u=n.createTexture();return n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,u),n.texStorage2D(n.TEXTURE_2D,1,n.R16F,a,o),U(n,n.LINEAR,n.LINEAR),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.texSubImage2D(n.TEXTURE_2D,0,0,0,a,o,n.RED,n.FLOAT,s),this.generated+=1,{tex:u,w:a,h:o}}atlas(e,t){let n=e.map(e=>co(e,t)),r=n.map((e,t)=>t).sort((e,t)=>n[t].h-n[e].h),i=[],a=[],o=[],s=0,c=0,l=0,u=()=>{o.length&&this.together(o.map(t=>({shape:e[t],...n[t],...i[t]})),c+l).forEach((e,t)=>a[o[t]]=e),o=[],s=c=l=0};for(let e of r){let{w:t,h:r}=n[e];s+t>ao&&(s=0,c+=l,l=0),c+r>ao&&u(),i[e]={x:s,y:c},o.push(e),s+=t,l=Math.max(l,r)}return u(),a}together(e,t){let{gl:n,canvas:r,ctx:i}=this,a=Math.max(...e.map(e=>e.x+e.w));r.width<a&&(r.width=a),r.height<t&&(r.height=t),i.setTransform(1,0,0,1,0,0),i.fillStyle=`#000`,i.fillRect(0,0,a,t),i.fillStyle=i.strokeStyle=`#fff`;for(let{shape:t,cssW:n,cssH:r,w:a,h:o,x:s,y:c}of e){let{hw:e,hh:l}=t.source??t;i.save(),i.beginPath(),i.rect(s,c,a,o),i.clip(),i.setTransform(a/n,0,0,o/r,s+a/n*t.spread,c+o/r*t.spread),t.draw(i,e*2,l*2),i.restore()}let o=n.createTexture();n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,o),U(n,n.NEAREST,n.NEAREST),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.texImage2D(n.TEXTURE_2D,0,n.R8,a,t,0,n.RED,n.UNSIGNED_BYTE,r);let s=e.length,c=Math.ceil(s*2/1024),l=new Float32Array(1024*c*4);e.forEach(({x:e,y:t,w:n,h:r,cssW:i},a)=>{l.set([e,t,n,r,n/i],a*8)}),n.activeTexture(n.TEXTURE2),this.rows<c?(n.deleteTexture(this.table),this.table=n.createTexture(),this.rows=c,n.bindTexture(n.TEXTURE_2D,this.table),n.texStorage2D(n.TEXTURE_2D,1,n.RGBA32F,1024,c),U(n,n.NEAREST,n.NEAREST)):n.bindTexture(n.TEXTURE_2D,this.table),n.texSubImage2D(n.TEXTURE_2D,0,0,0,c>1?1024:s*2,c,n.RGBA,n.FLOAT,l),n.activeTexture(n.TEXTURE0);let u=this.working(a,t),{raw:d}=u,{a:f,b:p}=u;n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.drawBuffers([n.COLOR_ATTACHMENT0]),n.disable(n.BLEND),n.disable(n.SCISSOR_TEST);let m=e=>n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0),h=2**Math.ceil(Math.log2(a)),g=2**Math.ceil(Math.log2(t));n.viewport(0,0,h,g);let _=e=>{n.useProgram(e.program),n.uniform1i(e.u.uBoxes,2),n.uniform2f(e.u.uAtlas,h,g)},v=()=>n.drawArraysInstanced(n.TRIANGLE_STRIP,0,4,s);_(this.seed),n.uniform1i(this.seed.u.uMask,0),n.bindTexture(n.TEXTURE_2D,o),m(f),v(),_(this.flood),n.uniform1i(this.flood.u.uSeeds,0),n.uniform1i(this.flood.u.uMask,1),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,o),n.activeTexture(n.TEXTURE0);let y=1<<Math.ceil(Math.log2(Math.max(...e.map(e=>Math.max(e.w,e.h)))));for(;y>=1&&(y>>=1,n.uniform1i(this.flood.u.uStep,Math.max(y,1)),n.bindTexture(n.TEXTURE_2D,f),m(p),v(),[f,p]=[p,f],y!==0););_(this.resolve),n.uniform1i(this.resolve.u.uSeeds,0),n.uniform1i(this.resolve.u.uMask,1),n.bindTexture(n.TEXTURE_2D,f),m(d),v(),n.useProgram(this.smooth.program),n.uniform1i(this.smooth.u.uField,0),n.bindTexture(n.TEXTURE_2D,d);let b=e.map(({w:e,h:t,x:r,y:i,cssW:a})=>{let o=n.createTexture();return n.bindTexture(n.TEXTURE_2D,o),n.texStorage2D(n.TEXTURE_2D,1,n.R16F,e,t),U(n,n.LINEAR,n.LINEAR),n.bindTexture(n.TEXTURE_2D,d),n.uniform1f(this.smooth.u.uScale,e/a),n.uniform2i(this.smooth.u.uSize,e,t),n.uniform2i(this.smooth.u.uAt,r,i),n.viewport(0,0,e,t),m(o),n.drawArrays(n.TRIANGLE_STRIP,0,4),{tex:o,w:e,h:t}});return n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,null,0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.deleteTexture(o),this.generated+=s,b}cut(e,t,n){let{gl:r}=this,{w:i,h:a}=e,o=r.createTexture();return r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,o),r.texStorage2D(r.TEXTURE_2D,1,r.R16F,i,a),U(r,r.LINEAR,r.LINEAR),r.bindFramebuffer(r.FRAMEBUFFER,this.fbo),r.drawBuffers([r.COLOR_ATTACHMENT0]),r.viewport(0,0,i,a),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,o,0),r.useProgram(this.within.program),r.uniform1i(this.within.u.uField,0),r.uniform1i(this.within.u.uEdge,1),r.uniform1f(this.within.u.uSteep,n),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,t.tex),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,e.tex),r.drawArrays(r.TRIANGLE_STRIP,0,4),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,null,0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(e.tex),r.deleteTexture(t.tex),{tex:o,w:i,h:a}}read(e,t){let{gl:n}=this;this.make([e],t);let r=this.entries.get(so(e,t));n.bindFramebuffer(n.FRAMEBUFFER,this.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,r.tex,0);let i=new Float32Array(r.w*r.h*4);n.readPixels(0,0,r.w,r.h,n.RGBA,n.FLOAT,i);let a=i.filter((e,t)=>t%4==0);return n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,null,0),n.bindFramebuffer(n.FRAMEBUFFER,null),{w:r.w,h:r.h,data:a}}},uo=class{spec;tex=null;map={x:0,y:0,w:0,h:0};wanted=null;stood=!1;pool=null;mask=null;rough=!1;seat=null;roughBox=null;bake=null;hold=null;heat=0;warmed=0;glowing=!1;drawn=``;peak=40;tall=40;panes=[];paned=new Set;shaped=0;edged=[];reedge=!1;made=null;picture=null;constructor(e){this.spec=e}get ready(){return!!this.tex}},fo=4,po=.001,mo=2,ho=12,go=1e9,_o=class{gl;cache=new Map;canvas=new OffscreenCanvas(1,1);ctx=this.canvas.getContext(`2d`,{willReadFrequently:!0});constructor(e){this.gl=e}get(e){if(e.type!==`rect`&&e.type!==`field`||e.rotate||e.grow||e.ring||e.type===`rect`&&e.ripple[0])return null;let t=e.type===`field`?`${e.key}|${e.hw}x${e.hh}|${e.cx},${e.cy}`:`r|${e.cx},${e.cy},${e.hw},${e.hh},${e.radius}`,n=this.cache.get(t);return n||(n=this.make(e),this.cache.set(t,n)),n}make(e){let{gl:t}=this,n=Math.min(t.getParameter(t.MAX_TEXTURE_SIZE),8192),r=e.hh*2,i=e.cy-e.hh,a=Math.min(Math.ceil(r*fo)+1,n),o=r/(a-1),s=e.type===`rect`?this.rounded(e,a,o):this.keyed(e,a,o)??this.traced(e,a,o),c=t.createTexture();return t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,c),U(t,t.NEAREST,t.NEAREST),t.texImage2D(t.TEXTURE_2D,0,t.RG32F,a,1,0,t.RG,t.FLOAT,s),{tex:c,y0:i,step:o,n:a}}rounded(e,t,n){let r=new Float32Array(t*2),i=e.cx-e.hw,a=e.hw*2,o=e.hh*2,s=Math.min(e.radius,e.hw,e.hh);for(let e=0;e<t;e++){let t=e*n,c=t<s?s-t:t>o-s?t-(o-s):0,l=s-Math.sqrt(Math.max(0,s*s-c*c));r[e*2]=i+a-l,r[e*2+1]=i+l}return r}keyed(e,t,n){let r=new Float32Array(t*2),i=e.cx-e.hw,a=e.key.split(`|`);if(a[0]!==`p`||a.length!==5)return null;let[o,s,c,l]=a[2].split(`,`).map(Number),{hw:u,hh:d}=e.source??e,f=u*2/c,p=d*2/l,m=new Float64Array(t).fill(1/0),h=new Float64Array(t).fill(-1/0);for(let e of yn(a[1],po/Math.max(f,p))){let r=e.length/2;for(let i=0;i<r;i++){let a=(e[2*i]-o)*f,c=(e[2*i+1]-s)*p,l=(i+1)%r,u=(e[2*l]-o)*f,d=(e[2*l+1]-s)*p,g=Math.min(c,d),_=Math.max(c,d);for(let e=Math.max(0,Math.ceil(g/n)),r=Math.min(t-1,Math.floor(_/n));e<=r;e++){let t=e*n,r=c===d?[a,u]:[a+(t-c)*(u-a)/(d-c)];for(let t of r)t<m[e]&&(m[e]=t),t>h[e]&&(h[e]=t)}}}for(let e=0;e<t;e++)h[e]<m[e]?(r[e*2]=-1e9,r[e*2+1]=go):(r[e*2]=i+h[e],r[e*2+1]=i+m[e]);return r}traced(e,t,n){let{canvas:r,ctx:i}=this,a=e.hw*2,o=e.cx-e.hw,s=Math.ceil(a*mo)+1;r.width=s,r.height=t,i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,s,t),i.fillStyle=`#fff`;let c=(s-1)/a,l=1/n;i.setTransform(c,0,0,l,.5,.5);let u=null,d,f=null,p=i.fill.bind(i);i.fill=((e,t)=>{e instanceof Path2D&&(u=e,d=t,f=i.getTransform()),p(e,t)}),i.save();let{hw:m,hh:h}=e.source??e;e.draw(i,m*2,h*2),i.restore(),i.fill=p;let g=i.getImageData(0,0,s,t).data;f&&i.setTransform(f);let _=(e,t)=>i.isPointInPath(u,e,t+.5,d),v=new Float32Array(t*2);for(let e=0;e<t;e++){let t=-1,n=-1;for(let n=s-1;n>=0;n--)if(g[(e*s+n)*4+3]>127){t=n;break}for(let t=0;t<s;t++)if(g[(e*s+t)*4+3]>127){n=t;break}if(t<0){v[e*2]=-1e9,v[e*2+1]=go;continue}let r=(t,n)=>{let r=t+.5,i=n+.5;if(!u)return(r+i)/2;if(!_(r,e))return r;for(let t=0;t<ho;t++){let t=(r+i)/2;_(t,e)?r=t:i=t}return r};v[e*2]=o+(r(t,t+1)-.5)/c,v[e*2+1]=o+(r(n,n-1)-.5)/c}return v}},vo=new Set,yo=null,bo=new Set,xo=()=>bo.forEach(e=>e());function So(e){let t={...e,kind:`point`};return vo.add(t),xo(),{set(e){Object.assign(t,e),xo()},remove(){vo.delete(t)&&xo()}}}function Co(){return yo?[yo,...vo]:[...vo]}var wo=()=>vo,To=e=>{if(Array.isArray(e))return e;let t=e.getBoundingClientRect();return[t.left+t.width/2,t.top+t.height/2]},Eo=(e,t)=>{let n=Math.max(...e.color);return n<=t?0:e.reach/2*Math.sqrt(n/t-1)},Do=e=>yo=e,Oo=null,ko=-1/0;function Ao(){return performance.now()-ko>jo&&bo.forEach(e=>e()),ko=performance.now(),Oo}var jo=1e3,Mo=()=>performance.now()-ko<jo,No=e=>Oo=e,Po=()=>Oo;function Fo(e){return bo.add(e),()=>bo.delete(e)}var Io=new Uint8Array,Lo=new Uint8Array,Ro=new Uint8Array,zo=new Uint8Array;function Bo(e){return Io.length<e&&(Io=new Uint8Array(e)),Io.fill(0,0,e),Io.subarray(0,e)}function Vo(e,t,n,r){let i=2*r+1,a=Math.max(t,n)+2*r;Lo.length<a&&(Lo=new Uint8Array(a),Ro=new Uint8Array(a),zo=new Uint8Array(a));let o=(t,n,a)=>{let o=t+2*r;Lo.fill(0,0,o);for(let i=0;i<t;i++)Lo[i+r]=e[n+i*a];for(let e=0;e<o;e++)Ro[e]=e%i&&Ro[e-1]>Lo[e]?Ro[e-1]:Lo[e];for(let e=o-1;e>=0;e--)zo[e]=e%i!==i-1&&e!==o-1&&zo[e+1]>Lo[e]?zo[e+1]:Lo[e];for(let r=0;r<t;r++)e[n+r*a]=Math.max(zo[r],Ro[r+i-1])};for(let e=0;e<n;e++)o(t,e*t,1);for(let e=0;e<t;e++)o(n,e,t)}var Ho=16,Uo=500,Wo=20,Z=.25,Go=256,Ko=32,qo=2,Jo=32,Yo=160,Xo=1/.6,Zo=48,Qo=32,$o=16,es=6,ts=3,ns=400,rs=3e3,is=100,as=12,os=4e6,ss=260,cs=640,ls=3,us=10,ds=18,fs=([e,t],[n,r,i])=>{let a=e*Math.PI/180,o=t*Math.PI/180,s=n*Math.cos(a)-i*Math.sin(a),c=i*Math.cos(a)+n*Math.sin(a);return[s,r*Math.cos(o)+c*Math.sin(o),c*Math.cos(o)-r*Math.sin(o)]},ps=.75,ms=1.565,hs={n:0,at:new Float32Array,color:new Float32Array},gs=`#version 300 es
uniform vec4 uRect, uUv;
uniform mat3 uH;
out vec2 vUv;
void main() {
  vec2 c = vec2(gl_VertexID & 1, gl_VertexID >> 1);
  vUv = mix(uUv.xy, uUv.zw, c);
  vec3 p = uH * vec3(mix(uRect.x, uRect.z, c.x), mix(uRect.y, uRect.w, c.y), 1.0);
  gl_Position = vec4(p.xy, 0.0, p.z);
}`,_s=`#version 300 es
precision mediump float;
uniform sampler2D tP;
uniform float uGain, uSmear;
in vec2 vUv;
out vec4 o;
void main() {
  if (uSmear <= 0.0) { o = texture(tP, vUv) * uGain; return; }
  vec4 c = vec4(0.0);
  float n = 0.0;
  for (int i = -3; i <= 3; i++) {
    float w = exp(-float(i * i) / 4.5);
    c += texture(tP, vUv + vec2(float(i) * uSmear / 3.0, 0.0)) * w;
    n += w;
  }
  o = c / n * uGain;
}`,vs=`#version 300 es
precision highp float;
uniform sampler2D tP, tBend;
uniform vec2 uStagePx, uUvPerMm;
uniform float uGain;
in vec2 vUv;
out vec4 o;
void main() {
  vec2 d = texture(tBend, gl_FragCoord.xy / uStagePx).rg;
  o = texture(tP, vUv + vec2(d.x, -d.y) * uUvPerMm) * uGain;
}`,ys=[1,0,0,0,1,0,0,0,1];function bs(e,t){let n=[];for(let r=0;r<3;r++)for(let i=0;i<3;i++)n.push(e[r*3]*t[i]+e[r*3+1]*t[3+i]+e[r*3+2]*t[6+i]);return n}function xs(e,t){let n=Math.floor(e.x*t),r=Math.floor(e.y*t);return{x:n,y:r,w:Math.ceil((e.x+e.w)*t)-n,h:Math.ceil((e.y+e.h)*t)-r}}var Ss=(e,t)=>e.x<t.x+t.w&&t.x<e.x+e.w&&e.y<t.y+t.h&&t.y<e.y+e.h,Cs=(e,t)=>({x:e.x-t,y:e.y-t,w:e.w+t*2,h:e.h+t*2});function ws(e){let t=[];for(let n of e){for(let e=t.length-1;e>=0;e--)Ss(t[e],n)&&(n=G(n,t[e]),t.splice(e,1),e=t.length);t.push(n)}return t.length>es?[t.reduce((e,t)=>G(e,t))]:t}var Ts=e=>!!e&&(e[0]>0||e[1]>0||e[2]>0),Es=e=>e.op===`screen`||e.op===`frost`||e.op===`glow`||(e.op===`surface`?Ts(e.material.emit):e.op===`cut`&&Ts(e.emit)),Ds=e=>e>=1.5?2:1,Os=e=>({right:e.cw-e.x,bottom:e.ch-e.y,cx:e.cw/2,cy:e.ch/2,long:Math.max(e.cw-e.y*2,e.ch-e.y*2)}),ks=(e,t)=>{let n=e.pointer,r=e.lampFor?.(t,n.x,n.y);return r?{...n,x:r[0],y:r[1]}:n},As=(e,t)=>!!e.spin||!!e.lean&&(t.carried?e.hand>0:!!e.turn[0]||!!e.turn[1]);function js(e){let t=(e.rotate%Math.PI+Math.PI)%Math.PI/Math.PI;return!e.rotate||e.hw===e.hh&&e.radius>=e.hw||t<1e-6||t>1-1e-6?{...e,rotate:0}:Math.abs(t-.5)<1e-6?{...e,rotate:0,hw:e.hh,hh:e.hw}:null}var Ms=class{stats;window;ok=!1;settling(){return!1}lost=!1;probe=!1;fields=null;sections=null;store=new io;madeFor=new Set;allocated=!1;askedAt=-1/0;askTimer=0;refusedBench=!1;refused=()=>{};plates=new Set;canvas=null;bench=null;benchTex=null;sheet={width:0,height:0};staged=!1;show_=null;lens=null;exposure=1;backdrop=[0,0,0];bent=null;glowAt=null;glowReads=[];glowBack=null;emitters=[];gl=null;mat=null;block=null;recorder=null;wea=null;lit=null;fast=null;glow=null;linkingGlow=null;lightProgram;linking=[];con=null;occ=null;vao=null;screenTex=null;dark=null;rooms=null;px=new Uint8Array(4);pxLight=new Float32Array(4);fieldRoom=1/0;proven=!1;fence=null;fenced=0;mipFrom=null;heightFormat=0;maxSide=4096;undersides=!1;relief=!1;split=!1;raised=!0;targets=[];drawn=0;made=0;constructor(e,t,n=()=>[innerWidth*devicePixelRatio,innerHeight*devicePixelRatio]){this.stats=e,this.window=n;let r=document.createElement(`canvas`),i=r.getContext(`webgl2`,{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:`high-performance`});i&&i.getExtension(`EXT_color_buffer_float`)&&(this.canvas=r,this.sheet=r,this.gl=i,this.init(),this.ok=!0,r.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),this.lost=!0,this.fence=null,this.store.lost(),this.madeFor.clear();for(let e of this.plates)e.tex=e.picture=null,this.freeHold(e);this.bench=this.benchTex=null,this.glowReads=[],this.glowAt=null,this.lens=null,Va(null)}),r.addEventListener(`webglcontextrestored`,()=>{this.lost=!1,this.init(),this.staged&&Va(i),t()}))}open(e){let t=new uo(e);return this.plates.add(t),t}showRelief(e){this.raised=e,this.recorder&&(this.recorder.relief=e)}close(e){this.plates.delete(e),this.free(e),this.freePicture(e),this.store.drop(e),this.madeFor.delete(e)}making_(e,t){this.store.room(t),this.allocated=!0,e&&this.madeFor.add(e)}drop(e){this.freeBake(e),this.freeHold(e)}staleBakes(){for(let{bake:e}of this.plates)e&&(e.stale=!0)}begin(e,t){this.drawn=this.stats.paints+this.stats.lights,this.made=this.fields.generated,this.taken(),this.fieldRoom=e?1/0:t?os*8:os,this.store.next(),this.glowCollect()}glowCollect(){let{gl:e}=this;for(;this.glowReads.length&&e.clientWaitSync(this.glowReads[0].sync,0,0)!==e.TIMEOUT_EXPIRED;){let t=this.glowReads.shift(),n=new Uint8Array(t.w*t.h*4);e.bindBuffer(e.PIXEL_PACK_BUFFER,t.pbo),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,n),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),e.deleteSync(t.sync),e.deleteBuffer(t.pbo),this.glowBack={w:t.w,h:t.h,data:n,shots:t.shots}}}end(){if(this.stats.paints+this.stats.lights===this.drawn&&this.fields.generated===this.made)return this.asking();let{gl:e}=this;return this.fence&&e.deleteSync(this.fence),this.fence=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0),this.fenced=performance.now(),e.flush(),this.asking()}asking(){if(!this.allocated)return!1;let e=Math.max(this.askedAt+Uo-performance.now(),this.behind()?Wo:0);return e<=0||(this.askTimer||=window.setTimeout(()=>{this.askTimer=0,this.taken(),this.asking()},e),!1)}late(){return performance.now()-this.fenced>as}making(e){if(!e.wanted)return!1;let t=e.wanted=this.fields.missing(e.wanted,e.spec.dpr),n=[];for(;t.length&&this.fieldRoom>0;){let r=t.pop();this.fieldRoom-=this.fields.cost(r,e.spec.dpr),n.push(r)}return this.fields.make(n,e.spec.dpr),t.length?!0:(e.wanted=null,!1)}behind(){let{gl:e,fence:t}=this;return!!t&&e.getSyncParameter(t,e.SYNC_STATUS)!==e.SIGNALED}taken(){if(!this.allocated||this.lost)return;let e=performance.now();if(e-this.askedAt<Uo||this.behind())return;this.askedAt=e,this.allocated=!1;let{gl:t}=this,n=[...this.madeFor];this.madeFor.clear();let r=!1;for(let e=t.getError();e!==t.NO_ERROR&&e!==t.CONTEXT_LOST_WEBGL;e=t.getError())r||=e===t.OUT_OF_MEMORY||e===t.INVALID_OPERATION||e===t.INVALID_VALUE;if(r||this.refusedBench){r&&this.store.refused(),this.refusedBench=!1;for(let e of n)this.free(e),this.freePicture(e);this.refused()}}memory(){let e=this.store.kinds(),t=this.rooms?.bytes??0,n=0;for(let e of this.plates)e.tex&&n++;return{textures:e.maps+e.bake+e.hold,pictures:e.picture,fields:e.field,room:t,stage:e.stage-t,live:n}}recover(){let{gl:e}=this,{drawing:t,later:n}=this.recorder;return this.recorder.drawing=null,n.length=0,this.block.send(),e.bindFramebuffer(e.FRAMEBUFFER,this.bench),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.activeTexture(e.TEXTURE0),t}init(){let{gl:e}=this;e.getExtension(`EXT_color_buffer_float`),this.maxSide=e.getParameter(e.MAX_TEXTURE_SIZE),this.heightFormat=e.getExtension(`OES_texture_float_linear`)&&e.getExtension(`EXT_float_blend`)?e.RGBA32F:e.RGBA16F,this.targets=[e.COLOR_ATTACHMENT0,e.COLOR_ATTACHMENT1,e.COLOR_ATTACHMENT2,e.COLOR_ATTACHMENT3];let t=e.getParameter(e.MAX_DRAW_BUFFERS),n=t>4;n&&this.targets.push(e.COLOR_ATTACHMENT4),this.relief=this.heightFormat===e.RGBA16F&&t>5,this.split=this.heightFormat===e.RGBA32F&&t>5,this.split&&(this.heightFormat=e.R32F),(this.relief||this.split)&&this.targets.push(e.COLOR_ATTACHMENT5),this.undersides=t>6;let r=e=>this.relief||this.split?e.replace(`#version 300 es`,`#version 300 es\n#define ${this.relief?`RELIEF`:`SPLIT`}`):e,i=Ue(e,pt,(e=>r((n?e:e.replace(`layout(location=4) out vec4 oM;`,`vec4 oM;`)).replace(`layout(location=6) out vec4 oU;`,this.undersides?`$&`:`vec4 oU;`)))(mt)),a=Ue(e,at,r(gt)),o=Ue(e,St,r(jt)),s=Ue(e,at,ht),c=Ue(e,at,_t);this.mat=i.finish(),this.block=new qe(e,this.mat.program,`Command`),this.wea=a.finish(),this.lit=o.finish(),this.samplers(this.lit),this.fast=this.glow=this.linkingGlow=null,this.lightProgram=t=>Ge(e,St,r(jt).replace(`#version 300 es`,`#version 300 es\n#define ${t}`)),this.linking=[`BAKE`,`SHADOWS`,`QUICK`].map(this.lightProgram),this.con=s.finish(),this.occ=c.finish(),this.vao=e.createVertexArray(),e.bindVertexArray(this.vao),this.screenTex=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.screenTex),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,1,1,0,e.RGBA,e.UNSIGNED_BYTE,null),U(e,e.LINEAR,e.LINEAR),this.dark=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.dark),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,1,1,0,e.RGBA,e.UNSIGNED_BYTE,null),U(e,e.NEAREST,e.NEAREST),this.fields=new lo(e,this.store),this.sections=new _o(e),this.recorder=new bt(e,this.block,this.fields,this.screenTex),this.recorder.relief=this.raised,this.rooms=new it(e);let l=()=>{};this.store.hold(`rooms`,`stage`,()=>this.rooms.bytes,l),this.store.hold(`lens`,`stage`,()=>this.lens?.bytes??0,l),this.store.hold(`bench`,`stage`,()=>this.benchTex?this.sheet.width*this.sheet.height*8:0,l),this.store.hold(`glow`,`stage`,()=>this.glowAt?this.glowAt.w*this.glowAt.h*4:0,l),this.mipFrom=e.createFramebuffer(),this.show_=Ue(e,gs,_s).finish(),this.bent=Ue(e,gs,vs).finish(),this.staged&&this.makeBench()}held(){let{gl:e,fence:t}=this;return t?e.getSyncParameter(t,e.SYNC_STATUS)!==e.SIGNALED&&performance.now()-this.fenced<is||(e.deleteSync(t),this.fence=null,!1):!1}prepare(e){if(e.tex||this.allocTextures(e,null),e.mask){let{gl:t}=this;t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,e.tex.mask),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.R8,e.spec.pw,e.spec.ph,0,t.RED,t.UNSIGNED_BYTE,e.mask),t.generateMipmap(t.TEXTURE_2D),e.mask=null}this.condition(e)}condition(e){let t=e.spec,n=[t.pw,t.ph,t.seed,t.prints,t.dust,t.scuff,t.haze].join();if(n===e.drawn)return;e.drawn=n;let{gl:r}=this,{u:i,program:a}=this.con;r.bindFramebuffer(r.FRAMEBUFFER,e.tex.condition),r.viewport(-e.map.x,-e.map.y,t.pw,t.ph),r.drawBuffers([r.COLOR_ATTACHMENT0]),r.disable(r.BLEND),r.useProgram(a),r.uniform2f(i.uCanvas,t.cw,t.ch),r.uniform4f(i.uBox,0,0,t.cw,t.ch),r.uniform2f(i.uSeed,t.seed*73.1%997,t.seed*41.7%991),r.uniform1f(i.uPrints,t.prints),r.uniform1f(i.uDust,t.dust),r.uniform1f(i.uScuff,t.scuff),r.uniform1f(i.uHaze,t.haze),r.drawArrays(r.TRIANGLE_STRIP,0,4),r.bindFramebuffer(r.FRAMEBUFFER,this.bench)}occlusion(e,t){let n=e.spec,{gl:r}=this,{u:i,program:a}=this.occ,o=Ds(n.dpr);r.bindFramebuffer(r.FRAMEBUFFER,e.tex.occlusion),r.viewport(0,0,Math.ceil(n.pw/o),Math.ceil(n.ph/o)),t&&this.clip(Cs(t,80/Math.min(n.dpr,1)),n.pw/n.cw/o,0),r.drawBuffers([r.COLOR_ATTACHMENT0]),r.useProgram(a),r.uniform2f(i.uCanvas,n.cw,n.ch),r.uniform4f(i.uBox,0,0,n.cw,n.ch),r.uniform1f(i.uDpr,n.dpr),r.uniform4f(i.uMap,...this.mapUv(e)),r.uniform1i(i.tH,0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,e.tex.H),r.drawArrays(r.TRIANGLE_STRIP,0,4),r.bindFramebuffer(r.FRAMEBUFFER,this.bench)}allocTextures(e,t){let n=e.spec,{gl:r}=this;this.making_(e,e.map.w*e.map.h*40+n.pw*n.ph*3),this.store.hold(e,`maps`,()=>e.tex?this.mapBytes(e):0,()=>this.freeMaps(e));let i=this.levels(e),a=(t,n)=>this.target(e,t,n),o=a(r.SRGB8_ALPHA8,i),s=a(this.heightFormat,i),c=a(r.RGBA8,1),l=a(r.RGBA8,1),u;this.targets.length>4?u=a(r.RGBA8,1):(u=r.createTexture(),r.bindTexture(r.TEXTURE_2D,u),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,1,1,0,r.RGBA,r.UNSIGNED_BYTE,new Uint8Array([0,0,255,255])),U(r,r.NEAREST,r.NEAREST));let d=r.createTexture(),f=Ds(n.dpr);r.bindTexture(r.TEXTURE_2D,d),r.texStorage2D(r.TEXTURE_2D,1,r.RGBA8,Math.ceil(n.pw/f),Math.ceil(n.ph/f)),U(r,r.LINEAR,r.LINEAR);let p=t??r.createTexture();t||(r.bindTexture(r.TEXTURE_2D,p),U(r,r.LINEAR_MIPMAP_LINEAR,r.LINEAR));let m=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,m),[o,s,c].forEach((e,t)=>r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+t,r.TEXTURE_2D,e,0)),this.targets.length>4&&r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT4,r.TEXTURE_2D,u,0);let h=this.relief?a(r.R16F,i):null,g=this.split?a(r.RGBA8,i):null;if((h??g)&&r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT5,r.TEXTURE_2D,h??g,0),!this.proven&&r.checkFramebufferStatus(r.FRAMEBUFFER)!==r.FRAMEBUFFER_COMPLETE)throw Error(`framebuffer incomplete`);this.proven=!0;let _=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,_),[o,c].forEach((e,t)=>r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+t,r.TEXTURE_2D,e,0));let v=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,v),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,l,0);let y=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,y),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,d,0),r.bindFramebuffer(r.FRAMEBUFFER,this.bench);let b=Math.ceil(n.cw/Ho),x=Math.ceil(n.ch/Ho),S=r.createTexture();r.activeTexture(r.TEXTURE7),r.bindTexture(r.TEXTURE_2D,S),r.texStorage2D(r.TEXTURE_2D,1,r.RG8,b,x),U(r,r.NEAREST,r.NEAREST),r.activeTexture(r.TEXTURE0);let C=[...this.targets];C[3]=r.NONE,e.tex={A:o,H:s,S:c,E:null,G:null,glow:null,targets:C,M:u,D:h,N:g,U:null,C:l,O:d,mask:p,fbo:m,weather:_,condition:v,occlusion:y,tops:new Uint8Array(b*x*2),tw:b,th:x,T:S,back:null,under:null,own:null,deep:null},e.drawn=``}get room(){let[e,t]=this.window(),n=(e,t)=>Math.min(Math.ceil(e/Go)*Go,t,this.maxSide);return[n(e,this.ceiling[0]),n(t,this.ceiling[1])]}grow(){let[e,t]=this.room,n=this.sheet;if(e===n.width&&t===n.height)return;if(n.width=e,n.height=t,this.staged)return this.sizeBench();let{drawingBufferWidth:r,drawingBufferHeight:i}=this.gl;(r<n.width||i<n.height)&&(this.ceiling=[r,i],n.width=r,n.height=i)}ceiling=[1/0,1/0];fit(e){return Math.min(1,this.sheet.width/e.pw,this.sheet.height/e.ph)}levels(e){return Math.floor(Math.log2(Math.max(e.map.w,e.map.h)))+1}target(e,t,n){let{gl:r}=this,i=r.createTexture();return r.bindTexture(r.TEXTURE_2D,i),r.texStorage2D(r.TEXTURE_2D,n,t,e.map.w,e.map.h),U(r,n>1?r.LINEAR_MIPMAP_LINEAR:r.LINEAR,r.LINEAR),i}samplers({program:e,u:t}){let{gl:n}=this;n.useProgram(e),[`tA`,`tH`,`tS`,`tE`,`tRoom`,`tC`,`tO`,`tTop`,`tM`,`tD`,`tBake`,`tShadow`,`tU`,`tN`,`tDFG`,`tBrush`].forEach((e,r)=>t[e]&&n.uniform1i(t[e],r))}linked(){if(this.fast)return!0;let[e,t,n]=this.linking.map(e=>e());return!e||!t||!n?!1:([e,t,n].forEach(e=>this.samplers(e)),this.fast={bake:e,shadows:t,quick:n},!0)}glowLinked(){if(this.glow)return!0;let[e,t]=(this.linkingGlow??=[`HOLD`,`EMIT`].map(this.lightProgram)).map(e=>e());return!e||!t?!1:([e,t].forEach(e=>this.samplers(e)),this.glow={hold:e,emit:t},!0)}freeHold(e){e.hold&&(this.store.drop(e,`hold`),clearTimeout(e.hold.timer),this.lost||(this.gl.deleteTexture(e.hold.maps),this.gl.deleteFramebuffer(e.hold.fbo)),e.hold=null,e.heat=0)}holding(e){let t=e.spec;if(e.hold)return e.hold;this.making_(e,t.pw*t.ph*24),this.store.hold(e,`hold`,()=>t.pw*t.ph*24,()=>this.freeHold(e));let{gl:n}=this,r=n.createTexture(),i=n.createFramebuffer(),a=[0,1,2];n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D_ARRAY,r),n.texStorage3D(n.TEXTURE_2D_ARRAY,1,n.RGBA16F,t.pw,t.ph,a.length),U(n,n.NEAREST,n.NEAREST,n.TEXTURE_2D_ARRAY),n.bindTexture(n.TEXTURE_2D_ARRAY,null),n.bindFramebuffer(n.FRAMEBUFFER,i);for(let e of a)n.framebufferTextureLayer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+e,r,0,e);n.drawBuffers(a.map(e=>n.COLOR_ATTACHMENT0+e));let o=()=>{performance.now()-e.warmed>rs?this.freeHold(e):e.hold.timer=setTimeout(o,rs)};return e.hold={maps:r,fbo:i,stale:!0,timer:setTimeout(o,rs)}}freeBake(e){if(!e.bake)return;this.store.drop(e,`bake`),clearTimeout(e.bake.timer);let{gl:t}=this,{maps:n,shadow:r,fbo:i,shadows:a}=e.bake;this.lost||(t.deleteTexture(n),t.deleteTexture(r),t.deleteFramebuffer(i),t.deleteFramebuffer(a)),e.bake=null}baked(e,t,n,r){let{gl:i}=this;if(e.bake&&(e.bake.pw!==t||e.bake.ph!==n)&&this.freeBake(e),!e.bake){this.making_(e,t*n*33),this.store.hold(e,`bake`,()=>t*n*33,()=>this.freeBake(e)),i.activeTexture(i.TEXTURE0);let a=i.createTexture(),o=i.createTexture(),s=[0,1,2,3];i.bindTexture(i.TEXTURE_2D_ARRAY,a),i.texStorage3D(i.TEXTURE_2D_ARRAY,1,i.RGBA16F,t,n,s.length),U(i,i.NEAREST,i.NEAREST,i.TEXTURE_2D_ARRAY),i.bindTexture(i.TEXTURE_2D_ARRAY,null),i.bindTexture(i.TEXTURE_2D,o),i.texStorage2D(i.TEXTURE_2D,1,i.RGBA8,Math.ceil(t/2),Math.ceil(n/2)),U(i,i.LINEAR,i.LINEAR);let c=i.createFramebuffer(),l=i.createFramebuffer();i.bindFramebuffer(i.FRAMEBUFFER,c);for(let e of s)i.framebufferTextureLayer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+e,a,0,e);i.drawBuffers(s.map(e=>i.COLOR_ATTACHMENT0+e)),i.bindFramebuffer(i.FRAMEBUFFER,l),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,o,0);let u=()=>{performance.now()-e.bake.used>rs?this.freeBake(e):e.bake.timer=setTimeout(u,rs)};e.bake={pw:t,ph:n,room:r.ambient,lit:Ft(r.lighting),glow:!1,once:!0,stale:!0,used:0,timer:setTimeout(u,rs),maps:a,shadow:o,fbo:c,shadows:l}}return e.bake.used=performance.now(),e.bake}free(e){this.freeBake(e),this.freeHold(e),this.freeMaps(e)}freeMaps(e){if(this.store.drop(e,`maps`),!e.tex)return;let{gl:t}=this,{A:n,H:r,S:i,E:a,G:o,M:s,D:c,N:l,C:u,O:d,T:f,mask:p,fbo:m,glow:h,weather:g,condition:_,occlusion:v,back:y,under:b,own:x,deep:S}=e.tex;if(!this.lost){for(let e of[n,r,i,a,o,s,c,l,u,d,f,p,y?.A,y?.E,y?.S,b?.H,b?.N,x?.H])e&&t.deleteTexture(e);h&&t.deleteFramebuffer(h),x&&t.deleteFramebuffer(x.fbo),S&&t.deleteRenderbuffer(S),t.deleteFramebuffer(m),t.deleteFramebuffer(g),t.deleteFramebuffer(_),t.deleteFramebuffer(v),y&&t.deleteFramebuffer(y.fbo),b&&t.deleteFramebuffer(b.fbo),b?.nfbo&&t.deleteFramebuffer(b.nfbo)}e.tex=null}mapBytes(e){let{gl:t}=this,n=e.spec,r=e.tex,i=this.heightFormat===t.RGBA32F?16:this.heightFormat===t.R32F?4:8,a=(4+i+(r.D?2:0)+(r.N?4:0))*(4/3)+(r.under?.N?4/3*4:0)+(r.E?4:0)+4+4+(this.targets.length>4?4:0)+(r.U?2:0)+(r.back?16:0)+(r.under?4/3*i:0)+(r.own?i+4:0),o=4/Ds(n.dpr)**2+4/3+(r.G?4/3*4:0);return e.map.w*e.map.h*a+n.pw*n.ph*o+r.tops.length}mapFor(e,t,n){let r=e.spec,i=r.pw/r.cw,a=null;for(let e of t)a=G(a,W(e));for(let e of n)a=G(a,{x:e.box.x/Z,y:e.box.y/Z,w:e.box.w/Z,h:e.box.h/Z});if(!a)return{x:0,y:0,w:r.pw,h:r.ph};let o=xs(Cs(a,Zo),i),s=Math.max(Math.floor(o.x/Qo)*Qo,0),c=Math.max(Math.floor(o.y/Qo)*Qo,0),l=Math.min(o.x+o.w,r.pw),u=Math.min(o.y+o.h,r.ph);return{x:s,y:c,w:Math.max(l-s,1),h:Math.max(u-c,1)}}mapUv(e){let t=e.spec,n=e.map;return[t.pw/n.w,t.ph/n.h,-n.x/n.w,-n.y/n.h]}clipMap(e,t){let{gl:n}=this,r=e.spec,{x:i,y:a,w:o,h:s}=xs(t,r.pw/r.cw);n.enable(n.SCISSOR_TEST),n.scissor(i-e.map.x,a-e.map.y,o,s)}onMap(e,t){let n=e.map;if(!t)return{x:0,y:0,w:n.w,h:n.h};let r=xs(t,e.spec.pw/e.spec.cw),i=Math.max(r.x-n.x,0),a=Math.max(r.y-n.y,0);return{x:i,y:a,w:Math.max(Math.min(r.x-n.x+r.w,n.w)-i,0),h:Math.max(Math.min(r.y-n.y+r.h,n.h)-a,0)}}capture(e,t,n){e.spec;let{gl:r}=this,i=e.tex;if(!i.back){let t=this.levels(e),n=n=>{let i=r.createTexture();return r.bindTexture(r.TEXTURE_2D,i),r.texStorage2D(r.TEXTURE_2D,t,n,e.map.w,e.map.h),U(r,r.LINEAR_MIPMAP_LINEAR,r.LINEAR),i},a=n(r.SRGB8_ALPHA8),o=n(r.SRGB8_ALPHA8),s=n(r.RGBA8),c=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,c),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,a,0),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT1,r.TEXTURE_2D,o,0),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT2,r.TEXTURE_2D,s,0),i.back={A:a,E:o,S:s,fbo:c},r.bindTexture(r.TEXTURE_2D,i.mask)}let{A:a,E:o,S:s,fbo:c}=i.back,{x:l,y:u,w:d,h:f}=this.onMap(e,n);r.bindFramebuffer(r.READ_FRAMEBUFFER,i.fbo),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,c);let p=(e,t)=>{r.readBuffer(e),r.drawBuffers(t===r.COLOR_ATTACHMENT0?[t]:t===r.COLOR_ATTACHMENT1?[r.NONE,t]:[r.NONE,r.NONE,t]),r.blitFramebuffer(l,u,l+d,u+f,l,u,l+d,u+f,r.COLOR_BUFFER_BIT,r.NEAREST)};r.disable(r.BLEND);let m=r.isEnabled(r.SCISSOR_TEST);r.disable(r.SCISSOR_TEST),p(r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT0),p(r.COLOR_ATTACHMENT3,r.COLOR_ATTACHMENT1),p(r.COLOR_ATTACHMENT2,r.COLOR_ATTACHMENT2);for(let[e,n]of[[r.TEXTURE3,a],[r.TEXTURE4,o],[r.TEXTURE5,s]])r.activeTexture(e),r.bindTexture(r.TEXTURE_2D,n),t&&r.generateMipmap(r.TEXTURE_2D);r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.FRAMEBUFFER,i.fbo),r.readBuffer(r.COLOR_ATTACHMENT0),r.drawBuffers(i.targets),r.enable(r.BLEND),m&&r.enable(r.SCISSOR_TEST)}weather(e,t){let n=e.spec,{gl:r}=this,{u:i,program:a}=this.wea;n.pw/n.cw,r.bindFramebuffer(r.FRAMEBUFFER,e.tex.weather),r.viewport(-e.map.x,-e.map.y,n.pw,n.ph),r.drawBuffers([r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1]),r.useProgram(a),r.uniform2f(i.uCanvas,n.cw,n.ch),r.uniform4f(i.uBox,0,0,n.cw,n.ch),r.uniform4f(i.uMap,...this.mapUv(e)),r.uniform2f(i.uSeed,n.seed*73.1%997,n.seed*41.7%991),r.uniform1f(i.uAge,n.grime),r.uniform1f(i.uDpr,n.dpr),r.uniform1i(i.tH,0),r.uniform1i(i.tN,1),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,e.tex.N),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,e.tex.H),r.enable(r.BLEND),r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);for(let n of t??[null])n&&this.clipMap(e,n),r.drawArrays(r.TRIANGLE_STRIP,0,4);r.disable(r.SCISSOR_TEST),r.disable(r.BLEND),r.bindFramebuffer(r.FRAMEBUFFER,this.bench)}raise(e,t,n,r=[]){let{tops:i,tw:a,th:o}=e.tex,s=Math.max(e.peak/.6/Z,48),c=[];for(let r of t)`zTop`in r&&c.push([W(r),Math.min(Math.ceil((vt(r)+n)/e.tall*255),255)]);for(let t of r)c.push([{x:t.box.x/Z,y:t.box.y/Z,w:t.box.w/Z,h:t.box.h/Z},Math.min(Math.ceil(t.hi/e.tall*255),255)]);let l=(e,t,n,r)=>{let s=Math.max(Math.floor((e.x-t)/Ho),0),c=Math.min(Math.floor((e.x+e.w+t)/Ho),a-1),l=Math.max(Math.floor((e.y-t)/Ho),0),u=Math.min(Math.floor((e.y+e.h+t)/Ho),o-1);for(let e=l;e<=u;e++)for(let t=s,o=(e*a+t)*2+n;t<=c;t++,o+=2)i[o]<r&&(i[o]=r)};for(let[e,t]of c)l(e,48,0,t);let u=Math.ceil(s/Ho),d=Math.max(1,Math.ceil(u/16)),f=Math.floor(u/d)+1,p=e=>[Math.floor(Math.floor(e.x/Ho)/d),Math.floor(Math.floor((e.x+e.w)/Ho)/d),Math.floor(Math.floor(e.y/Ho)/d),Math.floor(Math.floor((e.y+e.h)/Ho)/d)],m=1/0,h=-1/0,g=1/0,_=-1/0,v=0;for(let[e]of c){let[t,n,r,i]=p(e);m=Math.min(m,t-f),h=Math.max(h,n+f),g=Math.min(g,r-f),_=Math.max(_,i+f),v+=((n-t+1)*d+2*u)*((i-r+1)*d+2*u)}m=Math.max(m,-f),h=Math.min(h,Math.floor((a-1)/d)+f),g=Math.max(g,-f),_=Math.min(_,Math.floor((o-1)/d)+f);let y=h-m+1,b=_-g+1;if(y>0&&b>0&&v<4*y*b*d*d)for(let[e,t]of c)l(e,s,1,t);else if(y>0&&b>0){let e=Bo(y*b);for(let[t,n]of c){let[r,i,a,o]=p(t);for(let t=Math.max(a,g);t<=Math.min(o,_);t++)for(let a=Math.max(r,m),o=(t-g)*y+a-m;a<=Math.min(i,h);a++,o++)e[o]<n&&(e[o]=n)}Vo(e,y,b,f);let t=Math.max(m*d,0),n=Math.min((h+1)*d-1,a-1);for(let r=Math.max(g*d,0);r<=Math.min((_+1)*d-1,o-1);r++){let o=(Math.floor(r/d)-g)*y-m;for(let s=t,c=(r*a+s)*2+1;s<=n;s++,c+=2){let t=e[o+Math.floor(s/d)];i[c]<t&&(i[c]=t)}}}let{gl:x}=this,{T:S}=e.tex;x.activeTexture(x.TEXTURE7),x.bindTexture(x.TEXTURE_2D,S),x.pixelStorei(x.UNPACK_ALIGNMENT,1),x.texSubImage2D(x.TEXTURE_2D,0,0,0,a,o,x.RG,x.UNSIGNED_BYTE,i),x.pixelStorei(x.UNPACK_ALIGNMENT,4),x.activeTexture(x.TEXTURE0)}mips(e){let{gl:t}=this,n=t.getParameter(t.ACTIVE_TEXTURE);t.activeTexture(t.TEXTURE0+$o),t.bindTexture(t.TEXTURE_2D,e),t.generateMipmap(t.TEXTURE_2D),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(n)}spread(e,t){let{gl:n}=this,r=e.tex,i=e.map,a=this.onMap(e,t);n.disable(n.SCISSOR_TEST),n.bindFramebuffer(n.READ_FRAMEBUFFER,r.fbo),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,r.glow),n.readBuffer(n.COLOR_ATTACHMENT3),n.drawBuffers([n.COLOR_ATTACHMENT0]),n.blitFramebuffer(a.x,a.y,a.x+a.w,a.y+a.h,a.x+i.x,a.y+i.y,a.x+i.x+a.w,a.y+i.y+a.h,n.COLOR_BUFFER_BIT,n.NEAREST),n.readBuffer(n.COLOR_ATTACHMENT0),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.bindFramebuffer(n.FRAMEBUFFER,this.bench),this.mips(r.G)}level(e,t){let{gl:n}=this,r=e.tex;if(n.activeTexture(n.TEXTURE6),!r.under){let t=t=>{let r=this.target(e,t,this.levels(e)),i=n.createFramebuffer();return n.bindFramebuffer(n.FRAMEBUFFER,i),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,r,0),[r,i]},[i,a]=t(this.heightFormat),[o,s]=r.N?t(n.RGBA8):[null,null];r.under={H:i,N:o,fbo:a,nfbo:s}}let{x:i,y:a,w:o,h:s}=this.onMap(e,t),c=r.under;n.bindTexture(n.TEXTURE_2D,c.H),n.activeTexture(n.TEXTURE10),n.bindTexture(n.TEXTURE_2D,c.N),n.activeTexture(n.TEXTURE0),n.disable(n.BLEND),n.disable(n.SCISSOR_TEST),n.bindFramebuffer(n.READ_FRAMEBUFFER,r.fbo);for(let[e,t,r]of[[n.COLOR_ATTACHMENT1,c.H,c.fbo],[n.COLOR_ATTACHMENT5,c.N,c.nfbo]])t&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,r),n.readBuffer(e),n.blitFramebuffer(i,a,i+o,a+s,i,a,i+o,a+s,n.COLOR_BUFFER_BIT,n.NEAREST));n.readBuffer(n.COLOR_ATTACHMENT0),this.mips(c.H),c.N&&this.mips(c.N),n.disable(n.SCISSOR_TEST),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.bindFramebuffer(n.FRAMEBUFFER,r.fbo),n.enable(n.BLEND)}clip(e,t,n,r=0){let{gl:i}=this,{x:a,y:o,w:s,h:c}=xs(e,t);i.enable(i.SCISSOR_TEST),i.scissor(r+a,n?n-o-c:o,s,c)}edgesStale(e){let{body:t}=e.spec;return!!t&&!!e.tex&&t.some((t,n)=>t!==e&&!!t.made&&t.shaped!==e.edged[n])}beside(e){let t=e.spec,n=[];if(!t.body)return n;let r=e=>Math.round(e*1e6)/1e6,i=e=>e.face-e.axis,a=(t.x+t.w/2)*Z,o=(t.y+t.h/2)*Z,s=i(t);for(let c of t.body){if(c===e||!c.made)continue;let l=c.spec,u=r(Math.cos(l.round-t.round)),d=r(Math.sin(l.round-t.round));if(Math.abs(u)>.01)continue;let f=(l.x+l.w/2)*Z,p=(l.y+l.h/2)*Z,m=i(l),h=[],g=[];for(let e of[l.x*Z-f,(l.x+l.w)*Z-f])for(let t of[0,c.peak-m])h.push(e*u+t*d+a),g.push(-e*d+t*u+s);let _=Math.max(...g);if(_<=0)continue;let v=Math.min(...h),y=Math.max(...h),b=l.y*Z-p+o;n.push({plate:c,turn:[u,d,l.cw*Z,l.ch*Z],at:[f,p,m],box:{x:v,y:b,w:y-v,h:l.h*Z},hi:_})}return n}section(e,t,n){let{recorder:r}=this,i=e.spec,a=(i.x+i.w/2)*Z,o=(i.y+i.h/2)*Z,s=i.face-i.axis,c=W(t);for(let e of n)for(let t of e.plate.made){if(t.op!==`surface`||!t.layer||t.bend)continue;let n=this.sections.get(t.shape);n&&(r.aim={box:c,seen:[e.turn[1],...e.at],from:[a,o,s],reach:W(t),rows:n},r.draw(t,e.plate))}r.aim=null}across(e,t,n){let{gl:r,recorder:i}=this,{later:a}=i,o=e.spec,s=e.tex;if(o.pw/o.cw,!s.own){let t=this.target(e,this.heightFormat,1),i=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,i),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t,0),s.own={H:t,fbo:i},n=null}s.deep||(s.deep=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,s.deep),r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_COMPONENT24,e.map.w,e.map.h),r.bindFramebuffer(r.FRAMEBUFFER,s.fbo),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,s.deep)),r.bindFramebuffer(r.FRAMEBUFFER,this.bench),e.edged=o.body.map(e=>e.shaped);let c=s.own,l=(n??[null]).map(t=>this.onMap(e,t));a.push(()=>{r.disable(r.BLEND),r.disable(r.SCISSOR_TEST),r.bindFramebuffer(r.READ_FRAMEBUFFER,s.fbo),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,c.fbo),r.readBuffer(r.COLOR_ATTACHMENT1);for(let{x:e,y:t,w:n,h:i}of l)r.blitFramebuffer(e,t,e+n,t+i,e,t,e+n,t+i,r.COLOR_BUFFER_BIT,r.NEAREST);r.readBuffer(r.COLOR_ATTACHMENT0),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.FRAMEBUFFER,s.fbo),r.drawBuffers(s.targets),r.activeTexture(r.TEXTURE8),r.bindTexture(r.TEXTURE_2D,c.H),r.activeTexture(r.TEXTURE0),r.enable(r.DEPTH_TEST),r.depthFunc(r.LESS),r.depthMask(!0)});let u=(o.x+o.w/2)*Z,d=(o.y+o.h/2)*Z,f=o.face-o.axis;for(let o of n??[null]){a.push(()=>{o?this.clipMap(e,o):r.disable(r.SCISSOR_TEST),r.clearBufferfv(r.DEPTH,0,[1])});for(let e of t){let t=e.turn[1],[n,r,a]=e.at;for(let s of e.plate.made){if(s.op!==`surface`||s.body||s.follow||s.bridge||s.bend&&!S(he(s.shape,0),s.bend)||s.zTop<s.zEdge||s.shape.type===`holes`||s.shape.type===`mask`)continue;let c=vt(s),l=W(s),p=Math.max((n-l.x*Z)*t,(n-(l.x+l.w)*Z)*t)+f;if(c<=a||p<=0)continue;let m=u+(Math.max(Math.min(s.zEdge,c),a)-a)*t,h=u+(c-a)*t,g={x:Math.min(m,h)/Z,y:(l.y*Z-r+d)/Z,w:Math.abs(h-m)/Z,h:l.h};(!o||Ss(g,o))&&(i.aim={box:g,seen:[t,n,r,a],from:[u,d,f],reach:l},i.draw(s,e.plate))}}}i.aim=null,a.push(()=>{r.disable(r.DEPTH_TEST),r.disable(r.SCISSOR_TEST)})}reach(e,t,n,r){let i=e.spec,a=n,o=0;for(let e of t)e.op===`glass`?o=Math.max(o,e.height):`zTop`in e&&(a=Math.max(a,vt(e)));for(let e of r)a=Math.max(a,e.hi);a+=o+1;let s=Os(i),c=t.reduce((e,t)=>{if(t.op!==`surface`||!(t.bridge||t.rest))return e;let n=W(t);return Math.max(e,i.x-n.x,i.y-n.y,n.x+n.w-s.right,n.y+n.h-s.bottom)},0),l=r.reduce((e,{box:t})=>Math.max(e,i.x-t.x/Z,i.y-t.y/Z,t.x/Z+t.w/Z-s.right,t.y/Z+t.h/Z-s.bottom),0),u=Math.ceil((i.cast>0?a:0)/.75/Z)+36+Math.ceil(Math.max(c,l,0));return{peak:a,glass:o,margin:[Math.min(u,i.room[0]),Math.min(u,i.room[1])]}}narrow(e,[t,n]){return t>e.x||n>e.y}paint(e,t){this.store.use(e);let{gl:n,recorder:r}=this,{later:i}=r,{u:a,program:o}=this.mat,s=e.spec,{commands:c,began:l,stands:u,fixed:d,partial:f,moved:p,coloured:m,pictures:h,hot:g,stood:_,redrawn:v}=t,y=h.filter(e=>{if(e.kind!==`crt`&&e.kind!==`oled`)return!1;let t=W(e);return!c.some(n=>n!==e&&Es(n)&&Ss(W(n),t))});for(let e of h)y.includes(e)||m.push(W(e));s.pw/s.cw;let b=c.filter(e=>e.op===`frost`);for(let e of b)e.blur===0&&e.zoom>=1&&p.some(t=>Ss(W(e),t))?p.push(W(e)):e.blur===0&&e.zoom>=1&&m.some(t=>Ss(W(e),t))&&m.push(W(e));let x=f?ws([...p,...m]):null;x&&x.reduce((e,t)=>e+t.w*t.h,0)>s.cw*s.ch*.5&&(x=null),x?.some(e=>b.some(t=>t.blur>0&&Ss(Cs(W(t),t.blur*3),e)))&&(x=null),x?.some(e=>c.some(t=>t.op===`surface`&&t.bridge>0&&Ss(W(t),e)))&&(x=null);let S=[],C=new Map,w=new Map;for(let e of c)if(e.op===`glass`){let t=e.shape.type===`rect`?js(e.shape):null;if(t&&!(e.bend&&e.bend.k>=0)){S.push(e),w.set(e,t);let n=W(e);C.set(e,c.slice(0,c.indexOf(e)).reduce((e,t)=>t.op!==`glass`&&`zTop`in t&&Ss(W(t),n)?Math.max(e,vt(t)):e,0))}}let T=new Set([...S].sort((e,t)=>w.get(t).hw*w.get(t).hh-w.get(e).hw*w.get(e).hh).slice(0,8));e.paned=T,e.panes=S.filter(e=>T.has(e)).flatMap(e=>{let{height:t,bevel:n,curve:r,film:i,rim:a,tint:o,coat:s,chamfer:c,reflect:l}=e,u=w.get(e);return[u.cx,u.cy,u.hw,u.hh,u.radius,t/(n*Z),n,r,Math.max(a/Z,1),...o,s,i,C.get(e)+t,c[0]/Z,c[1],l]});let E=this.beside(e),{peak:D,glass:O,margin:k}=this.reach(e,c,u,E);e.peak=D;let A=e.peak>40?40*2**Math.ceil(Math.log2(e.peak/40)):40;if(A!==e.tall&&(x=null),e.tall=A,!x&&this.narrow(s,k)&&!d)return{margin:k};if(!x){let t=this.fields.missing(c.flatMap(e=>`shape`in e&&e.shape.type===`field`?[e.shape]:[]),s.dpr),n=t.reduce((e,t)=>e+this.fields.cost(t,s.dpr),0);if(t.length&&n>this.fieldRoom){if(e.wanted=t,!t.every(e=>this.fields.held(e)))return null;e.stood=this.making(e)}else this.fieldRoom-=n,this.fields.make(t,s.dpr),e.stood=!1}let j=this.mapFor(e,c,E),M=e.map;if(!e.tex)e.map=j;else if(j.x<M.x||j.y<M.y||j.x+j.w>M.x+M.w||j.y+j.h>M.y+M.h){let t=e.tex.mask;e.tex.mask=null,this.free(e),e.map=j,this.allocTextures(e,t),x=null}x||this.prepare(e);let N=e.tex;if(!N.E&&c.some(Es)){N.E=this.target(e,n.SRGB8_ALPHA8,1);let t=e.spec;N.G=n.createTexture(),n.bindTexture(n.TEXTURE_2D,N.G),n.texStorage2D(n.TEXTURE_2D,Math.floor(Math.log2(Math.max(t.pw,t.ph)))+1,n.SRGB8_ALPHA8,t.pw,t.ph),U(n,n.LINEAR_MIPMAP_LINEAR,n.LINEAR),N.glow=n.createFramebuffer(),n.bindFramebuffer(n.FRAMEBUFFER,N.glow),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,N.G,0),n.bindFramebuffer(n.FRAMEBUFFER,N.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT3,n.TEXTURE_2D,N.E,0),N.targets[3]=n.COLOR_ATTACHMENT3}!N.U&&this.undersides&&c.some(e=>e.op===`surface`&&e.mid)&&(N.U=this.target(e,n.R16F,1),n.bindFramebuffer(n.FRAMEBUFFER,N.fbo),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT6,n.TEXTURE_2D,N.U,0),N.targets=[n.COLOR_ATTACHMENT0,n.COLOR_ATTACHMENT1,n.COLOR_ATTACHMENT2,N.targets[3],N.targets[4]??n.NONE,N.targets[5]??n.NONE,n.COLOR_ATTACHMENT6]),x&&this.stats.partial++,this.block.two(this.block.at.uCanvas,s.cw,s.ch),this.block.four(this.block.at.uMap,...this.mapUv(e)),i.length=0;let P=x?.length?x.reduce((e,t)=>G(e,t)):null;for(let t of x??[null]){i.push(()=>{t&&this.clipMap(e,t);for(let e=0;e<N.targets.length;e++)n.clearBufferfv(n.COLOR,e,[0,0,0,0])});let a=!0;for(let n of c)(!t||Ss(W(n),t))&&(n.op===`frost`?a&&=(i.push(()=>this.capture(e,b.some(e=>e.blur>0),P)),!1):a=!0,n.op===`surface`&&n.bridge&&i.push(()=>this.level(e,Cs(W(n),n.bridge*2))),n.op===`surface`&&n.section?this.section(e,n,E):r.draw(n,e))}if(x&&y.length){i.push(()=>n.drawBuffers([n.NONE,n.NONE,n.NONE,n.COLOR_ATTACHMENT3]));for(let t of y){let a=W(t);i.push(()=>{this.clipMap(e,a),n.clearBufferfv(n.COLOR,3,[0,0,0,0])}),r.draw(t,e);for(let n of c.slice(c.indexOf(t)+1))n.op!==`glass`&&Ss(W(n),a)&&r.draw(n,e)}}s.body&&(e.made=c,this.across(e,E,x)),r.drawing=null,this.block.send(),n.bindFramebuffer(n.FRAMEBUFFER,e.tex.fbo),n.viewport(-e.map.x,-e.map.y,s.pw,s.ph),n.drawBuffers(N.targets),n.disable(n.BLEND),n.disable(n.SCISSOR_TEST),n.useProgram(o),n.uniform1i(a.uMask,0),n.uniform1i(a.uField,1),n.uniform1i(a.uScreen,2),n.uniform1i(a.uBackA,3),n.uniform1i(a.uBackE,4),n.uniform1i(a.uBackS,5),n.uniform1i(a.uBackH,6),n.uniform1i(a.uBackN,10),n.uniform1i(a.uOwn,8),n.uniform1i(a.uRows,9),n.uniform1i(a.uClipField,7),n.activeTexture(n.TEXTURE8),n.bindTexture(n.TEXTURE_2D,e.tex.own?.H??this.dark),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,null),n.activeTexture(n.TEXTURE9),n.bindTexture(n.TEXTURE_2D,null),n.activeTexture(n.TEXTURE13),n.bindTexture(n.TEXTURE_2D,null),n.activeTexture(n.TEXTURE10),n.bindTexture(n.TEXTURE_2D,e.tex.under?.N??null),n.activeTexture(n.TEXTURE2),n.bindTexture(n.TEXTURE_2D,this.screenTex),n.activeTexture(n.TEXTURE3),n.bindTexture(n.TEXTURE_2D,e.tex.back?.A??null),n.activeTexture(n.TEXTURE4),n.bindTexture(n.TEXTURE_2D,e.tex.back?.E??null),n.activeTexture(n.TEXTURE5),n.bindTexture(n.TEXTURE_2D,e.tex.back?.S??null),n.activeTexture(n.TEXTURE6),n.bindTexture(n.TEXTURE_2D,e.tex.under?.H??null),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,e.tex.mask),n.enable(n.BLEND),n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);for(let e of i)e();n.disable(n.BLEND),n.bindFramebuffer(n.FRAMEBUFFER,this.bench),n.disable(n.SCISSOR_TEST);let F=p.length?ws(p).reduce((e,t)=>G(e,t)):null,I=!x;(I||F)&&this.mips(N.H),N.N&&(I||F)&&this.mips(N.N),s.grime>0&&(I||x.length)&&this.weather(e,x),(I||P)&&this.mips(N.A),N.E&&(this.spread(e,I?null:y.reduce((e,t)=>G(e,W(t)),P)),this.glowDrawn=!0),N.D&&(I||F)&&this.mips(N.D),n.disable(n.SCISSOR_TEST),(I||F)&&this.occlusion(e,F),n.disable(n.SCISSOR_TEST),this.probe&&this.wait(0,0),this.stats.paintMs+=performance.now()-l,this.stats.paints++,I?(e.tex.tops.fill(0),this.raise(e,c,O+1,E),e.reedge||e.shaped++):F&&this.raise(e,v,O+1),e.reedge=!1;let L=e.panes.length?Yo:Math.min(Jo+(_+1)*Xo/Z,Yo),R=I?[]:[...p.map(e=>Cs(e,L)),...m.map(e=>Cs(e,Jo))],ee=R.reduce((e,t)=>G(e,t),null);if(e.bake&&(e.bake.stale=I||g&&!e.bake.glow||e.bake.stale===!0?!0:e.bake.stale?G(e.bake.stale,ee):ee),e.hold&&(e.hold.stale=I||e.hold.stale===!0?!0:ws([...e.hold.stale??[],...R])),I)e.heat=0;else if(g){let t=performance.now();e.heat=t-e.warmed<ns?e.heat+1:1,e.warmed=t}return e.glowing=g&&!I,{all:I||g,box:ee}}beam(e,t,n){let r=It[n.handheld],i=ks(n,t),a=t.width/e.cw,o=(i.x-t.left)/a*Z,s=(i.y-t.top)/a*Z,c=Os(e),l=ss*(c.long*Z/150)**.75*r.hold,u=c.cx*Z,d=c.cy*Z+l*.7,f=performance.now()/1e3,p=r.flicker?Math.sin(f*9.1)*.5+Math.sin(f*14.7+1)*.3+Math.sin(f*23.3+2)*.2:0,m=u+(o-u)*r.arm+p*l*.03,h=d+(s-d)*r.arm,g=l*.85,_=Math.hypot(o-m,s-h,g),v=_*Math.tan(Math.min(r.cone*2,1.35))*1.6;return{sx:m,sy:h,sz:g,ax:(o-m)/_,ay:(s-h)/_,az:-g/_,far:_,shake:p,tx:o,ty:s,pool:{x:(o-v)/Z,y:(s-v)/Z,w:v*2/Z,h:v*2/Z}}}points(e,t){let n=wo(),r=e.spec;if(!n.size&&!this.emitters.length)return hs;let i=new Float32Array(16),a=new Float32Array(12),o=t.width/r.cw,s=Os(r),c=t.left+s.cx*o,l=t.top+s.cy*o,u=[],d=(e,t,n,r,i,a,o)=>{let s=o*n*n/(n*n+(e-c)**2+(t-l)**2+r*r);if(u.length===4&&!(s>u[3].gives))return;let d=u.length;for(;d>0&&u[d-1].gives<s;)d--;u.splice(d,0,{x:e,y:t,half:n,up:r,color:i,flat:a,gives:s}),u.length>4&&u.pop()};for(let e of n){let[t,n]=To(e.at),r=e.reach/2;d(t,n,r,e.height??r,e.color,!1,Math.max(...e.color))}for(let t of this.emitters)t.from!==e&&d(t.at[0],t.at[1],t.half,0,t.color,!0,Math.max(t.color[0],t.color[1],t.color[2]));return u.forEach(({x:e,y:n,half:s,up:c,color:l,flat:u},d)=>{let f=Z/o;i.set([(e-t.left)*f,(n-t.top)*f,r.face+c*f,(u?-1:1)*(s*f)**2],d*4),a.set(l,d*3)}),{n:u.length,at:i,color:a}}poolMoved(e,t,n){let r=e.spec,i=e=>e.x<r.cw&&e.y<r.ch&&e.x+e.w>0&&e.y+e.h>0,{pool:a}=this.beam(r,n,t),o=i(e.pool);return e.pool=a,o||i(a)}light({plate:e,rect:t,lighting:n,ctx:r},i){let{gl:a}=this,o=this.sheet,s=e.spec,c=e.seat,{pw:l,ph:u,scale:d}=c,f=ks(i,t),{all:p,full:m,sweeping:h,ambient:g,look:_,lights:v,torch:y}=i,b=performance.now(),x=p?null:s.lightDirty?s.lightBox:e.roughBox,S=l/s.cw,C=o.height-c.y-u,w=()=>a.viewport(c.x,C,l,u),T=As(s,i),E=h&&!i.sizing&&!_&&!T&&this.linked()?this.fast:null;!E&&e.bake?.once&&this.freeBake(e);let D=e.heat>=ts&&b-e.warmed<rs,O=D&&!s.debug&&d===1&&!E&&!T&&this.glowLinked()?this.glow:null,k=Ft(n),{room:A,brush:j}=this.rooms.for(k,i.tilt);e.hold&&(E||T||d<1||s.debug||p||s.lightDirty&&!x&&!e.glowing||e.hold.lit!==k)&&(e.hold.stale=!0),e.hold&&(e.hold.lit=k);let M=Math.max(cs,Os(s).long*Z*(s.lean||s.turns?us:ls)),N=Math.tan(_*Math.PI/180)*M*f.i,P=Math.tan(i.tilt*Math.PI/180)*M,F=0,I=0,L=Math.sign(s.spin)*(Math.abs(s.spin)<Math.PI/2?Math.min(Math.abs(s.spin),ms):Math.max(Math.abs(s.spin),Math.PI-ms));if(T){let e=t.width/s.cw,n=Math.tan(s.lean*Math.PI/180)*M;if(s.spin)F=Math.tan(L)*M,I=s.turn[1]*n;else if(i.carried){let r=(f.x-t.left-(s.x+s.w/2)*e)/(s.w/2*e),i=(f.y-t.top-(s.y+s.h/2)*e)/(s.h/2*e),a=n*s.hand/Math.max(Math.hypot(r,i),1);F=r*a,I=i*a}else F=s.turn[0]*n,I=s.turn[1]*n}if(s.angle[0]||s.angle[1]||s.eye[0]||s.eye[1]){let[e,t,n]=fs(s.angle,s.eye),r=Math.hypot(e,t)/n,i=Math.min(1,Math.tan(ds*Math.PI/180)/r)/n;F+=e*i*M,I+=t*i*M}let R=It[i.handheld],ee=y*f.i>0?this.beam(s,t,i):null,z=y*f.i*R.power*(1+(ee?.shake??0)*R.flicker);ee?(!p||m||v||_||!e.pool||s.lightDirty&&!s.lightBox||(x=G(G(e.pool,ee.pool),s.lightDirty?s.lightBox:null)),e.pool=ee.pool):e.pool=null;let te=e.rough;e.rough=d<this.fit(s),e.roughBox=e.rough&&x&&(!te||e.roughBox)?G(e.roughBox,x):null;let B=this.points(e,t),ne=({u:n,program:o},c=ee)=>{a.useProgram(o),a.uniform2f(n.uCss,s.cw,s.ch),a.uniform4f(n.uMap,...this.mapUv(e));let l=Os(s),u=l.cx*Z,p=l.cy*Z,m=l.long*Z;a.uniform4f(n.uFrame,0,0,s.cw,s.ch);let h=(f.x-i.width/2)/(i.width/2),_=(f.y-i.height/2)/(i.height/2);a.uniform3f(n.uCam,u-P*.44+h*N+F,p+P*.9+_*N+I,M),a.uniform1f(n.uPeak,e.peak),a.uniform1f(n.uTall,e.tall),a.uniform1f(n.uFace,s.face),a.uniform2f(n.uSpin,1/Math.cos(L),s.spin?s.axis:0),a.uniform3f(n.uOwn,...s.owns),a.uniform2f(n.uRound,Math.sin(L),Math.cos(L)),a.uniform1f(n.uLift,Math.max(s.face-s.cast,0)),a.uniform4f(n.uBody,s.x+s.w/2,s.y+s.h/2,s.w/2,s.h/2),a.uniform1i(n.uPanes,e.panes.length/18),a.uniform1i(n.uGlow,D&&e.tex.E?1:0),a.uniform1i(n.uLinear,this.staged&&!r?1:0),e.panes.length&&a.uniform1fv(n[`uPane[0]`],e.panes),a.uniform1f(n.uDpr,s.dpr*d);let y=v*s.hand,b=Math.sqrt(i.width*i.height)/2,x=1-y*.65,S=t.width/s.cw,C=(f.x-t.left-l.cx*S)/b,w=(f.y-t.top-l.cy*S)/b,[T,E,O]=fs(s.angle,[m*(k.lamp[0]*x+C*k.sway*y),m*(k.lamp[1]*x+w*k.sway*y),m*3]),A=T,j=O-(s.face-s.axis),te=Math.sin(L),ne=Math.cos(L);a.uniform3f(n.uKey,u+A*ne+j*te,p+E,s.face-s.axis-A*te+j*ne);let[V,re,ie]=fs(s.angle,[k.lamp[0],k.lamp[1],3]),H=Math.hypot(V,re,ie);a.uniform3f(n.uSky,(V*ne+ie*te)/H,re/H,(ie*ne-V*te)/H),a.uniform1f(n.uLamp,5.2*k.power),a.uniform1f(n.uLampSoft,k.soft),a.uniform1f(n.uLampHead,k.camera),a.uniform1f(n.uFill,k.fill),a.uniform1f(n.uPageShade,k.shadow),a.uniform3f(n.uRoomColor,...k.color),a.uniform1f(n.uRoom,g),c?(a.uniform4f(n.uTorch,c.sx,c.sy,c.sz,z),a.uniform3f(n.uAim,c.ax,c.ay,c.az),a.uniform4f(n.uBeam,R.core,R.flood,R.edge,R.spill),a.uniform4f(n.uCone,R.cone,c.sz,R.rings,R.fluoresce),a.uniform3f(n.uTint,...R.color)):a.uniform4f(n.uTorch,0,0,1,0),a.uniform1i(n.uPoints,B.n),B.n&&(a.uniform4fv(n[`uPoint[0]`]??null,B.at),a.uniform3fv(n[`uPointColor[0]`]??null,B.color)),a.uniform1i(n.uDebug,s.debug),a.uniform1f(n.uSplit,s.split<0?-1:(s.x+s.w*s.split)*Z)},V=(...e)=>e.forEach((e,t)=>{a.activeTexture(a.TEXTURE0+t),a.bindTexture(a.TEXTURE_2D,e)});a.activeTexture(a.TEXTURE12),a.bindTexture(a.TEXTURE_2D,e.tex.U??this.dark),a.activeTexture(a.TEXTURE13),a.bindTexture(a.TEXTURE_2D,e.tex.N??this.dark),a.activeTexture(a.TEXTURE15),a.bindTexture(a.TEXTURE_2D_ARRAY,j),a.activeTexture(a.TEXTURE11),a.bindTexture(a.TEXTURE_2D,null),a.bindTexture(a.TEXTURE_2D_ARRAY,null);let re=[e.tex.A,e.tex.H,e.tex.S,e.tex.G??this.dark,A,e.tex.C,e.tex.O,e.tex.T,e.tex.M,e.tex.D];if(E){let t=this.baked(e,l,u,i);t.once&&=!h,(t.room!==g||t.lit!==k||t.glow!==D)&&(t.stale=!0),t.room=g,t.lit=k,t.glow=D;let n=(e,t)=>{a.activeTexture(a.TEXTURE10),a.bindTexture(a.TEXTURE_2D_ARRAY,e),a.activeTexture(a.TEXTURE11),a.bindTexture(a.TEXTURE_2D,t)};n(null,null),V(...re),t.stale&&(a.bindFramebuffer(a.FRAMEBUFFER,t.fbo),a.viewport(0,0,l,u),ne(E.bake,null),t.stale!==!0&&this.clip(t.stale,S,u),a.drawArrays(a.TRIANGLE_STRIP,0,4),a.disable(a.SCISSOR_TEST),t.stale=null,this.stats.bakes++),a.bindFramebuffer(a.FRAMEBUFFER,t.shadows),a.viewport(0,0,Math.ceil(l/2),Math.ceil(u/2)),ne(E.shadows),n(t.maps,null),x&&this.clip(Cs(x,4),S/2,Math.ceil(u/2)),a.drawArrays(a.TRIANGLE_STRIP,0,4),a.disable(a.SCISSOR_TEST),a.bindFramebuffer(a.FRAMEBUFFER,this.bench),w(),ne(E.quick),a.uniform2f(E.quick.u.uShift,-c.x,c.y),n(t.maps,t.shadow)}else if(O){let t=this.holding(e),n=t.stale;if(a.activeTexture(a.TEXTURE10),a.bindTexture(a.TEXTURE_2D_ARRAY,null),V(...re),n){a.bindFramebuffer(a.FRAMEBUFFER,t.fbo),a.viewport(0,0,l,u),ne(O.hold),a.uniform2f(O.hold.u.uShift,0,o.height-u);for(let e of n===!0?[null]:n)e&&this.clip(e,S,u),a.drawArrays(a.TRIANGLE_STRIP,0,4);a.disable(a.SCISSOR_TEST),t.stale=null,a.bindFramebuffer(a.FRAMEBUFFER,this.bench)}w(),ne(O.emit),a.uniform2f(O.emit.u.uShift,-c.x,c.y),a.activeTexture(a.TEXTURE10),a.bindTexture(a.TEXTURE_2D_ARRAY,t.maps),this.stats.glows++}else w(),ne(this.lit),a.uniform2f(this.lit.u.uShift,-c.x,c.y),V(...re),a.activeTexture(a.TEXTURE10),a.bindTexture(a.TEXTURE_2D_ARRAY,null);a.bindFramebuffer(a.FRAMEBUFFER,this.bench),x&&this.clip(x,S,C+u,c.x),a.drawArrays(a.TRIANGLE_STRIP,0,4),a.disable(a.SCISSOR_TEST),a.activeTexture(a.TEXTURE0),this.probe&&this.wait(c.x,C),E&&e.bake?.once&&this.freeBake(e),c.box=x,this.stats.lightMs+=performance.now()-b,this.stats.lights++,e.glowing=!1}copyOut(e){let{plate:t,ctx:n}=e,r=performance.now(),{x:i,y:a,pw:o,ph:s,box:c}=t.seat,l=this.canvas,u=t.spec,d=n;if(d.canvas.width!==u.pw&&(d.canvas.width=u.pw),d.canvas.height!==u.ph&&(d.canvas.height=u.ph),d.globalCompositeOperation=`copy`,c){let{x:e,y:t,w:n,h:r}=xs(c,u.pw/u.cw),s=o/u.pw;d.save(),d.beginPath(),d.rect(e,t,n,r),d.clip(),d.drawImage(l,i+e*s,a+t*s,n*s,r*s,e,t,n,r),d.restore()}else d.drawImage(l,i,a,o,s,0,0,u.pw,u.ph);d.clearRect(u.pw-2,0,2,u.ph),d.clearRect(0,u.ph-2,u.pw,2),this.stats.copyMs+=performance.now()-r,this.stats.copies++}copyThrough(e){let{plate:t,ctx:n}=e,r=performance.now(),{gl:i}=this,a=this.canvas,o=t.spec,s=n,{x:c,y:l,pw:u,ph:d,box:f}=t.seat;s.canvas.width!==o.pw&&(s.canvas.width=o.pw),s.canvas.height!==o.ph&&(s.canvas.height=o.ph);let p=u/o.pw,m=this.sheet.height-l-d,h=f?xs(f,o.pw/o.cw):{x:0,y:0,w:o.pw,h:o.ph},g=Math.max(Math.floor(a.width/Math.max(p,1)),1),_=Math.max(Math.floor(a.height/Math.max(p,1)),1);i.bindFramebuffer(i.READ_FRAMEBUFFER,this.bench),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),s.globalCompositeOperation=`copy`;for(let e=h.y;e<h.y+h.h;e+=_)for(let t=h.x;t<h.x+h.w;t+=g){let n=Math.min(g,h.x+h.w-t),r=Math.min(_,h.y+h.h-e),o=Math.round(n*p),l=Math.round(r*p);i.blitFramebuffer(c+Math.round(t*p),m+d-Math.round((e+r)*p),c+Math.round(t*p)+o,m+d-Math.round((e+r)*p)+l,0,a.height-l,o,a.height,i.COLOR_BUFFER_BIT,i.NEAREST),s.save(),s.beginPath(),s.rect(t,e,n,r),s.clip(),s.drawImage(a,0,0,o,l,t,e,n,r),s.restore()}s.clearRect(o.pw-2,0,2,o.ph),s.clearRect(0,o.ph-2,o.pw,2),i.bindFramebuffer(i.FRAMEBUFFER,this.bench),this.stats.copyMs+=performance.now()-r,this.stats.copies++}keep({plate:e}){let t=performance.now(),{gl:n}=this,r=e.spec,{x:i,y:a,pw:o,ph:s}=e.seat,c=e.picture,l=e.seat.box;if(!c||c.pw!==r.pw||c.ph!==r.ph){this.freePicture(e),this.making_(e,r.pw*r.ph*8*(4/3)),this.shown(e);let t=n.createTexture(),i=n.createFramebuffer();n.bindTexture(n.TEXTURE_2D,t),n.texStorage2D(n.TEXTURE_2D,Math.floor(Math.log2(Math.max(r.pw,r.ph)))+1,n.RGBA16F,r.pw,r.ph),U(n,n.LINEAR_MIPMAP_LINEAR,n.LINEAR),n.bindFramebuffer(n.FRAMEBUFFER,i),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,t,0),c=e.picture={tex:t,fbo:i,pw:r.pw,ph:r.ph,box:[0,0,0,0,0]},l=null}let u=o/r.pw,d=this.sheet.height-a-s,f=l?xs(l,r.pw/r.cw):{x:0,y:0,w:r.pw,h:r.ph};n.bindFramebuffer(n.READ_FRAMEBUFFER,this.bench),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,c.fbo),n.blitFramebuffer(i+f.x*u,d+s-(f.y+f.h)*u,i+(f.x+f.w)*u,d+s-f.y*u,f.x,r.ph-f.y-f.h,f.x+f.w,r.ph-f.y,n.COLOR_BUFFER_BIT,u===1?n.NEAREST:n.LINEAR),n.bindFramebuffer(n.FRAMEBUFFER,c.fbo),n.enable(n.SCISSOR_TEST),n.clearColor(0,0,0,0),n.scissor(r.pw-2,0,2,r.ph),n.clear(n.COLOR_BUFFER_BIT),n.scissor(0,0,r.pw,2),n.clear(n.COLOR_BUFFER_BIT),this.mips(c.tex),n.disable(n.SCISSOR_TEST),n.bindFramebuffer(n.FRAMEBUFFER,this.bench),c.box=[r.x,r.y,r.cw,r.ch,r.w],this.stats.copyMs+=performance.now()-t}pictureBytes(e){let t=e.picture;return t?t.pw*t.ph*8*(4/3):0}shrink(e){let t=e.picture,n=t?Math.max(t.pw,t.ph):0;if(!t||this.lost||n<=Ko)return;let{gl:r}=this,i=Math.ceil(Math.log2(n/Ko)),a=Math.max(Math.floor(t.pw/2**i),1),o=Math.max(Math.floor(t.ph/2**i),1),s=r.createTexture(),c=r.createFramebuffer();r.bindTexture(r.TEXTURE_2D,s),r.texStorage2D(r.TEXTURE_2D,Math.floor(Math.log2(Math.max(a,o)))+1,r.RGBA16F,a,o),U(r,r.LINEAR_MIPMAP_LINEAR,r.LINEAR),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,c),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,s,0),r.bindFramebuffer(r.READ_FRAMEBUFFER,this.mipFrom),r.framebufferTexture2D(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t.tex,i),r.disable(r.SCISSOR_TEST),r.blitFramebuffer(0,0,a,o,0,0,a,o,r.COLOR_BUFFER_BIT,r.NEAREST),r.generateMipmap(r.TEXTURE_2D),r.bindFramebuffer(r.FRAMEBUFFER,this.bench),this.freePicture(e),e.picture={tex:s,fbo:c,pw:a,ph:o,box:t.box},this.shown(e)}shown(e){this.store.hold(e,`picture`,()=>this.pictureBytes(e),()=>this.shrink(e))}wait(e,t){let{gl:n}=this;this.staged?n.readPixels(e,t,1,1,n.RGBA,n.FLOAT,this.pxLight):n.readPixels(e,t,1,1,n.RGBA,n.UNSIGNED_BYTE,this.px)}forget(e){this.freePicture(e)}freePicture(e){let t=e.picture;this.store.drop(e,`picture`),e.picture=null,t&&!this.lost&&(this.gl.deleteTexture(t.tex),this.gl.deleteFramebuffer(t.fbo))}stage(){if(!this.staged){this.staged=!0;let[e,t]=this.room;this.sheet={width:e,height:t},this.makeBench()}return this.lost||Va(this.gl),this.canvas}unstage(){if(!this.staged)return;let{gl:e}=this,t=this.canvas;this.staged=!1,Va(null),t.remove(),t.width=this.sheet.width,t.height=this.sheet.height,this.lost||(this.benchTex&&e.deleteTexture(this.benchTex),this.bench&&e.deleteFramebuffer(this.bench),this.lens?.free()),this.bench=this.benchTex=null,this.lens=null,this.sheet=t;for(let e of this.plates)this.freePicture(e);e.bindFramebuffer(e.FRAMEBUFFER,null)}makeBench(){let{gl:e}=this;this.bench=e.createFramebuffer(),this.benchTex=null,this.sizeBench()}sizeBench(){let{gl:e}=this,{width:t,height:n}=this.sheet;this.benchTex&&e.deleteTexture(this.benchTex),this.benchTex=null,this.making_(null,t*n*8),this.benchTex=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.benchTex),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA16F,Math.max(t,1),Math.max(n,1)),U(e,e.NEAREST,e.NEAREST),e.bindFramebuffer(e.FRAMEBUFFER,this.bench),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this.benchTex,0);let r=this.canvas;e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE||t<=r.width&&n<=r.height||(this.store.refused(),this.refusedBench=!0,this.sheet.width=r.width,this.sheet.height=r.height,this.sizeBench())}show(e,t,n,r,i=0,a=0){let{gl:o}=this,s=this.canvas,c=Math.max(Math.round(t*r),1),l=Math.max(Math.round(n*r),1);s.width!==c&&(s.width=c),s.height!==l&&(s.height=l);let u=this.lens??=new Cr(o);u.begin(c,l);let d=za(),f=d.size?{gl:o,w:t,h:n,left:i,top:a,ratio:r,target:u.fbo}:null,p=null;if(f)for(let e of d)p=e.before(f)??p;let{program:m,u:h}=p?this.bent:this.show_,g=[2*r/c,0,-1,0,-2*r/l,1,0,0,1],_=[c/(2*r),0,c/(2*r),0,-l/(2*r),l/(2*r),0,0,1],v=null,y=1,b=(e,t=y)=>{v=e,y=t;let n=e?bs(g,bs(e.h,_)):ys;o.uniformMatrix3fv(h.uH,!1,[n[0],n[3],n[6],n[1],n[4],n[7],n[2],n[5],n[8]]),o.uniform1f(h.uGain,(e?.gain??1)*y)},x=()=>{o.bindFramebuffer(o.FRAMEBUFFER,u.fbo),o.viewport(0,0,c,l),o.disable(o.SCISSOR_TEST),o.enable(o.BLEND),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.bindVertexArray(this.vao),o.useProgram(m),o.uniform1i(h.tP,0),b(v),p&&(o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,p),o.uniform1i(h.tBend,1),o.uniform2f(h.uStagePx,c,l)),o.activeTexture(o.TEXTURE0)};f?x():(o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.useProgram(m),o.uniform1i(h.tP,0),b(null),o.activeTexture(o.TEXTURE0));let S=({picture:e,x:t,y:n,w:i,h:a})=>[Math.round(t*r),Math.round(n*r),Math.abs(i*r-e.pw)<1?e.pw:i*r,Math.abs(a*r-e.ph)<1?e.ph:a*r],C=(e,[t,n,i,a],s,u,d,f)=>{d<=s||f<=u||(o.uniform4f(h.uRect,s/c*2-1,1-u/l*2,d/c*2-1,1-f/l*2),o.uniform4f(h.uUv,(s-t)/i,1-(u-n)/a,(d-t)/i,1-(f-n)/a),p?o.uniform2f(h.uUvPerMm,1/(e.box[2]*Z),1/(e.box[3]*Z)):o.uniform1f(h.uSmear,v?.smear?2*v.smear*r/i:0),o.bindTexture(o.TEXTURE_2D,e.tex),o.drawArrays(o.TRIANGLE_STRIP,0,4))},w=({picture:e,plate:t,turned:n},[i,a,o,s])=>{if(!f||n)return;let c=i/r,l=a/r,u=o/r,p=s/r,[m,h,g,_]=t.tex?this.mapUv(t):[1,1,0,0],v={height:t.tex?.H??null,toMap:[m/u,h/p,g-m*c/u,_-h*l/p],mmPerPx:e.box[2]*Z/u,face:t.spec.face,box:[c,l,u,p]};for(let e of d)e.shot(v,f);x()};for(let t of e){b(t.turned??null,t.share??1);let e=S(t),[n,r,i,a]=e;C(t.picture,e,n,r,n+i,r+a),w(t,e)}if(f)for(let e of d)e.after(f),x();u.finish(this.exposure,this.backdrop),o.bindFramebuffer(o.FRAMEBUFFER,this.bench),this.stats.stages++}glowing(e,t,n,r=!0){let{gl:i}=this,a=this.glowBack;if(this.glowBack=null,this.glowReads.length||this.lost||!r)return a;let o=e(),s=this.glowAt;if(!s||s.w!==t||s.h!==n){s&&(i.deleteFramebuffer(s.fbo),i.deleteTexture(s.tex));let e=i.createTexture();i.bindTexture(i.TEXTURE_2D,e),i.texStorage2D(i.TEXTURE_2D,1,i.RGBA8,t,n);let r=i.createFramebuffer();i.bindFramebuffer(i.FRAMEBUFFER,r),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,e,0),s=this.glowAt={fbo:r,tex:e,w:t,h:n}}i.bindFramebuffer(i.FRAMEBUFFER,s.fbo),i.viewport(0,0,t,n),i.disable(i.SCISSOR_TEST),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE);let{program:c,u:l}=this.show_;i.useProgram(c),i.uniform1i(l.tP,0),i.uniform4f(l.uUv,0,1,1,0),i.uniformMatrix3fv(l.uH,!1,ys),i.uniform1f(l.uGain,1),i.uniform1f(l.uSmear,0),i.activeTexture(i.TEXTURE0);for(let{plate:e,x:r,y:a,w:s,h:c}of o)e.tex?.G&&(i.uniform4f(l.uRect,r/t*2-1,a/n*2-1,(r+s)/t*2-1,(a+c)/n*2-1),i.bindTexture(i.TEXTURE_2D,e.tex.G),i.drawArrays(i.TRIANGLE_STRIP,0,4));i.disable(i.BLEND);let u=i.createBuffer();return i.bindBuffer(i.PIXEL_PACK_BUFFER,u),i.bufferData(i.PIXEL_PACK_BUFFER,t*n*4,i.STREAM_READ),i.readPixels(0,0,t,n,i.RGBA,i.UNSIGNED_BYTE,0),i.bindBuffer(i.PIXEL_PACK_BUFFER,null),this.glowReads.push({pbo:u,sync:i.fenceSync(i.SYNC_GPU_COMMANDS_COMPLETE,0),w:t,h:n,shots:o}),i.bindFramebuffer(i.FRAMEBUFFER,this.bench),i.flush(),a}glowDrawn=!1;get glowPending(){return this.glowReads.length>0||!!this.glowBack}read(e){let t=e.picture;if(!t||this.lost)return null;let{gl:n}=this,r=new Float32Array(t.pw*t.ph*4);return n.bindFramebuffer(n.FRAMEBUFFER,t.fbo),n.readPixels(0,0,t.pw,t.ph,n.RGBA,n.FLOAT,r),n.bindFramebuffer(n.FRAMEBUFFER,this.bench),Ns(r,t.pw,t.ph,this.exposure)}readSoon(e){let t=e.picture;if(!t||this.lost)return Promise.resolve(null);let{gl:n}=this,{pw:r,ph:i}=t,a=this.exposure,o=n.createBuffer();n.bindFramebuffer(n.FRAMEBUFFER,t.fbo),n.bindBuffer(n.PIXEL_PACK_BUFFER,o),n.bufferData(n.PIXEL_PACK_BUFFER,r*i*16,n.STREAM_READ),n.readPixels(0,0,r,i,n.RGBA,n.FLOAT,0),n.bindBuffer(n.PIXEL_PACK_BUFFER,null),n.bindFramebuffer(n.FRAMEBUFFER,this.bench);let s=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0);return n.flush(),new Promise(e=>{let t=()=>{if(!this.lost&&n.clientWaitSync(s,0,0)===n.TIMEOUT_EXPIRED)return void setTimeout(t,4);let c=null;if(!this.lost){let e=new Float32Array(r*i*4);n.bindBuffer(n.PIXEL_PACK_BUFFER,o),n.getBufferSubData(n.PIXEL_PACK_BUFFER,0,e),n.bindBuffer(n.PIXEL_PACK_BUFFER,null),c=Ns(e,r,i,a)}n.deleteSync(s),n.deleteBuffer(o),e(c)};setTimeout(t,4)})}seatFor(e,t,n){let r=n.sizing,i=t.width*(r?1:n.ratio)*(n.sweeping&&As(e,n)?ps:1),a=Math.min(r||n.sweeping?Math.max(i/e.pw,.125):1,this.fit(e));return{x:0,y:0,scale:a,pw:Math.round(e.pw*a),ph:Math.round(e.ph*a),box:null}}lightAll(e,t,n,r){let i=[],a=this.gl,o=this.sheet,s=(e,t)=>{try{t()}catch(t){r(e,t)}};for(let t of e)this.store.use(t.plate);let c=0,l=0,u=0,d=()=>{for(let e of i)s(e,()=>e.ctx?this.staged?this.copyThrough(e):this.copyOut(e):this.keep(e));i.length=c=l=u=0};for(let n of e)n.plate.seat=this.seatFor(n.plate.spec,n.rect,t);a.bindFramebuffer(a.FRAMEBUFFER,this.bench),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT);for(let r of e.sort((e,t)=>t.plate.seat.ph-e.plate.seat.ph)){let e=r.plate.seat;c+e.pw>o.width&&(c=0,l+=u+qo,u=0),l+e.ph>o.height&&(d(),a.clear(a.COLOR_BUFFER_BIT)),e.x=c,e.y=l,s(r,()=>{this.light(r,t),n(r),i.push(r)}),c+=e.pw+qo,u=Math.max(u,e.ph)}d()}};function Ns(e,t,n,r){let i=new Uint8ClampedArray(e.length),a=t*4;for(let t=0;t<n;t++)for(let o=(n-1-t)*a,s=t*a,c=o+a;o<c;o+=4,s+=4){let t=Math.min(Math.max(e[o+3],0),1),n=t>.002?t:1,a=Tr(e[o]*r/n,e[o+1]*r/n,e[o+2]*r/n);i[s]=a[0]*t*255+.5,i[s+1]=a[1]*t*255+.5,i[s+2]=a[2]*t*255+.5,i[s+3]=t*255+.5}return new ImageData(i,t,n)}function Ps(e,t){let n=t.el.closest(`d-surface[twist], d-device[twist]`),r=n&&e.el.contains(n)?n.getAttribute(`twist`)*Math.PI/180:0;if(!r)return null;let i=n===e.el?null:e.parts.get(n);return{at:i?[i.x+i.w/2,i.y+i.h/2]:[e.x+e.w/2,e.y+e.h/2],rotate:r}}function Fs(e,t=e=>e.matches(s())){let n=document.createTreeWalker(e.el,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode:e=>e.nodeType===Node.TEXT_NODE?e.data.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP:t(e)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_SKIP}),r=[];for(;n.nextNode();)r.push(n.currentNode);return r}function Is(e,t,n){let r=getComputedStyle(e),i=t.map(e=>e.data).join(``).replace(/\s+/g,` `).trim(),a=r.textTransform===`uppercase`?i.toUpperCase():i;n.font=`${r.fontStyle} ${r.fontWeight} ${r.fontSize} ${r.fontFamily}`,n.letterSpacing=`0px`,n.wordSpacing=r.wordSpacing;let o=e.clientWidth-parseFloat(r.paddingLeft)-parseFloat(r.paddingRight),s=n.measureText(a).width;n.wordSpacing=`0px`;let c=(o-s)/Math.max([...a].length-1,1);(Math.abs(parseFloat(e.style.letterSpacing||`NaN`)-c)>.01||!e.style.letterSpacing)&&(e.style.letterSpacing=`${c.toFixed(2)}px`),e.style.textAlign!==`left`&&(e.style.textAlign=`left`)}function Ls(e,t,n,r,i,a,o,s=e=>Fs(e),c){t.width<e.pw&&(t.width=e.pw),t.height<e.ph&&(t.height=e.ph),n.setTransform(1,0,0,1,0,0),n.fillStyle=`#000`,n.fillRect(0,0,e.pw,e.ph),n.setTransform(e.dpr,0,0,e.dpr,0,0),n.fillStyle=n.strokeStyle=`#fff`;let l=document.createRange();for(let t of e.list){o(t.el),t.label=null,t.mask=null;let u=Ps(e,t),d=()=>{n.save(),u&&(n.translate(...u.at),n.rotate(u.rotate),n.translate(-u.at[0],-u.at[1]))};if(t.def.mask&&(d(),t.mask=t.def.mask(n,t)??null,n.restore()),!t.def.label)continue;d(),n.textBaseline=`alphabetic`,n.textAlign=`left`;let f=c?.get(t.el);if(f)n.font=f.font,n.letterSpacing=f.letterSpacing;else{let e=s(t);if(!e.length){n.restore();continue}t.el.hasAttribute(`fit`)&&Is(t.el,e,n);let r=getComputedStyle(t.el),i=`${r.fontStyle} ${r.fontWeight} ${r.fontSize} ${r.fontFamily}`,a=r.letterSpacing===`normal`?`0px`:r.letterSpacing;n.font=i,n.letterSpacing=a;let o=n.measureText(`Hg`),u=r.textTransform===`uppercase`;f={font:i,letterSpacing:a,wordSpacing:r.wordSpacing===`normal`?`0px`:r.wordSpacing,asc:o.fontBoundingBoxAscent,desc:o.fontBoundingBoxDescent,words:[]};for(let t of e)for(let e of t.data.matchAll(/\S+/g)){l.setStart(t,e.index),l.setEnd(t,e.index+e[0].length);let n=l.getBoundingClientRect();n.width&&f.words.push({text:u?e[0].toUpperCase():e[0],left:n.left,top:n.top,width:n.width,height:n.height})}c?.set(t.el,f)}let{font:p,letterSpacing:m,wordSpacing:h,asc:g,desc:_}=f,v=new Map;for(let e of f.words){let t=e.width/a,o=e.height/a;if(!t)continue;let{text:s}=e,c=(e.left-r)/a,l=(e.top-i)/a;n.fillText(s,c,l+(o-g-_)/2+g);let u=v.get(Math.round(l));u?(u.text+=` ${s}`,u.w=c+t-u.x):v.set(Math.round(l),{x:c,y:l,w:t,h:o,text:s})}n.restore();let y=[...v.values()];if(!y.length)continue;let b=Math.min(...y.map(e=>e.x)),x=y[0].y,S=Math.max(...y.map(e=>e.x+e.w)),C=y[y.length-1].y+y[y.length-1].h;t.label={x:b-2,y:x-2,w:S-b+4,h:C-x+4,text:y.map(e=>e.text).join(` `),font:p,letterSpacing:m,wordSpacing:h,lines:y.map(e=>({...e,x:e.x-2,y:e.y-2,w:e.w+4,h:e.h+4}))}}}var Rs={width:1.5,alpha:1},zs={width:1,alpha:.9},Bs={width:1,alpha:.7},Vs=.55,Hs=.35,Us=4e6,Ws=null;function Gs(e,t){if(!Ws||Ws.a.width<e||Ws.a.height<t){let n=Math.max(e,Ws?.a.width??0),r=Math.max(t,Ws?.a.height??0),i=new OffscreenCanvas(n,r),a=new OffscreenCanvas(n,r);Ws={a:i,b:a,x:i.getContext(`2d`),y:a.getContext(`2d`)}}return Ws}var Ks=e=>{let t=[];for(let n=-e;n<=e;n++)for(let r=-e;r<=e;r++)(r||n)&&r*r+n*n<=e*e+.5&&t.push([r,n]);return t},qs=new Map;function Js(e,t,n=Vs){let r=e.map(e=>Math.min(Math.max(e,0),1)**(1/2.2)*n),i=t===`dark`?Math.max(Hs-Math.max(...r),0):0;return`rgb(${r.map(e=>Math.round((e+(1-e)*i)*255)).join(` `)})`}function Ys(e,t){if(t.type===`mask`)return!1;if(t.type===`holes`){let n=t.hole/2;e.beginPath();for(let r=t.cy-t.hh+t.pitch/2;r<t.cy+t.hh;r+=t.pitch)for(let i=t.cx-t.hw+t.pitch/2;i<t.cx+t.hw;i+=t.pitch)t.square?e.rect(i-n,r-n,n*2,n*2):(e.moveTo(i+n,r),e.arc(i,r,n,0,Math.PI*2));return e.fill(),!0}let{grow:n,ring:r,...i}=t;return B(e,i),!0}function Xs(e,t){let n=e.getTransform();e.lineWidth=t/(Math.hypot(n.a,n.b)||1)}function Zs(e,t){let n=!1;return{ctx:new Proxy(e,{get(e,r){if(r===`fill`)return(...n)=>(Xs(e,t),e.stroke(...n.filter(e=>typeof e!=`string`)));if(r===`fillRect`)return(n,r,i,a)=>(Xs(e,t),e.strokeRect(n,r,i,a));if(r===`stroke`)return(...n)=>(Xs(e,t),e.stroke(...n));if(r===`drawImage`)return()=>void(n=!0);let i=Reflect.get(e,r);return typeof i==`function`?i.bind(e):i},set:(e,t,n)=>t===`fillStyle`||t===`strokeStyle`||t===`globalCompositeOperation`||t===`lineWidth`||Reflect.set(e,t,n)}),layered:()=>n}}function Qs(e,t,n,r,i){if(t.type===`mask`)return;e.save(),e.setTransform(n,0,0,n,0,0),e.globalAlpha=i.alpha,e.fillStyle=e.strokeStyle=r;let a=Zs(e,i.width);if(t.type===`holes`){let n=t.hole/2;e.beginPath();for(let r=t.cy-t.hh+t.pitch/2;r<t.cy+t.hh;r+=t.pitch)for(let i=t.cx-t.hw+t.pitch/2;i<t.cx+t.hw;i+=t.pitch)t.square?e.rect(i-n,r-n,n*2,n*2):(e.moveTo(i+n,r),e.arc(i,r,n,0,Math.PI*2));a.ctx.fill()}else{let{grow:e,ring:n,...r}=t;B(a.ctx,r)}e.restore(),a.layered()&&$s(e,t,n,r,i)}function $s(e,t,n,r,i){let a=he(t,2),o=Math.max(0,Math.floor(a.x*n)),s=Math.max(0,Math.floor(a.y*n)),c=Math.min(e.canvas.width,Math.ceil((a.x+a.w)*n))-o,l=Math.min(e.canvas.height,Math.ceil((a.y+a.h)*n))-s;if(c<=0||l<=0)return;let u=Gs(c,l),{x:d,y:f}=u;if(d.setTransform(1,0,0,1,0,0),d.clearRect(0,0,c+2,l+2),d.setTransform(n,0,0,n,-o,-s),d.fillStyle=`#000`,Ys(d,t)){d.setTransform(1,0,0,1,0,0),f.globalCompositeOperation=`copy`,f.drawImage(u.a,0,0,c,l,0,0,c,l),f.globalCompositeOperation=`destination-in`;for(let[e,t]of qs.get(i.width)??qs.set(i.width,Ks(i.width)).get(i.width))f.drawImage(u.a,0,0,c,l,e,t,c,l);d.globalCompositeOperation=`destination-out`,d.drawImage(u.b,0,0,c,l,0,0,c,l),d.globalCompositeOperation=`source-in`,d.fillStyle=r,d.fillRect(0,0,c,l),d.globalCompositeOperation=`source-over`,e.globalAlpha=i.alpha,e.drawImage(u.a,0,0,c,l,o,s,c,l),e.globalAlpha=1}}function ec(e,t){let n=t.zoom||1,r=Math.min(t.dpr*n,Math.sqrt(Us/Math.max(t.cw*t.ch,1)));e.width=Math.max(1,Math.round(t.cw*r)),e.height=Math.max(1,Math.round(t.ch*r)),Object.assign(e.style,{left:`${-t.x}px`,top:`${-t.y}px`,width:`${t.cw}px`,height:`${t.ch}px`});let i=e.getContext(`2d`);i.clearRect(0,0,e.width,e.height);let a=e=>({width:Math.max(1,Math.round(e.width*t.dpr)),alpha:e.alpha}),o=[.2,.2,.2];for(let e of t.commands)e.op===`surface`?(o=e.material.color,Qs(i,e.shape,r,Js(o,t.scheme),a(e.body?Rs:zs))):e.op===`cut`?Qs(i,e.shape,r,e.ink?Js(e.ink,t.scheme,1):Js(o,t.scheme),a(Bs)):e.op===`screen`?Qs(i,e.shape,r,Js(e.color,t.scheme),a(zs)):(e.op===`glass`||e.op===`frost`)&&Qs(i,e.shape,r,Js(e.tint,t.scheme),a(Bs))}var tc=e=>2*2**Math.max(Math.round(-Math.log2(e)),0),nc=e=>`rgb(${e&255} ${e>>8&255} ${e*89&255})`,rc=(e,t,n)=>{let r=e|t<<8;return(r*89&255)===n?r:0};function ic(e,t,n,r,i,a){let o=``,s=n=>{let r=[];for(let i=0;i<t;i++)if(e[n*t+i]){let a=i;for(;i<t&&e[n*t+i];)i++;r.push(a,i)}return r};for(let e=0;e<n;){let t=s(e),c=t.join(),l=e+1;for(;l<n&&s(l).join()===c;)l++;for(let n=0;n<t.length;n+=2)o+=`M${t[n]*a+r} ${e*a+i}h${(t[n+1]-t[n])*a}v${(l-e)*a}h${(t[n]-t[n+1])*a}z`;e=l}return o||`M0 0z`}function ac(e,t){e.reachDirty=!1;for(let t of e.list)t.shifted=!1;let n=e.reachCell,r=new Set;for(let t of e.list)for(let n=t.el.parentElement;n&&n!==e.el;n=n.parentElement)r.add(n);let i=Math.ceil(e.cw/n),a=Math.ceil(e.ch/n);t.width=i,t.height=a;let o=t.getContext(`2d`,{willReadFrequently:!0});o.scale(1/n,1/n);let s=new Map;e.list.forEach((t,n)=>{let i=getComputedStyle(t.el),a=n+1;t.hit=t.el!==e.el&&!r.has(t.el)&&i.pointerEvents!==`none`&&i.transform===`none`&&t.w>0;let c=!1;o.fillStyle=nc(a);for(let e of t.commands??[]){if(e.op===`glass`?!e.covers:e.op!==`surface`||e.zTop<e.zEdge||e.shape.type===`mask`||e.shape.type===`holes`||e.shape.ring)continue;let n=e.bend&&!S(he(e.shape,0),e.bend)?C(he(e.shape,0),e.bend):null;if(n&&!t.hit)continue;let{grow:r,...i}=e.shape;n&&(o.save(),o.beginPath(),o.rect(n.x,n.y,n.w,n.h),o.clip()),B(o,i),n&&o.restore(),c=!0}t.hit&&c?s.set(a,t):(t.el.hasAttribute(`d-reach`)||t.el.style.clipPath)&&oc(t)});let{data:c}=o.getImageData(0,0,i,a),l=new Uint16Array(i*a),u=new Int32Array((e.list.length+1)*4).fill(-1);for(let t=0,n=0;t<a;t++)for(let r=0;r<i;r++,n++){if(c[n*4+3]!==255)continue;let i=rc(c[n*4],c[n*4+1],c[n*4+2]);if(!i||i>e.list.length)continue;l[n]=i;let a=i*4;u[a]<0?(u[a]=u[a+2]=r,u[a+1]=u[a+3]=t):(u[a]=Math.min(u[a],r),u[a+1]=Math.min(u[a+1],t),u[a+2]=Math.max(u[a+2],r),u[a+3]=Math.max(u[a+3],t))}for(let[t,r]of s){let a=Math.floor(r.x/n),o=Math.floor(r.y/n),c=Math.ceil((r.x+r.w)/n),d=Math.ceil((r.y+r.h)/n),f=a,p=o,m=c,h=d,g=!0;u[t*4]>=0&&(f=Math.min(f,u[t*4]),p=Math.min(p,u[t*4+1]),m=Math.max(m,u[t*4+2]+1),h=Math.max(h,u[t*4+3]+1));let _=m-f,v=m>f?h-p:0,y=new Uint8Array(_*v),b=(e,t)=>y[(t-p)*_+(e-f)]=1;for(let n=p;n<h;n++)for(let u=f;u<m;u++){let f=l[n*i+u],p=u>=a&&u<c&&n>=o&&n<d;f===t||p&&(!f||f<t&&!s.has(f)||e.list[f-1].el.contains(r.el))?b(u,n):p&&(g=!1)}let x=f<a||p<o||m>c||h>d;if(g&&!x){oc(r);continue}getComputedStyle(r.el).position===`static`&&(r.el.style.position=`relative`);let S=f*n-r.x,C=p*n-r.y;r.el.style.clipPath=`path("${ic(y,_,v,+S.toFixed(2),+C.toFixed(2),n)}")`,x?(r.el.setAttribute(`d-reach`,``),r.el.style.setProperty(`--reach-x`,`${S}px`),r.el.style.setProperty(`--reach-y`,`${C}px`),r.el.style.setProperty(`--reach-w`,`${_*n}px`),r.el.style.setProperty(`--reach-h`,`${v*n}px`)):r.el.removeAttribute(`d-reach`)}e.observer.takeRecords()}function oc(e){e.el.style.clipPath=``,e.el.removeAttribute(`d-reach`)}var sc=new WeakMap,cc=new WeakSet,lc=new Set;function uc(e,t){let n=e.currentCSSZoom;if(n===void 0)return e.offsetWidth?(t??e.getBoundingClientRect()).width/e.offsetWidth:1;let r=n;for(let t=e.closest(`[data-camera]`);t;t=t.parentElement?.closest(`[data-camera]`)??null)r*=sc.get(t)?.scale??1;return r}var dc=null;function fc(e,t,n=!0){let r=sc.get(e);r?r.scale=t:(sc.set(e,{scale:t,stage:n,turns:0}),e.dataset.camera=``),dc=e;for(let t of lc)t(e)}function pc(e){cc.add(e)}var mc=e=>cc.has(e);function hc(e){let t=sc.get(e);t&&t.turns++;for(let t of lc)t(e)}var gc=e=>sc.get(e)?.turns??0,_c=`[data-camera] [data-far]`,vc=e=>sc.get(e)?.scale,yc=e=>sc.get(e)?.stage??!1,bc=e=>{lc.add(e),dc&&e(dc)},xc=new Map,Sc=new Set;function Cc(e){let t=getComputedStyle(e),n=e.getBoundingClientRect();return n.width/uc(e,n)-parseFloat(t.paddingLeft)-parseFloat(t.paddingRight)-parseFloat(t.borderLeftWidth)-parseFloat(t.borderRightWidth)}var wc=e=>e.el.dispatchEvent(new Event(`fitted`,{bubbles:!0}));function Tc(e,t,n){let r=getComputedStyle(e);return[t.width/n+parseFloat(r.marginLeft)+parseFloat(r.marginRight),t.height/n+parseFloat(r.marginTop)+parseFloat(r.marginBottom)]}function Ec(e){for(let t of e)Number.isNaN(t.across)&&(t.across=Cc(t.holder));for(let t of e)t.el.style.zoom&&t.el.style.zoom!==`1`&&(t.el.style.zoom=`1`);for(let t of e){let e=t.el.getBoundingClientRect();[t.w,t.h]=Tc(t.el,e,uc(t.el,e))}for(let t of e)t.el.style.zoom=String(Math.min(t.view(t.w,t.h),t.across/t.w))}function Dc(e){let t=Array.isArray(e)?new Set(e.map(e=>e.target)):null,n=[...xc.values()].filter(e=>!t||t.has(e.holder)).flatMap(e=>{let t=e.el.getBoundingClientRect(),n=Cc(e.holder),[r,i]=Tc(e.el,t,uc(e.el,t)),a=Math.abs(r-e.w)>.5||Math.abs(i-e.h)>.5;return n===e.across&&!a?[]:[{f:e,across:n,flows:a}]});for(let{f:e,across:t,flows:r}of n)e.across=t,r||(e.el.style.zoom=String(Math.min(e.view(e.w,e.h),t/e.w)));Ec(n.filter(e=>e.flows).map(e=>e.f));for(let{f:e}of n)wc(e)}var Oc=null;function kc(e,t,n){let r=e.parentElement;if(!r)return null;Oc||(Oc=new ResizeObserver(Dc),addEventListener(`resize`,Dc));let i={el:e,holder:r,view:t,framed:n,across:NaN,w:0,h:0};return xc.set(e,i),Oc.observe(r),i}function Ac(e){let t=xc.get(e);t&&(xc.delete(e),Sc.delete(t),[...xc.values()].some(e=>e.holder===t.holder)||Oc.unobserve(t.holder))}function jc(e,t=()=>1){Ac(e);let n=kc(e,t,!0);return n?(Pc(n),()=>Ac(e)):()=>{}}function Mc(e){let t=xc.get(e);t&&(Ec([t]),wc(t))}function Nc(e,t=!1){if(xc.get(e)?.framed)return;Ac(e);let n=e.getAttribute(`scale`)?.trim();if(!n){t&&(e.style.zoom=``);return}let[r,i]=n.split(/\s+/);if(r!==`fit`){e.style.zoom=String(+r||1);return}let a=+(i??1)||1,o=kc(e,()=>a,!1);o&&Pc(o)}function Pc(e){Sc.size||queueMicrotask(()=>{let e=[...Sc];Sc.clear(),Ec(e),e.forEach(wc)}),Sc.add(e)}function Fc(e){xc.get(e)?.framed||Ac(e)}var Ic=.18,Lc=Ic*120,Rc=e=>((1.219+Lc**.4)/(1.219+Math.max(e,1e-4)**.4))**2.5,zc=.1,Bc=.4,Vc=e=>{let t=.04/(.04+e);return t*Bc+(1-t)*zc},Hc=class e{adapted=null;at=0;settled=!0;static target(e){return 120*(Ic*(e.room+e.lights)+e.glow)}look(t,n=performance.now()){let r=e.target(t),i=this.adapted===null||this.settled?0:Math.min(Math.max((n-this.at)/1e3,0),.25);return this.at=n,this.adapted===null?this.adapted=r:this.adapted+=(r-this.adapted)*(1-Math.exp(-i/Vc(r))),Math.abs(this.adapted-r)<=r*.002&&(this.adapted=r),this.settled=this.adapted===r,!this.settled}get exposure(){return this.adapted===null?1:Rc(this.adapted)}},Uc=.92,Wc=.4,Gc=.5,Kc=.3,qc=.75,Jc=()=>{},Yc=e=>{Jc=e},Xc=class{value;target;velocity=0;part=null;stiffness;damping;through;rest;from;after;contact;motion;landed=!0;notch=0;held=0;jumped=!1;seat;constructor(e){this.stiffness=e.stiffness,this.damping=e.damping,this.through=e.through??!1,this.contact=e.contact||null,this.motion=e.motion,this.rest=this.from=this.value=this.target=this.seat=e.value??0}set(e){this.through&&e===this.rest&&this.target!==this.rest&&this.active?this.after=e:(this.after=void 0,e!==this.target&&(this.go(e),Jc(this)))}snap(e){this.value=this.target=this.seat=e,this.velocity=0,this.after=void 0,this.landed=!0,this.jumped=!0,Jc(this)}grip(e){this.held=e}notches(e){e!==this.notch&&(this.notch=e,this.seat=this.value)}get active(){return this.jumped||this.moving}get moving(){return this.value!==this.target||this.velocity!==0}step(e,t=!1){if(this.jumped=!1,!this.moving)return!1;if(t){let e=(this.contact===`toggle`?Kc:qc)*Math.sqrt(this.stiffness)*Math.abs(this.target-this.from);return this.value=this.target,this.feel(e),this.after!==void 0&&(this.go(this.after),this.value=this.target,this.feel(e)),this.seat=this.value,this.velocity=0,this.after=void 0,!1}let n=Math.max(1,Math.ceil(e/(1/240))),r=e/n;for(let e=0;e<n;e++)this.held?this.velocity=(this.target-this.value)/this.held:this.velocity+=(this.stiffness*(this.target-this.value)-this.damping*this.velocity)*r,this.value+=this.velocity*r,(!this.landed||this.notch)&&this.feel(Math.abs(this.velocity));return this.after!==void 0&&this.arrived&&(this.go(this.after),this.after=void 0),Math.abs(this.velocity)<.01&&Math.abs(this.target-this.value)<.001?(this.value=this.target,this.velocity=0,!1):!0}past(e){return(this.value-this.from)/(this.target-this.from)>=e}get arrived(){return this.past(Uc)}go(e){this.from=this.value,this.target=e,this.landed=!this.contact}feel(e){if(!this.landed&&this.past(this.contact===`toggle`?Uc:Wc)&&(this.landed=!0,Be(this.part,this.contact===`toggle`?`toggle`:this.target===this.rest?`release`:`press`,e,{to:this.target,motion:this.motion})),!this.notch)return;let t=(this.value-this.seat)/this.notch;Math.abs(t)<Gc||(this.seat+=Math.sign(t)*this.notch,Be(this.part,`detent`,e/Math.abs(this.notch),{motion:this.motion}))}},Zc=200;function Qc(e,t,n=!1){return e.scale*(n?8:4)/uc(t)}function $c(e,t={}){e.style.transformOrigin=`0 0`;let n=t.turns;n&&(pc(n),Object.assign(n.style,{transformOrigin:`0 0`,transform:`rotate(0deg)`}));let r=0,i=0,a={scale:1,x:0,y:0,turned:{deg:0,x:0,y:0},set(n,i,o){n===a.scale&&i===a.x&&o===a.y&&e.style.scale||(a.scale=n,a.x=i,a.y=o,e.style.willChange=`translate, scale`,clearTimeout(r),r=window.setTimeout(()=>e.style.willChange=``,Zc),e.style.translate=`${-i}px ${-o}px`,e.style.scale=String(n),fc(e,n,t.stage??!0))},turn(t,r,o){if(!n)return;a.turned={deg:t,x:r,y:o};let s=t?`translate(${r}px, ${o}px) rotate(${t}deg) translate(${-r}px, ${-o}px)`:`rotate(0deg)`;n.style.transform!==s&&(n.style.willChange=`transform`,clearTimeout(i),i=window.setTimeout(()=>n.style.willChange=``,Zc),n.style.transform=s,hc(e))}};return a}var el=null,tl=``;function nl(){let e=document.body,t=e.getAttribute(`camera`)?.trim().split(/[\s,]+/).map(Number),[n,r,i,a]=t??[];if(!t||t.length!==4||t.some(e=>!Number.isFinite(e))||!(i>0)||!(a>0)){if(!el)return;el.set(1,0,0),Object.assign(e.style,{translate:``,scale:``,willChange:``,transformOrigin:``}),document.documentElement.style.overflow=tl,el=null;return}el||=(tl=document.documentElement.style.overflow,document.documentElement.style.overflow=`hidden`,$c(e,{stage:!1}));let o=e.getBoundingClientRect(),s=o.left+el.x,c=o.top+el.y,l=Math.min(innerWidth/i,innerHeight/a);el.set(l,s+(n+i/2-s)*l-innerWidth/2,c+(r+a/2-c)*l-innerHeight/2)}function rl(){new MutationObserver(nl).observe(document.body,{attributes:!0,attributeFilter:[`camera`]}),addEventListener(`resize`,()=>el&&nl()),nl()}typeof document<`u`&&(document.body?rl():document.addEventListener(`DOMContentLoaded`,rl,{once:!0}));var il=64,al=16,ol=3,sl=32,cl=4,ll=24,ul=.25,dl=1e3/30,fl=new Set([`color`,`ink`,`emit`]);function pl(e){let t=[-1/0,-1/0,1/0,1/0];for(let n=e;n&&n!==document.documentElement;n=n.parentElement){let e=getComputedStyle(n);if(e.overflowX===`visible`&&e.overflowY===`visible`&&!/paint|strict|content/.test(e.contain))continue;let r=n.getBoundingClientRect();(e.overflowX!==`visible`||e.contain!==`none`)&&([t[0],t[2]]=[Math.max(t[0],r.left),Math.min(t[2],r.right)]),(e.overflowY!==`visible`||e.contain!==`none`)&&([t[1],t[3]]=[Math.max(t[1],r.top),Math.min(t[3],r.bottom)])}return t}var ml=new WeakMap;function hl(e,t=!1){for(let n=e;n&&n!==document.documentElement;n=n.parentElement){let e=ml.get(n);if(e===void 0&&t){let t=getComputedStyle(n).contain;ml.set(n,e=t===`strict`||/\bsize\b/.test(t)&&/\blayout\b/.test(t))}if(e)return n}return null}var gl=new WeakMap,_l=120,vl=.05;function yl(e,t){let n=``;for(let r=e;r&&r!==t;r=r.parentElement){let e=getComputedStyle(r);n+=`${e.transform} ${e.rotate} ${e.scale} ${e.translate},`}return n}var bl=300,xl=`${bl}px`,Sl=320,Cl=96e6,wl=globalThis.matchMedia?.(`(pointer: coarse)`).matches?1e9:3e9,Tl=1,El=`100%`,Dl=40,Ol=.004,kl=.62,Al=e=>({at:e.at,far:Eo({at:e.at,reach:e.half*2,color:e.color},Ol),from:e.from,flat:e}),jl=8;function Ml(e){if(!e.length)return null;let t=[0,0,0],n=0,r=0,i=0,a=0;for(let o of e){let e=(o.half/o.per)**2,s=(o.color[0]+o.color[1]+o.color[2])*e;for(let n=0;n<3;n++)t[n]+=o.color[n]*e;n+=s,r+=s*o.on[0]/o.per,i+=s*o.on[1]/o.per,a+=s*o.half/o.per}return n?{power:t,x:r/n,y:i/n,reach:a/n,per:e[0].per}:null}function Nl(e,t,n,r,i){let a=i/Math.min(r,t?.per??r);if(n<a*jl)return!0;if(!e||!t)return!e&&!t;let o=Math.max(...e.power,...t.power);return e.power.every((e,n)=>Math.abs(e-t.power[n])<=o*.25)&&Math.hypot(e.x-t.x,e.y-t.y)<Math.max(a,t.reach*.25)&&Math.abs(e.reach-t.reach)<Math.max(Math.max(e.reach,t.reach)*.25,a/2)}var Pl=(e,t)=>{let n=Math.max(...e.color);return Math.min(Eo({at:e.at,reach:e.half*2,color:e.color},Ol),Math.max(e.half,Math.cbrt(n*e.half*e.half*t/Ol)))},Fl=64,Il=class e{all;bins=new Map;wide=[];seen;stamp=0;constructor(t){this.all=t,this.seen=new Uint32Array(t.length),t.forEach((t,n)=>{let[r,i,a,o]=e.cells(t.at[0]-t.far,t.at[1]-t.far,t.at[0]+t.far,t.at[1]+t.far);if(!((i-r+1)*(o-a+1)<=256))return void this.wide.push(n);for(let e=a;e<=o;e++)for(let t=r;t<=i;t++){let r=t*65536+e,i=this.bins.get(r);i?i.push(n):this.bins.set(r,[n])}})}static cells(e,t,n,r){let i=e=>Math.min(Math.max(Math.floor(e/Fl),-32e3),32e3)+32768;return[i(e),i(n),i(t),i(r)]}near(t,n,r,i,a){let[o,s,c,l]=e.cells(t,n,r,i);if(!((s-o+1)*(l-c+1)<=this.bins.size))return this.all.forEach(a);let{all:u,seen:d}=this,f=++this.stamp;for(let e of this.wide)a(u[e]);for(let e=c;e<=l;e++)for(let t=o;t<=s;t++)for(let n of this.bins.get(t*65536+e)??[])d[n]!==f&&(d[n]=f,a(u[n]))}},Ll=16,Rl=4,zl=120,Bl=100,Vl=1,Hl=2,Ul=(e,t,n)=>t>=e.left&&t<e.right&&n>=e.top&&n<e.bottom,Wl=200,Gl=100,Kl=1.5,ql=2,Jl=.05,Yl=6,Xl=12,Zl=12,Ql=400,$l=160,eu=3,tu=125,nu=8;function ru(e){let t=e.getAttribute(`split`);return t===null?-1:Math.min(Math.max(+t,0),1)}var iu=8,au=75,ou=e=>{let[t=0,n=0]=(e.getAttribute(`angle`)??``).trim().split(/\s+/).map(e=>Math.min(Math.max(parseFloat(e)||0,-75),au));return[t,n]},su=([e,t])=>{if(!e&&!t)return``;let n=e*Math.PI/360,r=t*Math.PI/360,i=[Math.cos(n)*Math.sin(r),Math.sin(n)*Math.cos(r),-Math.sin(n)*Math.sin(r)],a=Math.hypot(...i);return`${i.map(e=>+(e/a).toFixed(6)).join(` `)} ${+(Math.atan2(a,Math.cos(n)*Math.cos(r))*360/Math.PI).toFixed(4)}deg`};function cu(e){for(let t=e.parentElement;t;t=t.parentElement){let n=getComputedStyle(t);if(n.perspective===`none`)continue;let r=e.getBoundingClientRect(),i=t.getBoundingClientRect(),a=uc(t,i),[o=0,s=0]=n.perspectiveOrigin.split(` `).map(parseFloat),c=[i.left+o*a-(r.left+r.width/2),i.top+s*a-(r.top+r.height/2),parseFloat(n.perspective)*a],l=Math.hypot(...c);return[c[0]/l,c[1]/l,c[2]/l]}return[0,0,1]}var lu=e=>Math.min(Math.max(parseFloat(e.getAttribute(`lean`)??``)||0,0),iu),uu=e=>Math.max(Ct.indexOf(e.getAttribute(`debug`)??``),0),du={mint:{prints:0,dust:0,scuff:0,haze:0,wear:0,age:0,grime:0,dents:0,fade:0},new:{prints:.14,dust:.14,scuff:.12,haze:.35,wear:0,age:0,grime:0,dents:0,fade:0},used:{prints:.42,dust:.35,scuff:.42,haze:.6,wear:.12,age:.1,grime:.1,dents:.1,fade:.05},worn:{prints:.7,dust:.6,scuff:.75,haze:.8,wear:.3,age:.3,grime:.35,dents:.35,fade:.2},abused:{prints:1,dust:.9,scuff:1,haze:1,wear:.6,age:.7,grime:.7,dents:.75,fade:.4}},fu=(e,t)=>{let n=e.closest(`d-device`);return`${c(e)?.selector??e.localName} threw: ${t instanceof Error?t.message:String(t)}\n  in ${h(e)}${n&&n!==e?`\n  of ${h(n)}`:``}`},pu=e=>e.def.local?{at:[e.x,e.y],scale:e.def.local===!0?1:e.def.local}:{};function mu(e,t,n,r){let i=document.activeElement;for(;i&&!n.parts.has(i);)i=i.parentElement;if(i!==t.el)return;let a=e.commands.slice(r);if(a.some(e=>e.op===`glow`))return;let o=a.find(e=>e.op===`surface`)?.shape;o&&o.type!==`mask`&&o.type!==`holes`&&e.commands.push({op:`glow`,shape:z(o,1.5),color:ge,width:1.1})}function hu(e,t){let n=null;for(let r=t;r<e.length;r++)n=G(n,W(e[r]));return n}var gu=e=>e?.replace(_u,``),_u=/ ?(?:clip-path|--reach-[xywh]):(?:[^;"]|"[^"]*")*;?/g,vu=class extends Set{stirred;asked=new Set;constructor(e){super(),this.stirred=e}add(e){return this.stirred(),this.asked.delete(e),super.add(e)}ask(e){this.has(e)||(this.add(e),this.asked.add(e))}clear(){this.asked.clear(),super.clear()}},yu=()=>({r:null,at:-1,look:-1,local:null}),bu={x:[1,0,0],y:[0,1,0],z:[0,0,1]},xu={deg:1,rad:180/Math.PI,grad:.9,turn:360},Su=(e,t)=>e&&(e.endsWith(`%`)?parseFloat(e)/100*t:parseFloat(e))||0,Cu=e=>parseFloat(e)*(xu[e.match(/[a-z]+$/)?.[0]??`deg`]??1);function wu(e,t,n){if(e.transform===`none`&&e.translate===`none`&&e.rotate===`none`&&e.scale===`none`)return null;let r=new DOMMatrix;if(e.translate!==`none`){let[i,a,o]=e.translate.split(` `);r.translateSelf(Su(i,t),Su(a,n),Su(o,0))}if(e.rotate!==`none`){let t=e.rotate.split(` `),n=t.length===4?t.slice(0,3).map(Number):t.length===2?bu[t[0]]??bu.z:bu.z;r.rotateAxisAngleSelf(n[0],n[1],n[2],Cu(t[t.length-1]))}if(e.scale!==`none`){let[t=1,n=t,i=1]=e.scale.split(` `).map(e=>e.endsWith(`%`)?parseFloat(e)/100:parseFloat(e));r.scaleSelf(t,n,i)}return e.transform!==`none`&&r.multiplySelf(new DOMMatrix(e.transform)),r}var Tu=(e,t,n,r=0)=>new DOMMatrix().translate(t,n,r).multiply(e).translate(-t,-n,-r),Eu=(e,t)=>t===1?e:new DOMMatrix().scale(t,t,t).multiply(e).scale(1/t,1/t,1/t),Du=e=>e.style.cssText.replace(/(^|;)\s*(translate|scale|will-change)\s*:[^;]*/g,``).trim(),Ou=[`layoutDirty`,`viewDirty`,`materialDirty`,`lightDirty`,`reachDirty`,`sharpen`,`visible`,`handy`,`used`],ku=new Set([`data-veiled`,`data-far`,`data-asleep`,`data-over`,`data-up`,`data-turning`,`seated`,`moving`,`at`,`folded`,`data-face`]),Au=e=>e?.replace(ju,``),ju=/ ?(?:zoom|translate|scale|transform-origin|will-change):[^;"]*;?/g,Mu=e=>e?.match(/zoom:[^;"]*/)?.join(``)??``,Nu=new WeakMap,Pu=e=>(e??``).replace(Fu,``).replace(/\s*([:;])\s*/g,`$1`).replace(/;$/,``).trim(),Fu=/ ?(?:perspective|transform-style|isolation|rotate):[^;"]*;?/g,Iu=e=>e instanceof HTMLCanvasElement&&(e.dataset.d!==void 0||e.dataset.sketch!==void 0),Lu=new Set([`d-reach`,`data-far`,`data-asleep`,`data-bent`,`data-flat`]),Ru=e=>e===null?null:Bu(e).replace(_u,``).replace(Fu,``),zu=null,Bu=e=>(zu??=document.createElement(`i`).style,zu.cssText=e,zu.cssText),Vu=e=>e.type===`mask`?e.box.w*e.box.h:e.type===`capsule`?Math.hypot(e.ax-e.bx,e.ay-e.by)*(e.ra+e.rb):e.hw*e.hh*4;function Hu(e,t){let n=0;for(let r=t;r<e.length;r++){let t=e[r];if(t.op===`screen`&&t.gain>0)return NaN;let i=t.op===`glow`?t.color:t.op===`surface`?t.material.emit:t.op===`cut`||t.op===`screen`?t.emit:null;i&&(n+=(i[0]+i[1]+i[2])*Vu(t.shape))}return n}function Uu(e,t,n){if(e===t)return!0;if(typeof e!=`object`||typeof t!=`object`||!e||!t)return!1;let r=Object.getPrototypeOf(e);if(r!==Object.getPrototypeOf(t)||r!==Object.prototype&&r!==Array.prototype)return!1;let i=e,a=t,o=Object.keys(i);return o.length===Object.keys(a).length&&o.every(e=>typeof i[e]==`function`&&typeof a[e]==`function`?`key`in i:n?.has(e)&&i[e]&&a[e]||Uu(i[e],a[e],n))}var Wu=(e,t)=>e.el.compareDocumentPosition(t.el)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1;function Gu(e,t){let n=0,r=e.length;for(;n<r;){let i=n+r>>1;Wu(e[i],t)<0?n=i+1:r=i}return n}var Ku=(e,t)=>e?.x===t?.x&&e?.y===t?.y&&e?.w===t?.w&&e?.h===t?.h,qu=e=>e.localName===`d-surface`&&e.hasAttribute(`path`)&&!e.style.width&&(parseFloat(e.getAttribute(`height`)??``)||0)>0,Ju=e=>[...e.children].reduce((e,t)=>e+(qu(t)?parseFloat(t.getAttribute(`height`)):0),parseFloat(e.getAttribute(`height`)??``)||4),Yu=e=>[...e.querySelector(`:scope > d-device[reverse]`)?.children??[]].reduce((e,t)=>e+(qu(t)?parseFloat(t.getAttribute(`height`)):0),0),Xu={front:0,right:Math.PI/2,back:Math.PI,left:-Math.PI/2},Zu=e=>{let t=e.getAttribute(`turned`);return t===null?`front`:t===`left`||t===`right`?t:`back`},Qu=3,$u=.35,ed=.3,td=.6,nd=2*ed*td,rd=.6,id=.015,ad=.25,od=6,sd=(e,t)=>e+Math.atan2(Math.sin(Xu[t]-e),Math.cos(Xu[t]-e));function cd(e){for(;e;e=e.parentElement){let t=getComputedStyle(e).backgroundColor.match(/[\d.]+/g);if(t&&t.length>=3&&(t.length<4||Number(t[3])>=.5))return[Number(t[0])/255,Number(t[1])/255,Number(t[2])/255]}return[1,1,1]}var ld=class{devices=new Set;stats={paints:0,partial:0,lights:0,frames:0,layouts:0,measures:0,paintMs:0,lightMs:0,bakes:0,copyMs:0,copies:0,stages:0,layoutMs:0,held:0,glows:0};ok=!1;maxRatio=globalThis.matchMedia?.(`(pointer: coarse)`).matches?2:6;oversample=this.maxRatio>2?2:1;cards=!0;sides=!1;raised=!0;get relief(){return this.raised}set relief(e){e!==this.raised&&(this.raised=e,this.renderer?.showRelief(e),typeof document<`u`&&this.repaintWithin(document.documentElement))}whips=new WeakMap;whipped=0;keep=globalThis.matchMedia?.(`(pointer: coarse)`).matches?6e8:1/0;departures=0;renderer=null;get probe(){return this.renderer.probe}set probe(e){this.renderer.probe=e}get fields(){return this.renderer.fields}get settling(){return!!this.renderer?.settling()}maskCanvas=new OffscreenCanvas(1,1);maskCtx=this.maskCanvas.getContext(`2d`);reachCanvas=document.createElement(`canvas`);io=null;view=null;far=null;farOff=new Set;farOn=new Set;judged=new Map;judgedAt=[-1,-1,-1];sleepers=new Map;sleptStale=!1;woken=null;handAt=null;stage=null;veils=new Map;staleStage=!1;ro=null;moves=0;shifts=0;unsure=new Map;arrived=new Set;changes=[];holderBox=new WeakMap;seen=null;wantsSeen=!1;doubt=-1;looks=0;lenses=new WeakMap;lensStyle=new WeakMap;quietAt=-1;ticking=null;tickAsked=!1;scrolledTo=[0,0];page=null;carries=new WeakMap;raf=0;last=0;lightDirty=!0;lightChanges=0;pointsMoved=!1;glowMoved=[];pointsAll=!0;glowStale=!0;glowAt=-1/0;points=null;flickered=0;pointer={x:0,y:0,tx:0,ty:0,i:0,ti:0,seen:!1};reduced=matchMedia(`(prefers-reduced-motion: reduce)`);byPointer=!1;tilt=0;strict=!1;ambient=1;lighting=`studio`;eye=new Hc;exposure=`auto`;scrollAt=-1/0;torch=0;handheld=`flashlight`;fullLight=!0;sweeping=!1;room=sl;arriving=4;lightEach=.2;behind=!1;scrolled=!1;carried=!1;handsDue=!1;turnsDue=!1;handShifted=!1;blamed=null;sizing=!1;sizedUntil=0;sizedTimer=0;beatAt=0;beatTimer=0;owner=new WeakMap;markup=new MutationObserver(e=>this.remark(e));lights=1;lampHz=0;lampHzOf=null;lampFor=null;lampOwed=!1;look=0;constructor(){let e=document.createElement(`style`);e.dataset.diegetic=``,document.head.prepend(e);let t=e,r=null;if(n(e=>{r||(r=[],queueMicrotask(()=>{let e=document.createElement(`style`);e.dataset.diegetic=``,e.textContent=r.join(`
`),r=null,t.after(e),t=e})),r.push(e)},t=>e.append(t)),e.append(`[data-bent],[data-flat]{transform:none!important;translate:none!important;rotate:none!important;scale:none!important}`),this.renderer=new Ms(this.stats,()=>{for(let e of this.devices)e.layoutDirty=!0;this.schedule()},()=>{let e=this.sharpness(1)/this.renderer.store.squeeze;return[(innerWidth+128)*e,(innerHeight+128)*e]}),!this.renderer.ok)return;this.renderer.store.ceiling=wl,this.renderer.refused=()=>{this.renderer.store.tally();for(let e of this.devices)e.layoutDirty=!0;this.schedule()},this.ok=!0,Ka(this,this.renderer),this.io=new IntersectionObserver(e=>this.near(e.flatMap(e=>{let t=e.target.__d;return t?[[t,e.isIntersecting]]:[]})),{rootMargin:xl}),this.view=new IntersectionObserver(e=>{for(let t of e)this.sighted(t.target.__d,t.isIntersecting);this.schedule()},{rootMargin:`${Dl}px`}),this.far=new IntersectionObserver(e=>{for(let t of e)this.farFrom(t.target,t.isIntersecting)},{rootMargin:El}),this.ro=new ResizeObserver(e=>this.resized(e)),this.page=new MutationObserver(e=>this.changed(e)),this.page.observe(document.documentElement,{subtree:!0,childList:!0,attributes:!0,characterData:!0});let i=()=>{this.moves++,this.judged.size&&this.schedule()};addEventListener(`resize`,i),addEventListener(`load`,i,{capture:!0}),Yc(e=>{let t=e.part&&this.owner.get(e.part);t&&this.stir(t),t?.small&&!t.used?this.onBeat():this.schedule()}),Fo(()=>{this.pointsMoved=!0,this.schedule()});let a=()=>this.relight();addEventListener(`scroll`,()=>this.panned(),{passive:!0,capture:!0}),bc(e=>this.viewed(e)),Ba(()=>{this.stage&&(this.staleStage=!0,this.schedule())}),addEventListener(`resize`,()=>{this.look||this.torch?a():this.lights&&this.pointer.i&&(this.handShifted=!0,this.schedule())}),addEventListener(`pointermove`,e=>{if(!this.look&&!this.lights&&!this.torch||this.reduced.matches||this.lampHeld||e.buttons&&!this.torch)return;let t=this.pointer;t.tx=e.clientX,t.ty=e.clientY,t.ti=1,this.carried=!1,t.seen||=(t.x=t.tx,t.y=t.ty,!0),this.schedule()},{passive:!0});let o=e=>{let t=e.clientX,n=e.clientY,r=this.woken;if(this.handAt=[t,n],r&&!Ul(r.r,t,n)&&this.unhand(),!(this.woken||this.sizing||!this.sleepers.size)){if(this.sleptStale){for(let e of this.sleepers.keys())this.sleepers.set(e,this.where(e));this.sleptStale=!1}for(let[e,r]of this.sleepers)if(Ul(r,t,n)&&!e.el.closest(`[inert]`)){this.woken={d:e,r},e.used|=Vl,this.rest(e);break}}};addEventListener(`pointermove`,o,{passive:!0}),addEventListener(`pointerdown`,o,{capture:!0,passive:!0}),addEventListener(`pointerdown`,()=>{this.byPointer=!0},{capture:!0,passive:!0}),addEventListener(`keydown`,()=>{if(this.byPointer){this.byPointer=!1;for(let e of this.devices)e.el.contains(document.activeElement)&&this.touch(e,document.activeElement);this.schedule()}},{capture:!0}),document.documentElement.addEventListener(`pointerleave`,()=>{this.pointer.ti=0,this.schedule()});let s=()=>{this.moves++;for(let e of this.devices)e.layoutDirty=!0,e.print=``;this.schedule()};document.fonts?.ready.then(s),document.fonts?.addEventListener(`loadingdone`,s);let c=matchMedia(`(forced-colors: active)`),l=()=>document.documentElement.classList.toggle(`d-gl`,!c.matches);c.addEventListener(`change`,l),l();let u=()=>{for(let e of this.devices)e.themed&&gd(e.el)!==e.scheme&&(e.layoutDirty=e.materialDirty=!0,e.print=``,this.schedule())};new MutationObserver(u).observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`style`,`data-mode`,`data-theme`,`data-color-scheme`]}),matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,u)}add(e){if(Nc(e),!this.ok)return;for(let t of e.querySelectorAll(`:scope > canvas[data-d]`))t.remove();let t=document.createElement(`canvas`);t.dataset.d=``,t.setAttribute(`aria-hidden`,`true`),e.prepend(t);let n={el:e,canvas:t,ctx:t.getContext(`2d`),parts:new Map,list:[],movers:[],cleanups:new Map,observer:new MutationObserver(r=>{for(let i of r){if(i.target===t||i.target===n.drawing||i.attributeName===`data-bent`||i.attributeName===`data-flat`||i.type===`childList`&&[...i.addedNodes,...i.removedNodes].every(e=>e instanceof HTMLCanvasElement&&`sketch`in e.dataset))continue;let r=i.target.nodeType===1?i.target:i.target.parentElement;if(this.stage&&r===e&&i.attributeName===`style`&&pd(i.oldValue)!==pd(e.getAttribute(`style`))&&this.restage(n),r.closest(`d-device, [data-alone]`)!==e)continue;if(r===e&&i.attributeName&&ku.has(i.attributeName)){this.reseen(e);continue}if(r===e&&i.attributeName===`turned`){let t=Zu(e);(t===`front`||n.faces.some(e=>e.facing===t))&&(n.spun=sd(n.spun,t)),this.turnsDue=!0,this.schedule();continue}if(i.attributeName===`d-reach`||i.attributeName&&gu(i.oldValue)===gu(r.getAttribute(i.attributeName)))continue;if(r===e&&i.attributeName===`style`&&Pu(Au(i.oldValue))===Pu(Au(e.getAttribute(i.attributeName)))){let t=Mu(e.getAttribute(`style`));Nu.get(e)!==t&&(Nu.set(e,t),this.resized([{target:e}]));continue}if(r===e&&i.attributeName===`scale`){Nc(e,!0);continue}if(r===e&&i.attributeName===`split`){n.split=ru(e),n.lightDirty=!0,n.lightBox=null,this.schedule();continue}if(r===e&&i.attributeName===`debug`){n.debug=uu(e);for(let e of n.faces)e.debug=n.debug;n.lightDirty=!0,n.lightBox=null,this.schedule();continue}if(r===e&&i.attributeName===`lighting`){n.lightDirty=!0,n.lightBox=null,this.schedule();continue}if(r===e&&i.attributeName===`angle`){n.angle=ou(e),e.style.rotate=su(n.angle);for(let e of n.faces)e.angle=n.angle;n.lightDirty=!0,n.lightBox=null,this.schedule();continue}if(r===e&&i.attributeName===`lean`){n.lean=lu(e);for(let e of n.faces)e.lean=n.lean;n.lightDirty=!0,n.lightBox=null,this.schedule();continue}let a=n.parts.get(r)??n.parts.get(r.parentElement);a?.def.live?.includes(i.type===`attributes`?i.attributeName:`#text`)?(a.def.update?.(a),n.moving.add(a)):n.layoutDirty=!0,this.schedule()}}),listeners:new AbortController,plate:null,x:e.hasAttribute(`fill`)?0:il,y:e.hasAttribute(`fill`)?0:il,w:0,h:0,room:[1/0,1/0],drawn:null,bare:null,plain:null,hid:null,bend:null,card:null,used:0,pointBox:null,glowedAt:``,gave:null,shone:[],seenLight:-1,material:`plain`,wear:0,age:0,radius:10,pw:0,ph:0,cw:0,ch:0,dpr:1,fine:1,seed:this.devices.size+1,scheme:`light`,themed:!1,debug:0,split:-1,lean:lu(e),angle:ou(e),eye:[0,0,1],turns:e.matches(`[reverse], [side]`)||!!e.querySelector(`:scope > d-device:is([reverse], [side])`),faces:[],spin:0,axis:0,owns:[0,0,0],round:0,body:null,spun:0,spinning:0,over:!1,turning:!1,handy:!1,visible:!1,waited:0,stirred:0,stepped:0,small:!1,cost:0,toward:1,kept:[yu(),yu()],cam:void 0,quiet:!1,ticked:!1,left:0,hand:0,turn:[0,0],aim:[0,0],owed:!1,sharpen:!1,viewDirty:!1,marks:0,compiled:null,layoutDirty:!0,materialDirty:!0,lightDirty:!0,placed:!1,version:0,prints:0,dust:0,scuff:0,haze:0,grime:0,dents:0,fade:0,print:``,face:4,cast:4,moving:null,lightBox:null,reachDirty:!0,reachCell:2,drawing:null,failed:null,staged:!1,shown:!1};n.moving=new vu(()=>this.stir(n));for(let e of Ou){let t=n[e];Object.defineProperty(n,e,{get:()=>t,set:e=>{t=e,e&&this.stir(n)}})}let r=e.hasAttribute(`reverse`)?`back`:e.getAttribute(`side`)===`left`?`left`:e.getAttribute(`side`)===`right`?`right`:null,i=e.parentElement.__d;r&&i?(n.front=i,n.facing=r,i.faces.push(n),r===`back`&&(i.reverse=n),n.lean=i.lean,n.angle=i.angle,r!==`back`&&e.style.setProperty(`--d-deep`,`${(Ju(i.el)+Yu(i.el))/.25}px`),Zu(i.el)===r&&(i.spun=sd(i.spun,r),this.turnsDue=!0)):(n.angle[0]||n.angle[1])&&(e.style.rotate=su(n.angle)),n.plate=this.renderer.open(n),n.front&&(n.round=Xu[n.facing],this.bodied(n.front)),e.__d=n,this.devices.add(n),e.parentElement&&this.arrived.add(e.parentElement),this.io.observe(e),this.view.observe(e),this.far.observe(e);try{this.ro.observe(e,{box:`device-pixel-content-box`})}catch{this.ro.observe(e)}n.observer.observe(e,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeOldValue:!0}),this.markup.observe(e,{subtree:!0,childList:!0,characterData:!0,characterDataOldValue:!0,attributes:!0,attributeOldValue:!0}),this.bind(n)}bodied(e){let t=[e,...e.faces],n=e.faces.length?t.map(e=>e.plate):null;for(let e of t)e.body=n,e.plate.edged=[]}remove(e){Fc(e);let t=e.__d;if(t){this.devices.delete(t),t.shone.length&&(this.glowMoved.push(...t.shone),this.schedule()),t.front&&(t.front.faces=t.front.faces.filter(e=>e!==t),t.front.reverse===t&&delete t.front.reverse,this.bodied(t.front)),this.io.unobserve(e),this.view.unobserve(e),this.far.unobserve(e),this.judged.delete(t),this.farOff.delete(e),this.farOn.delete(e),e.removeAttribute(`data-far`),e.removeAttribute(`data-asleep`),this.sleepers.delete(t),this.woken?.d===t&&(this.woken=null),this.ro.unobserve(e),t.observer.disconnect(),t.listeners.abort();for(let e of t.cleanups.values())e();if(this.renderer.close(t.plate),t.canvas.remove(),t.drawing?.remove(),t.staged&&this.stage){let{order:e}=this.stage,n=e?.indexOf(t)??-1;n>=0&&e.splice(n,1),this.staleStage=!0,this.schedule()}delete e.__d}}touch(e,t){for(let n=t;n&&n!==e.el.parentElement;n=n.parentElement){let t=e.parts.get(n);t&&e.moving.add(t)}}redraw(e,t){this.touch(t,e),this.schedule()}bind(e){let{signal:t}=e.listeners,n=t=>{this.touch(e,t.target),this.schedule()};e.el.addEventListener(`focusin`,n,{signal:t}),e.el.addEventListener(`focusout`,n,{signal:t});let r=t=>{t.type===`focusin`||e.el.contains(t.relatedTarget)?e.used|=Hl:e.used&=-3,this.sizing||this.rest(e)};e.el.addEventListener(`focusin`,r,{signal:t}),e.el.addEventListener(`focusout`,r,{signal:t});let i=e.front??e;if(!e.front&&e.turns)for(let[n,r]of[[`pointerenter`,!0],[`pointerleave`,!1]])e.el.addEventListener(n,()=>{e.handy=r,this.schedule()},{signal:t});let a=(t,n)=>{let r=Math.max(Math.hypot(t,n),1);e.aim=[t/r,n/r],this.turnsDue=!0,this.schedule()},o=!1;e.el.addEventListener(`pointerdown`,n=>{if(n.button||n.target!==e.el)return;if(i.faces.length&&!i.el.hasAttribute(`fixed`)){let e=i.el.getBoundingClientRect(),r=i.aim[1],{clientY:a,pointerId:s}=n,c=i.spun,l=n.clientX;i.el.setPointerCapture(s),o=!0;let u=t=>{let n=-((t.clientX-l)/e.width)*Math.PI;if(this.cards){let e=Math.sign(n),r=this.turnable(i).flatMap(e=>[-1,0,1].map(t=>sd(c,e.facing??`front`)+t*Math.PI*2)),a=Math.min(...r.map(t=>(t-c)*e).filter(e=>e>.001));Math.abs(n)>a*ed?(c+=e*a,l=t.clientX,i.spun=c):i.spun=c+n*td}else i.spun=c-(t.clientX-l)/e.width*Math.PI;if(i.lean)for(let n of[i,...i.faces])n.aim=[0,Math.max(-1,Math.min(1,r-(t.clientY-a)/(e.height/2)))];this.turnsDue=!0,this.schedule()},d=()=>{o=!1;let e=this.turnable(i).map(e=>e.facing??`front`).reduce((e,t)=>Math.abs(sd(i.spun,t)-i.spun)<Math.abs(sd(i.spun,e)-i.spun)?t:e);i.spun=sd(i.spun,e),e===`front`?i.el.removeAttribute(`turned`):i.el.setAttribute(`turned`,e===`back`?``:e),this.turnsDue=!0,this.schedule(),i.el.removeEventListener(`pointermove`,u),i.el.removeEventListener(`lostpointercapture`,d)};i.el.addEventListener(`pointermove`,u,{signal:t}),i.el.addEventListener(`lostpointercapture`,d,{signal:t});return}if(!e.lean)return;let r=e.el.getBoundingClientRect(),[s,c]=e.aim,{clientX:l,clientY:u,pointerId:d}=n;e.el.setPointerCapture(d),o=!0;let f=e=>a(s-(e.clientX-l)/(r.width/2),c-(e.clientY-u)/(r.height/2)),p=()=>{o=!1,e.el.removeEventListener(`pointermove`,f),e.el.removeEventListener(`lostpointercapture`,p)};e.el.addEventListener(`pointermove`,f,{signal:t}),e.el.addEventListener(`lostpointercapture`,p,{signal:t})},{signal:t}),e.el.addEventListener(`pointerleave`,()=>{if(!o)for(let t of i.faces.length?[i,...i.faces]:[e])(t.aim[0]||t.aim[1])&&(t.aim=[0,0],this.turnsDue=!0,this.schedule())},{signal:t});let s=t=>{if(t.target.type===`radio`){for(let t of e.list)t.def.update?.(t),e.moving.add(t);this.schedule()}for(let n=t.target;n&&n!==e.el.parentElement;n=n.parentElement){let t=e.parts.get(n);t?.def.update&&(t.def.update(t),e.moving.add(t),this.schedule())}};e.el.addEventListener(`input`,s,{signal:t}),e.el.addEventListener(`change`,s,{signal:t})}relight(){this.lightDirty=this.fullLight=!0,this.renderer.staleBakes(),this.schedule()}lampHeld=!1;get aimed(){return this.pointer}aim(e,t){let n=this.pointer;n.tx=e,n.ty=t,n.ti=1,this.carried=!0,this.schedule()}letGo(){this.lampHeld=!1,this.pointer.ti=0,this.schedule()}schedule(e){let t=e?md(e):this.ticking;t&&(this.stir(t),t===this.ticking&&(this.tickAsked=!0)),!this.raf&&this.ok&&(this.raf=requestAnimationFrame(this.tick))}onBeat(){this.raf||this.beatTimer||!this.ok||(this.beatTimer=window.setTimeout(()=>(this.beatTimer=0,this.schedule()),Math.max(0,this.beatAt+tu-performance.now())))}told=new WeakSet;async flushed(e=240){await document.fonts.ready;for(let e=0;e<300&&![...this.devices].some(e=>e.visible);e++)await new Promise(e=>setTimeout(e,10));let t=[...this.devices].map(e=>e.el).filter(e=>!this.told.has(e));for(let e of t)this.told.add(e);t.length&&await new Promise(e=>{let n=new IntersectionObserver(()=>{n.disconnect(),e()});for(let e of t)n.observe(e)});let n=performance.now(),r=0,i=performance.now()+2e3,a=()=>this.stats.lights+this.stats.paints+this.stats.layouts;for(let t=0;t<e&&r<2;t++){let e=a();this.flush(n+=16.7);let t=this.settling&&performance.now()<i;r=a()===e&&!t?r+1:0,await new Promise(e=>t?requestAnimationFrame(()=>setTimeout(e)):setTimeout(e))}}flush(e=performance.now()){this.raf&&cancelAnimationFrame(this.raf),this.sizing&&this.settle(),this.tick(e,!0)}resized(e){let t=new Set;for(let n of e){let e=hl(n.target.parentElement);if(!e){t.clear(),this.moves++;break}t.add(e)}t.size&&this.shifted(t);let n=!1,r=!1;for(let t of e){let e=t.target.__d;if(!e)continue;if(!e.placed){e.layoutDirty=!0;continue}let i=this.flat(e,()=>{let t=e.el.getBoundingClientRect(),n=uc(e.el,t);return Math.abs(t.width-e.w*n)<Jl&&Math.abs(t.height-e.h*n)<Jl});e.visible?(r=e.owed=!0,i||this.shown(e,e.el)&&(e.el.dispatchEvent(new Event(`resized`)),e.observer.takeRecords(),e.layoutDirty=n=!0)):i?e.owed=!0:e.layoutDirty=!0}r&&(this.sizing=!0,this.sizedUntil=Math.max(this.sizedUntil,performance.now()+Wl),this.sizedTimer||=window.setTimeout(this.waited,Wl)),n&&!this.renderer.lost?(this.renderer.begin(!1,performance.now()-this.scrollAt>200),this.weigh(),this.frame(performance.now())):this.schedule()}near(e){let t=[];for(let[n,r]of e)n.visible=r,r?(t.push(n),this.held(n)?n.lightDirty||=n.seenLight!==this.lightChanges:n.placed?(n.viewDirty=n.sharpen=!0,n.toward=1):n.layoutDirty=!0):(n.left=++this.departures,n.seenLight=this.lightChanges,this.renderer.drop(n.plate));this.stage&&this.restAll(this.sizing?t.filter(e=>e.el.closest(`[inert]`)):t),this.schedule()}sighted(e,t){e?.owed&&t&&!this.sizing&&(this.sharpenFor(e),e.owed=!1)}farFrom(e,t){let n=e.__d;t?(this.farOff.delete(e),this.sizing&&n?.staged&&this.bare(n)?this.farOn.add(e):e.removeAttribute(`data-far`)):(this.farOn.delete(e),this.sizing?this.farOff.add(e):e.setAttribute(`data-far`,``))}judge(){if(this.sure(),this.judgedAt[0]===this.moves&&this.judgedAt[1]===this.looks&&this.judgedAt[2]===this.shifts)return;this.judgedAt=[this.moves,this.looks,this.shifts];for(let e of this.devices)!this.judged.has(e)&&e.el.isConnected&&this.camOf(e)&&(this.io.unobserve(e.el),this.view.unobserve(e.el),this.far.unobserve(e.el),this.judged.set(e,{near:e.visible,shown:!1,far:e.el.matches(`[data-far]`)}));if(!this.judged.size)return;this.unbend([...this.judged.keys()].filter(e=>e.staged&&e.bend?.moved));let e=innerWidth,t=innerHeight,n=0,r=0,i=1,a=[-1/0,-1/0,1/0,1/0],o=new Map,s=(o,s,c,l,u,d)=>o+c>=(Math.max(-u,a[0])-n)/i&&o<=(Math.min(e+u,a[2])-n)/i&&s+l>=(Math.max(-d,a[1])-r)/i&&s<=(Math.min(t+d,a[3])-r)/i,c=[],l=!1;for(let[u,d]of this.judged){if(u.cam===void 0&&!this.camOf(u)){this.judged.delete(u),this.io.observe(u.el),this.view.observe(u.el),this.far.observe(u.el);continue}let f=u.kept[0],p=this.lens(u.cam);a=o.get(u.cam)??(o.set(u.cam,pl(u.cam)),o.get(u.cam));let m,h,g,_;if(p&&f.at===this.moves&&f.local)[m,h,g,_]=f.local,[n,r,i]=[p.left,p.top,p.s];else{let e=this.where(u);[m,h,g,_,n,r,i]=[e.left,e.top,e.width,e.height,0,0,1]}let v=s(m,h,g,_,bl,bl),y=s(m,h,g,_,Dl,Dl),b=!s(m,h,g,_,e*Tl,t*Tl);v!==d.near&&c.push([u,d.near=v]),y!==d.shown&&(this.sighted(u,d.shown=y),l=!0),b!==d.far&&this.farFrom(u.el,!(d.far=b))}this.see(),c.length?this.near(c):l&&this.schedule()}camOf(e){if(e.cam===void 0){let t=e.el.closest(`[data-camera]`);e.cam=t&&!t.parentElement?.closest(`[data-camera]`)?t:null}return e.cam}panned(e=!1){e?this.looks++:this.moves++,this.scrollAt=performance.now(),this.glowStale=!0,this.sleepers.size&&(this.sleptStale=!0),this.stage&&(this.staleStage=!0,this.schedule()),this.lights&&this.pointer.i&&(this.handShifted=!0,this.schedule()),this.torch&&(this.lightDirty=this.scrolled=!0,this.schedule())}viewed(e){!this.stage&&e.isConnected&&yc(e)&&this.stageIn(e),this.panned(!0);let t=!1;for(let n of this.devices)n.placed&&e.contains(n.el)&&(n.owed=t=!0);t&&(this.sizing=!0,this.sizedUntil=Math.max(this.sizedUntil,performance.now()+Gl),this.sizedTimer||=window.setTimeout(this.waited,Gl),this.schedule())}waited=()=>{let e=this.sizedUntil-performance.now();e>=1?this.sizedTimer=window.setTimeout(this.waited,e):this.settle()};settle(){clearTimeout(this.sizedTimer),this.sizedTimer=0,this.sizing=!1,this.quietAt=-1;for(let e of this.farOff)e.setAttribute(`data-far`,``);for(let e of this.farOn)e.removeAttribute(`data-far`);if(this.farOff.clear(),this.farOn.clear(),this.stage){let e=this.woken,t=this.handAt;!e||t&&Ul(e.r=this.where(e.d),t[0],t[1])||this.unhand(),this.restAll([...this.devices].filter(e=>e.visible)),this.sleptStale=!1}for(let e of this.devices)e.owed&&e.visible&&(this.sharpenFor(e),e.owed=!1);this.schedule()}sharpenFor(e){let t=uc(e.el),n=this.whole(e.cw,e.ch,t),r=tc(t);r!==e.reachCell&&(e.reachCell=r,e.reachDirty=!0),n>e.dpr*Kl||n<e.dpr/ql?(e.viewDirty=e.sharpen=!0,e.toward=(n/e.dpr)**2):e.sharpen&&(this.held(e)||!e.staged||e.plate.picture?.pw===e.pw&&e.plate.picture.ph===e.ph)&&(e.viewDirty=e.sharpen=!1),e.viewDirty&&(e.quiet=!1)}standing(e,t){return!e.layoutDirty&&!e.viewDirty&&!e.materialDirty&&!e.lightDirty&&!this.lightDirty&&!e.moving.size&&e.version===t&&!e.movers.some(e=>e.p.def.tick||e.springs.some(e=>e.active))}sharpness(e){let t=(devicePixelRatio||1)*Math.min(e,8),n=(devicePixelRatio||1)>=2?1:this.oversample;return Math.max(Math.min(t*n,this.maxRatio),t)*this.renderer.store.squeeze}condition(e){let{el:t}=e.front??e;e.material=t.getAttribute(`material`)??`plain`,e.scheme=gd(t);let n=du[t.getAttribute(`condition`)??`new`]??du.new;e.age=+(t.getAttribute(`age`)??n.age),e.wear=+(t.getAttribute(`wear`)??Math.max(n.wear,e.age*.6)),e.prints=+(t.getAttribute(`prints`)??n.prints),e.dust=+(t.getAttribute(`dust`)??n.dust),e.scuff=+(t.getAttribute(`scuff`)??n.scuff),e.haze=+(t.getAttribute(`haze`)??n.haze),e.grime=+(t.getAttribute(`grime`)??Math.max(n.grime,e.age)),e.dents=+(t.getAttribute(`dents`)??n.dents),e.fade=+(t.getAttribute(`fade`)??Math.max(n.fade,e.age*.5)),e.radius=ke(t.getAttribute(`radius`),2.5)*4,e.seed=+(t.getAttribute(`seed`)??e.seed),e.debug=uu(t),e.split=ru(t)}layout(e,t=!1){e.eye=cu(e.front?.el??e.el),e.bare=e.plain=e.hid=null,e.kept[0].at=e.kept[1].at=-1,e.cam=void 0,this.flat(e,()=>this.measure(e,t&&e.placed&&!e.layoutDirty)),this.stage&&(this.restage(e),this.sizing||this.rest(e))}stageIn(e){let t=this.renderer.stage();t.dataset.d=`stage`,t.setAttribute(`aria-hidden`,`true`),Object.assign(t.style,{position:`absolute`,left:`0`,top:`0`,width:`0`,height:`0`,pointerEvents:`none`,transformOrigin:`0 0`,willChange:`transform`}),e.prepend(t),this.stage={world:e,canvas:t,order:null};for(let e of this.devices)e.placed&&this.restage(e);this.staleStage=!0}stageOut(){if(this.stage){this.stage=null,this.sleepers.clear(),this.woken=null;for(let e of this.devices)e.el.removeAttribute(`data-asleep`),e.used&=-2,e.reachDirty&&this.stir(e),e.staged&&(e.staged=!1,e.lightDirty=!0,e.lightBox=null);this.renderer.unstage(),this.schedule()}}stageable(e){let t=this.stage?.world,n=e.bend;if(e.bend=null,!t||!t.contains(e.el))return!1;let r=e.el.parentElement?.closest(`d-device, [data-alone]`),i=r&&t.contains(r)?md(r):null;if(r&&t.contains(r)&&(!i?.staged||!this.plain(i)))return!1;let a=getComputedStyle(e.canvas).visibility!==`visible`&&!e.el.closest(`[data-camera] [data-far]`),o=[e.canvas],s=!1,c=!!(e.front||e.faces.length||i||a);for(let n=e.el;n&&n!==t;n=n.parentElement){let e=getComputedStyle(n);if(e.filter!==`none`||e.opacity!==`1`||e.clipPath!==`none`&&!n.hasAttribute(`data-far`)||e.maskImage!==`none`||e.mixBlendMode!==`normal`||e.overflowX!==`visible`||e.overflowY!==`visible`)return!1;let t=e.transform!==`none`||e.translate!==`none`||e.rotate!==`none`||e.scale!==`none`;s||=t,c||=t||e.perspective!==`none`,o.push(n)}return!c&&getComputedStyle(t).perspective===`none`||(o.push(t),e.bend=n&&n.chain.length===o.length&&n.chain.every((e,t)=>e===o[t])?Object.assign(n,{moved:s,h:void 0}):{chain:o,moved:s,flat:null,zoom:[],at:-1}),!0}bare(e){return e.bare===null?e.el.closest(`[data-camera] [data-far]`)?!1:e.bare=this.paintless(e,!1):e.bare}plain(e){return e.plain===null?e.el.closest(`[data-camera] [data-far]`)?!1:e.plain=this.paintless(e,!0):e.plain}paintless(e,t){let n=r=>{for(let i of r.children){if(i===e.canvas||i===e.drawing||t&&i.matches(`d-device, [data-alone]`)||e.faces.some(e=>e.el===i))continue;let r=getComputedStyle(i);if(r.display!==`none`&&r.opacity!==`0`){if([`canvas`,`img`,`svg`,`video`,`iframe`,`object`,`embed`].includes(i.localName))return!1;if(r.visibility===`visible`){let e=r.backgroundColor!==`rgba(0, 0, 0, 0)`||r.backgroundImage!==`none`||r.boxShadow!==`none`||r.borderStyle!==`none`&&r.borderWidth!==`0px`||r.outlineStyle!==`none`&&r.outlineWidth!==`0px`,t=r.color!==`rgba(0, 0, 0, 0)`&&[...i.childNodes].some(e=>e.nodeType===Node.TEXT_NODE&&e.textContent.trim());if(e||t||[`input`,`select`,`textarea`].includes(i.localName)&&r.appearance!==`none`)return!1}if(!n(i))return!1}}return!0};return n(e.el)}unbend(e){let t=this.stage?.world,n=e.filter(e=>e.bend&&e.bend.at!==this.moves);if(!t||!n.length)return;for(let e of n)for(let n of e.bend.chain)n!==e.canvas&&n!==t&&n.setAttribute(`data-bent`,``);let r=t.getBoundingClientRect(),i=t.offsetWidth?r.width/t.offsetWidth:1;for(let e of n){let n=e.bend;n.flat=n.chain.map(n=>{if(n===t)return[0,0,t.offsetWidth,t.offsetHeight];let a=n===e.canvas?null:n.getBoundingClientRect();return a?[(a.left-r.left)/i,(a.top-r.top)/i,a.width/i,a.height/i]:[0,0,0,0]}),n.zoom=n.chain.map(()=>1);for(let e=n.chain.length-2;e>=0;e--)n.zoom[e]=n.zoom[e+1]*(parseFloat(getComputedStyle(n.chain[e]).zoom)||1);let[a,o]=n.flat[1],s=n.zoom[1];n.flat[0]=[a-e.x*s,o-e.y*s,e.cw*s,e.ch*s],n.at=this.moves}for(let e of n)for(let t of e.bend.chain)t.removeAttribute(`data-bent`)}flatOf(e){let t=e.bend,n=this.stage?.world;if(!e.staged||!t?.moved||!n)return null;this.unbend([e]);let[r,i,a,o]=t.flat[1],s=n.getBoundingClientRect(),c=n.offsetWidth?s.width/n.offsetWidth:1;return new DOMRect(s.left+r*c,s.top+i*c,a*c,o*c)}bent(e){let t=e.bend,n=this.stage.world,r=`${this.moves} ${(e.front??e).spinning} ${gc(n)}`;if(t.h!==void 0&&t.made===r)return t.h;this.unbend([e]);let i=new DOMMatrix,a=!1;return t.chain.forEach((e,r)=>{let o=getComputedStyle(e),[s,c,l,u]=t.flat[r],d=t.zoom[r];if(r){if(o.perspective!==`none`){let[e,t]=o.perspectiveOrigin.split(` `).map(e=>parseFloat(e)),n=new DOMMatrix;n.m34=-1/parseFloat(o.perspective),i=Tu(Eu(n,d),s+e*d,c+t*d).multiply(i),a=!0}o.transformStyle!==`preserve-3d`&&(i.m13=i.m23=i.m33=i.m43=0)}let f=e===n?null:wu(o,l/d,u/d);if(!f)return;let[p,m,h]=o.transformOrigin.split(` `).map(e=>parseFloat(e));i=Tu(Eu(f,d),s+p*d,c+m*d,(h||0)*d).multiply(i),a=!0}),t.made=r,t.h=a?[i.m11,i.m21,i.m41,i.m12,i.m22,i.m42,i.m14,i.m24,i.m44]:null}rest(e,t=this.restAt(e)){let n=!!t&&(Math.max(t.width,t.height)<Bl||!!e.el.closest(`[inert]`));n?this.sleepers.set(e,t):this.sleepers.delete(e)&&e.reachDirty&&this.stir(e),n!==e.el.hasAttribute(`data-asleep`)&&e.el.toggleAttribute(`data-asleep`,n)}restAll(e){let t=e.map(e=>this.restAt(e));e.forEach((e,n)=>this.rest(e,t[n]))}restAt(e){let t=this.stage?.world;return!t||e.used||!t.contains(e.el)?null:e.placed&&this.bare(e)||this.away(e)&&e.el.closest(`[inert]`)?this.where(e):null}unhand(){let e=this.woken;e&&(this.woken=null,e.d.used&=-2,this.sizing||this.rest(e.d))}restage(e){let t=this.stageable(e);if(t===e.staged)return;e.staged=t,t?(e.plate.picture||!e.canvas.width)&&this.vacate(e):this.renderer.forget(e.plate),e.lightDirty=!0,e.lightBox=null;let n=this.stage.order;n&&(t?n.splice(Gu(n,e),0,e):n.splice(n.indexOf(e),1)),this.staleStage=!0;for(let t of e.el.querySelectorAll(`d-device, [data-alone]`)){let n=md(t);n?.placed&&n!==e&&this.restage(n)}}vacate(e){e.canvas.width&&(e.canvas.width=0),e.canvas.height&&(e.canvas.height=0);let t=e.canvas.style;(t.width!==`0px`||t.height!==`0px`)&&Object.assign(t,{width:`0px`,height:`0px`})}showStage(){let e=this.stage,{world:t,canvas:n}=e;if(this.staleStage=!1,!t.isConnected){this.stageOut();return}n.parentElement!==t&&t.prepend(n);let r=(t.parentElement??t).getBoundingClientRect(),i=Math.max(r.left,0),a=Math.max(r.top,0),o=Math.min(r.right,innerWidth),s=Math.min(r.bottom,innerHeight),c=t.getBoundingClientRect(),l=t.offsetWidth?c.width/t.offsetWidth:1;if(o<=i||s<=a||!l){n.style.width=n.style.height=`0`;return}e.order??=[...this.devices].filter(e=>e.staged).sort(Wu);let u=[];this.unbend(e.order.filter(e=>e.bend&&e.visible));let d=[l,0,c.left-i,0,l,c.top-a,0,0,1],f=[1/l,0,(i-c.left)/l,0,1/l,(a-c.top)/l,0,0,1];for(let t of e.order){let e=t.plate.picture;if(!e||!t.visible||this.away(t)||t.card?.shows===!1||t.bend&&getComputedStyle(t.canvas).visibility!==`visible`&&!t.el.closest(`[data-camera] [data-far]`))continue;let n=this.where(t);if(!n.width||!t.w)continue;let r=this.veiled(t);if(!r)continue;let c=n.width/t.w,l=t.bend&&this.bent(t),p=l?{h:bs(d,bs(l,f)),gain:(t.card?.gain??1)**2.2,smear:(t.card?.smear??0)*c}:null,[m,h,g,_]=p?[-1/0,-1/0,1/0,1/0]:[0,0,o-i,s-a],[v,y,b,x]=e.box,S=n.left-v*c-i,C=n.top-y*c-a,w=b*c,T=x*c;S>g||C>_||S+w<m||C+T<h||u.push({picture:e,plate:t.plate,x:S,y:C,w,h:T,turned:p,share:r})}this.eye.look(this.metered(i,a,o,s))&&this.exposure===`auto`&&(this.staleStage=!0,this.schedule()),this.renderer.exposure=this.exposure===`auto`?this.eye.exposure:this.exposure,this.renderer.backdrop=cd(t),this.renderer.show(u,o-i,s-a,devicePixelRatio||1,i,a);let p=n.style,m=`${o-i}px`,h=`${s-a}px`,g=`translate(${(i-c.left)/l}px, ${(a-c.top)/l}px) scale(${1/l})`;(p.width!==m||p.height!==h)&&Object.assign(p,{width:m,height:h}),p.transform!==g&&(p.transform=g)}metered(e,t,n,r){let i=Ft(this.lighting),a=e=>.2126*e[0]+.7152*e[1]+.0722*e[2],o=this.ambient*a(i.color)*(i.power/Nt.power),s=0;for(let i of wo()){let[o,c]=To(i.at),l=(i.reach/2)**2,u=i.height??i.reach/2,d=a(i.color);for(let i=0;i<3;i++)for(let a=0;a<3;a++){let f=e+(i+.5)/3*(n-e)-o,p=t+(a+.5)/3*(r-t)-c;s+=d*l/(l+f*f+p*p+u*u)/9}}let c=0,l=Po();if(l){let i=Math.max(Math.floor(e/l.cell),0),o=Math.min(Math.ceil(n/l.cell),l.w),s=Math.max(Math.floor(t/l.cell),0),u=Math.min(Math.ceil(r/l.cell),l.h),d=0;for(let e=s;e<u;e++)for(let t=i;t<o;t++,d++){let n=(e*l.w+t)*4;c+=a([l.data[n],l.data[n+1],l.data[n+2]])}c=d?c/d/255*l.gain:0}return{room:o,lights:s,glow:c}}turners(e){if(e.turners?.at===this.moves)return e.turners.els;let t=[];for(let n=(e.front??e).el.parentElement;n;n=n.parentElement){let e=getComputedStyle(n);(e.rotate!==`none`||e.transform!==`none`&&!/^matrix\([^,]+, 0, 0,/.test(e.transform))&&t.push(n)}return e.turners={at:this.moves,els:t},t}flat(e,t){let n=(e.front??e).el,{rotate:r,translate:i,scale:a}=n.style,o=!!r||getComputedStyle(n).translate.split(` `).length>=3,s=this.turners(e);if(!o&&!a&&!s.length)return t();for(let e of s)e.setAttribute(`data-flat`,``);n.style.rotate=``,n.style.scale=``,o&&(n.style.translate=`none`);try{return t()}finally{n.style.rotate=r,n.style.scale=a,o&&(n.style.translate=i);for(let e of s)e.removeAttribute(`data-flat`)}}whole(e,t,n){let[r,i]=this.renderer.room;return Math.min(this.sharpness(n),Math.min(r/e,i/t)*(1-1e-9))}held(e){return e.plate.ready}measure(e,t){let n=performance.now(),{el:r}=e,[i,a]=[e.x,e.y];t||!this.strict&&e.placed||this.auditDevice(e);let s=r.getBoundingClientRect(),c=uc(r,s);e.room=[Math.ceil(innerWidth/c),Math.ceil(innerHeight/c)],r.hasAttribute(`fill`)||(e.y=Math.min(e.y,e.room[1]),e.facing!==`left`&&e.facing!==`right`&&(e.x=Math.min(e.x,e.room[0]))),(e.facing===`left`||e.facing===`right`)&&(e.x=e.y+Math.max(e.front.el.getBoundingClientRect().width-s.width,0)/c/2);let l=Math.ceil(s.width/c-.01)+e.x*2,u=Math.ceil(s.height/c-.01)+e.y*2,[d,f]=this.renderer.room,p=this.renderer.store.squeeze,m=Math.min(e.dpr*p/(e.squeeze??1),d/l,f/u),h=this.sizing&&e.placed?m:this.whole(l,u,c);e.squeeze=p;let g=Math.ceil(l*h/al)*al,_=Math.ceil(u*h/al)*al;l=g/h,u=_/h,e.fine=h/((devicePixelRatio||1)*c);let v=tc(c);v!==e.reachCell&&(e.reachCell=v,e.reachDirty=!0),(g!==e.pw||_!==e.ph||h!==e.dpr||e.x!==i||e.y!==a)&&(this.renderer.free(e.plate),Object.assign(e,{pw:g,ph:_,cw:l,ch:u,dpr:h}),this.renderer.grow()),e.w=s.width/c,e.h=s.height/c,t||this.condition(e);let y=s.left-e.x*c,b=s.top-e.y*c,x=new Set,S=!1;if(t)for(let t of e.parts.values())t.x+=e.x-i,t.y+=e.y-a;let C=t?null:this.compile(e),w=e.marks,T=`${this.moves},${this.looks},${w},${s.left},${s.top},${s.width},${s.height}`,E=C?.at===T&&e.print!==``,D=(e,t)=>{C?.rects.set(e.el,t),e.x=(t.left-y)/c,e.y=(t.top-b)/c,e.w=t.width/c,e.h=t.height/c};for(let[t,n]of C?.found??[]){this.blamed=t;let r=e.parts.get(t);if(!r||r.def!==n){r&&this.disconnect(e,r),r={el:t,def:n,x:0,y:0,w:0,h:0,focused:!1,label:null,mask:null,data:{},springs:Object.fromEntries(Object.entries(n.springs??{}).map(([e,t])=>[e,new Xc({through:e===`press`,contact:e===`press`&&`press`,...t})]))};for(let e of Object.values(r.springs))e.part=r;this.owner.set(r,e),e.parts.set(t,r),S=!0;let i=n.connect?.(r);i&&e.cleanups.set(r,i),n.update?.(r);for(let e of Object.values(r.springs))e.snap(e.target)}else n.update?.(r);D(r,E&&C.rects.get(t)||t.getBoundingClientRect()),x.add(t)}for(let[n,r]of e.parts)t||x.has(n)||(this.disconnect(e,r),e.parts.delete(n),S=!0);if(t||this.remark(this.markup.takeRecords()),E&&e.marks!==w){E=!1;for(let t of x)D(e.parts.get(t),t.getBoundingClientRect())}let O=[g,_,h,e.fine,e.marks,...[e.w,e.h,...[...e.parts.values()].flatMap(e=>[e.x,e.y,e.w,e.h])].map(e=>Math.round(e*64))].join();if(!S&&O===e.print&&this.held(e)&&!e.plate.mask){if(!t)for(let t of e.parts.values())e.moving.ask(t)}else{let t=e=>{let t=e.el.getAttribute(`d-layer`),n=e.el.getAttribute(`back`);return n===null?t===null?typeof e.def.layer==`function`?e.def.layer(e):e.def.layer??0:+t:-Math.max(+n,.001)},n=new Map(e.compiled?.found.map(([e],t)=>[e,t]));e.list=[...e.parts.values()].sort((e,r)=>t(e)-t(r)||n.get(e.el)-n.get(r.el));for(let n of e.list)n.under=t(n)<0;e.movers=e.list.map(e=>({p:e,springs:Object.values(e.springs)})).filter(e=>e.springs.length||e.p.def.tick),C&&!E&&C.labels.clear(),Ls(e,this.maskCanvas,this.maskCtx,y,b,c,e=>this.blamed=e,t=>this.textOf(e,t),C&&e.compiled===C?C.labels:void 0),e.plate.mask=this.maskCanvas,e.materialDirty=e.lightDirty=!0,e.print=O}C&&(C.at=e.compiled===C&&e.marks===w?T:``),e.version=o(),this.blamed=null,e.layoutDirty=e.viewDirty=e.sharpen=!1;let k=!e.placed;e.placed=!0,k&&this.stage&&e.el.closest(`[inert]`)&&this.rest(e),this.stats.layouts++,t||this.stats.measures++,this.stats.layoutMs+=performance.now()-n}compile(e){this.remark(this.markup.takeRecords());let t=o();if(e.compiled?.version===t)return e.compiled;let{el:n}=e,r=[],i=new Set;for(let e of[n,...n.querySelectorAll(p()||`never`)]){let t=c(e);t&&(i.add(e),(e===n||e.closest(`d-device, [data-alone]`)===n)&&r.push([e,t]))}return e.compiled={version:t,found:r,parts:i,texts:new Map,rects:new Map,labels:new Map,at:``}}textOf(e,t){let n=e.compiled;if(!n||!n.parts.has(t.el))return Fs(t);let r=n.texts.get(t.el);return r||n.texts.set(t.el,r=Fs(t,e=>n.parts.has(e))),r}remark(e){if(!e.length)return;let t=new Map,n=new Map,r=a(),i=(e,n)=>t.set(e,Math.max(t.get(e)??0,n));for(let t of e){let e=t.target;if(t.type===`childList`){[...t.addedNodes,...t.removedNodes].every(Iu)||i(e,2);continue}if(t.type===`attributes`&&(Iu(e)||Lu.has(t.attributeName)))continue;let r=n.get(e);r||n.set(e,r=new Map);let a=t.type===`attributes`?t.attributeName:null;r.has(a)||r.set(a,t.oldValue)}for(let[e,t]of n)for(let[n,a]of t){if(n===null){a!==e.data&&i(e,1);continue}let t=e.getAttribute(n);(n===`style`?Ru(a)===Ru(t):a===t)||i(e,!r||r.has(n)||n===`data-alone`?2:0)}for(let[e,n]of t)for(let t=e;t;t=t.parentNode){let e=t.__d;e&&(e.marks++,n===2?e.compiled=null:n===1&&e.compiled?.texts.clear())}}auditDevice(e){getComputedStyle(e.el).position===`static`&&g(`This is position: static, so its canvas lines up with whatever is positioned around it, not with it. ${h(e.el)}`);for(let t of[e.el,...e.el.querySelectorAll(`*`)])f(t)}shows(e){let t=!1;for(let n of this.devices)if(!n.front&&n.visible&&e.contains(n.el)){if(!(n.showing??n).shown)return!1;t=!0}return t}finished(e){let t=o();for(let n of this.devices)if(n.visible&&!n.quiet&&e.contains(n.el)&&!this.asleep(n)&&!this.drawn(n,t))return!1;return!0}veil(e,t){t>=1?this.veils.delete(e):this.veils.set(e,t),e.toggleAttribute(`data-veiled`,t<1),this.staleStage=!0,this.schedule()}veiled(e){if(this.veils.size){for(let[t,n]of this.veils)if(t.contains(e.el))return n}return 1}async still(e){if(!this.shows(e))return null;let t=[],n=()=>[...this.devices].filter(t=>!t.front&&t.visible&&e.contains(t.el)).sort(Wu).map(e=>e.showing??e);for(let e=0;e<_l&&n().some(e=>e.staged&&!e.plate.picture);e++)await new Promise(requestAnimationFrame);let r=n();if(!r.length)return null;let i=this.turners(r[0]).filter(t=>t.contains(e));for(let e of i)e.setAttribute(`data-flat`,``);let a=e.getBoundingClientRect();for(let e of i)e.removeAttribute(`data-flat`);for(let e of r){let n=e.plate.picture;if(e.staged&&n){let r=this.where(e),i=e.w?r.width/e.w:1,[a,o,s,c]=n.box,l=this.renderer.readSoon(e.plate).then(e=>{if(!e)return null;let t=document.createElement(`canvas`);return t.width=e.width,t.height=e.height,t.getContext(`2d`).putImageData(e,0,0),t});t.push({from:l,r:new DOMRect(r.left-a*i,r.top-o*i,s*i,c*i)})}else if(!e.staged&&e.canvas.width){let n=document.createElement(`canvas`);n.width=e.canvas.width,n.height=e.canvas.height,n.getContext(`2d`).drawImage(e.canvas,0,0),t.push({from:Promise.resolve(n),r:this.boxOf(e,1)})}}if(!t.length)return null;let o=await Promise.all(t.map(e=>e.from));if(o.some(e=>!e))return null;let s=Math.min(...t.map(e=>e.r.left)),c=Math.min(...t.map(e=>e.r.top)),l=Math.max(...t.map(e=>e.r.right)),u=Math.max(...t.map(e=>e.r.bottom)),d=devicePixelRatio||1,f=document.createElement(`canvas`);f.width=Math.max(Math.ceil((l-s)*d),1),f.height=Math.max(Math.ceil((u-c)*d),1);let p=f.getContext(`2d`);return t.forEach(({r:e},t)=>p.drawImage(o[t],(e.left-s)*d,(e.top-c)*d,e.width*d,e.height*d)),{image:f,rect:new DOMRect(s,c,l-s,u-c),root:a}}repaintWithin(e){for(let t of this.devices)e.contains(t.el)&&(t.layoutDirty=t.materialDirty=!0,t.print=``);this.schedule()}disconnect(e,t){e.cleanups.get(t)?.(),e.cleanups.delete(t)}weigh(){let e=this.renderer.store,t=innerWidth*innerHeight*(devicePixelRatio||1)**2;for(let t of this.devices){let n=t.visible&&!this.away(t),r=t.movers.some(e=>e.p.def.tick),i=n?0:(this.departures-t.left)/(r?16:1);e.judge(t.plate,n?0:2,i,n)}e.tally(),e.keep=Math.min(this.keep,t*Sl+Cl),e.room()}memory(){let e=0;for(let t of this.devices)t.staged||(e+=t.pw*t.ph*4);let{textures:t,pictures:n,fields:r,room:i,stage:a,live:o}=this.renderer.memory();return{textures:t,pictures:n,canvases:e,fields:r,room:i,stage:a,live:o}}paint(e,t,n=!1){let r=performance.now();this.stir(e),m(e.scheme);let i={};e.wear&&(i.wear=e.wear),e.dents&&(i.dents=e.dents),e.fade&&(i.fade=e.fade);let a=new Oe(e.seed,e.age,i),o=e.el.hasAttribute(`bare`)||e.el.localName!==`d-device`,s=e.facing===`left`||e.facing===`right`,c=e.front??e,{el:l}=s?e:c,u=Ju(c.el),d=Yu(c.el),f=s?c.owns[0]*2||c.w*.25:e.w*.25-2*(+(c.el.getAttribute(`roll`)?.trim().split(/\s+/)[2]??0)||0);e.face=s?f/2:u,e.axis=s?f/2:e.facing===`back`?(u-d)/2:(u+d)/2,e.cast=s?0:parseFloat(c.el.getAttribute(`shadow`)??``)||u;let p=e=>+c.faces.some(t=>t.facing===e),h=+!!c.reverse,_=Math.min(e.w*.25,f)/2;e.owns=e.facing===`right`?[_,1,h]:e.facing===`left`?[_,h,1]:e.facing===`back`?[f/2,p(`right`),p(`left`)]:[f/2,p(`left`),p(`right`)];let v=o?0:!s&&!e.facing?parseFloat(l.getAttribute(`height`)??``)||4:e.face,[y=0,b=0,x=0,S=0,C=v]=l.getAttribute(`roll`)?.trim().split(/\s+/).map(Number)??[],w=Math.max(C,v);if(y||b){let t=e.x+e.w/2,n=e.y+e.h/2,r=(y||b)/.25,i=e.w/2-x/.25,o=e.h/2-S/.25;a.roll(y?{from:[t+i-r,n],to:[t+i,n],mirror:[t,n],past:!0,drop:C}:{from:[t,n+o-r],to:[t,n+o],mirror:[t,n],past:!0,drop:C},C*2>=w?w-C:0)}let E=l.getAttribute(`path`),D=l.getAttribute(`viewbox`)?.trim().split(/[\s,]+/).map(Number),O=e.list.find(e=>e.def.outline),k;O&&a.group(pu(O),()=>k=a.resolve(O.def.outline(O)));let A=E?j(E,e.x,e.y,e.w,e.h,{viewBox:D,spread:12,rule:l.getAttribute(`rule`)===`evenodd`?`evenodd`:void 0}):T(e.x,e.y,e.w,e.h,{radius:e.radius});!k&&e.facing===`back`&&a.group({at:[(e.x+e.w/2)*2,0],mirror:!0},()=>k=a.resolve(A));let M=k??A;e.shell=M;let N=[],P=[],F=[],I=!1,L=!1,R=0,ee=()=>{if(L=!0,o)return;a.part(-1,w),a.surface(M,{material:e.material,over:{wear:e.wear,...we(l.getAttribute(`lay`))},zEdge:-w,bevel:ke(l.getAttribute(`bevel`),0)*4||6*w/4});let t=a.commands[a.commands.length-1];t.body=!0,xe(l,t),e.facing||(t.layer=!0),s&&!E&&(t.section=!0)};for(let n=0;n<e.list.length;n++){let r=e.list[n];if(!L&&!r.under&&ee(),t&&!t.has(r)&&r.commands){for(let e of r.commands)a.commands.push(e);continue}r.focused=!this.byPointer&&(r.el.matches(`:focus-visible`)||!!r.el.querySelector(`:focus-visible`));let i=a.commands.length,s=r.el.closest(`[back]`)?.getAttribute(`back`);s==null?a.part(n,Te(r)+w-4,void 0,void 0,_d(r,e)):a.part(n,w-+s+Te(r)-4,!0,w-+s,_d(r,e)),this.blamed=r.el;try{if(r.w&&r.h||r.def.spreads){let t=()=>r.def.local?a.group(pu(r),()=>r.def.paint(a,r,e)):r.def.paint(a,r,e),n=Ps(e,r);if(n){let{at:e,rotate:r}=n;a.group({at:e,rotate:r},()=>a.group({at:[-e[0],-e[1]]},t))}else t()}}catch(e){if(this.strict)throw e;a.commands.length=i,g(fu(r.el,e),`error`)}if((!e.facing||e.facing===`back`)&&!o&&r.el.parentElement===e.el&&qu(r.el)){let e=a.commands.slice(i).find(e=>e.op===`surface`);e&&(e.body=e.layer=!0)}r.focused&&mu(a,r,e,i);let c=hu(a.commands,i),l=Hu(a.commands,i),u=a.commands.slice(i),d=r.commands;if(t){if(I||=l!==r.glow,d?.length===u.length)u.forEach((e,n)=>{let i=d[n];e.op===`screen`&&Uu(i,e)?t.asked.has(r)||F.push(e):Uu(i,e,fl)?Uu(i,e)||P.push(G(W(i),W(e))):(N.push(G(W(i),W(e))),R=Math.max(R,yt(i),yt(e)))});else{let e=G(r.painted,c);e&&N.push(e);for(let e of[...d??[],...u])R=Math.max(R,yt(e))}}(r.hit!==!1||r.commands?.some(e=>e.op===`glass`&&e.covers))&&!Ku(r.painted,c)&&(e.reachDirty=r.shifted=!0),r.painted=c,r.glow=l,r.commands=u}if(this.blamed=null,L||ee(),e.facing===`back`&&!o){let t=e.front,n=e.x+e.w/2+t.x+t.w/2;t.list.forEach((r,i)=>{let o=r.el.closest(`[back]`)?.getAttribute(`back`);if(o==null||!(r.w&&r.h||r.def.spreads))return;let s=e.face-+o;a.part(e.list.length+i,w-s+Te(r)-4,!0,w-s,_d(r,e)),this.blamed=r.el;let c=a.commands.length;try{a.group({at:[n,e.y-t.y],mirror:!0},()=>r.def.local?a.group(pu(r),()=>r.def.paint(a,r,e)):r.def.paint(a,r,e)),a.commands.slice(c).some(t=>yt(t)>w-e.face/2)||(a.commands.length=c)}catch(e){if(this.strict)throw e;a.commands.length=c,g(fu(r.el,e),`error`)}}),this.blamed=null}if(t&&!N.length&&!P.length&&!F.length)return;if(n)return this.sketchOf(e,a.commands);m(e.scheme)&&(e.themed=!0);let z=this.renderer.paint(e.plate,{commands:a.commands,began:r,stands:w,fixed:e.el.hasAttribute(`fill`),partial:!!t,moved:N,coloured:P,pictures:F,hot:I,stood:R,redrawn:t&&N.length?[...t].flatMap(e=>e.commands??[]):null});z&&(`margin`in z?([e.x,e.y]=z.margin,e.layoutDirty=!0):(e.drawn={commands:a.commands,x:e.x,y:e.y,stands:w,fixed:e.el.hasAttribute(`fill`)},e.materialDirty=!1,z.all?e.lightBox=null:e.lightDirty?e.lightBox&&=G(e.lightBox,z.box):e.lightBox=z.box,e.lightDirty=!0))}sketched=new WeakSet;sketch(e){try{(e.layoutDirty||!e.placed)&&this.layout(e),this.paint(e,void 0,!0)}catch(e){if(this.strict)throw e}finally{this.blamed=null}}sketchOf(e,t){if(!e.cw||!e.ch||!e.w)return;let n=this.where(e).width/e.w;if(Math.max(e.w,e.h)*n<64)return;let r=e.drawing??=document.createElement(`canvas`);r.dataset.sketch=``,r.setAttribute(`aria-hidden`,`true`),ec(r,{commands:t,x:e.x,y:e.y,cw:e.cw,ch:e.ch,dpr:devicePixelRatio||1,zoom:n,scheme:e.scheme}),r.isConnected||(e.canvas.after(r),this.reduced.matches||r.animate([{opacity:0},{opacity:1}],{duration:$l,easing:`ease-out`}))}unsketch(e){let t=e.drawing;t&&(t.style.transition=`opacity ${Ql}ms`,t.style.opacity=`0`,setTimeout(()=>{t.remove(),e.drawing===t&&(e.drawing=null)},Ql))}place(e){if(e.staged)return this.box(e);let t=e.canvas.style,n=[`${-e.x}px`,`${-e.y}px`,`${e.cw}px`,`${e.ch}px`];return(t.left!==n[0]||t.top!==n[1]||t.width!==n[2]||t.height!==n[3])&&Object.assign(t,{left:n[0],top:n[1],width:n[2],height:n[3]}),this.boxOf(e,1,!0)}box(e){if(!e.staged&&e.canvas.style.width===`${e.cw}px`&&e.canvas.style.height===`${e.ch}px`)return this.boxOf(e,1);let t=this.where(e),n=e.w?t.width/e.w:1;return new DOMRect(t.left-e.x*n,t.top-e.y*n,e.cw*n,e.ch*n)}stir(e){let t=e.front??e;e.quiet=t.quiet=!1;for(let e of t.faces)e.quiet=!1}restful(e,t){return this.drawn(e,t)&&!(e.reachDirty&&!this.sleepers.has(e))&&!e.moving.size&&!e.ticked&&!e.movers.some(e=>e.springs.some(e=>e.active))}drawn(e,t){return e.placed&&e.version===t&&this.held(e)&&!e.layoutDirty&&!e.viewDirty&&!e.materialDirty&&!e.lightDirty&&!e.sharpen&&!e.plate.wanted&&!e.plate.stood&&!this.rough(e)&&!this.renderer.edgesStale(e.plate)}where(e){return this.boxOf(e,0)}boxOf(e,t,n=!1){this.sure();let r=e.kept[t];if(!n&&r.at===this.moves&&r.look===this.looks)return r.r;let i=this.camOf(e)&&this.lens(e.cam);if(!n&&i&&r.at===this.moves&&r.local){let[e,t,n,a]=r.local;r.r=new DOMRect(i.left+e*i.s,i.top+t*i.s,n*i.s,a*i.s)}else{let n=r.r=!t&&this.flatOf(e)||(t?e.canvas:e.el).getBoundingClientRect();r.local=i?[(n.left-i.left)/i.s,(n.top-i.top)/i.s,n.width/i.s,n.height/i.s]:null,r.at=this.moves}return r.look=this.looks,r.r}lens(e){this.sure();let t=this.lenses.get(e);if(t?.at===this.moves&&t.look===this.looks)return t.s?t:null;let n=e.getBoundingClientRect(),r=vc(e);return this.lenses.set(e,t={left:n.left,top:n.top,s:r&&r>0?r:0,at:this.moves,look:this.looks}),t.s?t:null}changed(e){if(this.stage)for(let t of e){if(t.attributeName!==`inert`)continue;let e=t.target;e.inert&&this.woken&&e.contains(this.woken.d.el)&&this.unhand(),this.restAll([...this.devices].filter(t=>e.contains(t.el)))}for(let t of e){let e=t.target,n=e.nodeType===1?e:e.parentElement;if(!n||!n.isConnected||n===this.stage?.canvas||t.attributeName===`data-bent`||t.attributeName===`data-flat`)continue;let r=n.closest(`d-device, [data-alone]`);r&&(r!==n||t.attributeName&&ku.has(t.attributeName))||t.attributeName!==`inert`&&(t.attributeName===`style`&&mc(n)||(t.attributeName!==`style`||vc(n)===void 0||this.lensStyle.get(n)!==(this.lensStyle.set(n,Du(n)),Du(n)))&&this.changes.push({el:n,m:t,own:r}))}this.changes.length&&this.judged.size&&this.schedule()}sortChanges(){let e=this.changes;this.changes=[];let t=null;for(let{el:n,m:r,own:i}of e){if(!n.isConnected)continue;if(r.type===`attributes`&&hl(n,!0)===n){this.unsure.set(n,!0),this.judged.size&&this.schedule();continue}let e=hl(r.type===`attributes`?n.parentElement:n);if(e)(t??=new Set).add(e);else if(i||!this.aside(n,r)){if(r.type===`attributes`&&!n.closest(`[data-camera]`)&&(this.wantsSeen=!0,this.seen?.at===this.moves))this.doubt=this.moves,this.judged.size&&this.schedule();else{this.moves++,this.judged.size&&this.schedule();return}}}t&&this.shifted(t)}aside(e,t){if(t.type===`attributes`&&t.attributeName!==`style`||e.querySelector(`d-device, [data-alone]`))return!1;let n=gl.get(e),r=getComputedStyle(e).position===`fixed`;return gl.set(e,r),!!n&&r}stayed(){let e=this.seen,t=e?.at===this.moves?this.lens(e.world):null;if(!e||!t||e.boxes.size!==this.devices.size)return!1;let n=e.world.getBoundingClientRect();if(Math.abs(n.left-t.left)>vl||Math.abs(n.top-t.top)>vl)return!1;for(let[n,{box:r}]of e.boxes){if(!n.el.isConnected)return!1;let e=n.el.getBoundingClientRect();if(Math.abs((e.left-t.left)/t.s-r[0])>vl||Math.abs((e.top-t.top)/t.s-r[1])>vl||Math.abs(e.width/t.s-r[2])>vl||Math.abs(e.height/t.s-r[3])>vl)return!1}for(let[t,{pose:n}]of e.boxes)if(yl(t.el,e.world)!==n)return!1;return!0}see(){if(!this.wantsSeen||this.seen?.at===this.moves)return;this.seen=null;let e=new Map,t=null;for(let e of this.devices)if(t??=this.camOf(e),!e.el.isConnected||!t||this.camOf(e)!==t)return;let n=t&&this.lens(t);if(n){for(let r of this.devices){let i=r.el.getBoundingClientRect();e.set(r,{box:[(i.left-n.left)/n.s,(i.top-n.top)/n.s,i.width/n.s,i.height/n.s],pose:yl(r.el,t)})}this.seen={at:this.moves,world:t,boxes:e}}}sure(){if(this.changes.length&&this.sortChanges(),this.doubt>=0){let e=this.doubt;this.doubt=-1,e===this.moves&&!this.stayed()&&(this.moves++,this.judged.size&&this.schedule())}for(let e of this.arrived){let t=e.isConnected?hl(e,!0):null;t&&!this.holderBox.has(t)&&!this.unsure.has(t)&&this.unsure.set(t,!1)}if(this.arrived.clear(),!this.unsure.size)return;let e=new Set,t=!1;for(let[n,r]of this.unsure){let i=`${n.offsetLeft},${n.offsetTop},${n.offsetWidth},${n.offsetHeight}`,a=this.holderBox.get(n);this.holderBox.set(n,i),r&&((a===void 0||a!==i)&&(t=!0),e.add(n))}this.unsure.clear(),t?(this.moves++,this.judged.size&&this.schedule()):e.size&&this.shifted(e)}shifted(e){for(let t of e)for(let e of t.querySelectorAll(`d-device, [data-alone]`)){let t=e.__d;t&&(t.kept[0].at=t.kept[1].at=-1)}this.shifts++,this.judged.size&&this.schedule()}animating(){for(let e of document.getAnimations()){let t=e.effect?.target;if(!t||e.playState!==`running`)continue;let n=this.carries.get(t);if(n===void 0&&this.carries.set(t,n=t.matches(`d-device, [data-alone]`)||!!t.querySelector(`d-device, [data-alone]`)),n)return!0}return!1}shown(e,t){let n=t===e.el?this.where(e):t?t.getBoundingClientRect():this.box(e);return n.bottom>-40&&n.top<innerHeight+Dl&&n.right>-40&&n.left<innerWidth+Dl}lightPoints(){let e=this.pointer,t=It[this.handheld];if(Do(this.torch&&e.i>0?{kind:`beam`,at:[e.x,e.y],color:t.color.map(n=>n*10*t.core*t.power*e.i*this.torch*(kl/Math.PI))}:null),this.points=null,!this.pointsMoved&&!this.glowMoved.length||this.sizing)return!1;this.pointsAll=this.pointsMoved;let n=this.pointsMoved?[...wo()].map(e=>({at:To(e.at),far:Eo(e,Ol),from:null,flat:null})).concat(this.renderer.emitters.map(Al)):this.glowMoved.map(Al);return this.points=new Il(n.filter(e=>e.far>0)),this.pointsMoved=!1,this.glowMoved=[],!0}glowOut(){if(this.sizing)return!1;let e=Mo();if(!e&&!this.glowStale&&!this.renderer.glowPending)return!1;if(!e&&!this.renderer.glowPending&&performance.now()-this.glowAt<zl)return!0;let t=[],n=0;for(let e of this.devices)e.visible&&!this.asleep(e)&&(n++,e.plate.tex?.G&&t.push(e));if(!t.length||!e&&n<2)return No(null),this.renderer.emitters.length?(this.renderer.emitters=[],this.shift([])):!1;let r=this.renderer.glowing(()=>t.map(e=>{let t=this.box(e);return{d:e,r:t,plate:e.plate,x:t.left/Ll,y:t.top/Ll,w:t.width/Ll,h:t.height/Ll}}),Math.ceil(innerWidth/Ll),Math.ceil(innerHeight/Ll),e||this.glowStale);return this.renderer.glowPending&&(this.glowStale=!1,this.glowAt=performance.now()),r&&(No({...r,cell:Ll,gain:Rl}),this.emit(r))?!0:this.renderer.glowPending||this.glowStale}emit(e){let t=[],n=Ll;for(let{d:r,r:i}of e.shots){let a=r.plate;if(!r.visible||!a.tex?.G||this.asleep(r))continue;let o=Math.max(0,Math.floor(i.left/n)),s=Math.min(e.w,Math.ceil(i.right/n)),c=Math.max(0,Math.floor(i.top/n)),l=Math.min(e.h,Math.ceil(i.bottom/n)),u=[i.left,i.top,i.right,i.bottom,e.w,e.h],d=r.gave;if(d&&d.plate===a&&d.at.every((e,t)=>e===u[t])){let n=!0;for(let t=c,r=0;n&&t<l;t++)for(let i=(t*e.w+o)*4,a=(t*e.w+s)*4;i<a;i++,r++)if(e.data[i]!==d.cells[r]){n=!1;break}if(n){t.push(...d.out);continue}}let f=[],p=new Uint8Array(Math.max(0,s-o)*Math.max(0,l-c)*4);for(let t=c;t<l;t++){p.set(e.data.subarray((t*e.w+o)*4,(t*e.w+s)*4),(t-c)*(s-o)*4);for(let n=o;n<s;n++){let r=(t*e.w+n)*4;e.data[r]+e.data[r+1]+e.data[r+2]>2&&f.push(r)}}let m=[];r.gave={plate:a,at:u,cells:p,out:m};let h=t=>t/4%e.w,g=t=>Math.floor(t/4/e.w),_=(t,r,o,s,c,l)=>{if(!t.length)return;if(l){let e=s-r>=c-o,n=e?(r+s)/2:(o+c)/2,i=e?h:g,a=t.filter(e=>i(e)+.5<n),u=t.filter(e=>i(e)+.5>=n);return e?(_(a,r,o,n,c,l-1),_(u,n,o,s,c,l-1)):(_(a,r,o,s,n,l-1),_(u,r,n,s,c,l-1))}let u=0,d=0,f=0,p=0,v=0,y=0,b=[0,0,0];for(let n of t){let t=(e.data[n]+e.data[n+1]+e.data[n+2])/3,r=h(n)+.5,i=g(n)+.5;for(let t=0;t<3;t++)b[t]+=e.data[n+t];u+=t,d+=t*r,f+=t*i,p+=t*r*r,v+=t*i*i,y+=t*r*i}if(!u)return;let x=d/u,S=f/u,C=p/u-x*x+1/12,w=v/u-S*S+1/12,T=y/u-x*S,E=4*Math.PI*Math.sqrt(Math.max(C*w-T*T,1/144)),D=Rl/255/E;m.push({from:a,at:[x*n,S*n],on:[x*n-i.left,S*n-i.top],half:Math.sqrt(E*256/Math.PI),per:i.width/a.spec.cw||1,color:b.map(e=>e*D)})};_(f,i.left/n,i.top/n,i.right/n,i.bottom/n,2),t.push(...m)}return this.renderer.emitters=t,this.shift(t)}shift(e){let t=Ll,n=new Map,r=[];for(let t of e)n.get(t.from)?.push(t)??n.set(t.from,[t]);for(let e of this.devices){let i=e.plate;if(!e.visible||!i.tex||this.asleep(e))continue;let a=n.get(i)??[],o=e.shone;(a.length||o.length)&&(Nl(Ml(a),Ml(o),Math.min(i.spec.cw,i.spec.ch),a[0]?.per??this.box(e).width/i.spec.cw,t)||(e.shone=a,r.push(...o,...a)))}return r.length?(this.glowMoved.push(...r),!0):!1}pointsOn(e){let t=null;if(this.points.all.length){let n=this.box(e),r=n.width/e.cw||1;this.points.near(n.left,n.top,n.left+e.cw*r,n.top+e.ch*r,({at:[i,a],far:o,from:s,flat:c})=>{if(s===e.plate)return;let l=c?Pl(c,e.plate.peak*4*r):o,u=Math.max((i-l-n.left)/r,0),d=Math.max((a-l-n.top)/r,0),f=Math.min((i+l-n.left)/r,e.cw),p=Math.min((a+l-n.top)/r,e.ch);f>u&&p>d&&(t=G(t,{x:u,y:d,w:f-u,h:p-d}))})}let n=this.pointsAll?G(e.pointBox,t):t;this.pointsAll&&(e.pointBox=t),n&&(e.lightDirty?e.lightBox&&=G(e.lightBox,n):e.lightBox=n,e.lightDirty=!0)}rough(e){return e.plate.rough}touched(e){return e.lightDirty||this.rough(e)&&!this.sweeping&&!this.sizing||this.fullLight||this.lights||this.look||!this.torch||!e.plate.pool?!0:this.renderer.poolMoved(e.plate,this.scene(),this.box(e))}abandon(e,t,n){let r=this.renderer.recover(),i=e.list.find(e=>r&&e.commands?.includes(r))?.el??this.blamed??e.el;return e.failed=n,this.blamed=null,fu(i,t)}under(){let{tx:e,ty:t}=this.pointer,n=null,r=1/0;for(let i of this.devices){if(!i.visible||this.away(i))continue;let a=this.where(i),o=a.width*a.height;o>=r||e<a.left-ll||e>a.right+ll||t<a.top-ll||t>a.bottom+ll||getComputedStyle(i.el).pointerEvents!==`none`&&(n=i,r=o)}return n}follow(e,t,n){let r=this.pointer,i=this.carried?null:this.under(),a=!1,o=!1;for(let s of this.devices){if(!s.visible){s.hand=0;continue}let c=!!this.lampFor&&!!this.lampFor(s.el.getBoundingClientRect(),r.x,r.y),l=(this.carried||s===i||c?r.ti:0)-s.hand;if(l&&(s.hand=Math.abs(l)>.004?s.hand+l*(1-Math.exp(-e*5)):s.hand+l,a=!0),l||s.hand&&t||s.lampOwed){let e=this.lampHzOf?.(s.el)??this.lampHz;e&&n-(s.lampAt??-1/0)<1e3/e-4?s.lampOwed=o=!0:(s.lightDirty=!0,s.lightBox=null,s.lampAt=n,s.lampOwed=!1)}}return this.lampOwed=o,a||o}turned(e){let t=!1;for(let n of this.devices){let r=n.spun-n.spinning;if(n.faces.length&&r){this.reduced.matches||!n.visible||!(n.showing??n).shown||Math.abs(r)<.002?n.spinning=n.spun:(n.spinning+=r*(1-Math.exp(-e*(this.cards?od:11))),t=!0);let i=e=>{let t=Math.atan2(Math.sin(e),Math.cos(e));return Math.abs(t)<1e-6?0:t},a=this.turnable(n),o=e=>Xu[e.facing??`front`];n.showing=a.reduce((e,t)=>Math.abs(i(n.spinning-o(t)))<Math.abs(i(n.spinning-o(e)))?t:e),n.over=n.showing!==n,n.el.toggleAttribute(`data-over`,n.over),n.showing.facing?n.el.setAttribute(`data-up`,n.showing.facing):n.el.removeAttribute(`data-up`),n.turning=n.spinning!==n.spun||i(n.spinning-o(n.showing))!==0,n.el.toggleAttribute(`data-turning`,n.turning);let s=(e,t)=>{let n=i(e),r=Math.PI/2-1e-9;return t?Math.sign(n)*Math.min(Math.abs(n),r):Math.sign(n)*Math.max(Math.abs(n),Math.PI-r)};if(this.cards)this.dealt(n,a);else{let e=Math.cos(n.spinning)>=0,t=Math.cos(n.spinning-Xu.right)>=0;for(let r of a)r.spin=s(n.spinning-o(r),r.facing===`back`?!e:r.facing===`right`?t:r.facing===`left`?!t:e);for(let e of a)e.lightDirty=!0,e.lightBox=null}}let[i,a]=n.aim,o=i-n.turn[0],s=a-n.turn[1];if(!o&&!s)continue;if(!n.visible){n.aim=[0,0],n.turn=[0,0];continue}let c=Math.hypot(o,s)>.002?1-Math.exp(-e*(i||a?18:5)):1;n.turn=[n.turn[0]+o*c,n.turn[1]+s*c],n.lightDirty=!0,n.lightBox=null,t=!0}return t}dealt(e,t){let n=[e,...e.faces];for(let e of n)e.spin&&(e.spin=0,e.lightDirty=!0,e.lightBox=null);let r=e=>Math.atan2(Math.sin(e),Math.cos(e)),i=e=>Xu[e.facing??`front`],a=e.spinning,o=a+r(i(e.showing??e)-a),s=Math.sign(a-o)||1,c=Math.PI*2;for(let e of t)for(let t of[-1,0,1]){let n=(o+r(i(e)-o)+t*Math.PI*2-o)*s;n>.001&&(c=Math.min(c,n))}let l=Math.min(Math.abs(a-o)/(c/2),1),u=e.owns[0]/.25||e.el.offsetWidth/2,d=e.axis*2/.25||e.face/.25,f=Math.max(e.el.offsetWidth,e.el.offsetHeight)*Qu,p=Math.min(l/nd,1),m=Math.max((l-nd)/.64,0),h=rd*Math.atan(u/f),g=m>0?n.reduce((e,t)=>Math.abs(r(a-i(t)))<Math.abs(r(a-i(e)))?t:e):e.showing??e,_=!t.includes(g),v=r(a-i(g)),y=Math.PI/n.length,b=_?a-v+v/y*Math.min($u,y):o+s*(h*p+(Math.min($u,c/2)-h)*m),x=d/2*Math.cos(b)**2+u*Math.sin(b)**2;e.el.style.perspective=`${f}px`;let S=(e,t)=>Math.min(Math.max(((_?1:l)-e)/(t-e),0),1)**2,C=S(.35,1)*e.el.offsetWidth*id,w=1+ad*S(.6,1),T=this.whips.get(e);if(!T&&e.turning){let t=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`),n=document.createElementNS(t.namespaceURI,`filter`),r=document.createElementNS(`http://www.w3.org/2000/svg`,`feGaussianBlur`);n.id=`d-whip-${++this.whipped}`,n.setAttribute(`x`,`-20%`),n.setAttribute(`width`,`140%`),n.append(r),t.append(n),t.setAttribute(`aria-hidden`,`true`),Object.assign(t.style,{position:`absolute`,width:`0`,height:`0`}),document.body.append(t),this.whips.set(e,T=r)}T?.setAttribute(`stdDeviation`,`${C.toFixed(1)} 0`),n.some(e=>e.staged)&&(this.staleStage=!0);for(let t of n){Object.assign(t.el.style,{transformStyle:`preserve-3d`,isolation:`auto`});let n=i(t)-b,r=Math.cos(n),a=t.canvas.style;if(!e.turning){Object.assign(a,{transform:``,filter:``,clipPath:``,opacity:t===e.showing?``:`0`}),t.card=null;continue}let o=t.facing===`left`||t.facing===`right`?u:d/2,s=t.el.offsetWidth,c=t.el.offsetHeight,l=t.x+s/2,f=r-.5*Math.sin(n),p=Math.min(Math.max(.5+.5*f,.45),1.12)*w,h=r>.01&&(t===g||m>0);t.card={gain:p,smear:C>.2?C:0,shows:h},Object.assign(a,{transform:`translateZ(${-x}px) rotateY(${n}rad) translateZ(${o}px)`,transformOrigin:`${l}px ${t.y+c/2}px`,backfaceVisibility:`hidden`,filter:`${C>.2&&T?`url(#${T.parentElement.id}) `:``}brightness(${p.toFixed(3)})`,opacity:h?``:`0`})}}turnable(e){let t=[e,...e.faces],n=e=>e.facing===`left`||e.facing===`right`;return this.cards&&!this.sides&&!n(e.showing??e)?t.filter(e=>!n(e)):t}away(e){let t=e.front??e,n=t.showing??t,r=e=>e.facing===`left`||e.facing===`right`;return!t.turning&&n!==e&&!(r(n)&&!r(e))||this.hidden(e)}hidden(e){return e.hid??=!e.front&&getComputedStyle(e.canvas).visibility!==`visible`&&!e.el.closest(`[data-camera] [data-far]`)}reseen(e){for(let t of[e,...e.querySelectorAll(`d-device`)]){let e=md(t);if(!e||e.hid===null)continue;let n=e.hid;e.hid=null,n&&!this.hidden(e)&&(this.stir(e),this.schedule())}}asleep(e){return this.away(e)&&!(e.front??e).handy}scene(){return{carried:this.carried,all:this.lightDirty,full:this.fullLight,sweeping:this.sweeping,sizing:this.sizing,tilt:this.tilt,look:this.look,lights:this.lights,ambient:this.ambient,torch:this.torch,handheld:this.handheld,lighting:this.lighting,pointer:this.pointer,lampFor:this.lampFor,width:innerWidth,height:innerHeight,ratio:devicePixelRatio}}tick=(e,t=!1)=>{this.raf=0,this.renderer.lost||(!t&&this.renderer.held()?(this.stats.held++,this.renderer.late()&&(this.behind=!0),this.schedule()):(this.renderer.begin(t,e-this.scrollAt>200),this.weigh(),this.frame(e)))};frame(e){let t=Math.max(0,Math.min(this.last?(e-this.last)/1e3:1/60,1/30));this.last=e,this.judge();let n=this.scrolled,r=this.pointer,i=r.tx-r.x,a=r.ty-r.y,s=r.ti-r.i,c=Math.abs(i)+Math.abs(a)>.3||Math.abs(s)>.004;if(c){let e=1-Math.exp(-t*7);r.x+=i*e,r.y+=a*e,r.i+=s*(1-Math.exp(-t*5)),(this.torch||this.look)&&(this.lightDirty=!0),n=this.sweeping=!0}else this.sweeping=this.scrolled;this.lights&&(c||this.lampOwed||this.handsDue||this.handShifted)&&(this.handsDue=this.follow(t,c||this.handShifted,e),this.handShifted=!1,this.handsDue&&(n=!0)),this.turnsDue&&(this.turnsDue=this.turned(t),this.turnsDue&&(n=this.sweeping=!0)),this.scrolled=!1,this.torch&&It[this.handheld].flicker&&!this.reduced.matches&&(e-this.flickered>=dl&&(this.flickered=e,this.lightDirty=!0),n=this.sweeping=!0),this.lightPoints()&&(n=!0,this.pointsAll&&(this.sweeping=!0));let l=this.page?.takeRecords();l?.length&&this.changed(l),(this.animating()||scrollX!==this.scrolledTo[0]||scrollY!==this.scrolledTo[1])&&this.moves++,this.scrolledTo=[scrollX,scrollY];let u=!1,d=null,f=o(),p=performance.now(),m=[],h=!1,_=0,v=!1,y=e-this.beatAt>=tu;this.sweeping&&(this.room=this.behind?Math.max(this.room*.8,ol):Math.min(this.room+.1,sl)),this.behind=!1;let b=this.lightDirty||this.fullLight||f!==this.quietAt||this.points||this.sweeping||this.turnsDue?[...this.devices]:[...this.devices].filter(e=>!e.quiet);this.quietAt=f;let x=new Map;for(let e of b){if(!e.sharpen||!e.visible)continue;let t=this.where(e),n=Math.hypot(t.left+t.width/2-innerWidth/2,t.top+t.height/2-innerHeight/2);x.set(e,n/Math.max(Math.sqrt(t.width*t.height),1))}let S=b.sort((e,t)=>+this.held(e)-this.held(t)||+e.sharpen-t.sharpen||(x.get(e)??0)-(x.get(t)??0)||e.stirred-t.stirred),C=this.sweeping||this.sizing?Yl:Xl;for(let e of S){if(this.held(e))break;if(e.visible&&!e.shown&&!this.sketched.has(e)&&e.failed!==f&&!this.asleep(e)&&this.shown(e,e.el)&&this.veiled(e)){if(performance.now()-p>Zl){n=!0;break}this.sketched.add(e),this.sketch(e)}}for(let r of S){if(this.points&&!r.visible&&(r.pointBox||this.points.all.length)&&this.pointsOn(r),!r.visible||r.failed===f)continue;if(this.asleep(r)){r.quiet=!0;continue}if(this.points&&(r.pointBox||this.points.all.length)&&this.pointsOn(r),!this.held(r)&&r.placed&&this.standing(r,f))continue;let i=!this.held(r)||r.sharpen,a=!this.held(r),o=performance.now(),s=r.cost?r.cost*(r.sharpen?Math.min(Math.max(r.toward,ul),1):1):this.arriving;if(i&&h&&o-p+s>C)n=!0;else{i&&(h=!0);try{if(this.renderer.making(r.plate)){n=!0;continue}r.plate.stood&&(r.materialDirty=!0),r.layoutDirty||!r.placed||r.version!==f?this.layout(r):(r.viewDirty||!this.held(r))&&this.layout(r,!0);let i=!1,a=!1;if(r.movers.some(e=>e.p.def.tick||e.springs.some(e=>e.active))){let n=this.where(r),o=Math.max(n.width,n.height),s=tu*Math.min(Math.ceil(Bl/Math.max(o,1)),nu);if(a=r.small=o<Bl&&!r.used,a&&(!y||e-r.stepped<s-tu/2))v=!0;else{let n=a&&r.stepped?Math.min((e-r.stepped)/1e3,1):t;r.stepped=e,this.ticking=r,this.tickAsked=!1;for(let{p:e,springs:t}of r.movers){for(let a of t)a.active&&(a.step(n,this.reduced.matches)&&(i=!0),r.moving.add(e));this.blamed=e.el,e.def.tick?.(e,n)&&(r.moving.add(e),i=!0)}this.ticking=null,r.ticked=i||this.tickAsked}}if(i&&(n||this.shown(r,r.el))&&(a?v=!0:n=!0),[...r.moving].some(e=>e.def.spreads))for(let e of r.list)r.moving.add(e);if(!r.materialDirty&&this.renderer.edgesStale(r.plate)&&(r.materialDirty=r.plate.reedge=!0),r.materialDirty)this.paint(r),r.moving.clear();else if(r.moving.size&&this.shown(r,r.el)){let e=this.where(r),t=Math.max(e.width,e.height)<Bl;if(t&&_>eu)n=!0;else{let e=performance.now();r.reverse&&[...r.moving].some(e=>e.el.closest(`[back]`))&&(r.reverse.materialDirty=!0),this.paint(r,r.moving),r.moving.clear(),r.stirred=e,t&&(_+=performance.now()-e)}}for(;r.layoutDirty;)this.layout(r),this.paint(r);let o=r.front??r;if(r.body&&[o,...o.faces].some(e=>e!==r&&e.visible&&!this.asleep(e)&&this.renderer.edgesStale(e.plate))&&(n=!0),this.blamed=null,r.plate.wanted&&!r.plate.stood){n=!0;continue}this.away(r)&&!this.cards?(r.lightDirty||r.ctx.clearRect(0,0,r.canvas.width,r.canvas.height),r.lightDirty=!0):(r.lightDirty||this.lightDirty||this.rough(r)&&!this.sweeping&&!this.sizing)&&(this.shown(r,this.sweeping?r.el:void 0)?this.touched(r)&&m.push(r):(r.lightDirty=!0,r.lightBox=null)),r.reachDirty&&!this.sizing&&!this.sleepers.has(r)&&!r.movers.some(e=>e.p.shifted&&e.springs.some(e=>e.active))&&ac(r,this.reachCanvas),this.restful(r,f)&&(r.quiet=!0)}catch(e){this.ticking=null;let t=this.abandon(r,e,f);this.strict?d??=Error(t,{cause:e}):g(t,`error`)}finally{let e=performance.now()-o;i&&e>.5&&(r.cost=e,r.toward=1,a&&(this.arriving+=(e-this.arriving)*.2))}}}let w=this.sweeping?this.room:Math.max(sl,C/this.lightEach);if(m.length>w){let e=e=>{let t=this.where(e);return r.x>=t.left&&r.x<=t.right&&r.y>=t.top&&r.y<=t.bottom?cl:1},t=e=>e.front??e,i=new Map(m.map(n=>[n,Math.sqrt(t(n).pw*t(n).ph)*(t(n).waited+1)*e(t(n))]));m.sort((e,t)=>i.get(t)-i.get(e));let a=new Set,o=m.filter(e=>(a.has(t(e))||a.size<Math.floor(w))&&!!a.add(t(e)));for(let e of m.filter(e=>!o.includes(e)))e.lightDirty=!0,e.lightBox=null,e.waited++,n=!0;m.splice(0,m.length,...o)}for(let e of m)this.renderer.store.use(e.plate);for(let e of m){if(!e.plate.tex?.G)continue;let t=this.box(e),n=`${t.left},${t.top},${t.width},${t.height}`;n!==e.glowedAt&&(this.glowStale=!0,e.glowedAt=n)}if(m.length){let e=performance.now(),t=e=>e.el.getAttribute(`lighting`)??this.lighting;this.renderer.lightAll(m.map(e=>({d:e,plate:e.plate,ctx:e.staged?null:e.ctx,rect:this.place(e),lighting:t(e)})),this.scene(),({d:e})=>{e.lightDirty=!1,e.lightBox=null,e.waited=0,u=!0,e.shown||(e.shown=!0,e.el.dispatchEvent(new Event(`pictured`,{bubbles:!0})),this.unsketch(e)),e.staged&&(this.staleStage=!0,e.canvas.width&&this.vacate(e)),e.el.dispatchEvent(new Event(`lit`))},({d:e},t)=>{let n=this.abandon(e,t,f);this.strict?d??=Error(n,{cause:t}):g(n,`error`)}),this.lightEach+=((performance.now()-e)/m.length-this.lightEach)*.2}if((this.lightDirty||this.fullLight)&&this.lightChanges++,this.lightDirty=this.fullLight=!1,this.renderer.glowDrawn&&(this.glowStale=!0,this.renderer.glowDrawn=!1),this.glowOut()&&(n=!0),y&&(this.beatAt=e),this.stage&&(this.staleStage||m.length&&m.some(e=>!e.staged))&&this.showStage(),u&&this.stats.frames++,this.renderer.end()&&(n=!0),n?this.schedule():(this.last=0,v&&this.onBeat()),d)throw d}},ud=null;function dd(){return ud??=new ld}var fd=/(?:^|;)\s*(transform|translate|rotate|scale|opacity|filter|clip-path|mask[\w-]*|visibility|mix-blend-mode|perspective|overflow[\w-]*)\s*:[^;]*/g,pd=e=>(e?.match(fd)??[]).join(`;`),md=e=>e.closest(`d-device, [data-alone]`)?.__d;function hd(e){return md(e)?.parts.get(e)}function gd(e){let t=getComputedStyle(e.parentElement??e).colorScheme;return t.includes(`dark`)&&(!t.includes(`light`)||matchMedia(`(prefers-color-scheme: dark)`).matches)?`dark`:`light`}function _d(e,t){let n=e.el.closest(`[use]`),r=n&&n!==t.el&&t.el.contains(n)?parseFloat(n.getAttribute(`use`)):1;return Number.isFinite(r)&&r>=0?r:1}function vd(e){let t=md(e);t&&dd().redraw(e,t)}function yd(e){let t=dd();e.tilt!==void 0&&(t.tilt=e.tilt),e.strict!==void 0&&(t.strict=e.strict),e.lights!==void 0&&(t.lights=e.lights),e.look!==void 0&&(t.look=e.look),e.ambient!==void 0&&(t.ambient=e.ambient),e.exposure!==void 0&&(t.exposure=e.exposure),e.torch!==void 0&&(t.torch=e.torch),e.handheld!==void 0&&(t.handheld=e.handheld),e.lighting!==void 0&&(t.lighting=e.lighting),e.relief!==void 0&&(t.relief=e.relief),t.relight()}function bd(e,t){let n=e.closest(`d-device, [data-alone]`),r=new MutationObserver(()=>!n.hasAttribute(`data-far`)&&t());return n&&r.observe(n,{attributes:!0,attributeFilter:[`data-far`]}),{far:()=>!!e.closest(_c),stop:()=>r.disconnect()}}var xd={rolled:`round`,round:`round`,chamfer:`chamfer`,flat:`flat`,dome:`dome`,blend:`blend`},Sd=2.2,Cd=[.35,.09];function wd(t,n,r,i,a,o,s){let{x:c,y:l,w:u,h:d}=n,f=i*4*.6,p=i*Sd*4,m=(u+d)*2,h=e(r).sub,g=[[`top`,T(c-m,l-m,u+m*2,m+p)],[`bottom`,T(c-m,l+d-p,u+m*2,m+p)],[`left`,T(c-m,l-m,m+p,d+m*2)],[`right`,T(c+u-p,l-m,m+p,d+m*2)]],_=[[`top`,T(c,l,u,f)],[`bottom`,T(c,l+d-f,u,f)],[`left`,T(c,l,f,d)],[`right`,T(c+u-f,l,f,d)]];for(let[e,n]of _)a.includes(e)||t.cut(n,{ink:h,feather:s?.3:0,rough:.8});for(let[e,n]of g)a.includes(e)&&t.cut(n,{depth:i*.7,soft:p});for(let e of o)t.cut(T(c,l+(e-Cd[0]/2)*4,u,Cd[0]*4),{depth:Cd[1],soft:Cd[0]*4})}t({selector:`d-surface`,label:!0,paint(t,n,i){let a=e=>n.el.getAttribute(e),o=n.el.parentElement?.closest(`d-surface[material], d-device`),s=a(`material`)??(o?.localName===`d-surface`?o.getAttribute(`material`):i.material),c=ke(a(`height`),1),[l=0,u=l]=(a(`crown`)??`0`).trim().split(/\s+/).map(e=>ke(e,0)),d=[l,u],f=ke(a(`bevel`),.625)*4;ve(n.el,{top:Te(n)+c,crown:d,x:n.x,y:n.y,w:n.w,h:n.h});let p=a(`path`),m=a(`viewbox`)?.trim().split(/[\s,]+/).map(Number),h=(a(`rotate`)??0)*Math.PI/180,g=p?j(p,n.x,n.y,n.w,n.h,{viewBox:m,rotate:h,rule:a(`rule`)===`evenodd`?`evenodd`:void 0,spread:f+8}):null,_=a(`stop`),v=g?_?ue(g,j(_,n.x,n.y,n.w,n.h,{viewBox:m,rotate:h,spread:f+8})):g:a(`shape`)===`circle`?E(n.x+n.w/2,n.y+n.h/2,Math.min(n.w,n.h)/2):T(n.x,n.y,n.w,n.h,{radius:ke(a(`radius`),.75)*4,rotate:h}),y=c<0?Se(n):void 0,b=ke(a(`radius`),.75)*4,x=y&&(n.x<y.x||n.y<y.y||n.x+n.w>y.x+y.w||n.y+n.h>y.y+y.h)?ue(v.type===`field`?v:P(n.x,n.y,n.w,n.h,[b,b,b,b],{rotate:h,spread:f+8}),T(y.x,y.y,y.w,y.h)):v;if(n.el.hasAttribute(`clear`)){let n=+(a(`clear`)||0);n&&t.frost(x,{blur:f/2,tint:e(s).color,opacity:n,zEdge:0,zTop:c,bevel:f}),t.glass(x,{material:s,height:c,bevel:f,rim:f/4,covers:!0,curve:+(a(`curve`)||0)});return}t.surface(x,{material:s,follow:Ce(n),rise:c,bevel:f,profile:xd[a(`edge`)??`rolled`]??`round`,crown:d,radial:n.el.hasAttribute(`radial`),over:{wear:+(a(`wear`)??i.wear),...we(a(`lay`))}}),xe(n.el,t.commands[t.commands.length-1]),a(`sheet`)!==null&&wd(t,n,s,ke(a(`sheet`),.35),(a(`fold`)??``).trim().split(/\s+/),(a(`score`)??``).trim().split(/\s+/).filter(Boolean).map(Number),f);let S=a(`label`)??`engrave`;if(S===`emboss`&&n.label){let{lines:e,font:r,letterSpacing:i,wordSpacing:a}=n.label;for(let o of e)t.surface(M(o.text,o.x,o.y,o.w,o.h,{font:r,letterSpacing:i,wordSpacing:a}),{material:s,follow:Ce(n),rise:.5,bevel:1.2,over:{rough:.3}})}else n.label&&t.cut(A(n.label),{depth:S===`print`?0:.2,ink:r(s),wear:i.wear*.2})}}),t({selector:`d-set`,paint(){}}),l(`
d-device { display: block; position: relative; isolation: isolate; }
/* An app rather than an object: it takes the size of what holds it, and casts nothing outside it. */
d-device[fill] { width: 100%; height: 100%; overflow: clip; }
/* Far out of the window, nothing of it is painted or hit, and it keeps its place. Clipped, not hidden, so the keyboard and a screen reader still reach it. A printed page has no window, so all of it prints.
   Clipped to a sliver of its whole height, too thin to paint: clipped to nothing, an observer judges it by its top edge alone, so one a window or more taller than the window, jumped or scrolled up into, never came near. Its width is still judged by its left edge. A rectangle, as a polygon that keeps the whole box costs about twice the layerizing, and a camera's world has no observers to tell, so it's clipped to nothing there. */
@media screen { [data-far] { clip-path: inset(0 calc(100% - 0.01px) 0 0); } ${_c} { clip-path: inset(50%); } }
/* In a camera's world it's hidden, as the browser still walks what it clips every time anything in the world is painted again: a page
   of 2,000 loading one at a time painted for 16 ms a frame, all of it a window or more away (44 → 15 s to load). There a camera decides
   what's seen, which no key or scroll can bring into view, so the keyboard and a screen reader pass it by until it comes back. */
@media screen { ${_c}, ${_c} * { visibility: hidden !important; } }
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
d-device { background: #ddd; border: 1px solid #777; border-radius: 8px; }
.d-gl d-device { background: none; border: 0; }
.d-gl d-surface { color: transparent; }
@media (forced-colors: active) {
  :is(d-device, [data-alone]) > canvas:is([data-d], [data-sketch]) { display: none; }
}
`);var Td=typeof HTMLElement>`u`?class{}:HTMLElement,Ed=class extends Td{connectedCallback(){Ne(this),dd().add(this)}disconnectedCallback(){dd().remove(this)}};typeof customElements<`u`&&!customElements.get(`d-device`)&&customElements.define(`d-device`,Ed);var Dd=new Set([`input`,`img`,`hr`,`br`,`canvas`,`select`,`textarea`,`meter`,`progress`,`table`,`details`]),Od=`dialog, [popover]`;function kd(e,t=s()){let n=s(),r=[...e instanceof Element&&e.matches(t)?[e]:[],...e.querySelectorAll(t)];for(let e of r)e.hasAttribute(`data-alone`)||e.closest(`d-device`)||Dd.has(e.localName)||(e.parentElement?.closest(`${n}, ${Od}`))?.matches(n)||(e.setAttribute(`data-alone`,``),dd().add(e))}function Ad(e){for(let t of[e,...e.querySelectorAll(`[data-alone]`)])t.hasAttribute(`data-alone`)&&!t.isConnected&&(t.removeAttribute(`data-alone`),dd().remove(t))}var jd=2e3,Md=new Set,Nd=0;function Pd(){Nd=0;for(let e of Md)if(e.isConnected)for(let t of[e,...e.querySelectorAll(`*`)])f(t);Md.clear()}if(typeof MutationObserver<`u`){let e=!1,t=0;i(()=>{e||(e=!0,queueMicrotask(()=>{e=!1;let n=u(),r=n.slice(0,n.length-t);t=n.length,r.length&&kd(document,r.map(e=>e.selector).join(`,`)),Md.add(document.documentElement),clearTimeout(Nd),Nd=window.setTimeout(Pd,jd)}))}),new MutationObserver(e=>{for(let t of e)if(t.type===`attributes`)Pe(t.target);else{for(let e of t.removedNodes)e instanceof Element&&Ad(e);for(let e of t.addedNodes)e instanceof Element&&e.isConnected&&(Ne(e),kd(e),Md.add(e),Nd||=window.setTimeout(Pd,jd))}}).observe(document,{subtree:!0,childList:!0,attributes:!0,attributeFilter:[`place`]}),Ne(document.documentElement)}var Fd=e=>e.el.querySelector(`input`),Id=e=>[e.min===``?0:+e.min,e.max===``?100:+e.max],Q=(e,t,n)=>Math.min(Math.max(e,t),n),Ld=()=>typeof matchMedia<`u`&&matchMedia(`(prefers-reduced-motion: reduce)`).matches,Rd=new Map;function zd(e,t){t.isTrusted?e.setPointerCapture(t.pointerId):Rd.set(t.pointerId,e)}var Bd=e=>Rd.get(e);function Vd(e){let t=Rd.get(e);return Rd.delete(e),t}function Hd(e,t,n){let r=!1;e.el.addEventListener(`pointerdown`,t=>{if(r||t.button||n.accepts?.(t)===!1||e.el.querySelector(`input`)?.disabled)return;t.preventDefault(),e.el.querySelector(`input`)?.focus({preventScroll:!0}),zd(e.el,t),r=!0;let i=t.clientX,a=t.clientY;n.start?.(t);let o=e=>{e.pointerId===t.pointerId&&(n.move(e,e.clientX-i,e.clientY-a),i=e.clientX,a=e.clientY)},s=i=>{i.pointerId===t.pointerId&&(r=!1,e.el.removeEventListener(`pointermove`,o),e.el.removeEventListener(`pointerup`,s),e.el.removeEventListener(`pointercancel`,s),e.el.removeEventListener(`lostpointercapture`,s),n.end?.(i))};e.el.addEventListener(`pointermove`,o),e.el.addEventListener(`pointerup`,s),e.el.addEventListener(`pointercancel`,s),e.el.addEventListener(`lostpointercapture`,s)},{signal:t})}function Ud(e,t,n){let r=new AbortController,{signal:i}=r,a=-1;e.style.pointerEvents=`auto`,e.style.touchAction=`none`,e.style.cursor=`crosshair`;let o=n=>{let r=e.getBoundingClientRect(),i=r.width/(e.offsetWidth||1),a=t(),o=((n.clientX-r.left)/i-a.x)/a.w,s=((n.clientY-r.top)/i-a.y)/a.h;return{x:o*a.cols,y:s*a.rows,inside:o>=0&&o<=1&&s>=0&&s<=1,a}},s=(e,t)=>Q(e,0,t-.001);e.addEventListener(`pointerdown`,t=>{if(t.button||a>=0)return;let{x:r,y:i,inside:s}=o(t);s&&n.down?.(r,i,t)!==!1&&(t.preventDefault(),a=t.pointerId,t.isTrusted&&e.setPointerCapture(t.pointerId))},{signal:i}),e.addEventListener(`pointermove`,e=>{if(e.pointerId===a)for(let t of e.getCoalescedEvents?.()??[e]){let{x:r,y:i,a}=o(t);n.move?.(s(r,a.cols),s(i,a.rows),e)}},{signal:i});let c=e=>{if(e.pointerId!==a)return;a=-1;let{x:t,y:r,a:i}=o(e);n.up?.(s(t,i.cols),s(r,i.rows),e)};return e.addEventListener(`pointerup`,c,{signal:i}),e.addEventListener(`pointercancel`,c,{signal:i}),()=>r.abort()}function Wd(e,t){let n=e.value;Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,`value`).set.call(e,String(t)),e.value!==n&&e.dispatchEvent(new Event(`input`,{bubbles:!0}))}var Gd=e=>Math.atan2(Math.sin(e),Math.cos(e));function Kd(e,t,n,r,i=0){let a=Math.hypot(e,t),o=Math.hypot(n,r);return Math.min(a,o)>=i?Gd(Math.atan2(r,n)-Math.atan2(t,e)):(e*r-t*n)/(Math.max(a,o)*i)}var qd=.12,Jd=class{at=0;seat=0;grab(e){this.at=this.seat=e}by(e,t){let{min:n,max:r,step:i,wrap:a,past:o=0}=t,s=r-n;if(this.at+=e,a&&s){let e=Math.floor((this.at-n)/s)*s;this.at-=e,this.seat-=e}else this.at=Q(this.at,n-o,r+o);let c=a?this.at:Q(this.at,n,r);if(!i)return this.seat=c;let l=Number.isFinite(n)?n:0,u=(this.seat-l)/i,d=(c-l)/i,f=d>u?Math.floor(d+.5-qd):Math.ceil(d-.5+qd);return(f-u)*(d-u)>0&&(this.seat=l+f*i),this.seat}},Yd=e=>e.step===`any`?0:+e.step||1;function Xd(e,t,n=`pull`){e.data[n]!==t&&(e.data[n]=t,e.def.update?.(e))}var Zd=.4,$=(e,t)=>typeof e==`function`?e(t):e,Qd={"ball-bearing":{drag:.06,start:.05},"finger-on-glass":{drag:0,start:0},"steel-on-steel":{drag:.15,start:.3},"brass-on-steel":{drag:.16,start:.35},"plastic-on-plastic":{drag:.2,start:.2},"plastic-on-rubber":{drag:.15,start:.1},"rubber-on-plastic":{drag:.3,start:.3},"metal-on-grease":{drag:.25,start:.15},governor:{drag:.75,start:0}},$d=2e3,ef=.5,tf=226,nf=.12,rf=.8,af=14,of={x:0,y:0,rotate:0,pin:[0,0]},sf=.35;function cf(e,t=`spring`,n={}){let r=e.material??`plastic-on-plastic`,i=e.mass??10,a=typeof e.friction==`number`?{drag:e.friction}:e.friction??{},o=a.drag??Qd[r].drag,s=a.start??Qd[r].start,c=e.detents?e.detents===!0?sf:e.detents.strength??sf:0,l=$d*i**(-1/3)*(1+c)*(e.return?Math.sqrt(e.return/ef):1),u=!e.return&&!c&&o?Math.sqrt(i)/o/tf:0;return{...n,joint:t,sound:e.sound,arrives:!!e.contact,mass:i,material:r,drag:o,start:s,strength:c,returns:!!e.return,coast:u<nf?0:u,landing:e.stops?.landing??`hard`,ratchet:e.ratchet??0,spring:{stiffness:l,damping:2*Math.min(.1+.9*o**.35,1)*Math.sqrt(l)}}}var lf=e=>gf(cf(e),{contact:e.material?`press`:void 0,...e});function uf(e={}){let t=new WeakSet,n=e=>t.has(e)?0:+(e.el.getAttribute(`rpm`)??0);return{springs:{speed:lf(e)},update:e=>e.springs.speed.set(n(e)),hold(e,r){r?(t.add(e),e.springs.speed.snap(0)):t.delete(e),e.springs.speed.set(n(e))},tick(e,t){let n=e.springs.speed.value;return Math.abs(n)<.02||Ld()?!1:(e.data.motor=((e.data.motor??0)+n/60*t*Math.PI*2)%(Math.PI*2),!0)},angle:e=>e.data.motor??0}}var df=3,ff=10,pf=.15,mf=1;function hf(e){let t=cf(e),n=Math.asin(e.drop??.9),r=t=>{let n=t.el.querySelectorAll(`input`);return n[e.input??n.length-1]},i=e=>{let t=e.el.getAttribute(`wound`);return t!==e.data.said&&(e.data.said=t,e.data.left=t===null?1/0:+t),e.data.left},a=e=>r(e).checked&&i(e)>0,{material:o,...s}=e;return{motion:t,springs:{swing:lf(s)},update(e){let t=a(e),n=e.springs.swing;t&&n.value<.02&&(e.data.phase=0),n.set(+!!t)},connect(t){let n=new AbortController,{signal:i}=n,a=0,o=0;return t.el.addEventListener(`pointerdown`,e=>{a=e.clientX,o=e.clientY},{signal:i}),t.el.addEventListener(`click`,n=>{n.target===r(t)||Math.hypot(n.clientX-a,n.clientY-o)>df||e.accepts?.(t,n)===!1||r(t).click()},{signal:i}),()=>n.abort()},tick(r,o){let s=r.springs.swing,c=a(r);if(!c&&s.value<.002)return delete r.data.clock,!1;let l=performance.now(),u=r.data.clock===void 0?o:Math.min(mf,(l-r.data.clock)/1e3);r.data.clock=l;let d=r.data.phase??0,f=d+Math.PI*($(e.beats,r)/60)*u;r.data.phase=f,Math.floor((f-n)/Math.PI)!==Math.floor((d-n)/Math.PI)&&s.value>pf&&Be(r,`detent`,ff*s.value,{motion:t,heard:`device`});let p=i(r);if(c&&p!==1/0){let e=Math.max(0,p-u);r.data.left=e,Math.ceil(e)!==Math.ceil(p)&&(r.data.said=String(Math.ceil(e)),r.el.setAttribute(`wound`,r.data.said),e||s.set(0))}return!0},angle:e=>Ld()?0:e.springs.swing.value*Math.sin(e.data.phase??0)}}var gf=(e,t)=>({...e.spring,motion:e,...t.contact!==void 0&&{contact:t.contact}}),_f=`[data-carries]`,vf=!1,yf=e=>!vf&&!!e.el.closest(_f),bf=e=>{e.el.toggleAttribute(`data-carries`,!0)};function xf(e,t,n){vf=!0;try{t.el.querySelectorAll(`[d-mark]`).forEach(t=>{let r=hd(t);r&&r.w&&r.h&&r.def.paint(e,r,n)})}finally{vf=!1}}function Sf(e={}){let t=e.name??`follow`,n=n=>{let r=n.el.getAttribute(e.attr??`of`),i=r?n.el.closest(`d-device`)?.querySelector(r):null,a=i?hd(i):null,o=a?.def?.value;a&&o&&n.springs[t].set(o(a))};return{springs:{[t]:lf(e)},update:n,tick(e){return n(e),!1},value:e=>Q(e.springs[t].value,0,1)}}function Cf(){let e=e=>{let t=e.el.getAttribute(`of`),n=t?e.el.closest(`d-device`)?.querySelector(t):null,r=n?hd(n):null,i=r?.def?.angle;return r&&i?i(r):0};return{tick(t){let n=e(t);return n!==t.data.driven&&(t.data.driven=n,!0)},angle:e}}var wf={hard:.004,soft:.02},Tf={hard:1,soft:.3},Ef=.25,Df=24,Of=.05,kf=60,Af=.25,jf=60,Mf=(e,t)=>t===`touch`?.01:Math.min(.014+e*8e-4,.03),Nf=e=>`grip:${e}`;function Pf(e,t,n){let{motion:r,track:i}=n,a=new Jd,o=0,s=0,c=0,l=0,u=0,d=!1,f=r.material===`finger-on-glass`,p={moved:0},m=(t,o=0)=>{if(t*r.ratchet<0)return;let c={...i.reach(e),past:o},l=c.max-c.min,u=Number.isFinite(l),p=a.by(t,c),m=i.read(e);i.write(e,p);let h=c.wrap?a.at:Q(a.at,c.min,c.max),g=a.at-h,_=u&&!f?wf[r.landing]*l:0,v=_&&g?Math.sign(g)*_*(1-Math.exp(-Math.abs(g)/(_*4))):0;Xd(e,((c.step?Zd*Math.min(1,(1-r.strength)/.65):1)*(h-i.read(e))+v)/i.scale(e),n.pull);let y=!c.wrap&&u&&(p===c.min||p===c.max),b=u?Math.abs(s)/l:0;y&&!d&&b>Ef&&!f&&!r.arrives&&Be(e,`stop`,Math.min(b*2,10)*Tf[r.landing],{motion:r}),d=y,i.read(e)!==m&&!c.step&&!f&&Be(e,`rub`,b,{motion:r})},h=()=>{l&&(cancelAnimationFrame(l),l=0,Xd(e,0,n.pull))};t.addEventListener(`abort`,()=>cancelAnimationFrame(l));let g=t=>{let i=n.radians?.(e)??1,a=rf/i,o=af/i,c=Q(t,-o,o),u=performance.now();if(Math.abs(c)<a)return;let f=t=>{let i=Math.max(0,Math.min(.05,(t-u)/1e3));u=t,c*=Math.exp(-i/r.coast),s=c,m(c*i),l=Math.abs(c)<a||d?0:requestAnimationFrame(f),l||Xd(e,0,n.pull)};l=requestAnimationFrame(f)};return Hd(e,t,{accepts:n.accepts&&(t=>n.accepts(e,t)),start(t){h(),a.grab(i.read(e)),!r.strength&&!i.reach(e).step&&e.springs[n.spring].grip(Mf(r.mass,t.pointerType)),n.grab(e,t),e.el.querySelector(`input`)||(n.focus?.(e)??e.el).focus({preventScroll:!0}),o=r.start*2*r.mass**.25,s=0,c=t.timeStamp,p.moved=0;let l=n.seat?.(e,t);l!==void 0&&(a.grab(l),i.write(e,l),o=0)},move(t,r,l){let u=n.by(e,t,r,l);if(p.moved+=Math.hypot(r,l),o>0&&(o-=Math.hypot(r,l))>0||n.hold?.(e,u))return;let d=(t.timeStamp-c)/1e3;d>0&&(s+=(u/d-s)*(1-Math.exp(-d/Of))),c=t.timeStamp,m(u,n.past(e));let f=i.reach(e);e.data[Nf(n.spring)]=f.wrap?a.at:Q(a.at,f.min,f.max)},end(t){delete e.data[Nf(n.spring)],e.springs[n.spring].grip(0),n.letGo?.(e);let o=n.rest?.(e);o!==void 0&&i.write(e,o),Xd(e,0,n.pull),a.grab(i.read(e)),r.coast&&t.type===`pointerup`&&t.timeStamp-c<kf&&!Ld()&&g(s)}}),e.el.addEventListener(`keydown`,()=>{h(),p.moved=0},{signal:t}),n.scroll&&e.el.addEventListener(`wheel`,t=>{let r=e.el.querySelector(`input`);if(!e.el.contains(document.activeElement)||r?.disabled)return;t.preventDefault(),h();let o=i.read(e),{step:s}=i.reach(e),c=-t.deltaY*(t.deltaMode?16:1);if(a.grab(o),s){u+=c/jf*s;let e=Math.trunc(u/s);e&&(u-=e*s,m(e*s))}else u+=c*Af*n.scroll(e),m(u),i.read(e)!==o&&(u=0);Xd(e,0,n.pull)},{signal:t,passive:!1}),p}var Ff=e=>typeof e.detents==`object`?e.detents:{},If=e=>e.type===`checkbox`||e.type===`radio`,Lf=e=>If(e)?[0,1]:Id(e),Rf=e=>If(e)?+e.checked:+e.value,zf=!1,Bf=(e,t)=>{if(!If(e))return Wd(e,t);e.checked!==t>=.5&&(zf=!0,e.click(),zf=!1)},Vf=(e,t)=>{let[n,r]=Lf(t);return(r>n?Q((Rf(t)-n)/(r-n),0,1):0)+(e.data.pull??0)},Hf=3;function Uf(e,t,n,r,i,a=!1){e.el.addEventListener(`click`,t=>{if(zf||i?.(e,t)===!1)return;let o=n.moved>Hf;n.moved=0,o?t.preventDefault():(a||!(t.target instanceof HTMLInputElement)||t.target.type===`range`)&&r(t)},{signal:t})}var Wf=(e,t,n)=>({read:e=>Rf(t(e)),write(e,n){t(e).disabled||Bf(t(e),n)},reach(r){let i=t(r),[a,o]=Lf(i),s=n?$(n,r):!1;return{min:a,max:o,step:e.detents?If(i)?1:Yd(i):0,wrap:s}},scale(e){let[n,r]=Lf(t(e));return r-n}}),Gf=(e,t,n)=>{let r=$(Ff(t).count??0,e);if(!r||If(n))return;let[i,a]=Id(n);n.step=String((a-i)/Math.max(r-1,1))},Kf=Math.PI/180,qf=.45,Jf=18,Yf=36;function Xf(e={}){let t=e.name??`turn`,n=e.keys??{ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1},r=cf(e,`turn`,{rolled:!!e.rolled}),i=t=>e.stops?.at?$(e.stops.at,t):null,a=e=>{let t=i(e);return[t[0]*Kf,t[1]*Kf]},o=e=>{let[t,n]=a(e);return n-t},s=t=>e.at?$(e.at,t):[t.w/2,t.h/2],c=t=>{if(e.ticks)return $(e.ticks,t)*Kf;if(!e.detents)return 0;if(!e.input)return $(Ff(e).every??0,t)*Kf;let n=Fd(t),[r,i]=Lf(n);return(If(n)?1:Yd(n))/(i-r)*o(t)},l=e=>+(e.el.getAttribute(t)??0),u={read:l,write(n,r){let i=l(n),a=c(n);r!==i&&(n.el.setAttribute(t,String(r)),a&&n.el.dispatchEvent(new CustomEvent(e.event??`detent`,{bubbles:!0,detail:Math.round((r-i)/a)})))},reach(e){let t=i(e);return{min:t?t[0]*Kf:-1/0,max:t?t[1]*Kf:1/0,step:c(e)}},scale:()=>1},d=e.track??(e.input?Wf(e,Fd,e.wrap):u),f=e=>Math.min(e.w,e.h)/2,p=t=>e.travel?$(e.travel,t):e.input?o(t)*Yf:0,m=t=>e.track?.radians(t)??(e.input?d.scale(t)/o(t):1),h=t=>e.input?d.scale(t)/p(t):1/Math.max(f(t),Yf),g=new WeakMap;return{motion:r,springs:{[t]:gf(r,e)},live:[t,`style`],update(n){let r=n.springs[t];if(r.notches(c(n)),e.track)return;if(!e.input)return r.set(l(n)+(n.data.pull??0));let[i]=a(n),s=o(n),u=i+s*Vf(n,Fd(n));r.set(e.wrap&&$(e.wrap,n)?u+Math.round((r.target-u)/s)*s:u)},connect(i){let a=new AbortController,{signal:o}=a;e.input&&Gf(i,e,Fd(i)),!e.input&&!e.track&&(i.el.style.cursor=`grab`);let c=Pf(i,o,{motion:r,track:d,spring:t,accepts:e.accepts,hold:e.hold&&((t,n)=>e.hold(t,n/m(t))),letGo:e.letGo,grab(t,n){let[r,i]=Le(t.el),a=t.el.getBoundingClientRect(),o=a.width/r/t.w||1,[c,l]=s(t),u=a.left+c*o*r,d=a.top+l*o*i,f=Math.max(qf*Math.min(a.width,a.height)/2,Jf),p=!!e.rolled||!e.hubless&&Math.hypot(n.clientX-u,n.clientY-d)<f;g.set(t,{k:o,x:u,y:d,arm:Math.max(f,Yf),straight:p,last:[n.clientX,n.clientY],tall:i}),!e.input&&!e.track&&(t.el.style.cursor=`grabbing`)},by(t,n,r,i){let a=g.get(t),[o,s]=a.last;return a.last=[n.clientX,n.clientY],a.straight?(e.rolled===`x`?r:(e.rolled?0:r)-i)/a.k*h(t):Kd(o-a.x,(s-a.y)/a.tall,n.clientX-a.x,(n.clientY-a.y)/a.tall,a.arm)*m(t)},past(t){let n=g.get(t);return e.past===void 0?n?.straight?Df*h(t):Math.PI*m(t):$(e.past,t)},radians:e=>1/m(e),scroll:e.track&&!e.input?void 0:h});if(!e.input&&!e.track){let e=()=>i.el.style.cursor=`grab`;for(let t of[`pointerup`,`pointercancel`])i.el.addEventListener(t,e,{signal:o})}let l=t=>{let n=d.reach(i),r=d.read(i)+t*(n.step||.1),a=n.wrap?r:Q(r,n.min,n.max);d.write(i,e.input&&If(Fd(i))?1-d.read(i):a)};return e.input&&e.wrap&&i.el.addEventListener(`keydown`,t=>{let r=n[t.key],a=d.reach(i),o=d.read(i);!r||!$(e.wrap,i)||!a.step||(r>0?o<a.max:o>a.min)||(t.preventDefault(),d.write(i,(r>0?a.min:a.max)+r*a.step))},{signal:o,capture:!0}),r.ratchet&&i.el.addEventListener(`keydown`,e=>{let t=n[e.key];t&&t*r.ratchet<0&&(e.preventDefault(),e.stopImmediatePropagation())},{signal:o,capture:!0}),!e.input&&!e.track&&i.el.addEventListener(`keydown`,e=>{let t=n[e.key];t&&(e.preventDefault(),l(t))},{signal:o}),e.click&&Uf(i,o,c,()=>l(1),e.accepts),e.tap&&Uf(i,o,c,t=>e.tap(i,t),e.accepts),()=>a.abort()},angle(n){let a=n.springs[t].value,o=i(n);if(!o)return a;let s=o[0]*Kf,c=o[1]*Kf,l=wf[r.landing]*(c-s);return e.input?a:Q(a,s-l,c+l)},carried(n){if(e.rolled)return of;let r=n.data[Nf(t)],[i,c]=e.input?Lf(Fd(n)):[0,1],l=e.track?(r??e.track.read(n))/e.track.radians(n):r===void 0?this.angle(n):e.input?a(n)[0]+o(n)*(r-i)/(c-i):r;return{...of,rotate:l,pin:s(n)}},pin:s,place(e){let[t,n]=s(e);return{at:[e.x+t,e.y+n],rotate:this.angle(e)}}}}var Zf=120,Qf=480,$f=.6,ep=new WeakMap,tp=`d-held`;function np(e,t){e.dispatchEvent(new CustomEvent(tp,{detail:t}))}var rp=(e,t,n)=>e.addEventListener(tp,e=>t(e.detail),{signal:n});function ip(e={}){let{name:t=`press`}=e,n=cf({return:ef,...e},`press`,{latch:e.latch}),r=gf(n,e),i=e.held??(e=>Fd(e).checked),a=new WeakSet,o=new WeakSet,s=t=>!!e.catches&&(e.of?t.el.querySelector(e.of):t.el)?.getAttribute(`aria-pressed`)===`true`,c=new WeakSet,l=t=>s(t)?e.catches:e.rests&&o.has(t)?e.rests:0,u=(n,r,i)=>{if(e.rocks){let[t,a,o=0]=e.rocks[i]??[0,0];n.springs.x.set(r?t:0),n.springs.y.set(r?a:0),n.springs.z?.set(r?o:0)}else n.springs[t].set(r?1:l(n));(r?e.down:e.up)?.(n)},d=(n,r,i)=>{let a=n.el,o=0,s=0,c=i=>{if(clearTimeout(s),i===o)return;let c=o;o=i,n.springs[t].set(i===2?1:i===1?r:l(n)),i&&!c&&e.down?.(n),i||e.up?.(n),a.dispatchEvent(new CustomEvent(`stage`,{bubbles:!0,detail:{stage:i}}))},u=()=>{c(2),s=window.setTimeout(()=>c(0),Zf)},d=()=>!a.disabled&&!a.querySelector(`input`)?.disabled;a.addEventListener(`pointerdown`,e=>{!e.button&&d()&&c(1)},{signal:i}),a.addEventListener(`pointermove`,e=>{o===1&&e.pointerType===`pen`&&e.pressure>$f&&c(2)},{signal:i}),a.addEventListener(`pointerup`,()=>o===1?u():c(0),{signal:i});for(let e of[`pointercancel`,`pointerleave`,`blur`])a.addEventListener(e,()=>o===1&&c(0),{signal:i});a.addEventListener(`keydown`,e=>{(e.key===` `||e.key===`Enter`)&&!e.repeat&&d()&&c(1)},{signal:i}),a.addEventListener(`keyup`,e=>{(e.key===` `||e.key===`Enter`)&&o===1&&u()},{signal:i}),rp(a,e=>e?d()&&c(1):o===1?u():c(0),i),a.addEventListener(`click`,e=>{e.detail||o||!d()||(c(1),s=window.setTimeout(u,Qf))},{signal:i})};return{motion:n,springs:e.rocks?{x:{...r,through:!0,contact:`press`},y:{...r,through:!0,contact:`press`},...e.rocks.some(e=>e.length>2)&&{z:{...r,contact:`press`}}}:{[t]:r},update(n){if(e.latch)n.springs[t].set(i(n)?1:l(n));else if(e.held){let r=e.held(n);if(r===a.has(n))return;r?a.add(n):a.delete(n),n.springs[t].set(r?1:l(n))}else e.catches&&!c.has(n)&&n.springs[t].set(l(n))},connect(n){let r=new AbortController,{signal:a}=r;if(e.rests){let e=(e,r)=>{e.pointerType!==`mouse`||n.el.disabled||n.el.querySelector(`input`)?.disabled||(r?o.add(n):o.delete(n),n.springs[t].target<1&&n.springs[t].set(l(n)))};n.el.addEventListener(`pointerenter`,t=>e(t,!0),{signal:a}),n.el.addEventListener(`pointerleave`,t=>e(t,!1),{signal:a})}let f=n.el.getAttribute(`bank`);if(f){let t=()=>[...(n.el.closest(`d-device`)??document).querySelectorAll(`[bank="${CSS.escape(f)}"]`)].filter(e=>e!==n.el),r=()=>{for(let e of t()){let t=e.querySelector(`input`);t?.checked&&(t.checked=!1,t.dispatchEvent(new Event(`change`,{bubbles:!0})))}},i=e.latch?Fd(n):null;i?i.addEventListener(`change`,()=>i.checked&&r(),{signal:a}):n.el.addEventListener(`pointerdown`,e=>!e.button&&r(),{signal:a}),i||n.el.addEventListener(`keydown`,e=>(e.key===` `||e.key===`Enter`)&&r(),{signal:a}),i||rp(n.el,e=>e&&r(),a)}if(e.latch&&Fd(n))return rp(n.el,e=>e&&!Fd(n).disabled&&Fd(n).click(),a),()=>r.abort();let p=parseFloat(n.el.getAttribute(`stage`)??``);if(!e.rocks&&!e.of&&p>0&&p<1)return d(n,p,a),()=>r.abort();let m=!e.rocks&&!e.of?n.el.getAttribute(`run`):null;return(e.of?[...n.el.querySelectorAll(e.of)]:[n.el]).forEach((t,r)=>{let o=parseFloat(t.getAttribute(`long`)??``),[l=NaN,d=l]=(t.getAttribute(`repeat`)??``).trim().split(/\s+/).map(Number),f=[],p=!1,h=e=>t.dispatchEvent(new CustomEvent(e,{bubbles:!0})),g=e=>{if(e!==f.length>0&&(f.forEach(clearTimeout),f=[],e)){if(p=!1,o>0&&f.push(window.setTimeout(()=>{p=!0,h(`long`)},o)),l>0){let e=()=>{h(`repeat`),f.push(window.setTimeout(e,Math.max(d,16)))};f.push(window.setTimeout(e,l))}f.length||f.push(0)}};a.addEventListener(`abort`,()=>g(!1)),o>0&&t.addEventListener(`click`,e=>{p&&(p=!1,e.preventDefault(),e.stopImmediatePropagation())},{signal:a,capture:!0});let _=()=>{t.disabled||t.querySelector(`input`)?.disabled||(c.add(n),u(n,!0,r),g(!0))},v=()=>{g(!1),e.catches&&c.delete(n)&&t.setAttribute(`aria-pressed`,String(!s(n))),u(n,(!!e.latch||!!e.held)&&i(n),r)};t.addEventListener(`pointerdown`,e=>{e.button||_()},{signal:a});for(let e of[`pointerup`,`pointercancel`,`blur`])t.addEventListener(e,v,{signal:a});if(t.addEventListener(`pointerleave`,e=>{e.buttons&&v()},{signal:a}),t.addEventListener(`keyup`,e=>{(e.key===` `||e.key===`Enter`)&&v()},{signal:a}),t.addEventListener(`keydown`,e=>{(e.key===` `||e.key===`Enter`)&&_()},{signal:a}),rp(t,e=>e?_():v(),a),m===null){t.addEventListener(`pointerleave`,v,{signal:a});return}let y=new Set;ep.set(t,e=>{t.disabled||(y.add(e),_())}),t.addEventListener(`pointerdown`,e=>{e.button||(y.add(e.pointerId),t.hasPointerCapture(e.pointerId)&&t.releasePointerCapture(e.pointerId))},{signal:a});for(let e of[`pointerup`,`pointercancel`])t.addEventListener(e,e=>y.delete(e.pointerId),{signal:a});t.addEventListener(`pointerleave`,e=>{if(!y.delete(e.pointerId))return v();let n=(e.relatedTarget??document.elementFromPoint(e.clientX,e.clientY))?.closest(`[run="${CSS.escape(m)}"]`),r=n&&n!==t&&n.closest(`d-device`)===t.closest(`d-device`)&&e.buttons?n:null;r&&ep.get(r)?.(e.pointerId),v(),t.dispatchEvent(new CustomEvent(`run`,{bubbles:!0,detail:{to:r}}))},{signal:a})}),()=>r.abort()},value:e=>Q(e.springs[t].value,0,1)}}function ap(...e){let t=e.filter(e=>e.tick);return{...t.length&&{tick:(e,n)=>t.reduce((t,r)=>r.tick(e,n)||t,!1)},motion:e.find(e=>e.motion)?.motion,springs:Object.assign({},...e.map(e=>e.springs)),update(t){for(let n of e)n.update?.(t)},connect(t){let n=e.map(e=>e.connect?.(t));return()=>n.forEach(e=>e?.())},carried:t=>e.reduce((e,n)=>{let r=n.carried?.(t)??of;return{x:e.x+r.x,y:e.y+r.y,rotate:e.rotate+r.rotate,pin:r.pin[0]||r.pin[1]?r.pin:e.pin}},of)}}function op(e){let t=e.name??`thread`,n=e.on??1,r=cf({material:`steel-on-steel`,...e}),i=t=>t.el.querySelectorAll(`input`)[$(e.input,t)],a=t=>$(e.turns,t),o=e=>e.data[t]??(i(e).checked?a(e):0),s=t=>{let n=t.el.querySelectorAll(`input`),r=i(t).checked;for(let i of e.locks?$(e.locks,t):[])n[i]&&(n[i].disabled=r)},c=!1,l=(e,t)=>{let n=i(e);n.checked!==t&&(n.checked=t,c=!0,n.dispatchEvent(new Event(`input`,{bubbles:!0})),n.dispatchEvent(new Event(`change`,{bubbles:!0})),c=!1)};return{motion:r,springs:{[t]:gf(r,e)},update(e){e.springs[t].set(o(e)),s(e)},connect(e){let n=new AbortController;return i(e).addEventListener(`click`,e=>{e.detail&&e.preventDefault()},{signal:n.signal}),i(e).addEventListener(`change`,()=>{c||(e.data[t]=i(e).checked?a(e):0,e.def.update?.(e))},{signal:n.signal}),s(e),()=>n.abort()},hold(s,c){let u=c*n/(2*Math.PI),d=o(s),f=a(s);if(!i(s).checked&&(u<=0||!(e.catches?.(s)??!0)))return!1;let p=Q(d+u,0,f);return p===d||(s.data[t]=p,p===f&&u>0&&Be(s,`stop`,Math.min(Math.abs(u)*20,10)*Tf[r.landing],{motion:r}),l(s,p>0),s.def.update?.(s)),!0},value:e=>Q(e.springs[t].value/(a(e)||1),0,1),depth:n=>Math.max(n.springs[t].value,0)*$(e.pitch,n),angle:e=>e.springs[t].value*2*Math.PI*n}}function sp(e){let t=cf(e,e.joint,{seats:!!e.touch||e.seat!==void 0}),{name:n}=e,[r,i]=e.range,a=`pull:${n}`,o=t=>t.el.querySelectorAll(`input`)[e.input??0],s=e.track??Wf(e,o),c=t=>(e.axis?$(e.axis,t):`x`)===`x`,l=t=>s.scale(t)/($(e.travel,t)*4),u=e=>{let{min:t,max:n}=s.reach(e);return[t,n-t]},d=new WeakMap;return{motion:t,springs:{[n]:gf(t,e)},update(e){let t=e.springs[n],[o,c]=u(e),{step:l}=s.reach(e);t.notches(l&&c/l>1.5?l/c*(i-r):0),t.set(r+(i-r)*((s.read(e)-o)/c+(e.data[a]??0)))},carried(t){let a=t.data[Nf(n)],[o,s]=u(t),l=a===void 0?Q((t.springs[n].value-r)/(i-r),0,1):(a-o)/s;if(e.pin)return{...of,rotate:l*$(e.pin.sweep,t),pin:$(e.pin.at,t)};if(e.joint===`hinge`)return of;let d=$(e.travel,t)*4*l;return{...of,x:c(t)?d:0,y:c(t)?0:d}},connect(r){let i=new AbortController,{signal:f}=i;e.input!==void 0&&Gf(r,e,o(r)),e.dress?.(r,f);let p=t=>{let n=r.el.getBoundingClientRect(),[i,a]=u(r),o=Q(c(r)?(t.clientX-n.left)/n.width:(t.clientY-n.top)/n.height,0,1);return i+($(e.travel,r)<0?1-o:o)*a},m=()=>{let[t,n]=u(r);return e.catches!==void 0&&(s.read(r)-t)/n>=e.catches},h=()=>{let[t,n]=u(r);return m()?t+n:t+(e.home??0)*n},g=Pf(r,f,{motion:t,track:s,spring:n,pull:a,accepts:e.accepts,focus:e=>e.el.querySelector(`button`)??e.el,grab(t,n){let[r,i]=Le(t.el),a=t.el.getBoundingClientRect(),o=a.width/r/t.w||1,[s,l]=e.pin?$(e.pin.at,t):[0,0];d.set(t,{k:o*(c(t)?r:i),x:a.left+s*o,y:a.top+l*o,last:[n.clientX,n.clientY]})},by(t,n,r,i){let a=d.get(t),[o,u]=a.last;return a.last=[n.clientX,n.clientY],e.pin?Kd(o-a.x,u-a.y,n.clientX-a.x,n.clientY-a.y,Yf)/$(e.pin.sweep,t)*s.scale(t):(c(t)?r:i)/a.k*l(t)},seat:e.touch?(e,t)=>p(t):e.seat===void 0?void 0:t=>{let[n,r]=u(t);return n+e.seat*r},past:t=>e.touch?1/0:Df*Math.abs(l(t)),hold:e.catches===void 0?void 0:(e,t)=>t<0&&m(),radians:e=>1/(Math.abs(l(e))*Yf),scroll:e.return||e.touch||e.noWheel?void 0:e=>Math.abs(l(e)),rest:e.return?h:void 0});return e.return&&e.input!==void 0&&o(r).addEventListener(`keyup`,()=>s.write(r,h()),{signal:f}),e.catches!==void 0&&e.input!==void 0&&o(r).addEventListener(`keydown`,e=>{m()&&e.key!==`Tab`&&e.preventDefault()},{signal:f}),e.click&&Uf(r,f,g,t=>{let[n,i]=u(r);e.input===void 0||If(o(r))?s.write(r,s.read(r)<n+i/2?n+i:n):s.write(r,p(t))},e.accepts),e.jump&&$(e.jump,r)&&Uf(r,f,g,e=>s.write(r,p(e)),e.accepts,!0),()=>i.abort()}}}var cp=e=>e.el.querySelector(`button`),lp=(e,t)=>{let n=cp(e);n&&(e.el.style.pointerEvents=`none`,n.style.cssText=`position:absolute;inset:0;appearance:none;background:none;border:0;padding:0;outline:none;pointer-events:auto;${t}`)},up=15;function dp(e){let{axis:t=`x`,name:n=`slide`}=e,r=e.input!==void 0,i=new WeakMap,a=e=>+(e.el.getAttribute(`slide`)??0),o={read:a,write(e,t){e.el.setAttribute(`slide`,String(t)),cp(e)?.setAttribute(`aria-valuenow`,String(t))},reach(t){let n=$(Ff(e).count??0,t),r=$(Ff(e).every??0,t);return{min:0,max:1,step:e.detents?n>1?1/(n-1):r/Math.abs($(e.travel,t)):0}},scale:()=>1},s=t=>t.el.querySelectorAll(`input`)[e.input??0],c=e.marks&&{read:t=>$(e.marks,t)[s(t).valueAsNumber-Id(s(t))[0]]??0,write(t,n){let r=$(e.marks,t),i=r.reduce((e,t,i)=>Math.abs(t-n)<Math.abs(r[e]-n)?i:e,0)+Id(s(t))[0];i!==s(t).valueAsNumber&&(Wd(s(t),i),Be(t,`detent`,up))},reach:()=>({min:0,max:1,step:0}),scale:()=>1},l=sp({...e,joint:`slide`,name:n,axis:t,range:[0,1],click:e.click??!r,...c&&{track:c},...!r&&{track:o,dress(e,t){let n=cp(e);n&&(lp(e,`cursor:grab`),n.setAttribute(`role`,`slider`),n.setAttribute(`aria-valuemin`,`0`),n.setAttribute(`aria-valuemax`,`1`),n.setAttribute(`aria-valuenow`,e.el.getAttribute(`slide`)??`0`),n.addEventListener(`keydown`,t=>{let n={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[t.key];n&&(t.preventDefault(),o.write(e,Q(a(e)+n*(o.reach(e).step||.1),0,1)))},{signal:t}))}}});return c&&(l.motion.coast=0),{...l,...!r&&{live:[`slide`,`style`,`aria-valuenow`]},value:e=>Q(e.springs[n].value,0,1),place(r){let a=$(e.travel,r)*4*Q(r.springs[n].value,0,1),o=t===`x`?a:0,s=t===`y`?a:0;if(i.get(r)!==a){i.set(r,a);let e=cp(r);e&&(e.style.transform=`translate(${o}px, ${s}px)`)}return{at:[r.x+o,r.y+s]}}}}function fp(e={}){let t=t=>$(e.stops?.at??[0,90],t).map(e=>e*Kf),n=t=>e.at?$(e.at,t):[0,0],r=new WeakMap,i={read:e=>+e.el.hasAttribute(`open`),write(e,t){let n=e.el.toggleAttribute(`open`,t>=.5);cp(e)?.setAttribute(`aria-pressed`,String(n))},reach:()=>({min:0,max:1,step:1}),scale:()=>1};return{...sp({detents:!0,contact:`toggle`,travel:10,...e,joint:`hinge`,name:`hinge`,range:[-1,1],input:e.input?0:void 0,click:!0,noWheel:!0,...e.at&&{pin:{at:e.at,sweep:e=>{let[n,r]=t(e);return r-n}}},...!e.input&&{track:i,dress(e){lp(e,`cursor:pointer`),cp(e)?.setAttribute(`aria-pressed`,String(e.el.hasAttribute(`open`)))}}}),...!e.input&&{live:[`open`,`style`,`aria-pressed`]},value:e=>Q((e.springs.hinge.value+1)/2,0,1),place(e){let[i,a]=t(e),o=i+(a-i)*Q((e.springs.hinge.value+1)/2,0,1),[s,c]=n(e);if(r.get(e)!==o){r.set(e,o);let t=cp(e)?.style;t&&(t.transformOrigin=`${s}px ${c}px`,t.transform=`rotate(${o-i}rad)`)}return{at:[e.x+s,e.y+c],rotate:o}}}}var pp=8,mp=4,hp=2,gp=.4,_p=new WeakMap;function vp(e){let t=_p.get(e);if(t)return t;let n=[],r=new Map,i={things:n,places:r,lay:()=>{let t=n.filter(e=>e.out()).sort((e,t)=>e.since-t.since),i=pp*4,a=e.offsetWidth,o=e.offsetHeight,s=Math.max(0,...n.map(e=>e.el.offsetWidth))+i*2;e.style.marginRight!==`${s}px`&&(e.style.marginRight=`${s}px`,Mc(e));for(let[e,n]of r)t.includes(e)||(n.remove(),r.delete(e));for(let e of n)e.el.style.zIndex=t.includes(e)?String(t.indexOf(e)+1):``;let c=e.getBoundingClientRect().width/a||1,l=t.length>1?(o-t.at(-1).el.offsetHeight)/(t.length-1):0,u=0;for(let n of t){let t=n.el.offsetWidth,o=n.el.offsetHeight,s=r.get(n);s||(s=document.createElement(`div`),s.dataset.place=``,s.setAttribute(`aria-hidden`,`true`),r.set(n,s),e.append(s));let d=parseFloat(n.el.getAttribute(`radius`)??``)||2;s.style.cssText=`position:absolute;left:${a+i}px;top:${u}px;width:${t}px;height:${o}px;box-sizing:border-box;border:${1/c}px solid currentColor;border-radius:${d*4}px;opacity:.25;pointer-events:none`,n.place=[(a+i-n.el.offsetLeft)/4,(u-n.el.offsetTop)/4],n.rest(),u+=Math.min(o+i,l)}}};return _p.set(e,i),i}function yp(e,t){let n=new AbortController,{signal:r}=n,i=t.axis??`y`,a=Math.sign(t.run??0),o=Math.abs(t.run??0),s=t.near??10,c=t.twist??0,l=e[0].parentElement,u=vp(l),d=0,f=0,p=e.map(e=>{let t={el:e,x:0,y:0,vx:0,vy:0,grip:-1,from:[0,0,0,0],home:!1,turn:+(e.getAttribute(`twist`)??0),turning:!1,shelved:!1,drawn:null,place:null,since:0,out:()=>!e.hasAttribute(`seated`)&&!t.home,rest:()=>{!t.shelved||t.grip>=0||!t.place||(f=performance.now(),d||=requestAnimationFrame(j))}};return t});u.things.push(...p);let m=e=>c?0:a*(i===`y`?e.y:e.x),h=e=>c?Math.hypot(e.x,e.y):i===`y`?e.x:e.y,g=e=>(e.el.parentElement.getBoundingClientRect().width/e.el.parentElement.offsetWidth||1)*4,_=e=>{let{el:n}=e,r=n.parentElement,i=document.createElement(`d-surface`),a=n.offsetLeft,o=n.offsetTop;for(let e=t.seat;e&&e!==r;e=e.offsetParent)a-=e.offsetLeft,o-=e.offsetTop;for(let e of[`material`,`radius`,`height`,`bevel`,`path`,`viewbox`,`rule`,`shape`,`twist`])n.hasAttribute(e)&&i.setAttribute(e,n.getAttribute(e));return i.style.cssText=`position:absolute;left:${a}px;top:${o}px;width:${n.offsetWidth}px;height:${n.offsetHeight}px`,i.append(...[...n.children].filter(e=>e.localName!==`canvas`).map(e=>e.cloneNode(!0))),i.inert=!0,i.setAttribute(`aria-hidden`,`true`),x(n,i),t.seat.append(i),i},v=(e,t)=>{let n=!1,i=()=>{n||(n=!0,clearTimeout(a),e.removeEventListener(`lit`,i),t())},a=setTimeout(i,400);e.addEventListener(`lit`,i,{signal:r})},y=t.seat.closest(`d-device`),b=y.hasAttribute(`reverse`)?`back`:y.getAttribute(`side`)||`front`;for(let e of p)e.el.dataset.face=b;let x=(e,t)=>{let n=t.querySelectorAll(`input`);e.querySelectorAll(`input`).forEach((e,t)=>{let r=n[t];!r||r.value===e.value&&r.checked===e.checked||(r.value=e.value,r.checked=e.checked,r.dispatchEvent(new Event(`input`)))})},S=e=>{let t=e.el.hasAttribute(`seated`);t&&!e.drawn&&(e.drawn=_(e),v(y,()=>{e.drawn&&e.el.removeAttribute(`moving`)})),t||(e.el.toggleAttribute(`moving`,!0),e.drawn?.remove(),e.drawn=null),e.drawn&&(e.drawn.style.translate=e.el.style.translate,e.drawn.getAttribute(`twist`)!==e.el.getAttribute(`twist`)&&e.drawn.setAttribute(`twist`,e.el.getAttribute(`twist`)??`0`))},C=!1,w=0,T=(e,n=0)=>{clearTimeout(w),C=e,t.release?.setAttribute(`aria-pressed`,String(e)),e&&n&&(w=window.setTimeout(()=>T(!1),n*1e3))};t.release&&(t.release.setAttribute(`aria-pressed`,`false`),t.release.addEventListener(`click`,()=>T(!0,mp),{signal:r}));let E=(e,t)=>{e.turn=Math.abs(t)<.05?0:t,e.turn?e.el.setAttribute(`twist`,e.turn.toFixed(1)):e.el.removeAttribute(`twist`),S(e)},D=(e,t)=>{let n=e.el.getBoundingClientRect();return Math.atan2(t.clientX-n.x-n.width/2,-(t.clientY-n.y-n.height/2))*180/Math.PI},O=e=>e.el.getAttribute(`aria-disabled`)===`true`,k=e=>{e.el.style.translate=e.x||e.y?`${(e.x*4).toFixed(2)}px ${(e.y*4).toFixed(2)}px`:``,S(e)},A=(e,t)=>{e.el.hasAttribute(`seated`)!==t&&(e.el.toggleAttribute(`seated`,t),S(e),e.el.dispatchEvent(new CustomEvent(`plug`,{bubbles:!0,detail:{seated:t}})))},j=e=>{d=0;let t=Math.min((e-f)/1e3||1/60,1/30);f=e;for(let e of p){let n=e.home?[0,0]:e.shelved&&e.grip<0?e.place:null;n&&(e.vx+=(-Sp*(e.x-n[0])-Cp*e.vx)*t,e.vy+=(-Sp*(e.y-n[1])-Cp*e.vy)*t,e.x+=e.vx*t,e.y+=e.vy*t,e.home&&!e.el.hasAttribute(`seated`)&&Math.abs(h(e))<.5&&m(e)<o&&(i===`y`?e.x=e.vx=0:e.y=e.vy=0,A(e,!0)),Ld()||Math.hypot(e.x-n[0],e.y-n[1])<.05?([e.x,e.y]=n,e.vx=e.vy=0,e.home&&(e.home=!1,A(e,!0),e.el.style.zIndex=``),k(e)):(k(e),d||=requestAnimationFrame(j)))}};addEventListener(`resize`,u.lay,{signal:r});for(let e of p){let{el:t}=e;t.addEventListener(`pointerdown`,n=>{if(n.button||e.grip>=0)return;let r=!!c&&t.hasAttribute(`seated`);(!r||!O(e)&&(C||e.turn))&&(e.turning=r,r&&(T(!0),e.from=[D(e,n),e.turn,0,0]),n.preventDefault(),n.stopPropagation(),zd(t,n),t.hasAttribute(`seated`)||(t.style.zIndex=String(u.things.length+1)),e.grip=n.pointerId,e.home=!1,r||(e.from=[n.clientX,n.clientY,e.x,e.y]))},{capture:!!c,signal:r}),t.addEventListener(`pointermove`,n=>{if(n.pointerId===e.grip){if(e.turning){let r=(D(e,n)-e.from[0]+540)%360-180,i=e.from[1]+r,a=Math.sign(c);E(e,a*Math.min(Math.max(i*a,0),Math.abs(c))),Math.abs(e.turn)>=Math.abs(c)?(e.turning=!1,T(!1),t.style.zIndex=String(u.things.length+1),A(e,!1),e.since=performance.now(),u.lay(),e.from=[n.clientX,n.clientY,e.x,e.y]):e.from=[D(e,n),e.turn,0,0]}else{if(e.x=e.from[2]+(n.clientX-e.from[0])/g(e),e.y=e.from[3]+(n.clientY-e.from[1])/g(e),t.hasAttribute(`seated`)){if(m(e)>=o&&!O(e))t.style.zIndex=String(u.things.length+1),A(e,!1),e.since=performance.now(),u.lay();else{let t=Math.min(Math.max(m(e),0),O(e)?gp:o)*a;e.x=i===`x`?t:0,e.y=i===`y`?t:0}}k(e)}}},{signal:r});for(let n of[`pointerup`,`pointercancel`])t.addEventListener(n,n=>{if(n.pointerId!==e.grip)return;if(e.grip=-1,e.turning){e.turning=!1,T(!1),Math.abs(e.turn)<hp&&E(e,0);return}let r=!p.some(t=>t!==e&&(t.el.hasAttribute(`seated`)||t.home));e.home=t.hasAttribute(`seated`)||r&&!O(e)&&Math.abs(h(e))<s&&m(e)>-s&&m(e)<o+s,e.shelved=!e.home,u.lay(),f=performance.now(),d||=requestAnimationFrame(j)},{signal:r})}for(let e of p)e.shelved=!e.el.hasAttribute(`seated`);u.lay();for(let e of p)e.shelved&&e.place&&([e.x,e.y]=e.place),k(e);return()=>{n.abort(),cancelAnimationFrame(d);for(let e of p)e.drawn?.remove(),u.places.get(e)?.remove(),u.places.delete(e),u.things.splice(u.things.indexOf(e),1)}}var bp=500,xp=30,Sp=180,Cp=16,wp=5,Tp=7;function Ep(e,t){let n=t.reach??40,r=new AbortController,{signal:i}=r,a=[0,0];e.toggleAttribute(`carried`,!0);let o=0,s=0,c=0,l=0,u=-1,d=0,f=0,p=[0,0,0,0],m=0,h=0,g=0,_=()=>e.getBoundingClientRect().width/e.offsetWidth||1,v=()=>{e.style.transform=Ld()||!o&&!s?``:`translate(${(o*4).toFixed(2)}px,${(s*4).toFixed(2)}px) rotate(${(o*.05).toFixed(3)}deg)`},y=e=>{[(o-h)/e,(s-g)/e].forEach((e,n)=>{let r=a[n];Math.abs(e)<xp||(r&&Math.sign(e)!==Math.sign(r)&&t.jolt(Math.min((Math.abs(e)+Math.abs(r))/bp,1)),a[n]=e)}),h=o,g=s},b=e=>{d=0;let t=Math.min((e-f)/1e3||1/60,1/30),n=e*.001*wp*Math.PI*2;if(f=e,m>e){let t=Tp*Math.min((m-e)/1e3*3,1);o=t*Math.sin(n),s=t*.45*Math.sin(n+1)}else u<0&&(c+=(-180*o-Cp*c)*t,l+=(-180*s-Cp*l)*t,o+=c*t,s+=l*t,Math.hypot(o,s)<.02&&Math.hypot(c,l)<.2&&(o=s=c=l=0));y(t),v(),(u>=0||m>e||o||s)&&(d=requestAnimationFrame(b))},x=()=>{d||=(f=performance.now(),requestAnimationFrame(b))};e.addEventListener(`pointerdown`,t=>{t.target!==e||t.button||u>=0||(t.preventDefault(),e.focus({preventScroll:!0}),zd(e,t),u=t.pointerId,p=[t.clientX,t.clientY,o,s],c=l=0,x())},{signal:i}),e.addEventListener(`pointermove`,e=>{if(e.pointerId!==u)return;let t=_()*4,r=e=>n*Math.tanh(e/n);o=r(p[2]+(e.clientX-p[0])/t),s=r(p[3]+(e.clientY-p[1])/t)},{signal:i});for(let t of[`pointerup`,`pointercancel`])e.addEventListener(t,e=>{e.pointerId===u&&(u=-1)},{signal:i});return{shake(e=1200){m=performance.now()+e,x()},stop(){r.abort(),cancelAnimationFrame(d),e.removeAttribute(`carried`),e.style.transform=``}}}var Dp=1.7,Op=27,kp=.25;function Ap(e){let t=cf({mass:1,material:`steel-on-steel`,contact:!1},`pluck`),n=new WeakMap,r=e=>{let t=n.get(e);return t||n.set(e,t={ring:[],held:-1,x:0,y:0}),t},i=([e,t,n,r],i,a)=>{let o=n-e,s=r-t,c=Math.hypot(o,s)||1;return{at:Q(((i-e)*o+(a-t)*s)/(c*c),.02,.98),off:((a-t)*o-(i-e)*s)/c}},a=()=>dd().schedule();return{motion:t,connect(t){let n=r(t),o=t.el,s=(e.pull??3)*4,c=()=>e.strings(t),l=(e,t,r,i)=>{n.ring[e]={at:t,by:r,swing:Math.abs(r)||s*i,phase:0},o.dispatchEvent(new CustomEvent(`pluck`,{bubbles:!0,detail:{string:e,at:t,force:Q(i,.05,1)}})),a()},u=Ud(o,()=>{let e=o.offsetWidth,t=o.offsetHeight;return{x:0,y:0,w:e,h:t,cols:e,rows:t}},{down(e,t){let r=c(),o=-1,l=1/0;if(r.forEach((n,r)=>{let a=Math.abs(i(n,e,t).off);a<l&&([o,l]=[r,a])}),o<0)return!1;n.held=o,n.x=e,n.y=t;let{at:u,off:d}=i(r[o],e,t);return n.ring[o]={at:u,by:Q(d,-s,s),swing:0,phase:0},a(),!0},move(e,t){let r=c(),o=r.map((r,a)=>({i:a,was:i(r,n.x,n.y).off,now:i(r,e,t).off})).filter(e=>e.i!==n.held&&e.was*e.now<0).sort((e,t)=>Math.abs(e.was)-Math.abs(t.was));if(n.held>=0){let{at:a,off:c}=i(r[n.held],e,t);Math.abs(c)>=s||o.length?(l(n.held,a,Q(c,-s,s),1),n.held=-1):n.ring[n.held]={at:a,by:c,swing:0,phase:0}}let u=Math.hypot(e-n.x,t-n.y);for(let a of o){let{at:o,off:c}=i(r[a.i],e,t);u<s&&n.held<0?(n.held=a.i,n.ring[a.i]={at:o,by:c,swing:0,phase:0}):l(a.i,o,Math.sign(c||1)*s*.8,Q(u/(s*4),.35,1))}n.x=e,n.y=t,a()},up(){if(n.held<0)return;let e=n.ring[n.held];l(n.held,e.at,e.by,Q(.55+Math.abs(e.by)/s,0,1)),n.held=-1}});o.style.cursor=`grab`;let d=new AbortController;return o.querySelectorAll(`button`).forEach((e,t)=>{e.addEventListener(`click`,e=>{e.detail||l(t,.2,s*.8,.7)},{signal:d.signal})}),()=>{u(),d.abort()}},tick(e,t){let n=r(e),i=Ld(),a=n.held>=0;return n.ring.forEach((e,r)=>{e&&r!==n.held&&(e.swing*=Math.exp(-t*Dp),e.phase+=t*Math.PI*2*(Op+r*3),e.by=i||e.swing<kp?0:e.swing*Math.cos(e.phase),e.by&&(a=!0))}),a},shape(e,t){let n=r(e).ring[t];return n?{at:n.at,by:n.by}:{at:.5,by:0}}}}var jp=0,Mp=1,Np=2,Pp=3,Fp=4,Ip=[20,20,20,12,26],Lp=4,Rp=2,zp=6,Bp=.14,Vp=.35,Hp=.02;function Up(e){let t=cf({mass:2,material:`plastic-on-plastic`,contact:!1},`sheaf`),n=new WeakMap,r=()=>dd().schedule(),i=(e.spread??95)*Math.PI/180,a=e=>{let t=n.get(e);if(t)return t;let r=[...e.el.querySelectorAll(`:scope > [leaf]`)].map((e,t)=>({el:e,n:t,x:0,y:0,a:0,f:0,z:0,covered:!1,cased:!1,to:[0,0,0,0,0],v:[0,0,0,0,0],held:!1,skew:(t*7919%13/12-.5)*3*Math.PI/180,label:``})),i={};return e.el.querySelectorAll(`:scope > [grip]`).forEach(e=>i[e.getAttribute(`grip`)]=e),n.set(e,t={leaves:r,pile:[...r],order:[...r],home:[0,0],origin:[0,0],fan:0,cut:null,spots:[],dealt:0,cuts:0,cased:!1,then:null,grip:i}),t},o=(e,t)=>{let{spots:n}=a(e),r=Math.floor(n.length/2);if(!r)return[e.w*1.2,0];let i=Math.min(t,r-1);return[n[i*2],n[i*2+1]]},s=t=>{let n=a(t),{pile:o,order:s,fan:c,cut:l}=n,[u,d]=n.origin,[f,p]=e.pin?.(t)??[0,0],m=o.length,h=m-(l?.n??0);o.forEach((e,t)=>{let n=t>=h&&l,r=m>1?t/(m-1):0,a=c*i*r,o=Math.cos(a),s=Math.sin(a),g=(1-c)*4*Bp,_=(e.n*37%7/3-1)*g,v=(e.n*53%5/2-1)*g;e.to[jp]=(n?l.x:u)+f-o*f+s*p+_,e.to[Mp]=(n?l.y:d)+p-s*f-o*p+v,e.to[Np]=a});let g=[],_=(e,n)=>g.reduce((r,i)=>Math.abs(i.x-e)<t.w*.95&&Math.abs(i.y-n)<t.h*.95?Math.max(r,i.top):r,0),v=new Set(o),y=e.thick,b=-1;for(let e of s)if(v.has(e)){if(b<0){b=n.cased?0:_(u,d);let e=y*(1-c*.8);o.slice(0,h).forEach((t,n)=>t.to[Fp]=b+n*e+(t.held?Rp:0));let t=l?_(l.x,l.y)+Rp:0;o.slice(h).forEach((n,r)=>n.to[Fp]=t+r*e),g.push({x:u,y:d,top:b+h*e})}}else{let t=_(e.to[jp],e.to[Mp]);e.to[Fp]=t+(e.held?Rp:0),g.push({x:e.to[jp],y:e.to[Mp],top:t+y})}let x=o[m-1],S=c>Hp;s.forEach((t,r)=>{t.cased=n.cased&&v.has(t);let i=!n.cased&&(!v.has(t)||t===x||S||l&&o.indexOf(t)===h-1),a=t.el.style,s=`translate(${t.to[jp].toFixed(2)}px, ${t.to[Mp].toFixed(2)}px)`,c=`rotate(${t.to[Np].toFixed(4)}rad)`;a.transform!==`${s} ${c}`&&(a.transform=`${s} ${c}`),a.zIndex!==String(r+1)&&(a.zIndex=String(r+1));let u=i?`auto`:`none`;a.pointerEvents!==u&&(a.pointerEvents=u);let d=i?0:-1;t.el.tabIndex!==d&&(t.el.tabIndex=d);let f=t.to[Pp]>.5?e.named(t.el):`A card, face down`;t.label!==f&&t.el.setAttribute(`aria-label`,t.label=f)});let C=(e,t,r=0,i=0)=>{let a=n.grip[e];if(!a)return;let o=a.style,s=t?`auto`:`none`,c=`translate(${r.toFixed(2)}px, ${i.toFixed(2)}px)`;o.pointerEvents!==s&&(o.pointerEvents=s),o.transform!==c&&(o.transform=c),a.tabIndex!==(t?0:-1)&&(a.tabIndex=t?0:-1)},w=m>1,T=!S&&!l&&!n.cased;C(`cut`,w&&T,u,d),C(`over`,w&&T,u,d),C(`spread`,w&&!n.cased&&!l,u,d),C(`take`,n.cased,0,0),C(`away`,!n.cased,0,0),r()},c=(e,...t)=>{let n=new Set(t);e.order=[...e.order.filter(e=>!n.has(e)),...t]},l=e=>c(e,...e.pile),u=(e,t)=>{let n=a(e),r=n.pile.indexOf(t);r>=0&&n.pile.splice(r,1),c(n,t);let[i,l]=o(e,n.dealt++);t.to[jp]=i,t.to[Mp]=l,t.to[Np]=t.skew,s(e)},d=e=>{e.to[Pp]=e.to[Pp]>.5?0:1},f=(e,t)=>{let n=a(e),r=n.pile.length;r<2||n.cased||(l(n),n.cut={n:Q(Math.round(r*(.3+.4*t)),1,r-1),x:n.origin[0],y:n.origin[1]},s(e))},p=e=>{let t=a(e),{cut:n}=t;if(!n)return;let r=t.pile.length,i=t.pile.slice(0,r-n.n);t.pile=[...t.pile.slice(r-n.n),...i],t.order=[...t.order.filter(e=>!t.pile.includes(e)),...t.pile],t.origin=[n.x,n.y],t.cut=null,t.cuts++,s(e),t.then=()=>{t.origin=[...t.home],s(e)}},m=t=>{let n=a(t);f(t,.35+n.cuts*5%7/20),n.cut&&(n.cut.x=n.origin[0]+(e.cut??t.w/4+8)*4,n.cut.y=n.origin[1],s(t),n.then=()=>p(t))},h=(e,t)=>{let n=a(e),r=Q(t,0,1);if(r===n.fan)return;n.fan===0&&l(n),n.fan=r;let i=n.grip.spread;i&&i.valueAsNumber!==r&&Wd(i,r),s(e)},g=e=>{let t=a(e);if(!(t.pile.length<2||t.cased)){l(t),t.pile.reverse(),t.order=[...t.order.filter(e=>!t.pile.includes(e)),...t.pile];for(let e of t.pile)d(e);s(e)}},_=t=>{let n=a(t);if(n.cased){if(e.open&&!e.open(t))return e.opening?.(t);n.origin=[...n.home],s(t),n.then=()=>{n.cased=!1,s(t)}}},v=t=>{let n=a(t),r=e.seat?.(t);if(n.cased||!r)return;e.open&&!e.open(t)&&e.opening?.(t),n.fan=0,n.cut=null,n.dealt=0;let i=n.grip.spread;i&&i.valueAsNumber&&Wd(i,0),n.pile=[...n.pile,...n.order.filter(e=>!n.pile.includes(e))],n.order=[...n.pile],n.origin=[...n.home];for(let e of n.pile)e.to[Pp]=0;s(t),n.then=()=>{n.cased=!0,n.origin=[...r],s(t)}};return{motion:t,live:[`style`,`aria-label`,`tabindex`,`value`,`aria-valuenow`],connect(t){let n=new AbortController,{signal:r}=n,i=a(t),o=e.seat?.(t);t.el.style.pointerEvents=`none`;for(let e of i.leaves)e.el.style.cssText=`position:absolute;inset:0;appearance:none;background:none;border:0;padding:0;outline:none;cursor:grab;transform-origin:50% 50%`;for(let e of Object.values(i.grip))e&&(e.style.pointerEvents=`auto`);if(o){i.cased=!0,i.origin=[...o];for(let e of i.leaves)e.x=o[0],e.y=o[1]}s(t);for(let e of i.leaves)e.x=e.to[jp],e.y=e.to[Mp],e.z=e.to[Fp];let y=()=>t.el.getBoundingClientRect().width/t.w||1,b=null;Hd(t,r,{accepts(e){let n=e.target.closest?.(`[leaf], [grip]`);return!!n&&n.parentElement===t.el},start(e){let t=e.target.closest(`[leaf], [grip]`),n=t.getAttribute(`grip`)??`leaf`;if(b={kind:n,moved:0,x:0,y:0,fan:i.fan},n===`leaf`&&(b.leaf=i.leaves.find(e=>e.el===t)),i.then=null,n===`cut`){let n=t.getBoundingClientRect();b.fan=Q((e.clientY-n.top)/n.height,0,1)}},move(e,n,r){if(!b)return;let a=y(),o=n/a,l=r/a;if(b.moved+=Math.hypot(n,r),b.x+=o,b.y+=l,!(b.moved<Lp)){if(b.kind===`leaf`&&b.leaf){let e=b.leaf,n=i.pile.indexOf(e);e.held||(n>=0&&i.pile.splice(n,1),e.held=!0,c(i,e),e.to[Np]=e.a),e.to[jp]=e.x+=o,e.to[Mp]=e.y+=l,s(t)}else b.kind===`cut`?(i.cut||f(t,b.fan),i.cut&&(i.cut.x=i.origin[0]+b.x,i.cut.y=i.origin[1]+b.y,s(t))):b.kind===`spread`&&h(t,b.fan+b.x/(t.w*1.1))}},end(){if(!b)return;let{kind:e,leaf:n,moved:r}=b,a=r<Lp;if(b=null,e===`leaf`&&n){if(a){i.pile.includes(n)?u(t,n):(c(i,n),d(n),s(t));return}n.held=!1,Math.abs(n.x-i.origin[0])<t.w*Vp&&Math.abs(n.y-i.origin[1])<t.h*Vp&&!i.cased&&!i.fan&&(i.pile.push(n),l(i)),s(t)}else e===`cut`?a?m(t):i.cut&&Math.hypot(i.cut.x-i.origin[0],i.cut.y-i.origin[1])>t.w/2?p(t):(i.cut=null,s(t)):e===`spread`?a&&h(t,i.fan>.5?0:1):a&&e===`over`?g(t):a&&e===`take`?_(t):a&&e===`away`&&v(t)}});for(let e of i.leaves)e.el.addEventListener(`click`,n=>{n.detail||(i.pile.includes(e)?u(t,e):(d(e),s(t)))},{signal:r});let x={cut:()=>m(t),over:()=>g(t),take:()=>_(t),away:()=>v(t)};for(let[e,t]of Object.entries(x))i.grip[e]?.addEventListener(`click`,e=>{e.detail||t()},{signal:r});return i.grip.spread?.addEventListener(`input`,e=>h(t,e.target.valueAsNumber),{signal:r}),()=>n.abort()},tick(e,t){let n=a(e),r=Ld(),i=!1,o=Math.max(1,Math.ceil(t/(1/240))),s=t/o;for(let e of n.leaves){let t=[e.x,e.y,e.a,e.f,e.z],n=!1;for(let i=0;i<5;i++){let a=t[i],c=e.v[i],l=e.to[i];if(a!==l||c){if(n=!0,r||e.held&&i!==Fp)a=l,c=0;else{let e=Ip[i];for(let t=0;t<o;t++)c+=(e*e*(l-a)-2*e*c)*s,a+=c*s;Math.abs(l-a)<(i===Np||i===Pp?8e-4:.02)&&Math.abs(c)<.5&&(a=l,c=0)}t[i]=a,e.v[i]=c}}n&&([e.x,e.y,e.a,e.f,e.z]=t,i=!0)}if(!i&&n.then){let e=n.then;return n.then=null,e(),!0}return i},leaves(e){let{order:t}=a(e);return t.forEach((e,n)=>{let r=t[n+1];e.covered=!!r&&r.cased===e.cased&&Math.abs(r.x-e.x)<4&&Math.abs(r.y-e.y)<4&&Math.abs(r.a-e.a)<.002&&Math.abs(r.f-e.f)<.002&&(e.f===0||e.f===1)}),t},deals(e,t){a(e).spots=t.map(e=>e*4)},lift:e=>Math.sin(Math.PI*e)*zp,stack(e){let t=a(e);return{x:t.origin[0],y:t.origin[1],n:t.pile.length,cased:t.cased}}}}var Wp=1.65,Gp=.7,Kp=10,qp=1;function Jp(e,t,n=0){let r=e*Math.PI/180,i=t*Math.PI/180,a=n*Math.PI/180,o=-Math.cos(r)*Math.sin(i),s=Math.sin(r);return[o*Math.cos(a)-s*Math.sin(a),o*Math.sin(a)+s*Math.cos(a)]}function Yp({look:e=6,onState:t}={}){let n=dd(),r=`waiting`,i=null,a=0,o=0,s=0,c=0,l=e=>{e!==r&&(r=e,t?.(r))},u=()=>globalThis.orientation??screen.orientation?.angle??0,d=()=>{i=null},f=t=>{if(t.beta===null||t.gamma===null||matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;r!==`on`&&(c=n.look,n.lampHeld=!0,yd({look:e}),l(`on`));let[d,f]=Jp(t.beta,t.gamma,u()),p=performance.now(),m=Math.min((p-a)/1e3,.2)/Kp;a=p,i??=[d,f],i[0]+=(d-i[0])*m,i[1]+=(f-i[1])*m;let h=Math.sqrt(innerWidth*innerHeight)/2*Wp,g=e=>Math.max(-.7,Math.min(Gp,e)),_=innerWidth/2+g(d-i[0])*h,v=innerHeight/2-g(f-i[1])*h;Math.hypot(_-o,v-s)<qp||(o=_,s=v,n.aim(_,v))};addEventListener(`deviceorientation`,f),addEventListener(`orientationchange`,d),screen.orientation?.addEventListener(`change`,d);let p=globalThis.DeviceOrientationEvent,m=e=>r===`on`||(l(e===`granted`?`waiting`:`denied`),e===`granted`);return p?.requestPermission&&(l(`ask`),p.requestPermission().then(m,()=>{})),{get state(){return r},ask:()=>p?.requestPermission?.().then(m,()=>!1)??Promise.resolve(!0),stop(){removeEventListener(`deviceorientation`,f),removeEventListener(`orientationchange`,d),screen.orientation?.removeEventListener(`change`,d),r===`on`&&(yd({look:c}),n.letGo()),l(`waiting`)}}}export{ve as $,Vd as A,Ao as B,Bd as C,M as Ct,Ld as D,Ud as E,vd as F,La as G,Co as H,$c as I,Be as J,Pt as K,Qc as L,yd as M,dd as N,Wd as O,hd as P,we as Q,jc as R,zd as S,me as St,Id as T,ue as Tt,Ia as U,So as V,Ra as W,Ae as X,ze as Y,ge as Z,lf as _,L as _t,bf as a,E as at,ap as b,R as bt,Sf as c,k as ct,np as d,A as dt,ke as et,cf as f,ce as ft,dp as g,ee as gt,ip as h,N as ht,yf as i,O as it,bd as j,Yd as k,Ep as l,le as lt,yp as m,j as mt,Up as n,Te as nt,xf as o,F as ot,uf as p,P as pt,Ft as q,Ap as r,D as rt,Cf as s,z as st,Yp as t,Se as tt,fp as u,fe as ut,hf as v,T as vt,Fd as w,H as wt,Xf as x,pe as xt,op as y,te as yt,bc as z};