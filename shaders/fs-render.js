uniform sampler2D sprite;
varying vec4 vPosition;
varying vec4 vAudio;
varying vec2 vUv;
varying float opacity;

const float pi = 3.14159;
void main() {

  //vec3 c = normalize( vPosition ).xyz;
  vec3 c = vec3( abs(cos( vUv.x* pi*2.)) , vUv.x , abs(sin(vUv.x * pi*2. )) );
  vec4 m = texture2D( sprite , vec2( gl_PointCoord.x , 1.0 - gl_PointCoord.y) );

  gl_FragColor = vec4( normalize(c) * m.xyz * vAudio.xyz , m.w  );

}


