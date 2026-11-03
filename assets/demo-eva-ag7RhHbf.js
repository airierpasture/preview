import"./preload-helper-9vAq-Yc_.js";import"./controls-BcrWij7w.js";import"./print-BNSsXJvI.js";import"./light-BlsVf-IK.js";import{n as e}from"./sound-eva-DwzG63h8.js";var t=(e,t,n,r)=>{let i=(e-t)/(e<t?n:r);return Math.exp(-.5*i*i)},n=e=>1.056*t(e,599.8,37.9,31)+.362*t(e,442,16,26.7)-.065*t(e,501.1,20.4,26.2),r=e=>.821*t(e,568.8,46.9,40.5)+.286*t(e,530.9,16.3,31.1),i=e=>1.217*t(e,437,11.8,36)+.681*t(e,459,26,13.8),a=(e,t)=>{let n=e*1e-9,r=662607015e-42,i=299792458;return 2*r*i*i/(n**5*Math.expm1(r*i/(n*1380649e-29*t)))};function o(e){let t=0,o=0,s=0;for(let c=380;c<=780;c+=5){let l=a(c,e)*5e-9;t+=l*n(c),o+=l*r(c),s+=l*i(c)}return[t*683,o*683,s*683]}var s=([e,t,n])=>[3.2406*e-1.5372*t-.4986*n,-.9689*e+1.8758*t+.0415*n,.0557*e-.204*t+1.057*n];function c(e){let t=s(o(e)).map(e=>Math.max(0,e)),n=Math.max(...t);return t.map(e=>e/n)}var l=e=>o(e)[1];function u(e,t,n,r){let i=new Float32Array(e*4);for(let a=0;a<e;a++){let o=t+(n-t)*a/(e-1),s=c(o),u=l(o)/r;i.set([s[0]*u,s[1]*u,s[2]*u,1],a*4)}return i}var d=`#version 300 es
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
  // What the sources put in, each four texels: x y radius rate | vx vy heat steam | r g b grip | spread.
  for (int i = 0; i < 64; i++) {
    if (i >= int(uSourceCount + 0.5)) break;
    vec4 a = texelFetch(uSources, ivec2(i * 4, 0), 0);
    float d = distance(w, a.xy);
    if (d > a.z) continue;
    vec4 b = texelFetch(uSources, ivec2(i * 4 + 1, 0), 0);
    vec4 c = texelFetch(uSources, ivec2(i * 4 + 2, 0), 0);
    vec4 e = texelFetch(uSources, ivec2(i * 4 + 3, 0), 0);
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
    vec2 push = b.xy + (d > 1e-4 ? (w - a.xy) / d : vec2(0)) * e.x;
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
`,y=d+v+`
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
`,te=d+v+h+_+`
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
`,b=d+v+m+_+`
uniform sampler2D uVel, uDye, uLit;
uniform float uTime, uExtinction;
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
void main() {
  // The grid runs down the page, as the page does; the canvas runs up.
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y), w = worldOf(uv);
  vec4 flow = texture(uVel, uv);
  // Detail at the size of the plume, whatever that is: a wisp off a lamp creases at millimetres, a sheet of dust at centimetres.
  float scale = 0.25 / max(span().x, span().y);
  vec4 fine = flowDetail((w + uOrigin) * scale, flow.xy * scale, uTime);
  vec4 dye = texture(uDye, uvOf(w + fine.zw / scale));
  // Creases where it's thin, smooth where it's thick.
  float fold = mix(mix(0.6 + 0.8 * fine.x, 0.5 + 1.0 * fine.y, flow.w), 1.0, smoothstep(0.6, 2.5, dye.a));
  float thick = dye.a * fold;
  vec3 tint = dye.rgb / max(dye.a, 1e-4);
  float through = exp(-thick * uExtinction);
  // What it scatters of the light that got in, and what it gives off for being hot: soot glows as thick as it is.
  vec3 scatter = tint * (1.0 - through) * texture(uLit, uvOf(w + fine.zw / scale)).rgb;
  // Too bright for the room's exposure goes to white, as a flame's core does, not to a flat plateau of its colour.
  vec3 glow = 1.0 - exp(-hotLight(flow.z * (0.75 + 0.5 * fine.y)) * (1.0 - through));
  // The box's edges fade out, so no plume is ever seen to stop at a line.
  vec4 near = vec4(uv.x, 1.0 - uv.x, uv.y, 1.0 - uv.y) + (1.0 - uFade);
  float edge = smoothstep(0.0, 0.3, min(near.x, near.y)) * smoothstep(0.0, 0.16, min(near.z, near.w));
  oColor = vec4(scatter + glow, 1.0 - through) * edge;
}
`,x=d+m+h+`
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
`,ne=`#version 300 es
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
// Where the floor is, css px: a streak that bounced doesn't show the part of it that went under.
uniform float uFloor;
out vec4 oColor;
void main() {
  if (vY > uFloor + 0.5) discard;
  // How far from the line it draws, css px.
  float d = length(vec2(vAt.x - clamp(vAt.x, 0.0, vShape.x), vAt.y)), r = max(vShape.y, 0.5);
  // The drop covers what it covers, however bright: saturating mustn't fatten it. Round it, the eye's own glare, faint enough
  // that only a very hot spark's reaches past the drop.
  float core = clamp(r + 0.5 - d, 0.0, 1.0), glare = 0.003 * r * r / (d * d + r * r) * (1.0 - smoothstep(${4.2.toFixed(1)}, ${7 .toFixed(1)}, d));
  oColor = vec4(1.0 - exp(-vLight * (core + glare)), 0.0);
}
`,S=.001,ie={steel:{rho:7800,c:500,e:.8,burns:49e5},copper:{rho:8900,c:385,e:.6,burns:0}},ae={rho:1.2,nu:15e-6,k:.026,kelvin:295,oxygenDiffusion:2e-5,oxygen:.23},oe=3.49,se=5.670374e-8,ce=9.81,le=1/30,ue=9,C=6,w={mixing:.6,vorticity:22,swirl:.35,flicker:1.6,drag:.35,heatLife:.8,expand:.6,retain:.98,extinction:1.6,depth:.25,sweeps:12};function T(e={}){let t=e.parent??document.body,n=matchMedia(`(prefers-reduced-motion: reduce)`).matches,r=document.createElement(`canvas`);Object.assign(r.style,{position:`fixed`,inset:`0`,width:`100%`,height:`100%`,pointerEvents:`none`,zIndex:String(e.zIndex??10)}),r.setAttribute(`aria-hidden`,`true`);let i=r.getContext(`webgl2`,{premultipliedAlpha:!0,alpha:!0,antialias:!1,depth:!1,stencil:!1}),a=!!i&&!!i.getExtension(`EXT_color_buffer_float`)&&!n,o=new Set,s=[],d=0,m=()=>{},h=()=>typeof e.scale==`function`?e.scale():e.scale??4,_=e=>{if(Array.isArray(e))return e;let t=e.getBoundingClientRect();return[t.left+t.width/2,t.top+t.height/2]},v=e=>{let[t,n]=_(e.at),r=h(),[i,a]=e.anchor??[.5,1],o=e.size[0]*r,s=e.size[1]*r;return[t-i*o,n-a*s,o,s]},T=()=>{!d&&a&&(d=requestAnimationFrame(()=>m()))},E=e=>{},de=0,D={get haze(){return de},set haze(e){de=Math.max(0,e),de>0&&T()},ambient:[.05,.05,.05],lights:[],plume(e){let t={o:e,fed:new Set,box:v(e),grid:null,quietSince:-1/0,time:0};return o.add(t),{add(e){let n={s:{...e}};return t.fed.add(n),t.quietSince=-1/0,T(),{set:e=>void Object.assign(n.s,e),remove:()=>void t.fed.delete(n)}},puff(e,n){let r=performance.now()/1e3;t.fed.add({s:{...e},from:r,until:r+n}),t.quietSince=-1/0,T()},remove(){t.grid&&E(t.grid),o.delete(t)}}},sparks(e,t,n={}){if(!a)return;let[r,i]=_(e),o=(n.speed??1500)*S,c=(n.toward??0)*Math.PI/180,l=(n.spread??360)*Math.PI/180,u=ie[n.metal??`steel`],d=n.kelvin??2100;for(let e=0;e<t;e++){let e=c+(Math.random()-.5)*l,t=o*(.3+Math.random()*.7),a=(n.size??.5)*S*Math.exp((Math.random()+Math.random()+Math.random()-1.5)*.7);s.push({x:r,y:i,vx:Math.sin(e)*t,vy:-Math.cos(e)*t,d:a,t:d*(.9+Math.random()*.15),m:u,resting:!1})}s.length>600&&s.splice(0,s.length-600),T()},stop(){cancelAnimationFrame(d),d=0,removeEventListener(`resize`,fe),r.remove()}},fe=()=>{r.width=Math.round(innerWidth*Math.min(devicePixelRatio||1,1.5)),r.height=Math.round(innerHeight*Math.min(devicePixelRatio||1,1.5));for(let e of o)e.box=v(e.o),e.grid&&E(e.grid),e.grid=null;T()};if(!i||!a)return D;t.append(r);let pe=(e,t)=>{let n=i.createShader(e);if(i.shaderSource(n,t),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`air: ${i.getShaderInfoLog(n)}`);return n},me=(e,t)=>{let n=i.createProgram();if(i.attachShader(n,pe(i.VERTEX_SHADER,e)),i.attachShader(n,pe(i.FRAGMENT_SHADER,t)),i.bindAttribLocation(n,0,`aPos`),i.linkProgram(n),!i.getProgramParameter(n,i.LINK_STATUS))throw Error(`air: ${i.getProgramInfoLog(n)}`);let r=new Map;return{p:n,u:e=>r.has(e)?r.get(e):r.set(e,i.getUniformLocation(n,e)).get(e)}},O=me(f,ee),k=me(f,y),he=me(f,te),A=me(p,b),ge=me(f,x),_e=me(ne,re),ve=i.createVertexArray();i.bindVertexArray(ve),i.bindBuffer(i.ARRAY_BUFFER,i.createBuffer()),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),i.STATIC_DRAW),i.enableVertexAttribArray(0),i.vertexAttribPointer(0,2,i.FLOAT,!1,0,0);let ye=i.createBuffer(),be=i.createVertexArray();i.bindVertexArray(be),i.bindBuffer(i.ARRAY_BUFFER,ye);let xe=i.getAttribLocation(_e.p,`aSpark`),Se=i.getAttribLocation(_e.p,`aShape`),Ce=i.getAttribLocation(_e.p,`aLight`);i.enableVertexAttribArray(xe),i.vertexAttribPointer(xe,4,i.FLOAT,!1,36,0),i.enableVertexAttribArray(Se),i.vertexAttribPointer(Se,2,i.FLOAT,!1,36,16),i.enableVertexAttribArray(Ce),i.vertexAttribPointer(Ce,3,i.FLOAT,!1,36,24),i.bindVertexArray(null);let we=(e,t,n,r,a=null,o=i.HALF_FLOAT)=>{let s=i.createTexture();return i.bindTexture(i.TEXTURE_2D,s),i.texImage2D(i.TEXTURE_2D,0,n,e,t,0,i.RGBA,o,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,r),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,r),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),s},Te=(...e)=>{let t=i.createFramebuffer();return i.bindFramebuffer(i.FRAMEBUFFER,t),e.forEach((e,t)=>i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+t,i.TEXTURE_2D,e,0)),i.drawBuffers(e.map((e,t)=>i.COLOR_ATTACHMENT0+t)),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),t},Ee=new Float32Array(1024),j=we(256,1,i.RGBA32F,i.NEAREST,Ee,i.FLOAT),De=e=>{let t=e.o.cells??128,[,,n,r]=e.box,a=n>=r,o=a?t:Math.max(8,Math.round(t*n/r)),s=a?Math.max(8,Math.round(t*r/n)):t,c=n/h()*S/o,l=()=>we(o,s,i.RGBA16F,i.LINEAR),u=[l(),l()],d=[l(),l()],f=[l(),l()],p=l();return{nx:o,ny:s,cell:c,vel:u,dye:d,p:f,lit:p,step:[Te(u[0],d[0]),Te(u[1],d[1])],press:[Te(f[0]),Te(f[1])],lighting:Te(p),cur:0}};E=e=>{for(let t of[...e.vel,...e.dye,...e.p,e.lit])i.deleteTexture(t);for(let t of[...e.step,...e.press,e.lighting])i.deleteFramebuffer(t)},addEventListener(`resize`,fe),fe();let Oe=document.createElement(`canvas`),ke=Oe.getContext(`2d`),Ae=we(1,1,i.RGBA8,i.LINEAR,new Uint8Array(4),i.UNSIGNED_BYTE);i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR_MIPMAP_LINEAR);let je=()=>{let t=Math.max(1,Math.ceil(innerWidth/C)),n=Math.max(1,Math.ceil(innerHeight/C));(Oe.width!==t||Oe.height!==n)&&Object.assign(Oe,{width:t,height:n}),ke.globalCompositeOperation=`source-over`,ke.globalAlpha=1,ke.fillStyle=`#000`,ke.fillRect(0,0,t,n),ke.globalCompositeOperation=`lighter`;for(let t of e.shine?.()??[]){let e=t.at.getBoundingClientRect();if(!(e.width<1||e.bottom<0||e.top>innerHeight)){if(ke.globalAlpha=Math.min(1,t.strength??1),!t.color&&t.at instanceof HTMLCanvasElement)ke.drawImage(t.at,e.left/C,e.top/C,e.width/C,e.height/C);else{let[n,r,i]=(t.color??[1,1,1]).map(e=>Math.round(Math.min(1,e)*255));ke.fillStyle=`rgb(${n} ${r} ${i})`,ke.fillRect(e.left/C,e.top/C,e.width/C,e.height/C)}}}i.bindTexture(i.TEXTURE_2D,Ae),i.texImage2D(i.TEXTURE_2D,0,i.RGBA8,i.RGBA,i.UNSIGNED_BYTE,Oe),i.generateMipmap(i.TEXTURE_2D)},Me=e.white??120,Ne=we(64,1,i.RGBA16F,i.LINEAR,u(64,798,g,Me),i.FLOAT),Pe=e.smoke??8,Fe=e.steam??.6,Ie=e.rise??1.2,Le=performance.now()/1e3,Re=0,M=(e,t,n,r)=>{i.activeTexture(i.TEXTURE0+n),i.bindTexture(i.TEXTURE_2D,r),i.uniform1i(e.u(t),n)},ze=(e,t)=>{i.uniform2f(e.u(`uCells`),t.nx,t.ny),i.uniform1f(e.u(`uCell`),t.cell),i.uniform1i(e.u(`uBlockCount`),0)},Be=t=>{let n=S/h();M(t,`uShine`,4,Ae),i.uniform1f(t.u(`uShineGain`),e.shine?e.shineGain??1:0),i.uniform2f(t.u(`uPageSpan`),innerWidth*n,innerHeight*n),i.uniform3fv(t.u(`uAmbient`),D.ambient);let r=D.lights.slice(0,8),a=new Float32Array(32),o=new Float32Array(24);r.forEach((e,t)=>{let[r,i]=_(e.at);a.set([r*n,i*n,e.radius*S,0],t*4),o.set(e.color,t*3)}),i.uniform1i(t.u(`uLightCount`),r.length),i.uniform4fv(t.u(`uLightAt`),a),i.uniform3fv(t.u(`uLightColor`),o)},Ve=(e,t)=>{let n=0,r=S/h(),[a,o]=e.box;for(let i of e.fed){if(i.until!==void 0&&t>i.until){e.fed.delete(i);continue}if(n>=64)break;let s=i.s,c=i.until===void 0?1:1-(t-i.from)/(i.until-i.from),[l,u]=_(s.at),d=s.color??[.5,.5,.5];Ee.set([(l-a)*r,(u-o)*r,Math.max(s.radius*S,e.grid.cell*1.6),(s.rate??1)*c,(s.jet?.[0]??0)*S,(s.jet?.[1]??0)*S,(s.heat??0)*c,s.steam??0,d[0],d[1],d[2],s.grip??+!!s.blast,(s.blast??0)*S*c,0,0,0],n*16),n++}return i.bindTexture(i.TEXTURE_2D,j),i.texSubImage2D(i.TEXTURE_2D,0,0,0,256,1,i.RGBA,i.FLOAT,Ee),n},He=(e,t,n)=>{let r=e.grid,a=Math.max(1,Math.ceil(t*60)),o=t/a;for(let t=0;t<a;t++){e.time+=o;let t=1-r.cur;i.bindFramebuffer(i.FRAMEBUFFER,r.step[t]),i.viewport(0,0,r.nx,r.ny),i.useProgram(O.p),ze(O,r),M(O,`uVel`,0,r.vel[r.cur]),M(O,`uDye`,1,r.dye[r.cur]),M(O,`uP`,2,r.p[0]),M(O,`uSources`,3,j);let a=O.u;i.uniform1f(a(`uDt`),o),i.uniform1f(a(`uTime`),e.time),i.uniform1f(a(`uSourceCount`),n),i.uniform1f(a(`uMixing`),w.mixing),i.uniform1f(a(`uVorticity`),w.vorticity),i.uniform1f(a(`uSwirl`),w.swirl),i.uniform1f(a(`uFlicker`),w.flicker),i.uniform1f(a(`uDrag`),w.drag),i.uniform1f(a(`uHeatLife`),w.heatLife),i.uniform1f(a(`uSmokeLife`),Pe),i.uniform1f(a(`uSteamLife`),Fe),i.uniform1f(a(`uRise`),Ie),i.uniform2f(a(`uWind`),0,0),i.uniform2f(a(`uOrigin`),e.box[0]*S/h(),e.box[1]*S/h()),i.drawArrays(i.TRIANGLE_STRIP,0,4),r.cur=t,i.useProgram(k.p),ze(k,r),i.uniform1f(k.u(`uExpand`),w.expand),i.uniform1f(k.u(`uRetain`),w.retain),M(k,`uVel`,0,r.vel[r.cur]);for(let e=0;e<w.sweeps;e++)i.bindFramebuffer(i.FRAMEBUFFER,r.press[(e+1)%2]),M(k,`uP`,1,r.p[e%2]),i.drawArrays(i.TRIANGLE_STRIP,0,4)}};return m=()=>{d=0;let t=performance.now()/1e3,n=Math.min(t-Le,.1);Le=t,Re+=n,i.disable(i.BLEND),i.bindVertexArray(ve);let a=[];for(let e of o)!e.fed.size&&(e.quietSince===-1/0&&(e.quietSince=t),t-e.quietSince>Pe*2.5)||(e.grid??=De(e),He(e,n,Ve(e,t)),a.push(e));if(i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,r.width,r.height),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),(D.haze>0||a.length)&&e.shine&&je(),i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE_MINUS_SRC_ALPHA),i.bindVertexArray(ve),D.haze>0&&(i.useProgram(ge.p),Be(ge),i.uniform1f(ge.u(`uTime`),Re),i.uniform1f(ge.u(`uHaze`),D.haze),i.drawArrays(i.TRIANGLE_STRIP,0,4)),a.length){let e=S/h();i.disable(i.BLEND),i.useProgram(he.p),Be(he),M(he,`uBlackbody`,5,Ne),i.uniform1f(he.u(`uExtinction`),w.extinction);for(let t of a){let n=t.grid;i.bindFramebuffer(i.FRAMEBUFFER,n.lighting),i.viewport(0,0,n.nx,n.ny),ze(he,n),M(he,`uVel`,0,n.vel[n.cur]),M(he,`uDye`,1,n.dye[n.cur]),i.uniform2f(he.u(`uOrigin`),t.box[0]*e,t.box[1]*e),i.uniform1f(he.u(`uDepth`),w.depth*Math.min(t.box[2],t.box[3])*e),i.drawArrays(i.TRIANGLE_STRIP,0,4)}i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,r.width,r.height),i.enable(i.BLEND),i.useProgram(A.p),M(A,`uBlackbody`,5,Ne),i.uniform1f(A.u(`uExtinction`),w.extinction);for(let t of a){let n=t.grid,[r,a,o,s]=t.box;ze(A,n),M(A,`uVel`,0,n.vel[n.cur]),M(A,`uDye`,1,n.dye[n.cur]),M(A,`uLit`,2,n.lit),i.uniform1f(A.u(`uTime`),t.time),i.uniform2f(A.u(`uOrigin`),r*e,a*e),i.uniform4f(A.u(`uFade`),+(r>0),+(r+o<innerWidth),+(a>0),+(a+s<innerHeight)),i.uniform4f(A.u(`uRect`),r/innerWidth*2-1,1-(a+s)/innerHeight*2,(r+o)/innerWidth*2-1,1-a/innerHeight*2),i.drawArrays(i.TRIANGLE_STRIP,0,4)}}if(s.length){let t=h()/S,r=(typeof e.floor==`function`?e.floor():e.floor)??innerHeight,a=new Float32Array(s.length*6*ue),o=0;for(let e=s.length-1;e>=0;e--){let i=s[e],u=Math.hypot(i.vx,i.vy),d=i.m.rho*Math.PI*i.d**3/6,f=Math.PI*i.d*i.d,p=.5*ae.rho*.47*(f/4)*u/d;i.vx-=i.vx*p*n,i.vy-=i.vy*p*n-(i.resting?0:ce*n);let m=2+.6*Math.sqrt(u*i.d/ae.nu)*.89,h=f*(m*ae.k/i.d*(i.t-ae.kelvin)+i.m.e*se*(i.t**4-ae.kelvin**4))*(i.resting?4:1),g=(i.t+ae.kelvin)/2,_=ae.rho*ae.oxygen*ae.kelvin/g,v=i.m.burns&&!i.resting?f*(m*ae.oxygenDiffusion/i.d)*_*oe*i.m.burns:0;if(i.t-=(h-v)/(d*i.m.c)*n,i.t<798||i.y>innerHeight+50||i.x<-50||i.x>innerWidth+50){s.splice(e,1);continue}let ee=[i.x,i.y];i.x+=i.vx*t*n,i.y+=i.vy*t*n,i.y>r&&ee[1]<=r+1&&(i.y=r,i.vy>.25?(i.vy*=-.3,i.vx*=.7):(i.vy=0,i.resting=!0)),i.resting&&(i.vx*=Math.exp(-n*.4*ce/Math.max(Math.abs(i.vx),.05)));let y=Math.hypot(i.vx,i.vy),te=Math.max(i.d*t,.75),b=Math.max(y*le*t,te),x=c(i.t),ne=Math.min(1,te/b)*i.m.e*l(i.t)/Me,re=y>1e-4?i.vx/y:1,S=y>1e-4?i.vy/y:0,ie=te/2,C=Math.max(b-te,0),w=ie+7,T=(e,t)=>a.set([i.x+re*(e-C)-S*t,i.y+S*(e-C)+re*t,e,t,C,ie,x[0]*ne,x[1]*ne,x[2]*ne],o++*ue);T(-w,w),T(-w,-w),T(C+w,w),T(C+w,w),T(-w,-w),T(C+w,-w)}i.blendFunc(i.ONE,i.ONE),i.useProgram(_e.p),i.uniform2f(_e.u(`uSpan`),innerWidth,innerHeight),i.uniform1f(_e.u(`uFloor`),r),i.bindVertexArray(be),i.bindBuffer(i.ARRAY_BUFFER,ye),i.bufferData(i.ARRAY_BUFFER,a.subarray(0,o*ue),i.DYNAMIC_DRAW),i.drawArrays(i.TRIANGLES,0,o)}i.disable(i.BLEND),i.bindVertexArray(null),(D.haze>0||a.length||s.length)&&T()},D}var E=[384,288],de=[512,384],D=[384,288],fe=[`Base`,`Eva-01`,`Launch`],pe=[[`emergency`,`非常事態`,`Emergency`,`red`],[`blue`,`パターン青`,`Pattern blue`,`blue`],[`field`,`ATフィールド`,`AT field`,`amber`],[`magi`,`MAGI`,`Magi vote`,`amber`],[`city`,`迎撃態勢`,`Intercept`,`amber`],[`shelter`,`避難`,`Shelters`,`green`],[`seal`,`隔壁閉鎖`,`Geofront seal`,`red`],[`comms`,`通信`,`Comms link`,`green`],[`cage`,`ケージ`,`Cage lock`,`amber`],[`restraint`,`拘束具`,`Restraints`,`amber`],[`plug`,`プラグ`,`Entry plug`,`green`],[`lcl`,`LCL`,`LCL fill`,`amber`],[`a10`,`A10神経`,`A10 nerve`,`green`],[`limit`,`シンクロ`,`Sync limit`,`amber`],[`vitals`,`パイロット`,`Pilot vitals`,`red`],[`berserk`,`暴走`,`Berserk`,`red`],[`track`,`射出路`,`Track open`,`green`],[`launch`,`発進可`,`Launch ready`,`green`],[`liftoff`,`射出`,`Lift off`,`green`],[`surface`,`地上`,`Surfaced`,`green`],[`umbilical`,`アンビリカル`,`Umbilical`,`red`],[`battery`,`内部電源`,`Battery low`,`red`],[`eject`,`プラグ射出`,`Plug eject`,`amber`],[`silenced`,`目標沈黙`,`Silenced`,`green`]],me=[[`range`,`距離`,`Range m`,4,`red`],[`atf`,`ATF`,`%`,3,`amber`],[`lcl`,`LCL`,`°C`,3,`green`],[`power`,`電力`,`%`,3,`green`]],O=[[`umb`,`Umbilical`],[`int`,`Internal`],[`res`,`Reserve`],[`emg`,`Emergency`]],k=[[`Coolant`,`COOLING SYSTEM STOP`],[`Restraint`,`ARM RESTRAINTS RELEASE`],[`Bridge`,`UMBILICAL BRIDGE CLEAR`],[`Bolts`,`PRIMARY LOCK BOLTS RELEASE`],[`Safety`,`FINAL SAFETY LOCK RELEASE`]],he=[[0,`ENTRY PLUG INSERTED`],[1.2,`PLUG DEPTH: FIXED`],[2.4,`LCL FILLING`],[3.6,`LCL ELECTROLYSIS`],[4.8,`PRIMARY CONTACT: ALL CLEAR`],[6,`A10 NERVE CONNECTION: CLEAR`],[7.2,`MUTUAL INTERFERENCE: NONE`]],A=8,ge=9,_e=6,ve=3.5,ye=4.5,be=4.6,xe=2.5,Se=3.6,Ce=10,we=[[.45,.53],[.8,.86],[1.25,1/0]],Te=1.7,Ee=.45,j={magi:2.8,main:3.2,sync:3.6},De=3.9,Oe=.6,ke=9.4,Ae=12.4,je=[6.8,5.8,4.8],Me=4,Ne=[[`NERV OPERATIONS SYSTEM  REV 2.01`,[]],[`MEMORY 4096 TB ................ OK`,[]],[`UMBILICAL BUS 6.6 kV .......... OK`,[`mains`]],[`GEOFRONT SENSOR NET .... 1024 NODES`,[]],[`TOKYO-3 DEFENCE GRID ...... ONLINE`,[]],[`MAGI LINK ...... 3 OF 3 ESTABLISHED`,[`comms`]],[`CAGE 7  EVA-01 ............ FROZEN`,[`cage`,`restraint`]],[`LCL PLANT ................ STANDBY`,[]],[`LAUNCH TRACKS 1-9 .......... CLEAR`,[]]],Pe=6,Fe=300,Ie=41.3,Le=[2.4,4.3,3.3],Re=1.4,M=5,ze=[26,46],Be=5,Ve=3.2,He=1.5,Ue=24,We=[3,8,13,17,21],Ge=46,Ke=1.4,qe=520,Je=130,Ye=[2600,6500],Xe=[650,1500],N=18,P=`#ff7a00`,F=`#ffb300`,I=`#ff2a1a`,L=`#3ce0ff`,R=`#40ff70`,z=`#f4ead8`,Ze=`#b46cff`,Qe=`"Noto Serif", "Shippori Mincho B1", "Times New Roman", serif`,$e=`"Shippori Mincho B1", "Hiragino Mincho ProN", "Yu Mincho", serif`,et=.78,tt=`Menlo, Monaco, "Courier New", monospace`;function B(e,t,n,r,i,a,o={}){let s=o.font??Qe,c=s===Qe,l=c?(o.cond??et)/et:o.cond??et;e.save(),e.translate(n,r),e.scale(l,1),e.font=`${o.weight??(c?`900`:s===$e?`800`:`bold`)} ${i}px ${s}`,e.fontStretch=c?`extra-condensed`:`normal`,e.textAlign=o.align??`left`,e.textBaseline=o.base??`alphabetic`,e.fillStyle=a,e.fillText(t,0,0);let u=e.measureText(t).width*l;return e.restore(),u}var V=(e,t,n,r,i,a,o=`left`)=>B(e,t,n,r,i,a,{font:tt,weight:`normal`,cond:1,align:o});function nt(e,t,n,r){e.beginPath();for(let i=0;i<6;i++){let a=Math.PI/3*i;e.lineTo(t+r*Math.cos(a),n+r*Math.sin(a))}e.closePath()}function rt(e,t,n,r,i,a){let o=r*1.5,s=r*Math.sqrt(3);for(let c=-1,l=0;c*o<t+r;c++,l++)for(let t=-1;t*s<n+r;t++){let n=c*o,u=t*s+(l%2?s/2:0),d=((c*7+t*13+i)%5+5)%5==0;nt(e,n,u,r-2),e.fillStyle=d?`rgba(255,42,26,${.9*a})`:`rgba(255,42,26,${.18*a})`,e.fill(),e.strokeStyle=`rgba(255,122,0,${.7*a})`,e.lineWidth=1.5,e.stroke(),B(e,`EMERGENCY`,n,u+r*.12,r*.34,d?`#000`:`rgba(255,140,60,${a})`,{align:`center`,base:`middle`,cond:.62})}}function it(e,t,n,r,i,a,o){e.save(),e.beginPath(),e.rect(t,n,r,i),e.clip(),e.fillStyle=a;for(let a=-i*2+o%(i*2);a<r+i;a+=i*2)e.beginPath(),e.moveTo(t+a,n+i),e.lineTo(t+a+i,n),e.lineTo(t+a+i*2,n),e.lineTo(t+a+i,n+i),e.fill();e.restore()}var at=[.56,.42],ot=(e,t)=>t-e*.45>.78;function st(e,t){let n=Math.exp(-((e-.2)**2+(t-.3)**2)/.012),r=Math.exp(-((e-at[0])**2+(t-at[1])**2)/.05);return .55+.22*Math.sin(e*9.1+t*3.7)*Math.cos(t*7.3-e*2.1)+.12*Math.sin(e*23+t*17)*Math.sin(t*19)-.5*n-.35*r-.6*Math.max(0,t-e*.45-.62)}function ct(e,t){let n=Object.assign(document.createElement(`canvas`),{width:e,height:t}),r=n.getContext(`2d`),i=r.createImageData(e,t),a=i.data;for(let n=0;n<t;n++)for(let r=0;r<e;r++){let i=r/e,o=n/t,s=(n*e+r)*4,c=st(i,o),l=0,u=0,d=0;if(ot(i,o))n%3==0&&([l,u,d]=[20,60,120]);else if(Math.exp(-((i-.2)**2+(o-.3)**2)/.012)>.55)(r+n)%4==0&&([l,u,d]=[30,90,150]);else{let e=c*11%1;(e<.07||e>.96)&&([l,u,d]=c>.6?[255,122,0]:[200,80,0])}a[s]=l,a[s+1]=u,a[s+2]=d,a[s+3]=255}r.putImageData(i,0,0),r.fillStyle=`rgba(64,255,112,.75)`;let o=at[0]*e,s=at[1]*t;for(let e=-12;e<=12;e++)for(let t=-8;t<=8;t++){let n=Math.hypot(e/12,t/8);n>1||Math.sin(e*12.9898+t*78.233)*43758.5453%1>.75-n*.5||r.fillRect(o+e*7,s+t*7,4,4)}return r.strokeStyle=`rgba(64,255,112,.5)`,r.strokeRect(o-91,s-63,182,126),n}function lt(e){let t=1,n=()=>(!e.style.scale&&e.offsetWidth&&(t=e.getBoundingClientRect().width/(e.offsetWidth/4)),t),r=[`.s-magi`,`.s-main`,`.s-sync`].map(t=>e.querySelector(t)),i=r.map(e=>e.querySelector(`canvas`)),a={red:[1,.12,.05],amber:[1,.55,.08],green:[.25,1,.35],cyan:[.2,.85,1],blue:[.2,.4,1],white:[1,.92,.8]},o=!1,s=function*(){if(o)for(let e of i)yield{at:e};for(let t of e.querySelectorAll(`[on][color], [d-readout][color]`))(!t.hasAttribute(`d-readout`)||t.textContent)&&(yield{at:t,color:a[t.getAttribute(`color`)]??a.amber,strength:.6})},c=e.querySelector(`.s-steps`),l=T({scale:n,smoke:6,steam:.9,rise:.5,zIndex:2,shine:s,shineGain:1.4,floor:()=>c.getBoundingClientRect().top}),u=()=>[innerWidth/n(),innerHeight/n()],d=null,f=null,p=new Map,m={at:-1/0,k:0,color:[1,1,1],where:r[1]},h={at:-1/0,k:0},g={none:[.36,.35,.34],alert:[.42,.07,.05],blackout:[.04,.04,.045]};return{blow(e,t){let[n]=u();d??=l.plume({at:[innerWidth/2,0],size:[n,n*.55],anchor:[.5,0],cells:220});for(let t=0;t<Math.round(2+e*5);t++)d.puff({at:[innerWidth*(.05+Math.random()*.9),2],radius:12+e*30,rate:.2+e*.45,steam:.5,jet:[(Math.random()-.5)*60,260+e*380],grip:.5,color:[.6,.55,.48]},.25+e*.5);t&&e>.55&&l.sparks(t,Math.round(10+e*40),{speed:900+e*900,spread:160}),m={at:performance.now(),k:e*1.5,color:[1,.85,.7],where:t??r[1]},h={at:performance.now(),k:Math.max(e,h.k*Math.exp(-(performance.now()-h.at)/4e3))}},broke(e,t){if(p.has(e))return;l.sparks(t,30,{speed:1300,spread:200});let n=l.plume({at:t,size:[220,560],anchor:[.5,.9],cells:128});n.puff({at:t,radius:16,rate:14,heat:4,color:[.35,.32,.3],blast:160},.3),p.set(e,{plume:n,source:n.add({at:t,radius:12,rate:8,heat:.5,jet:[0,-40],color:[.85,.83,.8]})})},burn(e){for(let{source:t}of p.values())t.set(e?{heat:2.6,rate:10,radius:12}:{heat:.5,rate:8,radius:12})},launch(e){let[t]=u();f??=l.plume({at:[innerWidth/2,innerHeight],size:[t,t*.3],anchor:[.5,1],cells:220});for(let t of[.06,.22,.4,.6,.78,.94])f.puff({at:[innerWidth*t,innerHeight-28*n()],radius:28,rate:3,steam:.85,heat:.25,jet:[0,-520],grip:.5,blast:120,color:[1,1,1]},Math.min(e,.8))},fire(){m={at:performance.now(),k:4,color:[.75,.85,1],where:r[1]},l.sparks(r[1],40,{speed:1800,toward:0,spread:120,size:.9})},light(e,t,n){o=t,l.ambient=g[e??`none`]??g.none;let r=performance.now(),i=m.k*Math.exp(-(r-m.at)/120);l.lights=i>.02?[{at:m.where,radius:600,color:m.color.map(e=>e*i)}]:[],l.haze=(n?.4:.3)+h.k*.3*Math.exp(-(r-h.at)/4e3)},clear(){for(let{plume:e}of p.values())e.remove();p.clear()},stop:()=>l.stop()}}function H(t){let n=e=>t.querySelector(e),r=e=>[...t.querySelectorAll(e)],i=matchMedia(`(prefers-reduced-motion: reduce)`).matches,a=t.closest(`[data-speed]`),o=Number(a?.dataset.speed)||1,s=!!t.closest(`[data-auto]`),c=performance.now(),l=()=>c+(performance.now()-c)*o,u=[`.s-magi`,`.s-main`,`.s-sync`].map(e=>n(`${e} canvas`)),[d,f,p]=u.map(e=>e.getContext(`2d`)),m=ct(de[0],de[1]-110),h=Object.fromEntries([...pe.map(([e])=>e),`external`,`internal`].map(e=>[e,n(`.t-${e}`)])),g=n(`.timer`),_=n(`.r-sync`),v=n(`.g-sync meter`),ee=n(`.b-field meter`),y=r(`.step`),te=r(`.steps .led`),b=r(`.key`),x=r(`.vote`),ne=n(`.order`),re=n(`.tune input`),S=n(`.r-heart`),ie=n(`.beat`),ae=Object.fromEntries(me.map(([e])=>[e,n(`.r-${e}`)])),oe=Object.fromEntries(O.map(([e])=>[e,n(`.p-led-${e}`)]));for(let e of[`900 20px ${Qe}`,`800 20px ${$e}`])document.fonts?.load(e,`NERV 発進`);let[se,ce]=r(`.guard > input`),le=n(`.go`),ue=n(`.plug`),C=n(`.track input`),w=Object.fromEntries(O.map(([e])=>[e,n(`.p-${e}`)])),T=r(`d-device`),fe=!i&&!!t.closest(`[data-alone]`),et=n(`.k-ack`),ot=n(`.k-test`),st=n(`.k-reset`),H={phase:fe?`off`:`standby`,since:l(),quiet:ve,cued:0,downAt:-1/0,auto:!0,acked:!1,testUntil:0,ejectAt:-1/0,cutAt:0,plugAt:0,alertAt:0,log:[],sync:0,field:0,done:0,was:Fe,room:null,roaring:!1,hushedAt:-1/0,reserve:0,blue:!1,voted:[`idle`,`idle`,`idle`],resolved:!1,jolt:{at:-1/0,k:0,dir:0},nextBlow:0,shaken:!1,scars:[],broken:new Set,hits:[],surgeAt:-1/0,riot:0,tick:0,deadlockAt:-1/0,ruledAt:-1/0,drift:0,tuned:!1,count:M,hold:!1,rifle:`none`,chargeAt:-1/0,firedAt:-1/0,landed:!1,bpm:0,beats:[],razed:new Set},U=e(be/o),ft=t.closest(`[data-air]`)?lt(t):null,W=(e,t=P)=>{H.phase!==`off`&&H.phase!==`boot`&&(H.log.push({at:l(),text:e,color:t}),H.log.length>12&&H.log.shift(),U.data(e.length))},G=e=>{let t=H.phase;H.phase=e,H.since=l(),e===`alert`&&(H.alertAt=H.since),e===`contact`&&U.contact(),U.magi(e===`magi`),e===`arm`&&U.confirm(),e===`launch`&&(U.launch(be/o),ft?.launch(be/o)),ft?.burn(e===`berserk`),e===`dead`&&U.powerDown(),e===`silenced`&&U.chime(),e===`standby`&&t!==`boot`&&U.reset(),U.score([`contact`,`alert`,`magi`].includes(e)?`brood`:[`sequence`,`arm`].includes(e)?`build`:e===`count`?`count`:e===`battle`?`fight`:`none`),U.room(e===`off`||e===`dead`||e===`berserk`?`off`:[`alert`,`magi`,`sequence`,`arm`,`count`,`launch`,`battle`].includes(e)?`tense`:`calm`)},pt=()=>+C.value+1,K=e=>(e-H.since)/1e3,q=e=>H.phase===`battle`&&H.cutAt?Math.max(0,Fe+H.reserve-(e-H.cutAt)/1e3*Pe):H.phase===`battle`?Fe:0,mt=()=>b.every(e=>e.checked),ht=()=>[`sequence`,`arm`,`count`,`launch`,`battle`,`dead`,`berserk`].includes(H.phase),gt=()=>H.drift-+re.value,J=()=>{let e=0;for(;e<y.length&&y[e].checked;)e++;return e},Y=!1,_t=(e,t=!1)=>{e.checked!==t&&(e.checked=t,Y=!0,e.dispatchEvent(new Event(`change`,{bubbles:!0})),Y=!1)},X=(e,t=R)=>H.phase!==`off`&&(W(e,t),U.confirm()),Z=(e,t=I)=>H.phase!==`off`&&(W(e,t),U.deny()),Q=()=>H.phase===`off`||H.phase===`boot`,vt=e=>{for(let t of[...y,...b,ue,ce,se,...e?[w.res,w.emg]:[]])_t(t);e&&(_t(w.umb,!0),_t(w.int,!0)),H.log=[],ft?.clear(),Object.assign(H,{acked:!1,cutAt:0,was:Fe,done:0,sync:0,quiet:_e,reserve:0,hushedAt:-1/0,blue:!1,resolved:!1,voted:[`idle`,`idle`,`idle`],nextBlow:0,scars:[],broken:new Set,hits:[],surgeAt:-1/0,riot:0,deadlockAt:-1/0,ruledAt:-1/0,drift:0,tuned:!1,count:M,hold:!1,rifle:`none`,chargeAt:-1/0,firedAt:-1/0,landed:!1,razed:new Set})},yt=u.map(e=>Object.assign(document.createElement(`canvas`),{width:e.width,height:e.height})),bt=()=>{H.cued=0,H.quiet=ve,G(`boot`),U.breaker()},xt=()=>{yt.forEach((e,t)=>e.getContext(`2d`).drawImage(u[t],0,0)),H.downAt=l(),H.auto=!1,vt(!1),U.klaxon(`off`),U.magi(!1),U.powerDown(),G(`off`)},St=()=>[`battle`,`dead`,`berserk`].includes(H.phase),Ct=e=>H.jolt.k*Math.exp(-(e-H.jolt.at)/o/qe),wt=(e,t=l(),n=!0)=>{if(H.jolt={at:t,k:Math.min(1,Math.max(e,Ct(t))),dir:Math.random()*Math.PI*2},ft?.blow(e,i?null:h[pe[Math.floor(Math.random()*pe.length)][0]]),n&&(U.impact(e),St())){if(e>.7&&H.phase===`battle`&&(H.drift=Math.max(-60,Math.min(60,H.drift+(Math.random()<.5?-1:1)*(10+Math.random()*16)))),e>.55){let e=We.filter(e=>!H.razed.has(e));e.length&&Math.random()<.6&&H.razed.add(e[Math.floor(Math.random()*e.length)])}if(H.hits.push(H.jolt.dir),e>.7&&H.scars.length<A){let e=[`dead`,`stuck`,`shift`][Math.floor(Math.random()*3)];H.scars.push({tube:Math.floor(Math.random()*3),y:.12+Math.random()*.8,h:e===`stuck`?0:.02+Math.random()*.07,kind:e,dx:(Math.random()<.5?-1:1)*(8+Math.random()*30)})}if(e>.6&&H.broken.size<ge){let e=Math.floor(Math.random()*pe.length);H.broken.add(e),ft?.broke(e,h[pe[e][0]])}}},Tt=e=>i?0:Math.max(Ct(e),H.phase===`launch`?Math.min(K(e)/be,1)**2*.3:0),Et=([e,t])=>e+Math.random()*(t-e),Dt=()=>H.cutAt+(Fe+H.reserve-60)/Pe*1e3,Ot=e=>{let t=H.phase;if(t===`alert`)return`slow`;if(t!==`battle`||!H.cutAt)return`off`;let n=e-H.cutAt<2500&&H.hushedAt<H.cutAt,r=q(e)<60&&H.hushedAt<Dt();return n||r?`fast`:`off`},kt=()=>{let e=H.phase;if(Q())return Z(``);if(e===`alert`&&!H.acked)return H.acked=!0,X(`ALARM ACKNOWLEDGED`,F),W(`MAGI: SORTIE PROPOSAL SUBMITTED`,F),G(`magi`);if(e===`battle`&&Ot(l())!==`off`)return H.hushedAt=l(),X(`KLAXON SILENCED BY OPERATOR`,F);if(e===`standby`||e===`silenced`)return X(`NO ALARM. CONDITION GREEN`);if(e===`contact`)return Z(`ALARM NOT YET RAISED: ANALYSING`,F);Z(`NOTHING TO ACKNOWLEDGE`,F)},At=()=>{H.phase!==`off`&&(H.testUntil=l()+1600,U.test(),W(`LAMP TEST`,z))},jt=()=>{if(Q())return Z(``);let e=![`standby`,`silenced`].includes(H.phase);vt(!0),G(`standby`),W(e?`SORTIE ABORTED. ALL STATIONS STAND DOWN`:`STATION RESET`,e?I:P)},Mt=e=>{Z(`CONTROL REFUSED: EVA-01 NOT RESPONDING`),setTimeout(()=>H.phase===`berserk`&&_t(e,!e.checked),220)},Nt=e=>{if(Y)return;let t=e.target;if(!t.classList.contains(`step`))return;if(H.phase===`berserk`)return Mt(t);let n=y.indexOf(t),[,r]=k[n];t.checked?H.phase===`sequence`?J()<=n&&Z(`SEQUENCE ERROR: ${k[J()][1]} FIRST`):Z(`${r}: NOT AUTHORISED`):H.phase===`sequence`&&n<H.done?Z(`${r}: REVERSED`,F):[`arm`,`count`,`launch`].includes(H.phase)&&Z(`${r}: CANNOT REVERSE NOW`,F)},Pt=e=>{if(Y)return;let t=e.target;if(!t.classList.contains(`key`))return;if(H.phase===`berserk`)return Mt(t);Gt(l());let n=b.indexOf(t)?`COMMAND`:`OPERATIONS`;if(!t.checked&&H.phase===`count`&&!H.hold)return Bt(`${n} KEY OUT`);if(!t.checked)return W(`${n} KEY: SAFE`,F);H.phase===`arm`?(W(`${n} KEY: ACCEPTED`,R),U.key()):Z(`${n} KEY: NOT REQUESTED`,F)},Ft=e=>{if(Y)return;let t=e.target;t===se&&!t.checked&&H.phase===`count`&&!H.hold?Bt(`GUARD CLOSED`):t===se?W(t.checked?`LAUNCH GUARD OPEN`:`LAUNCH GUARD CLOSED`,t.checked?F:P):t===ce&&W(t.checked?`PLUG EJECT: ARMED`:`PLUG EJECT: SAFE`,t.checked?I:P)},It=()=>{if(!se.checked)return;let e=l();if(Gt(e),H.phase===`arm`&&mt()&&!H.tuned)return Z(`LAUNCH INHIBITED: HARMONICS OUT OF PHASE`);if(H.phase===`arm`&&mt())return W(`LAUNCH COUNT: T-${M}`,z),H.count=M,H.hold=!1,G(`count`);if(H.phase===`arm`)return Z(`LAUNCH INHIBITED: TWO KEYS REQUIRED`);if(H.phase===`count`&&H.hold)return mt()?(H.hold=!1,U.count(Math.ceil(H.count)),X(`COUNT RESUMED AT T-${Math.ceil(H.count)}`,z)):Z(`COUNT HELD: TWO KEYS REQUIRED`);if(H.phase===`count`)return Z(`COUNT RUNNING`,F);if(H.phase===`battle`&&H.rifle===`ready`)H.rifle=`fired`,H.firedAt=e,W(`FIRE!`,z),U.fire(),ft?.fire(),wt(.75,e,!1);else{if(H.phase===`battle`&&H.rifle===`charging`)return Z(`RIFLE CHARGING: STAND BY`,F);if(H.phase===`launch`||St())return Z(`EVA-01 IS ALREADY OUT`,F);Z(`LAUNCH INHIBITED: NO SORTIE ORDER`)}},Lt=()=>{ue.checked&&ce.checked&&(H.ejectAt=l(),St()||H.phase===`launch`?Z(`EJECT SIGNAL REJECTED`):[`sequence`,`arm`,`count`].includes(H.phase)?Z(`PLUG EJECT INHIBITED: LAUNCH IN PROGRESS`,F):Z(`NO ENTRY PLUG TO EJECT`,F))},Rt=e=>{if(Y)return;let t=e.target,n=O.find(([e])=>t.classList.contains(`p-${e}`))?.[0];if(!n)return;let r=t.checked,i=l();if(n===`umb`&&r&&H.phase===`off`)return bt();if(n===`umb`&&!r&&[`boot`,`standby`,`silenced`].includes(H.phase))return xt();if(H.phase!==`off`){if(n===`umb`)return r&&H.cutAt?Z(`UMBILICAL BUS: NO CABLE CONNECTED`):r?X(`UMBILICAL BUS: CLOSED`,R):Z(`UMBILICAL BUS: OPEN. EXTERNAL POWER LOST`,F);if(n===`res`)return r?H.phase===`battle`&&H.cutAt&&!H.reserve?(H.reserve=90,H.was=q(i),X(`RESERVE CELLS ENGAGED: +01:30`,R)):H.reserve?Z(`RESERVE CELLS: ALREADY SPENT`,F):X(`RESERVE CELLS: STANDING BY`,F):W(`RESERVE CELLS: ISOLATED`,P);if(n===`int`)return r?X(`INTERNAL BATTERY: ON LINE`,R):W(`INTERNAL BATTERY: OFF LINE`,P);if(n===`emg`)return r&&(H.phase===`dead`||H.phase===`berserk`)?Z(`EMERGENCY POWER: NO RESPONSE FROM EVA-01`):r&&H.phase===`battle`&&H.rifle===`ordered`?Vt(i):!r&&H.rifle===`charging`?(H.rifle=`ordered`,U.charge(0),Z(`RIFLE CHARGE LOST: CITY POWER RELEASED`,F)):r?X(`EMERGENCY POWER: ALL CITY POWER TO NERV`,I):W(`EMERGENCY POWER: RELEASED`,P)}},zt=()=>{let e=pt();H.phase===`count`?Z(`TRACK ${e}: LOCKED FOR LAUNCH`,F):H.phase===`launch`||St()?Z(`TRACK ${e}: EVA-01 ALREADY DEPLOYED`,F):W(`LAUNCH TRACK ${e} SELECTED`,e===7?R:F)},Bt=e=>{H.hold=!0,U.hold(),Z(`LAUNCH HOLD: ${e} AT T-${Math.ceil(H.count)}`,F)},Vt=e=>{H.rifle=`charging`,H.chargeAt=e,U.charge(Ve/o),X(`ALL CITY POWER TO EVA-01`,I)},Ht=[`MELCHIOR`,`BALTHASAR`,`CASPER`],Ut=e=>{let t=x.indexOf(e.currentTarget),n=Ht[t],r=H.phase;if(Q())return Z(``);if(r===`berserk`)return Z(`${n}: SELF-DIAGNOSIS FAULT`);if(r!==`magi`)return X(`${n}: NORMAL. NO MOTION BEFORE IT`,L);if(!Number.isFinite(H.deadlockAt))return Z(`${n}: DELIBERATING`,F);if(Number.isFinite(H.ruledAt))return Z(`MAGI: MOTION ALREADY CARRIED`,F);if(t!==1)return Z(`${n}: VOTE ALREADY CAST`,F);H.ruledAt=l(),X(`BALTHASAR: OPERATOR RULING. VOTE CAST`,L)},Wt=()=>{ht()&&H.phase!==`dead`&&H.phase!==`berserk`&&U.trim(Math.min(Math.abs(gt())/40,1))};x.forEach(e=>e.addEventListener(`click`,Ut)),re.addEventListener(`input`,Wt),et.addEventListener(`click`,kt),ot.addEventListener(`click`,At),st.addEventListener(`click`,jt),le.addEventListener(`click`,It),ue.addEventListener(`change`,Lt),C.addEventListener(`change`,zt),t.addEventListener(`change`,Nt),t.addEventListener(`change`,Pt),t.addEventListener(`change`,Ft),t.addEventListener(`change`,Rt);let Gt=e=>{let t=K(e),n=Math.min(Math.max((e-H.tick)/1e3,0),.25);switch(H.tick=e,H.phase){case`off`:fe&&H.auto&&t>Me&&(_t(w.umb,!0),bt());break;case`boot`:{let e=[...we.map(([e])=>[e,()=>U.strike()]),...Array.from({length:8},(e,t)=>[Te+t*.09,()=>U.relay(t)]),[j.magi,()=>U.degauss(-.6)],[j.main,()=>U.degauss(0)],[j.sync,()=>U.degauss(.6)],...Ne.map(([e],t)=>[De+t*Oe,()=>U.data(e.length)]),...je.map((e,t)=>[e,()=>U.vote(t,!0)]),[ke,()=>U.ready()]];for(let[n,r]of e)n>H.cued&&n<=t&&r();H.cued=t,t>Ae&&(G(`standby`),W(`ALL STATIONS ON WATCH. CONDITION GREEN`,R));break}case`standby`:t>H.quiet&&(W(`UNIDENTIFIED OBJECT APPROACHING`,F),G(`contact`));break;case`contact`:t>ye&&(W(`BLOOD TYPE: BLUE. IT IS AN ANGEL`,I),W(`ALL PERSONNEL TO LEVEL ONE BATTLE STATIONS`,I),G(`alert`));break;case`magi`:if(t>Le[1]&&!Number.isFinite(H.deadlockAt)&&(H.deadlockAt=e,W(`MAGI: DEADLOCK 1 TO 1. BALTHASAR WITHHOLDS`,F),W(`OPERATOR RULING REQUIRED`,F),U.deadlock()),Number.isFinite(H.ruledAt)&&(e-H.ruledAt)/1e3>Re){W(`MAGI: SORTIE APPROVED 2 TO 1`,L),W(`EVA-01: BEGIN LAUNCH PREPARATIONS`,P),H.plugAt=e;let t=ze[0]+Math.random()*(ze[1]-ze[0]),n=+re.value;H.drift=n+(n+t>60||n-t>=-60&&Math.random()<.5?-t:t),H.tuned=!1,G(`sequence`)}break;case`sequence`:{let e=J();for(;H.done<e;)U.step(H.done),W(`${k[H.done++][1]}: COMPLETE`,R);e===y.length&&(W(`LAUNCH AUTHORISATION REQUIRED`,F),G(`arm`));break}case`count`:{if(H.hold)break;let e=Math.ceil(H.count);H.count=Math.max(0,H.count-n);let t=Math.ceil(H.count);t!==e&&t>0&&(U.count(t),W(`T-${t}`,z)),H.count<=0&&(W(`EVA-01, LAUNCH! TRACK ${pt()}`,z),G(`launch`));break}case`launch`:t>be&&(W(`EVA-01 HAS SURFACED`,P),W(`TARGET AT 300M AND CLOSING`,I),G(`battle`),wt(.7,e));break;case`battle`:{!H.cutAt&&t>xe&&(H.cutAt=e,W(`UMBILICAL CABLE SEVERED!`,I),U.cut(),wt(1,e),H.nextBlow=e+Et(Ye),W(`SWITCHING TO INTERNAL POWER`,I),w.res.checked&&(H.reserve=90,W(`RESERVE CELLS ENGAGED: +01:30`,R)));let n=q(e),r=H.was;H.was=n;let i=e=>r>e&&n<=e;H.cutAt&&H.rifle===`none`&&(e-H.cutAt)/1e3>2&&(H.rifle=`ordered`,W(`POSITRON RIFLE ON STATION`,F),w.emg.checked?Vt(e):W(`ROUTE ALL CITY POWER TO THE RIFLE`,F)),H.rifle===`charging`&&(e-H.chargeAt)/1e3>Ve&&(H.rifle=`ready`,W(`RIFLE CHARGED. FIRE WHEN READY`,R),U.charged()),H.rifle===`fired`&&!H.landed&&(e-H.firedAt)/1e3>.5&&(H.landed=!0,W(`DIRECT HIT. TARGET AT FIELD PIERCED`,R),wt(.5,e,!1)),n<60&&n>0&&Math.floor(r/6)!==Math.floor(n/6)&&U.tick(),H.rifle!==`fired`&&(i(260)&&W(`AT FIELD: NEUTRALISING`,F),i(210)&&(W(`TARGET AT FIELD NEUTRALISED`,R),H.rifle!==`none`&&W(`RIFLE OFF STATION`,P),H.rifle===`charging`&&U.charge(0),H.rifle=`fired`)),i(190)&&(W(`EVA-01 LEFT ARM DAMAGED`,I),wt(.95,e)),i(150)&&(W(`PILOT FEEDBACK: PAIN SIGNAL HIGH`,I),wt(.8,e)),i(110)&&(W(`PILOT VITALS CRITICAL`,I),wt(.8,e)),H.cutAt&&n>0&&e>H.nextBlow&&(wt(.45+Math.random()*.4,e),H.nextBlow=e+Et(Ye)),i(60)&&W(`INTERNAL POWER: ONE MINUTE`,I),H.cutAt&&n<=0&&(W(`ACTIVITY LIMIT. EVA-01 HAS STOPPED`,z),yt.forEach((e,t)=>e.getContext(`2d`).drawImage(u[t],0,0)),H.downAt=e,G(`dead`),wt(.9,e));break}case`dead`:t>Se&&(W(`EVA-01 REACTIVATED. IMPOSSIBLE!`,I),W(`SYNC RATIO OVER 400%`,I),G(`berserk`),H.surgeAt=e,H.testUntil=e+500*o,H.riot=e+1500,wt(1,e));break;case`berserk`:if(e>H.riot){let t=[...y,...b],n=t[Math.floor(Math.random()*t.length)];_t(n,!n.checked),H.riot=e+Et([300,900])}e>H.nextBlow&&(wt(.6+Math.random()*.4,e),H.nextBlow=e+Et(Xe)),t>Ce&&(W(`TARGET SILENCED`,R),W(`PATTERN BLUE: LOST`,R),G(`silenced`))}H.phase===`sequence`&&J()<H.done&&(H.done=J());let r=(e-H.plugAt)/1e3,i=H.phase,a=gt(),s=1-Math.min(Math.abs(a)/50,1)*.75,c=[`sequence`,`arm`,`count`,`launch`].includes(i),l=c?r>8.4?Ie*s:r>6?Ie*s*((r-6)/2.4):0:i===`battle`?((q(e)<190?33.6:Ie)+Math.sin(e/170)*1.2+Math.sin(e/53)*.4)*s:i===`berserk`?400:0;H.sync+=(l-H.sync)*(i===`berserk`?.08:i===`dead`?.3:.06);let d=Math.abs(a)<=Be;(c||i===`battle`)&&r>6&&d!==H.tuned&&(H.tuned=d,d?X(`HARMONICS: ALL NORMAL. SYNC ${(Ie*(1-Math.abs(a)/200)).toFixed(1)}%`,R):W(`HARMONICS: OUT OF PHASE`,F));let f=Math.max(0,Math.min(1,(q(e)-210)/50)),p=Math.max(0,1-((e-H.firedAt)/1e3-.5)/He);H.field=i===`battle`?Math.min(f,H.landed?p:1):+(i===`berserk`),Kt(e)},Kt=e=>{let t=H.phase,n=q(e),r=performance.now(),i=!ht()||t===`dead`||t===`berserk`?0:t===`count`?104+(M-H.count)*4:t===`launch`?138:t===`battle`?Math.min(176,112+H.hits.length*3+(n<150?18:0)+(n<110?16:0)):74+Math.min((e-H.plugAt)/1e3,12)*1.2;if(H.bpm=H.bpm<1?i:H.bpm+(i-H.bpm)*(i?.02:1),!H.bpm)return void(H.beats=[]);let a=H.beats.at(-1)??-1/0;r-a>6e4/H.bpm&&(H.beats.push(r-a<6e4/H.bpm+100?a+6e4/H.bpm:r),H.beats.length>12&&H.beats.shift(),H.bpm>108&&U.heart(Math.min((H.bpm-108)/60,1)))},qt=new Map,$=(e,t)=>{qt.get(e)!==t&&(qt.set(e,t),e.toggleAttribute(`on`,t))},Jt=e=>H.phase!==`off`&&(H.phase!==`boot`||we.some(([t,n])=>K(e)>=t&&K(e)<n)),Yt=e=>{if(H.rifle!==`charging`)return!1;let t=(e-H.chargeAt)/1e3/Ve;return t<1&&t*6%1<.05},Xt=e=>{let t=(e-H.jolt.at)/o,n=!i&&(H.jolt.k>.45&&t<300+H.jolt.k*600&&[0,1,3,6].includes(Math.floor(t/70))||Yt(e)),r=H.phase,a=n||r===`dead`?`blackout`:[`alert`,`magi`,`sequence`,`arm`,`count`,`launch`,`battle`,`berserk`].includes(r)?`alert`:Jt(e)?null:`blackout`;if(a!==H.room){H.room=a;for(let e of T)a?e.setAttribute(`lighting`,a):e.removeAttribute(`lighting`)}},Zt=e=>{let t=H.phase,n=K(e),r=t===`boot`,i=Math.floor(e/333)%2==0,a=Math.floor(e/900)%2==0,o=e<H.testUntil,s=e=>r&&n>Te+e*.09&&n<Te+e*.09+.55,c=o||r&&n>1.95&&n<2.8499999999999996,l=new Set(Ne.flatMap(([,e],t)=>r&&n>De+t*Oe?e:[]));pe.forEach(([e],t)=>$(h[e],c||s(t%8)||l.has(e))),$(h.external,r),$(h.internal,c);for(let e of[et,ot,st,le])$(e,c);$(oe.umb,c||(t===`off`?w.umb.checked||a:w.umb.checked)),$(oe.int,c||w.int.checked),$(oe.res,c||r&&w.res.checked),$(oe.emg,c||r&&w.emg.checked&&i),te.forEach(e=>$(e,c)),x.forEach((e,t)=>{let a=r&&n>=je[t],o=a?`cyan`:`amber`;e.getAttribute(`color`)!==o&&e.setAttribute(`color`,o),$(e,c||a||r&&n>j.magi+.5&&i)});let u=Math.round(Math.min(Math.max((n-2.9)/3,0),1)*100),d=c?{range:`8888`,atf:`888`,lcl:`88.8`,power:`888`}:{range:``,atf:``,lcl:``,power:r&&n>2.9?String(u):``};for(let[e,t]of Object.entries(ae))t.textContent!==d[e]&&(t.textContent=d[e]);let f=c?`88:88:88`:r&&n>Te?`--:--:--`:``;g.textContent!==f&&(g.textContent=f);let p=c?`888.8`:r&&n>j.sync?`0.0`:``;_.textContent!==p&&(_.textContent=p),v.value!==0&&(v.value=0),ee.value!==+!!c&&(ee.value=+!!c),$(ie,c);let m=c?`888`:``;S.textContent!==m&&(S.textContent=m),en(e,c),U.klaxon(`off`),Xt(e)},Qt=e=>{if(Q())return Zt(e);let t=H.phase,n=K(e),r=i||Math.floor(e/333)%2==0,a=i||Math.floor(e/600)%2==0,s=e<H.testUntil,c=t===`battle`&&!!H.cutAt||t===`dead`||t===`berserk`,l=[`alert`,`magi`,`sequence`,`arm`,`count`,`launch`,`battle`,`dead`,`berserk`].includes(t),u=ht(),d=(e-H.plugAt)/1e3,f=q(e),p={emergency:l&&(t!==`alert`||r),city:l&&t!==`alert`?!0:t===`alert`&&a,shelter:l,seal:t===`battle`||t===`dead`||t===`berserk`,n2:t===`battle`&&f<230&&f>190&&a,comms:t===`dead`||t===`berserk`?r:!0,mains:!0,cage:![`launch`,`battle`,`dead`,`berserk`,`arm`,`count`].includes(t)&&!(t===`sequence`&&J()>=4),restraint:![`launch`,`battle`,`dead`,`berserk`,`arm`,`count`].includes(t)&&!(t===`sequence`&&J()>=2),plug:u,lcl:u&&d>2.4&&(d>4.8||r),a10:u&&d>6&&t!==`dead`&&(t!==`berserk`||r),damage:t===`battle`&&f<190,nocontrol:t===`berserk`||t===`dead`&&r,track:t===`arm`||t===`count`||t===`launch`,surface:t===`battle`||t===`dead`||t===`berserk`,battery:t===`battle`&&f<60&&r,weapon:t===`battle`&&!!H.cutAt&&f>190,retrieve:t===`silenced`&&a,blue:t===`contact`&&n>2.5&&r||l&&(t!==`alert`||r),field:t===`battle`&&H.field>0||t===`berserk`&&r,magi:t===`magi`&&r,launch:t===`arm`&&mt()&&H.tuned&&a||t===`count`&&(!H.hold||r),liftoff:t===`launch`&&n>1.4,umbilical:c&&t===`battle`&&r||t===`dead`||t===`berserk`,limit:t===`berserk`,vitals:t===`battle`&&q(e)<110&&r,eject:e-H.ejectAt<3e3&&r,berserk:t===`berserk`&&r,silenced:t===`silenced`,external:!c,internal:t===`battle`&&!!H.cutAt&&(q(e)>60||r)||t===`berserk`&&r};if(t===`dead`)for(let e of Object.keys(p))p[e]=e===`battery`&&r;let m=i?0:Ct(e),b=Math.floor(e/o/60),ne=(e,t)=>Math.abs(Math.sin(e*12.9898+t*78.233)*43758.5453)%1,re=e=>m>.2&&ne(e,b)<m*.7||!i&&H.broken.has(e)&&ne(e,Math.floor(b/2))<.55,ce=t===`berserk`&&!i,ue=Math.floor(e/o/90),C=Math.floor(e/o/1400)%2==0,T=e=>C?e%8==ue%8||e%8==(ue+4)%8:Math.floor(e/8)===ue%3;Object.entries(h).forEach(([e,t],n)=>$(t,s||(ce&&n<pe.length?T(n):!!p[e]&&!re(n)))),U.klaxon(Ot(e)),t===`battle`&&U.score(`fight`,Math.min(1,(H.cutAt?1-f/(Fe+H.reserve):0)*.8+H.hits.length*.03)),t===`contact`&&n>2.5&&!H.blue&&(H.blue=!0,U.pattern()),vn(e).forEach((e,t)=>{e!==H.voted[t]&&(e===`yes`||e===`no`)&&U.vote(t,e===`yes`),H.voted[t]=e}),t===`magi`&&Number.isFinite(H.ruledAt)&&!H.resolved&&(H.resolved=!0,U.resolve()),t===`berserk`!==H.roaring&&U.roar(H.roaring=t===`berserk`),Xt(e),$(et,t===`alert`&&!H.acked&&r||Ot(e)!==`off`&&t===`battle`&&r||s),$(ot,s),$(st,t===`silenced`&&a||s),$(le,s||se.checked&&(t===`arm`&&mt()&&H.tuned&&r||t===`count`&&(!H.hold||r)||t===`battle`&&H.rifle===`ready`&&r));let E=t===`dead`;$(oe.umb,s||w.umb.checked&&!c),$(oe.int,s||w.int.checked&&!E||c&&t===`battle`&&r);let de=t===`battle`&&!!H.cutAt&&!H.reserve&&!w.res.checked;$(oe.res,s||!E&&w.res.checked&&(!H.reserve||t===`battle`)||de&&r),$(oe.emg,s||!E&&w.emg.checked&&r);let D=J();te.forEach((e,n)=>{let i=t===`sequence`&&n===D&&!y[n].checked,o=n<D?`green`:i?`amber`:`red`;e.getAttribute(`color`)!==o&&e.setAttribute(`color`,o),$(e,s||!E&&(n<D&&y[n].checked||y[n].checked&&n>=D&&r||i&&a))}),vn(e).forEach((t,n)=>{let i=t===`yes`?`cyan`:t===`think`||t===`hold`?`amber`:`red`;x[n].getAttribute(`color`)!==i&&x[n].setAttribute(`color`,i),$(x[n],s||t===`yes`||t===`no`||t===`think`&&r||t===`error`&&r||t===`hold`&&(r||Math.floor(e/111)%3==0))});let fe=t===`contact`?9800-n/ye*6600:[`alert`,`magi`,`sequence`,`arm`,`count`].includes(t)?Math.max(800,3200-(e-H.alertAt)/1e3*45):t===`launch`?600:t===`battle`?H.field*300:-1,me={range:s?`8888`:fe<0?t===`berserk`?`0`:``:String(Math.round(fe)),atf:s?`888`:t===`battle`?String(Math.round(H.field*100)):t===`berserk`?r?`Err`:``:t===`contact`||[`alert`,`magi`,`sequence`,`arm`,`count`,`launch`].includes(t)?`100`:``,lcl:s?`88.8`:u&&d>2.4&&t!==`dead`?t===`berserk`?(41+Math.sin(e/90)).toFixed(1):(36.5+Math.sin(e/2e3)*.1).toFixed(1):``,power:s?`888`:c?t===`battle`?String(Math.ceil(f/(Fe+H.reserve)*100)):r?`0`:``:`100`};for(let[e,t]of Object.entries(ae))t.textContent!==me[e]&&(t.textContent=me[e]);let O=t===`battle`&&H.cutAt?dt(f):t===`dead`||t===`berserk`||t===`silenced`?t===`silenced`||r?`00:00:00`:``:s?`88:88:88`:`--:--:--`;g.textContent!==O&&(g.textContent=O);let k=H.sync<.05?`0.0`:Math.min(H.sync,999.9).toFixed(1);_.textContent!==k&&(_.textContent=k);let he=Math.round(H.sync*10)/10;v.value!==he&&(v.value=he);let A=Math.round(H.field*32)/32;ee.value!==A&&(ee.value=A);let ge=performance.now()-(H.beats.at(-1)??-1/0)<110;$(ie,s||!E&&H.bpm>0&&ge);let _e=s?`888`:t===`berserk`?r?`---`:``:H.bpm>1&&!E?String(Math.round(H.bpm)):``;S.textContent!==_e&&(S.textContent=_e),en(e,s)},$t={text:``,color:``},en=(e,t=!1)=>{let n=H.phase,r=K(e),a=q(e),o=i||Math.floor(e/333)%2==0,[s,c]=t?[`8888888888888888888888`,`amber`]:n===`off`?[``,`amber`]:n===`boot`?[r>Te?`SYSTEM START`:``,`amber`]:n===`standby`?[`CONDITION GREEN`,`green`]:n===`contact`?[`TRACK UNKNOWN OBJECT`,`amber`]:n===`alert`?[`LEVEL ONE BATTLE STATIONS`,`red`]:n===`magi`?Number.isFinite(H.deadlockAt)&&!Number.isFinite(H.ruledAt)?[`MAGI DEADLOCK: RULE ON BALTHASAR`,`red`]:[`PUT THE SORTIE TO MAGI`,`amber`]:n===`sequence`?[`PREPARE EVA-01 FOR LAUNCH`,`amber`]:n===`arm`?[H.tuned?`AUTHORISE THE LAUNCH`:`TRIM PILOT HARMONICS`,`amber`]:n===`count`?H.hold?[o?`HOLD  HOLD  HOLD`:``,`red`]:[`LAUNCH  T-${Math.ceil(H.count)}`,`amber`]:n===`launch`?[`EVA-01 LAUNCH!`,`amber`]:n===`battle`?H.rifle===`ordered`?[`ALL CITY POWER TO THE RIFLE`,`red`]:H.rifle===`charging`?[`CHARGING  ${Math.floor(Math.min((e-H.chargeAt)/1e3/Ve,1)*100)}%`,`amber`]:H.rifle===`ready`?[o?`FIRE!`:``,`red`]:H.cutAt&&a<60?[`ONE MINUTE OF POWER`,`red`]:[`ENGAGE THE TARGET`,`amber`]:n===`dead`?[o?`ACTIVITY LIMIT`:``,`red`]:n===`berserk`?[`NO CONTROL`,`red`]:[`TARGET SILENCED`,`green`];c!==$t.color&&ne.setAttribute(`color`,$t.color=c),s!==$t.text&&(s&&!$t.text.startsWith(s.slice(0,6))&&!s.startsWith($t.text.slice(0,6)||`~`)&&U.order(),ne.textContent=$t.text=s)},tn=document.createElement(`canvas`),nn=(e,t)=>{let{width:n,height:r}=e.canvas;if(t>=1)return;if(t<=0){e.fillStyle=`#000`,e.fillRect(0,0,n,r);return}tn.width=n,tn.height=r,tn.getContext(`2d`).drawImage(e.canvas,0,0),e.fillStyle=`#000`,e.fillRect(0,0,n,r);let i=Math.max(2,r*t*t),a=(r-i)/2;e.drawImage(tn,0,0,n,r,0,a,n,i),e.globalCompositeOperation=`lighter`,e.fillStyle=`rgba(255,240,220,${(1-t)*.9})`,e.fillRect(0,a-1,n,i+2),e.globalCompositeOperation=`source-over`},rn=(e,t,n)=>{let{width:r,height:i}=e.canvas,a=(n-H.downAt)/700;if(e.fillStyle=`#000`,e.fillRect(0,0,r,i),a>=1||a<0)return;if(a<.35){let n=Math.max(2,i*(1-a/.35)**2);e.drawImage(t,0,0,r,i,0,(i-n)/2,r,n);return}let o=(a-.35)/.65,s=Math.max(3,r*(1-o/.5));e.fillStyle=`rgba(255,240,220,${o<.5?.9:.9*(1-(o-.5)/.5)})`,e.fillRect((r-s)/2,i/2-1.5,s,3)},an=(e,t,n)=>{let{width:r,height:a}=e.canvas;for(let s of H.scars){if(s.tube!==t)continue;let c=Math.round(s.y*a),l=Math.max(2,Math.round(s.h*a));if(s.kind===`dead`)e.fillStyle=`rgba(0,0,0,.88)`,e.fillRect(0,c,r,l);else if(s.kind===`stuck`)e.fillStyle=`rgba(255,236,210,${i?.6:.45+.35*Math.abs(Math.sin(n/o/47+s.dx))})`,e.fillRect(0,c,r,2);else{let t=i?0:Math.sin(n/o/61+s.y*40)*3;e.drawImage(e.canvas,0,c,r,l,s.dx+t,c,r,l)}}},on=(e,t)=>{let[n,r]=de,i=K(t);if(e.fillStyle=`#000`,e.fillRect(0,0,n,r),i>=ke){let t=e=>Math.min(Math.max((i-e)/.9,0),1);B(e,`NERV`,n/2,r/2+18,124,`rgba(255,122,0,${t(ke)})`,{align:`center`,cond:.9}),V(e,`GOD'S IN HIS HEAVEN.  ALL'S RIGHT WITH THE WORLD.`,n/2,r/2+52,12,`rgba(255,122,0,${.8*t(10.4)})`,`center`);return}cn(e,n,`第一発令所 / SYSTEM START`,P);let a=-1;Ne.forEach(([t],n)=>{let r=De+n*Oe;if(i<r)return;a=n;let o=62+n*19,s=t.slice(0,Math.floor((i-r)*90)),[,c,l]=t.match(/^(.*\. )(\S.*)$/)??[];s.length===t.length&&c&&l?B(e,l,N+V(e,c,N,o,13,P),o,13,R,{font:tt,weight:`normal`,cond:1}):V(e,s,N,o,13,n?P:z)}),Math.floor(t/400)%2&&(e.fillStyle=P,e.fillRect(N,66+a*19+6,8,13))},sn=(e,t)=>{let[n,r]=E,i=K(t),a=je.filter(e=>i>=e).length;e.fillStyle=`#000`,e.fillRect(0,0,n,r),V(e,`MAGI SYSTEM`,N,26,11,`rgba(255,122,0,.75)`),V(e,a===3?`ALL ONLINE`:`BOOT SEQUENCE`,n-N,26,11,a===3?L:`rgba(255,122,0,.75)`,`right`),B(e,`MAGI`,n/2,r/2-2,30,P,{align:`center`,cond:.9});let o=(t,n,r,a,o,s)=>{let c=j.magi+.5,l=Math.min(Math.max((i-c)/(je[n]-c),0),1);if(e.strokeStyle=l>=1?L:P,e.lineWidth=2,e.strokeRect(r,a,o,s),V(e,t,r+4,a-6,12,P),l>=1)return void B(e,`ONLINE`,r+o/2,a+s/2+9,26,L,{align:`center`,cond:.75});e.fillStyle=`rgba(255,122,0,.85)`,e.fillRect(r+12,a+s/2-8,(o-24)*l,10),e.lineWidth=1,e.strokeRect(r+12,a+s/2-8,o-24,10),V(e,`BOOT ${String(Math.floor(l*100)).padStart(3,` `)}%`,r+o/2,a+s-10,11,P,`center`)};o(`CASPER·3`,2,n/2-70,40,140,68),o(`BALTHASAR·2`,1,N,r/2+16,140,68),o(`MELCHIOR·1`,0,n-N-140,r/2+16,140,68),V(e,`SELF-DIAGNOSIS ${a}/3`,N,r-N,12,`rgba(255,122,0,.75)`)},cn=(e,t,n,r=P)=>{e.fillStyle=r,e.fillRect(0,0,t,3),B(e,`NERV`,N,26,22,r,{cond:.9}),B(e,n,78,26,16,r,{cond:.72}),e.fillRect(0,34,t,1)},ln=(e,t,n,r)=>{let a=H.phase,o=i||Math.floor(r/500)%2==0,s=a===`alert`?`ACKNOWLEDGE  ▶  ACK`:a===`sequence`?`THROW ${k[J()]?.[0].toUpperCase()??``}  ▶  SWITCH ${J()+1} OF 5`:a===`magi`?Number.isFinite(H.deadlockAt)&&!Number.isFinite(H.ruledAt)?`DEADLOCK  ▶  RULE ON BALTHASAR`:``:a===`arm`?H.tuned?mt()?se.checked?`LAUNCH`:`LIFT THE GUARD  ▶  LAUNCH`:`TURN BOTH KEYS  ▶  OPS  CMD`:`TRIM THE HARMONICS  ▶  SYNC TRIM`:a===`count`&&H.hold?mt()&&se.checked?`HOLD  ▶  LAUNCH TO RESUME`:`HOLD  ▶  KEYS AND GUARD, THEN LAUNCH`:a===`battle`&&H.rifle===`ordered`?`CITY POWER TO THE RIFLE  ▶  EMERGENCY`:a===`battle`&&H.rifle===`ready`?se.checked?`FIRE  ▶  LAUNCH`:`LIFT THE GUARD  ▶  FIRE`:a===`battle`&&H.cutAt&&!H.reserve?`RESERVE CELLS  ▶  THROW RESERVE`:a===`battle`&&Ot(r)!==`off`?`SILENCE KLAXON  ▶  ACK`:a===`silenced`?`STAND DOWN  ▶  RESET`:``;return s?(e.fillStyle=`rgba(255,122,0,.16)`,e.fillRect(0,n-N-30,t,30),o&&B(e,s,t/2,n-N-9,19,F,{align:`center`,cond:.75}),!0):!1},un=(e,t,n,r,a)=>{H.log.slice(-r).forEach((r,o,s)=>{a-r.at<900&&!i&&Math.floor(a/110)%2||V(e,`> ${r.text}`,t,n-(s.length-1-o)*15,12,r.color)})},dn=()=>{let e=(pt()-1)/9*Math.PI*2;return[at[0]+.02+Math.cos(e)*.07,at[1]-.02+Math.sin(e)*.1]},fn=e=>{let t=H.phase,n=K(e),r=t===`contact`?Math.min(n/ye,1)*.55:t===`alert`||t===`magi`?.55+Math.min(n/20,1)*.2:t===`standby`?-1:.85,i=.04+(at[0]+.08-.04)*r,a=.98+(at[1]+.06-.98)*r;if(t!==`battle`)return[i,a];let[o,s]=dn(),c=q(e)>230?.13:.06,l=e/2600,u=Math.min(n/2,1);return[i+(o+Math.cos(l)*c-i)*u,a+(s+Math.sin(l)*c*1.3-a)*u]},pn=(e,t,n,r,a)=>{let o=36+n;e.strokeStyle=`rgba(255,122,0,.13)`,e.lineWidth=1,e.beginPath();for(let r=64;r<t;r+=64)e.rect(r+.5,36,0,n);for(let n=84;n<o;n+=48)e.rect(0,n+.5,t,0);e.stroke(),e.strokeStyle=a,e.beginPath();for(let n=0;n<t;n+=16)e.rect(n+.5,36,0,n%64?3:7);for(let t=36;t<o;t+=12)e.rect(12,t+.5,t%48==36?7:3,0);e.stroke();for(let n=64,r=1;n<t;n+=64,r++)V(e,String(r).padStart(2,`0`),n+3,50,9,`rgba(255,122,0,.6)`);for(let t=84,n=0;t<o;t+=48,n++)V(e,`ABCDEF`[n]??``,22,t-3,9,`rgba(255,122,0,.6)`);let s=t-N+6;e.strokeStyle=a,e.lineWidth=2,e.beginPath();for(let[t,n,r,i]of[[12,40,1,1],[s,40,-1,1],[12,o-4,1,-1],[s,o-4,-1,-1]])e.moveTo(t,n+i*14),e.lineTo(t,n),e.lineTo(t+r*14,n);e.stroke(),e.lineWidth=1;let c=(at[0]+.02)*t,l=36+at[1]*n,u=i?-.6:r/900%(Math.PI*2);e.save(),e.beginPath(),e.rect(0,36,t,n),e.clip();for(let t=0;t<18;t++)e.fillStyle=`rgba(64,255,112,${.05*(1-t/18)})`,e.beginPath(),e.moveTo(c,l),e.arc(c,l,150,u-(t+1)*.035,u-t*.035),e.fill();e.strokeStyle=`rgba(64,255,112,.7)`,e.beginPath(),e.moveTo(c,l),e.lineTo(c+Math.cos(u)*150,l+Math.sin(u)*150),e.stroke(),e.strokeStyle=`rgba(64,255,112,.25)`;for(let t of[50,100,150])e.beginPath(),e.arc(c,l,t,0,Math.PI*2),e.stroke();e.restore();let d=Math.floor(r/140);for(let n=0;n<4;n++){let r=d-n,i=(r*2654435761>>>0).toString(16).toUpperCase().padStart(8,`0`);V(e,`${(r&4095).toString(16).toUpperCase().padStart(3,`0`)}  ${i.slice(0,4)} ${i.slice(4)}`,t-N,o+18+n*13,10,`rgba(255,122,0,${.55-n*.12})`,`right`)}},mn=(e,t)=>{if(H.phase===`boot`)return on(e,t),nn(e,(K(t)-j.main)/Ee);let[n,r]=de,a=H.phase,s=K(t),c=m.height;if(e.fillStyle=`#000`,e.fillRect(0,0,n,r),a===`dead`){let a=(t-H.downAt)/o;if(a<1100)return rn(e,yt[1],H.downAt+Math.min(a,700)*o);e.globalAlpha=Math.min((a-1100)/400,1)*(i||Math.floor(t/o/700)%4?1:.6),B(e,`活動限界`,n/2,r/2,54,`rgba(255,42,26,.8)`,{align:`center`,font:$e,cond:.9}),V(e,`ACTIVITY LIMIT  ·  SIGNAL LOST`,n/2,r/2+34,13,`rgba(255,42,26,.6)`,`center`),V(e,`EMERGENCY CELLS  ·  TACTICAL ONLY`,n/2,r-N,11,`rgba(255,42,26,.45)`,`center`),e.globalAlpha=1;return}if(a===`berserk`)return _n(e,n,r,t,s);if(a===`launch`)return hn(e,n,r,t,s);if(a===`count`)return gn(e,n,r,t);cn(e,n,`第一発令所 / TACTICAL`,a===`standby`||a===`silenced`?P:I),B(e,new Date().toLocaleTimeString(`en-GB`,{hour12:!1}),n-N,26,18,P,{align:`right`,font:tt,weight:`normal`,cond:1}),e.globalAlpha=a===`alert`?.45:a===`sequence`||a===`arm`?.35:.9,e.drawImage(m,0,36),e.globalAlpha=1,pn(e,n,c,t,a===`standby`||a===`silenced`?P:I);let[l,u]=fn(t);if(l>0&&a!==`silenced`){let r=l*n,i=36+u*c,o=10+t/25%30;e.strokeStyle=I,e.lineWidth=1,a!==`battle`&&(e.setLineDash([4,4]),e.beginPath(),e.moveTo(.04*n,36+.98*c),e.lineTo(r,i),e.stroke(),e.setLineDash([])),e.strokeStyle=`rgba(255,42,26,${1-o/40})`,e.beginPath(),e.arc(r,i,o,0,Math.PI*2),e.stroke(),e.fillStyle=I,e.beginPath(),e.moveTo(r,i-7),e.lineTo(r+7,i),e.lineTo(r,i+7),e.lineTo(r-7,i),e.fill(),a===`battle`&&H.field>0&&(e.strokeStyle=F,nt(e,r,i,22+H.field*10),e.stroke());let d=a!==`contact`||s>2.5;V(e,d?`ANGEL`:`UNKNOWN`,r+12,i-8,12,d?I:F)}if(a===`battle`){let[r,a]=dn(),s=r*n,l=36+a*c,u=(t-H.jolt.at)/o,d=!i&&u<520;if(e.strokeStyle=`rgba(255,42,26,.7)`,e.lineWidth=1.5,e.beginPath(),H.hits.forEach(t=>{let n=s+Math.cos(t)*15,r=l+Math.sin(t)*15;e.moveTo(n-3,r-3),e.lineTo(n+3,r+3),e.moveTo(n+3,r-3),e.lineTo(n-3,r+3)}),e.stroke(),d){let r=1-u/520,[i,a]=fn(t);e.strokeStyle=`rgba(255,236,210,${r})`,e.lineWidth=1+r*3,e.beginPath(),e.moveTo(i*n,36+a*c),e.lineTo(s,l),e.stroke();for(let t of[0,14])e.strokeStyle=`rgba(255,42,26,${r})`,e.beginPath(),e.arc(s,l,8+t+(1-r)*46*H.jolt.k,0,Math.PI*2),e.stroke()}let f=(t-H.firedAt)/o;if(H.rifle===`fired`&&Number.isFinite(H.firedAt)&&f<1600){let r=1-f/1600,[i,a]=fn(t),o=i*n,u=36+a*c;for(let[t,n]of[[14,.15],[6,.4],[2,1]])e.strokeStyle=`rgba(255,250,240,${n*r})`,e.lineWidth=t*(.4+r),e.beginPath(),e.moveTo(s,l),e.lineTo(o,u),e.stroke();if(f>500)for(let t=0;t<6;t++){let n=30+(f-500)/14+t*4,i=t*1.05;e.strokeStyle=`rgba(255,179,0,${r})`,e.lineWidth=1.5,e.beginPath(),e.arc(o,u,n,i,i+.6),e.stroke()}}if(H.rifle===`charging`||H.rifle===`ready`){e.strokeStyle=`rgba(255,236,210,${.25+.5*(H.rifle===`ready`?1:Math.min((t-H.chargeAt)/1e3/Ve,1))})`,e.lineWidth=1,e.setLineDash([3,5]),e.lineDashOffset=-t/20,e.beginPath();for(let t=0;t<7;t++){let r=t/7*Math.PI*2+.4;e.moveTo((at[0]+Math.cos(r)*.3)*n,36+(at[1]+Math.sin(r)*.38)*c),e.lineTo(s,l)}e.stroke(),e.setLineDash([])}e.lineWidth=1,V(e,`TRACK ${pt()}`,s-12,l+31,10,Ze),e.fillStyle=d&&Math.floor(u/70)%2==0?z:Ze,e.fillRect(s-5,l-5,10,10),V(e,`EVA-01`,s-12,l+18,12,Ze),H.cutAt||(e.strokeStyle=Ze,e.beginPath(),e.moveTo(s,l),e.lineTo(s-40,l+30),e.stroke())}if(a===`contact`){let t=s>2.5;e.fillStyle=`rgba(0,0,0,.6)`,e.fillRect(0,44,n,46),B(e,t?`PATTERN BLUE`:`PATTERN ORANGE`,12,80,34,t?L:F,{cond:.72}),V(e,t?`WAVEFORM CONFIRMED`:`ANALYSING WAVEFORM`,n-12,74,12,t?L:F,`right`)}if(a===`alert`&&(it(e,0,40,n,18,I,t/20),e.fillStyle=`rgba(0,0,0,.75)`,e.fillRect(0,64,n,150),B(e,`EMERGENCY`,n/2,140,80,I,{align:`center`,cond:.66}),B(e,`パターン青  使徒です`,n/2,188,34,z,{align:`center`,font:$e,cond:.85}),V(e,`BLOOD TYPE: BLUE`,n/2,206,12,L,`center`),it(e,0,220,n,18,I,-t/20)),a===`magi`){e.fillStyle=`rgba(0,0,0,.7)`,e.fillRect(0,70,n,90),B(e,`MAGI SYSTEM`,n/2,116,40,L,{align:`center`,cond:.72});let r=Number.isFinite(H.ruledAt),i=Number.isFinite(H.deadlockAt);V(e,r?`RESOLUTION: SORTIE APPROVED 2 TO 1`:i?`RESOLUTION: DEADLOCK 1 TO 1`:`DELIBERATING${`.`.repeat(1+Math.floor(t/300)%3)}`,n/2,142,14,r?L:i?F:L,`center`)}if(a===`sequence`||a===`arm`){B(e,`EVA-01  発進準備`,14,66,26,P,{font:$e,cond:.85});let t=J();k.forEach(([,r],i)=>{let a=92+i*24,o=i<t;e.strokeStyle=o?R:`rgba(255,122,0,.6)`,e.strokeRect(14,a-13,14,14),o&&(e.fillStyle=R,e.fillRect(17,a-10,8,8)),V(e,r,38,a,13,o?R:i===t?F:`rgba(255,122,0,.55)`),V(e,o?`COMPLETE`:i===t?`STANDING BY`:``,n-14,a,13,o?R:F,`right`)}),a===`arm`&&b.forEach((t,r)=>{let i=226+r*22;V(e,`${r?`COMMAND`:`OPERATIONS`} KEY`,38,i,13,t.checked?R:F),V(e,t.checked?`ACCEPTED`:`WAITING`,n-14,i,13,t.checked?R:F,`right`)})}if(a===`battle`&&H.cutAt){let r=q(t);if(e.fillStyle=`rgba(0,0,0,.65)`,e.fillRect(n-186,44,176,62),V(e,`INTERNAL BATTERY`,n-98,62,11,I,`center`),H.rifle===`charging`||H.rifle===`ready`){let r=H.rifle===`ready`?1:Math.min((t-H.chargeAt)/1e3/Ve,1),i=H.rifle===`ready`&&Math.floor(t/250)%2;e.fillStyle=`rgba(0,0,0,.65)`,e.fillRect(n-186,110,176,40),V(e,H.rifle===`ready`?`POSITRON RIFLE  READY`:`POSITRON RIFLE  ${Math.floor(r*100)}%`,n-98,126,11,i?z:F,`center`),e.strokeStyle=F,e.strokeRect(n-176,134,156,8),e.fillStyle=i?z:F,e.fillRect(n-174,136,152*r,4)}B(e,dt(r),n-98,98,36,r<60&&Math.floor(t/333)%2?z:I,{align:`center`,font:tt,weight:`bold`,cond:.8}),t-H.cutAt<2500&&(i||Math.floor(t/250)%2)&&(e.fillStyle=`rgba(255,42,26,.85)`,e.fillRect(0,120,n,52),B(e,`UMBILICAL CABLE SEVERED`,n/2,158,38,`#000`,{align:`center`,cond:.7}))}if(a===`silenced`&&(e.fillStyle=`rgba(0,0,0,.7)`,e.fillRect(0,70,n,110),B(e,`TARGET SILENCED`,n/2,130,56,R,{align:`center`,cond:.68}),V(e,`PATTERN BLUE: LOST  ·  EVA-01: NO RESPONSE`,n/2,160,12,R,`center`)),a===`standby`){un(e,N,r-N-40,3,t),V(e,`CONDITION GREEN  ·  ALL SYSTEMS NOMINAL`,N,r-N-20,12,`rgba(255,122,0,.8)`),V(e,`EVA-01: CAGE 7  ·  ${w.umb.checked?`EXTERNAL`:`NO`} POWER  ·  TRACK ${pt()}`,N,r-N-4,12,`rgba(255,122,0,.6)`);return}let d=ln(e,n,r,t),f=r-N-(d?40:4);e.fillStyle=`rgba(0,0,0,.7)`,e.fillRect(0,f-45-14,n,63),un(e,N,f,4,t)},hn=(e,t,n,r,a)=>{let o=Math.min(a,2.6)**2*260;e.fillStyle=`#000`,e.fillRect(0,0,t,n),e.strokeStyle=P;for(let r of[t*.2,t*.8])e.fillStyle=`rgba(255,122,0,.25)`,e.fillRect(r-6,0,12,n);for(let r=0;r<40;r++){let i=20+r*97%9*((t-40)/8),s=(r*53+a*o)%(n+80)-40;e.fillStyle=r%3?`rgba(255,179,0,.8)`:`rgba(255,255,255,.9)`,e.fillRect(i,s,2,12+Math.min(o/8,70))}let s=Math.max(0,1200-a*a*70);cn(e,t,`EVA-01 / LAUNCH TRACK ${pt()}`,P),B(e,`発進`,t/2,n/2+40,140,a<.6||i||Math.floor(r/200)%2?z:I,{align:`center`,font:$e,cond:.95}),V(e,`DEPTH -${s.toFixed(0).padStart(4,`0`)} M`,N,n-N-20,14,F),V(e,`ACCEL ${Math.min(a*3.6,8.5).toFixed(1)} G`,N,n-N,14,F),a>1.4&&B(e,`LIFT OFF`,t-N,n-N,32,R,{align:`right`,cond:.7})},gn=(e,t,n,r)=>{let a=Math.ceil(H.count),o=H.count-Math.floor(H.count),s=i||Math.floor(r/333)%2==0;e.fillStyle=`#000`,e.fillRect(0,0,t,n),cn(e,t,`EVA-01 / LAUNCH TRACK ${pt()}`,H.hold?F:z),B(e,`発進まで`,N,66,24,P,{font:$e,cond:.85}),V(e,`T-${dt(H.count)}`,t-N,62,14,H.hold?F:z,`right`);let c=t/2,l=n/2+18;e.strokeStyle=`rgba(255,122,0,.25)`,e.lineWidth=2,e.beginPath(),e.arc(c,l,112,0,Math.PI*2),e.stroke(),H.hold||(e.strokeStyle=z,e.lineWidth=6,e.beginPath(),e.arc(c,l,112,-Math.PI/2,-Math.PI/2+o*Math.PI*2),e.stroke()),e.lineWidth=1,B(e,String(a),c,l+62,190,H.hold?s?F:`rgba(255,179,0,.3)`:z,{align:`center`,font:tt,weight:`bold`,cond:.9}),H.hold&&(e.fillStyle=`rgba(255,179,0,.9)`,e.fillRect(0,l-20,t,44),B(e,`LAUNCH HOLD`,c,l+14,38,`#000`,{align:`center`,cond:.7})),ln(e,t,n,r)},_n=(e,t,n,r,a)=>{e.fillStyle=`rgba(150,0,0,${i?1:.7+.3*(Math.floor(r/340)%2)})`,e.fillRect(0,0,t,n),rt(e,t,n,46,Math.floor(r/340),.5);let o=i?0:Math.sin(r/37)*6,s=i?0:Math.cos(r/29)*4;if(e.fillStyle=`rgba(0,0,0,.7)`,e.fillRect(0,n/2-116,t,236),B(e,`暴走`,t/2+o,n/2+50+s,170,a<.5?z:`#ff2a1a`,{align:`center`,font:$e,cond:1}),B(e,`EVA-01 REACTIVATED`,t/2,n/2+108,26,z,{align:`center`,cond:.7}),cn(e,t,`第一発令所 / TACTICAL`,z),!i)for(let i=0;i<4;i++){let a=Math.floor((r/7+i*97)%n),o=6+i*5%14;e.drawImage(e.canvas,0,a,t,o,(i%2?1:-1)*((r/3+i*31)%40),a,t,o)}V(e,`INTERNAL POWER 0%  ·  SIGNAL REFUSED  ·  CONTROL LOST`,t/2,n-N,12,z,`center`)},vn=e=>{let t=H.phase,n=K(e);if(t===`berserk`)return[`error`,`error`,`error`];if(t!==`magi`)return[`idle`,`idle`,`idle`];let r=(e,t)=>n<e?`think`:t;return[r(Le[0],`yes`),Number.isFinite(H.ruledAt)?`yes`:r(Le[1],`hold`),r(Le[2],`no`)]},yn=(e,t)=>{if(H.phase===`boot`)return sn(e,t),nn(e,(K(t)-j.magi)/Ee);let[n,r]=E,a=H.phase,s=K(t);if(a===`dead`)return rn(e,yt[0],H.downAt+Math.min((t-H.downAt)/o,700)*o);if(e.fillStyle=`#000`,e.fillRect(0,0,n,r),[`alert`,`sequence`,`arm`,`count`,`launch`,`battle`,`silenced`].includes(a))return bn(e,t);let[c,l,u]=vn(t),d=i||Math.floor(t/160)%2==0,f=(t,n,r,i,a,o)=>{e.fillStyle=n===`error`&&!d?`rgba(255,42,26,.2)`:n===`yes`?L:n===`no`||n===`error`?I:n===`hold`?d?F:`rgba(255,179,0,.3)`:n===`think`&&d?`rgba(255,122,0,.35)`:`rgba(255,122,0,.08)`,e.fillRect(r,i,a,o),e.strokeStyle=P,e.lineWidth=2,e.strokeRect(r,i,a,o);let s=n===`yes`?`承認`:n===`no`?`否定`:n===`think`?`審議中`:n===`hold`?`保留`:n===`error`?`ERROR`:`NORMAL`,c=n===`yes`||n===`no`||n===`error`||n===`hold`?`#000`:P;n===`error`?B(e,s,r+a/2,i+o/2+12,34,c,{align:`center`,cond:.7}):n===`idle`?V(e,s,r+a/2,i+o/2+5,13,`rgba(255,122,0,.7)`,`center`):B(e,s,r+a/2,i+o/2+16,44,c,{align:`center`,font:$e,cond:.9}),V(e,t,r+4,i-6,12,P)};V(e,`MAGI SYSTEM`,N,26,11,`rgba(255,122,0,.75)`),V(e,a===`magi`?`REQ ${Math.min(s*31,99).toFixed(0).padStart(2,`0`)}/99`:a===`alert`?`ON CALL`:`STANDBY`,n-N,26,11,`rgba(255,122,0,.75)`,`right`),e.strokeStyle=`rgba(255,122,0,.5)`,e.lineWidth=1,e.beginPath();for(let[t,r,i,a]of[[10,32,1,1],[n-N+8,32,-1,1]])e.moveTo(t,r+a*10),e.lineTo(t,r),e.lineTo(t+i*10,r);e.stroke(),B(e,`MAGI`,n/2,r/2-2,30,P,{align:`center`,cond:.9}),e.strokeStyle=`rgba(255,122,0,.6)`,e.lineWidth=1,e.beginPath(),e.moveTo(n/2,108),e.lineTo(n/2,r/2-28),e.moveTo(n/2-34,r/2-10),e.lineTo(124,r/2+16),e.moveTo(n/2+34,r/2-10),e.lineTo(n-124,r/2+16),e.stroke(),f(`CASPER·3`,u,n/2-70,40,140,68),f(`BALTHASAR·2`,l,N,r/2+16,140,68),f(`MELCHIOR·1`,c,n-N-140,r/2+16,140,68),V(e,`提訴`,N,r-N-16,13,P),V(e,a===`magi`?`SORTIE: EVA-01`:`--`,54,r-N-16,13,P),V(e,`決議`,N,r-N,13,P);let p=a===`magi`&&Number.isFinite(H.ruledAt),m=a===`magi`&&Number.isFinite(H.deadlockAt);p?B(e,`可決`,54,r-N+2,22,L,{font:$e,cond:.95}):m?B(e,`保留  DEADLOCK`,54,r-N+2,22,d?F:P,{font:$e,cond:.85}):V(e,a===`magi`?`...`:`--`,54,r-N,13,P),V(e,a===`berserk`?`SELF-DIAGNOSIS: FAULT`:`CODE 601`,n-N,r-N,12,a===`berserk`?I:`rgba(255,122,0,.6)`,`right`)},bn=(e,t)=>{let[n,r]=E,a=H.phase,o=(t-H.alertAt)/1e3,s=(n-36)/Ue,c=(e,t=1)=>Math.abs(Math.sin(e*12.9898*t+4.1)*43758.5453)%1,l=e=>e<=0?0:e>=1?1:e*e*(3-2*e),u=H.rifle===`charging`?Math.min((t-H.chargeAt)/1e3/Ve,1):[`ready`,`fired`].includes(H.rifle)&&a===`battle`?1:0;V(e,`TOKYO-3  INTERCEPT SYSTEM`,N,26,11,`rgba(255,122,0,.75)`),B(e,`迎撃態勢`,n-N,30,18,a===`alert`?I:P,{align:`right`,font:$e,cond:.9}),e.fillStyle=`rgba(255,122,0,.07)`,e.fillRect(0,160,n,r-150-10-52),e.strokeStyle=`rgba(255,122,0,.35)`,e.lineWidth=1,e.beginPath(),e.moveTo(n/2-34,r-56),e.lineTo(n/2,r-92),e.lineTo(n/2+34,r-56),e.stroke(),V(e,`NERV`,n/2,r-60,9,`rgba(255,122,0,.5)`,`center`),it(e,0,150,n,10,`rgba(255,122,0,.35)`,0);let d=0,f=0,p=0,m=Ue-We.length;for(let n=0,a=0,m=0;n<Ue;n++){let h=N+n*s+2,g=s-4,_=34+c(n)*74,v=We.includes(n),ee=Math.floor(n/(Ue/6)),y=u*6>ee;y||p++;let te=y?`rgba(255,122,0,.35)`:P;if(v){let r=l((o-7.5-m++*.35)/1.6);if(H.razed.has(n)){e.fillStyle=`rgba(255,42,26,.5)`,e.beginPath(),e.moveTo(h,150);for(let t=0;t<=4;t++)e.lineTo(h+g*t/4,144-c(n,t+2)*12);e.lineTo(h+g,150),e.fill(),!i&&Math.floor(t/90+n)%3&&(e.fillStyle=F,e.fillRect(h+c(n,t>>7)*g,142-c(n,(t>>7)+1)*14,2,2));continue}r>.98&&f++;let a=150-_*.8*r;e.strokeStyle=I,e.strokeRect(h+.5,a+.5,g-1,150-a),r>.9&&(e.fillStyle=I,e.fillRect(h+2,a-4,g-4,4),e.fillRect(h+g/2-1,a-12,2,8));continue}let b=l((o-.8-a*.28)/1.6);a++,b>.98&&d++;let x=_*(1-b);if(x>.5&&(e.strokeStyle=te,e.strokeRect(h+.5,150-x+.5,g-1,x),!y)){e.fillStyle=`rgba(255,179,0,.55)`;for(let t=150-x+4;t<147;t+=6)for(let r of[2,g-4])c(n*31+t)>.3&&e.fillRect(h+r,t,2,2)}if(b>0){let t=Math.min(_*b,r-60-150-10);e.strokeStyle=y?`rgba(255,122,0,.25)`:`rgba(255,122,0,.6)`,e.strokeRect(h+.5,160.5,g-1,t)}}if(H.rifle===`charging`){e.fillStyle=z;for(let r=0;r<5;r++)e.fillRect((t/2+r*80)%n,154,14,2)}let h=Math.round(p/Ue*100),g=r-N;V(e,`RETRACTED   ${String(d).padStart(2,`0`)}/${m}`,N,g-26,12,d===m?R:P),V(e,`ARMAMENT    ${f}/${We.length-H.razed.size}${H.razed.size?`  LOST ${H.razed.size}`:``}`,N,g-13,12,H.razed.size?I:f?R:P),V(e,`SHELTERS    ${o>3?`SEALED`:`OPEN`}`,N,g,12,o>3?R:F),V(e,`CITY POWER`,n-N,g-26,12,P,`right`),B(e,`${h}%`,n-N,g+2,26,h<50?I:P,{align:`right`,font:tt,weight:`bold`,cond:.85})},xn=(e,t)=>{let[n,r]=D,a=H.phase,s=(t-H.plugAt)/1e3,c=K(t);if(a===`dead`)return rn(e,yt[2],H.downAt+Math.min((t-H.downAt)/o,700)*o);e.fillStyle=`#000`,e.fillRect(0,0,n,r);let l=e=>`rgba(220,255,220,${e})`;e.strokeStyle=l(.18),e.lineWidth=1,e.beginPath();for(let t=0;t<=n;t+=32)e.rect(t,40,0,150);for(let t=40;t<=190;t+=30)e.rect(0,t,n,0);e.stroke(),V(e,`EVA-01  PILOT HARMONICS`,N,26,13,l(.9));let u=ht(),d=a===`boot`&&c<8.4,f=1-Math.min(Math.abs(gt())/40,1),p=a===`berserk`?-1:u||d?d?1:Math.min(Math.max(s-3.6,0)/6,1)*f:0;for(let r=0;r<3;r++){e.strokeStyle=l(.9-r*.2),e.lineWidth=2,e.beginPath();for(let i=0;i<=n;i+=2){let n=Math.sin(i/24+t/300)*22,o=Math.sin(i/(9+r*7)+t/(120+r*70)+r)*26,s=a===`berserk`?Math.sin(i*.9+t/17+r)*60*Math.min(c,1):0,l=d||u?1:.05,f=Math.min(190,Math.max(40,115+(n*p+o*(1-Math.abs(p))+s)*l));i?e.lineTo(i,f):e.moveTo(i,f)}e.stroke()}if(a===`berserk`?(e.fillStyle=i||Math.floor(t/340)%2?l(.9):l(.3),e.fillRect(0,196,n,34),B(e,`SYNC RATIO OVER 400%`,n/2,222,26,`#000`,{align:`center`,cond:.72})):(V(e,`SYNC RATIO  ${H.sync.toFixed(1).padStart(5,` `)} %`,N,210,14,l(.95)),V(e,u?`PLUG DEPTH  FIXED`:d?`SELF-TEST  ${Math.min(Math.floor((c-j.sync)/(8.4-j.sync)*100),99)}%`:`ENTRY PLUG  NOT INSERTED`,N,226,12,l(.6))),a===`boot`&&nn(e,(c-j.sync)/Ee),H.beats.length&&Sn(e,N,270,150,26,l),[`sequence`,`arm`,`count`,`launch`].includes(a)){let r=he.filter(([e])=>s>=e).map(([,e])=>[e,.5]);s>8.4&&r.push(H.tuned?[`HARMONICS: ALL NORMAL`,1]:[`HARMONICS: ${gt()>0?`+`:``}${Math.round(gt())}  TRIM`,i||Math.floor(t/300)%2?1:.3]);let a=r.slice(-3);a.forEach(([t,r],i)=>V(e,t,n-N,244+i*14,11,l(i===a.length-1?r:.5),`right`))}else a===`battle`&&!H.tuned?V(e,`HARMONICS: ${Math.round(gt())}  TRIM`,n-N,258,12,l(i||Math.floor(t/300)%2?1:.3),`right`):t-H.ejectAt<3e3&&V(e,a===`battle`||a===`berserk`?`PLUG EJECT: SIGNAL REJECTED`:`PLUG EJECT: NO PLUG`,n-N,258,12,l(1),`right`)},Sn=(e,t,n,r,i,a)=>{let o=performance.now(),s=2500,c=e=>e<0?0:e<90?Math.sin(e/90*Math.PI)*.12:e<120?0:e<135?-.15:e<155?1:e<175?-.3:e<300?0:e<460?Math.sin((e-300)/160*Math.PI)*.22:0;e.strokeStyle=a(.9),e.lineWidth=1.5,e.beginPath();for(let a=0;a<=r;a+=1){let l=o-s+a/r*s,u=0;for(let e of H.beats)u+=c(l-e);let d=n-u*i;a?e.lineTo(t+a,d):e.moveTo(t,d)}e.stroke(),V(e,`ECG`,t,n-i-2,9,a(.5))},Cn=new Set,wn=-1,Tn=0,En=e=>{e.checked||(e.checked=!0,e.dispatchEvent(new Event(`change`,{bubbles:!0})))},Dn=e=>{let t=H.phase,n=K(e);H.since!==wn&&(wn=H.since,Cn.clear());let r=(e,t,r)=>{t>n||Cn.has(e)||(Cn.add(e),r())};t===`alert`&&r(`ack`,1.6,()=>et.click()),t===`magi`&&r(`rule`,Le[1]+1.3,()=>x[1].click());let i=performance.now();if(ht()&&![`dead`,`berserk`].includes(t)&&(e-H.plugAt)/1e3>6.6&&Math.abs(gt())>1&&i>Tn&&(Tn=i+70,re.value=String(+re.value+Math.sign(gt())),re.dispatchEvent(new Event(`input`,{bubbles:!0}))),t===`sequence`&&y.forEach((e,t)=>r(`step ${t}`,.9+t*.55,()=>En(e))),t===`arm`&&(b.forEach((e,t)=>r(`key ${t}`,.7+t*.6,()=>En(e))),r(`guard`,2.2,()=>En(se)),r(`go`,H.tuned?3:1/0,()=>le.click())),t===`battle`&&H.cutAt){let t=(e-H.cutAt)/1e3;r(`hush`,t>1.4?0:1/0,()=>et.click()),r(`reserve`,t>3?0:1/0,()=>En(w.res)),r(`route`,H.rifle===`ordered`&&t>3.8?0:1/0,()=>En(w.emg)),r(`fire`,H.rifle===`ready`&&(e-H.chargeAt)/1e3>4.1000000000000005?0:1/0,()=>le.click())}t===`silenced`&&r(`reset`,5,()=>st.click())};fe||_t(w.umb,!0),G(H.phase);let On=0,kn=()=>{let e=l();if(Gt(e),s&&Dn(e),Qt(e),ft?.light(H.room,H.phase!==`off`&&H.phase!==`dead`,H.room===`alert`),H.phase===`off`)[f,d,p].forEach((t,n)=>rn(t,yt[n],e));else{mn(f,e),yn(d,e),xn(p,e),[d,f,p].forEach((t,n)=>{H.phase===`berserk`&&nn(t,(e-H.surgeAt)/o/260),an(t,n,e)});let t=i?0:Ct(e);if(t>.04)for(let e of[f,d,p])ut(e,t)}let n=Tt(e);if(n>.01||H.shaken){let r=(e-H.jolt.at)/o,a=i?0:Ct(e)*Math.cos(r/Je*Math.PI*2),s=(Math.random()-.5)*n*Ge*.35,c=(Math.random()-.5)*n*Ge*.35,l=Math.cos(H.jolt.dir)*a*Ge+s,u=Math.sin(H.jolt.dir)*a*Ge+c,d=i?0:H.jolt.k*Math.max(0,1-r/90),f=n>.01||d>.01;t.style.translate=f?`${l.toFixed(1)}px ${u.toFixed(1)}px`:``,t.style.rotate=f?`${(a*Ke*Math.sin(H.jolt.dir*3)).toFixed(2)}deg`:``,t.style.scale=f?(1+n*.06).toFixed(3):``,t.style.filter=f&&d>.01?`brightness(${(1+d*1.6).toFixed(2)}) saturate(${(1-d*.6).toFixed(2)})`:``,H.shaken=f}On=requestAnimationFrame(kn)};return On=requestAnimationFrame(kn),()=>{cancelAnimationFrame(On),Object.assign(t.style,{translate:``,rotate:``,scale:``,filter:``}),U.stop(),ft?.stop();for(let[e,t]of[[et,kt],[ot,At],[st,jt],[le,It]])e.removeEventListener(`click`,t);ue.removeEventListener(`change`,Lt),C.removeEventListener(`change`,zt),t.removeEventListener(`change`,Ft),t.removeEventListener(`change`,Rt),t.removeEventListener(`change`,Nt),t.removeEventListener(`change`,Pt),x.forEach(e=>e.removeEventListener(`click`,Ut)),re.removeEventListener(`input`,Wt)}}function ut(e,t){let{width:n,height:r}=e.canvas;t>.3&&e.drawImage(e.canvas,(Math.random()-.5)*n*.08*t,(Math.random()-.5)*r*.5*t);for(let i=0,a=Math.ceil(3+t*12);i<a;i++){let i=Math.random()*r,a=3+Math.random()*60*t;e.drawImage(e.canvas,0,i,n,a,(Math.random()-.5)*260*t,i,n,a)}e.fillStyle=`rgba(255,255,255,${(.08+t*.3).toFixed(2)})`;for(let i=0,a=Math.ceil(t*26);i<a;i++)e.fillRect(Math.random()*n*.3,Math.random()*r,n*(.3+Math.random()*.7),1);e.fillStyle=`rgba(0,0,0,${(t*.5).toFixed(2)})`,e.fillRect(0,0,n,r)}function dt(e){let t=Math.floor(e*100),n=Math.floor(t/6e3),r=Math.floor(t/100)%60;return`${String(n).padStart(2,`0`)}:${String(r).padStart(2,`0`)}:${String(t%100).padStart(2,`0`)}`}var U=720,ft=8,W=8,G=92,pt=232,K=124,q=[49,23],mt=[206,155],ht=[264,198],gt=2,J=2,Y=e=>`${e*4}px`,_t=`#ff7a1a`,X=`#a8551a`,Z=(e,t=``,n=_t)=>`<span d-mark="label flat" ink="${n}" class="${t}">${e}</span>`,Q=(e,t,n=``)=>`<div class="col ${n}">${e}${Z(t)}</div>`,vt=e=>`<i d-mark="print silk" class="rule ${e}" color="${_t}" path="M0 0H100V1H0Z" viewbox="0 0 100 1"></i>`,yt=(e,t)=>`<i d-mark="print silk" class="hazard ${e}" color="${_t}" viewbox="0 0 ${t*2} 2" path="${Array.from({length:t},(e,t)=>`M${t*2} 2L${t*2+1} 0H${t*2+2}L${t*2+1} 2Z`).join(``)}"></i>`,bt=(e,t)=>`<div class="head">${Z(e,`jp`)}${Z(t,`en`)}${vt(`under`)}</div>`,xt={id:`eva`,title:`Operations station`,note:`A sortie from a cold start to the end. Throw the umbilical breaker to bring the station up. Acknowledge the alarm, let the three computers vote, throw the launch sequence in order, turn both keys and lift the guard. After that it is out of your hands.`,era:`retro`,order:90,dark:!0,height:1856,html:`<div id="eva">
  <d-device class="alarms" material="paint-panel-black" radius="4" screws wear="0.35">
    <div class="ident">
      <span d-mark="print silk" class="nerv" color="${_t}">NERV</span>
      ${Z(`第一発令所`,`jp`)}
      ${Z(`Operations 03`,`en`)}
      ${yt(`id-band`,12)}
    </div>
    <div class="matrix">
      ${fe.map((e,t)=>`${Z(e,`row`,X)}${pe.slice(t*8,(t+1)*8).map(([e,t,n,r])=>`<div d-lamp="annunciator" class="t-${e}" color="${r}">${t}<br>${n}</div>`).join(``)}`).join(``)}
    </div>
    <div class="acks">
      <button d-key="flush" class="k-ack" color="amber">Ack</button>
      <button d-key="flush" class="k-test" color="white">Test</button>
      <button d-key="flush" class="k-reset" color="green">Reset</button>
    </div>
    <div class="clock">
      <div class="clock-head">${Z(`活動限界まで`,`jp`)}${Z(`Active time remaining`,`en`)}</div>
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
      ${Q(`<d-screen class="s-magi" kind="crt" gain="2.6" live><canvas width="${E[0]}" height="${E[1]}"></canvas></d-screen>`,`MAGI 審議`)}
    </div>
    <div class="centre">
      <div class="orders">${Z(`指令`,`jp`)}<div d-readout="matrix" class="order" color="amber" scroll pitch="${gt}" frame="${J}"></div></div>
      ${Q(`<d-screen class="s-main" kind="crt" gain="2.6" live><canvas width="${de[0]}" height="${de[1]}"></canvas></d-screen>`,`戦術 Tactical`)}
    </div>
    <div class="side">
      <div class="gauges">${me.map(([e,t,n,r,i])=>`<div class="gauge">${Z(`${t} ${n}`,`small`)}<div d-readout="seven" class="r-${e}" color="${i}" digits="${r}"></div></div>`).join(``)}</div>
      ${Q(`<d-screen class="s-sync" kind="crt" mono gain="2.4" live><canvas width="${D[0]}" height="${D[1]}"></canvas></d-screen>`,`シンクロ Harmonics`)}
    </div>
  </d-device>
  <d-device class="desk" material="paint-panel-black" radius="4" screws wear="0.35">
    <section class="s-steps">
      ${bt(`発進準備`,`Launch sequence`)}
      <div class="steps">${k.map(([e],t)=>Q(`<div d-lamp="led" class="led" color="green"></div><div d-switch="toggle"><input type="checkbox" class="step" data-step="${t}" aria-label="${e}"></div>`,`${t+1} ${e}`)).join(``)}</div>
    </section>
    ${vt(`split`)}
    <section class="s-power">
      ${bt(`電源系統`,`Power`)}
      <div class="power">${O.map(([e,t])=>Q(`<div d-lamp="led" class="led p-led-${e}" color="amber"></div><div d-switch="rocker" lit><input type="checkbox" class="p-${e}" aria-label="${t}"${e===`int`?` checked`:``}></div>`,t)).join(``)}</div>
    </section>
    ${vt(`split`)}
    <section class="s-arm">
      ${bt(`発進認証`,`Authorisation`)}
      <div class="arm">
        ${Q(`<div d-switch="key" labels="Safe,Arm"><input type="checkbox" class="key" aria-label="Operations key"></div>`,`Ops`)}
        <div class="col">
          <div class="pit">${yt(`pit-band`,12)}<div d-cover="guard" class="guard"><input type="checkbox" aria-label="Lift the launch guard"><button d-key="arcade" class="go" material="plastic-red" aria-label="Launch"></button></div>${yt(`pit-band`,12)}</div>
          ${Z(`発進 Launch`)}
        </div>
        ${Q(`<div d-switch="key" labels="Safe,Arm"><input type="checkbox" class="key" aria-label="Command key"></div>`,`Cmd`)}
      </div>
    </section>
    ${vt(`split`)}
    <section class="s-route">
      ${bt(`射出`,`Route`)}
      <div class="route">
        ${Q(`<div d-knob="pointer" class="track" labels="1,2,3,4,5,6,7,8,9" sweep="120"><input type="range" min="0" max="8" step="1" value="6" aria-label="Launch track"></div>`,`Track`)}
        ${Q(`<div d-knob="encoder" class="tune" color="green"><input type="range" min="-60" max="60" step="1" value="0" aria-label="Sync trim"></div>`,`Sync trim`)}
      </div>
    </section>
    ${vt(`split`)}
    <section class="s-pilot">
      ${bt(`パイロット`,`Pilot`)}
      <div class="pilot">
        ${Q(`<div d-cover="guard" class="guard eject" material="plastic-yellow"><input type="checkbox" aria-label="Lift the eject guard"><div d-switch="toggle"><input type="checkbox" class="plug" aria-label="Eject the entry plug"></div></div>`,`Plug eject`)}
        ${Q(`<div d-meter="gauge" class="g-sync" ticks="8" minor="5" zones="100-400 red" label="Sync %"><meter min="0" max="400" value="0"></meter></div>`,`シンクロ率 Sync`)}
        <div class="readouts">
          ${Q(`<div d-readout="seven" class="r-sync" color="green" digits="4">0.0</div>`,`Sync %`)}
          <div class="heart">${Z(`心拍 Heart`,`small`)}<div d-lamp="led" class="beat" color="red"></div><div d-readout="seven" class="r-heart" color="red" digits="3"></div></div>
          ${Q(`<div d-meter="bargraph" class="b-field" segments="16" color="amber"><meter min="0" max="1" value="0"></meter></div>`,`ATフィールド AT field`)}
        </div>
      </div>
    </section>
  </d-device>
</div>`,css:`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Noto+Sans+JP:wght@700&family=Noto+Serif:wdth,wght@62.5..100,700..900&family=Shippori+Mincho+B1:wght@800&display=swap');
#eva { width: ${Y(U)}; display: grid; gap: ${Y(W)}; }
#eva d-device { padding: ${Y(ft)}; box-sizing: border-box; font: 600 ${Y(5)} / 1.05 'Barlow Condensed', 'Noto Sans JP', sans-serif; letter-spacing: .04em; text-transform: uppercase; }
#eva .col { display: grid; gap: ${Y(2)}; justify-items: center; align-content: end; }
#eva .jp { font-family: 'Noto Sans JP', sans-serif; font-weight: 700; letter-spacing: .1em; }
#eva .small { font-size: ${Y(5)}; }
#eva .rule { display: block; width: 100%; height: ${Y(.7)}; }

#eva .alarms { height: ${Y(G)}; display: flex; align-items: center; gap: ${Y(8)}; }
#eva .ident { display: grid; gap: ${Y(1.5)}; align-self: stretch; align-content: center; width: ${Y(50)}; }
#eva .nerv { font: 900 ${Y(19)} / 1 'Noto Serif', serif; font-stretch: 62.5%; letter-spacing: 0; }
#eva .ident .jp { font-size: ${Y(6)}; }
#eva .ident .en { font-size: ${Y(4.6)}; }
#eva .id-band { display: block; width: 100%; height: ${Y(4)}; margin-top: ${Y(2)}; }
#eva .matrix { display: grid; grid-template-columns: auto repeat(8, ${Y(q[0])}); grid-auto-rows: ${Y(q[1])}; gap: ${Y(2)}; align-items: center; }
#eva .row { justify-self: end; font-size: ${Y(4.6)}; }
#eva [d-lamp~="annunciator"] { display: grid; place-items: center; text-align: center; font-size: ${Y(5.2)}; line-height: 1.1; letter-spacing: .02em; }
#eva .acks { display: grid; gap: ${Y(3)}; }
#eva .acks [d-key] { width: ${Y(21)}; height: ${Y(21)}; font-size: ${Y(4.2)}; }
#eva .clock { margin-left: auto; display: grid; gap: ${Y(2)}; }
#eva .clock-head { display: flex; gap: ${Y(3)}; align-items: baseline; }
#eva .clock-head .jp { font-size: ${Y(6)}; }
#eva .clock-body { display: flex; gap: ${Y(3)}; }
#eva .timer { width: ${Y(112)}; height: ${Y(46)}; }
#eva .supply { display: grid; gap: ${Y(3)}; }
#eva .supply [d-lamp] { width: ${Y(36)}; height: ${Y(21.5)}; font-size: ${Y(4.4)}; }

#eva .bay { height: ${Y(pt)}; padding-block: ${Y(6)} !important; display: flex; justify-content: space-between; align-items: end; }
#eva .side { display: grid; gap: ${Y(4)}; align-content: end; }
#eva .votes { display: grid; grid-template-columns: repeat(3, 1fr); gap: ${Y(3)}; }
#eva .vote { height: ${Y(48)}; font-size: ${Y(5.6)}; }
#eva .centre { display: grid; gap: ${Y(3)}; align-content: end; }
#eva .orders { display: flex; gap: ${Y(3)}; align-items: center; }
#eva .orders .jp { font-size: ${Y(6)}; }
#eva .order { flex: 1; height: ${Y(18)}; }
#eva .gauges { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: ${Y(3)}; height: ${Y(48)}; }
#eva .gauge { display: grid; gap: ${Y(1.5)}; align-content: end; }
#eva .gauges [d-readout] { height: ${Y(34)}; }
#eva .s-magi, #eva .s-sync { width: ${Y(mt[0])}; height: ${Y(mt[1])}; }
#eva .s-main { width: ${Y(ht[0])}; height: ${Y(ht[1])}; }

#eva .desk { height: ${Y(K)}; display: flex; align-items: stretch; justify-content: space-between; gap: ${Y(5)}; }
#eva .split { width: ${Y(.7)}; height: auto; align-self: stretch; }
#eva section { display: grid; grid-template-rows: auto minmax(0, 1fr); gap: ${Y(3)}; }
#eva .head { display: flex; gap: ${Y(2.5)}; align-items: baseline; flex-wrap: wrap; align-self: start; }
#eva .head .jp { font-size: ${Y(6.4)}; }
#eva .head .en { font-size: ${Y(5)}; }
#eva .head .under { flex-basis: 100%; }
#eva .steps, #eva .arm, #eva .pilot, #eva .power, #eva .route { display: flex; gap: ${Y(6)}; align-items: end; }
#eva .led { width: ${Y(6)}; height: ${Y(6)}; }
#eva .steps [d-switch~="toggle"] { width: ${Y(20)}; height: ${Y(34)}; }
#eva .steps .col { gap: ${Y(3)}; }
/* A lever down and a cover up both hang past their parts, toward the operator, so their labels stand clear. */
#eva .steps .col > [d-mark] { margin-top: ${Y(11)}; }
#eva .arm .col > [d-mark], #eva .pilot .col > [d-mark] { margin-top: ${Y(3)}; }

#eva .power [d-switch] { width: ${Y(20)}; height: ${Y(28)}; }
#eva [d-switch~="key"] { width: ${Y(48)}; height: ${Y(48)}; }
#eva .pit { display: grid; gap: ${Y(2)}; justify-items: center; width: ${Y(62)}; }
#eva .pit-band { display: block; width: 100%; height: ${Y(5)}; }
#eva .guard { width: ${Y(50)}; height: ${Y(58)}; display: grid; place-items: center; }
#eva .go { width: ${Y(42)}; height: ${Y(42)}; }
#eva .route { gap: ${Y(4)}; }
#eva .tune { width: ${Y(34)}; height: ${Y(34)}; }
#eva [d-knob~="pointer"] { width: ${Y(36)}; height: ${Y(36)}; font-size: ${Y(4.4)}; }
#eva .eject { width: ${Y(38)}; height: ${Y(50)}; }
#eva .eject [d-switch] { width: ${Y(18)}; height: ${Y(36)}; }
#eva .g-sync { width: ${Y(74)}; height: ${Y(74)}; }
#eva .readouts { display: grid; gap: ${Y(3)}; }
#eva .r-sync { width: ${Y(70)}; height: ${Y(24)}; }
#eva .heart { display: flex; gap: ${Y(3)}; align-items: center; justify-content: end; }
#eva .r-heart { width: ${Y(30)}; height: ${Y(14)}; }
#eva .b-field { width: ${Y(70)}; height: ${Y(10)}; }`,setup:e=>H(e)};export{xt as default};