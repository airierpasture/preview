import{n as e}from"./rolldown-runtime-XKyaHtl9.js";var t=(e,t,n,r)=>{let i=(e-t)/(e<t?n:r);return Math.exp(-.5*i*i)},n=e=>1.056*t(e,599.8,37.9,31)+.362*t(e,442,16,26.7)-.065*t(e,501.1,20.4,26.2),r=e=>.821*t(e,568.8,46.9,40.5)+.286*t(e,530.9,16.3,31.1),i=e=>1.217*t(e,437,11.8,36)+.681*t(e,459,26,13.8),a=(e,t)=>{let n=e*1e-9,r=662607015e-42,i=299792458;return 2*r*i*i/(n**5*Math.expm1(r*i/(n*1380649e-29*t)))};function o(e){let t=0,o=0,s=0;for(let c=380;c<=780;c+=5){let l=a(c,e)*5e-9;t+=l*n(c),o+=l*r(c),s+=l*i(c)}return[t*683,o*683,s*683]}var s=([e,t,n])=>[3.2406*e-1.5372*t-.4986*n,-.9689*e+1.8758*t+.0415*n,.0557*e-.204*t+1.057*n];function c(e){let t=s(o(e)).map(e=>Math.max(0,e)),n=Math.max(...t);return t.map(e=>e/n)}var l=e=>o(e)[1];function u(e,t,n,r){let i=new Float32Array(e*4);for(let a=0;a<e;a++){let o=t+(n-t)*a/(e-1),s=c(o),u=l(o)/r;i.set([s[0]*u,s[1]*u,s[2]*u,1],a*4)}return i}var d=`#version 300 es
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
`,ee=3e3,g=`
uniform sampler2D uBlackbody;
vec3 hotLight(float heat) {
  float k = 295.0 + heat * 450.0;
  if (k < 798.0) return vec3(0);
  return texture(uBlackbody, vec2(clamp((k - 798.0) / 2202.0, 0.0, 1.0), 0.5)).rgb;
}
`,_=`
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
`,te=d+_+m+`
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
`,ne=d+`
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
`,re=d+_+`
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
`,v=d+_+h+g+`
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
`,y=d+_+m+g+`
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
`,b=d+m+h+`
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
`,x=`#version 300 es
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
`,ie=`#version 300 es
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
`,S=.001,ae={steel:{rho:7800,c:500,e:.8,burns:49e5},copper:{rho:8900,c:385,e:.6,burns:0}},C={rho:1.2,nu:15e-6,k:.026,kelvin:295,oxygenDiffusion:2e-5,oxygen:.23},oe=3.49,se=5.670374e-8,ce=9.81,le=ce*450/C.kelvin,ue=1/120,de=9,w=6,T={short:64,long:128,most:320,fewest:24,regrid:1.3},E=[{pixels:6e5,octaves:0,cells:5e4},{pixels:13e5,octaves:0,cells:1e5},{pixels:29e5,octaves:3,cells:16e4},{pixels:42e5,octaves:5,cells:16e4}],fe=2,D={mixing:.6,vorticity:22,swirl:.35,flicker:1.6,drag:.35,heatLife:.8,expand:.6,retain:.98,extinction:1.6,depth:.25,sweeps:12};function O(e={}){let t=e.parent??document.body,n=matchMedia(`(prefers-reduced-motion: reduce)`).matches,r=document.createElement(`canvas`);Object.assign(r.style,{position:`fixed`,inset:`0`,width:`100%`,height:`100%`,pointerEvents:`none`,zIndex:String(e.zIndex??10)}),r.setAttribute(`aria-hidden`,`true`);let i=r.getContext(`webgl2`,{premultipliedAlpha:!0,alpha:!0,antialias:!1,depth:!1,stencil:!1}),a=!!i&&!!i.getExtension(`EXT_color_buffer_float`)&&!n,o=new Set,s=[],d=0,m=()=>{},h=()=>typeof e.scale==`function`?e.scale():e.scale??4,g=e=>{if(Array.isArray(e))return e;let t=e.getBoundingClientRect();return[t.left+t.width/2,t.top+t.height/2]},_=e=>{let[t,n]=g(e.at),r=h(),[i,a]=e.anchor??[.5,1],o=e.size[0]*r,s=e.size[1]*r;return[t-i*o,n-a*s,o,s]},O=!0,k=()=>{!d&&a&&(d=requestAnimationFrame(()=>m()))},A=e=>{},j=0,M=0,N=new Set,pe=[],P=0,F=e.draught??.1,I=e.white??120,me=e=>{if(e.color)return e.color;let t=c(e.kelvin??2856),n=.2126*t[0]+.7152*t[1]+.0722*t[2],r=e.radius*S,i=4*(e.candela??0)/(r*r*Math.PI*I)/n;return[t[0]*i,t[1]*i,t[2]*i]},he=e=>{let t=[...L.lights];for(let n of N){let r=Number.isFinite(n.seconds)?Math.exp(-(e-n.from)/n.seconds):1;r<.01?N.delete(n):t.push({at:n.l.at,radius:n.l.radius,color:me(n.l).map(e=>e*r)})}return t},L={get haze(){return j},set haze(e){j=Math.max(0,e),j>0&&k()},ambient:[.05,.05,.05],lights:[],light(e,t=1/0){let n={l:{...e},from:performance.now()/1e3,seconds:t};return N.add(n),k(),{set:e=>void Object.assign(n.l,e),remove:()=>void N.delete(n)}},stir(e){M+=Math.max(0,e),k()},get quality(){return z},get scale(){return h()},plume(e){let t={o:e,fed:new Set,box:_(e),at:h(),grid:null,quietSince:-1/0,time:0};return o.add(t),{add(e){let n={s:{...e}};return t.fed.add(n),t.quietSince=-1/0,k(),{set:e=>void Object.assign(n.s,e),remove:()=>void t.fed.delete(n)}},puff(e,n){let r=performance.now()/1e3;t.fed.add({s:{...e},from:r,until:r+n}),t.quietSince=-1/0,k()},remove(){t.grid&&A(t.grid),o.delete(t)}}},sparks(e,t,n={}){if(!a)return;let[r,i]=g(e),o=(n.speed??3e3)*S,c=(n.toward??0)*Math.PI/180,l=(n.spread??360)*Math.PI/180,u=ae[n.metal??`steel`],d=n.kelvin??2100;for(let e=0;e<t;e++){let e=c+(Math.random()-.5)*l,t=o*Math.exp((Math.random()+Math.random()+Math.random()-1.5)*1.2),a=(n.size??.25)*S*Math.exp((Math.random()+Math.random()+Math.random()-1.5)*.7);s.push({x:r,y:i,vx:Math.sin(e)*t,vy:-Math.cos(e)*t,d:a,t:d*(.9+Math.random()*.15),m:u,resting:!1,fuel:1})}s.length>2e3&&s.splice(0,s.length-2e3),k()},stop(){cancelAnimationFrame(d),d=0,removeEventListener(`resize`,B),r.remove()}},R=1,z=Math.max(0,Math.min(E.length-1,Math.round(e.quality??E.length-1))),B=()=>{R=Math.min(devicePixelRatio||1,Math.sqrt(E[z].pixels/(innerWidth*innerHeight))),r.width=Math.round(innerWidth*R),r.height=Math.round(innerHeight*R);for(let e of o)e.box=_(e.o),e.at=h();k()};if(!i||!a)return L;t.append(r);let ge=(e,t)=>{let n=i.createShader(e);if(i.shaderSource(n,t),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`air: ${i.getShaderInfoLog(n)}`);return n},V=(e,t)=>{let n=i.createProgram();if(i.attachShader(n,ge(i.VERTEX_SHADER,e)),i.attachShader(n,ge(i.FRAGMENT_SHADER,t)),i.bindAttribLocation(n,0,`aPos`),i.linkProgram(n),!i.getProgramParameter(n,i.LINK_STATUS))throw Error(`air: ${i.getProgramInfoLog(n)}`);let r=new Map;return{p:n,u:e=>r.has(e)?r.get(e):r.set(e,i.getUniformLocation(n,e)).get(e)}},H=V(f,ne),U=V(f,te),W=V(f,re),G=V(f,v),K=V(p,y),_e=V(f,b),q=V(x,ie),ve=i.createVertexArray();i.bindVertexArray(ve),i.bindBuffer(i.ARRAY_BUFFER,i.createBuffer()),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),i.STATIC_DRAW),i.enableVertexAttribArray(0),i.vertexAttribPointer(0,2,i.FLOAT,!1,0,0);let ye=i.createBuffer(),be=i.createVertexArray();i.bindVertexArray(be),i.bindBuffer(i.ARRAY_BUFFER,ye);let xe=i.getAttribLocation(q.p,`aSpark`),Se=i.getAttribLocation(q.p,`aShape`),Ce=i.getAttribLocation(q.p,`aLight`);i.enableVertexAttribArray(xe),i.vertexAttribPointer(xe,4,i.FLOAT,!1,36,0),i.enableVertexAttribArray(Se),i.vertexAttribPointer(Se,2,i.FLOAT,!1,36,16),i.enableVertexAttribArray(Ce),i.vertexAttribPointer(Ce,3,i.FLOAT,!1,36,24),i.bindVertexArray(null);let J=(e,t,n,r,a=null,o=i.HALF_FLOAT)=>{let s=i.createTexture();return i.bindTexture(i.TEXTURE_2D,s),i.texImage2D(i.TEXTURE_2D,0,n,e,t,0,i.RGBA,o,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,r),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,r),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),s},Y=(...e)=>{let t=i.createFramebuffer();return i.bindFramebuffer(i.FRAMEBUFFER,t),e.forEach((e,t)=>i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+t,i.TEXTURE_2D,e,0)),i.drawBuffers(e.map((e,t)=>i.COLOR_ATTACHMENT0+t)),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),t},we=new Float32Array(1280),Te=J(320,1,i.RGBA32F,i.NEAREST,we,i.FLOAT),Ee=(e,t)=>{let[n,r]=e.o.size,a=n>=r,o=a?t:Math.max(8,Math.round(t*n/r)),s=a?Math.max(8,Math.round(t*r/n)):t,c=n*S/o,l=()=>J(o,s,i.RGBA16F,i.LINEAR),u=[l(),l()],d=[l(),l()],f=[l(),l()],p=l();return{nx:o,ny:s,cell:c,long:t,vel:u,dye:d,p:f,lit:p,step:[Y(u[0],d[0]),Y(u[1],d[1])],press:[Y(f[0]),Y(f[1])],lighting:Y(p),cur:0}},De=e=>{let t=e.map(e=>{let[t,n]=e.o.size;return Math.min(T.most,Math.max(T.long,T.short*Math.max(t,n)/Math.min(t,n)))}),n=e.reduce((e,n,r)=>e+t[r]**2*Math.min(n.o.size[0],n.o.size[1])/Math.max(n.o.size[0],n.o.size[1]),0),r=Math.min(1,Math.sqrt(E[z].cells/Math.max(n,1)));return t.map(e=>Math.max(T.fewest,Math.round(e*r)))},Oe=(e,t)=>{let n=e.grid,r=Ee(e,t);i.bindFramebuffer(i.FRAMEBUFFER,r.step[0]),i.viewport(0,0,r.nx,r.ny),i.useProgram(H.p),i.uniform2f(H.u(`uFrom`),n.nx,n.ny),i.uniform2f(H.u(`uTo`),r.nx,r.ny),Q(H,`uVel`,0,n.vel[n.cur]),Q(H,`uDye`,1,n.dye[n.cur]),i.drawArrays(i.TRIANGLE_STRIP,0,4),A(n),e.grid=r};A=e=>{for(let t of[...e.vel,...e.dye,...e.p,e.lit])i.deleteTexture(t);for(let t of[...e.step,...e.press,e.lighting])i.deleteFramebuffer(t)},addEventListener(`resize`,B),B();let X=document.createElement(`canvas`),Z=X.getContext(`2d`),ke=J(1,1,i.RGBA8,i.LINEAR,new Uint8Array(4),i.UNSIGNED_BYTE);i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR_MIPMAP_LINEAR);let Ae=()=>{let t=Math.max(1,Math.ceil(innerWidth/w)),n=Math.max(1,Math.ceil(innerHeight/w));(X.width!==t||X.height!==n)&&Object.assign(X,{width:t,height:n}),Z.globalCompositeOperation=`source-over`,Z.globalAlpha=1,Z.fillStyle=`#000`,Z.fillRect(0,0,t,n),Z.globalCompositeOperation=`lighter`;for(let t of e.shine?.()??[]){let e=t.at.getBoundingClientRect();if(!(e.width<1||e.bottom<0||e.top>innerHeight)){if(Z.globalAlpha=Math.min(1,t.strength??1),!t.color&&t.at instanceof HTMLCanvasElement)Z.drawImage(t.at,e.left/w,e.top/w,e.width/w,e.height/w);else{let[n,r,i]=(t.color??[1,1,1]).map(e=>Math.round(Math.min(1,e)*255));Z.fillStyle=`rgb(${n} ${r} ${i})`,Z.fillRect(e.left/w,e.top/w,e.width/w,e.height/w)}}}i.bindTexture(i.TEXTURE_2D,ke),i.texImage2D(i.TEXTURE_2D,0,i.RGBA8,i.RGBA,i.UNSIGNED_BYTE,X),i.generateMipmap(i.TEXTURE_2D)},je=J(128,128,i.RGBA8,i.LINEAR,Uint8Array.from({length:65536},()=>Math.random()*256),i.UNSIGNED_BYTE);i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.REPEAT),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.REPEAT);let Me=J(64,1,i.RGBA16F,i.LINEAR,u(64,798,ee,I),i.FLOAT),Ne=e.steam??.6,Pe=e=>Math.max(e.o.size[0],e.o.size[1])*S/F,Fe=performance.now()/1e3,Ie=0,Q=(e,t,n,r)=>{i.activeTexture(i.TEXTURE0+n),i.bindTexture(i.TEXTURE_2D,r),i.uniform1i(e.u(t),n)},Le=(e,t)=>{i.uniform2f(e.u(`uCells`),t.nx,t.ny),i.uniform1f(e.u(`uCell`),t.cell),i.uniform1i(e.u(`uBlockCount`),0)},Re=t=>{let n=S/h();Q(t,`uShine`,4,ke),i.uniform1f(t.u(`uShineGain`),e.shine?e.shineGain??1:0),i.uniform2f(t.u(`uPageSpan`),innerWidth*n,innerHeight*n),i.uniform3fv(t.u(`uAmbient`),L.ambient);let r=pe.slice(0,8),a=new Float32Array(32),o=new Float32Array(24);r.forEach((e,t)=>{let[r,i]=g(e.at);a.set([r*n,i*n,e.radius*S,0],t*4),o.set(me(e),t*3)}),i.uniform1i(t.u(`uLightCount`),r.length),i.uniform4fv(t.u(`uLightAt`),a),i.uniform3fv(t.u(`uLightColor`),o)},ze=(e,t)=>{let n=0,r=S/h(),[a,o]=e.box;for(let i of e.fed){if(i.until!==void 0&&t>i.until){e.fed.delete(i);continue}if(n>=64)break;let s=i.s,c=i.until===void 0?1:1-(t-i.from)/(i.until-i.from),[l,u]=g(s.at),d=s.color??[.5,.5,.5];we.set([(l-a)*r,(u-o)*r,Math.max(s.radius*S,e.grid.cell*1.6),(s.rate??1)*c,(s.jet?.[0]??0)*S,(s.jet?.[1]??0)*S,(s.heat??0)*c,s.steam??0,d[0],d[1],d[2],s.grip??+!!s.blast,(s.blast??0)*S*c,(s.span?.[0]??0)/2*S,(s.span?.[1]??0)/2*S,(s.angle??0)*Math.PI/180,+!!s.seam,0,0,0],n*20),n++}return i.bindTexture(i.TEXTURE_2D,Te),i.texSubImage2D(i.TEXTURE_2D,0,0,0,320,1,i.RGBA,i.FLOAT,we),n},Be=(e,t,n)=>{let r=e.grid,a=Math.max(1,Math.ceil(t*60)),o=t/a;for(let t=0;t<a;t++){e.time+=o;let t=1-r.cur;i.bindFramebuffer(i.FRAMEBUFFER,r.step[t]),i.viewport(0,0,r.nx,r.ny),i.useProgram(U.p),Le(U,r),Q(U,`uVel`,0,r.vel[r.cur]),Q(U,`uDye`,1,r.dye[r.cur]),Q(U,`uP`,2,r.p[0]),Q(U,`uSources`,3,Te);let a=U.u;i.uniform1f(a(`uDt`),o),i.uniform1f(a(`uTime`),e.time),i.uniform1f(a(`uSourceCount`),n),i.uniform1f(a(`uMixing`),D.mixing),i.uniform1f(a(`uVorticity`),D.vorticity),i.uniform1f(a(`uSwirl`),D.swirl),i.uniform1f(a(`uFlicker`),D.flicker),i.uniform1f(a(`uDrag`),D.drag),i.uniform1f(a(`uHeatLife`),D.heatLife),i.uniform1f(a(`uSmokeLife`),Pe(e)),i.uniform1f(a(`uSteamLife`),Ne),i.uniform1f(a(`uRise`),le),i.uniform2f(a(`uWind`),0,0),i.uniform2f(a(`uOrigin`),e.box[0]*S/h(),e.box[1]*S/h()),i.drawArrays(i.TRIANGLE_STRIP,0,4),r.cur=t;let s=2*Math.max(2,Math.round(D.sweeps*r.long/T.long/2));i.useProgram(W.p),Le(W,r),i.uniform1f(W.u(`uExpand`),D.expand),i.uniform1f(W.u(`uRetain`),D.retain),Q(W,`uVel`,0,r.vel[r.cur]);for(let e=0;e<s;e++)i.bindFramebuffer(i.FRAMEBUFFER,r.press[(e+1)%2]),Q(W,`uP`,1,r.p[e%2]),i.drawArrays(i.TRIANGLE_STRIP,0,4)}},$=[],Ve=E.map(()=>fe),He=0,Ue=1e3/60,We=1/0,Ge=-1/0,Ke=e=>{let t=$.reduce((e,t)=>e+t,0);if($.length<20&&($.length<4||t<330))return;let n=e=>[...$].sort((e,t)=>e-t)[Math.floor($.length*e)];Ue=Math.min(1e3/60,Math.max(n(.25),4));let r=n(.75)>Ue*1.3,i=n(.9)<Ue*1.15;$.length=0,r&&z>0?(e-Ge<5&&(Ve[z]=Math.min(Ve[z]*2,120)),z--,He=0,B()):i&&z<E.length-1&&(He+=t/1e3)>=Ve[z+1]?(z++,He=0,Ge=e,B()):i||(He=0)};return m=()=>{d=0;let t=performance.now()/1e3,n=Math.min(t-Fe,.1),a=(t-Fe)*1e3;O&&=(We=t,!1),e.quality===void 0&&t-We>1&&($.push(a),Ke(t)),Fe=t,Ie+=n,M*=Math.exp(-n/(innerHeight/h()*S/F)),M<.002&&(M=0),P=j+M,pe=he(t),i.disable(i.BLEND),i.bindVertexArray(ve);let u=[];for(let e of o)!e.fed.size&&(e.quietSince===-1/0&&(e.quietSince=t),t-e.quietSince>Pe(e)*2.5)||(Math.abs(h()/e.at-1)>.01&&(e.box=_(e.o),e.at=h()),u.push(e));let f=De(u);if(u.forEach((e,r)=>{let i=f[r];e.grid?(i>e.grid.long*T.regrid||i*T.regrid<e.grid.long)&&Oe(e,i):e.grid=Ee(e,i),Be(e,n,ze(e,t))}),i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,r.width,r.height),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),(P>0||u.length)&&e.shine&&Ae(),i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE_MINUS_SRC_ALPHA),i.bindVertexArray(ve),P>0&&(i.useProgram(_e.p),Re(_e),i.uniform1f(_e.u(`uTime`),Ie),i.uniform1f(_e.u(`uHaze`),P),i.drawArrays(i.TRIANGLE_STRIP,0,4)),u.length){let e=S/h();i.disable(i.BLEND),i.useProgram(G.p),Re(G),Q(G,`uBlackbody`,5,Me),i.uniform1f(G.u(`uExtinction`),D.extinction);for(let t of u){let n=t.grid;i.bindFramebuffer(i.FRAMEBUFFER,n.lighting),i.viewport(0,0,n.nx,n.ny),Le(G,n),Q(G,`uVel`,0,n.vel[n.cur]),Q(G,`uDye`,1,n.dye[n.cur]),i.uniform2f(G.u(`uOrigin`),t.box[0]*e,t.box[1]*e),i.uniform1f(G.u(`uDepth`),D.depth*Math.min(t.box[2],t.box[3])*e),i.drawArrays(i.TRIANGLE_STRIP,0,4)}i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,r.width,r.height),i.enable(i.BLEND),i.useProgram(K.p),Q(K,`uBlackbody`,5,Me),Q(K,`uNoise`,6,je),i.uniform1f(K.u(`uExtinction`),D.extinction);for(let t of u){let n=t.grid,[r,a,o,s]=t.box;Le(K,n),Q(K,`uVel`,0,n.vel[n.cur]),Q(K,`uDye`,1,n.dye[n.cur]),Q(K,`uLit`,2,n.lit),i.uniform1f(K.u(`uTime`),t.time),i.uniform1f(K.u(`uPixel`),e/R),i.uniform1i(K.u(`uOctaves`),E[z].octaves),i.uniform2f(K.u(`uOrigin`),r*e,a*e),i.uniform4f(K.u(`uFade`),+(r>0),+(r+o<innerWidth),+(a>0),+(a+s<innerHeight)),i.uniform4f(K.u(`uRect`),r/innerWidth*2-1,1-(a+s)/innerHeight*2,(r+o)/innerWidth*2-1,1-a/innerHeight*2),i.drawArrays(i.TRIANGLE_STRIP,0,4)}}if(s.length){let t=h()/S,a=(typeof e.floor==`function`?e.floor():e.floor)??innerHeight,o=new Float32Array(s.length*6*de),u=0;for(let e=s.length-1;e>=0;e--){let r=s[e],i=Math.hypot(r.vx,r.vy),d=r.m.rho*Math.PI*r.d**3/6,f=Math.PI*r.d*r.d,p=(r.t+C.kelvin)/2/C.kelvin,m=C.rho/p,h=C.nu*p**1.7,ee=C.k*p**.8,g=.5*m*.47*(f/4)*i/d;r.vx-=r.vx*g*n,r.vy-=r.vy*g*n-(r.resting?0:ce*n);let _=2+.6*Math.sqrt(i*r.d/h)*.89,te=f*(_*ee/r.d*(r.t-C.kelvin)+r.m.e*se*(r.t**4-C.kelvin**4))*(r.resting?4:1),ne=r.m.burns&&!r.resting&&r.fuel>0?f*(_*C.oxygenDiffusion*p**1.75/r.d)*m*C.oxygen*oe*r.m.burns:0;if(r.fuel-=ne/r.m.burns/d*n,r.t-=(te-ne)/(d*r.m.c)*n,r.t<798||r.y>innerHeight+50||r.x<-50||r.x>innerWidth+50){s.splice(e,1);continue}let re=[r.x,r.y];r.x+=r.vx*t*n,r.y+=r.vy*t*n,r.y>a&&re[1]<=a+1&&(r.y=a,r.vy>.25?(r.vy*=-.3,r.vx*=.7):(r.vy=0,r.resting=!0)),r.resting&&(r.vx*=Math.exp(-n*.4*ce/Math.max(Math.abs(r.vx),.05)));let v=Math.hypot(r.vx,r.vy),y=r.d*t*R/2,b=Math.max(y,.5),x=v*ue*t*R,ie=2*b*x+Math.PI*(b*b+1/12),S=c(r.t),ae=Math.PI*y*y/ie*(r.m.e*l(r.t)/I),le=v>1e-4?r.vx/v:1,w=v>1e-4?r.vy/v:0,T=b+10,E=r.x*R,fe=r.y*R,D=(e,t)=>o.set([E+le*(e-x)-w*t,fe+w*(e-x)+le*t,e,t,x,b,S[0]*ae,S[1]*ae,S[2]*ae],u++*de);D(-T,T),D(-T,-T),D(x+T,T),D(x+T,T),D(-T,-T),D(x+T,-T)}i.blendFunc(i.ONE,i.ONE),i.useProgram(q.p),i.uniform2f(q.u(`uSpan`),r.width,r.height),i.uniform1f(q.u(`uFloor`),a*R),i.bindVertexArray(be),i.bindBuffer(i.ARRAY_BUFFER,ye),i.bufferData(i.ARRAY_BUFFER,o.subarray(0,u*de),i.DYNAMIC_DRAW),i.drawArrays(i.TRIANGLES,0,u)}i.disable(i.BLEND),i.bindVertexArray(null),P>0||N.size||u.length||s.length?k():O=!0},L}var k=e=>{if(Array.isArray(e))return e;let t=e.getBoundingClientRect();return[t.left+t.width/2,t.top+t.height/2]},A=10,j=.1,M=.01,N=117e4,pe=7800*Math.PI*25e-5**3/6;function P(e,t,n,r={}){let i=50*Math.cbrt(n/1e3),a=A*n/j/(4*Math.PI);e.light({at:k(t),radius:i,candela:a,kelvin:r.kelvin??6e3},j);let o=r.size??.25,s=M*n/N/(pe*(o/.25)**3);s>=1&&e.sparks(t,Math.round(s),{speed:r.speed,toward:r.toward,spread:r.spread??200,size:o})}var F=new WeakMap;function I(e,t){let n=Math.min(1,Math.max(0,(t-.05)/.6));if(!n)return;let r=e.scale,i=innerWidth/r,a=innerHeight/r,o=F.get(e);o||F.set(e,o=e.plume({at:[innerWidth/2,0],size:[i,a],anchor:[.5,0]}));for(let e=0;e<Math.round(2+n*5);e++)o.puff({at:[innerWidth*(.05+Math.random()*.9),2],radius:12+n*30,rate:.2+n*.45,steam:.5,jet:[(Math.random()-.5)*60,260+n*380],grip:.5,color:[.6,.55,.48]},.25+n*.5);e.stir(n*.3)}var me=.15,he=1900,L=.5,R=2.6,z=[.85,.83,.8],B=[.12,.11,.1],ge=(e,t)=>{let n=.235*(e/1e3)**.4,r=Math.min(t/1e3,n/3.02),i=n-1.02*r;return[r*1e3,.4*i*1e3]};function V(e,t,n={}){let r=t.getBoundingClientRect(),i=e.scale,a=[r.width/i,r.height/i],o=n.watts??50,s=ge(o,a[0]),c=[r.left+r.width/2,r.top+r.height/2-s[1]/2*i],l=e.plume({at:t,size:[Math.max(220,a[0]*3),560],anchor:[.5,.9]}),u=l.add({at:t,radius:2,span:a,seam:!0,rate:8,heat:L,color:z}),d=me*o/(4*Math.PI),f=null;return{set(n){let r=n===`flame`;u.set(r?{at:c,span:s,seam:!1,heat:R,rate:10,radius:3,color:B}:{at:t,span:a,seam:!0,heat:L,rate:8,radius:2,color:z}),r?f??=e.light({at:c,radius:s[1]*1.25,candela:d,kelvin:he}):(f?.remove(),f=null)},remove(){f?.remove(),l.remove()}}}function H(e,t,n){let r=e.scale,i=t.map(k),a=n.slots??3,o=n.speed??.5,[s,c]=n.size,l=i.map(e=>e[0]),u=Math.min(...l),d=Math.max(...l),f=Math.max(...i.map(e=>e[1])),p=e.plume({at:[(u+d)/2,f+c/2*r],size:[(d-u)/r+s*1.5,o*1500+200],anchor:[.5,1]}),m=c/a;return{blow(e){for(let[t,n]of i)for(let i=0;i<a;i++)p.puff({at:[t,n+(i-(a-1)/2)*m*r],radius:3,span:[s,m*.4],rate:3,steam:.85,heat:.17,jet:[0,-o*1e3],grip:.5,blast:60,color:[1,1,1]},e)},remove:()=>p.remove()}}var U=e({air:()=>O,fire:()=>V,impact:()=>P,shake:()=>I,vent:()=>H});export{H as a,I as i,V as n,O as o,P as r,U as t};