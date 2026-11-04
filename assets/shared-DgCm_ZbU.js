import{_t as e,gt as t,lt as n,w as r}from"./preload-helper-YMSyaZ72.js";import{t as i}from"./materials-BuoQK2BM.js";var a=[3.85,1.76,.28],o=(e,t)=>e.el.closest(`d-surface`)?.getAttribute(`material`)??t.material,s=(e,t,n)=>{let r=e.el.getAttribute(t);return r===null||r===``?n:+r},c=(e,t,n)=>{let r=e.el.getAttribute(t);return r?r.trim().split(/[\s,]+/).map(Number):n},l=(e,t=``)=>e.map(e=>`.d-gl ${e}${t}`).join(`, `),u=(...e)=>`
${e.join(`, `)} { display: block; position: relative; touch-action: none; }
${e.map(e=>`${e} input`).join(`, `)} { width: 100%; height: 100%; margin: 0; }
${l(e)} { cursor: grab; }
${l(e,`:active`)} { cursor: grabbing; }
${l(e,` input`)} { position: absolute; inset: 0; opacity: 0; appearance: none; cursor: inherit; }
`,d=(...e)=>`
:where(${e.join(`, `)}) { font: inherit; letter-spacing: inherit; }
${l(e)} {
  appearance: none; background: none; border: 0; padding: 0; color: transparent;
  outline: none; cursor: pointer; user-select: none; -webkit-tap-highlight-color: transparent;
}
`,f=e=>{let[t,n]=r(e),i=n-t;return i?Math.min(1,Math.max(0,(+e.value-t)/i)):0},p=(e,t)=>e.el.getAttribute(t)??e.el.closest(`[${t}]`)?.getAttribute(t)??null,m=(e,t=`amber`)=>i[e.el.getAttribute(`color`)??t]??i.amber,h=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],g=(e,t,n=600)=>`${n} ${t}px ${getComputedStyle(e.el).fontFamily}`,_=(e,t,n,r)=>[e+Math.sin(r)*n,t-Math.cos(r)*n];function v(e,t,n,r,i,a){let[o,s]=_(e,t,r,i),[c,l]=_(e,t,r,a),[u,d]=_(e,t,n,a),[f,p]=_(e,t,n,i),m=+(a-i>Math.PI);return`M${o} ${s} A${r} ${r} 0 ${m} 1 ${c} ${l} L${u} ${d} A${n} ${n} 0 ${m} 0 ${f} ${p} Z`}var y=(r,i,a,o,s)=>{let l=r.el.getAttribute(`path`);if(l)return e(l,i,a,o,s,{viewBox:c(r,`viewbox`,[0,0,100,100]),spread:8});if(r.el.hasAttribute(`round`))return n(i+o/2,a+s/2,Math.min(o,s)/2);let[u=2,d=u,f=u,p=u]=c(r,`radius`,[2]);return t(i,a,o,s,[u,d,f,p])};export{o as a,d as c,c as d,_ as f,f as i,m as l,v as m,u as n,p as o,h as p,g as r,y as s,a as t,s as u};