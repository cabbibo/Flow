uniform sampler2D sprite;
varying vec4 vPosition;
varying float opacity;

void main() {

  vec3 c = normalize( vPosition ).xyz;
  vec4 m = texture2D( sprite , vec2( gl_PointCoord.x , 1.0 - gl_PointCoord.y) );
  gl_FragColor = vec4( abs(c) * m.xyz , m.w );

}


