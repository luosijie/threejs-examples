uniform float uTime;
uniform float uScale;
attribute vec3 aRandom;
varying vec3 vPosition;

void main() {
    float time = uTime * 4.0;
    vPosition = position;

    vPosition.x += sin(time * aRandom.x) * 0.01;
    vPosition.y += sin(time * aRandom.y) * 0.01;
    vPosition.z += sin(time * aRandom.z) * 0.01;

    vPosition.x *= uScale;
    vPosition.y *= uScale;
    vPosition.z *= uScale;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
    gl_PointSize = 8.0 / -gl_Position.z;
}
