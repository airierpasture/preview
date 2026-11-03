import"./preload-helper-CJ-RuuQs.js";import"./controls-DmWWBdN9.js";import"./print-DZK4ggvU.js";import"./light-BZbJzKlA.js";import{n as e}from"./sound-eva-DIP_9lVL.js";var t=(e,t,n,r)=>{let i=(e-t)/(e<t?n:r);return Math.exp(-.5*i*i)},n=e=>1.056*t(e,599.8,37.9,31)+.362*t(e,442,16,26.7)-.065*t(e,501.1,20.4,26.2),r=e=>.821*t(e,568.8,46.9,40.5)+.286*t(e,530.9,16.3,31.1),i=e=>1.217*t(e,437,11.8,36)+.681*t(e,459,26,13.8),a=(e,t)=>{let n=e*1e-9,r=662607015e-42,i=299792458;return 2*r*i*i/(n**5*Math.expm1(r*i/(n*1380649e-29*t)))};function o(e){let t=0,o=0,s=0;for(let c=380;c<=780;c+=5){let l=a(c,e)*5e-9;t+=l*n(c),o+=l*r(c),s+=l*i(c)}return[t*683,o*683,s*683]}var s=([e,t,n])=>[3.2406*e-1.5372*t-.4986*n,-.9689*e+1.8758*t+.0415*n,.0557*e-.204*t+1.057*n];function c(e){let t=s(o(e)).map(e=>Math.max(0,e)),n=Math.max(...t);return t.map(e=>e/n)}var l=e=>o(e)[1];function u(e,t,n,r){let i=new Float32Array(e*4);for(let a=0;a<e;a++){let o=t+(n-t)*a/(e-1),s=c(o),u=l(o)/r;i.set([s[0]*u,s[1]*u,s[2]*u,1],a*4)}return i}var d=`#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
`,f=`#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
`,p=`#version 300 es
in vec2 aPos;
uniform vec4 uRect;
out vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(mix(uRect.xy, uRect.zw, vUv), 0.0, 1.0); }
`,m=`
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
`,h=`
uniform sampler2D uShine;
uniform float uShineGain;
uniform vec2 uPageSpan;
uniform vec3 uAmbient;
uniform vec4 uLightAt[8];
uniform vec3 uLightColor[8];
uniform int uLightCount;
// What the page gives off, drawn small and blurred by distance: haze right in front of a screen shows a soft copy of its
// picture, and further off only its colour.
vec3 shineAt(vec2 pw) {
  vec2 uv = pw / uPageSpan;
  return (textureLod(uShine, uv, 1.5).rgb * 0.45 + textureLod(uShine, uv, 3.0).rgb * 0.35 + textureLod(uShine, uv, 5.0).rgb * 0.5) * uShineGain;
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
`,g=3e3,_=`
uniform sampler2D uBlackbody;
vec3 hotLight(float heat) {
  float k = 295.0 + heat * 450.0;
  if (k < 798.0) return vec3(0);
  return texture(uBlackbody, vec2(clamp((k - 798.0) / 2202.0, 0.0, 1.0), 0.5)).rgb;
}
`,v=`
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
`,ee=d+v+m+`
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
    vel.w = (vel.w * dye.a + b.w * add) / max(dye.a + add, 1e-5);
    dye += vec4(c.rgb * add, add);
    // What it puts in is as hot as the source, so the air there comes to that heat as fast as it's fed.
    vel.z = mix(vel.z, max(vel.z, b.z), 1.0 - exp(-f * uDt * 60.0));
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
`,y=d+`
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
`,te=d+v+`
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
`,b=d+v+h+_+`
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
`,x=d+v+m+_+`
uniform sampler2D uVel, uDye, uLit, uNoise;
uniform float uTime, uExtinction, uPixel;
// How many octaves of detail below the cells this device draws.
uniform int uOctaves;
// Where the plume's box sits on the page, metres from its top left.
uniform vec2 uOrigin;
// Which of the box's edges fade, left right top bottom: not those on the screen's own edge, which cuts it there anyway.
uniform vec4 uFade;
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
  oColor = vec4(scatter + glow, 1.0 - through) * edge;
}
`,ne=d+m+h+`
uniform float uTime, uHaze;
out vec4 oColor;
void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y), w = uv * uPageSpan;
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
`,re=`#version 300 es
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
`,C=.001,ie={steel:{rho:7800,c:500,e:.8,burns:49e5},copper:{rho:8900,c:385,e:.6,burns:0}},w={rho:1.2,nu:15e-6,k:.026,kelvin:295,oxygenDiffusion:2e-5,oxygen:.23},ae=3.49,oe=5.670374e-8,se=9.81,ce=se*450/w.kelvin,le=1/120,T=9,E=6,D={short:64,long:128,most:320,fewest:24,regrid:1.3},O=[{pixels:6e5,octaves:0,cells:5e4},{pixels:13e5,octaves:0,cells:1e5},{pixels:29e5,octaves:3,cells:16e4},{pixels:42e5,octaves:5,cells:16e4}],ue=2,k={mixing:.6,vorticity:22,swirl:.35,flicker:1.6,drag:.35,heatLife:.8,expand:.6,retain:.98,extinction:1.6,depth:.25,sweeps:12};function A(e={}){let t=e.parent??document.body,n=matchMedia(`(prefers-reduced-motion: reduce)`).matches,r=document.createElement(`canvas`);Object.assign(r.style,{position:`fixed`,inset:`0`,width:`100%`,height:`100%`,pointerEvents:`none`,zIndex:String(e.zIndex??10)}),r.setAttribute(`aria-hidden`,`true`);let i=r.getContext(`webgl2`,{premultipliedAlpha:!0,alpha:!0,antialias:!1,depth:!1,stencil:!1}),a=!!i&&!!i.getExtension(`EXT_color_buffer_float`)&&!n,o=new Set,s=[],d=0,m=()=>{},h=()=>typeof e.scale==`function`?e.scale():e.scale??4,_=e=>{if(Array.isArray(e))return e;let t=e.getBoundingClientRect();return[t.left+t.width/2,t.top+t.height/2]},v=e=>{let[t,n]=_(e.at),r=h(),[i,a]=e.anchor??[.5,1],o=e.size[0]*r,s=e.size[1]*r;return[t-i*o,n-a*s,o,s]},A=!0,de=()=>{!d&&a&&(d=requestAnimationFrame(()=>m()))},fe=e=>{},pe=0,j={get haze(){return pe},set haze(e){pe=Math.max(0,e),pe>0&&de()},ambient:[.05,.05,.05],lights:[],get quality(){return N},plume(e){let t={o:e,fed:new Set,box:v(e),at:h(),grid:null,quietSince:-1/0,time:0};return o.add(t),{add(e){let n={s:{...e}};return t.fed.add(n),t.quietSince=-1/0,de(),{set:e=>void Object.assign(n.s,e),remove:()=>void t.fed.delete(n)}},puff(e,n){let r=performance.now()/1e3;t.fed.add({s:{...e},from:r,until:r+n}),t.quietSince=-1/0,de()},remove(){t.grid&&fe(t.grid),o.delete(t)}}},sparks(e,t,n={}){if(!a)return;let[r,i]=_(e),o=(n.speed??3e3)*C,c=(n.toward??0)*Math.PI/180,l=(n.spread??360)*Math.PI/180,u=ie[n.metal??`steel`],d=n.kelvin??2100;for(let e=0;e<t;e++){let e=c+(Math.random()-.5)*l,t=o*Math.exp((Math.random()+Math.random()+Math.random()-1.5)*1.2),a=(n.size??.25)*C*Math.exp((Math.random()+Math.random()+Math.random()-1.5)*.7);s.push({x:r,y:i,vx:Math.sin(e)*t,vy:-Math.cos(e)*t,d:a,t:d*(.9+Math.random()*.15),m:u,resting:!1,fuel:1})}s.length>2e3&&s.splice(0,s.length-2e3),de()},stop(){cancelAnimationFrame(d),d=0,removeEventListener(`resize`,me),r.remove()}},M=1,N=Math.max(0,Math.min(O.length-1,Math.round(e.quality??O.length-1))),me=()=>{M=Math.min(devicePixelRatio||1,Math.sqrt(O[N].pixels/(innerWidth*innerHeight))),r.width=Math.round(innerWidth*M),r.height=Math.round(innerHeight*M);for(let e of o)e.box=v(e.o),e.at=h();de()};if(!i||!a)return j;t.append(r);let he=(e,t)=>{let n=i.createShader(e);if(i.shaderSource(n,t),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`air: ${i.getShaderInfoLog(n)}`);return n},ge=(e,t)=>{let n=i.createProgram();if(i.attachShader(n,he(i.VERTEX_SHADER,e)),i.attachShader(n,he(i.FRAGMENT_SHADER,t)),i.bindAttribLocation(n,0,`aPos`),i.linkProgram(n),!i.getProgramParameter(n,i.LINK_STATUS))throw Error(`air: ${i.getProgramInfoLog(n)}`);let r=new Map;return{p:n,u:e=>r.has(e)?r.get(e):r.set(e,i.getUniformLocation(n,e)).get(e)}},_e=ge(f,y),ve=ge(f,ee),ye=ge(f,te),be=ge(f,b),P=ge(p,x),xe=ge(f,ne),Se=ge(S,re),Ce=i.createVertexArray();i.bindVertexArray(Ce),i.bindBuffer(i.ARRAY_BUFFER,i.createBuffer()),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),i.STATIC_DRAW),i.enableVertexAttribArray(0),i.vertexAttribPointer(0,2,i.FLOAT,!1,0,0);let we=i.createBuffer(),Te=i.createVertexArray();i.bindVertexArray(Te),i.bindBuffer(i.ARRAY_BUFFER,we);let Ee=i.getAttribLocation(Se.p,`aSpark`),De=i.getAttribLocation(Se.p,`aShape`),Oe=i.getAttribLocation(Se.p,`aLight`);i.enableVertexAttribArray(Ee),i.vertexAttribPointer(Ee,4,i.FLOAT,!1,36,0),i.enableVertexAttribArray(De),i.vertexAttribPointer(De,2,i.FLOAT,!1,36,16),i.enableVertexAttribArray(Oe),i.vertexAttribPointer(Oe,3,i.FLOAT,!1,36,24),i.bindVertexArray(null);let ke=(e,t,n,r,a=null,o=i.HALF_FLOAT)=>{let s=i.createTexture();return i.bindTexture(i.TEXTURE_2D,s),i.texImage2D(i.TEXTURE_2D,0,n,e,t,0,i.RGBA,o,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,r),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,r),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),s},Ae=(...e)=>{let t=i.createFramebuffer();return i.bindFramebuffer(i.FRAMEBUFFER,t),e.forEach((e,t)=>i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+t,i.TEXTURE_2D,e,0)),i.drawBuffers(e.map((e,t)=>i.COLOR_ATTACHMENT0+t)),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),t},je=new Float32Array(1280),Me=ke(320,1,i.RGBA32F,i.NEAREST,je,i.FLOAT),Ne=(e,t)=>{let[n,r]=e.o.size,a=n>=r,o=a?t:Math.max(8,Math.round(t*n/r)),s=a?Math.max(8,Math.round(t*r/n)):t,c=n*C/o,l=()=>ke(o,s,i.RGBA16F,i.LINEAR),u=[l(),l()],d=[l(),l()],f=[l(),l()],p=l();return{nx:o,ny:s,cell:c,long:t,vel:u,dye:d,p:f,lit:p,step:[Ae(u[0],d[0]),Ae(u[1],d[1])],press:[Ae(f[0]),Ae(f[1])],lighting:Ae(p),cur:0}},Pe=e=>{let t=e.map(e=>{let[t,n]=e.o.size;return Math.min(D.most,Math.max(D.long,D.short*Math.max(t,n)/Math.min(t,n)))}),n=e.reduce((e,n,r)=>e+t[r]**2*Math.min(n.o.size[0],n.o.size[1])/Math.max(n.o.size[0],n.o.size[1]),0),r=Math.min(1,Math.sqrt(O[N].cells/Math.max(n,1)));return t.map(e=>Math.max(D.fewest,Math.round(e*r)))},Fe=(e,t)=>{let n=e.grid,r=Ne(e,t);i.bindFramebuffer(i.FRAMEBUFFER,r.step[0]),i.viewport(0,0,r.nx,r.ny),i.useProgram(_e.p),i.uniform2f(_e.u(`uFrom`),n.nx,n.ny),i.uniform2f(_e.u(`uTo`),r.nx,r.ny),I(_e,`uVel`,0,n.vel[n.cur]),I(_e,`uDye`,1,n.dye[n.cur]),i.drawArrays(i.TRIANGLE_STRIP,0,4),fe(n),e.grid=r};fe=e=>{for(let t of[...e.vel,...e.dye,...e.p,e.lit])i.deleteTexture(t);for(let t of[...e.step,...e.press,e.lighting])i.deleteFramebuffer(t)},addEventListener(`resize`,me),me();let Ie=document.createElement(`canvas`),F=Ie.getContext(`2d`),Le=ke(1,1,i.RGBA8,i.LINEAR,new Uint8Array(4),i.UNSIGNED_BYTE);i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR_MIPMAP_LINEAR);let Re=()=>{let t=Math.max(1,Math.ceil(innerWidth/E)),n=Math.max(1,Math.ceil(innerHeight/E));(Ie.width!==t||Ie.height!==n)&&Object.assign(Ie,{width:t,height:n}),F.globalCompositeOperation=`source-over`,F.globalAlpha=1,F.fillStyle=`#000`,F.fillRect(0,0,t,n),F.globalCompositeOperation=`lighter`;for(let t of e.shine?.()??[]){let e=t.at.getBoundingClientRect();if(!(e.width<1||e.bottom<0||e.top>innerHeight)){if(F.globalAlpha=Math.min(1,t.strength??1),!t.color&&t.at instanceof HTMLCanvasElement)F.drawImage(t.at,e.left/E,e.top/E,e.width/E,e.height/E);else{let[n,r,i]=(t.color??[1,1,1]).map(e=>Math.round(Math.min(1,e)*255));F.fillStyle=`rgb(${n} ${r} ${i})`,F.fillRect(e.left/E,e.top/E,e.width/E,e.height/E)}}}i.bindTexture(i.TEXTURE_2D,Le),i.texImage2D(i.TEXTURE_2D,0,i.RGBA8,i.RGBA,i.UNSIGNED_BYTE,Ie),i.generateMipmap(i.TEXTURE_2D)},ze=ke(128,128,i.RGBA8,i.LINEAR,Uint8Array.from({length:65536},()=>Math.random()*256),i.UNSIGNED_BYTE);i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.REPEAT),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.REPEAT);let Be=e.white??120,Ve=ke(64,1,i.RGBA16F,i.LINEAR,u(64,798,g,Be),i.FLOAT),He=e.draught??.1,Ue=e.steam??.6,We=e=>Math.max(e.o.size[0],e.o.size[1])*C/He,Ge=performance.now()/1e3,Ke=0,I=(e,t,n,r)=>{i.activeTexture(i.TEXTURE0+n),i.bindTexture(i.TEXTURE_2D,r),i.uniform1i(e.u(t),n)},qe=(e,t)=>{i.uniform2f(e.u(`uCells`),t.nx,t.ny),i.uniform1f(e.u(`uCell`),t.cell),i.uniform1i(e.u(`uBlockCount`),0)},Je=t=>{let n=C/h();I(t,`uShine`,4,Le),i.uniform1f(t.u(`uShineGain`),e.shine?e.shineGain??1:0),i.uniform2f(t.u(`uPageSpan`),innerWidth*n,innerHeight*n),i.uniform3fv(t.u(`uAmbient`),j.ambient);let r=j.lights.slice(0,8),a=new Float32Array(32),o=new Float32Array(24);r.forEach((e,t)=>{let[r,i]=_(e.at);a.set([r*n,i*n,e.radius*C,0],t*4),o.set(e.color,t*3)}),i.uniform1i(t.u(`uLightCount`),r.length),i.uniform4fv(t.u(`uLightAt`),a),i.uniform3fv(t.u(`uLightColor`),o)},Ye=(e,t)=>{let n=0,r=C/h(),[a,o]=e.box;for(let i of e.fed){if(i.until!==void 0&&t>i.until){e.fed.delete(i);continue}if(n>=64)break;let s=i.s,c=i.until===void 0?1:1-(t-i.from)/(i.until-i.from),[l,u]=_(s.at),d=s.color??[.5,.5,.5];je.set([(l-a)*r,(u-o)*r,Math.max(s.radius*C,e.grid.cell*1.6),(s.rate??1)*c,(s.jet?.[0]??0)*C,(s.jet?.[1]??0)*C,(s.heat??0)*c,s.steam??0,d[0],d[1],d[2],s.grip??+!!s.blast,(s.blast??0)*C*c,(s.span?.[0]??0)/2*C,(s.span?.[1]??0)/2*C,(s.angle??0)*Math.PI/180,+!!s.seam,0,0,0],n*20),n++}return i.bindTexture(i.TEXTURE_2D,Me),i.texSubImage2D(i.TEXTURE_2D,0,0,0,320,1,i.RGBA,i.FLOAT,je),n},Xe=(e,t,n)=>{let r=e.grid,a=Math.max(1,Math.ceil(t*60)),o=t/a;for(let t=0;t<a;t++){e.time+=o;let t=1-r.cur;i.bindFramebuffer(i.FRAMEBUFFER,r.step[t]),i.viewport(0,0,r.nx,r.ny),i.useProgram(ve.p),qe(ve,r),I(ve,`uVel`,0,r.vel[r.cur]),I(ve,`uDye`,1,r.dye[r.cur]),I(ve,`uP`,2,r.p[0]),I(ve,`uSources`,3,Me);let a=ve.u;i.uniform1f(a(`uDt`),o),i.uniform1f(a(`uTime`),e.time),i.uniform1f(a(`uSourceCount`),n),i.uniform1f(a(`uMixing`),k.mixing),i.uniform1f(a(`uVorticity`),k.vorticity),i.uniform1f(a(`uSwirl`),k.swirl),i.uniform1f(a(`uFlicker`),k.flicker),i.uniform1f(a(`uDrag`),k.drag),i.uniform1f(a(`uHeatLife`),k.heatLife),i.uniform1f(a(`uSmokeLife`),We(e)),i.uniform1f(a(`uSteamLife`),Ue),i.uniform1f(a(`uRise`),ce),i.uniform2f(a(`uWind`),0,0),i.uniform2f(a(`uOrigin`),e.box[0]*C/h(),e.box[1]*C/h()),i.drawArrays(i.TRIANGLE_STRIP,0,4),r.cur=t;let s=2*Math.max(2,Math.round(k.sweeps*r.long/D.long/2));i.useProgram(ye.p),qe(ye,r),i.uniform1f(ye.u(`uExpand`),k.expand),i.uniform1f(ye.u(`uRetain`),k.retain),I(ye,`uVel`,0,r.vel[r.cur]);for(let e=0;e<s;e++)i.bindFramebuffer(i.FRAMEBUFFER,r.press[(e+1)%2]),I(ye,`uP`,1,r.p[e%2]),i.drawArrays(i.TRIANGLE_STRIP,0,4)}},Ze=[],L=O.map(()=>ue),R=0,z=1e3/60,B=1/0,V=-1/0,H=e=>{let t=Ze.reduce((e,t)=>e+t,0);if(Ze.length<20&&(Ze.length<4||t<330))return;let n=e=>[...Ze].sort((e,t)=>e-t)[Math.floor(Ze.length*e)];z=Math.min(1e3/60,Math.max(n(.25),4));let r=n(.75)>z*1.3,i=n(.9)<z*1.15;Ze.length=0,r&&N>0?(e-V<5&&(L[N]=Math.min(L[N]*2,120)),N--,R=0,me()):i&&N<O.length-1&&(R+=t/1e3)>=L[N+1]?(N++,R=0,V=e,me()):i||(R=0)};return m=()=>{d=0;let t=performance.now()/1e3,n=Math.min(t-Ge,.1),a=(t-Ge)*1e3;A&&=(B=t,!1),e.quality===void 0&&t-B>1&&(Ze.push(a),H(t)),Ge=t,Ke+=n,i.disable(i.BLEND),i.bindVertexArray(Ce);let u=[];for(let e of o)!e.fed.size&&(e.quietSince===-1/0&&(e.quietSince=t),t-e.quietSince>We(e)*2.5)||(Math.abs(h()/e.at-1)>.01&&(e.box=v(e.o),e.at=h()),u.push(e));let f=Pe(u);if(u.forEach((e,r)=>{let i=f[r];e.grid?(i>e.grid.long*D.regrid||i*D.regrid<e.grid.long)&&Fe(e,i):e.grid=Ne(e,i),Xe(e,n,Ye(e,t))}),i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,r.width,r.height),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),(j.haze>0||u.length)&&e.shine&&Re(),i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE_MINUS_SRC_ALPHA),i.bindVertexArray(Ce),j.haze>0&&(i.useProgram(xe.p),Je(xe),i.uniform1f(xe.u(`uTime`),Ke),i.uniform1f(xe.u(`uHaze`),j.haze),i.drawArrays(i.TRIANGLE_STRIP,0,4)),u.length){let e=C/h();i.disable(i.BLEND),i.useProgram(be.p),Je(be),I(be,`uBlackbody`,5,Ve),i.uniform1f(be.u(`uExtinction`),k.extinction);for(let t of u){let n=t.grid;i.bindFramebuffer(i.FRAMEBUFFER,n.lighting),i.viewport(0,0,n.nx,n.ny),qe(be,n),I(be,`uVel`,0,n.vel[n.cur]),I(be,`uDye`,1,n.dye[n.cur]),i.uniform2f(be.u(`uOrigin`),t.box[0]*e,t.box[1]*e),i.uniform1f(be.u(`uDepth`),k.depth*Math.min(t.box[2],t.box[3])*e),i.drawArrays(i.TRIANGLE_STRIP,0,4)}i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,r.width,r.height),i.enable(i.BLEND),i.useProgram(P.p),I(P,`uBlackbody`,5,Ve),I(P,`uNoise`,6,ze),i.uniform1f(P.u(`uExtinction`),k.extinction);for(let t of u){let n=t.grid,[r,a,o,s]=t.box;qe(P,n),I(P,`uVel`,0,n.vel[n.cur]),I(P,`uDye`,1,n.dye[n.cur]),I(P,`uLit`,2,n.lit),i.uniform1f(P.u(`uTime`),t.time),i.uniform1f(P.u(`uPixel`),e/M),i.uniform1i(P.u(`uOctaves`),O[N].octaves),i.uniform2f(P.u(`uOrigin`),r*e,a*e),i.uniform4f(P.u(`uFade`),+(r>0),+(r+o<innerWidth),+(a>0),+(a+s<innerHeight)),i.uniform4f(P.u(`uRect`),r/innerWidth*2-1,1-(a+s)/innerHeight*2,(r+o)/innerWidth*2-1,1-a/innerHeight*2),i.drawArrays(i.TRIANGLE_STRIP,0,4)}}if(s.length){let t=h()/C,a=(typeof e.floor==`function`?e.floor():e.floor)??innerHeight,o=new Float32Array(s.length*6*T),u=0;for(let e=s.length-1;e>=0;e--){let r=s[e],i=Math.hypot(r.vx,r.vy),d=r.m.rho*Math.PI*r.d**3/6,f=Math.PI*r.d*r.d,p=(r.t+w.kelvin)/2/w.kelvin,m=w.rho/p,h=w.nu*p**1.7,g=w.k*p**.8,_=.5*m*.47*(f/4)*i/d;r.vx-=r.vx*_*n,r.vy-=r.vy*_*n-(r.resting?0:se*n);let v=2+.6*Math.sqrt(i*r.d/h)*.89,ee=f*(v*g/r.d*(r.t-w.kelvin)+r.m.e*oe*(r.t**4-w.kelvin**4))*(r.resting?4:1),y=r.m.burns&&!r.resting&&r.fuel>0?f*(v*w.oxygenDiffusion*p**1.75/r.d)*m*w.oxygen*ae*r.m.burns:0;if(r.fuel-=y/r.m.burns/d*n,r.t-=(ee-y)/(d*r.m.c)*n,r.t<798||r.y>innerHeight+50||r.x<-50||r.x>innerWidth+50){s.splice(e,1);continue}let te=[r.x,r.y];r.x+=r.vx*t*n,r.y+=r.vy*t*n,r.y>a&&te[1]<=a+1&&(r.y=a,r.vy>.25?(r.vy*=-.3,r.vx*=.7):(r.vy=0,r.resting=!0)),r.resting&&(r.vx*=Math.exp(-n*.4*se/Math.max(Math.abs(r.vx),.05)));let b=Math.hypot(r.vx,r.vy),x=r.d*t*M/2,ne=Math.max(x,.5),S=b*le*t*M,re=2*ne*S+Math.PI*(ne*ne+1/12),C=c(r.t),ie=Math.PI*x*x/re*(r.m.e*l(r.t)/Be),ce=b>1e-4?r.vx/b:1,E=b>1e-4?r.vy/b:0,D=ne+10,O=r.x*M,ue=r.y*M,k=(e,t)=>o.set([O+ce*(e-S)-E*t,ue+E*(e-S)+ce*t,e,t,S,ne,C[0]*ie,C[1]*ie,C[2]*ie],u++*T);k(-D,D),k(-D,-D),k(S+D,D),k(S+D,D),k(-D,-D),k(S+D,-D)}i.blendFunc(i.ONE,i.ONE),i.useProgram(Se.p),i.uniform2f(Se.u(`uSpan`),r.width,r.height),i.uniform1f(Se.u(`uFloor`),a*M),i.bindVertexArray(Te),i.bindBuffer(i.ARRAY_BUFFER,we),i.bufferData(i.ARRAY_BUFFER,o.subarray(0,u*T),i.DYNAMIC_DRAW),i.drawArrays(i.TRIANGLES,0,u)}i.disable(i.BLEND),i.bindVertexArray(null),j.haze>0||u.length||s.length?de():A=!0},j}var de=[384,288],fe=[512,384],pe=[384,288],j=[`Base`,`Eva-01`,`Launch`],M=[[`emergency`,`非常事態`,`Emergency`,`red`],[`blue`,`パターン青`,`Pattern blue`,`blue`],[`field`,`ATフィールド`,`AT field`,`amber`],[`magi`,`MAGI`,`Magi vote`,`amber`],[`city`,`迎撃態勢`,`Intercept`,`amber`],[`shelter`,`避難`,`Shelters`,`green`],[`seal`,`隔壁閉鎖`,`Geofront seal`,`red`],[`comms`,`通信`,`Comms link`,`green`],[`cage`,`ケージ`,`Cage lock`,`amber`],[`restraint`,`拘束具`,`Restraints`,`amber`],[`plug`,`プラグ`,`Entry plug`,`green`],[`lcl`,`LCL`,`LCL fill`,`amber`],[`a10`,`A10神経`,`A10 nerve`,`green`],[`limit`,`シンクロ`,`Sync limit`,`amber`],[`vitals`,`パイロット`,`Pilot vitals`,`red`],[`berserk`,`暴走`,`Berserk`,`red`],[`track`,`射出路`,`Track open`,`green`],[`launch`,`発進可`,`Launch ready`,`green`],[`liftoff`,`射出`,`Lift off`,`green`],[`surface`,`地上`,`Surfaced`,`green`],[`umbilical`,`アンビリカル`,`Umbilical`,`red`],[`battery`,`内部電源`,`Battery low`,`red`],[`eject`,`プラグ射出`,`Plug eject`,`amber`],[`silenced`,`目標沈黙`,`Silenced`,`green`]],N=[[`range`,`距離`,`Range m`,4,`red`],[`atf`,`ATF`,`%`,3,`amber`],[`lcl`,`LCL`,`°C`,3,`green`],[`power`,`電力`,`%`,3,`green`]],me=[[`umb`,`Umbilical`],[`int`,`Internal`],[`res`,`Reserve`],[`emg`,`Emergency`]],he=[[`Coolant`,`COOLING SYSTEM STOP`],[`Restraint`,`ARM RESTRAINTS RELEASE`],[`Bridge`,`UMBILICAL BRIDGE CLEAR`],[`Bolts`,`PRIMARY LOCK BOLTS RELEASE`],[`Safety`,`FINAL SAFETY LOCK RELEASE`]],ge=[[0,`ENTRY PLUG INSERTED`],[1.2,`PLUG DEPTH: FIXED`],[2.4,`LCL FILLING`],[3.6,`LCL ELECTROLYSIS`],[4.8,`PRIMARY CONTACT: ALL CLEAR`],[6,`A10 NERVE CONNECTION: CLEAR`],[7.2,`MUTUAL INTERFERENCE: NONE`]],_e=8,ve=9,ye=6,be=3.5,P=4.5,xe=4.6,Se=2.5,Ce=3.6,we=10,Te=[[.45,.53],[.8,.86],[1.25,1/0]],Ee=1.7,De=.45,Oe={magi:2.8,main:3.2,sync:3.6},ke=3.9,Ae=.6,je=9.4,Me=12.4,Ne=[6.8,5.8,4.8],Pe=4,Fe=[[`NERV OPERATIONS SYSTEM  REV 2.01`,[]],[`MEMORY 4096 TB ................ OK`,[]],[`UMBILICAL BUS 6.6 kV .......... OK`,[`mains`]],[`GEOFRONT SENSOR NET .... 1024 NODES`,[]],[`TOKYO-3 DEFENCE GRID ...... ONLINE`,[]],[`MAGI LINK ...... 3 OF 3 ESTABLISHED`,[`comms`]],[`CAGE 7  EVA-01 ............ FROZEN`,[`cage`,`restraint`]],[`LCL PLANT ................ STANDBY`,[]],[`LAUNCH TRACKS 1-9 .......... CLEAR`,[]]],Ie=6,F=300,Le=41.3,Re=[2.4,4.3,3.3],ze=1.4,Be=5,Ve=[26,46],He=5,Ue=3.2,We=1.5,Ge=24,Ke=[3,8,13,17,21],I=46,qe=1.4,Je=520,Ye=130,Xe=[2600,6500],Ze=[650,1500],L=18,R=`#ff7a00`,z=`#ffb300`,B=`#ff2a1a`,V=`#3ce0ff`,H=`#40ff70`,U=`#f4ead8`,Qe=`#b46cff`,$e=`"Noto Serif", "Shippori Mincho B1", "Times New Roman", serif`,et=`"Shippori Mincho B1", "Hiragino Mincho ProN", "Yu Mincho", serif`,tt=.78,nt=`Menlo, Monaco, "Courier New", monospace`;function W(e,t,n,r,i,a,o={}){let s=o.font??$e,c=s===$e,l=c?(o.cond??tt)/tt:o.cond??tt;e.save(),e.translate(n,r),e.scale(l,1),e.font=`${o.weight??(c?`900`:s===et?`800`:`bold`)} ${i}px ${s}`,e.fontStretch=c?`extra-condensed`:`normal`,e.textAlign=o.align??`left`,e.textBaseline=o.base??`alphabetic`,e.fillStyle=a,e.fillText(t,0,0);let u=e.measureText(t).width*l;return e.restore(),u}var G=(e,t,n,r,i,a,o=`left`)=>W(e,t,n,r,i,a,{font:nt,weight:`normal`,cond:1,align:o});function rt(e,t,n,r){e.beginPath();for(let i=0;i<6;i++){let a=Math.PI/3*i;e.lineTo(t+r*Math.cos(a),n+r*Math.sin(a))}e.closePath()}function it(e,t,n,r,i,a){let o=r*1.5,s=r*Math.sqrt(3);for(let c=-1,l=0;c*o<t+r;c++,l++)for(let t=-1;t*s<n+r;t++){let n=c*o,u=t*s+(l%2?s/2:0),d=((c*7+t*13+i)%5+5)%5==0;rt(e,n,u,r-2),e.fillStyle=d?`rgba(255,42,26,${.9*a})`:`rgba(255,42,26,${.18*a})`,e.fill(),e.strokeStyle=`rgba(255,122,0,${.7*a})`,e.lineWidth=1.5,e.stroke(),W(e,`EMERGENCY`,n,u+r*.12,r*.34,d?`#000`:`rgba(255,140,60,${a})`,{align:`center`,base:`middle`,cond:.62})}}function at(e,t,n,r,i,a,o){e.save(),e.beginPath(),e.rect(t,n,r,i),e.clip(),e.fillStyle=a;for(let a=-i*2+o%(i*2);a<r+i;a+=i*2)e.beginPath(),e.moveTo(t+a,n+i),e.lineTo(t+a+i,n),e.lineTo(t+a+i*2,n),e.lineTo(t+a+i,n+i),e.fill();e.restore()}var ot=[.56,.42],K=(e,t)=>t-e*.45>.78;function q(e,t){let n=Math.exp(-((e-.2)**2+(t-.3)**2)/.012),r=Math.exp(-((e-ot[0])**2+(t-ot[1])**2)/.05);return .55+.22*Math.sin(e*9.1+t*3.7)*Math.cos(t*7.3-e*2.1)+.12*Math.sin(e*23+t*17)*Math.sin(t*19)-.5*n-.35*r-.6*Math.max(0,t-e*.45-.62)}function st(e,t){let n=Object.assign(document.createElement(`canvas`),{width:e,height:t}),r=n.getContext(`2d`),i=r.createImageData(e,t),a=i.data;for(let n=0;n<t;n++)for(let r=0;r<e;r++){let i=r/e,o=n/t,s=(n*e+r)*4,c=q(i,o),l=0,u=0,d=0;if(K(i,o))n%3==0&&([l,u,d]=[20,60,120]);else if(Math.exp(-((i-.2)**2+(o-.3)**2)/.012)>.55)(r+n)%4==0&&([l,u,d]=[30,90,150]);else{let e=c*11%1;(e<.07||e>.96)&&([l,u,d]=c>.6?[255,122,0]:[200,80,0])}a[s]=l,a[s+1]=u,a[s+2]=d,a[s+3]=255}r.putImageData(i,0,0),r.fillStyle=`rgba(64,255,112,.75)`;let o=ot[0]*e,s=ot[1]*t;for(let e=-12;e<=12;e++)for(let t=-8;t<=8;t++){let n=Math.hypot(e/12,t/8);n>1||Math.sin(e*12.9898+t*78.233)*43758.5453%1>.75-n*.5||r.fillRect(o+e*7,s+t*7,4,4)}return r.strokeStyle=`rgba(64,255,112,.5)`,r.strokeRect(o-91,s-63,182,126),n}function ct(e){let t=1,n=()=>(!e.style.scale&&e.offsetWidth&&(t=e.getBoundingClientRect().width/(e.offsetWidth/4)),t),r=[`.s-magi`,`.s-main`,`.s-sync`].map(t=>e.querySelector(t)),i=r.map(e=>e.querySelector(`canvas`)),a={red:[1,.12,.05],amber:[1,.55,.08],green:[.25,1,.35],cyan:[.2,.85,1],blue:[.2,.4,1],white:[1,.92,.8]},o=!1,s=function*(){if(o)for(let e of i)yield{at:e};for(let t of e.querySelectorAll(`[on][color], [d-readout][color]`))(!t.hasAttribute(`d-readout`)||t.textContent)&&(yield{at:t,color:a[t.getAttribute(`color`)]??a.amber,strength:.6})},c=e.querySelector(`.s-steps`),l=A({scale:n,steam:.9,zIndex:2,shine:s,shineGain:1.4,floor:()=>c.getBoundingClientRect().top}),u=()=>[innerWidth/n(),innerHeight/n()],d=null,f=null,p=new Map,m={at:-1/0,k:0,color:[1,1,1],where:r[1]},h={at:-1/0,k:0},g={none:[.36,.35,.34],alert:[.42,.07,.05],blackout:[.04,.04,.045]};return{blow(e,t){let[n]=u();d??=l.plume({at:[innerWidth/2,0],size:[n,n*.55],anchor:[.5,0]});for(let t=0;t<Math.round(2+e*5);t++)d.puff({at:[innerWidth*(.05+Math.random()*.9),2],radius:12+e*30,rate:.2+e*.45,steam:.5,jet:[(Math.random()-.5)*60,260+e*380],grip:.5,color:[.6,.55,.48]},.25+e*.5);t&&e>.55&&l.sparks(t,Math.round(40+e*160),{speed:2e3+e*2e3,spread:160}),m={at:performance.now(),k:e*1.5,color:[1,.85,.7],where:t??r[1]},h={at:performance.now(),k:Math.max(e,h.k*Math.exp(-(performance.now()-h.at)/4e3))}},broke(e,t){if(p.has(e))return;l.sparks(t,120,{spread:200});let r=t.getBoundingClientRect(),i=[r.width/n(),r.height/n()],a=l.plume({at:t,size:[Math.max(220,i[0]*3),560],anchor:[.5,.9]});a.puff({at:t,radius:4,span:i,seam:!0,rate:14,heat:4,color:[.35,.32,.3],blast:160},.3),p.set(e,{plume:a,source:a.add({at:t,radius:2,span:i,seam:!0,rate:8,heat:.5,color:[.85,.83,.8]})})},burn(e){for(let{source:t}of p.values())t.set(e?{heat:2.6,rate:10,radius:4}:{heat:.5,rate:8,radius:2})},launch(e){let[t]=u();f??=l.plume({at:[innerWidth/2,innerHeight],size:[t,t*.3],anchor:[.5,1]});for(let r of[.06,.22,.4,.6,.78,.94])for(let i of[-8,0,8])f.puff({at:[innerWidth*r,innerHeight-(20+i)*n()],radius:3,span:[t*.11,3],rate:3,steam:.85,heat:.25,jet:[0,-520],grip:.5,blast:60,color:[1,1,1]},Math.min(e,.8))},fire(){m={at:performance.now(),k:4,color:[.75,.85,1],where:r[1]},l.sparks(r[1],160,{speed:4e3,toward:0,spread:120,size:.4})},light(e,t,n){o=t,l.ambient=g[e??`none`]??g.none;let r=performance.now(),i=m.k*Math.exp(-(r-m.at)/120);l.lights=i>.02?[{at:m.where,radius:600,color:m.color.map(e=>e*i)}]:[],l.haze=(n?.4:.3)+h.k*.3*Math.exp(-(r-h.at)/4e3)},clear(){for(let{plume:e}of p.values())e.remove();p.clear()},stop:()=>l.stop()}}function lt(t){let n=e=>t.querySelector(e),r=e=>[...t.querySelectorAll(e)],i=matchMedia(`(prefers-reduced-motion: reduce)`).matches,a=t.closest(`[data-speed]`),o=Number(a?.dataset.speed)||1,s=!!t.closest(`[data-auto]`),c=performance.now(),l=()=>c+(performance.now()-c)*o,u=[`.s-magi`,`.s-main`,`.s-sync`].map(e=>n(`${e} canvas`)),[d,f,p]=u.map(e=>e.getContext(`2d`)),m=st(fe[0],fe[1]-110),h=Object.fromEntries([...M.map(([e])=>e),`external`,`internal`].map(e=>[e,n(`.t-${e}`)])),g=n(`.timer`),_=n(`.r-sync`),v=n(`.g-sync meter`),ee=n(`.b-field meter`),y=r(`.step`),te=r(`.steps .led`),b=r(`.key`),x=r(`.vote`),ne=n(`.order`),S=n(`.tune input`),re=n(`.r-heart`),C=n(`.beat`),ie=Object.fromEntries(N.map(([e])=>[e,n(`.r-${e}`)])),w=Object.fromEntries(me.map(([e])=>[e,n(`.p-led-${e}`)]));for(let e of[`900 20px ${$e}`,`800 20px ${et}`])document.fonts?.load(e,`NERV 発進`);let[ae,oe]=r(`.guard > input`),se=n(`.go`),ce=n(`.plug`),le=n(`.track input`),T=Object.fromEntries(me.map(([e])=>[e,n(`.p-${e}`)])),E=r(`d-device`),D=!i&&!!t.closest(`[data-alone]`),O=n(`.k-ack`),ue=n(`.k-test`),k=n(`.k-reset`),A={phase:D?`off`:`standby`,since:l(),quiet:be,cued:0,downAt:-1/0,auto:!0,acked:!1,testUntil:0,ejectAt:-1/0,cutAt:0,plugAt:0,alertAt:0,log:[],sync:0,field:0,done:0,was:F,room:null,roaring:!1,hushedAt:-1/0,reserve:0,blue:!1,voted:[`idle`,`idle`,`idle`],resolved:!1,jolt:{at:-1/0,k:0,dir:0},nextBlow:0,shaken:!1,scars:[],broken:new Set,hits:[],surgeAt:-1/0,riot:0,tick:0,deadlockAt:-1/0,ruledAt:-1/0,drift:0,tuned:!1,count:Be,hold:!1,rifle:`none`,chargeAt:-1/0,firedAt:-1/0,landed:!1,bpm:0,beats:[],razed:new Set},j=e(xe/o),tt=t.closest(`[data-air]`)?ct(t):null,K=(e,t=R)=>{A.phase!==`off`&&A.phase!==`boot`&&(A.log.push({at:l(),text:e,color:t}),A.log.length>12&&A.log.shift(),j.data(e.length))},q=e=>{let t=A.phase;A.phase=e,A.since=l(),e===`alert`&&(A.alertAt=A.since),e===`contact`&&j.contact(),j.magi(e===`magi`),e===`arm`&&j.confirm(),e===`launch`&&(j.launch(xe/o),tt?.launch(xe/o)),tt?.burn(e===`berserk`),e===`dead`&&j.powerDown(),e===`silenced`&&j.chime(),e===`standby`&&t!==`boot`&&j.reset(),j.score([`contact`,`alert`,`magi`].includes(e)?`brood`:[`sequence`,`arm`].includes(e)?`build`:e===`count`?`count`:e===`battle`?`fight`:`none`),j.room(e===`off`||e===`dead`||e===`berserk`?`off`:[`alert`,`magi`,`sequence`,`arm`,`count`,`launch`,`battle`].includes(e)?`tense`:`calm`)},lt=()=>+le.value+1,J=e=>(e-A.since)/1e3,ft=e=>A.phase===`battle`&&A.cutAt?Math.max(0,F+A.reserve-(e-A.cutAt)/1e3*Ie):A.phase===`battle`?F:0,pt=()=>b.every(e=>e.checked),mt=()=>[`sequence`,`arm`,`count`,`launch`,`battle`,`dead`,`berserk`].includes(A.phase),ht=()=>A.drift-+S.value,gt=()=>{let e=0;for(;e<y.length&&y[e].checked;)e++;return e},_t=!1,vt=(e,t=!1)=>{e.checked!==t&&(e.checked=t,_t=!0,e.dispatchEvent(new Event(`change`,{bubbles:!0})),_t=!1)},Y=(e,t=H)=>A.phase!==`off`&&(K(e,t),j.confirm()),X=(e,t=B)=>A.phase!==`off`&&(K(e,t),j.deny()),yt=()=>A.phase===`off`||A.phase===`boot`,Z=e=>{for(let t of[...y,...b,ce,oe,ae,...e?[T.res,T.emg]:[]])vt(t);e&&(vt(T.umb,!0),vt(T.int,!0)),A.log=[],tt?.clear(),Object.assign(A,{acked:!1,cutAt:0,was:F,done:0,sync:0,quiet:ye,reserve:0,hushedAt:-1/0,blue:!1,resolved:!1,voted:[`idle`,`idle`,`idle`],nextBlow:0,scars:[],broken:new Set,hits:[],surgeAt:-1/0,riot:0,deadlockAt:-1/0,ruledAt:-1/0,drift:0,tuned:!1,count:Be,hold:!1,rifle:`none`,chargeAt:-1/0,firedAt:-1/0,landed:!1,razed:new Set})},bt=u.map(e=>Object.assign(document.createElement(`canvas`),{width:e.width,height:e.height})),xt=()=>{A.cued=0,A.quiet=be,q(`boot`),j.breaker()},St=()=>{bt.forEach((e,t)=>e.getContext(`2d`).drawImage(u[t],0,0)),A.downAt=l(),A.auto=!1,Z(!1),j.klaxon(`off`),j.magi(!1),j.powerDown(),q(`off`)},Q=()=>[`battle`,`dead`,`berserk`].includes(A.phase),Ct=e=>A.jolt.k*Math.exp(-(e-A.jolt.at)/o/Je),wt=(e,t=l(),n=!0)=>{if(A.jolt={at:t,k:Math.min(1,Math.max(e,Ct(t))),dir:Math.random()*Math.PI*2},tt?.blow(e,i?null:h[M[Math.floor(Math.random()*M.length)][0]]),n&&(j.impact(e),Q())){if(e>.7&&A.phase===`battle`&&(A.drift=Math.max(-60,Math.min(60,A.drift+(Math.random()<.5?-1:1)*(10+Math.random()*16)))),e>.55){let e=Ke.filter(e=>!A.razed.has(e));e.length&&Math.random()<.6&&A.razed.add(e[Math.floor(Math.random()*e.length)])}if(A.hits.push(A.jolt.dir),e>.7&&A.scars.length<_e){let e=[`dead`,`stuck`,`shift`][Math.floor(Math.random()*3)];A.scars.push({tube:Math.floor(Math.random()*3),y:.12+Math.random()*.8,h:e===`stuck`?0:.02+Math.random()*.07,kind:e,dx:(Math.random()<.5?-1:1)*(8+Math.random()*30)})}if(e>.6&&A.broken.size<ve){let e=Math.floor(Math.random()*M.length);A.broken.add(e),tt?.broke(e,h[M[e][0]])}}},Tt=e=>i?0:Math.max(Ct(e),A.phase===`launch`?Math.min(J(e)/xe,1)**2*.3:0),Et=([e,t])=>e+Math.random()*(t-e),Dt=()=>A.cutAt+(F+A.reserve-60)/Ie*1e3,Ot=e=>{let t=A.phase;if(t===`alert`)return`slow`;if(t!==`battle`||!A.cutAt)return`off`;let n=e-A.cutAt<2500&&A.hushedAt<A.cutAt,r=ft(e)<60&&A.hushedAt<Dt();return n||r?`fast`:`off`},kt=()=>{let e=A.phase;if(yt())return X(``);if(e===`alert`&&!A.acked)return A.acked=!0,Y(`ALARM ACKNOWLEDGED`,z),K(`MAGI: SORTIE PROPOSAL SUBMITTED`,z),q(`magi`);if(e===`battle`&&Ot(l())!==`off`)return A.hushedAt=l(),Y(`KLAXON SILENCED BY OPERATOR`,z);if(e===`standby`||e===`silenced`)return Y(`NO ALARM. CONDITION GREEN`);if(e===`contact`)return X(`ALARM NOT YET RAISED: ANALYSING`,z);X(`NOTHING TO ACKNOWLEDGE`,z)},At=()=>{A.phase!==`off`&&(A.testUntil=l()+1600,j.test(),K(`LAMP TEST`,U))},jt=()=>{if(yt())return X(``);let e=![`standby`,`silenced`].includes(A.phase);Z(!0),q(`standby`),K(e?`SORTIE ABORTED. ALL STATIONS STAND DOWN`:`STATION RESET`,e?B:R)},Mt=e=>{X(`CONTROL REFUSED: EVA-01 NOT RESPONDING`),setTimeout(()=>A.phase===`berserk`&&vt(e,!e.checked),220)},Nt=e=>{if(_t)return;let t=e.target;if(!t.classList.contains(`step`))return;if(A.phase===`berserk`)return Mt(t);let n=y.indexOf(t),[,r]=he[n];t.checked?A.phase===`sequence`?gt()<=n&&X(`SEQUENCE ERROR: ${he[gt()][1]} FIRST`):X(`${r}: NOT AUTHORISED`):A.phase===`sequence`&&n<A.done?X(`${r}: REVERSED`,z):[`arm`,`count`,`launch`].includes(A.phase)&&X(`${r}: CANNOT REVERSE NOW`,z)},Pt=e=>{if(_t)return;let t=e.target;if(!t.classList.contains(`key`))return;if(A.phase===`berserk`)return Mt(t);Gt(l());let n=b.indexOf(t)?`COMMAND`:`OPERATIONS`;if(!t.checked&&A.phase===`count`&&!A.hold)return Bt(`${n} KEY OUT`);if(!t.checked)return K(`${n} KEY: SAFE`,z);A.phase===`arm`?(K(`${n} KEY: ACCEPTED`,H),j.key()):X(`${n} KEY: NOT REQUESTED`,z)},Ft=e=>{if(_t)return;let t=e.target;t===ae&&!t.checked&&A.phase===`count`&&!A.hold?Bt(`GUARD CLOSED`):t===ae?K(t.checked?`LAUNCH GUARD OPEN`:`LAUNCH GUARD CLOSED`,t.checked?z:R):t===oe&&K(t.checked?`PLUG EJECT: ARMED`:`PLUG EJECT: SAFE`,t.checked?B:R)},It=()=>{if(!ae.checked)return;let e=l();if(Gt(e),A.phase===`arm`&&pt()&&!A.tuned)return X(`LAUNCH INHIBITED: HARMONICS OUT OF PHASE`);if(A.phase===`arm`&&pt())return K(`LAUNCH COUNT: T-${Be}`,U),A.count=Be,A.hold=!1,q(`count`);if(A.phase===`arm`)return X(`LAUNCH INHIBITED: TWO KEYS REQUIRED`);if(A.phase===`count`&&A.hold)return pt()?(A.hold=!1,j.count(Math.ceil(A.count)),Y(`COUNT RESUMED AT T-${Math.ceil(A.count)}`,U)):X(`COUNT HELD: TWO KEYS REQUIRED`);if(A.phase===`count`)return X(`COUNT RUNNING`,z);if(A.phase===`battle`&&A.rifle===`ready`)A.rifle=`fired`,A.firedAt=e,K(`FIRE!`,U),j.fire(),tt?.fire(),wt(.75,e,!1);else{if(A.phase===`battle`&&A.rifle===`charging`)return X(`RIFLE CHARGING: STAND BY`,z);if(A.phase===`launch`||Q())return X(`EVA-01 IS ALREADY OUT`,z);X(`LAUNCH INHIBITED: NO SORTIE ORDER`)}},Lt=()=>{ce.checked&&oe.checked&&(A.ejectAt=l(),Q()||A.phase===`launch`?X(`EJECT SIGNAL REJECTED`):[`sequence`,`arm`,`count`].includes(A.phase)?X(`PLUG EJECT INHIBITED: LAUNCH IN PROGRESS`,z):X(`NO ENTRY PLUG TO EJECT`,z))},Rt=e=>{if(_t)return;let t=e.target,n=me.find(([e])=>t.classList.contains(`p-${e}`))?.[0];if(!n)return;let r=t.checked,i=l();if(n===`umb`&&r&&A.phase===`off`)return xt();if(n===`umb`&&!r&&[`boot`,`standby`,`silenced`].includes(A.phase))return St();if(A.phase!==`off`){if(n===`umb`)return r&&A.cutAt?X(`UMBILICAL BUS: NO CABLE CONNECTED`):r?Y(`UMBILICAL BUS: CLOSED`,H):X(`UMBILICAL BUS: OPEN. EXTERNAL POWER LOST`,z);if(n===`res`)return r?A.phase===`battle`&&A.cutAt&&!A.reserve?(A.reserve=90,A.was=ft(i),Y(`RESERVE CELLS ENGAGED: +01:30`,H)):A.reserve?X(`RESERVE CELLS: ALREADY SPENT`,z):Y(`RESERVE CELLS: STANDING BY`,z):K(`RESERVE CELLS: ISOLATED`,R);if(n===`int`)return r?Y(`INTERNAL BATTERY: ON LINE`,H):K(`INTERNAL BATTERY: OFF LINE`,R);if(n===`emg`)return r&&(A.phase===`dead`||A.phase===`berserk`)?X(`EMERGENCY POWER: NO RESPONSE FROM EVA-01`):r&&A.phase===`battle`&&A.rifle===`ordered`?Vt(i):!r&&A.rifle===`charging`?(A.rifle=`ordered`,j.charge(0),X(`RIFLE CHARGE LOST: CITY POWER RELEASED`,z)):r?Y(`EMERGENCY POWER: ALL CITY POWER TO NERV`,B):K(`EMERGENCY POWER: RELEASED`,R)}},zt=()=>{let e=lt();A.phase===`count`?X(`TRACK ${e}: LOCKED FOR LAUNCH`,z):A.phase===`launch`||Q()?X(`TRACK ${e}: EVA-01 ALREADY DEPLOYED`,z):K(`LAUNCH TRACK ${e} SELECTED`,e===7?H:z)},Bt=e=>{A.hold=!0,j.hold(),X(`LAUNCH HOLD: ${e} AT T-${Math.ceil(A.count)}`,z)},Vt=e=>{A.rifle=`charging`,A.chargeAt=e,j.charge(Ue/o),Y(`ALL CITY POWER TO EVA-01`,B)},Ht=[`MELCHIOR`,`BALTHASAR`,`CASPER`],Ut=e=>{let t=x.indexOf(e.currentTarget),n=Ht[t],r=A.phase;if(yt())return X(``);if(r===`berserk`)return X(`${n}: SELF-DIAGNOSIS FAULT`);if(r!==`magi`)return Y(`${n}: NORMAL. NO MOTION BEFORE IT`,V);if(!Number.isFinite(A.deadlockAt))return X(`${n}: DELIBERATING`,z);if(Number.isFinite(A.ruledAt))return X(`MAGI: MOTION ALREADY CARRIED`,z);if(t!==1)return X(`${n}: VOTE ALREADY CAST`,z);A.ruledAt=l(),Y(`BALTHASAR: OPERATOR RULING. VOTE CAST`,V)},Wt=()=>{mt()&&A.phase!==`dead`&&A.phase!==`berserk`&&j.trim(Math.min(Math.abs(ht())/40,1))};x.forEach(e=>e.addEventListener(`click`,Ut)),S.addEventListener(`input`,Wt),O.addEventListener(`click`,kt),ue.addEventListener(`click`,At),k.addEventListener(`click`,jt),se.addEventListener(`click`,It),ce.addEventListener(`change`,Lt),le.addEventListener(`change`,zt),t.addEventListener(`change`,Nt),t.addEventListener(`change`,Pt),t.addEventListener(`change`,Ft),t.addEventListener(`change`,Rt);let Gt=e=>{let t=J(e),n=Math.min(Math.max((e-A.tick)/1e3,0),.25);switch(A.tick=e,A.phase){case`off`:D&&A.auto&&t>Pe&&(vt(T.umb,!0),xt());break;case`boot`:{let e=[...Te.map(([e])=>[e,()=>j.strike()]),...Array.from({length:8},(e,t)=>[Ee+t*.09,()=>j.relay(t)]),[Oe.magi,()=>j.degauss(-.6)],[Oe.main,()=>j.degauss(0)],[Oe.sync,()=>j.degauss(.6)],...Fe.map(([e],t)=>[ke+t*Ae,()=>j.data(e.length)]),...Ne.map((e,t)=>[e,()=>j.vote(t,!0)]),[je,()=>j.ready()]];for(let[n,r]of e)n>A.cued&&n<=t&&r();A.cued=t,t>Me&&(q(`standby`),K(`ALL STATIONS ON WATCH. CONDITION GREEN`,H));break}case`standby`:t>A.quiet&&(K(`UNIDENTIFIED OBJECT APPROACHING`,z),q(`contact`));break;case`contact`:t>P&&(K(`BLOOD TYPE: BLUE. IT IS AN ANGEL`,B),K(`ALL PERSONNEL TO LEVEL ONE BATTLE STATIONS`,B),q(`alert`));break;case`magi`:if(t>Re[1]&&!Number.isFinite(A.deadlockAt)&&(A.deadlockAt=e,K(`MAGI: DEADLOCK 1 TO 1. BALTHASAR WITHHOLDS`,z),K(`OPERATOR RULING REQUIRED`,z),j.deadlock()),Number.isFinite(A.ruledAt)&&(e-A.ruledAt)/1e3>ze){K(`MAGI: SORTIE APPROVED 2 TO 1`,V),K(`EVA-01: BEGIN LAUNCH PREPARATIONS`,R),A.plugAt=e;let t=Ve[0]+Math.random()*(Ve[1]-Ve[0]),n=+S.value;A.drift=n+(n+t>60||n-t>=-60&&Math.random()<.5?-t:t),A.tuned=!1,q(`sequence`)}break;case`sequence`:{let e=gt();for(;A.done<e;)j.step(A.done),K(`${he[A.done++][1]}: COMPLETE`,H);e===y.length&&(K(`LAUNCH AUTHORISATION REQUIRED`,z),q(`arm`));break}case`count`:{if(A.hold)break;let e=Math.ceil(A.count);A.count=Math.max(0,A.count-n);let t=Math.ceil(A.count);t!==e&&t>0&&(j.count(t),K(`T-${t}`,U)),A.count<=0&&(K(`EVA-01, LAUNCH! TRACK ${lt()}`,U),q(`launch`));break}case`launch`:t>xe&&(K(`EVA-01 HAS SURFACED`,R),K(`TARGET AT 300M AND CLOSING`,B),q(`battle`),wt(.7,e));break;case`battle`:{!A.cutAt&&t>Se&&(A.cutAt=e,K(`UMBILICAL CABLE SEVERED!`,B),j.cut(),wt(1,e),A.nextBlow=e+Et(Xe),K(`SWITCHING TO INTERNAL POWER`,B),T.res.checked&&(A.reserve=90,K(`RESERVE CELLS ENGAGED: +01:30`,H)));let n=ft(e),r=A.was;A.was=n;let i=e=>r>e&&n<=e;A.cutAt&&A.rifle===`none`&&(e-A.cutAt)/1e3>2&&(A.rifle=`ordered`,K(`POSITRON RIFLE ON STATION`,z),T.emg.checked?Vt(e):K(`ROUTE ALL CITY POWER TO THE RIFLE`,z)),A.rifle===`charging`&&(e-A.chargeAt)/1e3>Ue&&(A.rifle=`ready`,K(`RIFLE CHARGED. FIRE WHEN READY`,H),j.charged()),A.rifle===`fired`&&!A.landed&&(e-A.firedAt)/1e3>.5&&(A.landed=!0,K(`DIRECT HIT. TARGET AT FIELD PIERCED`,H),wt(.5,e,!1)),n<60&&n>0&&Math.floor(r/6)!==Math.floor(n/6)&&j.tick(),A.rifle!==`fired`&&(i(260)&&K(`AT FIELD: NEUTRALISING`,z),i(210)&&(K(`TARGET AT FIELD NEUTRALISED`,H),A.rifle!==`none`&&K(`RIFLE OFF STATION`,R),A.rifle===`charging`&&j.charge(0),A.rifle=`fired`)),i(190)&&(K(`EVA-01 LEFT ARM DAMAGED`,B),wt(.95,e)),i(150)&&(K(`PILOT FEEDBACK: PAIN SIGNAL HIGH`,B),wt(.8,e)),i(110)&&(K(`PILOT VITALS CRITICAL`,B),wt(.8,e)),A.cutAt&&n>0&&e>A.nextBlow&&(wt(.45+Math.random()*.4,e),A.nextBlow=e+Et(Xe)),i(60)&&K(`INTERNAL POWER: ONE MINUTE`,B),A.cutAt&&n<=0&&(K(`ACTIVITY LIMIT. EVA-01 HAS STOPPED`,U),bt.forEach((e,t)=>e.getContext(`2d`).drawImage(u[t],0,0)),A.downAt=e,q(`dead`),wt(.9,e));break}case`dead`:t>Ce&&(K(`EVA-01 REACTIVATED. IMPOSSIBLE!`,B),K(`SYNC RATIO OVER 400%`,B),q(`berserk`),A.surgeAt=e,A.testUntil=e+500*o,A.riot=e+1500,wt(1,e));break;case`berserk`:if(e>A.riot){let t=[...y,...b],n=t[Math.floor(Math.random()*t.length)];vt(n,!n.checked),A.riot=e+Et([300,900])}e>A.nextBlow&&(wt(.6+Math.random()*.4,e),A.nextBlow=e+Et(Ze)),t>we&&(K(`TARGET SILENCED`,H),K(`PATTERN BLUE: LOST`,H),q(`silenced`))}A.phase===`sequence`&&gt()<A.done&&(A.done=gt());let r=(e-A.plugAt)/1e3,i=A.phase,a=ht(),s=1-Math.min(Math.abs(a)/50,1)*.75,c=[`sequence`,`arm`,`count`,`launch`].includes(i),l=c?r>8.4?Le*s:r>6?Le*s*((r-6)/2.4):0:i===`battle`?((ft(e)<190?33.6:Le)+Math.sin(e/170)*1.2+Math.sin(e/53)*.4)*s:i===`berserk`?400:0;A.sync+=(l-A.sync)*(i===`berserk`?.08:i===`dead`?.3:.06);let d=Math.abs(a)<=He;(c||i===`battle`)&&r>6&&d!==A.tuned&&(A.tuned=d,d?Y(`HARMONICS: ALL NORMAL. SYNC ${(Le*(1-Math.abs(a)/200)).toFixed(1)}%`,H):K(`HARMONICS: OUT OF PHASE`,z));let f=Math.max(0,Math.min(1,(ft(e)-210)/50)),p=Math.max(0,1-((e-A.firedAt)/1e3-.5)/We);A.field=i===`battle`?Math.min(f,A.landed?p:1):+(i===`berserk`),Kt(e)},Kt=e=>{let t=A.phase,n=ft(e),r=performance.now(),i=!mt()||t===`dead`||t===`berserk`?0:t===`count`?104+(Be-A.count)*4:t===`launch`?138:t===`battle`?Math.min(176,112+A.hits.length*3+(n<150?18:0)+(n<110?16:0)):74+Math.min((e-A.plugAt)/1e3,12)*1.2;if(A.bpm=A.bpm<1?i:A.bpm+(i-A.bpm)*(i?.02:1),!A.bpm)return void(A.beats=[]);let a=A.beats.at(-1)??-1/0;r-a>6e4/A.bpm&&(A.beats.push(r-a<6e4/A.bpm+100?a+6e4/A.bpm:r),A.beats.length>12&&A.beats.shift(),A.bpm>108&&j.heart(Math.min((A.bpm-108)/60,1)))},qt=new Map,$=(e,t)=>{qt.get(e)!==t&&(qt.set(e,t),e.toggleAttribute(`on`,t))},Jt=e=>A.phase!==`off`&&(A.phase!==`boot`||Te.some(([t,n])=>J(e)>=t&&J(e)<n)),Yt=e=>{if(A.rifle!==`charging`)return!1;let t=(e-A.chargeAt)/1e3/Ue;return t<1&&t*6%1<.05},Xt=e=>{let t=(e-A.jolt.at)/o,n=!i&&(A.jolt.k>.45&&t<300+A.jolt.k*600&&[0,1,3,6].includes(Math.floor(t/70))||Yt(e)),r=A.phase,a=n||r===`dead`?`blackout`:[`alert`,`magi`,`sequence`,`arm`,`count`,`launch`,`battle`,`berserk`].includes(r)?`alert`:Jt(e)?null:`blackout`;if(a!==A.room){A.room=a;for(let e of E)a?e.setAttribute(`lighting`,a):e.removeAttribute(`lighting`)}},Zt=e=>{let t=A.phase,n=J(e),r=t===`boot`,i=Math.floor(e/333)%2==0,a=Math.floor(e/900)%2==0,o=e<A.testUntil,s=e=>r&&n>Ee+e*.09&&n<Ee+e*.09+.55,c=o||r&&n>1.95&&n<2.8499999999999996,l=new Set(Fe.flatMap(([,e],t)=>r&&n>ke+t*Ae?e:[]));M.forEach(([e],t)=>$(h[e],c||s(t%8)||l.has(e))),$(h.external,r),$(h.internal,c);for(let e of[O,ue,k,se])$(e,c);$(w.umb,c||(t===`off`?T.umb.checked||a:T.umb.checked)),$(w.int,c||T.int.checked),$(w.res,c||r&&T.res.checked),$(w.emg,c||r&&T.emg.checked&&i),te.forEach(e=>$(e,c)),x.forEach((e,t)=>{let a=r&&n>=Ne[t],o=a?`cyan`:`amber`;e.getAttribute(`color`)!==o&&e.setAttribute(`color`,o),$(e,c||a||r&&n>Oe.magi+.5&&i)});let u=Math.round(Math.min(Math.max((n-2.9)/3,0),1)*100),d=c?{range:`8888`,atf:`888`,lcl:`88.8`,power:`888`}:{range:``,atf:``,lcl:``,power:r&&n>2.9?String(u):``};for(let[e,t]of Object.entries(ie))t.textContent!==d[e]&&(t.textContent=d[e]);let f=c?`88:88:88`:r&&n>Ee?`--:--:--`:``;g.textContent!==f&&(g.textContent=f);let p=c?`888.8`:r&&n>Oe.sync?`0.0`:``;_.textContent!==p&&(_.textContent=p),v.value!==0&&(v.value=0),ee.value!==+!!c&&(ee.value=+!!c),$(C,c);let m=c?`888`:``;re.textContent!==m&&(re.textContent=m),en(e,c),j.klaxon(`off`),Xt(e)},Qt=e=>{if(yt())return Zt(e);let t=A.phase,n=J(e),r=i||Math.floor(e/333)%2==0,a=i||Math.floor(e/600)%2==0,s=e<A.testUntil,c=t===`battle`&&!!A.cutAt||t===`dead`||t===`berserk`,l=[`alert`,`magi`,`sequence`,`arm`,`count`,`launch`,`battle`,`dead`,`berserk`].includes(t),u=mt(),d=(e-A.plugAt)/1e3,f=ft(e),p={emergency:l&&(t!==`alert`||r),city:l&&t!==`alert`?!0:t===`alert`&&a,shelter:l,seal:t===`battle`||t===`dead`||t===`berserk`,n2:t===`battle`&&f<230&&f>190&&a,comms:t===`dead`||t===`berserk`?r:!0,mains:!0,cage:![`launch`,`battle`,`dead`,`berserk`,`arm`,`count`].includes(t)&&!(t===`sequence`&&gt()>=4),restraint:![`launch`,`battle`,`dead`,`berserk`,`arm`,`count`].includes(t)&&!(t===`sequence`&&gt()>=2),plug:u,lcl:u&&d>2.4&&(d>4.8||r),a10:u&&d>6&&t!==`dead`&&(t!==`berserk`||r),damage:t===`battle`&&f<190,nocontrol:t===`berserk`||t===`dead`&&r,track:t===`arm`||t===`count`||t===`launch`,surface:t===`battle`||t===`dead`||t===`berserk`,battery:t===`battle`&&f<60&&r,weapon:t===`battle`&&!!A.cutAt&&f>190,retrieve:t===`silenced`&&a,blue:t===`contact`&&n>2.5&&r||l&&(t!==`alert`||r),field:t===`battle`&&A.field>0||t===`berserk`&&r,magi:t===`magi`&&r,launch:t===`arm`&&pt()&&A.tuned&&a||t===`count`&&(!A.hold||r),liftoff:t===`launch`&&n>1.4,umbilical:c&&t===`battle`&&r||t===`dead`||t===`berserk`,limit:t===`berserk`,vitals:t===`battle`&&ft(e)<110&&r,eject:e-A.ejectAt<3e3&&r,berserk:t===`berserk`&&r,silenced:t===`silenced`,external:!c,internal:t===`battle`&&!!A.cutAt&&(ft(e)>60||r)||t===`berserk`&&r};if(t===`dead`)for(let e of Object.keys(p))p[e]=e===`battery`&&r;let m=i?0:Ct(e),b=Math.floor(e/o/60),ne=(e,t)=>Math.abs(Math.sin(e*12.9898+t*78.233)*43758.5453)%1,S=e=>m>.2&&ne(e,b)<m*.7||!i&&A.broken.has(e)&&ne(e,Math.floor(b/2))<.55,oe=t===`berserk`&&!i,ce=Math.floor(e/o/90),le=Math.floor(e/o/1400)%2==0,E=e=>le?e%8==ce%8||e%8==(ce+4)%8:Math.floor(e/8)===ce%3;Object.entries(h).forEach(([e,t],n)=>$(t,s||(oe&&n<M.length?E(n):!!p[e]&&!S(n)))),j.klaxon(Ot(e)),t===`battle`&&j.score(`fight`,Math.min(1,(A.cutAt?1-f/(F+A.reserve):0)*.8+A.hits.length*.03)),t===`contact`&&n>2.5&&!A.blue&&(A.blue=!0,j.pattern()),vn(e).forEach((e,t)=>{e!==A.voted[t]&&(e===`yes`||e===`no`)&&j.vote(t,e===`yes`),A.voted[t]=e}),t===`magi`&&Number.isFinite(A.ruledAt)&&!A.resolved&&(A.resolved=!0,j.resolve()),t===`berserk`!==A.roaring&&j.roar(A.roaring=t===`berserk`),Xt(e),$(O,t===`alert`&&!A.acked&&r||Ot(e)!==`off`&&t===`battle`&&r||s),$(ue,s),$(k,t===`silenced`&&a||s),$(se,s||ae.checked&&(t===`arm`&&pt()&&A.tuned&&r||t===`count`&&(!A.hold||r)||t===`battle`&&A.rifle===`ready`&&r));let D=t===`dead`;$(w.umb,s||T.umb.checked&&!c),$(w.int,s||T.int.checked&&!D||c&&t===`battle`&&r);let de=t===`battle`&&!!A.cutAt&&!A.reserve&&!T.res.checked;$(w.res,s||!D&&T.res.checked&&(!A.reserve||t===`battle`)||de&&r),$(w.emg,s||!D&&T.emg.checked&&r);let fe=gt();te.forEach((e,n)=>{let i=t===`sequence`&&n===fe&&!y[n].checked,o=n<fe?`green`:i?`amber`:`red`;e.getAttribute(`color`)!==o&&e.setAttribute(`color`,o),$(e,s||!D&&(n<fe&&y[n].checked||y[n].checked&&n>=fe&&r||i&&a))}),vn(e).forEach((t,n)=>{let i=t===`yes`?`cyan`:t===`think`||t===`hold`?`amber`:`red`;x[n].getAttribute(`color`)!==i&&x[n].setAttribute(`color`,i),$(x[n],s||t===`yes`||t===`no`||t===`think`&&r||t===`error`&&r||t===`hold`&&(r||Math.floor(e/111)%3==0))});let pe=t===`contact`?9800-n/P*6600:[`alert`,`magi`,`sequence`,`arm`,`count`].includes(t)?Math.max(800,3200-(e-A.alertAt)/1e3*45):t===`launch`?600:t===`battle`?A.field*300:-1,N={range:s?`8888`:pe<0?t===`berserk`?`0`:``:String(Math.round(pe)),atf:s?`888`:t===`battle`?String(Math.round(A.field*100)):t===`berserk`?r?`Err`:``:t===`contact`||[`alert`,`magi`,`sequence`,`arm`,`count`,`launch`].includes(t)?`100`:``,lcl:s?`88.8`:u&&d>2.4&&t!==`dead`?t===`berserk`?(41+Math.sin(e/90)).toFixed(1):(36.5+Math.sin(e/2e3)*.1).toFixed(1):``,power:s?`888`:c?t===`battle`?String(Math.ceil(f/(F+A.reserve)*100)):r?`0`:``:`100`};for(let[e,t]of Object.entries(ie))t.textContent!==N[e]&&(t.textContent=N[e]);let me=t===`battle`&&A.cutAt?dt(f):t===`dead`||t===`berserk`||t===`silenced`?t===`silenced`||r?`00:00:00`:``:s?`88:88:88`:`--:--:--`;g.textContent!==me&&(g.textContent=me);let he=A.sync<.05?`0.0`:Math.min(A.sync,999.9).toFixed(1);_.textContent!==he&&(_.textContent=he);let ge=Math.round(A.sync*10)/10;v.value!==ge&&(v.value=ge);let _e=Math.round(A.field*32)/32;ee.value!==_e&&(ee.value=_e);let ve=performance.now()-(A.beats.at(-1)??-1/0)<110;$(C,s||!D&&A.bpm>0&&ve);let ye=s?`888`:t===`berserk`?r?`---`:``:A.bpm>1&&!D?String(Math.round(A.bpm)):``;re.textContent!==ye&&(re.textContent=ye),en(e,s)},$t={text:``,color:``},en=(e,t=!1)=>{let n=A.phase,r=J(e),a=ft(e),o=i||Math.floor(e/333)%2==0,[s,c]=t?[`8888888888888888888888`,`amber`]:n===`off`?[``,`amber`]:n===`boot`?[r>Ee?`SYSTEM START`:``,`amber`]:n===`standby`?[`CONDITION GREEN`,`green`]:n===`contact`?[`TRACK UNKNOWN OBJECT`,`amber`]:n===`alert`?[`LEVEL ONE BATTLE STATIONS`,`red`]:n===`magi`?Number.isFinite(A.deadlockAt)&&!Number.isFinite(A.ruledAt)?[`MAGI DEADLOCK: RULE ON BALTHASAR`,`red`]:[`PUT THE SORTIE TO MAGI`,`amber`]:n===`sequence`?[`PREPARE EVA-01 FOR LAUNCH`,`amber`]:n===`arm`?[A.tuned?`AUTHORISE THE LAUNCH`:`TRIM PILOT HARMONICS`,`amber`]:n===`count`?A.hold?[o?`HOLD  HOLD  HOLD`:``,`red`]:[`LAUNCH  T-${Math.ceil(A.count)}`,`amber`]:n===`launch`?[`EVA-01 LAUNCH!`,`amber`]:n===`battle`?A.rifle===`ordered`?[`ALL CITY POWER TO THE RIFLE`,`red`]:A.rifle===`charging`?[`CHARGING  ${Math.floor(Math.min((e-A.chargeAt)/1e3/Ue,1)*100)}%`,`amber`]:A.rifle===`ready`?[o?`FIRE!`:``,`red`]:A.cutAt&&a<60?[`ONE MINUTE OF POWER`,`red`]:[`ENGAGE THE TARGET`,`amber`]:n===`dead`?[o?`ACTIVITY LIMIT`:``,`red`]:n===`berserk`?[`NO CONTROL`,`red`]:[`TARGET SILENCED`,`green`];c!==$t.color&&ne.setAttribute(`color`,$t.color=c),s!==$t.text&&(s&&!$t.text.startsWith(s.slice(0,6))&&!s.startsWith($t.text.slice(0,6)||`~`)&&j.order(),ne.textContent=$t.text=s)},tn=document.createElement(`canvas`),nn=(e,t)=>{let{width:n,height:r}=e.canvas;if(t>=1)return;if(t<=0){e.fillStyle=`#000`,e.fillRect(0,0,n,r);return}tn.width=n,tn.height=r,tn.getContext(`2d`).drawImage(e.canvas,0,0),e.fillStyle=`#000`,e.fillRect(0,0,n,r);let i=Math.max(2,r*t*t),a=(r-i)/2;e.drawImage(tn,0,0,n,r,0,a,n,i),e.globalCompositeOperation=`lighter`,e.fillStyle=`rgba(255,240,220,${(1-t)*.9})`,e.fillRect(0,a-1,n,i+2),e.globalCompositeOperation=`source-over`},rn=(e,t,n)=>{let{width:r,height:i}=e.canvas,a=(n-A.downAt)/700;if(e.fillStyle=`#000`,e.fillRect(0,0,r,i),a>=1||a<0)return;if(a<.35){let n=Math.max(2,i*(1-a/.35)**2);e.drawImage(t,0,0,r,i,0,(i-n)/2,r,n);return}let o=(a-.35)/.65,s=Math.max(3,r*(1-o/.5));e.fillStyle=`rgba(255,240,220,${o<.5?.9:.9*(1-(o-.5)/.5)})`,e.fillRect((r-s)/2,i/2-1.5,s,3)},an=(e,t,n)=>{let{width:r,height:a}=e.canvas;for(let s of A.scars){if(s.tube!==t)continue;let c=Math.round(s.y*a),l=Math.max(2,Math.round(s.h*a));if(s.kind===`dead`)e.fillStyle=`rgba(0,0,0,.88)`,e.fillRect(0,c,r,l);else if(s.kind===`stuck`)e.fillStyle=`rgba(255,236,210,${i?.6:.45+.35*Math.abs(Math.sin(n/o/47+s.dx))})`,e.fillRect(0,c,r,2);else{let t=i?0:Math.sin(n/o/61+s.y*40)*3;e.drawImage(e.canvas,0,c,r,l,s.dx+t,c,r,l)}}},on=(e,t)=>{let[n,r]=fe,i=J(t);if(e.fillStyle=`#000`,e.fillRect(0,0,n,r),i>=je){let t=e=>Math.min(Math.max((i-e)/.9,0),1);W(e,`NERV`,n/2,r/2+18,124,`rgba(255,122,0,${t(je)})`,{align:`center`,cond:.9}),G(e,`GOD'S IN HIS HEAVEN.  ALL'S RIGHT WITH THE WORLD.`,n/2,r/2+52,12,`rgba(255,122,0,${.8*t(10.4)})`,`center`);return}cn(e,n,`第一発令所 / SYSTEM START`,R);let a=-1;Fe.forEach(([t],n)=>{let r=ke+n*Ae;if(i<r)return;a=n;let o=62+n*19,s=t.slice(0,Math.floor((i-r)*90)),[,c,l]=t.match(/^(.*\. )(\S.*)$/)??[];s.length===t.length&&c&&l?W(e,l,L+G(e,c,L,o,13,R),o,13,H,{font:nt,weight:`normal`,cond:1}):G(e,s,L,o,13,n?R:U)}),Math.floor(t/400)%2&&(e.fillStyle=R,e.fillRect(L,66+a*19+6,8,13))},sn=(e,t)=>{let[n,r]=de,i=J(t),a=Ne.filter(e=>i>=e).length;e.fillStyle=`#000`,e.fillRect(0,0,n,r),G(e,`MAGI SYSTEM`,L,26,11,`rgba(255,122,0,.75)`),G(e,a===3?`ALL ONLINE`:`BOOT SEQUENCE`,n-L,26,11,a===3?V:`rgba(255,122,0,.75)`,`right`),W(e,`MAGI`,n/2,r/2-2,30,R,{align:`center`,cond:.9});let o=(t,n,r,a,o,s)=>{let c=Oe.magi+.5,l=Math.min(Math.max((i-c)/(Ne[n]-c),0),1);if(e.strokeStyle=l>=1?V:R,e.lineWidth=2,e.strokeRect(r,a,o,s),G(e,t,r+4,a-6,12,R),l>=1)return void W(e,`ONLINE`,r+o/2,a+s/2+9,26,V,{align:`center`,cond:.75});e.fillStyle=`rgba(255,122,0,.85)`,e.fillRect(r+12,a+s/2-8,(o-24)*l,10),e.lineWidth=1,e.strokeRect(r+12,a+s/2-8,o-24,10),G(e,`BOOT ${String(Math.floor(l*100)).padStart(3,` `)}%`,r+o/2,a+s-10,11,R,`center`)};o(`CASPER·3`,2,n/2-70,40,140,68),o(`BALTHASAR·2`,1,L,r/2+16,140,68),o(`MELCHIOR·1`,0,n-L-140,r/2+16,140,68),G(e,`SELF-DIAGNOSIS ${a}/3`,L,r-L,12,`rgba(255,122,0,.75)`)},cn=(e,t,n,r=R)=>{e.fillStyle=r,e.fillRect(0,0,t,3),W(e,`NERV`,L,26,22,r,{cond:.9}),W(e,n,78,26,16,r,{cond:.72}),e.fillRect(0,34,t,1)},ln=(e,t,n,r)=>{let a=A.phase,o=i||Math.floor(r/500)%2==0,s=a===`alert`?`ACKNOWLEDGE  ▶  ACK`:a===`sequence`?`THROW ${he[gt()]?.[0].toUpperCase()??``}  ▶  SWITCH ${gt()+1} OF 5`:a===`magi`?Number.isFinite(A.deadlockAt)&&!Number.isFinite(A.ruledAt)?`DEADLOCK  ▶  RULE ON BALTHASAR`:``:a===`arm`?A.tuned?pt()?ae.checked?`LAUNCH`:`LIFT THE GUARD  ▶  LAUNCH`:`TURN BOTH KEYS  ▶  OPS  CMD`:`TRIM THE HARMONICS  ▶  SYNC TRIM`:a===`count`&&A.hold?pt()&&ae.checked?`HOLD  ▶  LAUNCH TO RESUME`:`HOLD  ▶  KEYS AND GUARD, THEN LAUNCH`:a===`battle`&&A.rifle===`ordered`?`CITY POWER TO THE RIFLE  ▶  EMERGENCY`:a===`battle`&&A.rifle===`ready`?ae.checked?`FIRE  ▶  LAUNCH`:`LIFT THE GUARD  ▶  FIRE`:a===`battle`&&A.cutAt&&!A.reserve?`RESERVE CELLS  ▶  THROW RESERVE`:a===`battle`&&Ot(r)!==`off`?`SILENCE KLAXON  ▶  ACK`:a===`silenced`?`STAND DOWN  ▶  RESET`:``;return s?(e.fillStyle=`rgba(255,122,0,.16)`,e.fillRect(0,n-L-30,t,30),o&&W(e,s,t/2,n-L-9,19,z,{align:`center`,cond:.75}),!0):!1},un=(e,t,n,r,a)=>{A.log.slice(-r).forEach((r,o,s)=>{a-r.at<900&&!i&&Math.floor(a/110)%2||G(e,`> ${r.text}`,t,n-(s.length-1-o)*15,12,r.color)})},dn=()=>{let e=(lt()-1)/9*Math.PI*2;return[ot[0]+.02+Math.cos(e)*.07,ot[1]-.02+Math.sin(e)*.1]},fn=e=>{let t=A.phase,n=J(e),r=t===`contact`?Math.min(n/P,1)*.55:t===`alert`||t===`magi`?.55+Math.min(n/20,1)*.2:t===`standby`?-1:.85,i=.04+(ot[0]+.08-.04)*r,a=.98+(ot[1]+.06-.98)*r;if(t!==`battle`)return[i,a];let[o,s]=dn(),c=ft(e)>230?.13:.06,l=e/2600,u=Math.min(n/2,1);return[i+(o+Math.cos(l)*c-i)*u,a+(s+Math.sin(l)*c*1.3-a)*u]},pn=(e,t,n,r,a)=>{let o=36+n;e.strokeStyle=`rgba(255,122,0,.13)`,e.lineWidth=1,e.beginPath();for(let r=64;r<t;r+=64)e.rect(r+.5,36,0,n);for(let n=84;n<o;n+=48)e.rect(0,n+.5,t,0);e.stroke(),e.strokeStyle=a,e.beginPath();for(let n=0;n<t;n+=16)e.rect(n+.5,36,0,n%64?3:7);for(let t=36;t<o;t+=12)e.rect(12,t+.5,t%48==36?7:3,0);e.stroke();for(let n=64,r=1;n<t;n+=64,r++)G(e,String(r).padStart(2,`0`),n+3,50,9,`rgba(255,122,0,.6)`);for(let t=84,n=0;t<o;t+=48,n++)G(e,`ABCDEF`[n]??``,22,t-3,9,`rgba(255,122,0,.6)`);let s=t-L+6;e.strokeStyle=a,e.lineWidth=2,e.beginPath();for(let[t,n,r,i]of[[12,40,1,1],[s,40,-1,1],[12,o-4,1,-1],[s,o-4,-1,-1]])e.moveTo(t,n+i*14),e.lineTo(t,n),e.lineTo(t+r*14,n);e.stroke(),e.lineWidth=1;let c=(ot[0]+.02)*t,l=36+ot[1]*n,u=i?-.6:r/900%(Math.PI*2);e.save(),e.beginPath(),e.rect(0,36,t,n),e.clip();for(let t=0;t<18;t++)e.fillStyle=`rgba(64,255,112,${.05*(1-t/18)})`,e.beginPath(),e.moveTo(c,l),e.arc(c,l,150,u-(t+1)*.035,u-t*.035),e.fill();e.strokeStyle=`rgba(64,255,112,.7)`,e.beginPath(),e.moveTo(c,l),e.lineTo(c+Math.cos(u)*150,l+Math.sin(u)*150),e.stroke(),e.strokeStyle=`rgba(64,255,112,.25)`;for(let t of[50,100,150])e.beginPath(),e.arc(c,l,t,0,Math.PI*2),e.stroke();e.restore();let d=Math.floor(r/140);for(let n=0;n<4;n++){let r=d-n,i=(r*2654435761>>>0).toString(16).toUpperCase().padStart(8,`0`);G(e,`${(r&4095).toString(16).toUpperCase().padStart(3,`0`)}  ${i.slice(0,4)} ${i.slice(4)}`,t-L,o+18+n*13,10,`rgba(255,122,0,${.55-n*.12})`,`right`)}},mn=(e,t)=>{if(A.phase===`boot`)return on(e,t),nn(e,(J(t)-Oe.main)/De);let[n,r]=fe,a=A.phase,s=J(t),c=m.height;if(e.fillStyle=`#000`,e.fillRect(0,0,n,r),a===`dead`){let a=(t-A.downAt)/o;if(a<1100)return rn(e,bt[1],A.downAt+Math.min(a,700)*o);e.globalAlpha=Math.min((a-1100)/400,1)*(i||Math.floor(t/o/700)%4?1:.6),W(e,`活動限界`,n/2,r/2,54,`rgba(255,42,26,.8)`,{align:`center`,font:et,cond:.9}),G(e,`ACTIVITY LIMIT  ·  SIGNAL LOST`,n/2,r/2+34,13,`rgba(255,42,26,.6)`,`center`),G(e,`EMERGENCY CELLS  ·  TACTICAL ONLY`,n/2,r-L,11,`rgba(255,42,26,.45)`,`center`),e.globalAlpha=1;return}if(a===`berserk`)return _n(e,n,r,t,s);if(a===`launch`)return hn(e,n,r,t,s);if(a===`count`)return gn(e,n,r,t);cn(e,n,`第一発令所 / TACTICAL`,a===`standby`||a===`silenced`?R:B),W(e,new Date().toLocaleTimeString(`en-GB`,{hour12:!1}),n-L,26,18,R,{align:`right`,font:nt,weight:`normal`,cond:1}),e.globalAlpha=a===`alert`?.45:a===`sequence`||a===`arm`?.35:.9,e.drawImage(m,0,36),e.globalAlpha=1,pn(e,n,c,t,a===`standby`||a===`silenced`?R:B);let[l,u]=fn(t);if(l>0&&a!==`silenced`){let r=l*n,i=36+u*c,o=10+t/25%30;e.strokeStyle=B,e.lineWidth=1,a!==`battle`&&(e.setLineDash([4,4]),e.beginPath(),e.moveTo(.04*n,36+.98*c),e.lineTo(r,i),e.stroke(),e.setLineDash([])),e.strokeStyle=`rgba(255,42,26,${1-o/40})`,e.beginPath(),e.arc(r,i,o,0,Math.PI*2),e.stroke(),e.fillStyle=B,e.beginPath(),e.moveTo(r,i-7),e.lineTo(r+7,i),e.lineTo(r,i+7),e.lineTo(r-7,i),e.fill(),a===`battle`&&A.field>0&&(e.strokeStyle=z,rt(e,r,i,22+A.field*10),e.stroke());let d=a!==`contact`||s>2.5;G(e,d?`ANGEL`:`UNKNOWN`,r+12,i-8,12,d?B:z)}if(a===`battle`){let[r,a]=dn(),s=r*n,l=36+a*c,u=(t-A.jolt.at)/o,d=!i&&u<520;if(e.strokeStyle=`rgba(255,42,26,.7)`,e.lineWidth=1.5,e.beginPath(),A.hits.forEach(t=>{let n=s+Math.cos(t)*15,r=l+Math.sin(t)*15;e.moveTo(n-3,r-3),e.lineTo(n+3,r+3),e.moveTo(n+3,r-3),e.lineTo(n-3,r+3)}),e.stroke(),d){let r=1-u/520,[i,a]=fn(t);e.strokeStyle=`rgba(255,236,210,${r})`,e.lineWidth=1+r*3,e.beginPath(),e.moveTo(i*n,36+a*c),e.lineTo(s,l),e.stroke();for(let t of[0,14])e.strokeStyle=`rgba(255,42,26,${r})`,e.beginPath(),e.arc(s,l,8+t+(1-r)*46*A.jolt.k,0,Math.PI*2),e.stroke()}let f=(t-A.firedAt)/o;if(A.rifle===`fired`&&Number.isFinite(A.firedAt)&&f<1600){let r=1-f/1600,[i,a]=fn(t),o=i*n,u=36+a*c;for(let[t,n]of[[14,.15],[6,.4],[2,1]])e.strokeStyle=`rgba(255,250,240,${n*r})`,e.lineWidth=t*(.4+r),e.beginPath(),e.moveTo(s,l),e.lineTo(o,u),e.stroke();if(f>500)for(let t=0;t<6;t++){let n=30+(f-500)/14+t*4,i=t*1.05;e.strokeStyle=`rgba(255,179,0,${r})`,e.lineWidth=1.5,e.beginPath(),e.arc(o,u,n,i,i+.6),e.stroke()}}if(A.rifle===`charging`||A.rifle===`ready`){e.strokeStyle=`rgba(255,236,210,${.25+.5*(A.rifle===`ready`?1:Math.min((t-A.chargeAt)/1e3/Ue,1))})`,e.lineWidth=1,e.setLineDash([3,5]),e.lineDashOffset=-t/20,e.beginPath();for(let t=0;t<7;t++){let r=t/7*Math.PI*2+.4;e.moveTo((ot[0]+Math.cos(r)*.3)*n,36+(ot[1]+Math.sin(r)*.38)*c),e.lineTo(s,l)}e.stroke(),e.setLineDash([])}e.lineWidth=1,G(e,`TRACK ${lt()}`,s-12,l+31,10,Qe),e.fillStyle=d&&Math.floor(u/70)%2==0?U:Qe,e.fillRect(s-5,l-5,10,10),G(e,`EVA-01`,s-12,l+18,12,Qe),A.cutAt||(e.strokeStyle=Qe,e.beginPath(),e.moveTo(s,l),e.lineTo(s-40,l+30),e.stroke())}if(a===`contact`){let t=s>2.5;e.fillStyle=`rgba(0,0,0,.6)`,e.fillRect(0,44,n,46),W(e,t?`PATTERN BLUE`:`PATTERN ORANGE`,12,80,34,t?V:z,{cond:.72}),G(e,t?`WAVEFORM CONFIRMED`:`ANALYSING WAVEFORM`,n-12,74,12,t?V:z,`right`)}if(a===`alert`&&(at(e,0,40,n,18,B,t/20),e.fillStyle=`rgba(0,0,0,.75)`,e.fillRect(0,64,n,150),W(e,`EMERGENCY`,n/2,140,80,B,{align:`center`,cond:.66}),W(e,`パターン青  使徒です`,n/2,188,34,U,{align:`center`,font:et,cond:.85}),G(e,`BLOOD TYPE: BLUE`,n/2,206,12,V,`center`),at(e,0,220,n,18,B,-t/20)),a===`magi`){e.fillStyle=`rgba(0,0,0,.7)`,e.fillRect(0,70,n,90),W(e,`MAGI SYSTEM`,n/2,116,40,V,{align:`center`,cond:.72});let r=Number.isFinite(A.ruledAt),i=Number.isFinite(A.deadlockAt);G(e,r?`RESOLUTION: SORTIE APPROVED 2 TO 1`:i?`RESOLUTION: DEADLOCK 1 TO 1`:`DELIBERATING${`.`.repeat(1+Math.floor(t/300)%3)}`,n/2,142,14,r?V:i?z:V,`center`)}if(a===`sequence`||a===`arm`){W(e,`EVA-01  発進準備`,14,66,26,R,{font:et,cond:.85});let t=gt();he.forEach(([,r],i)=>{let a=92+i*24,o=i<t;e.strokeStyle=o?H:`rgba(255,122,0,.6)`,e.strokeRect(14,a-13,14,14),o&&(e.fillStyle=H,e.fillRect(17,a-10,8,8)),G(e,r,38,a,13,o?H:i===t?z:`rgba(255,122,0,.55)`),G(e,o?`COMPLETE`:i===t?`STANDING BY`:``,n-14,a,13,o?H:z,`right`)}),a===`arm`&&b.forEach((t,r)=>{let i=226+r*22;G(e,`${r?`COMMAND`:`OPERATIONS`} KEY`,38,i,13,t.checked?H:z),G(e,t.checked?`ACCEPTED`:`WAITING`,n-14,i,13,t.checked?H:z,`right`)})}if(a===`battle`&&A.cutAt){let r=ft(t);if(e.fillStyle=`rgba(0,0,0,.65)`,e.fillRect(n-186,44,176,62),G(e,`INTERNAL BATTERY`,n-98,62,11,B,`center`),A.rifle===`charging`||A.rifle===`ready`){let r=A.rifle===`ready`?1:Math.min((t-A.chargeAt)/1e3/Ue,1),i=A.rifle===`ready`&&Math.floor(t/250)%2;e.fillStyle=`rgba(0,0,0,.65)`,e.fillRect(n-186,110,176,40),G(e,A.rifle===`ready`?`POSITRON RIFLE  READY`:`POSITRON RIFLE  ${Math.floor(r*100)}%`,n-98,126,11,i?U:z,`center`),e.strokeStyle=z,e.strokeRect(n-176,134,156,8),e.fillStyle=i?U:z,e.fillRect(n-174,136,152*r,4)}W(e,dt(r),n-98,98,36,r<60&&Math.floor(t/333)%2?U:B,{align:`center`,font:nt,weight:`bold`,cond:.8}),t-A.cutAt<2500&&(i||Math.floor(t/250)%2)&&(e.fillStyle=`rgba(255,42,26,.85)`,e.fillRect(0,120,n,52),W(e,`UMBILICAL CABLE SEVERED`,n/2,158,38,`#000`,{align:`center`,cond:.7}))}if(a===`silenced`&&(e.fillStyle=`rgba(0,0,0,.7)`,e.fillRect(0,70,n,110),W(e,`TARGET SILENCED`,n/2,130,56,H,{align:`center`,cond:.68}),G(e,`PATTERN BLUE: LOST  ·  EVA-01: NO RESPONSE`,n/2,160,12,H,`center`)),a===`standby`){un(e,L,r-L-40,3,t),G(e,`CONDITION GREEN  ·  ALL SYSTEMS NOMINAL`,L,r-L-20,12,`rgba(255,122,0,.8)`),G(e,`EVA-01: CAGE 7  ·  ${T.umb.checked?`EXTERNAL`:`NO`} POWER  ·  TRACK ${lt()}`,L,r-L-4,12,`rgba(255,122,0,.6)`);return}let d=ln(e,n,r,t),f=r-L-(d?40:4);e.fillStyle=`rgba(0,0,0,.7)`,e.fillRect(0,f-45-14,n,63),un(e,L,f,4,t)},hn=(e,t,n,r,a)=>{let o=Math.min(a,2.6)**2*260;e.fillStyle=`#000`,e.fillRect(0,0,t,n),e.strokeStyle=R;for(let r of[t*.2,t*.8])e.fillStyle=`rgba(255,122,0,.25)`,e.fillRect(r-6,0,12,n);for(let r=0;r<40;r++){let i=20+r*97%9*((t-40)/8),s=(r*53+a*o)%(n+80)-40;e.fillStyle=r%3?`rgba(255,179,0,.8)`:`rgba(255,255,255,.9)`,e.fillRect(i,s,2,12+Math.min(o/8,70))}let s=Math.max(0,1200-a*a*70);cn(e,t,`EVA-01 / LAUNCH TRACK ${lt()}`,R),W(e,`発進`,t/2,n/2+40,140,a<.6||i||Math.floor(r/200)%2?U:B,{align:`center`,font:et,cond:.95}),G(e,`DEPTH -${s.toFixed(0).padStart(4,`0`)} M`,L,n-L-20,14,z),G(e,`ACCEL ${Math.min(a*3.6,8.5).toFixed(1)} G`,L,n-L,14,z),a>1.4&&W(e,`LIFT OFF`,t-L,n-L,32,H,{align:`right`,cond:.7})},gn=(e,t,n,r)=>{let a=Math.ceil(A.count),o=A.count-Math.floor(A.count),s=i||Math.floor(r/333)%2==0;e.fillStyle=`#000`,e.fillRect(0,0,t,n),cn(e,t,`EVA-01 / LAUNCH TRACK ${lt()}`,A.hold?z:U),W(e,`発進まで`,L,66,24,R,{font:et,cond:.85}),G(e,`T-${dt(A.count)}`,t-L,62,14,A.hold?z:U,`right`);let c=t/2,l=n/2+18;e.strokeStyle=`rgba(255,122,0,.25)`,e.lineWidth=2,e.beginPath(),e.arc(c,l,112,0,Math.PI*2),e.stroke(),A.hold||(e.strokeStyle=U,e.lineWidth=6,e.beginPath(),e.arc(c,l,112,-Math.PI/2,-Math.PI/2+o*Math.PI*2),e.stroke()),e.lineWidth=1,W(e,String(a),c,l+62,190,A.hold?s?z:`rgba(255,179,0,.3)`:U,{align:`center`,font:nt,weight:`bold`,cond:.9}),A.hold&&(e.fillStyle=`rgba(255,179,0,.9)`,e.fillRect(0,l-20,t,44),W(e,`LAUNCH HOLD`,c,l+14,38,`#000`,{align:`center`,cond:.7})),ln(e,t,n,r)},_n=(e,t,n,r,a)=>{e.fillStyle=`rgba(150,0,0,${i?1:.7+.3*(Math.floor(r/340)%2)})`,e.fillRect(0,0,t,n),it(e,t,n,46,Math.floor(r/340),.5);let o=i?0:Math.sin(r/37)*6,s=i?0:Math.cos(r/29)*4;if(e.fillStyle=`rgba(0,0,0,.7)`,e.fillRect(0,n/2-116,t,236),W(e,`暴走`,t/2+o,n/2+50+s,170,a<.5?U:`#ff2a1a`,{align:`center`,font:et,cond:1}),W(e,`EVA-01 REACTIVATED`,t/2,n/2+108,26,U,{align:`center`,cond:.7}),cn(e,t,`第一発令所 / TACTICAL`,U),!i)for(let i=0;i<4;i++){let a=Math.floor((r/7+i*97)%n),o=6+i*5%14;e.drawImage(e.canvas,0,a,t,o,(i%2?1:-1)*((r/3+i*31)%40),a,t,o)}G(e,`INTERNAL POWER 0%  ·  SIGNAL REFUSED  ·  CONTROL LOST`,t/2,n-L,12,U,`center`)},vn=e=>{let t=A.phase,n=J(e);if(t===`berserk`)return[`error`,`error`,`error`];if(t!==`magi`)return[`idle`,`idle`,`idle`];let r=(e,t)=>n<e?`think`:t;return[r(Re[0],`yes`),Number.isFinite(A.ruledAt)?`yes`:r(Re[1],`hold`),r(Re[2],`no`)]},yn=(e,t)=>{if(A.phase===`boot`)return sn(e,t),nn(e,(J(t)-Oe.magi)/De);let[n,r]=de,a=A.phase,s=J(t);if(a===`dead`)return rn(e,bt[0],A.downAt+Math.min((t-A.downAt)/o,700)*o);if(e.fillStyle=`#000`,e.fillRect(0,0,n,r),[`alert`,`sequence`,`arm`,`count`,`launch`,`battle`,`silenced`].includes(a))return bn(e,t);let[c,l,u]=vn(t),d=i||Math.floor(t/160)%2==0,f=(t,n,r,i,a,o)=>{e.fillStyle=n===`error`&&!d?`rgba(255,42,26,.2)`:n===`yes`?V:n===`no`||n===`error`?B:n===`hold`?d?z:`rgba(255,179,0,.3)`:n===`think`&&d?`rgba(255,122,0,.35)`:`rgba(255,122,0,.08)`,e.fillRect(r,i,a,o),e.strokeStyle=R,e.lineWidth=2,e.strokeRect(r,i,a,o);let s=n===`yes`?`承認`:n===`no`?`否定`:n===`think`?`審議中`:n===`hold`?`保留`:n===`error`?`ERROR`:`NORMAL`,c=n===`yes`||n===`no`||n===`error`||n===`hold`?`#000`:R;n===`error`?W(e,s,r+a/2,i+o/2+12,34,c,{align:`center`,cond:.7}):n===`idle`?G(e,s,r+a/2,i+o/2+5,13,`rgba(255,122,0,.7)`,`center`):W(e,s,r+a/2,i+o/2+16,44,c,{align:`center`,font:et,cond:.9}),G(e,t,r+4,i-6,12,R)};G(e,`MAGI SYSTEM`,L,26,11,`rgba(255,122,0,.75)`),G(e,a===`magi`?`REQ ${Math.min(s*31,99).toFixed(0).padStart(2,`0`)}/99`:a===`alert`?`ON CALL`:`STANDBY`,n-L,26,11,`rgba(255,122,0,.75)`,`right`),e.strokeStyle=`rgba(255,122,0,.5)`,e.lineWidth=1,e.beginPath();for(let[t,r,i,a]of[[10,32,1,1],[n-L+8,32,-1,1]])e.moveTo(t,r+a*10),e.lineTo(t,r),e.lineTo(t+i*10,r);e.stroke(),W(e,`MAGI`,n/2,r/2-2,30,R,{align:`center`,cond:.9}),e.strokeStyle=`rgba(255,122,0,.6)`,e.lineWidth=1,e.beginPath(),e.moveTo(n/2,108),e.lineTo(n/2,r/2-28),e.moveTo(n/2-34,r/2-10),e.lineTo(124,r/2+16),e.moveTo(n/2+34,r/2-10),e.lineTo(n-124,r/2+16),e.stroke(),f(`CASPER·3`,u,n/2-70,40,140,68),f(`BALTHASAR·2`,l,L,r/2+16,140,68),f(`MELCHIOR·1`,c,n-L-140,r/2+16,140,68),G(e,`提訴`,L,r-L-16,13,R),G(e,a===`magi`?`SORTIE: EVA-01`:`--`,54,r-L-16,13,R),G(e,`決議`,L,r-L,13,R);let p=a===`magi`&&Number.isFinite(A.ruledAt),m=a===`magi`&&Number.isFinite(A.deadlockAt);p?W(e,`可決`,54,r-L+2,22,V,{font:et,cond:.95}):m?W(e,`保留  DEADLOCK`,54,r-L+2,22,d?z:R,{font:et,cond:.85}):G(e,a===`magi`?`...`:`--`,54,r-L,13,R),G(e,a===`berserk`?`SELF-DIAGNOSIS: FAULT`:`CODE 601`,n-L,r-L,12,a===`berserk`?B:`rgba(255,122,0,.6)`,`right`)},bn=(e,t)=>{let[n,r]=de,a=A.phase,o=(t-A.alertAt)/1e3,s=(n-36)/Ge,c=(e,t=1)=>Math.abs(Math.sin(e*12.9898*t+4.1)*43758.5453)%1,l=e=>e<=0?0:e>=1?1:e*e*(3-2*e),u=A.rifle===`charging`?Math.min((t-A.chargeAt)/1e3/Ue,1):[`ready`,`fired`].includes(A.rifle)&&a===`battle`?1:0;G(e,`TOKYO-3  INTERCEPT SYSTEM`,L,26,11,`rgba(255,122,0,.75)`),W(e,`迎撃態勢`,n-L,30,18,a===`alert`?B:R,{align:`right`,font:et,cond:.9}),e.fillStyle=`rgba(255,122,0,.07)`,e.fillRect(0,160,n,r-150-10-52),e.strokeStyle=`rgba(255,122,0,.35)`,e.lineWidth=1,e.beginPath(),e.moveTo(n/2-34,r-56),e.lineTo(n/2,r-92),e.lineTo(n/2+34,r-56),e.stroke(),G(e,`NERV`,n/2,r-60,9,`rgba(255,122,0,.5)`,`center`),at(e,0,150,n,10,`rgba(255,122,0,.35)`,0);let d=0,f=0,p=0,m=Ge-Ke.length;for(let n=0,a=0,m=0;n<Ge;n++){let h=L+n*s+2,g=s-4,_=34+c(n)*74,v=Ke.includes(n),ee=Math.floor(n/(Ge/6)),y=u*6>ee;y||p++;let te=y?`rgba(255,122,0,.35)`:R;if(v){let r=l((o-7.5-m++*.35)/1.6);if(A.razed.has(n)){e.fillStyle=`rgba(255,42,26,.5)`,e.beginPath(),e.moveTo(h,150);for(let t=0;t<=4;t++)e.lineTo(h+g*t/4,144-c(n,t+2)*12);e.lineTo(h+g,150),e.fill(),!i&&Math.floor(t/90+n)%3&&(e.fillStyle=z,e.fillRect(h+c(n,t>>7)*g,142-c(n,(t>>7)+1)*14,2,2));continue}r>.98&&f++;let a=150-_*.8*r;e.strokeStyle=B,e.strokeRect(h+.5,a+.5,g-1,150-a),r>.9&&(e.fillStyle=B,e.fillRect(h+2,a-4,g-4,4),e.fillRect(h+g/2-1,a-12,2,8));continue}let b=l((o-.8-a*.28)/1.6);a++,b>.98&&d++;let x=_*(1-b);if(x>.5&&(e.strokeStyle=te,e.strokeRect(h+.5,150-x+.5,g-1,x),!y)){e.fillStyle=`rgba(255,179,0,.55)`;for(let t=150-x+4;t<147;t+=6)for(let r of[2,g-4])c(n*31+t)>.3&&e.fillRect(h+r,t,2,2)}if(b>0){let t=Math.min(_*b,r-60-150-10);e.strokeStyle=y?`rgba(255,122,0,.25)`:`rgba(255,122,0,.6)`,e.strokeRect(h+.5,160.5,g-1,t)}}if(A.rifle===`charging`){e.fillStyle=U;for(let r=0;r<5;r++)e.fillRect((t/2+r*80)%n,154,14,2)}let h=Math.round(p/Ge*100),g=r-L;G(e,`RETRACTED   ${String(d).padStart(2,`0`)}/${m}`,L,g-26,12,d===m?H:R),G(e,`ARMAMENT    ${f}/${Ke.length-A.razed.size}${A.razed.size?`  LOST ${A.razed.size}`:``}`,L,g-13,12,A.razed.size?B:f?H:R),G(e,`SHELTERS    ${o>3?`SEALED`:`OPEN`}`,L,g,12,o>3?H:z),G(e,`CITY POWER`,n-L,g-26,12,R,`right`),W(e,`${h}%`,n-L,g+2,26,h<50?B:R,{align:`right`,font:nt,weight:`bold`,cond:.85})},xn=(e,t)=>{let[n,r]=pe,a=A.phase,s=(t-A.plugAt)/1e3,c=J(t);if(a===`dead`)return rn(e,bt[2],A.downAt+Math.min((t-A.downAt)/o,700)*o);e.fillStyle=`#000`,e.fillRect(0,0,n,r);let l=e=>`rgba(220,255,220,${e})`;e.strokeStyle=l(.18),e.lineWidth=1,e.beginPath();for(let t=0;t<=n;t+=32)e.rect(t,40,0,150);for(let t=40;t<=190;t+=30)e.rect(0,t,n,0);e.stroke(),G(e,`EVA-01  PILOT HARMONICS`,L,26,13,l(.9));let u=mt(),d=a===`boot`&&c<8.4,f=1-Math.min(Math.abs(ht())/40,1),p=a===`berserk`?-1:u||d?d?1:Math.min(Math.max(s-3.6,0)/6,1)*f:0;for(let r=0;r<3;r++){e.strokeStyle=l(.9-r*.2),e.lineWidth=2,e.beginPath();for(let i=0;i<=n;i+=2){let n=Math.sin(i/24+t/300)*22,o=Math.sin(i/(9+r*7)+t/(120+r*70)+r)*26,s=a===`berserk`?Math.sin(i*.9+t/17+r)*60*Math.min(c,1):0,l=d||u?1:.05,f=Math.min(190,Math.max(40,115+(n*p+o*(1-Math.abs(p))+s)*l));i?e.lineTo(i,f):e.moveTo(i,f)}e.stroke()}if(a===`berserk`?(e.fillStyle=i||Math.floor(t/340)%2?l(.9):l(.3),e.fillRect(0,196,n,34),W(e,`SYNC RATIO OVER 400%`,n/2,222,26,`#000`,{align:`center`,cond:.72})):(G(e,`SYNC RATIO  ${A.sync.toFixed(1).padStart(5,` `)} %`,L,210,14,l(.95)),G(e,u?`PLUG DEPTH  FIXED`:d?`SELF-TEST  ${Math.min(Math.floor((c-Oe.sync)/(8.4-Oe.sync)*100),99)}%`:`ENTRY PLUG  NOT INSERTED`,L,226,12,l(.6))),a===`boot`&&nn(e,(c-Oe.sync)/De),A.beats.length&&Sn(e,L,270,150,26,l),[`sequence`,`arm`,`count`,`launch`].includes(a)){let r=ge.filter(([e])=>s>=e).map(([,e])=>[e,.5]);s>8.4&&r.push(A.tuned?[`HARMONICS: ALL NORMAL`,1]:[`HARMONICS: ${ht()>0?`+`:``}${Math.round(ht())}  TRIM`,i||Math.floor(t/300)%2?1:.3]);let a=r.slice(-3);a.forEach(([t,r],i)=>G(e,t,n-L,244+i*14,11,l(i===a.length-1?r:.5),`right`))}else a===`battle`&&!A.tuned?G(e,`HARMONICS: ${Math.round(ht())}  TRIM`,n-L,258,12,l(i||Math.floor(t/300)%2?1:.3),`right`):t-A.ejectAt<3e3&&G(e,a===`battle`||a===`berserk`?`PLUG EJECT: SIGNAL REJECTED`:`PLUG EJECT: NO PLUG`,n-L,258,12,l(1),`right`)},Sn=(e,t,n,r,i,a)=>{let o=performance.now(),s=2500,c=e=>e<0?0:e<90?Math.sin(e/90*Math.PI)*.12:e<120?0:e<135?-.15:e<155?1:e<175?-.3:e<300?0:e<460?Math.sin((e-300)/160*Math.PI)*.22:0;e.strokeStyle=a(.9),e.lineWidth=1.5,e.beginPath();for(let a=0;a<=r;a+=1){let l=o-s+a/r*s,u=0;for(let e of A.beats)u+=c(l-e);let d=n-u*i;a?e.lineTo(t+a,d):e.moveTo(t,d)}e.stroke(),G(e,`ECG`,t,n-i-2,9,a(.5))},Cn=new Set,wn=-1,Tn=0,En=e=>{e.checked||(e.checked=!0,e.dispatchEvent(new Event(`change`,{bubbles:!0})))},Dn=e=>{let t=A.phase,n=J(e);A.since!==wn&&(wn=A.since,Cn.clear());let r=(e,t,r)=>{t>n||Cn.has(e)||(Cn.add(e),r())};t===`alert`&&r(`ack`,1.6,()=>O.click()),t===`magi`&&r(`rule`,Re[1]+1.3,()=>x[1].click());let i=performance.now();if(mt()&&![`dead`,`berserk`].includes(t)&&(e-A.plugAt)/1e3>6.6&&Math.abs(ht())>1&&i>Tn&&(Tn=i+70,S.value=String(+S.value+Math.sign(ht())),S.dispatchEvent(new Event(`input`,{bubbles:!0}))),t===`sequence`&&y.forEach((e,t)=>r(`step ${t}`,.9+t*.55,()=>En(e))),t===`arm`&&(b.forEach((e,t)=>r(`key ${t}`,.7+t*.6,()=>En(e))),r(`guard`,2.2,()=>En(ae)),r(`go`,A.tuned?3:1/0,()=>se.click())),t===`battle`&&A.cutAt){let t=(e-A.cutAt)/1e3;r(`hush`,t>1.4?0:1/0,()=>O.click()),r(`reserve`,t>3?0:1/0,()=>En(T.res)),r(`route`,A.rifle===`ordered`&&t>3.8?0:1/0,()=>En(T.emg)),r(`fire`,A.rifle===`ready`&&(e-A.chargeAt)/1e3>4.1000000000000005?0:1/0,()=>se.click())}t===`silenced`&&r(`reset`,5,()=>k.click())};D||vt(T.umb,!0),q(A.phase);let On=0,kn=()=>{let e=l();if(Gt(e),s&&Dn(e),Qt(e),tt?.light(A.room,A.phase!==`off`&&A.phase!==`dead`,A.room===`alert`),A.phase===`off`)[f,d,p].forEach((t,n)=>rn(t,bt[n],e));else{mn(f,e),yn(d,e),xn(p,e),[d,f,p].forEach((t,n)=>{A.phase===`berserk`&&nn(t,(e-A.surgeAt)/o/260),an(t,n,e)});let t=i?0:Ct(e);if(t>.04)for(let e of[f,d,p])ut(e,t)}let n=Tt(e);if(n>.01||A.shaken){let r=(e-A.jolt.at)/o,a=i?0:Ct(e)*Math.cos(r/Ye*Math.PI*2),s=(Math.random()-.5)*n*I*.35,c=(Math.random()-.5)*n*I*.35,l=Math.cos(A.jolt.dir)*a*I+s,u=Math.sin(A.jolt.dir)*a*I+c,d=i?0:A.jolt.k*Math.max(0,1-r/90),f=n>.01||d>.01;t.style.translate=f?`${l.toFixed(1)}px ${u.toFixed(1)}px`:``,t.style.rotate=f?`${(a*qe*Math.sin(A.jolt.dir*3)).toFixed(2)}deg`:``,t.style.scale=f?(1+n*.06).toFixed(3):``,t.style.filter=f&&d>.01?`brightness(${(1+d*1.6).toFixed(2)}) saturate(${(1-d*.6).toFixed(2)})`:``,A.shaken=f}On=requestAnimationFrame(kn)};return On=requestAnimationFrame(kn),()=>{cancelAnimationFrame(On),Object.assign(t.style,{translate:``,rotate:``,scale:``,filter:``}),j.stop(),tt?.stop();for(let[e,t]of[[O,kt],[ue,At],[k,jt],[se,It]])e.removeEventListener(`click`,t);ce.removeEventListener(`change`,Lt),le.removeEventListener(`change`,zt),t.removeEventListener(`change`,Ft),t.removeEventListener(`change`,Rt),t.removeEventListener(`change`,Nt),t.removeEventListener(`change`,Pt),x.forEach(e=>e.removeEventListener(`click`,Ut)),S.removeEventListener(`input`,Wt)}}function ut(e,t){let{width:n,height:r}=e.canvas;t>.3&&e.drawImage(e.canvas,(Math.random()-.5)*n*.08*t,(Math.random()-.5)*r*.5*t);for(let i=0,a=Math.ceil(3+t*12);i<a;i++){let i=Math.random()*r,a=3+Math.random()*60*t;e.drawImage(e.canvas,0,i,n,a,(Math.random()-.5)*260*t,i,n,a)}e.fillStyle=`rgba(255,255,255,${(.08+t*.3).toFixed(2)})`;for(let i=0,a=Math.ceil(t*26);i<a;i++)e.fillRect(Math.random()*n*.3,Math.random()*r,n*(.3+Math.random()*.7),1);e.fillStyle=`rgba(0,0,0,${(t*.5).toFixed(2)})`,e.fillRect(0,0,n,r)}function dt(e){let t=Math.floor(e*100),n=Math.floor(t/6e3),r=Math.floor(t/100)%60;return`${String(n).padStart(2,`0`)}:${String(r).padStart(2,`0`)}:${String(t%100).padStart(2,`0`)}`}var J=720,ft=8,pt=8,mt=92,ht=232,gt=124,_t=[49,23],vt=[206,155],Y=[264,198],X=2,yt=2,Z=e=>`${e*4}px`,bt=`#ff7a1a`,xt=`#a8551a`,St=(e,t=``,n=bt)=>`<span d-mark="label flat" ink="${n}" class="${t}">${e}</span>`,Q=(e,t,n=``)=>`<div class="col ${n}">${e}${St(t)}</div>`,Ct=e=>`<i d-mark="print silk" class="rule ${e}" color="${bt}" path="M0 0H100V1H0Z" viewbox="0 0 100 1"></i>`,wt=(e,t)=>`<i d-mark="print silk" class="hazard ${e}" color="${bt}" viewbox="0 0 ${t*2} 2" path="${Array.from({length:t},(e,t)=>`M${t*2} 2L${t*2+1} 0H${t*2+2}L${t*2+1} 2Z`).join(``)}"></i>`,Tt=(e,t)=>`<div class="head">${St(e,`jp`)}${St(t,`en`)}${Ct(`under`)}</div>`,Et={id:`eva`,title:`Operations station`,note:`A sortie from a cold start to the end. Throw the umbilical breaker to bring the station up. Acknowledge the alarm, let the three computers vote, throw the launch sequence in order, turn both keys and lift the guard. After that it is out of your hands.`,era:`retro`,order:90,dark:!0,height:1856,html:`<div id="eva">
  <d-device class="alarms" material="paint-panel-black" radius="4" screws wear="0.35">
    <div class="ident">
      <span d-mark="print silk" class="nerv" color="${bt}">NERV</span>
      ${St(`第一発令所`,`jp`)}
      ${St(`Operations 03`,`en`)}
      ${wt(`id-band`,12)}
    </div>
    <div class="matrix">
      ${j.map((e,t)=>`${St(e,`row`,xt)}${M.slice(t*8,(t+1)*8).map(([e,t,n,r])=>`<div d-lamp="annunciator" class="t-${e}" color="${r}">${t}<br>${n}</div>`).join(``)}`).join(``)}
    </div>
    <div class="acks">
      <button d-key="flush" class="k-ack" color="amber">Ack</button>
      <button d-key="flush" class="k-test" color="white">Test</button>
      <button d-key="flush" class="k-reset" color="green">Reset</button>
    </div>
    <div class="clock">
      <div class="clock-head">${St(`活動限界まで`,`jp`)}${St(`Active time remaining`,`en`)}</div>
      <div class="clock-body">
        <div d-readout="seven" class="timer" color="red" digits="6">--:--:--</div>
        <div class="supply">
          <div d-lamp="annunciator" class="t-external" color="green">外部電源<br>External</div>
          <div d-lamp="annunciator" class="t-internal" color="red">内部電源<br>Internal</div>
        </div>
      </div>
    </div>
  </d-device>
  <d-device class="bay" material="paint-panel-black" radius="4" wear="0.35">
    <div class="side">
      <div class="votes">${[`Melchior·1`,`Balthasar·2`,`Casper·3`].map(e=>`<button d-key="lamp" class="vote" color="cyan">${e}</button>`).join(``)}</div>
      ${Q(`<d-screen class="s-magi" kind="crt" gain="2.6" live><canvas width="${de[0]}" height="${de[1]}"></canvas></d-screen>`,`MAGI 審議`)}
    </div>
    <div class="centre">
      <div class="orders">${St(`指令`,`jp`)}<div d-readout="matrix" class="order" color="amber" scroll pitch="${X}" frame="${yt}"></div></div>
      ${Q(`<d-screen class="s-main" kind="crt" gain="2.6" live><canvas width="${fe[0]}" height="${fe[1]}"></canvas></d-screen>`,`戦術 Tactical`)}
    </div>
    <div class="side">
      <div class="gauges">${N.map(([e,t,n,r,i])=>`<div class="gauge">${St(`${t} ${n}`,`small`)}<div d-readout="seven" class="r-${e}" color="${i}" digits="${r}"></div></div>`).join(``)}</div>
      ${Q(`<d-screen class="s-sync" kind="crt" mono gain="2.4" live><canvas width="${pe[0]}" height="${pe[1]}"></canvas></d-screen>`,`シンクロ Harmonics`)}
    </div>
  </d-device>
  <d-device class="desk" material="paint-panel-black" radius="4" screws wear="0.35">
    <section class="s-steps">
      ${Tt(`発進準備`,`Launch sequence`)}
      <div class="steps">${he.map(([e],t)=>Q(`<div d-lamp="led" class="led" color="green"></div><div d-switch="toggle"><input type="checkbox" class="step" data-step="${t}" aria-label="${e}"></div>`,`${t+1} ${e}`)).join(``)}</div>
    </section>
    ${Ct(`split`)}
    <section class="s-power">
      ${Tt(`電源系統`,`Power`)}
      <div class="power">${me.map(([e,t])=>Q(`<div d-lamp="led" class="led p-led-${e}" color="amber"></div><div d-switch="rocker" lit><input type="checkbox" class="p-${e}" aria-label="${t}"${e===`int`?` checked`:``}></div>`,t)).join(``)}</div>
    </section>
    ${Ct(`split`)}
    <section class="s-arm">
      ${Tt(`発進認証`,`Authorisation`)}
      <div class="arm">
        ${Q(`<div d-switch="key" labels="Safe,Arm"><input type="checkbox" class="key" aria-label="Operations key"></div>`,`Ops`)}
        <div class="col">
          <div class="pit">${wt(`pit-band`,12)}<div d-cover="guard" class="guard"><input type="checkbox" aria-label="Lift the launch guard"><button d-key="arcade" class="go" material="plastic-red" aria-label="Launch"></button></div>${wt(`pit-band`,12)}</div>
          ${St(`発進 Launch`)}
        </div>
        ${Q(`<div d-switch="key" labels="Safe,Arm"><input type="checkbox" class="key" aria-label="Command key"></div>`,`Cmd`)}
      </div>
    </section>
    ${Ct(`split`)}
    <section class="s-route">
      ${Tt(`射出`,`Route`)}
      <div class="route">
        ${Q(`<div d-knob="pointer" class="track" labels="1,2,3,4,5,6,7,8,9" sweep="120"><input type="range" min="0" max="8" step="1" value="6" aria-label="Launch track"></div>`,`Track`)}
        ${Q(`<div d-knob="encoder" class="tune" color="green"><input type="range" min="-60" max="60" step="1" value="0" aria-label="Sync trim"></div>`,`Sync trim`)}
      </div>
    </section>
    ${Ct(`split`)}
    <section class="s-pilot">
      ${Tt(`パイロット`,`Pilot`)}
      <div class="pilot">
        ${Q(`<div d-cover="guard" class="guard eject" material="plastic-yellow"><input type="checkbox" aria-label="Lift the eject guard"><div d-switch="toggle"><input type="checkbox" class="plug" aria-label="Eject the entry plug"></div></div>`,`Plug eject`)}
        ${Q(`<div d-meter="gauge" class="g-sync" ticks="8" minor="5" zones="100-400 red" label="Sync %"><meter min="0" max="400" value="0"></meter></div>`,`シンクロ率 Sync`)}
        <div class="readouts">
          ${Q(`<div d-readout="seven" class="r-sync" color="green" digits="4">0.0</div>`,`Sync %`)}
          <div class="heart">${St(`心拍 Heart`,`small`)}<div d-lamp="led" class="beat" color="red"></div><div d-readout="seven" class="r-heart" color="red" digits="3"></div></div>
          ${Q(`<div d-meter="bargraph" class="b-field" segments="16" color="amber"><meter min="0" max="1" value="0"></meter></div>`,`ATフィールド AT field`)}
        </div>
      </div>
    </section>
  </d-device>
</div>`,css:`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Noto+Sans+JP:wght@700&family=Noto+Serif:wdth,wght@62.5..100,700..900&family=Shippori+Mincho+B1:wght@800&display=swap');
#eva { width: ${Z(J)}; display: grid; gap: ${Z(pt)}; }
#eva d-device { padding: ${Z(ft)}; box-sizing: border-box; font: 600 ${Z(5)} / 1.05 'Barlow Condensed', 'Noto Sans JP', sans-serif; letter-spacing: .04em; text-transform: uppercase; }
#eva .col { display: grid; gap: ${Z(2)}; justify-items: center; align-content: end; }
#eva .jp { font-family: 'Noto Sans JP', sans-serif; font-weight: 700; letter-spacing: .1em; }
#eva .small { font-size: ${Z(5)}; }
#eva .rule { display: block; width: 100%; height: ${Z(.7)}; }

#eva .alarms { height: ${Z(mt)}; display: flex; align-items: center; gap: ${Z(8)}; }
#eva .ident { display: grid; gap: ${Z(1.5)}; align-self: stretch; align-content: center; width: ${Z(50)}; }
#eva .nerv { font: 900 ${Z(19)} / 1 'Noto Serif', serif; font-stretch: 62.5%; letter-spacing: 0; }
#eva .ident .jp { font-size: ${Z(6)}; }
#eva .ident .en { font-size: ${Z(4.6)}; }
#eva .id-band { display: block; width: 100%; height: ${Z(4)}; margin-top: ${Z(2)}; }
#eva .matrix { display: grid; grid-template-columns: auto repeat(8, ${Z(_t[0])}); grid-auto-rows: ${Z(_t[1])}; gap: ${Z(2)}; align-items: center; }
#eva .row { justify-self: end; font-size: ${Z(4.6)}; }
#eva [d-lamp~="annunciator"] { display: grid; place-items: center; text-align: center; font-size: ${Z(5.2)}; line-height: 1.1; letter-spacing: .02em; }
#eva .acks { display: grid; gap: ${Z(3)}; }
#eva .acks [d-key] { width: ${Z(21)}; height: ${Z(21)}; font-size: ${Z(4.2)}; }
#eva .clock { margin-left: auto; display: grid; gap: ${Z(2)}; }
#eva .clock-head { display: flex; gap: ${Z(3)}; align-items: baseline; }
#eva .clock-head .jp { font-size: ${Z(6)}; }
#eva .clock-body { display: flex; gap: ${Z(3)}; }
#eva .timer { width: ${Z(112)}; height: ${Z(46)}; }
#eva .supply { display: grid; gap: ${Z(3)}; }
#eva .supply [d-lamp] { width: ${Z(36)}; height: ${Z(21.5)}; font-size: ${Z(4.4)}; }

#eva .bay { height: ${Z(ht)}; padding-block: ${Z(6)} !important; display: flex; justify-content: space-between; align-items: end; }
#eva .side { display: grid; gap: ${Z(4)}; align-content: end; }
#eva .votes { display: grid; grid-template-columns: repeat(3, 1fr); gap: ${Z(3)}; }
#eva .vote { height: ${Z(48)}; font-size: ${Z(5.6)}; }
#eva .centre { display: grid; gap: ${Z(3)}; align-content: end; }
#eva .orders { display: flex; gap: ${Z(3)}; align-items: center; }
#eva .orders .jp { font-size: ${Z(6)}; }
#eva .order { flex: 1; height: ${Z(18)}; }
#eva .gauges { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: ${Z(3)}; height: ${Z(48)}; }
#eva .gauge { display: grid; gap: ${Z(1.5)}; align-content: end; }
#eva .gauges [d-readout] { height: ${Z(34)}; }
#eva .s-magi, #eva .s-sync { width: ${Z(vt[0])}; height: ${Z(vt[1])}; }
#eva .s-main { width: ${Z(Y[0])}; height: ${Z(Y[1])}; }

#eva .desk { height: ${Z(gt)}; display: flex; align-items: stretch; justify-content: space-between; gap: ${Z(5)}; }
#eva .split { width: ${Z(.7)}; height: auto; align-self: stretch; }
#eva section { display: grid; grid-template-rows: auto minmax(0, 1fr); gap: ${Z(3)}; }
#eva .head { display: flex; gap: ${Z(2.5)}; align-items: baseline; flex-wrap: wrap; align-self: start; }
#eva .head .jp { font-size: ${Z(6.4)}; }
#eva .head .en { font-size: ${Z(5)}; }
#eva .head .under { flex-basis: 100%; }
#eva .steps, #eva .arm, #eva .pilot, #eva .power, #eva .route { display: flex; gap: ${Z(6)}; align-items: end; }
#eva .led { width: ${Z(6)}; height: ${Z(6)}; }
#eva .steps [d-switch~="toggle"] { width: ${Z(20)}; height: ${Z(34)}; }
#eva .steps .col { gap: ${Z(3)}; }
/* A lever down and a cover up both hang past their parts, toward the operator, so their labels stand clear. */
#eva .steps .col > [d-mark] { margin-top: ${Z(11)}; }
#eva .arm .col > [d-mark], #eva .pilot .col > [d-mark] { margin-top: ${Z(3)}; }

#eva .power [d-switch] { width: ${Z(20)}; height: ${Z(28)}; }
#eva [d-switch~="key"] { width: ${Z(48)}; height: ${Z(48)}; }
#eva .pit { display: grid; gap: ${Z(2)}; justify-items: center; width: ${Z(62)}; }
#eva .pit-band { display: block; width: 100%; height: ${Z(5)}; }
#eva .guard { width: ${Z(50)}; height: ${Z(58)}; display: grid; place-items: center; }
#eva .go { width: ${Z(42)}; height: ${Z(42)}; }
#eva .route { gap: ${Z(4)}; }
#eva .tune { width: ${Z(34)}; height: ${Z(34)}; }
#eva [d-knob~="pointer"] { width: ${Z(36)}; height: ${Z(36)}; font-size: ${Z(4.4)}; }
#eva .eject { width: ${Z(38)}; height: ${Z(50)}; }
#eva .eject [d-switch] { width: ${Z(18)}; height: ${Z(36)}; }
#eva .g-sync { width: ${Z(74)}; height: ${Z(74)}; }
#eva .readouts { display: grid; gap: ${Z(3)}; }
#eva .r-sync { width: ${Z(70)}; height: ${Z(24)}; }
#eva .heart { display: flex; gap: ${Z(3)}; align-items: center; justify-content: end; }
#eva .r-heart { width: ${Z(30)}; height: ${Z(14)}; }
#eva .b-field { width: ${Z(70)}; height: ${Z(10)}; }`,setup:e=>lt(e)};export{Et as default};