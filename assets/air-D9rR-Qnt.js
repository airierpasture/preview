import{n as e}from"./rolldown-runtime-XKyaHtl9.js";import{B as t,G as n,H as r,U as i,V as a,W as o}from"./preload-helper-CTzKASUU.js";var s=(e,t,n,r)=>{let i=(e-t)/(e<t?n:r);return Math.exp(-.5*i*i)},c=e=>1.056*s(e,599.8,37.9,31)+.362*s(e,442,16,26.7)-.065*s(e,501.1,20.4,26.2),l=e=>.821*s(e,568.8,46.9,40.5)+.286*s(e,530.9,16.3,31.1),u=e=>1.217*s(e,437,11.8,36)+.681*s(e,459,26,13.8),d=(e,t)=>{let n=e*1e-9,r=662607015e-42,i=299792458;return 2*r*i*i/(n**5*Math.expm1(r*i/(n*1380649e-29*t)))};function f(e){let t=0,n=0,r=0;for(let i=380;i<=780;i+=5){let a=d(i,e)*5e-9;t+=a*c(i),n+=a*l(i),r+=a*u(i)}return[t*683,n*683,r*683]}var p=([e,t,n])=>[3.2406*e-1.5372*t-.4986*n,-.9689*e+1.8758*t+.0415*n,.0557*e-.204*t+1.057*n];function ee(e){let t=p(f(e)).map(e=>Math.max(0,e)),n=Math.max(...t);return t.map(e=>e/n)}var te=e=>f(e)[1];function ne(e,t,n,r){let i=new Float32Array(e*4);for(let a=0;a<e;a++){let o=t+(n-t)*a/(e-1),s=ee(o),c=te(o)/r;i.set([s[0]*c,s[1]*c,s[2]*c,1],a*4)}return i}var m=`2.72e-4`,h=`#version 300 es
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
`,ie=`
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
`,ae=3e3,v=`
uniform sampler2D uBlackbody;
vec3 hotLight(float heat) {
  float k = 295.0 + heat * 450.0;
  if (k < 798.0) return vec3(0);
  return texture(uBlackbody, vec2(clamp((k - 798.0) / 2202.0, 0.0, 1.0), 0.5)).rgb;
}
`,y=`
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
`,oe=h+y+_+`
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
`,b=h+`
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
`,se=h+y+`
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
`,ce=h+y+ie+v+`
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
`,le=h+y+_+v+`
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
// On the stage, where light is drawn as bright as it is and the camera exposes it. On a canvas of its own there's no camera.
uniform bool uLinear;
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
  // On a canvas of its own, too bright for the room's exposure goes to white, as a flame's core does, not to a flat plateau of
  // its colour. On the stage that's the camera's to do.
  vec3 glow = hotLight(flow.z * (0.75 + 0.5 * fine.y)) * (1.0 - through);
  if (!uLinear) glow = 1.0 - exp(-glow);
  // The box's edges fade out, so no plume is ever seen to stop at a line.
  vec4 near = vec4(uv.x, 1.0 - uv.x, uv.y, 1.0 - uv.y) + (1.0 - uFade);
  float edge = smoothstep(0.0, 0.3, min(near.x, near.y)) * smoothstep(0.0, 0.16, min(near.z, near.w));
  float shown = 1.0;
  if (uSlab.z > 0.5) shown = clamp((uSlab.y - texture(uHeights, gl_FragCoord.xy / uViewPx).r) / max(uSlab.y - uSlab.x, 1e-3), 0.0, 1.0);
  oColor = vec4(scatter + glow, 1.0 - through) * edge * shown;
}
`,ue=h+_+ie+`
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
`,de=`#version 300 es
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
`,x=`#version 300 es
precision highp float;
in vec2 vAt;
in vec2 vShape;
in vec3 vLight;
in float vY;
// Where the floor is, device px: a streak that bounced doesn't show the part of it that went under.
uniform float uFloor;
uniform bool uLinear;
out vec4 oColor;
void main() {
  if (vY > uFloor + 0.5) discard;
  // How far from the line it draws, device px.
  float d = length(vec2(vAt.x - clamp(vAt.x, 0.0, vShape.x), vAt.y)), r = vShape.y;
  // The drop covers what it covers, however bright. On the stage that's all: the camera's lens glares and its curve takes it to
  // white. On a canvas of its own the spark does both: saturating mustn't fatten it, and round it is the lens's glare, a spread a
  // pixel wide at its heart and falling off as the square, carrying a share of all the light the drop gives, faint enough that
  // only a very hot spark's reaches past the drop.
  float core = clamp(r + 0.5 - d, 0.0, 1.0);
  if (uLinear) {
    oColor = vec4(vLight * core, 0.0);
    return;
  }
  float glare = 0.003 * r * r / (d * d + 1.0) * (1.0 - smoothstep(${6 .toFixed(1)}, ${10 .toFixed(1)}, d));
  oColor = vec4(1.0 - exp(-vLight * (core + glare)), 0.0);
}
`,fe=`#version 300 es
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
`,pe=h+y+`
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
`,S=h+`
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
`,C=.001,me=80,he={steel:{rho:7800,c:500,e:.8,burns:49e5},copper:{rho:8900,c:385,e:.6,burns:0}},w={rho:1.2,nu:15e-6,k:.026,kelvin:295,oxygenDiffusion:2e-5,oxygen:.23},ge=343,T=1.4,_e=4184e3,ve=e=>808*(1+(e/4.5)**2)/Math.sqrt((1+(e/.048)**2)*(1+(e/.32)**2)*(1+(e/1.35)**2)),ye=e=>980*(1+(e/.54)**10)/((1+(e/.02)**3)*(1+(e/.74)**6)*Math.sqrt(1+(e/6.9)**2)),be=e=>ge*Math.sqrt(1+2.4/(2*T)*e),xe=e=>(1+2.4/(2*T)*e)/(1+.3999999999999999/(2*T)*e)-1,Se=128,Ce=3.49,we=5.670374e-8,Te=9.81,Ee=Te*450/w.kelvin,De=1/120,Oe=9,E={short:64,long:128,most:320,fewest:24,regrid:1.3},D=[{pixels:6e5,octaves:0,cells:5e4},{pixels:13e5,octaves:0,cells:1e5},{pixels:29e5,octaves:3,cells:16e4},{pixels:42e5,octaves:5,cells:16e4}],ke=2,O={mixing:.6,vorticity:22,swirl:.35,flicker:1.6,drag:.35,heatLife:.8,expand:.6,retain:.98,extinction:1.6,depth:.25,sweeps:12};function k(e={}){let s=e.parent??document.body,c=matchMedia(`(prefers-reduced-motion: reduce)`).matches,l=document.createElement(`canvas`);Object.assign(l.style,{position:`fixed`,inset:`0`,width:`100%`,height:`100%`,pointerEvents:`none`,zIndex:String(e.zIndex??10)}),l.setAttribute(`aria-hidden`,`true`);let u=l.getContext(`webgl2`,{premultipliedAlpha:!0,alpha:!0,antialias:!1,depth:!1,stencil:!1}),d=!!u&&!!u.getExtension(`EXT_color_buffer_float`)&&!c,f=u,p=!1,m=new Set,h=[],_=0,ie=()=>{},v=!1,y=[],T=()=>typeof e.scale==`function`?e.scale():e.scale??4,k=e=>{if(Array.isArray(e))return e;let t=e.getBoundingClientRect();return[t.left+t.width/2,t.top+t.height/2]},Ae=e=>{let[t,n]=k(e.at),r=T(),[i,a]=e.anchor??[.5,1],o=e.size[0]*r,s=e.size[1]*r;return[t-i*o,n-a*s,o,s]},je=!0,A=()=>{d&&(p?v||(v=!0,queueMicrotask(()=>(v=!1,n()))):_||=requestAnimationFrame(()=>ie()))},Me=e=>{},Ne=0,Pe=0,j=new Set,Fe=[],M=0,Ie=e.draught??.1,Le=e.white??120,Re=e=>{if(e.color)return e.color;let t=ee(e.kelvin??2856),n=.2126*t[0]+.7152*t[1]+.0722*t[2],r=e.radius*C,i=4*(e.candela??0)/(r*r*Math.PI*Le)/n;return[t[0]*i,t[1]*i,t[2]*i]},ze=e=>{let t=T();for(let n of j){let r=Number.isFinite(n.seconds)?Math.exp(-(e-n.from)/n.seconds):1;if(r<.01){n.on?.remove(),j.delete(n);continue}let i={at:n.l.at,reach:n.l.radius*t,color:Re(n.l).map(e=>e*r)};n.on?n.on.set(i):n.on=a(i)}return r().map(e=>({at:e.at,radius:e.kind===`beam`?me:e.reach/t,color:e.color}))},Be={get haze(){return Ne},set haze(e){Ne=Math.max(0,e),Ne>0&&A()},ambient:[.05,.05,.05],light(e,t=1/0){let n={l:{...e},from:performance.now()/1e3,seconds:t,on:null};return j.add(n),A(),{set:e=>void Object.assign(n.l,e),remove:()=>{n.on?.remove(),j.delete(n)}}},stir(e){Pe+=Math.max(0,e),A()},get quality(){return N},get scale(){return T()},plume(e){let t={o:e,fed:new Set,box:Ae(e),at:T(),grid:null,quietSince:-1/0,time:0};return m.add(t),{add(e){let n={s:{...e}};return t.fed.add(n),t.quietSince=-1/0,A(),{set:e=>void Object.assign(n.s,e),remove:()=>void t.fed.delete(n)}},puff(e,n){let r=performance.now()/1e3;t.fed.add({s:{...e},from:r,until:r+n}),t.quietSince=-1/0,A()},remove(){t.grid&&Me(t.grid),m.delete(t)}}},sparks(e,t,n={}){if(!d)return;let[r,i]=k(e),a=(n.speed??3e3)*C,o=(n.toward??0)*Math.PI/180,s=(n.spread??360)*Math.PI/180,c=he[n.metal??`steel`],l=n.kelvin??2100;for(let e=0;e<t;e++){let e=o+(Math.random()-.5)*s,t=a*Math.exp((Math.random()+Math.random()+Math.random()-1.5)*1.2),u=(n.size??.25)*C*Math.exp((Math.random()+Math.random()+Math.random()-1.5)*.7);h.push({x:r,y:i,vx:Math.sin(e)*t,vy:-Math.cos(e)*t,d:u,t:l*(.9+Math.random()*.15),m:c,resting:!1,fuel:1})}h.length>2e3&&h.splice(0,h.length-2e3),A()},shock(e,t){if(!d||!(t>0))return;let[n,r]=k(e),i=Math.cbrt(2*t/_e),a=new Float64Array(Se),o=new Float64Array(Se),s=e=>1/be(ve(a[e]/i));for(let e=0;e<Se;e++)a[e]=i*.05*2e3**(e/127),o[e]=e?o[e-1]+(a[e]-a[e-1])*.5*(s(e-1)+s(e)):a[0]*s(0);y.push({x:n,y:r,w:i,r:a,t:o,from:performance.now()/1e3}),A()},sample(e,t){if(!d||!p||!J)return null;let n=J,r=Math.floor(e-F.x),i=n.h-1-Math.floor(t-F.y),a=new Float32Array(4);if(r<0||i<0||r>=n.w||i>=n.h)return null;let o=e=>(f.bindFramebuffer(f.FRAMEBUFFER,e),f.readPixels(r,i,1,1,f.RGBA,f.FLOAT,a),[a[0],a[1]]),s=o(n.fbo)[0],c=o(n.bent);return f.bindFramebuffer(f.FRAMEBUFFER,null),{height:s,bend:c}},stop(){for(let e of j)e.on?.remove();j.clear(),cancelAnimationFrame(_),_=0,removeEventListener(`resize`,P),l.remove(),Ve()}},Ve=()=>{},He=1,N=Math.max(0,Math.min(D.length-1,Math.round(e.quality??D.length-1))),P=()=>{p||(He=Math.min(devicePixelRatio||1,Math.sqrt(D[N].pixels/(innerWidth*innerHeight))),l.width=Math.round(innerWidth*He),l.height=Math.round(innerHeight*He),F={x:0,y:0,w:innerWidth,h:innerHeight,ratio:He});for(let e of m)e.box=Ae(e.o),e.at=T();A()},F={x:0,y:0,w:innerWidth,h:innerHeight,ratio:1};if(!d)return Be;o()||s.append(l);let Ue=(e,t)=>{let n=f.createShader(e);if(f.shaderSource(n,t),f.compileShader(n),!f.getShaderParameter(n,f.COMPILE_STATUS))throw Error(`air: ${f.getShaderInfoLog(n)}`);return n},I=(e,t)=>{let n=f.createProgram();if(f.attachShader(n,Ue(f.VERTEX_SHADER,e)),f.attachShader(n,Ue(f.FRAGMENT_SHADER,t)),f.bindAttribLocation(n,0,`aPos`),f.linkProgram(n),!f.getProgramParameter(n,f.LINK_STATUS))throw Error(`air: ${f.getProgramInfoLog(n)}`);let r=new Map;return{p:n,u:e=>r.has(e)?r.get(e):r.set(e,f.getUniformLocation(n,e)).get(e)}},L,R,z,B,V,H,U,W,G,K,q,We,Ge,Ke,qe,Je,Ye,J=null,Xe=()=>{L=I(g,b),R=I(g,oe),z=I(g,se),B=I(g,ce),V=I(re,le),H=I(g,ue),U=I(de,x),W=I(re,fe),G=I(re,pe),K=I(g,S),q=f.createVertexArray(),f.bindVertexArray(q),f.bindBuffer(f.ARRAY_BUFFER,f.createBuffer()),f.bufferData(f.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),f.STATIC_DRAW),f.enableVertexAttribArray(0),f.vertexAttribPointer(0,2,f.FLOAT,!1,0,0),Ge=f.createBuffer(),We=f.createVertexArray(),f.bindVertexArray(We),f.bindBuffer(f.ARRAY_BUFFER,Ge);let e=f.getAttribLocation(U.p,`aSpark`),t=f.getAttribLocation(U.p,`aShape`),n=f.getAttribLocation(U.p,`aLight`);f.enableVertexAttribArray(e),f.vertexAttribPointer(e,4,f.FLOAT,!1,36,0),f.enableVertexAttribArray(t),f.vertexAttribPointer(t,2,f.FLOAT,!1,36,16),f.enableVertexAttribArray(n),f.vertexAttribPointer(n,3,f.FLOAT,!1,36,24),f.bindVertexArray(null),Ke=Y(320,1,f.RGBA32F,f.NEAREST,Qe,f.FLOAT),qe=Y(1,1,f.RGBA8,f.LINEAR,new Uint8Array(4),f.UNSIGNED_BYTE),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MIN_FILTER,f.LINEAR_MIPMAP_LINEAR),Je=Y(128,128,f.RGBA8,f.LINEAR,Uint8Array.from({length:65536},()=>Math.random()*256),f.UNSIGNED_BYTE),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_S,f.REPEAT),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_T,f.REPEAT),Ye=Y(64,1,f.RGBA16F,f.LINEAR,ne(64,798,ae,Le),f.FLOAT),Z=null,J=null},Ze=()=>{for(let e of m)e.grid&&=(Me(e.grid),null);for(let e of[L,R,z,B,V,H,U,W,G,K])f.deleteProgram(e.p);for(let e of[Ke,qe,Je,Ye])f.deleteTexture(e);if(J){for(let e of[J.tex,J.bend])f.deleteTexture(e);for(let e of[J.fbo,J.bent])f.deleteFramebuffer(e)}f.deleteVertexArray(q),f.deleteVertexArray(We),f.deleteBuffer(Ge),je=!0},Y=(e,t,n,r,i=null,a=f.HALF_FLOAT)=>{let o=f.createTexture();return f.bindTexture(f.TEXTURE_2D,o),f.texImage2D(f.TEXTURE_2D,0,n,e,t,0,f.RGBA,a,i),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MIN_FILTER,r),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MAG_FILTER,r),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_S,f.CLAMP_TO_EDGE),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_T,f.CLAMP_TO_EDGE),o},X=(...e)=>{let t=f.createFramebuffer();return f.bindFramebuffer(f.FRAMEBUFFER,t),e.forEach((e,t)=>f.framebufferTexture2D(f.FRAMEBUFFER,f.COLOR_ATTACHMENT0+t,f.TEXTURE_2D,e,0)),f.drawBuffers(e.map((e,t)=>f.COLOR_ATTACHMENT0+t)),f.clearColor(0,0,0,0),f.clear(f.COLOR_BUFFER_BIT),t},Qe=new Float32Array(1280),$e=(e,t)=>{let[n,r]=e.o.size,i=n>=r,a=i?t:Math.max(8,Math.round(t*n/r)),o=i?Math.max(8,Math.round(t*r/n)):t,s=n*C/a,c=()=>Y(a,o,f.RGBA16F,f.LINEAR),l=[c(),c()],u=[c(),c()],d=[c(),c()],p=c();return{nx:a,ny:o,cell:s,long:t,vel:l,dye:u,p:d,lit:p,step:[X(l[0],u[0]),X(l[1],u[1])],press:[X(d[0]),X(d[1])],lighting:X(p),cur:0}},et=e=>{let t=e.map(e=>{let[t,n]=e.o.size;return Math.min(E.most,Math.max(E.long,E.short*Math.max(t,n)/Math.min(t,n)))}),n=e.reduce((e,n,r)=>e+t[r]**2*Math.min(n.o.size[0],n.o.size[1])/Math.max(n.o.size[0],n.o.size[1]),0),r=Math.min(1,Math.sqrt(D[N].cells/Math.max(n,1)));return t.map(e=>Math.max(E.fewest,Math.round(e*r)))},tt=(e,t)=>{let n=e.grid,r=$e(e,t);f.bindFramebuffer(f.FRAMEBUFFER,r.step[0]),f.viewport(0,0,r.nx,r.ny),f.useProgram(L.p),f.uniform2f(L.u(`uFrom`),n.nx,n.ny),f.uniform2f(L.u(`uTo`),r.nx,r.ny),Q(L,`uVel`,0,n.vel[n.cur]),Q(L,`uDye`,1,n.dye[n.cur]),f.drawArrays(f.TRIANGLE_STRIP,0,4),Me(n),e.grid=r};Me=e=>{for(let t of[...e.vel,...e.dye,...e.p,e.lit])f.deleteTexture(t);for(let t of[...e.step,...e.press,e.lighting])f.deleteFramebuffer(t)},addEventListener(`resize`,P),P();let Z=null;Xe();let nt=()=>{let e=t();e!==Z&&(Z=e,f.bindTexture(f.TEXTURE_2D,qe),e?f.texImage2D(f.TEXTURE_2D,0,f.RGBA8,e.w,e.h,0,f.RGBA,f.UNSIGNED_BYTE,e.data):f.texImage2D(f.TEXTURE_2D,0,f.RGBA8,1,1,0,f.RGBA,f.UNSIGNED_BYTE,new Uint8Array(4)),f.generateMipmap(f.TEXTURE_2D))},rt=e.steam??.6,it=e=>Math.max(e.o.size[0],e.o.size[1])*C/Ie,at=performance.now()/1e3,ot=0,Q=(e,t,n,r)=>{f.activeTexture(f.TEXTURE0+n),f.bindTexture(f.TEXTURE_2D,r),f.uniform1i(e.u(t),n)},st=(e,t)=>{f.uniform2f(e.u(`uCells`),t.nx,t.ny),f.uniform1f(e.u(`uCell`),t.cell),f.uniform1i(e.u(`uBlockCount`),0)},ct=e=>{let t=C/T();Q(e,`uShine`,4,qe),f.uniform1f(e.u(`uShineGain`),Z?Z.gain:0),f.uniform1f(e.u(`uShineCell`),Z?Z.cell:1),f.uniform2f(e.u(`uPageSpan`),(Z?Z.w*Z.cell:innerWidth)*t,(Z?Z.h*Z.cell:innerHeight)*t),f.uniform3fv(e.u(`uAmbient`),Be.ambient);let n=Fe.slice(0,8),r=new Float32Array(32),i=new Float32Array(24);n.forEach((e,n)=>{let[a,o]=k(e.at);r.set([a*t,o*t,e.radius*C,0],n*4),i.set(Re(e),n*3)}),f.uniform1i(e.u(`uLightCount`),n.length),f.uniform4fv(e.u(`uLightAt`),r),f.uniform3fv(e.u(`uLightColor`),i)},lt=(e,t)=>{let n=0,r=C/T(),[i,a]=e.box;for(let o of e.fed){if(o.until!==void 0&&t>o.until){e.fed.delete(o);continue}if(n>=64)break;let s=o.s,c=o.until===void 0?1:1-(t-o.from)/(o.until-o.from),[l,u]=k(s.at),d=s.color??[.5,.5,.5];Qe.set([(l-i)*r,(u-a)*r,Math.max(s.radius*C,e.grid.cell*1.6),(s.rate??1)*c,(s.jet?.[0]??0)*C,(s.jet?.[1]??0)*C,(s.heat??0)*c,s.steam??0,d[0],d[1],d[2],s.grip??+!!s.blast,(s.blast??0)*C*c,(s.span?.[0]??0)/2*C,(s.span?.[1]??0)/2*C,(s.angle??0)*Math.PI/180,+!!s.seam,0,0,0],n*20),n++}return f.bindTexture(f.TEXTURE_2D,Ke),f.texSubImage2D(f.TEXTURE_2D,0,0,0,320,1,f.RGBA,f.FLOAT,Qe),n},ut=(e,t,n)=>{let r=e.grid,i=Math.max(1,Math.ceil(t*60)),a=t/i;for(let t=0;t<i;t++){e.time+=a;let t=1-r.cur;f.bindFramebuffer(f.FRAMEBUFFER,r.step[t]),f.viewport(0,0,r.nx,r.ny),f.useProgram(R.p),st(R,r),Q(R,`uVel`,0,r.vel[r.cur]),Q(R,`uDye`,1,r.dye[r.cur]),Q(R,`uP`,2,r.p[0]),Q(R,`uSources`,3,Ke);let i=R.u;f.uniform1f(i(`uDt`),a),f.uniform1f(i(`uTime`),e.time),f.uniform1f(i(`uSourceCount`),n),f.uniform1f(i(`uMixing`),O.mixing),f.uniform1f(i(`uVorticity`),O.vorticity),f.uniform1f(i(`uSwirl`),O.swirl),f.uniform1f(i(`uFlicker`),O.flicker),f.uniform1f(i(`uDrag`),O.drag),f.uniform1f(i(`uHeatLife`),O.heatLife),f.uniform1f(i(`uSmokeLife`),it(e)),f.uniform1f(i(`uSteamLife`),rt),f.uniform1f(i(`uRise`),Ee),f.uniform2f(i(`uWind`),0,0),f.uniform2f(i(`uOrigin`),e.box[0]*C/T(),e.box[1]*C/T()),f.drawArrays(f.TRIANGLE_STRIP,0,4),r.cur=t;let o=2*Math.max(2,Math.round(O.sweeps*r.long/E.long/2));f.useProgram(z.p),st(z,r),f.uniform1f(z.u(`uExpand`),O.expand),f.uniform1f(z.u(`uRetain`),O.retain),Q(z,`uVel`,0,r.vel[r.cur]);for(let e=0;e<o;e++)f.bindFramebuffer(f.FRAMEBUFFER,r.press[(e+1)%2]),Q(z,`uP`,1,r.p[e%2]),f.drawArrays(f.TRIANGLE_STRIP,0,4)}},$=[],dt=D.map(()=>ke),ft=0,pt=1e3/60,mt=1/0,ht=-1/0,gt=e=>{let t=$.reduce((e,t)=>e+t,0);if($.length<20&&($.length<4||t<330))return;let n=e=>[...$].sort((e,t)=>e-t)[Math.floor($.length*e)];pt=Math.min(1e3/60,Math.max(n(.25),4));let r=n(.75)>pt*1.3,i=n(.9)<pt*1.15;$.length=0,r&&N>0?(e-ht<5&&(dt[N]=Math.min(dt[N]*2,120)),N--,ft=0,P()):i&&N<D.length-1&&(ft+=t/1e3)>=dt[N+1]?(N++,ft=0,ht=e,P()):i||(ft=0)},_t=e=>{let t=e.o.z??0;return[t,t+O.depth*Math.min(e.o.size[0],e.o.size[1])]},vt=(e,t,n,r)=>{let i=e-F.x,a=t-F.y;return[i/F.w*2-1,1-(a+r)/F.h*2,(i+n)/F.w*2-1,1-a/F.h*2]},yt=e=>{let[t,n,r,i]=e.box;return[+(t>F.x),+(t+r<F.x+F.w),+(n>F.y),+(n+i<F.y+F.h)]},bt=(e,t)=>{ot+=t,Pe*=Math.exp(-t/(innerHeight/T()*C/Ie)),Pe<.002&&(Pe=0),M=Ne+Pe,Fe=ze(e),f.disable(f.BLEND),f.bindVertexArray(q);let n=[];for(let t of m)!t.fed.size&&(t.quietSince===-1/0&&(t.quietSince=e),e-t.quietSince>it(t)*2.5)||(Math.abs(T()/t.at-1)>.01&&(t.box=Ae(t.o),t.at=T()),n.push(t));let r=et(n);return n.forEach((n,i)=>{let a=r[i];n.grid?(a>n.grid.long*E.regrid||a*E.regrid<n.grid.long)&&tt(n,a):n.grid=$e(n,a),ut(n,t,lt(n,e))}),n},xt=(t,n,r)=>{let i=Math.max(Math.round(F.w*F.ratio),1),a=Math.max(Math.round(F.h*F.ratio),1);if((M>0||t.length)&&nt(),f.bindFramebuffer(f.FRAMEBUFFER,Dt),f.viewport(0,0,i,a),f.enable(f.BLEND),f.blendFunc(f.ONE,f.ONE_MINUS_SRC_ALPHA),f.bindVertexArray(q),M>0&&(f.useProgram(H.p),ct(H),f.uniform4f(H.u(`uView`),F.x*C/T(),F.y*C/T(),F.w*C/T(),F.h*C/T()),f.uniform1f(H.u(`uTime`),ot),f.uniform1f(H.u(`uHaze`),M),f.drawArrays(f.TRIANGLE_STRIP,0,4)),t.length){let e=C/T();f.disable(f.BLEND),f.useProgram(B.p),ct(B),Q(B,`uBlackbody`,5,Ye),f.uniform1f(B.u(`uExtinction`),O.extinction);for(let n of t){let t=n.grid;f.bindFramebuffer(f.FRAMEBUFFER,t.lighting),f.viewport(0,0,t.nx,t.ny),st(B,t),Q(B,`uVel`,0,t.vel[t.cur]),Q(B,`uDye`,1,t.dye[t.cur]),f.uniform2f(B.u(`uOrigin`),n.box[0]*e,n.box[1]*e),f.uniform1f(B.u(`uDepth`),O.depth*Math.min(n.box[2],n.box[3])*e),f.drawArrays(f.TRIANGLE_STRIP,0,4)}f.bindFramebuffer(f.FRAMEBUFFER,Dt),f.viewport(0,0,i,a),f.enable(f.BLEND),f.blendFunc(f.ONE,f.ONE_MINUS_SRC_ALPHA),f.useProgram(V.p),Q(V,`uHeights`,7,r??Je),f.uniform2f(V.u(`uViewPx`),i,a),Q(V,`uBlackbody`,5,Ye),Q(V,`uNoise`,6,Je),f.uniform1f(V.u(`uExtinction`),O.extinction),f.uniform1i(V.u(`uLinear`),+!!p);for(let n of t){let t=n.grid,[i,a,o,s]=n.box;st(V,t),Q(V,`uVel`,0,t.vel[t.cur]),Q(V,`uDye`,1,t.dye[t.cur]),Q(V,`uLit`,2,t.lit),f.uniform1f(V.u(`uTime`),n.time),f.uniform1f(V.u(`uPixel`),e/F.ratio);let[c,l]=_t(n);f.uniform3f(V.u(`uSlab`),c,l,r&&n.o.z!==void 0?1:0),f.uniform1i(V.u(`uOctaves`),D[N].octaves),f.uniform2f(V.u(`uOrigin`),i*e,a*e),f.uniform4f(V.u(`uFade`),...yt(n)),f.uniform4f(V.u(`uRect`),...vt(i,a,o,s)),f.drawArrays(f.TRIANGLE_STRIP,0,4)}}if(h.length){let t=T()/C,r=(typeof e.floor==`function`?e.floor():e.floor)??innerHeight,o=new Float32Array(h.length*6*Oe),s=0;for(let e=h.length-1;e>=0;e--){let i=h[e],a=Math.hypot(i.vx,i.vy),c=i.m.rho*Math.PI*i.d**3/6,l=Math.PI*i.d*i.d,u=(i.t+w.kelvin)/2/w.kelvin,d=w.rho/u,f=w.nu*u**1.7,ne=w.k*u**.8,m=.5*d*.47*(l/4)*a/c;i.vx-=i.vx*m*n,i.vy-=i.vy*m*n-(i.resting?0:Te*n);let g=2+.6*Math.sqrt(a*i.d/f)*.89,re=l*(g*ne/i.d*(i.t-w.kelvin)+i.m.e*we*(i.t**4-w.kelvin**4))*(i.resting?4:1),_=i.m.burns&&!i.resting&&i.fuel>0?l*(g*w.oxygenDiffusion*u**1.75/i.d)*d*w.oxygen*Ce*i.m.burns:0;if(i.fuel-=_/i.m.burns/c*n,i.t-=(re-_)/(c*i.m.c)*n,i.t<798||i.y>innerHeight+50||i.x<-50||i.x>innerWidth+50){h.splice(e,1);continue}let ie=[i.x,i.y];i.x+=i.vx*t*n,i.y+=i.vy*t*n,i.y>r&&ie[1]<=r+1&&(i.y=r,i.vy>.25?(i.vy*=-.3,i.vx*=.7):(i.vy=0,i.resting=!0)),i.resting&&(i.vx*=Math.exp(-n*.4*Te/Math.max(Math.abs(i.vx),.05)));let ae=F.ratio,v=Math.hypot(i.vx,i.vy),y=i.d*t*ae/2,oe=Math.max(y,.5),b=v*De*t*ae,se=2*oe*b+Math.PI*(oe*oe+1/12),ce=ee(i.t),le=Math.PI*y*y/se*(i.m.e*te(i.t)/Le),ue=v>1e-4?i.vx/v:1,de=v>1e-4?i.vy/v:0,x=oe+(p?1:10),fe=(i.x-F.x)*ae,pe=(i.y-F.y)*ae,S=(e,t)=>o.set([fe+ue*(e-b)-de*t,pe+de*(e-b)+ue*t,e,t,b,oe,ce[0]*le,ce[1]*le,ce[2]*le],s++*Oe);S(-x,x),S(-x,-x),S(b+x,x),S(b+x,x),S(-x,-x),S(b+x,-x)}f.blendFunc(f.ONE,f.ONE),f.useProgram(U.p),f.uniform2f(U.u(`uSpan`),i,a),f.uniform1f(U.u(`uFloor`),(r-F.y)*F.ratio),f.uniform1i(U.u(`uLinear`),+!!p),f.bindVertexArray(We),f.bindBuffer(f.ARRAY_BUFFER,Ge),f.bufferData(f.ARRAY_BUFFER,o.subarray(0,s*Oe),f.DYNAMIC_DRAW),f.drawArrays(f.TRIANGLES,0,s)}f.disable(f.BLEND),f.bindVertexArray(null)},St=e=>M>0||j.size>0||e.length>0||h.length>0||y.length>0,Ct=()=>{let t=performance.now()/1e3,n=Math.min(t-at,.1),r=(t-at)*1e3;return je&&=(mt=t,!1),e.quality===void 0&&t-mt>1&&($.push(r),gt(t)),at=t,{now:t,dt:n}};ie=()=>{if(_=0,p)return;Tt();let{now:e,dt:t}=Ct(),n=bt(e,t);f.bindFramebuffer(f.FRAMEBUFFER,null),f.viewport(0,0,l.width,l.height),f.clearColor(0,0,0,0),f.clear(f.COLOR_BUFFER_BIT),y.length=0,xt(n,t,null),St(n)?A():je=!0};let wt=[0,0,1],Tt=()=>{let e=l.getBoundingClientRect(),[t,n,r]=wt,i=l.offsetWidth?e.width/(r*l.offsetWidth):1,a=[(t*i-e.left)/i,(n*i-e.top)/i,1/i];if(a.every((e,t)=>Math.abs(e-wt[t])<.001))return;wt=a;let o=Math.abs(a[2]-1)<.001&&Math.abs(a[0])<.5&&Math.abs(a[1])<.5;Object.assign(l.style,o?{inset:`0`,width:`100%`,height:`100%`,transform:``,transformOrigin:``}:{inset:`auto`,left:`0`,top:`0`,width:`${innerWidth}px`,height:`${innerHeight}px`,transform:`translate(${a[0]}px, ${a[1]}px) scale(${a[2]})`,transformOrigin:`0 0`})},Et=null,Dt=null,Ot=e=>{Ze(),cancelAnimationFrame(_),_=0,p=!!e,Dt=null,f=e??u,e?l.remove():s.append(l),Xe(),P()},kt=(e,t)=>{if(J&&J.w===e&&J.h===t)return J;if(J){for(let e of[J.tex,J.bend])f.deleteTexture(e);for(let e of[J.fbo,J.bent])f.deleteFramebuffer(e)}let n=Y(e,t,f.RGBA16F,f.LINEAR),r=Y(e,t,f.RGBA16F,f.LINEAR);return J={w:e,h:t,tex:n,fbo:X(n),bend:r,bent:X(r)}},At=(e,t)=>{let{r:n,t:r,w:i}=e,a;if(t<=r[0])a=n[0]*(t/r[0])**.4;else if(t>=r[127])a=n[127]+ge*(t-r[127]);else{let e=0,i=127;for(;i-e>1;){let n=e+i>>1;r[n]<=t?e=n:i=n}a=n[e]+(n[i]-n[e])*(t-r[e])/(r[i]-r[e])}let o=a/i,s=ve(o);return[a/C,xe(s),.5*be(s)*ye(o)*i/1e3/C]},jt=(e,t)=>{let n=J,r=1/T(),i=Math.hypot(F.w,F.h)*r,a=[];for(let e=y.length-1;e>=0;e--){let n=y[e],o=t-n.from,s=!1;for(let e=0;e<4;e++){let t=o-De*(e+.5)/4;if(t<=0)continue;let[c,l,u]=At(n,t),d=n.x-F.x,f=n.y-F.y;l<1e-5||c-8*u>i+Math.hypot(d,f)*r||(s=!0,a.length<96&&a.push(d,f,c,l,u,.25))}!s&&o>De&&y.splice(e,1)}let o=e.filter(e=>e.grid);if(f.bindFramebuffer(f.FRAMEBUFFER,n.bent),f.viewport(0,0,n.w,n.h),f.clearColor(0,0,0,0),f.clear(f.COLOR_BUFFER_BIT),!a.length&&!o.length)return!1;if(f.enable(f.BLEND),f.blendEquation(f.FUNC_ADD),f.blendFunc(f.ONE,f.ONE),f.bindVertexArray(q),o.length){f.useProgram(G.p),Q(G,`uHeights`,3,n.tex),f.uniform2f(G.u(`uViewPx`),n.w,n.h);for(let e of o){let t=e.grid,[n,r,i,a]=e.box,[o,s]=_t(e);st(G,t),Q(G,`uVel`,0,t.vel[t.cur]),f.uniform3f(G.u(`uSlab`),o,s,e.o.z===void 0?0:1),f.uniform4f(G.u(`uFade`),...yt(e)),f.uniform4f(G.u(`uRect`),...vt(n,r,i,a)),f.drawArrays(f.TRIANGLE_STRIP,0,4)}}if(a.length){f.useProgram(K.p),Q(K,`uHeights`,3,n.tex),f.uniform2f(K.u(`uViewPx`),n.w,n.h),f.uniform1f(K.u(`uMmPerPx`),r);let e=a.length/6,t=new Float32Array(64),i=new Float32Array(32);for(let n=0;n<e;n++)t.set(a.slice(n*6,n*6+4),n*4),i.set(a.slice(n*6+4,n*6+6),n*2);f.uniform4fv(K.u(`uShock`),t),f.uniform2fv(K.u(`uShockShell`),i),f.uniform1i(K.u(`uShockCount`),e),f.drawArrays(f.TRIANGLE_STRIP,0,4)}return f.disable(f.BLEND),f.bindVertexArray(null),!0};return Ve=i({before(e){e.gl!==f&&Ot(e.gl),f.disable(f.SCISSOR_TEST),f.disable(f.DEPTH_TEST),f.disable(f.CULL_FACE),f.blendEquation(f.FUNC_ADD),f.colorMask(!0,!0,!0,!0),F={x:e.left,y:e.top,w:e.w,h:e.h,ratio:e.ratio},Dt=e.target;let{now:t,dt:n}=Ct(),r=bt(t,n),i=r.length>0||y.length>0;if(Et={live:r,dt:n,deep:i},!i)return null;let a=kt(Math.max(Math.ceil(e.w),1),Math.max(Math.ceil(e.h),1)),o=jt(r,t);return f.bindFramebuffer(f.FRAMEBUFFER,a.fbo),f.viewport(0,0,a.w,a.h),f.clearColor(0,0,0,0),f.clear(f.COLOR_BUFFER_BIT),o?a.bend:null},shot(e,t){if(t.gl!==f||!Et?.deep||!J)return;let n=J;f.bindFramebuffer(f.FRAMEBUFFER,n.fbo),f.viewport(0,0,n.w,n.h),f.enable(f.BLEND),f.blendEquation(f.MAX),f.bindVertexArray(q),f.useProgram(W.p),Q(W,`uH`,0,e.height??Je),f.uniform1i(W.u(`uFlat`),+!e.height),f.uniform1f(W.u(`uFace`),e.face),f.uniform4f(W.u(`uToMap`),...e.toMap),f.uniform1f(W.u(`uRows`),n.h);let[r,i,a,o]=e.box;f.uniform4f(W.u(`uRect`),r/n.w*2-1,1-(i+o)/n.h*2,(r+a)/n.w*2-1,1-i/n.h*2),f.drawArrays(f.TRIANGLE_STRIP,0,4),f.blendEquation(f.FUNC_ADD),f.disable(f.BLEND),f.bindVertexArray(null)},after(e){if(e.gl!==f||!Et)return;let{live:t,dt:n,deep:r}=Et;Et=null,xt(t,n,r&&J?J.tex:null),St(t)?A():je=!0},leave(e){p&&e===f&&Ot(null)}}),Be}var Ae=e=>{if(Array.isArray(e))return e;let t=e.getBoundingClientRect();return[t.left+t.width/2,t.top+t.height/2]},je=10,A=.1,Me=.4,Ne=.01,Pe=117e4,j=7800*Math.PI*25e-5**3/6;function Fe(e,t,n,r={}){let i=50*Math.cbrt(n/1e3),a=je*n/A/(4*Math.PI),o=e.light({at:Ae(t),radius:i,candela:a,kelvin:r.kelvin??6e3});setTimeout(()=>o.remove(),A*1e3),e.shock(t,Me*n);let s=r.size??.25,c=Ne*n/Pe/(j*(s/.25)**3);c>=1&&e.sparks(t,Math.round(c),{speed:r.speed,toward:r.toward,spread:r.spread??200,size:s})}var M=new WeakMap;function Ie(e,t){let n=Math.min(1,Math.max(0,(t-.05)/.6));if(!n)return;let r=e.scale,i=innerWidth/r,a=innerHeight/r,o=M.get(e);o||M.set(e,o=e.plume({at:[innerWidth/2,0],size:[i,a],anchor:[.5,0]}));for(let e=0;e<Math.round(2+n*5);e++)o.puff({at:[innerWidth*(.05+Math.random()*.9),2],radius:12+n*30,rate:.2+n*.45,steam:.5,jet:[(Math.random()-.5)*60,260+n*380],grip:.5,color:[.6,.55,.48]},.25+n*.5);e.stir(n*.3)}var Le=.15,Re=1900,ze=.5,Be=2.6,Ve=[.85,.83,.8],He=[.12,.11,.1],N=(e,t)=>{let n=.235*(e/1e3)**.4,r=Math.min(t/1e3,n/3.02),i=n-1.02*r;return[r*1e3,.4*i*1e3]};function P(e,t,n={}){let r=t.getBoundingClientRect(),i=e.scale,a=[r.width/i,r.height/i],o=n.watts??50,s=N(o,a[0]),c=[r.left+r.width/2,r.top+r.height/2-s[1]/2*i],l=e.plume({at:t,size:[Math.max(220,a[0]*3),560],anchor:[.5,.9]}),u=l.add({at:t,radius:2,span:a,seam:!0,rate:8,heat:ze,color:Ve}),d=Le*o/(4*Math.PI),f=null;return{set(n){let r=n===`flame`;u.set(r?{at:c,span:s,seam:!1,heat:Be,rate:10,radius:3,color:He}:{at:t,span:a,seam:!0,heat:ze,rate:8,radius:2,color:Ve}),r?f??=e.light({at:c,radius:s[1]*1.25,candela:d,kelvin:Re}):(f?.remove(),f=null)},remove(){f?.remove(),l.remove()}}}function F(e,t,n){let r=e.scale,i=t.map(Ae),a=n.slots??3,o=n.speed??.5,[s,c]=n.size,l=i.map(e=>e[0]),u=Math.min(...l),d=Math.max(...l),f=Math.max(...i.map(e=>e[1])),p=e.plume({at:[(u+d)/2,f+c/2*r],size:[(d-u)/r+s*1.5,o*1500+200],anchor:[.5,1]}),ee=c/a;return{blow(e){for(let[t,n]of i)for(let i=0;i<a;i++)p.puff({at:[t,n+(i-(a-1)/2)*ee*r],radius:3,span:[s,ee*.4],rate:3,steam:.85,heat:.17,jet:[0,-o*1e3],grip:.5,blast:60,color:[1,1,1]},e)},remove:()=>p.remove()}}var Ue=e({air:()=>k,fire:()=>P,impact:()=>Fe,shake:()=>Ie,vent:()=>F});export{F as a,Ie as i,P as n,k as o,Fe as r,Ue as t};