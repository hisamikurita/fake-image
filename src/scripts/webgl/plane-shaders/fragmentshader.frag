precision mediump float;

uniform vec2 u_meshsize;
uniform vec2 u_texturesize;
uniform vec2 u_mouse;
uniform sampler2D u_texture;
uniform sampler2D u_textureMap;
varying vec2 vUv;

vec2 mirrored(vec2 v) {
    vec2 m = mod(v, 2.0);
    return mix(m, 2.0 - m, step(1.0, m));
}

void main() {
    vec2 uv = vUv;

    vec2 ratio = vec2(
        min((u_meshsize.x / u_meshsize.y) / (u_texturesize.x / u_texturesize.y), 1.0),
        min((u_meshsize.y / u_meshsize.x) / (u_texturesize.y / u_texturesize.x), 1.0)
    );

    uv += -0.5;
    uv *= ratio;
    uv += 0.5;

    float power = 0.028;
    vec4 depth = texture2D(u_textureMap, uv);
    vec2 fakeUv = uv + u_mouse * power * (depth.r - 0.50);
    vec4 texture = texture2D(u_texture, mirrored(fakeUv));

    gl_FragColor = vec4(texture);
}