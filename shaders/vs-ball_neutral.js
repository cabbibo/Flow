varying vec2 vUv;
varying vec3 vPos;

void main() {
  //vUv = vec2( uv.x, 1.0 - uv.y );
  
  vPos = normalize( position );
  vUv = normalize( position.xy );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}