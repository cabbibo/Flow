varying vec2 vUv;
varying vec3 vPos;

void main() {
  vPos = normalize( position );
  vUv = normalize( position.xy );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
