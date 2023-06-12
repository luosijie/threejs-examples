
varying vec2 vUV;
varying vec3 vNormal;

void main() {
    vUV = uv;
    vNormal = normal;
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    vec3 newPosition = position;
    
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition.x, newPosition .0 1.);
    gl_Position = projectionMatrix * (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0) + vec4(newPosition.x, newPosition.y, 0.0, 0.0));
}
