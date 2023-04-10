uniform sampler2D uTexture; 
varying vec2 vUV;
varying vec3 vNormal;

void main() {
    float intensity = 1.05 - dot(vNormal, vec3(.0, .0, 1.0));
    vec3 atmosphere = vec3(.3, .6, 1.0) * pow(intensity, 2.0) ;

    vec3 color = texture2D(uTexture, vUV).xyz;
    color += atmosphere;
    gl_FragColor = vec4(color, 1.0);
}
