import{n as e}from"./rolldown-runtime-XKyaHtl9.js";import{F as t,I as n,L as r,P as i,R as a,z as o}from"./preload-helper-C4YgKpeq.js";var s=(e,t,n,r)=>{let i=(e-t)/(e<t?n:r);return Math.exp(-.5*i*i)},c=e=>1.056*s(e,599.8,37.9,31)+.362*s(e,442,16,26.7)-.065*s(e,501.1,20.4,26.2),l=e=>.821*s(e,568.8,46.9,40.5)+.286*s(e,530.9,16.3,31.1),u=e=>1.217*s(e,437,11.8,36)+.681*s(e,459,26,13.8),d=(e,t)=>{let n=e*1e-9,r=662607015e-42,i=299792458;return 2*r*i*i/(n**5*Math.expm1(r*i/(n*1380649e-29*t)))};function f(e){let t=0,n=0,r=0;for(let i=380;i<=780;i+=5){let a=d(i,e)*5e-9;t+=a*c(i),n+=a*l(i),r+=a*u(i)}return[t*683,n*683,r*683]}var p=([e,t,n])=>[3.2406*e-1.5372*t-.4986*n,-.9689*e+1.8758*t+.0415*n,.0557*e-.204*t+1.057*n];function ee(e){let t=p(f(e)).map(e=>Math.max(0,e)),n=Math.max(...t);return t.map(e=>e/n)}var te=e=>f(e)[1];function ne(e,t,n,r){let i=new Float32Array(e*4);for(let a=0;a<e;a++){let o=t+(n-t)*a/(e-1),s=ee(o),c=te(o)/r;i.set([s[0]*c,s[1]*c,s[2]*c,1],a*4)}return i}var m=`2.72e-4`,h=`#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
`,g=`#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
`,re=`#version 300 es
in vec2 aPos;
uniform vec4 uRect;
out vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(mix(uRect.xy, uRect.zw, vUv), 0.0, 1.0); }
`,_=`
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float valueNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1, 0)), u.x), mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), u.x), u.y);
}
// Crumpled-paper creases: four octaves of (1 - n^2) of a signed noise, each turned and scaled.
float crumple(vec2 p) {
  float sum = 0.0, amp = 0.55;
  for (int k = 0; k < 4; k++) {
    float n = valueNoise(p) * 0.65 + valueNoise(p * 2.03 + 11.0) * 0.35;
    sum += (1.0 - (n * 2.0 - 1.0) * (n * 2.0 - 1.0)) * amp;
    p = mat2(1.6, 1.2, -1.2, 1.6) * p + 7.1;
    amp *= 0.5;
  }
  return clamp(sum / 1.03, 0.0, 1.0);
}
// The curl of a noise, which has no divergence, so it stirs without piling anything up. Scale in metres.
vec2 curlNoise(vec2 w, float scale, float t) {
  float e = 0.1;
  vec2 p = w / scale + vec2(t * 0.13, -t * 0.09);
  float n1 = valueNoise(p + vec2(0, e)), n2 = valueNoise(p - vec2(0, e)), n3 = valueNoise(p + vec2(e, 0)), n4 = valueNoise(p - vec2(e, 0));
  return vec2(n1 - n2, n4 - n3) / (2.0 * e);
}
// Slow swirls at about 1 m and 30 cm; fast small eddies at 15 and 7 cm, which tear flames into tongues.
vec2 swirl(vec2 w, float t) { return curlNoise(w, 1.0, t) + 0.5 * curlNoise(w + 3.7, 0.3, t * 1.7); }
vec2 flicker(vec2 w, float t) { return curlNoise(w, 0.15, t * 6.0) + 0.6 * curlNoise(w + 9.1, 0.07, t * 9.0); }
`,v=`
uniform sampler2D uShine;
uniform float uShineGain, uShineCell;
uniform vec2 uPageSpan;
uniform vec3 uAmbient;
uniform vec4 uLightAt[8];
uniform vec3 uLightColor[8];
uniform int uLightCount;
// What the page gives off, drawn small and blurred by distance: haze right in front of a screen shows a soft copy of its
// picture, and further off only its colour.
vec3 shineAt(vec2 pw) {
  vec2 uv = pw / uPageSpan;
  // Spread over about 17, 48 and 190 css px, whatever size it was read at.
  float l = log2(uShineCell);
  return (textureLod(uShine, uv, 4.1 - l).rgb * 0.45 + textureLod(uShine, uv, 5.6 - l).rgb * 0.35 + textureLod(uShine, uv, 7.6 - l).rgb * 0.5) * uShineGain;
}
vec3 roomLight(vec2 pw) {
  vec3 l = uAmbient + shineAt(pw);
  for (int i = 0; i < 8; i++) {
    if (i >= uLightCount) break;
    vec4 a = uLightAt[i];
    float d = distance(pw, a.xy) / max(a.z, 1e-3);
    l += uLightColor[i] / (1.0 + d * d * 4.0);
  }
  return l;
}
`,ie=3e3,y=`
uniform sampler2D uBlackbody;
vec3 hotLight(float heat) {
  float k = 295.0 + heat * 450.0;
  if (k < 798.0) return vec3(0);
  return texture(uBlackbody, vec2(clamp((k - 798.0) / 2202.0, 0.0, 1.0), 0.5)).rgb;
}
`,b=`
uniform vec2 uCells;
uniform float uCell;
vec2 span() { return uCells * uCell; }
vec2 worldOf(vec2 uv) { return uv * span(); }
vec2 uvOf(vec2 w) { return w / span(); }
// What blocks the air: a list of boxes, in metres, x0 y0 x1 y1. Inside one there's no air.
uniform vec4 uBlocks[32];
uniform int uBlockCount;
float airOpen(vec2 w) {
  for (int i = 0; i < 32; i++) {
    if (i >= uBlockCount) break;
    vec4 b = uBlocks[i];
    if (w.x > b.x && w.y > b.y && w.x < b.z && w.y < b.w) return 0.0;
  }
  return 1.0;
}
`,x=h+b+_+`
uniform sampler2D uVel, uDye, uP, uSources;
uniform float uDt, uTime, uSourceCount, uMixing, uVorticity, uSwirl, uFlicker, uDrag, uHeatLife, uSmokeLife, uSteamLife, uRise;
uniform vec2 uWind;
// Where the plume's box sits on the page, metres from its top left, so no two plumes stir alike.
uniform vec2 uOrigin;
layout(location = 0) out vec4 oVel;
layout(location = 1) out vec4 oDye;
vec4 velAt(vec2 w) { return texture(uVel, uvOf(w)); }
vec4 dyeAt(vec2 w) { return texture(uDye, uvOf(w)); }
float pAt(vec2 w) { return texture(uP, uvOf(w)).r; }
vec2 gradP(vec2 w) { float h = uCell; return vec2(pAt(w + vec2(h, 0)) - pAt(w - vec2(h, 0)), pAt(w + vec2(0, h)) - pAt(w - vec2(0, h))) / (2.0 * h); }
float curl(vec2 w) { float h = uCell; return ((velAt(w + vec2(h, 0)).y - velAt(w - vec2(h, 0)).y) - (velAt(w + vec2(0, h)).x - velAt(w - vec2(0, h)).x)) / (2.0 * h); }
void main() {
  vec2 w = worldOf(vUv);
  float h = uCell, open = airOpen(w);
  // Its eddies come at the size of the plume, as a wisp off a lamp curls at millimetres and a sheet of dust at centimetres,
  // and they move as fast as eddies that size do.
  float size = max(span().x, span().y) / 0.25, scale = 1.0 / size;
  vec2 wn = w + uOrigin;
  // Carried along: trace back along the flow to where this came from.
  vec2 v = velAt(w).xy - gradP(w);
  vec2 back = w - v * uDt;
  vec4 vel = velAt(back);
  vel.xy -= gradP(back);
  // A plume takes in the still air round it, at a tenth of its speed across its edge (Morton, Taylor and Turner's
  // entrainment), so it's diluted at 2·α·speed over its half-width, which is how far its heat takes to fall off. Eddies the
  // plume's own size stir what they take in all through it, so that's read across a few cells as well as one, and the middle
  // of a broad column is diluted as its edge is. Heat and momentum are shared out with what it took in alike: a jet of flame
  // slows and cools within its own height.
  {
    float fall = 0.0;
    for (int k = 0; k < 2; k++) {
      float r = k == 0 ? h : 4.0 * h;
      vec2 g = vec2(velAt(back + vec2(r, 0)).z - velAt(back - vec2(r, 0)).z, velAt(back + vec2(0, r)).z - velAt(back - vec2(0, r)).z);
      fall = max(fall, length(g) / (2.0 * r));
    }
    vel.xyz *= exp(-2.0 * 0.1 * length(vel.xy) * fall / max(vel.z, 1e-3) * uDt);
  }
  // Carried back and forth again, the dye comes out softer than it went in; MacCormack takes back half of what the round trip
  // lost, held between the four cells it came from so it can't ring. Edges stay as sharp as the cells allow.
  vec4 dye = dyeAt(back);
  vec4 again = dyeAt(back + (velAt(back).xy - gradP(back)) * uDt);
  vec2 cellAt = uvOf(back) * uCells - 0.5;
  ivec2 c0 = clamp(ivec2(floor(cellAt)), ivec2(0), ivec2(uCells) - 2);
  vec4 d00 = texelFetch(uDye, c0, 0), d10 = texelFetch(uDye, c0 + ivec2(1, 0), 0), d01 = texelFetch(uDye, c0 + ivec2(0, 1), 0), d11 = texelFetch(uDye, c0 + ivec2(1, 1), 0);
  dye = clamp(dye + 0.5 * (dyeAt(w) - again), min(min(d00, d10), min(d01, d11)), max(max(d00, d10), max(d01, d11)));
  // Mixed a little toward its neighbours, so it softens instead of drawing out into threads.
  float hc = h * 0.5;
  vec4 round_ = (dyeAt(back + vec2(hc, 0)) + dyeAt(back - vec2(hc, 0)) + dyeAt(back + vec2(0, hc)) + dyeAt(back - vec2(0, hc))) * 0.25;
  dye = mix(dye, round_, clamp(uDt * uMixing, 0.0, 1.0));
  // Air that comes in from past the edge is the room's own: still and clean, not the edge's smoke smeared inward.
  vec2 ub = uvOf(back);
  if (ub.x < 0.0 || ub.y < 0.0 || ub.x > 1.0 || ub.y > 1.0) dye = vec4(0);
  // What the sources put in, each five texels: x y radius rate | vx vy heat steam | r g b grip | blast, half its opening across
  // and down, its turn | whether only the opening's edge leaks.
  for (int i = 0; i < 64; i++) {
    if (i >= int(uSourceCount + 0.5)) break;
    vec4 a = texelFetch(uSources, ivec2(i * 5, 0), 0);
    vec4 e = texelFetch(uSources, ivec2(i * 5 + 3, 0), 0);
    // How far from its opening: a box, turned, or only its outline, as smoke leaks out of a seam round a lamp. A point if it
    // has no opening. Where it's pushed out is away from the nearest part of the opening.
    vec2 rel = w - a.xy, ax = vec2(cos(e.w), sin(e.w));
    vec2 q = vec2(dot(rel, ax), dot(rel, vec2(-ax.y, ax.x)));
    vec2 near = clamp(q, -e.yz, e.yz);
    float inside = min(max(abs(q.x) - e.y, abs(q.y) - e.z), 0.0);
    float d = length(q - near) + inside;
    if (texelFetch(uSources, ivec2(i * 5 + 4, 0), 0).x > 0.5) d = abs(d);
    else d = max(d, 0.0);
    if (d > a.z) continue;
    vec2 outward = rel - (near.x * ax + near.y * vec2(-ax.y, ax.x));
    vec4 b = texelFetch(uSources, ivec2(i * 5 + 1, 0), 0);
    vec4 c = texelFetch(uSources, ivec2(i * 5 + 2, 0), 0);
    // Put in through a drifting crumpled mask, so what comes out is folded already.
    float f = exp(-3.0 * d * d / (a.z * a.z)) * (0.3 + 1.4 * crumple(wn * scale * 6.0 + vec2(uTime * 0.6, -uTime * 0.9) + float(i) * 3.3));
    // Fire burns in tongues.
    if (b.z > 2.0) f *= 0.2 + 1.6 * valueNoise(wn * scale * 7.0 + vec2(0, uTime * 4.0)) * valueNoise(wn * scale * 3.0 + vec2(uTime * 1.3, 0));
    float add = a.w * uDt * f;
    // Soot forms in gas as it burns, so the higher it's risen through the flame the more there is: a flame's foot, where it
    // takes in the air, is clear, and it's sootiest at its top.
    if (b.z > 2.0) add *= clamp(0.5 - q.y / (2.0 * max(e.z, a.z)), 0.0, 1.0);
    vel.w = (vel.w * dye.a + b.w * add) / max(dye.a + add, 1e-5);
    dye += vec4(c.rgb * add, add);
    // The air in its opening is as hot as the source: it's where the burning is, not something fed in a little a frame, which
    // the air carries off faster than it warms. A place is burning or it isn't, so its tongues are all at flame heat.
    vel.z = max(vel.z, b.z * smoothstep(0.15, 0.45, f));
    // A jet, or a blast, pushes the air its way; a blast pushes it out from its middle.
    vec2 push = b.xy + (length(outward) > 1e-6 ? normalize(outward) : vec2(0)) * e.x;
    vel.xy = mix(vel.xy, push, clamp(c.w * f * uDt * 10.0, 0.0, 1.0));
  }
  // Put back the small swirls the grid smooths away.
  float cu = curl(w);
  vec2 grad = vec2(abs(curl(w + vec2(h, 0))) - abs(curl(w - vec2(h, 0))), abs(curl(w + vec2(0, h))) - abs(curl(w - vec2(0, h)))) / (2.0 * h);
  vec2 n = grad / (length(grad) + 1e-4);
  vel.xy += uVorticity * h * vec2(n.y, -n.x) * cu * uDt;
  vel.xy += swirl(wn * scale, uTime) * size * uSwirl * uDt * clamp(vel.z + dye.a, 0.0, 2.0);
  vel.xy += flicker(wn * scale, uTime) * size * uFlicker * uDt * smoothstep(0.5, 2.5, vel.z);
  // Hot air rises, which on a page held upright is up the screen.
  vel.y -= uRise * vel.z * uDt;
  vel.xy = mix(vel.xy, uWind, 1.0 - exp(-uDt * 0.3));
  vel.xy *= exp(-uDt * uDrag);
  float speed = length(vel.xy);
  if (speed > 8.0) vel.xy *= 8.0 / speed;
  vel.z *= exp(-uDt / uHeatLife);
  dye *= exp(-uDt / mix(uSmokeLife, uSteamLife, clamp(vel.w, 0.0, 1.0)));
  // The edges of the screen are a window, not a wall: what reaches them goes on out of the picture.
  vel.xyz *= open;
  dye *= open;
  oVel = vel;
  oDye = max(dye, 0.0);
}
`,ae=h+`
uniform sampler2D uVel, uDye;
uniform vec2 uFrom, uTo;
layout(location = 0) out vec4 oVel;
layout(location = 1) out vec4 oDye;
void main() {
  vec2 o = 0.25 / uTo * step(uTo, uFrom);
  vec2 a = vUv + vec2(-o.x, -o.y), b = vUv + vec2(o.x, -o.y), c = vUv + vec2(-o.x, o.y), d = vUv + vec2(o.x, o.y);
  oVel = (texture(uVel, a) + texture(uVel, b) + texture(uVel, c) + texture(uVel, d)) * 0.25;
  oDye = (texture(uDye, a) + texture(uDye, b) + texture(uDye, c) + texture(uDye, d)) * 0.25;
}
`,oe=h+b+`
uniform sampler2D uVel, uP;
uniform float uExpand, uRetain;
out vec4 oP;
void main() {
  vec2 w = worldOf(vUv);
  float h = uCell;
  vec4 c = texture(uVel, vUv);
  float div = (texture(uVel, uvOf(w + vec2(h, 0))).x - texture(uVel, uvOf(w - vec2(h, 0))).x + texture(uVel, uvOf(w + vec2(0, h))).y - texture(uVel, uvOf(w - vec2(0, h))).y) / (2.0 * h) - c.z * uExpand;
  float p = texture(uP, vUv).r, sum = 0.0;
  vec2 dirs[4] = vec2[](vec2(h, 0), vec2(-h, 0), vec2(0, h), vec2(0, -h));
  // A wall next door counts as this cell's own pressure, so nothing flows through it. Past the edge of the picture is open
  // air, at no pressure, so the flow leaves through it as freely as it moves inside.
  for (int k = 0; k < 4; k++) {
    vec2 n = w + dirs[k], u = uvOf(n);
    bool out_ = u.x < 0.0 || u.y < 0.0 || u.x > 1.0 || u.y > 1.0;
    sum += out_ ? 0.0 : airOpen(n) > 0.5 ? texture(uP, u).r : p;
  }
  oP = vec4((sum - div * h * h) * 0.25 * uRetain, 0, 0, 1);
}
`,se=h+b+v+y+`
uniform sampler2D uVel, uDye;
uniform float uExtinction, uDepth;
uniform vec2 uOrigin;
out vec4 oLit;
float thicknessAt(vec2 w) {
  vec2 u = uvOf(w);
  return u.x < 0.0 || u.y < 0.0 || u.x > 1.0 || u.y > 1.0 ? 0.0 : texture(uDye, u).a;
}
// How much light gets through smoke this thick. Smoke scatters light on as well as stopping it, so a thick cloud isn't black
// inside: Wrenninge's octaves, each scattering further and dimming less.
float passes(float tau) { return (exp(-tau) + 0.5 * exp(-0.5 * tau) + 0.25 * exp(-0.25 * tau)) / 1.75; }
// How much of what comes from \`to\` gets through to \`w\`.
float through(vec2 w, vec2 to) {
  vec2 d = to - w;
  float len = length(d), tau = 0.0, ds = len / 10.0;
  for (int i = 1; i <= 10; i++) tau += thicknessAt(w + d * (float(i) - 0.5) / 10.0) * ds;
  return passes(tau * uExtinction / uDepth);
}
void main() {
  vec2 w = worldOf(vUv), pw = w + uOrigin;
  float reach = 0.3 * max(span().x, span().y);
  // From all round, eight ways: the room's light, and what the plume's own heat gives off along each way in.
  float open = 0.0;
  vec3 fire = vec3(0);
  for (int k = 0; k < 8; k++) {
    float a = float(k) * 0.7853982 + 0.39;
    vec2 dir = vec2(cos(a), sin(a));
    float tau = 0.0, ds = reach / 8.0;
    for (int i = 0; i < 8; i++) {
      vec2 at = w + dir * (float(i) + 0.5) * ds;
      vec2 u = uvOf(at);
      if (u.x < 0.0 || u.y < 0.0 || u.x > 1.0 || u.y > 1.0) break;
      float th = texture(uDye, u).a * ds * uExtinction / uDepth;
      // Fire seen from here: as bright as it's hot, as much of it as is thick enough to glow, dimmed by what's between.
      fire += hotLight(texture(uVel, u).z) * (1.0 - exp(-th)) * passes(tau);
      tau += th;
    }
    open += passes(tau);
  }
  open /= 8.0;
  fire /= 8.0;
  // The page's own light comes from behind as much as from the side, so only part of it is shaded. Its side comes from the way
  // the page is brighter.
  vec3 page = shineAt(pw);
  vec2 g = vec2(dot(shineAt(pw + vec2(0.04, 0)) - shineAt(pw - vec2(0.04, 0)), vec3(1)), dot(shineAt(pw + vec2(0, 0.04)) - shineAt(pw - vec2(0, 0.04)), vec3(1)));
  float side = length(g) > 1e-4 ? through(w, w + normalize(g) * reach) : open;
  vec3 l = uAmbient * open + page * mix(side, 1.0, 0.35);
  for (int i = 0; i < 8; i++) {
    if (i >= uLightCount) break;
    vec4 a = uLightAt[i];
    vec2 at = a.xy - uOrigin;
    float d = distance(pw, a.xy) / max(a.z, 1e-3);
    l += uLightColor[i] / (1.0 + d * d * 4.0) * through(w, at);
  }
  oLit = vec4(l + fire, 1.0);
}
`,ce=h+b+_+y+`
uniform sampler2D uVel, uDye, uLit, uNoise;
uniform float uTime, uExtinction, uPixel;
// How many octaves of detail below the cells this device draws.
uniform int uOctaves;
// Where the plume's box sits on the page, metres from its top left.
uniform vec2 uOrigin;
// Which of the box's edges fade, left right top bottom: not those on the screen's own edge, which cuts it there anyway.
uniform vec4 uFade;
// On the stage: how high what's under each pixel stands, mm, and how high the plume is held, from its foot to its top, and
// whether it's held at all. What stands prouder than its top hides it; what stands within it hides the part below.
uniform sampler2D uHeights;
uniform vec2 uViewPx;
uniform vec3 uSlab;
out vec4 oColor;
vec4 flowDetail(vec2 w, vec2 v, float t) {
  vec4 sum = vec4(0);
  for (int k = 0; k < 2; k++) {
    float phase = fract(t * 0.5 + float(k) * 0.5);
    float weight = 1.0 - abs(phase * 2.0 - 1.0);
    vec2 p = w - v * phase * 2.0 + float(k) * 37.3;
    sum += vec4(crumple(p * 4.0), valueNoise(p * 9.0 + 5.0) * 0.6 + valueNoise(p * 23.0 + 2.0) * 0.4, valueNoise(p * 4.0 + 17.0), valueNoise(p * 4.0 + 53.0)) * weight;
  }
  return vec4(sum.xy, (sum.zw - 0.5) * 0.035);
}
// What the cells can't hold: eddies from two cells across down to the pixel, each half the last, carried by the flow and turning
// over faster the smaller they are, as eddies do (Kolmogorov: in time as size to the two thirds). Each fades out as it falls
// below a couple of pixels, so it neither blurs nor shimmers. xy: how far it moves what's seen, metres. z: where in a cell its smoke
// lies, 0 to 1, evenly spread so a cell covered a third is covered a third. w: how much room the zoom leaves for it, 0 to 1.
vec4 cellDetail(vec2 w, vec2 v, float t) {
  vec2 warp = vec2(0);
  float fold = 0.0, total = 0.0, there = 0.0, size = 2.0 * uCell;
  for (int o = 0; o < 5; o++) {
    if (o >= uOctaves) break;
    float a = smoothstep(1.5, 4.0, size / uPixel);
    if (a <= 0.0) break;
    float turn = 2.0 * pow(size / (0.25 * max(span().x, span().y)), 0.667);
    vec2 d = vec2(0);
    float f = 0.0;
    for (int k = 0; k < 2; k++) {
      float phase = fract(t / turn + float(k) * 0.5 + float(o) * 0.37), weight = 1.0 - abs(phase * 2.0 - 1.0);
      vec2 p = (w - v * phase * turn) / size + float(k) * 19.1 + float(o) * 7.3;
      // Value noise read from a tile of random values, three at once: two for the way it moves, one for the fold.
      vec3 n = texture(uNoise, p / 128.0).rgb - 0.5;
      d += n.xy * weight;
      f += n.z * weight;
    }
    warp += d * size * 0.45 * a;
    fold += f * a * pow(0.6, float(o));
    total += a * a * pow(0.36, float(o));
    there = max(there, a);
    size *= 0.5;
  }
  // The octaves add up to something about normal; through its distribution it's even from 0 to 1. Two phases blended at about
  // 0.7 each and value noise's own spread give about 0.2 of spread for each octave.
  float sd = 0.2 * sqrt(max(total, 1e-6));
  return vec4(warp, 0.5 + 0.5 * tanh(fold / sd * 0.8), there);
}
void main() {
  // The grid runs down the page, as the page does; the canvas runs up.
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y), w = worldOf(uv);
  vec4 flow = texture(uVel, uv);
  // Detail at the size of the plume, whatever that is: a wisp off a lamp creases at millimetres, a sheet of dust at centimetres.
  float scale = 0.25 / max(span().x, span().y);
  vec4 fine = flowDetail((w + uOrigin) * scale, flow.xy * scale, uTime);
  vec2 base = w + fine.zw / scale;
  vec4 dye = texture(uDye, uvOf(base));
  // A cell holds how much smoke is in it, not where. Smoke has edges, so where the cells show a front, a cell thinner than smoke
  // gets is read as how much of it the smoke covers, and the noise below the cells says which part: as much in all, edges as
  // sharp as the pixel. Smooth smoke inside stays smooth, thin wisps stay soft, and an edge is steepened, not cut, as smoke mixes
  // into the air over a little way, not at a line. Only fronts need it, so only fronts pay for it.
  float hc = uCell;
  float front = abs(texture(uDye, uvOf(base + vec2(hc, 0))).a - texture(uDye, uvOf(base - vec2(hc, 0))).a) + abs(texture(uDye, uvOf(base + vec2(0, hc))).a - texture(uDye, uvOf(base - vec2(0, hc))).a);
  float edgy = smoothstep(0.15, 0.5, front / (dye.a + 0.15)) * smoothstep(0.02, 0.3, dye.a + front);
  vec4 sub = edgy > 0.0 && uOctaves > 0 ? cellDetail(w + uOrigin, flow.xy, uTime) : vec4(0, 0, 0.5, 0);
  vec2 seen = base + sub.xy * edgy;
  if (edgy > 0.0) dye = texture(uDye, uvOf(seen));
  // Creases where it's thin, smooth where it's thick.
  float fold = mix(mix(0.6 + 0.8 * fine.x, 0.5 + 1.0 * fine.y, flow.w), 1.0, smoothstep(0.6, 2.5, dye.a));
  float thick = dye.a * fold;
  float full = 0.9, e = thick / full - sub.z, aa = max(fwidth(e), 0.35);
  thick = mix(thick, thick < full ? full * clamp(e / aa * 0.5 + 0.5, 0.0, 1.0) : thick, sub.w * edgy * smoothstep(0.02, 0.3, thick));
  vec3 tint = dye.rgb / max(dye.a, 1e-4);
  float through = exp(-thick * uExtinction);
  // What it scatters of the light that got in, and what it gives off for being hot: soot glows as thick as it is.
  vec3 scatter = tint * (1.0 - through) * texture(uLit, uvOf(seen)).rgb;
  // Too bright for the room's exposure goes to white, as a flame's core does, not to a flat plateau of its colour.
  vec3 glow = 1.0 - exp(-hotLight(flow.z * (0.75 + 0.5 * fine.y)) * (1.0 - through));
  // The box's edges fade out, so no plume is ever seen to stop at a line.
  vec4 near = vec4(uv.x, 1.0 - uv.x, uv.y, 1.0 - uv.y) + (1.0 - uFade);
  float edge = smoothstep(0.0, 0.3, min(near.x, near.y)) * smoothstep(0.0, 0.16, min(near.z, near.w));
  float shown = 1.0;
  if (uSlab.z > 0.5) shown = clamp((uSlab.y - texture(uHeights, gl_FragCoord.xy / uViewPx).r) / max(uSlab.y - uSlab.x, 1e-3), 0.0, 1.0);
  oColor = vec4(scatter + glow, 1.0 - through) * edge * shown;
}
`,le=h+_+v+`
uniform float uTime, uHaze;
// Where it's drawn on the page, metres: its corner and size.
uniform vec4 uView;
out vec4 oColor;
void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y), w = uView.xy + uv * uView.zw;
  float t = uTime;
  // Layers at 30, 12 and 5 cm, each drifting its own way and rising a little, as warm air off the equipment does.
  vec2 drift = vec2(0.0, t * 0.012);
  float n = valueNoise(w * 3.3 + vec2(t * 0.021, 0) + drift * 3.3) * 0.5
          + valueNoise(w * 8.0 + vec2(-t * 0.035, 3.1) + drift * 8.0) * 0.3
          + crumple(w * 6.0 + vec2(t * 0.05, -t * 0.03)) * 0.35;
  float d = uHaze * (0.25 + n * n * 1.1);
  // Haze is thin: the room's general light only lifts it a little, where a screen or lamp right behind it lights it up.
  oColor = vec4((roomLight(w) - uAmbient * 0.85) * d, d * 0.04);
}
`,S=`#version 300 es
in vec4 aSpark;
in vec2 aShape;
in vec3 aLight;
uniform vec2 uSpan;
out vec2 vAt;
out vec2 vShape;
out vec3 vLight;
out float vY;
void main() {
  vAt = aSpark.zw;
  vY = aSpark.y;
  vShape = aShape;
  vLight = aLight;
  gl_Position = vec4(aSpark.x / uSpan.x * 2.0 - 1.0, 1.0 - aSpark.y / uSpan.y * 2.0, 0.0, 1.0);
}
`,ue=`#version 300 es
precision highp float;
in vec2 vAt;
in vec2 vShape;
in vec3 vLight;
in float vY;
// Where the floor is, device px: a streak that bounced doesn't show the part of it that went under.
uniform float uFloor;
out vec4 oColor;
void main() {
  if (vY > uFloor + 0.5) discard;
  // How far from the line it draws, device px.
  float d = length(vec2(vAt.x - clamp(vAt.x, 0.0, vShape.x), vAt.y)), r = vShape.y;
  // The drop covers what it covers, however bright: saturating mustn't fatten it. Round it, the lens's glare: a spread a pixel
  // wide at its heart and falling off as the square, carrying a share of all the light the drop gives, faint enough that only a
  // very hot spark's reaches past the drop.
  float core = clamp(r + 0.5 - d, 0.0, 1.0), glare = 0.003 * r * r / (d * d + 1.0) * (1.0 - smoothstep(${6 .toFixed(1)}, ${10 .toFixed(1)}, d));
  oColor = vec4(1.0 - exp(-vLight * (core + glare)), 0.0);
}
`,de=`#version 300 es
precision highp float;
uniform sampler2D uH;
uniform vec4 uToMap;
uniform float uRows, uFace;
uniform int uFlat;
out vec4 o;
void main() {
  vec2 px = vec2(gl_FragCoord.x, uRows - gl_FragCoord.y), m = px * uToMap.xy + uToMap.zw;
  if (any(lessThan(m, vec2(0))) || any(greaterThan(m, vec2(1)))) discard;
  float h = uFlat == 1 ? uFace : texture(uH, m).r;
  if (h <= 0.0) discard;
  o = vec4(h, 0, 0, 1);
}
`,C=h+b+`
uniform sampler2D uVel, uHeights;
uniform vec2 uViewPx;
uniform vec3 uSlab;
uniform vec4 uFade;
out vec4 oBend;
// How much denser than the room the air here is, less one: as the room's temperature over its own.
float denser(vec2 uv) { return 295.0 / (295.0 + max(texture(uVel, uv).z, 0.0) * 450.0) - 1.0; }
void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y), ex = vec2(uCell / span().x, 0), ey = vec2(0, uCell / span().y);
  // Its slope across and down the page, per mm.
  vec2 g = vec2(denser(uv + ex) - denser(uv - ex), denser(uv + ey) - denser(uv - ey)) / (2.0 * uCell) * 0.001;
  float h = texture(uHeights, gl_FragCoord.xy / uViewPx).r, deep = uSlab.y - uSlab.x;
  // Held at a height, or lying on what's under it.
  float foot = uSlab.z > 0.5 ? uSlab.x : h, top = foot + deep, lo = max(foot, h);
  float through = top > lo ? 0.5 * ((top - h) * (top - h) - (lo - h) * (lo - h)) : 0.0;
  vec4 near = vec4(uv.x, 1.0 - uv.x, uv.y, 1.0 - uv.y) + (1.0 - uFade);
  float edge = smoothstep(0.0, 0.3, min(near.x, near.y)) * smoothstep(0.0, 0.16, min(near.z, near.w));
  oBend = vec4(${m} * g * through * edge, 0, 0);
}
`,fe=h+`
uniform sampler2D uHeights;
uniform vec2 uViewPx;
uniform float uMmPerPx;
// Each look: where it went off, css px from the stage's corner, how far its front has gone, mm, and how much denser it is
// there; then how thick its shell is, mm, and its share of the shutter.
uniform vec4 uShock[16];
uniform vec2 uShockShell[16];
uniform int uShockCount;
out vec4 oBend;
float heightAt(vec2 px) { return texture(uHeights, vec2(px.x, uViewPx.y - px.y) / uViewPx).r; }
float denser(float r, float R, float A, float th) {
  float w = 0.25 * th;
  return r > R + w ? 0.0 : A * exp(-max(R - r, 0.0) / th) * (1.0 - smoothstep(R - w, R + w, r));
}
// How much denser the air is along a line of sight s mm from where it went off, times its height over what's seen there, mm².
// Only where the shell is: further in it's thinned to nothing.
float column(float s, float h, float zc, float R, float A, float th) {
  float rin = max(R - 6.0 * th, 0.0), rout = R + 0.25 * th;
  if (s >= rout) return 0.0;
  float lo = max(max(h, zc), zc + sqrt(max(rin * rin - s * s, 0.0))), hi = zc + sqrt(rout * rout - s * s);
  if (hi <= lo) return 0.0;
  float dz = (hi - lo) / 24.0, sum = 0.0;
  for (int k = 0; k < 24; k++) {
    float z = lo + (float(k) + 0.5) * dz;
    sum += denser(length(vec2(s, z - zc)), R, A, th) * (z - h);
  }
  return sum * dz;
}
void main() {
  vec2 px = vec2(gl_FragCoord.x, uViewPx.y - gl_FragCoord.y), d = vec2(0);
  float h = heightAt(px);
  for (int i = 0; i < 16; i++) {
    if (i >= uShockCount) break;
    vec4 a = uShock[i];
    vec2 b = uShockShell[i], q = (px - a.xy) * uMmPerPx;
    float s = length(q);
    if (s > a.z + b.x || s < 1e-3) continue;
    float zc = heightAt(a.xy), e = max(0.25 * b.x, 0.01);
    float g = (column(s + e, h, zc, a.z, a.w, b.x) - column(max(s - e, 0.0), h, zc, a.z, a.w, b.x)) / (2.0 * e);
    d += ${m} * g * q / s * b.y;
  }
  oBend = vec4(d, 0, 0);
}
`,w=.001,pe=80,me={steel:{rho:7800,c:500,e:.8,burns:49e5},copper:{rho:8900,c:385,e:.6,burns:0}},T={rho:1.2,nu:15e-6,k:.026,kelvin:295,oxygenDiffusion:2e-5,oxygen:.23},he=343,E=1.4,ge=4184e3,_e=e=>808*(1+(e/4.5)**2)/Math.sqrt((1+(e/.048)**2)*(1+(e/.32)**2)*(1+(e/1.35)**2)),ve=e=>980*(1+(e/.54)**10)/((1+(e/.02)**3)*(1+(e/.74)**6)*Math.sqrt(1+(e/6.9)**2)),ye=e=>he*Math.sqrt(1+2.4/(2*E)*e),be=e=>(1+2.4/(2*E)*e)/(1+.3999999999999999/(2*E)*e)-1,xe=128,Se=3.49,Ce=5.670374e-8,we=9.81,Te=we*450/T.kelvin,Ee=1/120,De=9,D={short:64,long:128,most:320,fewest:24,regrid:1.3},O=[{pixels:6e5,octaves:0,cells:5e4},{pixels:13e5,octaves:0,cells:1e5},{pixels:29e5,octaves:3,cells:16e4},{pixels:42e5,octaves:5,cells:16e4}],Oe=2,k={mixing:.6,vorticity:22,swirl:.35,flicker:1.6,drag:.35,heatLife:.8,expand:.6,retain:.98,extinction:1.6,depth:.25,sweeps:12};function A(e={}){let s=e.parent??document.body,c=matchMedia(`(prefers-reduced-motion: reduce)`).matches,l=document.createElement(`canvas`);Object.assign(l.style,{position:`fixed`,inset:`0`,width:`100%`,height:`100%`,pointerEvents:`none`,zIndex:String(e.zIndex??10)}),l.setAttribute(`aria-hidden`,`true`);let u=l.getContext(`webgl2`,{premultipliedAlpha:!0,alpha:!0,antialias:!1,depth:!1,stencil:!1}),d=!!u&&!!u.getExtension(`EXT_color_buffer_float`)&&!c,f=u,p=!1,m=new Set,h=[],_=0,v=()=>{},y=!1,b=[],E=()=>typeof e.scale==`function`?e.scale():e.scale??4,A=e=>{if(Array.isArray(e))return e;let t=e.getBoundingClientRect();return[t.left+t.width/2,t.top+t.height/2]},ke=e=>{let[t,n]=A(e.at),r=E(),[i,a]=e.anchor??[.5,1],o=e.size[0]*r,s=e.size[1]*r;return[t-i*o,n-a*s,o,s]},Ae=!0,j=()=>{d&&(p?y||(y=!0,queueMicrotask(()=>(y=!1,o()))):_||=requestAnimationFrame(()=>v()))},je=e=>{},Me=0,Ne=0,M=new Set,Pe=[],N=0,Fe=e.draught??.1,Ie=e.white??120,Le=e=>{if(e.color)return e.color;let t=ee(e.kelvin??2856),n=.2126*t[0]+.7152*t[1]+.0722*t[2],r=e.radius*w,i=4*(e.candela??0)/(r*r*Math.PI*Ie)/n;return[t[0]*i,t[1]*i,t[2]*i]},Re=e=>{let r=E();for(let n of M){let i=Number.isFinite(n.seconds)?Math.exp(-(e-n.from)/n.seconds):1;if(i<.01){n.on?.remove(),M.delete(n);continue}let a={at:n.l.at,reach:n.l.radius*r,color:Le(n.l).map(e=>e*i)};n.on?n.on.set(a):n.on=t(a)}return n().map(e=>({at:e.at,radius:e.kind===`beam`?pe:e.reach/r,color:e.color}))},ze={get haze(){return Me},set haze(e){Me=Math.max(0,e),Me>0&&j()},ambient:[.05,.05,.05],light(e,t=1/0){let n={l:{...e},from:performance.now()/1e3,seconds:t,on:null};return M.add(n),j(),{set:e=>void Object.assign(n.l,e),remove:()=>{n.on?.remove(),M.delete(n)}}},stir(e){Ne+=Math.max(0,e),j()},get quality(){return P},get scale(){return E()},plume(e){let t={o:e,fed:new Set,box:ke(e),at:E(),grid:null,quietSince:-1/0,time:0};return m.add(t),{add(e){let n={s:{...e}};return t.fed.add(n),t.quietSince=-1/0,j(),{set:e=>void Object.assign(n.s,e),remove:()=>void t.fed.delete(n)}},puff(e,n){let r=performance.now()/1e3;t.fed.add({s:{...e},from:r,until:r+n}),t.quietSince=-1/0,j()},remove(){t.grid&&je(t.grid),m.delete(t)}}},sparks(e,t,n={}){if(!d)return;let[r,i]=A(e),a=(n.speed??3e3)*w,o=(n.toward??0)*Math.PI/180,s=(n.spread??360)*Math.PI/180,c=me[n.metal??`steel`],l=n.kelvin??2100;for(let e=0;e<t;e++){let e=o+(Math.random()-.5)*s,t=a*Math.exp((Math.random()+Math.random()+Math.random()-1.5)*1.2),u=(n.size??.25)*w*Math.exp((Math.random()+Math.random()+Math.random()-1.5)*.7);h.push({x:r,y:i,vx:Math.sin(e)*t,vy:-Math.cos(e)*t,d:u,t:l*(.9+Math.random()*.15),m:c,resting:!1,fuel:1})}h.length>2e3&&h.splice(0,h.length-2e3),j()},shock(e,t){if(!d||!(t>0))return;let[n,r]=A(e),i=Math.cbrt(2*t/ge),a=new Float64Array(xe),o=new Float64Array(xe),s=e=>1/ye(_e(a[e]/i));for(let e=0;e<xe;e++)a[e]=i*.05*2e3**(e/127),o[e]=e?o[e-1]+(a[e]-a[e-1])*.5*(s(e-1)+s(e)):a[0]*s(0);b.push({x:n,y:r,w:i,r:a,t:o,from:performance.now()/1e3}),j()},sample(e,t){if(!d||!p||!Y)return null;let n=Y,r=Math.floor(e-I.x),i=n.h-1-Math.floor(t-I.y),a=new Float32Array(4);if(r<0||i<0||r>=n.w||i>=n.h)return null;let o=e=>(f.bindFramebuffer(f.FRAMEBUFFER,e),f.readPixels(r,i,1,1,f.RGBA,f.FLOAT,a),[a[0],a[1]]),s=o(n.fbo)[0],c=o(n.bent);return f.bindFramebuffer(f.FRAMEBUFFER,null),{height:s,bend:c}},stop(){for(let e of M)e.on?.remove();M.clear(),cancelAnimationFrame(_),_=0,removeEventListener(`resize`,F),l.remove(),Be()}},Be=()=>{},Ve=1,P=Math.max(0,Math.min(O.length-1,Math.round(e.quality??O.length-1))),F=()=>{p||(Ve=Math.min(devicePixelRatio||1,Math.sqrt(O[P].pixels/(innerWidth*innerHeight))),l.width=Math.round(innerWidth*Ve),l.height=Math.round(innerHeight*Ve),I={x:0,y:0,w:innerWidth,h:innerHeight,ratio:Ve});for(let e of m)e.box=ke(e.o),e.at=E();j()},I={x:0,y:0,w:innerWidth,h:innerHeight,ratio:1};if(!d)return ze;a()||s.append(l);let He=(e,t)=>{let n=f.createShader(e);if(f.shaderSource(n,t),f.compileShader(n),!f.getShaderParameter(n,f.COMPILE_STATUS))throw Error(`air: ${f.getShaderInfoLog(n)}`);return n},L=(e,t)=>{let n=f.createProgram();if(f.attachShader(n,He(f.VERTEX_SHADER,e)),f.attachShader(n,He(f.FRAGMENT_SHADER,t)),f.bindAttribLocation(n,0,`aPos`),f.linkProgram(n),!f.getProgramParameter(n,f.LINK_STATUS))throw Error(`air: ${f.getProgramInfoLog(n)}`);let r=new Map;return{p:n,u:e=>r.has(e)?r.get(e):r.set(e,f.getUniformLocation(n,e)).get(e)}},R,z,B,V,H,U,W,G,K,q,J,Ue,We,Ge,Ke,qe,Je,Y=null,Ye=()=>{R=L(g,ae),z=L(g,x),B=L(g,oe),V=L(g,se),H=L(re,ce),U=L(g,le),W=L(S,ue),G=L(re,de),K=L(re,C),q=L(g,fe),J=f.createVertexArray(),f.bindVertexArray(J),f.bindBuffer(f.ARRAY_BUFFER,f.createBuffer()),f.bufferData(f.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),f.STATIC_DRAW),f.enableVertexAttribArray(0),f.vertexAttribPointer(0,2,f.FLOAT,!1,0,0),We=f.createBuffer(),Ue=f.createVertexArray(),f.bindVertexArray(Ue),f.bindBuffer(f.ARRAY_BUFFER,We);let e=f.getAttribLocation(W.p,`aSpark`),t=f.getAttribLocation(W.p,`aShape`),n=f.getAttribLocation(W.p,`aLight`);f.enableVertexAttribArray(e),f.vertexAttribPointer(e,4,f.FLOAT,!1,36,0),f.enableVertexAttribArray(t),f.vertexAttribPointer(t,2,f.FLOAT,!1,36,16),f.enableVertexAttribArray(n),f.vertexAttribPointer(n,3,f.FLOAT,!1,36,24),f.bindVertexArray(null),Ge=X(320,1,f.RGBA32F,f.NEAREST,Ze,f.FLOAT),Ke=X(1,1,f.RGBA8,f.LINEAR,new Uint8Array(4),f.UNSIGNED_BYTE),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MIN_FILTER,f.LINEAR_MIPMAP_LINEAR),qe=X(128,128,f.RGBA8,f.LINEAR,Uint8Array.from({length:65536},()=>Math.random()*256),f.UNSIGNED_BYTE),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_S,f.REPEAT),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_T,f.REPEAT),Je=X(64,1,f.RGBA16F,f.LINEAR,ne(64,798,ie,Ie),f.FLOAT),Q=null,Y=null},Xe=()=>{for(let e of m)e.grid&&=(je(e.grid),null);for(let e of[R,z,B,V,H,U,W,G,K,q])f.deleteProgram(e.p);for(let e of[Ge,Ke,qe,Je])f.deleteTexture(e);if(Y){for(let e of[Y.tex,Y.bend])f.deleteTexture(e);for(let e of[Y.fbo,Y.bent])f.deleteFramebuffer(e)}f.deleteVertexArray(J),f.deleteVertexArray(Ue),f.deleteBuffer(We),Ae=!0},X=(e,t,n,r,i=null,a=f.HALF_FLOAT)=>{let o=f.createTexture();return f.bindTexture(f.TEXTURE_2D,o),f.texImage2D(f.TEXTURE_2D,0,n,e,t,0,f.RGBA,a,i),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MIN_FILTER,r),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MAG_FILTER,r),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_S,f.CLAMP_TO_EDGE),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_T,f.CLAMP_TO_EDGE),o},Z=(...e)=>{let t=f.createFramebuffer();return f.bindFramebuffer(f.FRAMEBUFFER,t),e.forEach((e,t)=>f.framebufferTexture2D(f.FRAMEBUFFER,f.COLOR_ATTACHMENT0+t,f.TEXTURE_2D,e,0)),f.drawBuffers(e.map((e,t)=>f.COLOR_ATTACHMENT0+t)),f.clearColor(0,0,0,0),f.clear(f.COLOR_BUFFER_BIT),t},Ze=new Float32Array(1280),Qe=(e,t)=>{let[n,r]=e.o.size,i=n>=r,a=i?t:Math.max(8,Math.round(t*n/r)),o=i?Math.max(8,Math.round(t*r/n)):t,s=n*w/a,c=()=>X(a,o,f.RGBA16F,f.LINEAR),l=[c(),c()],u=[c(),c()],d=[c(),c()],p=c();return{nx:a,ny:o,cell:s,long:t,vel:l,dye:u,p:d,lit:p,step:[Z(l[0],u[0]),Z(l[1],u[1])],press:[Z(d[0]),Z(d[1])],lighting:Z(p),cur:0}},$e=e=>{let t=e.map(e=>{let[t,n]=e.o.size;return Math.min(D.most,Math.max(D.long,D.short*Math.max(t,n)/Math.min(t,n)))}),n=e.reduce((e,n,r)=>e+t[r]**2*Math.min(n.o.size[0],n.o.size[1])/Math.max(n.o.size[0],n.o.size[1]),0),r=Math.min(1,Math.sqrt(O[P].cells/Math.max(n,1)));return t.map(e=>Math.max(D.fewest,Math.round(e*r)))},et=(e,t)=>{let n=e.grid,r=Qe(e,t);f.bindFramebuffer(f.FRAMEBUFFER,r.step[0]),f.viewport(0,0,r.nx,r.ny),f.useProgram(R.p),f.uniform2f(R.u(`uFrom`),n.nx,n.ny),f.uniform2f(R.u(`uTo`),r.nx,r.ny),$(R,`uVel`,0,n.vel[n.cur]),$(R,`uDye`,1,n.dye[n.cur]),f.drawArrays(f.TRIANGLE_STRIP,0,4),je(n),e.grid=r};je=e=>{for(let t of[...e.vel,...e.dye,...e.p,e.lit])f.deleteTexture(t);for(let t of[...e.step,...e.press,e.lighting])f.deleteFramebuffer(t)},addEventListener(`resize`,F),F();let Q=null;Ye();let tt=()=>{let e=i();e!==Q&&(Q=e,f.bindTexture(f.TEXTURE_2D,Ke),e?f.texImage2D(f.TEXTURE_2D,0,f.RGBA8,e.w,e.h,0,f.RGBA,f.UNSIGNED_BYTE,e.data):f.texImage2D(f.TEXTURE_2D,0,f.RGBA8,1,1,0,f.RGBA,f.UNSIGNED_BYTE,new Uint8Array(4)),f.generateMipmap(f.TEXTURE_2D))},nt=e.steam??.6,rt=e=>Math.max(e.o.size[0],e.o.size[1])*w/Fe,it=performance.now()/1e3,at=0,$=(e,t,n,r)=>{f.activeTexture(f.TEXTURE0+n),f.bindTexture(f.TEXTURE_2D,r),f.uniform1i(e.u(t),n)},ot=(e,t)=>{f.uniform2f(e.u(`uCells`),t.nx,t.ny),f.uniform1f(e.u(`uCell`),t.cell),f.uniform1i(e.u(`uBlockCount`),0)},st=e=>{let t=w/E();$(e,`uShine`,4,Ke),f.uniform1f(e.u(`uShineGain`),Q?Q.gain:0),f.uniform1f(e.u(`uShineCell`),Q?Q.cell:1),f.uniform2f(e.u(`uPageSpan`),(Q?Q.w*Q.cell:innerWidth)*t,(Q?Q.h*Q.cell:innerHeight)*t),f.uniform3fv(e.u(`uAmbient`),ze.ambient);let n=Pe.slice(0,8),r=new Float32Array(32),i=new Float32Array(24);n.forEach((e,n)=>{let[a,o]=A(e.at);r.set([a*t,o*t,e.radius*w,0],n*4),i.set(Le(e),n*3)}),f.uniform1i(e.u(`uLightCount`),n.length),f.uniform4fv(e.u(`uLightAt`),r),f.uniform3fv(e.u(`uLightColor`),i)},ct=(e,t)=>{let n=0,r=w/E(),[i,a]=e.box;for(let o of e.fed){if(o.until!==void 0&&t>o.until){e.fed.delete(o);continue}if(n>=64)break;let s=o.s,c=o.until===void 0?1:1-(t-o.from)/(o.until-o.from),[l,u]=A(s.at),d=s.color??[.5,.5,.5];Ze.set([(l-i)*r,(u-a)*r,Math.max(s.radius*w,e.grid.cell*1.6),(s.rate??1)*c,(s.jet?.[0]??0)*w,(s.jet?.[1]??0)*w,(s.heat??0)*c,s.steam??0,d[0],d[1],d[2],s.grip??+!!s.blast,(s.blast??0)*w*c,(s.span?.[0]??0)/2*w,(s.span?.[1]??0)/2*w,(s.angle??0)*Math.PI/180,+!!s.seam,0,0,0],n*20),n++}return f.bindTexture(f.TEXTURE_2D,Ge),f.texSubImage2D(f.TEXTURE_2D,0,0,0,320,1,f.RGBA,f.FLOAT,Ze),n},lt=(e,t,n)=>{let r=e.grid,i=Math.max(1,Math.ceil(t*60)),a=t/i;for(let t=0;t<i;t++){e.time+=a;let t=1-r.cur;f.bindFramebuffer(f.FRAMEBUFFER,r.step[t]),f.viewport(0,0,r.nx,r.ny),f.useProgram(z.p),ot(z,r),$(z,`uVel`,0,r.vel[r.cur]),$(z,`uDye`,1,r.dye[r.cur]),$(z,`uP`,2,r.p[0]),$(z,`uSources`,3,Ge);let i=z.u;f.uniform1f(i(`uDt`),a),f.uniform1f(i(`uTime`),e.time),f.uniform1f(i(`uSourceCount`),n),f.uniform1f(i(`uMixing`),k.mixing),f.uniform1f(i(`uVorticity`),k.vorticity),f.uniform1f(i(`uSwirl`),k.swirl),f.uniform1f(i(`uFlicker`),k.flicker),f.uniform1f(i(`uDrag`),k.drag),f.uniform1f(i(`uHeatLife`),k.heatLife),f.uniform1f(i(`uSmokeLife`),rt(e)),f.uniform1f(i(`uSteamLife`),nt),f.uniform1f(i(`uRise`),Te),f.uniform2f(i(`uWind`),0,0),f.uniform2f(i(`uOrigin`),e.box[0]*w/E(),e.box[1]*w/E()),f.drawArrays(f.TRIANGLE_STRIP,0,4),r.cur=t;let o=2*Math.max(2,Math.round(k.sweeps*r.long/D.long/2));f.useProgram(B.p),ot(B,r),f.uniform1f(B.u(`uExpand`),k.expand),f.uniform1f(B.u(`uRetain`),k.retain),$(B,`uVel`,0,r.vel[r.cur]);for(let e=0;e<o;e++)f.bindFramebuffer(f.FRAMEBUFFER,r.press[(e+1)%2]),$(B,`uP`,1,r.p[e%2]),f.drawArrays(f.TRIANGLE_STRIP,0,4)}},ut=[],dt=O.map(()=>Oe),ft=0,pt=1e3/60,mt=1/0,ht=-1/0,gt=e=>{let t=ut.reduce((e,t)=>e+t,0);if(ut.length<20&&(ut.length<4||t<330))return;let n=e=>[...ut].sort((e,t)=>e-t)[Math.floor(ut.length*e)];pt=Math.min(1e3/60,Math.max(n(.25),4));let r=n(.75)>pt*1.3,i=n(.9)<pt*1.15;ut.length=0,r&&P>0?(e-ht<5&&(dt[P]=Math.min(dt[P]*2,120)),P--,ft=0,F()):i&&P<O.length-1&&(ft+=t/1e3)>=dt[P+1]?(P++,ft=0,ht=e,F()):i||(ft=0)},_t=e=>{let t=e.o.z??0;return[t,t+k.depth*Math.min(e.o.size[0],e.o.size[1])]},vt=(e,t,n,r)=>{let i=e-I.x,a=t-I.y;return[i/I.w*2-1,1-(a+r)/I.h*2,(i+n)/I.w*2-1,1-a/I.h*2]},yt=e=>{let[t,n,r,i]=e.box;return[+(t>I.x),+(t+r<I.x+I.w),+(n>I.y),+(n+i<I.y+I.h)]},bt=(e,t)=>{at+=t,Ne*=Math.exp(-t/(innerHeight/E()*w/Fe)),Ne<.002&&(Ne=0),N=Me+Ne,Pe=Re(e),f.disable(f.BLEND),f.bindVertexArray(J);let n=[];for(let t of m)!t.fed.size&&(t.quietSince===-1/0&&(t.quietSince=e),e-t.quietSince>rt(t)*2.5)||(Math.abs(E()/t.at-1)>.01&&(t.box=ke(t.o),t.at=E()),n.push(t));let r=$e(n);return n.forEach((n,i)=>{let a=r[i];n.grid?(a>n.grid.long*D.regrid||a*D.regrid<n.grid.long)&&et(n,a):n.grid=Qe(n,a),lt(n,t,ct(n,e))}),n},xt=(t,n,r)=>{let i=Math.max(Math.round(I.w*I.ratio),1),a=Math.max(Math.round(I.h*I.ratio),1);if((N>0||t.length)&&tt(),f.enable(f.BLEND),f.blendFunc(f.ONE,f.ONE_MINUS_SRC_ALPHA),f.bindVertexArray(J),N>0&&(f.useProgram(U.p),st(U),f.uniform4f(U.u(`uView`),I.x*w/E(),I.y*w/E(),I.w*w/E(),I.h*w/E()),f.uniform1f(U.u(`uTime`),at),f.uniform1f(U.u(`uHaze`),N),f.drawArrays(f.TRIANGLE_STRIP,0,4)),t.length){let e=w/E();f.disable(f.BLEND),f.useProgram(V.p),st(V),$(V,`uBlackbody`,5,Je),f.uniform1f(V.u(`uExtinction`),k.extinction);for(let n of t){let t=n.grid;f.bindFramebuffer(f.FRAMEBUFFER,t.lighting),f.viewport(0,0,t.nx,t.ny),ot(V,t),$(V,`uVel`,0,t.vel[t.cur]),$(V,`uDye`,1,t.dye[t.cur]),f.uniform2f(V.u(`uOrigin`),n.box[0]*e,n.box[1]*e),f.uniform1f(V.u(`uDepth`),k.depth*Math.min(n.box[2],n.box[3])*e),f.drawArrays(f.TRIANGLE_STRIP,0,4)}f.bindFramebuffer(f.FRAMEBUFFER,null),f.viewport(0,0,i,a),f.enable(f.BLEND),f.blendFunc(f.ONE,f.ONE_MINUS_SRC_ALPHA),f.useProgram(H.p),$(H,`uHeights`,7,r??qe),f.uniform2f(H.u(`uViewPx`),i,a),$(H,`uBlackbody`,5,Je),$(H,`uNoise`,6,qe),f.uniform1f(H.u(`uExtinction`),k.extinction);for(let n of t){let t=n.grid,[i,a,o,s]=n.box;ot(H,t),$(H,`uVel`,0,t.vel[t.cur]),$(H,`uDye`,1,t.dye[t.cur]),$(H,`uLit`,2,t.lit),f.uniform1f(H.u(`uTime`),n.time),f.uniform1f(H.u(`uPixel`),e/I.ratio);let[c,l]=_t(n);f.uniform3f(H.u(`uSlab`),c,l,r&&n.o.z!==void 0?1:0),f.uniform1i(H.u(`uOctaves`),O[P].octaves),f.uniform2f(H.u(`uOrigin`),i*e,a*e),f.uniform4f(H.u(`uFade`),...yt(n)),f.uniform4f(H.u(`uRect`),...vt(i,a,o,s)),f.drawArrays(f.TRIANGLE_STRIP,0,4)}}if(h.length){let t=E()/w,r=(typeof e.floor==`function`?e.floor():e.floor)??innerHeight,o=new Float32Array(h.length*6*De),s=0;for(let e=h.length-1;e>=0;e--){let i=h[e],a=Math.hypot(i.vx,i.vy),c=i.m.rho*Math.PI*i.d**3/6,l=Math.PI*i.d*i.d,u=(i.t+T.kelvin)/2/T.kelvin,d=T.rho/u,f=T.nu*u**1.7,p=T.k*u**.8,ne=.5*d*.47*(l/4)*a/c;i.vx-=i.vx*ne*n,i.vy-=i.vy*ne*n-(i.resting?0:we*n);let m=2+.6*Math.sqrt(a*i.d/f)*.89,g=l*(m*p/i.d*(i.t-T.kelvin)+i.m.e*Ce*(i.t**4-T.kelvin**4))*(i.resting?4:1),re=i.m.burns&&!i.resting&&i.fuel>0?l*(m*T.oxygenDiffusion*u**1.75/i.d)*d*T.oxygen*Se*i.m.burns:0;if(i.fuel-=re/i.m.burns/c*n,i.t-=(g-re)/(c*i.m.c)*n,i.t<798||i.y>innerHeight+50||i.x<-50||i.x>innerWidth+50){h.splice(e,1);continue}let _=[i.x,i.y];i.x+=i.vx*t*n,i.y+=i.vy*t*n,i.y>r&&_[1]<=r+1&&(i.y=r,i.vy>.25?(i.vy*=-.3,i.vx*=.7):(i.vy=0,i.resting=!0)),i.resting&&(i.vx*=Math.exp(-n*.4*we/Math.max(Math.abs(i.vx),.05)));let v=I.ratio,ie=Math.hypot(i.vx,i.vy),y=i.d*t*v/2,b=Math.max(y,.5),x=ie*Ee*t*v,ae=2*b*x+Math.PI*(b*b+1/12),oe=ee(i.t),se=Math.PI*y*y/ae*(i.m.e*te(i.t)/Ie),ce=ie>1e-4?i.vx/ie:1,le=ie>1e-4?i.vy/ie:0,S=b+10,ue=(i.x-I.x)*v,de=(i.y-I.y)*v,C=(e,t)=>o.set([ue+ce*(e-x)-le*t,de+le*(e-x)+ce*t,e,t,x,b,oe[0]*se,oe[1]*se,oe[2]*se],s++*De);C(-S,S),C(-S,-S),C(x+S,S),C(x+S,S),C(-S,-S),C(x+S,-S)}f.blendFunc(f.ONE,f.ONE),f.useProgram(W.p),f.uniform2f(W.u(`uSpan`),i,a),f.uniform1f(W.u(`uFloor`),(r-I.y)*I.ratio),f.bindVertexArray(Ue),f.bindBuffer(f.ARRAY_BUFFER,We),f.bufferData(f.ARRAY_BUFFER,o.subarray(0,s*De),f.DYNAMIC_DRAW),f.drawArrays(f.TRIANGLES,0,s)}f.disable(f.BLEND),f.bindVertexArray(null)},St=e=>N>0||M.size>0||e.length>0||h.length>0||b.length>0,Ct=()=>{let t=performance.now()/1e3,n=Math.min(t-it,.1),r=(t-it)*1e3;return Ae&&=(mt=t,!1),e.quality===void 0&&t-mt>1&&(ut.push(r),gt(t)),it=t,{now:t,dt:n}};v=()=>{if(_=0,p)return;let{now:e,dt:t}=Ct(),n=bt(e,t);f.bindFramebuffer(f.FRAMEBUFFER,null),f.viewport(0,0,l.width,l.height),f.clearColor(0,0,0,0),f.clear(f.COLOR_BUFFER_BIT),b.length=0,xt(n,t,null),St(n)?j():Ae=!0};let wt=null,Tt=e=>{Xe(),cancelAnimationFrame(_),_=0,p=!!e,f=e??u,e?l.remove():s.append(l),Ye(),F()},Et=(e,t)=>{if(Y&&Y.w===e&&Y.h===t)return Y;if(Y){for(let e of[Y.tex,Y.bend])f.deleteTexture(e);for(let e of[Y.fbo,Y.bent])f.deleteFramebuffer(e)}let n=X(e,t,f.RGBA16F,f.LINEAR),r=X(e,t,f.RGBA16F,f.LINEAR);return Y={w:e,h:t,tex:n,fbo:Z(n),bend:r,bent:Z(r)}},Dt=(e,t)=>{let{r:n,t:r,w:i}=e,a;if(t<=r[0])a=n[0]*(t/r[0])**.4;else if(t>=r[127])a=n[127]+he*(t-r[127]);else{let e=0,i=127;for(;i-e>1;){let n=e+i>>1;r[n]<=t?e=n:i=n}a=n[e]+(n[i]-n[e])*(t-r[e])/(r[i]-r[e])}let o=a/i,s=_e(o);return[a/w,be(s),.5*ye(s)*ve(o)*i/1e3/w]},Ot=(e,t)=>{let n=Y,r=1/E(),i=Math.hypot(I.w,I.h)*r,a=[];for(let e=b.length-1;e>=0;e--){let n=b[e],o=t-n.from,s=!1;for(let e=0;e<4;e++){let t=o-Ee*(e+.5)/4;if(t<=0)continue;let[c,l,u]=Dt(n,t),d=n.x-I.x,f=n.y-I.y;l<1e-5||c-8*u>i+Math.hypot(d,f)*r||(s=!0,a.length<96&&a.push(d,f,c,l,u,.25))}!s&&o>Ee&&b.splice(e,1)}let o=e.filter(e=>e.grid);if(f.bindFramebuffer(f.FRAMEBUFFER,n.bent),f.viewport(0,0,n.w,n.h),f.clearColor(0,0,0,0),f.clear(f.COLOR_BUFFER_BIT),!a.length&&!o.length)return!1;if(f.enable(f.BLEND),f.blendEquation(f.FUNC_ADD),f.blendFunc(f.ONE,f.ONE),f.bindVertexArray(J),o.length){f.useProgram(K.p),$(K,`uHeights`,3,n.tex),f.uniform2f(K.u(`uViewPx`),n.w,n.h);for(let e of o){let t=e.grid,[n,r,i,a]=e.box,[o,s]=_t(e);ot(K,t),$(K,`uVel`,0,t.vel[t.cur]),f.uniform3f(K.u(`uSlab`),o,s,e.o.z===void 0?0:1),f.uniform4f(K.u(`uFade`),...yt(e)),f.uniform4f(K.u(`uRect`),...vt(n,r,i,a)),f.drawArrays(f.TRIANGLE_STRIP,0,4)}}if(a.length){f.useProgram(q.p),$(q,`uHeights`,3,n.tex),f.uniform2f(q.u(`uViewPx`),n.w,n.h),f.uniform1f(q.u(`uMmPerPx`),r);let e=a.length/6,t=new Float32Array(64),i=new Float32Array(32);for(let n=0;n<e;n++)t.set(a.slice(n*6,n*6+4),n*4),i.set(a.slice(n*6+4,n*6+6),n*2);f.uniform4fv(q.u(`uShock`),t),f.uniform2fv(q.u(`uShockShell`),i),f.uniform1i(q.u(`uShockCount`),e),f.drawArrays(f.TRIANGLE_STRIP,0,4)}return f.disable(f.BLEND),f.bindVertexArray(null),!0};return Be=r({before(e){e.gl!==f&&Tt(e.gl),f.disable(f.SCISSOR_TEST),f.disable(f.DEPTH_TEST),f.disable(f.CULL_FACE),f.blendEquation(f.FUNC_ADD),f.colorMask(!0,!0,!0,!0),I={x:e.left,y:e.top,w:e.w,h:e.h,ratio:e.ratio};let{now:t,dt:n}=Ct(),r=bt(t,n),i=r.length>0||b.length>0;if(wt={live:r,dt:n,deep:i},!i)return null;let a=Et(Math.max(Math.ceil(e.w),1),Math.max(Math.ceil(e.h),1)),o=Ot(r,t);return f.bindFramebuffer(f.FRAMEBUFFER,a.fbo),f.viewport(0,0,a.w,a.h),f.clearColor(0,0,0,0),f.clear(f.COLOR_BUFFER_BIT),o?a.bend:null},shot(e,t){if(t.gl!==f||!wt?.deep||!Y)return;let n=Y;f.bindFramebuffer(f.FRAMEBUFFER,n.fbo),f.viewport(0,0,n.w,n.h),f.enable(f.BLEND),f.blendEquation(f.MAX),f.bindVertexArray(J),f.useProgram(G.p),$(G,`uH`,0,e.height??qe),f.uniform1i(G.u(`uFlat`),+!e.height),f.uniform1f(G.u(`uFace`),e.face),f.uniform4f(G.u(`uToMap`),...e.toMap),f.uniform1f(G.u(`uRows`),n.h);let[r,i,a,o]=e.box;f.uniform4f(G.u(`uRect`),r/n.w*2-1,1-(i+o)/n.h*2,(r+a)/n.w*2-1,1-i/n.h*2),f.drawArrays(f.TRIANGLE_STRIP,0,4),f.blendEquation(f.FUNC_ADD),f.disable(f.BLEND),f.bindVertexArray(null)},after(e){if(e.gl!==f||!wt)return;let{live:t,dt:n,deep:r}=wt;wt=null,xt(t,n,r&&Y?Y.tex:null),St(t)?j():Ae=!0},leave(e){p&&e===f&&Tt(null)}}),ze}var ke=e=>{if(Array.isArray(e))return e;let t=e.getBoundingClientRect();return[t.left+t.width/2,t.top+t.height/2]},Ae=10,j=.1,je=.4,Me=.01,Ne=117e4,M=7800*Math.PI*25e-5**3/6;function Pe(e,t,n,r={}){let i=50*Math.cbrt(n/1e3),a=Ae*n/j/(4*Math.PI),o=e.light({at:ke(t),radius:i,candela:a,kelvin:r.kelvin??6e3});setTimeout(()=>o.remove(),j*1e3),e.shock(t,je*n);let s=r.size??.25,c=Me*n/Ne/(M*(s/.25)**3);c>=1&&e.sparks(t,Math.round(c),{speed:r.speed,toward:r.toward,spread:r.spread??200,size:s})}var N=new WeakMap;function Fe(e,t){let n=Math.min(1,Math.max(0,(t-.05)/.6));if(!n)return;let r=e.scale,i=innerWidth/r,a=innerHeight/r,o=N.get(e);o||N.set(e,o=e.plume({at:[innerWidth/2,0],size:[i,a],anchor:[.5,0]}));for(let e=0;e<Math.round(2+n*5);e++)o.puff({at:[innerWidth*(.05+Math.random()*.9),2],radius:12+n*30,rate:.2+n*.45,steam:.5,jet:[(Math.random()-.5)*60,260+n*380],grip:.5,color:[.6,.55,.48]},.25+n*.5);e.stir(n*.3)}var Ie=.15,Le=1900,Re=.5,ze=2.6,Be=[.85,.83,.8],Ve=[.12,.11,.1],P=(e,t)=>{let n=.235*(e/1e3)**.4,r=Math.min(t/1e3,n/3.02),i=n-1.02*r;return[r*1e3,.4*i*1e3]};function F(e,t,n={}){let r=t.getBoundingClientRect(),i=e.scale,a=[r.width/i,r.height/i],o=n.watts??50,s=P(o,a[0]),c=[r.left+r.width/2,r.top+r.height/2-s[1]/2*i],l=e.plume({at:t,size:[Math.max(220,a[0]*3),560],anchor:[.5,.9]}),u=l.add({at:t,radius:2,span:a,seam:!0,rate:8,heat:Re,color:Be}),d=Ie*o/(4*Math.PI),f=null;return{set(n){let r=n===`flame`;u.set(r?{at:c,span:s,seam:!1,heat:ze,rate:10,radius:3,color:Ve}:{at:t,span:a,seam:!0,heat:Re,rate:8,radius:2,color:Be}),r?f??=e.light({at:c,radius:s[1]*1.25,candela:d,kelvin:Le}):(f?.remove(),f=null)},remove(){f?.remove(),l.remove()}}}function I(e,t,n){let r=e.scale,i=t.map(ke),a=n.slots??3,o=n.speed??.5,[s,c]=n.size,l=i.map(e=>e[0]),u=Math.min(...l),d=Math.max(...l),f=Math.max(...i.map(e=>e[1])),p=e.plume({at:[(u+d)/2,f+c/2*r],size:[(d-u)/r+s*1.5,o*1500+200],anchor:[.5,1]}),ee=c/a;return{blow(e){for(let[t,n]of i)for(let i=0;i<a;i++)p.puff({at:[t,n+(i-(a-1)/2)*ee*r],radius:3,span:[s,ee*.4],rate:3,steam:.85,heat:.17,jet:[0,-o*1e3],grip:.5,blast:60,color:[1,1,1]},e)},remove:()=>p.remove()}}var He=e({air:()=>A,fire:()=>F,impact:()=>Pe,shake:()=>Fe,vent:()=>I});export{I as a,Fe as i,F as n,A as o,Pe as r,He as t};