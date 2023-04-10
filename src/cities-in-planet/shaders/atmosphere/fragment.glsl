uniform sampler2D uTexture; 
varying vec2 vUV;
varying vec3 vNormal;

void main() {
    float intensity = 0.8 - dot(vNormal, vec3(.0, .0, 1.0));
    intensity = pow(intensity, 2.0);

    gl_FragColor = vec4(.3, .6, 1.0, 1.0) * intensity;
}
