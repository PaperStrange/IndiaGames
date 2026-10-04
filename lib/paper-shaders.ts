export const PAPER_VERTEX_SHADER = `
attribute vec2 position;
varying vec2 uv;
void main() {
    uv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}`;

export const PAPER_FRAGMENT_SHADER = `
precision mediump float;
varying vec2 uv;
uniform sampler2D paper;
uniform float time;
uniform float warm;
uniform float candle;
uniform vec3 hand;
float heightAt(vec2 p) {
    return dot(texture2D(paper, p).rgb, vec3(0.299, 0.587, 0.114));
}
void main() {
    vec2 p = vec2(uv.x, 1.0 - uv.y);
    float dx = heightAt(p + vec2(0.0018, 0.0)) - heightAt(p - vec2(0.0018, 0.0));
    float dy = heightAt(p + vec2(0.0, 0.0018)) - heightAt(p - vec2(0.0, 0.0018));
    float binding = exp(-p.x * 24.0);
    float outerCurl = exp(-(1.0 - p.x) * 25.0);
    float pageSlope = 0.29 * cos(p.x * 3.14159) - 0.7 * binding + 0.24 * outerCurl;
    vec3 normal = normalize(vec3(pageSlope - dx * 4.2, -dy * 4.2, 1.0));
    float flicker = 0.96 + 0.022 * sin(time * 6.7) + 0.016 * sin(time * 13.1 + 2.4)
        + 0.01 * sin(time * 21.3 + sin(time * 2.1));
    vec3 lamp = vec3(0.17 + 0.035 * sin(time * 1.7), -0.14 + 0.02 * sin(time * 2.3), 0.62);
    vec3 ray = lamp - vec3(p.x, p.y * 1.25, 0.0);
    float distanceSquared = dot(ray, ray);
    vec3 light = normalize(ray);
    float diffuse = max(dot(normal, light), 0.0);
    float roughness = mix(20.0, 46.0, heightAt(p));
    vec3 halfLight = normalize(light + vec3(0.0, 0.0, 1.0));
    float sheen = pow(max(dot(normal, halfLight), 0.0), roughness) * 0.045;
    float ambientOcclusion = 0.29 * binding + 0.09 * outerCurl
        + 0.055 * exp(-(1.0 - p.y) * 28.0);
    float reflectedLight = 0.025 * max(dot(normal, normalize(vec3(-0.6, -0.3, 1.0))), 0.0);
    float illumination = diffuse * flicker / (0.8 + distanceSquared);
    vec2 shadowDistance = (p - hand.xy - vec2(0.045, 0.09)) / vec2(0.16, 0.27);
    float handShadow = exp(-dot(shadowDistance, shadowDistance) * 2.4) * hand.z;
    float luminance = 0.92 - ambientOcclusion + reflectedLight
        + candle * (0.28 * illumination - 0.12 + sheen - handShadow * 0.24);
    vec3 coolShadow = vec3(luminance * 0.965, luminance * 0.975, luminance);
    vec3 warmLight = vec3(luminance * 1.04, luminance * 1.005, luminance * 0.90);
    vec3 color = mix(coolShadow, warmLight, clamp(illumination * candle * warm, 0.0, 1.0));
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`;
