

uniform float uScale;
varying vec3 vPosition;

void main() {
    vec3 color = vec3(1.0);

    float depth = vPosition.z * 0.5 + 0.5;
    float alpha = depth * uScale;
    gl_FragColor = vec4(color, alpha);
}
