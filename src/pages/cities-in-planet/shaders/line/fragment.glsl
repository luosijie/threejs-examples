uniform float uTime;
varying vec2 vUv;

void main() {
    float dash = fract(vUv.x * 20. - uTime);

    if (dash > .5) discard;


    gl_FragColor = vec4(vUv.x, 0., 0., 1.0);
}
